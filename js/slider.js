module.exports = function (interval, pause) {
  var mySlider = $('#sliderr').slider({
    formatter: function (value) {
      return 'Current value: ' + value;
    }
  });

  mySlider.on('slide', function (e) {
    //console.log(e.value);
    interval = e.value;
  });

  document.getElementById('pause').onclick = function () {
    pause = !pause;
    if (pause) {
      document.getElementById('pause').innerHTML = 'Continue';
    } else {
      document.getElementById('pause').innerHTML = 'Pause';
    }
  }
}