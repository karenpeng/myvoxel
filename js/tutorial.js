var editor = require('./editor.js').editor;

var tutorials =[
['//Let\'s start from building one block.',
  '',
  '//First, click a place with your mouse.',
  '//Second, press esc key.',
  '//Third, use the code below:',
  'addThing(0, 0, 0);',
  '//Now, click the "Build" button.',
  '',
  '//See the block you create in the world?',
  '//Congrats!',
  '',
  '//The three 0 in the function,',
  '//represen the x, y, and z position of the block.',
  '',
  '//You could replace the 0 with different values',
  '//and see where the block will be.'
],

[
  '//What if you want to build many blocks?',
  '//Now, let\'s use a loop',
  '',
  'for(var i = 0; i < 6; i++){',
  ' addThing(i, 0, 0);',
  '}',
  '//it increments blah blah blah'
],


[]

]

// document.getElementById('welcome').onclick = function(){
//   console.log('hello?')
//   document.getElementById('welcome').style.visibility = 'hidden';
// }

document.getElementById('t1').onclick = function(){
  editor.setValue(tutorials[0].join('\n'));
  editor.clearSelection();
}
document.getElementById('t2').onclick = function(){
  editor.setValue(tutorials[1].join('\n'));
  editor.clearSelection();
}
// for(var i = 0; i < 3; i++){
//   addThing(i, 0, 0);
// }


// for(var i = 0; i < 6;i++){
//   if(i % 2=== 0){
//     addThing(i, 0, 0);
//   }else{
//     addThing(0, i, 0);
//   }
// }

// for(var i = 0; i< 60; i++){
//   addThing(Math.sin(i*0.2)*10, 2, Math.cos(i*0.2)*10);
// }

// var addGuy = function(x,y,z,c){
//   var X = x || 0;
//   var Y = y  || 0;
//   var Z = z || 0;
//   var C = c || 0;
//   if(C < 10){
//     C++;
//     addThing(X,Y,Z);
//     addGuy(C,C,0,C);
//   }
// }
// addGuy();

// var i = 0;
// while(true){
//   addThing(i, i, 0);
//   i++;
// }

  //for (var i = 0; i <= 1; i += 0.1) {
  //  for (var j = 0; j <= 1; j += 0.1) {
  //    var uv = [i, j];

  //    var u = uv[0];
  //    var v = uv[1];

  //    var theta = 2 * Math.PI * u;
  //    var phil = Math.PI * v - Math.PI / 2;
  //    var x = Math.cos(phil) * Math.sin(theta) * 4;
  //    var y = Math.sin(phil) * 4;
  //    var z = Math.cos(phil) * Math.cos(theta) * 4;
  //    addThing(x, y + 4, z);
  //  }
  //}