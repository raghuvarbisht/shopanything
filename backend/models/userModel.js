import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true , 'user name is required'],
        trim: true,
        maxLength:[100, 'user name max length 100']
    },
    email: {
        type: String,
        required:[true, 'user email is required'],
        trim: true,
        unique:[true, 'user email already taken']
    },
    password: {
        type: String,
        requird: [true, 'password is required'],
        minlength:[ 6, 'password length should be greater then 6 character']
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
        required: [false, 'phone number is required']
    },
    // multer for image uplaod and datauri for meta data upadate
    profilePic: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }    
    }
},
{ timestamps: true } // this will create created and updated time
)

// below code update poassword to hash value
userSchema.pre("save", async function() {
    // If password is not modified, don't re-hash
    if (!this.isModified("password")) {
        return;
    }
    // Hash password
    this.password = await bcrypt.hash(this.password, 10);
});

// compare password function with hash
userSchema.methods.comparePassword = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

// Jwt token
userSchema.methods.generateToken = function() {
    return JWT.sign({ _id: this._id } , 
        process.env.JWT_SECRET, 
        {
        expiresIn: "7d",
    });

}

// mongoose.model('collection name', 'schema name'); 
export const User = mongoose.model('Users', userSchema); 