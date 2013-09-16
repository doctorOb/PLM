$(document).ready(function(){
	$('#mylist').click(function(){

		if(window.location == '/list'){
			if($(this).parent().hasClass('active') == false) {
				$('li').children('.guest-entry:not(.editable)').parent().slideUp(400);
				$('.guest-input-container').slideDown();
			}
		} else {
			window.location = '/list';
		}
	});
	$('#fulllist').click(function(){

		if(window.location == '/list') {
			if($(this).parent().hasClass('active') == false) {
				$('li').children('.guest-entry').parent().slideDown();
				$('.guest-input-container').slideUp();
			}
		} else {
			window.location = '/list';
		}
	});
	$('.navbar-nav').children('li').click(function(){
		$('.navbar-nav li.active').removeClass('active');
		$(this).addClass('active');
	});

});