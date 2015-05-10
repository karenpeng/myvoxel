var en = require('./global.js');
var editor = require('./editor.js').editor;
var run = require('./run.js').run;

document.getElementById('run').onclick = function () {
  en.evaled = false;
  run(editor.getValue(), editor.session.doc.getAllLines());
};

document.getElementById('pause').onclick = function () {
  en.pause = !en.pause;
  if (en.pause) {
    document.getElementById('pause').innerHTML = 'Continue';
  } else {
    document.getElementById('pause').innerHTML = 'Pause';
  }
};

document.getElementById('save').onclick = function () {
  $.ajax({
    url: '/upload',
    method: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      code: editor.getValue()
    }),
    error: function (err) {
      console.error(err);
    },
    success: function () {
      console.log('(•ω•)');
    }
  });
};

//TODO: fix the logic later
/*
function destory() {
  en.pause = true;
  myItems[clickTimes].forEach(function (item) {
    game.removeItem(item);
  });
}
*/