import express from "express";
import { createItem,updateItem,deleteItem,readItem } from "../controllers/itemController.js";

const Router = express.Router();

Router.get('/',(req,res)=>{
    res.send("Hello World!");
})

Router.post("/item",createItem);
Router.post("/updateitem",updateItem);
Router.post("/deleteitem",deleteItem);
Router.get("/readitem",readItem);

export default Router;