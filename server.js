'use strict';

let express = require('express'),
  bcrypt = require('bcrypt'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  config = require('./config'),
  User = require('./models/user');

mongoose.connect(config.database);

let publicRouter = express.Router();
let app = express();

app.use(bodyParser.json());

require('./routes/login')(publicRouter);
require('./routes/user-routes')(publicRouter);

app.use('/public', publicRouter);

app.listen(3000, err => {
  if (err) return console.log(err);
  console.log('server started');
});
