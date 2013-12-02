var afterLogin = function(d) { /* ... */ };

$(function() {
	var $loginBox = $('.loginBox');
	var $loginForm = $('#loginForm');
	var $user = $('#username');
	var $pass = $('#password');
	
	$loginForm.submit(function(e) {
		sirest.authenticate($user.val(), $pass.val(), {
			callback: function(d) {
				if (d.success) {
					$loginBox.fadeOut(500, function() {
						if (typeof afterLogin === 'function') {
							afterLogin(d);
						}
					});
				}
			}
		});
		
		e.preventDefault();
		return false;
	});
});