'use strict';

let jwt = require('jsonwebtoken'),
  User = require('./../models/user');

module.exports = function(router) {
  router.post('/login', (req, res) => {
    let authArray = req.headers.authorization.split(' ');
    let method = authArray[0];
    let encodedLogin = authArray[1];
    let userLogin = new Buffer(encodedLogin, 'base64').toString().split(':');
    let userName = userLogin[0];
    let password = userLogin[1];
    User.findOne({username: userName}, (err, user) => {
      let valid = user.compareHash(password);
      if (!valid) return res.json({status:'failure'});
      res.json({token: user.generateToken()});
      res.end();
    });
  });
}
