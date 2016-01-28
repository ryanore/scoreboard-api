var io = require('../../../socket').io,
  nodeUtil = require('util');

/**
 * GameClock Class
 */
var GameClock = module.exports = function(roomId, time, duration, granularity) {
  console.log('DURATION ', duration);
  this.roomId = roomId;
  this.originalDuration = duration;
  this.duration = this.curTime = time || duration;
  this.running = false;
  // this.granularity = granularity || 100;
  this.granularity = 100;
  this.timeout = null;
};


GameClock.prototype.tic = function() {
  io.sockets.in(this.roomId).emit("tic", this.curTime);
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
  io.sockets.in(this.roomId).emit("state", 'paused');
};


GameClock.prototype.reset = function() {
  this.running = false;
  this.curTime = this.duration = this.originalDuration;
  this.tic();
  io.sockets.in(this.roomId).emit("state", 'reset');  
};

/**
 * Start The timer running
 * 
 */
GameClock.prototype.start = function() {
  if (this.running) {
    return false;
  }

  var start = Date.now(),
    diff,
    obj,
    timer;

  clearTimeout(this.timeout);

  this.running = true;

  io.sockets.in(this.roomId).emit("state", 'playing');


  (timer = () => {
    if (!this.running) {
      return false;
    }
    
    this.curTime = this.duration - (((Date.now() - start)) | 0);
    
    if (this.curTime > 0) {
      this.timeout = setTimeout(timer, this.granularity);
    }
    
    console.log('this.curTime = ', this.curTime);
    
    if( this.curTime <= 0 ){
      this.running = false;
    }
    this.tic();
  })();
};
