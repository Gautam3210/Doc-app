import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// API to register user

const registerUser = async (req , res)=>{
  try {

     // Log the incoming request body for debugging
    console.log("Request body:", req.body);

    // Check if req.body exists and is an object
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ success: false, message: "Request body is missing or invalid JSON" });
    }
   
    const {name,email,password}=req.body

    if(!name || !password || !email){
     return res.status(400).json({ success: false, message: "Missing details: name, email, and password are required." });
    }
    
    //Validating email format
    if(!validator.isEmail(email)){
      return res.status(400).json({success:false,message:"Enter a valid email"})
    }

     //validating strong password
    if (password.length < 8) {
      return res.status(409).status(400).json({success:false,message:"Enter Strong password"})
    }

    //hasing user password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)

    const userData ={
      name,
      email,
      password : hashedpassword
    }

    const newUser = new userModel(userData)
    const user = await  newUser.save()
   
    //create JWT Token
   const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
   res.json({success:true,token})

  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message: "Server error: " + error.message})
    
  } 
}


  // Api for user login
   const loginUser = async (req,res)=>{

    try {

      const {email,password} =req.body
      const user = await userModel.findOne({email})

      if(!user){
         res.json({success:false,message:' User does not exist'})
      }
      const isMatch = await bcrypt.compare(password,user.password)

      if(isMatch){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
      res.json({success:true,token})

      }
      else{
        res.json({success:false,message:"Invalid credentials"})
      }

    } catch (error) {
      console.log(error)
    res.status(500).json({success:false,message: "Server error: " + error.message})
      
    }
   }
export {registerUser,loginUser}