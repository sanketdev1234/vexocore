if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
    }
const express=require("express");
const app=express();

const mongoose=require("mongoose");
const cors=require("cors");
const path=require("path");
const cookieParser=require("cookie-parser");
const pathToRegexp = require("path-to-regexp");
const ExpressError=require("./Utilities/ExpressError");
const authRoutes=require("./routes/authroutes");
const taskRoutes=require("./routes/taskroutes");
const bodyParser = require('body-parser');
const passport=require('passport');
const User=require('./models/User');

const port=process.env.PORT || 8080;
const dburl=process.env.ATLAS_URL;


app.use(bodyParser.json()); // To parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:5173",
    "https://vexocore.onrender.com" , "https://frontend-qghg.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
}));

app.use(cookieParser());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname)));


main()
.then(() => {
    console.log("connection successful");
})
.catch((err) => console.log(err));


async function main() {
    await mongoose.connect(dburl);
}


const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJWt = require('passport-jwt').ExtractJwt;

    const opts = {
        jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.TOKEN,
    };

    passport.use('user-jwt' , new JwtStrategy(opts , async (jwt_payload , done) => {
        try {
            const user  = await User.findById(jwt_payload.id);
            if(user) return done(null, user);
            return done(null , false);
        }   catch (err) {
            return done(err, false);
        }
    }));
app.use(passport.initialize());


app.listen(port, () => {
console.log(`server running at ${port}`);
});




// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Hello i am the root route");
});

  // it is for the express error
  app.use((err , req, res ,next )=>{
  let {statusCode=500 , message="something went wrong!"}=err;
  console.log(`our error status code is ${statusCode} and message is ${message}`)
  // res.status(statusCode).send(message);
  res.status(statusCode).send(message);
  })
  