import { verify } from "jsonwebtoken";
import Apierror from "../utils/apierror";
import { jwt } from "../model/supportforjwt";
import User from "../model/user.model";

    const verifyjwt = async(req,res,next)=>{
        const token =req.cookies?.accessToken || req.header("Authorization ")?.replace("Bearer","")
        if(!token){
            throw new Apierror (401,"Unauthrozed request")
        }
     
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        await User.findById(decodedToken?._id).select("-password _refreshtoken")
        if(!user){
            throw new Apierror(401,"INvalid Acess Token")
        }
    req.user=user
    next()
    }









export default verifyjwt