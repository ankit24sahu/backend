import mongoose from "mongoose";
import { Db_name } from "../src/constant.js";

const connection = async () =>{  try {const connection_inst=await mongoose.connect(`${process.env.MONGOOSEURL}/${Db_name}`)
} catch (error) {
    console.log("erro m db",error)
    process.exit(1)
}
    
}
export default connection