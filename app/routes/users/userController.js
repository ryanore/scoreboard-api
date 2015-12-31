var User = require('../../models/userModel').model;
var BaseController = require('../../base/baseController');
var nodeUtil = require('util');
var nodmailer = require('nodemailer');
var config = require('../../config');
var randomPass = require('../../utils/random');

/**
 *  Users Controller 
 *  @extends {BaseController}
 */
var UsersController = function(model, name) {
	BaseController.apply(this, arguments);
};

nodeUtil.inherits(UsersController, BaseController);




UsersController.prototype.forgotpassword = function(req, res) {
	var un = req.body.username;
	var newPass = randomPass(7);
	
	var query = {
		username: un
	};
	
	var update = {
		password: newPass
	};

	User.findOne(query, {}, function(err, usr) {
		console.log('err,usr ', err,usr);
		if (err) {
			res.json({
				status: 1,
				error: err
			}, 403);
		}
		if (usr) {
			usr.password = newPass;

			usr.save(function(err, u) {

				if (err || !usr) {
					return res.send(err);
				}

				var msg = 'For username: ' + usr.username + ' -- your new password is: ' + newPass + '.  \n\rYou can use this to log in, and after that you can change your password in your user profile page';

				config.transport.sendMail({
						from: config.email.from,
						to: usr.email,
						subject: 'Scoreboard! password reset',
						text: msg
					},
					function(err, info) {
						if (err) {
							res.json(err);
						}
						if (info) {
							res.json(info);
						}
					});

			});
		}
	});
};


UsersController.prototype.changepassword = function(req, res) {
	var un = req.body.username;
	var query = {
		username: un,
		password: req.body.password
	};

	User.findOne({
		username: req.body.username
	}, function(err, usr) {
		if (err || !usr) {
			return res.status(401).end();
		}

		// validate un/password, then create access_token
		usr.comparePassword(req.body.password, function(err, isMatch) {
			if (err) {
				return res.status(401).end();
			}

			if (usr) {
				usr.password = req.body.newPassword;
				usr.save(function(err, u) {

					if (err) {
						console.log('ERROR SAVING');
						msg = "There was an error saving your password";
						return res.status(401).json(msg);
					}

					var msg = 'For username: ' + usr.username + ' \nYou have changed your password.  If this seems like a mistake then let us know. \n\nhugs.\nPEs';

					config.transport.sendMail({
					    from: config.email.from,
					    to: usr.email,
					    subject: 'Scoreboard! password changed',
					    text: msg
						},
						function(err, info){
							if( err ){
								console.log('MSG not sent  ', msg);
								res.json(err);
							}
							if(info){
								res.json(info);
							}
					});
				});
			}
		});
	});
};



module.exports = new UsersController(User, "UsersController");
