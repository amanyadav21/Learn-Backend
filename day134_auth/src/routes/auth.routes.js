import express from 'express'
import userModel from '../models/user.model.js';


const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body

    const user = await userModel.create({
        username,password
    })

    res.status(201).json({
        message:"User registered successfully",
        user
    })
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


export default router