'use strict';

var Observer = require('../../js/src/observer'),
  Channel = require('../../js/src/channel');

describe('Observer module suite', function () {

  var o,
    ch;

  beforeEach(function () {
    o = new Observer();
    ch = new Channel();
  });

  it('should implement subscribe method', function () {

    spyOn(ch, 'add');

    expect(o.subscribe).toBeDefined();

    o.subscribe(ch);

    expect(ch.add).toHaveBeenCalled();
  });

  it('should implement recieve method', function () {

    spyOn(o, 'recieve');

    expect(o.recieve).toBeDefined();

    o.subscribe(ch);

    ch.notify('hello');

    expect(o.recieve).toHaveBeenCalled();
    expect(o.recieve).toHaveBeenCalledWith('hello');
  });

});
