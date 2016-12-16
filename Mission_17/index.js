// JavaScript Document


/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

 var id=function(id){
	 return document.getElementById(id);
	 
	 }

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */


function renderChart() {
	
	var achart=document.getElementById("aqi-chart-wrap");
    achart.innerHTML="";
	var i=0;
	var width=0;
	var left=0;
	var margin=0;
	
	if(pageState["nowGraTime"]=="day"){
		
		width=5;
		
		left=5;
		margin=5;
		
		}
	else if(pageState["nowGraTime"]=="week"){
		width=50;
		
		left=200;
		margin=10;
		}
		
	else {
		width=100;
		left=250;
		margin=10;
		}
	var getRandomColor = function(){

  return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);

}
	var i=1;
	for(p in chartData){
		
		
		
	var hr=document.createElement("hr");

     hr.style.background=getRandomColor();
	 hr.style.width=width+"px";
     hr.style.height=chartData[p]+"px";
     hr.style.left=left+"px";
	 	hr.setAttribute("data-mes",p+":"+chartData[p]);
	 
    achart.appendChild(hr);	
	
	hr.onmousemove=function(event){
		var thr=event.target;
	   hrdiv=document.createElement("div");
	   
	   cn=document.createAttribute("class");
	   cn.value="hrdiv";
	   hrdiv.innerHTML=thr.dataset.mes;
	   
	    hrdiv.setAttributeNode(cn);
	   console.log("输出className"+i);
	   thr.appendChild(hrdiv);
	   
	   hp=document.createElement("h");
	   
	   
		}
	hr.onmouseout=function(event){
	event.target.innerHTML="";
		
		
		}
	i=i+1;
	left=left+width+margin;
	}
	

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
  // 确定是否选项发生了变化 
  if(value!=pageState["nowGraTime"]){
	  pageState["nowGraTime"]=value;
	  console.log(value);
	  }


  // 设置对应数据
  initAqiChartData();

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(value) {
  // 确定是否选项发生了变化
  if(value!=pageState["nowSelectCity"])pageState["nowSelectCity"]=value;
   console.log(value);
 console.log("更换城市"+pageState["nowSelectCity"])
  // 设置对应数据
  
  
  initAqiChartData();
  
  
  

  // 调用图表渲染函数
  renderChart();
  console.log("渲染图表");
}


/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

   
 
  
  document.getElementById("form-gra-time").onclick=function(event){
	  
	  graTimeChange(event.target.value); console.log("点击"+event.target.value)
	  }
  
   
   
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
 pageState["nowSelectCity"]="北京";
 
 id("city-select").onclick=function(event){
	 
	 citySelectChange(event.target.value);
	 
	
	 
	
	 
	 }
 
 
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
 

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(p in chartData){
	  delete chartData[p];
	  }
  
  
  
  if( pageState["nowGraTime"]=="day"){//设置选择天时的数据
	  var city=pageState["nowSelectCity"];
	  console.log("初始化数据city"+pageState["nowSelectCity"]);
	                              
	  for( p in aqiSourceData[city]){
		  
		  chartData[p]=aqiSourceData[city][p];
		 
		console.log(p);
		  
		  }
	  
	  
	  
	  }
	  
	  else if(pageState["nowGraTime"]=="month"){//设置选择月份时的数据
		  var city=pageState["nowSelectCity"];
		  console.log("调试"+city);
		   var md=0,i=0;
		   var month=1;
		   var date=new Date(2016,month,0);
		  for( p in aqiSourceData[city]){
			  
			    md=md+aqiSourceData[city][p];
				 i++;
				if(i==date.getDate()){
					var time="2016-"+month;
					chartData[time]=parseInt(md/date.getDate());
					console.log(md);
					md=0;
					
					month++;
					
					i=1;
					}
			  }
		  }
  
  else { console.log("数据week设置")
   var city=pageState["nowSelectCity"]
   console.log("调试"+city);//调试
	  var dn=0,wn=0,i=0;
	  var weeknum=0;
	  var date2=new Date(2016,1,0);
	  
	  var date=new Date(2016,0,1);
	  var datefrom=new Date(2016,1,1);
	   var weekday=date.getDay();
	   dn=date.getDay();
	   var dateto=new Date(2016,3,0);
	   
	   var totaldays=parseInt((dateto.valueOf()-datefrom.valueOf())/(1000*60*60*24));
	 
	  for(p in aqiSourceData[city]){
		  wn=wn+aqiSourceData[city][p];
		
		 i++;
		 weekday++;
		  
		  if(weekday==7){
			 weeknum=weeknum+1;
			 var cweek="2016第"+weeknum+"周";
			  
			  chartData[cweek]=parseInt(wn/(7-dn));
			    console.log(7-dn);
			  console.log(chartData[cweek]);
			  weekday=0;
			  
			  
			  wn=0;
			  dn=0;
			  
			  }
		
		  if(i>=totaldays)break;
		
		  
		  }
	    console.log("i"+i);
	  for(p in chartData){
	  console.log("遍历weekc"+chartData[p])
	  }
	  }
  
  
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
 
 renderChart();
  
 
  
  
  
}

init();

