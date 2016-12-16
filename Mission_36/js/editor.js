var Editor = (function() {


	//定义一editor的构造函数

	var Editor = function() {
		//初始化相关属性
		this.editor = $("editor");
		this.commandline = $(".commandline");
		this.commandtext = $(".commandtext");
		this.linenum = null;
		this.commandcode = [];
		this.command = [];

		this.init();
	}


	Editor.prototype = {
			//定义初始化方法

			init: function() {

				var me = this;

				console.log("edi 初始化");
				//me.commandtext.val("");
				







	me.commandtext.val("go\ngo 3\nturn lef\nturn bac\ntra up\ntra down 3\ntra up 3\nmov rig\nmov rig 5\nmov lef 3\nturn bac\nmov to 19,12")
				me.commandtext.on("input", function() {
					me.getcommand();
				});

				//监听滚动事件，让行号能随着滚动条滚动；


				me.commandtext.on("scroll", function() {
					console.log("scroll");
					console.log("top" + me.commandtext.scrollTop());
					var top = -(me.commandtext.scrollTop()) + "px";
					me.commandline.css('top', top);

				})

				me.getcommand();
			},

			getcommand: function() {

				var me = this;
				var command = [];

				var reg = /\n/;
				command = me.commandtext.val().split(reg);


				me.command = $.trim(me.commandtext.val()).split(reg);

				console.log("me.command: " + me.command);

				var line = command.length;
				me.linenum = line;
				me.commandcode = command;
				me.updateline();

				console.log(command);

				//me.trimCommand();


			},


			//更新行号

			updateline: function() {
					var me = this;

					var html = "";

					for (var i = 0; i < me.commandcode.length; i++) {
						html += "<div class='linenumber'>" + (i + 1) + "</div>";
					}

					me.commandline.html(html);
				} // },


			// trimCommand:function () {
			// 	var me=this;
			// 	var command=me.commandcode;
			// 	console.log("zheshi command: "+command);
			// 	console.log("me.commandcode: "+me.commandcode);
			// 	var newcommand=[];
			// 	for (var i = 0; i < command.length; i++) {
			// 		console.log("trim: "+$.trim(command[i]));
			// 		newcommand[i]=$.trim(command[i]);
			// 	}

			// 	me.command=newcommand;
			// 	console.log(me.command);
			// }



		} //editorprototype;


	Array.prototype.clean = function(value) {
		var arr = this;

		for (var i = 0; i < arr.length; i++) {

			if (arr[i] == value) {
				arr.splice(i, 1);
				i--;
			}
		}

		console.log(arr);
		return arr;
	}



	return Editor;
})();