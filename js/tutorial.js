var editor = require('./editor.js').editor;

var warmup = [
  '/*',
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
  'press esc key to enable mouse control',
  '*/',
  ''
]

var tutorials = [
  [
    '//1. One Block',
    '',
    '//Let\'s start from building one block.',
    '',
    '//First, click a place with your mouse.',
    '//Second, press esc key.',
    '//Third, use the code below:',
    'addBlock(0, 0, 0);',
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
    '//to see where the block will be.',
    ''
  ],

  [
    '//2. Line of Blocks',
    '',
    '//What if you want to build many blocks?',
    '//Let\'s use a loop:',
    '',
    'for(var i = 0; i < 6; i++){',
    ' addBlock(i, 0, 0);',
    '}',
    '',
    '//Select another place and click "Build".',
    '',
    '//i increments from 0 to 5',
    '//that\'s how you get 5 blocks in a line',
    '//click "build" to see it in action!',
    '',
    '//More information of for loop:',
    '//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for',
    ''
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
    '  addBlock(i, j, 0);',
    ' }',
    '}',
    '',
    '//Select another place and change the max value of i and j,',
    '//see what will happen.',
    '',
    '//The slider bar below controls the speed',
    '//of the blocks being created.',
    '//Smaller the number faster the speed.',
    ''
  ],

  [
    '//4. Windows',
    '',
    '//It\'s time for making some windows',
    '//We use something called if statement:',
    'for(var i = 0; i < 7; i++){',
    '  if(i % 2 === 0){',
    '    addBlock(i, 0, 0);',
    '    addBlock(i, 2, 0);',
    '  }else{',
    '    addBlock(i, 0, 0);',
    '    addBlock(i, 1, 0);',
    '    addBlock(i, 2, 0);',
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
    '//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else',
    ''
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
    'for(var i = 0; i< 100; i++){',
    '  var theta = Math.PI * i / 10;',
    '  addBlock(Math.sin(theta)*5, i*0.4, Math.cos(theta)*5);',
    '}',
    '',
    '//There\'s a lot you could do with it',
    '//Try build a cylinder!',
    ''
  ]

]

var showcases = [
  [
    'var step = 12;',
    'var r = 10;',
    'for (var i = 0; i < step; i ++) {',
    ' for (var j = 0; j < step; j ++) {',
    '   var uv = [i, j];',
    '',
    '   var u = uv[0];',
    '   var v = uv[1];',
    '',
    '   var theta = 2 * Math.PI * u / step;',
    '   var phil = Math.PI * v / step - Math.PI / 2;',
    '   var x = Math.cos(phil) * Math.sin(theta) * r;',
    '   var y = Math.sin(phil) * r;',
    '   var z = Math.cos(phil) * Math.cos(theta) * r;',
    '   addBlock(x, y + r, z);',
    ' }',
    '}',
    ''
  ],

  [
    'function addTree(x, y, z, counter){',
    ' if ( counter > 6) return;',
    ' addBlock(x, y, z);',
    ' //add root',
    ' var c = counter + 1;',
    ' //add left sub tree',
    ' addTree(x - 1, y + 1, z - 1, c);',
    ' //add right sub tree',
    ' addTree(x + 1, y + 1, z + 1, c);',
    '}',
    '',
    'addTree(0, 0, 0, 0);',
    '',
    '//You can see value is repeatative sometimes,',
    '//That\'s why you don\'t see the block being build,',
    '//Because it\'s in the same position of an old block,',
    '//Recursion could be a waste of time sometimes,',
    '//We could improve it with memoization:',
    '//http://en.wikipedia.org/wiki/Memoization',
    ''
  ],

  [
    'var i = 0;',
    'while(true){',
    '  addBlock(i, i, 0);',
    '  i++;',
    '}',
    '',
    '//More info about while loop:',
    '//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while',
    ''
  ]

]

function init(func) {
  //var marker = require('./index.js').marker;
  tutorials.forEach(function (t, index) {
    document.getElementById(('t' + index)).onclick = function () {
      func();
      editor.setValue(t.join('\n'));
      editor.clearSelection();
    }
  });

  showcases.forEach(function (s, index) {
    document.getElementById(('s' + index)).onclick = function () {
      func();
      editor.setValue(s.join('\n'));
      editor.clearSelection();
    }
  });

  document.getElementById('welcome').onclick = function () {
    document.getElementById('welcome').style.visibility = 'hidden';
    editor.setValue(warmup.join('\n'));
    editor.clearSelection();
  };

  // document.getElementById('save').onclick = function(){
  //   var str = editor.getValue();
  //   var saveContent = document.createElement('li');
  //   saveContent.innerHTML = <a href="#" class='showcase' id='s0'>Globe</a>
  //   document.getElementById('myStuff').appendChild
  // }

}

module.exports = {
  init: init
}