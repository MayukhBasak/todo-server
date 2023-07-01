const express= require("express")
const router= express.Router();
const {signup, login}= require("../controllers/Auth")
const {createTask, updateTask, deleteTask}= require("../controllers/Task");
const {auth}= require("../middlewares/auth")
router.post("/sign-up", signup);
router.post("/login", login);
// router.post("/add-task", auth, createTask);
router.post("/add-task", createTask);
router.post("/update-task", updateTask);
router.post("/delete-task", deleteTask);
module.exports= router;