import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
    {
        title:{
            type:String , 
            required:true , 
        } , 
        status:{
            type:String , 
            enum : ["To Do" , "In Progress" , "Done"] , 
            required:true
        } , 
        userId:{
            type:mongoose.Schema.Types.ObjectId , 
            ref:"User" ,
            required:true
        }
    } , 
    {timestamps:true}
)

export const Task =  mongoose.model("Task" , taskSchema); 