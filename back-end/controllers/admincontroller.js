import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

// API for adding doctor
const addDoctor = async (req, res) => {
    console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body;

    const imageFile = req.file;

    // Check for all required fields
    if (
      !name || !email || !password || !speciality ||
      !degree || !experience || !about || !fees || !address
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password length
    if (password.length < 10) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // assumes address is a JSON string
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message || "Server error" });
  }
};

export { addDoctor };
