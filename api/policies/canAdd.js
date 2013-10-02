/**
  * This policy hooks into 
  *
*/

module.exports = function(req,res,next) {
	var guyCount = 0, girlCount = 0;
	Guests.findByAddedBy(req.session.user.username).done(function(err,guestsAddedByUser){
		console.log(guestsAddedByUser.length)
		if (guestsAddedByUser.length <= 2) {
			next();
		} else {
			return res.send(400,'to many guests, the max is 3');
		}
		/*
		for(var i = 0 ; i < guestsAddedByUser.length; i++){
			guestsAddedByUser[i].gender == 'M' ? guyCount++ : girlCount++;
		}
		Configs.findByOrganization('SigmaPiGammaIota').done(function(err,conf){
			console.log(conf);
			if (conf.length == 0 || err) {
				return next(); //no configs to check, pass on
			}
			conf = conf[0];
			var ratio = conf.minimumGirlRatio;
			if (ratio > 0) {
				var allowable = Math.floor(girlCount / ratio);
				if (guyCount < allowable) {
					next();
				} else {
					return res.send(400, 'must have a girl:guy ratio of ' + ratio + ':1');
				}
			}
			else {
				next();
			}
		});
*/
	});

};