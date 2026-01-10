
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
        res.status(200).send({
            success: true,
            message: 'login successfully'
        })
      

     } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Please add email or password',
            error: error
        })

     }

}