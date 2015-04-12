/*
 * 样式已在此定义 
 * #c_slider适应浏览器窗口大小
 * 最小为960px
 * 使用jquery.easing.1.3.js插件
 * 
 * C2CCC
 * */

$(document).ready(function() {
	$("html").css({
		"overflow-x": "hidden"
	});
	//定义c_slider及其子元素的样式
	var slideWidth = $(document.body).width();
	$("#c_slider").css({
		"width": slideWidth + "px",
		"overflow": "hidden"
	});
	var slideElementNum = $("#c_slider").children().children().length;
	$("#c_slider").children().css({
		"width": slideWidth * slideElementNum + "px",
		"overflow": "hidden",
		"position": "relative",
		"left": "0"
	});
	$("#c_slider").children().children().css({
		"width": $("#c_slider").width() + "px",
		"float": "left"
	});
	//点击滑动
	currItem = 0;
	$("#c_slide").children().click(function() {
		//导航栏效果
		$("#c_slide").children().children().removeClass("ItemNow");
		$(this).children().addClass("ItemNow");
		//滑动
		currItem = $(this).index();
		var sliderWidth = $("#c_slider").width();
		$("#c_slider").children().animate({
			left: "-" + currItem * sliderWidth + "px"
		}, {
			easing: 'easeInOutCirc',
			duration: 500
		});
	});
	//resize
	$(window).resize(function() {
		var slideWidth = $(document.body).width();
		slideWidth = slideWidth < 960 ? 960 : slideWidth;
		$("#c_slider").css({
			"width": slideWidth + "px"
		});
		var sliderWidth = $("#c_slider").width();
		$("#c_slider").children().css({
			"width": slideWidth * slideElementNum + "px",
			"left": "-" + currItem * sliderWidth + "px"
		});
		$("#c_slider").children().children().css({
			"width": $("#c_slider").width() + "px"
		});
		$(".con").children().css({
			"margin": "0 auto"
		});
	});
	//ajax
});