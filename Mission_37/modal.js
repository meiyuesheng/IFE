


 
var Modal = (function () {

	
    function Modal(argument) {
		// 参数需要 模态框，
        this.body = document.body;
        this.modal = document.getElementsByClassName('modal')[0];
        this.modalHead = document.getElementsByClassName('modalHead')[0];
        this.modalContent = document.getElementsByClassName('modalContent')[0];
        this.modalFoot = document.getElementsByClassName('modalFoot')[0];
        this.trigger = document.getElementsByClassName('triggerModal')[0];
        this.confirEle = document.getElementById('confir');
        this.concleEle = document.getElementById('concle');
        this.visible = false;

        this.init();
    }	

    Modal.prototype.init = function () {
	    var me = this;
	    me.styleInit();

    }
    Modal.prototype.styleInit = function () {
	    var me = this;

	    me.maskEle = document.createElement('div');

	    me.maskEle.style.width = window.screen.width+'px';
	    me.maskEle.style.height = window.screen.height+'px';
	    me.maskEle.style.background = 'rgba(108,108,108,0.7)';
	    me.maskEle.style.position = "fixed";
	    me.maskEle.style.left = 0;
	    me.maskEle.style.top = 0;
	    me.maskEle.style.visibility = me.visible?'visible':'hidden';
	    me.body.appendChild(me.maskEle);
	    console.log("样式初始化");
	// 弹出框样式设定
	    me.modal.style.minWidth = "300px";
	    me.modal.style.minHeight = "400px";
	    me.modal.style.background = "white";
	    me.modal.style.borderRadius = "5px";
	    //me.modal.style.padding="5px";
	    me.modal.style.position = "fixed";
	    me.modal.style.left = "50%";
	    me.modal.style.top = "50%";
	    me.modal.style.transform = "translate(-50%,-50%)";
	    me.modal.style.zIndex = '99';
	    me.modal.style.visibility = me.visible?'visible':'hidden';


	//me.modalHead.style.height="20%";
	//me.modalContent.style.height="70%";
	//me.modalFoot.style.height="10%";
	// 居中
	
	    me.closeEle = document.createElement('a');

        me.maskEle.onclick = function () {

		console.log("触发事件");
		me.hide();
	}

	me.trigger.onclick = function () {
		
		me.show();
	}


	me.concleEle.onclick = function () {
		me.hide();
	}
	me.confirEle.onclick = function () {
		me.hide();
	}


	// 绑定移动


	me.modalHead.onmousedown = function (event) {
		
		console.log("调用mousedown");
		var mpos=me.getMousePos(event);
		console.log(pos);
        var pos={};
		pos.x=mpos.x-me.modal.offsetLeft;
		pos.y=mpos.y-me.modal.offsetTop;


		document.onmousemove=function (event) {
			
			console.log("调用mous移动");
		//	console.log(me);
		console.log(event);
			var currentPos=me.getMousePos(event);
			//var currentPos={};
			//currentPos.x=event.clientX;
			//	currentPos.y=event.clientY;
				console.log(currentPos);
				var cx=currentPos.x-pos.x;
				var cy=currentPos.y-pos.y;
				console.log(me.modal.offsetLeft);
			// me.modal.style.left=me.modal.offsetLeft+cx+'px';
			// me.modal.style.top=me.modal.offsetTop+cy+'px';
			me.modal.style.left=cx+'px';
			me.modal.style.top=cy+'px';
			console.log(cx+'px');
			console.log(me.modal.style.left);
		}


	// console.log("调用mousedown");
	// 	var pos=me.getMousePos(event);
	// 	console.log(pos);
	


	// 	document.onmousemove=function (event) {
			
	// 		console.log("调用mous移动");
	// 	//	console.log(me);
	// 	console.log(event);
	// 		var currentPos=me.getMousePos(event);
	// 		//var currentPos={};
	// 		//currentPos.x=event.clientX;
	// 	//	currentPos.y=event.clientY;
	// 			console.log(currentPos);
	// 		var cx=currentPos.x-pos.x;
	// 		var cy=currentPos.y-pos.y;
	// 		console.log(me.modal.offsetLeft);
	// 		 me.modal.style.left=me.modal.offsetLeft+cx+'px';
	// 		 me.modal.style.top=me.modal.offsetTop+cy+'px';
	// 		pos=currentPos;
	// 		// me.modal.style.left=cx+'px';
	// 		// me.modal.style.top=cy+'px';
	// 		console.log(cx+'px');
	// 		console.log(me.modal.style.left);
	// 	}

	}

	me.modalHead.onmouseup = function (event) {
		document.onmousemove = null;
	}
}


Modal.prototype.getMousePos = function (event) {

	var e = event || window.event;

	return {'x':e.clientX,'y':e.clientY};
}

Modal.prototype.hide = function () {
	var me = this;
		me.visible = false;
		me.maskEle.style.visibility = 'hidden';
		me.modal.style.visibility = 'hidden';
}

Modal.prototype.show = function () {
	var me = this;
	me.visible = true;
	me.maskEle.style.visibility = 'visible';
	me.modal.style.visibility = 'visible';

}



return Modal;
})();
