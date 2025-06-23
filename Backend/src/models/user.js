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


export const User = mongoose.model("User" , userSchema); 