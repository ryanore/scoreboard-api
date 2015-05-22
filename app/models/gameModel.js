var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator');


var GameSchema   = new Schema({
  title: String,
  owner: String,
  teams: Array,
  createdAt: { type: Date, default: Date.now }
});


// Export the schema and the model in case we need to reference separately
module.exports = {
  schema: GameSchema,
  model: mongoose.model('Game', GameSchema)
};
