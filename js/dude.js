var en = require('./global.js');
var createPlayer = require('voxel-player')(en.game);
var skin = require('minecraft-skin');

en.dude = createPlayer('textures/dude.png');
en.dude.possess();
//jump from sky
var jumpFromSky = 40;
en.dude.yaw.position.set(0, jumpFromSky, 0);
en.dude.jumpable = true;

window.onkeydown = function (e) {
  if (!en.editing && e.keyCode === 'R'.charCodeAt(0)) {
    en.dude.toggle();
  }
  if (e.which === 32 && en.dude.jumpable /*&& onTop*/ ) {
    e.preventDefault();
    en.dude.resting.y = false;
    en.dude.velocity.y = 0.014;
  }
}

en.game.interact.on('attain', function () {
  en.dude.jumpable = true;
});
en.game.interact.on('release', function () {
  en.dude.jumpable = false;
});