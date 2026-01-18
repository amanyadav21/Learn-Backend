import dotenv from 'dotenv'
dotenv.config()
import app from "./src/app.js";

import { createServer } from "http";
import { Server } from "socket.io";
import GenerateResponse from './src/service/ai.service.js';

const httpServer = createServer(app);

const io = new Server(httpServer, { /* options */ });

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
        console.log("Received AI Message:", data.prompt);
        const response = await GenerateResponse(data.prompt);
        console.log("AI Response:", response)
        socket.emit("Ai-message-response",{response})
    })

});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})