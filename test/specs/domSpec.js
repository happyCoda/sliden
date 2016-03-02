'use strict';

var DOM = require('../../js/src/dom'),
  Sliden = require('../../js/src/sliden');

jasmine.getFixtures().fixturesPath = 'base/fixtures';

describe('Dom module suite', function () {
  var dom,
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
    loadFixtures('dom-frag.html');

    dom = new DOM(options.selectors);
    sl = new Sliden(options);
  });

  it('should implement initialize method', function () {

    expect(dom.initialize).toBeDefined();

  });

  it('should grab target dom elements', function () {
    expect(dom.$el.get(0)).toBeInDOM();
    expect(dom.$nextBtn.get(0)).toBeInDOM();
    expect(dom.$prevBtn.get(0)).toBeInDOM();
  });

  it('should call bindEvents method', function () {
    var dome;

    spyOn(DOM.prototype, '_bindEvents');

    dome = new DOM(options.selectors);

    expect(DOM.prototype._bindEvents).toHaveBeenCalled();
  });

  it('should call notify method on btn click', function () {
    spyOn(dom, 'notify');
    dom.$nextBtn.trigger('click');

    expect(dom.notify).toHaveBeenCalled();
    expect(dom.notify).toHaveBeenCalledWith('next');
  });

  it('should call subscribers recieve methods inside of notify method', function () {
    sl.subscribe(dom);

    spyOn(sl, 'recieve');

    dom.notify('next');

    expect(sl.recieve).toHaveBeenCalled();
    expect(sl.recieve).toHaveBeenCalledWith('next');
  });

  it('should implement createImage method', function () {

    dom.createImage();

    expect(dom.$el.find('img').get(0)).toBeInDOM();

  });

  it('should implement clearImage method', function () {

    dom.createImage();

    dom.clearImage();

    expect(dom.$el.find('img').get(0)).not.toBeInDOM();
  });

  it('should call clearImage before createImage', function () {

    spyOn(dom, 'clearImage');

    dom.recieve({
      item: 'http://super.image.jpg'
    })

    expect(dom.clearImage).toHaveBeenCalled();
  });

  it('should implement subscribers list', function () {

    expect(dom._subscribers).toBeDefined();
  });

  it('should add subscribers to the list', function () {

    sl.subscribe(dom);

    expect(dom._subscribers.length).toBeGreaterThan(0);
  });

});
