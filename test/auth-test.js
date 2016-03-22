'use strict';

let chai = require('chai');
let chaiHTTP = require('chai-http'); chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;
let fs = require('fs');
require(__dirname + '/../server');

describe('User password matches database', () => {
  it()
}
