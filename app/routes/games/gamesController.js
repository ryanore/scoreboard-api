var Game = require('../../models/gameModel').model;
var BaseController = require('../../base/baseController');
var nodeUtil = require('util');
/**
 *  Games Controller 
 *  @extends {BaseController}
 */
var GamesController = function(model, name){
  BaseController.apply(this, arguments);
};

nodeUtil.inherits(GamesController, BaseController);

module.exports = new GamesController(Game, "GamesController");
