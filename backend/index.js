if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

console.log("SECRET_KEY:", process.env.SECRET_KEY);

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const user=require("./models/User");
const ejsMate=require("ejs-mate");
const flash=require("connect-flash");
const methodOverride=require("method-override");
const session=require("express-session");
const cors=require("cors");



const port=8080;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


async function main(){
    await mongoose.connect("mongodb://localhost:27017/Practise_internship");
}

main().then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("Error connecting to database",err);
});



const sessionoption={
secret:"1234",
resave:false,
saveUninitialized:true,
cookie:{
    httpOnly:true,
    expires:Date.now()+7*3600*1000,
    maxAge:24*3600*7*1000
}
}

app.use(cors({
    origin:"http://localhost:5174",
    methods:["GET","PUT","POST","DELETE","PATCH"],
    credentials:true
}));

app.use(session(sessionoption));

app.engine("ejs",ejsMate);
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use((req,res,next)=>{
res.locals.error=req.flash("error");
res.locals.message=req.flash("success");
res.locals.curruser=req.user || null;
next();
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});


app.get("/newregister",async(req,res)=>{
res.render("users/signup.ejs");
});

app.get("/formlogin",async(req,res)=>{
    res.render("users/login.ejs");
});

app.get("/seeallusers",async(req,res,next)=>{
    try{
    const all_users=await user.find({});
    // res.render("users/display.ejs",{all_users});
    console.log(all_users);
    res.send(all_users);
    }
    catch(error){
        console.log(error);
        next(error);
    }
});


app.post("/signup",async(req,res,next)=>{

    const {username,email,password}=req.body;
    try{
    const isexist=await user.find({username:username});
    if(isexist.length>0){
        req.flash("error","User already exists please login");
        return res.send("User already exists please login");
        // res.render("users/userstatus.ejs");
    }
    const newuser=await user.insertOne({username:username,email:email,password:password});
    console.log(newuser);
    const token= jwt.sign({id:newuser._id},process.env.SECRET_KEY);
    console.log("Token:",token);
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:24*60*60*1000
    });
    req.flash("success","User created successfully");
    res.status(201).send("User created successfully" , newuser);
    // res.render("users/userstatus.ejs",{newuser});
   
}
    catch(err){
        console.log(err);
        next(err);
    }
});


app.post("/login",async(req,res,next)=>{
    const {username,password}=req.body;
    try{
        const existing_user=await user.findOne({username:username}); 
        if(!existing_user){
            req.flash("error","User does not exist please signup");
            return  res.status(400).send("User does not exist please signup");
            // res.render("/users/userstatus.ejs");
        }
        const ismatch=await bcrypt.compare(password,existing_user.password);
        if(!ismatch){
            req.flash("error","Invalid credentials");
            return res.status(400).send("Invalid credentials");
            // res.render("users/userstatus.ejs");
        }
        const token=jwt.sign({id:existing_user._id},process.env.SECRET_KEY);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:24*60*60*1000
        });
        req.flash("success","User loggedin successfully");
        res.status(200).send("Login successful");
        const newuser=existing_user;
        // res.render("users/userstatus.ejs",{newuser});//  donot write /users...

    }

    catch(err){
        console.log(err);
        next(err);
    }
});



app.get("/logout",async(req,res)=>{
res.cookie("token","");
req.flash("error","logout done!")
res.send("logout done");
// res.render("users/userstatus.ejs");
});






async function authmiddleware(req,res,next){
const token=req.cookies.token;
if(!token){
    return res.status(401).send("Unauthorized");
}
try{
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    const existing_user=await user.findById(decoded.id);
    if(!existing_user){
        return res.status(401).send("Unauthorized");
    }
    req.user=existing_user;
    res.locals.curruser=req.user;
    next();
}
catch(err){
    console.log(err);
    return res.status(401).send("Unauthorized");
}
}


app.use((err,req,res,next)=>{
    console.log("Error middleware",err);
    res.status(500).send("Something went wrong");
})



