/**
 * GuestsController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var GuestsController = {


  list: function(req, res) {
  	if(req.session.user) {
  		res.view({username: req.session.user.username});
  	} else {
  		res.redirect('/');
  	}
<<<<<<< HEAD
  },

  print: function(req,res) {
  	var guys, girls;
  	Guests.find({
  		gender: 'M'
  	}).sort('lastName ASC').done(function(err,guests){
  		if(err){
  			return console.log(err);
  		} else {
  			guys = guests;
  			console.log(guys);
  		}
  	});

  	Guests.find({
  		gender: 'F'
  	}).sort('lastName ASC').done(function(err,guests){
  		if(err){
  			return console.log(err);
  		} else {
  			girls = guests;
  			console.log(girls);
  		}
  	});

  	res.view({guysList: guys, girlsList: girls});
=======
>>>>>>> a303ae3bf3d0d241d63ec28b5203a6d857cf3e9f
  }
  
};

module.exports = GuestsController;