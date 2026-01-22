import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { createChat } from '../controllers/chat.controller.js'


const router = express.Router()

// POST /api/chat/
router.post('/', authMiddleware.authUser, createChat)

export default router