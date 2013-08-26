/**
 * SigninController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var SigninController = {

	login: function (req, res) {
		var username = req.param('username');
		var password = req.param('password');

		Users.findByUsername(username).done(function(err, usr) {
			if (err) {
				res.send(500,{error: 'DB error'});
			} else if (usr.length > 0) {
				var usr = usr[0];
				var hasher = require('password-hash');
				if (hasher.verify(password, usr.password)) {
					req.session.user = usr;
					res.send(usr);
				} else if (usr.username == username) {
					res.send(400,{error: 'weird database '});
				} else {
					res.send(400,{error: 'Incorrect password', usr: usr});
				}

			} else {
				res.send(404,{error: 'User not found'});
			}
		});
	}
  

};

module.exports = SigninController;
