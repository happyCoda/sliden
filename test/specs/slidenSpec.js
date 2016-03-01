'use strict';

var Sliden = require('../../js/src/sliden'),
  Iterator = require('../../js/src/iterator'),
  DOM = require('../../js/src/dom');

jasmine.getFixtures().fixturesPath = 'base/fixtures';

describe('Sliden module suite', function () {
  var sl,
    dom,
    options = {
      storage: [
        'http://some.cool.img',
        'http://some.cool-2.img',
        'http://some.cool-3.img',
        'http://some.cool-4.img',
        'http://some.cool-5.img'
      ],
      selectors: {
        el: '.gallery',
        nextBtn: '.gallery-next-btn',
        prevBtn: '.gallery-prev-btn'
      }
    };

  beforeEach(function () {
    loadFixtures('dom-frag.html');

    sl = new Sliden(options);

    dom = new DOM(options.selectors);
  });

  it('should implement subscribers list', function () {

    expect(sl._subscribers).toBeDefined();
  });

  it('should add subscribers', function () {

    expect(sl._subscribers.length).toBeGreaterThan(0);
  });

  it('should implement notify method', function () {

    dom.subscribe(sl);

    spyOn(dom, 'recieve');

    sl.notify({
      item: 'http://some.cool.img'
    });

    expect(dom.recieve).toHaveBeenCalled();

  });

});
