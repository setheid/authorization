'use strict';

let mongoose = require('mongoose'),
  User = require('./../models/user');

module.exports = function(router) {
  router.route('/users')
  .get((req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        console.log(err);
        res.json({status:'failure'});
        return res.end();
      }
      res.json({
        status: true,
        data: users
      });
      res.end();
    });
  })
  .post((req, res) => {
    console.log('/setup hit', req.body);
    // validate new user
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) return console.log(err);

      if (user) {
        res.json({
          status: 'failure',
          message: 'username already exists'
        });
        return res.end();

      } else if (!req.body.username || !req.body.password) {

        res.json({
          status: 'failure',
          message: 'a required field is empty'
        });
        return res.end();

      } else {

        var newUser = new User(req.body);
        newUser.save((err, user) => {
          if (err) return console.log(err);
          res.json({data: user});
          res.end();
        });

      }
    });
  });

  router.route('/users/:user')
  .get((req, res) => {
    console.log(req.params.user);
    User.findOne({username: req.params.user}, (err, user) => {
      if (err) return res.json({status: 'failure'});
      if (user) {
        res.json({
          status: true,
          data: user
        });
        res.end();
      } else {
        res.json({
          status: 'failure',
          message: 'user not found'
        });
        res.end();
      }
    });
  })
  .put((req, res) => {
    User.update({username: req.params.user}, req.body, (err, user) => {
      if (err) return console.log(err);
      res.json({
        status: true,
        message: `${user.username} updated`
      });
      res.end();
    });
  })
  .delete((req, res) => {
    User.findOne({username: req.params.user}, (err, user) => {
      if (err) return res.json({status: 'failure'});
      user.remove((err, user) => {
        res.json({
          status: true,
          message: `${user.username} deleted`
        });
        res.end();
      });
    });
  });
}
