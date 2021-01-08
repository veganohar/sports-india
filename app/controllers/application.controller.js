const db = require('../models');
const Application = db.application;
const { applicationMiddleware } = require("../middlewares");
var upload = require("../config/multer.config");
const fs = require("fs");
const path = require('path');
const directory = 'uploads';

var populateOptions={
  path:'employmentsubtype',
  select:'name',
  populate:{
    path: 'employmenttype',
       model: 'EmploymentType',
       select:'name'
  }
}
exports.getAllApplications = (req, res) => {
  Application.find().sort('-createdOn').populate(populateOptions).exec((err, allApplications) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      status: 200,
      data: allApplications
    })
  })
};
exports.getApplications = (req,res)=>{
  Application.find().sort('-createdOn').skip(Number(req.params.skip)).limit(Number(req.params.limit)).populate(populateOptions).exec((err, applications) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ 
      status: 200,
      data: applications
    })
  })
}
exports.getApplicationsByFilter = (req,res)=>{
  let filter= req.body;
  console.log(filter);
  Application.find().sort('-createdOn').skip(Number(req.params.skip)).limit(Number(req.params.limit)).populate(populateOptions).exec((err, allApplications) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ 
      status: 200,
      data: allApplications
    })
  })
}
exports.getCount = (req,res)=>{
  Application.countDocuments((err,count)=>{
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      status: 200,
      count: count
    });
  })
}
exports.test = (req, res) => {
  const regex = new RegExp("man", 'i') 
  Application.find({firstName:{$regex:regex}}).populate(populateOptions).exec((err, application) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!application) {
      res.send({
        status: 404,
        message: "Application not found"
      });
      return;
    }
    res.send({
      status: 200,
      data: application
    })
  });
};

exports.getAllApplicationById = (req, res) => {
  Application.findById(req.params.aid).populate(populateOptions).exec((err, application) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!application) {
      res.send({
        status: 404,
        message: "Application not found"
      });
      return;
    }
    res.send({
      status: 200,
      data: application
    })
  });
};

exports.createApplication = async (req, res) => {
  upload.fields(req, res, (err) => {
    if (err) {
      res.status(400).send(err);
    }
    checkForDuplicate(req.files);
  });

  function checkForDuplicate(images) {
    Application.find({ 'mobile': req.body.mobile, 'email': req.body.email, 'firstName': req.body.firstName }, async (err, appl) => {
      if (err) {
        await removeFiles(images);
        res.status(500).send({ message: err });
        return;
      }
  
      if (appl.length>0) {
        await removeFiles(images);
        res.status(400).send({ message: "Failed! You have already Applied" });
        return;
      }
        saveApplication(images);
    });
  }

  function removeFiles(files) {
    for (const f in files) {
      fs.unlink(path.join(directory, files[f][0].filename), err => {
        if (err) throw err;
      });
    }
  }


  async function saveApplication(files) {
    let applicantId = await applicationMiddleware.createApplicationNumber();
    let application = new Application();
    let fd = JSON.parse(req.body.fd);
    console.log(fd);
    for (let p in fd ) {
      application[p] = typeof(fd[p])=="string"?fd[p].trim():fd[p];
    }
    application.applicantId = applicantId;
    application.image = files.image[0].filename;
    application.photoid_proof = {
      name: fd.photoid_proof,
      file: files.photoid_proof[0].filename
    },
      application.addressid_proof = {
        name: fd.addressid_proof,
        file: files.addressid_proof[0].filename
      },
      files.cv ? application.cv = files.cv[0].filename : '';
      application.save((err, application) => {
        if (err) {
          removeFiles(files);
          res.status(500).send({ message: err });
          return;
        }
        res.send({
          message: "Application Created",
          status: 200,
          data: application
        });
      });
  }
};

exports.updateApplication = (req, res) => {
  Application.update({ _id: req.body.id }, { $set: req.body }, (err, response) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      message: "Application Updated",
      status: 200,
      data: response
    });
  });
};

exports.deleteApplication = (req, res) => {
  Application.findByIdAndDelete(req.params.aid, (err, response) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      message: "Application Deleted",
      status: 200,
      data: response
    });
  });
};