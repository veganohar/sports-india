const controller = require("../controllers/application.controller");
const {userMiddleware} = require("../middlewares")
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/applications/getApplicationById/:aid",[userMiddleware.verifyToken], controller.getAllApplicationById);
    app.get("/api/applications/getAllApplications",[userMiddleware.verifyToken], controller.getAllApplications);
    app.get("/api/applications/getApplications/:skip/:limit",[userMiddleware.verifyToken], controller.getApplications);
    app.get("/api/applications/getCount",[userMiddleware.verifyToken], controller.getCount);
    app.get("/api/applications/test",[userMiddleware.verifyToken], controller.test);
    app.post("/api/applications/createApplication", controller.createApplication);
    app.get("/api/applications/getApplicationsByFilter/:skip/:limit", controller.getApplicationsByFilter);
    app.put("/api/applications/updateApplication",[userMiddleware.verifyToken], controller.updateApplication);
    app.delete("/api/applications/deleteApplication/:aid",[userMiddleware.verifyToken], controller.deleteApplication);
  };
  