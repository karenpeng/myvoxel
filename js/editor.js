var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var editor = ace.edit('editor');
editor.getSession().setMode('ace/mode/javascript');
editor.setTheme('ace/theme/monokai');

var consoleLog = ace.edit('console');

var editing = false;

editor.on('focus', function () {
  editing = true;
});

editor.on("blur", function () {
  editing = false;
});


var Range = ace.acequire('ace/range').Range;
console.log(Range);

function addMarkerRange(lineNum) {
  return new Range(lineNum, 0, lineNum, 2000);
}

module.exports = {
  editor: editor,
  consoleLog: consoleLog,
  addMarkerRange: addMarkerRange
}