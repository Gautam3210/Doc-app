import express from 'express'
import { addDoctor,loginAdmin } from '../controllers/admincontroller.js';


import upload from '../middleware/multter.js';
import authAdmin from '../middleware/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);

adminRouter.post('/login',loginAdmin);

export default adminRouter;