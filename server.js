const express = require("express");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//routes work accross sites
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Databse is listening and node is Running on port ${port}`);
    });
  }
});