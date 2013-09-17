/**
 * ConfigsController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var ConfigsController = {

	index: function (req, res) {
		if (!req.session.user){
			res.redirect('/');
		} else {
			Configs.findById(1).done(function(err,conf){
				conf = conf[0];
				if (req.session.user.username == conf.adminUsername) {
	  				res.view({conf: conf});
	  			} else {
	  				res.redirect('/');
	 	 		}
	 	 	});
		}
	},

	update: function(req,res) {

		var organization = req.param('organization');
		var adminUsername = req.param('adminUsername');
		var minimumGirlRatio = req.param('minimumGirlRatio');

		Configs.findById(1).done(function(err,conf){
			conf = conf[0];
			conf.organization = organization;
			conf.adminUsername = adminUsername;
			conf.minimumGirlRatio = minimumGirlRatio;

			conf.save(function (err) {
       			if (err) return res.send(err,500);
        		res.json(conf);
      		});
	 	 });
	}  

};

module.exports = ConfigsController;