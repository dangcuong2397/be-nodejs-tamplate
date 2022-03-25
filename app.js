var express = require('express');
var cors = require('cors')
var app = express();
// include req.body
const bodyParser = require('body-parser')
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())
app.use(cors())

// include .env config
require('dotenv').config();
// include prototype
require('./src/utils/index')

// view engine setup
app.use(express.static('public'));


// connect databases
require('./src/controler/base/mysql/mysql');

const routes = require('./src/routes');

let version = process.env.version || "/api/v1";
app.use(version, routes); 

module.exports = app;
