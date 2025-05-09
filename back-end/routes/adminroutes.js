import express from 'express'
import { addDoctor } from '../controllers/admincontroller'
import upload from '../middleware/multter'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',upload.single('image'),addDoctor)

export default adminRouter