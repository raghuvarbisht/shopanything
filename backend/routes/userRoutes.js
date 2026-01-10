import express from 'express';
import { login, logout, register, getUserDetails, updateUserDetails , updatePassword} from '../controllers/userControlller.js';
import { isAuth } from '../middlewares/authMiddleware.js';
// router object
const router = express.Router();

//register route 
router.post('/register', register);
//login routes
router.post('/login', login);
// logout
router.get('/logout', isAuth , logout);
// after adding auth middle ware you need to add isAuth to make it protected route
router.get('/getuser', isAuth, getUserDetails);
// after adding auth middle ware you need to add isAuth to make it protected route
router.put('/updateuser', isAuth, updateUserDetails);

router.put('/updatepassword', isAuth, updatePassword);

export default router;