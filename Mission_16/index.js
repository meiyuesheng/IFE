// JavaScript Document

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 var id= function(id){
	 
	return document.getElementById(id);
 
 
 }
 
 var pattern1=/^[\u4e00-\u9fa5a-zA-Z]+$/ 
var pattern2=/[^0-9]/
 
function addAqiData() {
	
	var city=id("aqi-city-input").value;
	var num=id("aqi-value-input").value;
	
	
	if(!pattern1.test(city)){
		alert("city不符合格式");
		
		}
	else if(pattern2.test(num)){
		alert("num不符合格式要求");
		}
	else {aqiData[city]=num;
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

 var table=id("aqi-table");
 var items="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	
	for(var city in aqiData){
		
		
		 items+= "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
		}
 
    table.innerHTML=items;
  


}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
 delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
   id("add-btn").onclick=addBtnHandle;
   
   id("aqi-table").onclick=function(event){
	   delBtnHandle(event.target.dataset.city);
	   
	   
	   }
   
   


}

init();