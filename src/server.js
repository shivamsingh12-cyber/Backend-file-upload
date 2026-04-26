import app from "./app.js";
// import mongoose from 'mongoose';
import dotenv from "dotenv";
import connectDB from "../config/db.js";
dotenv.config();



await connectDB();

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`your app is listening on port ${PORT}`);
})
