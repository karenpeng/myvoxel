var can = document.getElementById('dataLog');
var ctx = can.getContext('2d');

function Point3(x, y, z){
  this.xValue = [0, x];
  // this.yValue = [0, y + 0.5];
  // this.zValue = [0, z + 1];
  this.velocity = 0.1;
  this.viewPoint();
}

Point3.prototype.render = function(){
  this.xValue[0] -= this.velocity;
  // this.y -= this.velocity;
  // this.z -= this.velocity;
  ctx.fillRectangle(this.xValue[0] ,this.xValue[1], 10, 10);
}

Point3.prototype.viewPoint = function(){
  //scale the y here!
  //make the x in the middle here!
  this.xValue[0] = 300;
  this.xValue[1] = this.map(this.xValue[1], xMin, xMax, 0, 50);
}


var points = [];

function init(){
  var p = new Point3();
  //points.push(p);
}

function draw(){
  requestAnimationFrame(draw);
  points.forEach(function(point){
    point.render();
  });
}

function map(value, orgMin, orgMax, dstMin, dstMax){
  return (dstMax - dstMin) * value / (orgMax - orgMin);
}



