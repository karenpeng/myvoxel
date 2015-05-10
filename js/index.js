var en = require('./global.js');
require('./welcome.js');

var editor = require('./editor').editor;
var consoleLog = require('./editor').consoleLog;
var addMarkerRange = require('./editor.js').addMarkerRange;
var runGenerator = require('./generator.js');
var recover = require('./run.js').recover;
var removeMarker = require('./editor.js').removeMarker;

require('./toolbar.js');
require('./slider.js');
require('./button.js');
var init = require('./tutorial.js').init;
init(removeMarker);

// var myItems = [];

var theta = 0;
var frameCount = 0;

var game = require('./game.js');
var sky = require('./sky.js');
require('./select.js');
var isOnTop = require('./collisionDetection.js').isOnTop;

/*
animation
 */
game.on('tick', function (delta) {
  frameCount++;
  sky(delta);

  if (frameCount !== 0 && frameCount % 2 === 0) {

    theta += (delta / 16);

    if (en.beginToCount % en.interval === 0 && en.evaled) {
      try {
        runGenerator(en.call, recover);
      } catch (e) {
        console.log(e);
        consoleLog.insert(e.toString());
        return;
      }
    }

    if (en.evaled) {
      en.beginToCount += (delta / 16);
    }

    if (en.colliObjs.length) {
      isOnTop(delta);
    }

  }

});