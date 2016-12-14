

var Calendar = (function() {
	
	// 构造函数
	var Calendar = function(option) {
		
		this.timeBucket = option['range'];
		this.calendar = null;
		this.datePicker = $(document.getElementsByClassName(option.datePicker)[0]);
		this.firstSelect = null;
		this.secondSelect = null;
		this.init();
	}


	Calendar.prototype = {

		init: function() {
			this.date = new Date();
			this.renderHead();
			this.renderBody();
			this.calendar.style.display = 'none';
			addLink('calendar.css');
			
			var me = this;

			this.datePicker.addClass('datePicker')
			// 用一个input接口显示或隐藏日历组件

			$(this.datePicker).attr('placeholder','点击选择日期');

			// this.datePicker.focusin(function (event) {
			
			// 	me.calendar.style.display = 'table';
			// })
			

			this.datePicker.on('mouseup',function (event) {
				me.calendar.style.display = 'table';
			})

			

			$(this.calendar).on('mousedown',function (event) {
				
				event.stopPropagation();
			})

			$(window).on('mousedown',function () {
				me.calendar.style.display = 'none';
			})


			// 确认按钮添加事件
			$(this.calendar).find('.calendarConfirm').on('click',function (event) {
		
				var selec;
				if (me.timeBucket) {
					if (me.firstSelect == null || me.secondSelect == null) {
						window.alert('请选择日期');
						return;
					}
					selec = me.firstSelect.toLocaleDateString()+"——"+me.secondSelect.toLocaleDateString();
				}
				else{
					if (me.firstSelect == null) {
						window.alert('请选择日期');
						return;
					}

					selec = me.firstSelect.toLocaleDateString();
				}
				 
				
				me.datePicker.val(selec);
				me.calendar.style.display = 'none';
			});


			$(this.calendar).find('.calendarCancel').on('click',function (event) {
				console.log('取消');
				var selec;
				me.datePicker.val('');
				me.firstSelect = null;
				me.secondSelect = null;
				console.log(me.firstSelect);
				me.calendar.style.display = 'none';
				me.renderBody();
			})


			$(this.calendar).find('#nextMonth').on('click',function (event) {
					
				me.date.setMonth(me.date.getMonth()+1);
				
				me.renderBody();
			})

			
			$(this.calendar).find('#lastMonth').on('click',function (event) {
				me.date.setMonth(me.date.getMonth()-1);

				me.renderBody();
			})


			var lastyear = this.calendar.getElementsByClassName('lastYear')[0];
			lastyear.onclick = function (event) {
				me.date.setFullYear(me.date.getFullYear()-1);
				me.renderBody();
			}

			var nextyear = this.calendar.getElementsByClassName('nextYear')[0];
			nextyear.onclick = function (event) {
				me.date.setFullYear(me.date.getFullYear()+1);
				me.renderBody();
			}


		},

		renderHead: function () {

			var calendar = document.createElement('table');
			this.calendar = calendar;
			this.table = calendar;
			calendar.className = 'calendar';

			var tableTop = this.datePicker.offset().top + this.datePicker.height() + 20 + 'px';
			var tableLeft = this.datePicker.offset().left +'px';
			// 设置table的位置
			$(this.table).css({
				'position': 'absolute',
				'left': tableLeft,
				'top': tableTop
			})
			

			var thead = '<thead class="head">';
			thead += '<tr><th><span class="glyphicon glyphicon-arrow-left " id="lastMonth"></span></th>'
			+ '<th class="month" colspan="2"><span class="headMonth"><span class="contentmonth"></span><i class="glyphicon glyphicon-chevron-up lastMonth"></i><i class="nextMonth glyphicon glyphicon-chevron-down"></i></span></th>'
			+ '<th class="year" colspan="2"><span class="headYear"><span class="contentyear"></span><i class="glyphicon glyphicon-chevron-up lastYear"></i><i class="nextYear glyphicon glyphicon-chevron-down"></i></span></th>'  
			+ '<th><span class=" glyphicon glyphicon-arrow-right" id="nextMonth"></span></th></tr>'
			 + '<tr><th class="weekday">Su</th><th class="weekday">Mo</th><th class="weekday">Tu</spqn><th class="weekday">We</th><th class="weekday">Th</th><th class="weekday">Fr</th><th class="weekday">Sa</th></tr>';

			thead += '</thead><tbody></tbody>';

			calendar.innerHTML += thead;
		
			document.body.appendChild(calendar);

			
			this.updateHead('Jan',this.date.getFullYear());


			var tfoot = document.createElement('tfoot');

			var footinner = '<td colspan="3"><button class="calendarConfirm">确认</button></td><td colspan="3"><button class="calendarCancel">取消</button></td>'
			tfoot.innerHTML = footinner;
			this.calendar.appendChild(tfoot);
		},
		renderBody: function() {


			// 获取当前日历页面开始的日期。
			this.date.setDate(1);
			var date = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate());
			
			console.log("date为:"+date);
			var adate = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate());
			console.log("adate为："+adate);
			console.log(date == this.firstSelect)
			// 获取星期，设置渲染的开始日期。
			if(this.date.getDay() !== 0){
				var num = (-this.date.getDay()) + 1;
				date.setDate(num);
			}
		 
			// 设置表头信息

			this.updateHead(getMonthText(this.date),this.date.getFullYear());

			var html='';
			var td='';
			for(var i = 0;i < 6;i++){
				html += '<tr>'
				for (var j = 0;j < 7;j++){

					var aclass=getTdClass(date,this.date);

					// 检查是否有事先标记好的日期。
					if(this.compareDate(date,this.firstSelect)==0||this.compareDate(date,this.secondSelect)==0){
						aclass +=" active";
						console.log('添加active');
						console.log(typeof aclass);
						console.log(aclass);
					}

					if (this.firstSelect&&this.secondSelect) {
						console.log("进入select");

						if ((this.firstSelect<date) && (date<this.secondSelect)) {
							aclass += ' selectedDate';
						}
					}
					else{
						console.log('没有进入');
					}

					td = '<td class="'+aclass+'">'+date.getDate()+'</td>';
					html +=td;
					date.setDate(date.getDate()+1);

				}
				html += '</tr>';
			};
				html += '';
			
		var tbody = this.calendar.getElementsByTagName('tbody')[0];
		tbody.innerHTML = html;

		var thisMD = this.calendar.getElementsByClassName('thisMonthDate');
		var me = this;
				for(var k = 0,length = thisMD.length;k < length;k++) {
					thisMD[k].onclick = function (event) {
					me.setSelectedDate(parseInt(this.innerHTML),me.date.getMonth());
					me.datePicker.val(me.firstSelect.toLocaleDateString());
					me.renderBody();
				}
				
			}


			var lastMD = $(this.calendar).find('.lastMonthDate');
			 lastMD.click(function (event) {
			 	me.setSelectedDate(parseInt(this.innerHTML),me.date.getMonth()-1);
				me.date.setMonth(me.date.getMonth() - 1);
				me.renderBody();
				me.datePicker.val(me.firstSelect.toLocaleDateString());
			})


			 //给下个月的日期添加事件
			 $(this.calendar).find('.nextMonthDate').click(function () {
			 	console.log('chufa');
			 	me.setSelectedDate(parseInt(this.innerHTML),me.date.getMonth()+1)
			 	
					me.date.setMonth(me.date.getMonth() + 1);
					
					me.renderBody();
			 })

		},
		setSelectedDate: function (day,month) {
			var me = this;
			var selected = new Date(me.date.getFullYear(),month,parseInt(day));
					
					if(me.timeBucket){

						if(me.firstSelect == null){
							me.firstSelect = selected;
						}
						else{
							
							if(me.secondSelect == null){
								if (me.firstSelect > selected) {
									me.secondSelect = me.firstSelect;
									me.firstSelect = selected;
								}
								else{
								me.secondSelect = selected;
								}
							}
							else{
								if (me.firstSelect>selected) {
									me.firstSelect = selected;
								}
								else if(me.secondSelect<selected){
									me.secondSelect = selected;
								}
								else{
									console.log("进入中间选择");
									if((selected - me.firstSelect) > (me.secondSelect - selected)){
											me.secondSelect = selected;
									}
									else {
										me.firstSelect = selected; 
									}
								}
							}
							
						}

						
					}
					else{
					me.firstSelect = selected;
				}
					
		},
		compareDate: function (a,b) {
			if ((!a)||(!b)) {
				return;
			}
			if (a.getFullYear() == b.getFullYear()
				&& a.getMonth() == b.getMonth()
				&& a.getDate() == b.getDate()) {
				return 0;
			}
			else if (a > b){
				return 1;
			}
			else if (a < b) {
				return -1;
			}
		},
		updateHead: function (month,year) {
		var monthele = this.calendar.getElementsByClassName('contentmonth')[0];
			monthele.innerHTML = month;
			
			var yearele = this.calendar.getElementsByClassName('contentyear')[0];
			yearele.innerHTML = year;
	}



	}


	// 下面是私有方法

	

	function isSelected(date,selected) {
		if(selected&&
			date.getFullYear() === selected.getFullYear()
			&& date.getMonth() === selected.getMonth()
			&& date.getDate() === selected.getDate()) {
			return true;
		}
		else {
			return false;
		}
	}

	
	function getMonthText(date) {
		var arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
		return arr[date.getMonth()];
	}

	function getTdClass(date,thisdate) {
		if(date.getFullYear()>thisdate.getFullYear()){
			return 'nextMonthDate';
		}
		else if(date.getFullYear()<thisdate.getFullYear()){
			return 'lastMonthDate';
		}

		var num = thisdate.getMonth() - date.getMonth();
		if(num > 0){
			return 'lastMonthDate';
		}
		else if(num == 0){
			return 'thisMonthDate';
		}
		else if(num < 0){
			return 'nextMonthDate';
		}
	}

	function addLink(href) {
		var link = document.createElement('link');
		link.href = href;
		link.type = 'text/css';
		link.rel = 'stylesheet';
		document.head.appendChild(link);
	}




	return Calendar;

})();