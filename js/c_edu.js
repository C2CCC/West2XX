$(document).ready(function() {
	//定义首页每个block的背景
	setColor(0, "rgb(0,146,199)");
	setColor(1, "rgb(242,156,156)");
	setColor(2, "rgb(243,229,154)");
	setColor(3, "rgb(151,236,113)");
	setColor(4, "rgb(159,224,246)");
	setColor(5, "rgb(255,140,120)");
	//点击事件
	//主页进入各个模块
	$(".c_indexBlocks li").click(function() {
		$(".c_indexBlocks").css({
			'display': 'none',
			'opacity': '0'
		});
		$("#c_eduItem_" + $(this).index()).css('display', 'block');
		$("#c_eduItem_" + $(this).index()).animate({
			"opacity": "1"
		});
	});
	//返回键
	$(document).on('click', '.c_backLink', backFunc);
	//一、二级模块切换(查课表，查考场等切换)
	$(".c_2ndModLink").click(function() {
		moduleNavLink('.c_1stMod', '.c_2ndMod', '-300px');
		$(".c_backLink").addClass("c_backTo1st").removeClass("c_backLink");
		$(this).css('display', 'none');
	});
	$(document).on('click', '.c_backTo1st', function() {
		moduleNavLink('.c_2ndMod', '.c_1stMod', '300px');
		$(".c_backTo1st").addClass("c_backLink").removeClass("c_backTo1st");
		$(".c_2ndModLink").css('display', 'inline-block');
	});
	//get current week
	$(".c_indexBlocks li").one('click', function() {
		$.ajax({
			type: "get",
			url: "data/getData.php",
			async: false,
			data: {
				'getData': 'currWeek'
			},
			dataType: 'json',
			success: function(time) {
				currWeek = time.data.week;
			}
		});
	});
	//timetable handle
	//get timetable
	$(".c_indexBlocks li").eq(0).one('click', function() {
		//generate select options
		for (var w = 1; w <= 25; w++) {
			$(".c_selectWeek").append("<option value=" + w + ">第" + w + "周</option>");
		}
		$(".c_selectWeek").val(currWeek);
		getTimetable('031302305', currWeek);
	});
	//week options onchange
	$(".c_selectWeek").change(function() {
		var selectedWeek = $(this).val();
		arrangeTimetable(selectedWeek);
	});
	//refresh timetable
	$(".c_refreshTt").click(function() {
		var selectedWeek = $(".c_selectWeek").val();
		getTimetable('031302305', selectedWeek);
	});
});

function setColor(i, c) {
	$(".c_indexIcon").eq(i).css({
		"background": c
	});
}

function backFunc() {
	$(this).parent().parent().css({
		'display': 'none',
		'opacity': '0'
	});
	$(".c_indexBlocks").css('display', 'block');
	$(".c_indexBlocks").animate({
		"opacity": "1"
	});
}

function moduleNavLink(c1, c2, c1Left) {
	$(c1).css({
		'display': 'none',
		'left': c1Left,
		'opacity': '0'
	});
	$(c2).css('display', 'block');
	$(c2).animate({
		'opacity': '1',
		'left': '0'
	}, 200);
}

function getTimetable(stunum, week) {
	$.getJSON("data/getData.php", {
		'getData': 'timetable',
		'stunum': stunum
	}, function(timetable) {
		tt = timetable;
		arrangeTimetable(week);
	});
}

function arrangeTimetable(week) {
	var iniTable = "<tbody><tr><th>节数</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th><th>星期日</th></tr><tr><td>1<br/>8:20-9:05</td></tr><tr><td>2<br/>9:15-10:00</td></tr><tr><td>3<br/>10:20-11:05</td></tr><tr><td>4<br/>11:15-12:00</td></tr><tr><td>5<br/>14:00-14:45</td></tr><tr><td>6<br/>14:55-15:40</td></tr><tr><td>7<br/>15:50-16:35</td></tr><tr><td>8<br/>16:45-17:30</td></tr><tr><td>9<br/>19:00-19:45</td></tr><tr><td>10<br/>19:55-20:40</td></tr><tr><td>11<br/>20:50-21:35</td></tr></tbody>";
	$(".c_timetable").html(iniTable);
	$.each(tt.data.tableInfo[week - 1].courseArr, function(key, value) {
		$.each(value, function(i, item) {
			$(".c_timetable tr").eq(i).append("<td>" + item.courseName + "<br/>" + item.place + "<br/>" + item.teacherName + "</td>");
		});
	});
	//合并相同行
	for (var i = 1; i <= 7; i++) {
		$(".c_timetable").rowspan(i);
	}
	//上色
	var tdText = [];
	$(".c_timetable").find("td").each(function() {
		if ($(this).css("display") != "none" && $(this).text() != "" && $.inArray($(this).text(), tdText) == -1) {
			tdText.push($(this).text());
		}
	});
	var colorIndex = 1;
	$.each(tdText, function(i, value) {
		$(".c_timetable").find("td+td").each(function() {
			if ($(this).css("display") != "none" && $(this).text() == value) {
				var color = "c_ttC" + colorIndex;
				$(this).addClass(color);
			}
		});
		if (colorIndex == 12) {
			colorIndex = 0;
		}
		colorIndex++;
	});
}

jQuery.fn.rowspan = function(colIdx) { //封装的一个JQuery小插件 
	return this.each(function() {
		var that;
		$('tr', this).each(function(row) {
			$('td:eq(' + colIdx + ')', this).filter(':visible').each(function(col) {
				if (that != null && $(this).html() == $(that).html() && $(this).text() != "") {
					rowspan = $(that).attr("rowSpan");
					if (rowspan == undefined) {
						$(that).attr("rowSpan", 1);
						rowspan = $(that).attr("rowSpan");
					}
					rowspan = Number(rowspan) + 1;
					$(that).attr("rowSpan", rowspan);
					$(this).hide();
				} else {
					that = this;
				}
			});
		});
	});
}