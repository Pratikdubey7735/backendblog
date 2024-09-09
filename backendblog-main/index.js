import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import { connectdb } from "./db/db.js";
import posts from "./db/Models/models.js";
const app=express()
const origin= process.env.frontend_url || "https://frontendblog-chi.vercel.app/";
app.use(cors({
  origin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials:true,
}));

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.get("/",async (req,res)=>{
  res.json({
    "make":"user is working"
  })
})  
app.get("/post",async(req,res)=>{
    try {
        
        const data=await posts.find();
        console.log(data)
        res
        .status(200)
        .json({
            status:200,
            data:data,
            message:"Data fetched successfully"
        })
    } catch (error) {
        console.log(error);
        
        res
        .status(500)
        .json({
            stutus:500,
            data:null,
            message:"Data fetching failed "
        })
    }
})

app.post('/api/update', async (req, res) => {
    try {
      const { _id, title, content } = req.body;
  
      if (!_id || !title || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const result = await posts.findByIdAndUpdate(
        _id,
        { title, content },
        { new: true, runValidators: true }
      );
  
      if (result) {
        res.status(200).json({ message: 'Post updated successfully', data: result });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Error updating post', error });
    }
  });


app.post("/api/id",async(req,res)=>{
    const {id}=req.body
    try {
        const data =await posts.findById(id)
        res.status(200)
        .json({
            stutus:200,
            data:data,
            message:"Data fetched successfully"
        })
    } catch (error) {
        res.status(500)
        .json({
            stutus:500,
            data:null,
            message:"Data failed to fetche"
        })
    }
})

app.post("/api/delete", async (req, res) => {
    const { id } = req.body;
    try {
      const data = await posts.findByIdAndDelete(id);
      if (!data) {
        return res.status(404).json({
          status: 404,
          data: null,
          message: "Id not found",
        });
      }
      return res.status(200).json({
        status: 200,
        data: data,
        message: "data deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({
        status: 200,
        data: null,
        message: "data deletion failed",
      });
    }
  });

app.post("/api/create",async(req,res)=>{
    const {title,content}=req.body;
    try{

        const newPost=await posts.create({title,content})
        res.status(200)
        .json({
            status:200,
            data:newPost,
            message:"Post creted successfully"
        })
    }catch(err){
        res.status(500)
        .json({
            status:500,
            data:null,
            message:"something went wrong"
        })
    }
})
connectdb()
app.listen(4000,()=>{
    console.log("app is listing at port 3000");
    
})
