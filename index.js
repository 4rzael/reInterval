'use strict'

function ReInterval (callback, interval, args) {
  var self = this;

  this._callback = callback;
  this._args = args;

  this._interval = setInterval(callback, interval, this._args);
  return this._interval;
}

ReInterval.prototype.reschedule = function (interval) {

  var now = Date.now();
  if (this._interval)
    clearInterval(this._interval);
  this._interval = setInterval(this._callback, interval, this._args);
  return this._interval;
};

ReInterval.prototype.clear = function () {
  if (this._interval) {
    clearInterval(this._interval);
    this._interval = undefined;
    this._callback = undefined;
    this._args = undefined;
  }
};

function reInterval () {
  if (typeof arguments[0] !== 'function')
    throw new Error('callback needed');
  if (typeof arguments[1] !== 'number')
    throw new Error('interval needed');

  var args = arguments.slice(2);

  return new ReInterval(arguments[0], arguments[1], args);
}

module.exports = reInterval;
