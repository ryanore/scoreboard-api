var io = require('../../socket').io;
var events = require('../../base/events');
var score = require('./score');
/**
 * Game Client - the user who connected.
 * When it disconnects from the socket, it fires an event for the Scoreboard to handle 
 */
var Client = function(roomId, socket){
 	this.roomId = roomId;
 	this.socket = socket;
	this.socket.join(roomId);
	this.socket.on('disconnect', this.onDisconnect.bind(this));
	this.socket.on('leave_game', this.onDisconnect.bind(this));
	this.socket.on('update_score', this.onUpdateScore.bind(this));
	io.to(socket.id).emit("joined_game", score.get()); 
};


Client.prototype = {
	/**
	 * Client has disconnected - emit internal event
	 */
	onDisconnect: function(socket) {
		this.socket.leave(this.roomId);
		this.socket.removeAllListeners("disconnect");
  	events.emit('client_disconnect', this.socket.id);
	},

	onUpdateScore: function(data) {
		score.set(data.score);
		io.sockets.in(this.roomId).emit("score_updated", score.get()); 
	}
};


module.exports = Client;

