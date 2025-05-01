import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';


//app config
 const app=express()
 const port=process.env.PORT || 4002
 //conect DATA BASE
 connectDB()

 //connect API CLOUDINARY
 connectCloudinary()

 //middlewares
 app.use(express.json())
 app.use(cors())

 //api endpoint

 app.get('/',(req,res)=>{
  res.send("API WORKING GOOD")
 })

 app.listen(port,()=>console.log("server started",port))