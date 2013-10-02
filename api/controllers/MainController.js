/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling user account requests. This includes account
 * creation and logins, as well as verification and logging out.
 */

var MainController = {

	index: function (req, res) {
		res.view({user: req.session.user, url: '/'});
	},

	signup: function (req, res) {
		var username = req.param('username');
		var password = req.param('password');
		var name = req.param('firstName') + req.param('lastName');
		var code = req.param('code');

		if(!code || code != 'eightween9tse7en'){
			res.send('500', 'wrong pass code');
		}

		/**
		 * Check the DB to see if the username already exists, if not: hash their password and create them
		*/
		Users.findByUsername(username).done(function(err,user) {
			if (err){
				res.send('500', {error: "DB error"});
			} else if (user.length > 0) {
				res.send('400', {error: "User exists!"});
			} else {
				Users.create({username: username, password: password, name: name}).done(function(error,user){
					if (error) {
						req.send('500', {error: "error creating username,sorry"});
					} else {
						req.session.user = user;
						res.send('200',"success");
					}
				});
			}
		});
	},

	login: function (req, res) {
		var username = req.param('username');
		var password = req.param('password');

		Users.findByUsername(username).done(function(err, usr) {
			if (err) {
				res.send(500,{error: 'DB error'});
			} else if (usr.length > 0) {
				var usr = usr[0];

				if (!usr.verified) {
					res.send(400,{error: 'user not yet verified'});
				}
				var hasher = require('password-hash');
				if (hasher.verify(password, usr.password)) {
					req.session.user = usr;
					res.send(200,usr);
				} else {
					res.send(400,{error: 'Incorrect password'});
				}

			} else {
				res.send(404,{error: 'User not found'});
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
				res.view({user: user[0], url: ''});
			}
		});
	}

};

module.exports = MainController;
