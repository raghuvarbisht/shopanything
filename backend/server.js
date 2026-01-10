import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
//routes
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config(); //
// dotenv config shoudl be on top
// connecteding db
connectDB();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRoutes); // register route

app.get('/', (req,res) => {
    return res.status(200).send("<h1>weclome to node");
})

const PORT = process.env.PORT || 8080;
app.listen( PORT, () => {
    console.log(`server running on ${process.env.PORT}`.bgMagenta.white);
})