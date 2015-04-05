function maxMinFuc(str){
  var copy = str;
  copy = copy.replace(/addThing/g, 'getMaxMin');
  return copy;
}


function wrapGenerator(str){
  var copy = str;
  var copy = copy.replace(/addThing/g, 'yield drawAndAddThing');
  //var copy = copy.replace(/function/g, 'function*');
  var copy = 'function* wat(){\n' + copy +'\n}';
  return copy;
}


module.exports = {
  maxMinFuc: maxMinFuc,
  wrapGenerator: wrapGenerator
}

