import mongoose from "mongoose";
 const connectDB=async()=>{
    try{
      mongoose.connect("mongodb://127.0.0.1:27017/fileUploadDB")
.then(()=>console.log("You are connected to mongodb"))
.catch((err)=>{
    "MongoDB Error::",err
});
    }
    catch(err){
        console.log("DB connection failed:",err);
        process.exit(1);
    }
 };
 export default connectDB;