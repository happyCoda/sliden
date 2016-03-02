'use strict';

var Klass = require('./klass'),
  Channel = require('./channel'),
  Observer = require('./observer'),
  Iterator = require('./iterator'),
  DOM = require('./dom'),
  Sliden;

Sliden = Klass(new Channel(), new Observer(), {

  initialize: function (options) {
    var dom = new DOM(options.selectors),
      iterator = new Iterator(options.storage);

    this.subscribe(dom);

    this.subscribe(iterator);

    dom.subscribe(this);

    iterator.subscribe(this);

    this.notify('getNext');
  },

  recieve: function (message) {

    if (typeof message === 'object') {

      this.notify(message);

    } else if (message === 'next') {

      this.notify('getNext');
    } else {

      this.notify('getPrev');
    }
  }
});



module.exports = Sliden;
