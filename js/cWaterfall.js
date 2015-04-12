/*
 *
 * 临时版本，无响应式，带异步加载,3列
 * C2CCC
 *
 * */
(function($) {
	$.fn.cWaterfall = function(options) {
		var opts = $.extend({}, $.fn.cWaterfall.defaults, options);
		var cW = $(this);
		//为容器和方格添加样式
		cW.css({
			'width': opts.containerWidth + 'px',
			'position': 'relative',
		});
		cW.children().css({
			'width': opts.columnWidth + 'px',
			'margin': opts.gap + 'px' + ' 0 0 ' + opts.gap + 'px',
			'position': 'absolute'
		});
		//定义列高、方格数组
		var columnHeights = [0, 0, 0];
		var elems = [];
		cW.children().each(function() {
			elems.push($(this));
		});
		calLayout(elems);
		//排序
		function calLayout(e) {
			for (i in e) {
				var c = findMin(columnHeights[0], columnHeights[1], columnHeights[2]);
				var domE = e[i].get(0); //jQuery对象转换为DOM对象
				var ro = domE.getBoundingClientRect();
				eHeight = ro.bottom - ro.top;
				var currBlkHt = eHeight + opts.gap; //当前布局方格高，包括margin
				var currLeft = c * (opts.columnWidth + opts.gap);
				var currTop = columnHeights[c];
				e[i].css({
					'left': currLeft,
					'top': currTop
				});
				columnHeights[c] += currBlkHt;
			}
			//最后定义容器高度
			var c = findMax(columnHeights[0], columnHeights[1], columnHeights[2]);
			cW.css({
				'height': c + opts.gap + 'px'
			});
		}

		function findMin(a, b, c) {
			if (a <= b && a <= c) {
				return 0;
			} else if (b <= c) {
				return 1;
			} else return 2;
		}

		function findMax(a, b, c) {
				if (a >= b && a >= c) {
					return a;
				} else if (b >= c) {
					return b;
				} else return c;
			}
			//异步加载更多
			//		function loadMore() {
		$(window).scroll(function() {
			var documentTop = $(document).scrollTop();
			var windowHeight = $(window).height();
			var documentHeight = $(document).height();
			if (documentTop >= (documentHeight - windowHeight)) {
				alert('load more...');
			}
		});
		//		}
	};
	$.fn.cWaterfall.defaults = {
		containerWidth: 960,
		columnWidth: 280,
		gap: 30
	};
})(jQuery);