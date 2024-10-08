import express,{Request,Response} from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import { register, ResolveFnOutput } from "module"
import { check, validationResult } from "express-validator"
import verifyToken from "../middleware/auth"
const router=express.Router()

router.get("/me",verifyToken,async (req:Request,res:Response)=>{
    const userId=req.userId

    try{
        const user=await User.findById(userId).select("-password")
        if(!user)res.status(404).json({messgae:"User Not found"})
        res.json(user)

    }catch(err){
        console.log(err)
        res.status(404).json({message:"Error in Booking Hotel"})
    }
})

router.post("/register",[
    check("firstName","First name is required").isString(),
    check("lastName","Last name is required").isString(),
    check("email","Email name is required").isEmail(),
    check("password","Password with 6 or more characters is required").isLength({min:6}),
],async (req:Request,res:Response)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(404).json({message:error.array()})
    }
    try{
        let user=await User.findOne({email:req.body.email})

        if(user){
            return res.status(404).json("User already existst")
        }
        user=new User(req.body)
        await user.save()

        const token=jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET_KEY as string, {
            expiresIn:"1d"
        })
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000
        })
        res.status(202).json("User register Successfully")
    } 
    catch(err){
        console.log(err)
        res.status(500).send({message:"Something went wrong"})
    }
    
})

export default router