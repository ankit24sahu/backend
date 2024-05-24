import dotenv from "dotenv"
import connection from "../db/index.js"
dotenv.config({
    path:'./env'
})


connection( )// the async in db also give then and catch
.then( app.lisen(process.env.PORT || 8000 ,( )=>{
    console.log(` servwer started${process.env.PORT}`);
    app.on("error",(error)=>{console.log("error of app on",error );})
}))
.catch( (err)=>{
    console.log("error of catch in src index",err );
})







// const app =express()
// (  ( async ()=>{
//     try {
//       await  mongoose.connect(`${process.env.MONGOOSEURI}/${Db_name}`)
//         app.on("error", (error)=>{console.log("erro" ,error);
//             throw error
//         })
//         app.listen( process.env.PORT, ()=>{console.log(`app is listening ${process.env.PORT}`)})
//     } catch (error) {
//         console.log("erro",error)
//         throw error
        
//     }
//}))()