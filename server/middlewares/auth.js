exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == 'GET') req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

exports.isAdmin = function (req, res, next) {
  if (req.user.role == 'admin') return next();
  res.redirect('/login');
};
