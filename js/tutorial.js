addThing(0,0,0);

addThing(i,0,0);

for(var i = 0; i < 3; i++){
  addThing(i, 0, 0);
}


for(var i = 0; i < 6;i++){
  if(i % 2=== 0){
    addThing(i, 0, 0);
  }else{
    addThing(0, i, 0);
  }
}

for(var i = 0; i< 60; i++){
  addThing(Math.sin(i*0.2)*10, 2, Math.cos(i*0.2)*10);
}

var addGuy = function(x,y,z,c){
  var X = x || 0;
  var Y = y  || 0;
  var Z = z || 0;
  var C = c || 0;
  if(C < 10){
    C++;
    addThing(X,Y,Z);
    addGuy(C,C,0,C);
  }
}
addGuy();

var i = 0;
while(true){
  addThing(i, i, 0);
  i++;
}