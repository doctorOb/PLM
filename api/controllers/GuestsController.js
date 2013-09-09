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
  }
  
};

module.exports = GuestsController;