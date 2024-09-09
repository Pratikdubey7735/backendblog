import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
async function connectdb(){
    const url = process.env.MONGODBURI
    await mongoose.connect(url)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log(err));
}
export {connectdb}
