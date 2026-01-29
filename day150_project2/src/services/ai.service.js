import 'dotenv/config';
import Groq from 'groq-sdk';
import { createEmbedding } from './embedding.js';

// Groq client initialize
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Groq se chat response lao
 * Model: llama-3.3-70b-versatile
 */
export async function getGroqChatCompletions(messages) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: messages,
            model: "llama-3.3-70b-versatile",
        });

        const reply = chatCompletion.choices?.[0]?.message?.content;
        return reply || "No response";
    } catch (error) {
        console.error("❌ Groq chat error:", error.message);
        throw new Error("AI service failed");
    }
}

/**
 * Hugging Face se embeddings generate karo
 */
export async function generateVector(content) {
    return await createEmbedding(content);
}

export default { getGroqChatCompletions, generateVector }