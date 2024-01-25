import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    requirement:{
        type:String,
    }
    
});

const schedule = new mongoose.model("schedule", scheduleSchema);
export default schedule;