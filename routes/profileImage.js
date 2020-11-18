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
    gfs.collection('profile-image');
});


//storage engine

// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'profile-image'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });


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

// // //upload to DB
// router.post('/upload',upload.single('file'),(req,res)=>{       //multer can upload even an array of files but its not needed rn. 'file is the filename written in the form in html in class custom-file mb-3'
//     //res.json({file: req.file});
    
//     console.log('uploaded!');
//     res.redirect('/');
// });


// //upload to DB
router.post('/upload',verify,(req,res)=>{       //multer can upload even an array of files but its not needed rn. 'file is the filename written in the form in html in class custom-file mb-3'
    res.json({file: req.file});
    var userid = req.user.userid;
    console.log(userid);

    const storage = new GridFsStorage({
        url: mongoURI,
        file: (req, file) => {
          return new Promise((resolve, reject) => {
            const filename = userid + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'profile-image'
              };
              resolve(fileInfo);
            
          });
        }
      });

    const upload = multer({storage});
    upload.single('file')
    console.log('uploaded!');
    res.redirect('/');
});

//display all files

router.get('/files',(req,res)=>{
    gfs.files.find().toArray((err, files)=>{
        //if files r there
        if(!files || files.length ===0){
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        console.log('files:'+files);
         //File exist
         return res.json(file); 
    });
});

//display specific file

router.get('/image/:filename',(req,res)=>{
    gfs.files.findOne({filename: req.params.filename},(err, file)=>{
        //if files r there
        if(!file || file.length === 0){
            return res.status(404).json({
                err: 'No file exist'
            });
        }

        // check if image
        if(file.contentType = 'image/jpeg'|| file.contentType == 'image/png'){
            //create read stream to the browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else{
            res.status(404).json({
                err:"Not an image"
            });
        }
    });
       
});


//delete

router.delete('/files/:id',(req,res)=>{
    gfs.remove({_id: req.params.id, root:'profile-image'},(err, gridStore)=>{
        if(err) return res.status(404).json({err : err});
        res.redirect('/');
    });
});


module.exports = router;