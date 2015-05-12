var en = require('./global.js');
require('./welcome.js');

var editor = require('./editor').editor;
var consoleLog = require('./editor').consoleLog;
var addMarkerRange = require('./editor.js').addMarkerRange;

var removeMarker = require('./editor.js').removeMarker;

require('./toolbar.js');
require('./slider.js');
require('./button.js');
var init = require('./tutorial.js').init;
init(removeMarker);

// var myItems = [];

/*
setup
 */
var game = require('./game.js');
var sky = require('./sky.js');

require('./select.js');

/*
animation
 */
require('./animation.js');