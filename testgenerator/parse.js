// function wat() {

//   for (var i = 0; i < 10; i++) {
//     var theta = Math.PI * i / 5;
//     addThing(Math.sin(theta), i, Math.cos(theta))
//   }

// }

function* wat(){

  for (var i = 0; i < 10; i++) {
    var theta = Math.PI * i / 5;
    yield addThing(Math.sin(theta), i, Math.cos(theta))
    //yield i;
  }

}

function addThing(x, y, z) {
  x = x || 0;
  y = y || 0;
  z = z || 0;
  console.log(x, y, z);
}

function run(generator) {
  //console.log(generator)
  var ret = generator.next();
  if (ret.done) return;
  //console.log(ret.value);
}

var call = wat()
setInterval(function () {
  run(call);
}, 1000);