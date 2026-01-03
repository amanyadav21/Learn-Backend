import express from 'express'
import userModel from '../models/use.model.js';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';

const router = express.Router();

/* ========================================
   User Registration Route
   ======================================== */
// POST /register - Naya user create karta hai
router.post('/register', async (req, res) => {
    // Request body se username aur password le rahe hain
    const {username, password} = req.body

    // Check kar rahe hain ki username already exist toh nahi karta
    const isUserAlreadyExists = await userModel.findOne({
        username
    })

    // Agar user already exist karta hai toh 409 Conflict status bhejo
    if(isUserAlreadyExists) {
        return res.status(409).json({
            message: "Username already Exist"
        })
    }

    // Naya user database mein create kar rahe hain
    const user = await userModel.create({
        username, password
    })

    // JWT token generate kar rahe hain user ki ID se
    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET)

    // Token ko cookie mein set kar rahe hain
    res.cookie("token", token)
    
    // Success response bhej rahe hain
    res.status(201).json({
        message: "User register successfully"
    })
})


/* ========================================
   Get User Data Route (Protected)
   ======================================== */
// GET /user - Logged in user ka data return karta hai
router.get('/user', async (req, res) => {
    // Cookie se token le rahe hain
    const token = req.cookies.token

    // Agar token nahi hai toh unauthorized error bhejo
    if(!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try{
        // Token verify kar rahe hain aur user ID nikaal rahe hain
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // User ID se user ka data fetch kar rahe hain
        // .select('-password') - password field exclude kar rahe hain security ke liye
        // .lean() - plain JavaScript object return karega (faster)
        const user = await userModel.findOne({
            _id:decoded.id
        }).select('-password').lean()

        // User data success response mein bhej rahe hain
        res.status(200).json({
            message: "User data fetched", 
            user
        })
    }catch(err) {
        // Agar token invalid hai ya expired hai toh error bhejo
        return res.status(401).json({
            message: "Unauthorized invalid User"
        })
    }
})

/* ========================================
   User Login Route
   ======================================== */
// POST /login - User ko authenticate karta hai
router.post('/login', async (req, res) => {
    // Request body se username aur password le rahe hain
    const {username, password} = req.body

    // Username se user ko database mein search kar rahe hain
    const isUserExist = await userModel.findOne({
        username:username
    })

    // Agar user exist nahi karta toh 404 error bhejo
    if(!isUserExist) {
        return res.status(404).json({
            message: "User account not found",
        })
    }

    // Password match kar rahe hain (plain text comparison)
    // Note: Production mein bcrypt use karo password hashing ke liye
    const isPasswordValid = password == isUserExist.password

    // Agar password galat hai toh 401 error bhejo
    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    // JWT token generate kar rahe hain user ID se
    const token = jwt.sign({id: isUserExist._id}, process.env.JWT_SECRET)

    // Token ko secure cookie mein set kar rahe hain
    res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 din ke liye valid
        httpOnly: true // JavaScript se access nahi ho sakta (XSS protection)
    })

    // Success response user data ke sath bhej rahe hain
    res.status(200).json({
        message: "User logged successfully",
        user: isUserExist
    })
})

/* ========================================
   User Logout Route
   ======================================== */
// GET /logout - User ko logout karta hai
router.get('/logout', async (req, res) => {
    // Browser se token cookie clear kar rahe hain
    res.clearCookie("token")
    
    // Logout success message bhej rahe hain
    res.status(200).json({
        message: "User logged out successfully"
    })
})


export default router;



