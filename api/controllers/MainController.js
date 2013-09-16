/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var MainController = {

	index: function (req, res) {
		res.view({user: req.session.user});
	},
	signup: function (req, res) {
		var username = req.param('username');
		var password = req.param('password');
		var name = req.param('firstName') + req.param('lastName');

		Users.findByUsername(username).done(function(err,user) {
			if (err){
				res.send('500', {error: "DB error"});
			} else if (user.length > 0) {
				res.send('400', {error: "User exists!"});
			} else {
				var hasher = require('password-hash');
				password = hasher.generate(password);
				Users.create({username: username, password: password, name: name}).done(function(error,user){
					if (error) {
						req.send('500', {error: "error creating username,sorry"});
					} else {
						req.session.user = user;
						console.log(user);
						res.redirect('/verify');
					}
				});
			}
		});
	},

	signout: function(req,res) {
		if (req.session.user) {
			req.session.user = null;
		}
		res.redirect('/');
	},

	verify: function(req,res) {
		var key = req.param('token');
		Users.update({
			verifyToken: key,
		},{
			verified: true,
			verifyToken: ''
		},function(err,user){
			if(err){
				console.log(err);
			} else {
				res.view({user: user});
			}
		});
	}

};

module.exports = MainController;
