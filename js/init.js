var cx, cx_top, random, 
	play = false, 

	strokWidth = 		0.2,
	strokWidthMax = 	20,
	strokWidthMin = 	0.1,
	strokOpacity = 	0.5,
	strokOpacityMax = 1,
	strokOpacityMin = 0.1,

	neigberBoxSize =  20;

	Axis = {x: true, y: true };



function initPage(){

	cx = 		new Canvas( 'myCanvas', window.innerWidth, window.innerHeight ),
	cx_top = new Canvas( 'myCanvas_top', window.innerWidth, window.innerHeight, {stop: 'click', play: 'mousemove'}),
	random = new Random();

	var animationProp = { gravity: 0.4, dampening: .2, radius : 2, numberOfPointers: 20 }; 
	var pointers = new Pointers( animationProp );

	function draw(){
		//clear the canvas
		cx.clearCanvas();
		// go through all the pointers and update position ( each )
		pointers.update();

		// next frame > callback
		if( !play )
			pointers.slowDownToStop();

		requestAnimFrame(draw);
	}

	//Keyboard handler
   document.addEventListener("keydown", keydown, false);

	// Start animation
	draw();
};


function keydown(e){


	console.log( e.keyCode )
	function updateStatus( text, value ){

		var span = document.getElementById('status');
			span.innerText = text + ' : ' + value;
			console.log( span );
	}

		switch( e.keyCode ) {
			//axis x toggle
			case 88:
				Axis.x = !Axis.x;
				// updateStatus( 'x', Axis.x );	
				break;
			//axis y toggle
			case 89:
			case 91:
				Axis.y = !Axis.y;
				// updateStatus( 'y', Axis.y );
				break;

			//A > strokWidth++
			case 65:
					strokWidth += strokWidth < strokWidthMax ? 0.1:0;
					// updateStatus( 'strokWidth', strokWidth );
				break;

			//Z > strokWidth--
			case 90:
					strokWidth -= strokWidth > strokWidthMin ? 0.1:0;
					// updateStatus( 'strokWidth', strokWidth );
				break;

			//up > opacity++
			case 38:
					strokOpacity += strokOpacity < strokOpacityMax ? 0.1:0;
					// updateStatus( 'strokOpacity', strokOpacity );
				break;

			//down > opacity--
			case 40:
					strokOpacity -= strokOpacity > strokOpacityMin ? 0.1:0;
					// updateStatus( 'strokOpacity', strokOpacity );
				break;


		}



}
