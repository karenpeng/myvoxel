// var editor = require('./editor.js').editor;
// var consoleLog = require('./editor.js').consoleLog;

// console.log(require('./editor.js'));
// document.getElementById('run').onclick = function () {
//   console.log(editor.getValue());
// }

// function parse(str){
//   try{
//     eval(str);
//   }catch(e){
//     console.log(e);
//   }
// }

/*
try eval!!!
 */

var editor = require('./editor.js').editor;
document.getElementById('run').onclick = function () {
  console.log(editor.getValue());
  parse(editor.getValue());
}

function parse(str) {
  try {
    console.log('start eval');
    eval(str);
    console.log('end eval');
  } catch (e) {
    console.log(e);
  }
}