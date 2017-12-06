var express = require('express');
var passport = require('passport');
var redis = require('../common/redis');
var logger = require('../common/logger');
var upload = require('../common/multer');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res, next) {
    //console.log(req.user)
    var redirect = req.session.returnTo ? req.session.returnTo: '/';
    delete req.session.returnTo;
    res.redirect(redirect);
  });

router.post('/logout',
  function(req, res){
    //console.log(req.user)
    req.logout();
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });

router.post('/upload',
  upload.single('file'),
  function(req, res, next) {
    //console.log(req.file);
    //console.log(req.body);
    res.send();
  });

//router.route('/v/test')
//  .get(function (req, res, next) {
//    console.log(res.local);
//    res.json({code: 200, msg: 'success'});
//  })
//  .post(function (req, res, next) {
//    console.log(res.local);
//    res.json({code: 200, msg: 'success'});
//  });

module.exports = router;
