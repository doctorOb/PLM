module.exports = function(req,res,next) {

	var guyCount = 0, girlCount = 0;
	Guests.findByAddedBy(req.session.user.username).done(function(err,guestsAddedByUser){
		for(var i = 0 ; i < guestsAddedByUser.length; i++){
			guestsAddedByUser[i].gender == 'M' ? guyCount++ : girlCount++;
			if (guestsAddedByUser[i].id == req.param('id') && guestsAddedByUser[i].gender == 'M') {
				return next();
			}	
		}

		Configs.findByOrganization('SigmaPiGammaIota').done(function(err,conf){
			if (err || conf.length == 0) {
				return next(); //no configs to check, pass on
			}
			conf = conf[0]
			var ratio = conf.minimumGirlRatio;
			if (ratio > 0) {
				var allowable = Math.ceil(guyCount * ratio);
				if (girlCount > allowable) {
					next();
				} else {
					return res.send(400, 'must have a girl:guy ratio of ' + ratio + ':1');
				}
			}
			else {
				return next();
			}
		});
	});

};