const express = require("express");
const app = express();
const routes = require("../app/routes");
const path = require("path");
const bodyParser = require("body-parser");

// app.set('clientPath', path.join(__dirname, "../..", "client"));
// console.log(app.get("clientPath"));
// app.use(express.static(app.get("clientPath")));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app);

module.exports = app;