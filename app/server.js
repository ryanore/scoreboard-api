var express   = require('express'),
    path      = require('path'),
    bodyParser= require('body-parser'),
    mongoose  = require('mongoose'),
    sanitize 	= require('express-sanitized'),
    socket    = require('./socket'),
    config    = require('./config');

var app       = express();


/**
 *  Initialize Application 
 *  Once MongoDB has connected, this is called.
 *  Set middleware, Listen for server, init websocket
 *  If you don't need websocket  just comment this out it's init and it's require
 */
var initApplication = function initApplication(){
	var routes, server;
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(sanitize()); // this line follows express.bodyParser() 

  app.set('port', config.server.port);

  app.all('/*', [require('./middleware/cors')]);

  // init web socket then routes
  server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
    socket.init(server, function() {
		  routes = require('./routes')(app);    	
    });
  });

};


/* MONGODB */
var initDB = function initDB(){
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    require('./seed/user')();
    initApplication();
  });
}();

module.exports = app;
