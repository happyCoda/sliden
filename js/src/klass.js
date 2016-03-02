'use strict';

function Klass() {
  var args = Array.prototype.slice.call(arguments);

  function addProps(props, own) {
    var propKeys = Object.keys(props);

    if (props.constructor !== Object) {
      propKeys = propKeys.concat(Object.keys(props.constructor.prototype));
    }

    propKeys.forEach(function (key) {
      if (own) {
        if (typeof props[key] !== 'function') {

          this[key] = props[key];
        }
      } else {
        if (typeof props[key] === 'function') {
          this[key] = props[key];
        }
      }
    }, this);
  }

  function F () {
    var initArgs = Array.prototype.slice.call(arguments);

    args.forEach(function (props) {
      addProps.call(this, props, true);
    }, this);

    if (this.initialize) {
      this.initialize.apply(this, initArgs);
    }
  }

  args.forEach(function (props) {

    addProps.call(F.prototype, props, false);
  });

  return F;
}

module.exports = Klass;
