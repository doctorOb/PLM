$(document).ready(function(){
$('.login-container .login-submit').click(function(){
	var username = $('.login-container .username').val();
	var password = $('.login-container .password').val();

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

console.log('js loading');
$('.signup-container .signup-submit').click(function(){
	var username = $('.signup-container .username').val();
	var password = $('.signup-container .password').val();
	var passwordCheck = $('.signup-container .password-check').val();
	var firstName = $('.signup-container .firstname').val();
	var lastName = $('.signup-container .lastname').val();

	if (username && password && passwordCheck && firstName && lastName) {
		if (password === passwordCheck) {
			console.log('using password: ' + password);
			$.post('/signup',
					{username: username,
						password: password,
						firstName: firstName,
						lastName: lastName},
					function(res){
						console.log(res.responseText);
						if (res.status == 'OK') {
							window.location = '/list';
						}
					}).fail(function(res){
						alert('fail');
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