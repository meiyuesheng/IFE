
var id=function (id) {
	return document.getElementById(id);
}




var div1=id("div1");

div1.timer=null;

var div2=id("div2");

div2.timer=null;


//绑定事件。
div1.onmouseover=function () {
	setTimer(this,{width:300,marginLeft:200,height:300,opacity:0.8});
}

div1.onmouseout=function () {
	setTimer(this,{width:200,marginLeft:0,height:200,opacity:0.2});
}


div2.onmouseover=function () {
	setTimer(this,{width:300,marginLeft:200,height:300,opacity:0.8});
}


div2.onmouseout=function () {
	setTimer(this,{width:200,marginLeft:0,height:200,opacity:0.2});
}






function setTimer(obj,json,fun) {

	clearInterval(obj.timer);

	var speed=0;
	var icur=0;

	obj.timer=setInterval(function () {
		
		
		//检测属性是否全部完成；

		var flag=true;


		for(var attr in json){

				if (attr=="opacity") {

					icur=parseFloat(getStyle(obj,attr));

					icur=icur*100;
					icur=Math.round(icur);

					console.log('icur'+icur);
					speed=(json[attr]*100-icur)/10;
					
					console.log('speed'+speed);
					
					speed=speed>0?Math.ceil(speed):Math.floor(speed);

					

					if(icur!=json[attr]*100){
						flag=false;
					}

					obj.style[attr]=(speed+icur)/100;

				} 
				else {

					icur=parseInt(getStyle(obj,attr));

					speed=(json[attr]-icur)/10;

					speed=speed>0?Math.ceil(speed):Math.floor(speed);

					if(icur!=json[attr]){
						flag=false;
					}

					obj.style[attr]=icur+speed+'px';

				}


				
		}//for循环结束。

		if(flag){//判断本次动画的每个属性是否全部完成。
			clearInterval(obj.timer);

			if(fun){
			fun();//链式调用
				}
		}


	},50);
}





//获取元素的属性
// 对于定义在css中的样式，不能直接用元素获取。

function getStyle(obj,attr) {
	if (obj.currentStyle) {//IE 兼容
		return obj.currentStyle[attr];		
	} else {

		return getComputedStyle(obj,null)[attr];
	}
}