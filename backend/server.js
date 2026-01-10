import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); //
// dotenv config shoudl be on top

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.get('/', (req,res) => {
    return res.status(200).send("<h1>weclome to node");
})

const PORT = process.env.PORT || 8080;
app.listen( PORT, () => {
    console.log(`server running on ${process.env.PORT}`.bgMagenta.white);
})