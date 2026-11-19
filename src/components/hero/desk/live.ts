// Live behaviour for the desk diorama. Framework-free: it takes the mounted SVG
// and drives it through attributes, one requestAnimationFrame loop, no re-renders.
//
// Three toys: the monitor's code breaks when touched, the coffee spills when
// touched, and the picture frame swings to the next picture.
import { DESK_META as META } from './art.generated';

export interface DeskOptions {
  /** Pictures for the wall frame; a touch on the frame shows the next one. */
  frameImages?: string[];
}

const MAX_CHARS = 40;
const SCROLL_SPEED = 2.4; // code lines per second
const SHIFTED: Record<string, string> = {
  '~': '`', '!': '1', '@': '2', '#': '3', $: '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
  _: '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/',
};

// Crash timeline (s): shake, dialog, rebuild bar, back to work.
const CRASH = { shake: 0.45, dialog: 0.25, rebuildAt: 2.4, rebuild: 1.6, out: 0.35 };
const CRASH_END = CRASH.rebuildAt + CRASH.rebuild + CRASH.out;
// Spill timeline (s): wobble, fall, coffee spreads, wait, tidy up.
const SPILL = { wobble: 0.28, fall: 0.16, spread: 1.3, hold: 3.2, tidy: 0.7 };
const SPILL_TIDY = SPILL.wobble + SPILL.fall + SPILL.spread + SPILL.hold;
const SPILL_END = SPILL_TIDY + SPILL.tidy;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (v: number) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};
const easeOut = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const span = (t: number, from: number, dur: number) => smooth((t - from) / dur);
const keyFor = (code: string) => META.keys.indexOf(code as never);

export function mountDesk(root: HTMLElement, options: DeskOptions = {}): () => void {
  const svg = root.querySelector('svg') as SVGSVGElement;
  const q = (sel: string) => svg.querySelector(sel) as SVGElement;
  const hint = root.querySelector('[data-desk-hint]') as HTMLElement | null;
  const status = root.querySelector('[data-desk-status]') as HTMLElement | null;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  const say = (text: string) => {
    if (status) status.textContent = text;
  };

  // ── elements ──
  const keyEls = Array.from(svg.querySelectorAll<SVGGElement>('[data-key]'));
  const code = q('[data-part="code"]');
  const miniView = q('[data-part="mini-view"]');
  const shake = q('[data-part="shake"]');
  const crash = q('[data-part="crash"]');
  const rebuild = q('[data-part="rebuild"]');
  const rebuildBar = q('[data-part="rebuild-bar"]');
  const statusText = q('[data-part="status"]');
  const statusDot = q('[data-part="status-dot"]');
  const typed = q('[data-part="typed"]');
  const typedText = typed.parentElement as unknown as SVGTextElement;
  const cursor = q('[data-part="cursor"]');
  const fans = [q('[data-part="fan-front"]'), q('[data-part="fan-rear"]')];
  const mugUp = q('[data-part="mug-up"]');
  const mugDown = q('[data-part="mug-down"]');
  const puddle = q('[data-part="puddle"]');
  const steam = q('[data-part="steam"]');
  const swing = q('[data-part="frame-swing"]');
  const photos = [q('[data-part="photo-a"]'), q('[data-part="photo-b"]')];
  const toys = Array.from(svg.querySelectorAll<SVGGElement>('[data-toy]'));

  // ── state ──
  let frame = 0;
  let last = 0;
  let visible = false;
  let scroll = 0;
  let fanAngle = 0;
  let line = '';
  let crashAt = -1; // seconds into a crash, or -1
  let spillAt = -1; // seconds into a spill, or -1
  const swingState = { angle: 0, rate: 0 };
  const keyState = keyEls.map(() => ({ at: 0, hold: 0 }));
  const activeKeys = new Set<number>();

  // ── pictures ──
  const images = (options.frameImages ?? []).filter(Boolean);
  let shown = 0; // index into images
  let front = 0; // which <image> layer is on top
  let fade = 1; // 0..1 fade of the front layer
  if (images.length) photos[0].setAttribute('href', images[0]);
  else photos.forEach((p) => p.remove());

  // ── keyboard ──
  const press = (code: string, hold = 0.09) => {
    const i = keyFor(code);
    if (i < 0) return;
    keyState[i].hold = hold;
    activeKeys.add(i);
    run();
  };
  const pressChar = (ch: string) => {
    const lower = ch.toLowerCase();
    const code = SHIFTED[ch] ?? lower;
    if (SHIFTED[ch] || ch !== lower) press('Shift', 0.14);
    press(code);
  };
  const setLine = (text: string) => {
    line = text;
    typed.textContent = text;
    try {
      const x = Number(typedText.getAttribute('x')) + typedText.getComputedTextLength() + 0.5;
      cursor.setAttribute('x', x.toFixed(2));
    } catch {
      /* not rendered yet */
    }
    run();
  };

  // ── toys ──
  function knockMonitor() {
    if (crashAt >= 0 && crashAt < CRASH.rebuildAt) return;
    crashAt = 0;
    statusText.textContent = 'main · Build FAILED';
    statusDot.setAttribute('data-state', 'fail');
    say('The code broke. Rebuilding.');
    run();
  }
  function knockMug() {
    if (spillAt >= 0) return;
    spillAt = 0;
    say('The coffee spilled.');
    run();
  }
  function nextPicture() {
    swingState.rate += swingState.angle > 0 ? -55 : 55;
    if (images.length > 1) {
      shown = (shown + 1) % images.length;
      front = 1 - front;
      photos[front].setAttribute('href', images[shown]);
      fade = still.matches ? 1 : 0;
      op(photos[front], fade);
      // the new layer goes on top of the old one
      photos[front].parentNode?.appendChild(photos[front]);
      if (fade >= 1) op(photos[1 - front], 0);
    }
    run();
  }
  const ACT: Record<string, () => void> = { monitor: knockMonitor, mug: knockMug, frame: nextPicture };

  // ── hint chip ──
  let hideTimer = 0;
  function showHint(el: Element, text: string) {
    if (!hint) return;
    clearTimeout(hideTimer);
    const box = (el as SVGGraphicsElement).getBoundingClientRect();
    const host = root.getBoundingClientRect();
    hint.textContent = text;
    hint.style.left = `${box.left + box.width / 2 - host.left}px`;
    hint.style.top = `${box.top - host.top}px`;
    hint.dataset.show = '';
  }
  function hideHint() {
    if (!hint) return;
    clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => delete hint.dataset.show, 120);
  }
  toys.forEach((g) => {
    // Anchor the chip to what is visible: the group's own box also counts the clipped,
    // scrolled-away code and the hidden fallen mug and puddle.
    const anchor = ({ monitor: q('.dk-scr-bg'), mug: mugUp } as Record<string, Element>)[g.dataset.toy!] ?? g;
    const enter = () => {
      g.setAttribute('data-hover', '');
      showHint(anchor, g.dataset.hint ?? '');
    };
    const leave = () => {
      g.removeAttribute('data-hover');
      hideHint();
    };
    g.addEventListener('pointerenter', enter);
    g.addEventListener('pointerleave', leave);
    g.addEventListener('focus', enter);
    g.addEventListener('blur', leave);
    g.addEventListener('click', () => ACT[g.dataset.toy!]?.());
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        ACT[g.dataset.toy!]?.();
      }
    });
  });

  // ── typing on the physical keyboard ──
  const isField = (el: EventTarget | null) =>
    el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  function onKey(e: KeyboardEvent) {
    if (!visible || e.metaKey || e.ctrlKey || e.altKey || isField(e.target)) return;
    const active = document.activeElement;
    const onControl = active instanceof Element && active.closest('[data-toy],a,button');
    const key = e.key;
    // Keys that scroll or activate something only type when focus isn't on a control.
    if ((key === ' ' || key === 'Enter' || key === 'Backspace') && onControl) return;
    if (key === 'Tab' || key.startsWith('Arrow') || key === 'PageUp' || key === 'PageDown' || key === 'Home' || key === 'End') {
      if (!onControl) press(key);
      return;
    }
    if (key === 'Shift') return press(e.code === 'ShiftRight' ? 'ShiftRight' : 'Shift', 0.14);
    if (key === 'Escape') return press('Escape');
    if (/^F\d{1,2}$/.test(key)) return press(key);
    if (key === 'Backspace') {
      press('Backspace');
      return setLine(line.slice(0, -1));
    }
    if (key === 'Enter') {
      press('Enter', 0.12);
      return setLine('');
    }
    if (key.length !== 1) return;
    // Space scrolls the page unless the diorama has focus
    if (key === ' ') {
      if (!root.contains(active)) return;
      e.preventDefault();
    }
    pressChar(key);
    setLine((line + key).slice(-MAX_CHARS));
  }

  // ── painting ──
  function op(el: Element, v: number) {
    el.setAttribute('opacity', v.toFixed(3));
  }

  function paintCode(dt: number, calm: boolean) {
    const broken = crashAt >= 0 && crashAt < CRASH.rebuildAt + CRASH.rebuild;
    if (!calm && !broken) scroll = (scroll + dt * SCROLL_SPEED * META.code.lh) % META.code.span;
    code.setAttribute('transform', `translate(0 ${(-scroll).toFixed(2)})`);
    const lines = Math.min(scroll / META.code.lh, META.code.lines);
    miniView.setAttribute('transform', `translate(0 ${(lines * Number(miniView.dataset.scale) * META.code.lh).toFixed(2)})`);
    cursor.setAttribute('opacity', calm || performance.now() % 1060 < 620 ? '1' : '0');
  }

  function paintCrash(dt: number, calm: boolean) {
    if (crashAt < 0) return;
    crashAt += dt;
    const t = crashAt;
    // a short, decaying jitter of the whole screen picture
    const k = calm ? 0 : Math.max(0, 1 - t / CRASH.shake);
    const jx = (Math.sin(t * 91) + Math.sin(t * 57)) * 1.4 * k;
    const jy = Math.sin(t * 73) * 0.8 * k;
    shake.setAttribute('transform', `translate(${jx.toFixed(2)} ${jy.toFixed(2)})`);
    const dialog = calm ? (t < CRASH_END - CRASH.out ? 1 : 0) : t < CRASH_END - CRASH.out ? span(t, 0.12, CRASH.dialog) : 1 - span(t, CRASH_END - CRASH.out, CRASH.out);
    op(crash, dialog);
    op(rebuild, calm ? (t >= CRASH.rebuildAt ? 1 : 0) : span(t, CRASH.rebuildAt, 0.2));
    const w = Number(rebuildBar.dataset.w) * easeOut((t - CRASH.rebuildAt) / CRASH.rebuild);
    rebuildBar.setAttribute('width', w.toFixed(2));
    if (t >= CRASH.rebuildAt + CRASH.rebuild && statusDot.getAttribute('data-state') === 'fail') {
      statusText.textContent = 'main · Build OK';
      statusDot.removeAttribute('data-state');
      say('Rebuilt. It works again.');
    }
    if (t >= CRASH_END) {
      crashAt = -1;
      shake.removeAttribute('transform');
      op(crash, 0);
    }
  }

  function paintSpill(dt: number, calm: boolean) {
    if (spillAt < 0) return;
    spillAt += dt;
    // reduced motion: no wobble or spreading, just the before and after
    const t = calm && spillAt < SPILL_TIDY ? Math.max(spillAt, SPILL.wobble + SPILL.fall + SPILL.spread) : spillAt;
    const [px, py] = META.mug.pivot;
    const fallAt = SPILL.wobble;
    // wobble on the coaster, then tip toward the viewer and swap to the lying mug
    const wob = t < fallAt ? Math.sin((t / fallAt) * Math.PI * 2) * 4 * (1 - t / fallAt) : 0;
    const tip = t < fallAt || t >= SPILL_TIDY ? 0 : easeOut((t - fallAt) / SPILL.fall) * 24;
    if (wob + tip) mugUp.setAttribute('transform', `rotate(${(wob + tip).toFixed(2)} ${px} ${py})`);
    else mugUp.removeAttribute('transform');
    const lying = t < SPILL_TIDY ? span(t, fallAt + SPILL.fall * 0.4, SPILL.fall * 0.6) : 1 - span(t, SPILL_TIDY + 0.2, SPILL.tidy - 0.2);
    op(mugDown, lying);
    op(mugUp, t < SPILL_TIDY ? 1 - lying : span(t, SPILL_TIDY + 0.25, SPILL.tidy - 0.25));
    // coffee runs out from the mouth and spreads; the steam goes
    const grow = easeOut((t - fallAt - SPILL.fall * 0.6) / SPILL.spread);
    const ox = Number(puddle.dataset.ox);
    const oy = Number(puddle.dataset.oy);
    puddle.setAttribute('transform', `translate(${ox} ${oy}) scale(${Math.max(0.001, grow).toFixed(3)}) translate(${-ox} ${-oy})`);
    op(puddle, t < SPILL_TIDY ? (grow > 0 ? 1 : 0) : 1 - span(t, SPILL_TIDY, SPILL.tidy * 0.8));
    op(steam, t < SPILL_TIDY ? 1 - span(t, fallAt, 0.3) : span(t, SPILL_TIDY + SPILL.tidy * 0.5, 0.6));
    if (spillAt >= SPILL_END) {
      spillAt = -1;
      mugUp.removeAttribute('transform');
      op(mugUp, 1);
      op(mugDown, 0);
      op(puddle, 0);
      op(steam, 1);
      say('');
    }
  }

  function paintFrame(dt: number, calm: boolean) {
    // a damped pendulum about the nail; the new picture fades in alongside
    if (calm) {
      swingState.angle = 0;
      swingState.rate = 0;
    } else {
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        swingState.rate += (-60 * swingState.angle - 3.2 * swingState.rate) * h;
        swingState.angle += swingState.rate * h;
      }
      if (Math.abs(swingState.angle) < 0.01 && Math.abs(swingState.rate) < 0.05) {
        swingState.angle = 0;
        swingState.rate = 0;
      }
    }
    const { m, inv, pivot } = META.frame;
    if (swingState.angle) {
      swing.setAttribute('transform', `matrix(${m.join(' ')}) rotate(${swingState.angle.toFixed(3)} ${pivot[0]} ${pivot[1]}) matrix(${inv.join(' ')})`);
    } else swing.removeAttribute('transform');
    if (fade < 1) {
      fade = Math.min(1, fade + dt / 0.45);
      op(photos[front], smooth(fade));
      if (fade >= 1) op(photos[1 - front], 0);
    }
  }

  function paintKeys(dt: number, calm: boolean) {
    for (const i of activeKeys) {
      const s = keyState[i];
      s.hold = Math.max(0, s.hold - dt);
      const want = s.hold > 0 ? 1 : 0;
      s.at = calm ? want : s.at + (want - s.at) * (1 - Math.exp(-dt / (want ? 0.02 : 0.06)));
      if (Math.abs(want - s.at) < 0.01) s.at = want;
      keyEls[i].setAttribute('transform', `translate(${(META.keyDown[0] * s.at).toFixed(2)} ${(META.keyDown[1] * s.at).toFixed(2)})`);
      if (!s.hold && s.at === 0) activeKeys.delete(i);
    }
  }

  // ── loop ──
  function tick(now: number) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    const calm = still.matches;
    paintCode(dt, calm);
    paintCrash(dt, calm);
    paintSpill(dt, calm);
    paintFrame(dt, calm);
    paintKeys(dt, calm);
    if (!calm) {
      fanAngle = (fanAngle + dt * 300) % 360;
      fans.forEach((f) => f.setAttribute('transform', `rotate(${fanAngle.toFixed(1)})`));
    }
    const swinging = swingState.angle !== 0 || swingState.rate !== 0;
    const busy = !calm || activeKeys.size > 0 || crashAt >= 0 || spillAt >= 0 || fade < 1 || swinging;
    frame = visible && busy ? requestAnimationFrame(tick) : 0;
  }
  function run() {
    if (!frame && visible) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      root.toggleAttribute('data-running', visible && !still.matches);
      if (visible) run();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: '80px 0px' },
  );
  io.observe(root);
  const onMotion = () => {
    root.toggleAttribute('data-running', visible && !still.matches);
    run();
  };
  still.addEventListener('change', onMotion);
  window.addEventListener('keydown', onKey);
  const onHidden = () => {
    if (document.hidden && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else run();
  };
  document.addEventListener('visibilitychange', onHidden);

  paintCode(0, true);

  return () => {
    io.disconnect();
    still.removeEventListener('change', onMotion);
    window.removeEventListener('keydown', onKey);
    document.removeEventListener('visibilitychange', onHidden);
    if (frame) cancelAnimationFrame(frame);
    clearTimeout(hideTimer);
  };
}
