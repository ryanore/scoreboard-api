var io = require('../../../socket').io,
  EventEmitter = require('events').EventEmitter,
  nodeUtil = require('util');

/**
 * Game Client - Interfaces with Connected client.
 * When it disconnects from the socket, it fires 
 * an event for the Scoreboard to remove it 
 */

var Client = module.exports = function(roomId, socket, score, clock) {
  this.roomId = roomId;
  this.socket = socket;
  this.score = score;
  this.clock = clock;
  this.socket.join(roomId);

  this.socket.on('disconnect', this.onDisconnect.bind(this));
  this.socket.on('leave_game', this.onDisconnect.bind(this));
  this.socket.on('update_score', this.onUpdateScore.bind(this));
  this.socket.on('clock_start', this.onStartClock.bind(this));
  this.socket.on('clock_stop', this.onStopClock.bind(this));
  this.socket.on('clock_reset', this.onResetClock.bind(this));
  io.to(socket.id).emit("joined_game", {
    score: score.get(),
    time: clock.getTime()
  });
};


/**
 * Interit from `EventEmitter.prototype`.
 */

nodeUtil.inherits(Client, EventEmitter);


/**
 * Class Methods
 */

Client.prototype.onUpdateScore = function(data) {
  this.score.set(data.score);
};


Client.prototype.onStartClock = function() {
  if (this.clock.running) return;

  this.clock.start();

  io.sockets.in(this.roomId).emit("state", 'playing');
};


Client.prototype.onStopClock = function() {
  if (!this.clock.running) return;
  this.clock.stop();
  io.sockets.in(this.roomId).emit("state", 'paused');
};


Client.prototype.onResetClock = function() {
  this.clock.reset();
  io.sockets.in(this.roomId).emit("state", 'reset');
};


Client.prototype.onDisconnect = function(socket) {
  this.socket.leave(this.roomId);
  // this.socket.removeAllListeners("disconnect");
  this.emit('client_disconnect', this.socket.id);
};


module.exports = Client;
