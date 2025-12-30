import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
console.log("API Key:", process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function rewriteWithAI(original, ref1, ref2) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
You are a professional content writer.

TASK:
Rewrite the ORIGINAL ARTICLE by improving clarity, structure, and formatting.
Use the REFERENCE ARTICLES only for style inspiration.
Do NOT copy sentences.
Make the content SEO-friendly and well-structured.

ORIGINAL ARTICLE:
${original}

REFERENCE ARTICLE 1:
${ref1}

REFERENCE ARTICLE 2:
${ref2}

OUTPUT:
Return only the rewritten article content.
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return response;
}
