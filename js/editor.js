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

module.exports = {
  editor: editor,
  consoleLog: consoleLog
}