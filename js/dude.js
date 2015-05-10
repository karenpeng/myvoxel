var en = require('./global.js');
var game = require('./game.js');
var createPlayer = require('voxel-player')(game);

dude = createPlayer('textures/dude.png');
dude.possess();
//jump from sky
var jumpFromSky = 40;
dude.yaw.position.set(0, jumpFromSky, 0);
dude.jumpable = true;

window.onkeydown = function (e) {
  if (!en.editing && e.keyCode === 'R'.charCodeAt(0)) {
    dude.toggle();
  }
  if (e.which === 32 && dude.jumpable /*&& onTop*/ ) {
    e.preventDefault();
    dude.resting.y = false;
    dude.velocity.y = 0.014;
  }
}

game.interact.on('attain', function () {
  dude.jumpable = true;
});
game.interact.on('release', function () {
  dude.jumpable = false;
});

module.exports = dude;