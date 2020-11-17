const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//configure
const app = express();
const router = express.Router();
dotenv.config();
mongoose.set("debug");
var cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect to database
const connect = mongoose.connect(
  process.env.MONGOCONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false },
  () => {
    console.log("Connected to database");
  }
);
module.exports = connect;

//import routes
const uploadXLRoute = require("./routes/uploadXL");
const uploadEmployee = require("./routes/addEmployee");
const createAnnouncement = require("./routes/announcement");
const admin = require("./routes/admin");
const feedback = require("./routes/feedback");
const motivation = require("./routes/motivation");
const obj = require("./routes/organisation");
const login = require("./routes/login");
var organisation = obj.router;

//middlewares
app.use("/api/upload-employee-data", uploadXLRoute);
app.use("/api/upload-employee", uploadEmployee);
app.use("/api/announcement", createAnnouncement);
app.use("/api/admin", admin);
app.use("/api/feedback", feedback);
app.use("/api/motivation", motivation);
app.use("/api/organisation", organisation);
app.use("/api/employee",login);

//listening on port
const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
