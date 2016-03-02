'use strict';

var Klass = require('./klass'),
  Channel = require('./channel'),
  Observer = require('./observer'),
  Iterator;

Iterator = Klass(new Channel, new Observer(), {

  initialize: function (storage) {
    this.storage = storage;
    this.pointer = 0;
  },

  recieve: function (message) {

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
  },

  next: function () {
    if (this.pointer >= this.size()) {
      this.pointer = 0;
    }

    return this.storage[this.pointer++];
  },

  prev: function () {
    if (this.pointer === 0) {
      this.pointer = this.size() - 1;
    }

    return this.storage[this.pointer--];
  },

  size: function () {
    return this.storage.length;
  },

  reset: function (direction) {
    this.pointer = direction === 0 ? 0 : this.size() - 1;

    return this;
  },

  goTo: function (idx) {

    if (idx >= this.size()) {
      throw new Error('Provided index is out of range');
    }

    return this.storage[idx];
  }
});

module.exports = Iterator;
