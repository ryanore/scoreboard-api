var io = require('../../../socket').io

var Score = module.exports = function(roomId, s) {
  this.roomId = roomId;
  this.score = s || {};
};

/**
 * Class Methods
 */

Score.prototype.set = function(s) {
  this.score = s;
  io.sockets.in(this.roomId).emit("score_updated", this.score);
};

Score.prototype.get = function() {
  return this.score;
};
