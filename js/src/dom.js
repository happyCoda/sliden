'use strict';

function DOM(options) {
  this.subscribers = [];
  this.$el = $(options.el);
  this.$nextBtn = $(options.nextBtn);
  this.$prevBtn = $(options.prevBtn);

  this._subscribers = [];

  this._bindEvents();
}

DOM.prototype.subscribe = function (broadcaster) {
  broadcaster._add(this);
};

DOM.prototype._add = function (subscriber) {

  this._subscribers.push(subscriber);
};

DOM.prototype.notify = function (message) {
  this._subscribers.forEach(function (subscriber) {

    subscriber.recieve(message);
  });
};

DOM.prototype.recieve = function (message) {
  if (typeof message === 'object') {

    this.clearImage();

    this.createImage(message.item);

  }
};

DOM.prototype._bindEvents = function () {

  var eventHandler = function (message) {

    this.notify(message);
  };

  this.$nextBtn.on('click', eventHandler.bind(this, 'next'));
  this.$prevBtn.on('click', eventHandler.bind(this, 'prev'));
};

DOM.prototype.createImage = function (src) {
  var img = $('<img>', {
    'src': src
  });

  this.$el.append(img);
};

DOM.prototype.clearImage = function () {
  this.$el.find('img').remove();
};

module.exports = DOM;
