import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    originalUrl: String,
    isUpdated: {
      type: Boolean,
      default: false,
    },
    references: [String],
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
