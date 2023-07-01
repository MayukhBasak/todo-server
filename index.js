const express= require("express");
const app= express();
require("dotenv").config();
const db= require("./config/database");
const PORT= process.env.PORT|| 5000;
const createTodoRouter= require("./routes/todo")
db.dbConnect();
app.use(express.json());
app.use("/api/v1", createTodoRouter);
app.listen(PORT, ()=>{
    console.log(`app is runninng at ${PORT}`);
})