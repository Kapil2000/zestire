import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    employeename:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    website:{
        type:String,
        require:true,
    },
    employeeposition:{
        type:String,
        require:true,
    },
    joiningdate:{
        type:String,
        require:true,
    },
    skills:{
        type:String,
        require:true,
    },
    salary:{
        type:Number,
        require:true,
    },
    rating:{
        type:String,
        require:true,
    },
    assigneddeviceid:{
        type:String,
    },
    remark:{
        type:String,
    },
});

const User = new mongoose.model("User", userSchema);
export default User;