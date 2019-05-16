'use strict';
require('es6-shim');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var reInterval = require('../index.js');

describe('reInterval', function() {

  it('should work as an usual setInterval', function () {
    return new Promise(function (resolve, reject) {
      var startTime = new Date().getTime();

      var interval = reInterval(function () {
        if (Math.abs(new Date().getTime() - startTime - 1000) <= 50)
          resolve();
        else
          reject(new Error('Took too much (or not enough) time'));
        interval.destroy();
      }, 1000);
    });
  });

  it('should be able to clear an Interval', function () {
    return new Promise(function (resolve, reject) {
      var startTime = new Date().getTime();

      var interval = reInterval(function () {
          reject(new Error('Interval not cleared'));
          interval.destroy();
      }, 200);

      setTimeout(interval.clear, 100);

      setTimeout(resolve, 300);
    });
  });

  it('should be able to reschedule an Interval', function () {
    return new Promise(function (resolve, reject) {
      var startTime = new Date().getTime();

      var interval = reInterval(function () {
        if (Math.abs(new Date().getTime() - startTime - 800) <= 50)
          resolve();
        else
          reject(new Error('Took too much (or not enough) time'));
        interval.destroy();
      }, 500);

      setTimeout(interval.reschedule, 300, 500)
    });
  });

  it('should reschedule an Interval without interval args', function () {
    return new Promise(function (resolve, reject) {
      var startTime = new Date().getTime();

      var interval = reInterval(function () {
        if (Math.abs(new Date().getTime() - startTime - 800) <= 50)
          resolve();
        else
          reject(new Error('Took too much (or not enough) time'));
        interval.destroy();
      }, 500);

      setTimeout(interval.reschedule, 300)
    });
  });

  it('should get the correct args', function () {
    return new Promise(function (resolve, reject) {
      var interval = reInterval(function (a, b, c, d) {
        if(a == 1 && b == 2 && c == 3 && d == 4){
          resolve();
        } else {
          reject();
        }
        interval.destroy();
      }, 500, 1, 2, 3, 4);
    });
  });

});
