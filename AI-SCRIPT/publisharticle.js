import axios from "axios";

export async function publishArticle(id, content, references) {
  await axios.put(
    `${process.env.BACKEND_URL}/articles/${id}`,
    {
      content: content + `\n\nReferences:\n${references.join("\n")}`,
      isUpdated: true,
      references
    }
  );
}
