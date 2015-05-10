var en = require('./global.js');
var game = require('./game.js');
var highlightLine = require('./editor.js').highlightLine;

var myMaterial = ['brick', 'cobblestone', 'bluewool', 'glowstone', 'diamond', 'grass_dirt', 'grass'];
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
  // if (myItems[clickTimes] === undefined) myItems[clickTimes] = [];
  // myItems[clickTimes].push(item);

  return [_x, _y, _z];
}

function addBlockAndHighlight(clickTimes, pos, lineNum, x, y, z, size) {
  var _pos = addBlock(clickTimes, pos, x, y, z, size);
  highlightLine(lineNum, true, _pos);
}

module.exports = {
  addBlock: addBlock,
  addBlockAndHighlight: addBlockAndHighlight
}