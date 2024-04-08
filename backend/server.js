import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "../backend/routes/auth.routes.js";
import messageRoutes from "../backend/routes/message.routes.js"
import userRoutes from "../backend/routes/users.routes.js"
import { connectToDB } from "./db/connectToDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); 
app.use(cookieParser())

app.use("/api/auth/", authRoutes);
app.use("/api/messages",messageRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server listening on port ${PORT}`);
});
