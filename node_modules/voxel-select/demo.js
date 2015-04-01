var textures = "http://commondatastorage.googleapis.com/voxeltextures/"
var highlight = require('voxel-highlight')
var createSelect = require('./')
var fly = require('voxel-fly')
var transforms = require('voxel-transforms')
var game = require('voxel-hello-world')({
  generate: function hill(x, y, z) {
    return y <= 16 * Math.exp(-(x*x + z*z) / 64) ? 1 : 0
  },
  materials: [
    ['grass', 'dirt', 'grass_dirt'],
    'obsidian',
    'brick',
    'grass',
    'plank',
    'whitewool'
  ],
  chunkDistance: 1,
  texturePath: textures,
  playerSkin: textures + 'player.png'
}, setup)

var makeFly = fly(game)
makeFly(game.controls.target())

function setup(game, avatar) {
  avatar.position.copy({x: 9, y: 2, z: 19})
  
  var select = createSelect(game)
  window.sel = select

  var blockPosPlace, blockPosErase
  var hl = game.highlighter = highlight(game, { color: 0x000000, distance: 100 })
  hl.on('highlight', function (voxelPos) { blockPosErase = voxelPos })
  hl.on('remove', function (voxelPos) { blockPosErase = null })
  hl.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })
  hl.on('remove-adjacent', function (voxelPos) { blockPosPlace = null })
  hl.on('highlight-deselect', function(pos) {
    select.reset()
    select.set(pos.start, pos.end, true)
    var bounds = select.bounds()
    switch (dropdown.value) {
      case 'overlay': return select.transform(transforms.overlay(6))
      case 'walls': return transforms.walls(game, bounds[0], bounds[1], 3)
      case 'nothing': return
    }
  })

  var shiftDown = false

  window.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 16) shiftDown = true
    if (ev.keyCode === 'R'.charCodeAt(0)) avatar.toggle()
  })

  window.addEventListener('keyup', function (ev) {
    if (ev.keyCode === 16) shiftDown = false
  })
  
  var dropdown = document.querySelector('select')
  
  game.on('fire', function (target, state) {
    var select = game.controls.state.select
    if (shiftDown && select) return game.controls.state.select = false
    if (shiftDown && !select) return game.controls.state.select = true
    
    var position = blockPosPlace
    if (position) {
      game.createBlock(position, 1)
    } else {
      position = blockPosErase
      if (position) game.setBlock(position, 0)
    }
  })
}
