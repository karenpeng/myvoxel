// function wat() {

//   for (var i = 0; i < 10; i++) {
//     var theta = Math.PI * i / 5;
//     addThing(Math.sin(theta), i, Math.cos(theta))
//   }

// }

// function* wat(){

//   for (var i = 0; i < 10; i++) {
//     var theta = Math.PI * i / 5;
//     yield addThing(Math.sin(theta), i, Math.cos(theta))
//     //yield i;
//   }

// }

// function addThing(x, y, z) {
//   x = x || 0;
//   y = y || 0;
//   z = z || 0;
//   console.log(x, y, z);
//   return[x, y, z]
// }

// function run(generator) {
//   //console.log(generator)
//   var ret = generator.next();
//   if (ret.done) return;
//   //console.log(ret.value);
// }

// var call = wat()
// setInterval(function () {
//   run(call);
// }, 1000);


// for (var i = 0; i < 10; i++) {
//   var theta = Math.PI * i / 5;
//   addThing(Math.sin(theta), i, Math.cos(theta))
//   //cfdfdff
// }

// function a(){
//   for (var i = 0; i < 10; i++) {
//     var theta = Math.PI * i / 5;
//     addThing(Math.sin(theta), i, Math.cos(theta))
//     //cfdfdff
//   }
// }
// //f(arg1, agr2, arg3) --> arg1, arg2, arg3


// function getMaxMin(){




//   for(var i = 0; i < 10; i++){
//     var theta = Math.PI * i / 5;
//     addThing(Math.sin(theta), i, Math.cos(theta))
//     var x = Math.sin(theta)
//     var y = i
//     var z = Math.cos(theta)
//     if(xMin > x) xMin = x
//     if(xMax > x) xMax = x
//     if(yMin > y) yMin = y
//     if(xMax < y) yMax = y
//     if(zMin > z) zMin = z
//     if(zMax < z) zMax = z
//   }


//  addThingModified(x,y,z) {

//     addThing(x, y, z);
//     if(xMin > x) xMin = x
//     if(xMax > x) xMax = x
//     if(yMin > y) yMin = y
//     if(xMax < y) yMax = y
//     if(zMin > z) zMin = z
//     if(zMax < z) zMax = z
// }

// for(){

// }


//   return [xMin, xMax, yMin, yMax, zMin, zMax];
// }



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

