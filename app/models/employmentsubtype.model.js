const mongoose = require("mongoose");

const EmploymentSubType = mongoose.model(
    "EmploymentSubType",
    new mongoose.Schema({
        name: String,
        employmenttype:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "EmploymentType"
        },
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

module.exports = EmploymentSubType;