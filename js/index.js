var createGame = require('voxel-engine');
var skin = require('minecraft-skin');
var terrain = require('voxel-perlin-terrain');

var en = require('./global.js');

var wrapGenerator = require('./parse.js').wrapGenerator;
var editor = require('./editor').editor;
var consoleLog = require('./editor').consoleLog;
var addMarkerRange = require('./editor.js').addMarkerRange;
var removeMarker = require('./editor.js').removeMarker;
var highlightLine = require('./editor.js').highlightLine;
var runGenerator = require('./generator.js');

require('./toolbar.js')();
require('./slider.js')();
var init = require('./tutorial.js').init;
init(removeMarker);

var clickTimes = 0;
var myItems = [];
var myMaterial = ['brick', 'cobblestone', 'bluewool', 'glowstone', 'diamond', 'grass_dirt', 'grass'];

var theta = 0;
var begintToCount = 0;
var frameCount = 0;
var call;
var copy;
var evaled = false;
var code = '';

/*
set up game
 */
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
})

var light = new en.game.THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 20, 0);
en.game.scene.add(light);

var light1 = new en.game.THREE.DirectionalLight(0xffffff, 0.5);
light1.position.set(0, 10, 0);
en.game.scene.add(light1);

var createSky = require('voxel-sky')(en.game);

var sky = createSky();

//create dude
var createPlayer = require('voxel-player')(en.game);
en.dude = createPlayer('textures/dude.png');
en.dude.possess();
//jump from sky
var jumpFromSky = 10;
en.dude.yaw.position.set(0, jumpFromSky, 0);

window.onkeydown = function (e) {
  if (!en.editing && e.keyCode === 'R'.charCodeAt(0)) {
    en.dude.toggle();
  }
  if (e.which === 32 && jumpable /*&& onTop*/ ) {
    e.preventDefault();
    en.dude.resting.y = false;
    en.dude.velocity.y = 0.014;
  }
}

//info config
var welcome = document.getElementById('welcome');
var message = document.querySelector('#middleMessage');
message.innerHTML = 'Double Click to play';

var jumpable = true;
en.game.interact.on('attain', function () {
  jumpable = true;
});
en.game.interact.on('release', function () {
  jumpable = false;
});
require('./select.js')();

/*
the api for end-user
 */
function addBlock(_clickTimes, pos, _x, _y, _z, _size) {
  // create a mesh and use the internal game material (texture atlas)
  var size = _size || 1;
  var mesh = new en.game.THREE.Mesh(
    new en.game.THREE.CubeGeometry(size, size, size), // width, height, depth
    en.game.materials.material
  )

  // paint the mesh with a specific texture in the atlas
  en.game.materials.paint(mesh, myMaterial[en.materialIndex]);

  var x = _x + pos[0] + 0.5 || pos[0] + 0.5;
  var y = _y + pos[1] + 1.5 || pos[1] + 1.5;
  var z = _z + pos[2] + 0.5 || pos[2] + 0.5;

  mesh.position.set(x, y, z);
  mesh.name = _clickTimes;
  en.colliObjs.push(mesh);

  var item = en.game.addItem({
    mesh: mesh,
    size: 1,
    velocity: {
      x: 0,
      y: 0,
      z: 0
    } // initial velocity
  }, false)
  item.name = _clickTimes;

  // //myItem is for destorying things
  myItems.push(item);

  return [_x, _y, _z];
}

function addBlockAndHighlight(clickTimes, pos, lineNum, x, y, z, size) {
  var ppos = addBlock(clickTimes, pos, x, y, z, size);
  highlightLine(lineNum, true, ppos);
}

/*
animation
 */
var isOnTop = require('./collisionDetection.js').isOnTop;
en.game.on('tick', function (delta) {
  frameCount++;
  sky(delta);

  if (frameCount !== 0 && frameCount % 2 === 0) {

    theta += (delta / 16);

    if (begintToCount % en.interval === 0 && evaled) {
      try {
        runGenerator(call, recover);
      } catch (e) {
        console.log(e);
        consoleLog.insert(e.toString());
        return;
      }
    }

    if (evaled) {
      begintToCount += (delta / 16);
    }

    if (en.colliObjs.length) {
      isOnTop(delta);
    }

  }

});

/*
eval
 */
document.getElementById('run').onclick = function () {
  evaled = false;
  parse(editor.getValue(), editor.session.doc.getAllLines());
}

function parse(str, arr) {

  try {
    var str2 = wrapGenerator(arr, str);
    console.log(str2);
    eval(str2);
    call = wwwaaattt(clickTimes, en.startPosition);
    evaled = true;
  } catch (e) {
    console.log(e);
    consoleLog.insert(e.toString());
    return;
  }

  code = str;

  try {
    runGenerator(call, recover);
  } catch (ಠoಠ) {
    console.log(ಠoಠ);
    consoleLog.insert(ಠoಠ.toString());
    code = '';
    return;
  }

  clickTimes++;

}

function recover() {
  evaled = false;
  begintToCount = 0;
  removeMarker();
  editor.setValue(code);
  editor.clearSelection();
  code = '';
}