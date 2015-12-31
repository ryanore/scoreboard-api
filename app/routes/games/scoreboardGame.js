var io = require('../../socket').io;

var Scoreboard = function(){
  this.games = {};
  io.on('connection',  (connection) => {
		this.socket = connection;
		this.initSocket();
  });
};


Scoreboard.prototype = {
	
	/**
	 * When clients connect
	 * @return {[type]} [description]
	 */
	initSocket: function() {
		this.socket.on('join_game', this.onJoinGame.bind(this));
		this.socket.on('update_score', this.onUpdateScore.bind(this));
		this.socket.on('disconnect', this.onDisconnect.bind(this));
	},

	/**
	 * User joins game, 
	 * if it's not already going, 
	 * create one in memory using the Backbone model.
	 */
	onJoinGame: function(model) {
		var id = model._id;
		if( !this.games[id]){
			this.games[id] = model;
		}
 		this.socket.join(id);
		io.sockets.in(this.socket.id).emit("joined_game", this.games[id]); 
	},

	/**
	 * Score changed!
	 * Expect the whole score object, Update the whole thing
	 * Keep local object in memory updated,  Save record when last socket exits.
	 * Broadcast the new score
	 */
	onUpdateScore: function(data) {
		this.games[data.game_id].score = data.score;
		io.sockets.in(data.game_id).emit("score_updated", data.score); 
	},

	/**
	 * Client disconnected
	 * Find out which room he was in,  
	 * if his room is empty, save that room's data and clean it up
	 */
	onDisconnect: function(socket) {
		console.log(' socket disconnected  ', this.socket.id );
	}

};


module.exports = Scoreboard;

