import  express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'


dotenv.config()

const app=express()
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/auth",authRoute);



app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})