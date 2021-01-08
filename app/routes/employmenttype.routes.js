const controller = require("../controllers/employmenttype.controller");
const {userMiddleware} = require("../middlewares")
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/employmenttypes/getAllEmploymentTypes", controller.getAllEmploymentTypes);
    app.post("/api/employmenttypes/createEmploymentType",[userMiddleware.verifyToken], controller.createEmploymentType);
    app.put("/api/employmenttypes/updateEmploymentType",[userMiddleware.verifyToken], controller.updateEmploymentType);
    app.delete("/api/employmenttypes/deleteEmploymentType/:etid", controller.deleteEmploymentType);
  };
  