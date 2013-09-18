module.exports = function(req,res,next) {
	compareableName = req.param('name').replace(/ /g,'').toLowerCase();

	Guests.findOneByCompareableName(compareableName).done(function(err, guest){
		if (guest != null) {
			console.log(guest.compareableName);
			res.send(400, 'duplicate user');
		} else {
			console.log(compareableName);
			next();
		}
	});

};