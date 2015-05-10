var en = require('./global.js');

module.exports = function () {
  var mySlider = $('#sliderr').slider({
    formatter: function (value) {
      return 'Current value: ' + value;
    }
  });

  mySlider.on('slide', function (e) {
    //console.log(e.value);
    en.interval = e.value;
  });

  document.getElementById('pause').onclick = function () {
    en.pause = !en.pause;
    if (pause) {
      document.getElementById('pause').innerHTML = 'Continue';
    } else {
      document.getElementById('pause').innerHTML = 'Pause';
    }
  }
}