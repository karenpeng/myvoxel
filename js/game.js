var createGame = require('voxel-engine');
var terrain = require('voxel-perlin-terrain');
var en = require('./global.js');

en.game = createGame({

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
en.game.appendTo(container);

var chunkSize = 32;
// initialize your noise with a seed, floor height, ceiling height and scale factor
var generateChunk = terrain('foo', 0, 5, 100);
// then hook it up to your game as such:
en.game.voxels.on('missingChunk', function (p) {
  var voxels = generateChunk(p, chunkSize);
  var chunk = {
    position: p,
    dims: [chunkSize, chunkSize, chunkSize],
    voxels: voxels
  }
  en.game.showChunk(chunk);
});

var light = new en.game.THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 20, 0);
en.game.scene.add(light);

var light1 = new en.game.THREE.DirectionalLight(0xffffff, 0.5);
light1.position.set(0, 10, 0);
en.game.scene.add(light1);

var createSky = require('voxel-sky')(en.game);
en.sky = createSky();