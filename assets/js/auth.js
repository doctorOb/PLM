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
		alert('error: server says\n' + res.responseText);
	});
});
function validEmail(email) {
	/* Verify that the provided email address is of the valid .wpi format */
	email = email.split('@');
	return (email.length == 2 && email[1] == 'wpi.edu');
}
$('#signup-begin').click(function(){
	$(this).hide();
	$('#signup-form').show(400);
});
var signupClicked = false; //because of concurrency issue on server side or something
$('#signup-submit').click(function(){
	if(signupClicked) return false;
	signupClicked = true;
	var username = $('#signup-email').val();
	var password = $('#signup-password').val();
	var passwordCheck = $('#signup-passwordCheck').val();
	var firstName = $('#signup-fname').val();
	var lastName = $('#signup-lname').val();
	var code = $('#signup-code').val();


	if (username && password && passwordCheck && firstName && lastName && code) {

		if (!validEmail(username)){
			alert("must enter a valid WPI email address");
			signupClicked = false;
			return;
		}
		if (password === passwordCheck) {
			$.post('/signup',
					{username: username,
						code: code,
						password: password,
						firstName: firstName,
						lastName: lastName},
					function(res){
						alert("account creation successfu!\n However, you must complete our varification process. You will recieve an email shortly\n");
					}).fail(function(res){
						alert("error: server says\n" + res.responseText);
					});
		} else {
			alert('passwords dont match');
			signupClicked = false;
		}
	} else {
		alert('please fill in all fields');
		signupClicked = false;
	}
});

});