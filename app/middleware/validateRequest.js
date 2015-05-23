var config = require ('../../config/auth');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

/**
 *  Verify token
 *  First strip out the 'Bearer ' prefix in order to validate contents of access_token
 */
module.exports = function(req, res) {
  var token = null;
  var parts = req.headers.authorization.split(' ');

  if (parts.length == 2) {
    
    var scheme = parts[0];
    var credentials = parts[1];
    
    if (/^Bearer$/i.test(scheme)) {
      token = credentials;
      
      jwt.verify(token, config.secret, function(err, decoded){
        if(err){
          return res.status(401).send(err);
        } 
      });
    } 
  } 
  else{
    console.log("No Valid authorization header...(Bearer) while verifying access_token");
    return res.status(401).send(err);
  }
};
