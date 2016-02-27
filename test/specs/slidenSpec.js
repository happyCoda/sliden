'use strict';

var Sliden = require('../../js/src/sliden'),
  Iterator = require('../../js/src/iterator'),
  DOM = require('../../js/src/dom');

jasmine.getFixtures().fixturesPath = 'base/fixtures';

describe('Sliden module suite', function () {
  var sl;

  beforeEach(function () {
    loadFixtures('dom-frag.html');

    sl = new Sliden({
      storage: [1, 2, 'cat'],
      selectors: {
        el: '.gallery',
        nextBtn: '.gallery-next-btn',
        prevBtn: '.gallery-prev-btn'
      }
    });
  });

  it('should have an iterator', function () {
    expect(sl.iterator instanceof Iterator).toBeTruthy();
  });

  it('should implement subscribe method', function () {
    expect(sl.subscribe).toBeDefined();
  });

  it('should implement recieve method and call it', function () {
    var $nextBtn = $('.gallery-next-btn');

    spyOn(sl, 'recieve');

    $nextBtn.click();

    expect(sl.recieve).toHaveBeenCalled();

    expect(sl.recieve).toHaveBeenCalledWith('next');
  });

  it('should get next item from storage', function () {
    var $nextBtn = $('.gallery-next-btn');

    spyOn(sl, 'getNextItem');

    $nextBtn.click();

    expect(sl.getNextItem).toHaveBeenCalled();

    // expect(sl.getNextItem()).toHaveBeenCalledAndReturn('next');
  });

  it('should get previous item from storage', function () {
    var $prevBtn = $('.gallery-prev-btn');

    spyOn(sl, 'getPrevItem');

    $prevBtn.click();

    expect(sl.getPrevItem).toHaveBeenCalled();

    // expect(sl.getNextItem()).toHaveBeenCalledAndReturn('next');
  });
});
