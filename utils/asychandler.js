// //  const asynhandler = ( reqpromise)=> {return (req,res,next)=>

// //    Promise.resolve(reqpromise (req,res,next)).catch((err)=> next(err))

// //  }
// // asyncHandler.js
// export const asyncHandler = fn => (req, res, next) => {
//     return Promise.resolve(fn(req, res, next)).catch(next);
// };


// //  const asynhandler= (fn)=>{
// //  async (req,res,next) =>{try {
// //      await fn(req,res,next)
// //  } catch (error) {
// //      res.status(error.code ||500).json({
// //          success:"fasle",
// //          msg:"erro message"
// //      })
// //  }
// //  }}


// export   {asyncHandler}