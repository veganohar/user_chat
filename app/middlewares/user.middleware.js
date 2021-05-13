const db = require("../models");
const User = db.user;


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

const userMiddleware = {
    checkforDuplicateUnameEmail
  };
  
  module.exports = userMiddleware;