/**
 * Guests
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

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
  		var last = values.name.split(' ');
  		last = last[last.length -1];
  		values.lastName = last[0].toUpperCase() + last.substr(1);
  		values.firstName = values.name.substr(0,values.name.indexOf(values.lastName) - 1)
  		values.compareableName = values.name.replace(/ /,'').toLowerCase();
  		console.log(values.compareableName);
  		next();
  	}
};
