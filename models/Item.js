import mongoose from "mongoose";

const itemSchema =new mongoose.Schema({
       originalName: String,
    fileName: String,
    filePath: String,
    fileSize: Number,
    mimeType: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps:true});

export const Item=mongoose.model('item',itemSchema);