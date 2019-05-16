'use strict'

function ReInterval (callback, interval, ...args) {
  var self = this;

  this._callback = callback;
  this._args = args;

  this._interval = interval

  this._intervalId = setInterval(callback, interval, ...this._args);

  this.reschedule = function (interval) {
    // if no interval entered, use the interval passed in on creation
    if (!interval)
      interval = self._interval;

    if (self._intervalId)
      clearInterval(self._intervalId);
    self._intervalId = setInterval(self._callback, interval, ...self._args);
  };

  this.clear = function () {
    if (self._intervalId) {
      clearInterval(self._intervalId);
      self._intervalId = undefined;
    }
  };
  
  this.destroy = function () {
    if (self._intervalId) {
      clearInterval(self._intervalId);
    }
    self._callback = undefined;
    self._intervalId = undefined;
    self._args = undefined;
  };
}

function reInterval (callback, interval, ...args) {
  if (typeof callback !== 'function')
    throw new Error('callback needed');
  if (typeof interval !== 'number')
    throw new Error('interval needed');


  return new ReInterval(callback, interval, ...args);
}

module.exports = reInterval;
