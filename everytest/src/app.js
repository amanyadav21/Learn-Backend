import express from 'express'
import router from './routes/index.routes.js';
import loggerMiddleware from './middleware/simple.middleware.js';

const app = express()

app.use(express.json())
app.use(loggerMiddleware)

app.use('/', router)


export default app;