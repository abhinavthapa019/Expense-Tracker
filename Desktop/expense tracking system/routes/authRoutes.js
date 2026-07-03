

const {register}=require("../controllers/authController");
const express=require("express");
const Router=express.Router();




Router.post("/register",register);

module.exports=Router;
