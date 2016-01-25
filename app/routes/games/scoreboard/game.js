var io = require('../../../socket').io,
  nodeUtil = require('util'),
  EventEmitter = require('events').EventEmitter,
  GameModel = require('../../../models/gameModel').model,
  Client = require('./client'),
  Score = require('./score'),
  GameClock = require('./gameClock');

/**
 * Game has: Score, Clients and Clock
 * Initialize with the MongoDB Document
 */
var Game = module.exports = function(doc) {
  this.clients = {};
  this.roomId = doc._id;
  this.gameClock = new GameClock(this.roomId, doc.time, doc.duration);
  this.score = new Score(this.roomId, doc.score);
};


/**
 * Interit from `EventEmitter.prototype`.
 */
nodeUtil.inherits(Game, EventEmitter);


/**
 * Add a client to the collection and listen for it's disconnect
 */
Game.prototype.addClient = function(socket) {
  var client = new Client(this.roomId, socket, this.score, this.gameClock);
  client.on('client_disconnect', this.onClientLeave.bind(this));
  this.clients[socket.id] = client;
  return this;
},


/**
 * Client left, clean up and remove it from collection
 */
Game.prototype.onClientLeave = function(socketId) {
  if (this.clients[socketId]) {
    this.clients[socketId].removeAllListeners();
    delete this.clients[socketId];
  }
  if (Object.keys(this.clients).length === 0) {
    var data = {
      score: this.score.get(),
      time: this.gameClock.getTime()
    };

    this.gameClock.stop();
    this.gameClock = null;
    this.score = null;

    GameModel.saveScore(this.roomId, data, () => {
      this.emit('room_empty', this.roomId);
    });
  }
};
