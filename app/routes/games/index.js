var games = require('./gamesController');
var express = require('express');
var router = express.Router();
var ejwt = require('../../middleware/jwt');


router.get('/games/', games.list.bind(games));

router.get('/games/:id', games.getOne.bind(games));

router.post('/games/', ejwt, games.create.bind(games));

router.put('/games/:id', ejwt, games.update.bind(games));

router.delete('/games/:id',  ejwt, games.delete.bind(games));

router.post('/games/batch', ejwt, games.deleteSome.bind(games));

module.exports = router;
