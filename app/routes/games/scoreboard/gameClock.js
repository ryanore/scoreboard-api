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
  this.granularity = 100;
  this.timeout = null;
};


GameClock.prototype.tic = function() {
  io.sockets.in(this.roomId).emit("tic", this.curTime);
};

GameClock.prototype.sendState = function(st) {
  io.sockets.in(this.roomId).emit("state", st);
};


GameClock.prototype.getTime = function() {
  return this.curTime;
};


GameClock.prototype.setTime = function(ms) {
  this.curTime = this.duration = ms;
  this.tic();
};


GameClock.prototype.stop = function() {
  this.running = false;
  this.duration = this.curTime;
  this.sendState('paused');
};


GameClock.prototype.reset = function() {
  this.running = false;
  this.curTime = this.duration = this.originalDuration;
  this.tic();
  this.sendState('reset');
};

/**
 * Start The timer running
 * 
 */
GameClock.prototype.start = function() {

  var start = Date.now(),
    diff,
    obj,
    timer;

  if (this.running) {
    return false;
  }

  clearTimeout(this.timeout);

  this.running = true;

  this.sendState('playing');

  (timer = () => {
    if (!this.running) {
      return false;
    }
    
    this.curTime = this.duration - (((Date.now() - start)) | 0);
    
    if (this.curTime > 0) {
      this.timeout = setTimeout(timer, 100);
    }
    
    if( this.curTime <= 0 ){
      this.running = false;
    }
    this.tic();
  })();
};
