const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const app = express();
const db = require("./app/models");
const User = db.user;
const EmploymentType = db.employmenttype;
const dbConfig = require("./app/config/db.config");
var fs = require('fs');
var bcrypt = require("bcryptjs");
var dir = './uploads';
if (!fs.existsSync(dir)){ 
    fs.mkdirSync(dir);
}
var corsOptions = {
  origin: "http://localhost:4200" 
};
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit:'50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sports India application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.use(express.static('uploads'));

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    createEmploymentTypes();
    createAdmin();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


  createEmploymentTypes = () => {
    EmploymentType.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        let e_types = ["Student", "Unemployed", "Employed", "Self Employed (Professional)", "Self Employed (Business)"];
        for(let e of e_types){
          new EmploymentType({
            name: e
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
            console.log(`added '${e}' to Employemet Types`);
          });
        }
      }
    });
  } 

createAdmin = ()=>{
  User.estimatedDocumentCount((err,count)=>{
    let pw= "12345"; 
    if(!err&&count===0){
      const user = new User({ 
        username: "admin",
        email: "admin@gmail.com",
        active:true,
        password: bcrypt.hashSync(pw, 8)
      });
      user.save((err,user)=>{
        if (err) {
           console.log(err);
            return;
          }
          console.log(user);
         
      })
    }
  })
  
}

  require('./app/routes/application.routes')(app);
  require('./app/routes/employmenttype.routes')(app);
  require('./app/routes/employmentsubtype.routes')(app);
  require('./app/routes/user.routes')(app);