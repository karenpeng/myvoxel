var createGame = require('voxel-engine');
var skin = require('minecraft-skin');
var terrain = require('voxel-perlin-terrain');
var highlight = require('voxel-highlight');

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

var voxelPos = [0, 0, 0];
var startPosition = [0, 0, 0];
var clickTimes = 0;
var colliObjs = [];
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
var game = createGame({

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

window.game = game; //for debug:)

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
})

var light = new game.THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 20, 0);
game.scene.add(light);

var light1 = new game.THREE.DirectionalLight(0xffffff, 0.5);
light1.position.set(0, 10, 0);
game.scene.add(light1);

var createSky = require('voxel-sky')(game);

var sky = createSky();

//create dude
var createPlayer = require('voxel-player')(game);
var dude = createPlayer('textures/dude.png');
dude.possess();
//jump from sky
var jumpFromSky = 10;
dude.yaw.position.set(0, jumpFromSky, 0);
window.dude = dude; //for debug

window.onkeydown = function (e) {
  if (!en.editing && e.keyCode === 'R'.charCodeAt(0)) {
    dude.toggle();
  }
  if (e.which === 32 && jumpable /*&& onTop*/ ) {
    e.preventDefault();
    dude.resting.y = false;
    dude.velocity.y = 0.014;
  }
}

var welcome = document.getElementById('welcome');
var message = document.querySelector('#middleMessage');
message.innerHTML = 'Double Click to play';

var jumpable = true;
game.interact.on('attain', function () {
  jumpable = true;
})
game.interact.on('release', function () {
  jumpable = false;
})

/*
the api for end-user
 */
function addBlock(_clickTimes, pos, _x, _y, _z, _size) {
  // create a mesh and use the internal game material (texture atlas)
  var size = _size || 1;
  var mesh = new game.THREE.Mesh(
    new game.THREE.CubeGeometry(size, size, size), // width, height, depth
    game.materials.material
  )

  // paint the mesh with a specific texture in the atlas
  game.materials.paint(mesh, myMaterial[en.materialIndex]);

  var x = _x + pos[0] + 0.5 || pos[0] + 0.5;
  var y = _y + pos[1] + 1.5 || pos[1] + 1.5;
  var z = _z + pos[2] + 0.5 || pos[2] + 0.5;

  mesh.position.set(x, y, z);
  mesh.name = _clickTimes;
  colliObjs.push(mesh);

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

game.on('tick', function (delta) {
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

    if (colliObjs.length) {
      //isOnTop(delta);
    }

  }

})

/*
collision detection stuffs
 */
var isOnTop = require('./collisionDetection.js').isOnTop;

/*
interaction
 */
var hl = highlight(game, {
  color: 0xffffff
});

hl.on('highlight', function (_voxelPos) {
  voxelPos = _voxelPos;
});

game.on('fire', function () {
  startPosition = voxelPos;
  console.log('start from here!', startPosition[0], startPosition[1], startPosition[2]);
  var esc = $.Event("keydown", {
    which: 27
  });
  $("body").trigger(esc);
  game.interact.emit('release');
});

/*
eval
 */
document.getElementById('run').onclick = function () {
  evaled = false;
  parse(editor.getValue(), editor.session.doc.getAllLines());
}

function recover() {
  evaled = false;
  begintToCount = 0;
  removeMarker();
  editor.setValue(code);
  editor.clearSelection();
  code = '';
}

function parse(str, arr) {

  try {
    var str2 = wrapGenerator(arr, str);
    console.log(str2);
    eval(str2);
    call = wwwaaattt(clickTimes, startPosition);
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