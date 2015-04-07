var createGame = require('voxel-engine');
var skin = require('minecraft-skin');
var terrain = require('voxel-perlin-terrain');
//var createSelect = require('voxel-select');
// var highlight = require('voxel-highlight');
// var transforms = require('voxel-transforms');
//require('./parse.js');
// var toolbar = require('toolbar');
// var bartab = toolbar('.bar-tab');
//var fly = require('voxel-fly');

var voxelPos = [0, 0, 0];
var startPosition = [0, 0, 0];
var xMin, xMax, yMin, yMax, zMin, zMax;
var pointXs = [];
var pointYs = [];
var pointZs = [];
var can = document.getElementById('dataLog');
var ctx = can.getContext('2d');
var w;
var h;
var clickTimes = 0;
var codes = [];
function resize(){
  var ww = window.innerWidth;
  var hh = window.innerHeight;
  can.setAttribute('width', (ww - 400) + 'px');
  can.setAttribute('height', (hh * 0.15) + 'px');
  w = can.width;
  h = can.height;
}
resize();
window.addEventListener('resize', resize);

var colliObjs = [];
var myItems = [];
var preItemNum = 0;
/*
set up game
 */

var game = createGame({

  generateChunks: false,
  texturePath: 'textures/',
  materials: [
    ['grass', 'dirt', 'grass_dirt']
    ,'brick'
    // ,'meow'
  ],
  //materialFlatColor: true,
  chunkSize: 16,
  chunkDistance: 2,
  worldOrigin: [0, 0, 0],
  controls: {
    discreteFire: false
  },
  lightsDisabled: true,
  playerHeight: 1.62
});
var container = document.getElementById('container');
game.appendTo(container);

window.game = game; //for debug:)

// initialize your noise with a seed, floor height, ceiling height and scale factor
var chunkSize = 16;
var generateChunk = terrain('foo', 0, 5, 50);
// then hook it up to your game as such:
game.voxels.on('missingChunk', function (p) {
  var voxels = generateChunk(p, chunkSize);
  var chunk = {
    position: p,
    dims: [chunkSize, chunkSize, chunkSize],
    voxels: voxels
  }
  game.showChunk(chunk);
})

var light = new game.THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 10, 0);
game.scene.add(light);

// var makeFly = fly(game);
// makeFly(game.contrls.target())

var createSky = require('voxel-sky')(game);

var sky = createSky();

// toolbar('.bar-tab').on('select', function (item) {
//   currentMaterial = item
// })

//create dude
var createPlayer = require('voxel-player')(game);
var dude = createPlayer('textures/dude.png');
dude.possess();
//jump from sky
var jumpFromSky = 10;
dude.yaw.position.set(0, jumpFromSky, 0);
window.dude = dude; //for debug

window.addEventListener('keydown', function (ev) {
  if (!editing && ev.keyCode === 'R'.charCodeAt(0)) {
    dude.toggle();
  }
});

var dude2 = skin(game.THREE, 'textures/dude.png').createPlayerObject();
//console.log(dude2);
dude2.position.set(10, 4, 0);
dude2.scale.set(0.1, 0.1, 0.1);
window.dude2 = dude2;
game.scene.add(dude2);

/*
three js experiments
 */


window.myItems = myItems;
function addThing(_x, _y, _z, _clickTimes) {
  // create a mesh and use the internal game material (texture atlas)

  var mesh = new game.THREE.Mesh(
    new game.THREE.CubeGeometry(1, 1, 1), // width, height, depth
    game.materials.material
  )

  // paint the mesh with a specific texture in the atlas
  game.materials.paint(mesh, 'brick');

  //mesh.position.set(_x, _y, _z)
  var x = _x + startPosition[0] + 0.5 || startPosition[0] + 0.5;
  var y = _y + startPosition[1] + 1.5 || startPosition[1] + 1.5;
  var z = _z + startPosition[2] + 0.5 || startPosition[2] + 0.5;

  //for testing
  mesh.position.set(x, y, z);
  mesh.name = _clickTimes;
  colliObjs.push(mesh);
  //console.log(x, y, z);
  //game.scene.add(mesh)
  //console.log(mesh)
  var item = game.addItem({
      mesh: mesh,
      size: 1,
      velocity: {
        x: 0,
        y: 0,
        z: 0
      } // initial velocity
    }, false)
  item.name = _clickTimes;
  myItems.push(item);

  return mesh;
    //use `game.removeItem(item)` to remove
    //return [x, y, z];
}
window.addThing = addThing; //for debug



/*
animation
 */
var theta = 0;
var interval = 60;
var begintToCount = 0;
var result2 = null;
var result2pre = null;
var frameCount = 0;
game.on('tick',function(delta){
  frameCount ++;
  sky(delta);
  if(frameCount % 3 === 0){
    dude2.rotation.y = theta / 100;

    theta += (delta / 16);

    if(begintToCount % interval === 0 && evaled){
      runGenerator(call);
    }

    if(evaled){
      begintToCount += (delta / 16);
    }

    var result = isHit();
    if(result){
      dude.position.set(dude.yaw.position.x, dude.yaw.position.y + result.y, dude.yaw.position.z);
    };

    result2 = isClose();

    if(result2!== null && result2 !== result2pre){
      //1.show code
      //2.how does reset button work?
      console.log('wat');
      showCode(result2);
      result2pre = result2;
    }

    ctx.clearRect(0, 0, w, h);
    point3Render();
  }
})

function showCode(name){
  editor.setValue(codes[name]);
}

function destory(name){
  myItems.forEach(function(item){
    if(item.name == name){
      game.removeItem(item);
    }
  })
  codes[name] = null;
}
//collision detection!!!
var rayCaster = new game.THREE.Raycaster();
function isHit() {
    //get user direction!!
    var ray = new game.THREE.Vector3(0, -1, 0);
    rayCaster.ray.set(dude.yaw.position, ray);
    var intersects = rayCaster.intersectObjects(colliObjs);
    if (intersects.length > 0 && intersects[0].distance <= 0.5) {
      //console.log(intersects[0].object.position);
      return intersects[0].object.position;
    }
    return false;
}

function isClose() {
  var rays = [
  new game.THREE.Vector3(1, 0, 0),
  new game.THREE.Vector3(-1, 0, 0),
  new game.THREE.Vector3(0, 0, 1),
  new game.THREE.Vector3(0, 0, -1),
  new game.THREE.Vector3(0, 1, 0),
  new game.THREE.Vector3(0, -1, 0)
  ];

  var name = null;
  for(var i = 0; i< rays.length; i++){
    var ray = rays[i];
    rayCaster.ray.set(dude.yaw.position, ray);
     var intersects = rayCaster.intersectObjects(colliObjs);
    if (intersects.length > 0 && intersects[0].distance <= 2) {
      //console.log(intersects[0].object.name);
      name = intersects[0].object.name;
      break;
    }
  }
  return name;
}
  /*
  interaction!
   */
// var createSelect = require('voxel-select');
//var selector = createSelect(game);

var highlight = require('voxel-highlight');
var hl = highlight(game, {
  color: 0xffffff
});

hl.on('highlight', function (_voxelPos) {
  //if(shiftIsDown){
    voxelPos = _voxelPos;
    //console.log(_voxelPos);
  //}
});

game.on('fire', function(){
  startPosition = voxelPos;
  console.log('start from here!' , startPosition[0] , startPosition[1], startPosition[2]);
});

/*
eval!
 */
var editor = require('./editor.js').editor;
var consoleLog = require('./editor.js').consoleLog;
var editing = require('./editor.js').editing;
document.getElementById('run').onclick = function () {
  evaled = false;
  parse(editor.getValue());
}

document.getElementById('reset').onclick = function(){
  if(result2 === result2pre && result2 !== null){
    destory(result2pre);
  }
}

var editing = false;

editor.on('focus', function () {
  editing = true;
});

editor.on("blur", function () {
  editing = false;
});


var maxMinFuc = require('./parse.js').maxMinFuc;
var wrapGenerator = require('./parse.js').wrapGenerator;

function parse(str) {
  xMin = 10000000000000;
  xMax = -xMin;
  yMin = 10000000000000;
  yMax = -yMin;
  zMin = 10000000000000;
  zMax = -zMin;
  pointXs = [];
  pointYs = [];
  pointZs = [];

  try{
    var str1 = maxMinFuc(str);
    eval(str1);
  }catch(e){
    console.log(e);
    return;
  }

  try {
    //console.log('start eval');
    var str2 = wrapGenerator(str);
    console.log(str2);
    eval(str2);
    call = wat();
    evaled = true;
    //console.log('end eval');
  } catch (e) {
    console.log(e);
    consoleLog.insert(e);
    return;
  }

  codes.push(str);
  clickTimes ++;

}

function drawAndAddThing(x, y, z){
  addThing(x, y, z, clickTimes);
  point3Init(x, y, z);
}

function getMaxMin(x, y, z){
  x = x || 0;
  y = y || 0;
  z = z || 0;
  if(xMin > x) xMin = x;
  if(xMax < x) xMax = x;
  if(yMin > y) yMin = y;
  if(xMax < y) yMax = y;
  if(zMin > z) zMin = z;
  if(zMax < z) zMax = z;
}


function runGenerator(generator) {
  //console.log(generator)
  var ret = generator.next();
  if (ret.done) {
    evaled = false;
    begintToCount = 0;
    return;
  }
  //console.log(ret.value);
}

document.getElementById('valueP').innerHTML = interval;
var call;
var evaled = false;
var sliderr = document.getElementById('sliderr');
sliderr.addEventListener('change', function(){
  //console.log(sliderr.value);
  interval = sliderr.value;
  document.getElementById('valueP').innerHTML = sliderr.value;
});


/*
the 2d canvas for data graph
 */
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

Point.prototype.render = function(){
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