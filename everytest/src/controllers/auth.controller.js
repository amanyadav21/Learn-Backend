import userModel from '../models/user.model.js'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const registerController = async (req, res) => {
    const {username, password} = req.body
    
    const isUserAlreadyExist = await userModel.findOne({
        username: username
    })

    if(isUserAlreadyExist){
        return res.status(200).send({
            success: false,
            message: 'User already exists'
        })
    }

    const newUser = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

    const token = JWT.sign({id:newUser._id},process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        newUser
    })
}


export const loginController = async (req, res) => {
    const {username, password} = req.body;

    const user = await userModel.findOne({
        username
    })

    if(!user) {
        return res.status(400).json({
            message: "User not found"
        })
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid password"
        })
    }

    const token = JWT.sign({id:user._id}, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user:{
            username: user.username,
            id: user._id
        }
    })
}
