/**
 * @version 1.0.0
 */

const express = require('express');
const api = express();
const service = require("./service");

api.get('/', service.listStory);
api.post('/', service.createStory);

module.exports = api;