var express = require('express');
var router = express.Router();
var user = require('./userController.js');

router.get('/api/v1/users', user.list);

router.get('/api/v1/user/:id', user.getOne);

router.post('/api/v1/user/', user.create);

router.put('/api/v1/user/:id', user.update);

router.delete('/api/v1/user/:id', user.delete);

router.get('/', function(req,res,next){
	 res.json('Thanks');   
})

module.exports = router;