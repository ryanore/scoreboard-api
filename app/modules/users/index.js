var express = require('express');
var router = express.Router();
var user = require('./users.js');

router.get('/api/v1/admin/users', user.getAll);

router.get('/api/v1/admin/user/:id', user.getOne);

router.post('/api/v1/admin/user/', user.create);

router.put('/api/v1/admin/user/:id', user.update);

router.delete('/api/v1/admin/user/:id', user.delete);

router.get('/', function(req,res,next){
	 res.json('Thanks');   
})

module.exports = router;