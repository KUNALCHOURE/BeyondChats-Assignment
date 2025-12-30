import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeReference(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const content = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim();

  return content.slice(0, 5000); // limit for LLM
}
