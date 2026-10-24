// Generates the 1200x630 social preview images (Open Graph) into public/og/:
//   home-en.png, home-fa.png, project-<slug>-en.png, project-<slug>-fa.png
//
// Run it again after you change the content:   npm run og
//
// It draws each image as an HTML page and takes a screenshot with Chrome (headless), so Persian text
// is shaped and joined correctly, which most "text to image" libraries cannot do. The result is
// committed to the repo, so the deploy (Vercel) does not need Chrome.
//
// Needs Google Chrome installed. If it is somewhere unusual:  CHROME_PATH="/path/to/chrome" npm run og

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "og");
const fileUrl = (p) => pathToFileURL(p).href;

// ---------- Chrome
const chromeCandidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = chromeCandidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("Google Chrome was not found. Install it, or set CHROME_PATH to the chrome binary.");
  process.exit(1);
}

// ---------- Content: locale files + project data (read straight from the source files)
const dict = {
  en: JSON.parse(readFileSync(path.join(root, "src/assets/locale/en/translation.json"), "utf8")),
  fa: JSON.parse(readFileSync(path.join(root, "src/assets/locale/fa/translation.json"), "utf8")),
};

// src/data/projects.ts imports images, which plain Node cannot do. So: find where each image lives,
// swap the image variables for their file paths, drop the imports, and let Node strip the types.
const tmp = mkdtempSync(path.join(tmpdir(), "og-"));
let projectsSource = readFileSync(path.join(root, "src/data/projects.ts"), "utf8");
const imageFiles = {};
for (const [, name, rel] of projectsSource.matchAll(/^import (\w+) from "@\/(.+)";$/gm)) {
  imageFiles[name] = fileUrl(path.join(root, "src", rel));
}
projectsSource = projectsSource.replace(/^import .*$/gm, "");
for (const [name, url] of Object.entries(imageFiles)) {
  projectsSource = projectsSource.replace(new RegExp(`\\b${name}\\b`, "g"), JSON.stringify(url));
}
const projectsFile = path.join(tmp, "projects.mts");
writeFileSync(projectsFile, projectsSource);
const { projectsData } = await import(pathToFileURL(projectsFile).href);

// ---------- Drawing
const fonts = ["400", "700", "900"].map(
  (w) => `<link rel="stylesheet" href="${fileUrl(path.join(root, `node_modules/@fontsource/vazirmatn/${w}.css`))}">`
);
const portrait = fileUrl(path.join(root, "src/assets/image/cover.webp"));

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function page({ lang, body }) {
  const rtl = lang === "fa";
  return `<!doctype html><html lang="${lang}" dir="${rtl ? "rtl" : "ltr"}"><head><meta charset="utf-8">
${fonts.join("\n")}
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; background: #070708; }
  body { font-family: "Vazirmatn", sans-serif; color: #fff; position: relative; }
  .frame { position: absolute; inset: 0; padding: 64px 72px; display: flex; gap: 56px; align-items: center; }
  .text { flex: 1; display: flex; flex-direction: column; justify-content: center; height: 100%; min-width: 0; }
  .label { font-size: 22px; font-weight: 700; letter-spacing: ${rtl ? "0" : "0.18em"}; text-transform: uppercase; color: rgba(255,255,255,.62); }
  .title { font-size: 92px; font-weight: 900; line-height: 1.05; letter-spacing: ${rtl ? "0" : "-0.025em"}; margin-top: 18px; }
  .title.medium { font-size: 78px; }
  .title.long { font-size: 64px; }
  .accent { color: #00a5ff; }
  .lead { font-size: 30px; font-weight: 400; line-height: 1.5; color: rgba(255,255,255,.72); margin-top: 22px; max-width: 640px; }
  .pills { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
  .pill { font-size: 19px; font-weight: 700; padding: 7px 16px; border-radius: 999px; border: 2px solid rgba(255,255,255,.22); color: rgba(255,255,255,.85); direction: ltr; }
  .foot { position: absolute; bottom: 44px; ${rtl ? "right" : "left"}: 72px; font-size: 22px; font-weight: 700; color: rgba(255,255,255,.62); display: flex; align-items: center; gap: 12px; direction: ltr; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #34d399; }
  .photo { width: 400px; height: 500px; border-radius: 36px; overflow: hidden; border: 2px solid rgba(255,255,255,.14); background: #0f0f10; flex: none; }
  .photo img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .shot { width: 470px; height: 352px; border-radius: 28px; overflow: hidden; border: 2px solid rgba(255,255,255,.14); background: #0f0f10; flex: none; }
  .shot img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
</style></head><body><div class="frame">${body}</div></body></html>`;
}

function homePage(lang) {
  const d = dict[lang];
  const name = `${esc(d.hero.firstName)} <span class="accent">${esc(d.hero.lastName)}</span>`;
  return page({
    lang,
    body: `
      <div class="text">
        <div class="label">${esc(d.hero.tagline.split("—")[0].trim())}</div>
        <div class="title">${name}</div>
        <div class="lead">${esc(capitalize(d.hero.tagline.split("—")[1]?.trim() ?? ""))}</div>
        <div class="foot"><span class="dot"></span>amirrahemi.com</div>
      </div>
      <div class="photo"><img src="${portrait}"></div>`,
  });
}

function projectPage(project, lang) {
  const d = dict[lang];
  const title = project.title[lang];
  // Longer titles wrap onto two lines, so they get smaller type to leave room for the pills.
  const sizeClass = title.length > 26 ? " long" : title.length > 14 ? " medium" : "";
  return page({
    lang,
    body: `
      <div class="text">
        <div class="label">${esc(project.year)} · ${esc(d.project.caseStudy)}</div>
        <div class="title${sizeClass}">${esc(title)}</div>
        <div class="lead">${esc(project.shortDescription[lang].split(/(?<=[.!؟])\s/)[0])}</div>
        <div class="pills">${project.techStack.slice(0, 3).map((t) => `<span class="pill">${esc(t)}</span>`).join("")}</div>
        <div class="foot"><span class="dot"></span>${esc(d.hero.firstName)} ${esc(d.hero.lastName)} · amirrahemi.com</div>
      </div>
      <div class="shot"><img src="${project.cover}"></div>`,
  });
}

function render(html, outFile) {
  const htmlFile = path.join(tmp, "page.html");
  writeFileSync(htmlFile, html);
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      "--virtual-time-budget=4000",
      `--screenshot=${outFile}`,
      fileUrl(htmlFile),
    ],
    { stdio: "ignore" }
  );
}

mkdirSync(outDir, { recursive: true });
const jobs = [];
for (const lang of ["en", "fa"]) {
  jobs.push([`home-${lang}.png`, homePage(lang)]);
  for (const project of projectsData) jobs.push([`project-${project.slug}-${lang}.png`, projectPage(project, lang)]);
}
for (const [file, html] of jobs) {
  render(html, path.join(outDir, file));
  console.log("wrote public/og/" + file);
}
rmSync(tmp, { recursive: true, force: true });
