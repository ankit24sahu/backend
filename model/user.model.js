import mongoose, {Schema} from "mongoose";
import { jwt} from "../model/supportforjwt.js"
//import bcrypt from 'bcryptjs'; // THIS ERROR BECAUSE I USE BCRYPTKS NOT BCRYPT
const userSchema = new Schema (
    {
        usename:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true// for serach it help
        },
    
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            
        },
    
       fullname :{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
            
        },

        avatar:{
            type:String,// cloadnary URL
            required:true
        },

        coverImage:{
            type:String// coudnary
        },
        watchHistory :[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],

        password:{
            type:String,// alway in striing pass
            required:true
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)
userSchema.pre("save",async function(next){
    if(this.isModified("password")){                  // this code run and encrypt the password
        this.password= bcrypt.hash(this.password,10)
        next( )}

})

userSchema.method.ispasswordCorrect=async function (password){
    return await bcrypt.compare (password,this.password) // code make use midd for mongo and check password

 }

 userSchema.methods.isPasswordCorrect = async function (password) {
     return await bcrypt.compare(password, this.password);
 };


// jwt is beerer token jo token bejega vo data lega

userSchema.method.generateAccessToken=function(){
                     return  jwt.sign( {
                        _id:this._id,
                        email:this.email,
                        usename:this.usename,
                        fullname:this.fullname
                        

                        },
                        process.env.ACCESS_TOKEN_SECRETE,{
                            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
                        }
            )
}
userSchema.method.generateRefreshToken=function(){                     return  jwt.sign( {
    _id:this._id,
    email:this.email,
    usename:this.usename,
    fullname:this.fullname
    

    },
    process.env.REFRESH_TOKEN,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)}
 const User=mongoose.model("User",userSchema)

 export default User