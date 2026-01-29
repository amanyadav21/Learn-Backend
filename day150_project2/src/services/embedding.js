import { hf } from '../config/hfClient.js';

/**
 * Text se embedding generate karo
 * Model: sentence-transformers/all-MiniLM-L6-v2
 * Output: 384-dimensional vector
 */
export async function createEmbedding(text) {
    try {
        if (!text || text.trim().length === 0) {
            throw new Error('Text cannot be empty');
        }

        const embedding = await hf.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            inputs: text,
        });

        console.log(`✅ Embedding generated: ${embedding.length} dimensions`);
        return embedding;
    } catch (error) {
        console.error("❌ Embedding error:", error.message);
        throw new Error("Vector generation failed");
    }
}
