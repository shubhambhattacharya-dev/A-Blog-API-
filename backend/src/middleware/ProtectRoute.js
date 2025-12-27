import jwt from 'jsonwebtoken';
import user from '../models/user.model.js';

export const ProtectRoute=async(req,res,next)=>{
    try {
        const token =req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                error:"Unauthorized"
            
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const CurrentUser=await user.findById(decoded.userId).select("-password");
        if(!CurrentUser){
            return res.status(401).json({
                error:"User is not found"
            })
        }

        req.user=CurrentUser;
        next();

        
    } catch (error) {
        console.log("Error in ProtectRoute Middlewatr:",error.message);
        console.error("Error stack:",error.stack);
        res.status(401).json({
            error:"Unauthorized Access"
        })
        
    }
}