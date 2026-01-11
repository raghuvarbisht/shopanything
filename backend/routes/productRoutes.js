import express from 'express';
import { getAllProduct, getProductById } from '../controllers/productController.js';

const router = express.Router();
 //rest api url syntax 
router.get('/', getAllProduct);
router.get('/:id', getProductById);




export default router;