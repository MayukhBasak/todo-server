const mongoose= require("mongoose");
require("dotenv").config();
exports.dbConnect= ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("DB is connected successfully");
    })
    .catch((error)=>{
        console.log("Issue in DB connection");
        console.error(error);
        process.exit(1);
    })
}