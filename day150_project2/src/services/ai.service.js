import 'dotenv/config';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

let groq = null;
let geminiClient = null;

function getGroqClient() {
    if (!groq) {
        groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }
    return groq;
}

function getGeminiClient() {
    if (geminiClient) return geminiClient;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing GEMINI_API_KEY. Add it to your .env file.");
    }
    geminiClient = new GoogleGenerativeAI(apiKey);
    return geminiClient;
}

export async function getGroqChatCompletions(messages) {
    const client = getGroqClient();
    try {
        const chatCompletion = await client.chat.completions.create({
            messages: messages,
            model: "llama-3.3-70b-versatile",
        });

        const reply = chatCompletion.choices?.[0]?.message?.content;
        return reply || "No response";
    } catch (error) {
        console.error("Groq chat completion error:", error);
        throw new Error("AI service failed");
    }
}

async function generateVector(content) {
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "embedding-001" });
        const result = await model.embedContent(content);
        return result.embedding.values;
    } catch (error) {
        console.error("Gemini embedding error:", error);
        throw new Error("Vector generation failed");
    }
}

export default { getGroqChatCompletions, generateVector }