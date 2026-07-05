const {register,login}=require("../controllers/authController");
const express=require("express");
const Router=express.Router();




Router.post("/register",register);
Router.post("/login", login );

module.exports=Router;
