var inherits = require('inherits')
var events = require('events')

module.exports = function(game, opts) {
  return new Selector(game, opts)
}

function Selector(game, opts) {
  if (!opts) opts = {}
  this.opts = opts
  this.game = game
}

inherits(Selector, events.EventEmitter)

Selector.prototype.set = function(start, end, visible) {
  if (typeof visible === 'undefined') visible = true
  var THREE = this.game.THREE
  this.start = start
  this.end = end
  if (visible) this.drawMesh(this.start, this.end)
}

Selector.prototype.drawMesh = function(start, end) {
  var THREE = this.game.THREE
  var cube = new THREE.CubeGeometry(1, 1, 1)
  var material = new game.THREE.MeshBasicMaterial({
    color: 0xffaa00,
    wireframe: true,
    wireframeLinewidth: 2
  })
  var mesh = new THREE.Mesh( cube, material )
  
  var scale = []
  scale[0] = Math.abs(end[0] - start[0]) + 1
  scale[1] = Math.abs(end[1] - start[1]) + 1
  scale[2] = Math.abs(end[2] - start[2]) + 1
  mesh.scale.set(scale[0], scale[1], scale[2])

  var pos = []
  pos[0] = this.start[0] + 0.5 + (this.end[0] - this.start[0]) / 2
  pos[1] = this.start[1] + 0.5 + (this.end[1] - this.start[1]) / 2
  pos[2] = this.start[2] + 0.5 + (this.end[2] - this.start[2]) / 2
  mesh.position.set(pos[0], pos[1], pos[2])

  this.game.scene.add(mesh)
  this.mesh = mesh
}

Selector.prototype.bounds = function() {
  var s = this.start
  var e = this.end
  return [
    [Math.min(s[0], e[0]), Math.min(s[1], e[1]), Math.min(s[2], e[2])],
    [Math.max(s[0], e[0]), Math.max(s[1], e[1]), Math.max(s[2], e[2])],
  ]
}

Selector.prototype.dimensions = function() {
  var bounds = this.bounds()
  var w = bounds[1][0] - bounds[0][0]
  var h = bounds[1][1] - bounds[0][1]
  var d = bounds[1][2] - bounds[0][2]
  return [w + 1, h + 1, d + 1]
}

Selector.prototype.transform = function(func) {
  var bounds = this.bounds()
  var l = bounds[0], h = bounds[1]
  for(var z = h[2]; z >= l[2]; --z)
    for(var y = h[1]; y >= l[1]; --y)
      for(var x = h[0]; x >= l[0]; --x)
        func(x, y, z, this.game)
}

Selector.prototype.selection = function() {
  var d = this.dimensions()
  var v = new Int8Array(d[0] * d[1] * d[2])
  this.transform(function(x, y, z, n) {
    v[n] = this.game.getBlock(x, y, z)
  })
  return {voxels: v, dimensions: d, start: this.start}
}

Selector.prototype.reset = function() {
  this.start = false
  this.end = false
  if (this.mesh) {
    this.game.scene.remove(this.mesh)
    this.mesh = undefined
  }
}