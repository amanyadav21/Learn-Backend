import { Server } from "socket.io";
import cookie from 'cookie'
import JWT from 'jsonwebtoken'
import userModel from "../models/user.model.js";
import aiService from "../services/ai.service.js";
import messageModel from "../models/message.model.js";

/*
Socket Server Setup:
- Yeh file real-time communication handle karta hai
- Har user ka message aur AI ka response dono database mein store hota hai
- Chat history ko AI ko bhejte hain taaki woh context samjhe
*/

function initSocketServer(httpServer) {
    // Socket.io server initialize kiya
    const io = new Server(httpServer, {})

    // Authentication Middleware - Connection se pehle user verify karte hain
    io.use(async (socket, next) => {
        // Cookie se token nikala
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "")
        if(!cookies.token) {
            next(new Error("Authentication error: No token provided"));
        }

        try{
            // JWT token verify kiya
            const decoded = JWT.verify(cookies.token, process.env.JWT_SECRET)
            // User database se find kiya
            const user = await userModel.findById(decoded.id)

            // Socket pe user attach kiya (baad mein use kar sakte hain)
            socket.user = user
            next()

        } catch (err) {
            // Invalid token toh error bhejna
            next(new Error("Authentication error : Invalid token",))
        }
    })

    // Jab koi user connect hota hai
    io.on("connection", (socket) => {
        console.log("✅ User Connected:", socket.user.email)
        console.log("📱 Socket ID:", socket.id)
        
        // "ai-message" event listener - Frontend se message aata hai
        socket.on("ai-message", async(messagePayload) => { 
            /*
            messagePayload structure:
            {
                chat: "chatId",
                content: "user ka message"
            }
            */
            console.log("💬 AI Message Received:", messagePayload)

            try {
                // STEP 1: User ka message database me save karo
                await messageModel.create({ 
                    chat: messagePayload.chat, 
                    user: socket.user._id, 
                    content: messagePayload.content, 
                    role: "user"  // Role "user" set kiya
                })
                console.log("📥 User message saved to DB")

                // STEP 1.5: Pichle 20 messages fetch karo (AI ka context hone ke liye)
                const chatHistory = await messageModel.find({
                    chat: messagePayload.chat
                }).sort({ createdAt: -1})  // Newest first
                  .limit(20)                // Sirf 20 messages
                  .lean()                   // Lean() - faster queries
                  .reverse()                // Reverse karke oldest first banaya
                
                console.log("📚 Chat history fetched:", chatHistory.length, "messages")

                // STEP 2: AI service ko messages bhejo (Groq API call)
                const aiResponse = await aiService.getGroqChatCompletions(
                    chatHistory.map(item => ({
                        role: item.role,        // "user" ya "assistant"
                        content: item.content   // Message text
                    }))
                )
                console.log("🤖 AI Response:", aiResponse)

                // STEP 3: AI ka response database me save karo
                await messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: aiResponse,
                    role: "assistant"  // Role "assistant" set kiya
                })
                console.log("💾 AI message saved to DB")

                // STEP 4: Frontend ko AI ka response bhejo (Socket emit)
                socket.emit("ai-response", { 
                    response: aiResponse,       // AI ka jawab
                    userId: socket.user._id,   // User ka ID
                    chat: messagePayload.chat   // Chat ID
                })
                console.log("📤 Response sent to frontend")
                
            } catch (error) {
                // Agar error aaye toh
                console.error("❌ AI Service Error:", error)
                // Frontend ko error message bhejo
                socket.emit("ai-response", { 
                    response: "Error occurred: " + error.message,
                    userId: socket.user._id,
                    chat: messagePayload.chat,
                    error: true  // Error flag
                })
            }
        })
    })
}

export default initSocketServer