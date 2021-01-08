const controller = require("../controllers/employmentsubtype.controller");
const {userMiddleware} = require("../middlewares")
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/employmentsubtypes/getAllEmploymentSubTypes",[userMiddleware.verifyToken], controller.getAllEmploymentSubTypes);
    app.get("/api/employmentsubtypes/getEmploymentSubTypesByTypeId/:etid", controller.getEmploymentSubTypesByTypeId);
    app.get("/api/employmentsubtypes/getEmploymentSubTypeById/:estid", controller.getEmploymentSubTypeById);
    app.post("/api/employmentsubtypes/createEmploymentSubType",[userMiddleware.verifyToken], controller.createEmploymentSubType);
    app.put("/api/employmentsubtypes/updateEmploymentSubType",[userMiddleware.verifyToken], controller.updateEmploymentSubType);
    app.delete("/api/employmentsubtypes/deleteEmploymentSubType/:estid",[userMiddleware.verifyToken], controller.deleteEmploymentSubType);
  };
  