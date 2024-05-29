// import { Router } from "express";
// import registerUser from "../contoller/user.js"
// const  userrouter = Router( )

// userrouter("./register").post(registerUser)

// export {userrouter}

//import registerUser from "../contoller/user.js"; // Corrected 'contoller' to 'controller'
import Apierror from "../utils/apierror.js";
import  User  from "../model/user.model.js";
import uploadcloadnary from "../utils/cloudnary.js";
import apiresponce from "../utils/apires.js";
import userrouter from "../routes/user.router.js";



const genrentAccesstokenandRefreshToken=async(userId)=>{
    try {
        const user=await  User .findId(userId)
        const accesToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        
        return {accesToken,refreshToken}
    } catch (error) {
        throw new Apierror(500,"erro at refresh and accestoken")
    }
}

const registerUser = async (req, res) => {
    //get user detail  from frotend
    //validation -not empty
    //check if user  already exist username, email
    //chexk for image check avatar
    //uplaod them to cloudnary
    //crate user obj-create enrty in db
    //remove password and refresh token field frmom responsen
    //check for user creation 
 //reutrun res

 //req.body give post data form ,json 
 
 const {fullname, email ,username,password} =req.body
 console.log("email",email)

 // if (fullname==="") {
 //     throw new Apierror(400,"fullname is required") basic method to check empty
 // }

 if ( 
     [fullname,email,username,password].some((fields) => 
     fields?.trim()==="")){                                                           // for emty in username ect

         throw new Apierror (400,"All fields reqiured")
     }

   const existUser=  await User.findOne({
         $or: [{   username  },{  email  }]//or is oprator of db for dono me se ek
     })
if(existUser){
 throw new Apierror(409,"user of email ,useraname already exist ")
}

const avatarlocalpath = req.files?.avatar[0].path;  //req.file is provided my multer middleware file? mean not sure that this file exist ornot
const coverImagelocalpath =req.files?.coverImage[0]?.path;

if (!avatarlocalpath){
 throw new Apierror(400,"Avatar file is required")
}

const avatar=await uploadcloadnary(avatarlocalpath)
const coverImage =await uploadcloadnary(coverImagelocalpath)


if(!avatar){
 throw new Apierror(400,"Avatar file is required")

}

const user= await User.create({
 fullname,
 avatar:avatar.url,
 coverImage:coverImage?.url || "",
 email,
 password,
 username:username.toLowercase()

})

const createdUser=await User.findId(user._id).select(
 "-password -refreshToken" 
)

if (!createdUser){
 throw new Apierror(500,"createUser in userroute")
}
return res.status(201).json(
 new apiresponce(200,createdUser,"User register succesfully")
)
};

const loginUser = async(req,res)=>{

    const {email ,password , username }=req.body
    
    if(!usename||!email)
    {
        throw new Apierror (400,"email and username required")
    }
    
    
    const user = await User.findOne({
        $or : [{username},{email}]             
    })
    
    if (!user ){
        throw new Apierror (404,"user not exist ")
    }
     const isPasswordValid=await user.isPasswordCorrect(password)

     if (!isPasswordValid){
        throw new Apierror(401,"invalid password ")
     }
  const {refreshToken,accesToken}= await  genrentAccesstokenandRefreshToken(user._Id)
    
   const loggedUser=await User.findById(user._Id).select("-password -refreshToken")
    
   const option ={
    httpOnly:true,
    secure:true
   }
    
   return res
   .status(200)
   .cookie("accessTOken",accesToken,option)
   .cookie("refrshTOken",refreshToken,option)
    .json(
        new Apierror(
            200,{
                user: loggedUser,accesToken,refreshToken
            },
            "User logged in Successfully "
        )

    )}


 
const logOutUser = async(res,req)=>{
User.findByIdAndUpdate(
    req.user._Id,{
        $set : {
            refreshToken:undefined
        }
    }
)

        
   const option ={
    httpOnly:true,
    secure:true
   }
   return res
   .status(200)
   .clearCookie("accessTOken",accesToken,option)
   .clearCookie("refrshTOken",refreshToken,option)
   .json(
    new Apierror(
        200,{},
        "User loggOut in Successfully "
    )

)

}

    

export  {registerUser ,
 loginUser}