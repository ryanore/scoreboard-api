var io = require('../../socket').io;
var events = require('../../base/events');

/**
 * Game Client - the user who connected.
 * Keeps track of it's own score, but updates the game model in memory
 * When it disconnects from the socket, it fires an event for the Scoreboard to handle 
 */
var GameClient = function(socket, model){
	this.model = model;
 	this.socket = socket;
	this.socket.join(model._id);
 	this.initSocket();
};

GameClient.prototype = {
	/**
	 * Listen for events and tell client that they are connected.
	 */
	initSocket: function() {
		this.socket.on('update_score', this.onUpdateScore.bind(this));
		this.socket.on('disconnect', this.onDisconnect.bind(this));
		io.to(this.socket.id).emit("joined_game", this.model.score); 
	},

	/**
	 * Score update from client
	 * Emit to all in room
	 */
	onUpdateScore: function(data) {
		this.model.score = data.score;
		io.sockets.in(this.model._id).emit("score_updated", this.model.score); 
	},

	/**
	 * Client has disconnected - emit internal event
	 */
	onDisconnect: function(socket) {
		this.socket.leave(this.model._id);
		this.socket.removeAllListeners("news");
  	events.emit('client_disconnect', {
  		gameId: this.model._id, 
  		socketId: this.socket.id
  	});
	}
};


module.exports = GameClient;

