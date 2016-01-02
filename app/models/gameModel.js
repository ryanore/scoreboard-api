var mongoose  = require('mongoose'),
		redis = require('redis').createClient(),
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
		

/**
 * Fetch the a game record, but add a clients object just for internal memory
 */
GameSchema.statics.getActiveGame = function (id, cb) {
  return this.findById(id, (err, doc) => {
  	if (doc) {
  		var d = doc.toJSON();
  		d.clients = {};
      cb(err, d);
    }		    	
	});
}

/**
 * Just save the score of the game,  convenience
 */
GameSchema.statics.saveScore = function(game, cb){
	return this.findById(game._id, function (err, doc) {
	  if (doc) {
	    doc.score = game.score;
	    doc.save( (err) =>{
	      if(err) console.log('ERROR SAVING SCORE');
	      var d = doc.toJSON();
	      cb(err, d);
	    });
	  }
	});  
};

/**
 * Before Save Game: update the createdAt and updatedAt 
 */
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
