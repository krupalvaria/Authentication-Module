const express = require("express");
const dotenv = require("dotenv").config();
var cors = require('cors');
const bodyParser = require("body-parser");
const databaseCollection = require("./src/dbConfig/dbConnection")
databaseCollection();
const routes =require("./src/route/index")

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to Authentication.");
});
app.use("/", routes);

// console.log("process.env.PORT====>", process.env.PORT)
app.listen((process.env.PORT), () => {
    console.log(`server is running on ${process.env.PORT}`)
})
