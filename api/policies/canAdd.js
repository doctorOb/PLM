module.exports = function(req,res,next) {
	console.log(res);
	res.send(500,'no');
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
			var minGirls = conf.minimumGirlRatio;
			if (minGirls > 0) {
				var allowable = Math.floor(girlCount / minGirls);
				if (guyCount < allowable) {
					next();
				}
			}
		});
	}
};