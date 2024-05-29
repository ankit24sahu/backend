
import { Router } from "express";
import upload from "../mid/multer.js";
import {registerUser,loginUser} from "../contoller/resgister.js";
import verifyjwt from "../mid/auth.mid.js";





    

const userrouter = Router();

// Corrected the route method chaining
userrouter.route("/register").post(
    upload.fields( [{name:"avatar",maxCount:1},
        {name:"coverImage",maxCount:1}
    ]),
    registerUser
);

userrouter.route("/login").post(loginUser)
//secure routes

userrouter.route("logout").post(verifyjwt, logoutUser)

export default userrouter ;
