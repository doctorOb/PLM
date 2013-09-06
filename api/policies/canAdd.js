module.exports = function(req,res,next) {
<<<<<<< HEAD
	console.log(res);
	res.send(500,'no');
=======

	var isDuplicate = false;
	Guests.findOneByName(req.param('name')).done(function(err, guest){
		if (guest != null) {
			res.send(400, 'duplicate user');
			isDuplicate = true;
		}
	});

	if (isDuplicate) return;
	
>>>>>>> e574baed8ea53285162ee491e30cc116e458ce5b
	if (req.param('gender') == 'F') {
		next();
	} else {
		var guyCount = 0, girlCount = 0;
		Guests.findByAddedBy(req.session.user.username).done(function(err,guestsAddedByUser){
			for(var i = 0 ; i < guestsAddedByUser.length; i++){
				guestsAddedByUser[i].gender == 'M' ? guyCount++ : girlCount++;
			}
		});

		Configs.findByOrganization('SigmaPiGammaIota').done(function(err,conf){
			conf = conf[0];
			if (err) {
				next(); //no configs to check, pass on
			}
			var ratio = conf.minimumGirlRatio;
			if (ratio > 0) {
				var allowable = Math.floor(girlCount / ratio);
				if (guyCount < allowable) {
					next();
				} else {
					res.send(400, 'must have a girl:guy ratio of ' + ratio + ':1');
				}
			}
			else {
				next();
			}
		});
	}

};