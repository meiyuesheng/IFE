// 获取html元素
var div = document.getElementsByTagName('div');




//为每一个 元素 绑定事件，设定定时器。
for (var i = 0; i < div.length; i++) {
  div[i].timer = null;

  div[i].onmouseover = function() {
    setTimer(this, 400);
  }

  div[i].onmouseout = function() {
    setTimer(this, 200);
  }

}


function setTimer(obj, itarget) {

  // 先移除绑定在元素上的原有的事件，避免由于连续触发事件 产生错误。
  // 使得一次只有一个 定时器 在元素上面操作元素的属性
  console.log("OBJ");
  console.log(obj.timer);
  clearInterval(obj.timer);
  var speed = 0;
  var width = 0;
  
  // 将定时器 句柄 绑定在dom对象上？
  obj.timer = setInterval(function() {
    //var computed=document.defaultView.getComputedStyle(obj,null);
    //width=parseInt(computed.width);
    
    // 获取要改变的属性的 值
    width = parseInt(getStyle(obj, 'width'));
    
    // 设定改变的速度，距离目标越近，数值就越小。形成先快后慢的效果。
    speed = (itarget - width) / 10;

    speed = speed > 0 ? Math.floor(speed) : Math.floor(speed);


    if (itarget === width) {

      
      clearInterval(obj.timer)
    } else {
      obj.style.width = width + speed + 'px';
    }


  }, 40)


}


//封装获取外部样式函数；



function getStyle(obj, attr) {

  if (obj.currentStyle) {
    return obj.currentStyle[attr];

  } else {
    return getComputedStyle(obj, null)[attr];
  }


}