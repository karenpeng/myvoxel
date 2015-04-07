function maxMinFuc(str){
  var copy = str;
  copy = copy.replace(/addThing/g, 'getMaxMin');
  return copy;
}

function wrapGenerator(str){
  var copy = str;
  var copy = copy.replace(/addThing/g, 'yield drawAndAddThing');
  var copy = functionSWap(copy);
  var copy = 'function* wat(){\n' + copy +'\n}';
  return copy;
}

function functionSWap(str){
  var copy = str;
  var fnNames = functionDetection(copy);
  if(fnNames.length > 0){
    var copy = functionReplace(str, fnNames);
  }
  return copy;
}

function functionDetection(str){
  var copy = str;
  var fnNames = [];
  var functionReG = /function\s+(\S*)\s*\((.*?)\)\s*\{/g;
  var varFunctionReG = /var\s+\S*\s*=\s*function\s*\S*\s*\((.*?)\)\s*\{/g;

  var res = copy.match(functionReG);
  console.log(res)
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

  var res1 = copy.match(varFunctionReG);
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
  // console.log('fnNames');
  // console.log(fnNames);
  return fnNames;
}

function functionReplace(str, fnNames){
  var copy = str;
  copies = copy.split('\n');
  var newCopy = '';

  copies.forEach(function(line){
    if(line.match(/function/g) !== null){
      line = line.replace(/function/g, 'function* ');
    }else{
      fnNames.forEach(function(fnName){
       //console.log(line)
       var re = new RegExp(fnName, "g");
       // console.log('www');
       //console.log(line.match(re))
       line = line.replace(re, ('yield* ' + fnName));
      });
    }
    console.log(line);
    newCopy += (line + '\n');
  });

  // console.log('newCopy');
  // console.log(newCopy);
  return newCopy;
}

module.exports = {
  maxMinFuc: maxMinFuc,
  wrapGenerator: wrapGenerator
}

