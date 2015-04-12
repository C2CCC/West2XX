$(document).ready(function() {
	//定义首页每个block的背景
	setColor(0, "rgb(0,146,199)");
	setColor(1, "rgb(242,156,156)");
	setColor(2, "rgb(243,229,154)");
	setColor(3, "rgb(151,236,113)");
	setColor(4, "rgb(159,224,246)");
	setColor(5, "rgb(255,140,120)");
	//点击事件
	$(".c_indexBlocks li").click(function(){
		
	});
});

function setColor(i, c) {
	$(".c_indexIcon").eq(i).css({
		"background": c
	});
}