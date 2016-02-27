'use strict';

var Iterator = require('./iterator'),
  DOM = require('./dom');

function Sliden(options) {
  var dom = new DOM(options.selectors);

  this.iterator = new Iterator(options.storage);

  this.subscribe(dom);
}

Sliden.prototype.subscribe = function (channel) {
  channel._add(this);
};

Sliden.prototype.recieve = function (message) {
  if (message === 'next') {
    this.getNextItem();
  } else {
    this.getPrevItem();
  }
};

Sliden.prototype.getNextItem = function () {
  return this.iterator.next();
};

Sliden.prototype.getPrevItem = function () {
  return this.iterator.prev();
};

module.exports = Sliden;
