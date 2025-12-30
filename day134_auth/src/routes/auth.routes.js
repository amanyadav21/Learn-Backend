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


router.get('/user', async (req, res) => { // [Protected]
    // const {token} = req.body
    const {token} = req.cookies
    // aya check karna hoga ki token kis name se save kiye ho or fir usi name se token ready karna hoga
    // const {token} = req.cookies.chacha

    if(!token) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    // jwt verify aye check karti hai ki tumara tokon sahi hai ki nahi
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // jwt.verify - aye check karti hai ki joh token apne bje hai
        // usko hamare ki server ne create kiya hai ki nahi

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


router.post('/login', async (req, res) => {
    const {username, password} = req.body
    /*isme aye hai ki pata karna hoga ki user phle se hai ki nahi */


    const isUserExist = await userModel.findOne({
        username:username
    })

    if(!isUserExist) {
        return res.status(404).json({
            message:"user account not found"
        })
    }

    const isPasswordValid = password == isUserExist.password

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({id:user._id}.process.env.JWT_SECRET)

    res.cookie("chacha", token , {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 7),
    })

    res.status(200).json({
        message:"User loggedIn successfully",
        user
    })

})

router.get('/logout', async (req, res) => {
    res.clearCookie("chacha")

    res.status(200).json({
        message: "user logged out successfully"
    })
})



export default router