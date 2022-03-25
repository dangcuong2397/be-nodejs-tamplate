const express = require('express');
const router = express();



const story = require('./controler/story_love/api');
router.use('/story', story);

const uploadSingleFile = require('./controler/upload/singleFile');
router.use('/uploadSingleFile', uploadSingleFile);


module.exports = router;