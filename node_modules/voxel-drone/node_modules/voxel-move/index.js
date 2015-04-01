module.exports = function(item) {
  function mv(v, a) {
    item.velocity.x += Math.cos(a) * v
    item.velocity.z += Math.sin(a) * v
  }
  function deg2rad(d) { return d * (Math.PI / 180) }
  return {
    front: function(v) {
      mv(v, -item.mesh.rotation.y)
      return this
    },
    back: function(v) {
      mv(v, -item.mesh.rotation.y + deg2rad(180))
      return this
    },
    left: function(v) {
      mv(v, -item.mesh.rotation.y + deg2rad(90))
      return this
    },
    right: function(v) {
      mv(v, -item.mesh.rotation.y + deg2rad(270))
      return this
    },
    rotate: function(r) {
      item.mesh.rotation.y += r
      return this
    }
  }
}
