import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../lib/util/generateToken.js";

export const Signup=async(req,res)=>{
   try {
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
        return res.status(400).json({
            error:"Invalid email format"
        })
    }
    const  userExist=await User.findOne({
        $or:[{username},{email}]
    });
    if(userExist){
        return res.status(400).json({
            error:"Username or email is already taken"
        })
    }
    
    //hashing password

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);

    const newUser=new User({
        username,
        email,
        password:hashPassword
    })

    if(newUser){
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            message:"User created successfully",
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email
        })
    }else{
        res.status(400).json({
            error:"Invalid user data"
        })

    }





   } catch (error) {
    console.log("Error in signup controller ",error.message);
    res.status(500).json({
        error:"Internal server Error"
    })
    
   }

}

export const Login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            username:user.username,
            email:user.email
        });
    } catch (error) {
        console.log("Error in login controller ",error.message);
        res.status(500).json({
            error:"Internal server Error"
        })
    }

}

export const Logout=async(req,res)=>{
    try {
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller ",error.message);
        res.status(500).json({
            error:"Internal server Error"
        })
    }

}
