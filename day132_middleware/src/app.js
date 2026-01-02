import express from 'express'
import router from './routes/index.routes.js';
import loggedMiddleware from './middleware/loggedMiddleware.js';



const app = express()

app.use(express.json())


//middleware joh working on every Routes
app.use(loggedMiddleware)

//Route
app.use('/', router)



export default app;