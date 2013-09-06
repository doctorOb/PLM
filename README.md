# plm
### a Sails application
Dependencies:
'password-hash' , a node js pacakge. Install it with 'npm install password-hash'
You may also have to npm install the following:
	ejs
	grunt
	optimist
	sails
	sails-disk

I built the site while reading following this tutorial, if you read through it, you'll know about as much as I do about the tech stack being used (sails + backbone): http://net.tutsplus.com/tutorials/javascript-ajax/working-with-data-in-sails-js/

TODOS:

 - Make 'My List' default when logged in
 - Add (working) search bar to 'Full List' and remove guest add functionality for this
 - Add admin console with functionality to
     - manually lock the party list so no more additions can be made
     - specify a time to open / close the list
     - Edit the configs (minimumGirlRatio, duplicate names, ect)
     - Lookup guests added by users
 - Web Sockets to send push requests to all connected clients whenever a new guest is added (update the counts)
 - Add gui buttons to inline guest entries. These would be:
     - A plus button to hover over (shows who added)
     - A 21+ button to indicate if they are over 21
     - A card button to show whether they have a wpi card enrolled.
