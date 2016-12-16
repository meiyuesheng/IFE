var App = (function() {

	var App = function(config) {

		this.chessbox = $(".chessbox");
		this.editor = $(".eidtor");
		this.runbutton = $(".runbutton");
		this.bot = $(".bot");
		this.editorcommand = config.editor;
		this.blankspace = [];
		
		this.init();
		this.find = new Find(this);

	}

	function setBlank() {
		var blankspace = [];
				var blankspace = [];

				for (var i = 0; i <= 20; i++) {

					blankspace[i] = new Array(21);



					for (var j = 0; j <= 20; j++) {

						blankspace[i][j] = false;
					}

				}

				return blankspace;
	}

	App.prototype = {

		//初始化插件
		init: function() {
			//初始化棋盘
		console.log("重置");
			this.front = "down";
		this.coordinate = {
			x: 1,
			y: 1
		};
		this.angle = 0;

			var me = this;
			var html = "<div class='numline line'><div class='firstcell cell upnum'></div>";

			for (var i = 1; i <= 20; i++) {

				html += "<div class='upnum cell'>" + i + "</div>"

			}
			html += "</div>";

			//设置方格检验二维数组。

			this.blankspace =setBlank();


			for (var j = 1; j <= 20; j++) {

				html += "<div class='line '><div class='leftnum cell'>" + j + "</div>";

				for (var k = 1; k <= 20; k++) {

					html += "<div class='cell'></div>";
				}

				html += "</div>";
			}


			this.chessbox.append(html);


			//初始化命令编辑器；

			me.runbutton.on('click', function() {

				me.editorExcute(me.editorcommand.command);
			});

			$(".randombuild").on('click', function() {

				me.randomBuild();
			})
			
			// 设置监听 重置按钮
			me.resetbutton= $('.resetbutton').on('click',function () {
				console.log('点击重置');

				me.front = "down";
				me.coordinate = {
					x: 1,
					y: 1
				};
				me.angle = 0;
				me.blankspace = setBlank();
				$('.wall').removeClass('wall');
				me.animate();
				
				});

		},

		//移动到新的位置
		animate: function() {
			var me = this;

			//边界检查；

			if (me.coordinate.x <= 0) {
				me.coordinate.x = 1;
			};

			if (me.coordinate.x > 20) {
				me.coordinate.x = 20;
			}

			if (me.coordinate.y <= 0) {
				me.coordinate.y = 1
			};

			if (me.coordinate.y > 20) {
				me.coordinate.y = 20
			};

			var locatex = (37 * me.coordinate.x) + "px";
			var locatey = (37 * me.coordinate.y) + "px";

			me.bot.css({
				"top": locatey,
				"left": locatex
			});

		},

		go: function() {
			var me = this;
			var front = me.front;
			var step;
			if (arguments[0]) {
				step = arguments[0];
			} else {
				step = 1;
			}
			step = Number(step);

			console.log("step:" + step)
			if (front == "lef") {
				me.coordinate.x -= step;
			} else if (front == "rig") {
				me.coordinate.x += step;
			} else if (front == "up") {
				me.coordinate.y -= step;

			} else if (front == "down") {
				me.coordinate.y += step;
			}
			console.log("me.coordinate.y:" + me.coordinate.y);
			console.log("me.coordinate.y:" + me.coordinate.y);
			me.animate();


		},
		rotate: function() {
			var me = this;

			var direc = arguments[0];

			if (direc == "lef") {
				me.angle += 90;
			} else if (direc == "rig") {
				me.angle -= 90;
			} else if (direc == "bac") {
				me.angle += 180;

			}


			var deg = me.angle + "deg";

			me.bot.css({
				"transform": "rotate(" + deg + ")"
			});

			var angle = me.angle;

			if (angle >= 360) {
				while (angle >= 360) {
					angle -= 360;
				}
			} else if (angle < 0) {
				while (angle < 0) {
					angle += 360;
				}
			}

			if (angle == 0) {
				me.front = "down"
			};

			if (angle == 90) {
				me.front = "lef"
			};

			if (angle == 180) {
				me.front = "up"
			};

			if (angle == 270) {
				me.front = "rig"
			};


		},


		trap: function() {

			var me = this;
			console.log("执行trap");
			var distance = 1;
			if (arguments[1]) {
				distance = Number(arguments[1]);
			}
			console.log("第一个个参数" + arguments[0]);
			switch (arguments[0]) {

				case "lef":
					{
						me.coordinate.x -= distance;
					};
					break;
				case "rig":
					{
						me.coordinate.x += distance;
					};
					break;
				case "up":
					{
						me.coordinate.y -= distance;
					};
					break;


				case "down":
					{
						me.coordinate.y += distance;
					};
					break;
			}

			me.animate();
		},

		editorExcute: function(arr) {

			var me = this;
			var i = 0;
			var t;
			console.log("editorExcute的参数");
			console.log(arr);
			var tiemCount = function() {



				t = setTimeout(function() {

					$(".active").removeClass("active");
					

					// 跳过空行
					while (!arr[i]) {
						i++;
					}


					me.commandExcute(arr[i]);
					console.log("执行" + arr[i]);
					var selector = ".linenumber:eq(" + i + ")"

					$(selector).addClass("active");
					i++;

					if (i < arr.length) {
						tiemCount();
					} else {
						clearTimeout(t);
					}
				}, 500)
			}


			tiemCount();

			// for(var i=0 ; i<arr.length;i++){
			// 	me.commandExcute(arr[i]);	
			// }


		},

		commandExcute: function(command) {
			var me = this;

			//解析命令字符串；
			var rel = me.parse(command);

			if (rel) {

				console.log("调用方法");
				console.log("rel为：" + rel);
				var fun = rel.handle.apply(this);
				fun.apply(me, rel.para);
			} else {
				console.log("指令错误");
				console.log(rel);
			}

		},



		parse: function(command) {

			var me = this;

			var result;
			var fun;

			console.log("执行parse");


			for (var i = 0; i < me.commandcode.length; i++) {

				result = me.commandcode[i].pattern.exec(command);

				console.log("result为：" + result);
				console.log(result);
				if (result) {


					fun = me.commandcode[i].handle;
					i = me.commandcode.length; //跳出循环；
				}

			}

			console.log("匹配结束后result:" + result);


			if (result) {
				result.shift();
				console.log("result返回：" + result);
				return {
					handle: fun,
					para: result
				};

			} else {
				//调用函数警告指令错误。
				//对错误指令进行处理。
				console.log("parse返回:" + result);
				return null;
			}

		},

		//定义移动方法goto;
		goto: function() {

			console.log("调用goto 参数为：" + arguments[0]);

		},



		move: function() {
			var me = this;
			var direc = arguments[0];

			var distance = 1;



			if (arguments[1]) {
				distance = Number(arguments[1]);

			}

			var endpoint = me.getendpoint(direc, distance);

			var haswall = me.checkWall(direc, me.coordinate, endpoint);


			if (haswall) {
				console.log("路径上有障碍，不能移动");
				return;

			}

			me.setDirection(direc);

			me.go(distance);


		},


		setDirection: function(direc) {
			var me = this;
			var deg = me.angle;
			console.log(deg);
			var front = me.front;
			if (direc == "up") {
				//deg=180;
				if (me.front == "lef") {
					deg += 90;
				} else if (me.front == "rig") {
					deg -= 90;
				} else if (me.front == "down") {
					deg += 180;
				}
			} else if (direc == "down") {

				if (front == "lef") {
					deg -= 90;
				} else if (front == "up") {
					deg += 180;
				} else if (front == "rig") {
					deg += 90;
				}

			} else if (direc == "lef") {

				if (front == "down") {
					deg += 90;
				} else if (front == "up") {
					deg -= 90;
				} else if (front == "rig") {
					deg += 180;
				}

			} else if (direc == "rig") {

				if (front == "down") {
					deg -= 90;
				} else if (front == "lef") {
					deg -= 180;
				} else if (front == "up") {
					deg += 90;
				}
			}


			me.angle = deg;
			me.front = direc;
			me.bot.css({
				"transform": "rotate(" + deg + "deg)"
			})



		},

		checkWall: function(direc, now, endpoint) {

			var me = this;
			console.log("endpoint:" + endpoint.x + endpoint.y);
			console.log("now:" + now.x + now.y);
			console.log("direc:" + direc);
			if (direc == "lef" || direc == "rig") {
				var y = endpoint.y;

				if (direc == "lef") {
					for (var i = endpoint.x; i <= now.x; i++) {

						if (me.blankspace[i][y]) {
							console.log("i:" + i + " y:" + y);

							return true;
						}
					}
				} else {

					for (var i = now.x; i <= endpoint.x; i++) {

						if (me.blankspace[i][y]) {
							console.log("i:" + i + " y:" + y);
							return true;
						}
					}

				}

			} else if (direc == "up" || direc == "down") {
				var x = endpoint.x;
				console.log()
				if (direc == "up") {

					for (var j = endpoint.y; j <= now.y; j++) {

						if (me.blankspace[x][j]) {
							console.log("x:" + x + "y:" + j);
							return true;
						}


					}

				} else {


					for (var j = now.y; j <= endpoint.y; j++) {

						if (me.blankspace[x][j]) {
							console.log("x:" + x + "y:" + j);
							console.log("blank:" + me.blankspace[x][j]);

							return true;
						}
					}

				}
			}


			return false;

		},
		showblank: function() {
			var me = this;

			for (var i = 0; i < 21; i++) {

				console.log(me.blankspace[i]);
			}

		},

		getendpoint: function(front, distance) {


			var me = this;



			console.log("me.coordinate.y:" + me.coordinate.y)


			var step = Number(distance);

			var endpoint = {};
			endpoint.x = me.coordinate.x;
			endpoint.y = me.coordinate.y;

			console.log("step:" + step)
			if (front == "lef") {
				endpoint.x -= step;
			} else if (front == "rig") {
				endpoint.x += step;
			} else if (front == "up") {
				endpoint.y -= step;

			} else if (front == "down") {
				endpoint.y += step;
			}

			console.log("返回endpoint:" + endpoint);
			return endpoint;

		},

		build: function() {

			var me = this;
			console.log("进入修墙");

			console.log("进入build");
			var locate = {
				x: null,
				y: null
			}
			locate.x = me.coordinate.x;
			locate.y = me.coordinate.y;
			var direc = me.front;
			console.log(direc);
			if (direc == "up") {
				locate.y -= 1;
			} else if (direc == "down") {
				locate.y += 1;
			} else if (direc == "lef") {
				locate.x -= 1;
			} else if (direc == "rig") {
				locate.x += 1;
			}

			if (locate.x <= 0 || locate.x > 20 || locate.y <= 0 || locate.y > 20) {
				console.log("超出棋盘边界");
				return;
			};



			//	console.log(blankspace);

			//检查目标位置是否已有墙壁;

			if (me.blankspace[locate.x][locate.y]) {
				console.log("目标位置已修墙");
				return;

			} else {
				console.log(locate.x + "x:y" + locate.y);


				console.log("修墙成功");


				console.log(me.blankspace[locate.x][locate.y]);

				me.blankspace[locate.x][locate.y] = true;

				console.log(me.blankspace[locate.x][locate.y]);
				//me.showblank();
				console.log("墙的位置:" + locate.x + ":" + locate.y);
				var wall = me.getWall(locate.x, locate.y);
				//wall.css("background-color","#bdc3c7");
				wall.addClass("wall");



			}



			// var locatex=(37*locate.x)+"px";
			// var locatey=(37*locate.y)+"px";

			// var wall="<div class='wall' style=\'top:"+locatey+";left:"+locatex+";\'></div>";
			// // <img src="bot.png" class="bot" style="top: 111px; left: 37px;">
			// console.log("wall:"+wall);
			// me.chessbox.append(wall);

			// var w=$(".wall");

			// console.log(w);



		},

		randomBuild: function() {
			var me = this;

			var x = me.getRandomInt();

			var y = me.getRandomInt();

			if (!me.blankspace[x][y]) {
				me.blankspace[x][y] = true;

				console.log(me.blankspace[x][y]);
				//me.showblank();
				console.log("墙的位置:" + x + ":" + y);
				var wall = me.getWall(x, y);
				//wall.css("background-color","#bdc3c7");
				wall.addClass("wall");

			} else {
				me.randomBuild();
			}

		},

		getRandomInt: function() {

			return Math.floor(Math.random() * (20 - 1 + 1) + 1);
		},

		getWall: function(x, y) {
			console.log("x:" + x + "y:" + y);
			var selector = ".line:eq(" + y + ")>.cell:eq(" + x + ")";

			var wall = $(selector);

			return wall;
			//.css("background","red")


		},
		brush: function() {

			var me = this;
			var color = arguments[0];
			console.log("粉刷墙壁");
			console.log("color:" + color);
			var locate = {
				x: null,
				y: null
			}
			locate.x = me.coordinate.x;
			locate.y = me.coordinate.y;
			var direc = me.front;
			console.log(direc);
			if (direc == "up") {
				locate.y -= 1;
			} else if (direc == "down") {
				locate.y += 1;
			} else if (direc == "lef") {
				locate.x -= 1;
			} else if (direc == "rig") {
				locate.x += 1;
			}

			if (locate.x <= 0 || locate.x > 20 || locate.y <= 0 || locate.y > 20) {
				console.log("超出棋盘边界");
				return;
			};



			//	console.log(blankspace);

			//检查目标位置是否已有墙壁;

			if (!me.blankspace[locate.x][locate.y]) {
				console.log("目标位置没有墙壁");
				return;

			} else {
				// console.log(locate.x+"x:y"+locate.y);


				// console.log("修墙成功");


				// console.log(me.blankspace[locate.x][locate.y]);

				// me.blankspace[locate.x][locate.y]=true;

				// console.log(me.blankspace[locate.x][locate.y]);
				//me.showblank();
				console.log("墙的位置:" + locate.x + ":" + locate.y);
				var wall = me.getWall(locate.x, locate.y);
				//wall.css("background-color","#bdc3c7");
				wall.css("background-color", color);



			}


		},
		moveTo: function() {
			var me = this;
			var end = {};
			console.log("执行moveto");
			end.x = arguments[0];

			end.y = arguments[1];

			var start = {};
			start.x = me.coordinate.x;
			start.y = me.coordinate.y;


			var path = me.find.finder(start, end);

			console.log(path);

			var t;
			var i = 0;
			var timer = function() {

				t = setTimeout(function() {

					if (path.length == 0) {
						clearTimeout(t);
					} else {
						var p = path.pop();
						me.goto(p.x, p.y);
						timer();
					}

				}, 300);

			}


			timer();
		},
		goto: function(x, y) {

			var me = this;

			var cx = me.coordinate.x;
			var cy = me.coordinate.y;

			if (x == cx) {
				if (cy < y) {
					me.move("down");
				} else {
					me.move("up");
				}


			} else if (y == cy) {
				if (cx < x) {
					me.move("rig");
				} else {
					me.move("lef");
				}
			} else {
				console("goto出错");
				return;
			}
		}



	};


	App.prototype.commandcode = [{

			pattern: /^go\b\s?\b(\d*)\b/i,

			handle: function() {
				return this.go;
			}
		}, {
			pattern: /^tra\b\s\b(rig|lef|up|down)\b\s?\b(\d*)\b/i,


			handle: function() {
				return this.trap;
			}

		},

		{
			pattern: /^turn\b\s\b(lef|rig|bac)\b/i,

			handle: function() {
				return this.rotate;
			}
		},

		{
			pattern: /^mov\b\s\b(lef|rig|up|down)\b\s?\b(\d*)\b/i,

			handle: function() {
				return this.move;
			}
		},

		{
			pattern: /^build\b/i,

			handle: function() {
				return this.build;
			}
		},

		{
			pattern: /^brush\b\s(#[0-9a-zA-Z]{6})\b$/i,

			handle: function() {
				return this.brush;
			}
		},


		{
			pattern: /^mov\b\sto\s(\d*),(\d*)$/i,
			handle: function() {
				return this.moveTo;
			}

		}


	]



	return App;
})();