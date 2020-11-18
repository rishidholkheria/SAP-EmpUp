const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const dotenv = require("dotenv");
const Library = require("../schema/Library");

const app = express();
dotenv.config();

const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));


// DATABASE CONNECTION
mongoose.connect(process.env.MONGOCONNECT);
const db = mongoose.connection;
db.once('error', (err)=>{
    console.log(err);    
});
db.on("open", ()=>{
    console.log("database connection success");
})


// MIDDLEWARE
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(bodyParser.json({limit: '5mb'}));
// app.use(bodyParser.json({limit: '5mb'}));
// app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

// ROUTES
router.get("/", async (req, res, next) => {
  try{
    const library  = await Library.find();
    res.render("index", {
      library
    });
  }catch (err){
    console.log("err: "+ err); 
  }
});

router.post('/add', async ( req, res, next)=>{
  const {name, department, file} = req.body;
  const library = new Library({
    name,
    department
  });
  console.log(file);
  // SETTING IMAGE AND IMAGE TYPES
  saveImage(library, file);
  try{
    const newLibrary = await library.save();
    console.log(newLibrary);  
    res.redirect('/')  ;
  }catch (err){
    console.log(err);    
  }
});




function saveImage(library, imgEncoded) {
  // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
  console.log('err');
  if (imgEncoded == null) return;

  // ENCODING IMAGE BY JSON PARSE
  // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
  const file = JSON.parse(imgEncoded);
  console.log( "JSON parse: "+ file);
  
  // CHECKING FOR JSON ENCODED IMAGE NOT NULL 
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
  if (file != null && imageMimeTypes.includes(file.type)) {

    // https://nodejs.org/api/buffer.html
    // The Buffer class in Node.js is designed to handle raw binary data. 
    // SETTING IMAGE AS BINARY DATA
    library.file = new Buffer.from(file.data, "base64");
    library.fileType = file.type;
  }
}


module.exports = router;