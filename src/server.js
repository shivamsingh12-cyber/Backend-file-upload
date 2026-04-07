import app from "./app.js";
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();



mongoose.connect("mongodb://127.0.0.1:27017/fileUploadDB")
.then(()=>console.log("You are connected to mongodb"))
.catch((err)=>{
    "MongoDB Error::",err
});

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`your app is listening on port ${PORT}`);
})
