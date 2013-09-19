/**
 * GuestsController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var GuestsController = {


  list: function(req, res) {
  	if(req.session.user) {
  		res.view({user: req.session.user, username: req.session.user.username, url: '/list'});
  	} else {
  		res.redirect('/');
  	}
  },

  print: function(req,res) {
  	var guys, girls;
    console.log(req.session.user);
  	Guests.find({
  		gender: 'F'
  	}).sort('lastName ASC').done(function(err,guests){
  		if(err){
  			return res.send(500,'error indexing girls table');
  		} else {
  			girls = guests;
  			console.log(girls);
        Guests.find({
          gender: 'M'
        }).sort('lastName ASC').done(function(err,guests){
          if(err){
            return res.send(500,'error indexing guys table');
          } else {
            guys = guests;
            console.log(guys);
            res.view({user: null, guysList: guys, girlsList: girls, url: '/print'});
          }
        });
  		}
  	});

  },

  export: function(req,res) {
    var fileName = req.param('gender') == 'M' ? 'guys.xls' : 'girls.xls';
    Guests.find({
      gender : req.param('gender')
    }).sort('lastName ASC').done(function(err,guests){
      if(err){
        return res.send(400,'something happened gettting all guests');
      }
      res.setHeader('Content-type','application/vnd.ms-excel');
      res.setHeader('Content-disposition','attachment');
      res.setHeader('filename',fileName);
      res.writeHeader(200);

      res.write("Name\t\n");
      for(var i = 0; i < guests.length; i++) {
        res.write(guests[i].lastName + ', ' + guests[i].firstName + '\t\n');
      }
      res.end();
    });
  }
  
};

module.exports = GuestsController;