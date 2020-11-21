const express = require("express");
const boydeparser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const verify = require("../middlewares/verify");
const Library = require("../schema/Library");

const app = express();
const router = express.Router();
dotenv.config();

//Middleware

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(methodOverride("_method"));

const mongoURI = process.env.MONGOCONNECT;

//connection to DB
const connect = mongoose.createConnection(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//Init G-FS
let gfs;
connect.once("open", () => {
  //Init stream
  gfs = Grid(connect.db, mongoose.mongo);
  gfs.collection("library_file");
});

//storage engine

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploaded_images",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });




router.get("/", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    //if files r there
    if (!files || files.length === 0) {
      res.json({
        data: {},
        message: "Coudln't find the file you are looking!",
      });
    } else {
    //   files.map((file) => {
    //     if (
    //       file.contentType === "image/jpeg" ||
    //       file.contentType === "image/png"
    //     ) {
    //       file.isImage = true;
    //     } else {
    //       file.isImage = false;
    //     }
    //   });
      res.json({
        data: { files: files },
        message: "File recieved!",
      });
    }
  });
});

// //upload to DB
router.post("/upload", upload.single("file"), (req, res) => {
  // res.json({file: req.file});
  console.log(req.file);
  res.send("The file has been uploaded");
});

//acces token and filename
router.post("/link-file-to-library", verify, (req, res) => {
  Library.findOneAndUpdate(
    { _id: req.user.userid },
    {
      $set: {
        file: req.body.filename,
      },
    }
  )
    .then((data) => {
      console.log(data);
      res.send("uploaded");
    })
    .catch((err) => {
      console.log(err);
      res.send("err");
    });
});

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

// display specific image

router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //if files r there
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exist",
      });
    }

    // check if image
    if ((file.contentType = "image/jpeg" || file.contentType == "image/png")) {
      //create read stream to the browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

router.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // If File exists this will get executed
    const readstream = gfs.createReadStream(file.filename);
    return readstream.pipe(res);
  });
});

//delete

router.delete("/files/:id", (req, res) => {
  gfs.remove({ _id: req.params.id, root: "library_file" }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.send("deleted!");
  });
});

module.exports = router;
