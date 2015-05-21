var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var games = require('./games.js');
var user = require('./users.js');
/*
* Routes that can be accessed by any one
*/
router.post('/login', auth.login);
/*
* Routes that can be accessed only by autheticated users
*/
router.get('/api/v1/games', games.getAll);
router.get('/api/v1/game/:id', games.getOne);
router.post('/api/v1/game/', games.create);
router.put('/api/v1/game/:id', games.update);
router.delete('/api/v1/game/:id', games.delete);
/*
* Routes that can be accessed only by authenticated & authorized users
*/
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

router.get('/', function(req,res,next){
	 res.json('Thanks');
   
})
module.exports = router;