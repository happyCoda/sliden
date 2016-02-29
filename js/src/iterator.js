'use strict';

function Iterator (storage) {
  this.storage = storage;
  this.pointer = 1;
}

Iterator.prototype.next = function () {
  if (this.pointer >= this.size()) {
    this.pointer = 0;
  }

  return this.storage[this.pointer++];
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
