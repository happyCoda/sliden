'use strict';

var Sliden = require('./sliden'),
sl = new Sliden({
  storage: [
    'http://baconmockup.com/300/200',
    'http://placehold.it/300x200',
    'http://lorempixel.com/300/200/'
  ],
  selectors: {
    el: '.gallery',
    nextBtn: '.gallery-next-btn',
    prevBtn: '.gallery-prev-btn'
  }
});
