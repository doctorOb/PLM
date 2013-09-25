/**
 * Guests
 *
 * @module      :: Model
 * @description :: This model represents a guest. Their names are concatenated and lowercased in order 
 * to simplify comparison. This falls short when a guest is one letter differnt then another.
 * 
 *
 */

 /**
  * deriveNames takes an input guest name, provided by the client, and attempts to derive a 
  * first, and last name. It then uses a simple regex to remove all spaces and lowerCase all 
  * the characters so a name like JohnSmith and john smith are considred equal when compared.
 **/
function deriveNames(values){
	var last = values.name.split(' ');
	last = last[last.length -1];
	values.lastName = last[0].toUpperCase() + last.substr(1);
	values.firstName = values.name.substring(0,values.name.indexOf(' '))
	values.compareableName = values.name.replace(/[\s\-\']/g,'').toLowerCase();
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
		isSimilar: function(){
			
		}
	},
  	beforeCreate: function(values,next){
  		/* pull the last name from the guest name, and store it for sorting */
  		deriveNames(values);
  		next();
  	},
  	beforeUpdate: function(values,next){
  		/* the same as with create */
  		deriveNames(values);
  		next();
  	}
};
