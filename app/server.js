var express   = require('express'),
    config    = require('../config'),
    path      = require('path'),
    logger    = require('morgan'),
    bodyParser= require('body-parser'),
    socket    = require('./socket'),
    mongoose  = require('mongoose');

var app       = express(),
var routes    = require('./modules')(app);

/**
 *  Initialize Application 
 *  Once MongoDB has connected, this is called
 *  Set middleware and Listen for server
 */
var initApplication = function initApplication(){

  app.use(logger('dev'));

  app.use(bodyParser.json());

  app.all('/api/v1/*', [require('./middleware/validateRequest')]);

  app.all('/*', [require('./middleware/cors')]);

  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  app.set('port', process.env.PORT || 3000);
  var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
  });

  socket.init(server);
};


/* MONGODB */
var initDB = function initDB(){
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', initApplication );
}();

module.exports = app;
