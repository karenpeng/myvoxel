var rayCaster = new game.THREE.Raycaster();

exports.isOnTop = function (dt, game, dude) {
  //get user direction!!
  var ray = new game.THREE.Vector3(0, -1, 0);

  var acceleration = {};
  var velocity = {};
  var friction = {};
  var desired = {};
  acceleration.y = dude.acceleration.y;
  velocity.y = dude.velocity.y;
  friction.y = dude.friction.y;

  acceleration.y /= 8 * dt;
  //acceleration.z += TOTAL_FORCES.z * dt
  acceleration.y += (-0.0000036) * dt;

  velocity.y += acceleration.y * dt;
  velocity.y *= friction.y;

  if (Math.abs(velocity.y) < 0.1) {
    desired.y = (velocity.y * dt);
  } else if (velocity.y !== 0) {
    desired.y = (velocity.y / Math.abs(velocity.y)) * 0.1;
  }

  var dudeNextPos = new game.THREE.Vector3(dude.yaw.position.x, dude.yaw.position.y + desired.y + 0.5, dude.yaw.position.z);
  rayCaster.ray.set(dudeNextPos, ray);
  var intersects = rayCaster.intersectObjects(colliObjs);

  if (intersects.length > 0 && intersects[0].distance < 0.5 + desired.y /*&& intersects[0].distance > 0.5*/ ) {

    // console.log(desired.y)
    // console.log('sdgdgsd')

    window.lol = intersects[0];

    dude.acceleration.x = 0;
    //dude.acceleration.y = 0;
    dude.acceleration.z = 0;

    dude.resting.x = true;
    dude.resting.y = true;
    //dude.velocity.y = 0;
    dude.resting.z = true;

    var something = new game.THREE.Vector3(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);

    dude.moveTo(something);
    //console.log(intersects[0].distance)
    onTop = true;
    return;
  }

  onTop = false;
}

function isHit() {
  var rays = [
    new game.THREE.Vector3(1, 0, 0),
    new game.THREE.Vector3(-1, 0, 0),
    // new game.THREE.Vector3(0, 1, 0)
    new game.THREE.Vector3(0, 0, 1),
    new game.THREE.Vector3(0, 0, -1)
  ]

  var mY = new game.THREE.Matrix4().makeRotationY(dude.yaw.rotation.y);

  var dudePos = new game.THREE.Vector3(dude.yaw.position.x, dude.yaw.position.y, dude.yaw.position.z);
  /*
    function check(el){
      rayCaster.ray.set(dudePos, el);
      var intersects = rayCaster.intersectObjects(colliObjs);
      return (intersects.length > 0 && intersects[0].distance <= 1  && intersects[0].distance >= 0.5)
    }

    //omg the first time i use some in my project!!!!
    //functional programming :D
    //
    //need the return cause there's one layer more to come out of the isHit function :)
    return rays.some(check);
  */
  for (var i = 0; i < rays.length; i++) {
    var ray = rays[i];
    ray.applyMatrix4(mY);

    rayCaster.ray.set(dudePos, ray);
    var intersects = rayCaster.intersectObjects(colliObjs);
    if (intersects.length > 0) {
      if ((i === 0 || i === 1 && intersects[0].distance < 0.5) || (i === 2 || i === 3 && intersects[0].distance < 0.5)) {

        // window.lol = intersects[0];

        dude.acceleration.x = 0;
        dude.acceleration.z = 0;

        dude.resting.x = true;
        dude.resting.z = true;

        var something = new game.THREE.Vector3(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
        if (i === 0 || i === 1) {
          something.add(ray.setLength(0.4).negate());
        } else {
          something.add(ray.setLength(0.4).negate());
        }

        dude.moveTo(something);
        return;
      }
    }
  }
}

// var mouse = new game.THREE.Vector2();
// var INTERSECTED;

// function onDocumentMouseMove( event ) {
//   event.preventDefault();
//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//   //console.log(mouse.x, mouse.y);
// }
// document.addEventListener( 'mousemove', onDocumentMouseMove, false );

// function isSelect(){
//   rayCaster.setFromCamera( mouse, game.camera );
//   var intersects = rayCaster.intersectObjects(colliObjs);

//   if ( intersects.length > 0 ) {
//     console.log('ohhhhh')
//     console.log(intersects[0].object.name)

//     if ( INTERSECTED != intersects[ 0 ].object ) {

//       if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

//       INTERSECTED = intersects[ 0 ].object;
//       INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
//       INTERSECTED.material.emissive.setHex( 0xff0000 );

//     }

//   } else {

//     if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

//     INTERSECTED = null;

//   }
// }