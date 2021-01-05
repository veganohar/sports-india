var multer  = require('multer');
const path = require("path")
var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) {
    let fname = (file.originalname.replace(/[^A-Z0-9]+/ig, "_") + "_" + Date.now() + path.extname(file.originalname)).toLowerCase();
     cb(null , fname);   
  }
});
var upload = multer({ storage: storage,limits: { fileSize: '5mb' } })
module.exports = {  
    multiple : upload.array('images', 10),
    single : upload.single('images'), 
    none:upload.none(),
    fields:upload.fields([{name:"image", maxCount:1},{name:"photoid_proof", maxCount:1},{name:"addressid_proof", maxCount:1},{name:"cv", maxCount:1}])
}  