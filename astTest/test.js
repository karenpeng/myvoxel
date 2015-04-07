var a = [
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
'}'
].join('\n');

var a1 = [
'function addGuy(x,y,z,c){',
'  var X = x || 0;',
'  var Y = y  || 0;',
'  var Z = z || 0;',
'  var C = c || 0;',
'  if(C < 10){',
'    C++;',
'    addThing(X,Y,Z);',
'    addGuy(C,C,0,C);',
'  }',
'}'
].join('\n');

//var a = addGuy.toString();
var b = 'addGuy();'

var c = a.concat('\n').concat(b);

var c1 = a1.concat('\n').concat(b);

var falafel = require('falafel');
//var inspect = require('object-inspect');

falafel(c, function(node){
  if(node.type === 'FunctionExpression' || 'FunctionDeclaration'){
    //console.log(node.name);
    //console.log(node.body)
  }
  //console.log(node.type)
});


var functionReG = /function\s+(\S*)\s*\((.*?)\)\s*\{/g;

var varFunctionReG = /var\s+\S*\s*=\s*function\s*\S*\s*\((.*?)\)\s*\{/g;

var fnNames = [];
function getFunctionDefinition(str){
  var res = str.match(functionReG);
  if(res !== null){
    console.log('ah');
    console.log(res);
    res.forEach(function(m){
      var temp = m.split(/function\s+/);
      var temp2 = temp[1].split('(');
      var fnName = temp2[0];
      console.log(fnName);
      fnNames.push(fnName);
    })
  }

  var res1 = str.match(varFunctionReG);
  if(res1 !== null){
    console.log('ha');
    console.log(res1);
    res1.forEach(function(m){
      var temp = m.split(/\s*=/);
      var temp2 = temp[0].split(/var\s+/);
      var fnName = temp2[1];
      console.log(fnName);
      fnNames.push(fnName);
    });
  }

}

//getFunctionDefinition(c1)
getFunctionDefinition(c);

function replaceFunc(str){
  var copy = str;
  copy.replace('function', 'function*');
  fnNames.forEach(function(fnName){
    //this is terrible!!!
    //copy.replace(fnName, 'yield* '+fnName);
  });
  return copy;
}

// function* wat(){
  // function* addGuy(x, y, z, c){
  
  //   var X = x || 0;
  //   var Y = y || 0;
  //   var Z = z || 0;
  //   var C = c || 0;
  
  //   if(C < 10){
  
  //     C++;
  //     yield addThing(X, Y, Z);
  //     yield* addGuy(C, C, 0, C);
  
  //   }
  // }
  
  //yield*  addGuy(); => what about this guy??? what should i do with it?
//}
