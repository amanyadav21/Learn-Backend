import express from 'express'
import connectTodb from './db/db.js'

import authRoutes from './routes/auth.routes.js'

import dotenv from 'dotenv'
dotenv.config()



const app = express()
app.use('/api/auth', authRoutes);


connectTodb()

export default app