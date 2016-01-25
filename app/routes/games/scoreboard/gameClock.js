var io = require('../../../socket').io,
  nodeUtil = require('util');

/**
 * GameClock Class
 */
var GameClock = module.exports = function(roomId, time, duration, granularity) {
  this.roomId = roomId;
  this.originalDuration = duration;
  this.duration = this.curTime = time || duration;
  this.running = false;
  this.granularity = granularity || 1000;
  this.emit()
};

GameClock.prototype.emit = function() {
  io.sockets.in(this.roomId).emit("tic", this.curTime);
};

GameClock.prototype.getTime = function() {
  return this.curTime;
};

GameClock.prototype.setTime = function(ms) {
  this.curTime = this.duration = ms;
  this.emit();
};

GameClock.prototype.stop = function() {
  this.running = false;
  this.duration = this.curTime;
};

GameClock.prototype.reset = function() {
  this.running = false;
  this.curTime = this.duration = this.originalDuration;
  this.emit();
};

GameClock.prototype.start = function() {
  if (this.running) {
    return false;
  }

  this.running = true;

  var start = Date.now(),
    diff,
    obj,
    timer;

  (timer = () => {
    if (!this.running) {
      return false;
    }
    this.curTime = this.duration - (((Date.now() - start) / 1000) | 0);
    if (this.curTime > 0) {
      setTimeout(timer, this.granularity);
    }
    this.emit();
  })();
};
