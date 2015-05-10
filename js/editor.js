var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var en = require('./global.js');

var getNewContent = require('./parse.js').getNewContent;

editor = ace.edit('editor');
editor.getSession().setMode('ace/mode/javascript');
editor.setTheme('ace/theme/monokai');

consoleLog = ace.edit('console');
consoleLog.setReadOnly(true);
consoleLog.setOptions({
  highlightActiveLine: false,
  highlightGutterLine: false
});
consoleLog.renderer.$cursorLayer.element.style.opacity = 0;

editor.on('focus', function () {
  editor.getSession().setMode('ace/mode/javascript');
  en.editing = true;
  removeMarker();
});

editor.on("blur", function () {
  en.editing = false;
});

var Range = ace.acequire('ace/range').Range;

function addMarkerRange(lineNum) {
  return new Range(lineNum, 0, lineNum, 2000);
}

function removeMarker() {
  if (en.marker) {
    editor.session.removeMarker(en.marker);
    en.marker = null;
  }
}

function highlightLine(lineNum, change, pos) {
  //console.log('line index ' + lineNum);
  removeMarker();
  en.marker = editor.session.addMarker(addMarkerRange(lineNum), 'highlight', 'fullLine', false);
  if (change) {
    var oldLine = editor.session.getLine(lineNum);
    var newLine = getNewContent(oldLine, pos);
    editor.session.replace(addMarkerRange(lineNum), newLine);
  }
}

module.exports = {
  editor: editor,
  consoleLog: consoleLog,
  addMarkerRange: addMarkerRange,
  removeMarker: removeMarker,
  highlightLine: highlightLine
}