const controller = require("../controllers/user.controller");


module.exports = function(app){
    app.post('/api/users/signup',controller.signup);
    app.post('/api/users/signin',controller.signin);
}