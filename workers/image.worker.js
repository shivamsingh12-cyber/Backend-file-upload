import {Worker} from "bullmq";
import {Item} from "../models/Item.js";
import redis from "../config/redis.js";
import connectDB from "../config/db.js";
import {resizeImage} from "../services/image.service.js";
import fs from "fs";
import path from "path";

await connectDB();

const worker =new Worker("image-processing",
    async (job)=>{
        try{
             const {file,originalName}=job.data;

       

    // const resizeBuffer=await resizeImage(file);

  

    const fileName=`resize-${Date.now()}.jpg`;
    const filePath=path.join(process.cwd(),"uploads",fileName);
          const inputBuffer = await fs.promises.readFile(filePath);

const resizeBuffer = await resizeImage(inputBuffer);


    await fs.promises.mkdir(path.dirname(filePath),{recursive:true});

    await fs.promises.writeFile(filePath,resizeBuffer);
   
await fs.promises.unlink(filePath);

            const saved = await Item.create({
                originalName: originalName,
                fileName,
                filePath,
                fileSize: resizeBuffer.length,
                mimeType: "image/jpeg"
            });
            return saved;

        } catch(err){
            console.log("Worker error");
            throw err;

    }
}, 
{connection:redis});
        
        worker.on("completed",(job)=>{
            console.log(`Job ${job.id} completed`);
        });
        
        worker.on("failed",(job,err)=>{
            console.log(`Job failed:`,err);
})
    