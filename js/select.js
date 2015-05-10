var en = require('./global.js');
var highlight = require('voxel-highlight');
var game = require('./game.js');

module.exports = function () {
  var hl = highlight(game, {
    color: 0xffffff
  });

  hl.on('highlight', function (_voxelPos) {
    en.startPosition = _voxelPos;
  });

  game.on('fire', function () {
    console.log('start from here!', en.startPosition[0], en.startPosition[1], en.startPosition[2]);
    var esc = $.Event("keydown", {
      which: 27
    });
    $("body").trigger(esc);
    game.interact.emit('release');
  });

}