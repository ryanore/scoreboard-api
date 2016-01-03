var Score = function() {
	var score = {
		'hey': 'hi'
	};
	return {
		set: function(s) {
			score = s;
		},
		get: function() {
			return score;
		}
	}
};

module.exports = new Score();
