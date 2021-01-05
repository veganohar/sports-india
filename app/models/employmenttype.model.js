const mongoose = require("mongoose");

const EmploymentType = mongoose.model(
    "EmploymentType",
    new mongoose.Schema({
        name: String,
        isActive: {
            type: Boolean,
            default: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    })
);

module.exports = EmploymentType;