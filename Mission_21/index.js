


//封装获取元素的方法
var id=function(id){
	return document.getElementById(id);
	
	}


  
var leftin=document.getElementById("left-in");

var leftin=id("left-in");


var leftout=id("left-out");

var rightin=id("right-in");

var rightout=id("right-out");


var data=[];


//渲染数组
function rend(array,container){
	
	
	
	
	var ainnerHTML="";
	
	for(var i=0;i<array.length;i++){
		
		ainnerHTML+="<div class='innerdiv' id="+i+" >"+array[i]+"</div>";
		
		}
	
	container.innerHTML=ainnerHTML;
	addDeleteTip("innerdiv");
	
	
	}


var patt=new RegExp("[^0-9]");
 
 
 //获取文本域的值
 
 var reg=new RegExp("[\ \s\n\r,、\t]")
 var getvalue=function (){ 
       var value=id("inputtext").value;
	   var str=new Array();
	  str=value.split(reg);
	   
	   for(var i=0;i<str.length;i++){
		   }
	   
		
		 return str;
		 
		 }




function add(str,dre){
	
	
	
	if(dre=="left-in"){
				 
		for(var i=0;i<str.length;i++){	 
				 
		data.unshift(str[i]);
		}
		}
		
	
	else {
		for(var i=0;i<str.length;i++){
		
		data.push(str[i]);
		
		
		}
		
		
		}
	
	
	
	rend();
	}
	



 function del(arry,dre){
	
	if(dre=="left-out"){
		
	
		var text=data[0];
		alert("是否删除"+text);
		
		data.shift();
		
		}
	
	else{
		var text=data[data.length-1];
		alert("是否删除"+text);
		data.pop();
		
		}
	
	rend();
	}

function trim(str){
	return str.replace(new RegExp("[\ ,，.]","g"),"");
	
	}

//函数 检查是否重复

function check(array,text){
	
	var have=false;
	for(var v in array){
		
		if(array[v]==text)have=true;
		
		}
		
		
		
		return have;
	
	
	}	
	
	
var data2=[];

//绑定事件
var pattern3=new RegExp("[,，.\ ]");
var pattern4=new RegExp("^[a-zA-Z0-9\u4e00-\u9fa5]+$")


//绑定tag的键盘事件
window.onkeyup=function(event){//对tag获得的输入进行处理。
	
	var text=gettext("inputtext");
	
	if(pattern3.test(text)||event.keyCode==13){
		
		
		text=trim(text);
		
		if(text==""||text==" "){id("inputtext").value="";return;};
		
			
		
		if(check(data2,text)){id("inputtext").value="";
		return;}
		console.log(text);
		if(data2.length<=9){
		data2.unshift(text);}
		
		else{
			data2.pop();
			data2.unshift(text);
			}
		
		
		
		id("inputtext").value="";
		
		var container=id("content");
		rend(data2,container);
		dele(data2,container);
		
		}
	
	}
 
 //绑定删除事件
 
 function dele(array,container){
	 container.onclick=function(event){
		 var pat=new RegExp("[0-9]");
		 var num=event.target.id;
		 if(pat.test(num)){
		 array.splice(num,1);
		 
		 rend(array,container);}
		 
		 
		 }
	 }
	 
//绑定提示删除函数
var ctext="";
function addDeleteTip(classname){
	
	var aclass=document.getElementsByClassName(classname);
	
	for(var e in aclass){
		aclass[e].onmouseover=function(event){
			
			ctext=event.target.innerHTML;
			console.log(ctext);
			event.target.innerHTML="删除？";
			
			}
			
			
		aclass[e].onmouseout=function(event){
		event.target.innerHTML=ctext;
		 console.log(ctext);}
		}
	
	console.log(ctext);
	}	 
 
 
 function sear(s){
	 id("down").innerHTML=data.map(function(str){
		 var d ;
		 
		 d=str.replace(new RegExp(s),"<span class='select'>"+s+"</span>");
		 console.log(s);
			 console.log(d); 
		 return "<div class='innerdiv'>"+d+"</div>";
		 
		 
		 }).join("");
	 
	 
	 
	 }
 
 
 
/*id("search").onclick=function(){
	
	 sear(gettext());
	
	}*/
	
	//去重函数
Array.prototype.unique=function(){
	
	var a=[];
	
		
	for(var i=0;i<this.length;i++){
		
		
		if(a.indexOf(this[i])==-1) a.push(this[i]);
		
		
		
		}	
	
		return a;	
	
	
	}
	


function gettext(aid){return id(aid).value;
	}
	
	
	
//函数，把textarea的字符串转换为数组	

function tran(str){
	var pattern4=new RegExp("[,\ ，.、\r]")

	var ar=str.split(pattern4);
	 for(var s in ar){
	console.log(ar[s]);
	
	};
	ar=ar.unique();
	
	for(var s in ar){
	console.log(ar[s]);
	}
	
	return ar;
	}

//绑定确认爱好按钮

id("abutton").onclick=function(){
	
	var array=tran(gettext("inputtextarea"));
	
	for(var s in array){
	console.log(array[s]);
	}
	
	rend(array,id("dcontent"));
	dele(array,id('dcontent'));
	}
	
	
	
//去除重复数组中的重复元素



