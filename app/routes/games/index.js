var games = require('./gamesController');
var express = require('express');
var router = express.Router();
var ejwt = require('express-jwt');


router.get('/api/v1/games', games.list.bind(games));

router.get('/api/v1/game/:id', games.getOne.bind(games));

router.post('/api/v1/game/', ejwt, games.create.bind(games));

router.put('/api/v1/game/:id', ejwt, games.update.bind(games));

router.delete('/api/v1/game/:id',  ejwt, games.delete.bind(games));

module.exports = router;