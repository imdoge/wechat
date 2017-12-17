module.exports = function (req, res, next) {
  var message = req.weixin;
  console.log(message, 233);
  res.reply('hehe');
};
