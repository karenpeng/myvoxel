# voxel-forest

generate voxel trees

# example

[Run this example.](http://substack.net/projects/voxel-forest)

``` js
var createTerrain = require('voxel-perlin-terrain');

var createEngine = require('voxel-engine');
var game = createEngine({
    generateVoxelChunk: createTerrain(2, 32),
    chunkDistance: 2,
    materials: [ 'grass_top', 'tree_side', 'leaves_opaque' ],
    texturePath: './textures/'
});
game.controls.pitchObject.rotation.x = -1.5;
game.appendTo('#container');
window.game = game;

var createTree = require('voxel-forest');
for (var i = 0; i < 250; i++) {
    createTree(game, { bark: 2, leaves: 3 });
}

var explode = require('voxel-debris')(game);
game.on('mousedown', function (pos) {
    if (erase) explode(pos)
    else game.createBlock(pos, 1)
});

window.addEventListener('keydown', ctrlToggle);
window.addEventListener('keyup', ctrlToggle);

var erase = true
function ctrlToggle (ev) { erase = !ev.ctrlKey }
game.requestPointerLock('canvas');
```

# methods

``` js
var createTree = require('voxel-forest')
```

## createTree(game, opts)

Create a tree for the [voxel-engine](http://github.com/maxogden/voxel-engine)
instance `game` and options `opts`.

`opts.bark` and `opts.leaves` are the voxel data values to use for the tree
materials.

`opts.height` is the number of blocks for the tree to grow up to.

`opts.base` is the block height to start putting foliage around the trunk.

`opts.position` is an object with `x`, `y`, and `z` fields that describes where
to put the tree. If `opts.position.y` is inside of terrain or suspended in the
air, the `y` will be cast upward or downward to the terrain surface.

If `opts.position` isn't given, a random location on the voxel terrain will be
chosen.

# install

With [npm](https://npmjs.org) do:

```
npm install voxel-forest
```

Use [browserify](http://browserify.org) to `require('voxel-forest')` in the
browser.

# license

MIT
