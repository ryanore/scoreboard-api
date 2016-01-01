var io = require('../../socket').io;

var GameClient = function(id, socket, model){
  this.id = id;
 	this.socket = socket;
 	this.score = {};
	this.socket.join(model._id);
 	this.initSocket();
	io.sockets.in(this.socket.id).emit("joined_game", model); 
};

GameClient.prototype = {
	initSocket: function() {
		this.socket.on('update_score', this.onUpdateScore.bind(this));
		this.socket.on('disconnect', this.onDisconnect.bind(this));
	},

	onUpdateScore: function(data) {
		if( data.game_id === this.id ){
			this.score = data.score;
			io.sockets.in(this.id).emit("score_updated", this.score); 
		}
	},

	onDisconnect: function(socket) {
  
	}
};


module.exports = GameClient;

