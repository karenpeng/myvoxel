var en = require('./global.js');

var game = require('./game.js');
var sky = require('./sky.js');

var runGenerator = require('./generator.js');
var recover = require('./run.js').recover;

var isOnTop = require('./collisionDetection.js').isOnTop;

var theta = 0;
var frameCount = 0;

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