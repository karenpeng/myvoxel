var en = require('./global.js');
var consoleLog = require('./editor').consoleLog;
var wrapGenerator = require('./parse.js').wrapGenerator;
var runGenerator = require('./generator.js');
var removeMarker = require('./editor.js').removeMarker;
var addBlock = require('./api.js').addBlock;
var addBlockAndHighlight = require('./api.js').addBlockAndHighlight;
var highlightLine = require('./editor.js').highlightLine;

exports.run = function (str, arr) {
  try {
    var str2 = wrapGenerator(arr, str);
    console.log(str2);
    eval(str2);
    en.call = wwwaaattt(en.clickTimes, en.startPosition);
    en.evaled = true;
  } catch (e) {
    console.log(e);
    consoleLog.insert(e.toString());
    return;
  }

  en.code = str;

  try {
    runGenerator(en.call, exports.recover);
  } catch (e) {
    console.log(e);
    consoleLog.insert(e.toString());
    return;
  }

  en.clickTimes++;
}

exports.recover = function () {
  en.evaled = false;
  en.beginToCount = 0;
  removeMarker();
  editor.setValue(en.code);
  editor.clearSelection();
  en.code = '';
}