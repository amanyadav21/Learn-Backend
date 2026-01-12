import app from "./src/app.js";

import { createServer } from "http";
import { Server } from "socket.io";

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

    socket.on("mama", () => {
      console.log("Mama koh message mil gya")
    })
});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})