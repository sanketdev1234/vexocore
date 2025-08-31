require("dotenv").config({path:require("path").resolve(__dirname,"../.env")});
const user=require("../models/User");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");

module.exports.userverification=async(req,res,next)=>{
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send( "Please register or login first.");
    }
    
    try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const existing_user=await user.findById(decoded.id);
    if(!existing_user){
        return res.status(404).send( "User not found" );
    }
    else {
        req.user=existing_user;
        next();
    }
    }
    catch(err){
    return res.send(err);
    }
}

