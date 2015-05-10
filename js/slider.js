var en = require('./global.js');

var mySlider = $('#sliderr').slider({
  formatter: function (value) {
    return 'Current value: ' + value;
  }
});

mySlider.on('slide', function (e) {
  //console.log(e.value);
  en.interval = e.value;
});