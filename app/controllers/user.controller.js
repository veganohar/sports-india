const db = require('../models');
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const nodemailer = require('nodemailer');
const cryptoRandomString = require("crypto-random-string");
exports.signup = (req,res)=>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        active:true,
        password: bcrypt.hashSync(req.body.password, 8)
      });
      user.save((err,user)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({
            status: 200,
            message: "User Registered Successfully"
          })
      })
}


exports.signin = (req,res)=>{
  
    User.findOne({$or:[{username:req.body.username},{email: req.body.username}]},(err,user)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          var passwordIsValid = bcrypt.compareSync(
            req.body.password, 
            user.password 
          );
    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
    
          var token = jwt.sign({ id: user.id,username: user.username,email: user.email }, config.secret, {
            expiresIn: 86400 // 1 hour
          });
          let decoded = jwt.decode(token);
            res.status(200).send({
              id: decoded.id,
              username: decoded.username,
              email: decoded.email,
              accessToken: token,
              exp:decoded.exp
            });
    })
}

exports.changePassword = (req,res)=>{
  let obj = {
    password:bcrypt.hashSync(req.body.newPassword, 8)
  }
  User.update({ _id: req.userId }, { $set: obj }, (err, response) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      message: "Password Changed", 
      status: 200,
    });
  });
}

exports.resetPassword = (req,res)=>{
  User.findOne({email:req.body.email},(err,user)=>{
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(!user){
      return res.status(404).send({
        message: "User Not found!"
      });
    }
    const pw = cryptoRandomString({
      length: 6,
  });
    User.update({ _id: user._id }, { $set: {password:bcrypt.hashSync(pw, 8)} }, (err, response) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      let transporter = nodemailer.createTransport(config.mailTransporter);
      const mailData = {
        from: 'admin@gmail.com',  
          to: req.body.email,   
          subject: 'Password Reset',
          html: `${pw}`
        };
        transporter.sendMail(mailData, function (err, info) {
          if(err){
            console.log(err);
            res.send({ message: "Password Changed! Mail Error"  });
          }
          else{
            res.send({ message: "Password Changed! Check your Mail" });
          }
       });
    });
  })
}