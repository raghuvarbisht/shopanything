import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true , 'name is required']
    },
    email: {
        type: String,
        required:[true, 'email is required'],
        unique:[true, 'email already taken']
    },
    password: {
        type: String,
        requird: [true, 'password is required'],
        minLength:[ 6, 'password length shoudl be greater then 6 character']
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    city:{
        type: String,
        required: [true, 'city is required']
    },
    country: {
        type: String,
        required: [true, 'country is required']
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    profilePic: {
        type: String,
        required: [true, 'pic is required']
    }
},
{timestamps:true} // this will create created and updated time
)
// mongoose.model('collection name', 'schema name'); 
export const User = mongoose.model('Users', userSchema); 