var games = require('./gamesController');
var express = require('express');
var router = express.Router();

router.get('/api/v1/games', games.getAll);

router.get('/api/v1/game/:id', games.getOne);

router.post('/api/v1/game/', games.create);

router.put('/api/v1/game/:id', games.update);

router.delete('/api/v1/game/:id', games.delete);

module.exports = router;