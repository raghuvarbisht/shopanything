import JWT from 'jsonwebtoken';
import { User as userModel} from '../models/userModel.js';
export const isAuth = async (req, res, next) => {
   /// add try catch and logic if not not in cookie check it in header
    const {token} = req.cookies; // get token from cookies
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'unauthorised user'
        });
    }
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData._id);
    next();

};


/**
 import JWT from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  let token;

  // 1️⃣ Try to get token from cookie (browser login)
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // 2️⃣ If not in cookie, try Authorization header (Postman / mobile apps)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 3️⃣ No token found
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Token missing"
    });
  }

  // 4️⃣ Verify token
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

 */