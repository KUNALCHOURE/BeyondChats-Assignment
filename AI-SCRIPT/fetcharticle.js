import axios from "axios";

export async function fetchArticle() {
  const res = await axios.get(
    `${process.env.BACKEND_URL}/articles`
  );

  const article = res.data.find(a => !a.isUpdated);

  if (!article) {
    throw new Error("No article left to update");
  }

  return article;
}
