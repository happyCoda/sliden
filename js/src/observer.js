'use strict';

function Observer() {}

Observer.prototype.subscribe = function (channel) {

  channel.add(this);
};

Observer.prototype.recieve = function (message) {};

module.exports = Observer;
