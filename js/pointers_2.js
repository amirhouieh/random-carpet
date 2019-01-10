function Pointers( props ){
  var pointers = this;

  this.stack = [];
  this.physics = {};
  this.number = props.numberOfPointers;
  this.colWidth = cx.width / props.numberOfPointers;
    
  function Pointer( pointerIndex ){

    //Initialize
    this.x= ( pointers.colWidth * pointerIndex + pointers.physics.radius ) + pointers.colWidth / 2 ;
    this.y= 0;
    // (vx= vy) = Velocity
    this.vx= 0;
    this.vy= 0;
    this.radius= pointers.physics.radius;
    this.physics = {};
    this.index = pointerIndex;

    for( var x in pointers.physics )
      this.physics[ x ] = pointers.physics[x];


    //Methods
    this.updatePosition = function(){


      for( var xOry in Axis ){

        if( Axis[ xOry ] ){

          var side = xOry == 'x'? 'width':'height';

          //update velocity by random number;
          this.physics.gravity = Math.randRange( 0, .05 );

          // Increment location by velocity
          this[ xOry ] += this[ 'v'+xOry ];

          // Increment pointers.physics.Gravity
          this[ 'v'+xOry ] += this.physics.gravity;

          //bottum
          if(this[ xOry ] + this.radius > cx[ side ])
            this[ 'v'+xOry ] = -Math.abs( this[ 'v'+xOry ] );
          // top
          if(this[ xOry ] - this.radius < 0)
            this[ 'v'+xOry ] = Math.abs( this[ 'v'+xOry ] );
        }
      }
    }

    this.slowDownToStop = function(){
      // Slow it down
      this.vy *= this.physics.dampening;
      this.vx *= this.physics.dampening;   
    }

    this.hasMatch = function(){

      var that = pointers.stack.slice();
      that.splice( this.index , 1);
      var match = false;
      var i = 0, state= true;

      while( state ){
        var dy = Math.floor( Math.abs( this.y - that[ i ].y ) )

        if(   dy < neigberBoxSize && dy > 0   ){
          match = that[ i ];
          state = false;
        }
        else if( i < that.length - 1 )
            i++;
        else
            state = false;

      }

      return match;
    }

  }


  for( var prop in props )
    this.physics[ prop ] = props[ prop ];


  // Initialize the array of circle objects
  for(var i = 0; i < props.numberOfPointers; i++)
    this.stack.push( new Pointer( i ) );


  console.log( pointers )

}

Pointers.prototype.update = function() {

    var pairs = [];

    this.stack.forEach(function(pointer){

      pointer.updatePosition();

      // reDraw each pointer
      cx.drawCircle({
                    X:    pointer.x,
                    Y:    pointer.y,
                    R:    pointer.radius,
                    fill: random.rgb( 1 )
                  });

      var match = pointer.hasMatch();

      if( match ){
        // console.log( match );
        // console.log( pointer );
        // console.log( '' );
        cx_top.drawLine( { 
                  startX:   pointer.x,
                  startY:   pointer.y,
                  endX:     match.x,
                  endY:     match.y,
                  color:    random.rgb( strokOpacity ),
                  width:    strokWidth,
                });
      }

    });

}


Pointers.prototype.slowDownToStop = function() {
    this.stack.forEach(function(pointer){
      pointer.slowDownToStop();
    });
};

