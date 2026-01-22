import dotenv from 'dotenv'
dotenv.config()
import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import initSocketServer from "./src/sockets/socket.server.js";
import http from 'http'

const httpServer = http.createServer(app)
 



connectDB()
initSocketServer(httpServer)

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})