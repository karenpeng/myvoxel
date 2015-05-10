var en = require('./global.js');
var rayCaster = new en.game.THREE.Raycaster();

exports.isOnTop = function (dt) {
  //get user direction!!
  var ray = new en.game.THREE.Vector3(0, -1, 0);

  var acceleration = {};
  var velocity = {};
  var friction = {};
  var desired = {};
  acceleration.y = en.dude.acceleration.y;
  velocity.y = en.dude.velocity.y;
  friction.y = en.dude.friction.y;

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

  var dudeNextPos = new en.game.THREE.Vector3(en.dude.yaw.position.x, en.dude.yaw.position.y + desired.y + 0.5, en.dude.yaw.position.z);
  rayCaster.ray.set(dudeNextPos, ray);
  var intersects = rayCaster.intersectObjects(en.colliObjs);

  if (intersects.length > 0 && intersects[0].distance < 0.5 + desired.y /*&& intersects[0].distance > 0.5*/ ) {

    en.dude.acceleration.x = 0;
    //en.dude.acceleration.y = 0;
    en.dude.acceleration.z = 0;

    en.dude.resting.x = true;
    en.dude.resting.y = true;
    //en.dude.velocity.y = 0;
    en.dude.resting.z = true;

    var something = new en.game.THREE.Vector3(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);

    en.dude.moveTo(something);
    //console.log(intersects[0].distance)
    return;
  }
}

exports.isHit = function () {
  var rays = [
    new en.game.THREE.Vector3(1, 0, 0),
    new en.game.THREE.Vector3(-1, 0, 0),
    // new game.THREE.Vector3(0, 1, 0)
    new en.game.THREE.Vector3(0, 0, 1),
    new en.game.THREE.Vector3(0, 0, -1)
  ]

  var mY = new en.game.THREE.Matrix4().makeRotationY(en.dude.yaw.rotation.y);

  var dudePos = new en.game.THREE.Vector3(en.dude.yaw.position.x, en.dude.yaw.position.y, en.dude.yaw.position.z);
  /*
    function check(el){
      rayCaster.ray.set(dudePos, el);
      var intersects = rayCaster.intersectObjects(en.colliObjs);
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
    var intersects = rayCaster.intersectObjects(en.colliObjs);
    if (intersects.length > 0) {
      if ((i === 0 || i === 1 && intersects[0].distance < 0.5) || (i === 2 || i === 3 && intersects[0].distance < 0.5)) {

        // window.lol = intersects[0];

        en.dude.acceleration.x = 0;
        en.dude.acceleration.z = 0;

        en.dude.resting.x = true;
        en.dude.resting.z = true;

        var something = new en.game.THREE.Vector3(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
        if (i === 0 || i === 1) {
          something.add(ray.setLength(0.4).negate());
        } else {
          something.add(ray.setLength(0.4).negate());
        }

        en.dude.moveTo(something);
        return;
      }
    }
  }
}