var en = require('./global.js');

module.exports = function (generator, func) {
  if (en.pause) return;
  var ret = generator.next();
  if (ret.done) {
    func();
    return;
  }
}