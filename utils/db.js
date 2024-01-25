import mongoose from 'mongoose'

const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectDb = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("Connection successful to DB")
    } catch (error) {
        console.log(error);
        console.error("Database connection failed");
        process.exit(0);
        
    }
};

export default connectDb;