var express = require('express');
var router = express.Router();
var auth = require('./authController.js');

router.post('/login', auth.login);

module.exports = router;