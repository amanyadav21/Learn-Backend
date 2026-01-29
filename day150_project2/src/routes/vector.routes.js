import express from 'express';
import messageModel from '../models/message.model.js';

const router = express.Router();

/**
 * GET /api/vector/:messageId
 * Specific message ka embedding dekho
 */
router.get('/:messageId', async (req, res) => {
    try {
        const message = await messageModel.findById(req.params.messageId);
        
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        if (!message.embedding) {
            return res.status(404).json({ error: "No embedding for this message" });
        }

        res.json({
            messageId: message._id,
            content: message.content,
            dimensions: message.embedding.length,
            embedding: message.embedding,
            role: message.role,
            createdAt: message.createdAt
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/vector/chat/:chatId
 * Chat ke sabhi messages aur unke embeddings dekho
 */
router.get('/chat/:chatId', async (req, res) => {
    try {
        const messages = await messageModel
            .find({ chat: req.params.chatId })
            .select('content role embedding createdAt')
            .sort({ createdAt: -1 });

        const messagesWithEmbeddings = messages.map(msg => ({
            messageId: msg._id,
            content: msg.content,
            role: msg.role,
            hasPEmbedding: !!msg.embedding,
            dimensions: msg.embedding ? msg.embedding.length : 0,
            createdAt: msg.createdAt
        }));

        res.json({
            chatId: req.params.chatId,
            totalMessages: messagesWithEmbeddings.length,
            messages: messagesWithEmbeddings
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
