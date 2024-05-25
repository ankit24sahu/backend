import { Schema } from "mongoose";
import mongoose  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema
  (  {
videoFile:{
    type:String//cloud
    ,require:true
},
thumnail:{
    type:String,//cloud
required:true},
title:{
    type:String,//cloud
required:true},
description:{
    type:String,//cloud
required:true},
duration:{
    type:Number,//cloud have 
required:true},
view:{
    type:Number,
    default:0
},
isPublished:{
    type:Boolean,
    default:true
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
}

    } ,
{
    timestamps:true

}
)

videoSchema.plugin(mongooseAggregatePaginate)


export const Video =mongoose.model("Video",videoSchema)