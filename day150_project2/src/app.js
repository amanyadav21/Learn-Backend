import express from 'express';
import cookieParser from 'cookie-parser';

// import routes
import authRoutes from './routes/auth.routes.js'
import chatRoutes from './routes/chat.routes.js'
import embeddingRoutes from './routes/embedding.routes.js'
import vectorRoutes from './routes/vector.routes.js'


const app = express()

// using middleware
app.use(express.json())
app.use(cookieParser())

// use routes
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/embed', embeddingRoutes)
app.use('/api/vector', vectorRoutes)



export default app