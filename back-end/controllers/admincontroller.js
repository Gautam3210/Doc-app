import validator from "validator"
import bycrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"

//API for adding doctor


const addDoctor = async (req,res)=>{
  try{
    const {name,email,password,speciality,degree,experience,about,fees,address}=req.body

    const imageFile =req.file

   //checking for all data to add doctor
   if( !name|| !email || !password || !speciality ||!degree || !experience || !about || !fees ||!address){

    return res.json({succss:false,message:"Missing Details"})
   }
    //validating email format
    if(!validator.isEmail(email)){
       return res.json({succss:false,message:"Please enter a valid email"})
    }

    //validating password
    if(password.length < 8){
        return res.json({succss:false,message:"Please enter a strong password"})
    }
    // hashing doctor password
    const salt = await bycrypt.genSalt(10)

    const hashedpassword = await bycrypt.hash(password,salt)
    
    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl = imageUpload.secure_url

    const doctorData ={
      name,
      email,
      image:imageUrl,
      password:hashedpassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address:JSON.parse(address),
      date:Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.json({succss:true,massage:"Doctor Added"})
  }
  catch (error)
  {
     console.log(error)
     res.json({succss:false,massage:error.massage})
  }
}
export {addDoctor}