var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;


var GameSchema   = new Schema({
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  description: String,
  title: { 
    type: String, 
    required: true, 
    min: 5, 
    max: 30, 
    trim: true 
  },  
  teams: [],
  score: {},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


GameSchema.pre('save', function(next){
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});


// Export the schema and the model in case we need to reference separately
module.exports = {
  schema: GameSchema,
  model: mongoose.model('Game', GameSchema)
};
