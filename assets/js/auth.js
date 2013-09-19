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
	var code = $('#signup-code').val();


	if (username && password && passwordCheck && firstName && lastName && code) {

		if (!validEmail(username)){
			alert("must enter a valid WPI email address");
		}
		if (password === passwordCheck) {
			$('#signup-submit').addClass('disabled');
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
		}
	} else {
		alert('please fill in all fields');
	}
});

});