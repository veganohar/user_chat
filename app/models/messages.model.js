const mongoose = require('mongoose');

const Messages = mongoose.model(
    'Messages',
    new mongoose.Schema({
        message: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reciever: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    })
)

module.exports = Messages;