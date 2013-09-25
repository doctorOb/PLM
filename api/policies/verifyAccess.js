/**
 * catch a user who is trying to add/update/delete a user under a different username
 * users who are admins are allowed to do whatever
**/

module.exports = function(req,res,next) {

	console.log(req.param());
	if (req.param('id')) {
		console.log(req.session.user.username);
		Guests.findOne(req.param('id')).done(function(err,guest){
			if (guest && guest[0]){
				console.log(guest[0]);
				if (req.session.user.username == guest[0].addedBy) {
					next();
				} else {
					res.send(400,{error: 'not permitted to access guest under differnt username'});
				}
			} else {
				console.log('found none')
				next();
			}
		});
	}

	if (req.session.user.isAdmin) {
		next();
	} else if (req.param('addedBy')) {

		if (req.param('addedBy') != req.session.user.username) {
			console.log('no added by param')
			res.send(400,{error: 'not permitted to add guest under differnt username'});
		} else {
			console.log('good to add');
			next();
		}
	}

};