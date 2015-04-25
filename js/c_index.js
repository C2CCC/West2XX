$(document).ready(function() {
	$(".c_loginLink").click(function() {
		$(".c_mask").css({
			'display': 'block',
			'opacity': '1'
		});
		$(".c_loginPop").show("fast");
	});
	$(".c_closePop").click(function() {
		$(".c_loginPop").hide("fast");
		$(".c_mask").animate({
			'opacity': '0'
		}, 200, function() {
			$(this).hide();
		});
	});
});