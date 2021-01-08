const db = require('../models');
const EmploymentSubType = db.employmentsubtype;

exports.getAllEmploymentSubTypes = (req, res) => {
  EmploymentSubType.find().sort('name').populate("employmenttype","name").exec((err, employmentSubTypes) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        status: 200,
        data: employmentSubTypes
      })
    })
  };

  exports.getEmploymentSubTypesByTypeId = (req, res) => {
    EmploymentSubType.find({employmenttype:req.params.etid}).sort('-name').populate("employmenttype","name").exec((err, employmentSubTypes) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({
          status: 200,
          data: employmentSubTypes.reverse()
        })
      })
    };


    exports.getEmploymentSubTypeById = (req, res) => {
      EmploymentSubType.findById(req.params.estid).populate("employmenttype","name").exec((err, employmentSubType) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({
            status: 200,
            data: employmentSubType
          })
        })
      };

  exports.createEmploymentSubType=(req,res)=>{
    EmploymentSubType.findOne({ name: req.body.name }, async (err, et) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (et) {
          res.status(400).send({ message: "Failed! Employment Sub Type is already in use!" });
          return;
        }
        saveRecord();
      });
      function saveRecord(){
        let employmentsubtype = new EmploymentSubType();
        for (let p in req.body) {
            employmentsubtype[p] = req.body[p].trim();
        }
        employmentsubtype.save((err, employmentsubtype) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({
              message: "Employment Sub Type Created",
              status: 200,
              data: employmentsubtype
            });
          });
      }
  }

  exports.updateEmploymentSubType = (req, res) => {
    EmploymentSubType.update({ _id: req.body.id }, { $set: req.body }, (err, response) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        message: "Employment Sub Type Updated",
        status: 200,
        data: response
      });
    });
  };

  exports.deleteEmploymentSubType = (req, res) => {
    EmploymentSubType.findByIdAndDelete(req.params.estid, (err, response) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        message: "Employment Sub Type Deleted",
        status: 200,
        data: response
      });
    });
  };