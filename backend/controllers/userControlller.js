
import {User as userModel} from '../models/userModel.js';

export const registerController = async (req, res) => {
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


export const loginController =  async (req, res) => {
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

        res.status(200).cookie("token", token, {
            secure: process.env.NODE_ENV === 'prod', // https only in prod
            httpOnly: process.env.NODE_ENV === 'development' ? true : false,
            sameSite: "strict",
            // Cookie expiration
            maxAge: 24 * 60 * 60 * 1000,  // 1 day in milliseconds
            // OR
            // expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }).send({
            success: true,
            message: 'login successfully',
            token
        })
      

     } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Please add email or password',
            error: error
        })

     }

}