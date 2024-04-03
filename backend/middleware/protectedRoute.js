import jwt  from "jsonwebtoken";


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

    } catch (error) {
        console.log("Error in protected route", error.message);
        res.status(500).json({error : "Internal Server Error"})
    }
}
