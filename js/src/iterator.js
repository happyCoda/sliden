'use strict';

function Iterator (storage) {
  this.storage = storage;
  this.pointer = 0;

  // this._channels = {
  //   'next': [],
  //   'prev': []
  // };

  this._subscribers = [];
}

Iterator.prototype.subscribe = function (broadcaster) {

  broadcaster._add(this);
};

Iterator.prototype._add = function (subscriber) {
  this._subscribers.push(subscriber);
};

Iterator.prototype.notify = function (message) {
  this._subscribers.forEach(function (subscriber) {

    subscriber.recieve(message);
  });
};

Iterator.prototype.recieve = function (message) {
  var item;

  if (message === 'getNext') {

    item = this.next();

    this.notify({
      item: item
    });
  } else if (message === 'getPrev') {

    item = this.prev();

    this.notify({
      item: item
    });
  }
};

Iterator.prototype.next = function () {
  if (this.pointer >= this.size()) {
    this.pointer = 0;
  }

  return this.storage[this.pointer++];
};

Iterator.prototype.prev = function () {
  if (this.pointer === 0) {
    this.pointer = this.size() - 1;
  }

  return this.storage[this.pointer--];
};

Iterator.prototype.size = function () {
  return this.storage.length;
};

Iterator.prototype.reset = function (direction) {
  this.pointer = direction === 0 ? 0 : this.size() - 1;

  return this;
};

Iterator.prototype.goTo = function (idx) {

  if (idx >= this.size()) {
    throw new Error('Provided index is out of range');
  }

  return this.storage[idx];
};

module.exports = Iterator;
