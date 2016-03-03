'use strict';

/**
* Observer module.
* @module observer
* @exports Observer
*/
function Observer() {}

/**
* @method subscribe - subscribes to the given channel
*
* @param {Object} channel - channel to subscribe
*/
Observer.prototype.subscribe = function (channel) {

  channel.add(this);
};

/**
* @method recieve - default function will be overriden by child class
*
* @param {Any} message - message that will be sent by channel
*/
Observer.prototype.recieve = function (message) {};

module.exports = Observer;
