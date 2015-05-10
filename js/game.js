var createGame = require('voxel-engine');
var terrain = require('voxel-perlin-terrain');

game = createGame({

  generateChunks: false,
  texturePath: 'textures/',
  materials: [
    ['grass', 'dirt', 'grass_dirt'], 'brick', 'cobblestone', 'bluewool', 'glowstone', 'diamond', 'grass_dirt', 'grass'
    // ,'meow'
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

var chunkSize = 32;
// initialize your noise with a seed, floor height, ceiling height and scale factor
var generateChunk = terrain('foo', 0, 5, 100);
// then hook it up to your game as such:
game.voxels.on('missingChunk', function (p) {
  var voxels = generateChunk(p, chunkSize);
  var chunk = {
    position: p,
    dims: [chunkSize, chunkSize, chunkSize],
    voxels: voxels
  }
  game.showChunk(chunk);
});

var light = new game.THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 20, 0);
game.scene.add(light);

var light1 = new game.THREE.DirectionalLight(0xffffff, 0.5);
light1.position.set(0, 30, 10);
game.scene.add(light1);

window.scene = game.scene;

module.exports = game;