import mongoose from "mongoose";

const taskSchema= new mongoose.Schema({
    description:{
        type:String,
        required:[true,'description is required'],
        maxlength:[100,'max length is 100 character'],
        trim:true,
    },
    status:{
        type:String,
        enum:{
            values:['todo','in-progress','done'],
            message:"Status must be either todo, in-progress, or done"
        },
        default:'todo'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true,"Task must belong to a user"]
    }
},{timestamps:true})

const Task = mongoose.model('Task',taskSchema)
export default Task