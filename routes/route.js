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