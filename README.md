# plm
### a Sails application
Dependencies:
'password-hash' , a node js pacakge. Install it with 'npm install password-hash'
You may also have to install any dependencies declared under 'dependencies' in package.json, 
using npm install.


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


A few things you should know about sails.

Sails is a MVC framework for node.js. It provides an easy mechanism for making CRUD (create, read, update, destroy) applications. Here are a few sails/node nuances that are important to understand.

Callbacks:
     Node uses non-blocking, asynchronous IO. So any time you query the DB, you provide a callback function (the .done() function that you see tied to most DB calls). This is necessary becuase each DB call is pushed onto the event stack, to be executed when ready. In the meantime, the rest of the code after the callback can and will be executed. This means if you set a flag inside a callback, and later reference that flag OUTSIDE the callback, its value may not necessarily reflect what you believe it does.

DB access:
     Sails auto generates a RESTful API for CRUD based off of the model definitions. For example, to find a user by a provided username, we can use the Users.findByUsername() function. Generally, this and similar functions are generated as such:

     ModelName.find[One[All[]]]By[Attribute].

     The real kick about the RESTful API that sails generates, is that it can be accessed via a url. For example, you can create a guest by navigating to Guests/create?attr=val&otherattr=otherval. As it turns out, backbone uses this contract to do all its create/update/delete actions.

Protecting the data with sails policies:
     Sails provides a nice mechanism for modifying or blocking requests that come into the controllers. For example, we might not want a user to add a guest under someone elses username (through the url access). To prevent this, we have a file under api/policies called 'canAdd.js'. Here, we have access to the request object and all its paramaters, including the session object stored for the logged in user. We can read these, and either decide to modify or reject the request. These policies can be chained, so when we decide that a request passes a given policy, we call the next() function that is passed to the policy. To define a new policy, you need to create a file in api/policies, then add an entry to the 'policies.js' file, specifying which controller / action you wish to protect.

Backbone.js:
     Backbone is a front end MVC framework for javascript that makes working with data once it hits the browser much more simple. Backbone hooks into the RESTful api to issue create/update/delete requests to the server, and awaits for success/fail responses. Currently, there is a backbone view for the guests list, as well as an indivisual view for a guest entry. There is also a guest model that these views extend which handles most of the server interactions. 


