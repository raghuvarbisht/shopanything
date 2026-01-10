import express from 'express';
import { userController } from '../controllers/userControlller.js';
// router object
const router = express.Router();

//routes 
router.get('/users', userController)

export default router;