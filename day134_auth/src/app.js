/* ========================================
   Import Dependencies
   ======================================== */
import express from 'express'
import connectTodb from './db/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/index.routes.js'
import dotenv from 'dotenv'

// Environment variables load kar rahe hain .env file se
dotenv.config()

/* ========================================
   Express App Initialization
   ======================================== */
const app = express()

/* ========================================
   Middleware Setup
   ======================================== */
// JSON body parser middleware - Request body ko JSON format mein parse karta hai
app.use(express.json())

// Cookie parser middleware - Token ko browser mein store karne ke liye via server
// Ye middleware cookies ko read aur write karne mein help karta hai
app.use(cookieParser())

/* ========================================
   Database Connection
   ======================================== */
// MongoDB database se connection establish kar rahe hain
connectTodb()

/* ========================================
   Routes Configuration
   ======================================== */
// Authentication routes - /auth prefix ke sath
/*
   Available Routes:
   - POST /auth/register  - Naya user register karne ke liye
   - POST /auth/login     - User login karne ke liye
   - GET  /auth/user      - Logged in user ka data fetch karne ke liye
   - GET  /auth/logout    - User logout karne ke liye
*/
app.use('/auth', authRoutes)

// Agar humko aur routes create karne hain toh yahan add kar sakte hain
// Different features ke liye alag alag routes banate hain
// Example:
// app.use('/product', productRoutes)    - Product related routes
// app.use('/customer', customerRoutes)  - Customer related routes
// app.use('/order', orderRoutes)        - Order related routes

// App export kar rahe hain taaki server.js mein use kar sakein
export default app;