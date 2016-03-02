'use strict';

function Channel () {
  this._subscribers = [];
}

Channel.prototype.add = function (subscriber) {
  this._subscribers.push(subscriber);
};

Channel.prototype.notify = function (message) {
  this._subscribers.forEach(function (subscriber) {
    subscriber.recieve(message);
  });
};

module.exports = Channel;
