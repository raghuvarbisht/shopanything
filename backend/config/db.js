import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongoose connected${mongoose.connection.host}`);

    } catch (error) {
        console.log('Mongood Error ${error}'.bgRed.white);

    }
}


