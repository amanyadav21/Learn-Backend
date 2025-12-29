import { config } from "dotenv";
import app from "./src/app.js";
import connectTodb from "./src/db/db.js";

config();

connectTodb();

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})