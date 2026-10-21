// Builds public/AmirRahemiCV.pdf from the CV content (src/data/cv.ts) and the PDF layout
// (scripts/cv/cv.template.html), with headless Chrome.
//   npm run cv      (needs Google Chrome; set CHROME_PATH if it is somewhere unusual)
// Change the text in src/data/cv.ts; change the look in cv.template.html.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, "../../public/AmirRahemiCV.pdf");
const { cv } = await import(pathToFileURL(path.resolve(here, "../../src/data/cv.ts")).href);

const chrome = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));
if (!chrome) {
  console.error("Google Chrome was not found. Install it, or set CHROME_PATH.");
  process.exit(1);
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const projects = cv.projects
  .map(
    (p) =>
      `<div class="proj"><h4>${esc(p.title)}</h4><p>${esc(p.description)}</p><div class="tech">Tech: ${esc(p.tech)}</div><div class="link">Link: <a href="${esc(p.url)}">${esc(p.link)}</a></div></div>`
  )
  .join("");
const html = readFileSync(path.join(here, "cv.template.html"), "utf8")
  .replace("{{SUMMARY}}", esc(cv.summary))
  .replace("{{ROLE}}", esc(cv.role))
  .replace("{{PROJECTS}}", projects)
  .replace("{{SKILLS}}", cv.skills.map((x) => `<li>${esc(x)}</li>`).join(""));

// The page needs its fonts and photo from this folder, so the filled-in copy lives here briefly.
const tmp = path.join(here, "_cv.html");
writeFileSync(tmp, html);
try {
  execFileSync(
    chrome,
    ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000", `--print-to-pdf=${out}`, pathToFileURL(tmp).href],
    { stdio: "ignore" }
  );
} finally {
  rmSync(tmp, { force: true });
}
console.log("wrote public/AmirRahemiCV.pdf");
