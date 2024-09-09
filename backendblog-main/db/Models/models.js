import { Schema } from "mongoose";
import mongoose from "mongoose";
const post=Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const posts=mongoose.model("posts",post);
export default posts;