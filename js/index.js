var createGame = require('voxel-engine');
var skin = require('minecraft-skin');
var terrain = require('voxel-perlin-terrain');

//var createSelect = require('voxel-select');
// var highlight = require('voxel-highlight');
// var transforms = require('voxel-transforms');
//require('./parse.js');
var voxelPos = [0, 0, 0];
var startPosition = [0, 0, 0];
var xMin, xMax, yMin, yMax, zMin, zMax;
/*
set up game
 */

var game = createGame({

  generateChunks: false,
  texturePath: 'textures/',
  materials: [
    ['grass', 'dirt', 'grass_dirt']
    ,'brick'
    ,'meow'
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

var createSky = require('voxel-sky')(game);

var sky = createSky();

//create dude
var createPlayer = require('voxel-player')(game);
var dude = createPlayer('textures/dude.png');
dude.possess();
//jump from sky
var jumpFromSky = 10;
dude.yaw.position.set(0, jumpFromSky, 0);

window.addEventListener('keydown', function (ev) {
  if (!editing && ev.keyCode === 'R'.charCodeAt(0)) {
    dude.toggle();
  }
});

var dude2 = skin(game.THREE, 'textures/dude.png').createPlayerObject();
console.log(dude2);
dude2.position.set(10, 4, 0);
dude2.scale.set(0.1, 0.1, 0.1);
window.dude2 = dude2;
game.scene.add(dude2);

// //add some trees
// does not work :(
// var createTree = require('voxel-forest');
// console.log('here')
// for (var i = 0; i < 1; i++) {
//   console.log('there')
//   createTree(game, {
//     bark: 4,
//     leaves: 3
//   });
// }

//ability to explode voxels
// var explode = require('voxel-debris')(game);
// game.on('mousedown', function (pos) {
//   if (erase) explode(pos);
//   else game.createBlock(pos, 1);
// });

// var erase = true;

// function ctrlToggle(ev) {
//   erase = !ev.ctrlKey
// }
// window.addEventListener('keydown', ctrlToggle);
// window.addEventListener('keyup', ctrlToggle);

/*
three js experiments
 */



var colliObjs = [];
function addThing(_x, _y, _z) {
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
    //use `game.removeItem(item)` to remove
    //return [x, y, z];
}

addThing(10, 20, 0);

window.onkeydown = function (e) {
  //j
  if (!editing){
    if(e.which === 74) {
      e.preventDefault();
      //console.log('create block please!');
      //game.createBlock(dude.position, 1);
      //game.createBlock([dude.position.x, dude.position.y, dude.position.z], 1);
      for (var i = 0; i < 3; i++) {
        addThing(voxelPos[0] + i, voxelPos[1], voxelPos[2] + 1);
      }
    }
  }
}



/*
animation
 */
var theta = 0;
var interval = 60;
var begintToCount = 0;
game.on('tick',function(delta){
  //console.log(delta)
  sky(delta);
  //dude2.position.set(0, Math.sin(theta) + 3, 10);
  dude2.rotation.y = theta / 100;
  //console.log(dude.position);
  //console.log(game.controls.dude2().avatar.position())
  //parent.rotation.y = theta / 100;
  mesh2.rotation.y = theta / 100;
  mesh2.rotation.z = Math.sin(theta / 100);
  theta += (delta / 16);

  if(begintToCount % interval === 0 && evaled){
    //console.log('hello~')
    run(call);
  }

  if(evaled){
    begintToCount += (delta / 16);
  }

  var result = isHit();
  if(result){
    dude.yaw.position.set(dude.yaw.position.x, dude.yaw.position.y + result.y, dude.yaw.position.z);
  };
})

// for(var i = 0; i<3; i++){
//   //console.log(game.canCreateBlock([i,4,0]));
//   game.createBlock([i, 4, 0], '2');
//   //console.log('are you ok?')
// }


// game.createBlock({
//   x: 0,
//   y: 10,
//   z: 20
// }, 1);

//collision detection!!!
//never got any detection...
game.raycastVoxels();

game.on('collision', function (item) {
  console.log(item);
})

var rayCaster = new game.THREE.Raycaster();
function isHit() {
    //get user direction!!
    var ray = new game.THREE.Vector3(0, -1, 0);
    rayCaster.ray.set(dude.yaw.position, ray);
    var intersects = rayCaster.intersectObjects(colliObjs);
    if (intersects.length > 0 && intersects[0].distance <= 0.5) {
      console.log(intersects[0].object.position);
      return intersects[0].object.position;
    }
    return false;
}
  /*
  interaction!
   */
var createSelect = require('voxel-select');
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
  console.log('what does fire mean');
  startPosition = voxelPos;
  console.log('start from here!' , startPosition[0] , startPosition[1], startPosition[2]);
})


hl.on('highlight-select', function (selection) {
  console.log(">>> [" + selection.start + "][" + selection.end + "] highlighted selection")
})

/*
start experiment!  :D
 */

var geometry = new game.THREE.SphereGeometry(0.1);
var material = new game.THREE.MeshNormalMaterial();
var mesh2 = new game.THREE.Mesh(geometry, material);
mesh2.position.set(10, 3, -10);
game.scene.add(mesh2);
// add a torus
for (var i = 0; i <= 1; i += 0.1) {
  for (var j = 0; j <= 1; j += 0.1) {
    var uv = [i, j];

    var u = uv[0];
    var v = uv[1];
    var geometry = new game.THREE.SphereGeometry(0.1);
    var material = new game.THREE.MeshNormalMaterial();
    var mesh0 = new game.THREE.Mesh(geometry, material);

    var theta = 2 * Math.PI * u;
    var phil = Math.PI * v - Math.PI / 2;
    // var x = Math.sin(theta);
    //   var y = 2 * v - 1;
    //   var z = Math.cos(theta);
    var x = Math.cos(phil) * Math.sin(theta);
    var y = Math.sin(phil);
    var z = Math.cos(phil) * Math.cos(theta);
    mesh0.position.set(x, y, z);
    mesh2.add(mesh0);
    //scene.add(mesh0);
  }
}

/*
eval!
 */
var editor = require('./editor.js').editor;
var consoleLog = require('./editor.js').consoleLog;
var editing = require('./editor.js').editing;
document.getElementById('run').onclick = function () {
  evaled = false;
  //console.log(editor.getValue());
  parse(editor.getValue());
}

var editing = false;

editor.on('focus', function () {
  editing = true;
});

editor.on("blur", function () {
  editing = false;
});


var injectMaxMin = require('./parse.js').injectMaxMin;
var wrapGenerator = require('./parse.js').wrapGenerator;

function parse(str) {
  xMin = 10000000000000;
  xMax = -xMin;
  yMin = 10000000000000;
  yMax = -yMin;
  zMin = 10000000000000;
  zMax = -zMin;

  try{
    var str1 = injectMaxMin(str);
    eval(str1);
  }catch(e){
    console.log(e);
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
  }

}

function addThingModified(x, y, z){
  addThing(x, y, z);
  console.log(x, y, z);
  if(xMin > x) xMin = x;
  if(xMax < x) xMax = x;
  if(yMin > y) yMin = y;
  if(xMax < y) yMax = y;
  if(zMin > z) zMin = z;
  if(zMax < z) zMax = z;
  console.log('hahaha ', xMin, xMax);
}


function run(generator) {
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
  console.log(sliderr.value);
  interval = sliderr.value;
  document.getElementById('valueP').innerHTML = sliderr.value;
});
