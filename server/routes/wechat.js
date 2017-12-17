var wechat = require('wechat');

module.exports = wechat({
  token: 'ipedixmxk',
  appid: 'wx2d2813c1c0dfd7fc'
}).text(function (message, req, res, next) {
  console.log(message, 111);
  res.reply('hehe');
  // TODO
}).image(function (message, req, res, next) {
  console.log(message, 222);
  res.reply('heheda');
  // TODO
}).voice(function (message, req, res, next) {
  // TODO
}).video(function (message, req, res, next) {
  // TODO
}).location(function (message, req, res, next) {
  // TODO
}).link(function (message, req, res, next) {
  // TODO
}).event(function (message, req, res, next) {
  // TODO
}).device_text(function (message, req, res, next) {
  // TODO
}).device_event(function (message, req, res, next) {
  // TODO
}).middlewarify()
