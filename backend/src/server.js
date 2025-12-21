import  express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import connectDB from './lib/util/db.js'


dotenv.config()

const app=express()
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/auth",authRoute);
app.use("/api/users",userroute);
app.use("/api/posts",postroute);
app.use("/api/comments",commentRoute);
app.use("/api/likes",likeRoute);
app.use("/api/saved",savedRoute);
app.use("/api/search",searchRoute);
app.use("/api/ai",aiRoute);



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

