const User= require("../models/User");
const bcrypt= require("bcrypt");
const validator= require("email-validator")
const jwt= require("jsonwebtoken");
require("dotenv").config();
// sign up user
exports.signup= async(req, res)=>{
    try{
        const {firstName, lastName, email, password, confirmPassword}= req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(404).json({
                success: false,
                message: "please fill all the details carefully",
            })
        }
        let flag= validator.validate(email);
        if(!flag){
            return res.status(404).json({
                success: false,
                message: "Enter Valid email id",
            })
        }
        
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "This email is already in use. Please try with different email address",
            })
        }
        if(password!== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password are not matching, please check it."
            })
        }
        let encryptedPassword= await bcrypt.hash(password, 10);
        const newUser= await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: encryptedPassword,
        })
        console.log(newUser.id);
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "There is some issue in server",
        })
    }
}

// login page
exports.login= async (req, res)=>{
    try{
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully."
            })
        }
        let existingUser= await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        if(bcrypt.compare(existingUser.password, password)){
            const token= jwt.sign(
                {
                    email: existingUser.email,
                    id: existingUser._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );
            existingUser.token= token;
            existingUser.password= undefined;
            const options= {
                expires: new Date(Date.now()+10),
                httpOnly: true,
            };
            return res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User loged in successfully",
                token: token,
                existingUser,
            });
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            })
        }
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "some troble in login",
        })
    }
}