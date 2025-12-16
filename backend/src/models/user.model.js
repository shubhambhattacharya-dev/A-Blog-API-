import mongoose from 'mongoose'
import {z} from 'zod'

const schema=new mongoose.schema({
    name:{
        required:true,
        type:String,
        unique:true,
    
    },
    password:{
        required:true,
        type:String,
        unique:true,

    },
    email:{
        required:true,
        type:String,
        unique:true,
        

    }
},timestamps:true)