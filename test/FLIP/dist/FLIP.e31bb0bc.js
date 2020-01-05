// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/rematrix/dist/rematrix.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.identity = identity;
exports.inverse = inverse;
exports.multiply = multiply;
exports.parse = parse;
exports.rotate = rotate;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.scale = scale;
exports.scaleX = scaleX;
exports.scaleY = scaleY;
exports.scaleZ = scaleZ;
exports.skew = skew;
exports.skewX = skewX;
exports.skewY = skewY;
exports.translate = translate;
exports.translateX = translateX;
exports.translateY = translateY;
exports.translateZ = translateZ;

/*! @license Rematrix v0.2.2

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

/**
 * @module Rematrix
 */

/**
 * Transformation matrices in the browser come in two flavors:
 *
 *  - `matrix` using 6 values (short)
 *  - `matrix3d` using 16 values (long)
 *
 * This utility follows this [conversion guide](https://goo.gl/EJlUQ1)
 * to expand short form matrices to their equivalent long form.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function format(source) {
  if (source.constructor !== Array) {
    throw new TypeError('Expected array.');
  }

  if (source.length === 16) {
    return source;
  }

  if (source.length === 6) {
    var matrix = identity();
    matrix[0] = source[0];
    matrix[1] = source[1];
    matrix[4] = source[2];
    matrix[5] = source[3];
    matrix[12] = source[4];
    matrix[13] = source[5];
    return matrix;
  }

  throw new RangeError('Expected array with either 6 or 16 values.');
}
/**
 * Returns a matrix representing no transformation. The product of any matrix
 * multiplied by the identity matrix will be the original matrix.
 *
 * > **Tip:** Similar to how `5 * 1 === 5`, where `1` is the identity.
 *
 * @return {array}
 */


function identity() {
  var matrix = [];

  for (var i = 0; i < 16; i++) {
    i % 5 == 0 ? matrix.push(1) : matrix.push(0);
  }

  return matrix;
}
/**
 * Returns a matrix describing the inverse transformation of the source
 * matrix. The product of any matrix multiplied by its inverse will be the
 * identity matrix.
 *
 * > **Tip:** Similar to how `5 * (1/5) === 1`, where `1/5` is the inverse.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */


function inverse(source) {
  var m = format(source);
  var s0 = m[0] * m[5] - m[4] * m[1];
  var s1 = m[0] * m[6] - m[4] * m[2];
  var s2 = m[0] * m[7] - m[4] * m[3];
  var s3 = m[1] * m[6] - m[5] * m[2];
  var s4 = m[1] * m[7] - m[5] * m[3];
  var s5 = m[2] * m[7] - m[6] * m[3];
  var c5 = m[10] * m[15] - m[14] * m[11];
  var c4 = m[9] * m[15] - m[13] * m[11];
  var c3 = m[9] * m[14] - m[13] * m[10];
  var c2 = m[8] * m[15] - m[12] * m[11];
  var c1 = m[8] * m[14] - m[12] * m[10];
  var c0 = m[8] * m[13] - m[12] * m[9];
  var determinant = 1 / (s0 * c5 - s1 * c4 + s2 * c3 + s3 * c2 - s4 * c1 + s5 * c0);

  if (isNaN(determinant) || determinant === Infinity) {
    throw new Error('Inverse determinant attempted to divide by zero.');
  }

  return [(m[5] * c5 - m[6] * c4 + m[7] * c3) * determinant, (-m[1] * c5 + m[2] * c4 - m[3] * c3) * determinant, (m[13] * s5 - m[14] * s4 + m[15] * s3) * determinant, (-m[9] * s5 + m[10] * s4 - m[11] * s3) * determinant, (-m[4] * c5 + m[6] * c2 - m[7] * c1) * determinant, (m[0] * c5 - m[2] * c2 + m[3] * c1) * determinant, (-m[12] * s5 + m[14] * s2 - m[15] * s1) * determinant, (m[8] * s5 - m[10] * s2 + m[11] * s1) * determinant, (m[4] * c4 - m[5] * c2 + m[7] * c0) * determinant, (-m[0] * c4 + m[1] * c2 - m[3] * c0) * determinant, (m[12] * s4 - m[13] * s2 + m[15] * s0) * determinant, (-m[8] * s4 + m[9] * s2 - m[11] * s0) * determinant, (-m[4] * c3 + m[5] * c1 - m[6] * c0) * determinant, (m[0] * c3 - m[1] * c1 + m[2] * c0) * determinant, (-m[12] * s3 + m[13] * s1 - m[14] * s0) * determinant, (m[8] * s3 - m[9] * s1 + m[10] * s0) * determinant];
}
/**
 * Returns a 4x4 matrix describing the combined transformations
 * of both arguments.
 *
 * > **Note:** Order is very important. For example, rotating 45°
 * along the Z-axis, followed by translating 500 pixels along the
 * Y-axis... is not the same as translating 500 pixels along the
 * Y-axis, followed by rotating 45° along on the Z-axis.
 *
 * @param  {array} m - Accepts both short and long form matrices.
 * @param  {array} x - Accepts both short and long form matrices.
 * @return {array}
 */


function multiply(m, x) {
  var fm = format(m);
  var fx = format(x);
  var product = [];

  for (var i = 0; i < 4; i++) {
    var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]];

    for (var j = 0; j < 4; j++) {
      var k = j * 4;
      var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]];
      var result = row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];
      product[i + k] = result;
    }
  }

  return product;
}
/**
 * Attempts to return a 4x4 matrix describing the CSS transform
 * matrix passed in, but will return the identity matrix as a
 * fallback.
 *
 * **Tip:** In virtually all cases, this method is used to convert
 * a CSS matrix (retrieved as a `string` from computed styles) to
 * its equivalent array format.
 *
 * @param  {string} source - String containing a valid CSS `matrix` or `matrix3d` property.
 * @return {array}
 */


function parse(source) {
  if (typeof source === 'string') {
    var match = source.match(/matrix(3d)?\(([^)]+)\)/);

    if (match) {
      var raw = match[2].split(', ').map(parseFloat);
      return format(raw);
    }
  }

  return identity();
}
/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function rotate(angle) {
  return rotateZ(angle);
}
/**
 * Returns a 4x4 matrix describing X-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function rotateX(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[5] = matrix[10] = Math.cos(theta);
  matrix[6] = matrix[9] = Math.sin(theta);
  matrix[9] *= -1;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Y-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function rotateY(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[10] = Math.cos(theta);
  matrix[2] = matrix[8] = Math.sin(theta);
  matrix[2] *= -1;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function rotateZ(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[5] = Math.cos(theta);
  matrix[1] = matrix[4] = Math.sin(theta);
  matrix[4] *= -1;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing 2D scaling. The first argument
 * is used for both X and Y-axis scaling, unless an optional
 * second argument is provided to explicitly define Y-axis scaling.
 *
 * @param  {number} scalar    - Decimal multiplier.
 * @param  {number} [scalarY] - Decimal multiplier.
 * @return {array}
 */


function scale(scalar, scalarY) {
  var matrix = identity();
  matrix[0] = scalar;
  matrix[5] = typeof scalarY === 'number' ? scalarY : scalar;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing X-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */


function scaleX(scalar) {
  var matrix = identity();
  matrix[0] = scalar;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Y-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */


function scaleY(scalar) {
  var matrix = identity();
  matrix[5] = scalar;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Z-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */


function scaleZ(scalar) {
  var matrix = identity();
  matrix[10] = scalar;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing shear. The first argument
 * defines X-axis shearing, and an optional second argument
 * defines Y-axis shearing.
 *
 * @param  {number} angleX   - Measured in degrees.
 * @param  {number} [angleY] - Measured in degrees.
 * @return {array}
 */


function skew(angleX, angleY) {
  var thetaX = Math.PI / 180 * angleX;
  var matrix = identity();
  matrix[4] = Math.tan(thetaX);

  if (angleY) {
    var thetaY = Math.PI / 180 * angleY;
    matrix[1] = Math.tan(thetaY);
  }

  return matrix;
}
/**
 * Returns a 4x4 matrix describing X-axis shear.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function skewX(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[4] = Math.tan(theta);
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Y-axis shear.
 *
 * @param  {number} angle - Measured in degrees
 * @return {array}
 */


function skewY(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[1] = Math.tan(theta);
  return matrix;
}
/**
 * Returns a 4x4 matrix describing 2D translation. The first
 * argument defines X-axis translation, and an optional second
 * argument defines Y-axis translation.
 *
 * @param  {number} distanceX   - Measured in pixels.
 * @param  {number} [distanceY] - Measured in pixels.
 * @return {array}
 */


function translate(distanceX, distanceY) {
  var matrix = identity();
  matrix[12] = distanceX;

  if (distanceY) {
    matrix[13] = distanceY;
  }

  return matrix;
}
/**
 * Returns a 4x4 matrix describing X-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */


function translateX(distance) {
  var matrix = identity();
  matrix[12] = distance;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Y-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */


function translateY(distance) {
  var matrix = identity();
  matrix[13] = distance;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Z-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */


function translateZ(distance) {
  var matrix = identity();
  matrix[14] = distance;
  return matrix;
}
},{}],"../../node_modules/react-flip-toolkit/lib/FlipToolkit/index.js":[function(require,module,exports) {
var t = require("rematrix"),
    e = function (t) {
  return "number" == typeof t;
},
    i = function (t) {
  return "function" == typeof t;
},
    n = function (t) {
  return "[object Object]" === Object.prototype.toString.call(t);
},
    r = function (t) {
  return Array.prototype.slice.apply(t);
},
    o = function (t) {
  var e = t.reduce(function (t, e) {
    return t[e] = (t[e] || 0) + 1, t;
  }, {});
  return Object.keys(e).filter(function (t) {
    return e[t] > 1;
  });
};

function a(t) {
  for (var e = [], i = arguments.length - 1; i-- > 0;) e[i] = arguments[i + 1];

  return e.forEach(function (e) {
    if (e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
  }), t;
}

var s,
    l = function (t, e, i) {
  return t + (e - t) * i;
},
    p = {
  isNumber: e,
  isFunction: i,
  isObject: n,
  toArray: r,
  getDuplicateValsAsStrings: o,
  assign: a,
  tweenProp: l
},
    c = {
  noWobble: {
    stiffness: 200,
    damping: 26
  },
  gentle: {
    stiffness: 120,
    damping: 14
  },
  veryGentle: {
    stiffness: 130,
    damping: 17
  },
  wobbly: {
    stiffness: 180,
    damping: 12
  },
  stiff: {
    stiffness: 260,
    damping: 26
  }
},
    u = function (t) {
  return n(t) ? t : Object.keys(c).indexOf(t) > -1 ? c[t] : {};
};

"undefined" != typeof window && (s = window.requestAnimationFrame);

var d = s = s || function (t) {
  window.setTimeout(t, 1e3 / 60);
},
    f = Date.now(),
    h = "object" == typeof performance && "function" == typeof performance.now ? function () {
  return performance.now();
} : function () {
  return Date.now() - f;
};

function g(t, e) {
  var i = t.indexOf(e);
  -1 !== i && t.splice(i, 1);
}

var m = function () {};

m.prototype.run = function () {
  var t = this;
  d(function () {
    t.springSystem.loop(h());
  });
};

var v = function () {
  this.position = 0, this.velocity = 0;
},
    y = 0,
    _ = function (t) {
  this._id = "s" + y++, this._springSystem = t, this.listeners = [], this._startValue = 0, this._currentState = new v(), this._displacementFromRestThreshold = .001, this._endValue = 0, this._overshootClampingEnabled = !1, this._previousState = new v(), this._restSpeedThreshold = .001, this._tempState = new v(), this._timeAccumulator = 0, this._wasAtRest = !0, this._cachedSpringConfig = {};
};

_.prototype.getId = function () {
  return this._id;
}, _.prototype.destroy = function () {
  this.listeners = [], this._springSystem.deregisterSpring(this);
}, _.prototype.setSpringConfig = function (t) {
  return this._springConfig = t, this;
}, _.prototype.getCurrentValue = function () {
  return this._currentState.position;
}, _.prototype.getDisplacementDistanceForState = function (t) {
  return Math.abs(this._endValue - t.position);
}, _.prototype.setEndValue = function (t) {
  if (t === this._endValue) return this;
  if (this.prevEndValue = t, this._endValue === t && this.isAtRest()) return this;
  this._startValue = this.getCurrentValue(), this._endValue = t, this._springSystem.activateSpring(this.getId());

  for (var e = 0, i = this.listeners.length; e < i; e++) {
    var n = this.listeners[e].onSpringEndStateChange;
    n && n(this);
  }

  return this;
}, _.prototype.setVelocity = function (t) {
  return t === this._currentState.velocity ? this : (this._currentState.velocity = t, this._springSystem.activateSpring(this.getId()), this);
}, _.prototype.setCurrentValue = function (t) {
  this._startValue = t, this._currentState.position = t;

  for (var e = 0, i = this.listeners.length; e < i; e++) {
    var n = this.listeners[e];
    n.onSpringUpdate && n.onSpringUpdate(this);
  }

  return this;
}, _.prototype.setAtRest = function () {
  return this._endValue = this._currentState.position, this._tempState.position = this._currentState.position, this._currentState.velocity = 0, this;
}, _.prototype.setOvershootClampingEnabled = function (t) {
  return this._overshootClampingEnabled = t, this;
}, _.prototype.isOvershooting = function () {
  var t = this._startValue,
      e = this._endValue;
  return this._springConfig.tension > 0 && (t < e && this.getCurrentValue() > e || t > e && this.getCurrentValue() < e);
}, _.prototype.advance = function (t, e) {
  var i = this.isAtRest();

  if (!i || !this._wasAtRest) {
    var n = e;
    e > .064 && (n = .064), this._timeAccumulator += n;

    for (var r, o, a, s, l, p, c = this._springConfig.tension, u = this._springConfig.friction, d = this._currentState.position, f = this._currentState.velocity, h = this._tempState.position, g = this._tempState.velocity; this._timeAccumulator >= .001;) this._timeAccumulator -= .001, this._timeAccumulator < .001 && (this._previousState.position = d, this._previousState.velocity = f), o = c * (this._endValue - h) - u * f, s = c * (this._endValue - (h = d + .001 * (r = f) * .5)) - u * (g = f + .001 * o * .5), p = c * (this._endValue - (h = d + .001 * (a = g) * .5)) - u * (g = f + .001 * s * .5), h = d + .001 * (l = g), d += 1 / 6 * (r + 2 * (a + l) + (g = f + .001 * p)) * .001, f += 1 / 6 * (o + 2 * (s + p) + (c * (this._endValue - h) - u * g)) * .001;

    this._tempState.position = h, this._tempState.velocity = g, this._currentState.position = d, this._currentState.velocity = f, this._timeAccumulator > 0 && this._interpolate(this._timeAccumulator / .001), (this.isAtRest() || this._overshootClampingEnabled && this.isOvershooting()) && (this._springConfig.tension > 0 ? (this._startValue = this._endValue, this._currentState.position = this._endValue) : (this._endValue = this._currentState.position, this._startValue = this._endValue), this.setVelocity(0), i = !0);
    var m = !1;
    this._wasAtRest && (this._wasAtRest = !1, m = !0);
    var v = !1;
    i && (this._wasAtRest = !0, v = !0), this.notifyPositionUpdated(m, v);
  }
}, _.prototype.notifyPositionUpdated = function (t, e) {
  var i = this;
  this.listeners.filter(Boolean).forEach(function (n) {
    t && n.onSpringActivate && !i._onActivateCalled && (n.onSpringActivate(i), i._onActivateCalled = !0), n.onSpringUpdate && n.onSpringUpdate(i), e && n.onSpringAtRest && n.onSpringAtRest(i);
  });
}, _.prototype.systemShouldAdvance = function () {
  return !this.isAtRest() || !this.wasAtRest();
}, _.prototype.wasAtRest = function () {
  return this._wasAtRest;
}, _.prototype.isAtRest = function () {
  return Math.abs(this._currentState.velocity) < this._restSpeedThreshold && (this.getDisplacementDistanceForState(this._currentState) <= this._displacementFromRestThreshold || 0 === this._springConfig.tension);
}, _.prototype._interpolate = function (t) {
  this._currentState.position = this._currentState.position * t + this._previousState.position * (1 - t), this._currentState.velocity = this._currentState.velocity * t + this._previousState.velocity * (1 - t);
}, _.prototype.addListener = function (t) {
  return this.listeners.push(t), this;
}, _.prototype.addOneTimeListener = function (t) {
  var e = this;
  return Object.keys(t).forEach(function (i) {
    var n;
    t[i] = (n = t[i], function () {
      for (var i = [], r = arguments.length; r--;) i[r] = arguments[r];

      n.apply(void 0, i), e.removeListener(t);
    });
  }), this.listeners.push(t), this;
}, _.prototype.removeListener = function (t) {
  return g(this.listeners, t), this;
};

var S = function (t) {
  this.looper = t || new m(), this.looper.springSystem = this, this.listeners = [], this._activeSprings = [], this._idleSpringIndices = [], this._isIdle = !0, this._lastTimeMillis = -1, this._springRegistry = {};
};

S.prototype.createSpring = function (t, e) {
  return this.createSpringWithConfig({
    tension: t,
    friction: e
  });
}, S.prototype.createSpringWithConfig = function (t) {
  var e = new _(this);
  return this.registerSpring(e), e.setSpringConfig(t), e;
}, S.prototype.getIsIdle = function () {
  return this._isIdle;
}, S.prototype.registerSpring = function (t) {
  this._springRegistry[t.getId()] = t;
}, S.prototype.deregisterSpring = function (t) {
  g(this._activeSprings, t), delete this._springRegistry[t.getId()];
}, S.prototype.advance = function (t, e) {
  for (var i = this; this._idleSpringIndices.length > 0;) this._idleSpringIndices.pop();

  for (this._activeSprings.filter(Boolean).forEach(function (n) {
    n.systemShouldAdvance() ? n.advance(t / 1e3, e / 1e3) : i._idleSpringIndices.push(i._activeSprings.indexOf(n));
  }); this._idleSpringIndices.length > 0;) {
    var n = this._idleSpringIndices.pop();

    n >= 0 && this._activeSprings.splice(n, 1);
  }
}, S.prototype.loop = function (t) {
  var e;
  -1 === this._lastTimeMillis && (this._lastTimeMillis = t - 1);
  var i = t - this._lastTimeMillis;
  this._lastTimeMillis = t;
  var n = 0,
      r = this.listeners.length;

  for (n = 0; n < r; n++) (e = this.listeners[n]).onBeforeIntegrate && e.onBeforeIntegrate(this);

  for (this.advance(t, i), 0 === this._activeSprings.length && (this._isIdle = !0, this._lastTimeMillis = -1), n = 0; n < r; n++) (e = this.listeners[n]).onAfterIntegrate && e.onAfterIntegrate(this);

  this._isIdle || this.looper.run();
}, S.prototype.activateSpring = function (t) {
  var e = this._springRegistry[t];
  -1 === this._activeSprings.indexOf(e) && this._activeSprings.push(e), this.getIsIdle() && (this._isIdle = !1, this.looper.run());
};

var E = new S(),
    A = function (t) {
  var e = t.springConfig,
      i = e.overshootClamping,
      n = t.getOnUpdateFunc,
      r = t.onAnimationEnd,
      o = t.onSpringActivate,
      a = E.createSpring(e.stiffness, e.damping);
  a.setOvershootClampingEnabled(!!i);
  var s = {
    onSpringActivate: o,
    onSpringAtRest: function () {
      a.destroy(), r();
    },
    onSpringUpdate: n({
      spring: a,
      onAnimationEnd: r
    })
  };
  return a.addListener(s), a;
},
    C = function (t) {
  var e = A(t);
  return e.setEndValue(1), e;
},
    b = function (t, e) {
  if (void 0 === e && (e = {}), t && t.length) {
    e.reverse && t.reverse();
    var i,
        n = "number" != typeof (i = e.speed) ? 1.1 : 1 + Math.min(Math.max(5 * i, 0), 5),
        r = 1 / Math.max(Math.min(t.length, 100), 10),
        o = t.map(function (t, e) {
      var i = t.getOnUpdateFunc;
      return t.getOnUpdateFunc = function (t) {
        var a = i(t);
        return function (t) {
          var i = t.getCurrentValue();
          (i = i < .01 ? 0 : i > .99 ? 1 : i) >= r && o[e + 1] && o[e + 1](Math.max(Math.min(i * n, 1), 0)), a(t);
        };
      }, t;
    }).map(function (t) {
      var e = A(t);
      if (e) return e.setEndValue.bind(e);
    }).filter(Boolean);
    o[0] && o[0](1);
  }
},
    I = function (t) {
  return [0, 1, 4, 5, 12, 13].map(function (e) {
    return t[e];
  });
},
    O = function (t) {
  return t.top < window.innerHeight && t.bottom > 0 && t.left < window.innerWidth && t.right > 0;
},
    x = function (t, e) {
  var i;
  return a(t, ((i = {})[e[0]] = e[1], i));
},
    w = function (t, e) {
  return r(e ? document.querySelectorAll('[data-portal-key="' + e + '"]') : t.querySelectorAll("[data-flip-id]"));
},
    U = function (t) {
  return t.map(function (t) {
    return [t, t.getBoundingClientRect()];
  });
},
    V = function (n) {
  var s = n.cachedOrderedFlipIds;
  void 0 === s && (s = []);
  var p = n.inProgressAnimations;
  void 0 === p && (p = {});
  var d = n.flippedElementPositionsBeforeUpdate;
  void 0 === d && (d = {});
  var f = n.flipCallbacks;
  void 0 === f && (f = {});
  var h = n.containerEl,
      g = n.applyTransformOrigin,
      m = n.spring,
      v = n.debug,
      y = n.portalKey,
      _ = n.staggerConfig;
  void 0 === _ && (_ = {});
  var S = n.decisionData;
  void 0 === S && (S = {});

  var E = n.handleEnterUpdateDelete,
      A = n.onComplete,
      V = n.onStart,
      F = function (t) {
    return U(w(t.element, t.portalKey)).map(function (t) {
      var e = t[0],
          i = t[1],
          n = window.getComputedStyle(e);
      return [e.dataset.flipId, {
        element: e,
        rect: i,
        opacity: parseFloat(n.opacity),
        transform: n.transform
      }];
    }).reduce(x, {});
  }({
    element: h,
    portalKey: y
  }),
      P = function (t) {
    var e = t.containerEl,
        i = t.portalKey;
    return i ? function (t) {
      return function (e) {
        return r(document.querySelectorAll('[data-portal-key="' + t + '"]' + e));
      };
    }(i) : e ? function (t) {
      var e = Math.random().toFixed(5);
      return t.dataset.flipperId = e, function (i) {
        return r(t.querySelectorAll('[data-flipper-id="' + e + '"] ' + i));
      };
    }(e) : function () {
      return [];
    };
  }({
    containerEl: h,
    portalKey: y
  }),
      R = function (t) {
    return function (e) {
      return t('[data-flip-id="' + e + '"]')[0];
    };
  }(P),
      T = function (t) {
    return d[t] && F[t];
  },
      D = Object.keys(d).concat(Object.keys(F)).filter(function (t) {
    return !T(t);
  }),
      M = {
    flipCallbacks: f,
    getElement: R,
    flippedElementPositionsBeforeUpdate: d,
    flippedElementPositionsAfterUpdate: F,
    inProgressAnimations: p,
    decisionData: S
  },
      k = function (t) {
    var e,
        i = t.unflippedIds,
        n = t.flipCallbacks,
        r = t.getElement,
        o = t.flippedElementPositionsBeforeUpdate,
        a = t.flippedElementPositionsAfterUpdate,
        s = t.inProgressAnimations,
        l = t.decisionData,
        p = i.filter(function (t) {
      return a[t];
    }).filter(function (t) {
      return n[t] && n[t].onAppear;
    }),
        c = i.filter(function (t) {
      return o[t] && n[t] && n[t].onExit;
    }),
        u = new Promise(function (t) {
      e = t;
    }),
        d = [],
        f = 0,
        h = c.map(function (t, i) {
      var r = o[t].domDataForExitAnimations,
          a = r.element,
          p = r.parent,
          c = r.childPosition,
          u = c.top,
          h = c.left,
          g = c.width,
          m = c.height;
      "static" === getComputedStyle(p).position && (p.style.position = "relative"), a.style.transform = "matrix(1, 0, 0, 1, 0, 0)", a.style.position = "absolute", a.style.top = u + "px", a.style.left = h + "px", a.style.height = m + "px", a.style.width = g + "px";
      var v = d.filter(function (t) {
        return t[0] === p;
      })[0];
      v || (v = [p, document.createDocumentFragment()], d.push(v)), v[1].appendChild(a), f += 1;

      var y = function () {
        try {
          p.removeChild(a);
        } catch (t) {} finally {
          0 == (f -= 1) && e();
        }
      };

      return s[t] = {
        stop: y
      }, function () {
        return n[t].onExit(a, i, y, l);
      };
    });
    return d.forEach(function (t) {
      t[0].appendChild(t[1]);
    }), h.length || e(), {
      hideEnteringElements: function () {
        p.forEach(function (t) {
          var e = r(t);
          e && (e.style.opacity = "0");
        });
      },
      animateEnteringElements: function () {
        p.forEach(function (t, e) {
          var i = r(t);
          i && n[t].onAppear(i, e, l);
        });
      },
      animateExitingElements: function () {
        return h.forEach(function (t) {
          return t();
        }), u;
      }
    };
  }(a({}, M, {
    unflippedIds: D
  })),
      j = k.hideEnteringElements,
      B = k.animateEnteringElements,
      N = k.animateExitingElements,
      L = a({}, M, {
    containerEl: h,
    flippedIds: s.filter(T),
    applyTransformOrigin: g,
    spring: m,
    debug: v,
    staggerConfig: _,
    scopedSelector: P,
    onComplete: A
  });

  V && V(h, S);

  var q = function (n) {
    var s = L.flippedIds,
        p = L.flipCallbacks,
        d = L.inProgressAnimations,
        f = L.flippedElementPositionsBeforeUpdate,
        h = L.flippedElementPositionsAfterUpdate,
        g = L.applyTransformOrigin,
        m = L.spring,
        v = L.getElement,
        y = L.debug,
        _ = L.staggerConfig;
    void 0 === _ && (_ = {});
    var S = L.decisionData;
    void 0 === S && (S = {});
    var E,
        A = L.onComplete,
        x = L.containerEl,
        w = new Promise(function (t) {
      E = t;
    });
    if (A && w.then(function () {
      return A(x, S);
    }), !s.length) return function () {
      return E([]), w;
    };
    var U = [],
        V = v(s[0]),
        F = V ? V.ownerDocument.querySelector("body") : document.querySelector("body");
    o(s);
    var P = s.map(function (n) {
      var o = f[n].rect,
          s = h[n].rect,
          v = f[n].opacity,
          y = h[n].opacity,
          _ = s.width < 1 || s.height < 1,
          A = h[n].element;

      if (!O(o) && !O(s)) return !1;
      if (!A) return !1;

      var C = JSON.parse(A.dataset.flipConfig),
          b = function (t) {
        void 0 === t && (t = {});
        var e = t.flippedSpring;
        return a({}, c.noWobble, u(t.flipperSpring), u(e));
      }({
        flipperSpring: m,
        flippedSpring: C.spring
      }),
          x = !0 === C.stagger ? "default" : C.stagger,
          w = {
        element: A,
        id: n,
        stagger: x,
        springConfig: b
      };

      if (p[n] && p[n].shouldFlip && !p[n].shouldFlip(S.previous, S.current)) return !1;
      var V = Math.abs(o.left - s.left) + Math.abs(o.top - s.top),
          R = Math.abs(o.width - s.width) + Math.abs(o.height - s.height),
          T = Math.abs(y - v);
      if (V < .5 && R < .5 && T < .01) return !1;
      var D = t.parse(h[n].transform),
          M = {
        matrix: D
      },
          k = {
        matrix: []
      },
          j = [D];
      C.translate && (j.push(t.translateX(o.left - s.left)), j.push(t.translateY(o.top - s.top))), C.scale && (j.push(t.scaleX(Math.max(o.width, 1) / Math.max(s.width, 1))), j.push(t.scaleY(Math.max(o.height, 1) / Math.max(s.height, 1)))), C.opacity && (k.opacity = v, M.opacity = y);
      var B = [];

      if (!p[n] || !p[n].shouldInvert || p[n].shouldInvert(S.previous, S.current)) {
        var N = function (t, e) {
          return r(t.querySelectorAll('[data-inverse-flip-id="' + e + '"]'));
        }(A, n);

        B = N.map(function (t) {
          return [t, JSON.parse(t.dataset.flipConfig)];
        });
      }

      k.matrix = I(j.reduce(t.multiply)), M.matrix = I(M.matrix);

      var L,
          q = function (t) {
        var i = t.element,
            n = t.invertedChildren,
            r = t.body;
        return function (t) {
          var o = t.matrix,
              a = t.opacity,
              s = t.forceMinVals;

          if (e(a) && (i.style.opacity = a + ""), s && (i.style.minHeight = "1px", i.style.minWidth = "1px"), o) {
            var l = function (t) {
              return "matrix(" + t.join(", ") + ")";
            }(o);

            i.style.transform = l, n && function (t) {
              var e = t.matrix,
                  i = t.body;
              t.invertedChildren.forEach(function (t) {
                var n = t[0],
                    r = t[1];

                if (i.contains(n)) {
                  var o = e[0],
                      a = e[3],
                      s = e[5],
                      l = {
                    translateX: 0,
                    translateY: 0,
                    scaleX: 1,
                    scaleY: 1
                  },
                      p = "";
                  r.translate && (l.translateX = -e[4] / o, l.translateY = -s / a, p += "translate(" + l.translateX + "px, " + l.translateY + "px)"), r.scale && (l.scaleX = 1 / o, l.scaleY = 1 / a, p += " scale(" + l.scaleX + ", " + l.scaleY + ")"), n.style.transform = p;
                }
              });
            }({
              invertedChildren: n,
              matrix: o,
              body: r
            });
          }
        };
      }({
        element: A,
        invertedChildren: B,
        body: F
      });

      if (p[n] && p[n].onComplete) {
        var X = p[n].onComplete;

        L = function () {
          return X(A, S);
        };
      }

      var Y = e(k.opacity) && e(M.opacity) && k.opacity !== M.opacity,
          K = !1;
      return a({}, w, {
        stagger: x,
        springConfig: b,
        getOnUpdateFunc: function (t) {
          var e = t.spring,
              i = t.onAnimationEnd;
          return d[n] = {
            destroy: e.destroy.bind(e),
            onAnimationEnd: i
          }, function (t) {
            p[n] && p[n].onSpringUpdate && p[n].onSpringUpdate(t.getCurrentValue()), K || (K = !0, p[n] && p[n].onStart && p[n].onStart(A, S));
            var e = t.getCurrentValue();

            if (F.contains(A)) {
              var i = {
                matrix: []
              };
              i.matrix = k.matrix.map(function (t, i) {
                return l(t, M.matrix[i], e);
              }), Y && (i.opacity = l(k.opacity, M.opacity, e)), q(i);
            } else t.destroy();
          };
        },
        initializeFlip: function () {
          q({
            matrix: k.matrix,
            opacity: Y ? k.opacity : void 0,
            forceMinVals: _
          }), p[n] && p[n].onStartImmediate && p[n].onStartImmediate(A, S), C.transformOrigin ? A.style.transformOrigin = C.transformOrigin : g && (A.style.transformOrigin = "0 0"), B.forEach(function (t) {
            var e = t[0],
                i = t[1];
            i.transformOrigin ? e.style.transformOrigin = i.transformOrigin : g && (e.style.transformOrigin = "0 0");
          });
        },
        onAnimationEnd: function (t) {
          delete d[n], i(L) && L(), A.style.transform = "", B.forEach(function (t) {
            t[0].style.transform = "";
          }), _ && A && (A.style.minHeight = "", A.style.minWidth = ""), t || (U.push(n), U.length >= P.length && E(U));
        },
        delayUntil: C.delayUntil
      });
    }).filter(Boolean);
    if (P.forEach(function (t) {
      return (0, t.initializeFlip)();
    }), y) return function () {};
    var R = P.filter(function (t) {
      return t.delayUntil && (e = t.delayUntil, P.filter(function (t) {
        return t.id === e;
      }).length);
      var e;
    }),
        T = {},
        D = {},
        M = {};
    R.forEach(function (t) {
      t.stagger ? (M[t.stagger] = !0, D[t.delayUntil] ? D[t.delayUntil].push(t.stagger) : D[t.delayUntil] = [t.stagger]) : T[t.delayUntil] ? T[t.delayUntil].push(t) : T[t.delayUntil] = [t];
    });
    var k = P.filter(function (t) {
      return t.stagger;
    }).reduce(function (t, e) {
      return t[e.stagger] ? t[e.stagger].push(e) : t[e.stagger] = [e], t;
    }, {}),
        j = P.filter(function (t) {
      return -1 === R.indexOf(t);
    });
    return j.forEach(function (t) {
      t.onSpringActivate = function () {
        T[t.id] && T[t.id].forEach(C), D[t.id] && Object.keys(D[t.id].reduce(function (t, e) {
          var i;
          return a(t, ((i = {})[e] = !0, i));
        }, {})).forEach(function (t) {
          b(k[t], _[t]);
        });
      };
    }), function () {
      return P.length || E([]), j.filter(function (t) {
        return !t.stagger;
      }).forEach(C), Object.keys(k).forEach(function (t) {
        M[t] || b(k[t], _[t]);
      }), w;
    };
  }();

  E ? E({
    hideEnteringElements: j,
    animateEnteringElements: B,
    animateExitingElements: N,
    animateFlippedElements: q
  }) : (j(), N().then(B), q());
},
    F = function (t) {
  var e = t.element,
      i = t.flipCallbacks;
  void 0 === i && (i = {});
  var n = t.inProgressAnimations;
  void 0 === n && (n = {});
  var o = w(e, t.portalKey),
      s = r(e.querySelectorAll("[data-inverse-flip-id]")),
      l = {},
      p = [],
      c = {};
  o.filter(function (t) {
    return i && i[t.dataset.flipId] && i[t.dataset.flipId].onExit;
  }).forEach(function (t) {
    var e = t.parentNode;

    if (t.closest) {
      var i = t.closest("[data-exit-container]");
      i && (e = i);
    }

    var n = p.findIndex(function (t) {
      return t[0] === e;
    });
    -1 === n && (p.push([e, e.getBoundingClientRect()]), n = p.length - 1), l[t.dataset.flipId] = p[n][1], c[t.dataset.flipId] = e;
  });
  var u = U(o),
      d = u.map(function (t) {
    var e = t[0],
        n = t[1],
        r = {};

    if (i && i[e.dataset.flipId] && i[e.dataset.flipId].onExit) {
      var o = l[e.dataset.flipId];
      a(r, {
        element: e,
        parent: c[e.dataset.flipId],
        childPosition: {
          top: n.top - o.top,
          left: n.left - o.left,
          width: n.width,
          height: n.height
        }
      });
    }

    return [e.dataset.flipId, {
      rect: n,
      opacity: parseFloat(window.getComputedStyle(e).opacity || "1"),
      domDataForExitAnimations: r
    }];
  }).reduce(x, {});
  return function (t, e) {
    Object.keys(t).forEach(function (e) {
      t[e].destroy && t[e].destroy(), t[e].onAnimationEnd && t[e].onAnimationEnd(!0), delete t[e];
    }), e.forEach(function (t) {
      t.style.transform = "", t.style.opacity = "";
    });
  }(n, o.concat(s)), {
    flippedElementPositions: d,
    cachedOrderedFlipIds: u.map(function (t) {
      return t[0].dataset.flipId;
    })
  };
},
    P = function (t) {
  this.applyTransformOrigin = !0, a(this, t), this.inProgressAnimations = {}, this.flipCallbacks = {}, this.recordBeforeUpdate = this.recordBeforeUpdate.bind(this), this.update = this.update.bind(this), this.addFlipped = this.addFlipped.bind(this), this.addInverted = this.addInverted.bind(this);
};

P.prototype.recordBeforeUpdate = function () {
  this.snapshot = F({
    element: this.element,
    flipCallbacks: this.flipCallbacks,
    inProgressAnimations: this.inProgressAnimations
  });
}, P.prototype.update = function (t, e) {
  this.snapshot && (V({
    flippedElementPositionsBeforeUpdate: this.snapshot.flippedElementPositions,
    cachedOrderedFlipIds: this.snapshot.cachedOrderedFlipIds,
    containerEl: this.element,
    inProgressAnimations: this.inProgressAnimations,
    flipCallbacks: this.flipCallbacks,
    applyTransformOrigin: this.applyTransformOrigin,
    spring: this.spring,
    debug: this.debug,
    staggerConfig: this.staggerConfig,
    handleEnterUpdateDelete: this.handleEnterUpdateDelete,
    decisionData: {
      previous: t,
      current: e
    },
    onComplete: this.onComplete,
    onStart: this.onStart
  }), delete this.snapshot);
}, P.prototype.addFlipped = function (t) {
  var e = t.element,
      i = t.flipId,
      n = t.opacity,
      r = t.translate,
      o = t.scale,
      s = t.transformOrigin,
      l = t.spring,
      p = t.stagger,
      c = t.delayUntil,
      u = t.onAppear,
      d = t.onStart,
      f = t.onSpringUpdate,
      h = t.onComplete,
      g = t.onExit,
      m = t.shouldFlip,
      v = t.shouldInvert;
  if (!e) throw new Error("no element provided");
  if (!i) throw new Error("No flipId provided");
  var y = {
    scale: o,
    translate: r,
    opacity: n,
    transformOrigin: s,
    spring: l,
    stagger: p,
    delayUntil: c
  };
  y.scale || y.translate || y.opacity || a(y, {
    translate: !0,
    scale: !0,
    opacity: !0
  }), i && (e.dataset.flipId = String(i)), e.dataset.flipConfig = JSON.stringify(y), this.flipCallbacks[i] = {
    shouldFlip: m,
    shouldInvert: v,
    onAppear: u,
    onStart: d,
    onSpringUpdate: f,
    onComplete: h,
    onExit: g
  };
}, P.prototype.addInverted = function (t) {
  var e = t.element,
      i = t.parent,
      n = t.opacity,
      r = t.translate,
      o = t.scale,
      s = t.transformOrigin;
  if (!e) throw new Error("no element provided");
  if (!i) throw new Error("parent must be provided");
  var l = i.dataset.flipId,
      p = {
    scale: o,
    translate: r,
    opacity: n,
    transformOrigin: s
  };
  p.scale || p.translate || p.opacity || a(p, {
    translate: !0,
    scale: !0,
    opacity: !0
  }), e.dataset.inverseFlipId = l, e.dataset.flipConfig = JSON.stringify(p);
};
var R = new S();
exports.utilities = p, exports.constants = {
  DATA_FLIP_ID: "data-flip-id",
  DATA_INVERSE_FLIP_ID: "data-inverse-flip-id",
  DATA_FLIP_COMPONENT_ID: "data-flip-component-id",
  DATA_FLIP_CONFIG: "data-flip-config",
  DATA_PORTAL_KEY: "data-portal-key",
  DATA_EXIT_CONTAINER: "data-exit-container"
}, exports.Flipper = P, exports.getFlippedElementPositionsBeforeUpdate = F, exports.onFlipKeyUpdate = V, exports.spring = function (t) {
  var e = t.values,
      i = t.onUpdate,
      n = t.delay;
  void 0 === n && (n = 0);
  var r = t.onComplete,
      o = a({}, c.noWobble, u(t.config)),
      s = o.overshootClamping,
      p = R.createSpring(o.stiffness, o.damping);
  return p.setOvershootClampingEnabled(!!s), p.addListener({
    onSpringAtRest: function (t) {
      r && r(), t.destroy();
    },
    onSpringUpdate: function (t) {
      var n = t.getCurrentValue();
      if (!e) return i(n);
      var r = Object.keys(e).map(function (t) {
        return [t, l(e[t][0], e[t][1], n)];
      }).reduce(function (t, e) {
        var i;
        return Object.assign(t, ((i = {})[e[0]] = e[1], i));
      }, {});
      i(r);
    }
  }), n ? setTimeout(function () {
    p.setEndValue(1);
  }, n) : p.setEndValue(1), p;
};
},{"rematrix":"../../node_modules/rematrix/dist/rematrix.es.js"}],"../../node_modules/flip-toolkit/lib/index.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Flipper", {
  enumerable: true,
  get: function () {
    return _FlipToolkit.Flipper;
  }
});
Object.defineProperty(exports, "spring", {
  enumerable: true,
  get: function () {
    return _FlipToolkit.spring;
  }
});

var _FlipToolkit = require("react-flip-toolkit/lib/FlipToolkit");
},{"react-flip-toolkit/lib/FlipToolkit":"../../node_modules/react-flip-toolkit/lib/FlipToolkit/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _flipToolkit = require("flip-toolkit");

const container = document.querySelector(".container");
const square = document.querySelector(".square");
const innerSquare = document.querySelector(".inner-square");
const flipper = new _flipToolkit.Flipper({
  element: container
}); // add flipped children to the parent

flipper.addFlipped({
  element: square,
  flipId: "square",
  onStart: () => console.log("animation started!"),
  onSpringUpdate: springValue => console.log(`current spring value: ${springValue}`),
  onComplete: () => console.log("animation completed!")
}); // to add an inverted child
// (so that the text doesn't warp)
// use this method with
// a reference to the parent element

flipper.addInverted({
  element: innerSquare,
  parent: square
});
square.addEventListener("click", () => {
  // record positions before they change
  flipper.recordBeforeUpdate();
  square.classList.toggle("big-square"); // record new positions, and begin animations

  flipper.update();
});
},{"flip-toolkit":"../../node_modules/flip-toolkit/lib/index.es.js"}],"../../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55914" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/FLIP.e31bb0bc.js.map