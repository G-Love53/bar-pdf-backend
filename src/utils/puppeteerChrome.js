import puppeteer from "puppeteer-core";

const BASE_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
];

/**
 * Chrome for Puppeteer on Render/Linux:
 * 1) PUPPETEER_EXECUTABLE_PATH if set
 * 2) puppeteer.executablePath() when a browser is installed/cached
 * 3) @sparticuz/chromium (bundled binary; no Render env var required)
 */
export async function getPuppeteerLaunchOptions(extraArgs = []) {
  const envPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (envPath) {
    return {
      executablePath: envPath,
      headless: "new",
      args: [...BASE_ARGS, ...extraArgs],
    };
  }

  try {
    if (typeof puppeteer.executablePath === "function") {
      const p = puppeteer.executablePath();
      if (typeof p === "string" && p.length > 0) {
        return {
          executablePath: p,
          headless: "new",
          args: [...BASE_ARGS, ...extraArgs],
        };
      }
    }
  } catch (err) {
    console.warn(
      "[puppeteer] executablePath() failed (no local Chrome cache):",
      err?.message || err,
    );
  }

  const chromium = (await import("@sparticuz/chromium")).default;
  return {
    executablePath: await chromium.executablePath(),
    headless: chromium.headless ?? "new",
    args: [...(chromium.args || []), ...extraArgs],
  };
}
