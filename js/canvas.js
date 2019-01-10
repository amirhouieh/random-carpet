
Math.prototype=Math;

Math.prototype.randRange=function(min,max){
  return Math.floor(( Math.random() * (max-min+1))+min)
}

Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
  return Math.floor( ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min );
}

Number.prototype.toGray = function () {
	return "rgba(" + this + ", " + this + ", " + this + ", " + 1 + ")";
}


var Random = function() {

	this.rgb = function(_A){
					var _R = Math.randRange( 0, 255 ),
						 _G = Math.randRange( 0, 255 ),
						 _B = Math.randRange( 0, 255 );

						return "rgba(" + _R + ", " + _G + ", " + _B + ", " + _A + ")";
					}

	this.gray = function(_A){
					var _G = Math.randRange( 0, 255 );

						return "rgba(" + _G + ", " + _G + ", " + _G + ", " + _A + ")";
					}

	this.gradient = function(x,y,size,ctx){
			var my_gradient=ctx.createLinearGradient(x,y,x+size, y+size,0);
			my_gradient.addColorStop(0,"black");
			my_gradient.addColorStop(0.1,"red");
			my_gradient.addColorStop(0,"white");

			return my_gradient;
	}

}


function Canvas( id, width, height, actions ){
	this.id = id;

	var canvasElem = document.createElement('canvas');



	canvasElem.id = id;
	canvasElem.width = width - 30;
	canvasElem.height = height - 30;



	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvasElem);


	if( actions ){
		if( actions.hasOwnProperty('stop') )
			canvasElem.addEventListener( actions.stop , function(){ play = false; });

		if( actions.hasOwnProperty('play') )
			canvasElem.addEventListener( actions.play , function(){ if(!play) play = true;});

	}



	this.cx = document.getElementById( id ).getContext('2d');
	this.width = this.cx.canvas.width;
	this.height = this.cx.canvas.height;
}




Canvas.prototype.drawCircle = function( options ) {

	this.cx.beginPath();
	this.cx.arc( options.X ,options.Y, options.R, 0 ,2*Math.PI );
	this.cx.closePath();
	this.cx.fillStyle = options.fill;
	if( options.fill )
		this.cx.fill();

	if( options.stroke ) 	this.cx.stroke();
};

Canvas.prototype.drawCircle = function( options ) {

	this.cx.beginPath();
	this.cx.arc( options.X ,options.Y, options.R, 0 , Math.PI );
	this.cx.fillStyle = options.fill;
	if( options.fill )
		this.cx.fill();

	if( options.stroke ) 	this.cx.stroke();
};


Canvas.prototype.drawLine = function( options ) {

	this.cx.beginPath();	
	this.cx.moveTo( options.startX, options.startY );
	this.cx.lineTo( options.endX, options.endY );
	this.cx.strokeStyle = options.color;
	this.cx.lineWidth = options.width;

	this.cx.stroke();

};



Canvas.prototype.clearCanvas = function() {
	this.cx.clearRect(0,0, this.width, this.height);
};


									   
