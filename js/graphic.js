var createGame = require('voxel-engine');
var skin = require('minecraft-skin');
var terrain = require('voxel-perlin-terrain');

var createSelect = require('voxel-select');
// var highlight = require('voxel-highlight');
// var transforms = require('voxel-transforms');
//require('./parse.js');

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
dude2.position.set(0, 0, 0);
dude2.scale.set(0.1, 0.1, 0.1);
game.scene.add(dude2);

var createSky = require('voxel-sky')(game);

var sky = createSky();
var item;

function addThing(_x, _y, _z) {
    // create a mesh and use the internal game material (texture atlas)

    var mesh = new game.THREE.Mesh(
      new game.THREE.CubeGeometry(1, 3, 1), // width, height, depth
      game.materials.material
    )

    // paint the mesh with a specific texture in the atlas
    game.materials.paint(mesh, 'brick')

    //mesh.position.set(_x, _y, _z)

    //for testing
    mesh.position.set(dude.position.x, dude.position.y, dude.position.z)
      //game.scene.add(mesh)
      //console.log(mesh)
    item = game.addItem({
        mesh: mesh,
        size: 1,
        velocity: {
          x: 0,
          y: 0,
          z: 0
        } // initial velocity
      })
      //use `game.removeItem(item)` to remove
  }
  //window.addThing = addThing;

game.on('tick', function (delta) {
  sky(delta);
  if (item !== undefined) {
    //game.getCollisions(dude.position, item);
  }
});

//game.on('tick', sky);
var theta = 0;
setInterval(function () {
  dude2.position.set(0, Math.sin(theta) + 3, 10);
  theta += 0.1;
  //console.log(dude.position);
  //console.log(game.controls.dude2().avatar.position())
}, 16);

window.onkeydown = function (e) {
    if (e.which === 32) {
      e.preventDefault();
      //console.log('create block please!');
      //game.createBlock(dude.position, 1);
      //game.createBlock([dude.position.x, dude.position.y, dude.position.z], 1);
      for (var i = 0; i < 3; i++) {
        addThing(dude.position.x + i, dude.position.y, dude.position.z);
      }
    }
  }
  // game.createBlock((0, 10, 20), 1);
  // game.createBlock({
  //   x: 0,
  //   y: 10,
  //   z: 20
  // }, 1);

//collision detection!!!
game.raycastVoxels();

game.on('collision', function (item) {
  console.log(item);
})

// //add some trees
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
interaction!
 */
var createSelect = require('voxel-select');
//var selector = createSelect(game);

var highlight = require('voxel-highlight');
highlight(game, {
  color: 0xffffff
});
hl.on('highlight', function (voxelPos) {
  console.log(voxelPos);
})

module.exports.addThing = addThing;