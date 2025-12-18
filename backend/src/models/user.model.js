import mongoose from 'mongoose'

const schema=new mongoose.Schema({
    username:{
        required:true,
        type:String,
        trim:true,


    },
    password:{
        required:true,
        type:String,
        minlength:8,
    },
    email:{
        required:true,
        type:String,
        unique:true,
        validate:{
        validator:function(v){
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)

        },
       message: props => `${props.value} is not a valid email`

    }

    },

},{timestamps:true})

const User=mongoose.model("user",schema);
export default User;