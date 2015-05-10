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

var game = require('./game.js');
var sky = require('./sky.js');

/*
interaction
 */
var welcome = document.getElementById('welcome');
var message = document.querySelector('#middleMessage');
message.innerHTML = 'Double Click to play';

require('./select.js')();

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
  en.colliObjs.push(mesh);

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
  if (myItems[clickTimes] === undefined) myItems[clickTimes] = [];
  myItems[clickTimes].push(item);

  return [_x, _y, _z];
}

function addBlockAndHighlight(clickTimes, pos, lineNum, x, y, z, size) {
  var _pos = addBlock(clickTimes, pos, x, y, z, size);
  highlightLine(lineNum, true, _pos);
}

/*
animation
 */
var isOnTop = require('./collisionDetection.js').isOnTop;
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

    if (en.colliObjs.length) {
      isOnTop(delta);
    }

  }

});

//TODO: fix the logic later
/*
function destory() {
  en.pause = true;
  myItems[clickTimes].forEach(function (item) {
    game.removeItem(item);
  });
}
*/

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
  } catch (e) {
    console.log(e);
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