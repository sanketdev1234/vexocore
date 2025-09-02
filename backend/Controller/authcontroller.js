require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createtoken = require("../Utilities/secreattoken");

module.exports.signup = async (req, res, next) => {
  try {
    console.log("hello");
    const { email, username, password } = req.body;

    const isexist = await user.findOne({ email });
    if (isexist) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }


    const newuser = new user({ email, username, password: password });
    await newuser.save();

    const token = createtoken(newuser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none", // lax for development
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.send({ message: "New user added", user: { id: newuser._id, email, username } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Both fields are required" });
    }

    const isexisuser = await user.findOne({ email:email });
    if (!isexisuser) {
      return res.status(404).json({ message: "User not registered" });
    }
    console.log("isexisuser", isexisuser);
    console.log("password", isexisuser.password); 
    console.log("provided password", password);
    console.log(typeof(password));
    console.log("hashed password", typeof(isexisuser.password));
    
    const authuser = await bcrypt.compare(password, isexisuser.password);
    console.log("authuser", authuser);
    if (!authuser) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }
  
    const token = createtoken(isexisuser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none", // lax for development
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", user: { id: isexisuser._id, email: isexisuser.email, username: isexisuser.username } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "none", // lax for development
    maxAge: 0,
  });
  res.json({ message: "Logout done" });
};

module.exports.userstatus = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      const User = await user.findById(data.id);
      if (User) {
        res.json(User);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  });
};
