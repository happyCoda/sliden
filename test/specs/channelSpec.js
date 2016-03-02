'use strict';

var Channel = require('../../js/src/channel');

describe('Channel module suite', function () {

  var ch;

  beforeEach(function () {
    ch = new Channel();
  });

  it('should have a subscribers list', function () {
    expect(ch._subscribers).toBeDefined();
  });

  it('should implement add method', function () {

    expect(ch.add).toBeDefined();

    ch.add({foo: 'bar'});

    expect(ch._subscribers.length).toBeGreaterThan(0);
  });

  it('should implement notify method', function () {

    expect(ch.notify).toBeDefined();
  });

});
