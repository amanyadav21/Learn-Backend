import express from 'express'
import connectTodb from './db/db.js'

import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'
dotenv.config()



const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes)


connectTodb()

export default app