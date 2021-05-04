const mongoose = require('mongoose');

var db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.message = require("./messages.model");

module.exports = db;