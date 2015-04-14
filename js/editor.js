var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var editor = ace.edit('editor');
// editor.getSession().setMode('ace/mode/javascript');
editor.setTheme('ace/theme/monokai');

var consoleLog = ace.edit('console');
consoleLog.setReadOnly(true);
  consoleLog.setOptions({
    highlightActiveLine: false,
    highlightGutterLine: false
  });
consoleLog.renderer.$cursorLayer.element.style.opacity = 0;

var editing = false;

editor.on('focus', function () {
  editor.getSession().setMode('ace/mode/javascript');
  editing = true;
});

editor.on("blur", function () {
  editing = false;
});


var Range = ace.acequire('ace/range').Range;
//console.log(Range);

function addMarkerRange(lineNum) {
  return new Range(lineNum, 0, lineNum, 2000);
}

module.exports = {
  editor: editor,
  consoleLog: consoleLog,
  addMarkerRange: addMarkerRange
}