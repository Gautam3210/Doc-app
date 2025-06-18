import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// API to register user

const registerUser = async (req, res) => {
  try {
    // Log the incoming request body for debugging
    console.log("Request body:", req.body);

    // Check if req.body exists and is an object
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        success: false,
        message: "Request body is missing or invalid JSON",
      });
    }

    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing details: name, email, and password are required.",
      });
    }

    //Validating email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }

    //validating strong password
    if (password.length < 8) {
      return res
        .status(409)
        .status(400)
        .json({ success: false, message: "Enter Strong password" });
    }

    //hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedpassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    //create JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};

// Api for user login
const loginUser = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, message: "Request body is missing" });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      res.json({ success: false, message: " User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};

//API to get user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData: userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile

const updateProfile = async (req, res) => {
  try {
    
    const {name, phone, address, dob, gender } = req.body;

    const imageFile = req.file;
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(req.userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(req.userId, { image: imageURL });
    }
    res.json({ success: true, message: "profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile };
