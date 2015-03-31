var createGame = require('voxel-engine');
var terrain = require('voxel-perlin-terrain');

var game = createGame({
  generateChunk: terrain('foo', 0, 5, 20),
  // generateVoxelChunk: terrain({
  //   scaleFactor: 6
  // }),
  // chunkDistance: 2,
  // chunkDistance: 2,
  texturePath: 'textures/',
  startingPosition: [35, 0, 35],
  worldOrigin: [0, 0, 0]
});
var container = document.getElementById('container');
game.appendTo(container);

// initialize your noise with a seed, floor height, ceiling height and scale factor
var chunkSize = 32;
var generateChunk = terrain('foo', 0, 5, 20);
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
dude.yaw.position.set(0, 100, 0);

window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 'R'.charCodeAt(0)) {
    dude.toggle();
  }
});

// //add some trees
// var createTree = require('voxel-forest');
// for (var i = 0; i < 20; i++) {
//   createTree(game, {
//     bark: 4,
//     leaves: 3
//   });
// }

// // ability to explode voxels
// var explode = require('voxel-debris')(game);
// game.on('mousedown', function (pos) {
//   if (erase) explode(pos);
//   else game.createBlock(pos, 1);
// });