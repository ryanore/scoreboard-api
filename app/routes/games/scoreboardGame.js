var io = require('../../socket').io;
var GameClient = require('./game');

var Scoreboard = function(){
  this.games = {};
  io.on('connection',  (connection) => {
		this.socket = connection;
		this.initSocket();
  });
};

Scoreboard.prototype = {
	initSocket: function() {
		this.socket.on('join_game', this.onJoinGame.bind(this));
	},

	onJoinGame: function(model) {
		var id = model._id;
		if( !this.games[id] ){
			this.games[id] = [ ];
		}
		this.games[id].push(new GameClient(id, this.socket, model));
	}

};


module.exports = Scoreboard;

