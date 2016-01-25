var io = require('../../../socket').io;
var Clock = require('./gameClock');
var Game = require('./game');
var GameModel = require('../../../models/gameModel').model
var util = require('util');


/**
 * Scoreboard - main entrypoint
 * Keep track of active rooms. The room will keep track of its own sockets.
 */
var Scoreboard = module.exports = function() {
  this.games = {};

  io.on('connection', (connection) => {
    this.socket = connection;
    this.socket.on('join_game', this.onClientJoin.bind(this));
  });
};


/**
 * User Connects to Socket 
 * Create a new game and new Client
 * @param  {String} id mongoDb key
 */
Scoreboard.prototype.onClientJoin = function(id) {
  var game = this.getGame(id, (game) => {
    game.addClient(this.socket).on('room_empty', this.onEmptyRoom.bind(this));
  });
};


/**
 * All users have exited a game
 * - Delete the game from the hash so it will clean up
 * @param  {String} id mongoDb key
 */
Scoreboard.prototype.onEmptyRoom = function(id) {
  if (this.games[id]) {
    delete this.games[id];
  }
};


/**
 * Get active game or Start a new one
 * - grab it's document from mongodb
 * @param  {String} id mongoDb key
 */
Scoreboard.prototype.getGame = function(id, cb) {
  if (this.games[id]) {
    cb(this.games[id]);
  } else {
    GameModel.findById(id, (err, doc) => {
      if (doc) {
        this.games[id] = new Game(doc);
        cb(this.games[id]);
      } else {
        io.sockets.in(this.roomId).emit("game_not_found");
      }
    });
  }
};
