var Find = (function() {


	var Find = function(app) {

		this.blankspace = app.blankspace;

	}


	Find.prototype = {

		finder: function(startpoint, endpoint) {

			var me = this;

			var openlist = [];

			var closelist = [];

			var point = {};

			var nearpoint = [];

			var resultpoint = [];
			var resultindex;

			startpoint.G = 0;

			openlist.push(startpoint);



			do {
				console.log("openlist");
				//	console.log(openlist);
				var currentpoint = openlist.pop();

				closelist.push(currentpoint);
				console.log("currentpoint");
				console.log(currentpoint);

				nearpoint = me.getnearpoint(currentpoint);


				for (var item in nearpoint) {

					//检查此点是否在关闭列表中，如果在，就忽略它，不用再计算。
					if (closelist.checkin(nearpoint[item])) {
						//console.log("continue");
						continue;
					}
					var g = currentpoint.G + 1;
					// 检查是否在开启列表中，不在，就计算g,h,f,father,添加到列表里。
					if (!openlist.checkin(nearpoint[item])) {
						//	console.log("进入openlist赋值");
						nearpoint[item].G = g;
						nearpoint[item].H = (Math.abs(endpoint.x - nearpoint[item].x) + Math.abs(endpoint.y - nearpoint[item].y)) * (0.4);
						nearpoint[item].F = nearpoint[item].G + nearpoint[item].H;
						nearpoint[item].father = currentpoint;
						//	console.log("加点进入openlist");
						//	console.log(nearpoint[item]);

						openlist.push(nearpoint[item]);


					} else { //在开启列表中，重新计算检查g 值，看是否有更短路径。

						var index = openlist.checkin(nearpoint[item]);
						if (openlist[index].G > g) {

							openlist[index].G = g;

							openlist[index].F = openlist[index].G + openlist[index].H;

							openlist[index].father = currentpoint;

						}


					}
				}



				if (openlist.length == 0) {
					console.log("路径不存在");
					break;
				}


				openlist.sort(me.sortF);
				console.log("排序后");
				//	console.log(openlist);


			} while (!(resultindex = openlist.checkin(endpoint)));

			console.log(endpoint);

			console.log("resultindex:" + resultindex);
			if (resultindex) {
				resultpoint.push(openlist[resultindex]);
				var now = openlist[resultindex].father;
				console.log("now:" + now);
				console.log(now);
				console.log("endpoint的father" + endpoint.father);
				while (now.x != startpoint.x || now.y != startpoint.y) {
					resultpoint.push(now);
					now = now.father;


				}
			} else {
				resultpoint = [];
			}



			return resultpoint;

		},
		getnearpoint: function(currentpoint) {
			var me = this;
			var current = currentpoint;

			var result = [];

			var blankspace = me.blankspace;

			if (current.x - 1 > 0) {
				if (!blankspace[current.x - 1][current.y]) {
					result.push({
						x: current.x - 1,
						y: current.y
					});

				}

			}


			if (current.x + 1 < 21) {
				if (!blankspace[current.x + 1][current.y]) {
					result.push({
						x: current.x + 1,
						y: current.y
					});
				}

			}


			if (current.y - 1 > 0) {

				if (!blankspace[current.x][current.y - 1]) {

					result.push({
						x: current.x,
						y: current.y - 1
					});
				}

			}

			if (current.y + 1 < 21) {

				if (!blankspace[current.x][current.y + 1]) {

					result.push({
						x: current.x,
						y: current.y + 1
					});
				}
			}
			//	console.log("nearpoint");
			//	console.log(result);
			return result;


		},
		sortF: function(a, b) {

			return b.F - a.F;


		}


	}



	// function setGHF(start,end,point){

	//  	point.G=Math.abs(start.x-point.x)+Math.abs(start.y-point.y);//g的求法出错。

	// 	point.H=Math.abs(point.x-end.x)+Math.abs(point.y-end.y);

	// 	point.F=point.G+point.H;


	// 	return point;



	// }



	return Find;

})();

Array.prototype.checkin = function(point) {

	var arr = this;
	var result = false;

	for (var item in arr) {

		if (arr[item].x == point.x && arr[item].y == point.y) {

			result = item;
			break;
		}


	}

	return result;

}