

var play = false;
var posx = 40;
var posy = 20;
var step = 1;
var speed = 5;
var size = 20;
var initialangle = Math.PI/6; //Toujours de 0 à 2.pi
var stepx = Math.cos(initialangle)*step;
var stepy = Math.sin(initialangle)*step;
var barsize = 150;
var ballsize = 20;
var divider = 1/5;

class Ball {
  constructor() {
    this.x = 40;
    this.y = Math.round(600/2-ballsize/2);
    this.alpha = initialangle; //angle between the horizontal and the direction of the ball
  }

  bounce(side){
    if (side=='right' || side=='left') {
      if(this.direction()[1]=='up') {
        if(side=='right' && (Math.PI-this.alpha-leftBar.speed/divider)<2*Math.PI && (Math.PI-this.alpha-leftBar.speed/divider)>0) {
          this.alpha = (Math.PI-this.alpha) - leftBar.speed/divider;
        }
        else if(side=='left' && (Math.PI-this.alpha+rightBar.speed/divider)<2*Math.PI && (Math.PI-this.alpha+rightBar.speed/divider)>0) {
          this.alpha = (Math.PI-this.alpha) + rightBar.speed/divider;
        }
        else {
          this.alpha = (Math.PI-this.alpha);
        }
      }
      else {
        this.alpha = 3*Math.PI-this.alpha;
      }

    }
    else if (side=='up' || side=='down'){
      if(this.alpha<Math.PI) {
        this.alpha = (2*Math.PI - this.alpha);
      }
      else if(this.alpha>Math.PI) {
        this.alpha = 2*Math.PI - this.alpha;
      }
    }


  }

  direction(){
    var horizontal;
    var vertical;
    if ((this.alpha<=Math.PI/2 && this.alpha>0) || (this.alpha>=Math.PI*3/2 && this.alpha<2*Math.PI)){
       horizontal = 'right';
    }
    else horizontal = 'left';
    if (this.alpha>0 && this.alpha<=Math.PI) vertical = 'up';
    else vertical = 'down';

    return [horizontal, vertical];
  }


}

class Bar {
  constructor() {
    var localtab = [];
    var initialposition = Math.round(600/2-barsize/2)
    for (var i=0 ; i<10 ; i++){
      localtab.push(initialposition);
    }

    this.y = initialposition;
    this.historic = localtab;
  }

  moveUp() {
    if(this.y<=600-5-barsize) this.y = this.y + 5;
  }

  moveDown() {
    if(this.y>=5) this.y = this.y - 5;
  }

  onBar() {
    return (ball.y>=this.y && ball.y<=this.y+barsize);
  }

  speed() {
    var sum = 0;
    for (var i=0 ; i<9 ; i++){
      sum+=this.historic[i]-this.historic[i+1];
    }
    return sum/10
  }

  updatePosition() {
    for(var i=10-1 ; i>0 ; i--){
      // alert('shift number ' + i + ', tab[' + i + '] = ' + tab[i] + '\ntab[' + (i-1) + '] = ' + tab[i-1]);
      this.historic[i]=this.historic[i-1];
    }
    this.historic[0]=this.y;
  }
}

let leftBar = new Bar();
let rightBar = new Bar();
let ball = new Ball();


window.onload = function(){
  var leftBarDiv = document.getElementById('left-bar');
  var rightBarDiv = document.getElementById('right-bar');
  var elem = document.getElementById("ball"); 

  elem.style.bottom = (Math.round(ball.y)).toString() + 'px'; 
  elem.style.left = (Math.round(ball.x)).toString() + 'px';
  leftBarDiv.style.bottom = (leftBar.y).toString() + 'px';
  rightBarDiv.style.bottom = (rightBar.y).toString() + 'px';
  
  var id = setInterval(moveBall, 1);
  var id2 = setInterval(moveBars, 2);

  var Key = {
    _pressed: {},

    UP1: 81,//'Q'
    DOWN1: 87,//'W'
    UP2: 77,//'M'
    DOWN2: 186,//':'
    SPACE: 32,//' '
    
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
  window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
  window.addEventListener('keydown', function(event) {
    if (Key.isDown(Key.SPACE)) playPause();
  }, false);

  

  function moveBars() {
    if (play==true){
      if (Key.isDown(Key.UP1)) leftBar.moveUp();  
      if (Key.isDown(Key.DOWN1)) leftBar.moveDown();
      if (Key.isDown(Key.UP2)) rightBar.moveUp();
      if (Key.isDown(Key.DOWN2)) rightBar.moveDown();
      leftBar.updatePosition();
      rightBar.updatePosition();
    }

    leftBarDiv.style.bottom = (leftBar.y).toString() + 'px';
    rightBarDiv.style.bottom = (rightBar.y).toString() + 'px';
  }



  function moveBall() { 

    for (var i=0; i<speed; i++) {
    
      // document.getElementById("alpha").innerHTML = "alpha = " + ball.alpha + "\ndirection actuelle : " + ball.direction();
      // document.getElementById("position").innerHTML = "position rightbar : " + rightBar.y + "<br/>"
      // + "position ball : x = " + ball.x + " ; y = " + ball.y + "<br/>"
      // + "La balle doit être entre " + (ball.y+rightBar.y) + " et " + ball.y + "<br/>"
      // + "LeftBar speed = " + leftBar.speed()+ "<br/>"
      // + "RightBar speed = " + rightBar.speed();
      stepx = Math.cos(ball.alpha)*step; 
      stepy = Math.sin(ball.alpha)*step;

      if(play==true) {          
        if((ball.x+stepx>=760-size && ball.x<=760-size && ball.direction()[0]=='right' && rightBar.onBar())
        || (ball.x+stepx<=40 && ball.x>=40 && ball.direction()[0]=='left' && leftBar.onBar())){
          ball.bounce('right');
        }
        else if(ball.x+stepx>800-size){
          hit('right');
          clearInterval(id);
        }
        else if(ball.x-stepx<0){
          hit('left');
          clearInterval(id);
        }
        else if((ball.y+stepy>=600-size && ball.y<=600-size && ball.direction()[1]=='up')
        || (ball.y+stepy<=0 && ball.y>=0 && ball.direction()[1]=='down')){
          ball.bounce('up');
        }
        else{
          ball.x+=stepx;
          ball.y+=stepy;
        }
        elem.style.bottom = (Math.round(ball.y)).toString() + 'px'; 
        elem.style.left = (Math.round(ball.x)).toString() + 'px'; 
      }
    }
  }
}

function playPause() {
  if(play==false) play=true;
  else play=false;
}

function hit(side){
  playPause();
  if(side=='right'){
    alert('Left player wins!');
  }
  else {
    alert('Right player wins!');
  }
  window.location.reload();
}

function shift(tab, n) {
  // alert('shifting...');
  for(var i=n-1 ; i>0 ; i--){
    // alert('shift number ' + i + ', tab[' + i + '] = ' + tab[i] + '\ntab[' + (i-1) + '] = ' + tab[i-1]);
    tab[i]=tab[i-1];
  }
  // alert('shifted : tab = ' + tab);
}


