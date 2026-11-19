// Builds a single standalone HTML page with just the <Hero /> section, for
// previewing the diorama outside the site:  node scripts/desk/preview.mjs [out.html]
//
// It bundles src/components/hero/preview-entry.tsx with esbuild, compiles the
// Tailwind CSS the hero uses, and inlines the frame photo as a data URI.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const out = resolve(process.argv[2] || join(ROOT, "dist-preview", "hero.html"));
const tmp = mkdtempSync(join(tmpdir(), "hero-preview-"));

const alias = {
  name: "alias",
  setup(b) {
    b.onResolve({ filter: /^@\// }, async (args) => b.resolve("./" + args.path.slice(2), { resolveDir: join(ROOT, "src"), kind: args.kind }));
  },
};
const result = await build({
  entryPoints: [join(ROOT, "src/components/hero/preview-entry.tsx")],
  bundle: true,
  minify: true,
  format: "iife",
  write: false,
  outdir: tmp,
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [alias],
  loader: { ".css": "css" },
});
const js = result.outputFiles.find((f) => f.path.endsWith(".js")).text;
const deskCss = result.outputFiles.find((f) => f.path.endsWith(".css"))?.text ?? "";

const twOut = join(tmp, "tw.css");
execFileSync(join(ROOT, "node_modules/.bin/tailwindcss"), ["-c", join(ROOT, "tailwind.config.js"), "-i", join(ROOT, "src/index.css"), "-o", twOut, "--minify", "--content", join(ROOT, "src/{components/hero,components/common,hooks}/**/*.{ts,tsx}")], { stdio: "ignore", cwd: ROOT });
const tw = readFileSync(twOut, "utf8");

// two pictures so the frame's "next picture" can be tried
const photos = ["profile-800.jpg", "code_path-640.jpg"].map((f) => `data:image/jpeg;base64,${readFileSync(join(ROOT, "public/assets/images/opt", f)).toString("base64")}`);
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hero preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<script>try{var s=new URLSearchParams(location.search).get('theme');var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}</script>
<style>${tw}\n${deskCss}\n.preview-toggle{position:fixed;top:16px;right:16px;z-index:10;font:500 13px Inter,system-ui,sans-serif;padding:8px 12px;border-radius:999px;border:1px solid rgb(var(--c-border-dark));background:rgb(var(--c-card));color:rgb(var(--c-primary));cursor:pointer}</style>
</head><body><button class="preview-toggle" type="button" onclick="document.documentElement.classList.toggle('dark')">Toggle theme</button><div id="root"></div>
<script>window.__HERO_PHOTOS__=${JSON.stringify(photos)};</script>
<script>${js.replace(/<\/(script)/gi, "<\\/$1")}</script></body></html>`;
execFileSync("mkdir", ["-p", dirname(out)]);
writeFileSync(out, html);
console.log(`wrote ${out} · ${(html.length / 1024).toFixed(0)} KB (js ${(js.length / 1024).toFixed(0)} KB)`);
