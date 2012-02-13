$(document).ready(function(){
	window.requestAnimFrame = (function(callback){
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			window.setTimeout(callback, 5000 / 60);
		}
	})();
	
	window.cancelRequestAnimFrame = (function(){
		return window.cancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		clearTimeout
	})();

	$(window).load(function(){
		var rectObj = {
			x: 290,
			y: 50,
			width: 350,
			height: 50,
			borderWidth: 2
		};
		
		//var message = ["Hello!", "Happy", "Hearts", "day", "to", "us!"];
		//var message = "us! to day Hearts Happy Hello!";
		var message = "Hello! I know you don't like baduy but..."
		
		var date = new Date();
		var time = date.getTime();
		var request;
		var animObj = {
			animate: true
		};
			
		animate(time, rectObj, message, animObj.animate);
		setTimeout(function(){
			animObj.animate = false;
			console.log("now!");
			cancelRequestAnimFrame(request);
			drawHeart();
		}, 30000);
	});

	function animate(lastTime, rectObj, text, play){
		var cvs = document.getElementById("drawingBoard");
		var ctx = cvs.getContext("2d");
		
		var date = new Date();
		var time = date.getTime();
		var timeDiff = time - lastTime;
		var linearSpeed = 100;
		var linearDistEachFrame = linearSpeed * timeDiff / 5000;
		var curX = rectObj.x;
		
		//if(curX < cvs.width - rectObj.width - rectObj.borderWidth / 2){
		if(cvs.width + (rectObj.borderWidth - 5) > curX && play){
			var newX = curX - linearDistEachFrame;
			rectObj.x = newX;
		}
		lastTime = time;
		
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		
		ctx.font = "bold 20pt 'Bad Script', cursive";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.strokeStyle = "#382D2C";
		ctx.fillStyle = "#FF0000"; // text color
		//ctx.fillRect(rectObj.x - 10, rectObj.y - 10, rectObj.width, rectObj.height); // this is a rectangle
		ctx.fillText(text, rectObj.x + (rectObj.width / 2), rectObj.y + (rectObj.height / 2));
		ctx.strokeText(text, rectObj.x + (rectObj.width / 2), rectObj.y + (rectObj.height / 2));
		
		requestAnimFrame(function(){
			request = animate(lastTime, rectObj, text, play);
		});
	}

	function drawHeart(){
		var cvs = document.getElementById("drawingBoard");
		var ctx = cvs.getContext("2d");
		
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		
		ctx.beginPath();
		ctx.lineCap = "round";
		ctx.strokeStyle = "#800517";
		ctx.fillStyle = "#FF0000";
		ctx.moveTo(100, 70);
		ctx.quadraticCurveTo(100, 105, 150, 130);
		ctx.quadraticCurveTo(200, 105, 200, 70);
		ctx.quadraticCurveTo(190, 30, 150, 70);
		ctx.quadraticCurveTo(110, 30, 100, 70);
		ctx.stroke();
		ctx.fill();
			
		ctx.font = "bold 10pt 'Bad Script', cursive";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#FF0000"; // text color
		ctx.fillText("Happy Hearts Day!", 150, 30);
		ctx.strokeText("Happy Hearts Day!", 150, 30);
		
		requestAnimFrame(function(){
				drawHeart();
		});
	}
});