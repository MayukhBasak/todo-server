const nodemailer= require("nodemailer")
require("dotenv").config();

const mailsender= async(email, title, body)=>{
    try{
        let transporter= nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                password: process.env.MAIL_PASSWORD,
            }
        })
        let info= await transporter.sendMail({
            from: 'makeRoutine',
            to: email,
            subject: title,
            html: body,
        })
        console.log(info);
    }catch(error){
        console.log(error.message);
    }
}
module.exports= mailsender;