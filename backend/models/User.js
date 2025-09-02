const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passwordValidator=require("../Utilities/passwordconstrain");
const saltround=10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, 
    }
}, {
    timestamps: true
});


userSchema.pre("save",  function (next) {
    const User = this;
    //validat the password
    passwordValidator(User.password,function(err){
        if(err) return next(err);
    // Step 2: Generate salt
    bcrypt.genSalt(10, function (err, salt) {
      // Step 3: Hash the password using the salt
    bcrypt.hash(User.password, salt, function (err, hash) {
        // Step 4: Replace plain password with hashed password
        User.password = hash;
        // Step 5: Continue with saving the user
        next();
        });
    });
    })
    });


const user=mongoose.model("user",userSchema);
module.exports=user;