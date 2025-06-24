import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const userSchema = new mongoose.Schema(
    {
        name : {
            type:String , 
            required:true , 
            lowercase : true , 
        } , 

        email : {
            type:String , 
            required:true , 
            unique:true , 
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],    
        } ,

        password:{
            type:String,
            required :[true , "Password is required"] , 
            index:true 
        },
    } , 
    
    {timestamps:true}
)

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password , 10)
    next()
}); 

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateToken = function(){
    return jwt.sign({
        _id:this._id , 
        email:this.email , 
        name : this.name
    }, 
    process.env.TOKEN_SECRET ,
    {
        expiresIn : process.env.TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User" , userSchema); 