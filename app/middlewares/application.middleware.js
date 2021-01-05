const db = require("../models");
const Application = db.application;
createApplicationNumber = async () => {
    let rec = await Application.find().sort({ _id: -1 }).limit(1); 
    if (rec.length == 0) {
        return "SI100000001";
    } else {
        let prevId = rec[0].applicantId;
        let pid = Number(prevId.substr(2));
        return `SI${pid+1}`;
    }
}
const applicationMiddleware = {
    createApplicationNumber
}
module.exports = applicationMiddleware;