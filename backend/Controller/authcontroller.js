require("dotenv").config({path:require("path").resolve(__dirname,"../.env")});
const user=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const createtoken=require("../Utilities/secreattoken");

module.exports.signup=async(req,res,next)=>{
    try{

    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;

    const isexist=await user.findOne({email:email});
    if(isexist){
        res.send("user already exists please login");
    }
    else {
        const newuser=  new user({email:email , username:username,password:password});
        await newuser.save();
        console.log(newuser);
        const token=createtoken(newuser._id);
        console.log("the token is",token);
res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  maxAge: 24 * 60 * 60 * 1000,
});
res.status(201).send("new user added");
    }
    }
    catch(err){
    console.log(err);
    res.send(err);
    }
}

module.exports.login=async(req,res,next)=>{
    try{
    const {email,password}=req.body;
    if(!email || !password){
        return res.send("both the filed are required");
    }
    const isexisuser=await user.findOne({email:email});
    if(!isexisuser){
    return res.send("user not register");
    }
    const correctpassword=isexisuser.password;
    const authuser=await bcrypt.compare(password, correctpassword)
    if(!authuser){
        return res.send("incorrect email or password")
    }
    const token=createtoken(isexisuser._id);
res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  maxAge: 24 * 60 * 60 * 1000,
});
    res.send("login successfull");
    
}
    catch(err){
        res.send(err);
    }
} 

module.exports.logout=(req,res)=>{
res.cookie("token", "", {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  maxAge:0,
});
    res.send("logout done");

}
module.exports.userstatus = (req, res) => {
    const token = req.cookies.token
    if (!token) {
      return res.send("token not found ")
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        res.send("token not match")
      } else {
        const User = await user.findById(data.id)
        if (User) {         
        res.send(User);
        } 
        else  res.send("user not found")
      }
    })
  }