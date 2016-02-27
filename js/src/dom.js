'use strict';

function DOM(options) {
  this.subscribers = [];
  this.$el = $(options.el);
  this.$nextBtn = $(options.nextBtn);
  this.$prevBtn = $(options.prevBtn);

  this._bindEvents();
}

DOM.prototype.notify = function (message) {
  this.subscribers.forEach(function (subscriber) {
    subscriber.recieve(message);
  });
};

DOM.prototype._add = function (subscriber) {
  this.subscribers.push(subscriber);
};

DOM.prototype._bindEvents = function () {

  var eventHandler = function (message) {
    this.notify(message);
  };

  this.$nextBtn.on('click', eventHandler.bind(this, 'next'));
  this.$prevBtn.on('click', eventHandler.bind(this, 'prev'));
};

module.exports = DOM;
