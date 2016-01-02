var io = require('../../socket').io;
var events = require('../../base/events');
var Client = require('./client');
var Clock = require('./game-clock');
var Game = require('../../models/gameModel').model;


var Scoreboard = function(){
	this.games = {};

  events.on('client_disconnect', this.onClientLeave.bind(this));

  io.on('connection',  (connection) => {
		this.socket = connection;
		this.socket.on('join_game', this.onClientJoin.bind(this));
  });
};


Scoreboard.prototype = {

	/**
	 * Client Connected to socket,  create a new Client to handle its own business
	 * @param  {String} gameId Cooresponds to mongoDb id
	 */
	onClientJoin: function(gameId) {
		this.getGame(gameId, (game) => {
			var client = new Client(this.socket, game);
			game.clients[this.socket.id] = client;
		});
	},


	/**
	 * Client Disconnected, remove from list of active clients,
	 * If it was the last one in the room, remove the room
	 */
	onClientLeave: function(data) {
		var game = this.games[data.gameId];

		if( game ){
			delete game.clients[data.socketId];

			if( Object.keys(game.clients).length === 0 ){

				Game.saveScore(game, (err, doc) =>{

					delete game;
					if( err ){
						console.log(err);
					}
				});
			}
		}
	},


	/**
	 * Get Game Model -
	 * If it's already in memory use that, otherwise grab record from DB and add to active games
	 */
	getGame: function(id, next){
		if(this.games[id]){
			next(this.games[id]);
		}
		else {
			Game.getActiveGame(id, (err,doc) => {
				this.games[id] = doc;
		 		next(doc);
			});
		}
	}

};

module.exports = Scoreboard;