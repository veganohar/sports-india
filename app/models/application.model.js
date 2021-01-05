const mongoose = require("mongoose");

const Application = mongoose.model(
  "Application",
  new mongoose.Schema({
    isVerified: {
      type: Boolean,
      default: false
    },
    firstName: String,
    lastName: String,
    middleName: String,
    fatherName: String,
    motherName: String,
    dob: Date,
    mobile: Number,
    applicantId: String,
    email: String,
    employmentsubtype:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmploymentSubType"
  },
    address: {
      pin:Number,
      state:String,
      district:String,
      circle:String,
      line1:String,
      line2:String,
      landMark:String
    },
    qualifications: [{
      school : String,
      degree : String,
      field:String,
      startYear:Number,
      endYear:Number
       }],
    highestQualification: String,
    image: String,
    photoid_proof:Object,
    addressid_proof: Object,
    cv: String,
    seeker: Boolean,
    provider: Boolean,
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

module.exports = Application;