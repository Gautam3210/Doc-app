import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminroutes.js";
import doctorRouter from "./routes/doctorroutes.js";
import userRouter from "./routes/userRoutes.js";

// Initialize app
const app = express();
const port = process.env.PORT || 4000;

// Connect DB and Cloudinary
connectDB();
connectCloudinary();

// Middleware — JSON parser must come before routes
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// API routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Test route to check JSON parsing
app.post("/test", (req, res) => {
  console.log("Test request body:", req.body);
  res.json({ success: true, data: req.body });
});

app.get("/", (req, res) => {
  res.send("API WORKING GOOD");
});

app.listen(port, () => console.log("Server started on port", port));
