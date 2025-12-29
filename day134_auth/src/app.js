import express from "express"
import authRoutes from "./routes/auth.routes.js";

const app = express()
app.use(express.json())

/*
POST /auth/register
POST /auth/login
POST /auth/user
POST /auth/logout
*/

app.use('/auth', authRoutes)
// agar humko koi or route create karna hoga toh uske liye liye u
// alg alg route dange
// app.use('/product',productRoutes)
// app.use('/cutomer',customerRoutes)

export default app;