import express from 'express'
import {Login,Logout,Signup} from "../controllers/auth.controller.js"
import {ProtectRoute} from '../middleware/ProtectRoute.js';


const router=express.Router();

router.post("/signup",ProtectRoute,Signup)

router.post("/login",ProtectRoute,Login)

router.post("/logout",ProtectRoute,Logout)



export default router;
