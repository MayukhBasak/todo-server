const jwt= require("jsonwebtoken")
require("dotenv").config();
exports.auth= async (req, res, next)=>{
    try{
        const token= req.cookies.token || res.body.token || req.header("Authorization").replace("Bearer", "");
        console.log("Hello 1");
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            })
        }

        try{
            const decode= jwt.verify(token, process.env.JWT_SECRET);
            req.user= decode;
        }
        catch(error){
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Something went wring while validating the token",
        });
    }
}