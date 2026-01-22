import dotenv from 'dotenv'
dotenv.config()
import app from "./src/app.js";

import { createServer } from "http";
import { Server } from "socket.io";
// AI service (correct path)
import GenerateResponse from './src/service/ai.service.js';

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

// Chat history - purane messages yaad rakhne ke liye
const chatHistory = []

io.on("connection", (socket) => {
    console.log("A user connected!")

    socket.on("disconnect", () => {
      console.log("A user disconnect")
    })

    socket.on("message", (data) => {
      console.log("message reveived")
      console.log(data)
    })

    socket.on("ai-message", async (data) => {
        // User ka message print karo
        console.log("AI Message Received: ", data.prompt)
        
        // User ka message history mein save karo
        chatHistory.push({
            role: "user",
            content: data.prompt
        })
        
        // Puri chat history AI ko bhejo (taaki AI ko purane messages yaad rahein)
        const aiResponse = await GenerateResponse(chatHistory)
        
        // AI ka response bhi history mein save karo
        chatHistory.push({
            role: "assistant",
            content: aiResponse
        })
        
        // AI ka jawab print karo
        console.log("AI Response: ", aiResponse)
        
        // Frontend ko jawab bhejo
        socket.emit("ai-message-response", aiResponse)
    })

});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})