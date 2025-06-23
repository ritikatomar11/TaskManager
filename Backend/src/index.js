import mongoose from "mongoose"
import dotenv from "dotenv"
import { app } from "./app.js"
dotenv.config(); 

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/TaskManager`); 
        console.log("DB Connected"); 
    } catch (error) {
        console.log("Error while connecting to the DB" , error); 
    }
}

connectDB()
.then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log(`Listening at the port ${process.env.PORT}`); 
    })
})
.catch((error)=>{
    console.log("Something went wrong" , error); 

})

