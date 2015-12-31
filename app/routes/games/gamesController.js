var Game = require('../../models/gameModel').model;
var BaseController = require('../../base/baseController');
var nodeUtil = require('util');
var socket = null;
var Scoreboard = require('./scoreboardGame');
/**
 *  Games Controller 
 *  @extends {BaseController}
 *  Inherits basic CRUD stuff.
 */
var GamesController = function(model, name){
  BaseController.apply(this, arguments);
	this.games = new Scoreboard();
};
nodeUtil.inherits(GamesController, BaseController);

module.exports = new GamesController(Game, "GamesController");

