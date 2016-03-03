'use strict';

/**
* Channel module.
* @module channel
* @exports Channel
*/
function Channel () {
  this._subscribers = [];
}

/**
* @method add - ads subscribers to the list
*
* @param {Object} subscriber - subscriber object to add
*/
Channel.prototype.add = function (subscriber) {
  this._subscribers.push(subscriber);
};

/**
* @method notify - notifies all subscribers from the list
*
* @param {Any} message - message to be send to each subscriber
*/
Channel.prototype.notify = function (message) {
  this._subscribers.forEach(function (subscriber) {
    subscriber.recieve(message);
  });
};

module.exports = Channel;
