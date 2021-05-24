const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
checkforDuplicateUnameEmail = (req,res,next)=>{
    let uname = req.body.username;
    let email = req.body.email;
    User.findOne({$or:[{username:uname},{email:email}]},(err,user)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if(user){
              if(uname===user.username){
                res.status(400).send({ message: "Failed! Username is already in use!" });
                return;
              }
              if(email===user.email){
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
              }
          }
          next();
    })
}

verifyToken = (req,res,next)=>{
  let token= req.headers["x-access-token"];
  if(!token){
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token,config.secret,(err,decoded)=>{
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  })
}

const userMiddleware = {
    checkforDuplicateUnameEmail,
    verifyToken
  };
  
  module.exports = userMiddleware;