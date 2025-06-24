import { User } from "../models/user.js"

export const registerUser = async(req , res)=>{
    try {
        const {name , email , password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({email:email}); 
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({
            name,
            email,
            password
        });

        const signedUpUser = await User.findById(user._id).select("-password");
        if(!signedUpUser) {
            return res.status(400).json({ message: "User registration failed" });
        }
        return res
                .status(201)
                .json({ message: "User registered successfully", signedUpUser });
            
    } catch (error) {
        console.error("Error registering user:", error);
        return res
                .status(500)
                .json({ message: "Internal server error" });      
    }
}

export const loginUser  = async()=>{
    try{
        const {email , password} = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({email:email});
        if(!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = user.generateToken();
        if(!token) {
            return res.status(500).json({ message: "Token generation failed" });
        }

        const options  = {
            httpOnly : true , 
            secure : true 
        }
        

        return res
                .status(200)
                .cookie("token" , token , options)
                .json({ message: "Login successful", user });
    }catch(error){
        console.error("Error logging in user:", error);
        return res
                .status(500)
                .json({ message: "Internal server error" });
    }
}

