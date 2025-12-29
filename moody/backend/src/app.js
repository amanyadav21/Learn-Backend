import express from 'express'
import cors from 'cors'
import songRoutes from './routes/song.routes.js';

const app = express();

// Enable CORS for frontend communication
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', songRoutes);

export default app;