function wrapGenerator(lines, str){

  var fnNames = functionDetection(str);

  var result = '';

  lines.forEach(function(l, index){
     l = l.replace(/addThing\s*\(/g, 'yield addThingAndHighlight(num, pos, ' + index + ', ');
     l = functionReplace(l, index, fnNames);
     result += (l + '\n');
  });

 //to match function*  addTree(x, y, z, counter){
 //var fnRe = /function\*\s+[^\(\)]\s*\([^\(\)]\)\s*\{/g;
  var fnRe = /function\*\s+.*?\(.*?\)\s*\{/g;
  var lll = result.match(fnRe);
  if(lll.length){
    lll.forEach(function(m){
      result = result.replace(m, m + '\n' + 'yield highlightLine(lineNum);\n');
    })
  }

  result = 'function* wwwaaattt(num, pos){\n' + result +'\n}';
  return result;

}

function functionReplace(l, index, fnNames){

  fnNames.forEach(function(fnName){
    //function declaration
    var re1 = new RegExp('function\\s*' + fnName +'\\s*\\(', 'g');
    //function calling
    var re2 = new RegExp(fnName + '\\s*\\(', 'g');

    if(l.match(re1)!== null){
      l = l.replace(re1, 'function* '+ fnName + '(lineNum, ');
    }else{
      l = l.replace(re2, 'yield* ' + fnName + '(' + index + ' ,');
    }

  });

  return l;

}

function functionDetection(str){
  // var copy = str;
  var fnNames = [];
  var functionReG = /function\s+(\S*)\s*\((.*?)\)\s*\{/g;
  var varFunctionReG = /var\s+\S*\s*=\s*function\s*\S*\s*\((.*?)\)\s*\{/g;

  var res1 = str.match(functionReG);
  //console.log(res)
  if(res1 !== null){
    // console.log('ah');
    // console.log(res);
    res1.forEach(function(m){
      var temp = m.split(/function\s+/);
      var temp2 = temp[1].split('(');
      var fnName = temp2[0];
      console.log(fnName);
      fnNames.push(fnName);
    })
  }

  var res2 = str.match(varFunctionReG);
  if(res2 !== null){
    // console.log('ha');
    // console.log(res1);
    res2.forEach(function(m){
      var temp = m.split(/\s*=/);
      var temp2 = temp[0].split(/var\s+/);
      var fnName = temp2[1];
      console.log(fnName);
      fnNames.push(fnName);
    });
  }

  return fnNames;
}

module.exports = {
  wrapGenerator: wrapGenerator
}