import express,{Request,Response} from "express"
import multer from "multer"
import cloudinary from "cloudinary"
import Hotel from "../models/hotel"
import verifyToken from "../middleware/auth"
import {body} from "express-validator"
import { HotelType } from "../shared/types"
const router=express.Router()

const storage=multer.memoryStorage()
const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024
    }
})
// /api/my-hotels
router.post("/",verifyToken,[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("description").notEmpty().withMessage("description is required"), 
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("pricePerNight is required and must be number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities is required")
],upload.array("imageFiles",6), async (req:Request,res:Response)=>{ 
    try{
        const imageFiles=req.files as Express.Multer.File[]
        const newHotel:HotelType=req.body
        console.log(imageFiles)
        //upload the image to the cloudnary
        const uploadPromises=imageFiles.map(async (image)=>{
            try { 
                const b64 = Buffer.from(image.buffer).toString("base64");
                let dataURL = "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURL);
                return res.url;
              } catch (err) {
                console.error("Error uploading image:", err);
                throw err;
              }
        })
    
        const imageUrls= await Promise.all(uploadPromises) 
        newHotel.imageUrls=imageUrls
        newHotel.lastUpdated=new Date()
        newHotel.userId=req.userId
        const hotel=new Hotel(newHotel)
        await hotel.save()
        res.status(201).send(hotel)
    }catch(err){
        console.log("Error creating hotel: "+JSON.stringify(err, null, 2))
        res.status(500).json({message:"Something went Wrong"})
    }
})


router.get("/",verifyToken,async (req:Request,res:Response)=>{
   
    try{
        const hotels=await Hotel.find({userId:req.userId})
        res.json(hotels)
    }catch(err){
        res.status(500).json({message:"Error fetching hotel"})

    }
})


export default router