import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import scrapeBlogs from './scrapper.js';
import Article from "./models/article.js";
dotenv.config();
const app = express();
const PORT = 3000;  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((error)=>{
    console.error("Error connecting to MongoDB:", error);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.put("/articles/:id", async (req, res) => {
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});