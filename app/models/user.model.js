const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username:String,
        email:String,
        password:String,
        name:String,
        isVerified:{
            type:Boolean,
            default:false
        },
        secretCode:String,
        createdOn:{
            type:Date,
            default:Date.now
        }       
    })
)

module.exports = User;