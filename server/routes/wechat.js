module.exports = function (info, req, res, next) {
  var message = req.weixin;
  var msg = info;
  console.log(message, 233, info);
  res.reply('hehe');
};
