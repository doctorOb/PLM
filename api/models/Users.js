/**
 * Users
 *
 * @module      :: Model
 * @description :: This is the model for all users (brothers). The email verification is performed on the 
 * client end. uses the 'nodemailer' node module to send an email to each user with a verification token 
 * which is later used to index the user on the verification page.
 *
 */

var nodemailer = require("nodemailer");
var hasher = require('password-hash');
module.exports = {

	attributes: {
		userID: 'INT',
		username: 'STRING',
		firstName: 'STRING',
		lastName: 'STRING',
		password: 'STRING',
		verifyToken: 'STRING', //random string stored temporarily for verification process.
		verified: {
			type: 'BOOLEAN',
			defaultsTo: false
		}
	},
	/**
	 * This function is called before the creation process. Here, we set up everything 
	 * needed for email verification. I created a gmail account to use for sending the emails.
	 * in the future, the email sent could stand to be a little more verbose
	**/
	beforeCreate: function(values, next){


		values.password = hasher.generate(values.password);
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
			html: "<a href='http://lss-plm.herokuapp.com/verify?token=" + values.verifyToken + "'>Verify Account</a>"
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
