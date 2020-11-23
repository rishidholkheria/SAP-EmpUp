const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const server = require("./chat/groupChat")(app);
const server1 = require("./chat/chat")(app);
//configure

const router = express.Router();
dotenv.config();
mongoose.set("debug");
var cors = require("cors");
app.use(cors());
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect to database
const connect = mongoose.connect(
  process.env.MONGOCONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Connected to database");
  }
);
module.exports = connect;

//import routes
const objOrg = require("./routes/organisation");
var organisation = objOrg.router;
const uploadXLRoute = require("./routes/uploadXL");
const uploadEmployee = require("./routes/addEmployee");
const admin = require("./routes/admin");
const employee = require("./routes/employee");
const profileImage = require("./routes/profileImage");
const createAnnouncement = require("./routes/announcement");
var announcement = createAnnouncement.router;
const announcementImage = require("./routes/announcementImage");
const feedback = require("./routes/feedback");
const motivation = require("./routes/motivation");
const libraryRoute = require("./routes/library");
var library = libraryRoute.router;
const libraryFile = require("./routes/libraryFile");

//middlewares
app.use("/api/organisation", organisation);
// app.use("/api/upload-employee-data", uploadXLRoute);
app.use("/api/upload-employee", uploadEmployee);
app.use("/api/admin", admin);
app.use("/api/employee", employee);
app.use("/api/employee-profile-image", profileImage);
app.use("/api/announcement", announcement);
app.use("/api/announcemnet-image", announcementImage);
app.use("/api/feedback", feedback);
app.use("/api/motivation", motivation);
app.use("/api/virtual-library", library);
app.use("/api/virtual-library-file", libraryFile);
//app.use("/api/group-chat", groupChat);

// app.use('/',library);

//listening on port
const PORT = 4000 || process.env.PORT;
server1.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
