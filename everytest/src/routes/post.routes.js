import express from 'express'
import JWT from 'jsonwebtoken'
import userModel from '../models/user.model.js'

import authMiddleware from '../middlewares/auth.middleware.js'
import multer from 'multer'
import { createPostController } from '../controllers/post.controller.js'


const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})



/* POST /api/posts [Protected] */
router.post('/', authMiddleware, /* req.user = userData */
    upload.single("image"),
    createPostController)


export default router

