import { Server } from "socket.io";
import cookie from 'cookie'
import JWT from 'jsonwebtoken'
import userModel from "../models/user.model.js";
import aiService from "../services/ai.service.js";
import messageModel from "../models/message.model.js";
/*
message model kam kam aye hai ki message ka the user ka o vi 
save karna hai or - joh AI ne message diya hai usko vi save karna 
*/

function initSocketServer(httpServer) {
    const io = new Server(httpServer, {})

    // aye socket io ka middle were hai
    // isme define karte hai ki connect karna hai ki disconnnted karna
    io.use(async (socket, next) => {
        // const cookies = socket.handshake.headers.cookie;
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "")
        if(!cookies.token) {
            next(new Error("Authentication error: No token provided"));
        }

        try{
            const decoded = JWT.verify(cookies.token, process.env.JWT_SECRET)
            const user = await userModel.findById(decoded.id)

            socket.user = user
            next()

        } catch (err) {
            next(new Error("Authentication error : Invalid token",))
        }
    })

    io.on("connection", (socket) => {

        /*
        messagePayload = {
            chat: chatId,
            content: message text content
        }
        */

        console.log("User Connected:", socket.user.email)
        console.log("New socket connection:", socket.id)
        socket.on("ai-message", async(messagePayload) => { 
            console.log("AI Message Received", messagePayload) /* isme {chat id, content}  hota hai  */

            try {
                // 1. User ka message database me save karo
                await messageModel.create({ 
                    chat: messagePayload.chat, 
                    user: socket.user._id, 
                    content: messagePayload.content, 
                    role: "user"
                })

                // 1.5. Chat history fetch karo (AI ko context dene ke liye)
                const chatHistory = await messageModel.find({
                    chat: messagePayload.chat
                }) // Oldest first
                

                // 2. AI se response lo
                const aiResponse = await aiService.getGroqChatCompletions(chatHistory.map(item => ({
                    role: item.role,
                    content: item.content
                })))
                console.log("AI Response:", aiResponse)

                // 3. AI ka response bhi database me save karo
                await messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: aiResponse,
                    role: "assistant"
                })

                // 4. Frontend ko response bhejo
                socket.emit("ai-response", { 
                    response: aiResponse, 
                    userId: socket.user._id,
                    chat: messagePayload.chat
                })
            } catch (error) {
                console.error("AI Service Error:", error)
                socket.emit("ai-response", { 
                    response: "Error occurred: " + error.message,
                    userId: socket.user._id,
                    chat: messagePayload.chat,
                    error: true
                })
            }
        })
    })
}

export default initSocketServer