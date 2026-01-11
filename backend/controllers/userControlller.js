
import {User as userModel} from '../models/userModel.js';
import cloudinary from 'cloudinary';
import { getDataUri } from '../utils/features.js';

// user regirtartion
export const register = async (req, res) => {
    try {
     const {name,email,password,address,city,country,phone} = req.body;
     // validate field
      if(!name || !email || !password || !address  || !city || !country) {
        return res.status(500).send({
            success: false,
            message: 'Please provide all required fields'
        });
      }
      const existingUser = await userModel.findOne({email});
      if (existingUser) {
         return res.status(500).send({
            success: false,
            message: 'user already exist with email'
         })
      }

      const user = await userModel.create({
            name,
            email,
            password,
            address,
            city,
            country,
            phone
        });
        res.status(201).send({
            success: true,
            message: 'User Registered successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error:error
        })

    }

}

// login user
export const login =  async (req, res) => {
     try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'please add email or password'
            })
        }
        // check user exist or not
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(404).send({
                success: false,
                message: 'user not found'
            })
        }
        // check password
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            return res.status(500).send({
                success: false,
                message: 'invalid credenatils'
            })
        }
        // generate token when user login success
        const token = user.generateToken();
        user.password = undefined;

        res.status(200).cookie("token", token, {
            secure: process.env.NODE_ENV === 'prod', // https only in prod
            httpOnly: process.env.NODE_ENV === 'development' ? true : false,
            sameSite: "strict",
            // Cookie expiration
            //maxAge: 24 * 60 * 60 * 1000,  // 1 day in milliseconds
            // OR
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
        }).send({
            success: true,
            message: 'login successfully',
            user
        })
      

     } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Please add email or password',
            error: error
        })

     }

}

// logout 
export const logout = async (req , res) => {
    try {
        res.status(200).cookie('token', '', {
            expires: new Date(Date.now())
        }).send({
           success: true,
           message: 'logout successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in logout',
            error
        })
    }
}

// get user details 
export const getUserDetails =  async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        user.password = undefined; // emove password frm response
        res.status(200).send({
            success: true,
            message: 'User Profile Fetched Successfully',
            user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in profile api',
            error
        });
    }
}


// update user details

export const updateUserDetails = async (req, res) => {

    try {
        const user = await userModel.findById(req.user._id);
        const {name,password,address,city,country,phone} = req.body;
        // below checking if req body contain key with value update that
        if (name) user.name = name
        if (password) user.password = password
        if (address) user.address = address
        if (city) user.city = city
        if (country) user.country = country
        if (phone) user.phone = phone

        // update user 
        // added logic in usermodel for check password
        await user.save();
        res.status(200).send({
            success: true,
            messsage: 'user details updated successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update user details',
            error,
        });
    }
}


export const updatePassword = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      const {oldPassword, newPassword} = req.body;
      //validation 
      if(!oldPassword || !newPassword) {
        return res.status(500).send({
            success:false,
            message: 'Please provide old or new password'
        })
      }

      // old pass check

      const isOldPasswordMatch = await user.comparePassword(oldPassword);
      //validation
      if(!isOldPasswordMatch) {
        return res.status(500).send({
            success: false,
            message: 'Invalid Old Password'
        })
      }
      user.password = newPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: 'password updated successfully'
      })

    } catch (error) {
        res.status(500).send({
            success: true,
            message:'Error in update password',
            error: error,
        })

    }

}

// upload profile picture
export const uploadProfilePicture = async (req, res) => {

    try {
        const user = await userModel.findById(req.user._id);
        //file get from user
        const file = getDataUri(req.file);
        //delete previous image
        // await cloudinary.v2.uploader.destroy(user.profilePic?.public_id);
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        user.profilePic = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        } 
        // saev function for image
        await user.save();

        res.status(200).send({
            success : true,
            message :'Profile pic uplaoded'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In update profile pic API',
            error,
        })
    }
}