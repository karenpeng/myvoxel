# voxel-move

> Utility for rotation relative based movement in [voxel.js](http://voxeljs.com).
> This probably totally already exists but I needed it faster than I could
> google for [voxel-drone](https://github.com/shama/voxel-drone).

## example
```js
var move = require('voxel-move')

// this would be our item in voxel.js
var item = {
  mesh: new game.THREE.Mesh( /* ... */ ),
  velocity: {x: 0, y: 0, z: 0}
}

// move it forward
move(item).front(0.5)

// rotate the item 90 degs
item.mesh.rotation.y = (Math.PI / 180) * 90

// now! move forward in the direction the item is facing
move(item).front(0.5)
```

All the methods are chainable. Only moves on XZ (maybe later if needed or if
someone else cares we can add in Y).

```js
move(item)
  .front(0.5)
  .back(0.5)
  .left(0.5)
  .right(0.5)
  .rotate(Math.PI / 180 * 90)
```

## release history
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
