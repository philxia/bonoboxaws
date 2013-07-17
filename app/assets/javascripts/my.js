var UILayout = function(){
	
	function _anchor_verticalhandler()
	{
		var leftwidth = $("#leftcontent").width();
		var rightwidth = $("#rightcontent").width();
		var handlerleft = $("#handler_vertical").offset().left;
		var deltaleft = handlerleft - $("#leftcontent").offset().left - $("#leftcontent").width();
		
		$("#leftcontent").css("width", leftwidth + deltaleft-2);
		$("#rightcontent").css("width", rightwidth - deltaleft+2 )
			.css("left", handlerleft + $("#handler_vertical").width() - $("#sidebar").width()-2);

		// resize the blocky frame.
		$("#blocky_frame").css("width", rightwidth - deltaleft-12);
	}

	function _window_resize_handler()
	{
		var winHeight = this.innerHeight;
		var mainboxWidth = this.innerWidth - $("#sidebar").width() - 5;
		$("#sidebar").height(winHeight - 100);

		// update the div size.
		$("#mainbox").css("width", mainboxWidth);
		$("#mainbox").css("height", winHeight-105);	
		$("#leftcontent").css("width", mainboxWidth/2 - 4);

		var innerdivheight = $("#leftcontent").height();
		var innerdivwidth = $("#leftcontent")[0].offsetWidth;
		var rightcontentleft = innerdivwidth;
		$("#handler_vertical").css("height", innerdivheight).css("left", rightcontentleft);
		$("#rightcontent").css("width", mainboxWidth - rightcontentleft - 12)
			.css("height", innerdivheight)
			.css("left", rightcontentleft+8);

		// resize the blocky frame.
		$("#blocky_frame").css("width", mainboxWidth - rightcontentleft - 30)
		    .css("height", innerdivheight - 20);

		$("#footer").css("top", winHeight - 50);
	}
		 

	function Initialize()
	{
		// initialize the layout.
		_window_resize_handler();

		// register the window resize event.
		$(window).resize(function(arg){
			_window_resize_handler();
		});

		// register the handler the move handler.
		$("#handler_vertical").draggable({
			axis:"x",
			drag: function(arg) {
				_anchor_verticalhandler();

				// suppress the mouse events for the right frame.
				// if(Blockly != null)
				// {
				// 	//Blockly.noEvent();
				// }
			},
			stop: function(arg) {
				_anchor_verticalhandler();

				// restores the mouse events for the right frame.
				// if(Blockly != null)
				// {
				// 	//Blockly.noEvent();
				// }
			}
		});
	}

	return {
		Initialize : function() {
			Initialize();
		}
	};
}();