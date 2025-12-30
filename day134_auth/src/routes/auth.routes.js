import express from 'express'
import userModel from '../models/user.model.js';
import  jwt from 'jsonwebtoken'


const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        username
    })

    if(isUserAlreadyExists) {
        return res.status(409).json({
            message:"Username already in used"
        })
    }

    const user = await userModel.create({
        username,password
    })

    const token = jwt.sign({ // help to create unique
        id:user._id,

    },process.env.JWT_SECRET) // use jwtsecret.com generator

    res.status(201).json({
        message:"User registered successfully",
        user,
    })

    res.cookie("token", token)
})


router.post('/login', async (req, res) => {
    const {username, password} = req.body
    /*isme aye hai ki pata karna hoga ki user phle se hai ki nahi */


    const isUserExist = await userModel.findOne({
        username:username
    })

    if(!isUserExist) {
        return res.status(401).json({
            message:"user account not found"
        })
    }

    const isPasswordValid = password == isUserExist.password

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    res.status(200).json({
        message:"User loggedIn successfully"
    })

})


router.get('/user', async (req, res) => {
    // const {token} = req.body
    const {token} = req.cookies

    if(!token) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    // jwt verify aye check karti hai ki tumara tokon sahi hai ki nahi
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id:decoded.id
        }).select("-password").lean() // iska mtb password read nahi hoga db se frontend
        // mtb joh chig nahi magwani - usko .select kar ke nahi show karwte hai

        res.status(200).json({
            message: "User data fetched successfully",
            user
        })

        res.send(decoded)
    }catch(err) {
        return res.status(401).json({
            message: "Unauthorized - Invalid token"
        })
    }

     
})

export default router