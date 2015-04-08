function point3Init(x, y, z){
  //console.log('www ', x, y, z);
  var p = new Point(x, 'x');
  pointXs.push(p);
  var p = new Point(y, 'y');
  pointYs.push(p);
  var p = new Point(z, 'z');
  pointZs.push(p);
}

function point3Render(){
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.moveTo(0, h / 3);
  ctx.lineTo(w, h / 3);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.moveTo( 0, h * 2/3);
  ctx.lineTo( w, h * 2/3);
  ctx.stroke();

  pointXs.forEach(function(p){
    p.render();
  });
  pointYs.forEach(function(p){
    p.render();
  });
  pointZs.forEach(function(p){
    p.render();
  });
  for(var i = 0; i< pointXs.length - 1; i++){
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(pointXs[i].value[0], pointXs[i].value[1]);
    ctx.lineTo(pointXs[i + 1].value[0], pointXs[i + 1].value[1]);
    ctx.stroke();
  }
  for(var i = 0; i< pointYs.length - 1; i++){
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(pointYs[i].value[0], pointYs[i].value[1]);
    ctx.lineTo(pointYs[i + 1].value[0], pointYs[i + 1].value[1]);
    ctx.stroke();
  }
  for(var i = 0; i< pointZs.length - 1; i++){
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(pointZs[i].value[0], pointZs[i].value[1]);
    ctx.lineTo(pointZs[i + 1].value[0], pointZs[i + 1].value[1]);
    ctx.stroke();
  }
}


function Point(value, axis){
  this.value = [0, value];
  this.velocity = 0.66;
  this.axis = axis;
  this.viewPoint();
}

Point.prototype.render = function(ctx){
  this.value[0] -= this.velocity;
  switch(this.axis){
    case 'x':
      ctx.fillStyle = 'red';
      break;
    case 'y':
      ctx.fillStyle = 'green';
      break;
    case 'z':
      ctx.fillStyle = 'blue';
    break;
  }

  ctx.fillRect(this.value[0] ,this.value[1], 5, 5);
}

Point.prototype.viewPoint = function(){
  //scale the y here!
  //make the x in the middle here!
  this.value[0] = w - 10;
  switch(this.axis){
    case 'x':
    this.value[1] = map(this.value[1], xMin, xMax, h/3-6, 6);
    console.log(this.value)
    break;
    case 'y':
    this.value[1] = map(this.value[1], yMin, yMax, h * 2/3 - 6, h/3 + 6);
    console.log(this.value)
    break;
    case'z':
    this.value[1] = map(this.value[1], zMin, zMax, h - 6, h * 2/3 + 6);
    console.log(this.value)
    break;
  }
}

function map(n, start1, stop1, start2, stop2) {
  if(stop1 === start1) return start2 + ( stop2 - start2 ) / 2;
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
  };