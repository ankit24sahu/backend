import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app =express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
    }))

    app.use(express.json({limit:"16kb"}))// this use for json res/req limit
    app.use(urlencoded({extended:true,limit:"16kb"}))// urlencoded({})this also right ,use for propre url 
    app.use(express.static("public"))// this for our assect file access

//routes import
import  userrouter  from "../routes/user.router.js"



// rotes declaration

app.use("/api/v1/user",userrouter)//userroute activate
//http//localhost8000/user/registre

    export {app}