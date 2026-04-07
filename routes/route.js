import express from "express";
import { createItem,updateItem } from "../controllers/itemController.js";

const Router = express.Router();

Router.get('/',(req,res)=>{
    res.send("Hello World!");
})

Router.post("/item",createItem);
Router.post("/updateitem",updateItem);

export default Router;