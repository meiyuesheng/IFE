// JavaScript Document

//构造一个隐藏元素子元素的方法

var id = function(id) {
	var bfn = 0;
	return document.getElementById(id);
}

var tree = new Array();

var bfn = 0;


//广度优先搜索遍历多叉树，将节点存入tree数组
//方法一，利用锚点为每一层的节点定位
/*function Bf(aroot){
	 console.log(aroot);
	tree.push(aroot);
	 console.log(aroot);
	if(aroot.nextElementSibling){
	     
		Bf(aroot.nextElementSibling);
		
		}else{console.log("没有");
		
		console.log(aroot.getAttribute("id"));}
	aroot=tree[bfn++];
	console.log(aroot.firstElementChild);
	
	if(aroot.firstElementChild){
		
		Bf(aroot.firstElementChild);
		
		}
		}	
	*/
//广度优先遍历，方法二，利用第二个数组存贮每一层的节点

function Bf(aroot) {

	tree.push(aroot);
	var arr = new Array();
	var currentroot = aroot;

	while (currentroot) {
		var child = currentroot.children;

		for (var i = 0; i < child.length; i++) {
			arr.push(child[i]);

		}
		if (arr.length == 0) return;

		currentroot = arr.shift();

		tree.push(currentroot);

	}

}


//深度优先遍历，接受根节点作为参数，把遍历到的节点存入tree数组中

function Df(aroot) {

	tree.push(aroot);

	if (aroot.firstElementChild) {
		Df(aroot.firstElementChild);


	}

	if (aroot.nextElementSibling) {

		Df(aroot.nextElementSibling);

	}


}


//动画
function animation(tree, text) {
	var i = 0;
	tree = tree.filter(function(item, index, array) {
		console.log("这是什么？")
		return item.nodeName != "A";

	});


	(function(tree) {
		for (var i = 0; i < tree.length; i++) {
			console.log(tree[i].nodeName);
		}
	})(tree);


	timer = setInterval(function() {
		console.log("计时器");
		if (i > tree.length - 1) {
			clearInterval(timer);
			tree[i - 1].style.background = "white";
			b = false;
		} else {
			if (i > 0) {
				tree[i - 1].style.background = "white";
			}


			tree[i].style.background = "orange";


			var input = tree[i].childNodes[0].nodeValue;
			console.log(input);
			if (input == text) {
				clearInterval(timer);
				b = false;
			}
			i++;
		}

	}, 200)


}


//绑定点击事件

(function() {
	var button = document.getElementsByTagName("button");
	console.log(button);
	//绑定删除事件
	for (var i = 0; i < button.length; i++) {
		console.log("绑定");
		button[i].onclick = function(event) {
			var btn = event.target;

			console.log("点击");
			respond(btn);

		}

	}
})();



(function() {
	console.log("删除");

	var btn = document.getElementById("remove");

	btn.onclick = function() {
		
		if (selected===null) {return}
		console.log("删除");
		selected.outerHTML = null;
	}


	var btn2 = id("add");

	btn2.onclick = function() {
		var text = document.getElementsByTagName("input")[0].value;
		selected.innerHTML += "<div>" + text + "</div>";
		console.log(text);
	}

})();


//记录选中div
var selected;
//绑定选中事件
function aclick() {
	var div = document.getElementsByTagName("div");
	

	for (var i = 0; i < div.length; i++) {

		div[i].onclick = selectdiv;
	};
};

aclick();

var selected = null;
function selectdiv(event) {
	if (selected===event.target) {
		selected.style.backgroundColor = "white";

		selected = null;
		console.log("设置为null");
	}
	else{

		selected = event.target;
		selected.style.backgroundColor = "orange";

}
	

	

	console.log("一次设置");
	event.stopPropagation();
}

//封装点击事件
var b = false;

function respond(btn) {
	if (b == false) {
		b = true;
	} else return;


	if (btn.getAttribute("id") == "bf") {

		tree = new Array();
		bfn = 0;

		console.log("检查");

		var root = id("root");
		console.log(root);
		Bf(root);

		animation(tree);


	} else if (btn.getAttribute("id") == "df") {


		console.log("点击");
		tree = new Array();
		var root = id("root");

		Df(root);
		animation(tree);


	} else if (btn.getAttribute("id") == "back") {


		tree = new Array();
		var root = id("root");

		aback(root);
		animation(tree);

	} else if (btn.getAttribute("id") == "search") {
		tree = new Array();
		var root = id("root");

		Df(root);
		var text = document.getElementsByTagName("input")[0].value;
		animation(tree, text);
		console.log(selected);
	}


}


id("hide").onclick = function() {
	console.log("隐藏");
	var tdiv = id("root").getElementsByTagName("div");
	console.log("隐藏");
	for (var i = 0; i <= tdiv.length - 1; i++) {
		tdiv[i].style.display = "none";


	}



}

id("show").onclick = function() {

	console.log("show");
	var tdiv = id("root").getElementsByTagName("div");

	for (var i = 0; i < tdiv.length; i++) {
		tdiv[i].style.display = null;

	}

}

//构造隐藏函数

//绑定hide show

function stopBubble(event) {
	if(event&&event.stopPropagation){
		event.stopPropagation();
	}
	else{
		window.event.cancelBubble = true;
	}
}

function bind() {
	var a = document.getElementsByTagName("a");

	for (var i = 0; i < a.length; i++) {

		a[i].addEventListener("click", function(event) {
			stopBubble(event);
			var par = event.target.parentNode;
			var tar = event.target;
			if (tar.innerHTML == "-") {
				console.log("点击");
				var ch = par.getElementsByTagName("div");

				for (var i = 0; i < ch.length; i++) {

					ch[i].style.display = "none";

				}

				tar.innerHTML = "+";
			} else if (tar.innerHTML == "+") {

				var ch = par.getElementsByTagName("div");

				for (var i = 0; i < ch.length; i++) {

					ch[i].style.display = null;

				}

				tar.innerHTML = "-";

			}

		}, false);

	}

}


(function() {
	bind();
})();


(function() {
	var ch = id("ch2").childNodes;
	for (var i = 0; i < ch.length; i++) {
		console.log(ch[i]);

	}
	console.log(ch[0].nodeValue);

})();

//设置所有框的颜色
//因为当时还不知道要取出外联样式需要额外的方法所以就
//给所有的div设置了内联样式。
console.log(id("root").style.background);

(function() {
	var div = document.getElementsByTagName("div");


	for (var i = 0; i < div.length; i++) {
		div[i].style.background = "white";
	}

})()