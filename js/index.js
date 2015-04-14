var createGame = require('voxel-engine');
var skin = require('minecraft-skin');
var terrain = require('voxel-perlin-terrain');
//var createSelect = require('voxel-select');
// var highlight = require('voxel-highlight');
// var transforms = require('voxel-transforms');
//require('./parse.js');
// var toolbar = require('toolbar');
// var bartab = toolbar('.bar-tab');
//var fly = require('voxel-fly');

var voxelPos = [0, 0, 0];
var startPosition = [0, 0, 0];
var clickTimes = 0;
var codes = [];
var colliObjs = [];
var myItems = [];
/*
set up game
 */

var game = createGame({

  generateChunks: false,
  texturePath: 'textures/',
  materials: [
    ['grass', 'dirt', 'grass_dirt']
    ,'brick'
    // ,'meow'
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
light.position.set(0, 10, 0);
game.scene.add(light);

// var makeFly = fly(game);
// makeFly(game.contrls.target())

var createSky = require('voxel-sky')(game);

var sky = createSky();

// toolbar('.bar-tab').on('select', function (item) {
//   currentMaterial = item
// })

//create dude
var createPlayer = require('voxel-player')(game);
var dude = createPlayer('textures/dude.png');
dude.possess();
//jump from sky
var jumpFromSky = 10;
dude.yaw.position.set(0, jumpFromSky, 0);
window.dude = dude; //for debug

window.addEventListener('keydown', function (ev) {
  if (!editing && ev.keyCode === 'R'.charCodeAt(0)) {
    dude.toggle();
  }
});

// var dude2 = skin(game.THREE, 'textures/dude.png').createPlayerObject();
// //console.log(dude2);
// dude2.position.set(10, 4, 0);
// dude2.scale.set(0.1, 0.1, 0.1);
// window.dude2 = dude2;
// game.scene.add(dude2);

// var createDrone = require('voxel-drone');
// var logodrone = require('logo-drone');
// var drone = createDrone(game);
// var item = drone.item();
// item.avatar.position.set(0, 10, -10);
// game.addItem(drone.item());

window.myItems = myItems;

/*
the api for end-user
 */
function addThing( _clickTimes, pos, _x, _y, _z) {
  console.log('raph');
  console.log(_clickTimes);
  // create a mesh and use the internal game material (texture atlas)

  var mesh = new game.THREE.Mesh(
    new game.THREE.CubeGeometry(1, 1, 1), // width, height, depth
    game.materials.material
  )

  // paint the mesh with a specific texture in the atlas
  game.materials.paint(mesh, 'brick');

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

  //myItem is for destorying things
  myItems.push(item);
  // colliObjs.push(item.mesh);

  return mesh;
    //use `game.removeItem(item)` to remove
    //return [x, y, z];
}
window.addThing = addThing; //for debug



/*
animation
 */
var theta = 0;
var interval = 60;
var begintToCount = 0;
var result2 = null;
var result2pre = null;
var frameCount = 0;

game.on('tick',function(delta){
  frameCount ++;
  sky(delta);

  if(frameCount !== 0 && frameCount % 2 === 0){
    //dude2.rotation.y = theta / 100;

    theta += (delta / 16);

    if(begintToCount % interval === 0 && evaled){
      runGenerator(call);
    }

    if(evaled){
      begintToCount += (delta / 16);
    }

    var result = isHit();
    if(result){
      dude.position.set(dude.yaw.position.x, dude.yaw.position.y + result.y, dude.yaw.position.z);
    };

    // result2 = isClose();

    // if(result2!== null && result2 !== result2pre){
    //   //1.show code
    //   //2.how does reset button work?
    //   console.log('wwwaaattt');
    //   showCode(result2);
    //   result2pre = result2;
    // }

    //isSelect();
  }
})

/*
collision detection stuffs
 */
function showCode(name){
  editor.setValue(codes[name]);
}

function destory(name){
  myItems.forEach(function(item){
    if(item.name == name){
      game.removeItem(item);
    }
  })
  codes[name] = null;
}
// window.destory = destory; //for debug

//collision detection!!!
var rayCaster = new game.THREE.Raycaster();

function isHit() {
    //get user direction!!
    var ray = new game.THREE.Vector3(0, -1, 0);
    rayCaster.ray.set(dude.yaw.position, ray);
    var intersects = rayCaster.intersectObjects(colliObjs);
    if (intersects.length > 0 && intersects[0].distance <= 0.5) {
      //console.log(intersects[0].object.position);
      return intersects[0].object.position;
    }
    return false;
}

// function isClose() {
//   var rays = [
//   new game.THREE.Vector3(1, 0, 0),
//   new game.THREE.Vector3(-1, 0, 0),
//   new game.THREE.Vector3(0, 0, 1),
//   new game.THREE.Vector3(0, 0, -1),
//   new game.THREE.Vector3(0, 1, 0),
//   new game.THREE.Vector3(0, -1, 0)
//   ];

//   var name = null;
//   for(var i = 0; i< rays.length; i++){
//     var ray = rays[i];
//     rayCaster.ray.set(dude.yaw.position, ray);
//      var intersects = rayCaster.intersectObjects(colliObjs);
//     if (intersects.length > 0 && intersects[0].distance <= 2) {
//       //console.log(intersects[0].object.name);
//       name = intersects[0].object.name;
//       break;
//     }
//   }
//   return name;
// }


// var mouse = new game.THREE.Vector2();
// var INTERSECTED;

// function onDocumentMouseMove( event ) {
//   event.preventDefault();
//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//   //console.log(mouse.x, mouse.y);
// }
// document.addEventListener( 'mousemove', onDocumentMouseMove, false );


// function isSelect(){
//   rayCaster.setFromCamera( mouse, game.camera );
//   var intersects = rayCaster.intersectObjects(colliObjs);

//   if ( intersects.length > 0 ) {
//     console.log('ohhhhh')
//     console.log(intersects[0].object.name)

//     if ( INTERSECTED != intersects[ 0 ].object ) {

//       if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

//       INTERSECTED = intersects[ 0 ].object;
//       INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
//       INTERSECTED.material.emissive.setHex( 0xff0000 );

//     }

//   } else {

//     if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

//     INTERSECTED = null;

//   }
// }

  /*
  interaction!
   */
// var createSelect = require('voxel-select');
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
  startPosition = voxelPos;
  console.log('start from here!' , startPosition[0] , startPosition[1], startPosition[2]);
});

var welcome = document.getElementById('welcome');
var message = document.querySelector('#middleMessage');
message.innerHTML = 'Double Click to play';
// if (game.notCapable()) {
//   console.log('hello?')
//   welcome.style.visibility = 'hidden';
// }
// game.interact.on('attain', function() {
//   welcome.style.visibility = 'hidden';
// })
// game.interact.on('release', function() {
//   console.log('ouch1')
//   welcome.style.visibility = 'visible';
// })


/*
eval!
 */
var editor = require('./editor.js').editor;
var consoleLog = require('./editor.js').consoleLog;
var editing = require('./editor.js').editing;
document.getElementById('run').onclick = function () {
  evaled = false;
  parse(editor.getValue(), editor.session.doc.getAllLines());
}

// document.getElementById('reset').onclick = function(){
//   if(result2 === result2pre && result2 !== null){
//     destory(result2pre);
//   }
// }

/*
parse
 */
//var maxMinFuc = require('./parse.js').maxMinFuc;
var wrapGenerator = require('./parse.js').wrapGenerator;

function parse(str, arr) {

  try {
    //console.log('start eval');
    var str2 = wrapGenerator(arr);
    console.log(str2);
    eval(str2);
    call = wwwaaattt(clickTimes, startPosition);
    console.log('meow');
    console.log(clickTimes);
    evaled = true;
    //console.log('end eval');
  } catch (e) {
    console.log(e);
    consoleLog.insert(e);
    return;
  }

  codes.push(str);
  clickTimes ++;

}

function drawAndAddThing(clickTimes, pos, lineNum, x, y, z){
  addThing(clickTimes, pos, x, y, z);
  highlightLine(lineNum);
}


/*
editor
 */
var addMarkerRange = require('./editor.js').addMarkerRange;
var marker = null;
exports.marker = marker;

function highlightLine(lineNum){
  //console.log('line index ' + lineNum);
  if(marker) {
    editor.session.removeMarker(marker);
    marker = null;
  }
  marker = editor.session.addMarker(addMarkerRange(lineNum), 'highlight', 'fullLine', false);
}

editor.on('focus', function(){
  editing = true;
  if(marker) {
    editor.session.removeMarker(marker);
    marker = null;
  }
});

var editing = false;

editor.on("blur", function () {
  editing = false;
});

/*
generator
 */

var call;
var evaled = false;
var pause = false;

function runGenerator(generator) {
  //console.log(generator)
  if(pause){
    return;
  }

  var ret = generator.next();

  if(ret.done) {
    evaled = false;
    begintToCount = 0;
    editor.session.removeMarker(marker);
    marker = null;
    return;
  }
  //console.log(ret.value);
}


/*
slider
 */
var mySlider = $('#sliderr').slider({
  formatter: function(value) {
    return 'Current value: ' + value;
  }
});

mySlider.on('slide', function(e){
  console.log(e.value);
  interval = e.value;
});

document.getElementById('pause').onclick = function(){
  pause = !pause;
  if(pause){
    document.getElementById('pause').innerHTML = 'Continue';
  }else{
    document.getElementById('pause').innerHTML = 'Pause';
  }
}

document.getElementById('reset').onclick = function(){
  var id = clickTimes - 1;
  call = null;
  destory(id);
}

/*
tutorial
 */
require('./tutorial.js');
