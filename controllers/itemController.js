import {Item} from "../models/Item.js";
import { resizeImage } from "../services/image.service.js";
import path from "path"
import fs from "fs"

export const createItem=async (req,res)=>{
    try {
        const {name,price}= req.body;
            console.log("BODY:", req.body);
        const newItem=new Item({
            name,
            price
        });
        await newItem.save();
        res.status(201).json(newItem);

    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

export const updateItem=async (req,res)=>{
    try {
         const {id}= req.body;
        const {name,price}= req.body;

        const updateItem=await Item.findByIdAndUpdate(
            id,
            {name,price},
            {new:true}
        )
        if(!updateItem) return res.status(404).json({message:"Item did not updated"});
   
        res.status(200).json({message:"Item updated successfully"});

    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

export const deleteItem=async (req,res)=>{
    try {
         const {id}= req.body;
        const {name,price}= req.body;

        const updateItem=await Item.findByIdAndDelete(
            id
        )
        if(!updateItem) return res.status(404).json({message:"Item did not Deleted"});
   
        res.status(200).json({message:"Item deleted successfully"});

    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

export const readItem=async (req,res)=>{
    try {
         const {id}= req.query;
          console.log("Incoming ID:", id);

        const fetchItem=await  Item.findById(id);
        if(!fetchItem) return res.status(404).json({message:"Item did not Found"});
   
        res.status(200).json(fetchItem);

    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

export const uploadFile = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const results = [];

        for (const file of req.files) {
            const resizedBuffer = await resizeImage(file.buffer);

            const fileName = `resize-${Date.now()}-${Math.random()}.jpg`;
            const filePath = path.join(process.cwd(), "upload", fileName);

            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
            await fs.promises.writeFile(filePath, resizedBuffer);

            const saved = await Item.create({
                originalName: file.originalname,
                fileName,
                filePath,
                fileSize: resizedBuffer.length,
                mimeType: "image/jpeg"
            });

            results.push(saved);
        }

        res.json({
            message: "Files uploaded successfully",
            data: results
        });

    } catch (err) {
        next(err);
    }
};

