# voxel-select

work in progress -- not done yet

select a cube shaped group/region of voxels in game. useful for exporting parts of a world, etc

```js
npm install voxel-select
```

## example

```js
var createSelector = require('voxel-select')

var selector = createSelector(game)

select.set(start, end) // bounding box positions
```

## api

### require('voxel-selector')

returns an initialization function that you must pass your game object into in order to get a selector instance

### selector.set(start, end, visible)

sets the selection. `start` and `end` should be [x, y, z] vectors. `visible` is by default true and controls whether or not to draw a selection wireframe

### selector.dimensions()

returns absolute [width, height, depth] of the current selection

### selector.transform(function(x, y, z, idx) {})

run a function over each voxel in the current selection. `idx` is the voxel interchange format array index

### selector.selection()

returns data in the [voxel interchange format](https://github.com/maxogden/voxel-engine)

### selector.reset()

clears the current selection and removes the wireframe if present

## license

BSD