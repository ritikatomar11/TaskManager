import {Task} from '../models/task.js';


const allowedTransitions = {
  'todo': 'in-progress',
  'in-progress': 'done',
  'done': null, // No forward from 'done'
};


export const getTasks = async(req , res)=>{
    try{
        const {status} = req.body; 
        const tasks = await Task.find({user: req.user._id}).find({status}).sort({createdAt: -1});
        if(!tasks){
            return res.status(404).json({message : "No tasks found"}); 
        }
        return res.status(200).json("tasks " ,tasks);
    }catch(error){
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addTask = async(req , res)=>{
    try{
        const {title , status} = req.body; 

        if(!title || !status){
            return res.status(400).json({message : "Title and status are required"}); 
        }

        const newTask = await Task.create({
            title , 
            status , 
            user:req.user._id
        }); 
        if(!newTask){
            return res.status(500).json({message : "Failed to create task"}); 
        }
        return res
                .status(201)
                .json({ message: "Task created successfully",task: newTask});
    }catch(error){
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTaskStatus = async(req , res)=>{
    try {
        const {taskId, newStatus} = req.body;
        const task = await Task.findById(taskId); 
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (!allowedTransitions[task.status] || allowedTransitions[task.status] !== newStatus) {
            return res.status(400).json({ message: "Invalid status transition" });
        }
        task.status = newStatus;
        await task.save();

        return res.status(200).json({ message: "Task status updated successfully", task });

    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ message: "Internal server error" });

    }

    
}