import cookieParser from 'cookie-parser';
import  express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import connectDB  from './db/db.js'


dotenv.config()

const app=express()
const port=process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use("/api/auth",authRoute);



const startServer=async()=>{
    try {
        await connectDB()
        app.listen(port,()=>{
            console.log(`http://localhost:${port}`);    
        })
        
    } catch (error) {
        console.error(`Error in the server:${error.message}`);
        process.exit(1);
    }
}

startServer();

