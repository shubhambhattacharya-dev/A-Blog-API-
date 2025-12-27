import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateTokenSetCookie as generateTokenAndSetCookie } from "../lib/util/generateToken.js";

export const Signup=async(req,res)=>{
   try {
    console.log("Signup request received with body:", req.body);
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            error:"All fields are required"
        })
    }
    if(password.length <8){
        return res.status(400).json({
            error:"Password must be at least 8 characters long"
        })
    }

    const emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(email)){
        console.log("Invalid email format");
        return res.status(400).json({
            error:"Invalid email format"
        })
    }
    console.log("Checking if user exists");
    const  userExist=await User.findOne({
        $or:[{username},{email}]
    });
    console.log("User exists check result:", userExist ? "User found" : "No user found");
    if(userExist){
        console.log("User already exists");
        return res.status(400).json({
            error:"Username or email is already taken"
        })
    }
    
    //hashing password
    console.log("Generating salt");
    const salt=await bcrypt.genSalt(10);
    console.log("Hashing password");
    const hashPassword=await bcrypt.hash(password,salt);

    console.log("Creating new user");
    const newUser=new User({
        username,
        email,
        password:hashPassword
    })

    if(newUser){
        console.log("Saving new user");
        await newUser.save();
        console.log("User saved, generating token");
        generateTokenAndSetCookie(newUser._id,res);

        res.status(201).json({
            message:"User created successfully",
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email
        })
    }else{
        console.log("New user object is falsy");
        res.status(400).json({
            error:"Invalid user data"
        })

    }





   } catch (error) {
    console.log("Error in signup controller ",error.message);
    console.log("Error stack:", error.stack);
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: "Validation Error: " + error.message
        });
    } else if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(400).json({
            error: "Duplicate key error"
        });
    } else {
        res.status(500).json({
            error:"Internal server Error"
        });
    }
   }

}

export const Login = async (req, res) => {
    try {
        // console.log("Login request received with body:", req.body);
        const { username, password } = req.body;

        if (!username || !password) {
            console.log("Missing username or password");
            return res.status(400).json({ error: "Username and password are required" });
        }

        console.log("Finding user");
        const user = await User.findOne({ username }).select("+password"); // ✅ FIX
        console.log("User find result:", user ? "User found" : "User not found");

        console.log("Comparing password");
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        console.log("Password correct:", isPasswordCorrect);

        if (!user || !isPasswordCorrect) {
            console.log("Invalid credentials");
            return res.status(400).json({ error: "Invalid username or password" });
        }

        console.log("Credentials valid, generating token");
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.log("Error in login controller ", error.message);
        console.log("Error stack:", error.stack);
        res.status(500).json({
            error: "Internal server Error"
        });
    }
};


export const Logout=async(req,res)=>{
    try {
        console.log("Logout request received");
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller ",error.message);
        console.log("Error stack:", error.stack);
        res.status(500).json({
            error:"Internal server Error"
        })
    }

}
