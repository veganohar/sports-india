const controller = require("../controllers/employmentsubtype.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/employmentsubtypes/getAllEmploymentSubTypes", controller.getAllEmploymentSubTypes);
    app.get("/api/employmentsubtypes/getEmploymentSubTypesByTypeId/:etid", controller.getEmploymentSubTypesByTypeId);
    app.post("/api/employmentsubtypes/createEmploymentSubType", controller.createEmploymentSubType);
    app.put("/api/employmentsubtypes/updateEmploymentSubType", controller.updateEmploymentSubType);
    app.delete("/api/employmentsubtypes/deleteEmploymentSubType/:etsid", controller.deleteEmploymentSubType);
  };
  