var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config');

var SessionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  access_token: String
});

/**
 *  Allow autodestruct when createdAt has expired
 *  Expiry is in the app_config.js
 */
SessionSchema.index({
  createdAt: 1
}, {
  expireAfterSeconds: config.token_expire_seconds
});

// Export the schema and the model in case we need to reference separately
module.exports = {
  schema: SessionSchema,
  model: mongoose.model('Session', SessionSchema)
};
