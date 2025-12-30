import puppeteer from "puppeteer";

export async function googleSearch(query) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
  );

  // DuckDuckGo HTML search (VERY IMPORTANT)
  const searchUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  await page.goto(searchUrl, { waitUntil: "networkidle2" });

  // wait a bit for results
  await new Promise(resolve => setTimeout(resolve, 2000));

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a.result__a"))
      .map(a => a.href)
      .filter(
        href =>
          href &&
          href.startsWith("http") &&
          !href.includes("beyondchats.com") &&
          !href.includes("youtube.com") &&
          !href.includes("pdf")
      )
      .slice(0, 2);
  });

  await browser.close();

  if (links.length < 2) {
    throw new Error("DuckDuckGo did not return enough valid results");
  }

  return links;
}
