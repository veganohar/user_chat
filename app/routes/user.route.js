const controller = require("../controllers/user.controller");
const {userMiddleware} = require('../middlewares');

module.exports = function(app){
    app.post('/api/users/signup',[userMiddleware.checkforDuplicateUnameEmail],controller.signup);
    app.post('/api/users/signin',controller.signin);
    app.get('/verification/verify-account/:uid/:secretCode',controller.verify);
}