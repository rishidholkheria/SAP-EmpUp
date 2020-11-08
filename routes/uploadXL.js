const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx')
const app = express();
const router = express.Router();

var storage =   multer.diskStorage({
    // file upload destination
    destination: function (req, file, callback) {
      callback(null, './upload/');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '.xlsx');
    }
  });

  var upload = multer({ storage : storage}).single('Employee');


  router.get('/xlsx',function(req,res){
        res.sendFile(__dirname + "/index.html");
  });

  router.post('/file-upload-result',function(req,res){
      upload(req,res,function(err) {
          if(err) {
              return res.end("Error uploading file.");
          }
          res.end("File is uploaded");
      });
  });
  
module.exports = router;
