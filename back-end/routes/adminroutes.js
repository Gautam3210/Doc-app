import express from 'express'
import { addDoctor } from '../controllers/admincontroller.js';


import upload from '../middleware/multter.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',upload.single('image'),addDoctor)

export default adminRouter