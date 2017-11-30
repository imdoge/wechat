var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pool = require('./common/mysql');

exports = module.exports = function() {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password'
    },
    function(username, password, done) {
      pool.getConnection(function(err, connection){
        if (err) {
          return;
        }

        connection.query(`select * from ac_system_account where account_name = ?`, [username], function(err, results){
          connection.release();

          if (err) { return done(err); }
          if (!results.length) { return done(null, false, { message: '用户名不存在' }); }
          if (!(results[0].password == password)) { return done(null, false, { message: '不正确的用户名或密码' }); }

          let user = results[0];
          delete user.password;

          return done(null, user);
        });

        connection.on('error', function(err) {
          return;
        });
      });
    }
  ));
};
