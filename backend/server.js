import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
// api limiter saving from  ddos , brute force
import { apiLimiter } from "./middlewares/rateLimiter.js";
import helmet from 'helmet'; 
//routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { connectDB } from './config/db.js';


dotenv.config(); //
// dotenv config shoudl be on top
// connecteding db
connectDB();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const app = express();
app.use(morgan("dev")); // for logging
app.use(express.json()); // for json parse
app.use(cors()); // for cors issue
app.use(cookieParser());// uae for cookie
// added security header using helmet
app.use(helmet());
// to apply on specific route app.use('/api/v1/product', apiLimiter);
//apply rate limit on all api 
app.use(apiLimiter);

app.use('/api/v1/user', userRoutes); // register route
app.use('/api/v1/product', productRoutes); // products

app.get('/', (req,res) => {
    return res.status(200).send("<h1>welcome to node</h1>");
})

const PORT = process.env.PORT || 8080;
app.listen( PORT, () => {
    console.log(`server running on PORT: ${process.env.PORT} on ${process.env.NODE_ENV} mode`.bgMagenta.white);
})