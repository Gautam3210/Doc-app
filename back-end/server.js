import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminroutes.js';


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

 app.use('/api/admin',adminRouter)    // localhost:4002/api/admin/add-doctor

 

 app.get('/',(req,res)=>{
  res.send("API WORKING GOOD")
 })

 app.listen(port,()=>console.log("server started",port))