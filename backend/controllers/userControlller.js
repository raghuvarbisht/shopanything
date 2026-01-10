
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