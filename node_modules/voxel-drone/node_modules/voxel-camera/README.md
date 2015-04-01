# voxel-camera

> A camera for [voxeljs](http://voxeljs.com).

View [the voxel-drone demo](http://shama.github.com/voxel-drone) as it uses this
camera.

## example
```js
// voxel-camera returns a method to create a camera controller
var createCameraControl = require('voxel-camera');

// Create a camera control, pass a copy of the game
var cameraControl = createCameraControl(game);

// Add the camera to the scene
game.scene.add(cameraControl.camera());

// Build a monitor (essentially a box to map the video screen to)
var monitor = new game.THREE.Mesh(
  new game.THREE.CubeGeometry(100, 100, 1),
  new game.THREE.MeshBasicMaterial({
    map: cameraControl.monitor()
  })
);

// Add monitor mesh to the scene
game.scene.add(monitor);

// Then render the camera on tick
game.on('tick', function(dt) {
  cameraControl.render();

  // or to have the camera follow a voxeljs item
  // cameraControl.render(followItem);
});
```

If you need a marker on where the camera is set `marker` to `true`:

```js
var createCameraControl = require('voxel-camera');
var cameraControl = createCameraControl({game: game, marker: true});
```

If you would like to get a PNG stream from the camera:

```js
var cameraControl = createCameraControl(game);
cameraControl.resume();

var img = document.getElementById('myimg');
cameraControl.on('data', function(pngData) {
  img.src = pngData;
});
```

_Warning: This uses `canvas.toDataURL('image/png')` which is currently a really
expensive operation in the browser. Might want to consider throttling. If anyone
has a suggestion on a less expensive way, I'd love to hear it!_

## install
With [npm](http://npmjs.org) do:

```
npm install voxel-camera
```

## release history
* 0.1.1 - convert into a stream and emit pngs :D
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
