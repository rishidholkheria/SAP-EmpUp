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
        bucketName: "library_file",
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
      res.status(404).json({
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
      res.status(200).json({
        data: { files: files },
        message: "File recieved!",
      });
    }
  });
});

// //upload to DB
router.post("/upload", upload.single("real-file"), (req, res) => {
  console.log("FILE API ");
  console.log(req.file);
  res.json({ file: req.file });
  res.send("The file has been uploaded");
});

//acces token and filename
router.post("/link-file-to-library", (req, res) => {
  console.log("data from frontend: ");
  console.log(req.body);

  if (req.body.bookId === "" && req.body.fileId === "") {
    return res.status(400).json({
      data: {},
      message: "Empty string!",
    });
  }

  Library.findOneAndUpdate(
    { _id: req.body.bookId },
    {
      $set: {
        file: req.body.fileId,
      },
    }
  )
    .then((data) => {
      console.log("link api:" + data);
      res.status(200).send("uploaded");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("err");
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
router.get("/image-id/:id", function (req, res) {
  var id = gfs.tryParseObjectId(req.params.id);
  var options = { _id: id, root: "library_file" };
  try {
    gfs.createReadStream(options).pipe(res);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//delete

router.delete("/files/:id", (req, res) => {
  gfs.remove({ _id: req.params.id, root: "library_file" }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    return res.status(200).send("deleted!");
  });
});

module.exports = router;
