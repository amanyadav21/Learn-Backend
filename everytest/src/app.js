import express from 'express'
import router from './routes/index.routes.js';
import loggedMiddleware from './middleware/logged.middleware.js';


const app = express()

app.use(express.json())


app.use(loggedMiddleware)
app.use('/', router)


export default app;