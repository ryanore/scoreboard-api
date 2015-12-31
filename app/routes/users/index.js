var express = require('express');
var router = express.Router();
var user = require('./userController.js');
var ejwt = require('../../middleware/jwt');
var cors = require('../../middleware/cors');

router.get('/users/:id', user.getOne.bind(user));

router.get('/users/', user.list.bind(user));

router.post('/users/', user.create.bind(user));

router.put('/users/:id', user.update.bind(user));

router.delete('/users/:id', user.delete.bind(user));

router.post('/users/batch', cors, user.deleteSome.bind(user));

router.post('/users/forgotpassword', user.forgotpassword);
			
router.post('/users/changepassword', user.changepassword);

module.exports = router;