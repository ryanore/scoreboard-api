var express = require('express');
var router = express.Router();
var auth = require('./authController.js');

router.post('/login', auth.login);
router.get('/verify', auth.verifyToken);

module.exports = router;