/**
 * @version 1.0.0
 */

const express = require('express');
const api = express();
const multer = require('multer');
const response = require('../base/response');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/media');
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({
    storage: storage
});

api.post('/', upload.single('file'), function (req, res) {
    const file = req.file;
    response.ok(res, 
        {
            url: file.path.replace(/\\/g,'/').slice(7) ,
            filename:file.filename
        }
    );
});

module.exports = api;