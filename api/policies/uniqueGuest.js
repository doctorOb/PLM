module.exports = function(req,res,next) {
	compareableName = req.param('name').replace(/[\s\-\']/g,'').toLowerCase();

	Guests.findOneByCompareableName(compareableName).done(function(err, guest){
		if (guest != null) {
			res.send(400, 'duplicate user ' + compareableName + ' found in system');
		} else {
			next();
		}
	});
};