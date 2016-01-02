var io = require('../../socket').io;
var events = require('../../base/events');

var GameClock = function(socket){
 	this.socket = socket;
};

module.exports = GameClock;

