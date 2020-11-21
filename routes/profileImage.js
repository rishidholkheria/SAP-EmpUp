const express = require('express');
const boydeparser = require('body-parser');
const path = require('path');
const crypto = require('crypto');   //for generating the file names
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const verify = require('../middlewares/verify');
const Employee = require('../schema/Employee');

const app = express();
const router = express.Router();
dotenv.config();

//Middleware

// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use(methodOverride('_method'));
app.set('view engine','ejs');

const mongoURI = process.env.MONGOCONNECT;

//connection to DB
const connect = mongoose.createConnection(mongoURI,{useUnifiedTopology: true, useNewUrlParser: true });

//Init G-FS
let gfs;
connect.once('open',()=>{
    //Init stream
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection('profileimg');
});


//storage engine

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const _id = file.filename
        const fileInfo = {
          filename: filename,
          bucketName: 'profileimg',
          _id: _id
        };
        resolve(fileInfo);
    });
  }
});
const upload = multer({ storage });


router.get('/',(req,res)=>{
    gfs.files.find().toArray((err, files)=>{
        //if files r there
        if(!files || files.length ===0){
            res.render('app',{files: false});   
        }else{
            files.map(file=>{
                if(file.contentType ==='image/jpeg'||file.contentType ==='image/png'){
                    file.isImage = true;
                } else{
                    file.isImage = false;
                }
            });
            res.render('app',{files:files});
        }
    });
});

// //upload to DB
router.post('/upload',upload.single('file'),(req,res)=>{       //multer can upload even an array of files but its not needed rn. 'file is the filename written in the form in html in class custom-file mb-3'
    // res.json({file: req.file});
    
    console.log(req.file);
    res.redirect('/');

});

//acces token and filename
router.post('/link-file-to-user',verify,(req,res) => {
    Employee.findOneAndUpdate({_id : req.user.userid},{
        $set :{
            image: req.body.filename
        }
    }).then(data => {
        console.log(data);
        res.send('uploaded')
    }).catch(err => {
        console.log(err);
        res.send('err');
    });
    
})



// //display all images

// router.get('/images',(req,res)=>{
//     gfs.files.find().toArray((err, files)=>{
//         //if files r there
//         if(!files || files.length ===0){
//             return res.status(404).json({
//                 err: 'No files exist'
//             });
//         }
//         console.log('files:'+files);
//          //File exist
//         return res.json(files); 
//     });
// });

//display specific image

// router.get('/image-id/:_id',(req,res)=>{
//     gfs.files.findOne({_id: req.params._id},(err,result)=>{
//         if(err){
//             return res.json({
//                 data: {},
//                 message: "Error: "+err
//             });
//         }

//         res.json({
//             data: result,
//             message: "fetched!"
//         })

//     })
// })

router.get('/image-id/:id',function(req , res) {
    var id = gfs.tryParseObjectId(req.params.id);
    var options = {_id: id, root: 'profileimg'};
    try{
      gfs.createReadStream(options).pipe(res);
    }
    catch(err){
      res.json(err);  
      console.log(err);
    }
  });

router.get('/image/:filename',(req,res)=>{
    gfs.files.findOne({filename: req.params.filename},(err, file)=>{
        //if files r there

        if(err){
            return res.json({
                data: {},
                message: "Error: "+err
            });
        }

        if(!file || file.length === 0){
            return res.status(404).json({
                err: 'No file exist'
            });
        }

        // check if image
        // if(file.contentType = 'image/jpeg'|| file.contentType == 'image/png'){
            //create read stream to the browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
            res.send("hello")
        // } else{
        //     res.status(404).json({
        //         err:"Not an image"
        //     });
        // }
    });
       
});


router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ _id: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // If File exists this will get executed
      const readstream = gfs.createReadStream(file.filename);
      return readstream.pipe(res);
    });
  });

//delete

router.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'profileimg' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ error: err });
      }
      res.send('success');
    });
  });


module.exports = router;