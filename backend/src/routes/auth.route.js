import express from 'express'
import {Login,Logout,Signup} from "../controllers/auth.controller.js"

const router=express.Router();

router.post("/signup",(req,res)=>{
    return res.status(403).json({
        message:"signup route"
    })
})

router.post("/login",(req,res)=>{
    return res.status(403).json({
        message:"login route"
    })
})

router.post("/logout",(req,res)=>{
    return res.status(403).json({
        message:"Logout route"
    })
})

export default router;
