import express from 'express';
import { createEmbedding } from '../services/embedding.js';
import { createMemory, queryMemory } from '../services/vector.service.js';

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

/**
 * ⭐ TEST ENDPOINT: Pinecone mein vector save karo
 * POST /api/embed/test-save
 * 
 * Body:
 * {
 *   "text": "Your text here"
 * }
 * 
 * Response: Confirmation with metadata
 */
router.post('/test-save', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ 
                error: "Text is required",
                success: false
            });
        }

        // Embedding generate karo
        const embedding = await createEmbedding(text);
        const messageId = `test-${Date.now()}`;

        // Pinecone mein save karo
        await createMemory({
            vectors: embedding,
            metadata: {
                messageId: messageId,
                source: "test",
                text: text,
                timestamp: new Date().toISOString()
            },
            messageId: messageId
        });

        res.json({
            success: true,
            message: "✅ Vector saved in Pinecone!",
            messageId: messageId,
            dimensions: embedding.length,
            text: text
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            success: false
        });
    }
});

/**
 * ⭐ TEST ENDPOINT: Pinecone se vector search karo
 * POST /api/embed/test-query
 * 
 * Body:
 * {
 *   "text": "Search text here"
 * }
 */
router.post('/test-query', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ 
                error: "Text is required",
                success: false
            });
        }

        // Embedding generate karo
        const queryVector = await createEmbedding(text);

        // Pinecone se search karo
        const results = await queryMemory({ 
            queryVector: queryVector, 
            limit: 5 
        });

        res.json({
            success: true,
            message: "✅ Query successful!",
            queryText: text,
            resultsFound: results?.length || 0,
            results: results || []
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            success: false
        });
    }
});

export default router;
