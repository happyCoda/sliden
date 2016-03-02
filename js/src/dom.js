'use strict';

var Klass = require('./klass'),
  Channel = require('./channel'),
  Observer = require('./observer'),
  DOM;

DOM = Klass(new Channel, new Observer(), {
  initialize: function (options) {
      this.$el = $(options.el);
      this.$nextBtn = $(options.nextBtn);
      this.$prevBtn = $(options.prevBtn);

      this._bindEvents();
  },

  recieve: function (message) {
    if (typeof message === 'object') {

      this.clearImage();

      this.createImage(message.item);

    }
  },

  _bindEvents: function () {

    var eventHandler = function (message) {

      this.notify(message);
    };

    this.$nextBtn.on('click', eventHandler.bind(this, 'next'));
    this.$prevBtn.on('click', eventHandler.bind(this, 'prev'));
  },

  createImage: function (src) {
    var img = $('<img>', {
      'src': src
    });

    this.$el.append(img);
  },

  clearImage: function () {
    this.$el.find('img').remove();
  }

});

module.exports = DOM;
