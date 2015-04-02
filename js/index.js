var createGame = require('voxel-engine');
var skin = require('minecraft-skin');
var terrain = require('voxel-perlin-terrain');

var createSelect = require('voxel-select');
// var highlight = require('voxel-highlight');
// var transforms = require('voxel-transforms');
//require('./parse.js');
var voxelPos = [0, 0, 0];
/*
set up game
 */

var game = createGame({

  generateChunks: false,
  texturePath: 'textures/',
  materials: [
    ['grass', 'dirt', 'grass_dirt'],
    'brick',
    'grass'
  ],
  //materialFlatColor: true,
  chunkSize: 32,
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
var chunkSize = 32;
var generateChunk = terrain('foo', 0, 5, 50);
// then hook it up to your game as such:
game.voxels.on('missingChunk', function (p) {
  var voxels = generateChunk(p, chunkSize)
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
  if (ev.keyCode === 'R'.charCodeAt(0)) {
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

// first attempt:( does not show up

var mesh1 = new game.THREE.Mesh(new game.THREE.SphereGeometry(20), new game.THREE.MeshNormalMaterial());
mesh1.position.set(1, 4, 0);
game.scene.add(mesh1);

//second error says 'is not an instance of THREE.Object3D.''
//comment out line 137 the error is gone
var parent = new game.THREE.Object3D();
parent.name = 'parent';
//console.log(parent);
//parent.position.set(0, 0, 0);
var mesh0 = new game.THREE.Mesh(
    new game.THREE.CubeGeometry(1, 3, 1), // width, height, depth
    game.materials.material
  )
  // paint the mesh with a specific texture in the atlas
game.materials.paint(mesh0, 'brick')
  //for testing
mesh0.position.set(1, 10, 0);
//parent.add(mesh0);
console.log(parent)
console.log(mesh0)
  //game.scene.add(parent);

//third attempt :(
//parent.add(mesh);
//game.scene.add(parent);

function addThing(_x, _y, _z) {
  // create a mesh and use the internal game material (texture atlas)

  var mesh = new game.THREE.Mesh(
    new game.THREE.CubeGeometry(1, 1, 1), // width, height, depth
    game.materials.material
  )

  // paint the mesh with a specific texture in the atlas
  game.materials.paint(mesh, 'brick')

  //mesh.position.set(_x, _y, _z)
  var x = _x + voxelPos[0] + 0.5 || voxelPos[0] + 0.5;
  var y = _y + voxelPos[1] + 1.5 || voxelPos[1] + 1.5;
  var z = _z + voxelPos[2] + 0.5 || voxelPos[2] + 0.5;

  //for testing
  mesh.position.set(x, y, z);
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
}

addThing(10, 20, 0);

window.onkeydown = function (e) {
  //j
  if (e.which === 74) {
    e.preventDefault();
    //console.log('create block please!');
    //game.createBlock(dude.position, 1);
    //game.createBlock([dude.position.x, dude.position.y, dude.position.z], 1);
    for (var i = 0; i < 3; i++) {
      addThing(voxelPos[0] + i, voxelPos[1], voxelPos[2] + 1);
    }
  }
}

/*
animation
 */
var theta = 0;
setInterval(function () {
  //dude2.position.set(0, Math.sin(theta) + 3, 10);
  dude2.rotation.y = theta;
  theta += 0.1;
  //console.log(dude.position);
  //console.log(game.controls.dude2().avatar.position())
  parent.rotation.y = theta;
  mesh2.rotation.y = theta / 10;
  mesh2.rotation.z = Math.sin(theta / 10);
}, 16);

// game.createBlock((0, 10, 20), 1);
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
  //console.log(_voxelPos);
  voxelPos = _voxelPos;
});
hl.on('highlight-select', function (selection) {
  console.log(">>> [" + selection.start + "][" + selection.end + "] highlighted selection")
})

/*
start experiment!  :D
 */

var geometry = new game.THREE.SphereGeometry(0.1);
var material = new game.THREE.MeshNormalMaterial();
var mesh2 = new game.THREE.Mesh(geometry, material);
mesh2.position.set(10, 10, -10);
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
document.getElementById('run').onclick = function () {
  console.log(editor.getValue());
  parse(editor.getValue());
}

function parse(str) {
  try {
    console.log('start eval');
    eval(str);
    console.log('end eval');
  } catch (e) {
    console.log(e);
  }
}