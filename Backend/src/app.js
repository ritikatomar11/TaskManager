import express from "express"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js"; 
import taskRouter from "./routes/task.js";

const app = express(); 

app.use(express.json({limit : "16kb"})); 
app.use(express.urlencoded({extended:true , limit:"16kb"}))

app.use(cookieParser());

app.use("/api" , authRouter) ; 
app.use("/api" , taskRouter); 

app.get("/" , (req , res)=>{
    res.send("Hello"); 
})

export {app}

