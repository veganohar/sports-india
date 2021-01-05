const controller = require("../controllers/user.controller");
const {userMiddleware} = require("../middlewares")
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  


    app.post("/api/users/signup",[userMiddleware.checkDuplicateUsernameOrEmail], controller.signup);
    app.post("/api/users/signin", controller.signin); 
    app.post("/api/users/changePassword",[userMiddleware.verifyToken,userMiddleware.verifyChangePW], controller.changePassword);
    app.post("/api/users/resetPassword", controller.resetPassword);
  };
  