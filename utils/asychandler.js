const asynhandler = ( reqpromise)=> {
    Promise.resolve(reqpromise(req,res,next)).catch((err)=>{console.log("erro from reqhandler",err);})

} 


// const asynhand= (fn)=>{
// async (req,res,next) =>{try {
//     await fn(req,res,next)
// } catch (error) {
//     res.status(error.code ||500).json({
//         success:"fasle",
//         msg:"erro message"
//     })
// }
// }}


export  default asynhandler