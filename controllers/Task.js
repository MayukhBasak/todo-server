const Todo= require("../models/Todo");
const User = require("../models/User");


exports.createTask= async (req, res)=>{
    try{
        // const {title, description}= req.body;
        const {id, title, description}= req.body;
        // const userDetails= await User.findById(req.user.id);
        const userDetails= await User.findById(id);
        if(!id || !title || !description){
            return res.status(400).json({
                success: false,
                message: "fill title, description carefully"
            })
        }
        let task= await Todo.create({
            title: title,
            description: description,
        });
        console.log(task.id);
        userDetails.list.push(task.id);
        await userDetails.save();
        await task.populate("title");
        return res.status(200).json({
            success: true,
            message: "task is created",
            task: task
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to create task"
        })
    }
}
// update task

exports.updateTask= async(req, res)=>{
    try{
        const {taskid}= req.body;
        const task= await Todo.findById(taskid);
        await Todo.findByIdAndUpdate(
            task._id,
            {
                status: "completed"
            },
            {
                new: true
            }
        )
        return res.status(200).json({
            success: true,
            message: "Task status updated succefully",
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "error in updating task",
        })
    }
}
// delete task
exports.deleteTask= async (req, res)=>{
    try{
        const {taskid}= req.body;
        const task= await Todo.findById(taskid);
        if(task.status!== "completed"){
            return res.status({
                success: false,
                message: "update task status as 'completed'",
            })
        }
        await Todo.findByIdAndDelete(task._id);
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: " Failed to delete task",
        })
    }
}