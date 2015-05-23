var config = require('../../config');
var expressJwt = require('express-jwt');

module.exports = function(){
  expressJwt({ secret: config.auth.secret}).apply(this,arguments);
}
