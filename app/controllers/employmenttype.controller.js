const db = require('../models');
const EmploymentType = db.employmenttype;

exports.getAllEmploymentTypes = (req, res) => {
    EmploymentType.find().sort('name').exec((err, employmentTypes) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        status: 200,
        data: employmentTypes
      })
    })
  };

  exports.createEmploymentType=(req,res)=>{
    EmploymentType.findOne({ name: req.body.name }, async (err, et) => {
        if (err) {
        await  removeFiles(images);
          res.status(500).send({ message: err });
          return;
        }
        if (et) {
          await removeFiles(images);
          res.status(400).send({ message: "Failed! Employment Type is already in use!" });
          return;
        }
        saveRecord();
      });
      function saveRecord(){
        let employmenttype = new EmploymentType();
        for (let p in req.body) {
            employmenttype[p] = req.body[p].trim();
        }
        employmenttype.save((err, employmenttype) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({
              message: "Employment Type Created",
              status: 200,
              data: employmenttype
            });
          });
      }
  }

  exports.updateEmploymentType = (req, res) => {
    EmploymentType.update({ _id: req.body.id }, { $set: req.body }, (err, response) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        message: "Employment Type Updated",
        status: 200,
        data: response
      });
    });
  };

  exports.deleteEmploymentType = (req, res) => {
    EmploymentType.findByIdAndDelete(req.params.etid, (err, response) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        message: "Employment Type Deleted",
        status: 200,
        data: response
      });
    });
  };