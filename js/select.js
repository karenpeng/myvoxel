var highlight = require('voxel-highlight');
var en = require('./global.js');

module.exports = function () {
  var hl = highlight(en.game, {
    color: 0xffffff
  });

  hl.on('highlight', function (_voxelPos) {
    en.startPosition = _voxelPos;
  });

  en.game.on('fire', function () {
    console.log('start from here!', en.startPosition[0], en.startPosition[1], en.startPosition[2]);
    var esc = $.Event("keydown", {
      which: 27
    });
    $("body").trigger(esc);
    en.game.interact.emit('release');
  });

}