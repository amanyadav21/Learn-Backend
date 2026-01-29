import express from 'express';
import { createEmbedding } from '../services/embedding.js';

const router = express.Router();

/**
 * POST /api/embed
 * Embedding generate karo
 * 
 * Body:
 * {
 *   "text": "Your text here"
 * }
 * 
 * Response:
 * {
 *   "dimensions": 384,
 *   "embedding": [0.021, -0.034, ...]
 * }
 */
router.post('/', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ 
                error: "Text is required and cannot be empty" 
            });
        }

        const embedding = await createEmbedding(text);

        res.json({
            success: true,
            dimensions: embedding.length,
            embedding: embedding,
            text: text
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            success: false
        });
    }
});

export default router;
