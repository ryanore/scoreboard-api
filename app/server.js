var express = require('express'),
    config = require('../config'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose    = require('mongoose');


var initApplication = function initApplication(){

  // Middleware
  app.use(logger('dev'));
  app.use(bodyParser.json());
  
  // Validation/Verification
  app.all('/*', [require('./middleware/cors')]);
  // app.all('/api/v1/*', [require('./middleware/validateRequest')]);

  // Routes
  app.use('/', require('./routes'));
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });
  
  // Start the server
  app.set('port', process.env.PORT || 3000);
  var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
  });
};


/* MONGODB */
var initDB = function initDB(){
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', initApplication );
}();

module.exports = app;
