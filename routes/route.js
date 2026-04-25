import express from "express";
import { createItem,updateItem,deleteItem,readItem,uploadFile } from "../controllers/itemController.js";
import upload from "../middlewares/upload.middleware.js";



const Router = express.Router();

Router.get('/',(req,res)=>{
    res.send("Hello World!");
})

Router.post("/item",createItem);
Router.post("/updateitem",updateItem);
Router.post("/deleteitem",deleteItem);
Router.get("/readitem",readItem);



Router.post("/uploadFile",upload.array('file'), uploadFile);

export default Router;

// docker run -d --name redis-stack -p b379:6379 -p 8001:8001 redis/redis-stack:latest