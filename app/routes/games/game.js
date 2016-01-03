var io = require('../../socket').io;
var events = require('../../base/events');
var GameModel = require('../../models/gameModel').model;
var Client = require('./client');
var Score = require('./score');

var Game = function(id, cb){
	this.roomId = id;
 	this.clients = {};
 	
 	events.on('client_disconnect', this.onClientLeave.bind(this));
	
	GameModel.findById(id, (err,doc) => {
		Score.set( doc.score );
		cb(this);
	});
};


Game.prototype = {
	addClient: function(socket) {
		this.clients[socket.id] = new Client(this.roomId, socket);
	},

	onClientLeave: function(socketId) {
		if(this.clients[socketId]){
			delete this.clients[socketId];	
		}
		if( Object.keys(this.clients).length === 0 ){
			GameModel.saveScore(this.roomId, Score.get(), () => {
				events.removeAllListeners();
				events.emit('room_empty', this.roomId);
			});
		}
	}
}

module.exports = Game;
