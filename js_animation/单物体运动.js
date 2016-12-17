

var id=function (id) {
	return document.getElementById(id);
}



var div1=id('div1');


div1.onmouseover=function () {
	setTimer(200);
}

div1.onmouseout=function(){

	setTimer(-100);
}


var timer=null

function setTimer(itarget) {
	clearInterval(timer);


  timer=setInterval(function(){
  var speed=0
  
  speed=(itarget-div1.offsetLeft)/10;
  speed=speed>0?Math.ceil(speed):Math.floor(speed);
  

  if (itarget==div1.offsetLeft) {
   clearInterval(timer);

  } 
  else {
   div1.style.left =div1.offsetLeft+speed+'px';
  }


  },50)




}

console.log(typeof( div1.style.left));