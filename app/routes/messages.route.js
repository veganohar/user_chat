const controller = require("../controllers/messages.controller");
const {userMiddleware} = require('../middlewares');
module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.post('/api/messages/sendMessage',[userMiddleware.verifyToken],controller.sendMessage);
}