var circle = [
'for(var i = 0; i< 60; i++){'
,'    addThing(Math.sin(i*0.2)*10, 2, Math.cos(i*0.2)*10);'
,'}'
].join('\n');

var recursion = [
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
'addGuy()'
].join('\n');