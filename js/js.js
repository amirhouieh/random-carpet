var cx, random;

function initPage(){


  var physicAttr = {
                    gravity: 0.1,
                    dampening: 0.99,
                    pullStrength: 0.01,
                    numpoiners: 10,
                    repulsion: 1
                  }

  var numpoiners = 10;
  var pointers = new Pointers( physicAttr, numpoiners );


  cx = new Canvas( 'myCanvas' ),
  random = new Random();

  function executeFrame(){
    cx.clearCanvas();

    var poiner;
    for(i = 0; i < pointers.number; i++){
      poiner = pointers.stack[i];
      poiner.update();

      // reDraw each poiner
      cx.drawCircle({
                    X:    poiner.x,
                    Y:    poiner.y,
                    R: poiner.radius,
                    fill: random.rgb()
                  });
    }

    // next frame
    requestAnimFrame(executeFrame);
  }



  // Start animation
  executeFrame();

};