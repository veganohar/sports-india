const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.application = require("./application.model");
db.employmenttype = require("./employmenttype.model");
db.employmentsubtype = require("./employmentsubtype.model");
db.user = require("./user.model");
module.exports = db;