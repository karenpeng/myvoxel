var editor = require('./editor.js').editor;

var warmup = [
  '(•◡•)/',
  '',
  'Welcome!',
  'You are now in this 3D world.',
  '',
  'Where you could build things!',
  '',
  'How to do it?',
  'Start from the tutorial,',
  'it will guide you through :)',
  '',
  'press esc key to enable mouse control'
]

var tutorials =[
[
  '//1. One Block',
  '',
  '//Let\'s start from building one block.',
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
  '//represet the x, y, and z position of the block.',
  '',
  '//You could select another place,',
  '//and replace the 0 with different values',
  '//to see where the block will be.'
],

[
  '//2. Line of Blocks',
  '',
  '//What if you want to build many blocks?',
  '//Let\'s use a loop:',
  '',
  'for(var i = 0; i < 6; i++){',
  ' addThing(i, 0, 0);',
  '}',
  '',
  '//Select another place and click "Build".',
  '',
  '//i increments from 0 to 5',
  '//that\'s how you get 5 blocks in a line',
  '//click "build" to see it in action!',
  '',
  '//More information of for loop:',
  '//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for'
],

[
  '//3. Wall',
  '',
  '//Let\'s build a wall with two loops.',
  '//Yes loop could be inside a loop.',
  '//It looks like this:',
  '',
  'for(var i = 0; i < 6; i++){',
  ' for(var j = 0; j < 3; j++){',
  '  addThing(i, j, 0);',
  ' }',
  '}',
  '',
  '//Select another place and change the max value of i and j,',
  '//see what will happen.',
  '',
  '//The slider bar below controls the speed',
  '//of the blocks being created.',
  '//Smaller the number faster the speed.'
],

[
  '//4. Windows',
  '',
  '//It\'s time for making some windows',
  '//We use something called if statement:',
  'for(var i = 0; i < 7; i++){',
  '  if(i % 2 === 0){',
  '    addThing(i, 0, 0);',
  '    addThing(i, 2, 0);',
  '  }else{',
  '    addThing(i, 0, 0);',
  '    addThing(i, 1, 0);',
  '    addThing(i, 2, 0);',
  '  }',
  '}',
  '',
  '//If statement controls where the code runs.',
  '//When the condition of the if is satisfied,',
  '//It runs the code inside the if\'s brackets',
  '//Otherwise it runs the code inside the else\'s bracket',
  '',
  '//Try make different windows!',
  '',
  '//More information of if statement:',
  '//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else'
],

[
  '//5. Spiral Stairs',
  '',
  '//So far, we\'ve built things in straight lines.',
  '//How about something in a curve?',
  '',
  '//Let\'s have some fun with math.',
  '//Remember sine and cosine from high school?',
  '',
  'for(var i = 0; i< 20; i++){',
  '  var theta = Math.PI * i / 10;',
  '  addThing(Math.sin(theta)*3, i*0.4, Math.cos(theta)*3);',
  '}',
  '',
  '//There\'s a lot you could do with it',
  '//Try build a cylinder!'
],

[
]

]

var showcases = [
  [
    'for (var i = 0; i < 10; i ++) {',
    ' for (var j = 0; j < 10; j ++) {',
    '   var uv = [i, j];',
    '',
    '   var u = uv[0];',
    '   var v = uv[1];',
    '',
    '   var theta = 2 * Math.PI * u / 10;',
    '   var phil = Math.PI * v / 10 - Math.PI / 2;',
    '   var x = Math.cos(phil) * Math.sin(theta) * 5;',
    '   var y = Math.sin(phil) * 5;',
    '   var z = Math.cos(phil) * Math.cos(theta) * 5;',
    '   addThing(x, y + 5, z);',
    ' }',
    '}'

  ],

  [
    'var addGuy = function(x,y,z,c){',
    '  var X = x || 0;',
    '  var Y = y  || 0;',
    '  var Z = z || 0;',
    '  var C = c || 0;',
    '  if(C < 10){',
    '    C++;',
    '    addThing(X,Y,Z);',
    '    addGuy(C,C,0,C);',
    '  }',
    '}',
    'addGuy();'
  ],

  [
    'var i = 0;',
    'while(true){',
    '  addThing(i, i, 0);',
    '  i++;',
    '}',
    '',
    '//More info about while loop:',
    '//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while'

  ]

]

tutorials.forEach(function(t, index){
  document.getElementById(('t' + index)).onclick = function(){
    editor.getSession().setMode('ace/mode/javascript');
    editor.setValue(t.join('\n'));
    editor.session.selection.moveCursorDown();
    editor.clearSelection();
  }
});

showcases.forEach(function(s, index){
  document.getElementById(('s' + index)).onclick = function(){
    editor.getSession().setMode('ace/mode/javascript');
    editor.setValue(s.join('\n'));
    editor.session.selection.moveCursorDown();
    editor.clearSelection();
  }
});

document.getElementById('welcome').onclick = function(){
  document.getElementById('welcome').style.visibility = 'hidden';
  editor.setValue(warmup.join('\n'));
  editor.clearSelection();
}

