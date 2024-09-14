import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"
import path from "path";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
const app=express(); 
app.use(cookieParser())
app.use(express.json());//convert api body request into json automatically
app.use(express.urlencoded({extended:true})); //
app.use(cors({
    origin:process.env.FRONTEND_URL, 
    credentials:true
})); //it prevents certain request from certain url 
 
app.use(express.static(path.join(__dirname,"../../frontend/dist")))
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.listen(3030,()=>{
    console.log("server started at 3030") 
});