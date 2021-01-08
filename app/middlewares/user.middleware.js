const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id; 
      next();
    });
  };

verifyChangePW = (req,res,next)=>{
  User.findById(req.userId,(err,user)=>{
    if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword, 
        user.password 
      );

      if (!passwordIsValid) {
        return res.status(403).send({
          message: "Invalid Old Password!"
        });
      }else{
        if(req.body.oldPassword===req.body.newPassword){
          return res.status(403).send({
            message: "New Password should be different from Old Password"
          });
        }else{
          next(); 
        }

      }

  
})
}

  checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
  
      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
  
        next();
      });
    });
  };

  const userMiddleware = {
    verifyToken,
    checkDuplicateUsernameOrEmail,
    verifyChangePW
  };
  module.exports = userMiddleware;