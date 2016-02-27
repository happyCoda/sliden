'use strict';

var Iterator = require('../../js/src/iterator');

describe('Iterator module suite', function () {
  var itr;

  beforeEach(function () {
    itr = new Iterator([1, 2, 'cat']);
  });

  it('should have an items storage', function () {
    expect(itr.storage).toBeDefined();
  });

  it('should implements next method', function () {
    expect(itr.next()).toEqual(1);
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
});
