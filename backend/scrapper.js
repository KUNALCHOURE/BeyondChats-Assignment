import axios from "axios";
import * as cheerio from "cheerio";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "./models/article.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log("DB Connected");

async function scrapeBlogs() {
  const { data } = await axios.get("https://beyondchats.com/blogs/");
  const $ = cheerio.load(data);

  const articleLinks = [];

  $("a.ct-media-container")
    .slice(0, 5)
    .each((_, el) => {
      const link = $(el).attr("href");
      if (link) articleLinks.push(link);
    });

  for (const url of articleLinks) {
    const articlePage = await axios.get(url);
    const $$ = cheerio.load(articlePage.data);

    const title = $$("h1").first().text().trim();
    const content = $$(".elementor-widget-theme-post-content")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    if (!title || !content) continue;

    await Article.create({
      title,
      content,
      originalUrl: url,
    });

    console.log(" Saved:", title);
  }

  mongoose.connection.close();
}

scrapeBlogs();
