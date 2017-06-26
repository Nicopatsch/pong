

var move = false;
var posx = 40;
var posy = 20;
var step = 1;
var speed = 5;
var size = 20;
var alpha = Math.PI/6; //Toujours de 0 à 2.pi
var stepx = Math.cos(alpha)*step;
var stepy = Math.sin(alpha)*step;
var barsize = 150;

var UP1 = 81;//'Q'
var DOWN1 = 87;//'W'
var UP2 = 77;//'M'
var DOWN2 = 186;//':'


var Key = {
  _pressed: {},

  UP1: 81,//'Q'
  DOWN1: 87,//'W'
  UP2: 77,//'M'
  DOWN2: 186,//':'
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

class Bar {
  constructor() {
    this.y = 0;
  }

  moveUp() {
    this.y = this.y + 30;
  }

  moveDown() {
    this.y = this.y - 30;
  }

  onBar() {
    return (this.y<=posy && this.y>=posy+barsize);
  }
}

// window.addEventListener('keydown', function(event) {
//   switch (event.keyCode) {
//     case UP1:
//       leftBar.moveUp();
//     break;

//     case DOWN1:
//       leftBar.moveDown();
//     break;

//     case UP2:
//       rightBar.moveUp();
//     break;

//     case DOWN2:
//       rightBarmoveDown();
//     break;
//   }
// }, false);

let leftBar = new Bar();
let rightBar = new Bar();


window.onload = function(){
  var leftBarDiv = document.getElementById('left-bar');
  var rightBarDiv = document.getElementById('left-bar');

  window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

    window.addEventListener('keydown', function(event) {
      if (Key.isDown(Key.UP1)) leftBar.moveUp();  
      if (Key.isDown(Key.DOWN1)) leftBar.moveDown();
      if (Key.isDown(Key.UP2)) rightBar.moveUp();
      if (Key.isDown(Key.DOWN2)) rightBar.moveDown();
      


      // switch (event.keyCode) {
      //   case UP1:
      //     leftBar.moveUp();
      //   break;

      //   case DOWN1:
      //     leftBar.moveDown();
      //   break;

      //   case UP2:
      //     rightBar.moveUp();
      //   break;

      //   case DOWN2:
      //     rightBar.moveDown();
      //   break;
      // }
      leftBarDiv.style.bottom = leftBar.y.toString() + 'px';
    }, false);

    document.getElementById("position").innerHTML = "position leftBar : " + leftBar.y + "\n";
    // while(Key.isDown(Key.UP1)) {
    // leftBarPos+=1;
    // leftBar.style.top = leftBarPos.toString() + 'px';
    // }
}

function play() {
  move = true;
  	var id = setInterval(moveSquare, 1);
    var elem = document.getElementById("ball"); 

    function moveSquare() { 

  		for (var i=0; i<speed; i++) {
        document.getElementById("alpha").innerHTML = "alpha = " + alpha + "\ndirection actuelle : " + direction(alpha);
        stepx = Math.cos(alpha)*step; 
    		stepy = Math.sin(alpha)*step;
      	if(move==true) {
      		
          if((posx+stepx>=760-size && posx<=760-size && direction(alpha)[0]=='right' && rightBar.onBar())
      		|| (posx+stepx<=40 && posx>=40 && direction(alpha)[0]=='left' && leftBar.onBar())){
      			bounce('right');
      		}
      		else if(posx+stepx>800-size){
      			hit('right');
      			clearInterval(id);
      		}
      		else if(posx-stepx<0){
      			hit('left');
      			clearInterval(id);
      		}
          else if((posy+stepy>=600-size && posy<=600-size && direction(alpha)[1]=='up')
          || (posy+stepy<=0 && posy>=0 && direction(alpha)[1]=='down')){
            bounce('up');
          }
    			else{
    				posx+=stepx;
    				posy+=stepy;

    			}
    			elem.style.bottom = (Math.round(posy)).toString() + 'px'; 
        	elem.style.left = (Math.round(posx)).toString() + 'px'; 
  		  }
    		
    		else {
    			clearInterval(id);
    		}
        	
      }
  }
}

function pause() {
	move = false;
}


function bounce(side){
	if (side=='right' || side=='left') {
    if((alpha<Math.PI/2) || (alpha>=Math.PI/2 && alpha<Math.PI)) {
      alpha = (Math.PI-alpha);
    }
    else {
      alpha = 3*Math.PI-alpha;
    }
	}
  else if (side=='up' || side=='down'){
    if(alpha<Math.PI) {
      alpha = (2*Math.PI - alpha);
    }
    else if(alpha>Math.PI) {
      alpha = 2*Math.PI - alpha;
    }
  }
}

function hit(side){
	if(side=='right'){
		alert('Left player wins!');
	}
	else {
		alert('Right player wins!');
	}
}

function direction(alpha){
	var horizontal;
  var vertical;
  if ((alpha<=Math.PI/2 && alpha>0) || (alpha>=Math.PI*3/2 && alpha<2*Math.PI)){
		 horizontal = 'right';
	}
	else {
		horizontal = 'left';
	}
  if (alpha>0 && alpha<=Math.PI){
    vertical = 'up';
  }
  else {
    vertical = 'down';
  }
  return [horizontal, vertical];
}






if(this.direction()[1]=='up') {
        if(side=='right') this.alpha = (Math.PI-this.alpha) - this.speed/10;
        if(side=='left') this.alpha = (Math.PI-this.alpha) + this.speed/10;
      }
      else {
        if(side=='right') this.alpha = 3*Math.PI-this.alpha + this.speed/10;
        if(side=='left') this.alpha = 3*Math.PI-this.alpha - this.speed/10;
      }