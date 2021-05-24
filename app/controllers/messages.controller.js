const db = require("../models");
const Message = db.message;

exports.sendMessage = (req,res)=>{
    let data = req.body;
    let message = new Message();
    for(let p in data){
        message[p] = data[p];
    }
    message.sender = req.userId;
    message.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.send({
            message:"Message Sent successfully",
            data:response
        })
    })
}