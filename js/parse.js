function injectMaxMin(str){
  var copy = str;
  copy = copy.replace(/addThing/g, 'addThingModified');
  return copy;
}


function wrapGenerator(str){
  var copy = str;
  var copy = copy.replace(/addThing/g, 'yield addThing');
  var copy = 'function* wat(){\n' + copy +'\n}';
  return copy;
}


module.exports = {
  injectMaxMin: injectMaxMin,
  wrapGenerator: wrapGenerator
}

