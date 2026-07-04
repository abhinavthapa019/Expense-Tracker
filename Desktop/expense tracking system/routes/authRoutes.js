const {authenticatetoken}=require("../middleware/authMiddleware")
const {register,login}=require("../controllers/authController");
const express=require("express");
const Router=express.Router();




Router.post("/register",register);
Router.post("/login", login );
Router.get("/me", authenticatetoken, (req, res) => {
    res.json(req.user);});

module.exports=Router;
