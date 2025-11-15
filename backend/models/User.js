const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const Schema= mongoose.Schema;
const saltRounds=10;
const userSchema= new Schema({

username:{
    type:String,
    required:true,
    unique:true
},

email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},

});

userSchema.pre("save",function(next){
    const User=this;
    bcrypt.genSalt(saltRounds,function(err,salt){
        if(err){
            return next(err);
        }
        bcrypt.hash(User.password,salt,function(err,hash){
            if(err){
                return next(err);
            }
            User.password=hash;
            next();
        })
    })
})

const user=mongoose.model("user",userSchema);


module.exports=user;