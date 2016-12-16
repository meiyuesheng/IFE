

var TableSort = (function() {


	// 构造函数
  function TableSort(head,data,sortFun) {
    	this.head = head;
    	this.data = data;
    	this.sortFun = sortFun;
        this.table = document.getElementsByClassName('tablesort')[0];
     
		this.init();
	};
    

    TableSort.prototype = {
        
        init: function() {
            // 加入表头信息
            console.log('初始化');
            
            this.data = addTP(this.data);

        	includeLinkStyle("tableSort.css");

        	this.render();
        	console.log(this.data);

        	

        	var me=this;
        	var  hander = function (event) {
        	
        		var order = this.dataset.order;
 				var item =me.findOrder(this.dataset.item);
 				console.log("item:"+item);
 				if (order === 'up'){
 					me.data.sort(sortUp);
 				}
 				else{
 					me.data.sort(sortDesc);
 				}

 				me.render();

 				function sortUp(a,b){
 						return a[item] - b[item];
 					}

 				function sortDesc(a,b) {
 					return b[item] - a[item];
 				}
      		 };


      		 addListener(hander);
             console.log("offsetParent:");
             console.log(this.table.offsetParent);

             console.log(getOffset(this.table));
             this.offset = getOffset(this.table);
             this.freezeHead.style.left = this.offset.offsetLeft+'px';


             // 绑定冻结表格的滚动事件

             window.onscroll = function (event) {
                console.log("触发");
                var scrollTop = document.documentElement.scrollTop;

                if (scrollTop >= me.offset.offsetTop){
                    me.freezeHead.style.display = 'table';
                }
                else{
                    me.freezeHead.style.display = 'none';
                }

                if (scrollTop >= (me.offset.offsetTop + me.table.offsetHeight)) {
                    me.freezeHead.style.display = 'none';
                }

             }

        },

        render: function () {

        	if (this.table.getElementsByTagName('thead').length==0){
	        	console.log(this.data);
	        	var head = '<thead><tr><th>' + this.head[0] + '</th>';
	            var headLength = this.head.length;
	            for (var k = 1;k < headLength;k++) {
	            	head += '<th>' + this.head[k] +'<span><i class="fa fa-sort-up up"  data-order="up" data-item=' + this.head[k] + '></i><i class="fa fa-sort-desc desc"  data-order="desc" data-item=' + this.head[k] + '></i></span>' + '</th>';
	            }
	            head += '</tr></thead>';
	            this.table.innerHTML += head;
                this.freezeHead = document.createElement('table');
                this.freezeHead.innerHTML = head;
                this.freezeHead.className = 'freezeHead';
                this.freezeHead.style.display = 'none';
                document.body.appendChild(this.freezeHead);

        	}

        	var tbody;
        	if (this.table.getElementsByTagName('tbody').length!==0){
        		 tbody = this.table.getElementsByTagName('tbody')[0];
        		this.table.removeChild(tbody);
        	}
        	
        		tbody = document.createElement('tbody');
        	
        		console.log(tbody);
        	var length = this.data[0].length;
        	var dataLength = data.length;
        	
        	var html='';
        	for (var i = 0; i < dataLength; i++) {
        		html += '<tr>'

        		for (var j = 0; j < length; j++) {
        			html += '<td>' + data[i][j] + '</td>';
        		}
        		html += '</tr>';
        	}	
        		html += '</tbody>';

        	tbody.innerHTML += html;

        	this.table.appendChild(tbody);

        },
      

        findOrder: function (item) {
        	console.log(item);
        	var head = this.head;
        	console.log(head.length);
        	var length = head.length;
        	var rel = NaN;
        	while(length--){
        		console.log(length);
        		if (item === head[length]) {
        			rel = length;
        			return rel;
        		}
        		
        		
        	}

        	return rel;
        },

       



    }

    function getOffset(element) {

    var o={};

        o.offsetLeft = element.offsetLeft;
        o.offsetTop = element.offsetTop;

        var current = element.offsetParent;
        console.log(o);
        while (current !== null) {
            console.log(current);
            console.log(current.offsetLeft);
            o.offsetTop += current.offsetTop;
            o.offsetLeft += current.offsetLeft;
            current = current.offsetParent;
        }


        return o;
}
 	
 	function addListener(hander) {
 		var ele = document.getElementsByTagName('i');

 		for (var i = 0,length = ele.length; i < length; i++) {
 			ele[i].addEventListener('click',hander,false);
 		}

 		

 	}

 	

    function addTP(data) {
    	var sum;
    	var keys;
    	for (var i = 0; i < data.length; i++) {
    		sum = 0;
    		keys = data[i];
    		for (var j = 1; j < keys.length; j++) {
    			sum += keys[j];
    		}
    		data[i].push(sum);
    	}

    	return data;
    }


    function includeLinkStyle(url) {
    	console.log('引入link');
    	var link = document.createElement('link');
    	link.rel = "stylesheet";
    	link.type = "text/css";
    	link.href = url;
    	document.getElementsByTagName("head")[0].appendChild(link);
    }

    function test() {
    	console.log('test');
    }
	return TableSort;

	})();


