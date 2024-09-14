import express,{Request,Response} from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import { register } from "module"
import { check, validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import verifyToken from "../middleware/auth"
const router=express.Router()

router.post("/login",[
    check("email","Email is required").isEmail(),
    check("password","Password is required or more the 6 character").isLength({min:6})
],async (req:Request,res:Response)=>{
    const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(404).json({message:error.array()})
    }
    let {email,password}=req.body
    try{
        let user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User does not exists"})
        }
        let isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({message:"password is not correct"})
        }
        const token=jwt.sign({
            userId:user._id},
            process.env.JWT_SECRET_KEY as string,{
                expiresIn:"1d"
            }
        )
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000
        })
        return res.status(200).json({userId:user._id,message:"Login Successfully"})
    }catch(error){
        console.log(error)
        res.status(404).json("Something Went wrong")
    }
})
router.get("/validate-token",verifyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId})
})
router.post("/logout",(req:Request,res:Response)=>{
    res.cookie("auth_token","",{
        expires:new Date(0)
    })
    res.send()
})
export default router