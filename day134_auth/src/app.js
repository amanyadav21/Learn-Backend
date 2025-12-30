import express from "express"
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json()) // -- it is middleware
app.use(cookieParser()) // -- it is middleware that used for store token in browser via server

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