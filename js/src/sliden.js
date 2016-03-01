'use strict';

var Iterator = require('./iterator'),
  DOM = require('./dom');

function Sliden(options) {
  var dom = new DOM(options.selectors),
    iterator = new Iterator(options.storage);

  this._subscribers = [];

  this.subscribe(dom);

  this.subscribe(iterator);

  dom.subscribe(this);

  iterator.subscribe(this);

  this.notify('getNext');

}

Sliden.prototype.subscribe = function (broadcaster) {

  broadcaster._add(this);
};

Sliden.prototype._add = function (subscriber) {
  this._subscribers.push(subscriber);
};

Sliden.prototype.notify = function (message) {
  this._subscribers.forEach(function (subscriber) {

    subscriber.recieve(message);
  });
};

Sliden.prototype.recieve = function (message) {
  if (typeof message === 'object') {

    this.notify(message);

  } else if (message === 'next') {

    this.notify('getNext');
  } else {

    this.notify('getPrev');
  }
};

module.exports = Sliden;
