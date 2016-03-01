'use strict';

var Iterator = require('../../js/src/iterator'),
  Sliden = require('../../js/src/sliden');

describe('Iterator module suite', function () {
  var itr,
    sl,
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
    itr = new Iterator([1, 2, 'cat']);
    sl = new Sliden(options);
  });

  it('should have an items storage', function () {
    expect(itr.storage).toBeDefined();
  });

  it('should implements next method', function () {
    expect(itr.next()).toEqual(1);
  });

  it('should implements prev method', function () {
    expect(itr.prev()).toEqual('cat');
  });

  it('should implements size method', function () {
    expect(itr.size()).toEqual(3);
  });

  it('should implements reset method', function () {
    itr.next();
    itr.next();
    itr.next();

    expect(itr.reset(0).next()).toEqual(1);
  });

  it('should implement goTo method', function () {
    expect(itr.goTo(1)).toEqual(2);
    expect(itr.goTo.bind(itr, 5)).toThrow();
  });

  it('should implement subscribers list', function () {

    expect(itr._subscribers).toBeDefined();
  });

  it('should add subscribers', function () {
    sl.subscribe(itr);

    expect(itr._subscribers.length).toBeGreaterThan(0);
  });

  it('should implement notify method', function () {

    sl.subscribe(itr);

    spyOn(sl, 'recieve');

    itr.notify('next');

    expect(sl.recieve).toHaveBeenCalled();
  });
});
