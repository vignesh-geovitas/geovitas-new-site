/**
 * Horizontal-overflow regression check.
 *
 * Guards the class of bug that put the hero off the right edge of every phone:
 * a grid item defaults to `min-width: auto`, so it cannot shrink below its
 * content's min-content width. Drop something intrinsically wide inside one —
 * the framework rail is ~1080px laid end to end — and the whole column inflates
 * and runs off the screen. See the notes in components/ui/marquee.tsx.
 *
 * It reports two different failures:
 *   DOC SCROLL  the document itself scrolls sideways.
 *   BREAKOUT    an in-flow box is wider than its parent's content box. This is
 *               the one that matters: a clipping ancestor hides it from
 *               scrollWidth, so the page looks fine to a scroll check while its
 *               content is being cut off. The hero failed exactly this way.
 *
 * Usage — needs the site already running at BASE:
 *   npm run build && npm start &
 *   npm run check:overflow
 *
 * Set CHROME_PATH if Chrome is not at the default location for your platform.
 * Exits non-zero on any finding, so it can gate a pipeline.
 */
import puppeteer from "puppeteer-core";

const DEFAULT_CHROME = {
  win32: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  linux: "/usr/bin/google-chrome",
};

const CHROME =
  process.env.CHROME_PATH ?? DEFAULT_CHROME[process.platform] ?? DEFAULT_CHROME.linux;
const BASE = process.env.BASE_URL ?? "http://localhost:3123";

const ROUTES = [
  "/", "/advisory", "/advisory/urban-local-bodies", "/advisory/green-factory-360",
  "/advisory/energy-transition", "/platform", "/impact", "/insights", "/company",
  "/approach", "/capabilities", "/capabilities/carbon-capture",
  "/capabilities/compressed-biogas", "/capabilities/petroleum-cold-cracking",
  "/exposure", "/contact", "/privacy", "/terms", "/not-a-page",
];

const WIDTHS = [320, 390, 768];

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "new", args: ["--no-sandbox"],
});
const page = await browser.newPage();

let docFailures = 0;
let blowouts = 0;

for (const width of WIDTHS) {
  await page.setViewport({ width, height: 844, deviceScaleFactor: 1 });

  for (const route of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "load", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 500));

    const res = await page.evaluate((vw) => {
      const docOverflow = document.documentElement.scrollWidth - vw;

      /* An in-flow box wider than its parent's content box has broken out of
         the layout. Clipping by an ancestor hides that from scrollWidth but it
         is still wrong — the hero clips exactly this way, which is why a
         scrollWidth check alone missed it. */
      const items = [];
      for (const el of document.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        if (cs.position === "absolute" || cs.position === "fixed") continue;
        if (cs.display === "none" || cs.display === "contents") continue;
        if (/auto|scroll|hidden|clip/.test(cs.overflowX)) continue;
        const p = el.parentElement;
        if (!p) continue;
        const pcs = getComputedStyle(p);
        /* An immediate parent that clips is containing the child on purpose —
           the Marquee track (`w-max`) is exactly this and is not a defect. */
        if (/auto|scroll|hidden|clip/.test(pcs.overflowX)) continue;

        /* offsetWidth, not getBoundingClientRect: the latter includes CSS
           transforms, and Parallax deliberately `scale`s its inner layer to
           cover the strip its travel exposes. Measuring layout width keeps that
           out of the results. SVG elements have no offsetWidth — skip them. */
        const w = el.offsetWidth;
        const pw = p.clientWidth;
        if (!w || !pw) continue;

        const parentContent =
          pw -
          (parseFloat(pcs.paddingLeft) || 0) -
          (parseFloat(pcs.paddingRight) || 0);
        if (parentContent <= 0) continue;
        if (w <= parentContent + 1) continue;
        items.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute("class") ?? "").slice(0, 120),
          w,
          parentContent: Math.round(parentContent),
          parentDisplay: pcs.display,
          minWidth: cs.minWidth,
        });
      }
      return { docOverflow, items: items.slice(0, 8) };
    }, width);

    if (res.docOverflow > 0) {
      docFailures++;
      console.log(`\nX DOC SCROLL  ${width}px  ${route}  +${res.docOverflow}px`);
    }
    if (res.items.length) {
      blowouts++;
      console.log(`\n! BREAKOUT  ${width}px  ${route}`);
      for (const i of res.items) {
        console.log(`    <${i.tag}> ${i.w}px inside ${i.parentContent}px (${i.parentDisplay}, min-width:${i.minWidth})`);
        console.log(`      ${i.cls}`);
      }
    }
  }
  console.log(`- ${width}px swept`);
}

await browser.close();

if (docFailures === 0 && blowouts === 0) {
  console.log(
    `\nOK: ${ROUTES.length} routes x ${WIDTHS.length} widths — no horizontal overflow, no layout breakouts.`,
  );
} else {
  console.error(
    `\nFAIL: ${docFailures} document overflows, ${blowouts} breakout pages.`,
  );
  process.exitCode = 1;
}
