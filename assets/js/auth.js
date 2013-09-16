$(document).ready(function(){
$('#login-submit').click(function(){
	var username = $('#login-email').val();
	var password = $('#login-password').val();

	console.log('password: ' + password);
	$.post('/login',{username: username, password: password}, function(data){
		console.log('success');
		if (data) {
			window.location = '/list';
		}
	}).fail(function(res){
		alert('something done fucked up with yeur reques bud.\n Why don\'tcha pull up them logs');
		if(window.console){
			console.log(res.responseText);
		}
	});
});
function validEmail(email) {
	/* Verify that the provided email address is of the valid .wpi format */
	email = email.split('@');
	return (email.length == 2 && email[1] == 'wpi.edu');
}
console.log('js loading');
$('#signup-begin').click(function(){
	$(this).hide();
	$('#signup-form').show(400);
});
$('#signup-submit').click(function(){
	var username = $('#signup-email').val();
	var password = $('#signup-password').val();
	var passwordCheck = $('#signup-passwordCheck').val();
	var firstName = $('#signup-fname').val();
	var lastName = $('#signup-lname').val();

	if (username && password && passwordCheck && firstName && lastName) {

		if (!validEmail(username)){
			alert("must enter a valid WPI email address");
		}
		if (password === passwordCheck) {
			console.log('using password: ' + password);
			$.post('/signup',
					{username: username,
						password: password,
						firstName: firstName,
						lastName: lastName},
					function(res){
						console.log(res.responseText);
					}).fail(function(res){
						if(window.console){
							console.log(res.responseText);
						}
					});
		} else {
			alert('passwords don\t match');
		}
	} else {
		alert('please fill in all fields');
	}
});

});