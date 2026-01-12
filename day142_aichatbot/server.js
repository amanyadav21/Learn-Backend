import dotenv from 'dotenv'
dotenv.config()
import app from "./src/app.js";

import { createServer } from "http";
import { Server } from "socket.io";
import GenerateResponse from './src/service/ai.service.js';

const httpServer = createServer();

const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("A user connected!")

    socket.on("disconnect", () => {
      console.log("A user disconnect")
    })

    socket.on("message", () => {
      console.log("message reveived")
    })

    socket.on("aimessage", async (data) => {
        console.log("Received AI Message:", data.propmt);
        const response = await GenerateResponse(data.propmt);
        console.log("AI Response:", response)
        socket.emit("Ai-message-response",{response})
    })

});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})