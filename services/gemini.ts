import { GoogleGenAI } from "@google/genai";
import { AIResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGeminiMath = async (query: string): Promise<AIResponse> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are an expert scientific calculator assistant. 
      Your goal is to solve math problems, convert units, or explain concepts concisely.
      
      Output format: JSON
      {
        "answer": "The concise numerical or symbolic result",
        "steps": ["Step 1...", "Step 2..."],
        "explanation": "A brief explanation of the concept if needed"
      }
      
      If the user asks a non-math question, try to relate it to quantities or math, or politely decline.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const parsed = JSON.parse(text);
    return parsed as AIResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      answer: "Error connecting to AI",
      steps: [],
      explanation: "Please check your network or try again."
    };
  }
};