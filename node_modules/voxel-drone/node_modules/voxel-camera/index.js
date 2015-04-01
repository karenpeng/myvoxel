var Stream = require('stream');
var util = require('util');

function Camera(options) {
  var self = this;
  Stream.call(self);

  options = options || {};
  if (options.THREE) options = {game:options};
  if (!options.game) throw new Error('Must specify a game.');
  self.game = options.game;
  options.marker = options.marker || false;
  self.readable = true;
  self._emitPng = false;

  self._camera = new self.game.THREE.PerspectiveCamera(
    60, self.game.width / self.game.height, 1, 10000
  );

  if (options.marker) {
    self._marker = new self.game.THREE.Mesh(
      new self.game.THREE.SphereGeometry(5, 5, 5),
      new self.game.THREE.MeshPhongMaterial({
        color: 0xff0000, emissive: 0xff0000,
        shading: self.game.THREE.FlatShading
      })
    );
    self._marker.position.copy(self._camera.position);
    self.game.scene.add(self._marker);
  }

  self._monitors = [];
}
util.inherits(Camera, Stream);
module.exports = function(options) { return new Camera(options); };
module.exports.Camera = Camera;

Camera.prototype.camera = function() { return this._camera; };

// create a monitor to view the camera
Camera.prototype.monitor = function(width, height) {
  // must be equal otherwise generates WebGL mipmap errors
  width = width || 512; height = height || 512;
  var monitor = new this.game.THREE.WebGLRenderTarget(width, height, {
    format: this.game.THREE.RGBFormat
  });
  this._monitors.push(monitor);
  return monitor;
};

// render the monitors and have the camera follow an item
Camera.prototype.render = function(follow, offset, look) {
  var self = this;
  self._monitors.forEach(function(monitor) {
    self.game.renderer.render(self.game.scene, self._camera, monitor, true);
  });
  if (self.listeners('data').length > 0 && self._emitPng) {
    self.emit('data', self.game.renderer.domElement.toDataURL('image/png'));
  }
  if (follow) {
    var camOffset = new self.game.THREE.Vector3(0, 0, 1)
    if (offset) camOffset = camOffset.addSelf(offset);
    camOffset = follow.mesh.matrixWorld.multiplyVector3(camOffset);
    self._camera.position.x = camOffset.x;
    self._camera.position.y = camOffset.y;
    self._camera.position.z = camOffset.z;
    self._camera.rotation.x = follow.mesh.rotation.x;
    self._camera.rotation.y = follow.mesh.rotation.y;
    self._camera.rotation.z = follow.mesh.rotation.z;
    var lookOffset = look || new self.game.THREE.Vector3(0, 0, -1);
    self._camera.lookAt(follow.mesh.matrixWorld.multiplyVector3(lookOffset));
  }
  if (self._marker) self._marker.position.copy(this._camera.position);
};

Camera.prototype.resume = function() { this._emitPng = true; };
Camera.prototype.pause = function() { this._emitPng = false; };
Camera.prototype.destroy = function() {
  this._emitPng = false;
  this.readable = false;
  this.removeAllListeners();
  this.emit('close');
};
