import {v2 as cloudinary } from "cloudinary";
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_CLOUD_API_KEY, 
    api_secret:  process.env.CLOUDNARY_CLOUD_API_KEY// Click 'View Credentials' below to copy your API secret
});   


const uploadcloadnary= async (localfile ) =>{
    try {//file uploaf
        if(!localfile) return null,"not found locally cloud"
        const respond = await cloudinary.uploader.upload(localfile,{
            resource_type:"auto"// all type of media upload imge,video ect

        })
        // if file uploaded sucessfully
        console.log( "file upload on cloud" , respond.url);
        return respond
    } catch (error) {
        fs.unlinkSync(localfile)// remove the local;y save file as upload operation got failed
        return null
    }
}

export  default uploadcloadnary