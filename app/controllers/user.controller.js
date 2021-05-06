const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const config = require("../config/auth.config"); 
const nodemailer = require("nodemailer");
exports.signup = async (req,res)=>{
    let obj = req.body;
    console.log(obj)
    let user = new User();
    for(let p in obj){
        user[p] = obj[p];
    };
    user.password = bcrypt.hashSync(obj.password, 8);
    let secretCode = await cryptoRandomString({length: 128});
    console.log(secretCode);
    user.secretCode = secretCode;
    user.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        let transporter = nodemailer.createTransport(config.mailTransporter);
        let mailData =  {
            from: '"User Chat App" <dummym431@gmail.com>',  
              to: response.email,   
              subject: 'Email Verification for USer Chat App',
              text: 'That was easy!',
              html: `<p>Click <a href="${config.url}/verification/verify-account/${response.id}/${secretCode}">here</a> to Verify your account</p>`
            };
            transporter.sendMail(mailData,(err,info)=>{
                if(err){
                    return res.send({ message: "User registered successfully! Mail Error"  });
                }
                res.send({ message: "User registered successfully! Mail Success" });
            })
    })
}

exports.signin = (req,res)=>{

}



