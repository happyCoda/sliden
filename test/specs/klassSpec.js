'use strict';

var Klass = require('../../js/src/klass');

describe('Klass module suite', function () {

  var Person;

  beforeEach(function () {
    Person = new Klass({
      name: 'Person',
      getName: function () {
        return this.name;
      }
    });
  });

  it('should return new constructors', function () {

    expect(Person).toEqual(jasmine.any(Function));
  });

  it('should properly set given props', function () {

    expect(Person.prototype.name).not.toBeDefined();
    expect(Person.prototype.getName).toBeDefined();
  });

  it('should be able to handle multiple prop objects', function () {
    var BetterPerson = new Klass({
      name: 'BetterPerson',
      getName: function () {
        return this.name;
      }
    }, {
      age: 25,
      setName: function (name) {
        this.name = name;
      }
    });

    expect(BetterPerson.prototype.setName).toBeDefined();
  });

  it('should call initialize method', function () {
    var InitializedPerson = new Klass({
      name: 'Person',
      getName: function () {
        return this.name;
      },
      initialize: function () {
        this.initialized = true;
      }
    }),
    ip;

    spyOn(InitializedPerson.prototype, 'initialize').and.callThrough();

    expect(InitializedPerson.prototype.initialize).toBeDefined();

    ip = new InitializedPerson({
      name: 'Bob'
    });

    expect(InitializedPerson.prototype.initialize).toHaveBeenCalled();

  });

});
