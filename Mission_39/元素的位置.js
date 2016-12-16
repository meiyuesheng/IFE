

// 获取元素在页面上的偏移量。


function getOffset(element) {

	var o={};

		o.offsetLeft = element.offsetLeft;
		o.offsetTop = element.offsetTop;

		var current = element.parentNode;

		while (current !== null) {
			o.offsetTop += current.offsetTop;
			o.offsetLeft += current.offsetLeft;
			current = current.parentNode;
		}


		return o;
}

// 获取页面滚动距离
function getScroll() {


		return document.documentElement.scrollTop;
}
