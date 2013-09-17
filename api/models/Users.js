/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

 /*
   		var hackeyAllowableBrothers = ["Anaya, Jerome"," Baker, Ryan"," Botaish, Christopher"," Calder, Michea",
  										" Chaulk, Adam"," Claretti, Ennio"," Coffey, Daniel"," Conte, Micheal ",
  										" Crivello, Matthew"," Curto, Joshua"," Derryberry, Michael"," Fano, Malcolm",
  										" Gonyea, Cody"," Greenbaum, Benjamin"," Howard, Adam"," Jung, Bryan"," Kepka Calvetti, 
  										Nicholas"," Miner, Elias"," Parmanand, Archit"," Potter, John"," Purnell, Jason",
  										" Robertson, Daniel"," Romeo, Anthony"," Russell, Westley"," Scanlon, Alex",
  										" Sherrod, Ronald"," Signore, Jefferey"," Smith, Sean"," Sontag, Christopher",
  										" Starek, Peter"," Steeves, Matthew"," Thornhill, Ryan"," Toribio, Bryan",
  										" Turland, Alexander"," Vardaro, Mike"," Velez, Alex"];
*/
var nodemailer = require("nodemailer");

module.exports = {

	attributes: {
		userID: 'INT',
		username: 'STRING',
		firstName: 'STRING',
		lastName: 'STRING',
		password: 'STRING',
		verifyToken: 'STRING',
		verified: {
			type: 'BOOLEAN',
			defaultsTo: false
		}
	},
	beforeCreate: function(values, next){
		var smtpTransport = nodemailer.createTransport("SMTP",{
			service: "Gmail",
			auth: {
				user: "lss.plm.bot@gmail.com",
				pass: "1LikeBabbies"
			}
		});

		values.verifyToken = Math.random().toString(36).split('.')[1];
		var mailOptions = {
			from: "Sigma Pi Party List ✔ <lss-plm@gmail.com",
			to: values.username,
			subject: "Verify Your Email",
			html: "<a href='http://localhost:1337/verify?token=" + values.verifyToken + "'>Verify Account</a>"
		};

		smtpTransport.sendMail(mailOptions,function(error,response){
			if (error) {
				console.log(error);
			} else {
				console.log(response);
				next();
			}
		});
	}
};
