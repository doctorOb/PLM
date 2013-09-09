/**
 * Configs
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
  	organization: 'STRING',
 	allowDuplicates: {
 		type: 'BOOLEAN', //allow guests to be added multiple times
 		defaultsTo : false
 	},
 	adminUsername: 'STRING', //name of the user acting as admin
 	minimumGirlRatio: 'INT', //the minimum amount of girls that must be added to allow a male guest to be added
  }

};
