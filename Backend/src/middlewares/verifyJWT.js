import jwt from "jsonwebtoken"; 
import { User } from "../models/user.js";

export const verifyJWT = async(req , res , next)=>{
    try{
        console.log(req.cookies); 
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decodedToken = jwt.verify(token , process.env.TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?._id).select("-password");
        if(!user){
            return res.status(401).json({ message: "Invalid access token" });
        }
        req.user = user ; 
        next();
    }catch(error){
        console.log("Error verifying JWT:", error);
        return res.status(401).json({ message: "Unauthorized access" });
    }
}