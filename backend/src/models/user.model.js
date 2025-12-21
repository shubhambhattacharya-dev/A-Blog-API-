import mongoose from 'mongoose'

const schema=new mongoose.Schema({
    username:{
        required:true,
        type:String,
        trim:true,
        unique:true,



    },
  
    email:{
        required:true,
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        match:[
             /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              "Please use a valid email address",
        ],
        index:true,

    },
      password:{
        required:true,
        type:String,
        minlength:8,
        select:false,
    },

},{timestamps:true})

const User=mongoose.model("User",schema);
export default User;