import dotenv from "dotenv";
import { fetchArticle } from "./fetcharticle.js";
import { googleSearch } from "./googlesearch.js";
import { scrapeReference } from "./scrapperreference.js";
import { rewriteWithAI } from "./rewriteWtihAI.js";
import { publishArticle } from "./publisharticle.js";

dotenv.config();

async function main() {
  try {
    console.log("🔹 Fetching article...");
    const article = await fetchArticle();

    console.log("🔹 Google search...");
    const links = await googleSearch(article.title);
console.log("Google links found:", links);


    console.log("🔹 Scraping reference articles...");
    const ref1 = await scrapeReference(links[0]);
    const ref2 = await scrapeReference(links[1]);

    console.log("🔹 Rewriting with AI...");
    const updatedContent = await rewriteWithAI(
      article.content,
      ref1,
      ref2
    );

    console.log("🔹 Publishing updated article...");
    await publishArticle(article._id, updatedContent, links);

    console.log("✅ Phase 2 completed successfully!");
  } catch (err) {
    console.error("❌ Phase 2 failed:", err.message);
  }
}

main();
