/**
 * Guests
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */
function deriveNames(values){
	var last = values.name.split(' ');
	last = last[last.length -1];
	values.lastName = last[0].toUpperCase() + last.substr(1);
	values.firstName = values.name.replace(values.lastName,'').trim();
	values.compareableName = values.name.replace(/ /,'').toLowerCase();
}

module.exports = {

	attributes: {
		guestID: 'INT',
		name: 'STRING',
		compareableName: 'STRING',
		lastName: 'STRING',
		firstName: 'STRING',
		dateOfBirth: 'STRING',
		cardID: 'STRING',
		gender: 'STRING',
		addedBy: 'STRING',
	},
  	beforeCreate: function(values,next){
  		/* pull the last name from the guest name, and store it for sorting by*/
  		deriveNames(values);
  		next();
  	},

  	beforeUpdate: function(values,next){
  		deriveNames(values);
  		Guests.findOneByCompareableName(values.compareReqName).done(function(err, guest){
			if (guest != null) {
				res.send(400, 'duplicate user');
				isDuplicate = true;
			} else {
				next();
			}
		});


  	}
};
