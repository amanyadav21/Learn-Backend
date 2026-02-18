import { Server } from "socket.io";
import cookie from 'cookie'
import JWT from 'jsonwebtoken'
import userModel from "../models/user.model.js";
import aiService from "../services/ai.service.js";
import messageModel from "../models/message.model.js";
import { createMemory, queryMemory } from '../services/vector.service.js'

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
        
        // Frontend se AI message receive karo
        socket.on("ai-message", async(messagePayload) => { 
            console.log("💬 Message Received:", messagePayload.content)

            try {
                // Vector generate karo
                const vectors = await aiService.generateVector(messagePayload.content)
                console.log(`✅ Vector generated: ${vectors.length} dimensions`)

                // User ka message save karo with embedding
                const userMessage = await messageModel.create({ 
                    chat: messagePayload.chat, 
                    user: socket.user._id, 
                    content: messagePayload.content, 
                    role: "user",
                    embedding: vectors  // Embedding save karo
                })
                console.log("💾 User message + embedding saved in MongoDB")

                // ⭐ PINECONE MEIN SAVE KARO ⭐
                try {
                    await createMemory({
                        vectors: vectors,
                        metadata: {
                            messageId: userMessage._id.toString(),
                            chatId: messagePayload.chat,
                            userId: socket.user._id.toString(),
                            role: "user",
                            content: messagePayload.content
                        },
                        messageId: userMessage._id.toString()
                    })
                    console.log("🔺 ✅ Vector SAVED in PINECONE!")
                } catch (pineconeErr) {
                    console.error("🔺 ❌ PINECONE ERROR:", pineconeErr.message)
                }

                // 📟 SHORT-TERM MEMORY: Last 20 messages
                const shortTermMemory = await messageModel
                    .find({ chat: messagePayload.chat })
                    .sort({ createdAt: -1 })
                    .limit(20)
                    .sort({ createdAt: 1 })
                
                console.log(`📟 Short-term: ${shortTermMemory.length} messages`)

                // 💾 LONG-TERM MEMORY: Similar vectors from Pinecone
                let longTermMemory = []
                try {
                    const similarVectors = await queryMemory({
                        queryVector: vectors,
                        limit: 5
                    })
                    
                    longTermMemory = similarVectors
                        ?.filter(m => m.score > 0.7)
                        ?.map(m => ({
                            role: m.metadata?.role || "user",
                            content: m.metadata?.content || ""
                        })) || []
                    
                    console.log(`💾 Long-term: ${longTermMemory.length} relevant memories`)
                } catch (err) {
                    console.error("❌ Long-term error:", err.message)
                }

                // 🤖 Combine both memories for AI
                const chatContext = [
                    ...longTermMemory,
                    ...shortTermMemory
                ].map(item => ({
                    role: item.role,
                    content: item.content
                }))

                console.log(`📚 Total context: ${chatContext.length} messages`)

                // Groq AI se response lo
                const aiResponse = await aiService.getGroqChatCompletions(chatContext)
                console.log("🤖 AI Response:", aiResponse.substring(0, 50) + "...")

                // AI response save karo
                await messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: aiResponse,
                    role: "assistant"
                })

                // Frontend ko response bhejo
                socket.emit("ai-response", { 
                    response: aiResponse,
                    userId: socket.user._id,
                    chat: messagePayload.chat
                })
                console.log("📤 Response sent!")
                
            } catch (error) {
                console.error("❌ Error:", error.message)
                socket.emit("ai-response", { 
                    response: "Sorry, something went wrong: " + error.message,
                    userId: socket.user._id,
                    chat: messagePayload.chat,
                    error: true
                })
            }
        })
    })
}

export default initSocketServer