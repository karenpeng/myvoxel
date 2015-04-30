var falafel = require('falafel')
var inspect = require('object-inspect')

function addTree(x, y, z, counter){
 if ( counter > 6) return;
 addThing(x, y, z);
 //add root
 var c = counter + 1;
 //add left sub tree
 addTree(x - 1, y + 1, z - 1, c);
 //add right sub tree
 addTree(x + 1, y + 1, z + 1, c);
}

var str = addTree.toString() + '\n' + 'addTree(0, 0, 0, 0);'

//console.log(str)

var out = falafel(str, function(node){
  if(/* node.type === 'FunctionExpression' || */ node.type === 'FunctionDeclaration'){
    //console.log(node.source.toString());
    var insideBody = node.body.body.map(function (x) {
      return x.source();
    }).join(';\n');
    var enter = '{\n' + 'highlightLine(lineNum);\n';
    return node.body.update(enter + insideBody + '\n}');
  }
});

console.log(out);