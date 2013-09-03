/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var MainController = {

	index: function (req, res) {
		res.view();
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
				console.log(password);
				Users.create({username: username, password: password, name: name}).done(function(error,user){
					if (error) {
						req.send('500', {error: "error creating username,sorry"});
					} else {
						req.session.user = user;
						res.redirect('/list');
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
	}

};

module.exports = MainController;
