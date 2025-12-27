import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_DB_URL);
         console.log(`mongoDB connected:${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1);
        
    }
}
export default connectDB;