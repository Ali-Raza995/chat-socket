import jwt  from "jsonwebtoken";
import User from "../models/users.model.js";


export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({error:"Not Authorized, No token Found"})
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!decodedToken) {
            return res.status(401).json({error:"Invalid token"})
        }
        const user = await User.findOne(decodedToken?.userId).select("-password")
        if(!user) {
            res.status(401).json({error:"User not found"})
        }

        req.user = user
        next()

    } catch (error) {
        console.log("Error in protected route", error.message);
        res.status(500).json({error : "Internal Server Error"})
    }
}
