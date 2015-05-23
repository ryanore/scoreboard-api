var games = require('./gamesController');
var express = require('express');
var router = express.Router();
var tokenCheck = require('../../middleware/validateRequest');

router.get('/api/v1/games', games.list.bind(games));

router.get('/api/v1/game/:id', games.getOne.bind(games));

router.post('/api/v1/game/', tokenCheck, games.create.bind(games));

router.put('/api/v1/game/:id', tokenCheck, games.update.bind(games));

router.delete('/api/v1/game/:id',  tokenCheck, games.delete.bind(games));

module.exports = router;