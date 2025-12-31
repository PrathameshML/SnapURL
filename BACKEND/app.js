import express from "express";
import {nanoid} from "nanoid"
import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from "./src/config/monogo.config.js"
import urlRoutes from "./src/routes/url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectToOriginal } from "./src/controller/url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"

dotenv.config("./.env")

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true // 👈 this allows cookies to be sent
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api/create", urlRoutes)

// Health check endpoint for monitoring and quick uptime checks
app.get('/health', (req, res) => {
  const dbState = mongoose.connection ? mongoose.connection.readyState : 0; // 1 = connected
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    database: dbState === 1 ? 'connected' : 'disconnected'
  })
})

app.get("/:id",redirectToOriginal)

app.use(errorHandler)

app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on http://localhost:3000");
})

// GET - Redirection 
