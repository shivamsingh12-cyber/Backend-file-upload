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

export const uploadFile=async (req,res, next)=>{
    try {
         if (!req.file) {
            return res.status(400).json({message:"Your file is not uploaded"});
         }

         const buffer=req.file.buffer;
         const resizeBuffer=await resizeImage(buffer);
       

        const uploadDir=path.join(process.cwd(),"upload");

     
           await fs.promises.mkdir(uploadDir,{recursive:true});
        

         const fileName = `resize-${Date.now()}.jpg`;

         const filePath= path.join(uploadDir,fileName);

         await fs.promises.writeFile(filePath, resizeBuffer);

         const create= await Item.create({
            originalName: req.file.originalname,
            fileName: fileName,
            filePath: filePath,
            fileSize: resizeBuffer.length,
            mimeType: "image/jpeg"
         })

         res.status(200).json({
            message: "File uploaded and saved in DB",
            info: create
         })

    } catch (err) {
       next(err);
    }
};

