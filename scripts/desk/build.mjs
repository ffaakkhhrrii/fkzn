// Builds the hero diorama: an isometric corner of a work desk, drawn once in Node
// with the iso kit and written out as a static SVG string module for the site.
//
//   node scripts/desk/build.mjs          writes src/components/hero/desk/art.generated.ts
//
// World units are about half a centimetre: x runs along the desk, y toward the
// viewer (the wall's front face is y = 0), z is up (the floor is z = 0).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./kit/iso-kit.mjs";
import * as G from "./kit/lathe.mjs";
import { tubePieces, tubeSvg } from "./kit/tube.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT_DIR = join(ROOT, "src", "components", "hero", "desk");

// ─── World layout ──────────────────────────────────────────────────────────
const FLOOR = { x: -228, y: -14, w: 456, d: 184, r: 2 };
const FLOOR_H = 9;
const WALL = { x: -228, y: -14, w: 456, d: 14, r: 0 };
const WALL_TOP = 298;
const SKIRT_H = 9;

const DESK = { x: -200, y: 12, w: 400, d: 128, r: 2.5 };
const DESK_Z = 116; // top surface
const DESK_T = 6.5; // panel thickness
const DESK_FRONT = DESK.y + DESK.d;
const LEG_X = [-181, 181];
const POST_Y = [20, 126];

const MON = { x0: -78, x1: 78, y: 50, d: 4, z0: 146, z1: 236 };
const MON_FRONT = MON.y + MON.d;
const SCREEN = { x0: -75.4, x1: 75.4, z0: 151.6, z1: 233.4, r: 0.8, depth: 0.7 };
const SCREEN_Y = MON_FRONT - SCREEN.depth;
const MON_BASE = { x: -30, y: 22, w: 60, d: 40, r: 5 };

const KB = { x: -57, y: 68, w: 114, d: 46, r: 2.6 };
const KB_Z = 1.4; // rubber feet
const KB_TOP = KB_Z + 5.2; // top of the case, above the desk
const KU = 6.55; // one key unit
const KEYS_X = KB.x + (KB.w - KU * 15.5) / 2 + 0.25;
const KEYS_Y = KB.y + 3.4;

const PAD = { x: 66, y: 74, w: 66, d: 52, r: 3 };
const PAD_T = 1.1;

const TOWER = { x: 118, y: 30, w: 62, d: 38, r: 2.2 };
const TOWER_Z0 = DESK_Z + 2.2;
const TOWER_H = 62;
const TOWER_FRONT = TOWER.y + TOWER.d; // glass side faces +y
const TOWER_NOSE = TOWER.x + TOWER.w; // front panel faces +x
const GLASS = { x0: TOWER.x + 6, x1: TOWER_NOSE - 9, z0: TOWER_Z0 + 6, z1: TOWER_Z0 + TOWER_H - 6, r: 1.6, depth: 26 };

const RADIO = { x: -192, y: 40, w: 62, d: 26, r: 4.5 };
const RADIO_Z0 = DESK_Z + 2;
const RADIO_H = 34;
const RADIO_FRONT = RADIO.y + RADIO.d;

const SHELF = { x: 84, y: 0, w: 116, d: 22, r: 1.2 };
const SHELF_Z = 194;
const SHELF_T = 3.6;
const FRAME = { x0: 106, x1: 180, z0: 236, z1: 286 };

const AZIMUTH = 64;
const WIDTH = 1000;

const extremes = [
  ...k.boxCorners(FLOOR, -FLOOR_H, 0),
  ...k.boxCorners(WALL, 0, WALL_TOP),
  [-170, 52, 210], // antenna tip
];
const unit = k.fitProjection(extremes, 1000, 1000, { pad: 0, azimuth: AZIMUTH });
const flat = extremes.map((p) => k.iso(p, unit));
const spanX = Math.max(...flat.map((p) => p[0])) - Math.min(...flat.map((p) => p[0]));
const spanY = Math.max(...flat.map((p) => p[1])) - Math.min(...flat.map((p) => p[1]));
const PAD_PX = 14;
const HEIGHT = Math.round(((WIDTH - PAD_PX * 2) * spanY) / spanX + PAD_PX * 2);
const P = k.fitProjection(extremes, WIDTH, HEIGHT, { pad: PAD_PX, azimuth: AZIMUTH });

// ─── Helpers ───────────────────────────────────────────────────────────────
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const slab = (plan, z, h, style = {}, steps = 4, bevel = 0) => S(k.slabOf(plan, z, h, P, steps, bevel), style);
const box = (x0, y0, z0, x1, y1, z1, style = {}, bevel = 0, r = 0.4) =>
  slab({ x: x0, y: y0, w: x1 - x0, d: y1 - y0, r }, z0, z1 - z0, style, 2, bevel);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], a[2] ?? 0], P) - k.depthOf([b[0], b[1], b[2] ?? 0], P));
const planeY = (y) => k.sideMatrix([0, y], 0, P, "left"); // local (x, -z)
const planeX = (x) => k.sideMatrix([x, 0], 0, P, "right"); // local (-y, -z)
const rr = (x0, z0, x1, z1, r, steps = 5) =>
  k.pathOf(k.roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps).map(([u, z]) => [u, -z]), true);
const n = (v) => Math.round(v * 100) / 100;
const fy = (y, d) => `<g transform="${planeY(y)}">${d}</g>`;
const fx = (x, d) => `<g transform="${planeX(x)}">${d}</g>`;
const tube = (points, r, opts = {}, tone = "mid") =>
  tubePieces(points, r, P, { maxLength: 400, ...opts }).map((piece) => tubeSvg(piece, { tone })).join("");
let clips = 0;
const clipId = (name) => `dk-${name}-${clips++}`;

// A recessed window in a face at constant y (screen glass, tower window, dial window).
function recess({ x0, x1, z0, z1, r, depth }, y, back = "", backClass = "dk-well", inside = "", { name = "win", rim = "lo" } = {}) {
  const id = clipId(name);
  const ring = k.roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, 5);
  const cx = (x0 + x1) / 2;
  const cz = (z0 + z1) / 2;
  const { sinA } = k.cameraOf(P);
  const tops = [];
  const sides = [[], [], [], []];
  ring.forEach(([ax, az], index) => {
    const [bx, bz] = ring[(index + 1) % ring.length];
    const length = Math.hypot(bx - ax, bz - az) || 1;
    let [nx, nz] = [(bz - az) / length, -(bx - ax) / length];
    if (nx * (cx - (ax + bx) / 2) + nz * (cz - (az + bz) / 2) < 0) [nx, nz] = [-nx, -nz];
    if (nx <= 0 && nz <= 0) return;
    const quad = k.pathOf([at([ax, y, az]), at([bx, y, bz]), at([bx, y - depth, bz]), at([ax, y - depth, az])], true);
    if (nz >= nx) tops.push(quad);
    else sides[Math.min(3, Math.max(0, Math.floor(((nx * -sinA + 1) / 2) * 4)))].push(quad);
  });
  const shape = rr(x0, z0, x1, z1, r);
  return [
    `<clipPath id="${id}"><path transform="${planeY(y)}" d="${shape}"/></clipPath>`,
    `<g clip-path="url(#${id})">`,
    `<path class="iso-top" d="${tops.join("")}"/>`,
    ...sides.map((d, shade) => (d.length ? `<path class="iso-shade" data-shade="${shade}" d="${d.join("")}"/>` : "")),
    `<g transform="${planeY(y - depth)}"><path class="${backClass}" d="${shape}"/>${back}</g>`,
    inside,
    `</g>`,
    `<g transform="${planeY(y)}"><path class="iso-line" data-tone="${rim}" d="${shape}"/></g>`,
  ].join("");
}

// ─── Floor and wall ────────────────────────────────────────────────────────
function room() {
  const out = [];
  out.push(`<path class="iso-halo dk-room-halo" d="${k.haloOf(FLOOR, -FLOOR_H, FLOOR_H, P)}"/>`);
  // floor slab with plank joints running parallel to the wall, edge to edge
  const planks = [];
  const joints = [];
  for (let y = 22, i = 0; y < FLOOR.y + FLOOR.d - 4; y += 26, i++) {
    planks.push(k.lineOnTop([FLOOR.x, y], [FLOOR.x + FLOOR.w, y], 0, P));
    for (let x = FLOOR.x + 40 + ((i * 67) % 120); x < FLOOR.x + FLOOR.w - 8; x += 150) {
      joints.push(k.lineOnTop([x, y], [x, Math.min(y + 26, FLOOR.y + FLOOR.d)], 0, P));
    }
  }
  out.push(S(k.slabOf(FLOOR, -FLOOR_H, FLOOR_H, P, 2, 0.8), { tone: "lo", inner: "" }));
  out.push(L(planks.join("") + joints.join(""), { tone: "faint" }));
  // the floor's cut face shows its layers: board on screed
  out.push(L(k.sideSeam(FLOOR, -2.4, P, 2), { tone: "faint" }));
  // wall
  out.push(S(k.slabOf(WALL, 0, WALL_TOP, P, 2, 0.8), { tone: "lo" }));
  out.push(L(k.segment([WALL.x, WALL.y + WALL.d, WALL_TOP], [WALL.x, WALL.y + WALL.d, 0], P), { tone: "faint" }));
  // plaster skim line on the cut edge
  out.push(L(k.segment([WALL.x, -2, WALL_TOP], [WALL.x, -2, 0], P), { tone: "faint" }));
  // skirting board
  out.push(S(k.slabOf({ x: WALL.x, y: 0, w: WALL.w, d: 2.4, r: 0 }, 0, SKIRT_H, P, 2, 0.5), { tone: "lo", crease: "faint" }));
  out.push(L(k.sideSeam({ x: WALL.x, y: 0, w: WALL.w, d: 2.4, r: 0 }, SKIRT_H - 2.2, P, 2), { tone: "faint" }));
  // wall socket for the power strip, on the wall just above the skirting
  const plate = { x: -66, y: 0, w: 16, d: 1, r: 1.2 };
  out.push(slab(plate, 13, 18, { tone: "lo", crease: "faint" }, 3, 0.3));
  out.push(fy(1, `<circle class="dk-hole" cx="-58" cy="-22" r="3.3"/><circle class="iso-line" data-tone="lo" cx="-58" cy="-22" r="3.3" fill="none"/>`));
  out.push(D([at([-58, 1, 29]), at([-58, 1, 15])], { size: 0.45 }));
  return out.join("");
}

// ─── Cables (behind and under the desk) ────────────────────────────────────
const STRIP = { x: -40, y: 2.5, w: 62, d: 10, r: 2.4 };
const STRIP_H = 4.2;
const SOCKETS = [-28, -14, 0, 14];
function powerStrip() {
  const out = [];
  out.push(`<path class="iso-halo" d="${k.haloOf(STRIP, 0, 2, P)}"/>`);
  out.push(slab(STRIP, 0, STRIP_H, { tone: "mid" }, 4, 0.5));
  for (const x of SOCKETS) {
    out.push(L(k.ring(x, STRIP.y + STRIP.d / 2, 3, STRIP_H, P, 20), { tone: "lo" }));
    out.push(D([at([x - 1, STRIP.y + STRIP.d / 2, STRIP_H]), at([x + 1, STRIP.y + STRIP.d / 2, STRIP_H])], { size: 0.38, tone: "mid" }));
  }
  // rocker switch at the end
  out.push(box(STRIP.x + STRIP.w - 7, STRIP.y + 2.5, STRIP_H, STRIP.x + STRIP.w - 3, STRIP.y + STRIP.d - 2.5, STRIP_H + 1.4, { tone: "mid" }));
  return out.join("");
}

// plug on a socket, a cable rising from its back
function plug(x) {
  const y = STRIP.y + STRIP.d / 2;
  return slab({ x: x - 3.2, y: y - 3, w: 6.4, d: 6, r: 1.4 }, STRIP_H, 5.2, { tone: "mid" }, 3, 0.35);
}

const MON_CABLE = G.fillet(
  [
    [-14, y(STRIP.y + STRIP.d / 2), STRIP_H + 5.2],
    [-14, 6, STRIP_H + 12],
    [-14, 6, DESK_Z - 4],
    [-6, 6, DESK_Z + 10],
    [-2, 26, DESK_Z + 13],
    [-2, 30, DESK_Z + 13],
  ],
  4,
  8,
);
const PC_CABLE = G.fillet(
  [
    [0, y(STRIP.y + STRIP.d / 2), STRIP_H + 5.2],
    [0, 6, STRIP_H + 14],
    [40, 6, STRIP_H + 14],
    [104, 6, 30],
    [104, 6, DESK_Z - 2],
    [104, 8, DESK_Z + 0.9],
    [104, 36, DESK_Z + 0.9],
    [TOWER.x - 0.2, 40, DESK_Z + 7],
  ],
  4,
  8,
);
const STRIP_CORD = G.fillet(
  [
    [STRIP.x, STRIP.y + STRIP.d / 2, 2],
    [-50, 7, 2],
    [-58, 4.5, 6],
    [-58, 3.6, 14],
  ],
  3,
  8,
);
function y(v) {
  return v;
}
const below = (points) => points.filter((p) => p[2] <= DESK_Z + 0.4);
const above = (points, from = DESK_Z - 0.6) => points.filter((p) => p[2] >= from);

function underCables() {
  const out = [];
  out.push(tube(STRIP_CORD, 0.95, { caps: [true, false] }));
  out.push(powerStrip());
  out.push(tube(below(MON_CABLE), 0.95, { caps: [false, false] }));
  out.push(tube(below(PC_CABLE), 1.05, { caps: [false, false] }));
  out.push(plug(-14), plug(0));
  // wall plug that the strip cord ends in
  out.push(slab({ x: -61.5, y: 1, w: 7, d: 4.2, r: 1.6 }, 17.5, 8, { tone: "mid" }, 3, 0.3));
  return out.join("");
}

// ─── Desk ──────────────────────────────────────────────────────────────────
function legFrame(x) {
  const out = [];
  const w = 6;
  const x0 = x - w / 2;
  // glides
  for (const yy of byDepth([[x, POST_Y[0] - 2], [x, POST_Y[1] + 2]])) out.push(S(k.cylinder(yy[0], yy[1], 2.4, 0, 1.4, P, 16), { tone: "lo" }));
  // foot bar
  out.push(box(x0, POST_Y[0] - 6, 1.4, x0 + w, POST_Y[1] + 6, 6.8, { tone: "mid" }, 0.4, 1.2));
  // back post, top rail, front post
  out.push(box(x0, POST_Y[0] - 3, 6.8, x0 + w, POST_Y[0] + 3, DESK_Z - DESK_T - 6, { tone: "mid" }, 0.3, 0.8));
  out.push(box(x0, POST_Y[0] - 6, DESK_Z - DESK_T - 6, x0 + w, POST_Y[1] + 6, DESK_Z - DESK_T, { tone: "mid" }, 0.4, 0.8));
  out.push(box(x0, POST_Y[1] - 3, 6.8, x0 + w, POST_Y[1] + 3, DESK_Z - DESK_T - 6, { tone: "mid" }, 0.3, 0.8));
  // weld seams where posts meet the bars, and two bolts on each rail end
  out.push(L(k.sideSeam({ x: x0, y: POST_Y[1] - 3, w, d: 6, r: 0.8 }, 8.2, P, 2), { tone: "faint" }));
  out.push(D(k.pointsAt([[x0 + w, POST_Y[0], DESK_Z - DESK_T - 3], [x0 + w, POST_Y[1], DESK_Z - DESK_T - 3]], P), { size: 0.45 }));
  return out.join("");
}

function crossbeam() {
  return box(LEG_X[0] + 3, 18, DESK_Z - DESK_T - 14, LEG_X[1] - 3, 23, DESK_Z - DESK_T - 6, { tone: "mid" }, 0.3, 0.6);
}

function deskTop() {
  const out = [];
  const z0 = DESK_Z - DESK_T;
  const band = k.sideSeam(DESK, z0 + 1.2, P, 4);
  out.push(S(k.slabOf(DESK, z0, DESK_T, P, 4, 1.2), { tone: "mid", inner: L(band, { tone: "faint" }) }));
  // panel joint: across the top, edge to edge, and down the front edge
  const seamX = -108;
  out.push(L(k.lineOnTop([seamX, DESK.y], [seamX, DESK_FRONT], DESK_Z, P) + k.segment([seamX, DESK_FRONT, DESK_Z], [seamX, DESK_FRONT, z0], P), { tone: "faint" }));
  // cable grommet near the back edge
  out.push(L(k.ring(30, 17, 3.4, DESK_Z, P, 24), { tone: "lo" }));
  out.push(`<path class="dk-hole" d="${k.onTop(k.circleRing(30, 17, 2.6, 24), DESK_Z, P, true)}"/>`);
  return out.join("");
}

// ─── Monitor ───────────────────────────────────────────────────────────────
// The screen content is drawn flat in the plane of the glass, in local
// coordinates (x, -z), and clipped to the glass.
const SC = { x0: SCREEN.x0, x1: SCREEN.x1, top: -SCREEN.z1, bottom: -SCREEN.z0 };
const SW = SC.x1 - SC.x0;
const SH = SC.bottom - SC.top;

// The file on screen: long, working, and not to be touched.
const CODE = `// NOTE: it works. Nobody knows why. DO NOT TOUCH.
package id.fkzn.app

@Composable
fun HomeScreen(vm: HomeViewModel = hiltViewModel()) {
    val state by vm.state.collectAsStateWithLifecycle()
    LaunchedEffect(Unit) { vm.load() }
    Scaffold(topBar = { TopBar(title = "Home") }) { pad ->
        when (val s = state) {
            is UiState.Loading -> Loader(Modifier.padding(pad))
            is UiState.Error -> ErrorView(s.message) { vm.retry() }
            is UiState.Ready -> LazyColumn(contentPadding = pad) {
                items(s.items, key = { it.id }) { item ->
                    ItemCard(item, onClick = { vm.open(item) })
                }
            }
        }
    }
}

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val repo: ItemRepository,
    private val ai: AssistantClient,
) : ViewModel() {
    private val _state = MutableStateFlow<UiState>(UiState.Loading)
    val state = _state.asStateFlow()

    fun load() = viewModelScope.launch {
        _state.value = runCatching { repo.items() }
            .fold({ UiState.Ready(it) }, { UiState.Error(it.message) })
    }

    fun retry() = load()

    // summary comes from the LLM, cached so we never pay twice
    fun open(item: Item) = viewModelScope.launch {
        val summary = item.summary ?: ai.summarize(item.body, maxTokens = 256)
        repo.save(item.copy(summary = summary))
    }
}

// TODO: refactor (2023)`.split("\n");
const CODE_FONT = 2.75;
const CODE_LH = 4.3;
const BAR_H = 4.6; // title bar
const TERM_H = 7.4; // terminal strip
const STATUS_H = 3.6; // status bar
const EDIT = { x0: SC.x0 + 0.8, x1: SC.x1 - 9.6, top: SC.top + BAR_H + 7.2, bottom: SC.bottom - TERM_H - STATUS_H - 0.6 };
const CODE_SPAN = CODE.length * CODE_LH + 6; // one pass of the file, with a gap before it repeats

const kindOf = (line) => {
  const t = line.trim();
  if (t.startsWith("//")) return "c";
  if (/^(@|fun |class |package |private |val |\) :)/.test(t)) return "k";
  return /"/.test(t) ? "s" : "p";
};
const esc = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function codeLines(offset, lineNo = true) {
  return CODE.map((text, i) => {
    const yy = offset + i * CODE_LH;
    const kind = kindOf(text);
    return (
      (lineNo ? `<text class="dk-gutter" x="${n(EDIT.x0 + 6)}" y="${n(yy)}" font-size="${n(CODE_FONT * 0.86)}" text-anchor="end">${i + 1}</text>` : "") +
      (text ? `<text class="dk-code" data-kind="${kind}" x="${n(EDIT.x0 + 8.4)}" y="${n(yy)}" font-size="${CODE_FONT}" xml:space="preserve">${esc(text)}</text>` : "")
    );
  }).join("");
}

function screenContent() {
  const x0 = SC.x0;
  const top = SC.top;
  const out = [];
  out.push(`<rect class="dk-scr-bg" x="${n(x0)}" y="${n(top)}" width="${n(SW)}" height="${n(SH)}"/>`);
  out.push(`<g class="dk-scr-on" data-part="scr-on">`);
  out.push(`<rect class="dk-scr-glow" x="${n(x0)}" y="${n(top)}" width="${n(SW)}" height="${n(SH)}"/>`);
  out.push(`<g data-part="shake">`);
  // title bar with window dots and the open tab
  out.push(`<rect class="dk-scr-bar" x="${n(x0)}" y="${n(top)}" width="${n(SW)}" height="${BAR_H}"/>`);
  out.push([4, 7, 10].map((dx) => `<circle class="dk-scr-dot" cx="${n(x0 + dx)}" cy="${n(top + BAR_H / 2)}" r="0.9"/>`).join(""));
  out.push(`<rect class="dk-tab" x="${n(EDIT.x0 + 1)}" y="${n(top + BAR_H + 0.8)}" width="25" height="4.2" rx="0.6"/>`);
  out.push(`<text class="dk-code-tab" x="${n(EDIT.x0 + 2.8)}" y="${n(top + BAR_H + 4)}" font-size="2.6">HomeScreen.kt</text>`);
  out.push(`<rect class="dk-tab-dim" x="${n(EDIT.x0 + 27)}" y="${n(top + BAR_H + 0.8)}" width="21" height="4.2" rx="0.6"/>`);
  out.push(`<text class="dk-code-tab dk-dim-text" x="${n(EDIT.x0 + 28.8)}" y="${n(top + BAR_H + 4)}" font-size="2.6">Legacy.kt</text>`);
  // the code: two copies stacked so the scroll can wrap without a seam
  const clip = "dk-code-clip";
  out.push(`<clipPath id="${clip}"><rect x="${n(EDIT.x0)}" y="${n(EDIT.top - 0.4)}" width="${n(EDIT.x1 - EDIT.x0)}" height="${n(EDIT.bottom - EDIT.top + 0.4)}"/></clipPath>`);
  out.push(`<g clip-path="url(#${clip})"><g data-part="code" data-span="${n(CODE_SPAN)}">`);
  out.push(codeLines(EDIT.top + CODE_LH) + codeLines(EDIT.top + CODE_LH + CODE_SPAN));
  out.push(`</g></g>`);
  // minimap with a viewport marker
  const mx = SC.x1 - 8.4;
  const mTop = EDIT.top;
  const mScale = (EDIT.bottom - EDIT.top) / (CODE.length + 2);
  out.push(CODE.map((text, i) => {
    const indent = text.length - text.trimStart().length;
    const w = Math.min(6.4, text.trim().length * 0.12);
    return w ? `<rect class="dk-mini" x="${n(mx + indent * 0.12)}" y="${n(mTop + i * mScale)}" width="${n(w)}" height="${n(mScale * 0.55)}"/>` : "";
  }).join(""));
  out.push(`<rect class="dk-mini-view" data-part="mini-view" data-scale="${n(mScale / CODE_LH)}" x="${n(mx - 0.6)}" y="${n(mTop)}" width="7.8" height="${n(((EDIT.bottom - EDIT.top) / CODE_LH) * mScale)}"/>`);
  // terminal strip, where the physical keyboard types
  const ty = SC.bottom - STATUS_H - TERM_H;
  out.push(`<rect class="dk-pane" x="${n(x0)}" y="${n(ty)}" width="${n(SW)}" height="${n(TERM_H)}"/>`);
  out.push(`<line class="dk-rule" x1="${n(x0)}" x2="${n(SC.x1)}" y1="${n(ty)}" y2="${n(ty)}"/>`);
  out.push(`<text class="dk-term" x="${n(x0 + 3)}" y="${n(ty + 4.9)}" font-size="3.4"><tspan class="dk-term-dim">~ $ </tspan><tspan data-part="typed"></tspan></text>`);
  out.push(`<rect class="dk-cursor" data-part="cursor" x="${n(x0 + 10)}" y="${n(ty + 2)}" width="1.8" height="3.6"/>`);
  // status bar
  const sy = SC.bottom - STATUS_H;
  out.push(`<rect class="dk-status" x="${n(x0)}" y="${n(sy)}" width="${n(SW)}" height="${STATUS_H}"/>`);
  out.push(`<circle class="dk-status-dot" data-part="status-dot" cx="${n(x0 + 3)}" cy="${n(sy + STATUS_H / 2)}" r="0.9"/>`);
  out.push(`<text class="dk-status-text" data-part="status" x="${n(x0 + 5.2)}" y="${n(sy + 2.6)}" font-size="2.4">main · Build OK</text>`);
  out.push(`<text class="dk-status-text" x="${n(SC.x1 - 2)}" y="${n(sy + 2.6)}" font-size="2.4" text-anchor="end">Kotlin · UTF-8</text>`);
  out.push(`</g>`);
  // the crash: a dialog over the code, then a rebuild bar
  const dw = 92;
  const dh = 40;
  const dx = x0 + (SW - dw) / 2;
  const dy = top + (SH - dh) / 2 - 3;
  out.push(`<g data-part="crash" opacity="0">`);
  out.push(`<rect class="dk-crash-dim" x="${n(x0)}" y="${n(top)}" width="${n(SW)}" height="${n(SH)}"/>`);
  out.push(`<rect class="dk-crash" x="${n(dx)}" y="${n(dy)}" width="${dw}" height="${dh}" rx="1.4"/>`);
  out.push(`<rect class="dk-crash-head" x="${n(dx)}" y="${n(dy)}" width="${dw}" height="6.4" rx="1.4"/>`);
  out.push(`<text class="dk-crash-title" x="${n(dx + 4)}" y="${n(dy + 4.5)}" font-size="3.2">FATAL EXCEPTION: main</text>`);
  out.push(`<text class="dk-crash-text" x="${n(dx + 4)}" y="${n(dy + 12)}" font-size="2.9">IllegalStateException:</text>`);
  out.push(`<text class="dk-crash-text dk-crash-strong" x="${n(dx + 4)}" y="${n(dy + 16.6)}" font-size="2.9">someone touched the code.</text>`);
  [0.82, 0.7, 0.76, 0.58].forEach((w, i) => out.push(`<rect class="dk-crash-line" x="${n(dx + 7)}" y="${n(dy + 21 + i * 3)}" width="${n((dw - 14) * w)}" height="1.2" rx="0.6"/>`));
  out.push(`<g data-part="rebuild" opacity="0">`);
  out.push(`<text class="dk-crash-text" x="${n(dx + 4)}" y="${n(dy + dh - 4.6)}" font-size="2.6">Rebuilding…</text>`);
  out.push(`<rect class="dk-bar-track" x="${n(dx + 24)}" y="${n(dy + dh - 6.2)}" width="${n(dw - 28)}" height="1.8" rx="0.9"/>`);
  out.push(`<rect class="dk-bar-fill" data-part="rebuild-bar" data-w="${n(dw - 28)}" x="${n(dx + 24)}" y="${n(dy + dh - 6.2)}" width="0" height="1.8" rx="0.9"/>`);
  out.push(`</g>`);
  out.push(`</g>`);
  out.push(`</g>`);
  // reflection on the glass, always on top
  out.push(`<path class="dk-sheen" d="M${n(x0 + SW * 0.52)} ${n(top)}L${n(x0 + SW * 0.7)} ${n(top)}L${n(x0 + SW * 0.42)} ${n(SC.bottom)}L${n(x0 + SW * 0.24)} ${n(SC.bottom)}Z"/>`);
  return out.join("");
}

function monitor() {
  const out = [];
  // base plate with a soft pad underneath
  out.push(`<path class="iso-halo" d="${k.haloOf(MON_BASE, DESK_Z, 2, P)}"/>`);
  out.push(slab(MON_BASE, DESK_Z, 2.6, { tone: "mid", lit: true }, 6, 0.7));
  out.push(L(k.planOutline(k.insetPlan(MON_BASE, 3.2), DESK_Z + 2.6, P, 6), { tone: "faint" }));
  // neck: a slotted column with a cable hole, a hinge block at the top
  const neck = { x: -7, y: 30, w: 14, d: 6.5, r: 1.6 };
  out.push(slab({ x: -9, y: 28.5, w: 18, d: 9.5, r: 2 }, DESK_Z + 2.6, 2.4, { tone: "mid", lit: true }, 3, 0.4));
  out.push(slab(neck, DESK_Z + 5, 86, { tone: "mid", lit: true }, 3, 0.5));
  out.push(fy(neck.y + neck.d, `<path class="iso-line" data-tone="faint" d="${rr(-2.4, DESK_Z + 14, 2.4, DESK_Z + 24, 2.4)}"/>`));
  out.push(slab({ x: -11, y: neck.y + neck.d, w: 22, d: 7.5, r: 1.2 }, 192, 12, { tone: "mid", lit: true }, 2, 0.4));
  out.push(D(k.pointsAt([[-11, neck.y + neck.d + 3.7, 200], [-11, neck.y + neck.d + 3.7, 196]], P), { size: 0.4 }));
  // back housing behind the panel
  out.push(slab({ x: -46, y: neck.y + neck.d + 7.5 - 0.1, w: 92, d: MON.y - (neck.y + neck.d + 7.4), r: 3 }, 160, 64, { tone: "mid", lit: true }, 4, 0.5));
  // the panel
  const panel = { x: MON.x0, y: MON.y, w: MON.x1 - MON.x0, d: MON.d, r: 0.9 };
  // chin: a seam under the glass that wraps the panel's corners, and the power light dot
  out.push(S(k.slabOf(panel, MON.z0, MON.z1 - MON.z0, P, 2, 0.5), { tone: "hi", lit: true, inner: L(k.sideSeam(panel, SCREEN.z0 - 1.6, P, 2), { tone: "faint" }) }));
  out.push(D([at([MON.x1 - 5, MON_FRONT, MON.z0 + 2.4])], { size: 0.5, tone: "mid" }));
  out.push(recess(SCREEN, MON_FRONT, "", "dk-glass", fy(SCREEN_Y, screenContent()), { name: "screen", rim: "hi" }));
  return out.join("");
}

function monitorCable() {
  return tube(above(MON_CABLE), 0.95, { caps: [false, false] });
}

// ─── Keyboard ──────────────────────────────────────────────────────────────
const ROWS = [
  [["Escape", 1], [null, 0.5], ["F1", 1], ["F2", 1], ["F3", 1], ["F4", 1], [null, 0.5], ["F5", 1], ["F6", 1], ["F7", 1], ["F8", 1], [null, 0.5], ["F9", 1], ["F10", 1], ["F11", 1], ["F12", 1]],
  [["`", 1], ["1", 1], ["2", 1], ["3", 1], ["4", 1], ["5", 1], ["6", 1], ["7", 1], ["8", 1], ["9", 1], ["0", 1], ["-", 1], ["=", 1], ["Backspace", 2], ["Home", 1]],
  [["Tab", 1.5], ["q", 1], ["w", 1], ["e", 1], ["r", 1], ["t", 1], ["y", 1], ["u", 1], ["i", 1], ["o", 1], ["p", 1], ["[", 1], ["]", 1], ["\\", 1.5], ["PageUp", 1]],
  [["CapsLock", 1.75], ["a", 1], ["s", 1], ["d", 1], ["f", 1], ["g", 1], ["h", 1], ["j", 1], ["k", 1], ["l", 1], [";", 1], ["'", 1], ["Enter", 2.25], ["PageDown", 1]],
  [["Shift", 2.25], ["z", 1], ["x", 1], ["c", 1], ["v", 1], ["b", 1], ["n", 1], ["m", 1], [",", 1], [".", 1], ["/", 1], ["ShiftRight", 1.75], ["ArrowUp", 1], ["End", 1]],
  [["Control", 1.25], ["Meta", 1.25], ["Alt", 1.25], [" ", 6.25], ["AltRight", 1], ["Fn", 1], ["ControlRight", 1], [null, 0.5], ["ArrowLeft", 1], ["ArrowDown", 1], ["ArrowRight", 1]],
];
const ROW_H = [3.4, 3.9, 3.6, 3.3, 3.2, 3.4]; // sculpted profile
const keyList = [];
function keyboard() {
  const out = [];
  const z = DESK_Z;
  out.push(`<path class="iso-halo" d="${k.haloOf(KB, z, 3, P)}"/>`);
  for (const [x, yy] of byDepth(k.corners(KB, 7))) out.push(S(k.cylinder(x, yy, 2.2, z, KB_Z, P, 14), { tone: "lo" }));
  // case: low bottom shell and a slightly inset top frame with a seam between
  out.push(S(k.slabOf(KB, z + KB_Z, KB_TOP - KB_Z, P, 4, 0.8), { tone: "mid", inner: L(k.sideSeam(KB, z + KB_Z + 2.2, P, 4), { tone: "faint" }) }));
  const plate = { x: KEYS_X - 1.1, y: KEYS_Y - 1.1, w: KU * 15.5 + 2.2, d: KU * 6 + 2.2, r: 1.2 };
  out.push(`<path class="dk-plate" d="${k.onTop(k.roundedPlan(plate, 3), z + KB_TOP, P, true)}"/>`);
  out.push(L(k.planOutline(plate, z + KB_TOP, P, 3), { tone: "lo" }));
  // screws on the top frame
  out.push(D(k.pointsAt([[KB.x + 2.8, KB.y + 2.4, z + KB_TOP], [KB.x + KB.w - 2.8, KB.y + 2.4, z + KB_TOP], [KB.x + 2.8, KB.y + KB.d - 2.4, z + KB_TOP], [KB.x + KB.w - 2.8, KB.y + KB.d - 2.4, z + KB_TOP]], P), { size: 0.4 }));
  const zPlate = z + KB_TOP;
  ROWS.forEach((row, r) => {
    let x = KEYS_X;
    for (const [code, width] of row) {
      if (!code) {
        x += width * KU;
        continue;
      }
      const plan = { x: x + 0.55, y: KEYS_Y + r * KU + 0.55, w: width * KU - 1.1, d: KU - 1.1, r: 0.9 };
      const h = ROW_H[r];
      const index = keyList.length;
      keyList.push(code);
      const extra = [];
      if (code === " ") {
        // stabilizer: two housings on the plate and the wire in front of them, under the cap's front edge
        const wy = plan.y + plan.d - 0.3;
        extra.push(box(plan.x + 3, plan.y + 1.2, zPlate, plan.x + 6, plan.y + plan.d - 1.2, zPlate + 1.2, { tone: "lo" }));
        extra.push(box(plan.x + plan.w - 6, plan.y + 1.2, zPlate, plan.x + plan.w - 3, plan.y + plan.d - 1.2, zPlate + 1.2, { tone: "lo" }));
        extra.push(L(k.onTop([[plan.x + 4.5, wy - 2], [plan.x + 4.5, wy], [plan.x + plan.w - 4.5, wy], [plan.x + plan.w - 4.5, wy - 2]], zPlate + 0.5, P), { tone: "mid" }));
      }
      const top = k.insetPlan(plan, Math.min(1.1, plan.d * 0.2));
      out.push(extra.join(""));
      out.push(
        `<g class="dk-key" data-key="${index}">${S(k.slabOf(plan, zPlate, h, P, 2, 0.3), { tone: "mid", crease: "faint" })}${L(k.planOutline(top, zPlate + h, P, 2), { tone: "faint" })}</g>`,
      );
      x += width * KU;
    }
  });
  return out.join("");
}

const KB_CABLE = G.fillet(
  [
    [-40, KB.y, DESK_Z + 3],
    [-40, KB.y - 6, DESK_Z + 1],
    [-40, 17, DESK_Z + 1],
    [60, 17, DESK_Z + 1],
    [100, 20, DESK_Z + 1],
    [TOWER.x - 0.2, 52, DESK_Z + 9],
  ],
  6,
  8,
);
function keyboardCable() {
  return tube(KB_CABLE, 0.8, { caps: [false, false] });
}

// ─── Mouse pad and mouse ───────────────────────────────────────────────────
function mousePad() {
  const out = [];
  out.push(slab(PAD, DESK_Z, PAD_T, { tone: "lo", crease: "lo" }, 6, 0));
  // stitched edge: a dotted line running round the whole top, 1.6 in
  out.push(L(k.planOutline(k.insetPlan(PAD, 1.4), DESK_Z + PAD_T, P, 6), { tone: "mid", dotted: true }));
  return out.join("");
}
const MOUSE = { x: 102, y: 102, len: 19, r: 5.4 };
function mouse() {
  const out = [];
  const z = DESK_Z + PAD_T;
  const base = { x: MOUSE.x - 5.2, y: MOUSE.y - MOUSE.len / 2 + 0.6, w: 10.4, d: MOUSE.len - 1.2, r: 5 };
  out.push(`<path class="iso-halo" d="${k.haloOf(base, z, 1, P)}"/>`);
  out.push(slab(base, z, 1.1, { tone: "lo" }, 6));
  const F = G.frameOf([MOUSE.x, MOUSE.y - MOUSE.len / 2, z + 1.1 + 1.2], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
  const prof = [];
  const L0 = MOUSE.len;
  for (let i = 0; i <= 18; i++) {
    const s = (i / 18) * L0;
    const t = (s - L0 * 0.56) / (s < L0 * 0.56 ? L0 * 0.56 : L0 * 0.44);
    prof.push([s, n(MOUSE.r * Math.sqrt(Math.max(0, 1 - t * t)) + 0.001), 1]);
  }
  const body = G.solidOf(prof, F, P);
  // button split and the scroll wheel
  const ridge = [];
  for (let i = 9; i <= 18; i++) {
    const s = (i / 18) * L0;
    const t = (s - L0 * 0.56) / (L0 * 0.44);
    ridge.push([MOUSE.x, F.o[1] + s, F.o[2] + MOUSE.r * Math.sqrt(Math.max(0, 1 - t * t))]);
  }
  out.push(S(body, { tone: "mid", inner: L(k.pathOf(ridge.slice(0, -1).map(at)), { tone: "faint", free: true }) }));
  const wy = F.o[1] + L0 * 0.74;
  const wz = F.o[2] + MOUSE.r * Math.sqrt(1 - ((L0 * 0.18) / (L0 * 0.44)) ** 2);
  out.push(S(G.disc(-0.8, 0.8, 1.5, G.frameAlong([MOUSE.x, wy, wz - 0.3], [1, 0, 0]), P), { tone: "mid" }));
  return out.join("");
}

// ─── PC tower ──────────────────────────────────────────────────────────────
const FAN_FRONT = { y: TOWER.y + TOWER.d / 2, z: TOWER_Z0 + TOWER_H * 0.6, r: 12.5 };
const FAN_REAR = { x: TOWER.x + 3.6, y: TOWER.y + 13, z: GLASS.z1 - 15, r: 9 };
function fanBlades(r, count = 7) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const a0 = (i / count) * Math.PI * 2;
    const p = (rad, a) => [rad * Math.cos(a), rad * Math.sin(a)];
    const hub = r * 0.32;
    const [ax, ay] = p(hub, a0);
    const [bx, by] = p(r * 0.94, a0 + 0.28);
    const [cx, cy] = p(r * 0.94, a0 + 0.78);
    const [dx, dy] = p(hub, a0 + 0.62);
    out.push(`M${n(ax)} ${n(ay)}Q${n(r * 0.7 * Math.cos(a0 + 0.02))} ${n(r * 0.7 * Math.sin(a0 + 0.02))} ${n(bx)} ${n(by)}A${n(r * 0.94)} ${n(r * 0.94)} 0 0 1 ${n(cx)} ${n(cy)}Q${n(r * 0.6 * Math.cos(a0 + 0.62))} ${n(r * 0.6 * Math.sin(a0 + 0.62))} ${n(dx)} ${n(dy)}Z`);
  }
  return out.join("");
}
function fanSvg(cx, cy, r, part) {
  // in a face plane; the rotor group spins about (cx, cy)
  return [
    `<rect class="dk-fan-frame" x="${n(cx - r - 1.6)}" y="${n(cy - r - 1.6)}" width="${n(2 * r + 3.2)}" height="${n(2 * r + 3.2)}" rx="2"/>`,
    `<circle class="dk-fan-well" cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}"/>`,
    `<g transform="translate(${n(cx)} ${n(cy)})"><g data-part="${part}"><path class="dk-blade" d="${fanBlades(r)}"/></g></g>`,
    `<circle class="dk-hub" cx="${n(cx)}" cy="${n(cy)}" r="${n(r * 0.32)}"/>`,
    `<circle class="iso-line" data-tone="faint" fill="none" cx="${n(cx)}" cy="${n(cy)}" r="${n(r * 0.16)}"/>`,
    `<circle class="iso-line" data-tone="lo" fill="none" cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}"/>`,
    ...[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy]) => `<circle class="dk-screw" cx="${n(cx + sx * (r - 0.2))}" cy="${n(cy + sy * (r - 0.2))}" r="0.55"/>`),
  ].join("");
}

function towerInterior() {
  // parts inside the case, seen through the side glass. The back plane (y = TOWER.y + 4)
  // is the motherboard tray.
  const out = [];
  const yb = TOWER_FRONT - GLASS.depth; // motherboard surface
  const z0 = TOWER_Z0;
  // motherboard: an outline with a socket, slots and traces, drawn in its plane
  const mb = [];
  const mbx0 = TOWER.x + 12;
  const mbx1 = TOWER_NOSE - 13;
  const mbz0 = z0 + 20;
  const mbz1 = GLASS.z1 - 2;
  mb.push(`<path class="dk-board" d="${rr(mbx0, mbz0, mbx1, mbz1, 1)}"/>`);
  mb.push(`<path class="iso-line" data-tone="lo" d="${rr(mbx0, mbz0, mbx1, mbz1, 1)}"/>`);
  // traces end on pads
  for (let i = 0; i < 5; i++) {
    const zz = mbz0 + 4 + i * 2;
    mb.push(`<path class="iso-line" data-tone="faint" d="M${n(mbx0 + 2)} ${n(-zz)}H${n(mbx0 + 12 + i * 2)}"/>`);
    mb.push(`<circle class="dk-pad" cx="${n(mbx0 + 2)}" cy="${n(-zz)}" r="0.5"/><circle class="dk-pad" cx="${n(mbx0 + 12 + i * 2)}" cy="${n(-zz)}" r="0.5"/>`);
  }
  // mounting screws
  for (const [xx, zz] of [[mbx0 + 2, mbz1 - 2], [mbx1 - 2, mbz1 - 2], [mbx0 + 2, mbz0 + 2], [mbx1 - 2, mbz0 + 2]]) mb.push(`<circle class="dk-screw" cx="${n(xx)}" cy="${n(-zz)}" r="0.6"/>`);
  out.push(fy(yb, mb.join("")));
  // rear exhaust fan on the inside of the back panel (x plane)
  out.push(fx(FAN_REAR.x, fanSvg(-FAN_REAR.y, -FAN_REAR.z, FAN_REAR.r, "fan-rear")));
  // RAM sticks
  for (const xx of [mbx1 - 9, mbx1 - 6.4]) out.push(box(xx, yb, mbz1 - 30, xx + 1.4, yb + 6.2, mbz1 - 6, { tone: "mid" }, 0, 0.2));
  // CPU cooler: a fin tower on a base, with a heat pipe cap row
  const cx0 = mbx0 + 15;
  out.push(box(cx0 - 1, yb, mbz1 - 26, cx0 + 15, yb + 1.6, mbz1 - 10, { tone: "lo" }));
  out.push(
    S(k.slabOf({ x: cx0, y: yb + 1.6, w: 14, d: 15, r: 0.6 }, mbz1 - 27, 18, P, 2, 0.3), {
      tone: "mid",
      inner: L(Array.from({ length: 7 }, (_, i) => k.sideSeam({ x: cx0, y: yb + 1.6, w: 14, d: 15, r: 0.6 }, mbz1 - 25 + i * 2.3, P, 2)).join(""), { tone: "faint" }),
    }),
  );
  out.push(D(k.pointsAt([0, 1, 2, 3].map((i) => [cx0 + 3 + i * 2.7, yb + 9, mbz1 - 9]), P), { size: 0.5, tone: "mid" }));
  // graphics card: a long shroud along x, standing out from the board
  const gz = mbz0 + 2;
  out.push(box(mbx0 - 3, yb, gz, mbx1 + 1, yb + 2, gz + 9, { tone: "lo" }));
  out.push(
    S(k.slabOf({ x: mbx0 - 3, y: yb + 2, w: mbx1 + 4 - mbx0, d: 15, r: 1 }, gz - 1, 8, P, 3, 0.4), {
      tone: "mid",
      inner: L(k.sideSeam({ x: mbx0 - 3, y: yb + 2, w: mbx1 + 4 - mbx0, d: 15, r: 1 }, gz + 2.4, P, 3), { tone: "faint" }),
    }),
  );
  // the card's front edge: a row of closed vent slots and the bracket screw
  out.push(fy(yb + 17, Array.from({ length: 9 }, (_, i) => `<path class="iso-line" data-tone="lo" d="${rr(mbx0 + 2 + i * 3.4, gz + 2.6, mbx0 + 3.6 + i * 3.4, gz + 5.6, 0.8)}"/>`).join("") + `<circle class="dk-screw" cx="${n(mbx1 - 2)}" cy="${n(-(gz + 3.5))}" r="0.6"/>`));
  // power supply shroud along the floor of the case
  out.push(
    S(k.slabOf({ x: TOWER.x + 3, y: yb, w: TOWER.w - 6, d: GLASS.depth - 1, r: 0.6 }, z0 + 3, 13, P, 2, 0.4), {
      tone: "mid",
      inner: "",
    }),
  );
  // cable grommets on the shroud top
  for (const gx of [GLASS.x0 + 6, GLASS.x0 + 30]) {
    out.push(`<path class="dk-hole" d="${k.onTop(k.roundedPlan({ x: gx, y: yb + 6, w: 9, d: 5, r: 2.5 }, 4), z0 + 16, P, true)}"/>`);
    out.push(L(k.planOutline({ x: gx, y: yb + 6, w: 9, d: 5, r: 2.5 }, z0 + 16, P, 4), { tone: "lo" }));
  }
  out.push(fy(yb + GLASS.depth - 1, Array.from({ length: 6 }, (_, i) => `<path class="iso-line" data-tone="faint" d="${rr(GLASS.x0 + 4 + i * 4.4, z0 + 7, GLASS.x0 + 5.4 + i * 4.4, z0 + 12, 0.7)}"/>`).join("")));
  return out.join("");
}

function tower() {
  const out = [];
  const z0 = TOWER_Z0;
  out.push(`<path class="iso-halo" d="${k.haloOf(TOWER, DESK_Z, 4, P)}"/>`);
  for (const [x, yy] of byDepth(k.corners(TOWER, 6))) out.push(S(k.cylinder(x, yy, 2.4, DESK_Z, 2.2, P, 16), { tone: "lo" }));
  const shell = k.slabOf(TOWER, z0, TOWER_H, P, 3, 1);
  out.push(S(shell, { tone: "mid", inner: L(k.sideSeam(TOWER, z0 + 2.6, P, 3), { tone: "faint" }) }));
  // top: vent slots (closed outlines) and the power button with its ring
  const slots = [];
  for (let i = 0; i < 9; i++) slots.push(k.planOutline({ x: TOWER.x + 10 + i * 4.2, y: TOWER.y + 8, w: 1.6, d: TOWER.d - 16, r: 0.8 }, z0 + TOWER_H, P, 3));
  out.push(L(slots.join(""), { tone: "lo" }));
  const pb = [TOWER_NOSE - 6, TOWER.y + TOWER.d / 2];
  out.push(L(k.ring(pb[0], pb[1], 2.8, z0 + TOWER_H, P, 20), { tone: "lo" }));
  out.push(S(k.cylinder(pb[0], pb[1], 1.9, z0 + TOWER_H, 0.7, P, 18, 0.2), { tone: "mid" }));
  out.push(D(k.pointsAt([[TOWER_NOSE - 6, TOWER.y + 5, z0 + TOWER_H]], P), { size: 0.45, tone: "mid" }));
  // front panel (x face): a mesh frame with the intake fan behind it
  const yc = FAN_FRONT.y;
  out.push(
    fx(
      TOWER_NOSE,
      [
        `<path class="iso-line" data-tone="faint" d="${rrX(TOWER.y + 3, z0 + 5, TOWER.y + TOWER.d - 3, z0 + TOWER_H - 5, 1.4)}"/>`,
        fanSvg(-yc, -FAN_FRONT.z, FAN_FRONT.r, "fan-front"),
        // lower intake: closed slots
        ...Array.from({ length: 6 }, (_, i) => `<path class="iso-line" data-tone="lo" d="${rrX(TOWER.y + 7 + i * 4.4, z0 + 9, TOWER.y + 8.6 + i * 4.4, z0 + 22, 0.8)}"/>`),
        // two USB ports and an audio jack near the top
        `<path class="dk-port" d="${rrX(TOWER.y + 8, z0 + TOWER_H - 11, TOWER.y + 14, z0 + TOWER_H - 9, 0.3)}"/>`,
        `<path class="dk-port" d="${rrX(TOWER.y + 16, z0 + TOWER_H - 11, TOWER.y + 22, z0 + TOWER_H - 9, 0.3)}"/>`,
        `<circle class="dk-port" cx="${n(-(TOWER.y + 27))}" cy="${n(-(z0 + TOWER_H - 10))}" r="1.1"/>`,
      ].join(""),
    ),
  );
  // side glass window with the interior behind it
  out.push(recess(GLASS, TOWER_FRONT, "", "dk-case-in", `<g class="dk-cavity">${towerInterior()}</g>`, { name: "glass", rim: "lo" }));
  // glass panel: a faint sheen, the standoff screws at its corners
  out.push(
    fy(
      TOWER_FRONT,
      [
        `<clipPath id="dk-glass-sheen"><path d="${rr(GLASS.x0, GLASS.z0, GLASS.x1, GLASS.z1, GLASS.r)}"/></clipPath>`,
        `<g clip-path="url(#dk-glass-sheen)"><path class="dk-sheen" d="M${GLASS.x0 + 26} ${-GLASS.z1}L${GLASS.x0 + 36} ${-GLASS.z1}L${GLASS.x0 + 14} ${-GLASS.z0}L${GLASS.x0 + 4} ${-GLASS.z0}Z"/></g>`,
        ...[[GLASS.x0 - 2.6, GLASS.z1 + 2.6], [GLASS.x1 + 2.6, GLASS.z1 + 2.6], [GLASS.x0 - 2.6, GLASS.z0 - 2.6], [GLASS.x1 + 2.6, GLASS.z0 - 2.6]].map(
          ([xx, zz]) => `<circle class="dk-screw-head" cx="${n(xx)}" cy="${n(-zz)}" r="1.15"/><circle class="iso-line" data-tone="lo" fill="none" cx="${n(xx)}" cy="${n(-zz)}" r="1.15"/>`,
        ),
      ].join(""),
    ),
  );
  return out.join("");
}
// rounded rect in an x-plane, given world y and z ranges (local u = -y)
function rrX(y0, z0, y1, z1, r) {
  return rr(-y1, z0, -y0, z1, r);
}

// ─── Coffee mug ────────────────────────────────────────────────────────────
// Upright on a coaster with steam rising; when knocked it lies on its side and the
// coffee runs out across the desk. Both poses are drawn here; the live code swaps them.
const MUG = { x: -158, y: 52, r: 8.6, h: 19, wall: 0.9 };
const COASTER = { r: 12, h: 0.9 };
const MUG_Z = DESK_Z + COASTER.h;
const FALL = G.unit3([0.32, 1, 0]); // the way it falls: toward the viewer, a little right
const LIE = { o: [MUG.x + FALL[0] * 4, MUG.y + COASTER.r + 1.5, DESK_Z + MUG.r] };
const MOUTH = G.add3(LIE.o, G.mul3(FALL, MUG.h));

const mugProfile = () => [
  [0, MUG.r - 1.1],
  [0.6, MUG.r - 0.4, 1],
  [1.6, MUG.r, 1],
  [MUG.h - 0.6, MUG.r + 0.15],
  [MUG.h, MUG.r + 0.15],
];

function mugHandle(F, along, side) {
  // a loop of tube from the side of the mug, out and back, in the plane of the axis and `side`
  const pts = [];
  for (let i = 0; i <= 18; i++) {
    const t = (i / 18) * Math.PI;
    const s = along + 2.2 + (MUG.h - 8.4) * (1 - Math.cos(t)) * 0.5;
    const out = MUG.r - 0.2 + Math.sin(t) * 5.4;
    pts.push(G.add3(G.add3(F.o, G.mul3(F.a, s)), G.mul3(side, out)));
  }
  return tube(pts, 1.15, { caps: false }, "mid");
}

function steam() {
  // three wisps in the vertical plane through the mug's centre, facing the viewer
  const out = [];
  const top = -(MUG_Z + MUG.h + 2);
  [[-3.4, 0], [0.6, 0.9], [4.2, 1.8]].forEach(([dx, delay], i) => {
    const x = MUG.x + dx;
    const d = `M${n(x)} ${n(top)}c-2.4 -3.6 2.6 -6 0.2 -9.6s2.4 -6.2 0 -9.8`;
    out.push(`<path class="dk-steam" style="animation-delay:${-delay}s" data-i="${i}" d="${d}"/>`);
  });
  return `<g data-part="steam">${fy(MUG.y, out.join(""))}</g>`;
}

function puddle() {
  // a flat blob on the desk top, grown from the cup's mouth by the live code
  const pts = [];
  const lobes = [1, 0.82, 1.12, 0.9, 1.25, 0.86, 1.05, 0.78, 1.18, 0.95, 1.08, 0.84];
  const steps = 72;
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const f = i / (steps / lobes.length);
    const l0 = lobes[Math.floor(f) % lobes.length];
    const l1 = lobes[(Math.floor(f) + 1) % lobes.length];
    const wob = l0 + (l1 - l0) * (0.5 - 0.5 * Math.cos((f % 1) * Math.PI));
    // stretched along the fall direction, centred a little ahead of the mouth
    const along = Math.cos(a) * 17 * wob;
    const across = Math.sin(a) * 11 * wob;
    pts.push([MOUTH[0] + FALL[0] * (along + 13) - FALL[1] * across, MOUTH[1] + FALL[1] * (along + 13) + FALL[0] * across]);
  }
  const d = k.onTop(pts, DESK_Z + 0.05, P, true);
  const m = at([MOUTH[0], MOUTH[1], DESK_Z]);
  return `<g data-part="puddle" data-ox="${n(m[0])}" data-oy="${n(m[1])}" opacity="0"><path class="dk-coffee-spill" d="${d}"/><path class="dk-coffee-shine" d="${k.onTop(pts.map(([px, py]) => [px + (MOUTH[0] - px) * 0.55 + 3, py + (MOUTH[1] - py) * 0.55 + 2]), DESK_Z + 0.06, P, true)}"/></g>`;
}

function mugUpright() {
  const out = [];
  const F = G.frameOf([MUG.x, MUG.y, MUG_Z], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
  out.push(`<path class="iso-halo" d="${k.haloOf({ x: MUG.x - MUG.r, y: MUG.y - MUG.r, w: MUG.r * 2, d: MUG.r * 2, r: MUG.r }, MUG_Z, 3, P)}"/>`);
  const side = [Math.SQRT1_2, -Math.SQRT1_2, 0]; // handle on the right, seen side-on
  const view = k.towardViewer(P);
  const back = side[0] * view[0] + side[1] * view[1] < 0;
  if (back) out.push(mugHandle(F, 0, side));
  const band = L(G.arcOf(F, MUG.h - 3.2, MUG.r + 0.12, P), { tone: "faint" });
  out.push(S(G.solidOf(mugProfile(), F, P), { tone: "mid", inner: band }));
  // the open top: rim, inner wall and the coffee
  out.push(`<path class="dk-mug-in" d="${G.circleOf(F, MUG.h, MUG.r + 0.15 - MUG.wall, P)}"/>`);
  out.push(`<path class="dk-coffee" d="${G.circleOf(F, MUG.h - 1.8, MUG.r - MUG.wall - 0.3, P)}"/>`);
  out.push(L(G.circleOf(F, MUG.h, MUG.r + 0.15 - MUG.wall, P), { tone: "lo" }));
  if (!back) out.push(mugHandle(F, 0, side));
  return `<g data-part="mug-up">${out.join("")}</g>`;
}

function mugFallen() {
  const out = [];
  const up = [0, 0, 1];
  const F = G.frameOf(LIE.o, FALL, G.unit3(G.cross3(up, FALL)), up);
  // the handle points up when it lies on its side; the far half of the loop is behind the body
  out.push(S(G.solidOf(mugProfile(), F, P), { tone: "mid", inner: L(G.arcOf(F, MUG.h - 3.2, MUG.r + 0.12, P), { tone: "faint" }) }));
  out.push(`<path class="dk-mug-in" d="${G.circleOf(F, MUG.h, MUG.r + 0.15 - MUG.wall, P)}"/>`);
  out.push(`<path class="dk-coffee" d="${G.circleOf(F, MUG.h - 0.6, (MUG.r - MUG.wall) * 0.55, P)}"/>`);
  out.push(L(G.circleOf(F, MUG.h, MUG.r + 0.15 - MUG.wall, P), { tone: "lo" }));
  out.push(mugHandle(F, 0, up));
  return `<g data-part="mug-down" opacity="0">${out.join("")}</g>`;
}

function mug() {
  const out = [];
  // coaster: a cork disc with a rim line
  out.push(S(k.cylinder(MUG.x, MUG.y, COASTER.r, DESK_Z, COASTER.h, P, 48, 0.3), { tone: "lo" }));
  out.push(L(k.ring(MUG.x, MUG.y, COASTER.r - 1.6, MUG_Z, P, 48), { tone: "faint" }));
  out.push(puddle());
  out.push(mugUpright());
  out.push(mugFallen());
  out.push(steam());
  const pivot = at([MUG.x + FALL[0] * MUG.r, MUG.y + FALL[1] * MUG.r, MUG_Z]);
  return { svg: out.join(""), pivot };
}

// ─── Shelf, books, trophy ──────────────────────────────────────────────────
const BOOKS = [
  // x, width, height, depth, accent
  [94, 6.2, 29, 17, false],
  [100.6, 4.6, 26, 16, false],
  [105.6, 7.6, 31.5, 18, false],
  [113.6, 5, 28, 16.5, true],
  [119, 4.2, 24, 15, false],
  [123.6, 6.8, 30.5, 17.5, false],
  [130.8, 5.4, 27, 16, false],
];
function shelf() {
  const out = [];
  const z = SHELF_Z;
  // brackets: a wall strap and an arm under the board, two screws in each strap
  for (const xx of [SHELF.x + 10, SHELF.x + SHELF.w - 13]) {
    out.push(box(xx, 0, z - 22, xx + 3, 1.6, z, { tone: "mid" }, 0.2, 0.3));
    out.push(box(xx, 1.6, z - 3.2, xx + 3, SHELF.d - 3, z, { tone: "mid" }, 0.2, 0.3));
    // diagonal brace from strap to arm, drawn as a thin prism in the bracket's plane
    const F = G.frameOf([xx, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
    out.push(S(G.prismOf(F, [[1.6, z - 18], [2.8, z - 18], [SHELF.d - 6, z - 3.2], [SHELF.d - 8.4, z - 3.2]], 0.6, 2.4, P), { tone: "mid" }));
    out.push(D(k.pointsAt([[xx + 1.5, 1.6, z - 6.5], [xx + 1.5, 1.6, z - 18]], P), { size: 0.45 }));
  }
  out.push(slab(SHELF, z, SHELF_T, { tone: "mid" }, 2, 0.6));
  out.push(L(k.sideSeam(SHELF, z + 1.2, P, 2), { tone: "faint" }));
  return out.join("");
}

function bookSpine(x0, x1, zb, zt, yf, accent) {
  // title rule on the spine (it stands for printed text, so its ends are free)
  const w = x1 - x0;
  const title = `M${n(x0 + w / 2)} ${n(-(zt - 7))}V${n(-(zt - 7 - (zt - zb) * 0.38))}`;
  return fy(yf, `<path class="iso-line" data-tone="${accent ? "faint" : "lo"}" data-free="both" d="${title}"/>`);
}

function books() {
  const out = [];
  const z = SHELF_Z + SHELF_T;
  // left bookend: an L of sheet metal, base under the first book
  out.push(box(SHELF.x + 3, 2, z, SHELF.x + 11, 16, z + 0.6, { tone: "mid" }, 0, 0.3));
  out.push(box(SHELF.x + 3, 2, z, SHELF.x + 4, 16, z + 18, { tone: "mid" }, 0, 0.3));
  for (const [x, w, h, d, accent] of BOOKS) {
    const plan = { x, y: 2, w: w - 0.2, d, r: 0.5 };
    const yf = 2 + d;
    // two bands round the spine, wrapping its corners
    const bands = L(k.sideSeam(plan, z + h - 3, P, 2) + k.sideSeam(plan, z + 3.4, P, 2), { tone: "faint" });
    out.push(`<g class="dk-book${accent ? " dk-accent-book" : ""}">${S(k.slabOf(plan, z, h, P, 2, 0.3), { tone: "mid", inner: bands })}${bookSpine(x, x + w - 0.2, z, z + h, yf, accent)}</g>`);
  }
  // one book leaning on the last upright book: a prism in the x-z plane, extruded along y
  const lx = 136.4;
  const tilt = (22 * Math.PI) / 180;
  const bw = 5.6;
  const bh = 26;
  const c = Math.cos(tilt);
  const s = Math.sin(tilt);
  // bottom right corner on the shelf, top leans left onto the upright book
  const br = [lx + bw / c + bh * s, z];
  const poly = [
    [br[0] - bw * c, z + bw * s],
    br,
    [br[0] - bh * s, z + bh * c],
    [br[0] - bh * s - bw * c, z + bh * c + bw * s],
  ];
  const lean = poly.map(([px, pz]) => [px - (poly[3][0] - (lx + 0.1)), pz]);
  const F = G.frameOf([0, 0, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
  const lift = Math.min(...lean.map((p) => p[1])) - z;
  const leaned = lean.map(([px, pz]) => [px, pz - lift]);
  out.push(`<g class="dk-book">${S(G.prismOf(F, leaned, 2, 17.5, P), { tone: "mid" })}</g>`);
  // bands on its spine follow the tilt
  const band = (t) => {
    const a = [leaned[0][0] + (leaned[3][0] - leaned[0][0]) * t, leaned[0][1] + (leaned[3][1] - leaned[0][1]) * t];
    const b = [leaned[1][0] + (leaned[2][0] - leaned[1][0]) * t, leaned[1][1] + (leaned[2][1] - leaned[1][1]) * t];
    return k.segment([a[0], 17.5, a[1]], [b[0], 17.5, b[1]], P);
  };
  out.push(L(band(0.1) + band(0.88), { tone: "faint" }));
  return out.join("");
}

function trophy() {
  const out = [];
  const z = SHELF_Z + SHELF_T;
  const x = 186;
  const yy = 11;
  out.push(slab({ x: x - 5, y: yy - 5, w: 10, d: 10, r: 0.8 }, z, 4.2, { tone: "mid" }, 2, 0.4));
  // engraved plate on the plinth front
  out.push(fy(yy + 5, `<path class="iso-line" data-tone="faint" d="${rr(x - 3, z + 1, x + 3, z + 3.2, 0.3)}"/>`));
  const F = G.frameOf([x, yy, z + 4.2], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
  const prof = [
    [0, 3.2],
    [0.9, 3.2],
    [0.9, 1.5, 1],
    [2.2, 0.85, 1],
    [6.4, 0.75, 1],
    [7.4, 1.4, 1],
    [8.6, 3, 1],
    [10.6, 4.1, 1],
    [13, 4.6, 1],
    [14.4, 4.7],
  ];
  // handles: two loops of wire, the far one drawn before the cup
  const handle = (side) => {
    const pts = [];
    for (let i = 0; i <= 14; i++) {
      const t = (i / 14) * Math.PI;
      pts.push([x + side * (4.4 + Math.sin(t) * 2.6), yy, z + 4.2 + 8.6 + Math.cos(t) * 3.2 + 1.4]);
    }
    return tube(pts, 0.45, { caps: false });
  };
  out.push(handle(-1));
  out.push(S(G.solidOf(prof, F, P), { tone: "mid", inner: L(G.arcOf(F, 9.6, 3.6, P, { slope: 1 }), { tone: "faint" }) }));
  // the open mouth of the cup
  out.push(`<path class="dk-cup-in" d="${G.circleOf(F, 14.4, 4.2, P)}"/>`);
  out.push(L(G.circleOf(F, 14.4, 4.2, P), { tone: "lo" }));
  out.push(handle(1));
  return out.join("");
}

// ─── Photo frame ───────────────────────────────────────────────────────────
function photoFrame() {
  const out = [];
  const { x0, x1, z0, z1 } = FRAME;
  const depth = 3.2;
  const moulding = 3.4;
  const mat = 6.2;
  // outer moulding: four bars around, mitred, standing off the wall
  const plan = { x: x0, y: 0, w: x1 - x0, d: depth, r: 0.4 };
  out.push(`<path class="iso-halo dk-frame-halo" d="${k.haloOf(plan, z0, z1 - z0, P)}"/>`);
  // back (seen at the top and right edges), then the face
  out.push(S(k.slabOf(plan, z0, z1 - z0, P, 2, 0.4), { tone: "mid" }));
  const face = [];
  const ox0 = x0 + moulding;
  const ox1 = x1 - moulding;
  const oz0 = z0 + moulding;
  const oz1 = z1 - moulding;
  face.push(`<path class="iso-line" data-tone="faint" d="M${x0} ${-z1}L${ox0} ${-oz1}M${x1} ${-z1}L${ox1} ${-oz1}M${x0} ${-z0}L${ox0} ${-oz0}M${x1} ${-z0}L${ox1} ${-oz0}"/>`);
  face.push(`<path class="dk-mat" d="${rr(ox0, oz0, ox1, oz1, 0)}"/>`);
  face.push(`<path class="iso-line" data-tone="lo" d="${rr(ox0, oz0, ox1, oz1, 0)}"/>`);
  // the picture: projected onto the wall plane, clipped to the mat opening
  const px0 = ox0 + mat;
  const px1 = ox1 - mat;
  const pz0 = oz0 + mat;
  const pz1 = oz1 - mat;
  const id = "dk-photo-clip";
  face.push(`<clipPath id="${id}"><path d="${rr(px0, pz0, px1, pz1, 0)}"/></clipPath>`);
  face.push(`<g clip-path="url(#${id})"><rect class="dk-photo-bg" x="${px0}" y="${-pz1}" width="${px1 - px0}" height="${pz1 - pz0}"/>`);
  // two layers so a new picture can fade in over the old one
  for (const layer of ["a", "b"]) face.push(`<image data-part="photo-${layer}" x="${px0}" y="${-pz1}" width="${px1 - px0}" height="${pz1 - pz0}" preserveAspectRatio="xMidYMid slice" opacity="${layer === "a" ? 1 : 0}"/>`);
  // bevel of the mat cut: a thin lighter band on the top and left of the opening
  face.push(`<path class="dk-mat-bevel" d="M${px0} ${-pz1}H${px1}L${px1 - 0.7} ${-pz1 + 0.7}H${px0 + 0.7}V${-pz0 - 0.7}L${px0} ${-pz0}Z"/>`);
  face.push(`</g>`);
  face.push(`<path class="iso-line" data-tone="lo" d="${rr(px0, pz0, px1, pz1, 0)}"/>`);
  // glass reflection across the whole glazed area
  face.push(`<clipPath id="dk-frame-glass"><path d="${rr(ox0, oz0, ox1, oz1, 0)}"/></clipPath>`);
  face.push(`<g clip-path="url(#dk-frame-glass)"><path class="dk-sheen dk-sheen-frame" d="M${ox0 + 16} ${-oz1}L${ox0 + 30} ${-oz1}L${ox0 + 8} ${-oz0}L${ox0 - 6} ${-oz0}Z"/></g>`);
  out.push(fy(depth, face.join("")));
  return { svg: out.join(""), photo: { x: px1 - px0, z: pz1 - pz0 } };
}

// ─── Hit groups ────────────────────────────────────────────────────────────
// Five objects open a part of the site. The HTML callouts beside the drawing are the
// keyboard and screen-reader path, so the drawn objects stay out of the tab order.
const TOYS = {
  monitor: "work",
  books: "writing",
  trophy: "awards",
  frame: "about",
  mug: "contact",
};
const toy = (id, body) =>
  `<g class="dk-hit" data-toy="${id}" data-route="${TOYS[id]}"><g class="dk-lift">${body}</g></g>`;

// ─── Assemble ──────────────────────────────────────────────────────────────
const frame = photoFrame();
const coffee = mug();
// The frame swings about its nail in the wall plane: plane matrix, its inverse, the pivot.
const wallM = planeY(3.2).match(/matrix\(([^)]+)\)/)[1].split(" ").map(Number);
const invert = ([a, b, c, d, e, f]) => {
  const det = a * d - b * c;
  return [d / det, -b / det, -c / det, a / det, (c * f - d * e) / det, (b * e - a * f) / det].map((v) => Math.round(v * 1e5) / 1e5);
};
const PARTS_NAMES = ["room","frame","shelf","books","trophy","under","legL","beam","legR","halo","top","kbcable","moncable","pccable","mug","monitor","keyboard","tower","pad","mouse"];
const PARTS = [
  room(),
  toy("frame", `<g data-part="frame-swing">${frame.svg}</g>`),
  shelf(),
  toy("books", books()),
  toy("trophy", trophy()),
  underCables(),
  legFrame(LEG_X[0]),
  crossbeam(),
  legFrame(LEG_X[1]),
  `<path class="iso-halo dk-desk-halo" d="${k.haloOf(DESK, 0, 3, P)}"/>`,
  deskTop(),
  keyboardCable(),
  monitorCable(),
  tube(above(PC_CABLE, DESK_Z - 0.6), 1.05, { caps: [false, false] }),
  toy("mug", coffee.svg),
  toy("monitor", monitor()),
  `<g data-part="keyboard">${keyboard()}</g>`,
  tower(),
  mousePad(),
  mouse(),
];
if (process.argv.includes("--sizes")) console.log(PARTS_NAMES.map((n_, i) => `${n_} ${(PARTS[i].length / 1024).toFixed(1)}`).join("\n"));
const bodyStr = PARTS.join("");

const META = {
  width: WIDTH,
  height: HEIGHT,
  keys: keyList,
  keyDown: k.axisVector(P, [0, 0, -1.6]),
  photo: frame.photo,
  code: { span: CODE_SPAN, lh: CODE_LH, lines: CODE.length },
  mug: { pivot: coffee.pivot.map(n) },
  frame: { m: wallM, inv: invert(wallM), pivot: [(FRAME.x0 + FRAME.x1) / 2, -(FRAME.z1 + 6)] },
};

// Rewrite every straight-line path (M/L/Z only) to relative coordinates: the same
// shapes in about 60% of the bytes.
const fmt = (v) => {
  const t = (Math.round(v * 10) / 10).toFixed(1).replace(/\.0$/, "").replace(/^(-?)0\./, "$1.");
  return t === "-0" ? "0" : t;
};
function relative(d) {
  if (/[^MLZ0-9.\s-]/.test(d)) return d;
  const out = [];
  let cx = 0, cy = 0, sx = 0, sy = 0, last = "";
  for (const [, cmd, args] of d.matchAll(/([MLZ])([^MLZ]*)/g)) {
    if (cmd === "Z") { out.push("z"); cx = sx; cy = sy; last = "z"; continue; }
    const nums = args.trim().split(/[\s,]+|(?=-)/).filter(Boolean).map(Number);
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const x = Math.round(nums[i] * 10) / 10, y = Math.round(nums[i + 1] * 10) / 10;
      const dx = Math.round((x - cx) * 10) / 10, dy = Math.round((y - cy) * 10) / 10;
      const c = cmd === "M" && i === 0 ? "m" : "l";
      if (c === "l" && dx === 0 && dy === 0) continue;
      const pair = fmt(dx) + (dy < 0 ? "" : " ") + fmt(dy);
      out.push((c === last && c === "l" ? (dx < 0 ? "" : " ") : c) + pair);
      last = c === "m" ? "l" : c;
      cx = x; cy = y;
      if (c === "m") { sx = x; sy = y; }
    }
  }
  return out.join("");
}
const svg = bodyStr.replace(/ d="([^"]*)"/g, (_, d) => ` d="${relative(d)}"`);
mkdirSync(OUT_DIR, { recursive: true });
const banner = "// Generated by scripts/desk/build.mjs. Do not edit by hand.\n";
writeFileSync(join(OUT_DIR, "art.generated.ts"), `${banner}export const DESK_ART = ${JSON.stringify(svg)};\nexport const DESK_META = ${JSON.stringify(META)} as const;\n`);
console.log(`wrote art.generated.ts · ${WIDTH}×${HEIGHT} · ${(svg.length / 1024).toFixed(1)} KB · ${keyList.length} keys`);
