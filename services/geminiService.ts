import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the client
// The API key must be provided in the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWebsite = async (url: string, userPrompt?: string): Promise<string> => {
  try {
    const modelId = "gemini-3-pro-preview"; // Using Pro for complex code generation

    const prompt = userPrompt 
      ? `User Request: ${userPrompt}. (Context URL: ${url})`
      : `Generate the website for: ${url}`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // We give it a generous token limit for full page generation
        maxOutputTokens: 20000, 
        // No strict schema, we want raw HTML string
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated");
    }

    return text;
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};
