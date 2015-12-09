var config = require('../config');

module.exports = function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", config.whitelist);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
  	res.header('Access-Control-Allow-Headers', 'Authorization, Content-type');
    res.status(200).end();
  } else {
    next();
  }
};