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
})({"../node_modules/core-js-pure/internals/global.js":[function(require,module,exports) {
var global = arguments[3];
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

},{}],"../node_modules/core-js-pure/internals/fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],"../node_modules/core-js-pure/internals/descriptors.js":[function(require,module,exports) {
var fails = require('../internals/fails');

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":"../node_modules/core-js-pure/internals/fails.js"}],"../node_modules/core-js-pure/internals/object-property-is-enumerable.js":[function(require,module,exports) {
'use strict';
var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

},{}],"../node_modules/core-js-pure/internals/create-property-descriptor.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js-pure/internals/classof-raw.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js-pure/internals/indexed-object.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/fails":"../node_modules/core-js-pure/internals/fails.js","../internals/classof-raw":"../node_modules/core-js-pure/internals/classof-raw.js"}],"../node_modules/core-js-pure/internals/require-object-coercible.js":[function(require,module,exports) {
// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],"../node_modules/core-js-pure/internals/to-indexed-object.js":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"../node_modules/core-js-pure/internals/indexed-object.js","../internals/require-object-coercible":"../node_modules/core-js-pure/internals/require-object-coercible.js"}],"../node_modules/core-js-pure/internals/is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js-pure/internals/to-primitive.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js"}],"../node_modules/core-js-pure/internals/has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js-pure/internals/document-create-element.js":[function(require,module,exports) {

var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js"}],"../node_modules/core-js-pure/internals/ie8-dom-define.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/fails":"../node_modules/core-js-pure/internals/fails.js","../internals/document-create-element":"../node_modules/core-js-pure/internals/document-create-element.js"}],"../node_modules/core-js-pure/internals/object-get-own-property-descriptor.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/object-property-is-enumerable":"../node_modules/core-js-pure/internals/object-property-is-enumerable.js","../internals/create-property-descriptor":"../node_modules/core-js-pure/internals/create-property-descriptor.js","../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/to-primitive":"../node_modules/core-js-pure/internals/to-primitive.js","../internals/has":"../node_modules/core-js-pure/internals/has.js","../internals/ie8-dom-define":"../node_modules/core-js-pure/internals/ie8-dom-define.js"}],"../node_modules/core-js-pure/internals/is-forced.js":[function(require,module,exports) {
var fails = require('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":"../node_modules/core-js-pure/internals/fails.js"}],"../node_modules/core-js-pure/internals/path.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js-pure/internals/a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],"../node_modules/core-js-pure/internals/function-bind-context.js":[function(require,module,exports) {
var aFunction = require('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":"../node_modules/core-js-pure/internals/a-function.js"}],"../node_modules/core-js-pure/internals/an-object.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js"}],"../node_modules/core-js-pure/internals/object-define-property.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/ie8-dom-define":"../node_modules/core-js-pure/internals/ie8-dom-define.js","../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js","../internals/to-primitive":"../node_modules/core-js-pure/internals/to-primitive.js"}],"../node_modules/core-js-pure/internals/create-non-enumerable-property.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js-pure/internals/object-define-property.js","../internals/create-property-descriptor":"../node_modules/core-js-pure/internals/create-property-descriptor.js"}],"../node_modules/core-js-pure/internals/export.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var isForced = require('../internals/is-forced');
var path = require('../internals/path');
var bind = require('../internals/function-bind-context');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return NativeConstructor.apply(this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind(Function.call, sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js-pure/internals/object-get-own-property-descriptor.js","../internals/is-forced":"../node_modules/core-js-pure/internals/is-forced.js","../internals/path":"../node_modules/core-js-pure/internals/path.js","../internals/function-bind-context":"../node_modules/core-js-pure/internals/function-bind-context.js","../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js-pure/internals/has.js"}],"../node_modules/core-js-pure/modules/es.object.define-property.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var objectDefinePropertyModile = require('../internals/object-define-property');

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js-pure/internals/object-define-property.js"}],"../node_modules/core-js-pure/es/object/define-property.js":[function(require,module,exports) {
require('../../modules/es.object.define-property');
var path = require('../../internals/path');

var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;

},{"../../modules/es.object.define-property":"../node_modules/core-js-pure/modules/es.object.define-property.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/stable/object/define-property.js":[function(require,module,exports) {
var parent = require('../../es/object/define-property');

module.exports = parent;

},{"../../es/object/define-property":"../node_modules/core-js-pure/es/object/define-property.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/object/define-property");
},{"core-js-pure/stable/object/define-property":"../node_modules/core-js-pure/stable/object/define-property.js"}],"../node_modules/core-js-pure/internals/to-integer.js":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],"../node_modules/core-js-pure/internals/to-length.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":"../node_modules/core-js-pure/internals/to-integer.js"}],"../node_modules/core-js-pure/internals/to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":"../node_modules/core-js-pure/internals/to-integer.js"}],"../node_modules/core-js-pure/internals/array-includes.js":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/to-length":"../node_modules/core-js-pure/internals/to-length.js","../internals/to-absolute-index":"../node_modules/core-js-pure/internals/to-absolute-index.js"}],"../node_modules/core-js-pure/internals/hidden-keys.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js-pure/internals/object-keys-internal.js":[function(require,module,exports) {
var has = require('../internals/has');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/has":"../node_modules/core-js-pure/internals/has.js","../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/array-includes":"../node_modules/core-js-pure/internals/array-includes.js","../internals/hidden-keys":"../node_modules/core-js-pure/internals/hidden-keys.js"}],"../node_modules/core-js-pure/internals/enum-bug-keys.js":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],"../node_modules/core-js-pure/internals/object-keys.js":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/object-keys-internal":"../node_modules/core-js-pure/internals/object-keys-internal.js","../internals/enum-bug-keys":"../node_modules/core-js-pure/internals/enum-bug-keys.js"}],"../node_modules/core-js-pure/internals/object-define-properties.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};

},{"../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js-pure/internals/object-define-property.js","../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js","../internals/object-keys":"../node_modules/core-js-pure/internals/object-keys.js"}],"../node_modules/core-js-pure/modules/es.object.define-properties.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var defineProperties = require('../internals/object-define-properties');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/object-define-properties":"../node_modules/core-js-pure/internals/object-define-properties.js"}],"../node_modules/core-js-pure/es/object/define-properties.js":[function(require,module,exports) {
require('../../modules/es.object.define-properties');
var path = require('../../internals/path');

var Object = path.Object;

var defineProperties = module.exports = function defineProperties(T, D) {
  return Object.defineProperties(T, D);
};

if (Object.defineProperties.sham) defineProperties.sham = true;

},{"../../modules/es.object.define-properties":"../node_modules/core-js-pure/modules/es.object.define-properties.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/stable/object/define-properties.js":[function(require,module,exports) {
var parent = require('../../es/object/define-properties');

module.exports = parent;

},{"../../es/object/define-properties":"../node_modules/core-js-pure/es/object/define-properties.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/object/define-properties");
},{"core-js-pure/stable/object/define-properties":"../node_modules/core-js-pure/stable/object/define-properties.js"}],"../node_modules/core-js-pure/internals/get-built-in.js":[function(require,module,exports) {

var path = require('../internals/path');
var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/path":"../node_modules/core-js-pure/internals/path.js","../internals/global":"../node_modules/core-js-pure/internals/global.js"}],"../node_modules/core-js-pure/internals/object-get-own-property-names.js":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"../node_modules/core-js-pure/internals/object-keys-internal.js","../internals/enum-bug-keys":"../node_modules/core-js-pure/internals/enum-bug-keys.js"}],"../node_modules/core-js-pure/internals/object-get-own-property-symbols.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"../node_modules/core-js-pure/internals/own-keys.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"../node_modules/core-js-pure/internals/get-built-in.js","../internals/object-get-own-property-names":"../node_modules/core-js-pure/internals/object-get-own-property-names.js","../internals/object-get-own-property-symbols":"../node_modules/core-js-pure/internals/object-get-own-property-symbols.js","../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js"}],"../node_modules/core-js-pure/internals/create-property.js":[function(require,module,exports) {
'use strict';
var toPrimitive = require('../internals/to-primitive');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

},{"../internals/to-primitive":"../node_modules/core-js-pure/internals/to-primitive.js","../internals/object-define-property":"../node_modules/core-js-pure/internals/object-define-property.js","../internals/create-property-descriptor":"../node_modules/core-js-pure/internals/create-property-descriptor.js"}],"../node_modules/core-js-pure/modules/es.object.get-own-property-descriptors.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var ownKeys = require('../internals/own-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var createProperty = require('../internals/create-property');

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/own-keys":"../node_modules/core-js-pure/internals/own-keys.js","../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js-pure/internals/object-get-own-property-descriptor.js","../internals/create-property":"../node_modules/core-js-pure/internals/create-property.js"}],"../node_modules/core-js-pure/es/object/get-own-property-descriptors.js":[function(require,module,exports) {
require('../../modules/es.object.get-own-property-descriptors');
var path = require('../../internals/path');

module.exports = path.Object.getOwnPropertyDescriptors;

},{"../../modules/es.object.get-own-property-descriptors":"../node_modules/core-js-pure/modules/es.object.get-own-property-descriptors.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/stable/object/get-own-property-descriptors.js":[function(require,module,exports) {
var parent = require('../../es/object/get-own-property-descriptors');

module.exports = parent;

},{"../../es/object/get-own-property-descriptors":"../node_modules/core-js-pure/es/object/get-own-property-descriptors.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/object/get-own-property-descriptors");
},{"core-js-pure/stable/object/get-own-property-descriptors":"../node_modules/core-js-pure/stable/object/get-own-property-descriptors.js"}],"../node_modules/core-js-pure/internals/add-to-unscopables.js":[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],"../node_modules/core-js-pure/internals/iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js-pure/internals/set-global.js":[function(require,module,exports) {

var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js"}],"../node_modules/core-js-pure/internals/shared-store.js":[function(require,module,exports) {

var global = require('../internals/global');
var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/set-global":"../node_modules/core-js-pure/internals/set-global.js"}],"../node_modules/core-js-pure/internals/inspect-source.js":[function(require,module,exports) {
var store = require('../internals/shared-store');

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":"../node_modules/core-js-pure/internals/shared-store.js"}],"../node_modules/core-js-pure/internals/native-weak-map.js":[function(require,module,exports) {

var global = require('../internals/global');
var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/inspect-source":"../node_modules/core-js-pure/internals/inspect-source.js"}],"../node_modules/core-js-pure/internals/is-pure.js":[function(require,module,exports) {
module.exports = true;

},{}],"../node_modules/core-js-pure/internals/shared.js":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":"../node_modules/core-js-pure/internals/is-pure.js","../internals/shared-store":"../node_modules/core-js-pure/internals/shared-store.js"}],"../node_modules/core-js-pure/internals/uid.js":[function(require,module,exports) {
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],"../node_modules/core-js-pure/internals/shared-key.js":[function(require,module,exports) {
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"../node_modules/core-js-pure/internals/shared.js","../internals/uid":"../node_modules/core-js-pure/internals/uid.js"}],"../node_modules/core-js-pure/internals/internal-state.js":[function(require,module,exports) {

var NATIVE_WEAK_MAP = require('../internals/native-weak-map');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var objectHas = require('../internals/has');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/native-weak-map":"../node_modules/core-js-pure/internals/native-weak-map.js","../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js","../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js-pure/internals/has.js","../internals/shared-key":"../node_modules/core-js-pure/internals/shared-key.js","../internals/hidden-keys":"../node_modules/core-js-pure/internals/hidden-keys.js"}],"../node_modules/core-js-pure/internals/to-object.js":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":"../node_modules/core-js-pure/internals/require-object-coercible.js"}],"../node_modules/core-js-pure/internals/correct-prototype-getter.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":"../node_modules/core-js-pure/internals/fails.js"}],"../node_modules/core-js-pure/internals/object-get-prototype-of.js":[function(require,module,exports) {
var has = require('../internals/has');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

},{"../internals/has":"../node_modules/core-js-pure/internals/has.js","../internals/to-object":"../node_modules/core-js-pure/internals/to-object.js","../internals/shared-key":"../node_modules/core-js-pure/internals/shared-key.js","../internals/correct-prototype-getter":"../node_modules/core-js-pure/internals/correct-prototype-getter.js"}],"../node_modules/core-js-pure/internals/native-symbol.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

},{"../internals/fails":"../node_modules/core-js-pure/internals/fails.js"}],"../node_modules/core-js-pure/internals/use-symbol-as-uid.js":[function(require,module,exports) {
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":"../node_modules/core-js-pure/internals/native-symbol.js"}],"../node_modules/core-js-pure/internals/well-known-symbol.js":[function(require,module,exports) {

var global = require('../internals/global');
var shared = require('../internals/shared');
var has = require('../internals/has');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/shared":"../node_modules/core-js-pure/internals/shared.js","../internals/has":"../node_modules/core-js-pure/internals/has.js","../internals/uid":"../node_modules/core-js-pure/internals/uid.js","../internals/native-symbol":"../node_modules/core-js-pure/internals/native-symbol.js","../internals/use-symbol-as-uid":"../node_modules/core-js-pure/internals/use-symbol-as-uid.js"}],"../node_modules/core-js-pure/internals/iterators-core.js":[function(require,module,exports) {
'use strict';
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/object-get-prototype-of":"../node_modules/core-js-pure/internals/object-get-prototype-of.js","../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js-pure/internals/has.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/is-pure":"../node_modules/core-js-pure/internals/is-pure.js"}],"../node_modules/core-js-pure/internals/html.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"../node_modules/core-js-pure/internals/get-built-in.js"}],"../node_modules/core-js-pure/internals/object-create.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var defineProperties = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

},{"../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js","../internals/object-define-properties":"../node_modules/core-js-pure/internals/object-define-properties.js","../internals/enum-bug-keys":"../node_modules/core-js-pure/internals/enum-bug-keys.js","../internals/hidden-keys":"../node_modules/core-js-pure/internals/hidden-keys.js","../internals/html":"../node_modules/core-js-pure/internals/html.js","../internals/document-create-element":"../node_modules/core-js-pure/internals/document-create-element.js","../internals/shared-key":"../node_modules/core-js-pure/internals/shared-key.js"}],"../node_modules/core-js-pure/internals/to-string-tag-support.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js"}],"../node_modules/core-js-pure/internals/classof.js":[function(require,module,exports) {
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

},{"../internals/to-string-tag-support":"../node_modules/core-js-pure/internals/to-string-tag-support.js","../internals/classof-raw":"../node_modules/core-js-pure/internals/classof-raw.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js"}],"../node_modules/core-js-pure/internals/object-to-string.js":[function(require,module,exports) {
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/to-string-tag-support":"../node_modules/core-js-pure/internals/to-string-tag-support.js","../internals/classof":"../node_modules/core-js-pure/internals/classof.js"}],"../node_modules/core-js-pure/internals/set-to-string-tag.js":[function(require,module,exports) {
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var defineProperty = require('../internals/object-define-property').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var toString = require('../internals/object-to-string');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!has(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty(target, 'toString', toString);
    }
  }
};

},{"../internals/to-string-tag-support":"../node_modules/core-js-pure/internals/to-string-tag-support.js","../internals/object-define-property":"../node_modules/core-js-pure/internals/object-define-property.js","../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js-pure/internals/has.js","../internals/object-to-string":"../node_modules/core-js-pure/internals/object-to-string.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js"}],"../node_modules/core-js-pure/internals/create-iterator-constructor.js":[function(require,module,exports) {
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/iterators-core":"../node_modules/core-js-pure/internals/iterators-core.js","../internals/object-create":"../node_modules/core-js-pure/internals/object-create.js","../internals/create-property-descriptor":"../node_modules/core-js-pure/internals/create-property-descriptor.js","../internals/set-to-string-tag":"../node_modules/core-js-pure/internals/set-to-string-tag.js","../internals/iterators":"../node_modules/core-js-pure/internals/iterators.js"}],"../node_modules/core-js-pure/internals/a-possible-prototype.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

},{"../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js"}],"../node_modules/core-js-pure/internals/object-set-prototype-of.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js","../internals/a-possible-prototype":"../node_modules/core-js-pure/internals/a-possible-prototype.js"}],"../node_modules/core-js-pure/internals/redefine.js":[function(require,module,exports) {
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
};

},{"../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js"}],"../node_modules/core-js-pure/internals/define-iterator.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/create-iterator-constructor":"../node_modules/core-js-pure/internals/create-iterator-constructor.js","../internals/object-get-prototype-of":"../node_modules/core-js-pure/internals/object-get-prototype-of.js","../internals/object-set-prototype-of":"../node_modules/core-js-pure/internals/object-set-prototype-of.js","../internals/set-to-string-tag":"../node_modules/core-js-pure/internals/set-to-string-tag.js","../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js","../internals/redefine":"../node_modules/core-js-pure/internals/redefine.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/is-pure":"../node_modules/core-js-pure/internals/is-pure.js","../internals/iterators":"../node_modules/core-js-pure/internals/iterators.js","../internals/iterators-core":"../node_modules/core-js-pure/internals/iterators-core.js"}],"../node_modules/core-js-pure/modules/es.array.iterator.js":[function(require,module,exports) {
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/add-to-unscopables":"../node_modules/core-js-pure/internals/add-to-unscopables.js","../internals/iterators":"../node_modules/core-js-pure/internals/iterators.js","../internals/internal-state":"../node_modules/core-js-pure/internals/internal-state.js","../internals/define-iterator":"../node_modules/core-js-pure/internals/define-iterator.js"}],"../node_modules/core-js-pure/internals/dom-iterables.js":[function(require,module,exports) {
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],"../node_modules/core-js-pure/modules/web.dom-collections.iterator.js":[function(require,module,exports) {

require('./es.array.iterator');
var DOMIterables = require('../internals/dom-iterables');
var global = require('../internals/global');
var classof = require('../internals/classof');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators[COLLECTION_NAME] = Iterators.Array;
}

},{"./es.array.iterator":"../node_modules/core-js-pure/modules/es.array.iterator.js","../internals/dom-iterables":"../node_modules/core-js-pure/internals/dom-iterables.js","../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/classof":"../node_modules/core-js-pure/internals/classof.js","../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js","../internals/iterators":"../node_modules/core-js-pure/internals/iterators.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js"}],"../node_modules/core-js-pure/internals/is-array.js":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":"../node_modules/core-js-pure/internals/classof-raw.js"}],"../node_modules/core-js-pure/internals/array-species-create.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

},{"../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js","../internals/is-array":"../node_modules/core-js-pure/internals/is-array.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js"}],"../node_modules/core-js-pure/internals/array-iteration.js":[function(require,module,exports) {
var bind = require('../internals/function-bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var arraySpeciesCreate = require('../internals/array-species-create');

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

},{"../internals/function-bind-context":"../node_modules/core-js-pure/internals/function-bind-context.js","../internals/indexed-object":"../node_modules/core-js-pure/internals/indexed-object.js","../internals/to-object":"../node_modules/core-js-pure/internals/to-object.js","../internals/to-length":"../node_modules/core-js-pure/internals/to-length.js","../internals/array-species-create":"../node_modules/core-js-pure/internals/array-species-create.js"}],"../node_modules/core-js-pure/internals/array-method-is-strict.js":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":"../node_modules/core-js-pure/internals/fails.js"}],"../node_modules/core-js-pure/internals/array-method-uses-to-length.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var has = require('../internals/has');

var defineProperty = Object.defineProperty;

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    var addTrap = function (key) {
      if (ACCESSORS) defineProperty(O, key, { enumerable: true, get: thrower });
      else O[key] = 1;
    };

    addTrap(1);
    addTrap(2147483646);
    addTrap(4294967294);
    method.call(O, argument0, argument1);
  });
};

},{"../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/fails":"../node_modules/core-js-pure/internals/fails.js","../internals/has":"../node_modules/core-js-pure/internals/has.js"}],"../node_modules/core-js-pure/internals/array-for-each.js":[function(require,module,exports) {
'use strict';
var $forEach = require('../internals/array-iteration').forEach;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

},{"../internals/array-iteration":"../node_modules/core-js-pure/internals/array-iteration.js","../internals/array-method-is-strict":"../node_modules/core-js-pure/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"../node_modules/core-js-pure/internals/array-method-uses-to-length.js"}],"../node_modules/core-js-pure/modules/es.array.for-each.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/array-for-each":"../node_modules/core-js-pure/internals/array-for-each.js"}],"../node_modules/core-js-pure/internals/entry-virtual.js":[function(require,module,exports) {
var path = require('../internals/path');

module.exports = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

},{"../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/es/array/virtual/for-each.js":[function(require,module,exports) {
require('../../../modules/es.array.for-each');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').forEach;

},{"../../../modules/es.array.for-each":"../node_modules/core-js-pure/modules/es.array.for-each.js","../../../internals/entry-virtual":"../node_modules/core-js-pure/internals/entry-virtual.js"}],"../node_modules/core-js-pure/stable/array/virtual/for-each.js":[function(require,module,exports) {
var parent = require('../../../es/array/virtual/for-each');

module.exports = parent;

},{"../../../es/array/virtual/for-each":"../node_modules/core-js-pure/es/array/virtual/for-each.js"}],"../node_modules/core-js-pure/stable/instance/for-each.js":[function(require,module,exports) {
require('../../modules/web.dom-collections.iterator');
var forEach = require('../array/virtual/for-each');
var classof = require('../../internals/classof');
var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.forEach)
    // eslint-disable-next-line no-prototype-builtins
    || DOMIterables.hasOwnProperty(classof(it)) ? forEach : own;
};

},{"../../modules/web.dom-collections.iterator":"../node_modules/core-js-pure/modules/web.dom-collections.iterator.js","../array/virtual/for-each":"../node_modules/core-js-pure/stable/array/virtual/for-each.js","../../internals/classof":"../node_modules/core-js-pure/internals/classof.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/instance/for-each");
},{"core-js-pure/stable/instance/for-each":"../node_modules/core-js-pure/stable/instance/for-each.js"}],"../node_modules/core-js-pure/modules/es.object.get-own-property-descriptor.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var DESCRIPTORS = require('../internals/descriptors');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/fails":"../node_modules/core-js-pure/internals/fails.js","../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js-pure/internals/object-get-own-property-descriptor.js","../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js"}],"../node_modules/core-js-pure/es/object/get-own-property-descriptor.js":[function(require,module,exports) {
require('../../modules/es.object.get-own-property-descriptor');
var path = require('../../internals/path');

var Object = path.Object;

var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
  return Object.getOwnPropertyDescriptor(it, key);
};

if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;

},{"../../modules/es.object.get-own-property-descriptor":"../node_modules/core-js-pure/modules/es.object.get-own-property-descriptor.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/stable/object/get-own-property-descriptor.js":[function(require,module,exports) {
var parent = require('../../es/object/get-own-property-descriptor');

module.exports = parent;

},{"../../es/object/get-own-property-descriptor":"../node_modules/core-js-pure/es/object/get-own-property-descriptor.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/object/get-own-property-descriptor");
},{"core-js-pure/stable/object/get-own-property-descriptor":"../node_modules/core-js-pure/stable/object/get-own-property-descriptor.js"}],"../node_modules/core-js-pure/internals/engine-user-agent.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":"../node_modules/core-js-pure/internals/get-built-in.js"}],"../node_modules/core-js-pure/internals/engine-v8-version.js":[function(require,module,exports) {


var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/engine-user-agent":"../node_modules/core-js-pure/internals/engine-user-agent.js"}],"../node_modules/core-js-pure/internals/array-method-has-species-support.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/fails":"../node_modules/core-js-pure/internals/fails.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/engine-v8-version":"../node_modules/core-js-pure/internals/engine-v8-version.js"}],"../node_modules/core-js-pure/modules/es.array.filter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $filter = require('../internals/array-iteration').filter;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/array-iteration":"../node_modules/core-js-pure/internals/array-iteration.js","../internals/array-method-has-species-support":"../node_modules/core-js-pure/internals/array-method-has-species-support.js","../internals/array-method-uses-to-length":"../node_modules/core-js-pure/internals/array-method-uses-to-length.js"}],"../node_modules/core-js-pure/es/array/virtual/filter.js":[function(require,module,exports) {
require('../../../modules/es.array.filter');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').filter;

},{"../../../modules/es.array.filter":"../node_modules/core-js-pure/modules/es.array.filter.js","../../../internals/entry-virtual":"../node_modules/core-js-pure/internals/entry-virtual.js"}],"../node_modules/core-js-pure/es/instance/filter.js":[function(require,module,exports) {
var filter = require('../array/virtual/filter');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.filter;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.filter) ? filter : own;
};

},{"../array/virtual/filter":"../node_modules/core-js-pure/es/array/virtual/filter.js"}],"../node_modules/core-js-pure/stable/instance/filter.js":[function(require,module,exports) {
var parent = require('../../es/instance/filter');

module.exports = parent;

},{"../../es/instance/filter":"../node_modules/core-js-pure/es/instance/filter.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/instance/filter");
},{"core-js-pure/stable/instance/filter":"../node_modules/core-js-pure/stable/instance/filter.js"}],"../node_modules/core-js-pure/internals/object-get-own-property-names-external.js":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyNames = require('../internals/object-get-own-property-names').f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};

},{"../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/object-get-own-property-names":"../node_modules/core-js-pure/internals/object-get-own-property-names.js"}],"../node_modules/core-js-pure/internals/well-known-symbol-wrapped.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

exports.f = wellKnownSymbol;

},{"../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js"}],"../node_modules/core-js-pure/internals/define-well-known-symbol.js":[function(require,module,exports) {
var path = require('../internals/path');
var has = require('../internals/has');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineProperty = require('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

},{"../internals/path":"../node_modules/core-js-pure/internals/path.js","../internals/has":"../node_modules/core-js-pure/internals/has.js","../internals/well-known-symbol-wrapped":"../node_modules/core-js-pure/internals/well-known-symbol-wrapped.js","../internals/object-define-property":"../node_modules/core-js-pure/internals/object-define-property.js"}],"../node_modules/core-js-pure/modules/es.symbol.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');
var fails = require('../internals/fails');
var has = require('../internals/has');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var nativeObjectCreate = require('../internals/object-create');
var objectKeys = require('../internals/object-keys');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var shared = require('../internals/shared');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');
var uid = require('../internals/uid');
var wellKnownSymbol = require('../internals/well-known-symbol');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');
var $forEach = require('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/get-built-in":"../node_modules/core-js-pure/internals/get-built-in.js","../internals/is-pure":"../node_modules/core-js-pure/internals/is-pure.js","../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/native-symbol":"../node_modules/core-js-pure/internals/native-symbol.js","../internals/use-symbol-as-uid":"../node_modules/core-js-pure/internals/use-symbol-as-uid.js","../internals/fails":"../node_modules/core-js-pure/internals/fails.js","../internals/has":"../node_modules/core-js-pure/internals/has.js","../internals/is-array":"../node_modules/core-js-pure/internals/is-array.js","../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js","../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js","../internals/to-object":"../node_modules/core-js-pure/internals/to-object.js","../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/to-primitive":"../node_modules/core-js-pure/internals/to-primitive.js","../internals/create-property-descriptor":"../node_modules/core-js-pure/internals/create-property-descriptor.js","../internals/object-create":"../node_modules/core-js-pure/internals/object-create.js","../internals/object-keys":"../node_modules/core-js-pure/internals/object-keys.js","../internals/object-get-own-property-names":"../node_modules/core-js-pure/internals/object-get-own-property-names.js","../internals/object-get-own-property-names-external":"../node_modules/core-js-pure/internals/object-get-own-property-names-external.js","../internals/object-get-own-property-symbols":"../node_modules/core-js-pure/internals/object-get-own-property-symbols.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js-pure/internals/object-get-own-property-descriptor.js","../internals/object-define-property":"../node_modules/core-js-pure/internals/object-define-property.js","../internals/object-property-is-enumerable":"../node_modules/core-js-pure/internals/object-property-is-enumerable.js","../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js","../internals/redefine":"../node_modules/core-js-pure/internals/redefine.js","../internals/shared":"../node_modules/core-js-pure/internals/shared.js","../internals/shared-key":"../node_modules/core-js-pure/internals/shared-key.js","../internals/hidden-keys":"../node_modules/core-js-pure/internals/hidden-keys.js","../internals/uid":"../node_modules/core-js-pure/internals/uid.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/well-known-symbol-wrapped":"../node_modules/core-js-pure/internals/well-known-symbol-wrapped.js","../internals/define-well-known-symbol":"../node_modules/core-js-pure/internals/define-well-known-symbol.js","../internals/set-to-string-tag":"../node_modules/core-js-pure/internals/set-to-string-tag.js","../internals/internal-state":"../node_modules/core-js-pure/internals/internal-state.js","../internals/array-iteration":"../node_modules/core-js-pure/internals/array-iteration.js"}],"../node_modules/core-js-pure/es/object/get-own-property-symbols.js":[function(require,module,exports) {
require('../../modules/es.symbol');
var path = require('../../internals/path');

module.exports = path.Object.getOwnPropertySymbols;

},{"../../modules/es.symbol":"../node_modules/core-js-pure/modules/es.symbol.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/stable/object/get-own-property-symbols.js":[function(require,module,exports) {
var parent = require('../../es/object/get-own-property-symbols');

module.exports = parent;

},{"../../es/object/get-own-property-symbols":"../node_modules/core-js-pure/es/object/get-own-property-symbols.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/object/get-own-property-symbols");
},{"core-js-pure/stable/object/get-own-property-symbols":"../node_modules/core-js-pure/stable/object/get-own-property-symbols.js"}],"../node_modules/core-js-pure/modules/es.object.keys.js":[function(require,module,exports) {
var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var nativeKeys = require('../internals/object-keys');
var fails = require('../internals/fails');

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/to-object":"../node_modules/core-js-pure/internals/to-object.js","../internals/object-keys":"../node_modules/core-js-pure/internals/object-keys.js","../internals/fails":"../node_modules/core-js-pure/internals/fails.js"}],"../node_modules/core-js-pure/es/object/keys.js":[function(require,module,exports) {
require('../../modules/es.object.keys');
var path = require('../../internals/path');

module.exports = path.Object.keys;

},{"../../modules/es.object.keys":"../node_modules/core-js-pure/modules/es.object.keys.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/stable/object/keys.js":[function(require,module,exports) {
var parent = require('../../es/object/keys');

module.exports = parent;

},{"../../es/object/keys":"../node_modules/core-js-pure/es/object/keys.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/object/keys");
},{"core-js-pure/stable/object/keys":"../node_modules/core-js-pure/stable/object/keys.js"}],"../node_modules/core-js-pure/modules/es.array.slice.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');
var toIndexedObject = require('../internals/to-indexed-object');
var createProperty = require('../internals/create-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js","../internals/is-array":"../node_modules/core-js-pure/internals/is-array.js","../internals/to-absolute-index":"../node_modules/core-js-pure/internals/to-absolute-index.js","../internals/to-length":"../node_modules/core-js-pure/internals/to-length.js","../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/create-property":"../node_modules/core-js-pure/internals/create-property.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/array-method-has-species-support":"../node_modules/core-js-pure/internals/array-method-has-species-support.js","../internals/array-method-uses-to-length":"../node_modules/core-js-pure/internals/array-method-uses-to-length.js"}],"../node_modules/core-js-pure/es/array/virtual/slice.js":[function(require,module,exports) {
require('../../../modules/es.array.slice');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').slice;

},{"../../../modules/es.array.slice":"../node_modules/core-js-pure/modules/es.array.slice.js","../../../internals/entry-virtual":"../node_modules/core-js-pure/internals/entry-virtual.js"}],"../node_modules/core-js-pure/es/instance/slice.js":[function(require,module,exports) {
var slice = require('../array/virtual/slice');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.slice;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.slice) ? slice : own;
};

},{"../array/virtual/slice":"../node_modules/core-js-pure/es/array/virtual/slice.js"}],"../node_modules/core-js-pure/stable/instance/slice.js":[function(require,module,exports) {
var parent = require('../../es/instance/slice');

module.exports = parent;

},{"../../es/instance/slice":"../node_modules/core-js-pure/es/instance/slice.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/slice.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/instance/slice");
},{"core-js-pure/stable/instance/slice":"../node_modules/core-js-pure/stable/instance/slice.js"}],"../node_modules/core-js-pure/internals/object-to-array.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var objectKeys = require('../internals/object-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var propertyIsEnumerable = require('../internals/object-property-is-enumerable').f;

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod(false)
};

},{"../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/object-keys":"../node_modules/core-js-pure/internals/object-keys.js","../internals/to-indexed-object":"../node_modules/core-js-pure/internals/to-indexed-object.js","../internals/object-property-is-enumerable":"../node_modules/core-js-pure/internals/object-property-is-enumerable.js"}],"../node_modules/core-js-pure/modules/es.object.entries.js":[function(require,module,exports) {
var $ = require('../internals/export');
var $entries = require('../internals/object-to-array').entries;

// `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/object-to-array":"../node_modules/core-js-pure/internals/object-to-array.js"}],"../node_modules/core-js-pure/es/object/entries.js":[function(require,module,exports) {
require('../../modules/es.object.entries');
var path = require('../../internals/path');

module.exports = path.Object.entries;

},{"../../modules/es.object.entries":"../node_modules/core-js-pure/modules/es.object.entries.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/stable/object/entries.js":[function(require,module,exports) {
var parent = require('../../es/object/entries');

module.exports = parent;

},{"../../es/object/entries":"../node_modules/core-js-pure/es/object/entries.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/object/entries.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/object/entries");
},{"core-js-pure/stable/object/entries":"../node_modules/core-js-pure/stable/object/entries.js"}],"../node_modules/core-js-pure/modules/es.array.is-array.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/is-array":"../node_modules/core-js-pure/internals/is-array.js"}],"../node_modules/core-js-pure/es/array/is-array.js":[function(require,module,exports) {
require('../../modules/es.array.is-array');
var path = require('../../internals/path');

module.exports = path.Array.isArray;

},{"../../modules/es.array.is-array":"../node_modules/core-js-pure/modules/es.array.is-array.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/features/array/is-array.js":[function(require,module,exports) {
var parent = require('../../es/array/is-array');

module.exports = parent;

},{"../../es/array/is-array":"../node_modules/core-js-pure/es/array/is-array.js"}],"../node_modules/@babel/runtime-corejs3/core-js/array/is-array.js":[function(require,module,exports) {
module.exports = require("core-js-pure/features/array/is-array");
},{"core-js-pure/features/array/is-array":"../node_modules/core-js-pure/features/array/is-array.js"}],"../node_modules/@babel/runtime-corejs3/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
var _Array$isArray = require("../core-js/array/is-array");

function _arrayWithoutHoles(arr) {
  if (_Array$isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{"../core-js/array/is-array":"../node_modules/@babel/runtime-corejs3/core-js/array/is-array.js"}],"../node_modules/core-js-pure/internals/string-multibyte.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/to-integer":"../node_modules/core-js-pure/internals/to-integer.js","../internals/require-object-coercible":"../node_modules/core-js-pure/internals/require-object-coercible.js"}],"../node_modules/core-js-pure/modules/es.string.iterator.js":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

},{"../internals/string-multibyte":"../node_modules/core-js-pure/internals/string-multibyte.js","../internals/internal-state":"../node_modules/core-js-pure/internals/internal-state.js","../internals/define-iterator":"../node_modules/core-js-pure/internals/define-iterator.js"}],"../node_modules/core-js-pure/internals/call-with-safe-iteration-closing.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

},{"../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js"}],"../node_modules/core-js-pure/internals/is-array-iterator-method.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/iterators":"../node_modules/core-js-pure/internals/iterators.js"}],"../node_modules/core-js-pure/internals/get-iterator-method.js":[function(require,module,exports) {
var classof = require('../internals/classof');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"../internals/classof":"../node_modules/core-js-pure/internals/classof.js","../internals/iterators":"../node_modules/core-js-pure/internals/iterators.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js"}],"../node_modules/core-js-pure/internals/array-from.js":[function(require,module,exports) {
'use strict';
var bind = require('../internals/function-bind-context');
var toObject = require('../internals/to-object');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var getIteratorMethod = require('../internals/get-iterator-method');

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

},{"../internals/function-bind-context":"../node_modules/core-js-pure/internals/function-bind-context.js","../internals/to-object":"../node_modules/core-js-pure/internals/to-object.js","../internals/call-with-safe-iteration-closing":"../node_modules/core-js-pure/internals/call-with-safe-iteration-closing.js","../internals/is-array-iterator-method":"../node_modules/core-js-pure/internals/is-array-iterator-method.js","../internals/to-length":"../node_modules/core-js-pure/internals/to-length.js","../internals/create-property":"../node_modules/core-js-pure/internals/create-property.js","../internals/get-iterator-method":"../node_modules/core-js-pure/internals/get-iterator-method.js"}],"../node_modules/core-js-pure/internals/check-correctness-of-iteration.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js"}],"../node_modules/core-js-pure/modules/es.array.from.js":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/array-from');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/array-from":"../node_modules/core-js-pure/internals/array-from.js","../internals/check-correctness-of-iteration":"../node_modules/core-js-pure/internals/check-correctness-of-iteration.js"}],"../node_modules/core-js-pure/es/array/from.js":[function(require,module,exports) {
require('../../modules/es.string.iterator');
require('../../modules/es.array.from');
var path = require('../../internals/path');

module.exports = path.Array.from;

},{"../../modules/es.string.iterator":"../node_modules/core-js-pure/modules/es.string.iterator.js","../../modules/es.array.from":"../node_modules/core-js-pure/modules/es.array.from.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/features/array/from.js":[function(require,module,exports) {
var parent = require('../../es/array/from');

module.exports = parent;

},{"../../es/array/from":"../node_modules/core-js-pure/es/array/from.js"}],"../node_modules/@babel/runtime-corejs3/core-js/array/from.js":[function(require,module,exports) {
module.exports = require("core-js-pure/features/array/from");
},{"core-js-pure/features/array/from":"../node_modules/core-js-pure/features/array/from.js"}],"../node_modules/core-js-pure/internals/is-iterable.js":[function(require,module,exports) {
var classof = require('../internals/classof');
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"../internals/classof":"../node_modules/core-js-pure/internals/classof.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/iterators":"../node_modules/core-js-pure/internals/iterators.js"}],"../node_modules/core-js-pure/features/is-iterable.js":[function(require,module,exports) {
require('../modules/web.dom-collections.iterator');
require('../modules/es.string.iterator');
var isIterable = require('../internals/is-iterable');

module.exports = isIterable;

},{"../modules/web.dom-collections.iterator":"../node_modules/core-js-pure/modules/web.dom-collections.iterator.js","../modules/es.string.iterator":"../node_modules/core-js-pure/modules/es.string.iterator.js","../internals/is-iterable":"../node_modules/core-js-pure/internals/is-iterable.js"}],"../node_modules/@babel/runtime-corejs3/core-js/is-iterable.js":[function(require,module,exports) {
module.exports = require("core-js-pure/features/is-iterable");
},{"core-js-pure/features/is-iterable":"../node_modules/core-js-pure/features/is-iterable.js"}],"../node_modules/@babel/runtime-corejs3/helpers/iterableToArray.js":[function(require,module,exports) {
var _Array$from = require("../core-js/array/from");

var _isIterable = require("../core-js/is-iterable");

function _iterableToArray(iter) {
  if (_isIterable(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return _Array$from(iter);
}

module.exports = _iterableToArray;
},{"../core-js/array/from":"../node_modules/@babel/runtime-corejs3/core-js/array/from.js","../core-js/is-iterable":"../node_modules/@babel/runtime-corejs3/core-js/is-iterable.js"}],"../node_modules/@babel/runtime-corejs3/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],"../node_modules/@babel/runtime-corejs3/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":"../node_modules/@babel/runtime-corejs3/helpers/arrayWithoutHoles.js","./iterableToArray":"../node_modules/@babel/runtime-corejs3/helpers/iterableToArray.js","./nonIterableSpread":"../node_modules/@babel/runtime-corejs3/helpers/nonIterableSpread.js"}],"../node_modules/core-js-pure/features/object/define-property.js":[function(require,module,exports) {
var parent = require('../../es/object/define-property');

module.exports = parent;

},{"../../es/object/define-property":"../node_modules/core-js-pure/es/object/define-property.js"}],"../node_modules/@babel/runtime-corejs3/core-js/object/define-property.js":[function(require,module,exports) {
module.exports = require("core-js-pure/features/object/define-property");
},{"core-js-pure/features/object/define-property":"../node_modules/core-js-pure/features/object/define-property.js"}],"../node_modules/@babel/runtime-corejs3/helpers/defineProperty.js":[function(require,module,exports) {
var _Object$defineProperty = require("../core-js/object/define-property");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{"../core-js/object/define-property":"../node_modules/@babel/runtime-corejs3/core-js/object/define-property.js"}],"../node_modules/@babel/runtime-corejs3/helpers/arrayWithHoles.js":[function(require,module,exports) {
var _Array$isArray = require("../core-js/array/is-array");

function _arrayWithHoles(arr) {
  if (_Array$isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
},{"../core-js/array/is-array":"../node_modules/@babel/runtime-corejs3/core-js/array/is-array.js"}],"../node_modules/core-js-pure/internals/get-iterator.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var getIteratorMethod = require('../internals/get-iterator-method');

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};

},{"../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js","../internals/get-iterator-method":"../node_modules/core-js-pure/internals/get-iterator-method.js"}],"../node_modules/core-js-pure/features/get-iterator.js":[function(require,module,exports) {
require('../modules/web.dom-collections.iterator');
require('../modules/es.string.iterator');
var getIterator = require('../internals/get-iterator');

module.exports = getIterator;

},{"../modules/web.dom-collections.iterator":"../node_modules/core-js-pure/modules/web.dom-collections.iterator.js","../modules/es.string.iterator":"../node_modules/core-js-pure/modules/es.string.iterator.js","../internals/get-iterator":"../node_modules/core-js-pure/internals/get-iterator.js"}],"../node_modules/@babel/runtime-corejs3/core-js/get-iterator.js":[function(require,module,exports) {
module.exports = require("core-js-pure/features/get-iterator");
},{"core-js-pure/features/get-iterator":"../node_modules/core-js-pure/features/get-iterator.js"}],"../node_modules/@babel/runtime-corejs3/helpers/iterableToArrayLimit.js":[function(require,module,exports) {
var _getIterator = require("../core-js/get-iterator");

var _isIterable = require("../core-js/is-iterable");

function _iterableToArrayLimit(arr, i) {
  if (!(_isIterable(Object(arr)) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
},{"../core-js/get-iterator":"../node_modules/@babel/runtime-corejs3/core-js/get-iterator.js","../core-js/is-iterable":"../node_modules/@babel/runtime-corejs3/core-js/is-iterable.js"}],"../node_modules/@babel/runtime-corejs3/helpers/nonIterableRest.js":[function(require,module,exports) {
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;
},{}],"../node_modules/@babel/runtime-corejs3/helpers/slicedToArray.js":[function(require,module,exports) {
var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimit = require("./iterableToArrayLimit");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":"../node_modules/@babel/runtime-corejs3/helpers/arrayWithHoles.js","./iterableToArrayLimit":"../node_modules/@babel/runtime-corejs3/helpers/iterableToArrayLimit.js","./nonIterableRest":"../node_modules/@babel/runtime-corejs3/helpers/nonIterableRest.js"}],"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"../node_modules/@babel/runtime-corejs3/regenerator/index.js":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"../node_modules/regenerator-runtime/runtime.js"}],"../node_modules/core-js-pure/modules/es.array.map.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $map = require('../internals/array-iteration').map;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/array-iteration":"../node_modules/core-js-pure/internals/array-iteration.js","../internals/array-method-has-species-support":"../node_modules/core-js-pure/internals/array-method-has-species-support.js","../internals/array-method-uses-to-length":"../node_modules/core-js-pure/internals/array-method-uses-to-length.js"}],"../node_modules/core-js-pure/es/array/virtual/map.js":[function(require,module,exports) {
require('../../../modules/es.array.map');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').map;

},{"../../../modules/es.array.map":"../node_modules/core-js-pure/modules/es.array.map.js","../../../internals/entry-virtual":"../node_modules/core-js-pure/internals/entry-virtual.js"}],"../node_modules/core-js-pure/es/instance/map.js":[function(require,module,exports) {
var map = require('../array/virtual/map');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.map;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.map) ? map : own;
};

},{"../array/virtual/map":"../node_modules/core-js-pure/es/array/virtual/map.js"}],"../node_modules/core-js-pure/stable/instance/map.js":[function(require,module,exports) {
var parent = require('../../es/instance/map');

module.exports = parent;

},{"../../es/instance/map":"../node_modules/core-js-pure/es/instance/map.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/instance/map");
},{"core-js-pure/stable/instance/map":"../node_modules/core-js-pure/stable/instance/map.js"}],"../node_modules/core-js-pure/modules/es.array.concat.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var arraySpeciesCreate = require('../internals/array-species-create');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/fails":"../node_modules/core-js-pure/internals/fails.js","../internals/is-array":"../node_modules/core-js-pure/internals/is-array.js","../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js","../internals/to-object":"../node_modules/core-js-pure/internals/to-object.js","../internals/to-length":"../node_modules/core-js-pure/internals/to-length.js","../internals/create-property":"../node_modules/core-js-pure/internals/create-property.js","../internals/array-species-create":"../node_modules/core-js-pure/internals/array-species-create.js","../internals/array-method-has-species-support":"../node_modules/core-js-pure/internals/array-method-has-species-support.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/engine-v8-version":"../node_modules/core-js-pure/internals/engine-v8-version.js"}],"../node_modules/core-js-pure/es/array/virtual/concat.js":[function(require,module,exports) {
require('../../../modules/es.array.concat');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').concat;

},{"../../../modules/es.array.concat":"../node_modules/core-js-pure/modules/es.array.concat.js","../../../internals/entry-virtual":"../node_modules/core-js-pure/internals/entry-virtual.js"}],"../node_modules/core-js-pure/es/instance/concat.js":[function(require,module,exports) {
var concat = require('../array/virtual/concat');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.concat;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.concat) ? concat : own;
};

},{"../array/virtual/concat":"../node_modules/core-js-pure/es/array/virtual/concat.js"}],"../node_modules/core-js-pure/stable/instance/concat.js":[function(require,module,exports) {
var parent = require('../../es/instance/concat');

module.exports = parent;

},{"../../es/instance/concat":"../node_modules/core-js-pure/es/instance/concat.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/instance/concat");
},{"core-js-pure/stable/instance/concat":"../node_modules/core-js-pure/stable/instance/concat.js"}],"../node_modules/core-js-pure/modules/es.object.to-string.js":[function(require,module,exports) {
// empty

},{}],"../node_modules/core-js-pure/internals/native-promise-constructor.js":[function(require,module,exports) {

var global = require('../internals/global');

module.exports = global.Promise;

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js"}],"../node_modules/core-js-pure/internals/redefine-all.js":[function(require,module,exports) {
var redefine = require('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else redefine(target, key, src[key], options);
  } return target;
};

},{"../internals/redefine":"../node_modules/core-js-pure/internals/redefine.js"}],"../node_modules/core-js-pure/internals/set-species.js":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var definePropertyModule = require('../internals/object-define-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

},{"../internals/get-built-in":"../node_modules/core-js-pure/internals/get-built-in.js","../internals/object-define-property":"../node_modules/core-js-pure/internals/object-define-property.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js"}],"../node_modules/core-js-pure/internals/an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

},{}],"../node_modules/core-js-pure/internals/iterate.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var bind = require('../internals/function-bind-context');
var getIteratorMethod = require('../internals/get-iterator-method');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};

},{"../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js","../internals/is-array-iterator-method":"../node_modules/core-js-pure/internals/is-array-iterator-method.js","../internals/to-length":"../node_modules/core-js-pure/internals/to-length.js","../internals/function-bind-context":"../node_modules/core-js-pure/internals/function-bind-context.js","../internals/get-iterator-method":"../node_modules/core-js-pure/internals/get-iterator-method.js","../internals/call-with-safe-iteration-closing":"../node_modules/core-js-pure/internals/call-with-safe-iteration-closing.js"}],"../node_modules/core-js-pure/internals/species-constructor.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

},{"../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js","../internals/a-function":"../node_modules/core-js-pure/internals/a-function.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js"}],"../node_modules/core-js-pure/internals/engine-is-ios.js":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":"../node_modules/core-js-pure/internals/engine-user-agent.js"}],"../node_modules/core-js-pure/internals/task.js":[function(require,module,exports) {


var global = require('../internals/global');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');
var bind = require('../internals/function-bind-context');
var html = require('../internals/html');
var createElement = require('../internals/document-create-element');
var IS_IOS = require('../internals/engine-is-ios');

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/fails":"../node_modules/core-js-pure/internals/fails.js","../internals/classof-raw":"../node_modules/core-js-pure/internals/classof-raw.js","../internals/function-bind-context":"../node_modules/core-js-pure/internals/function-bind-context.js","../internals/html":"../node_modules/core-js-pure/internals/html.js","../internals/document-create-element":"../node_modules/core-js-pure/internals/document-create-element.js","../internals/engine-is-ios":"../node_modules/core-js-pure/internals/engine-is-ios.js"}],"../node_modules/core-js-pure/internals/microtask.js":[function(require,module,exports) {


var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var classof = require('../internals/classof-raw');
var macrotask = require('../internals/task').set;
var IS_IOS = require('../internals/engine-is-ios');

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js-pure/internals/object-get-own-property-descriptor.js","../internals/classof-raw":"../node_modules/core-js-pure/internals/classof-raw.js","../internals/task":"../node_modules/core-js-pure/internals/task.js","../internals/engine-is-ios":"../node_modules/core-js-pure/internals/engine-is-ios.js"}],"../node_modules/core-js-pure/internals/new-promise-capability.js":[function(require,module,exports) {
'use strict';
var aFunction = require('../internals/a-function');

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"../internals/a-function":"../node_modules/core-js-pure/internals/a-function.js"}],"../node_modules/core-js-pure/internals/promise-resolve.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var newPromiseCapability = require('../internals/new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"../internals/an-object":"../node_modules/core-js-pure/internals/an-object.js","../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js","../internals/new-promise-capability":"../node_modules/core-js-pure/internals/new-promise-capability.js"}],"../node_modules/core-js-pure/internals/host-report-errors.js":[function(require,module,exports) {

var global = require('../internals/global');

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

},{"../internals/global":"../node_modules/core-js-pure/internals/global.js"}],"../node_modules/core-js-pure/internals/perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

},{}],"../node_modules/core-js-pure/modules/es.promise.js":[function(require,module,exports) {


'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var NativePromise = require('../internals/native-promise-constructor');
var redefine = require('../internals/redefine');
var redefineAll = require('../internals/redefine-all');
var setToStringTag = require('../internals/set-to-string-tag');
var setSpecies = require('../internals/set-species');
var isObject = require('../internals/is-object');
var aFunction = require('../internals/a-function');
var anInstance = require('../internals/an-instance');
var classof = require('../internals/classof-raw');
var inspectSource = require('../internals/inspect-source');
var iterate = require('../internals/iterate');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var speciesConstructor = require('../internals/species-constructor');
var task = require('../internals/task').set;
var microtask = require('../internals/microtask');
var promiseResolve = require('../internals/promise-resolve');
var hostReportErrors = require('../internals/host-report-errors');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var InternalStateModule = require('../internals/internal-state');
var isForced = require('../internals/is-forced');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/is-pure":"../node_modules/core-js-pure/internals/is-pure.js","../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/get-built-in":"../node_modules/core-js-pure/internals/get-built-in.js","../internals/native-promise-constructor":"../node_modules/core-js-pure/internals/native-promise-constructor.js","../internals/redefine":"../node_modules/core-js-pure/internals/redefine.js","../internals/redefine-all":"../node_modules/core-js-pure/internals/redefine-all.js","../internals/set-to-string-tag":"../node_modules/core-js-pure/internals/set-to-string-tag.js","../internals/set-species":"../node_modules/core-js-pure/internals/set-species.js","../internals/is-object":"../node_modules/core-js-pure/internals/is-object.js","../internals/a-function":"../node_modules/core-js-pure/internals/a-function.js","../internals/an-instance":"../node_modules/core-js-pure/internals/an-instance.js","../internals/classof-raw":"../node_modules/core-js-pure/internals/classof-raw.js","../internals/inspect-source":"../node_modules/core-js-pure/internals/inspect-source.js","../internals/iterate":"../node_modules/core-js-pure/internals/iterate.js","../internals/check-correctness-of-iteration":"../node_modules/core-js-pure/internals/check-correctness-of-iteration.js","../internals/species-constructor":"../node_modules/core-js-pure/internals/species-constructor.js","../internals/task":"../node_modules/core-js-pure/internals/task.js","../internals/microtask":"../node_modules/core-js-pure/internals/microtask.js","../internals/promise-resolve":"../node_modules/core-js-pure/internals/promise-resolve.js","../internals/host-report-errors":"../node_modules/core-js-pure/internals/host-report-errors.js","../internals/new-promise-capability":"../node_modules/core-js-pure/internals/new-promise-capability.js","../internals/perform":"../node_modules/core-js-pure/internals/perform.js","../internals/internal-state":"../node_modules/core-js-pure/internals/internal-state.js","../internals/is-forced":"../node_modules/core-js-pure/internals/is-forced.js","../internals/well-known-symbol":"../node_modules/core-js-pure/internals/well-known-symbol.js","../internals/engine-v8-version":"../node_modules/core-js-pure/internals/engine-v8-version.js"}],"../node_modules/core-js-pure/modules/es.promise.all-settled.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');

// `Promise.allSettled` method
// https://github.com/tc39/proposal-promise-allSettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (e) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: e };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/a-function":"../node_modules/core-js-pure/internals/a-function.js","../internals/new-promise-capability":"../node_modules/core-js-pure/internals/new-promise-capability.js","../internals/perform":"../node_modules/core-js-pure/internals/perform.js","../internals/iterate":"../node_modules/core-js-pure/internals/iterate.js"}],"../node_modules/core-js-pure/modules/es.promise.finally.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var NativePromise = require('../internals/native-promise-constructor');
var fails = require('../internals/fails');
var getBuiltIn = require('../internals/get-built-in');
var speciesConstructor = require('../internals/species-constructor');
var promiseResolve = require('../internals/promise-resolve');
var redefine = require('../internals/redefine');

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/is-pure":"../node_modules/core-js-pure/internals/is-pure.js","../internals/native-promise-constructor":"../node_modules/core-js-pure/internals/native-promise-constructor.js","../internals/fails":"../node_modules/core-js-pure/internals/fails.js","../internals/get-built-in":"../node_modules/core-js-pure/internals/get-built-in.js","../internals/species-constructor":"../node_modules/core-js-pure/internals/species-constructor.js","../internals/promise-resolve":"../node_modules/core-js-pure/internals/promise-resolve.js","../internals/redefine":"../node_modules/core-js-pure/internals/redefine.js"}],"../node_modules/core-js-pure/es/promise/index.js":[function(require,module,exports) {
require('../../modules/es.object.to-string');
require('../../modules/es.string.iterator');
require('../../modules/web.dom-collections.iterator');
require('../../modules/es.promise');
require('../../modules/es.promise.all-settled');
require('../../modules/es.promise.finally');
var path = require('../../internals/path');

module.exports = path.Promise;

},{"../../modules/es.object.to-string":"../node_modules/core-js-pure/modules/es.object.to-string.js","../../modules/es.string.iterator":"../node_modules/core-js-pure/modules/es.string.iterator.js","../../modules/web.dom-collections.iterator":"../node_modules/core-js-pure/modules/web.dom-collections.iterator.js","../../modules/es.promise":"../node_modules/core-js-pure/modules/es.promise.js","../../modules/es.promise.all-settled":"../node_modules/core-js-pure/modules/es.promise.all-settled.js","../../modules/es.promise.finally":"../node_modules/core-js-pure/modules/es.promise.finally.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/modules/esnext.aggregate-error.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var create = require('../internals/object-create');
var defineProperty = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var iterate = require('../internals/iterate');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var getInternalAggregateErrorState = InternalStateModule.getterFor('AggregateError');

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (setPrototypeOf) {
    that = setPrototypeOf(new Error(message), getPrototypeOf(that));
  }
  var errorsArray = [];
  iterate(errors, errorsArray.push, errorsArray);
  if (DESCRIPTORS) setInternalState(that, { errors: errorsArray, type: 'AggregateError' });
  else that.errors = errorsArray;
  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
  return that;
};

$AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});

if (DESCRIPTORS) defineProperty.f($AggregateError.prototype, 'errors', {
  get: function () {
    return getInternalAggregateErrorState(this).errors;
  },
  configurable: true
});

$({ global: true }, {
  AggregateError: $AggregateError
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/descriptors":"../node_modules/core-js-pure/internals/descriptors.js","../internals/object-get-prototype-of":"../node_modules/core-js-pure/internals/object-get-prototype-of.js","../internals/object-set-prototype-of":"../node_modules/core-js-pure/internals/object-set-prototype-of.js","../internals/object-create":"../node_modules/core-js-pure/internals/object-create.js","../internals/object-define-property":"../node_modules/core-js-pure/internals/object-define-property.js","../internals/create-property-descriptor":"../node_modules/core-js-pure/internals/create-property-descriptor.js","../internals/iterate":"../node_modules/core-js-pure/internals/iterate.js","../internals/create-non-enumerable-property":"../node_modules/core-js-pure/internals/create-non-enumerable-property.js","../internals/internal-state":"../node_modules/core-js-pure/internals/internal-state.js"}],"../node_modules/core-js-pure/modules/esnext.promise.all-settled.js":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('./es.promise.all-settled.js');

},{"./es.promise.all-settled.js":"../node_modules/core-js-pure/modules/es.promise.all-settled.js"}],"../node_modules/core-js-pure/modules/esnext.promise.try.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
$({ target: 'Promise', stat: true }, {
  'try': function (callbackfn) {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(callbackfn);
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/new-promise-capability":"../node_modules/core-js-pure/internals/new-promise-capability.js","../internals/perform":"../node_modules/core-js-pure/internals/perform.js"}],"../node_modules/core-js-pure/modules/esnext.promise.any.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var getBuiltIn = require('../internals/get-built-in');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://github.com/tc39/proposal-promise-any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (e) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = e;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/a-function":"../node_modules/core-js-pure/internals/a-function.js","../internals/get-built-in":"../node_modules/core-js-pure/internals/get-built-in.js","../internals/new-promise-capability":"../node_modules/core-js-pure/internals/new-promise-capability.js","../internals/perform":"../node_modules/core-js-pure/internals/perform.js","../internals/iterate":"../node_modules/core-js-pure/internals/iterate.js"}],"../node_modules/core-js-pure/features/promise/index.js":[function(require,module,exports) {
var parent = require('../../es/promise');
require('../../modules/esnext.aggregate-error');
// TODO: Remove from `core-js@4`
require('../../modules/esnext.promise.all-settled');
require('../../modules/esnext.promise.try');
require('../../modules/esnext.promise.any');

module.exports = parent;

},{"../../es/promise":"../node_modules/core-js-pure/es/promise/index.js","../../modules/esnext.aggregate-error":"../node_modules/core-js-pure/modules/esnext.aggregate-error.js","../../modules/esnext.promise.all-settled":"../node_modules/core-js-pure/modules/esnext.promise.all-settled.js","../../modules/esnext.promise.try":"../node_modules/core-js-pure/modules/esnext.promise.try.js","../../modules/esnext.promise.any":"../node_modules/core-js-pure/modules/esnext.promise.any.js"}],"../node_modules/@babel/runtime-corejs3/core-js/promise.js":[function(require,module,exports) {
module.exports = require("core-js-pure/features/promise");
},{"core-js-pure/features/promise":"../node_modules/core-js-pure/features/promise/index.js"}],"../node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js":[function(require,module,exports) {
var _Promise = require("../core-js/promise");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    _Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{"../core-js/promise":"../node_modules/@babel/runtime-corejs3/core-js/promise.js"}],"../node_modules/core-js-pure/modules/es.array.index-of.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $indexOf = require('../internals/array-includes').indexOf;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/array-includes":"../node_modules/core-js-pure/internals/array-includes.js","../internals/array-method-is-strict":"../node_modules/core-js-pure/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"../node_modules/core-js-pure/internals/array-method-uses-to-length.js"}],"../node_modules/core-js-pure/es/array/virtual/index-of.js":[function(require,module,exports) {
require('../../../modules/es.array.index-of');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').indexOf;

},{"../../../modules/es.array.index-of":"../node_modules/core-js-pure/modules/es.array.index-of.js","../../../internals/entry-virtual":"../node_modules/core-js-pure/internals/entry-virtual.js"}],"../node_modules/core-js-pure/es/instance/index-of.js":[function(require,module,exports) {
var indexOf = require('../array/virtual/index-of');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.indexOf) ? indexOf : own;
};

},{"../array/virtual/index-of":"../node_modules/core-js-pure/es/array/virtual/index-of.js"}],"../node_modules/core-js-pure/features/instance/index-of.js":[function(require,module,exports) {
var parent = require('../../es/instance/index-of');

module.exports = parent;

},{"../../es/instance/index-of":"../node_modules/core-js-pure/es/instance/index-of.js"}],"../node_modules/@babel/runtime-corejs3/core-js/instance/index-of.js":[function(require,module,exports) {
module.exports = require("core-js-pure/features/instance/index-of");
},{"core-js-pure/features/instance/index-of":"../node_modules/core-js-pure/features/instance/index-of.js"}],"../node_modules/core-js-pure/features/object/get-own-property-symbols.js":[function(require,module,exports) {
var parent = require('../../es/object/get-own-property-symbols');

module.exports = parent;

},{"../../es/object/get-own-property-symbols":"../node_modules/core-js-pure/es/object/get-own-property-symbols.js"}],"../node_modules/@babel/runtime-corejs3/core-js/object/get-own-property-symbols.js":[function(require,module,exports) {
module.exports = require("core-js-pure/features/object/get-own-property-symbols");
},{"core-js-pure/features/object/get-own-property-symbols":"../node_modules/core-js-pure/features/object/get-own-property-symbols.js"}],"../node_modules/core-js-pure/features/object/keys.js":[function(require,module,exports) {
var parent = require('../../es/object/keys');

module.exports = parent;

},{"../../es/object/keys":"../node_modules/core-js-pure/es/object/keys.js"}],"../node_modules/@babel/runtime-corejs3/core-js/object/keys.js":[function(require,module,exports) {
module.exports = require("core-js-pure/features/object/keys");
},{"core-js-pure/features/object/keys":"../node_modules/core-js-pure/features/object/keys.js"}],"../node_modules/@babel/runtime-corejs3/helpers/objectWithoutPropertiesLoose.js":[function(require,module,exports) {
var _indexOfInstanceProperty = require("../core-js/instance/index-of");

var _Object$keys = require("../core-js/object/keys");

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};

  var sourceKeys = _Object$keys(source);

  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (_indexOfInstanceProperty(excluded).call(excluded, key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;
},{"../core-js/instance/index-of":"../node_modules/@babel/runtime-corejs3/core-js/instance/index-of.js","../core-js/object/keys":"../node_modules/@babel/runtime-corejs3/core-js/object/keys.js"}],"../node_modules/@babel/runtime-corejs3/helpers/objectWithoutProperties.js":[function(require,module,exports) {
var _indexOfInstanceProperty = require("../core-js/instance/index-of");

var _Object$getOwnPropertySymbols = require("../core-js/object/get-own-property-symbols");

var objectWithoutPropertiesLoose = require("./objectWithoutPropertiesLoose");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (_Object$getOwnPropertySymbols) {
    var sourceSymbolKeys = _Object$getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (_indexOfInstanceProperty(excluded).call(excluded, key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;
},{"../core-js/instance/index-of":"../node_modules/@babel/runtime-corejs3/core-js/instance/index-of.js","../core-js/object/get-own-property-symbols":"../node_modules/@babel/runtime-corejs3/core-js/object/get-own-property-symbols.js","./objectWithoutPropertiesLoose":"../node_modules/@babel/runtime-corejs3/helpers/objectWithoutPropertiesLoose.js"}],"../node_modules/@thi.ng/api/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEMAPHORE = exports.DEFAULT_EPS = void 0;
const DEFAULT_EPS = 1e-6;
/**
 * Internal use only. **Do NOT use in user land code!**
 */

exports.DEFAULT_EPS = DEFAULT_EPS;
const SEMAPHORE = Symbol();
exports.SEMAPHORE = SEMAPHORE;
},{}],"../node_modules/@thi.ng/api/api/event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_DISABLE = exports.EVENT_ENABLE = exports.EVENT_ALL = void 0;
const EVENT_ALL = "*";
exports.EVENT_ALL = EVENT_ALL;
const EVENT_ENABLE = "enable";
exports.EVENT_ENABLE = EVENT_ENABLE;
const EVENT_DISABLE = "disable";
exports.EVENT_DISABLE = EVENT_DISABLE;
},{}],"../node_modules/@thi.ng/api/api/fn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NO_OP = void 0;

/**
 * No-effect placeholder function.
 */
const NO_OP = () => {};

exports.NO_OP = NO_OP;
},{}],"../node_modules/@thi.ng/api/api/logger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogLevel = void 0;
var LogLevel;
exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["FINE"] = 0] = "FINE";
  LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["SEVERE"] = 4] = "SEVERE";
  LogLevel[LogLevel["NONE"] = 5] = "NONE";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
},{}],"../node_modules/@thi.ng/api/api/typedarray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typedArray = typedArray;
exports.intType = exports.uintType = exports.TYPEDARRAY_CTORS = exports.SIZEOF = exports.TYPE2GL = exports.GL2TYPE = exports.GLType = exports.Type = void 0;

/**
 * Type enums for Typedarray-backed buffers.
 *
 * @see GLType
 * @see GL2TYPE
 * @see TYPE2GL
 */
var Type;
exports.Type = Type;

(function (Type) {
  Type[Type["U8"] = 0] = "U8";
  Type[Type["U8C"] = 1] = "U8C";
  Type[Type["I8"] = 2] = "I8";
  Type[Type["U16"] = 3] = "U16";
  Type[Type["I16"] = 4] = "I16";
  Type[Type["U32"] = 5] = "U32";
  Type[Type["I32"] = 6] = "I32";
  Type[Type["F32"] = 7] = "F32";
  Type[Type["F64"] = 8] = "F64";
})(Type || (exports.Type = Type = {}));
/**
 * WebGL numeric type constants. Use `GL2TYPE` to convert, if needed.
 *
 * @see Type
 * @see GL2TYPE
 * @see TYPE2GL
 */


var GLType;
exports.GLType = GLType;

(function (GLType) {
  GLType[GLType["I8"] = 5120] = "I8";
  GLType[GLType["U8"] = 5121] = "U8";
  GLType[GLType["I16"] = 5122] = "I16";
  GLType[GLType["U16"] = 5123] = "U16";
  GLType[GLType["I32"] = 5124] = "I32";
  GLType[GLType["U32"] = 5125] = "U32";
  GLType[GLType["F32"] = 5126] = "F32";
})(GLType || (exports.GLType = GLType = {}));
/**
 * Conversion from `GLType` to `Type` enums.
 */


const GL2TYPE = {
  [5120
  /* I8 */
  ]: 2
  /* I8 */
  ,
  [5121
  /* U8 */
  ]: 0
  /* U8 */
  ,
  [5122
  /* I16 */
  ]: 4
  /* I16 */
  ,
  [5123
  /* U16 */
  ]: 3
  /* U16 */
  ,
  [5124
  /* I32 */
  ]: 6
  /* I32 */
  ,
  [5125
  /* U32 */
  ]: 5
  /* U32 */
  ,
  [5126
  /* F32 */
  ]: 7
  /* F32 */

};
/**
 * Potentially lossy conversion from `Type` to `GLType` enums.
 *
 * Not all enums are mappable:
 *
 * - `F64` maps to `undefined`, since unsupported by WebGL
 * - `U8C` maps to U8
 */

exports.GL2TYPE = GL2TYPE;
const TYPE2GL = {
  [2
  /* I8 */
  ]: 5120
  /* I8 */
  ,
  [0
  /* U8 */
  ]: 5121
  /* U8 */
  ,
  [1
  /* U8C */
  ]: 5121
  /* U8 */
  ,
  [4
  /* I16 */
  ]: 5122
  /* I16 */
  ,
  [3
  /* U16 */
  ]: 5123
  /* U16 */
  ,
  [6
  /* I32 */
  ]: 5124
  /* I32 */
  ,
  [6
  /* I32 */
  ]: 5124
  /* I32 */
  ,
  [5
  /* U32 */
  ]: 5125
  /* U32 */
  ,
  [7
  /* F32 */
  ]: 5126
  /* F32 */
  ,
  [8
  /* F64 */
  ]: undefined
};
/**
 * Size information (in bytes) for `Type` enums. For `GLType`, use this
 * form, e.g. `SIZEOF[GL2TYPE[GLType.F32]]`
 */

exports.TYPE2GL = TYPE2GL;
const SIZEOF = {
  [0
  /* U8 */
  ]: 1,
  [1
  /* U8C */
  ]: 1,
  [2
  /* I8 */
  ]: 1,
  [3
  /* U16 */
  ]: 2,
  [4
  /* I16 */
  ]: 2,
  [5
  /* U32 */
  ]: 4,
  [6
  /* I32 */
  ]: 4,
  [7
  /* F32 */
  ]: 4,
  [8
  /* F64 */
  ]: 8
};
exports.SIZEOF = SIZEOF;
const TYPEDARRAY_CTORS = {
  [0
  /* U8 */
  ]: Uint8Array,
  [1
  /* U8C */
  ]: Uint8ClampedArray,
  [2
  /* I8 */
  ]: Int8Array,
  [3
  /* U16 */
  ]: Uint16Array,
  [4
  /* I16 */
  ]: Int16Array,
  [5
  /* U32 */
  ]: Uint32Array,
  [6
  /* I32 */
  ]: Int32Array,
  [7
  /* F32 */
  ]: Float32Array,
  [8
  /* F64 */
  ]: Float64Array,
  [5121
  /* U8 */
  ]: Uint8Array,
  [5120
  /* I8 */
  ]: Int8Array,
  [5123
  /* U16 */
  ]: Uint16Array,
  [5122
  /* I16 */
  ]: Int16Array,
  [5125
  /* U32 */
  ]: Uint32Array,
  [5124
  /* I32 */
  ]: Int32Array,
  [5126
  /* F32 */
  ]: Float32Array
};
exports.TYPEDARRAY_CTORS = TYPEDARRAY_CTORS;

function typedArray(type, ...xs) {
  return new TYPEDARRAY_CTORS[type](...xs);
}
/**
 * Returns the smallest possible *unsigned* int type enum for given `x`.
 * E.g. if `x <= 256`, the function returns `Type.U8`.
 *
 * @param x
 */


const uintType = x => x <= 0x100 ? 0
/* U8 */
: x <= 0x10000 ? 3
/* U16 */
: 5
/* U32 */
;
/**
 * Returns the smallest possible *signed* int type enum for given `x`.
 * E.g. if `x >= -128 && x < 128`, the function returns `Type.I8`.
 *
 * @param x
 */


exports.uintType = uintType;

const intType = x => x >= -0x80 && x < 0x80 ? 2
/* I8 */
: x >= -0x8000 && x < 0x8000 ? 4
/* I16 */
: 6
/* I32 */
;

exports.intType = intType;
},{}],"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../node_modules/@thi.ng/api/assert.js":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = void 0;

var _fn = require("./api/fn");

/**
 * Takes a `test` result or predicate function without args and throws
 * error with given `msg` if test failed (i.e. is falsy). The function
 * is only enabled if `NODE_ENV != "production"` or if
 * `UMBRELLA_ASSERTS = 1`.
 */
const assert = typeof process === "undefined" || "development" !== "production" || undefined === "1" ? (test, msg = "assertion failed") => {
  if (typeof test === "function" && !test() || !test) {
    throw new Error(typeof msg === "function" ? msg() : msg);
  }
} : _fn.NO_OP;
exports.assert = assert;
},{"./api/fn":"../node_modules/@thi.ng/api/api/fn.js","process":"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/src/builtins/_empty.js"}],"../node_modules/@thi.ng/api/logger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleLogger = exports.NULL_LOGGER = void 0;

var _logger = require("./api/logger");

const NULL_LOGGER = Object.freeze({
  level: _logger.LogLevel.NONE,

  fine() {},

  debug() {},

  info() {},

  warn() {},

  severe() {}

});
exports.NULL_LOGGER = NULL_LOGGER;

class ConsoleLogger {
  constructor(id, level = _logger.LogLevel.FINE) {
    this.id = id;
    this.level = level;
  }

  fine(...args) {
    this.level <= _logger.LogLevel.FINE && this.log("FINE", args);
  }

  debug(...args) {
    this.level <= _logger.LogLevel.DEBUG && this.log("DEBUG", args);
  }

  info(...args) {
    this.level <= _logger.LogLevel.INFO && this.log("INFO", args);
  }

  warn(...args) {
    this.level <= _logger.LogLevel.WARN && this.log("WARN", args);
  }

  severe(...args) {
    this.level <= _logger.LogLevel.SEVERE && this.log("SEVERE", args);
  }

  log(level, args) {
    console.log(`[${level}] ${this.id}:`, ...args);
  }

}

exports.ConsoleLogger = ConsoleLogger;
},{"./api/logger":"../node_modules/@thi.ng/api/api/logger.js"}],"../node_modules/@thi.ng/api/mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixin = void 0;

/**
 * Class behavior mixin based on:
 * http://raganwald.com/2015/06/26/decorators-in-es7.html
 *
 * Additionally only injects/overwrites properties in target, which are
 * NOT marked with `@nomixin` (i.e. haven't set their `configurable`
 * property descriptor flag to `false`)
 *
 * @param behaviour to mixin
 * @param sharedBehaviour
 * @returns decorator function
 */
const mixin = (behaviour, sharedBehaviour = {}) => {
  const instanceKeys = Reflect.ownKeys(behaviour);
  const sharedKeys = Reflect.ownKeys(sharedBehaviour);
  const typeTag = Symbol("isa");

  function _mixin(clazz) {
    for (let key of instanceKeys) {
      const existing = Object.getOwnPropertyDescriptor(clazz.prototype, key);

      if (!existing || existing.configurable) {
        Object.defineProperty(clazz.prototype, key, {
          value: behaviour[key],
          writable: true
        });
      } else {
        console.log(`not patching: ${clazz.name}.${key.toString()}`);
      }
    }

    Object.defineProperty(clazz.prototype, typeTag, {
      value: true
    });
    return clazz;
  }

  for (let key of sharedKeys) {
    Object.defineProperty(_mixin, key, {
      value: sharedBehaviour[key],
      enumerable: sharedBehaviour.propertyIsEnumerable(key)
    });
  }

  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: x => !!x[typeTag]
  });
  return _mixin;
};

exports.mixin = mixin;
},{}],"../node_modules/@thi.ng/api/decorators/configurable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configurable = void 0;

/**
 * Property decorator factory. Sets `configurable` flag of PropertyDescriptor
 * to given state.
 *
 * @param state
 */
const configurable = state => function (_, __, descriptor) {
  descriptor.configurable = state;
};

exports.configurable = configurable;
},{}],"../node_modules/@thi.ng/api/decorators/deprecated.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deprecated = void 0;

var _assert = require("../assert");

/**
 * Method property decorator factory. Augments original method with
 * deprecation message (via console), shown when method is invoked.
 * Accepts optional message arg. Throws error if assigned property
 * is not a function.
 *
 * @param msg deprecation message
 */
const deprecated = (msg, log = console.log) => function (target, prop, descriptor) {
  const signature = `${target.constructor.name}#${prop.toString()}`;
  const fn = descriptor.value;
  (0, _assert.assert)(typeof fn === "function", `${signature} is not a function`);

  descriptor.value = function () {
    log(`DEPRECATED ${signature}: ${msg || "will be removed soon"}`);
    return fn.apply(this, arguments);
  };

  return descriptor;
};

exports.deprecated = deprecated;
},{"../assert":"../node_modules/@thi.ng/api/assert.js"}],"../node_modules/@thi.ng/api/decorators/nomixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nomixin = void 0;

/**
 * Method property decorator. Sets `configurable` flag of
 * PropertyDescriptor to `false` (same as `@configurable(false)`).
 * Intended to be used in combination with mixin decorators to enable
 * partial implementations of mixed-in behaviors in target class and
 * avoid them being overidden by mixed-in behaviour.
 */
const nomixin = (_, __, descriptor) => {
  descriptor.configurable = false;
};

exports.nomixin = nomixin;
},{}],"../node_modules/@thi.ng/api/decorators/sealed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sealed = void 0;

/**
 * Class decorator. Seals both constructor and prototype.
 *
 * @param constructor
 */
const sealed = constructor => {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
};

exports.sealed = sealed;
},{}],"../node_modules/@thi.ng/api/mixins/ienable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IEnableMixin = void 0;

var _event = require("../api/event");

var _mixin = require("../mixin");

/**
 * Mixin class decorator, injects IEnable default implementation, incl.
 * a `_enabled` property. If the target also implements the `INotify`
 * interface, `enable()` and `disable()` will automatically emit the
 * respective events.
 */
const IEnableMixin = (0, _mixin.mixin)({
  _enabled: true,

  isEnabled() {
    return this._enabled;
  },

  enable() {
    this._enabled = true;

    if (this.notify) {
      this.notify({
        id: _event.EVENT_ENABLE,
        target: this
      });
    }
  },

  disable() {
    this._enabled = false;

    if (this.notify) {
      this.notify({
        id: _event.EVENT_DISABLE,
        target: this
      });
    }
  },

  toggle() {
    this._enabled ? this.disable() : this.enable();
    return this._enabled;
  }

});
exports.IEnableMixin = IEnableMixin;
},{"../api/event":"../node_modules/@thi.ng/api/api/event.js","../mixin":"../node_modules/@thi.ng/api/mixin.js"}],"../node_modules/@thi.ng/api/mixins/inotify.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INotifyMixin = exports.inotify_dispatch = void 0;

var _event = require("../api/event");

var _mixin = require("../mixin");

const inotify_dispatch = (listeners, e) => {
  if (!listeners) return;

  for (let i = 0, n = listeners.length, l; i < n; i++) {
    l = listeners[i];
    l[0].call(l[1], e);

    if (e.canceled) {
      return;
    }
  }
};
/**
 * Mixin class decorator, injects INotify default implementation, incl.
 * a lazily instantiated `_listeners` property object, storing
 * registered listeners.
 */


exports.inotify_dispatch = inotify_dispatch;
const INotifyMixin = (0, _mixin.mixin)({
  addListener(id, fn, scope) {
    let l = (this._listeners = this._listeners || {})[id];
    !l && (l = this._listeners[id] = []);

    if (this.__listener(l, fn, scope) === -1) {
      l.push([fn, scope]);
      return true;
    }

    return false;
  },

  removeListener(id, fn, scope) {
    let listeners;
    if (!(listeners = this._listeners)) return false;
    const l = listeners[id];

    if (l) {
      const idx = this.__listener(l, fn, scope);

      if (idx !== -1) {
        l.splice(idx, 1);
        !l.length && delete listeners[id];
        return true;
      }
    }

    return false;
  },

  notify(e) {
    let listeners;
    if (!(listeners = this._listeners)) return false;
    e.target === undefined && (e.target = this);
    inotify_dispatch(listeners[e.id], e);
    inotify_dispatch(listeners[_event.EVENT_ALL], e);
  },

  __listener(listeners, f, scope) {
    let i = listeners.length;

    while (--i >= 0) {
      const l = listeners[i];

      if (l[0] === f && l[1] === scope) {
        break;
      }
    }

    return i;
  }

});
exports.INotifyMixin = INotifyMixin;
},{"../api/event":"../node_modules/@thi.ng/api/api/event.js","../mixin":"../node_modules/@thi.ng/api/mixin.js"}],"../node_modules/@thi.ng/api/mixins/iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterable = void 0;

var _mixin = require("../mixin");

const iterable = prop => (0, _mixin.mixin)({
  *[Symbol.iterator]() {
    yield* this[prop];
  }

});

exports.iterable = iterable;
},{"../mixin":"../node_modules/@thi.ng/api/mixin.js"}],"../node_modules/@thi.ng/api/mixins/iwatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IWatchMixin = void 0;

var _mixin = require("../mixin");

const IWatchMixin = (0, _mixin.mixin)({
  addWatch(id, fn) {
    this._watches = this._watches || {};

    if (this._watches[id]) {
      return false;
    }

    this._watches[id] = fn;
    return true;
  },

  removeWatch(id) {
    if (!this._watches) return;

    if (this._watches[id]) {
      delete this._watches[id];
      return true;
    }

    return false;
  },

  notifyWatches(oldState, newState) {
    if (!this._watches) return;
    const w = this._watches;

    for (let id in w) {
      w[id](id, oldState, newState);
    }
  }

});
exports.IWatchMixin = IWatchMixin;
},{"../mixin":"../node_modules/@thi.ng/api/mixin.js"}],"../node_modules/@thi.ng/api/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _event = require("./api/event");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _event[key];
    }
  });
});

var _fn = require("./api/fn");

Object.keys(_fn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fn[key];
    }
  });
});

var _logger = require("./api/logger");

Object.keys(_logger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _logger[key];
    }
  });
});

var _typedarray = require("./api/typedarray");

Object.keys(_typedarray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _typedarray[key];
    }
  });
});

var _assert = require("./assert");

Object.keys(_assert).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assert[key];
    }
  });
});

var _logger2 = require("./logger");

Object.keys(_logger2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _logger2[key];
    }
  });
});

var _mixin = require("./mixin");

Object.keys(_mixin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mixin[key];
    }
  });
});

var _configurable = require("./decorators/configurable");

Object.keys(_configurable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _configurable[key];
    }
  });
});

var _deprecated = require("./decorators/deprecated");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated[key];
    }
  });
});

var _nomixin = require("./decorators/nomixin");

Object.keys(_nomixin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _nomixin[key];
    }
  });
});

var _sealed = require("./decorators/sealed");

Object.keys(_sealed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sealed[key];
    }
  });
});

var _ienable = require("./mixins/ienable");

Object.keys(_ienable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ienable[key];
    }
  });
});

var _inotify = require("./mixins/inotify");

Object.keys(_inotify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inotify[key];
    }
  });
});

var _iterable = require("./mixins/iterable");

Object.keys(_iterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterable[key];
    }
  });
});

var _iwatch = require("./mixins/iwatch");

Object.keys(_iwatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iwatch[key];
    }
  });
});
},{"./api":"../node_modules/@thi.ng/api/api.js","./api/event":"../node_modules/@thi.ng/api/api/event.js","./api/fn":"../node_modules/@thi.ng/api/api/fn.js","./api/logger":"../node_modules/@thi.ng/api/api/logger.js","./api/typedarray":"../node_modules/@thi.ng/api/api/typedarray.js","./assert":"../node_modules/@thi.ng/api/assert.js","./logger":"../node_modules/@thi.ng/api/logger.js","./mixin":"../node_modules/@thi.ng/api/mixin.js","./decorators/configurable":"../node_modules/@thi.ng/api/decorators/configurable.js","./decorators/deprecated":"../node_modules/@thi.ng/api/decorators/deprecated.js","./decorators/nomixin":"../node_modules/@thi.ng/api/decorators/nomixin.js","./decorators/sealed":"../node_modules/@thi.ng/api/decorators/sealed.js","./mixins/ienable":"../node_modules/@thi.ng/api/mixins/ienable.js","./mixins/inotify":"../node_modules/@thi.ng/api/mixins/inotify.js","./mixins/iterable":"../node_modules/@thi.ng/api/mixins/iterable.js","./mixins/iwatch":"../node_modules/@thi.ng/api/mixins/iwatch.js"}],"../node_modules/@thi.ng/rstream/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogger = exports.LOGGER = exports.CloseMode = exports.State = void 0;

var _api = require("@thi.ng/api");

var State;
exports.State = State;

(function (State) {
  State[State["IDLE"] = 0] = "IDLE";
  State[State["ACTIVE"] = 1] = "ACTIVE";
  State[State["DONE"] = 2] = "DONE";
  State[State["ERROR"] = 3] = "ERROR";
  State[State["DISABLED"] = 4] = "DISABLED"; // TODO currently unused
})(State || (exports.State = State = {}));
/**
 * Closing behaviors.
 */


var CloseMode;
exports.CloseMode = CloseMode;

(function (CloseMode) {
  /**
   * Never close, even if no more inputs/outputs.
   */
  CloseMode[CloseMode["NEVER"] = 0] = "NEVER";
  /**
   * Close when first input/output is done / removed.
   */

  CloseMode[CloseMode["FIRST"] = 1] = "FIRST";
  /**
   * Close when last input/output is done / removed.
   */

  CloseMode[CloseMode["LAST"] = 2] = "LAST";
})(CloseMode || (exports.CloseMode = CloseMode = {}));

let LOGGER = _api.NULL_LOGGER;
exports.LOGGER = LOGGER;

const setLogger = logger => exports.LOGGER = LOGGER = logger;

exports.setLogger = setLogger;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js"}],"../node_modules/@thi.ng/checks/exists-not-null.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.existsAndNotNull = void 0;

const existsAndNotNull = x => x != null;

exports.existsAndNotNull = existsAndNotNull;
},{}],"../node_modules/@thi.ng/checks/exists.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exists = void 0;

const exists = t => t !== undefined;

exports.exists = exists;
},{}],"../node_modules/@thi.ng/checks/has-crypto.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasCrypto = void 0;

const hasCrypto = () => typeof window !== "undefined" && window["crypto"] !== undefined;

exports.hasCrypto = hasCrypto;
},{}],"../node_modules/@thi.ng/checks/has-max-length.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMaxLength = void 0;

const hasMaxLength = (len, x) => x != null && x.length <= len;

exports.hasMaxLength = hasMaxLength;
},{}],"../node_modules/@thi.ng/checks/has-min-length.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMinLength = void 0;

const hasMinLength = (len, x) => x != null && x.length >= len;

exports.hasMinLength = hasMinLength;
},{}],"../node_modules/@thi.ng/checks/is-function.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = void 0;

const isFunction = x => typeof x === "function";

exports.isFunction = isFunction;
},{}],"../node_modules/@thi.ng/checks/has-performance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasPerformance = void 0;

var _isFunction = require("./is-function");

const hasPerformance = () => typeof performance !== "undefined" && (0, _isFunction.isFunction)(performance.now);

exports.hasPerformance = hasPerformance;
},{"./is-function":"../node_modules/@thi.ng/checks/is-function.js"}],"../node_modules/@thi.ng/checks/has-wasm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWASM = void 0;

const hasWASM = () => typeof window !== "undefined" && typeof window["WebAssembly"] !== "undefined" || typeof global !== "undefined" && typeof global["WebAssembly"] !== "undefined";

exports.hasWASM = hasWASM;
},{}],"../node_modules/@thi.ng/checks/has-webgl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWebGL = void 0;

const hasWebGL = () => {
  try {
    document.createElement("canvas").getContext("webgl");
    return true;
  } catch (e) {
    return false;
  }
};

exports.hasWebGL = hasWebGL;
},{}],"../node_modules/@thi.ng/checks/has-websocket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWebSocket = void 0;

const hasWebSocket = () => typeof WebSocket !== "undefined";

exports.hasWebSocket = hasWebSocket;
},{}],"../node_modules/@thi.ng/checks/implements-function.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.implementsFunction = void 0;

const implementsFunction = (x, fn) => x != null && typeof x[fn] === "function";

exports.implementsFunction = implementsFunction;
},{}],"../node_modules/@thi.ng/checks/is-array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = void 0;
const isArray = Array.isArray;
exports.isArray = isArray;
},{}],"../node_modules/@thi.ng/checks/is-arraylike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArrayLike = void 0;

const isArrayLike = x => x != null && typeof x !== "function" && x.length !== undefined;

exports.isArrayLike = isArrayLike;
},{}],"../node_modules/@thi.ng/checks/is-blob.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBlob = void 0;

const isBlob = x => x instanceof Blob;

exports.isBlob = isBlob;
},{}],"../node_modules/@thi.ng/checks/is-boolean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBoolean = void 0;

const isBoolean = x => typeof x === "boolean";

exports.isBoolean = isBoolean;
},{}],"../node_modules/@thi.ng/checks/is-chrome.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isChrome = void 0;

const isChrome = () => typeof window !== "undefined" && !!window["chrome"];

exports.isChrome = isChrome;
},{}],"../node_modules/@thi.ng/checks/is-date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDate = void 0;

const isDate = x => x instanceof Date;

exports.isDate = isDate;
},{}],"../node_modules/@thi.ng/checks/is-even.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEven = void 0;

const isEven = x => x % 2 === 0;

exports.isEven = isEven;
},{}],"../node_modules/@thi.ng/checks/is-false.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFalse = void 0;

const isFalse = x => x === false;

exports.isFalse = isFalse;
},{}],"../node_modules/@thi.ng/checks/is-file.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFile = void 0;

const isFile = x => x instanceof File;

exports.isFile = isFile;
},{}],"../node_modules/@thi.ng/checks/is-firefox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFirefox = void 0;

const isFirefox = () => typeof window !== "undefined" && !!window["InstallTrigger"];

exports.isFirefox = isFirefox;
},{}],"../node_modules/@thi.ng/checks/is-string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = void 0;

const isString = x => typeof x === "string";

exports.isString = isString;
},{}],"../node_modules/@thi.ng/checks/is-hex-color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHexColor = void 0;

var _isString = require("./is-string");

const RE = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;

const isHexColor = x => (0, _isString.isString)(x) && RE.test(x);

exports.isHexColor = isHexColor;
},{"./is-string":"../node_modules/@thi.ng/checks/is-string.js"}],"../node_modules/@thi.ng/checks/is-ie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIE = void 0;

const isIE = () => typeof document !== "undefined" && (typeof document["documentMode"] !== "undefined" || navigator.userAgent.indexOf("MSIE") > 0);

exports.isIE = isIE;
},{}],"../node_modules/@thi.ng/checks/is-in-range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInRange = void 0;

const isInRange = (min, max, x) => x >= min && x <= max;

exports.isInRange = isInRange;
},{}],"../node_modules/@thi.ng/checks/is-int32.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInt32 = void 0;

const isInt32 = x => typeof x === "number" && (x | 0) === x;

exports.isInt32 = isInt32;
},{}],"../node_modules/@thi.ng/checks/is-iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIterable = void 0;

const isIterable = x => x != null && typeof x[Symbol.iterator] === "function";

exports.isIterable = isIterable;
},{}],"../node_modules/@thi.ng/checks/is-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMap = void 0;

const isMap = x => x instanceof Map;

exports.isMap = isMap;
},{}],"../node_modules/@thi.ng/checks/is-mobile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = void 0;

const isMobile = () => typeof navigator !== "undefined" && /mobile|tablet|ip(ad|hone|od)|android|silk|crios/i.test(navigator.userAgent);

exports.isMobile = isMobile;
},{}],"../node_modules/@thi.ng/checks/is-nan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNaN = void 0;

const isNaN = x => x !== x;

exports.isNaN = isNaN;
},{}],"../node_modules/@thi.ng/checks/is-negative.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNegative = void 0;

const isNegative = x => typeof x === "number" && x < 0;

exports.isNegative = isNegative;
},{}],"../node_modules/@thi.ng/checks/is-nil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNil = void 0;

/**
 * Checks if x is null or undefined.
 *
 */
const isNil = x => x == null;

exports.isNil = isNil;
},{}],"../node_modules/@thi.ng/checks/is-node.js":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNode = void 0;

const isNode = () => {
  if (typeof process === "object") {
    if (typeof process.versions === "object") {
      if (typeof process.versions.node !== "undefined") {
        return true;
      }
    }
  }

  return false;
};

exports.isNode = isNode;
},{"process":"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/src/builtins/_empty.js"}],"../node_modules/@thi.ng/checks/is-not-string-iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotStringAndIterable = void 0;

const isNotStringAndIterable = x => x != null && typeof x !== "string" && typeof x[Symbol.iterator] === "function";

exports.isNotStringAndIterable = isNotStringAndIterable;
},{}],"../node_modules/@thi.ng/checks/is-null.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNull = void 0;

const isNull = x => x === null;

exports.isNull = isNull;
},{}],"../node_modules/@thi.ng/checks/is-number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = void 0;

const isNumber = x => typeof x === "number";

exports.isNumber = isNumber;
},{}],"../node_modules/@thi.ng/checks/is-object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = void 0;

const isObject = x => x !== null && typeof x === "object";

exports.isObject = isObject;
},{}],"../node_modules/@thi.ng/checks/is-odd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOdd = void 0;

const isOdd = x => x % 2 !== 0;

exports.isOdd = isOdd;
},{}],"../node_modules/@thi.ng/checks/is-plain-object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPlainObject = void 0;
const OBJP = Object.getPrototypeOf;
/**
 * Similar to `isObject()`, but also checks if prototype is that of
 * `Object` (or `null`).
 *
 * @param x
 */

const isPlainObject = x => {
  let p;
  return x != null && typeof x === "object" && ((p = OBJP(x)) === null || OBJP(p) === null);
};

exports.isPlainObject = isPlainObject;
},{}],"../node_modules/@thi.ng/checks/is-positive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPosititve = void 0;

const isPosititve = x => typeof x === "number" && x > 0;

exports.isPosititve = isPosititve;
},{}],"../node_modules/@thi.ng/checks/is-primitive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPrimitive = void 0;

const isPrimitive = x => {
  const t = typeof x;
  return t === "string" || t === "number";
};

exports.isPrimitive = isPrimitive;
},{}],"../node_modules/@thi.ng/checks/is-promise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromise = void 0;

const isPromise = x => x instanceof Promise;

exports.isPromise = isPromise;
},{}],"../node_modules/@thi.ng/checks/is-promiselike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromiseLike = void 0;

var _implementsFunction = require("./implements-function");

const isPromiseLike = x => x instanceof Promise || (0, _implementsFunction.implementsFunction)(x, "then") && (0, _implementsFunction.implementsFunction)(x, "catch");

exports.isPromiseLike = isPromiseLike;
},{"./implements-function":"../node_modules/@thi.ng/checks/implements-function.js"}],"../node_modules/@thi.ng/checks/is-regexp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRegExp = void 0;

const isRegExp = x => x instanceof RegExp;

exports.isRegExp = isRegExp;
},{}],"../node_modules/@thi.ng/checks/is-safari.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSafari = void 0;

var _isChrome = require("./is-chrome");

const isSafari = () => typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !(0, _isChrome.isChrome)();

exports.isSafari = isSafari;
},{"./is-chrome":"../node_modules/@thi.ng/checks/is-chrome.js"}],"../node_modules/@thi.ng/checks/is-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSet = void 0;

const isSet = x => x instanceof Set;

exports.isSet = isSet;
},{}],"../node_modules/@thi.ng/checks/is-symbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSymbol = void 0;

const isSymbol = x => typeof x === "symbol";

exports.isSymbol = isSymbol;
},{}],"../node_modules/@thi.ng/checks/is-transferable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTransferable = void 0;

const isTransferable = x => x instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && x instanceof SharedArrayBuffer || typeof MessagePort !== "undefined" && x instanceof MessagePort;

exports.isTransferable = isTransferable;
},{}],"../node_modules/@thi.ng/checks/is-true.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTrue = void 0;

const isTrue = x => x === true;

exports.isTrue = isTrue;
},{}],"../node_modules/@thi.ng/checks/is-typedarray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTypedArray = void 0;

const isTypedArray = x => x && (x.constructor === Float32Array || x.constructor === Uint32Array || x.constructor === Uint8Array || x.constructor === Uint8ClampedArray || x.constructor === Int8Array || x.constructor === Uint16Array || x.constructor === Int16Array || x.constructor === Int32Array || x.constructor === Float64Array);

exports.isTypedArray = isTypedArray;
},{}],"../node_modules/@thi.ng/checks/is-uint32.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUint32 = void 0;

const isUint32 = x => typeof x === "number" && x >>> 0 === x;

exports.isUint32 = isUint32;
},{}],"../node_modules/@thi.ng/checks/is-undefined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUndefined = void 0;

const isUndefined = x => x === undefined;

exports.isUndefined = isUndefined;
},{}],"../node_modules/@thi.ng/checks/is-uuid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUUID = void 0;
const RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isUUID = x => RE.test(x);

exports.isUUID = isUUID;
},{}],"../node_modules/@thi.ng/checks/is-uuid4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUUIDv4 = void 0;
const RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUUIDv4 = x => RE.test(x);

exports.isUUIDv4 = isUUIDv4;
},{}],"../node_modules/@thi.ng/checks/is-zero.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isZero = void 0;

const isZero = x => x === 0;

exports.isZero = isZero;
},{}],"../node_modules/@thi.ng/checks/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _existsNotNull = require("./exists-not-null");

Object.keys(_existsNotNull).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _existsNotNull[key];
    }
  });
});

var _exists = require("./exists");

Object.keys(_exists).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _exists[key];
    }
  });
});

var _hasCrypto = require("./has-crypto");

Object.keys(_hasCrypto).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasCrypto[key];
    }
  });
});

var _hasMaxLength = require("./has-max-length");

Object.keys(_hasMaxLength).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasMaxLength[key];
    }
  });
});

var _hasMinLength = require("./has-min-length");

Object.keys(_hasMinLength).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasMinLength[key];
    }
  });
});

var _hasPerformance = require("./has-performance");

Object.keys(_hasPerformance).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasPerformance[key];
    }
  });
});

var _hasWasm = require("./has-wasm");

Object.keys(_hasWasm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasWasm[key];
    }
  });
});

var _hasWebgl = require("./has-webgl");

Object.keys(_hasWebgl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasWebgl[key];
    }
  });
});

var _hasWebsocket = require("./has-websocket");

Object.keys(_hasWebsocket).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasWebsocket[key];
    }
  });
});

var _implementsFunction = require("./implements-function");

Object.keys(_implementsFunction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _implementsFunction[key];
    }
  });
});

var _isArray = require("./is-array");

Object.keys(_isArray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isArray[key];
    }
  });
});

var _isArraylike = require("./is-arraylike");

Object.keys(_isArraylike).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isArraylike[key];
    }
  });
});

var _isBlob = require("./is-blob");

Object.keys(_isBlob).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isBlob[key];
    }
  });
});

var _isBoolean = require("./is-boolean");

Object.keys(_isBoolean).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isBoolean[key];
    }
  });
});

var _isChrome = require("./is-chrome");

Object.keys(_isChrome).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isChrome[key];
    }
  });
});

var _isDate = require("./is-date");

Object.keys(_isDate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isDate[key];
    }
  });
});

var _isEven = require("./is-even");

Object.keys(_isEven).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isEven[key];
    }
  });
});

var _isFalse = require("./is-false");

Object.keys(_isFalse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isFalse[key];
    }
  });
});

var _isFile = require("./is-file");

Object.keys(_isFile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isFile[key];
    }
  });
});

var _isFirefox = require("./is-firefox");

Object.keys(_isFirefox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isFirefox[key];
    }
  });
});

var _isFunction = require("./is-function");

Object.keys(_isFunction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isFunction[key];
    }
  });
});

var _isHexColor = require("./is-hex-color");

Object.keys(_isHexColor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isHexColor[key];
    }
  });
});

var _isIe = require("./is-ie");

Object.keys(_isIe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isIe[key];
    }
  });
});

var _isInRange = require("./is-in-range");

Object.keys(_isInRange).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isInRange[key];
    }
  });
});

var _isInt = require("./is-int32");

Object.keys(_isInt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isInt[key];
    }
  });
});

var _isIterable = require("./is-iterable");

Object.keys(_isIterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isIterable[key];
    }
  });
});

var _isMap = require("./is-map");

Object.keys(_isMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isMap[key];
    }
  });
});

var _isMobile = require("./is-mobile");

Object.keys(_isMobile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isMobile[key];
    }
  });
});

var _isNan = require("./is-nan");

Object.keys(_isNan).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNan[key];
    }
  });
});

var _isNegative = require("./is-negative");

Object.keys(_isNegative).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNegative[key];
    }
  });
});

var _isNil = require("./is-nil");

Object.keys(_isNil).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNil[key];
    }
  });
});

var _isNode = require("./is-node");

Object.keys(_isNode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNode[key];
    }
  });
});

var _isNotStringIterable = require("./is-not-string-iterable");

Object.keys(_isNotStringIterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNotStringIterable[key];
    }
  });
});

var _isNull = require("./is-null");

Object.keys(_isNull).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNull[key];
    }
  });
});

var _isNumber = require("./is-number");

Object.keys(_isNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNumber[key];
    }
  });
});

var _isObject = require("./is-object");

Object.keys(_isObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isObject[key];
    }
  });
});

var _isOdd = require("./is-odd");

Object.keys(_isOdd).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isOdd[key];
    }
  });
});

var _isPlainObject = require("./is-plain-object");

Object.keys(_isPlainObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPlainObject[key];
    }
  });
});

var _isPositive = require("./is-positive");

Object.keys(_isPositive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPositive[key];
    }
  });
});

var _isPrimitive = require("./is-primitive");

Object.keys(_isPrimitive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPrimitive[key];
    }
  });
});

var _isPromise = require("./is-promise");

Object.keys(_isPromise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPromise[key];
    }
  });
});

var _isPromiselike = require("./is-promiselike");

Object.keys(_isPromiselike).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPromiselike[key];
    }
  });
});

var _isRegexp = require("./is-regexp");

Object.keys(_isRegexp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isRegexp[key];
    }
  });
});

var _isSafari = require("./is-safari");

Object.keys(_isSafari).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isSafari[key];
    }
  });
});

var _isSet = require("./is-set");

Object.keys(_isSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isSet[key];
    }
  });
});

var _isString = require("./is-string");

Object.keys(_isString).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isString[key];
    }
  });
});

var _isSymbol = require("./is-symbol");

Object.keys(_isSymbol).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isSymbol[key];
    }
  });
});

var _isTransferable = require("./is-transferable");

Object.keys(_isTransferable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isTransferable[key];
    }
  });
});

var _isTrue = require("./is-true");

Object.keys(_isTrue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isTrue[key];
    }
  });
});

var _isTypedarray = require("./is-typedarray");

Object.keys(_isTypedarray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isTypedarray[key];
    }
  });
});

var _isUint = require("./is-uint32");

Object.keys(_isUint).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isUint[key];
    }
  });
});

var _isUndefined = require("./is-undefined");

Object.keys(_isUndefined).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isUndefined[key];
    }
  });
});

var _isUuid = require("./is-uuid");

Object.keys(_isUuid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isUuid[key];
    }
  });
});

var _isUuid2 = require("./is-uuid4");

Object.keys(_isUuid2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isUuid2[key];
    }
  });
});

var _isZero = require("./is-zero");

Object.keys(_isZero).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isZero[key];
    }
  });
});
},{"./exists-not-null":"../node_modules/@thi.ng/checks/exists-not-null.js","./exists":"../node_modules/@thi.ng/checks/exists.js","./has-crypto":"../node_modules/@thi.ng/checks/has-crypto.js","./has-max-length":"../node_modules/@thi.ng/checks/has-max-length.js","./has-min-length":"../node_modules/@thi.ng/checks/has-min-length.js","./has-performance":"../node_modules/@thi.ng/checks/has-performance.js","./has-wasm":"../node_modules/@thi.ng/checks/has-wasm.js","./has-webgl":"../node_modules/@thi.ng/checks/has-webgl.js","./has-websocket":"../node_modules/@thi.ng/checks/has-websocket.js","./implements-function":"../node_modules/@thi.ng/checks/implements-function.js","./is-array":"../node_modules/@thi.ng/checks/is-array.js","./is-arraylike":"../node_modules/@thi.ng/checks/is-arraylike.js","./is-blob":"../node_modules/@thi.ng/checks/is-blob.js","./is-boolean":"../node_modules/@thi.ng/checks/is-boolean.js","./is-chrome":"../node_modules/@thi.ng/checks/is-chrome.js","./is-date":"../node_modules/@thi.ng/checks/is-date.js","./is-even":"../node_modules/@thi.ng/checks/is-even.js","./is-false":"../node_modules/@thi.ng/checks/is-false.js","./is-file":"../node_modules/@thi.ng/checks/is-file.js","./is-firefox":"../node_modules/@thi.ng/checks/is-firefox.js","./is-function":"../node_modules/@thi.ng/checks/is-function.js","./is-hex-color":"../node_modules/@thi.ng/checks/is-hex-color.js","./is-ie":"../node_modules/@thi.ng/checks/is-ie.js","./is-in-range":"../node_modules/@thi.ng/checks/is-in-range.js","./is-int32":"../node_modules/@thi.ng/checks/is-int32.js","./is-iterable":"../node_modules/@thi.ng/checks/is-iterable.js","./is-map":"../node_modules/@thi.ng/checks/is-map.js","./is-mobile":"../node_modules/@thi.ng/checks/is-mobile.js","./is-nan":"../node_modules/@thi.ng/checks/is-nan.js","./is-negative":"../node_modules/@thi.ng/checks/is-negative.js","./is-nil":"../node_modules/@thi.ng/checks/is-nil.js","./is-node":"../node_modules/@thi.ng/checks/is-node.js","./is-not-string-iterable":"../node_modules/@thi.ng/checks/is-not-string-iterable.js","./is-null":"../node_modules/@thi.ng/checks/is-null.js","./is-number":"../node_modules/@thi.ng/checks/is-number.js","./is-object":"../node_modules/@thi.ng/checks/is-object.js","./is-odd":"../node_modules/@thi.ng/checks/is-odd.js","./is-plain-object":"../node_modules/@thi.ng/checks/is-plain-object.js","./is-positive":"../node_modules/@thi.ng/checks/is-positive.js","./is-primitive":"../node_modules/@thi.ng/checks/is-primitive.js","./is-promise":"../node_modules/@thi.ng/checks/is-promise.js","./is-promiselike":"../node_modules/@thi.ng/checks/is-promiselike.js","./is-regexp":"../node_modules/@thi.ng/checks/is-regexp.js","./is-safari":"../node_modules/@thi.ng/checks/is-safari.js","./is-set":"../node_modules/@thi.ng/checks/is-set.js","./is-string":"../node_modules/@thi.ng/checks/is-string.js","./is-symbol":"../node_modules/@thi.ng/checks/is-symbol.js","./is-transferable":"../node_modules/@thi.ng/checks/is-transferable.js","./is-true":"../node_modules/@thi.ng/checks/is-true.js","./is-typedarray":"../node_modules/@thi.ng/checks/is-typedarray.js","./is-uint32":"../node_modules/@thi.ng/checks/is-uint32.js","./is-undefined":"../node_modules/@thi.ng/checks/is-undefined.js","./is-uuid":"../node_modules/@thi.ng/checks/is-uuid.js","./is-uuid4":"../node_modules/@thi.ng/checks/is-uuid4.js","./is-zero":"../node_modules/@thi.ng/checks/is-zero.js"}],"../node_modules/@thi.ng/transducers/reduced.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unreduced = exports.ensureReduced = exports.isReduced = exports.reduced = exports.Reduced = void 0;

class Reduced {
  constructor(val) {
    this.value = val;
  }

  deref() {
    return this.value;
  }

}

exports.Reduced = Reduced;

const reduced = x => new Reduced(x);

exports.reduced = reduced;

const isReduced = x => x instanceof Reduced;

exports.isReduced = isReduced;

const ensureReduced = x => x instanceof Reduced ? x : new Reduced(x);

exports.ensureReduced = ensureReduced;

const unreduced = x => x instanceof Reduced ? x.deref() : x;

exports.unreduced = unreduced;
},{}],"../node_modules/@thi.ng/errors/deferror.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defError = void 0;

const defError = (prefix, suffix = msg => msg !== undefined ? ": " + msg : "") => class extends Error {
  constructor(msg) {
    super(prefix(msg) + suffix(msg));
  }

};

exports.defError = defError;
},{}],"../node_modules/@thi.ng/errors/illegal-arguments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.illegalArgs = exports.IllegalArgumentError = void 0;

var _deferror = require("./deferror");

const IllegalArgumentError = (0, _deferror.defError)(() => "illegal argument(s)");
exports.IllegalArgumentError = IllegalArgumentError;

const illegalArgs = msg => {
  throw new IllegalArgumentError(msg);
};

exports.illegalArgs = illegalArgs;
},{"./deferror":"../node_modules/@thi.ng/errors/deferror.js"}],"../node_modules/@thi.ng/errors/illegal-arity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.illegalArity = exports.IllegalArityError = void 0;

var _deferror = require("./deferror");

const IllegalArityError = (0, _deferror.defError)(() => "illegal arity");
exports.IllegalArityError = IllegalArityError;

const illegalArity = n => {
  throw new IllegalArityError(n);
};

exports.illegalArity = illegalArity;
},{"./deferror":"../node_modules/@thi.ng/errors/deferror.js"}],"../node_modules/@thi.ng/errors/illegal-state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.illegalState = exports.IllegalStateError = void 0;

var _deferror = require("./deferror");

const IllegalStateError = (0, _deferror.defError)(() => "illegal state");
exports.IllegalStateError = IllegalStateError;

const illegalState = msg => {
  throw new IllegalStateError(msg);
};

exports.illegalState = illegalState;
},{"./deferror":"../node_modules/@thi.ng/errors/deferror.js"}],"../node_modules/@thi.ng/errors/unsupported.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsupported = exports.UnsupportedOperationError = void 0;

var _deferror = require("./deferror");

const UnsupportedOperationError = (0, _deferror.defError)(() => "unsupported operation");
exports.UnsupportedOperationError = UnsupportedOperationError;

const unsupported = msg => {
  throw new UnsupportedOperationError(msg);
};

exports.unsupported = unsupported;
},{"./deferror":"../node_modules/@thi.ng/errors/deferror.js"}],"../node_modules/@thi.ng/errors/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deferror = require("./deferror");

Object.keys(_deferror).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deferror[key];
    }
  });
});

var _illegalArguments = require("./illegal-arguments");

Object.keys(_illegalArguments).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _illegalArguments[key];
    }
  });
});

var _illegalArity = require("./illegal-arity");

Object.keys(_illegalArity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _illegalArity[key];
    }
  });
});

var _illegalState = require("./illegal-state");

Object.keys(_illegalState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _illegalState[key];
    }
  });
});

var _unsupported = require("./unsupported");

Object.keys(_unsupported).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unsupported[key];
    }
  });
});
},{"./deferror":"../node_modules/@thi.ng/errors/deferror.js","./illegal-arguments":"../node_modules/@thi.ng/errors/illegal-arguments.js","./illegal-arity":"../node_modules/@thi.ng/errors/illegal-arity.js","./illegal-state":"../node_modules/@thi.ng/errors/illegal-state.js","./unsupported":"../node_modules/@thi.ng/errors/unsupported.js"}],"../node_modules/@thi.ng/transducers/reduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = reduce;
exports.$$reduce = exports.reducer = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _reduced = require("./reduced");

const parseArgs = args => args.length === 2 ? [undefined, args[1]] : args.length === 3 ? [args[1], args[2]] : (0, _errors.illegalArity)(args.length);

function reduce(...args) {
  const rfn = args[0];
  const init = rfn[0];
  const complete = rfn[1];
  const reduce = rfn[2];
  args = parseArgs(args);
  const acc = args[0] == null ? init() : args[0];
  const xs = args[1];
  return (0, _reduced.unreduced)(complete((0, _checks.implementsFunction)(xs, "$reduce") ? xs.$reduce(reduce, acc) : (0, _checks.isArrayLike)(xs) ? reduceArray(reduce, acc, xs) : reduceIterable(reduce, acc, xs)));
}

const reduceArray = (rfn, acc, xs) => {
  for (let i = 0, n = xs.length; i < n; i++) {
    acc = rfn(acc, xs[i]);

    if ((0, _reduced.isReduced)(acc)) {
      acc = acc.deref();
      break;
    }
  }

  return acc;
};

const reduceIterable = (rfn, acc, xs) => {
  for (let x of xs) {
    acc = rfn(acc, x);

    if ((0, _reduced.isReduced)(acc)) {
      acc = acc.deref();
      break;
    }
  }

  return acc;
};
/**
 * Convenience helper for building a full `Reducer` using the identity
 * function (i.e. `(x) => x`) as completion step (true for 90% of all
 * bundled transducers).
 *
 * @param init init step of reducer
 * @param rfn reduction step of reducer
 */


const reducer = (init, rfn) => [init, acc => acc, rfn];

exports.reducer = reducer;

const $$reduce = (rfn, args) => {
  const n = args.length - 1;
  return (0, _checks.isIterable)(args[n]) ? args.length > 1 ? reduce(rfn.apply(null, args.slice(0, n)), args[n]) : reduce(rfn(), args[0]) : undefined;
};

exports.$$reduce = $$reduce;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/rfn/push.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.push = push;

var _reduce = require("../reduce");

function push(xs) {
  return xs ? [...xs] : (0, _reduce.reducer)(() => [], (acc, x) => (acc.push(x), acc));
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/iterator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterator = iterator;
exports.iterator1 = iterator1;
exports.$iter = void 0;

var _api = require("@thi.ng/api");

var _checks = require("@thi.ng/checks");

var _reduced = require("./reduced");

var _push = require("./rfn/push");

/**
 * Takes a transducer and input iterable. Returns iterator of
 * transformed results.
 *
 * @param xform
 * @param xs
 */
function* iterator(xform, xs) {
  const rfn = xform((0, _push.push)());
  const complete = rfn[1];
  const reduce = rfn[2];

  for (let x of xs) {
    const y = reduce([], x);

    if ((0, _reduced.isReduced)(y)) {
      yield* (0, _reduced.unreduced)(complete(y.deref()));
      return;
    }

    if (y.length) {
      yield* y;
    }
  }

  yield* (0, _reduced.unreduced)(complete([]));
}
/**
 * Optimized version of `iterator()` for transducers which are
 * guaranteed to:
 *
 * 1) Only produce none or a single result per input
 * 2) Do not require a `completion` reduction step
 *
 * @param xform
 * @param xs
 */


function* iterator1(xform, xs) {
  const reduce = xform([_api.NO_OP, _api.NO_OP, (_, x) => x])[2];

  for (let x of xs) {
    let y = reduce(_api.SEMAPHORE, x);

    if ((0, _reduced.isReduced)(y)) {
      y = (0, _reduced.unreduced)(y.deref());

      if (y !== _api.SEMAPHORE) {
        yield y;
      }

      return;
    }

    if (y !== _api.SEMAPHORE) {
      yield y;
    }
  }
}
/**
 * Helper function used by various transducers to wrap themselves as
 * transforming iterators. Delegates to `iterator1()` by default.
 *
 * @param xform
 * @param args
 * @param impl
 */


const $iter = (xform, args, impl = iterator1) => {
  const n = args.length - 1;
  return (0, _checks.isIterable)(args[n]) ? args.length > 1 ? impl(xform.apply(null, args.slice(0, n)), args[n]) : impl(xform(), args[0]) : undefined;
};

exports.$iter = $iter;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","./reduced":"../node_modules/@thi.ng/transducers/reduced.js","./rfn/push":"../node_modules/@thi.ng/transducers/rfn/push.js"}],"../node_modules/@thi.ng/transducers/func/compr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compR = void 0;

/**
 * Reducer composition helper. Takes existing reducer `rfn` (a 3-tuple)
 * and a reducing function `fn`. Returns a new reducer tuple of this
 * form:
 *
 * ```
 * [rfn[0], rfn[1], fn]
 * ```
 *
 * `rfn[2]` reduces values of type `B` into an accumulator of type `A`.
 * `fn` accepts values of type `C` and produces interim results of type
 * `B`, which are then (possibly) passed to the "inner" `rfn[2]`
 * function. Therefore the resulting reducer takes inputs of `C` and an
 * accumulator of type `A`.
 *
 * It is assumed that `fn` internally calls `rfn[2]` to pass its own
 * results for further processing by the nested reducer `rfn`.
 *
 * @param rfn
 * @param fn
 */
const compR = (rfn, fn) => [rfn[0], rfn[1], fn];

exports.compR = compR;
},{}],"../node_modules/@thi.ng/transducers/xform/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function map(fn, src) {
  return src ? (0, _iterator.iterator1)(map(fn), src) : rfn => {
    const r = rfn[2];
    return (0, _compr.compR)(rfn, (acc, x) => r(acc, fn(x)));
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/transduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transduce = transduce;

var _errors = require("@thi.ng/errors");

var _reduce = require("./reduce");

var _map = require("./xform/map");

function transduce(...args) {
  let acc, xs;

  switch (args.length) {
    case 4:
      xs = args[3];
      acc = args[2];
      break;

    case 3:
      xs = args[2];
      break;

    case 2:
      return (0, _map.map)(x => transduce(args[0], args[1], x));

    default:
      (0, _errors.illegalArity)(args.length);
  }

  return (0, _reduce.reduce)(args[0](args[1]), acc, xs);
}
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./reduce":"../node_modules/@thi.ng/transducers/reduce.js","./xform/map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/run.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _api = require("@thi.ng/api");

var _transduce = require("./transduce");

const NO_OP_REDUCER = [_api.NO_OP, _api.NO_OP, _api.NO_OP];

function run(tx, ...args) {
  if (args.length === 1) {
    (0, _transduce.transduce)(tx, NO_OP_REDUCER, args[0]);
  } else {
    const fx = args[0];
    (0, _transduce.transduce)(tx, [_api.NO_OP, _api.NO_OP, (_, x) => fx(x)], args[1]);
  }
}
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","./transduce":"../node_modules/@thi.ng/transducers/transduce.js"}],"../node_modules/@thi.ng/transducers/step.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.step = void 0;

var _reduced = require("./reduced");

var _push = require("./rfn/push");

/**
 * Single-step transducer execution wrapper.
 * Returns array if transducer produces multiple results
 * and undefined if there was no output. Else returns single
 * result value.
 *
 * Likewise, once a transducer has produced a final / reduced
 * value, all further invocations of the stepper function will
 * return undefined.
 *
 * ```
 * // single result
 * step(map(x => x * 10))(1);
 * // 10
 *
 * // multiple results
 * step(mapcat(x => [x, x + 1, x + 2]))(1)
 * // [ 1, 2, 3 ]
 *
 * // no result
 * f = step(filter((x) => !(x & 1)))
 * f(1); // undefined
 * f(2); // 2
 *
 * // reduced value termination
 * f = step(take(2));
 * f(1); // 1
 * f(1); // 1
 * f(1); // undefined
 * f(1); // undefined
 * ```
 *
 * @param tx
 */
const step = tx => {
  const [_, complete, reduce] = tx((0, _push.push)());
  _;
  let done = false;
  return x => {
    if (!done) {
      let acc = reduce([], x);
      done = (0, _reduced.isReduced)(acc);

      if (done) {
        acc = complete(acc.deref());
      }

      return acc.length === 1 ? acc[0] : acc.length > 0 ? acc : undefined;
    }
  };
};

exports.step = step;
},{"./reduced":"../node_modules/@thi.ng/transducers/reduced.js","./rfn/push":"../node_modules/@thi.ng/transducers/rfn/push.js"}],"../node_modules/@thi.ng/transducers/internal/mathop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__mathop = void 0;

var _reduce = require("../reduce");

const __mathop = (rfn, fn, initDefault, args) => {
  const res = (0, _reduce.$$reduce)(rfn, args);

  if (res !== undefined) {
    return res;
  }

  const init = args[0] || initDefault;
  return (0, _reduce.reducer)(() => init, fn);
};

exports.__mathop = __mathop;
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/add.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;

var _mathop = require("../internal/mathop");

function add(...args) {
  return (0, _mathop.__mathop)(add, (acc, x) => acc + x, 0, args);
}
},{"../internal/mathop":"../node_modules/@thi.ng/transducers/internal/mathop.js"}],"../node_modules/@thi.ng/transducers/rfn/assoc-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assocMap = assocMap;

var _reduce = require("../reduce");

function assocMap(xs) {
  return xs ? (0, _reduce.reduce)(assocMap(), xs) : (0, _reduce.reducer)(() => new Map(), (acc, [k, v]) => acc.set(k, v));
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/assoc-obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assocObj = assocObj;

var _reduce = require("../reduce");

function assocObj(xs) {
  return xs ? (0, _reduce.reduce)(assocObj(), xs) : (0, _reduce.reducer)(() => ({}), (acc, [k, v]) => (acc[k] = v, acc));
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/conj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conj = conj;

var _reduce = require("../reduce");

function conj(xs) {
  return xs ? (0, _reduce.reduce)(conj(), xs) : (0, _reduce.reducer)(() => new Set(), (acc, x) => acc.add(x));
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/count.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.count = count;

var _reduce = require("../reduce");

function count(...args) {
  const res = (0, _reduce.$$reduce)(count, args);

  if (res !== undefined) {
    return res;
  }

  let offset = args[0] || 0;
  let step = args[1] || 1;
  return (0, _reduce.reducer)(() => offset, (acc, _) => acc + step);
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/div.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.div = div;

var _reduce = require("../reduce");

function div(init, xs) {
  return xs ? (0, _reduce.reduce)(div(init), xs) : (0, _reduce.reducer)(() => init, (acc, x) => acc / x);
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/every.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.every = every;

var _reduce = require("../reduce");

var _reduced = require("../reduced");

function every(...args) {
  const res = (0, _reduce.$$reduce)(every, args);

  if (res !== undefined) {
    return res;
  }

  const pred = args[0];
  return (0, _reduce.reducer)(() => true, pred ? (acc, x) => pred(x) ? acc : (0, _reduced.reduced)(false) : (acc, x) => x ? acc : (0, _reduced.reduced)(false));
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/rfn/fill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fill = fill;
exports.fillN = fillN;

var _reduce = require("../reduce");

function fill(...args) {
  const res = (0, _reduce.$$reduce)(fill, args);

  if (res !== undefined) {
    return res;
  }

  let start = args[0] || 0;
  return (0, _reduce.reducer)(() => [], (acc, x) => (acc[start++] = x, acc));
}

function fillN(...args) {
  return fill(...args);
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/compose/comp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comp = comp;
exports.compL = compL;
exports.compI = void 0;

var _errors = require("@thi.ng/errors");

function comp(...fns) {
  let [a, b, c, d, e, f, g, h, i, j] = fns;

  switch (fns.length) {
    case 0:
      (0, _errors.illegalArity)(0);

    case 1:
      return a;

    case 2:
      return (...xs) => a(b(...xs));

    case 3:
      return (...xs) => a(b(c(...xs)));

    case 4:
      return (...xs) => a(b(c(d(...xs))));

    case 5:
      return (...xs) => a(b(c(d(e(...xs)))));

    case 6:
      return (...xs) => a(b(c(d(e(f(...xs))))));

    case 7:
      return (...xs) => a(b(c(d(e(f(g(...xs)))))));

    case 8:
      return (...xs) => a(b(c(d(e(f(g(h(...xs))))))));

    case 9:
      return (...xs) => a(b(c(d(e(f(g(h(i(...xs)))))))));

    case 10:
    default:
      const fn = (...xs) => a(b(c(d(e(f(g(h(i(j(...xs))))))))));

      return fns.length === 10 ? fn : comp(fn, ...fns.slice(10));
  }
}

function compL(...fns) {
  return comp.apply(null, fns.reverse());
}
/**
 * @deprecated renamed to `compL`
 */


const compI = compL;
exports.compI = compI;
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js"}],"../node_modules/@thi.ng/compose/complement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complement = complement;

function complement(f) {
  return (...xs) => !f(...xs);
}
},{}],"../node_modules/@thi.ng/compose/constantly.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constantly = void 0;

const constantly = x => () => x;

exports.constantly = constantly;
},{}],"../node_modules/@thi.ng/compose/delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delay = exports.delay = void 0;

const delay = body => new Delay(body);

exports.delay = delay;

class Delay {
  constructor(body) {
    this.body = body;
    this.realized = false;
  }

  deref() {
    if (!this.realized) {
      this.value = this.body();
      this.realized = true;
    }

    return this.value;
  }

  isRealized() {
    return this.realized;
  }

}

exports.Delay = Delay;
},{}],"../node_modules/@thi.ng/compose/delayed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayed = void 0;

const delayed = (x, t) => new Promise(resolve => setTimeout(() => resolve(x), t));

exports.delayed = delayed;
},{}],"../node_modules/@thi.ng/compose/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = void 0;

const identity = x => x;

exports.identity = identity;
},{}],"../node_modules/@thi.ng/compose/ifdef.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ifDef = void 0;

/**
 * Returns f(x) iff `x` is not null or undefined.
 *
 * @param f
 * @param x
 */
const ifDef = (f, x) => x != null ? f(x) : undefined;

exports.ifDef = ifDef;
},{}],"../node_modules/@thi.ng/compose/juxt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.juxt = juxt;

function juxt(...fns) {
  const [a, b, c, d, e, f, g, h] = fns;

  switch (fns.length) {
    case 1:
      return x => [a(x)];

    case 2:
      return x => [a(x), b(x)];

    case 3:
      return x => [a(x), b(x), c(x)];

    case 4:
      return x => [a(x), b(x), c(x), d(x)];

    case 5:
      return x => [a(x), b(x), c(x), d(x), e(x)];

    case 6:
      return x => [a(x), b(x), c(x), d(x), e(x), f(x)];

    case 7:
      return x => [a(x), b(x), c(x), d(x), e(x), f(x), g(x)];

    case 8:
      return x => [a(x), b(x), c(x), d(x), e(x), f(x), g(x), h(x)];

    default:
      return x => {
        let res = new Array(fns.length);

        for (let i = fns.length; --i >= 0;) {
          res[i] = fns[i](x);
        }

        return res;
      };
  }
}
},{}],"../node_modules/@thi.ng/compose/partial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partial = partial;
exports.foo = void 0;

var _errors = require("@thi.ng/errors");

function partial(fn, ...args) {
  let [a, b, c, d, e, f, g, h] = args;

  switch (args.length) {
    case 1:
      return (...xs) => fn(a, ...xs);

    case 2:
      return (...xs) => fn(a, b, ...xs);

    case 3:
      return (...xs) => fn(a, b, c, ...xs);

    case 4:
      return (...xs) => fn(a, b, c, d, ...xs);

    case 5:
      return (...xs) => fn(a, b, c, d, e, ...xs);

    case 6:
      return (...xs) => fn(a, b, c, d, e, f, ...xs);

    case 7:
      return (...xs) => fn(a, b, c, d, e, f, g, ...xs);

    case 8:
      return (...xs) => fn(a, b, c, d, e, f, g, h, ...xs);

    default:
      (0, _errors.illegalArgs)();
  }
}

const foo = partial((a, b) => a + b, "a");
exports.foo = foo;
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js"}],"../node_modules/@thi.ng/compose/thread-first.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.threadFirst = void 0;

/**
 * Takes an `init` value and a number of functions and/or function
 * tuples, consisting of: `[fn, ...args]`. Executes each function
 * (or tuple) with the return value of the previous expression inserted
 * as first argument, using `init` for the first expression.
 *
 * ```
 * const neg = (x) => -x;
 * const sub = (a, b) => a - b;
 * const div = (a, b) => a / b;
 *
 * threadFirst(
 *   5,
 *   neg,       // -5
 *   [sub, 20], // -5 - 20 = -25
 *   [div, 10]  // -25 / 10 = -2.5
 * );
 *
 * // -2.5
 * ```
 *
 * @see threadLast
 *
 * @param init
 * @param fns
 */
const threadFirst = (init, ...fns) => fns.reduce((acc, expr) => typeof expr === "function" ? expr(acc) : expr[0](acc, ...expr.slice(1)), init);

exports.threadFirst = threadFirst;
},{}],"../node_modules/@thi.ng/compose/thread-last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.threadLast = void 0;

/**
 * Takes an `init` value and a number of functions and/or function
 * tuples, consisting of: `[fn, ...args]`. Executes each function
 * (or tuple) with the return value of the previous expression inserted
 * as last argument, using `init` for the first expression.
 *
 * ```
 * const neg = (x) => -x;
 * const sub = (a, b) => a - b;
 * const div = (a, b) => a / b;
 *
 * threadLast(
 *   5,
 *   neg,       // -5
 *   [sub, 10], // 20 - (-5) = 25
 *   [div, 10]  // 10 / 25 = 0.4
 * );
 *
 * // 0.4
 * ```
 *
 * @see threadFirst
 *
 * @param init
 * @param fns
 */
const threadLast = (init, ...fns) => fns.reduce((acc, expr) => typeof expr === "function" ? expr(acc) : expr[0](...expr.slice(1), acc), init);

exports.threadLast = threadLast;
},{}],"../node_modules/@thi.ng/compose/trampoline.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trampoline = void 0;

/**
 * Takes a function returning either a no-arg function (thunk) or its
 * already realized (non-function) result. Re-executes thunk for as long
 * as it returns another function/thunk. Once a non-function result has
 * been produced, `trampoline` returns that value itself. If the final
 * result should be function, it needs to wrapped (e.g. as a 1-elem
 * array).
 *
 * This function should be used for non-stack consuming recursion. I.e.
 * a trampoline is a form of continuation passing style and only ever
 * consumes max. 2 extra stack frames, independent from recursion depth.
 *
 * ```
 * const countdown = (acc, x) =>
 *   x >= 0 ?
 *     () => (acc.push(x), countdown(acc, x-1)) :
 *     acc;
 *
 * trampoline(countdown([], 4))
 * // [ 4, 3, 2, 1, 0 ]
 *
 * trampoline(countdown([], -1))
 * // []
 * ```
 *
 * @param f
 */
const trampoline = f => {
  while (typeof f === "function") {
    f = f();
  }

  return f;
};

exports.trampoline = trampoline;
},{}],"../node_modules/@thi.ng/compose/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _comp = require("./comp");

Object.keys(_comp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _comp[key];
    }
  });
});

var _complement = require("./complement");

Object.keys(_complement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _complement[key];
    }
  });
});

var _constantly = require("./constantly");

Object.keys(_constantly).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constantly[key];
    }
  });
});

var _delay = require("./delay");

Object.keys(_delay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _delay[key];
    }
  });
});

var _delayed = require("./delayed");

Object.keys(_delayed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _delayed[key];
    }
  });
});

var _identity = require("./identity");

Object.keys(_identity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _identity[key];
    }
  });
});

var _ifdef = require("./ifdef");

Object.keys(_ifdef).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ifdef[key];
    }
  });
});

var _juxt = require("./juxt");

Object.keys(_juxt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _juxt[key];
    }
  });
});

var _partial = require("./partial");

Object.keys(_partial).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partial[key];
    }
  });
});

var _threadFirst = require("./thread-first");

Object.keys(_threadFirst).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _threadFirst[key];
    }
  });
});

var _threadLast = require("./thread-last");

Object.keys(_threadLast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _threadLast[key];
    }
  });
});

var _trampoline = require("./trampoline");

Object.keys(_trampoline).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _trampoline[key];
    }
  });
});
},{"./comp":"../node_modules/@thi.ng/compose/comp.js","./complement":"../node_modules/@thi.ng/compose/complement.js","./constantly":"../node_modules/@thi.ng/compose/constantly.js","./delay":"../node_modules/@thi.ng/compose/delay.js","./delayed":"../node_modules/@thi.ng/compose/delayed.js","./identity":"../node_modules/@thi.ng/compose/identity.js","./ifdef":"../node_modules/@thi.ng/compose/ifdef.js","./juxt":"../node_modules/@thi.ng/compose/juxt.js","./partial":"../node_modules/@thi.ng/compose/partial.js","./thread-first":"../node_modules/@thi.ng/compose/thread-first.js","./thread-last":"../node_modules/@thi.ng/compose/thread-last.js","./trampoline":"../node_modules/@thi.ng/compose/trampoline.js"}],"../node_modules/@thi.ng/transducers/internal/group-opts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__groupByOpts = void 0;

var _compose = require("@thi.ng/compose");

var _push = require("../rfn/push");

/**
 * Shared helper function for groupBy* reducers
 *
 * @param opts
 */
const __groupByOpts = opts => Object.assign({
  key: _compose.identity,
  group: (0, _push.push)()
}, opts);

exports.__groupByOpts = __groupByOpts;
},{"@thi.ng/compose":"../node_modules/@thi.ng/compose/index.js","../rfn/push":"../node_modules/@thi.ng/transducers/rfn/push.js"}],"../node_modules/@thi.ng/transducers/rfn/group-by-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupByMap = groupByMap;

var _groupOpts = require("../internal/group-opts");

var _reduce = require("../reduce");

function groupByMap(...args) {
  const res = (0, _reduce.$$reduce)(groupByMap, args);

  if (res !== undefined) {
    return res;
  }

  const opts = (0, _groupOpts.__groupByOpts)(args[0]);
  const [init, _, reduce] = opts.group;
  _; // ignore

  return (0, _reduce.reducer)(() => new Map(), (acc, x) => {
    const k = opts.key(x);
    return acc.set(k, acc.has(k) ? reduce(acc.get(k), x) : reduce(init(), x));
  });
}
},{"../internal/group-opts":"../node_modules/@thi.ng/transducers/internal/group-opts.js","../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/frequencies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frequencies = frequencies;

var _compose = require("@thi.ng/compose");

var _reduce = require("../reduce");

var _count = require("./count");

var _groupByMap = require("./group-by-map");

function frequencies(...args) {
  return (0, _reduce.$$reduce)(frequencies, args) || (0, _groupByMap.groupByMap)({
    key: args[0] || _compose.identity,
    group: (0, _count.count)()
  });
}
},{"@thi.ng/compose":"../node_modules/@thi.ng/compose/index.js","../reduce":"../node_modules/@thi.ng/transducers/reduce.js","./count":"../node_modules/@thi.ng/transducers/rfn/count.js","./group-by-map":"../node_modules/@thi.ng/transducers/rfn/group-by-map.js"}],"../node_modules/@thi.ng/transducers/rfn/group-by-obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupByObj = groupByObj;

var _groupOpts = require("../internal/group-opts");

var _reduce2 = require("../reduce");

function groupByObj(...args) {
  const res = (0, _reduce2.$$reduce)(groupByObj, args);

  if (res) {
    return res;
  }

  const opts = (0, _groupOpts.__groupByOpts)(args[0]);
  const [_init, _, _reduce] = opts.group;
  _; // ignore

  return (0, _reduce2.reducer)(() => ({}), (acc, x) => {
    const k = opts.key(x);
    acc[k] = acc[k] ? _reduce(acc[k], x) : _reduce(_init(), x);
    return acc;
  });
}
},{"../internal/group-opts":"../node_modules/@thi.ng/transducers/internal/group-opts.js","../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/group-binary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupBinary = void 0;

var _groupByObj = require("./group-by-obj");

var _push = require("./push");

const branchPred = (key, b, l, r) => x => key(x) & b ? r : l;
/**
 * Creates a bottom-up, unbalanced binary tree of desired depth and
 * choice of data structures. Any value can be indexed, as long as a
 * numeric representation (key) can be obtained. This numeric key is
 * produced by the supplied `key` function. IMPORTANT: the returned
 * values MUST be unsigned and less than the provided bit length (i.e.
 * `0 .. (2^bits) - 1` range).
 *
 * By default the tree is constructed using plain objects for branches,
 * with left branches stored as "l" and right ones as "r". The original
 * values are stored at the lowest tree level using a customizable
 * nested reducer. By default leaves are collected in arrays (using the
 * `push()` reducer), but any suitable reducer can be used (e.g.
 * `conj()` to collect values into sets).
 *
 * Index by lowest 4-bits of ID value:
 *
 * ```
 * tree = reduce(
 *   groupBinary(4, x => x.id & 0xf),
 *   [{id: 3}, {id: 8}, {id: 15}, {id: 0}]
 * )
 *
 * tree.l.l.l.l
 * // [ { id: 0 } ]
 * tree.r.r.r.r
 * // [ { id: 15 } ]
 * tree.l.l.r.r
 * // [ { id: 3 } ]
 * ```
 *
 * Collecting as array:
 *
 * ```
 * tree = reduce(
 *   groupBinary(4, identity, ()=>[], push(), 0, 1),
 *   [1,2,3,4,5,6,7]
 * )
 *
 * tree[0][1][0][1] // 0101 == 5 in binary
 * // [ 5 ]
 *
 * tree[0][1][1]    // 011* == branch
 * // [ [ 6 ], [ 7 ] ]
 * ```
 *
 * Using `frequencies` as leaf reducer:
 *
 * ```
 * tree = reduce(
 *   groupBinary(3, (x: string) => x.length, null, frequencies()),
 *   "aa bbb dddd ccccc bbb eeee fff".split(" ")
 * )
 * // [ [ undefined,
 * //     [ Map { 'aa' => 1 },
 * //       Map { 'bbb' => 2, 'fff' => 1 } ] ],
 * //   [ [ Map { 'dddd' => 1, 'eeee' => 1 },
 * //       Map { 'ccccc' => 1 } ] ] ]
 *
 * tree[0][1][1]
 * // Map { 'bbb' => 2, 'fff' => 1 }
 * ```
 *
 * @param bits index range (always from 0)
 * @param key key function
 * @param branch function to create a new branch container (object or
 * array)
 * @param leaf reducer for leaf collection
 * @param left key for storing left branches (e.g. `0` for arrays)
 * @param right key for storing right branches (e.g. `1` for arrays)
 */


const groupBinary = (bits, key, branch, leaf, left = "l", right = "r") => {
  const init = branch || (() => ({}));

  let rfn = (0, _groupByObj.groupByObj)({
    key: branchPred(key, 1, left, right),
    group: leaf || (0, _push.push)()
  });

  for (let i = 2, maxIndex = 1 << bits; i < maxIndex; i <<= 1) {
    rfn = (0, _groupByObj.groupByObj)({
      key: branchPred(key, i, left, right),
      group: [init, rfn[1], rfn[2]]
    });
  }

  return [init, rfn[1], rfn[2]];
};

exports.groupBinary = groupBinary;
},{"./group-by-obj":"../node_modules/@thi.ng/transducers/rfn/group-by-obj.js","./push":"../node_modules/@thi.ng/transducers/rfn/push.js"}],"../node_modules/@thi.ng/transducers/rfn/last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.last = last;

var _api = require("@thi.ng/api");

var _reduce = require("../reduce");

function last(xs) {
  return xs ? (0, _reduce.reduce)(last(), xs) : (0, _reduce.reducer)(_api.NO_OP, (_, x) => x);
}
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/compare/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareNumDesc = exports.compareNumAsc = exports.compare = void 0;

const compare = (a, b) => {
  if (a === b) {
    return 0;
  }

  if (a == null) {
    return b == null ? 0 : -1;
  }

  if (b == null) {
    return a == null ? 0 : 1;
  }

  if (typeof a.compare === "function") {
    return a.compare(b);
  }

  if (typeof b.compare === "function") {
    return -b.compare(a);
  }

  return a < b ? -1 : a > b ? 1 : 0;
};
/**
 * Numeric comparator (ascending order)
 *
 * @param a
 * @param b
 */


exports.compare = compare;

const compareNumAsc = (a, b) => a - b;
/**
 * Numeric comparator (descending order)
 *
 * @param a
 * @param b
 */


exports.compareNumAsc = compareNumAsc;

const compareNumDesc = (a, b) => b - a;

exports.compareNumDesc = compareNumDesc;
},{}],"../node_modules/@thi.ng/transducers/rfn/max-compare.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxCompare = maxCompare;

var _compare = require("@thi.ng/compare");

var _reduce = require("../reduce");

function maxCompare(...args) {
  const res = (0, _reduce.$$reduce)(maxCompare, args);

  if (res !== undefined) {
    return res;
  }

  const init = args[0];
  const cmp = args[1] || _compare.compare;
  return (0, _reduce.reducer)(init, (acc, x) => cmp(acc, x) >= 0 ? acc : x);
}
},{"@thi.ng/compare":"../node_modules/@thi.ng/compare/index.js","../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/max.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.max = max;

var _reduce = require("../reduce");

function max(xs) {
  return xs ? (0, _reduce.reduce)(max(), xs) : (0, _reduce.reducer)(() => -Infinity, (acc, x) => Math.max(acc, x));
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/mean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mean = mean;

var _reduce = require("../reduce");

function mean(xs) {
  let n = 1;
  return xs ? (0, _reduce.reduce)(mean(), xs) : [() => n = 0, acc => n > 1 ? acc / n : acc, (acc, x) => (n++, acc + x)];
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/min-compare.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minCompare = minCompare;

var _compare = require("@thi.ng/compare");

var _reduce = require("../reduce");

function minCompare(...args) {
  const res = (0, _reduce.$$reduce)(minCompare, args);

  if (res !== undefined) {
    return res;
  }

  const init = args[0];
  const cmp = args[1] || _compare.compare;
  return (0, _reduce.reducer)(init, (acc, x) => cmp(acc, x) <= 0 ? acc : x);
}
},{"@thi.ng/compare":"../node_modules/@thi.ng/compare/index.js","../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.min = min;

var _reduce = require("../reduce");

function min(xs) {
  return xs ? (0, _reduce.reduce)(min(), xs) : (0, _reduce.reducer)(() => Infinity, (acc, x) => Math.min(acc, x));
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/mul.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mul = mul;

var _mathop = require("../internal/mathop");

function mul(...args) {
  return (0, _mathop.__mathop)(mul, (acc, x) => acc * x, 1, args);
}
},{"../internal/mathop":"../node_modules/@thi.ng/transducers/internal/mathop.js"}],"../node_modules/@thi.ng/transducers/rfn/push-copy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushCopy = void 0;

var _reduce = require("../reduce");

const pushCopy = () => (0, _reduce.reducer)(() => [], (acc, x) => ((acc = acc.slice()).push(x), acc));

exports.pushCopy = pushCopy;
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/reductions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reductions = reductions;

var _reduce2 = require("../reduce");

var _reduced = require("../reduced");

function reductions(rfn, xs) {
  const [init, complete, _reduce] = rfn;
  return xs ? (0, _reduce2.reduce)(reductions(rfn), xs) : [() => [init()], acc => (acc[acc.length - 1] = complete(acc[acc.length - 1]), acc), (acc, x) => {
    const res = _reduce(acc[acc.length - 1], x);

    if ((0, _reduced.isReduced)(res)) {
      acc.push(res.deref());
      return (0, _reduced.reduced)(acc);
    }

    acc.push(res);
    return acc;
  }];
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/rfn/some.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.some = some;

var _reduce = require("../reduce");

var _reduced = require("../reduced");

function some(...args) {
  const res = (0, _reduce.$$reduce)(some, args);

  if (res !== undefined) {
    return res;
  }

  const pred = args[0];
  return (0, _reduce.reducer)(() => false, pred ? (acc, x) => pred(x) ? (0, _reduced.reduced)(true) : acc : (acc, x) => x ? (0, _reduced.reduced)(true) : acc);
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/rfn/str.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.str = str;

var _reduce = require("../reduce");

function str(sep, xs) {
  sep = sep || "";
  let first = true;
  return xs ? [...xs].join(sep) : (0, _reduce.reducer)(() => "", (acc, x) => (acc = first ? acc + x : acc + sep + x, first = false, acc));
}
},{"../reduce":"../node_modules/@thi.ng/transducers/reduce.js"}],"../node_modules/@thi.ng/transducers/rfn/sub.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = sub;

var _mathop = require("../internal/mathop");

function sub(...args) {
  return (0, _mathop.__mathop)(sub, (acc, x) => acc - x, 0, args);
}
},{"../internal/mathop":"../node_modules/@thi.ng/transducers/internal/mathop.js"}],"../node_modules/@thi.ng/transducers/xform/benchmark.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.benchmark = benchmark;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function benchmark(src) {
  return src ? (0, _iterator.iterator1)(benchmark(), src) : rfn => {
    const r = rfn[2];
    let prev = Date.now();
    return (0, _compr.compR)(rfn, (acc, _) => {
      const t = Date.now();
      const x = t - prev;
      prev = t;
      return r(acc, x);
    });
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/cat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cat = void 0;

var _compr = require("../func/compr");

var _reduced = require("../reduced");

/**
 * Transducer to concatenate iterable values. Iterates over each input
 * and emits individual values down stream, therefore removing one level
 * of nesting from the input. If, during processing, the transducer is
 * given a wrapped `reduced()` input iterable, it will still be
 * processed as normal, but then immediately triggers early termination
 * by wrapping its own result in `reduced()`. E.g. this behavior allows
 * a `mapcat()` user functions to benefit from `reduced` results.
 *
 * ```
 * [...iterator(comp(map((x) => [x, x]), cat()), [1, 2, 3, 4])]
 * // [ 1, 1, 2, 2, 3, 3, 4, 4 ]
 *
 * [...iterator(
 *   comp(
 *     mapIndexed((i, x) => [[i], [x, x]]),
 *     cat(),
 *     cat()
 *   ),
 *   "abc"
 * )]
 * // [ 0, 'a', 'a', 1, 'b', 'b', 2, 'c', 'c' ]
 *
 * [...mapcat((x)=>(x > 1 ? reduced([x, x]) : [x, x]), [1, 2, 3, 4])]
 * // [ 1, 1, 2, 2 ]
 * ```
 *
 * @see thi.ng/transducers/iter/concat
 * @see thi.ng/transducers/xform/mapcat
 */
const cat = () => rfn => {
  const r = rfn[2];
  return (0, _compr.compR)(rfn, (acc, x) => {
    if (x) {
      for (let y of (0, _reduced.unreduced)(x)) {
        acc = r(acc, y);

        if ((0, _reduced.isReduced)(acc)) {
          break;
        }
      }
    }

    return (0, _reduced.isReduced)(x) ? (0, _reduced.ensureReduced)(acc) : acc;
  });
};

exports.cat = cat;
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/converge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.converge = converge;

var _api = require("@thi.ng/api");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function converge(...args) {
  return (0, _iterator.$iter)(converge, args) || (rfn => {
    const r = rfn[2];
    const pred = args[0];
    let prev = _api.SEMAPHORE;
    let done = false;
    return (0, _compr.compR)(rfn, (acc, x) => {
      if (done || prev !== _api.SEMAPHORE && pred(prev, x)) {
        done = true;
        return (0, _reduced.ensureReduced)(r(acc, x));
      }

      prev = x;
      return r(acc, x);
    });
  });
}
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/iter/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
exports.Range = void 0;

var _reduced = require("../reduced");

function range(from, to, step) {
  return new Range(from, to, step);
}
/**
 * Simple class wrapper around given range interval and implementing
 * `Iterable` and `IReducible` interfaces, the latter is used to
 * accelerate use with `reduce`.
 */


class Range {
  constructor(from, to, step) {
    if (from === undefined) {
      from = 0;
      to = Infinity;
    } else if (to === undefined) {
      to = from;
      from = 0;
    }

    step = step === undefined ? from < to ? 1 : -1 : step;
    this.from = from;
    this.to = to;
    this.step = step;
  }

  *[Symbol.iterator]() {
    const step = this.step;
    const to = this.to;
    let from = this.from;

    if (step > 0) {
      while (from < to) {
        yield from;
        from += step;
      }
    } else if (step < 0) {
      while (from > to) {
        yield from;
        from += step;
      }
    }
  }

  $reduce(rfn, acc) {
    const step = this.step;

    if (step > 0) {
      for (let i = this.from, n = this.to; i < n && !(0, _reduced.isReduced)(acc); i += step) {
        acc = rfn(acc, i);
      }
    } else {
      for (let i = this.from, n = this.to; i > n && !(0, _reduced.isReduced)(acc); i += step) {
        acc = rfn(acc, i);
      }
    }

    return acc;
  }

}

exports.Range = Range;
},{"../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/iter/range2d.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range2d = range2d;

var _errors = require("@thi.ng/errors");

var _range = require("./range");

function* range2d(...args) {
  let fromX, toX, stepX;
  let fromY, toY, stepY;

  switch (args.length) {
    case 6:
      stepX = args[4];
      stepY = args[5];

    case 4:
      [fromX, toX, fromY, toY] = args;
      break;

    case 2:
      [toX, toY] = args;
      fromX = fromY = 0;
      break;

    default:
      (0, _errors.illegalArity)(args.length);
  }

  const rx = (0, _range.range)(fromX, toX, stepX);

  for (let y of (0, _range.range)(fromY, toY, stepY)) {
    for (let x of rx) {
      yield [x, y];
    }
  }
}
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./range":"../node_modules/@thi.ng/transducers/iter/range.js"}],"../node_modules/@thi.ng/transducers/iter/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = zip;

function* zip(...src) {
  const iters = src.map(s => s[Symbol.iterator]());

  while (true) {
    const tuple = [];

    for (let i of iters) {
      let v = i.next();

      if (v.done) {
        return;
      }

      tuple.push(v.value);
    }

    yield tuple;
  }
}
},{}],"../node_modules/@thi.ng/transducers/xform/convolve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convolve1d = convolve1d;
exports.convolve2d = convolve2d;
exports.buildKernel2d = exports.buildKernel1d = void 0;

var _errors = require("@thi.ng/errors");

var _range = require("../iter/range");

var _range2d = require("../iter/range2d");

var _zip = require("../iter/zip");

var _iterator = require("../iterator");

var _add = require("../rfn/add");

var _transduce = require("../transduce");

var _map = require("./map");

const buildKernel1d = (weights, w) => {
  const w2 = w >> 1;
  return [...(0, _zip.zip)(weights, (0, _range.range)(-w2, w2 + 1))];
};

exports.buildKernel1d = buildKernel1d;

const buildKernel2d = (weights, w, h) => {
  const w2 = w >> 1;
  const h2 = h >> 1;
  return [...(0, _zip.zip)(weights, (0, _range2d.range2d)(-w2, w2 + 1, -h2, h2 + 1))];
};

exports.buildKernel2d = buildKernel2d;

const kernelLookup1d = (src, x, width, wrap, border) => wrap ? ({
  0: w,
  1: ox
}) => {
  const xx = x < -ox ? width + ox : x >= width - ox ? ox - 1 : x + ox;
  return w * src[xx];
} : ({
  0: w,
  1: ox
}) => {
  return x < -ox || x >= width - ox ? border : w * src[x + ox];
};

const kernelLookup2d = (src, x, y, width, height, wrap, border) => wrap ? ({
  0: w,
  1: {
    0: ox,
    1: oy
  }
}) => {
  const xx = x < -ox ? width + ox : x >= width - ox ? ox - 1 : x + ox;
  const yy = y < -oy ? height + oy : y >= height - oy ? oy - 1 : y + oy;
  return w * src[yy * width + xx];
} : ({
  0: w,
  1: {
    0: ox,
    1: oy
  }
}) => {
  return x < -ox || y < -oy || x >= width - ox || y >= height - oy ? border : w * src[(y + oy) * width + x + ox];
};

const kernelError = () => (0, _errors.illegalArgs)(`no kernel or kernel config`);

function convolve1d(opts, indices) {
  if (indices) {
    return (0, _iterator.iterator1)(convolve1d(opts), indices);
  }

  const {
    src,
    width
  } = opts;
  const wrap = opts.wrap !== false;
  const border = opts.border || 0;
  const rfn = opts.reduce || _add.add;
  let kernel = opts.kernel;

  if (!kernel) {
    !(opts.weights && opts.kwidth) && kernelError();
    kernel = buildKernel1d(opts.weights, opts.kwidth);
  }

  return (0, _map.map)(p => (0, _transduce.transduce)((0, _map.map)(kernelLookup1d(src, p, width, wrap, border)), rfn(), kernel));
}

function convolve2d(opts, indices) {
  if (indices) {
    return (0, _iterator.iterator1)(convolve2d(opts), indices);
  }

  const {
    src,
    width,
    height
  } = opts;
  const wrap = opts.wrap !== false;
  const border = opts.border || 0;
  const rfn = opts.reduce || _add.add;
  let kernel = opts.kernel;

  if (!kernel) {
    !(opts.weights && opts.kwidth && opts.kheight) && kernelError();
    kernel = buildKernel2d(opts.weights, opts.kwidth, opts.kheight);
  }

  return (0, _map.map)(p => (0, _transduce.transduce)((0, _map.map)(kernelLookup2d(src, p[0], p[1], width, height, wrap, border)), rfn(), kernel));
}
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","../iter/range":"../node_modules/@thi.ng/transducers/iter/range.js","../iter/range2d":"../node_modules/@thi.ng/transducers/iter/range2d.js","../iter/zip":"../node_modules/@thi.ng/transducers/iter/zip.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../rfn/add":"../node_modules/@thi.ng/transducers/rfn/add.js","../transduce":"../node_modules/@thi.ng/transducers/transduce.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/dedupe.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dedupe = dedupe;

var _api = require("@thi.ng/api");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function dedupe(...args) {
  return (0, _iterator.$iter)(dedupe, args) || (rfn => {
    const r = rfn[2];
    const equiv = args[0];
    let prev = _api.SEMAPHORE;
    return (0, _compr.compR)(rfn, equiv ? (acc, x) => {
      acc = prev !== _api.SEMAPHORE && equiv(prev, x) ? acc : r(acc, x);
      prev = x;
      return acc;
    } : (acc, x) => {
      acc = prev === x ? acc : r(acc, x);
      prev = x;
      return acc;
    });
  });
}
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/delayed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayed = void 0;

var _compose = require("@thi.ng/compose");

var _map = require("./map");

/**
 * Yields transducer which wraps incoming values in promises, which each
 * resolve after specified delay time (in ms).
 *
 * **Only to be used in async contexts and NOT with `transduce`
 * directly.**
 *
 * @param t
 */
const delayed = t => (0, _map.map)(x => (0, _compose.delayed)(x, t));

exports.delayed = delayed;
},{"@thi.ng/compose":"../node_modules/@thi.ng/compose/index.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/distinct.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distinct = distinct;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function distinct(...args) {
  return (0, _iterator.$iter)(distinct, args) || (rfn => {
    const r = rfn[2];
    const opts = args[0] || {};
    const key = opts.key;

    const seen = (opts.cache || (() => new Set()))();

    return (0, _compr.compR)(rfn, key ? (acc, x) => {
      const k = key(x);
      return !seen.has(k) ? (seen.add(k), r(acc, x)) : acc;
    } : (acc, x) => !seen.has(x) ? (seen.add(x), r(acc, x)) : acc);
  });
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/throttle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function throttle(pred, src) {
  return src ? (0, _iterator.iterator1)(throttle(pred), src) : rfn => {
    const r = rfn[2];

    const _pred = pred();

    return (0, _compr.compR)(rfn, (acc, x) => _pred(x) ? r(acc, x) : acc);
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/drop-nth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropNth = dropNth;

var _throttle = require("./throttle");

var _iterator = require("../iterator");

function dropNth(n, src) {
  if (src) {
    return (0, _iterator.iterator1)(dropNth(n), src);
  }

  n = Math.max(0, n - 1);
  return (0, _throttle.throttle)(() => {
    let skip = n;
    return () => skip-- > 0 ? true : (skip = n, false);
  });
}
},{"./throttle":"../node_modules/@thi.ng/transducers/xform/throttle.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/drop-while.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropWhile = dropWhile;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function dropWhile(...args) {
  return (0, _iterator.$iter)(dropWhile, args) || (rfn => {
    const r = rfn[2];
    const pred = args[0];
    let ok = true;
    return (0, _compr.compR)(rfn, (acc, x) => (ok = ok && pred(x)) ? acc : r(acc, x));
  });
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/drop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drop = drop;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function drop(n, src) {
  return src ? (0, _iterator.iterator1)(drop(n), src) : rfn => {
    const r = rfn[2];
    let m = n;
    return (0, _compr.compR)(rfn, (acc, x) => m > 0 ? (m--, acc) : r(acc, x));
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/duplicate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicate = duplicate;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function duplicate(n = 1, src) {
  return src ? (0, _iterator.iterator)(duplicate(n), src) : rfn => {
    const r = rfn[2];
    return (0, _compr.compR)(rfn, (acc, x) => {
      for (let i = n; i >= 0 && !(0, _reduced.isReduced)(acc); i--) {
        acc = r(acc, x);
      }

      return acc;
    });
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;

var _iterator = require("../iterator");

var _compr = require("../func/compr");

function filter(pred, src) {
  return src ? (0, _iterator.iterator1)(filter(pred), src) : rfn => {
    const r = rfn[2];
    return (0, _compr.compR)(rfn, (acc, x) => pred(x) ? r(acc, x) : acc);
  };
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js"}],"../node_modules/@thi.ng/arrays/binary-search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearchNumeric = exports.binarySearch = void 0;

var _compare = require("@thi.ng/compare");

/**
 * Returns the supposed index of `x` in pre-sorted array-like collection
 * `buf`. If `x` can't be found, returns `-index-1`, representing the
 * negative of the index, were `x` to be inserted into `buf`. E.g if the
 * return value is -3, `x` would appear/insert at index 2.
 *
 * ```
 * binarySearch([2, 4, 6], 5);
 * // -3
 * ```
 *
 * The optional `key` function is used to obtain the actual sort value
 * of `x` and each array item (default: identity).
 *
 * The optional `cmp` comparator (default: thi.ng/compare) is then used
 * to identify the index of `x`. The sort order of `buf` MUST be
 * compatible with that of `cmp`.
 *
 * @param buf
 * @param x
 * @param key
 * @param cmp
 */
const binarySearch = (buf, x, key = x => x, cmp = _compare.compare) => {
  const kx = key(x);
  let low = 0;
  let high = buf.length - 1;

  while (low <= high) {
    const mid = low + high >>> 1;
    const c = cmp(key(buf[mid]), kx);

    if (c < 0) {
      low = mid + 1;
    } else if (c > 0) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -low - 1;
};
/**
 * Similar to `binarySearch()`, but optimized for numeric arrays and
 * supporting custom comparators (default: `compareNumAsc` from
 * thi.ng/compare pkg).
 *
 * @param buf
 * @param x
 * @param cmp
 */


exports.binarySearch = binarySearch;

const binarySearchNumeric = (buf, x, cmp = _compare.compareNumAsc) => {
  let low = 0;
  let high = buf.length - 1;

  while (low <= high) {
    const mid = low + high >>> 1;
    const c = cmp(buf[mid], x);

    if (c < 0) {
      low = mid + 1;
    } else if (c > 0) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -low - 1;
};

exports.binarySearchNumeric = binarySearchNumeric;
},{"@thi.ng/compare":"../node_modules/@thi.ng/compare/index.js"}],"../node_modules/@thi.ng/equiv/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equivObject = exports.equivMap = exports.equivSet = exports.equivArrayLike = exports.equiv = void 0;
const OBJP = Object.getPrototypeOf({});
const FN = "function";
const STR = "string";

const equiv = (a, b) => {
  let proto;

  if (a === b) {
    return true;
  }

  if (a != null) {
    if (typeof a.equiv === FN) {
      return a.equiv(b);
    }
  } else {
    return a == b;
  }

  if (b != null) {
    if (typeof b.equiv === FN) {
      return b.equiv(a);
    }
  } else {
    return a == b;
  }

  if (typeof a === STR || typeof b === STR) {
    return false;
  }

  if ((proto = Object.getPrototypeOf(a), proto == null || proto === OBJP) && (proto = Object.getPrototypeOf(b), proto == null || proto === OBJP)) {
    return equivObject(a, b);
  }

  if (typeof a !== FN && a.length !== undefined && typeof b !== FN && b.length !== undefined) {
    return equivArrayLike(a, b);
  }

  if (a instanceof Set && b instanceof Set) {
    return equivSet(a, b);
  }

  if (a instanceof Map && b instanceof Map) {
    return equivMap(a, b);
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  } // NaN


  return a !== a && b !== b;
};

exports.equiv = equiv;

const equivArrayLike = (a, b, _equiv = equiv) => {
  let l = a.length;

  if (l === b.length) {
    while (--l >= 0 && _equiv(a[l], b[l]));
  }

  return l < 0;
};

exports.equivArrayLike = equivArrayLike;

const equivSet = (a, b, _equiv = equiv) => a.size === b.size && _equiv([...a.keys()].sort(), [...b.keys()].sort());

exports.equivSet = equivSet;

const equivMap = (a, b, _equiv = equiv) => a.size === b.size && _equiv([...a].sort(), [...b].sort());

exports.equivMap = equivMap;

const equivObject = (a, b, _equiv = equiv) => {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (let k in a) {
    if (!b.hasOwnProperty(k) || !_equiv(a[k], b[k])) {
      return false;
    }
  }

  return true;
};

exports.equivObject = equivObject;
},{}],"../node_modules/@thi.ng/arrays/ends-with.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endsWith = void 0;

var _equiv = require("@thi.ng/equiv");

/**
 * Returns true if the last items of `buf` are the same items as in
 * `needle`. This means `buf` should have at least the same length as
 * `needle` for this to be true.
 *
 * By default, uses thi.ng/equiv for equality checking.
 *
 * @see startsWith
 *
 * @param buf
 * @param needle
 * @param equiv
 */
const endsWith = (buf, needle, equiv = _equiv.equiv) => {
  let i = buf.length;
  let j = needle.length;
  if (i < j) return false;

  while (--i, --j >= 0 && equiv(buf[i], needle[j])) {}

  return j < 0;
};

exports.endsWith = endsWith;
},{"@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js"}],"../node_modules/@thi.ng/arrays/ensure-iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureIterable = void 0;

var _errors = require("@thi.ng/errors");

/**
 * Attempts to obtain an iterator from `x` and throws error if `x` is
 * not iterable.
 *
 * @param x
 */
const ensureIterable = x => {
  (x == null || !x[Symbol.iterator]) && (0, _errors.illegalArgs)(`value is not iterable: ${x}`);
  return x;
};

exports.ensureIterable = ensureIterable;
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js"}],"../node_modules/@thi.ng/arrays/ensure-array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureArrayLike = exports.ensureArray = void 0;

var _checks = require("@thi.ng/checks");

var _ensureIterable = require("./ensure-iterable");

/**
 * Helper function to avoid unnecessary copying if `x` is already an
 * array. First checks if `x` is an array and if so returns it. Else
 * attempts to obtain an iterator from `x` and if successful collects it
 * as array and returns it. Throws error if `x` isn't iterable.
 *
 * @param x
 */
const ensureArray = x => (0, _checks.isArray)(x) ? x : [...(0, _ensureIterable.ensureIterable)(x)];
/**
 * Similar to `ensureArray()`, but for `ArrayLike` types.
 *
 * @see ensureArray
 *
 * @param x
 */


exports.ensureArray = ensureArray;

const ensureArrayLike = x => (0, _checks.isArrayLike)(x) ? x : [...(0, _ensureIterable.ensureIterable)(x)];

exports.ensureArrayLike = ensureArrayLike;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","./ensure-iterable":"../node_modules/@thi.ng/arrays/ensure-iterable.js"}],"../node_modules/@thi.ng/arrays/find.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findIndex = exports.find = void 0;

var _equiv2 = require("@thi.ng/equiv");

/**
 * Similar to `Array.find()`, but uses thi.ng/equiv as default
 * predicate.
 *
 * @param src
 * @param x
 * @param equiv
 */
const find = (src, x, equiv = _equiv2.equiv) => {
  const i = findIndex(src, x, equiv);
  return i !== -1 ? src[i] : undefined;
};
/**
 * Similar to `Array.findIndex()`, but uses thi.ng/equiv as default
 * predicate.
 *
 * @param src
 * @param x
 * @param equiv
 */


exports.find = find;

const findIndex = (src, x, equiv = _equiv2.equiv) => {
  for (let i = src.length; --i >= 0;) {
    if (equiv(x, src[i])) return i;
  }

  return -1;
};

exports.findIndex = findIndex;
},{"@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js"}],"../node_modules/@thi.ng/arrays/fuzzy-match.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fuzzyMatch = void 0;

var _equiv = require("@thi.ng/equiv");

/**
 * Performs a fuzzy search of `query` in `domain` and returns `true` if
 * successful.
 *
 * The optional `equiv` predicate can be used to customize
 * item equality checking. Uses @thi.ng/equiv by default.
 *
 * Adapted and generalized from:
 * https://github.com/bevacqua/fufuzzyzzysearch (MIT)
 *
 * @see thi.ng/transducers/xform/filterFuzzy
 *
 * @param domain
 * @param query
 * @param equiv
 */
const fuzzyMatch = (domain, query, equiv = _equiv.equiv) => {
  const nd = domain.length;
  const nq = query.length;

  if (nq > nd) {
    return false;
  }

  if (nq === nd) {
    return equiv(query, domain);
  }

  next: for (let i = 0, j = 0; i < nq; i++) {
    const q = query[i];

    while (j < nd) {
      if (equiv(domain[j++], q)) {
        continue next;
      }
    }

    return false;
  }

  return true;
};

exports.fuzzyMatch = fuzzyMatch;
},{"@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js"}],"../node_modules/@thi.ng/arrays/is-sorted.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSorted = void 0;

var _compare = require("@thi.ng/compare");

/**
 * Returns true if the given array and its elements in the selected
 * index range (entire array, by default) are in the order defined by
 * the given comparator (thi.ng/compare by default). Always returns
 * true, if effective index range (or array length) has less than two
 * elements. No bounds checking.
 *
 * ```
 * isSorted([3, 2, 1])
 * // false
 *
 * // w/ custom comparator
 * isSorted([3, 2, 1], (a, b) => b - a)
 * // true
 * ```
 *
 * @param arr
 * @param cmp
 * @param start
 * @param end
 */
const isSorted = (arr, cmp = _compare.compare, start = 0, end = arr.length) => {
  let prev = arr[start];

  while (++start < end) {
    const curr = arr[start];
    if (cmp(prev, curr) > 0) return false;
    prev = curr;
  }

  return true;
};

exports.isSorted = isSorted;
},{"@thi.ng/compare":"../node_modules/@thi.ng/compare/index.js"}],"../node_modules/@thi.ng/arrays/iterator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayIterator = arrayIterator;

/**
 * Returns iterator of nullable array w/ optional index range support
 * and/or reverse iteration order. The default range covers the entire
 * array.
 *
 * @remarks
 * If `start` > `end`, yields values in reverse order. No bounds
 * checking is performed.
 *
 * @param buf - array or null
 * @param start - start index
 * @param end - end index (excluded)
 */
function* arrayIterator(buf, start = 0, end) {
  if (!buf) return;
  start = start;
  end === undefined && (end = buf.length);
  const step = start <= end ? 1 : -1;

  for (; start !== end; start += step) {
    yield buf[start];
  }
}
},{}],"../node_modules/@thi.ng/arrays/peek.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.peek = void 0;

/**
 * Returns last element of given array or `undefined` if array is empty.
 *
 * @param x
 */
const peek = x => x[x.length - 1];

exports.peek = peek;
},{}],"../node_modules/@thi.ng/arrays/swap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiSwap = exports.swap = void 0;

/**
 * Swaps values at index `x`/`y` in given array.
 *
 * @param arr
 * @param x
 * @param y
 */
const swap = (arr, x, y) => {
  const t = arr[x];
  arr[x] = arr[y];
  arr[y] = t;
};
/**
 * Higher-order version of `swap` for swapping elements in multiple
 * arrays at once. The returned function takes the same args as `swap`,
 * and when called swaps 2 elements in the array given to that function
 * AND in the arrays given to `multiSwap` itself. Provides fast routes
 * for up to 3 extra arrays, then falls back to a loop-based approach.
 *
 * ```
 * a = [2, 1];
 * b = [20, 10];
 * c = [40, 30];
 *
 * ms = multiSwap(b, c);
 * ms(a, 0, 1);
 *
 * // a: [1, 2]
 * // b: [10, 20]
 * // c: [30, 40]
 * ```
 *
 * @param xs
 */


exports.swap = swap;

const multiSwap = (...xs) => {
  const [b, c, d] = xs;
  const n = xs.length;

  switch (n) {
    case 0:
      return swap;

    case 1:
      return (a, x, y) => {
        swap(a, x, y);
        swap(b, x, y);
      };

    case 2:
      return (a, x, y) => {
        swap(a, x, y);
        swap(b, x, y);
        swap(c, x, y);
      };

    case 3:
      return (a, x, y) => {
        swap(a, x, y);
        swap(b, x, y);
        swap(c, x, y);
        swap(d, x, y);
      };

    default:
      return (a, x, y) => {
        swap(a, x, y);

        for (let i = n; --i >= 0;) swap(xs[i], x, y);
      };
  }
};

exports.multiSwap = multiSwap;
},{}],"../node_modules/@thi.ng/arrays/quicksort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quickSort = quickSort;

var _compare = require("@thi.ng/compare");

var _swap2 = require("./swap");

// prettier-ignore
function quickSort(arr, _cmp = _compare.compare, _swap = _swap2.swap, start = 0, end = arr.length - 1) {
  if (start < end) {
    const pivot = arr[start + (end - start >> 1)];
    let s = start - 1;
    let e = end + 1;

    while (true) {
      do {
        s++;
      } while (_cmp(arr[s], pivot) < 0);

      do {
        e--;
      } while (_cmp(arr[e], pivot) > 0);

      if (s >= e) break;

      _swap(arr, s, e);
    }

    quickSort(arr, _cmp, _swap, start, e);
    quickSort(arr, _cmp, _swap, e + 1, end);
  }

  return arr;
}
},{"@thi.ng/compare":"../node_modules/@thi.ng/compare/index.js","./swap":"../node_modules/@thi.ng/arrays/swap.js"}],"../node_modules/@thi.ng/random/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ARandom = void 0;
const INV_MAX = 1 / 0xffffffff;

class ARandom {
  float(norm = 1) {
    return this.int() * INV_MAX * norm;
  }

  norm(norm = 1) {
    return this.int() * INV_MAX * norm * 2 - norm;
  }

  minmax(min, max) {
    return this.float() * (max - min) + min;
  }
  /**
   * Returns approx. normal distribution using CLT.
   *
   * https://en.wikipedia.org/wiki/Central_limit_theorem
   *
   * @param n
   * @param offset
   * @param scale
   */


  gaussian(n = 10, offset = -0.5, scale = 1) {
    let sum = 0;
    let m = n;

    while (m-- > 0) sum += this.float(scale);

    return sum / n + offset;
  }

}

exports.ARandom = ARandom;
},{}],"../node_modules/@thi.ng/random/smush32.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Smush32 = void 0;

var _api = require("./api");

// https://github.com/thi-ng/ct-head/blob/master/random.h
// https://gist.github.com/voidqk/d112165a26b45244a65298933c0349a4
const DEFAULT_SEED = 0xdecafbad;

class Smush32 extends _api.ARandom {
  constructor(seed = DEFAULT_SEED) {
    super();
    this.buffer = new Uint32Array([seed, 0]);
  }

  copy() {
    const gen = new Smush32();
    gen.buffer.set(this.buffer);
    return gen;
  }

  seed(s) {
    this.buffer.set([s, 0]);
    return this;
  }

  int() {
    const b = this.buffer;
    const m = 0x5bd1e995;
    const k = b[1]++ * m >>> 0;
    const s = b[0] = (k ^ k >> 24 ^ b[0] * m >>> 0) * m >>> 0;
    return (s ^ s >>> 13) >>> 0;
  }

}

exports.Smush32 = Smush32;
},{"./api":"../node_modules/@thi.ng/random/api.js"}],"../node_modules/@thi.ng/random/system.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SYSTEM = exports.SystemRandom = void 0;

var _api = require("./api");

const random = Math.random;

class SystemRandom extends _api.ARandom {
  int() {
    return random() * 0xffffffff >>> 0;
  }

  float(norm = 1) {
    return random() * norm;
  }

}

exports.SystemRandom = SystemRandom;
const SYSTEM = new SystemRandom();
exports.SYSTEM = SYSTEM;
},{"./api":"../node_modules/@thi.ng/random/api.js"}],"../node_modules/@thi.ng/random/xorshift128.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XorShift128 = void 0;

var _api = require("./api");

// https://en.wikipedia.org/wiki/Xorshift
const DEFAULT_SEED = [0xdecafbad, 0x2fa9d75b, 0xe41f67e3, 0x5c83ec1a];

class XorShift128 extends _api.ARandom {
  constructor(seed = DEFAULT_SEED) {
    super();
    this.buffer = new Uint32Array(4);
    this.seed(seed);
  }

  copy() {
    return new XorShift128(this.buffer);
  }

  bytes() {
    return new Uint8Array(this.buffer.buffer);
  }

  seed(seed) {
    this.buffer.set(seed);
    return this;
  }

  int() {
    const s = this.buffer;
    let t = s[3];
    let w;
    t ^= t << 11;
    t ^= t >>> 8;
    s[3] = s[2];
    s[2] = s[1];
    w = s[1] = s[0];
    return s[0] = (t ^ w ^ w >>> 19) >>> 0;
  }

}

exports.XorShift128 = XorShift128;
},{"./api":"../node_modules/@thi.ng/random/api.js"}],"../node_modules/@thi.ng/random/xorwow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XorWow = void 0;

var _api = require("./api");

// https://en.wikipedia.org/wiki/Xorshift#xorwow
const DEFAULT_SEED = [0xdecafbad, 0x2fa9d75b, 0xe41f67e3, 0x5c83ec1a, 0xf69a5c71];

class XorWow extends _api.ARandom {
  constructor(seed = DEFAULT_SEED) {
    super();
    this.buffer = new Uint32Array(5);
    this.seed(seed);
  }

  copy() {
    return new XorWow(this.buffer);
  }

  seed(seed) {
    this.buffer.set(seed);
    return this;
  }

  bytes() {
    return new Uint8Array(this.buffer.buffer);
  }

  int() {
    const s = this.buffer;
    let t = s[3];
    let w;
    t ^= t >>> 2;
    t ^= t << 1;
    s[3] = s[2];
    s[2] = s[1];
    w = s[1] = s[0];
    t ^= w;
    t ^= w << 4;
    s[0] = t;
    return t + (s[4] += 0x587c5) >>> 0;
  }

}

exports.XorWow = XorWow;
},{"./api":"../node_modules/@thi.ng/random/api.js"}],"../node_modules/@thi.ng/random/xsadd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XsAdd = void 0;

var _api = require("./api");

// https://github.com/MersenneTwister-Lab/XSadd/blob/master/xsadd.h
const DEFAULT_SEED = 0xdecafbad;

class XsAdd extends _api.ARandom {
  constructor(seed = DEFAULT_SEED) {
    super();
    this.buffer = new Uint32Array(4);
    this.seed(seed);
  }

  bytes() {
    return new Uint8Array(this.buffer.buffer);
  }

  copy() {
    const gen = new XsAdd();
    gen.buffer.set(this.buffer);
    return gen;
  }

  seed(seed) {
    const s = this.buffer;
    s.set([seed, 0, 0, 0]);

    for (let j = 0, i = 1; i < 8; j = i++) {
      let x = (s[j & 3] ^ s[j & 3] >>> 30) >>> 0;
      x = 0x8965 * x + ((0x6c07 * x & 0xffff) << 16) >>> 0;
      s[i & 3] ^= i + x >>> 0;
    }

    return this;
  }

  int() {
    const s = this.buffer;
    let t = s[0];
    t ^= t << 15;
    t ^= t >>> 18;
    t ^= s[3] << 11;
    s[0] = s[1];
    s[1] = s[2];
    s[2] = s[3];
    s[3] = t;
    return t + s[2] >>> 0;
  }

}

exports.XsAdd = XsAdd;
},{"./api":"../node_modules/@thi.ng/random/api.js"}],"../node_modules/@thi.ng/random/random-id.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomID = void 0;

var _system = require("./system");

/**
 * Generates and returns a random string of `len` characters (default
 * 4), plus optional given `prefix` and using only provided `syms`
 * characters (default lowercase a-z).
 *
 * ```
 * randomID()
 * "qgdt"
 *
 * randomID(8, "id-", "0123456789ABCDEF")
 * "id-94EF6E1A"
 * ```
 *
 * @param len
 * @param prefix
 * @param syms
 * @param rnd
 */
const randomID = (len = 4, prefix = "", syms = "abcdefghijklmnopqrstuvwxyz", rnd = _system.SYSTEM) => {
  for (const n = syms.length; --len >= 0;) {
    prefix += syms[rnd.float(n) | 0];
  }

  return prefix;
};

exports.randomID = randomID;
},{"./system":"../node_modules/@thi.ng/random/system.js"}],"../node_modules/@thi.ng/random/weighted-random.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weightedRandom = void 0;

var _api = require("@thi.ng/api");

var _system = require("./system");

/**
 * Returns a no-arg function which produces a random choice of given
 * weighted `choices` and using given `IRandom` instance (default:
 * `SYSTEM`). If `weights` are given, it must be the same size as
 * `choices`. If omitted, each choice will have same probability.
 *
 * https://www.electricmonk.nl/log/2009/12/23/weighted-random-distribution/
 *
 * @param choices
 * @param weights
 */
const weightedRandom = (choices, weights, rnd = _system.SYSTEM) => {
  const n = choices.length;
  (0, _api.assert)(n > 0, "no choices given");
  const opts = choices.map(weights ? (x, i) => [x, weights[i]] : x => [x, 1]).sort((a, b) => b[1] - a[1]);
  const total = opts.reduce((acc, o) => acc + o[1], 0);
  (0, _api.assert)(total > 0, "no choices given");
  return () => {
    const r = rnd.float(total);
    let sum = total;

    for (let i = 0; i < n; i++) {
      sum -= opts[i][1];

      if (sum <= r) {
        return opts[i][0];
      }
    }

    return undefined;
  };
};

exports.weightedRandom = weightedRandom;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","./system":"../node_modules/@thi.ng/random/system.js"}],"../node_modules/@thi.ng/random/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _smush = require("./smush32");

Object.keys(_smush).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _smush[key];
    }
  });
});

var _system = require("./system");

Object.keys(_system).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _system[key];
    }
  });
});

var _xorshift = require("./xorshift128");

Object.keys(_xorshift).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _xorshift[key];
    }
  });
});

var _xorwow = require("./xorwow");

Object.keys(_xorwow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _xorwow[key];
    }
  });
});

var _xsadd = require("./xsadd");

Object.keys(_xsadd).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _xsadd[key];
    }
  });
});

var _randomId = require("./random-id");

Object.keys(_randomId).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _randomId[key];
    }
  });
});

var _weightedRandom = require("./weighted-random");

Object.keys(_weightedRandom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _weightedRandom[key];
    }
  });
});
},{"./api":"../node_modules/@thi.ng/random/api.js","./smush32":"../node_modules/@thi.ng/random/smush32.js","./system":"../node_modules/@thi.ng/random/system.js","./xorshift128":"../node_modules/@thi.ng/random/xorshift128.js","./xorwow":"../node_modules/@thi.ng/random/xorwow.js","./xsadd":"../node_modules/@thi.ng/random/xsadd.js","./random-id":"../node_modules/@thi.ng/random/random-id.js","./weighted-random":"../node_modules/@thi.ng/random/weighted-random.js"}],"../node_modules/@thi.ng/arrays/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffle = exports.shuffleRange = void 0;

var _api = require("@thi.ng/api");

var _random = require("@thi.ng/random");

/**
 * Shuffles the items in the given index range of array `buf` using
 * Fisher-yates and optional `rnd` PRNG. If neither `start` / `end` are
 * given, the entire array will be shuffled. Mutates original array.
 *
 * @param buf
 * @param n
 * @param rnd
 */
const shuffleRange = (buf, start = 0, end = buf.length, rnd = _random.SYSTEM) => {
  (0, _api.assert)(start >= 0 && end >= start && end <= buf.length, `illegal range ${start}..${end}`);
  let n = end - start;
  const l = n;

  if (l > 1) {
    while (--n >= 0) {
      const a = start + rnd.float(l) | 0;
      const b = start + rnd.float(l) | 0;
      const t = buf[a];
      buf[a] = buf[b];
      buf[b] = t;
    }
  }

  return buf;
};
/**
 * Applies `shuffleRange()` to the given array. If `n` is given, only
 * the first `n` items are shuffled. Mutates original array.
 *
 * @see shuffleRange
 *
 * @param buf
 * @param n
 * @param rnd
 */


exports.shuffleRange = shuffleRange;

const shuffle = (buf, n = buf.length, rnd = _random.SYSTEM) => shuffleRange(buf, 0, n, rnd);

exports.shuffle = shuffle;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/random":"../node_modules/@thi.ng/random/index.js"}],"../node_modules/@thi.ng/arrays/starts-with.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startsWith = void 0;

var _equiv = require("@thi.ng/equiv");

/**
 * Returns true if the first items of `buf` are the same items as in
 * `needle`. This means `buf` should have at least the same length as
 * `needle` for this to be true.
 *
 * By default, uses thi.ng/equiv for equality checking.
 *
 * @see endsWith
 *
 * @param buf
 * @param needle
 * @param equiv
 */
const startsWith = (buf, needle, equiv = _equiv.equiv) => {
  let i = buf.length;
  let j = needle.length;
  if (i < j) return false;

  while (-j >= 0 && equiv(buf[j], needle[j])) {}

  return j < 0;
};

exports.startsWith = startsWith;
},{"@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js"}],"../node_modules/@thi.ng/arrays/swizzle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swizzle = void 0;

/**
 * Returns optimized function to immutably select, repeat, reshape and /
 * or reorder array / object values in the specified index order. Fast
 * paths for up to 8 indices are provided, before a loop based approach
 * is used.
 *
 * ```
 * swizzle([0, 0, 0])([1, 2, 3, 4])    // [ 1, 1, 1 ]
 * swizzle([1, 1, 3, 3])([1, 2, 3, 4]) // [ 2, 2, 4, 4 ]
 * swizzle([2, 0])([1, 2, 3])          // [ 3, 1 ]
 * ```
 *
 * Objects can be used as input to the generated function, but the
 * result will always be in array form.
 *
 * ```
 * swizzle(["a", "c", "b"])({a: 1, b: 2, c: 3}) // [ 1, 3, 2 ]
 * ```
 *
 * @param order indices
 */
const swizzle = order => {
  const [a, b, c, d, e, f, g, h] = order;

  switch (order.length) {
    case 0:
      return () => [];

    case 1:
      return x => [x[a]];

    case 2:
      return x => [x[a], x[b]];

    case 3:
      return x => [x[a], x[b], x[c]];

    case 4:
      return x => [x[a], x[b], x[c], x[d]];

    case 5:
      return x => [x[a], x[b], x[c], x[d], x[e]];

    case 6:
      return x => [x[a], x[b], x[c], x[d], x[e], x[f]];

    case 7:
      return x => [x[a], x[b], x[c], x[d], x[e], x[f], x[g]];

    case 8:
      return x => [x[a], x[b], x[c], x[d], x[e], x[f], x[g], x[h]];

    default:
      return x => {
        const res = [];

        for (let i = order.length; --i >= 0;) {
          res[i] = x[order[i]];
        }

        return res;
      };
  }
};

exports.swizzle = swizzle;
},{}],"../node_modules/@thi.ng/arrays/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _binarySearch = require("./binary-search");

Object.keys(_binarySearch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _binarySearch[key];
    }
  });
});

var _endsWith = require("./ends-with");

Object.keys(_endsWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _endsWith[key];
    }
  });
});

var _ensureArray = require("./ensure-array");

Object.keys(_ensureArray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ensureArray[key];
    }
  });
});

var _ensureIterable = require("./ensure-iterable");

Object.keys(_ensureIterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ensureIterable[key];
    }
  });
});

var _find = require("./find");

Object.keys(_find).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _find[key];
    }
  });
});

var _fuzzyMatch = require("./fuzzy-match");

Object.keys(_fuzzyMatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fuzzyMatch[key];
    }
  });
});

var _isSorted = require("./is-sorted");

Object.keys(_isSorted).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isSorted[key];
    }
  });
});

var _iterator = require("./iterator");

Object.keys(_iterator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterator[key];
    }
  });
});

var _peek = require("./peek");

Object.keys(_peek).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _peek[key];
    }
  });
});

var _quicksort = require("./quicksort");

Object.keys(_quicksort).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _quicksort[key];
    }
  });
});

var _shuffle = require("./shuffle");

Object.keys(_shuffle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _shuffle[key];
    }
  });
});

var _startsWith = require("./starts-with");

Object.keys(_startsWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _startsWith[key];
    }
  });
});

var _swap = require("./swap");

Object.keys(_swap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swap[key];
    }
  });
});

var _swizzle = require("./swizzle");

Object.keys(_swizzle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swizzle[key];
    }
  });
});
},{"./binary-search":"../node_modules/@thi.ng/arrays/binary-search.js","./ends-with":"../node_modules/@thi.ng/arrays/ends-with.js","./ensure-array":"../node_modules/@thi.ng/arrays/ensure-array.js","./ensure-iterable":"../node_modules/@thi.ng/arrays/ensure-iterable.js","./find":"../node_modules/@thi.ng/arrays/find.js","./fuzzy-match":"../node_modules/@thi.ng/arrays/fuzzy-match.js","./is-sorted":"../node_modules/@thi.ng/arrays/is-sorted.js","./iterator":"../node_modules/@thi.ng/arrays/iterator.js","./peek":"../node_modules/@thi.ng/arrays/peek.js","./quicksort":"../node_modules/@thi.ng/arrays/quicksort.js","./shuffle":"../node_modules/@thi.ng/arrays/shuffle.js","./starts-with":"../node_modules/@thi.ng/arrays/starts-with.js","./swap":"../node_modules/@thi.ng/arrays/swap.js","./swizzle":"../node_modules/@thi.ng/arrays/swizzle.js"}],"../node_modules/@thi.ng/transducers/xform/filter-fuzzy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterFuzzy = filterFuzzy;

var _arrays = require("@thi.ng/arrays");

var _iterator = require("../iterator");

var _filter = require("./filter");

function filterFuzzy(...args) {
  const iter = args.length > 1 && (0, _iterator.$iter)(filterFuzzy, args);

  if (iter) {
    return iter;
  }

  const query = args[0];
  const {
    key,
    equiv
  } = args[1] || {};
  return (0, _filter.filter)(x => (0, _arrays.fuzzyMatch)(key != null ? key(x) : x, query, equiv));
}
},{"@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./filter":"../node_modules/@thi.ng/transducers/xform/filter.js"}],"../node_modules/@thi.ng/transducers/xform/flatten-with.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenWith = flattenWith;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function flattenWith(fn, src) {
  return src ? (0, _iterator.iterator)(flattenWith(fn), src) : rfn => {
    const reduce = rfn[2];

    const flatten = (acc, x) => {
      const xx = fn(x);

      if (xx) {
        for (let y of xx) {
          acc = flatten(acc, y);

          if ((0, _reduced.isReduced)(acc)) {
            break;
          }
        }

        return acc;
      }

      return reduce(acc, x);
    };

    return (0, _compr.compR)(rfn, flatten);
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/flatten.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = flatten;

var _flattenWith = require("./flatten-with");

function flatten(src) {
  return (0, _flattenWith.flattenWith)(x => x != null && x[Symbol.iterator] && typeof x !== "string" ? x : undefined, src);
}
},{"./flatten-with":"../node_modules/@thi.ng/transducers/xform/flatten-with.js"}],"../node_modules/@thi.ng/transducers/xform/map-indexed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapIndexed = mapIndexed;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function mapIndexed(...args) {
  return (0, _iterator.$iter)(mapIndexed, args) || (rfn => {
    const r = rfn[2];
    const fn = args[0];
    let i = args[1] || 0;
    return (0, _compr.compR)(rfn, (acc, x) => r(acc, fn(i++, x)));
  });
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/indexed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexed = indexed;

var _iterator = require("../iterator");

var _mapIndexed = require("./map-indexed");

function indexed(...args) {
  const iter = (0, _iterator.$iter)(indexed, args);

  if (iter) {
    return iter;
  }

  const from = args[0] || 0;
  return (0, _mapIndexed.mapIndexed)((i, x) => [from + i, x]);
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map-indexed":"../node_modules/@thi.ng/transducers/xform/map-indexed.js"}],"../node_modules/@thi.ng/transducers/xform/interleave.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interleave = interleave;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function interleave(sep, src) {
  return src ? (0, _iterator.iterator)(interleave(sep), src) : rfn => {
    const r = rfn[2];

    const _sep = typeof sep === "function" ? sep : () => sep;

    return (0, _compr.compR)(rfn, (acc, x) => {
      acc = r(acc, _sep());
      return (0, _reduced.isReduced)(acc) ? acc : r(acc, x);
    });
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/func/comp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comp = comp;

var _compose = require("@thi.ng/compose");

function comp(...fns) {
  return _compose.comp.apply(null, fns);
}
},{"@thi.ng/compose":"../node_modules/@thi.ng/compose/index.js"}],"../node_modules/@thi.ng/transducers/iter/norm-range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normRange = normRange;

/**
 * Yields sequence of `n+1` monotonically increasing numbers in the
 * closed interval (0.0 .. 1.0). If `n <= 0`, yields nothing.
 *
 * ```
 * [...normRange(4)]
 * // [0, 0.25, 0.5, 0.75, 1.0]
 * ```
 *
 * @param n number of steps
 * @param inclLast include last value (i.e. `1.0`)
 */
function* normRange(n, inclLast = true) {
  if (n > 0) {
    for (let i = 0, m = inclLast ? n + 1 : n; i < m; i++) {
      yield i / n;
    }
  }
}
},{}],"../node_modules/@thi.ng/transducers/xform/mapcat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapcat = mapcat;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _cat = require("./cat");

var _map = require("./map");

function mapcat(fn, src) {
  return src ? (0, _iterator.iterator)(mapcat(fn), src) : (0, _comp.comp)((0, _map.map)(fn), (0, _cat.cat)());
}
},{"../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./cat":"../node_modules/@thi.ng/transducers/xform/cat.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/partition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partition = partition;

var _iterator = require("../iterator");

function partition(...args) {
  const iter = (0, _iterator.$iter)(partition, args, _iterator.iterator);

  if (iter) {
    return iter;
  }

  let size = args[0],
      all,
      step;

  if (typeof args[1] == "number") {
    step = args[1];
    all = args[2];
  } else {
    step = size;
    all = args[1];
  }

  return ([init, complete, reduce]) => {
    let buf = [];
    let skip = 0;
    return [init, acc => {
      if (all && buf.length > 0) {
        acc = reduce(acc, buf);
        buf = [];
      }

      return complete(acc);
    }, (acc, x) => {
      if (skip <= 0) {
        if (buf.length < size) {
          buf.push(x);
        }

        if (buf.length === size) {
          acc = reduce(acc, buf);
          buf = step < size ? buf.slice(step) : [];
          skip = step - size;
        }
      } else {
        skip--;
      }

      return acc;
    }];
  };
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/interpolate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolate = interpolate;

var _comp = require("../func/comp");

var _normRange = require("../iter/norm-range");

var _iterator = require("../iterator");

var _map = require("./map");

var _mapcat = require("./mapcat");

var _partition = require("./partition");

// prettier-ignore
function interpolate(fn, window, n, src) {
  return src ? (0, _iterator.iterator)(interpolate(fn, window, n), src) : (0, _comp.comp)((0, _partition.partition)(window, 1), (0, _mapcat.mapcat)(chunk => (0, _map.map)(t => fn(chunk, t), (0, _normRange.normRange)(n, false))));
}
},{"../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../iter/norm-range":"../node_modules/@thi.ng/transducers/iter/norm-range.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js","./mapcat":"../node_modules/@thi.ng/transducers/xform/mapcat.js","./partition":"../node_modules/@thi.ng/transducers/xform/partition.js"}],"../node_modules/@thi.ng/math/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Crossing = exports.EPS = exports.SIXTH = exports.TWO_THIRD = exports.THIRD = exports.SQRT2_3 = exports.SQRT2_2 = exports.SQRT3 = exports.SQRT2 = exports.PHI = exports.RAD2DEG = exports.DEG2RAD = exports.INV_HALF_PI = exports.INV_TAU = exports.INV_PI = exports.SIXTH_PI = exports.QUARTER_PI = exports.THIRD_PI = exports.HALF_PI = exports.TAU = exports.PI = void 0;
const PI = Math.PI;
exports.PI = PI;
const TAU = PI * 2;
exports.TAU = TAU;
const HALF_PI = PI / 2;
exports.HALF_PI = HALF_PI;
const THIRD_PI = PI / 3;
exports.THIRD_PI = THIRD_PI;
const QUARTER_PI = PI / 4;
exports.QUARTER_PI = QUARTER_PI;
const SIXTH_PI = PI / 6;
exports.SIXTH_PI = SIXTH_PI;
const INV_PI = 1 / PI;
exports.INV_PI = INV_PI;
const INV_TAU = 1 / TAU;
exports.INV_TAU = INV_TAU;
const INV_HALF_PI = 1 / HALF_PI;
exports.INV_HALF_PI = INV_HALF_PI;
const DEG2RAD = PI / 180;
exports.DEG2RAD = DEG2RAD;
const RAD2DEG = 180 / PI;
exports.RAD2DEG = RAD2DEG;
const PHI = (1 + Math.sqrt(5)) / 2;
exports.PHI = PHI;
const SQRT2 = Math.SQRT2;
exports.SQRT2 = SQRT2;
const SQRT3 = Math.sqrt(3);
exports.SQRT3 = SQRT3;
const SQRT2_2 = SQRT2 / 2;
exports.SQRT2_2 = SQRT2_2;
const SQRT2_3 = SQRT3 / 2;
exports.SQRT2_3 = SQRT2_3;
const THIRD = 1 / 3;
exports.THIRD = THIRD;
const TWO_THIRD = 2 / 3;
exports.TWO_THIRD = TWO_THIRD;
const SIXTH = 1 / 6;
exports.SIXTH = SIXTH;
let EPS = 1e-6;
exports.EPS = EPS;
var Crossing;
exports.Crossing = Crossing;

(function (Crossing) {
  /**
   * lines A & B are equal
   */
  Crossing[Crossing["EQUAL"] = 0] = "EQUAL";
  /**
   * lines A & B are flat (all same values)
   */

  Crossing[Crossing["FLAT"] = 1] = "FLAT";
  /**
   * line A crossed under B
   */

  Crossing[Crossing["UNDER"] = 2] = "UNDER";
  /**
   * line A crossed over B
   */

  Crossing[Crossing["OVER"] = 3] = "OVER";
  Crossing[Crossing["OTHER"] = 4] = "OTHER";
})(Crossing || (exports.Crossing = Crossing = {}));
},{}],"../node_modules/@thi.ng/math/abs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = exports.absDiff = void 0;

var _api = require("./api");

const absDiff = (x, y) => Math.abs(x - y);

exports.absDiff = absDiff;

const sign = (x, eps = _api.EPS) => x > eps ? 1 : x < -eps ? -1 : 0;

exports.sign = sign;
},{"./api":"../node_modules/@thi.ng/math/api.js"}],"../node_modules/@thi.ng/math/angle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastSin = exports.fastCos = exports.normCos = exports.loc = exports.cot = exports.sec = exports.csc = exports.rad = exports.deg = exports.quadrant = exports.atan2Abs = exports.angleDist = exports.absInnerAngle = exports.absTheta = exports.cossin = exports.sincos = void 0;

var _api = require("./api");

/**
 * Returns vector of `[sin(theta)*n, cos(theta)*n]`.
 *
 * @param theta
 * @param n
 */
const sincos = (theta, n = 1) => [Math.sin(theta) * n, Math.cos(theta) * n];
/**
 * Returns vector of `[cos(theta)*n, sin(theta)*n]`.
 *
 * @param theta
 * @param n
 */


exports.sincos = sincos;

const cossin = (theta, n = 1) => [Math.cos(theta) * n, Math.sin(theta) * n];
/**
 * Projects `theta` into [0 .. 2π] interval.
 *
 * @param theta
 */


exports.cossin = cossin;

const absTheta = theta => (theta %= _api.TAU, theta < 0 ? _api.TAU + theta : theta);

exports.absTheta = absTheta;

const absInnerAngle = theta => (theta = Math.abs(theta), theta > _api.PI ? _api.TAU - theta : theta);
/**
 * Returns smallest absolute angle difference between `a` and `b`.
 * Result will be in [0 .. π] interval.
 *
 * @param a
 * @param b
 */


exports.absInnerAngle = absInnerAngle;

const angleDist = (a, b) => absInnerAngle(absTheta(b % _api.TAU - a % _api.TAU));
/**
 * Like `Math.atan2`, but always returns angle in [0 .. TAU) interval.
 *
 * @param y
 * @param x
 */


exports.angleDist = angleDist;

const atan2Abs = (y, x) => absTheta(Math.atan2(y, x));
/**
 * Returns quadrant ID (0-3) of given angle (in radians).
 *
 * @param theta
 */


exports.atan2Abs = atan2Abs;

const quadrant = theta => absTheta(theta) * _api.INV_HALF_PI | 0;
/**
 * Converts angle to degrees.
 *
 * @param theta angle in radians
 */


exports.quadrant = quadrant;

const deg = theta => theta * _api.RAD2DEG;
/**
 * Converts angle to radians.
 *
 * @param theta angle in degrees
 */


exports.deg = deg;

const rad = theta => theta * _api.DEG2RAD;
/**
 * Cosecant. Approaches `±Infinity` for `theta` near multiples of π.
 *
 * @param theta angle in radians
 */


exports.rad = rad;

const csc = theta => 1 / Math.sin(theta);
/**
 * Secant. Approaches `±Infinity` for `theta` near π/2 ± nπ
 *
 * @param theta angle in radians
 */


exports.csc = csc;

const sec = theta => 1 / Math.cos(theta);
/**
 * Cotangent. Approaches `±Infinity` for `theta` near multiples of π.
 *
 * @param theta angle in radians
 */


exports.sec = sec;

const cot = theta => 1 / Math.tan(theta);
/**
 * Law of Cosines. Takes length of two sides of a triangle and the inner
 * angle (in radians) between them. Returns length of third side.
 *
 * @param a
 * @param b
 * @param gamma
 */


exports.cot = cot;

const loc = (a, b, gamma) => Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(gamma));
/**
 * Approximates cos(xπ) for x in [-1,1]
 *
 * @param x
 */


exports.loc = loc;

const normCos = x => {
  const x2 = x * x;
  return 1.0 + x2 * (-4 + 2 * x2);
};

exports.normCos = normCos;

const __fastCos = x => {
  const x2 = x * x;
  return 0.99940307 + x2 * (-0.49558072 + 0.03679168 * x2);
};
/**
 * Fast cosine approximation using `normCos()` (polynomial). Max. error
 * ~0.00059693
 *
 * In [0 .. 2π] interval, approx. 18-20% faster than `Math.cos` on V8.
 *
 * @param theta in radians
 */


const fastCos = theta => {
  theta %= _api.TAU;
  theta < 0 && (theta = -theta);

  switch (theta * _api.INV_HALF_PI | 0) {
    case 0:
      return __fastCos(theta);

    case 1:
      return -__fastCos(_api.PI - theta);

    case 2:
      return -__fastCos(theta - _api.PI);

    default:
      return __fastCos(_api.TAU - theta);
  }
};
/**
 * @see fastCos
 *
 * @param theta in radians
 */


exports.fastCos = fastCos;

const fastSin = theta => fastCos(_api.HALF_PI - theta);

exports.fastSin = fastSin;
},{"./api":"../node_modules/@thi.ng/math/api.js"}],"../node_modules/@thi.ng/math/eqdelta.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eqDeltaFixed = exports.eqDelta = void 0;

var _api = require("./api");

const abs = Math.abs;
const max = Math.max;
/**
 * Checks if `|a - b| <= ε` and adapts given epsilon value to the given
 * arguments:
 *
 * ε is factored with the largest absolute value of `a` or `b` (but
 * never lesser than the given `eps` value):
 *
 * `ε = ε * max(1, |a|, |b|)`
 *
 * @param a left value
 * @param b right value
 * @param eps epsilon / tolerance, default `1e-6`
 */

const eqDelta = (a, b, eps = _api.EPS) => abs(a - b) <= eps * max(1, abs(a), abs(b));
/**
 * Similar to `eqDelta()`, but used given `eps` as is.
 *
 * @param a left value
 * @param b right value
 * @param eps epsilon / tolerance, default `1e-6`
 */


exports.eqDelta = eqDelta;

const eqDeltaFixed = (a, b, eps = _api.EPS) => abs(a - b) <= eps;

exports.eqDeltaFixed = eqDeltaFixed;
},{"./api":"../node_modules/@thi.ng/math/api.js"}],"../node_modules/@thi.ng/math/crossing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classifyCrossing = exports.isCrossUnder = exports.isCrossOver = void 0;

var _api = require("./api");

var _eqdelta = require("./eqdelta");

/**
 * Returns true if line A rises up over B.
 *
 * ```
 * b1  a2
 *   \/
 *   /\
 * a1  b2
 * ```
 *
 * @param a1
 * @param a2
 * @param b1
 * @param b2
 */
const isCrossOver = (a1, a2, b1, b2) => a1 < b1 && a2 > b2;
/**
 * Returns true if line A rises up over B.
 *
 * ```
 * a1  b2
 *   \/
 *   /\
 * b1  a2
 * ```
 *
 * @param a1
 * @param a2
 * @param b1
 * @param b2
 */


exports.isCrossOver = isCrossOver;

const isCrossUnder = (a1, a2, b1, b2) => a1 > b1 && a2 < b2;
/**
 * Returns `Crossing` classifier indicating the relationship of line A
 * to line B. The optional epsilon value is used to determine if both
 * lines are considered equal or flat.
 *
 * @see isCrossUp
 * @see isCrossDown
 * @see Crossing
 *
 * @param a1
 * @param a2
 * @param b1
 * @param b2
 * @param eps
 */


exports.isCrossUnder = isCrossUnder;

const classifyCrossing = (a1, a2, b1, b2, eps = _api.EPS) => {
  if (isCrossOver(a1, a2, b1, b2)) {
    return 3
    /* OVER */
    ;
  } else if (isCrossUnder(a1, a2, b1, b2)) {
    return 2
    /* UNDER */
    ;
  }

  return (0, _eqdelta.eqDelta)(a1, b1, eps) && (0, _eqdelta.eqDelta)(a2, b2, eps) ? (0, _eqdelta.eqDelta)(a1, b2, eps) ? 1
  /* FLAT */
  : 0
  /* EQUAL */
  : 4
  /* OTHER */
  ;
};

exports.classifyCrossing = classifyCrossing;
},{"./api":"../node_modules/@thi.ng/math/api.js","./eqdelta":"../node_modules/@thi.ng/math/eqdelta.js"}],"../node_modules/@thi.ng/math/extrema.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maximaIndices = exports.minimaIndices = exports.maximaIndex = exports.minimaIndex = exports.isMaxima = exports.isMinima = void 0;

/**
 * Returns true if `b` is a local minima, i.e. iff a > b and b < c.
 *
 * @param a
 * @param b
 * @param c
 */
const isMinima = (a, b, c) => a > b && b < c;
/**
 * Returns true if `b` is a local maxima, i.e. iff a < b and b > c.
 *
 * @param a
 * @param b
 * @param c
 */


exports.isMinima = isMinima;

const isMaxima = (a, b, c) => a < b && b > c;

exports.isMaxima = isMaxima;

const index = (pred, values, from = 0, to = values.length) => {
  to--;

  for (let i = from + 1; i < to; i++) {
    if (pred(values[i - 1], values[i], values[i + 1])) {
      return i;
    }
  }

  return -1;
};
/**
 * Returns index of the first local & internal minima found in given
 * `values` array, or -1 if no such minima exists. The search range can
 * be optionally defined via semi-open [from, to) index interval.
 *
 * @param values
 * @param from
 * @param to
 */


const minimaIndex = (values, from = 0, to = values.length) => index(isMinima, values, from, to);
/**
 * Returns index of the first local & internal maxima found in given
 * `values` array, or -1 if no such maxima exists. The search range can
 * be optionally defined via semi-open [from, to) index interval.
 *
 * @param values
 * @param from
 * @param to
 */


exports.minimaIndex = minimaIndex;

const maximaIndex = (values, from = 0, to = values.length) => index(isMaxima, values, from, to);

exports.maximaIndex = maximaIndex;

function* indices(fn, vals, from = 0, to = vals.length) {
  while (from < to) {
    const i = fn(vals, from, to);
    if (i < 0) return;
    yield i;
    from = i + 1;
  }
}
/**
 * Returns an iterator yielding all minima indices in given `values`
 * array. The search range can be optionally defined via semi-open
 * [from, to) index interval.
 *
 * @param values
 * @param from
 * @param to
 */


const minimaIndices = (values, from = 0, to = values.length) => indices(minimaIndex, values, from, to);
/**
 * Returns an iterator yielding all maxima indices in given `values`
 * array. The search range can be optionally defined via semi-open
 * [from, to) index interval.
 *
 * @param values
 * @param from
 * @param to
 */


exports.minimaIndices = minimaIndices;

const maximaIndices = (values, from = 0, to = values.length) => indices(minimaIndex, values, from, to);

exports.maximaIndices = maximaIndices;
},{}],"../node_modules/@thi.ng/math/interval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inOpenRange = exports.inRange = exports.foldback = exports.absMax = exports.absMin = exports.sclamp = exports.smax = exports.smin = exports.max4id = exports.max3id = exports.max2id = exports.min4id = exports.min3id = exports.min2id = exports.wrap11 = exports.wrap01 = exports.wrap = exports.clamp11 = exports.clamp01 = exports.clamp = void 0;

/**
 * Clamps value `x` to given closed interval.
 *
 * @param x value to clamp
 * @param min lower bound
 * @param max upper bound
 */
const clamp = (x, min, max) => x < min ? min : x > max ? max : x;

exports.clamp = clamp;

const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;

exports.clamp01 = clamp01;

const clamp11 = x => x < -1 ? -1 : x > 1 ? 1 : x;

exports.clamp11 = clamp11;

const wrap = (x, min, max) => x < min ? x - min + max : x >= max ? x - max + min : x;

exports.wrap = wrap;

const wrap01 = x => x < 0 ? x + 1 : x >= 1 ? x - 1 : x;

exports.wrap01 = wrap01;

const wrap11 = x => x < -1 ? x + 2 : x >= 1 ? x - 2 : x;

exports.wrap11 = wrap11;

const min2id = (a, b) => a <= b ? 0 : 1;

exports.min2id = min2id;

const min3id = (a, b, c) => a <= b ? a <= c ? 0 : 2 : b <= c ? 1 : 2;

exports.min3id = min3id;

const min4id = (a, b, c, d) => a <= b ? a <= c ? a <= d ? 0 : 3 : c <= d ? 2 : 3 : b <= c ? b <= d ? 1 : 3 : c <= d ? 2 : 3;

exports.min4id = min4id;

const max2id = (a, b) => a >= b ? 0 : 1;

exports.max2id = max2id;

const max3id = (a, b, c) => a >= b ? a >= c ? 0 : 2 : b >= c ? 1 : 2;

exports.max3id = max3id;

const max4id = (a, b, c, d) => a >= b ? a >= c ? a >= d ? 0 : 3 : c >= d ? 2 : 3 : b >= c ? b >= d ? 1 : 3 : c >= d ? 2 : 3;
/**
 * See `smax()`.
 *
 * @param a
 * @param b
 * @param k smooth exponent (MUST be > 0)
 */


exports.max4id = max4id;

const smin = (a, b, k) => smax(a, b, -k);
/**
 * Smooth maximum. Note: Result values will be slightly larger than max
 * value near max(a,b) + eps due to exponential decay. Higher `k` values
 * reduce the error, but also reduce the smoothing. Recommended k=16.
 *
 * https://en.wikipedia.org/wiki/Smooth_maximum
 *
 * @param a
 * @param b
 * @param k smooth exponent (MUST be > 0)
 */


exports.smin = smin;

const smax = (a, b, k) => {
  const ea = Math.exp(a * k);
  const eb = Math.exp(b * k);
  return (a * ea + b * eb) / (ea + eb);
};
/**
 * Same as `smin(smax(x, min, k), max, k)`.
 *
 * @param x
 * @param min
 * @param max
 * @param k
 */


exports.smax = smax;

const sclamp = (x, min, max, k) => smin(smax(x, min, k), max, k);

exports.sclamp = sclamp;

const absMin = (a, b) => Math.abs(a) < Math.abs(b) ? a : b;

exports.absMin = absMin;

const absMax = (a, b) => Math.abs(a) > Math.abs(b) ? a : b;
/**
 * http://www.musicdsp.org/showone.php?id=203
 *
 * @param e
 * @param x
 */


exports.absMax = absMax;

const foldback = (e, x) => x < -e || x > e ? Math.abs(Math.abs((x - e) % (4 * e)) - 2 * e) - e : x;
/**
 * Returns true iff `x` is in closed interval `[min .. max]`
 *
 * @param x
 * @param min
 * @param max
 */


exports.foldback = foldback;

const inRange = (x, min, max) => x >= min && x <= max;
/**
 * Returns true iff `x` is in open interval `(min .. max)`
 *
 * @param x
 * @param min
 * @param max
 */


exports.inRange = inRange;

const inOpenRange = (x, min, max) => x > min && x < max;

exports.inOpenRange = inOpenRange;
},{}],"../node_modules/@thi.ng/math/fit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fit11 = exports.fit10 = exports.fit01 = exports.fitClamped = exports.fit = exports.norm = void 0;

var _interval = require("./interval");

/**
 * Returns normalized value of `x` WRT to interval `a .. b`. If `a`
 * equals `b`, returns 0.
 *
 * @param x
 * @param a
 * @param b
 */
const norm = (x, a, b) => b !== a ? (x - a) / (b - a) : 0;

exports.norm = norm;

const fit = (x, a, b, c, d) => c + (d - c) * norm(x, a, b);

exports.fit = fit;

const fitClamped = (x, a, b, c, d) => c + (d - c) * (0, _interval.clamp01)(norm(x, a, b));

exports.fitClamped = fitClamped;

const fit01 = (x, a, b) => a + (b - a) * (0, _interval.clamp01)(x);

exports.fit01 = fit01;

const fit10 = (x, a, b) => b + (a - b) * (0, _interval.clamp01)(x);

exports.fit10 = fit10;

const fit11 = (x, a, b) => a + (b - a) * (0.5 + 0.5 * (0, _interval.clamp11)(x));

exports.fit11 = fit11;
},{"./interval":"../node_modules/@thi.ng/math/interval.js"}],"../node_modules/@thi.ng/math/int.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rshiftu32 = exports.lshiftu32 = exports.notu32 = exports.xoru32 = exports.oru32 = exports.andu32 = exports.subu32 = exports.mulu32 = exports.divu32 = exports.addu32 = exports.rshiftu16 = exports.lshiftu16 = exports.notu16 = exports.xoru16 = exports.oru16 = exports.andu16 = exports.subu16 = exports.mulu16 = exports.divu16 = exports.addu16 = exports.rshiftu8 = exports.lshiftu8 = exports.notu8 = exports.xoru8 = exports.oru8 = exports.andu8 = exports.subu8 = exports.mulu8 = exports.divu8 = exports.addu8 = exports.noti32 = exports.rshifti32 = exports.lshifti32 = exports.xori32 = exports.ori32 = exports.andi32 = exports.subi32 = exports.muli32 = exports.divi32 = exports.addi32 = exports.rshifti16 = exports.lshifti16 = exports.noti16 = exports.xori16 = exports.ori16 = exports.andi16 = exports.subi16 = exports.muli16 = exports.divi16 = exports.addi16 = exports.rshifti8 = exports.lshifti8 = exports.noti8 = exports.xori8 = exports.ori8 = exports.andi8 = exports.subi8 = exports.muli8 = exports.divi8 = exports.addi8 = exports.signExtend16 = exports.signExtend8 = void 0;
const M8 = 0xff;
const M16 = 0xffff;

const signExtend8 = a => (a &= M8, a & 0x80 ? a | ~M8 : a);

exports.signExtend8 = signExtend8;

const signExtend16 = a => (a &= M16, a & 0x8000 ? a | ~M16 : a);

exports.signExtend16 = signExtend16;

const addi8 = (a, b) => signExtend8((a | 0) + (b | 0));

exports.addi8 = addi8;

const divi8 = (a, b) => signExtend8((a | 0) / (b | 0));

exports.divi8 = divi8;

const muli8 = (a, b) => signExtend8((a | 0) * (b | 0));

exports.muli8 = muli8;

const subi8 = (a, b) => signExtend8((a | 0) - (b | 0));

exports.subi8 = subi8;

const andi8 = (a, b) => signExtend8((a | 0) & (b | 0));

exports.andi8 = andi8;

const ori8 = (a, b) => signExtend8(a | 0 | (b | 0));

exports.ori8 = ori8;

const xori8 = (a, b) => signExtend8((a | 0) ^ (b | 0));

exports.xori8 = xori8;

const noti8 = a => signExtend8(~a); // prettier-ignore


exports.noti8 = noti8;

const lshifti8 = (a, b) => signExtend8((a | 0) << (b | 0)); // prettier-ignore


exports.lshifti8 = lshifti8;

const rshifti8 = (a, b) => signExtend8((a | 0) >> (b | 0));

exports.rshifti8 = rshifti8;

const addi16 = (a, b) => signExtend16((a | 0) + (b | 0));

exports.addi16 = addi16;

const divi16 = (a, b) => signExtend16((a | 0) / (b | 0));

exports.divi16 = divi16;

const muli16 = (a, b) => signExtend16((a | 0) * (b | 0));

exports.muli16 = muli16;

const subi16 = (a, b) => signExtend16((a | 0) - (b | 0));

exports.subi16 = subi16;

const andi16 = (a, b) => signExtend16((a | 0) & (b | 0));

exports.andi16 = andi16;

const ori16 = (a, b) => signExtend16(a | 0 | (b | 0));

exports.ori16 = ori16;

const xori16 = (a, b) => signExtend16((a | 0) ^ (b | 0));

exports.xori16 = xori16;

const noti16 = a => signExtend16(~a); // prettier-ignore


exports.noti16 = noti16;

const lshifti16 = (a, b) => signExtend16((a | 0) << (b | 0)); // prettier-ignore


exports.lshifti16 = lshifti16;

const rshifti16 = (a, b) => signExtend16((a | 0) >> (b | 0));

exports.rshifti16 = rshifti16;

const addi32 = (a, b) => (a | 0) + (b | 0) | 0;

exports.addi32 = addi32;

const divi32 = (a, b) => (a | 0) / (b | 0) | 0;

exports.divi32 = divi32;

const muli32 = (a, b) => (a | 0) * (b | 0) | 0;

exports.muli32 = muli32;

const subi32 = (a, b) => (a | 0) - (b | 0) | 0;

exports.subi32 = subi32;

const andi32 = (a, b) => (a | 0) & (b | 0);

exports.andi32 = andi32;

const ori32 = (a, b) => a | 0 | (b | 0);

exports.ori32 = ori32;

const xori32 = (a, b) => (a | 0) ^ (b | 0);

exports.xori32 = xori32;

const lshifti32 = (a, b) => (a | 0) << (b | 0);

exports.lshifti32 = lshifti32;

const rshifti32 = (a, b) => (a | 0) >> (b | 0);

exports.rshifti32 = rshifti32;

const noti32 = a => ~a; // prettier-ignore


exports.noti32 = noti32;

const addu8 = (a, b) => (a & M8) + (b & M8) & M8; // prettier-ignore


exports.addu8 = addu8;

const divu8 = (a, b) => (a & M8) / (b & M8) & M8; // prettier-ignore


exports.divu8 = divu8;

const mulu8 = (a, b) => (a & M8) * (b & M8) & M8; // prettier-ignore


exports.mulu8 = mulu8;

const subu8 = (a, b) => (a & M8) - (b & M8) & M8; // prettier-ignore


exports.subu8 = subu8;

const andu8 = (a, b) => a & M8 & (b & M8) & M8; // prettier-ignore


exports.andu8 = andu8;

const oru8 = (a, b) => (a & M8 | b & M8) & M8; // prettier-ignore


exports.oru8 = oru8;

const xoru8 = (a, b) => (a & M8 ^ b & M8) & M8;

exports.xoru8 = xoru8;

const notu8 = a => ~a & M8;

exports.notu8 = notu8;

const lshiftu8 = (a, b) => (a & M8) << (b & M8) & M8;

exports.lshiftu8 = lshiftu8;

const rshiftu8 = (a, b) => (a & M8) >>> (b & M8) & M8; // prettier-ignore


exports.rshiftu8 = rshiftu8;

const addu16 = (a, b) => (a & M16) + (b & M16) & M16; // prettier-ignore


exports.addu16 = addu16;

const divu16 = (a, b) => (a & M16) / (b & M16) & M16; // prettier-ignore


exports.divu16 = divu16;

const mulu16 = (a, b) => (a & M16) * (b & M16) & M16; // prettier-ignore


exports.mulu16 = mulu16;

const subu16 = (a, b) => (a & M16) - (b & M16) & M16; // prettier-ignore


exports.subu16 = subu16;

const andu16 = (a, b) => a & M16 & (b & M16) & M16; // prettier-ignore


exports.andu16 = andu16;

const oru16 = (a, b) => (a & M16 | b & M16) & M16; // prettier-ignore


exports.oru16 = oru16;

const xoru16 = (a, b) => (a & M16 ^ b & M16) & M16;

exports.xoru16 = xoru16;

const notu16 = a => ~a & M16; // prettier-ignore


exports.notu16 = notu16;

const lshiftu16 = (a, b) => (a & M16) << (b & M16) & M16; // prettier-ignore


exports.lshiftu16 = lshiftu16;

const rshiftu16 = (a, b) => (a & M16) >>> (b & M16) & M16;

exports.rshiftu16 = rshiftu16;

const addu32 = (a, b) => (a >>> 0) + (b >>> 0) >>> 0;

exports.addu32 = addu32;

const divu32 = (a, b) => (a >>> 0) / (b >>> 0) >>> 0;

exports.divu32 = divu32;

const mulu32 = (a, b) => (a >>> 0) * (b >>> 0) >>> 0;

exports.mulu32 = mulu32;

const subu32 = (a, b) => (a >>> 0) - (b >>> 0) >>> 0;

exports.subu32 = subu32;

const andu32 = (a, b) => (a >>> 0 & b >>> 0) >>> 0;

exports.andu32 = andu32;

const oru32 = (a, b) => (a >>> 0 | b >>> 0) >>> 0;

exports.oru32 = oru32;

const xoru32 = (a, b) => (a >>> 0 ^ b >>> 0) >>> 0;

exports.xoru32 = xoru32;

const notu32 = a => ~a >>> 0; // prettier-ignore


exports.notu32 = notu32;

const lshiftu32 = (a, b) => a >>> 0 << (b >>> 0) >>> 0; // prettier-ignore


exports.lshiftu32 = lshiftu32;

const rshiftu32 = (a, b) => a >>> 0 >>> (b >>> 0) >>> 0;

exports.rshiftu32 = rshiftu32;
},{}],"../node_modules/@thi.ng/math/min-error.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minError = void 0;

var _api = require("./api");

/**
 * Recursively evaluates function `fn` for `res` uniformly spaced values
 * `t` in the closed parametric interval `[start,end]` and computes
 * corresponding sample values `p`. For each `p` then calls `error`
 * function to compute the error to query target value `q` and
 * eventually returns the `t` producing the overall minimum error. At
 * each level of recursion the search interval is increasingly narrowed
 * / centered around the best `t` of the current iteration.
 *
 * The search is terminated early if the best error value is less than
 * `eps`.
 *
 * The interval end points `start` and `end` MUST be normalized values
 * in the closed [0,1] interval.
 *
 * @param fn function to evaluate
 * @param error error function
 * @param q target value
 * @param res number of samples per interval
 * @param iter max number of iterations / recursion limit
 * @param start interval start
 * @param end interval end
 */
const minError = (fn, error, q, res = 16, iter = 8, start = 0, end = 1, eps = _api.EPS) => {
  if (iter <= 0) return (start + end) / 2;
  const delta = (end - start) / res;
  let minT = start;
  let minE = Infinity;

  for (let i = 0; i <= res; i++) {
    const t = start + i * delta;
    const e = error(q, fn(t));

    if (e < minE) {
      if (e <= eps) return t;
      minE = e;
      minT = t;
    }
  }

  return minError(fn, error, q, res, iter - 1, Math.max(minT - delta, 0), Math.min(minT + delta, 1));
};

exports.minError = minError;
},{"./api":"../node_modules/@thi.ng/math/api.js"}],"../node_modules/@thi.ng/math/mix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sigmoid11 = exports.sigmoid = exports.sinc = exports.cubicPulse = exports.parabola = exports.gain = exports.impulse = exports.ease = exports.bounce = exports.decimated = exports.cosine = exports.circular = exports.tween = exports.tangentDiff3 = exports.tangentCardinal = exports.mixCubicHermite = exports.mixHermite = exports.mixCubic = exports.mixQuadratic = exports.mixBilinear = exports.mix = void 0;

var _api = require("./api");

const mix = (a, b, t) => a + (b - a) * t;
/**
 * ```
 * c    d
 * +----+
 * |    |
 * +----+
 * a    b
 * ```
 *
 * @param a BL value
 * @param b BR value
 * @param c TL value
 * @param d TR value
 * @param u 1st interpolation factor
 * @param v 2nd interpolation factor
 */


exports.mix = mix;

const mixBilinear = (a, b, c, d, u, v) => mix(mix(a, b, u), mix(c, d, u), v);

exports.mixBilinear = mixBilinear;

const mixQuadratic = (a, b, c, t) => {
  const s = 1 - t;
  return a * s * s + b * 2 * s * t + c * t * t;
};

exports.mixQuadratic = mixQuadratic;

const mixCubic = (a, b, c, d, t) => {
  const t2 = t * t;
  const s = 1 - t;
  const s2 = s * s;
  return a * s2 * s + b * 3 * s2 * t + c * 3 * t2 * s + d * t2 * t;
};
/**
 * Returns hermite interpolation of `a, b, c, d` at normalized position
 * `t`, where `a` and `d` are used as predecessor/successor of `b` / `c`
 * and only inform the tangent of the interpolation curve. The
 * interpolated result is that of `b` and `c`.
 *
 * Assumes all inputs are uniformly spaced. If that's not the case, use
 * `mixCubicHermite()` with one of the tangent generators supporting
 * non-uniform spacing of points.
 *
 * See: https://www.desmos.com/calculator/j4gf8g9vkr
 *
 * Source:
 * https://www.musicdsp.org/en/latest/Other/93-hermite-interpollation.html
 *
 * @see mixCubicHermite
 * @see tangentCardinal
 * @see tangentDiff3
 *
 * @param a
 * @param b
 * @param c
 * @param d
 * @param t
 */


exports.mixCubic = mixCubic;

const mixHermite = (a, b, c, d, t) => {
  const y1 = 0.5 * (c - a);
  const y2 = 1.5 * (b - c) + 0.5 * (d - a);
  return ((y2 * t + a - b + y1 - y2) * t + y1) * t + b;
};
/**
 * Computes cubic-hermite interpolation between `a` / `b` at normalized
 * time `t` and using respective tangents `ta` / `tb`.
 *
 * https://en.wikipedia.org/wiki/Cubic_Hermite_spline
 *
 * @see mixHermite
 * @see tangentCardinal
 * @see tangentDiff3
 *
 * @param a
 * @param ta
 * @param b
 * @param tb
 * @param t
 */


exports.mixHermite = mixHermite;

const mixCubicHermite = (a, ta, b, tb, t) => {
  const s = t - 1;
  const t2 = t * t;
  const s2 = s * s;
  const h00 = (1 + 2 * t) * s2;
  const h10 = t * s2;
  const h01 = t2 * (3 - 2 * t);
  const h11 = t2 * s;
  return h00 * a + h10 * ta + h01 * b + h11 * tb;
};
/**
 * Helper function for `mixCubicHermite()`. Computes cardinal tangents
 * based on point neighbors of a point B (not given), i.e. `a`
 * (predecessor) and `c` (successor) and their times (defaults to
 * uniformly spaced). The optional `tension` parameter can be used to
 * scale the tangent where 0.0 produces a Cardinal spline tangent and
 * 1.0 a Catmull-Rom (opposite to the Wikipedia ref).
 *
 * https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline
 *
 * @param prev
 * @param next
 * @param scale
 * @param ta
 * @param tc
 */


exports.mixCubicHermite = mixCubicHermite;

const tangentCardinal = (prev, next, scale = 0.5, ta = 0, tc = 2) => scale * ((next - prev) / (tc - ta));
/**
 * Helper function for `mixCubicHermite()`. Computes tangent for `curr`,
 * based on 3-point finite difference, where `prev` & `next` are
 * `curr`'s neighbors and the `tX` the three points' respective time
 * values. The latter are equally spaced by default (each 1.0 apart).
 *
 * Using this function with equal spacing of 1.0 and together with
 * `mixCubicHermite()` will produce same results as the somewhat
 * optimized variant `mixHermite()`.
 *
 * https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Finite_difference
 *
 * @param prev
 * @param curr
 * @param next
 * @param ta
 * @param tb
 * @param tc
 */


exports.tangentCardinal = tangentCardinal;

const tangentDiff3 = (prev, curr, next, ta = 0, tb = 1, tc = 2) => 0.5 * ((next - curr) / (tc - tb) + (curr - prev) / (tb - ta));
/**
 * HOF interpolator. Takes a timing function `f` and interval `[from,
 * to]`. Returns function which takes normalized time as single arg and
 * returns interpolated value.
 *
 * @param f
 * @param from
 * @param to
 */


exports.tangentDiff3 = tangentDiff3;

const tween = (f, from, to) => t => mix(from, to, f(t));
/**
 * Circular interpolation: `sqrt(1 - (1 - t)^2)`
 *
 * @param t interpolation factor (0.0 .. 1.0)
 */


exports.tween = tween;

const circular = t => {
  t = 1 - t;
  return Math.sqrt(1 - t * t);
};

exports.circular = circular;

const cosine = t => 1 - (Math.cos(t * _api.PI) * 0.5 + 0.5);

exports.cosine = cosine;

const decimated = (n, t) => Math.floor(t * n) / n;

exports.decimated = decimated;

const bounce = (k, amp, t) => {
  const tk = t * k;
  return 1 - amp * Math.sin(tk) / tk * Math.cos(t * _api.HALF_PI);
};
/**
 * HOF exponential easing.
 *
 * - `ease = 1` -> linear
 * - `ease > 1` -> ease in
 * - `ease < 1` -> ease out
 *
 * @param ease easing behavior [0.0 .. ∞]
 * @param t
 */


exports.bounce = bounce;

const ease = (ease, t) => Math.pow(t, ease);
/**
 * HOF impulse generator. Peaks at `t=1/k`
 *
 * @param k impulse width (higher values => shorter impulse)
 */


exports.ease = ease;

const impulse = (k, t) => {
  const h = k * t;
  return h * Math.exp(1 - h);
};

exports.impulse = impulse;

const gain = (k, t) => t < 0.5 ? 0.5 * Math.pow(2 * t, k) : 1 - 0.5 * Math.pow(2 - 2 * t, k);

exports.gain = gain;

const parabola = (k, t) => Math.pow(4.0 * t * (1.0 - t), k);

exports.parabola = parabola;

const cubicPulse = (w, c, t) => {
  t = Math.abs(t - c);
  return t > w ? 0 : (t /= w, 1 - t * t * (3 - 2 * t));
};

exports.cubicPulse = cubicPulse;

const sinc = (k, t) => {
  t = _api.PI * (k * t - 1.0);
  return Math.sin(t) / t;
};
/**
 * Sigmoid function for inputs in [0..1] interval.
 *
 * @param k
 * @param t
 */


exports.sinc = sinc;

const sigmoid = (k, t) => 1 / (1 + Math.exp(-k * (2 * t - 1)));
/**
 * Sigmoid function for inputs in [-1..+1] interval.
 *
 * @param k
 * @param t
 */


exports.sigmoid = sigmoid;

const sigmoid11 = (k, t) => 1 / (1 + Math.exp(-k * t));

exports.sigmoid11 = sigmoid11;
},{"./api":"../node_modules/@thi.ng/math/api.js"}],"../node_modules/@thi.ng/math/prec.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundEps = exports.roundTo = exports.trunc = exports.fract = exports.fmod = void 0;

var _api = require("./api");

/**
 * Returns `a - b * floor(a/b)`
 *
 * @param a
 * @param b
 */
const fmod = (a, b) => a - b * Math.floor(a / b);

exports.fmod = fmod;

const fract = x => x - Math.floor(x);

exports.fract = fract;

const trunc = x => x < 0 ? Math.ceil(x) : Math.floor(x);

exports.trunc = trunc;

const roundTo = (x, prec = 1) => Math.round(x / prec) * prec;
/**
 * Only rounds `x` to nearest int if `fract(x)` < `eps` or > `1-eps`.
 *
 * @param x
 * @param eps
 */


exports.roundTo = roundTo;

const roundEps = (x, eps = _api.EPS) => {
  const f = fract(x);
  return f <= eps || f >= 1 - eps ? Math.round(x) : x;
};

exports.roundEps = roundEps;
},{"./api":"../node_modules/@thi.ng/math/api.js"}],"../node_modules/@thi.ng/math/ratio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simplifyRatio = void 0;

const simplifyRatio = (num, denom) => {
  let e1 = Math.abs(num);
  let e2 = Math.abs(denom);

  while (true) {
    if (e1 < e2) {
      const t = e1;
      e1 = e2;
      e2 = t;
    }

    const r = e1 % e2;

    if (r) {
      e1 = r;
    } else {
      return [num / e2, denom / e2];
    }
  }
};

exports.simplifyRatio = simplifyRatio;
},{}],"../node_modules/@thi.ng/math/solve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solveCubic = exports.solveQuadratic = exports.solveLinear = exports.derivative = void 0;

var _api = require("./api");

/**
 * Produces a new function which computes derivative of the given
 * single-arg function. The extra optional arg `eps` is used to
 * define the step width for computing derived values:
 *
 * `f'(x) = (f(x + eps) - f(x)) / eps`
 *
 * The original function is assumed to be fully differentiable
 * in the interval the returned function is going to be used.
 * No validity checks of any form are done.
 *
 * https://en.wikipedia.org/wiki/Derivative#Continuity_and_differentiability
 *
 * @param fn
 * @param eps
 */
const derivative = (f, eps = _api.EPS) => x => (f(x + eps) - f(x)) / eps;
/**
 * Computes solution for linear equation: `ax + b = 0`.
 *
 * Note: `a` MUST NOT be zero.
 *
 * @param a slope
 * @param b constant offset
 */


exports.derivative = derivative;

const solveLinear = (a, b) => -b / a;
/**
 * Computes solutions for quadratic equation: `ax^2 + bx + c = 0`.
 * Returns array of real solutions.
 * Note: `a` MUST NOT be zero. If the quadratic term is missing,
 * use `solveLinear` instead.
 *
 * https://en.wikipedia.org/wiki/Quadratic_function
 * https://en.wikipedia.org/wiki/Quadratic_equation
 *
 * @param a quadratic coefficient
 * @param b linear coefficient
 * @param c constant offset
 * @param eps tolerance to determine multiple roots
 */


exports.solveLinear = solveLinear;

const solveQuadratic = (a, b, c, eps = 1e-9) => {
  const d = 2 * a;
  let r = b * b - 4 * a * c;
  return r < 0 ? [] : r < eps ? [-b / d] : (r = Math.sqrt(r), [(-b - r) / d, (-b + r) / d]);
};
/**
 * Computes solutions for quadratic equation: `ax^3 + bx^2 + c*x + d = 0`.
 * Returns array of solutions, both real & imaginary.
 * Note: `a` MUST NOT be zero. If the cubic term is missing (i.e. zero),
 * use `solveQuadratic` or `solveLinear` instead.
 *
 * https://en.wikipedia.org/wiki/Cubic_function
 *
 * @param a cubic coefficient
 * @param b quadratic coefficient
 * @param c linear coefficient
 * @param d constant offset
 * @param eps tolerance to determine multiple roots
 */


exports.solveQuadratic = solveQuadratic;

const solveCubic = (a, b, c, d, eps = 1e-9) => {
  const aa = a * a;
  const bb = b * b;
  const ba3 = b / (3 * a);
  const p = (3 * a * c - bb) / (3 * aa);
  const q = (2 * bb * b - 9 * a * b * c + 27 * aa * d) / (27 * aa * a);

  if (Math.abs(p) < eps) {
    return [Math.cbrt(-q) - ba3];
  } else if (Math.abs(q) < eps) {
    return p < 0 ? [-Math.sqrt(-p) - ba3, -ba3, Math.sqrt(-p) - ba3] : [-ba3];
  } else {
    const denom = q * q / 4 + p * p * p / 27;

    if (Math.abs(denom) < eps) {
      return [-1.5 * q / p - ba3, 3 * q / p - ba3];
    } else if (denom > 0) {
      const u = Math.cbrt(-q / 2 - Math.sqrt(denom));
      return [u - p / (3 * u) - ba3];
    } else {
      const u = 2 * Math.sqrt(-p / 3),
            t = Math.acos(3 * q / p / u) / 3,
            k = 2 * Math.PI / 3;
      return [u * Math.cos(t) - ba3, u * Math.cos(t - k) - ba3, u * Math.cos(t - 2 * k) - ba3];
    }
  }
};

exports.solveCubic = solveCubic;
},{"./api":"../node_modules/@thi.ng/math/api.js"}],"../node_modules/@thi.ng/math/step.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expStep = exports.smootherStep = exports.smoothStep = exports.step = void 0;

var _interval = require("./interval");

/**
 * Step/threshold function.
 *
 * @param edge threshold
 * @param x test value
 * @returns 0, if `x < e`, else 1
 */
const step = (edge, x) => x < edge ? 0 : 1;
/**
 * GLSL-style smoothStep threshold function.
 *
 * @param edge lower threshold
 * @param edge2 upper threshold
 * @param x test value
 * @returns 0, if `x < edge1`, 1 if `x > edge2`, else sigmoid interpolation
 */


exports.step = step;

const smoothStep = (edge, edge2, x) => {
  x = (0, _interval.clamp01)((x - edge) / (edge2 - edge));
  return (3 - 2 * x) * x * x;
};
/**
 * Similar to `smoothStep()` but using different polynomial.
 *
 * @param edge
 * @param edge2
 * @param x
 */


exports.smoothStep = smoothStep;

const smootherStep = (edge, edge2, x) => {
  x = (0, _interval.clamp01)((x - edge) / (edge2 - edge));
  return x * x * x * (x * (x * 6 - 15) + 10);
};
/**
 * Exponential ramp with variable shape, e.g.
 *
 * - S-curve: k=8, n=4
 * - Step near 1.0: k=8, n=20
 * - Pulse: k=0.005, n=-10
 * - Ease-in: k=0.5, n=0.25
 *
 * @param k
 * @param n
 * @param x
 */


exports.smootherStep = smootherStep;

const expStep = (k, n, x) => 1 - Math.exp(-k * Math.pow(x, n));

exports.expStep = expStep;
},{"./interval":"../node_modules/@thi.ng/math/interval.js"}],"../node_modules/@thi.ng/math/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _abs = require("./abs");

Object.keys(_abs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _abs[key];
    }
  });
});

var _angle = require("./angle");

Object.keys(_angle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _angle[key];
    }
  });
});

var _crossing = require("./crossing");

Object.keys(_crossing).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _crossing[key];
    }
  });
});

var _eqdelta = require("./eqdelta");

Object.keys(_eqdelta).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eqdelta[key];
    }
  });
});

var _extrema = require("./extrema");

Object.keys(_extrema).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _extrema[key];
    }
  });
});

var _fit = require("./fit");

Object.keys(_fit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fit[key];
    }
  });
});

var _int = require("./int");

Object.keys(_int).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _int[key];
    }
  });
});

var _interval = require("./interval");

Object.keys(_interval).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interval[key];
    }
  });
});

var _minError = require("./min-error");

Object.keys(_minError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _minError[key];
    }
  });
});

var _mix = require("./mix");

Object.keys(_mix).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mix[key];
    }
  });
});

var _prec = require("./prec");

Object.keys(_prec).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _prec[key];
    }
  });
});

var _ratio = require("./ratio");

Object.keys(_ratio).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ratio[key];
    }
  });
});

var _solve = require("./solve");

Object.keys(_solve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _solve[key];
    }
  });
});

var _step = require("./step");

Object.keys(_step).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _step[key];
    }
  });
});
},{"./api":"../node_modules/@thi.ng/math/api.js","./abs":"../node_modules/@thi.ng/math/abs.js","./angle":"../node_modules/@thi.ng/math/angle.js","./crossing":"../node_modules/@thi.ng/math/crossing.js","./eqdelta":"../node_modules/@thi.ng/math/eqdelta.js","./extrema":"../node_modules/@thi.ng/math/extrema.js","./fit":"../node_modules/@thi.ng/math/fit.js","./int":"../node_modules/@thi.ng/math/int.js","./interval":"../node_modules/@thi.ng/math/interval.js","./min-error":"../node_modules/@thi.ng/math/min-error.js","./mix":"../node_modules/@thi.ng/math/mix.js","./prec":"../node_modules/@thi.ng/math/prec.js","./ratio":"../node_modules/@thi.ng/math/ratio.js","./solve":"../node_modules/@thi.ng/math/solve.js","./step":"../node_modules/@thi.ng/math/step.js"}],"../node_modules/@thi.ng/transducers/xform/interpolate-hermite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolateHermite = interpolateHermite;

var _math = require("@thi.ng/math");

var _interpolate = require("./interpolate");

function interpolateHermite(n, src) {
  return (0, _interpolate.interpolate)((chunk, t) => (0, _math.mixHermite)(...chunk, t), 4, n, src);
}
},{"@thi.ng/math":"../node_modules/@thi.ng/math/index.js","./interpolate":"../node_modules/@thi.ng/transducers/xform/interpolate.js"}],"../node_modules/@thi.ng/transducers/xform/interpolate-linear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolateLinear = interpolateLinear;

var _math = require("@thi.ng/math");

var _interpolate = require("./interpolate");

function interpolateLinear(n, src) {
  return (0, _interpolate.interpolate)((chunk, t) => (0, _math.mix)(...chunk, t), 2, n, src);
}
},{"@thi.ng/math":"../node_modules/@thi.ng/math/index.js","./interpolate":"../node_modules/@thi.ng/transducers/xform/interpolate.js"}],"../node_modules/@thi.ng/transducers/xform/interpose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpose = interpose;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function interpose(sep, src) {
  return src ? (0, _iterator.iterator)(interpose(sep), src) : rfn => {
    const r = rfn[2];

    const _sep = typeof sep === "function" ? sep : () => sep;

    let first = true;
    return (0, _compr.compR)(rfn, (acc, x) => {
      if (first) {
        first = false;
        return r(acc, x);
      }

      acc = r(acc, _sep());
      return (0, _reduced.isReduced)(acc) ? acc : r(acc, x);
    });
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/keep.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keep = keep;

var _compose = require("@thi.ng/compose");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function keep(...args) {
  return (0, _iterator.$iter)(keep, args) || (rfn => {
    const r = rfn[2];
    const pred = args[0] || _compose.identity;
    return (0, _compr.compR)(rfn, (acc, x) => pred(x) != null ? r(acc, x) : acc);
  });
}
},{"@thi.ng/compose":"../node_modules/@thi.ng/compose/index.js","../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/labeled.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.labeled = labeled;

var _checks = require("@thi.ng/checks");

var _iterator = require("../iterator");

var _map = require("./map");

function labeled(id, src) {
  return src ? (0, _iterator.iterator1)(labeled(id), src) : (0, _map.map)((0, _checks.isFunction)(id) ? x => [id(x), x] : x => [id, x]);
}
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/func/deep-transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepTransform = void 0;

var _checks = require("@thi.ng/checks");

/**
 * Higher-order deep object transformer. Accepts a nested `spec`
 * array reflecting same key structure as the object to be mapped,
 * but with functions or sub-specs as their values.
 * Returns a new function, which when called, recursively applies
 * nested transformers in post-order traversal (child transformers
 * are run first) and returns the result of the root transformer.
 *
 * The transform specs are given as arrays in this format:
 *
 * ```
 * [tx-function, {key1: [tx-function, {...}], key2: tx-fn}]
 * ```
 *
 * If a key in the spec has no further sub maps, its transform
 * function can be given directly without having to wrap it into
 * the usual array structure.
 *
 * ```
 * // source object to be transformed
 * src = {
 *    meta: {
 *      author: { name: "Alice", email: "a@b.com" },
 *      date: 1041510896000
 *    },
 *    type: "post",
 *    title: "Hello world",
 *    body: "Ratione necessitatibus doloremque itaque."
 * };
 *
 * // deep transformation spec
 * spec = [
 *    // root transform (called last)
 *    ({type, meta, title, body}) => ["div", {class: type}, title, meta, body],
 *    // object of transform sub-specs
 *    {
 *      meta: [
 *        ({author, date}) => ["div.meta", author, `(${date})`],
 *        {
 *          author: ({email, name}) => ["a", {href: `mailto:${email}`}, name],
 *          date: (d) => new Date(d).toLocaleString()
 *        }
 *      ],
 *      title: (title) => ["h1", title]
 *    }
 * ];
 *
 * // build transformer & apply to src
 * deepTransform(spec)(src);
 *
 * // [ "div",
 * //   { class: "article" },
 * //   [ "h1", "Hello world" ],
 * //   [ "div.meta",
 * //     [ "a", { href: "mailto:a@.b.com" }, "Alice" ],
 * //     "(1/2/2003, 12:34:56 PM)" ],
 * //   "Ratione necessitatibus doloremque itaque." ]
 * ```
 *
 * @param spec transformation spec
 */
const deepTransform = spec => {
  if ((0, _checks.isFunction)(spec)) {
    return spec;
  }

  const mapfns = Object.keys(spec[1] || {}).reduce((acc, k) => (acc[k] = deepTransform(spec[1][k]), acc), {});
  return x => {
    const res = Object.assign({}, x);

    for (let k in mapfns) {
      res[k] = mapfns[k](res[k]);
    }

    return spec[0](res);
  };
};

exports.deepTransform = deepTransform;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js"}],"../node_modules/@thi.ng/transducers/xform/map-deep.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDeep = mapDeep;

var _deepTransform = require("../func/deep-transform");

var _iterator = require("../iterator");

var _map = require("./map");

function mapDeep(spec, src) {
  return src ? (0, _iterator.iterator1)(mapDeep(spec), src) : (0, _map.map)((0, _deepTransform.deepTransform)(spec));
}
},{"../func/deep-transform":"../node_modules/@thi.ng/transducers/func/deep-transform.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/map-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapKeys = mapKeys;

var _iterator = require("../iterator");

var _map = require("./map");

function mapKeys(...args) {
  const iter = (0, _iterator.$iter)(mapKeys, args);

  if (iter) {
    return iter;
  }

  const keys = args[0];
  const copy = args[1] !== false;
  return (0, _map.map)(x => {
    const res = copy ? Object.assign({}, x) : x;

    for (let k in keys) {
      res[k] = keys[k](x[k]);
    }

    return res;
  });
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/map-nth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapNth = mapNth;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function mapNth(...args) {
  const iter = (0, _iterator.$iter)(mapNth, args);

  if (iter) {
    return iter;
  }

  let n = args[0] - 1;
  let offset;
  let fn;

  if (typeof args[1] === "number") {
    offset = args[1];
    fn = args[2];
  } else {
    fn = args[1];
    offset = 0;
  }

  return rfn => {
    const r = rfn[2];
    let skip = 0,
        off = offset;
    return (0, _compr.compR)(rfn, (acc, x) => {
      if (off === 0) {
        if (skip === 0) {
          skip = n;
          return r(acc, fn(x));
        }

        skip--;
      } else {
        off--;
      }

      return r(acc, x);
    });
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/map-vals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapVals = mapVals;

var _iterator = require("../iterator");

var _map = require("./map");

function mapVals(...args) {
  const iter = (0, _iterator.$iter)(mapVals, args);

  if (iter) {
    return iter;
  }

  const fn = args[0];
  const copy = args[1] !== false;
  return (0, _map.map)(x => {
    const res = copy ? {} : x;

    for (let k in x) {
      res[k] = fn(x[k]);
    }

    return res;
  });
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/take.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.take = take;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function take(n, src) {
  return src ? (0, _iterator.iterator)(take(n), src) : rfn => {
    const r = rfn[2];
    let m = n;
    return (0, _compr.compR)(rfn, (acc, x) => --m > 0 ? r(acc, x) : m === 0 ? (0, _reduced.ensureReduced)(r(acc, x)) : (0, _reduced.reduced)(acc));
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/match-first.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchFirst = matchFirst;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _filter = require("./filter");

var _take = require("./take");

function matchFirst(pred, src) {
  return src ? [...(0, _iterator.iterator1)(matchFirst(pred), src)][0] : (0, _comp.comp)((0, _filter.filter)(pred), (0, _take.take)(1));
}
},{"../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./filter":"../node_modules/@thi.ng/transducers/xform/filter.js","./take":"../node_modules/@thi.ng/transducers/xform/take.js"}],"../node_modules/@thi.ng/transducers/internal/drain.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__drain = void 0;

var _reduced = require("../reduced");

/**
 * Helper HOF yielding a buffer drain completion function for some
 * transducers.
 *
 * @param buf
 * @param complete
 * @param reduce
 */
const __drain = (buf, complete, reduce) => acc => {
  while (buf.length && !(0, _reduced.isReduced)(acc)) {
    acc = reduce(acc, buf.shift());
  }

  return complete(acc);
};

exports.__drain = __drain;
},{"../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/take-last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeLast = takeLast;

var _drain = require("../internal/drain");

var _iterator = require("../iterator");

function takeLast(n, src) {
  return src ? (0, _iterator.iterator)(takeLast(n), src) : ([init, complete, reduce]) => {
    const buf = [];
    return [init, (0, _drain.__drain)(buf, complete, reduce), (acc, x) => {
      if (buf.length === n) {
        buf.shift();
      }

      buf.push(x);
      return acc;
    }];
  };
}
},{"../internal/drain":"../node_modules/@thi.ng/transducers/internal/drain.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/match-last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchLast = matchLast;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _filter = require("./filter");

var _takeLast = require("./take-last");

function matchLast(pred, src) {
  return src ? [...(0, _iterator.iterator)(matchLast(pred), src)][0] : (0, _comp.comp)((0, _filter.filter)(pred), (0, _takeLast.takeLast)(1));
}
},{"../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./filter":"../node_modules/@thi.ng/transducers/xform/filter.js","./take-last":"../node_modules/@thi.ng/transducers/xform/take-last.js"}],"../node_modules/@thi.ng/transducers/xform/moving-average.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movingAverage = movingAverage;

var _errors = require("@thi.ng/errors");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function movingAverage(period, src) {
  return src ? (0, _iterator.iterator1)(movingAverage(period), src) : rfn => {
    period |= 0;
    period < 2 && (0, _errors.illegalArgs)("period must be >= 2");
    const reduce = rfn[2];
    const window = [];
    let sum = 0;
    return (0, _compr.compR)(rfn, (acc, x) => {
      const n = window.push(x);
      sum += x;
      n > period && (sum -= window.shift());
      return n >= period ? reduce(acc, sum / period) : acc;
    });
  };
}
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/internal/sort-opts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__sortOpts = void 0;

var _compare = require("@thi.ng/compare");

var _compose = require("@thi.ng/compose");

const __sortOpts = opts => Object.assign({
  key: _compose.identity,
  compare: _compare.compare
}, opts);

exports.__sortOpts = __sortOpts;
},{"@thi.ng/compare":"../node_modules/@thi.ng/compare/index.js","@thi.ng/compose":"../node_modules/@thi.ng/compose/index.js"}],"../node_modules/@thi.ng/transducers/xform/moving-median.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movingMedian = movingMedian;

var _comp = require("../func/comp");

var _sortOpts = require("../internal/sort-opts");

var _iterator = require("../iterator");

var _map = require("./map");

var _partition = require("./partition");

function movingMedian(...args) {
  const iter = (0, _iterator.$iter)(movingMedian, args);

  if (iter) {
    return iter;
  }

  const {
    key,
    compare
  } = (0, _sortOpts.__sortOpts)(args[1]);
  const n = args[0];
  const m = n >> 1;
  return (0, _comp.comp)((0, _partition.partition)(n, 1, true), (0, _map.map)(window => window.slice().sort((a, b) => compare(key(a), key(b)))[m]));
}
},{"../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../internal/sort-opts":"../node_modules/@thi.ng/transducers/internal/sort-opts.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js","./partition":"../node_modules/@thi.ng/transducers/xform/partition.js"}],"../node_modules/@thi.ng/transducers/xform/multiplex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiplex = multiplex;

var _compose = require("@thi.ng/compose");

var _step = require("../step");

var _map = require("./map");

function multiplex(...args) {
  return (0, _map.map)(_compose.juxt.apply(null, args.map(_step.step)));
}
},{"@thi.ng/compose":"../node_modules/@thi.ng/compose/index.js","../step":"../node_modules/@thi.ng/transducers/step.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/func/renamer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renamer = void 0;

const renamer = kmap => {
  const ks = Object.keys(kmap);
  const [a2, b2, c2] = ks;
  const [a1, b1, c1] = ks.map(k => kmap[k]);

  switch (ks.length) {
    case 3:
      return x => {
        const res = {};
        let v;
        v = x[c1], v !== undefined && (res[c2] = v);
        v = x[b1], v !== undefined && (res[b2] = v);
        v = x[a1], v !== undefined && (res[a2] = v);
        return res;
      };

    case 2:
      return x => {
        const res = {};
        let v;
        v = x[b1], v !== undefined && (res[b2] = v);
        v = x[a1], v !== undefined && (res[a2] = v);
        return res;
      };

    case 1:
      return x => {
        const res = {};
        let v = x[a1];
        v !== undefined && (res[a2] = v);
        return res;
      };

    default:
      return x => {
        let k, v;
        const res = {};

        for (let i = ks.length - 1; i >= 0; i--) {
          k = ks[i], v = x[kmap[k]], v !== undefined && (res[k] = v);
        }

        return res;
      };
  }
};

exports.renamer = renamer;
},{}],"../node_modules/@thi.ng/transducers/xform/rename.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rename = rename;

var _checks = require("@thi.ng/checks");

var _comp = require("../func/comp");

var _renamer = require("../func/renamer");

var _iterator = require("../iterator");

var _transduce = require("../transduce");

var _filter = require("./filter");

var _map = require("./map");

function rename(...args) {
  const iter = args.length > 2 && (0, _iterator.$iter)(rename, args);

  if (iter) {
    return iter;
  }

  let kmap = args[0];

  if ((0, _checks.isArray)(kmap)) {
    kmap = kmap.reduce((acc, k, i) => (acc[k] = i, acc), {});
  }

  if (args[1]) {
    const ks = Object.keys(kmap);
    return (0, _map.map)(y => (0, _transduce.transduce)((0, _comp.comp)((0, _map.map)(k => [k, y[kmap[k]]]), (0, _filter.filter)(x => x[1] !== undefined)), args[1], ks));
  } else {
    return (0, _map.map)((0, _renamer.renamer)(kmap));
  }
}
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../func/renamer":"../node_modules/@thi.ng/transducers/func/renamer.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../transduce":"../node_modules/@thi.ng/transducers/transduce.js","./filter":"../node_modules/@thi.ng/transducers/xform/filter.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/multiplex-obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiplexObj = multiplexObj;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _multiplex = require("./multiplex");

var _rename = require("./rename");

function multiplexObj(...args) {
  const iter = (0, _iterator.$iter)(multiplexObj, args);

  if (iter) {
    return iter;
  }

  const [xforms, rfn] = args;
  const ks = Object.keys(xforms);
  return (0, _comp.comp)(_multiplex.multiplex.apply(null, ks.map(k => xforms[k])), (0, _rename.rename)(ks, rfn));
}
},{"../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./multiplex":"../node_modules/@thi.ng/transducers/xform/multiplex.js","./rename":"../node_modules/@thi.ng/transducers/xform/rename.js"}],"../node_modules/@thi.ng/transducers/xform/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = void 0;

/**
 * No-op / pass-through transducer, essentially the same as:
 * `map(identity)`, but faster. Useful for testing and / or to keep
 * existing values in a `multiplex()` tuple lane.
 */
const noop = () => rfn => rfn;

exports.noop = noop;
},{}],"../node_modules/@thi.ng/transducers/xform/pad-last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.padLast = padLast;

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function padLast(n, fill, src) {
  return src ? (0, _iterator.iterator)(padLast(n, fill), src) : ([init, complete, reduce]) => {
    let m = 0;
    return [init, acc => {
      let rem = m % n;

      if (rem > 0) {
        while (++rem <= n && !(0, _reduced.isReduced)(acc)) {
          acc = reduce(acc, fill);
        }
      }

      return complete(acc);
    }, (acc, x) => (m++, reduce(acc, x))];
  };
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/page.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.page = page;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _drop = require("./drop");

var _take = require("./take");

function page(...args) {
  return (0, _iterator.$iter)(page, args) || (0, _comp.comp)((0, _drop.drop)(args[0] * (args[1] || 10)), (0, _take.take)(args[1] || 10));
}
},{"../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./drop":"../node_modules/@thi.ng/transducers/xform/drop.js","./take":"../node_modules/@thi.ng/transducers/xform/take.js"}],"../node_modules/@thi.ng/transducers/xform/partition-by.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionBy = partitionBy;

var _api = require("@thi.ng/api");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function partitionBy(...args) {
  return (0, _iterator.$iter)(partitionBy, args, _iterator.iterator) || (([init, complete, reduce]) => {
    const fn = args[0];
    const f = args[1] === true ? fn() : fn;
    let prev = _api.SEMAPHORE;
    let chunk;
    return [init, acc => {
      if (chunk && chunk.length) {
        acc = reduce(acc, chunk);
        chunk = null;
      }

      return complete(acc);
    }, (acc, x) => {
      const curr = f(x);

      if (prev === _api.SEMAPHORE) {
        prev = curr;
        chunk = [x];
      } else if (curr === prev) {
        chunk.push(x);
      } else {
        chunk && (acc = reduce(acc, chunk));
        chunk = (0, _reduced.isReduced)(acc) ? null : [x];
        prev = curr;
      }

      return acc;
    }];
  });
}
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/partition-of.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionOf = partitionOf;

var _iterator = require("../iterator");

var _partitionBy = require("./partition-by");

function partitionOf(sizes, src) {
  return src ? (0, _iterator.iterator)(partitionOf(sizes), src) : (0, _partitionBy.partitionBy)(() => {
    let i = 0,
        j = 0;
    return () => {
      if (i++ === sizes[j]) {
        i = 1;
        j = (j + 1) % sizes.length;
      }

      return j;
    };
  }, true);
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./partition-by":"../node_modules/@thi.ng/transducers/xform/partition-by.js"}],"../node_modules/@thi.ng/transducers/xform/partition-sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionSort = partitionSort;

var _comp = require("../func/comp");

var _sortOpts = require("../internal/sort-opts");

var _iterator = require("../iterator");

var _mapcat = require("./mapcat");

var _partition = require("./partition");

function partitionSort(...args) {
  const iter = (0, _iterator.$iter)(partitionSort, args, _iterator.iterator);

  if (iter) {
    return iter;
  }

  const {
    key,
    compare
  } = (0, _sortOpts.__sortOpts)(args[1]);
  return (0, _comp.comp)((0, _partition.partition)(args[0], true), (0, _mapcat.mapcat)(window => window.slice().sort((a, b) => compare(key(a), key(b)))));
}
},{"../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../internal/sort-opts":"../node_modules/@thi.ng/transducers/internal/sort-opts.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./mapcat":"../node_modules/@thi.ng/transducers/xform/mapcat.js","./partition":"../node_modules/@thi.ng/transducers/xform/partition.js"}],"../node_modules/@thi.ng/transducers/xform/partition-sync.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionSync = partitionSync;

var _checks = require("@thi.ng/checks");

var _compose = require("@thi.ng/compose");

var _errors = require("@thi.ng/errors");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function partitionSync(...args) {
  return (0, _iterator.$iter)(partitionSync, args, _iterator.iterator) || (([init, complete, reduce]) => {
    let curr = {};
    let first = true;
    const currKeys = new Set();
    const {
      key,
      mergeOnly,
      reset,
      all,
      backPressure
    } = Object.assign({
      key: _compose.identity,
      mergeOnly: false,
      reset: true,
      all: true,
      backPressure: 0
    }, args[1]);
    const ks = (0, _checks.isArray)(args[0]) ? new Set(args[0]) : args[0];

    if (mergeOnly || backPressure < 1) {
      return [init, acc => {
        if (reset && all && currKeys.size > 0 || !reset && first) {
          acc = reduce(acc, curr);
          curr = {};
          currKeys.clear();
          first = false;
        }

        return complete(acc);
      }, (acc, x) => {
        const k = key(x);

        if (ks.has(k)) {
          curr[k] = x;
          currKeys.add(k);

          if (mergeOnly || requiredInputs(ks, currKeys)) {
            acc = reduce(acc, curr);
            first = false;

            if (reset) {
              curr = {};
              currKeys.clear();
            } else {
              curr = Object.assign({}, curr);
            }
          }
        }

        return acc;
      }];
    } else {
      // with backpressure / caching...
      const cache = new Map();
      return [init, acc => {
        if (all && currKeys.size > 0) {
          acc = reduce(acc, collect(cache, currKeys));
          currKeys.clear();
        }

        return complete(acc);
      }, (acc, x) => {
        const k = key(x);

        if (ks.has(k)) {
          let slot = cache.get(k);
          !slot && cache.set(k, slot = []);
          slot.length >= backPressure && (0, _errors.illegalState)(`max back pressure (${backPressure}) exceeded for input: ${String(k)}`);
          slot.push(x);
          currKeys.add(k);

          while (requiredInputs(ks, currKeys)) {
            acc = reduce(acc, collect(cache, currKeys));
            first = false;
            if ((0, _reduced.isReduced)(acc)) break;
          }
        }

        return acc;
      }];
    }
  });
}

const requiredInputs = (required, curr) => {
  if (curr.size < required.size) return false;

  for (let id of required) {
    if (!curr.has(id)) return false;
  }

  return true;
};

const collect = (cache, currKeys) => {
  const curr = {};

  for (let id of currKeys) {
    const slot = cache.get(id);
    curr[id] = slot.shift();
    !slot.length && currKeys.delete(id);
  }

  return curr;
};
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/compose":"../node_modules/@thi.ng/compose/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/pluck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluck = pluck;

var _iterator = require("../iterator");

var _map = require("./map");

function pluck(key, src) {
  return src ? (0, _iterator.iterator1)(pluck(key), src) : (0, _map.map)(x => x[key]);
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/sample.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sample = sample;

var _random = require("@thi.ng/random");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function sample(...args) {
  const iter = (0, _iterator.$iter)(sample, args);

  if (iter) {
    return iter;
  }

  const prob = args[0];
  const rnd = args[1] || _random.SYSTEM;
  return rfn => {
    const r = rfn[2];
    return (0, _compr.compR)(rfn, (acc, x) => rnd.float() < prob ? r(acc, x) : acc);
  };
}
},{"@thi.ng/random":"../node_modules/@thi.ng/random/index.js","../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/scan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scan = scan;

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function scan(...args) {
  return args.length > 2 && (0, _iterator.$iter)(scan, args, _iterator.iterator) || (([inito, completeo, reduceo]) => {
    const [initi, completei, reducei] = args[0];
    let acc = args.length > 1 && args[1] != null ? args[1] : initi();
    return [inito, _acc => {
      let a = completei(acc);

      if (a !== acc) {
        _acc = (0, _reduced.unreduced)(reduceo(_acc, a));
      }

      acc = a;
      return completeo(_acc);
    }, (_acc, x) => {
      acc = reducei(acc, x);

      if ((0, _reduced.isReduced)(acc)) {
        return (0, _reduced.ensureReduced)(reduceo(_acc, acc.deref()));
      }

      return reduceo(_acc, acc);
    }];
  });
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/func/key-selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keySelector = void 0;

var _renamer = require("./renamer");

const keySelector = keys => (0, _renamer.renamer)(keys.reduce((acc, x) => (acc[x] = x, acc), {}));

exports.keySelector = keySelector;
},{"./renamer":"../node_modules/@thi.ng/transducers/func/renamer.js"}],"../node_modules/@thi.ng/transducers/xform/select-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectKeys = selectKeys;

var _keySelector = require("../func/key-selector");

var _iterator = require("../iterator");

var _map = require("./map");

function selectKeys(keys, src) {
  return src ? (0, _iterator.iterator1)(selectKeys(keys), src) : (0, _map.map)((0, _keySelector.keySelector)(keys));
}
},{"../func/key-selector":"../node_modules/@thi.ng/transducers/func/key-selector.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/side-effect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sideEffect = void 0;

var _map = require("./map");

/**
 * Helper transducer. Applies given `fn` to each input value, presumably
 * for side effects. Discards function's result and yields original
 * inputs.
 *
 * @param fn side effect
 */
const sideEffect = fn => (0, _map.map)(x => (fn(x), x));

exports.sideEffect = sideEffect;
},{"./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/sliding-window.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slidingWindow = slidingWindow;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function slidingWindow(...args) {
  const iter = (0, _iterator.$iter)(slidingWindow, args);

  if (iter) {
    return iter;
  }

  const size = args[0];
  const partial = args[1] !== false;
  return rfn => {
    const reduce = rfn[2];
    let buf = [];
    return (0, _compr.compR)(rfn, (acc, x) => {
      buf.push(x);

      if (partial || buf.length === size) {
        acc = reduce(acc, buf);
        buf = buf.slice(buf.length === size ? 1 : 0);
      }

      return acc;
    });
  };
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/stream-shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamShuffle = streamShuffle;

var _arrays = require("@thi.ng/arrays");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function streamShuffle(...args) {
  return (0, _iterator.$iter)(streamShuffle, args, _iterator.iterator) || (([init, complete, reduce]) => {
    const n = args[0];
    const maxSwaps = args[1] || n;
    const buf = [];
    return [init, acc => {
      while (buf.length && !(0, _reduced.isReduced)(acc)) {
        (0, _arrays.shuffle)(buf, maxSwaps);
        acc = reduce(acc, buf.shift());
      }

      acc = complete(acc);
      return acc;
    }, (acc, x) => {
      buf.push(x);
      (0, _arrays.shuffle)(buf, maxSwaps);

      if (buf.length === n) {
        acc = reduce(acc, buf.shift());
      }

      return acc;
    }];
  });
}
},{"@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/stream-sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamSort = streamSort;

var _arrays = require("@thi.ng/arrays");

var _drain = require("../internal/drain");

var _sortOpts = require("../internal/sort-opts");

var _iterator = require("../iterator");

function streamSort(...args) {
  const iter = (0, _iterator.$iter)(streamSort, args, _iterator.iterator);

  if (iter) {
    return iter;
  }

  const {
    key,
    compare
  } = (0, _sortOpts.__sortOpts)(args[1]);
  const n = args[0];
  return ([init, complete, reduce]) => {
    const buf = [];
    return [init, (0, _drain.__drain)(buf, complete, reduce), (acc, x) => {
      const idx = (0, _arrays.binarySearch)(buf, x, key, compare);
      buf.splice(idx < 0 ? -(idx + 1) : idx, 0, x);

      if (buf.length === n) {
        acc = reduce(acc, buf.shift());
      }

      return acc;
    }];
  };
}
},{"@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js","../internal/drain":"../node_modules/@thi.ng/transducers/internal/drain.js","../internal/sort-opts":"../node_modules/@thi.ng/transducers/internal/sort-opts.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/struct.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.struct = struct;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _mapKeys = require("./map-keys");

var _partition = require("./partition");

var _partitionOf = require("./partition-of");

var _rename = require("./rename");

function struct(fields, src) {
  return src ? (0, _iterator.iterator)(struct(fields), src) : (0, _comp.comp)((0, _partitionOf.partitionOf)(fields.map(f => f[1])), (0, _partition.partition)(fields.length), (0, _rename.rename)(fields.map(f => f[0])), (0, _mapKeys.mapKeys)(fields.reduce((acc, f) => f[2] ? (acc[f[0]] = f[2], acc) : acc, {}), false));
}
},{"../func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map-keys":"../node_modules/@thi.ng/transducers/xform/map-keys.js","./partition":"../node_modules/@thi.ng/transducers/xform/partition.js","./partition-of":"../node_modules/@thi.ng/transducers/xform/partition-of.js","./rename":"../node_modules/@thi.ng/transducers/xform/rename.js"}],"../node_modules/@thi.ng/transducers/xform/swizzle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swizzle = swizzle;

var _arrays = require("@thi.ng/arrays");

var _iterator = require("../iterator");

var _map = require("./map");

function swizzle(order, src) {
  return src ? (0, _iterator.iterator1)(swizzle(order), src) : (0, _map.map)((0, _arrays.swizzle)(order));
}
},{"@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./map":"../node_modules/@thi.ng/transducers/xform/map.js"}],"../node_modules/@thi.ng/transducers/xform/take-nth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeNth = takeNth;

var _iterator = require("../iterator");

var _throttle = require("./throttle");

function takeNth(n, src) {
  if (src) {
    return (0, _iterator.iterator1)(takeNth(n), src);
  }

  n = Math.max(0, n - 1);
  return (0, _throttle.throttle)(() => {
    let skip = 0;
    return () => skip === 0 ? (skip = n, true) : (skip--, false);
  });
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./throttle":"../node_modules/@thi.ng/transducers/xform/throttle.js"}],"../node_modules/@thi.ng/transducers/xform/take-while.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeWhile = takeWhile;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function takeWhile(...args) {
  return (0, _iterator.$iter)(takeWhile, args) || (rfn => {
    const r = rfn[2];
    const pred = args[0];
    let ok = true;
    return (0, _compr.compR)(rfn, (acc, x) => (ok = ok && pred(x)) ? r(acc, x) : (0, _reduced.reduced)(acc));
  });
}
},{"../func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","../iterator":"../node_modules/@thi.ng/transducers/iterator.js","../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/xform/throttle-time.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttleTime = throttleTime;

var _iterator = require("../iterator");

var _throttle = require("./throttle");

function throttleTime(delay, src) {
  return src ? (0, _iterator.iterator1)(throttleTime(delay), src) : (0, _throttle.throttle)(() => {
    let last = 0;
    return () => {
      const t = Date.now();
      return t - last >= delay ? (last = t, true) : false;
    };
  });
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./throttle":"../node_modules/@thi.ng/transducers/xform/throttle.js"}],"../node_modules/@thi.ng/transducers/xform/toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggle = toggle;

var _iterator = require("../iterator");

function toggle(on, off, initial = false, src) {
  return src ? (0, _iterator.iterator1)(toggle(on, off, initial), src) : ([init, complete, reduce]) => {
    let state = initial;
    return [init, complete, acc => reduce(acc, (state = !state) ? on : off)];
  };
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js"}],"../node_modules/@thi.ng/transducers/xform/trace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trace = void 0;

var _sideEffect = require("./side-effect");

const trace = (prefix = "") => (0, _sideEffect.sideEffect)(x => console.log(prefix, x));

exports.trace = trace;
},{"./side-effect":"../node_modules/@thi.ng/transducers/xform/side-effect.js"}],"../node_modules/@thi.ng/transducers/xform/word-wrap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordWrap = wordWrap;

var _iterator = require("../iterator");

var _partitionBy = require("./partition-by");

function wordWrap(...args) {
  const iter = (0, _iterator.$iter)(wordWrap, args, _iterator.iterator);

  if (iter) {
    return iter;
  }

  const lineLength = args[0];
  const {
    delim,
    always
  } = Object.assign({
    delim: 1,
    always: true
  }, args[1]);
  return (0, _partitionBy.partitionBy)(() => {
    let n = 0;
    let flag = false;
    return w => {
      n += w.length + delim;

      if (n > lineLength + (always ? 0 : delim)) {
        flag = !flag;
        n = w.length + delim;
      }

      return flag;
    };
  }, true);
}
},{"../iterator":"../node_modules/@thi.ng/transducers/iterator.js","./partition-by":"../node_modules/@thi.ng/transducers/xform/partition-by.js"}],"../node_modules/@thi.ng/transducers/func/juxtr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.juxtR = juxtR;

var _reduced = require("../reduced");

function juxtR(...rs) {
  let [a, b, c] = rs;
  const n = rs.length;

  switch (n) {
    case 1:
      {
        const r = a[2];
        return [() => [a[0]()], acc => [a[1](acc[0])], (acc, x) => {
          const aa1 = r(acc[0], x);

          if ((0, _reduced.isReduced)(aa1)) {
            return (0, _reduced.reduced)([(0, _reduced.unreduced)(aa1)]);
          }

          return [aa1];
        }];
      }

    case 2:
      {
        const ra = a[2];
        const rb = b[2];
        return [() => [a[0](), b[0]()], acc => [a[1](acc[0]), b[1](acc[1])], (acc, x) => {
          const aa1 = ra(acc[0], x);
          const aa2 = rb(acc[1], x);

          if ((0, _reduced.isReduced)(aa1) || (0, _reduced.isReduced)(aa2)) {
            return (0, _reduced.reduced)([(0, _reduced.unreduced)(aa1), (0, _reduced.unreduced)(aa2)]);
          }

          return [aa1, aa2];
        }];
      }

    case 3:
      {
        const ra = a[2];
        const rb = b[2];
        const rc = c[2];
        return [() => [a[0](), b[0](), c[0]()], acc => [a[1](acc[0]), b[1](acc[1]), c[1](acc[2])], (acc, x) => {
          const aa1 = ra(acc[0], x);
          const aa2 = rb(acc[1], x);
          const aa3 = rc(acc[2], x);

          if ((0, _reduced.isReduced)(aa1) || (0, _reduced.isReduced)(aa2) || (0, _reduced.isReduced)(aa3)) {
            return (0, _reduced.reduced)([(0, _reduced.unreduced)(aa1), (0, _reduced.unreduced)(aa2), (0, _reduced.unreduced)(aa3)]);
          }

          return [aa1, aa2, aa3];
        }];
      }

    default:
      return [() => rs.map(r => r[0]()), acc => rs.map((r, i) => r[1](acc[i])), (acc, x) => {
        let done = false;
        const res = [];

        for (let i = 0; i < n; i++) {
          let a = rs[i][2](acc[i], x);

          if ((0, _reduced.isReduced)(a)) {
            done = true;
            a = (0, _reduced.unreduced)(a);
          }

          res[i] = a;
        }

        return done ? (0, _reduced.reduced)(res) : res;
      }];
  }
}
},{"../reduced":"../node_modules/@thi.ng/transducers/reduced.js"}],"../node_modules/@thi.ng/transducers/func/lookup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookup3d = exports.lookup2d = exports.lookup1d = void 0;

/**
 * Returns function accepting a single index arg used to
 * lookup value in given array. No bounds checks are done.
 *
 * ```
 * [...map(lookup1d([10, 20, 30]), [2,0,1])]
 * // [ 30, 10, 20 ]
 * ```
 *
 * @param src source data
 */
const lookup1d = src => i => src[i];
/**
 * Returns function accepting a single `[x, y]` index tuple,
 * used to lookup value in given array. Useful for transducers
 * processing 2D data. **Note**: The source data MUST be in
 * row major linearized format, i.e. 1D representation of 2D data
 * (pixel buffer). No bounds checks are done.
 *
 * ```
 * [...map(lookup2d([...range(9)], 3), range2d(2, -1, 0, 3))]
 * // [ 2, 1, 0, 5, 4, 3, 8, 7, 6 ]
 * ```
 *
 * @param src source data
 * @param width number of items along X (columns)
 */


exports.lookup1d = lookup1d;

const lookup2d = (src, width) => i => src[i[0] + i[1] * width];
/**
 * Same as `lookup2d()`, but for 3D data. The index ordering of the
 * source data MUST be in Z, Y, X order (i.e. a stack of row major 2D slices).
 * No bounds checks are done.
 *
 * @param src source data
 * @param width number of items along X (columns)
 * @param height number of items along Y (rows)
 */


exports.lookup2d = lookup2d;

const lookup3d = (src, width, height) => {
  const stridez = width * height;
  return i => src[i[0] + i[1] * width + i[2] * stridez];
};

exports.lookup3d = lookup3d;
},{}],"../node_modules/@thi.ng/transducers/iter/as-iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asIterable = asIterable;

/**
 * Helper function to (re)provide given iterable in iterator form.
 *
 * @param src
 */
function* asIterable(src) {
  yield* src;
}
},{}],"../node_modules/@thi.ng/transducers/iter/repeatedly.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatedly = repeatedly;

function* repeatedly(fn, n = Infinity) {
  while (n-- > 0) {
    yield fn();
  }
}
},{}],"../node_modules/@thi.ng/transducers/iter/choices.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.choices = void 0;

var _arrays = require("@thi.ng/arrays");

var _random = require("@thi.ng/random");

var _repeatedly = require("./repeatedly");

/**
 * Returns an infinite iterator of random choices and their (optional)
 * weights. If `weights` is given, it must have at least the same size
 * as `choices`. If omitted, each choice will have same probability.
 *
 * ```
 * transduce(take(1000), frequencies(), choices("abcd", [1, 0.5, 0.25, 0.125]))
 * // Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
 * ```
 *
 * @see weightedRandom
 *
 * @param choices
 * @param weights
 */
const choices = (choices, weights, rnd = _random.SYSTEM) => (0, _repeatedly.repeatedly)(weights ? (0, _random.weightedRandom)((0, _arrays.ensureArray)(choices), weights, rnd) : () => choices[rnd.float(choices.length) | 0]);

exports.choices = choices;
},{"@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js","@thi.ng/random":"../node_modules/@thi.ng/random/index.js","./repeatedly":"../node_modules/@thi.ng/transducers/iter/repeatedly.js"}],"../node_modules/@thi.ng/transducers/iter/concat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concat = concat;

var _arrays = require("@thi.ng/arrays");

/**
 * Yields iterator producing concatenation of given iterables.
 * Undefined & null inputs are silently ignored, however any
 * such values produced or contained in an input will remain.
 *
 * ```
 * [...concat([1, 2, 3], null, [4, 5])]
 * // [ 1, 2, 3, 4, 5 ]
 *
 * [...concat([1, 2, 3, undefined], null, [4, 5])]
 * // [ 1, 2, 3, undefined, 4, 5 ]
 * ```
 *
 * @param xs
 */
function* concat(...xs) {
  for (let x of xs) {
    x != null && (yield* (0, _arrays.ensureIterable)(x));
  }
}
},{"@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js"}],"../node_modules/@thi.ng/transducers/iter/cycle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cycle = cycle;

function* cycle(input) {
  let cache = [];

  for (let i of input) {
    cache.push(i);
    yield i;
  }

  if (cache.length > 0) {
    while (true) {
      yield* cache;
    }
  }
}
},{}],"../node_modules/@thi.ng/transducers/iter/repeat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeat = repeat;

function* repeat(x, n = Infinity) {
  while (n-- > 0) {
    yield x;
  }
}
},{}],"../node_modules/@thi.ng/transducers/iter/extend-sides.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendSides = extendSides;

var _api = require("@thi.ng/api");

var _repeat = require("./repeat");

/**
 * Yields iterator of given iterable which repeats the first and/or last
 * value(s) `numLeft`/`numRight` times (default: 1). By default both
 * sides are repeated, but can be adjusted by setting either of them to
 * zero. `numRight` defaults to same value as `numLeft`.
 *
 * ```
 * [...extendSides([1, 2, 3])]
 * // [ 1,  1, 2, 3,  3]
 *
 * [...extendSides([1, 2, 3], 3)]
 * // [ 1, 1, 1,  1, 2, 3,  3, 3, 3 ]
 *
 * [...extendSides([1, 2, 3], 0, 3)]
 * // [ 1, 2, 3,  3, 3, 3 ]
 * ```
 *
 * @see padSides
 * @see wrapSides
 *
 * @param src
 * @param numLeft
 * @param numRight
 */
function* extendSides(src, numLeft = 1, numRight = numLeft) {
  let prev = _api.SEMAPHORE;

  for (let x of src) {
    if (numLeft > 0 && prev === _api.SEMAPHORE) {
      yield* (0, _repeat.repeat)(x, numLeft);
      numLeft = 0;
    }

    yield x;
    prev = x;
  }

  if (numRight > 0 && prev !== _api.SEMAPHORE) {
    yield* (0, _repeat.repeat)(prev, numRight);
  }
}
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","./repeat":"../node_modules/@thi.ng/transducers/iter/repeat.js"}],"../node_modules/@thi.ng/transducers/iter/iterate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterate = iterate;

/**
 * Yields an infinite iterator of the inductive sequence:
 *
 * f(x+1) = f(f(x))
 *
 * The first value emitted always is `seed` itself, then f(seed),
 * f(f(seed)) etc. The given function is called with the current
 * iteration counter as 2nd arg.
 *
 * ```
 * [...take(5, iterate((x) => x * 2, 1))]
 * // [ 1, 2, 4, 8, 16 ]
 *
 * [...take(8, iterate((x, i) => x * 10 + i, 0))]
 * // [ 0, 1, 12, 123, 1234, 12345, 123456, 1234567 ]
 * ```
 *
 * @param fn
 * @param seed
 */
function* iterate(fn, seed) {
  let i = 0;

  while (true) {
    yield seed;
    seed = fn(seed, ++i);
  }
}
},{}],"../node_modules/@thi.ng/transducers/iter/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = keys;

function* keys(x) {
  for (let k in x) {
    if (x.hasOwnProperty(k)) {
      yield k;
    }
  }
}
},{}],"../node_modules/@thi.ng/transducers/iter/pad-sides.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.padSides = void 0;

var _concat = require("./concat");

var _repeat = require("./repeat");

/**
 * Returns iterator of `src` padded with value `x`, repeated
 * `numLeft`/`numRight` times (default: 1). By default both sides are
 * padded, but can be adjusted by setting either of them to zero.
 * `numRight` defaults to same value as `numLeft`.
 *
 * Essentially, syntax sugar for:
 *
 * ```
 * // default
 * concat(repeat(x, numLeft), src, repeat(x, numRight))
 *
 * // left only
 * concat(repeat(x, numLeft), src)
 *
 * // right only
 * concat(src, repeat(x, numRight))
 * ```
 *
 * @see extendsSides
 * @see wrapSides
 *
 * @param src
 * @param x
 * @param numLeft
 * @param numRight
 */
const padSides = (src, x, numLeft = 1, numRight = numLeft) => numLeft > 0 ? numRight > 0 ? (0, _concat.concat)((0, _repeat.repeat)(x, numLeft), src, (0, _repeat.repeat)(x, numRight)) : (0, _concat.concat)((0, _repeat.repeat)(x, numLeft), src) : numRight > 0 ? (0, _concat.concat)(src, (0, _repeat.repeat)(x, numRight)) : (0, _concat.concat)(src);

exports.padSides = padSides;
},{"./concat":"../node_modules/@thi.ng/transducers/iter/concat.js","./repeat":"../node_modules/@thi.ng/transducers/iter/repeat.js"}],"../node_modules/@thi.ng/transducers/iter/pairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pairs = pairs;

function* pairs(x) {
  for (let k in x) {
    if (x.hasOwnProperty(k)) {
      yield [k, x[k]];
    }
  }
}
},{}],"../node_modules/@thi.ng/transducers/iter/permutations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permutations = permutations;
exports.permutationsN = void 0;

var _arrays = require("@thi.ng/arrays");

var _errors = require("@thi.ng/errors");

var _range = require("./range");

function* permutations(...src) {
  const n = src.length - 1;

  if (n < 0) {
    return;
  }

  const step = new Array(n + 1).fill(0);
  const realized = src.map(_arrays.ensureArrayLike);
  const total = realized.reduce((acc, x) => acc * x.length, 1);

  for (let i = 0; i < total; i++) {
    const tuple = [];

    for (let j = n; j >= 0; j--) {
      const r = realized[j];
      let s = step[j];

      if (s === r.length) {
        step[j] = s = 0;
        j > 0 && step[j - 1]++;
      }

      tuple[j] = r[s];
    }

    step[n]++;
    yield tuple;
  }
}
/**
 * Iterator yielding the Cartesian Product for `n` items of `m` values
 * each. If `m` is not given, defaults to value of `n`. The range of `m`
 * is `0..m-1`. The optional `offsets` array can be used to define start
 * values for each dimension.
 *
 * ```
 * [...permutationsN(2)]
 * // [ [0, 0], [0, 1], [1, 0], [1, 1] ]
 *
 * [...permutationsN(2, 3)]
 * // [ [0, 0], [0, 1], [0, 2],
 * //   [1, 0], [1, 1], [1, 2],
 * //   [2, 0], [2, 1], [2, 2] ]
 *
 * [...permutationsN(2, 3, [10, 20])]
 * // [ [ 10, 20 ], [ 10, 21 ], [ 11, 20 ], [ 11, 21 ] ]
 * ```
 *
 * @param n
 * @param m
 * @param offsets
 */


const permutationsN = (n, m = n, offsets) => {
  if (offsets && offsets.length < n) {
    (0, _errors.illegalArgs)(`insufficient offsets, got ${offsets.length}, needed ${n}`);
  }

  const seqs = [];

  while (--n >= 0) {
    const o = offsets ? offsets[n] : 0;
    seqs[n] = (0, _range.range)(o, o + m);
  }

  return permutations.apply(null, seqs);
};

exports.permutationsN = permutationsN;
},{"@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./range":"../node_modules/@thi.ng/transducers/iter/range.js"}],"../node_modules/@thi.ng/transducers/iter/range3d.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range3d = range3d;

var _errors = require("@thi.ng/errors");

var _range = require("./range");

function* range3d(...args) {
  let fromX, toX, stepX;
  let fromY, toY, stepY;
  let fromZ, toZ, stepZ;

  switch (args.length) {
    case 9:
      stepX = args[6];
      stepY = args[7];
      stepZ = args[8];

    case 6:
      [fromX, toX, fromY, toY, fromZ, toZ] = args;
      break;

    case 3:
      [toX, toY, toZ] = args;
      fromX = fromY = fromZ = 0;
      break;

    default:
      (0, _errors.illegalArity)(args.length);
  }

  const rx = (0, _range.range)(fromX, toX, stepX);
  const ry = (0, _range.range)(fromY, toY, stepY);

  for (let z of (0, _range.range)(fromZ, toZ, stepZ)) {
    for (let y of ry) {
      for (let x of rx) {
        yield [x, y, z];
      }
    }
  }
}
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./range":"../node_modules/@thi.ng/transducers/iter/range.js"}],"../node_modules/@thi.ng/transducers/iter/reverse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverse = reverse;

var _arrays = require("@thi.ng/arrays");

/**
 * Yields iterator which consumes input and yield its values in reverse
 * order. Important: Input MUST be finite.
 *
 * ```
 * [...tx.reverse("hello world")]
 * // [ "d", "l", "r", "o", "w", " ", "o", "l", "l", "e", "h" ]
 * ```
 *
 * @param input
 */
function* reverse(input) {
  const _input = (0, _arrays.ensureArray)(input);

  let n = _input.length;

  while (--n >= 0) {
    yield _input[n];
  }
}
},{"@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js"}],"../node_modules/@thi.ng/transducers/iter/symmetric.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symmetric = symmetric;

/**
 * Yields an iterator of all `src` values, followed by the same values
 * in reverse order. Efficiently builds the reversed order via an
 * internal linked list.
 *
 * ```
 * [...symmetric([1, 2, 3])]
 * // [ 1, 2, 3, 3, 2, 1 ]
 * ```
 *
 * @param src
 */
function* symmetric(src) {
  let head = undefined;

  for (let x of src) {
    head = {
      x,
      n: head
    };
    yield x;
  }

  while (head) {
    yield head.x;
    head = head.n;
  }
}
},{}],"../node_modules/@thi.ng/transducers/iter/tween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tween = tween;

var _normRange = require("./norm-range");

var _repeat = require("./repeat");

/**
 * Keyframe based interpolator. Yields a sequence of `num+1` equally
 * spaced, tweened values from given keyframe tuples (`stops`).
 * Keyframes are defined as `[time, value]` tuples. Only values in the
 * closed `[min..max]` time interval will be computed.
 *
 * Interpolation happens in two stages: First the given `init` function
 * is called to transform/prepare pairs of consecutive keyframes into a
 * single interval (user defined). Then, to produce each tweened value
 * calls `mix` with the currently active interval and interpolation time
 * value `t` (re-normalized and relative to current interval). The
 * iterator yields results of these `mix()` function calls.
 *
 * Depending on the overall `num`ber of samples requested and the
 * distance between keyframes, some keyframes MIGHT be skipped. E.g. if
 * requesting 10 samples within [0,1], the interval between two
 * successive keyframes at 0.12 and 0.19 would be skipped entirely,
 * since samples will only be taken at multiples of `1/num` (i.e. 0.0,
 * 0.1, 0.2... in this example).
 *
 * The given keyframe times can lie outside the `min`/`max` range and
 * also don't need to cover the range fully. In the latter case, tweened
 * values before the first or after the last keyframe will yield the
 * value of the first/last keyframe. If only a single keyframe is given
 * in total, all `num` yielded samples will be that keyframe's
 * transformed value.
 *
 * ```
 * [...tween({
 *   num: 10,
 *   min: 0,
 *   max: 100,
 *   init: (a, b) => [a, b],
 *   mix: ([a, b], t) => Math.floor(a + (b - a) * t),
 *   stops: [[20, 100], [50, 200], [80, 0]]
 * })]
 * // [ 100, 100, 100, 133, 166, 200, 133, 66, 0, 0, 0 ]
 * ```
 *
 * Using easing functions (e.g. from thi.ng/math), non-linear
 * interpolation within each keyframe interval can be achieved:
 *
 * ```
 * import { mix, smoothStep } from "@thi.ng/math"
 *
 * [...tween({
 *   num: 10,
 *   min: 0,
 *   max: 100,
 *   init: (a, b) => [a, b],
 *   mix: ([a, b], t) => Math.floor(mix(a, b, smoothStep(0.1, 0.9, t))),
 *   stops: [[20, 100], [50, 200], [80, 0]]
 * })]
 * // [ 100, 100, 100, 120, 179, 200, 158, 41, 0, 0, 0 ]
 * ```
 * @see TweenOpts
 * @see interpolate
 * @see interpolateHermite
 * @see interpolateLinear
 *
 * @param opts
 */
function* tween(opts) {
  const {
    min,
    max,
    num,
    init,
    mix,
    stops
  } = opts;
  let l = stops.length;
  if (l < 1) return;

  if (l === 1) {
    yield* (0, _repeat.repeat)(mix(init(stops[0][1], stops[0][1]), 0), num);
  }

  stops.sort((a, b) => a[0] - b[0]);
  stops[l - 1][0] < max && stops.push([max, stops[l - 1][1]]);
  stops[0][0] > min && stops.unshift([min, stops[0][1]]);
  const range = max - min;
  let start = stops[0][0];
  let end = stops[1][0];
  let delta = end - start;
  let interval = init(stops[0][1], stops[1][1]);
  let i = 1;
  l = stops.length;

  for (let t of (0, _normRange.normRange)(num)) {
    t = min + range * t;

    if (t > end) {
      while (i < l && t > stops[i][0]) i++;

      start = stops[i - 1][0];
      end = stops[i][0];
      delta = end - start;
      interval = init(stops[i - 1][1], stops[i][1]);
    }

    yield mix(interval, delta !== 0 ? (t - start) / delta : 0);
  }
}
},{"./norm-range":"../node_modules/@thi.ng/transducers/iter/norm-range.js","./repeat":"../node_modules/@thi.ng/transducers/iter/repeat.js"}],"../node_modules/@thi.ng/transducers/iter/vals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vals = vals;

function* vals(x) {
  for (let k in x) {
    if (x.hasOwnProperty(k)) {
      yield x[k];
    }
  }
}
},{}],"../node_modules/@thi.ng/transducers/iter/wrap-sides.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapSides = wrapSides;

var _arrays = require("@thi.ng/arrays");

var _errors = require("@thi.ng/errors");

var _math = require("@thi.ng/math");

/**
 * Yields iterator of `src` with the last `numLeft` values of `src`
 * prepended at the beginning and/or the first `numRight` values
 * appended at the end. `numLeft` defaults to 1 and `numRight` defaults
 * to same value as `numLeft`, therefore wraps both sides by default and
 * throws error if either `nXXX` < 0 or larger than `src.length`.
 *
 * @see extendSides
 * @see padSides
 *
 * @param src
 * @param numLeft
 * @param numRight
 */
function* wrapSides(src, numLeft = 1, numRight = numLeft) {
  const _src = (0, _arrays.ensureArray)(src);

  !((0, _math.inRange)(numLeft, 0, _src.length) && (0, _math.inRange)(numRight, 0, _src.length)) && (0, _errors.illegalArgs)(`allowed wrap range: [0..${_src.length}]`);

  if (numLeft > 0) {
    for (let m = _src.length, i = m - numLeft; i < m; i++) {
      yield _src[i];
    }
  }

  yield* _src;

  if (numRight > 0) {
    for (let i = 0; i < numRight; i++) {
      yield _src[i];
    }
  }
}
},{"@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","@thi.ng/math":"../node_modules/@thi.ng/math/index.js"}],"../node_modules/@thi.ng/transducers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _iterator = require("./iterator");

Object.keys(_iterator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterator[key];
    }
  });
});

var _reduce = require("./reduce");

Object.keys(_reduce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reduce[key];
    }
  });
});

var _reduced = require("./reduced");

Object.keys(_reduced).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reduced[key];
    }
  });
});

var _run = require("./run");

Object.keys(_run).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _run[key];
    }
  });
});

var _step = require("./step");

Object.keys(_step).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _step[key];
    }
  });
});

var _transduce = require("./transduce");

Object.keys(_transduce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transduce[key];
    }
  });
});

var _add = require("./rfn/add");

Object.keys(_add).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _add[key];
    }
  });
});

var _assocMap = require("./rfn/assoc-map");

Object.keys(_assocMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assocMap[key];
    }
  });
});

var _assocObj = require("./rfn/assoc-obj");

Object.keys(_assocObj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assocObj[key];
    }
  });
});

var _conj = require("./rfn/conj");

Object.keys(_conj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _conj[key];
    }
  });
});

var _count = require("./rfn/count");

Object.keys(_count).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _count[key];
    }
  });
});

var _div = require("./rfn/div");

Object.keys(_div).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _div[key];
    }
  });
});

var _every = require("./rfn/every");

Object.keys(_every).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _every[key];
    }
  });
});

var _fill = require("./rfn/fill");

Object.keys(_fill).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fill[key];
    }
  });
});

var _frequencies = require("./rfn/frequencies");

Object.keys(_frequencies).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _frequencies[key];
    }
  });
});

var _groupBinary = require("./rfn/group-binary");

Object.keys(_groupBinary).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _groupBinary[key];
    }
  });
});

var _groupByMap = require("./rfn/group-by-map");

Object.keys(_groupByMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _groupByMap[key];
    }
  });
});

var _groupByObj = require("./rfn/group-by-obj");

Object.keys(_groupByObj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _groupByObj[key];
    }
  });
});

var _last = require("./rfn/last");

Object.keys(_last).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _last[key];
    }
  });
});

var _maxCompare = require("./rfn/max-compare");

Object.keys(_maxCompare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _maxCompare[key];
    }
  });
});

var _max = require("./rfn/max");

Object.keys(_max).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _max[key];
    }
  });
});

var _mean = require("./rfn/mean");

Object.keys(_mean).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mean[key];
    }
  });
});

var _minCompare = require("./rfn/min-compare");

Object.keys(_minCompare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _minCompare[key];
    }
  });
});

var _min = require("./rfn/min");

Object.keys(_min).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _min[key];
    }
  });
});

var _mul = require("./rfn/mul");

Object.keys(_mul).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mul[key];
    }
  });
});

var _pushCopy = require("./rfn/push-copy");

Object.keys(_pushCopy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pushCopy[key];
    }
  });
});

var _push = require("./rfn/push");

Object.keys(_push).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _push[key];
    }
  });
});

var _reductions = require("./rfn/reductions");

Object.keys(_reductions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reductions[key];
    }
  });
});

var _some = require("./rfn/some");

Object.keys(_some).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _some[key];
    }
  });
});

var _str = require("./rfn/str");

Object.keys(_str).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _str[key];
    }
  });
});

var _sub = require("./rfn/sub");

Object.keys(_sub).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sub[key];
    }
  });
});

var _benchmark = require("./xform/benchmark");

Object.keys(_benchmark).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _benchmark[key];
    }
  });
});

var _cat = require("./xform/cat");

Object.keys(_cat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cat[key];
    }
  });
});

var _converge = require("./xform/converge");

Object.keys(_converge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _converge[key];
    }
  });
});

var _convolve = require("./xform/convolve");

Object.keys(_convolve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _convolve[key];
    }
  });
});

var _dedupe = require("./xform/dedupe");

Object.keys(_dedupe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dedupe[key];
    }
  });
});

var _delayed = require("./xform/delayed");

Object.keys(_delayed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _delayed[key];
    }
  });
});

var _distinct = require("./xform/distinct");

Object.keys(_distinct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _distinct[key];
    }
  });
});

var _dropNth = require("./xform/drop-nth");

Object.keys(_dropNth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dropNth[key];
    }
  });
});

var _dropWhile = require("./xform/drop-while");

Object.keys(_dropWhile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dropWhile[key];
    }
  });
});

var _drop = require("./xform/drop");

Object.keys(_drop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _drop[key];
    }
  });
});

var _duplicate = require("./xform/duplicate");

Object.keys(_duplicate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _duplicate[key];
    }
  });
});

var _filter = require("./xform/filter");

Object.keys(_filter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filter[key];
    }
  });
});

var _filterFuzzy = require("./xform/filter-fuzzy");

Object.keys(_filterFuzzy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filterFuzzy[key];
    }
  });
});

var _flattenWith = require("./xform/flatten-with");

Object.keys(_flattenWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flattenWith[key];
    }
  });
});

var _flatten = require("./xform/flatten");

Object.keys(_flatten).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flatten[key];
    }
  });
});

var _indexed = require("./xform/indexed");

Object.keys(_indexed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _indexed[key];
    }
  });
});

var _interleave = require("./xform/interleave");

Object.keys(_interleave).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interleave[key];
    }
  });
});

var _interpolate = require("./xform/interpolate");

Object.keys(_interpolate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interpolate[key];
    }
  });
});

var _interpolateHermite = require("./xform/interpolate-hermite");

Object.keys(_interpolateHermite).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interpolateHermite[key];
    }
  });
});

var _interpolateLinear = require("./xform/interpolate-linear");

Object.keys(_interpolateLinear).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interpolateLinear[key];
    }
  });
});

var _interpose = require("./xform/interpose");

Object.keys(_interpose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interpose[key];
    }
  });
});

var _keep = require("./xform/keep");

Object.keys(_keep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keep[key];
    }
  });
});

var _labeled = require("./xform/labeled");

Object.keys(_labeled).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _labeled[key];
    }
  });
});

var _mapDeep = require("./xform/map-deep");

Object.keys(_mapDeep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapDeep[key];
    }
  });
});

var _mapIndexed = require("./xform/map-indexed");

Object.keys(_mapIndexed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapIndexed[key];
    }
  });
});

var _mapKeys = require("./xform/map-keys");

Object.keys(_mapKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapKeys[key];
    }
  });
});

var _mapNth = require("./xform/map-nth");

Object.keys(_mapNth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapNth[key];
    }
  });
});

var _mapVals = require("./xform/map-vals");

Object.keys(_mapVals).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapVals[key];
    }
  });
});

var _map = require("./xform/map");

Object.keys(_map).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _map[key];
    }
  });
});

var _mapcat = require("./xform/mapcat");

Object.keys(_mapcat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapcat[key];
    }
  });
});

var _matchFirst = require("./xform/match-first");

Object.keys(_matchFirst).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _matchFirst[key];
    }
  });
});

var _matchLast = require("./xform/match-last");

Object.keys(_matchLast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _matchLast[key];
    }
  });
});

var _movingAverage = require("./xform/moving-average");

Object.keys(_movingAverage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _movingAverage[key];
    }
  });
});

var _movingMedian = require("./xform/moving-median");

Object.keys(_movingMedian).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _movingMedian[key];
    }
  });
});

var _multiplex = require("./xform/multiplex");

Object.keys(_multiplex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _multiplex[key];
    }
  });
});

var _multiplexObj = require("./xform/multiplex-obj");

Object.keys(_multiplexObj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _multiplexObj[key];
    }
  });
});

var _noop = require("./xform/noop");

Object.keys(_noop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _noop[key];
    }
  });
});

var _padLast = require("./xform/pad-last");

Object.keys(_padLast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _padLast[key];
    }
  });
});

var _page = require("./xform/page");

Object.keys(_page).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _page[key];
    }
  });
});

var _partitionBy = require("./xform/partition-by");

Object.keys(_partitionBy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partitionBy[key];
    }
  });
});

var _partitionOf = require("./xform/partition-of");

Object.keys(_partitionOf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partitionOf[key];
    }
  });
});

var _partitionSort = require("./xform/partition-sort");

Object.keys(_partitionSort).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partitionSort[key];
    }
  });
});

var _partitionSync = require("./xform/partition-sync");

Object.keys(_partitionSync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partitionSync[key];
    }
  });
});

var _partition = require("./xform/partition");

Object.keys(_partition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partition[key];
    }
  });
});

var _pluck = require("./xform/pluck");

Object.keys(_pluck).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pluck[key];
    }
  });
});

var _rename = require("./xform/rename");

Object.keys(_rename).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rename[key];
    }
  });
});

var _sample = require("./xform/sample");

Object.keys(_sample).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sample[key];
    }
  });
});

var _scan = require("./xform/scan");

Object.keys(_scan).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scan[key];
    }
  });
});

var _selectKeys = require("./xform/select-keys");

Object.keys(_selectKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _selectKeys[key];
    }
  });
});

var _sideEffect = require("./xform/side-effect");

Object.keys(_sideEffect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sideEffect[key];
    }
  });
});

var _slidingWindow = require("./xform/sliding-window");

Object.keys(_slidingWindow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _slidingWindow[key];
    }
  });
});

var _streamShuffle = require("./xform/stream-shuffle");

Object.keys(_streamShuffle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _streamShuffle[key];
    }
  });
});

var _streamSort = require("./xform/stream-sort");

Object.keys(_streamSort).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _streamSort[key];
    }
  });
});

var _struct = require("./xform/struct");

Object.keys(_struct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _struct[key];
    }
  });
});

var _swizzle = require("./xform/swizzle");

Object.keys(_swizzle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swizzle[key];
    }
  });
});

var _takeNth = require("./xform/take-nth");

Object.keys(_takeNth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _takeNth[key];
    }
  });
});

var _takeLast = require("./xform/take-last");

Object.keys(_takeLast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _takeLast[key];
    }
  });
});

var _takeWhile = require("./xform/take-while");

Object.keys(_takeWhile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _takeWhile[key];
    }
  });
});

var _take = require("./xform/take");

Object.keys(_take).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _take[key];
    }
  });
});

var _throttle = require("./xform/throttle");

Object.keys(_throttle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _throttle[key];
    }
  });
});

var _throttleTime = require("./xform/throttle-time");

Object.keys(_throttleTime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _throttleTime[key];
    }
  });
});

var _toggle = require("./xform/toggle");

Object.keys(_toggle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _toggle[key];
    }
  });
});

var _trace = require("./xform/trace");

Object.keys(_trace).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _trace[key];
    }
  });
});

var _wordWrap = require("./xform/word-wrap");

Object.keys(_wordWrap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _wordWrap[key];
    }
  });
});

var _comp = require("./func/comp");

Object.keys(_comp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _comp[key];
    }
  });
});

var _compr = require("./func/compr");

Object.keys(_compr).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _compr[key];
    }
  });
});

var _deepTransform = require("./func/deep-transform");

Object.keys(_deepTransform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deepTransform[key];
    }
  });
});

var _juxtr = require("./func/juxtr");

Object.keys(_juxtr).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _juxtr[key];
    }
  });
});

var _keySelector = require("./func/key-selector");

Object.keys(_keySelector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keySelector[key];
    }
  });
});

var _lookup = require("./func/lookup");

Object.keys(_lookup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lookup[key];
    }
  });
});

var _renamer = require("./func/renamer");

Object.keys(_renamer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renamer[key];
    }
  });
});

var _asIterable = require("./iter/as-iterable");

Object.keys(_asIterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _asIterable[key];
    }
  });
});

var _choices = require("./iter/choices");

Object.keys(_choices).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _choices[key];
    }
  });
});

var _concat = require("./iter/concat");

Object.keys(_concat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _concat[key];
    }
  });
});

var _cycle = require("./iter/cycle");

Object.keys(_cycle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cycle[key];
    }
  });
});

var _extendSides = require("./iter/extend-sides");

Object.keys(_extendSides).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _extendSides[key];
    }
  });
});

var _iterate = require("./iter/iterate");

Object.keys(_iterate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterate[key];
    }
  });
});

var _keys = require("./iter/keys");

Object.keys(_keys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keys[key];
    }
  });
});

var _normRange = require("./iter/norm-range");

Object.keys(_normRange).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _normRange[key];
    }
  });
});

var _padSides = require("./iter/pad-sides");

Object.keys(_padSides).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _padSides[key];
    }
  });
});

var _pairs = require("./iter/pairs");

Object.keys(_pairs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pairs[key];
    }
  });
});

var _permutations = require("./iter/permutations");

Object.keys(_permutations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _permutations[key];
    }
  });
});

var _range = require("./iter/range");

Object.keys(_range).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _range[key];
    }
  });
});

var _range2d = require("./iter/range2d");

Object.keys(_range2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _range2d[key];
    }
  });
});

var _range3d = require("./iter/range3d");

Object.keys(_range3d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _range3d[key];
    }
  });
});

var _repeat = require("./iter/repeat");

Object.keys(_repeat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _repeat[key];
    }
  });
});

var _repeatedly = require("./iter/repeatedly");

Object.keys(_repeatedly).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _repeatedly[key];
    }
  });
});

var _reverse = require("./iter/reverse");

Object.keys(_reverse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reverse[key];
    }
  });
});

var _symmetric = require("./iter/symmetric");

Object.keys(_symmetric).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _symmetric[key];
    }
  });
});

var _tween = require("./iter/tween");

Object.keys(_tween).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tween[key];
    }
  });
});

var _vals = require("./iter/vals");

Object.keys(_vals).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vals[key];
    }
  });
});

var _wrapSides = require("./iter/wrap-sides");

Object.keys(_wrapSides).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _wrapSides[key];
    }
  });
});

var _zip = require("./iter/zip");

Object.keys(_zip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zip[key];
    }
  });
});
},{"./iterator":"../node_modules/@thi.ng/transducers/iterator.js","./reduce":"../node_modules/@thi.ng/transducers/reduce.js","./reduced":"../node_modules/@thi.ng/transducers/reduced.js","./run":"../node_modules/@thi.ng/transducers/run.js","./step":"../node_modules/@thi.ng/transducers/step.js","./transduce":"../node_modules/@thi.ng/transducers/transduce.js","./rfn/add":"../node_modules/@thi.ng/transducers/rfn/add.js","./rfn/assoc-map":"../node_modules/@thi.ng/transducers/rfn/assoc-map.js","./rfn/assoc-obj":"../node_modules/@thi.ng/transducers/rfn/assoc-obj.js","./rfn/conj":"../node_modules/@thi.ng/transducers/rfn/conj.js","./rfn/count":"../node_modules/@thi.ng/transducers/rfn/count.js","./rfn/div":"../node_modules/@thi.ng/transducers/rfn/div.js","./rfn/every":"../node_modules/@thi.ng/transducers/rfn/every.js","./rfn/fill":"../node_modules/@thi.ng/transducers/rfn/fill.js","./rfn/frequencies":"../node_modules/@thi.ng/transducers/rfn/frequencies.js","./rfn/group-binary":"../node_modules/@thi.ng/transducers/rfn/group-binary.js","./rfn/group-by-map":"../node_modules/@thi.ng/transducers/rfn/group-by-map.js","./rfn/group-by-obj":"../node_modules/@thi.ng/transducers/rfn/group-by-obj.js","./rfn/last":"../node_modules/@thi.ng/transducers/rfn/last.js","./rfn/max-compare":"../node_modules/@thi.ng/transducers/rfn/max-compare.js","./rfn/max":"../node_modules/@thi.ng/transducers/rfn/max.js","./rfn/mean":"../node_modules/@thi.ng/transducers/rfn/mean.js","./rfn/min-compare":"../node_modules/@thi.ng/transducers/rfn/min-compare.js","./rfn/min":"../node_modules/@thi.ng/transducers/rfn/min.js","./rfn/mul":"../node_modules/@thi.ng/transducers/rfn/mul.js","./rfn/push-copy":"../node_modules/@thi.ng/transducers/rfn/push-copy.js","./rfn/push":"../node_modules/@thi.ng/transducers/rfn/push.js","./rfn/reductions":"../node_modules/@thi.ng/transducers/rfn/reductions.js","./rfn/some":"../node_modules/@thi.ng/transducers/rfn/some.js","./rfn/str":"../node_modules/@thi.ng/transducers/rfn/str.js","./rfn/sub":"../node_modules/@thi.ng/transducers/rfn/sub.js","./xform/benchmark":"../node_modules/@thi.ng/transducers/xform/benchmark.js","./xform/cat":"../node_modules/@thi.ng/transducers/xform/cat.js","./xform/converge":"../node_modules/@thi.ng/transducers/xform/converge.js","./xform/convolve":"../node_modules/@thi.ng/transducers/xform/convolve.js","./xform/dedupe":"../node_modules/@thi.ng/transducers/xform/dedupe.js","./xform/delayed":"../node_modules/@thi.ng/transducers/xform/delayed.js","./xform/distinct":"../node_modules/@thi.ng/transducers/xform/distinct.js","./xform/drop-nth":"../node_modules/@thi.ng/transducers/xform/drop-nth.js","./xform/drop-while":"../node_modules/@thi.ng/transducers/xform/drop-while.js","./xform/drop":"../node_modules/@thi.ng/transducers/xform/drop.js","./xform/duplicate":"../node_modules/@thi.ng/transducers/xform/duplicate.js","./xform/filter":"../node_modules/@thi.ng/transducers/xform/filter.js","./xform/filter-fuzzy":"../node_modules/@thi.ng/transducers/xform/filter-fuzzy.js","./xform/flatten-with":"../node_modules/@thi.ng/transducers/xform/flatten-with.js","./xform/flatten":"../node_modules/@thi.ng/transducers/xform/flatten.js","./xform/indexed":"../node_modules/@thi.ng/transducers/xform/indexed.js","./xform/interleave":"../node_modules/@thi.ng/transducers/xform/interleave.js","./xform/interpolate":"../node_modules/@thi.ng/transducers/xform/interpolate.js","./xform/interpolate-hermite":"../node_modules/@thi.ng/transducers/xform/interpolate-hermite.js","./xform/interpolate-linear":"../node_modules/@thi.ng/transducers/xform/interpolate-linear.js","./xform/interpose":"../node_modules/@thi.ng/transducers/xform/interpose.js","./xform/keep":"../node_modules/@thi.ng/transducers/xform/keep.js","./xform/labeled":"../node_modules/@thi.ng/transducers/xform/labeled.js","./xform/map-deep":"../node_modules/@thi.ng/transducers/xform/map-deep.js","./xform/map-indexed":"../node_modules/@thi.ng/transducers/xform/map-indexed.js","./xform/map-keys":"../node_modules/@thi.ng/transducers/xform/map-keys.js","./xform/map-nth":"../node_modules/@thi.ng/transducers/xform/map-nth.js","./xform/map-vals":"../node_modules/@thi.ng/transducers/xform/map-vals.js","./xform/map":"../node_modules/@thi.ng/transducers/xform/map.js","./xform/mapcat":"../node_modules/@thi.ng/transducers/xform/mapcat.js","./xform/match-first":"../node_modules/@thi.ng/transducers/xform/match-first.js","./xform/match-last":"../node_modules/@thi.ng/transducers/xform/match-last.js","./xform/moving-average":"../node_modules/@thi.ng/transducers/xform/moving-average.js","./xform/moving-median":"../node_modules/@thi.ng/transducers/xform/moving-median.js","./xform/multiplex":"../node_modules/@thi.ng/transducers/xform/multiplex.js","./xform/multiplex-obj":"../node_modules/@thi.ng/transducers/xform/multiplex-obj.js","./xform/noop":"../node_modules/@thi.ng/transducers/xform/noop.js","./xform/pad-last":"../node_modules/@thi.ng/transducers/xform/pad-last.js","./xform/page":"../node_modules/@thi.ng/transducers/xform/page.js","./xform/partition-by":"../node_modules/@thi.ng/transducers/xform/partition-by.js","./xform/partition-of":"../node_modules/@thi.ng/transducers/xform/partition-of.js","./xform/partition-sort":"../node_modules/@thi.ng/transducers/xform/partition-sort.js","./xform/partition-sync":"../node_modules/@thi.ng/transducers/xform/partition-sync.js","./xform/partition":"../node_modules/@thi.ng/transducers/xform/partition.js","./xform/pluck":"../node_modules/@thi.ng/transducers/xform/pluck.js","./xform/rename":"../node_modules/@thi.ng/transducers/xform/rename.js","./xform/sample":"../node_modules/@thi.ng/transducers/xform/sample.js","./xform/scan":"../node_modules/@thi.ng/transducers/xform/scan.js","./xform/select-keys":"../node_modules/@thi.ng/transducers/xform/select-keys.js","./xform/side-effect":"../node_modules/@thi.ng/transducers/xform/side-effect.js","./xform/sliding-window":"../node_modules/@thi.ng/transducers/xform/sliding-window.js","./xform/stream-shuffle":"../node_modules/@thi.ng/transducers/xform/stream-shuffle.js","./xform/stream-sort":"../node_modules/@thi.ng/transducers/xform/stream-sort.js","./xform/struct":"../node_modules/@thi.ng/transducers/xform/struct.js","./xform/swizzle":"../node_modules/@thi.ng/transducers/xform/swizzle.js","./xform/take-nth":"../node_modules/@thi.ng/transducers/xform/take-nth.js","./xform/take-last":"../node_modules/@thi.ng/transducers/xform/take-last.js","./xform/take-while":"../node_modules/@thi.ng/transducers/xform/take-while.js","./xform/take":"../node_modules/@thi.ng/transducers/xform/take.js","./xform/throttle":"../node_modules/@thi.ng/transducers/xform/throttle.js","./xform/throttle-time":"../node_modules/@thi.ng/transducers/xform/throttle-time.js","./xform/toggle":"../node_modules/@thi.ng/transducers/xform/toggle.js","./xform/trace":"../node_modules/@thi.ng/transducers/xform/trace.js","./xform/word-wrap":"../node_modules/@thi.ng/transducers/xform/word-wrap.js","./func/comp":"../node_modules/@thi.ng/transducers/func/comp.js","./func/compr":"../node_modules/@thi.ng/transducers/func/compr.js","./func/deep-transform":"../node_modules/@thi.ng/transducers/func/deep-transform.js","./func/juxtr":"../node_modules/@thi.ng/transducers/func/juxtr.js","./func/key-selector":"../node_modules/@thi.ng/transducers/func/key-selector.js","./func/lookup":"../node_modules/@thi.ng/transducers/func/lookup.js","./func/renamer":"../node_modules/@thi.ng/transducers/func/renamer.js","./iter/as-iterable":"../node_modules/@thi.ng/transducers/iter/as-iterable.js","./iter/choices":"../node_modules/@thi.ng/transducers/iter/choices.js","./iter/concat":"../node_modules/@thi.ng/transducers/iter/concat.js","./iter/cycle":"../node_modules/@thi.ng/transducers/iter/cycle.js","./iter/extend-sides":"../node_modules/@thi.ng/transducers/iter/extend-sides.js","./iter/iterate":"../node_modules/@thi.ng/transducers/iter/iterate.js","./iter/keys":"../node_modules/@thi.ng/transducers/iter/keys.js","./iter/norm-range":"../node_modules/@thi.ng/transducers/iter/norm-range.js","./iter/pad-sides":"../node_modules/@thi.ng/transducers/iter/pad-sides.js","./iter/pairs":"../node_modules/@thi.ng/transducers/iter/pairs.js","./iter/permutations":"../node_modules/@thi.ng/transducers/iter/permutations.js","./iter/range":"../node_modules/@thi.ng/transducers/iter/range.js","./iter/range2d":"../node_modules/@thi.ng/transducers/iter/range2d.js","./iter/range3d":"../node_modules/@thi.ng/transducers/iter/range3d.js","./iter/repeat":"../node_modules/@thi.ng/transducers/iter/repeat.js","./iter/repeatedly":"../node_modules/@thi.ng/transducers/iter/repeatedly.js","./iter/reverse":"../node_modules/@thi.ng/transducers/iter/reverse.js","./iter/symmetric":"../node_modules/@thi.ng/transducers/iter/symmetric.js","./iter/tween":"../node_modules/@thi.ng/transducers/iter/tween.js","./iter/vals":"../node_modules/@thi.ng/transducers/iter/vals.js","./iter/wrap-sides":"../node_modules/@thi.ng/transducers/iter/wrap-sides.js","./iter/zip":"../node_modules/@thi.ng/transducers/iter/zip.js"}],"../node_modules/@thi.ng/rstream/utils/idgen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optsWithID = exports.nextID = void 0;
let NEXT_ID = 0;

const nextID = () => NEXT_ID++;

exports.nextID = nextID;

const optsWithID = (prefix, opts) => !opts || !opts.id ? Object.assign(Object.assign({}, opts), {
  id: prefix + "-" + nextID()
}) : opts;

exports.optsWithID = optsWithID;
},{}],"../node_modules/@thi.ng/rstream/subscription.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscription = exports.subscription = void 0;

var _api = require("@thi.ng/api");

var _arrays = require("@thi.ng/arrays");

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _transducers = require("@thi.ng/transducers");

var _api2 = require("./api");

var _idgen = require("./utils/idgen");

/**
 * Creates a new {@link Subscription} instance, the fundamental datatype
 * and building block provided by this package.
 *
 * @remarks
 * Most other types in rstream, including {@link Stream}s, are
 * `Subscription`s and all can be:
 *
 * - linked into directed graphs (sync or async & not necessarily DAGs)
 * - transformed using transducers (incl. support for early termination)
 * - can have any number of subscribers (optionally each w/ their own
 *   transducers)
 * - recursively unsubscribe themselves from parent after their last
 *   subscriber unsubscribed (configurable)
 * - will go into a non-recoverable error state if none of the
 *   subscribers has an error handler itself
 * - implement the {@link @thi.ng/api#IDeref} interface
 *
 * Subscription behavior can be customized via the additional (optional)
 * options arg. See `CommonOpts` and `SubscriptionOpts` for further
 * details.
 *
 * @example
 * ```ts
 * // as reactive value mechanism (same as with stream() above)
 * s = subscription();
 * s.subscribe(trace("s1"));
 * s.subscribe(trace("s2"), { xform: tx.filter((x) => x > 25) });
 *
 * // external trigger
 * s.next(23);
 * // s1 23
 * s.next(42);
 * // s1 42
 * // s2 42
 * ```
 *
 * @param sub
 * @param opts
 */
const subscription = (sub, opts) => new Subscription(sub, opts);

exports.subscription = subscription;

class Subscription {
  constructor(sub, opts = {}) {
    this.state = 0
    /* IDLE */
    ;
    this.parent = opts.parent;
    this.closeIn = opts.closeIn !== undefined ? opts.closeIn : 2
    /* LAST */
    ;
    this.closeOut = opts.closeOut !== undefined ? opts.closeOut : 2
    /* LAST */
    ;
    this.cacheLast = opts.cache !== false;
    this.id = opts.id || `sub-${(0, _idgen.nextID)()}`;
    this.last = _api.SEMAPHORE;
    this.subs = [];

    if (sub) {
      this.subs.push(sub);
    }

    if (opts.xform) {
      this.xform = opts.xform((0, _transducers.push)());
    }
  }

  deref() {
    return this.last !== _api.SEMAPHORE ? this.last : undefined;
  }

  getState() {
    return this.state;
  }

  subscribe(...args) {
    this.ensureState();
    let sub;
    let opts = args.length > 1 && (0, _checks.isPlainObject)((0, _arrays.peek)(args)) ? Object.assign({}, args.pop()) : {};

    switch (args.length) {
      case 1:
        if ((0, _checks.isFunction)(args[0])) {
          opts.xform = args[0];
          !opts.id && (opts.id = `xform-${(0, _idgen.nextID)()}`);
        } else {
          sub = args[0];
        }

        break;

      case 2:
        sub = args[0];
        opts.xform = args[1];
        break;

      default:
        (0, _errors.illegalArity)(args.length);
    }

    if ((0, _checks.implementsFunction)(sub, "subscribe")) {
      sub.parent = this;
    } else {
      // FIXME inherit options from this sub or defaults?
      sub = subscription(sub, Object.assign({
        parent: this
      }, opts));
    }

    this.last !== _api.SEMAPHORE && sub.next(this.last);
    return this.addWrapped(sub);
  }
  /**
   * Returns array of new child subscriptions for all given
   * subscribers.
   *
   * @param subs
   */


  subscribeAll(...subs) {
    const wrapped = [];

    for (let s of subs) {
      wrapped.push(this.subscribe(s));
    }

    return wrapped;
  }

  transform(...xf) {
    const n = xf.length - 1;
    return (0, _checks.isPlainObject)(xf[n]) ? this.subscribe((0, _transducers.comp)(...xf.slice(0, n)), xf[n]) : this.subscribe((0, _transducers.comp)(...xf));
  }
  /**
   * If called without arg, removes this subscription from parent (if
   * any), cleans up internal state and goes into DONE state. If
   * called with arg, removes the sub from internal pool and if no
   * other subs are remaining also cleans up itself and goes into DONE
   * state.
   *
   * @param sub
   */


  unsubscribe(sub) {
    _api2.LOGGER.debug(this.id, "unsub start", sub ? sub.id : "self");

    if (!sub) {
      let res = true;

      if (this.parent) {
        res = this.parent.unsubscribe(this);
      }

      this.state = 2
      /* DONE */
      ;
      this.cleanup();
      return res;
    }

    if (this.subs) {
      _api2.LOGGER.debug(this.id, "unsub child", sub.id);

      const idx = this.subs.indexOf(sub);

      if (idx >= 0) {
        this.subs.splice(idx, 1);

        if (this.closeOut === 1
        /* FIRST */
        || !this.subs.length && this.closeOut !== 0
        /* NEVER */
        ) {
          this.unsubscribe();
        }

        return true;
      }
    }

    return false;
  }

  next(x) {
    if (this.state < 2
    /* DONE */
    ) {
        if (this.xform) {
          const acc = this.xform[2]([], x);
          const uacc = (0, _transducers.unreduced)(acc);
          const n = uacc.length;

          for (let i = 0; i < n; i++) {
            this.dispatch(uacc[i]);
          }

          if ((0, _transducers.isReduced)(acc)) {
            this.done();
          }
        } else {
          this.dispatch(x);
        }
      }
  }

  done() {
    _api2.LOGGER.debug(this.id, "entering done()");

    if (this.state < 2
    /* DONE */
    ) {
        if (this.xform) {
          const acc = this.xform[1]([]);
          const uacc = (0, _transducers.unreduced)(acc);
          const n = uacc.length;

          for (let i = 0; i < n; i++) {
            this.dispatch(uacc[i]);
          }
        }

        this.state = 2
        /* DONE */
        ;

        for (let s of [...this.subs]) {
          try {
            s.done && s.done();
          } catch (e) {
            s.error ? s.error(e) : this.error(e);
          }
        }

        this.unsubscribe();

        _api2.LOGGER.debug(this.id, "exiting done()");
      }
  }

  error(e) {
    this.state = 3
    /* ERROR */
    ;
    let notified = false;

    if (this.subs && this.subs.length) {
      for (let s of this.subs.slice()) {
        if (s.error) {
          s.error(e);
          notified = true;
        }
      }
    }

    if (!notified) {
      _api2.LOGGER.warn(this.id, "unhandled error:", e);

      if (this.parent) {
        _api2.LOGGER.debug(this.id, "unsubscribing...");

        this.unsubscribe();
        this.state = 3
        /* ERROR */
        ;
      }
    }
  }

  addWrapped(wrapped) {
    this.subs.push(wrapped);
    this.state = 1
    /* ACTIVE */
    ;
    return wrapped;
  }

  dispatch(x) {
    // LOGGER.debug(this.id, "dispatch", x);
    this.cacheLast && (this.last = x);
    const subs = this.subs;
    let s;

    if (subs.length === 1) {
      s = subs[0];

      try {
        s.next && s.next(x);
      } catch (e) {
        s.error ? s.error(e) : this.error(e);
      }
    } else {
      for (let i = subs.length; --i >= 0;) {
        s = subs[i];

        try {
          s.next && s.next(x);
        } catch (e) {
          s.error ? s.error(e) : this.error(e);
        }
      }
    }
  }

  ensureState() {
    if (this.state >= 2
    /* DONE */
    ) {
        (0, _errors.illegalState)(`operation not allowed in state ${this.state}`);
      }
  }

  cleanup() {
    _api2.LOGGER.debug(this.id, "cleanup");

    this.subs.length = 0;
    delete this.parent;
    delete this.xform;
    delete this.last;
  }

}

exports.Subscription = Subscription;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/arrays":"../node_modules/@thi.ng/arrays/index.js","@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","./api":"../node_modules/@thi.ng/rstream/api.js","./utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/stream-sync.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamSync = exports.sync = void 0;

var _checks = require("@thi.ng/checks");

var _transducers = require("@thi.ng/transducers");

var _api = require("./api");

var _subscription = require("./subscription");

var _idgen = require("./utils/idgen");

/**
 * Similar to {@link StreamMerge}, but with extra synchronization of
 * inputs. Before emitting any new values, {@link StreamSync} collects
 * values until at least one has been received from *all* inputs. Once
 * that's the case, the collected values are sent as labeled tuple
 * object to downstream subscribers.
 *
 * @remarks
 * Each value in the emitted tuple objects is stored under their input
 * stream's ID. Only the last value received from each input is passed
 * on. After the initial tuple has been emitted, you can choose from two
 * possible behaviors:
 *
 * 1) Any future change in any input will produce a new result tuple.
 *    These tuples will retain the most recently read values from other
 *    inputs. This behavior is the default and illustrated in the above
 *    schematic.
 * 2) If the `reset` option is `true`, every input will have to provide
 *    at least one new value again until another result tuple is
 *    produced.
 *
 * Any done inputs are automatically removed. By default, `StreamSync`
 * calls {@link ISubscriber.done} when the last active input is done,
 * but this behavior can be overridden via the provided options.
 *
 * Input streams can be added and removed dynamically and the emitted
 * tuple size adjusts to the current number of inputs (the next time a
 * value is received from any input).
 *
 * If the `reset` option is enabled, the last emitted tuple is allowed
 * to be incomplete, by default. To only allow complete tuples, also set
 * the `all` option to `false`.
 *
 * The synchronization is done via the `partitionSync()` transducer from
 * the @thi.ng/transducers package. See this function's docs for further
 * details.
 *
 * @example
 * ```ts
 * const a = rs.stream();
 * const b = rs.stream();
 * s = sync({ src: { a, b } }).subscribe(trace("result: "));
 * a.next(1);
 * b.next(2);
 * // result: { a: 1, b: 2 }
 * ```
 *
 * @see StreamSyncOpts
 *
 * @param opts
 */
const sync = opts => new StreamSync(opts);

exports.sync = sync;

class StreamSync extends _subscription.Subscription {
  constructor(opts) {
    const srcIDs = new Set();
    const psync = (0, _transducers.partitionSync)(srcIDs, {
      key: x => x[0],
      mergeOnly: opts.mergeOnly === true,
      reset: opts.reset === true,
      all: opts.all !== false,
      backPressure: opts.backPressure || 0
    });
    const mapv = (0, _transducers.mapVals)(x => x[1]);
    super(undefined, (0, _idgen.optsWithID)("streamsync", Object.assign(Object.assign({}, opts), {
      xform: opts.xform ? (0, _transducers.comp)(psync, mapv, opts.xform) : (0, _transducers.comp)(psync, mapv)
    })));
    this.sources = new Map();
    this.realSourceIDs = new Map();
    this.invRealSourceIDs = new Map();
    this.idSources = new Map();
    this.sourceIDs = srcIDs;
    opts.src && this.addAll(opts.src);
  }

  add(src, id) {
    id || (id = src.id);
    this.ensureState();
    this.sourceIDs.add(id);
    this.realSourceIDs.set(id, src.id);
    this.invRealSourceIDs.set(src.id, id);
    this.idSources.set(src.id, src);
    this.sources.set(src, src.subscribe({
      next: x => {
        if (x[1] instanceof _subscription.Subscription) {
          this.add(x[1]);
        } else {
          this.next(x);
        }
      },
      done: () => this.markDone(src),
      __owner: this
    }, (0, _transducers.labeled)(id), {
      id: `in-${id}`
    }));
  }

  addAll(src) {
    if ((0, _checks.isPlainObject)(src)) {
      // pre-add all source ids for partitionSync
      for (let id in src) {
        this.sourceIDs.add(id);
      }

      for (let id in src) {
        this.add(src[id], id);
      }
    } else {
      // pre-add all source ids for partitionSync
      for (let s of src) {
        this.sourceIDs.add(s.id);
      }

      for (let s of src) {
        this.add(s);
      }
    }
  }

  remove(src) {
    const sub = this.sources.get(src);

    if (sub) {
      const id = this.invRealSourceIDs.get(src.id);

      _api.LOGGER.info(`removing src: ${src.id} (${id})`);

      this.sourceIDs.delete(id);
      this.realSourceIDs.delete(id);
      this.invRealSourceIDs.delete(src.id);
      this.idSources.delete(src.id);
      this.sources.delete(src);
      sub.unsubscribe();
      return true;
    }

    return false;
  }

  removeID(id) {
    const src = this.getSourceForID(id);
    return src ? this.remove(src) : false;
  }

  removeAll(src) {
    // pre-remove all source ids for partitionSync
    for (let s of src) {
      this.sourceIDs.delete(this.invRealSourceIDs.get(s.id));
    }

    let ok = true;

    for (let s of src) {
      ok = this.remove(s) && ok;
    }

    return ok;
  }

  removeAllIDs(ids) {
    let ok = true;

    for (let id of ids) {
      ok = this.removeID(id) && ok;
    }

    return ok;
  }

  getSourceForID(id) {
    return this.idSources.get(this.realSourceIDs.get(id));
  }

  getSources() {
    const res = {};

    for (let [id, src] of this.idSources) {
      res[this.invRealSourceIDs.get(id)] = src;
    }

    return res;
  }

  unsubscribe(sub) {
    if (!sub) {
      for (let s of this.sources.values()) {
        s.unsubscribe();
      }

      this.state = 2
      /* DONE */
      ;
      this.sources.clear();
      this.sourceIDs.clear();
      this.realSourceIDs.clear();
      this.invRealSourceIDs.clear();
      this.idSources.clear();
    }

    return super.unsubscribe(sub);
  }

  markDone(src) {
    this.remove(src);

    if (this.closeIn === 1
    /* FIRST */
    || this.closeIn === 2
    /* LAST */
    && !this.sources.size) {
      this.done();
    }
  }

}

exports.StreamSync = StreamSync;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","./api":"../node_modules/@thi.ng/rstream/api.js","./subscription":"../node_modules/@thi.ng/rstream/subscription.js","./utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/utils/worker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeWorker = exports.inlineWorker = void 0;

const inlineWorker = src => makeWorker(new Blob([src], {
  type: "text/javascript"
}));

exports.inlineWorker = inlineWorker;

const makeWorker = worker => worker instanceof Worker ? worker : new Worker(worker instanceof Blob ? URL.createObjectURL(worker) : worker);

exports.makeWorker = makeWorker;
},{}],"../node_modules/@thi.ng/rstream/subs/tunnel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tunnel = exports.tunnel = void 0;

var _api = require("../api");

var _subscription = require("../subscription");

var _idgen = require("../utils/idgen");

var _worker = require("../utils/worker");

/**
 * Returns a {@link Subscription} which processes received values via
 * the configured worker(s) and then passes values received back from
 * the worker(s) downstream, thereby allowing workers to be used
 * transparently for stream processing.
 *
 * @remarks
 * Multiple worker instances are supported for concurrent processing.
 * See the {@link TunnelOpts} for details.
 *
 * Also see {@link forkJoin} and {@link postWorker}.
 *
 * @param opts
 */
const tunnel = opts => new Tunnel(opts);

exports.tunnel = tunnel;

class Tunnel extends _subscription.Subscription {
  constructor(opts) {
    super(undefined, {
      id: opts.id || `tunnel-${(0, _idgen.nextID)()}`
    });
    this.src = opts.src;
    this.workers = new Array(opts.maxWorkers || 1);
    this.transferables = opts.transferables;
    this.terminate = opts.terminate || 1000;
    this.interrupt = opts.interrupt || false;
    this.index = 0;
  }

  next(x) {
    if (this.state < 2
    /* DONE */
    ) {
        let tx;

        if (this.transferables) {
          tx = this.transferables(x);
        }

        let worker = this.workers[this.index];

        if (this.interrupt && worker) {
          worker.terminate();
          worker = null;
        }

        if (!worker) {
          this.workers[this.index++] = worker = (0, _worker.makeWorker)(this.src);
          this.index %= this.workers.length;
          worker.addEventListener("message", e => this.dispatch(e.data));
          worker.addEventListener("error", e => this.error(e));
        }

        worker.postMessage(x, tx || []);
      }
  }

  done() {
    super.done();

    if (this.terminate > 0) {
      setTimeout(() => {
        _api.LOGGER.info("terminating workers...");

        this.workers.forEach(worker => worker && worker.terminate());
        delete this.workers;
      }, this.terminate);
    }
  }

}

exports.Tunnel = Tunnel;
},{"../api":"../node_modules/@thi.ng/rstream/api.js","../subscription":"../node_modules/@thi.ng/rstream/subscription.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js","../utils/worker":"../node_modules/@thi.ng/rstream/utils/worker.js"}],"../node_modules/@thi.ng/rstream/forkjoin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinBuffer = exports.forkBuffer = exports.forkJoin = void 0;

var _transducers = require("@thi.ng/transducers");

var _streamSync = require("./stream-sync");

var _tunnel = require("./subs/tunnel");

/**
 * Returns a {@link StreamSync} instance which creates & attaches
 * multiple subscriptions to given `src` input stream, processes each
 * received value in parallel via web workers, then recombines partial
 * results and passes the resulting transformed value downstream.
 *
 * @remarks
 * See {@link ForkJoinOpts} for further details & behavior options and
 * the {@link forkBuffer} and {@link joinBuffer} helpers for array-based
 * value processing (most likely use case).
 *
 * @param src input stream
 * @param opts
 */
const forkJoin = opts => {
  const numWorkers = opts.numWorkers || navigator.hardwareConcurrency || 4;
  const workerIDs = (0, _transducers.range)(numWorkers);
  return (0, _streamSync.sync)({
    src: [...(0, _transducers.map)(id => opts.src.transform((0, _transducers.map)(x => opts.fork(id, numWorkers, x))).subscribe((0, _tunnel.tunnel)({
      src: opts.worker,
      transferables: opts.transferables,
      interrupt: opts.interrupt === true,
      terminate: opts.terminate,
      id: String(id)
    })), workerIDs)],
    xform: (0, _transducers.comp)( // form result tuple in original order
    (0, _transducers.map)(results => [...(0, _transducers.map)(id => results[id], workerIDs)]), // apply user join function
    (0, _transducers.map)(opts.join)),
    reset: true,
    backPressure: opts.backPressure
  });
};
/**
 * Higher-order fork function for scenarios involving the split-parallel
 * processing of a large buffer.
 *
 * @remarks
 * The returned function is meant to be used as `fork` function in a
 * {@link ForkJoinOpts} config and extracts a workload slice of the
 * original buffer for a single worker. The HOF itself takes a minimum
 * chunk size as optional parameter (default: 1).
 *
 * **Note:** Depending on the configured `minChunkSize` and the size of
 * the input buffer to be partitioned, the returned fork function might
 * produce empty sub-arrays for some workers, iff the configured number
 * of workers exceeds the resulting number of chunks / input values.
 * E.g. If the number of workers = 8, buffer size = 10 and min chunk
 * size = 2, then the last 3 (i.e. 8 - 10 / 2) workers will only receive
 * empty workloads.
 *
 * More generally, if the input buffer size is not equally distributable
 * over the given number of workers, the last worker(s) might receive a
 * larger, smaller or empty chunk.
 *
 * Also see {@link forkJoin} and {@link joinBuffer}.
 *
 * @example
 * ```ts
 * forkJoin<number[], number[], number[], number[]>({
 *     src,
 *     // job definition / split buffer into chunks (min size 256 values)
 *     fork: forkBuffer(256),
 *     // re-join partial results
 *     join: joinBuffer(),
 *     worker: "./worker.js",
 * })
 * ```
 *
 * @param minChunkSize
 */


exports.forkJoin = forkJoin;

const forkBuffer = (minChunkSize = 1) => (id, numWorkers, buf) => {
  const chunkSize = Math.max(minChunkSize, buf.length / numWorkers | 0);
  return id < numWorkers - 1 ? buf.slice(id * chunkSize, (id + 1) * chunkSize) : buf.slice(id * chunkSize);
};
/**
 * Higher-order join function for scenarios involving the split-parallel
 * processing of a large buffer.
 *
 * @remarks
 * The returned function is meant to be used as `join` function in a
 * {@link ForkJoinOpts} config, receives the processed result chunks
 * from all workers (ordered by worker ID) and concatenates them back
 * into a single result array.
 *
 * The optional `fn` arg can be used to pick the actual result chunk
 * from each worker result. This is useful if the worker result type is
 * not an array and includes other data points (e.g. execution metrics
 * etc.). If `fn` is not given, it defaults to the identity function
 * (i.e. each worker's result is assumed to be an array).
 *
 * Also see {@link forkJoin} and {@link forkBuffer}.
 *
 * @param fn
 */


exports.forkBuffer = forkBuffer;

const joinBuffer = fn => fn ? parts => [...(0, _transducers.mapcat)(fn, parts)] : parts => Array.prototype.concat.apply([], parts);

exports.joinBuffer = joinBuffer;
},{"@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","./stream-sync":"../node_modules/@thi.ng/rstream/stream-sync.js","./subs/tunnel":"../node_modules/@thi.ng/rstream/subs/tunnel.js"}],"../node_modules/@thi.ng/rstream/metastream.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetaStream = exports.metaStream = void 0;

var _api = require("@thi.ng/api");

var _subscription = require("./subscription");

var _idgen = require("./utils/idgen");

/**
 * Returns a {@link Subscription} which transforms each incoming value
 * into a new {@link Stream}, subscribes to it (via an hidden / internal
 * subscription) and then only passes values from that stream to its own
 * subscribers.
 *
 * @remarks
 * If a new value is received, the metastream first unsubscribes from
 * any still active stream, before creating and subscribing to the new
 * stream. Hence this stream type is useful for cases where streams need
 * to be dynamically created & inserted into an existing dataflow
 * topology.
 *
 * The user supplied `factory` function will be called for each incoming
 * value and is responsible for creating the new stream instances. If
 * the function returns null/undefined, no further action will be taken
 * (acts like a filter transducer).
 *
 * The factory function does NOT need to create *new* streams, but can
 * merely return other existing streams, and so making the meta stream
 * act like a switch with arbitrary criteria.
 *
 * If the meta stream itself is the only subscriber to existing input
 * streams, you'll need to configure the input's
 * {@link CommonOpts.closeOut} option to keep them alive and support
 * dynamic switching between them.
 *
 * @example
 * ```ts
 * // transform each received odd number into a stream
 * // producing 3 copies of that number in the metastream
 * // even numbers are ignored
 * a = metastream(
 *   (x) => (x & 1)
 *     ? fromIterable(tx.repeat(x, 3), { delay: 100 })
 *     : null
 * );
 *
 * a.subscribe(trace())
 * a.next(23)
 *
 * // 23
 * // 23
 * // 23
 *
 * a.next(42) // ignored by factory fn
 *
 * a.next(43)
 * // 43
 * // 43
 * // 43
 * ```
 *
 * @example
 * ```ts
 * // infinite inputs
 * a = fromIterable(
 *   tx.repeat("a"),
 *   { delay: 1000, closeOut: CloseMode.NEVER }
 * );
 * b = fromIterable(
 *   tx.repeat("b"),
 *   { delay: 1000, closeOut: CloseMode.NEVER }
 * );
 *
 * // stream selector / switch
 * m = metaStream((x) => x ? a : b);
 * m.subscribe(trace("meta from: "));
 *
 * m.next(true);
 * // meta from: a
 *
 * m.next(false);
 * // meta from: b
 *
 * m.next(true);
 * // meta from: a
 * ```
 *
 * @param factory
 * @param id
 */
const metaStream = (factory, opts) => new MetaStream(factory, opts);

exports.metaStream = metaStream;

class MetaStream extends _subscription.Subscription {
  constructor(factory, opts) {
    super(undefined, (0, _idgen.optsWithID)("metastram", opts));
    this.factory = factory;
  }

  next(x) {
    if (this.state < 2
    /* DONE */
    ) {
        if (this.stream) {
          this.stream.unsubscribe(this.sub);
        }

        let stream = this.factory(x);

        if (stream) {
          this.stream = stream;
          this.sub = this.stream.subscribe({
            next: x => {
              stream === this.stream && super.dispatch(x);
            },
            done: () => {
              this.stream.unsubscribe(this.sub);

              if (stream === this.stream) {
                this.stream = undefined;
                this.sub = undefined;
              }
            },
            error: e => super.error(e),
            __owner: this
          });
        }
      }
  }

  done() {
    if (this.stream) {
      this.detach();
    }

    super.done();
  }

  unsubscribe(sub) {
    if (this.stream && (!sub || this.subs.length === 1)) {
      this.detach();
    }

    return super.unsubscribe();
  }

  detach() {
    (0, _api.assert)(!!this.stream, "input stream already removed");
    this.stream.unsubscribe(this.sub);
    delete this.stream;
    delete this.sub;
  }

}

exports.MetaStream = MetaStream;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","./subscription":"../node_modules/@thi.ng/rstream/subscription.js","./utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/associative/dissoc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dissoc = dissoc;
exports.dissocObj = void 0;

function dissoc(coll, keys) {
  for (let k of keys) {
    coll.delete(k);
  }

  return coll;
}

const dissocObj = (obj, keys) => {
  for (let k of keys) {
    delete obj[k];
  }

  return obj;
};

exports.dissocObj = dissocObj;
},{}],"../node_modules/@thi.ng/associative/internal/equiv.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equivSet = exports.equivMap = void 0;

var _equiv = require("@thi.ng/equiv");

const equivMap = (a, b) => {
  if (a === b) {
    return true;
  }

  if (!(b instanceof Map) || a.size !== b.size) {
    return false;
  }

  for (let p of a.entries()) {
    if (!(0, _equiv.equiv)(b.get(p[0]), p[1])) {
      return false;
    }
  }

  return true;
};

exports.equivMap = equivMap;

const equivSet = (a, b) => {
  if (a === b) {
    return true;
  }

  if (!(b instanceof Set) || a.size !== b.size) {
    return false;
  }

  for (let k of a.keys()) {
    if (!b.has(k)) {
      return false;
    }
  }

  return true;
};

exports.equivSet = equivSet;
},{"@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js"}],"../node_modules/@thi.ng/associative/into.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.into = into;

var _checks = require("@thi.ng/checks");

function into(dest, src) {
  if ((0, _checks.isMap)(dest)) {
    for (let x of src) {
      dest.set(x[0], x[1]);
    }
  } else {
    for (let x of src) {
      dest.add(x);
    }
  }

  return dest;
}
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js"}],"../node_modules/@thi.ng/associative/array-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArraySet = void 0;

var _api = require("@thi.ng/api");

var _equiv = require("@thi.ng/equiv");

var _dissoc = require("./dissoc");

var _equiv2 = require("./internal/equiv");

var _into = require("./into");

const __private = new WeakMap();

const __vals = inst => __private.get(inst).vals;
/**
 * An alternative set implementation to the native ES6 Set type. Uses
 * customizable equality/equivalence predicate and so is more useful
 * when dealing with structured data. Implements full API of native Set
 * and by the default uses `@thi.ng/equiv` for equivalence checking.
 *
 * Additionally, the type also implements the `ICopy`, `IEmpty` and
 * `IEquiv` interfaces itself.
 */


class ArraySet extends Set {
  constructor(vals, opts = {}) {
    super();

    __private.set(this, {
      equiv: opts.equiv || _equiv.equiv,
      vals: []
    });

    vals && this.into(vals);
  }

  *[Symbol.iterator]() {
    yield* __vals(this);
  }

  get [Symbol.species]() {
    return ArraySet;
  }

  get [Symbol.toStringTag]() {
    return "ArraySet";
  }

  get size() {
    return __vals(this).length;
  }

  copy() {
    const $this = __private.get(this);

    const s = new ArraySet(null, {
      equiv: $this.equiv
    });
    __private.get(s).vals = $this.vals.slice();
    return s;
  }

  empty() {
    return new ArraySet(null, this.opts());
  }

  clear() {
    __vals(this).length = 0;
  }

  first() {
    if (this.size) {
      return __vals(this)[0];
    }
  }

  add(key) {
    !this.has(key) && __vals(this).push(key);
    return this;
  }

  into(keys) {
    return (0, _into.into)(this, keys);
  }

  has(key) {
    return this.get(key, _api.SEMAPHORE) !== _api.SEMAPHORE;
  }
  /**
   * Returns the canonical value for `x`, if present. If the set
   * contains no equivalent for `x`, returns `notFound`.
   *
   * @param key
   * @param notFound
   */


  get(key, notFound) {
    const $this = __private.get(this);

    const eq = $this.equiv;
    const vals = $this.vals;

    for (let i = vals.length; --i >= 0;) {
      if (eq(vals[i], key)) {
        return vals[i];
      }
    }

    return notFound;
  }

  delete(key) {
    const $this = __private.get(this);

    const eq = $this.equiv;
    const vals = $this.vals;

    for (let i = vals.length; --i >= 0;) {
      if (eq(vals[i], key)) {
        vals.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  disj(keys) {
    return (0, _dissoc.dissoc)(this, keys);
  }

  equiv(o) {
    return (0, _equiv2.equivSet)(this, o);
  }

  forEach(fn, thisArg) {
    const vals = __vals(this);

    for (let i = vals.length; --i >= 0;) {
      const v = vals[i];
      fn.call(thisArg, v, v, this);
    }
  }

  *entries() {
    for (let v of __vals(this)) {
      yield [v, v];
    }
  }

  *keys() {
    yield* __vals(this);
  }

  *values() {
    yield* __vals(this);
  }

  opts() {
    return {
      equiv: __private.get(this).equiv
    };
  }

}

exports.ArraySet = ArraySet;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js","./dissoc":"../node_modules/@thi.ng/associative/dissoc.js","./internal/equiv":"../node_modules/@thi.ng/associative/internal/equiv.js","./into":"../node_modules/@thi.ng/associative/into.js"}],"../node_modules/@thi.ng/associative/common-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonKeysObj = exports.commonKeysMap = void 0;

/**
 * Like `commonKeysObj()`, but for ES6 Maps.
 *
 * @param a
 * @param b
 * @param out
 */
const commonKeysMap = (a, b, out = []) => {
  for (let k of a.keys()) {
    b.has(k) && out.push(k);
  }

  return out;
};
/**
 * Returns array of keys present in both args, i.e. the set intersection
 * of the given objects' key / property sets.
 *
 * ```
 * commonKeys({ a: 1, b: 2 }, { c: 10, b: 20, a: 30 })
 * // [ "a", "b" ]
 * ```
 *
 * @param a
 * @param b
 * @param out
 */


exports.commonKeysMap = commonKeysMap;

const commonKeysObj = (a, b, out = []) => {
  for (let k in a) {
    b.hasOwnProperty(k) && out.push(k);
  }

  return out;
};

exports.commonKeysObj = commonKeysObj;
},{}],"../node_modules/@thi.ng/associative/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureSet = exports.ensureMap = exports.objValues = exports.first = exports.copy = exports.empty = void 0;

var _checks = require("@thi.ng/checks");

const empty = (x, ctor) => (0, _checks.implementsFunction)(x, "empty") ? x.empty() : new (x[Symbol.species] || ctor)();

exports.empty = empty;

const copy = (x, ctor) => (0, _checks.implementsFunction)(x, "copy") ? x.copy() : new (x[Symbol.species] || ctor)(x);

exports.copy = copy;

const first = x => x[Symbol.iterator]().next().value;

exports.first = first;

const objValues = src => {
  const vals = [];

  for (let k in src) {
    src.hasOwnProperty(k) && vals.push(src[k]);
  }

  return vals;
};

exports.objValues = objValues;

const ensureMap = x => (0, _checks.isMap)(x) ? x : new Map(x);

exports.ensureMap = ensureMap;

const ensureSet = x => (0, _checks.isSet)(x) ? x : new Set(x);

exports.ensureSet = ensureSet;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js"}],"../node_modules/@thi.ng/associative/internal/xform-setop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xformSetOp = void 0;

var _transducers = require("@thi.ng/transducers");

var _utils = require("../utils");

const xformSetOp = (rfn, op, src) => src ? (0, _transducers.reduce)(rfn(), src) : [() => null, acc => acc || new Set(), (acc, x) => !acc ? (0, _utils.ensureSet)(x) : op(acc, (0, _utils.ensureSet)(x))];

exports.xformSetOp = xformSetOp;
},{"@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","../utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/difference.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.differenceR = differenceR;
exports.difference = void 0;

var _xformSetop = require("./internal/xform-setop");

var _into = require("./into");

var _utils = require("./utils");

/**
 * Computes the difference of sets `a - b` and writes results to new set
 * or optionally given set `out` (assumed to be empty for correct
 * results).
 *
 * @param a
 * @param b
 * @param out
 */
const difference = (a, b, out) => {
  if (a === b) {
    return out || (0, _utils.empty)(a, Set);
  }

  out = out ? (0, _into.into)(out, a) : (0, _utils.copy)(a, Set);

  for (let i of b) {
    out.delete(i);
  }

  return out;
};

exports.difference = difference;

function differenceR(src) {
  return (0, _xformSetop.xformSetOp)(differenceR, difference, src);
}
},{"./internal/xform-setop":"../node_modules/@thi.ng/associative/internal/xform-setop.js","./into":"../node_modules/@thi.ng/associative/into.js","./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/equiv-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EquivMap = void 0;

var _api = require("@thi.ng/api");

var _equiv = require("@thi.ng/equiv");

var _arraySet = require("./array-set");

var _dissoc = require("./dissoc");

var _equiv2 = require("./internal/equiv");

var _into = require("./into");

const __private = new WeakMap();

const __map = map => __private.get(map).map;

class EquivMap extends Map {
  /**
   * Converts given vanilla object into an `EquivMap` instance with
   * default (or optionally provided) options and returns it. By
   * default uses strict `===` equality check for `equiv` option.
   *
   * @param obj
   * @param opts
   */
  static fromObject(obj, opts) {
    const m = new EquivMap(null, Object.assign({
      equiv: (a, b) => a === b
    }, opts));

    for (let k in obj) {
      obj.hasOwnProperty(k) && m.set(k, obj[k]);
    }

    return m;
  }
  /**
   * Creates a new instance with optional initial key-value pairs and
   * provided options. If no `opts` are given, uses `ArraySet` for
   * storing canonical keys and `@thi.ng/equiv` for checking key
   * equivalence.
   *
   * @param pairs
   * @param opts
   */


  constructor(pairs, opts) {
    super();

    const _opts = Object.assign({
      equiv: _equiv.equiv,
      keys: _arraySet.ArraySet
    }, opts);

    __private.set(this, {
      keys: new _opts.keys(null, {
        equiv: _opts.equiv
      }),
      map: new Map(),
      opts: _opts
    });

    if (pairs) {
      this.into(pairs);
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  get [Symbol.species]() {
    return EquivMap;
  }

  get [Symbol.toStringTag]() {
    return "EquivMap";
  }

  get size() {
    return __private.get(this).keys.size;
  }

  clear() {
    const $this = __private.get(this);

    $this.keys.clear();
    $this.map.clear();
  }

  empty() {
    return new EquivMap(null, __private.get(this).opts);
  }

  copy() {
    const $this = __private.get(this);

    const m = new EquivMap();

    __private.set(m, {
      keys: $this.keys.copy(),
      map: new Map($this.map),
      opts: $this.opts
    });

    return m;
  }

  equiv(o) {
    return (0, _equiv2.equivMap)(this, o);
  }

  delete(key) {
    const $this = __private.get(this);

    key = $this.keys.get(key, _api.SEMAPHORE);

    if (key !== _api.SEMAPHORE) {
      $this.map.delete(key);
      $this.keys.delete(key);
      return true;
    }

    return false;
  }

  dissoc(keys) {
    return (0, _dissoc.dissoc)(this, keys);
  }

  forEach(fn, thisArg) {
    for (let pair of __map(this)) {
      fn.call(thisArg, pair[1], pair[0], this);
    }
  }

  get(key, notFound) {
    const $this = __private.get(this);

    key = $this.keys.get(key, _api.SEMAPHORE);

    if (key !== _api.SEMAPHORE) {
      return $this.map.get(key);
    }

    return notFound;
  }

  has(key) {
    return __private.get(this).keys.has(key);
  }

  set(key, value) {
    const $this = __private.get(this);

    const k = $this.keys.get(key, _api.SEMAPHORE);

    if (k !== _api.SEMAPHORE) {
      $this.map.set(k, value);
    } else {
      $this.keys.add(key);
      $this.map.set(key, value);
    }

    return this;
  }

  into(pairs) {
    return (0, _into.into)(this, pairs);
  }

  entries() {
    return __map(this).entries();
  }

  keys() {
    return __map(this).keys();
  }

  values() {
    return __map(this).values();
  }

  opts() {
    return __private.get(this).opts;
  }

}

exports.EquivMap = EquivMap;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js","./array-set":"../node_modules/@thi.ng/associative/array-set.js","./dissoc":"../node_modules/@thi.ng/associative/dissoc.js","./internal/equiv":"../node_modules/@thi.ng/associative/internal/equiv.js","./into":"../node_modules/@thi.ng/associative/into.js"}],"../node_modules/@thi.ng/binary/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MASKS = void 0;
const MASKS = new Array(33).fill(0).map((_, i) => Math.pow(2, i) - 1);
exports.MASKS = MASKS;
},{}],"../node_modules/@thi.ng/binary/align.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAligned = exports.align = void 0;

/**
 * Aligns `addr` to next multiple of `size`. The latter must be a power
 * of 2.
 *
 * @param addr
 * @param size
 */
const align = (addr, size) => (size--, addr + size & ~size);
/**
 * Returns true if `addr` is aligned to wordsize `size`.
 */


exports.align = align;

const isAligned = (addr, size) => !(addr & size - 1);

exports.isAligned = isAligned;
},{}],"../node_modules/@thi.ng/binary/count.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bitSize = exports.ctz32 = exports.clz32 = exports.hammingDist = exports.popCount = void 0;

/**
 * Returns number of 1 bits in `x`.
 *
 * @param x
 */
const popCount = x => (x = x - (x >>> 1 & 0x55555555), x = (x & 0x33333333) + (x >>> 2 & 0x33333333), (x + (x >>> 4) & 0xf0f0f0f) * 0x1010101 >>> 24);
/**
 * https://en.wikipedia.org/wiki/Hamming_distance
 *
 * @param x
 * @param y
 */


exports.popCount = popCount;

const hammingDist = (x, y) => popCount(x ^ y);
/**
 * Math.clz32() polyfill (corrected).
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32$revision/1426816
 *
 * @param x
 */


exports.hammingDist = hammingDist;

const clz32 = x => x !== 0 ? 31 - (Math.log(x >>> 0) / Math.LN2 | 0) : 32;

exports.clz32 = clz32;

const ctz32 = x => {
  let c = 32;
  x &= -x;
  x && c--;
  x & 0x0000ffff && (c -= 16);
  x & 0x00ff00ff && (c -= 8);
  x & 0x0f0f0f0f && (c -= 4);
  x & 0x33333333 && (c -= 2);
  x & 0x55555555 && (c -= 1);
  return c;
};
/**
 * Returns the number of bits required to encode `x` (MUST be > 0).
 *
 * @param x
 */


exports.ctz32 = ctz32;

const bitSize = x => Math.ceil(Math.log(x) / Math.LN2);

exports.bitSize = bitSize;
},{}],"../node_modules/@thi.ng/binary/mask.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maskH = exports.maskL = exports.defMask = void 0;

var _api = require("./api");

/**
 * Creates bit mask by enabling bit `a` to bit `b-1`, both in range
 * 0-32. `b` MUST be >= `a`.
 *
 * ```
 * defMask(1,31).toString(16) // 7ffffffe
 * defMask(3,8).toString(16)  // f8
 * ```
 *
 * @param a
 * @param b
 */
const defMask = (a, b) => (~_api.MASKS[a] & _api.MASKS[b]) >>> 0;
/**
 * Returns unsigned version of `x` with only lowest `n` bits.
 *
 * @param n
 * @param x
 */


exports.defMask = defMask;

const maskL = (n, x) => (x & _api.MASKS[n]) >>> 0;
/**
 * Returns unsigned version of `x` with only highest `n` bits.
 *
 * @param n
 * @param x
 */


exports.maskL = maskL;

const maskH = (n, x) => (x & ~_api.MASKS[n]) >>> 0;

exports.maskH = maskH;
},{"./api":"../node_modules/@thi.ng/binary/api.js"}],"../node_modules/@thi.ng/binary/edit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bitClearWindow = exports.bitSetWindow = exports.bitSet = exports.bitFlip = exports.bitClear = void 0;

var _mask = require("./mask");

/**
 * Clears bit in given uint `x`.
 *
 * @param x value
 * @param bit bit number (0..31)
 */
const bitClear = (x, bit) => (x & ~(1 << bit)) >>> 0;
/**
 * Toggles bit in given uint `x`.
 *
 * @param x
 * @param bit
 */


exports.bitClear = bitClear;

const bitFlip = (x, bit) => (x ^ 1 << bit) >>> 0;
/**
 * Sets bit in given uint `x`.
 *
 * @param x value
 * @param bit bit number (0..31)
 */


exports.bitFlip = bitFlip;

const bitSet = (x, bit) => (x | 1 << bit) >>> 0;

exports.bitSet = bitSet;

const bitSetWindow = (x, y, from, to) => {
  const m = (0, _mask.defMask)(from, to);
  return x & ~m | y << (1 << from) & m;
};

exports.bitSetWindow = bitSetWindow;

const bitClearWindow = (x, from, to) => x & ~(0, _mask.defMask)(from, to);

exports.bitClearWindow = bitClearWindow;
},{"./mask":"../node_modules/@thi.ng/binary/mask.js"}],"../node_modules/@thi.ng/binary/float.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floatToSortableInt = exports.uintBitsToFloat = exports.intBitsToFloat = exports.floatToUintBits = exports.floatToIntBits = void 0;
const F32 = new Float32Array(1);
const I32 = new Int32Array(F32.buffer);
const U32 = new Uint32Array(F32.buffer);

const floatToIntBits = x => (F32[0] = x, I32[0]);

exports.floatToIntBits = floatToIntBits;

const floatToUintBits = x => (F32[0] = x, U32[0]);

exports.floatToUintBits = floatToUintBits;

const intBitsToFloat = x => (I32[0] = x, F32[0]);

exports.intBitsToFloat = intBitsToFloat;

const uintBitsToFloat = x => (U32[0] = x, F32[0]);
/**
 * Converts given float into a sortable integer representation, using
 * raw bitwise conversion via `floatToIntBits()`.
 *
 * https://github.com/tzaeschke/phtree/blob/master/PhTreeRevisited.pdf
 * (page 3)
 *
 * @param x
 */


exports.uintBitsToFloat = uintBitsToFloat;

const floatToSortableInt = x => {
  if (x === -0) x = 0;
  const i = floatToIntBits(x);
  return x < 0 ? ~i | 1 << 31 : i;
};

exports.floatToSortableInt = floatToSortableInt;
},{}],"../node_modules/@thi.ng/binary/gray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeGray32 = exports.encodeGray32 = void 0;

/**
 * Converts 32bit unsigned int to Gray code (reflected binary). Gray
 * codes of successive values always have a Hamming distance of 1 (i.e.
 * only 1 bit changes at a time).
 *
 * https://en.wikipedia.org/wiki/Gray_code
 *
 * @param x u32
 */
const encodeGray32 = x => (x ^ x >>> 1) >>> 0;
/**
 * Converts 32bit Gray code to binary / unsigned int.
 *
 * https://en.wikipedia.org/wiki/Gray_code
 */


exports.encodeGray32 = encodeGray32;

const decodeGray32 = x => {
  x = x ^ x >>> 16;
  x = x ^ x >>> 8;
  x = x ^ x >>> 4;
  x = x ^ x >>> 2;
  x = x ^ x >>> 1;
  return x >>> 0;
};

exports.decodeGray32 = decodeGray32;
},{}],"../node_modules/@thi.ng/binary/logic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bitDemux = exports.bitMux = exports.bitOai22 = exports.bitAoi22 = exports.bitOai21 = exports.bitAoi21 = exports.bitImply = exports.bitXnor = exports.bitXor = exports.bitNor = exports.bitOr = exports.bitNand = exports.bitAnd = exports.bitNot = void 0;

var _mask = require("./mask");

const bitNot = (n, x) => (0, _mask.maskL)(n, ~x);

exports.bitNot = bitNot;

const bitAnd = (n, a, b) => (0, _mask.maskL)(n, a & b);

exports.bitAnd = bitAnd;

const bitNand = (n, a, b) => (0, _mask.maskL)(n, ~(a & b));

exports.bitNand = bitNand;

const bitOr = (n, a, b) => (0, _mask.maskL)(n, a | b);

exports.bitOr = bitOr;

const bitNor = (n, a, b) => (0, _mask.maskL)(n, ~(a & b));

exports.bitNor = bitNor;

const bitXor = (n, a, b) => (0, _mask.maskL)(n, a ^ b);

exports.bitXor = bitXor;

const bitXnor = (n, a, b) => (0, _mask.maskL)(n, ~(a ^ b));

exports.bitXnor = bitXnor;

const bitImply = (n, a, b) => (0, _mask.maskL)(n, ~a | b);

exports.bitImply = bitImply;

const bitAoi21 = (n, a, b, c) => (0, _mask.maskL)(n, ~(a | b & c));

exports.bitAoi21 = bitAoi21;

const bitOai21 = (n, a, b, c) => (0, _mask.maskL)(n, ~(a & (b | c)));

exports.bitOai21 = bitOai21;

const bitAoi22 = (n, a, b, c, d) => (0, _mask.maskL)(n, ~(a & b | c & d));

exports.bitAoi22 = bitAoi22;

const bitOai22 = (n, a, b, c, d) => (0, _mask.maskL)(n, ~((a | b) & (c | d)));

exports.bitOai22 = bitOai22;

const bitMux = (n, a, b, s) => (0, _mask.maskL)(n, a & ~s | b & s);

exports.bitMux = bitMux;

const bitDemux = (n, a, b, s) => [(0, _mask.maskL)(n, a & ~s), (0, _mask.maskL)(n, b & s)];

exports.bitDemux = bitDemux;
},{"./mask":"../node_modules/@thi.ng/binary/mask.js"}],"../node_modules/@thi.ng/binary/pow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floorPow2 = exports.ceilPow2 = exports.isPow2 = void 0;

// http://graphics.stanford.edu/~seander/bithacks.html
const isPow2 = x => !!x && !(x & x - 1);

exports.isPow2 = isPow2;

const ceilPow2 = x => {
  x += x === 0;
  --x;
  x |= x >>> 1;
  x |= x >>> 2;
  x |= x >>> 4;
  x |= x >>> 8;
  x |= x >>> 16;
  return x + 1;
};

exports.ceilPow2 = ceilPow2;

const floorPow2 = x => {
  x |= x >>> 1;
  x |= x >>> 2;
  x |= x >>> 4;
  x |= x >>> 8;
  x |= x >>> 16;
  return x - (x >>> 1);
};

exports.floorPow2 = floorPow2;
},{}],"../node_modules/@thi.ng/binary/rotate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotateRight = exports.rotateLeft = void 0;

/**
 * Rotates `x` `n` bits to the left.
 *
 * @param x
 * @param n
 */
const rotateLeft = (x, n) => (x << n | x >>> 32 - n) >>> 0;
/**
 * Rotates `x` `n` bits to the right.
 *
 * @param x
 * @param n
 */


exports.rotateLeft = rotateLeft;

const rotateRight = (x, n) => (x >>> n | x << 32 - n) >>> 0;

exports.rotateRight = rotateRight;
},{}],"../node_modules/@thi.ng/binary/splat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.same8 = exports.same4 = exports.splat16_32 = exports.splat8_32 = exports.splat8_24 = exports.splat4_32 = exports.splat4_24 = void 0;

/**
 * Repeats lowest nibble of `x` as 24 bit uint.
 *
 * @param x
 */
const splat4_24 = x => (x & 0xf) * 0x111111;
/**
 * Repeats lowest nibble of `x` as 32 bit uint.
 *
 * @param x
 */


exports.splat4_24 = splat4_24;

const splat4_32 = x => (x & 0xf) * 0x11111111 >>> 0;
/**
 * Repeats lowest byte of `x` as 24 bit uint.
 *
 * @param x
 */


exports.splat4_32 = splat4_32;

const splat8_24 = x => (x & 0xff) * 0x010101;
/**
 * Repeats lowest byte of `x` as 32 bit uint.
 *
 * @param x
 */


exports.splat8_24 = splat8_24;

const splat8_32 = x => (x & 0xff) * 0x01010101 >>> 0;
/**
 * Repeats lowest 16bit of `x` as 32 bit uint.
 *
 * @param x
 */


exports.splat8_32 = splat8_32;

const splat16_32 = x => (x &= 0xffff, (x << 16 | x) >>> 0);
/**
 * Returns true if bits 0-3 are same as bits 4-7.
 *
 * @param x
 */


exports.splat16_32 = splat16_32;

const same4 = x => (x >> 4 & 0xf) === (x & 0xf);
/**
 * Returns true if bits 0-7 are same as bits 8-15.
 *
 * @param x
 */


exports.same4 = same4;

const same8 = x => (x >> 8 & 0xff) === (x & 0xff);

exports.same8 = same8;
},{}],"../node_modules/@thi.ng/binary/swizzle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flipBytes = exports.swizzle4 = exports.swizzle8 = exports.setLane2 = exports.setLane4 = exports.setLane8 = exports.lane2 = exports.lane4 = exports.lane8 = void 0;

/**
 * Extracts 8-bit lane from given 32bit uint.
 *
 * - Lane #0: bits 24-31
 * - Lane #1: bits 16-23
 * - Lane #2: bits 8-15
 * - Lane #3: bits 0-7
 *
 * @param x
 * @param lane
 */
const lane8 = (x, lane) => x >>> (3 - lane << 3) & 0xff;
/**
 * Extracts 4-bit lane from given 32bit uint.
 *
 * - Lane #0: bits 28-31
 * - Lane #1: bits 24-27
 * - Lane #2: bits 20-23
 * - Lane #3: bits 16-19
 * - Lane #4: bits 12-15
 * - Lane #5: bits 8-11
 * - Lane #6: bits 4-7
 * - Lane #7: bits 0-3
 *
 * @param x
 * @param lane
 */


exports.lane8 = lane8;

const lane4 = (x, lane) => x >>> (7 - lane << 2) & 0xf;

exports.lane4 = lane4;

const lane2 = (x, lane) => x >>> (15 - lane << 1) & 0x3;
/**
 * Sets 8-bit `lane` with value`y` in `x`.
 *
 * @see lane8
 *
 * @param x
 * @param y
 * @param lane
 */


exports.lane2 = lane2;

const setLane8 = (x, y, lane) => {
  const l = 3 - lane << 3;
  return (~(0xff << l) & x | (y & 0xff) << l) >>> 0;
};
/**
 * Sets 4-bit `lane` with value `y` in `x`.
 *
 * @see lane4
 *
 * @param x
 * @param y
 * @param lane
 */


exports.setLane8 = setLane8;

const setLane4 = (x, y, lane) => {
  const l = 7 - lane << 2;
  return (~(0xf << l) & x | (y & 0xf) << l) >>> 0;
};
/**
 * Sets 2-bit `lane` with value `y` in `x`.
 *
 * @see lane2
 *
 * @param x
 * @param y
 * @param lane
 */


exports.setLane4 = setLane4;

const setLane2 = (x, y, lane) => {
  const l = 15 - lane << 1;
  return (~(0x3 << l) & x | (y & 0x3) << l) >>> 0;
};
/**
 * Re-orders byte lanes in given order (MSB).
 *
 * ```
 * swizzle(0x12345678, 3, 2, 1, 0) // 0x78563412
 * swizzle(0x12345678, 1, 0, 3, 2) // 0x34127856
 * swizzle(0x12345678, 2, 2, 0, 0) // 0x56561212
 * ```
 *
 * @param x
 * @param a
 * @param b
 * @param c
 * @param d
 */


exports.setLane2 = setLane2;

const swizzle8 = (x, a, b, c, d) => (lane8(x, a) << 24 | lane8(x, b) << 16 | lane8(x, c) << 8 | lane8(x, d)) >>> 0;
/**
 *
 * @param x
 * @param a
 * @param b
 * @param c
 * @param d
 * @param e
 * @param f
 * @param g
 * @param h
 */


exports.swizzle8 = swizzle8;

const swizzle4 = (x, a, b, c, d, e, f, g, h) => (lane4(x, a) << 28 | lane4(x, b) << 24 | lane4(x, c) << 20 | lane4(x, d) << 16 | lane4(x, e) << 12 | lane4(x, f) << 8 | lane4(x, g) << 4 | lane4(x, h)) >>> 0;
/**
 * Same as `swizzle8(x, 3, 2, 1, 0)`, but faster.
 *
 * @param x
 */


exports.swizzle4 = swizzle4;

const flipBytes = x => (x >>> 24 | x >> 8 & 0xff00 | (x & 0xff00) << 8 | x << 24) >>> 0;

exports.flipBytes = flipBytes;
},{}],"../node_modules/@thi.ng/binary/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _align = require("./align");

Object.keys(_align).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _align[key];
    }
  });
});

var _count = require("./count");

Object.keys(_count).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _count[key];
    }
  });
});

var _edit = require("./edit");

Object.keys(_edit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _edit[key];
    }
  });
});

var _float = require("./float");

Object.keys(_float).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _float[key];
    }
  });
});

var _gray = require("./gray");

Object.keys(_gray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gray[key];
    }
  });
});

var _logic = require("./logic");

Object.keys(_logic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _logic[key];
    }
  });
});

var _mask = require("./mask");

Object.keys(_mask).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mask[key];
    }
  });
});

var _pow = require("./pow");

Object.keys(_pow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pow[key];
    }
  });
});

var _rotate = require("./rotate");

Object.keys(_rotate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rotate[key];
    }
  });
});

var _splat = require("./splat");

Object.keys(_splat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _splat[key];
    }
  });
});

var _swizzle = require("./swizzle");

Object.keys(_swizzle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swizzle[key];
    }
  });
});
},{"./api":"../node_modules/@thi.ng/binary/api.js","./align":"../node_modules/@thi.ng/binary/align.js","./count":"../node_modules/@thi.ng/binary/count.js","./edit":"../node_modules/@thi.ng/binary/edit.js","./float":"../node_modules/@thi.ng/binary/float.js","./gray":"../node_modules/@thi.ng/binary/gray.js","./logic":"../node_modules/@thi.ng/binary/logic.js","./mask":"../node_modules/@thi.ng/binary/mask.js","./pow":"../node_modules/@thi.ng/binary/pow.js","./rotate":"../node_modules/@thi.ng/binary/rotate.js","./splat":"../node_modules/@thi.ng/binary/splat.js","./swizzle":"../node_modules/@thi.ng/binary/swizzle.js"}],"../node_modules/@thi.ng/associative/hash-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashMap = void 0;

var _binary = require("@thi.ng/binary");

var _equiv = require("@thi.ng/equiv");

var _dissoc = require("./dissoc");

var _equiv2 = require("./internal/equiv");

var _into = require("./into");

const __private = new WeakMap();

const __iterator = (map, id) => function* () {
  for (let p of __private.get(map).bins) {
    if (p) yield p[id];
  }
};

const DEFAULT_CAP = 16;
/**
 * Configurable hash map implementation w/ ES6 Map API. Uses open
 * addressing / linear probing to resolve key collisions. Supports any
 * key types via mandatory user supplied hash function.
 *
 * See `HashMapOpts` for further configuration & behavior details.
 *
 * ```
 * import { HashMap } from "@thi.ng/associative"
 * import { hash } from "@thi.ng/vectors"
 *
 * m = new HashMap([], { hash })
 * m.set([1, 2], "a");
 * m.set([3, 4], "b");
 * m.set([1, 2], "c");
 * // HashMap { [ 1, 2 ] => 'c', [ 3, 4 ] => 'b' }
 * ```
 *
 */

class HashMap extends Map {
  constructor(pairs, opts) {
    super();
    const m = (0, _binary.ceilPow2)(Math.min(opts.cap || DEFAULT_CAP, 4)) - 1;

    __private.set(this, {
      hash: opts.hash,
      equiv: opts.equiv || _equiv.equiv,
      load: opts.load || 0.75,
      mask: m,
      bins: new Array(m + 1),
      size: 0
    });

    if (pairs) {
      this.into(pairs);
    }
  }

  get [Symbol.species]() {
    return HashMap;
  }

  get [Symbol.toStringTag]() {
    return "HashMap";
  }

  get size() {
    return __private.get(this).size;
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  *entries() {
    for (let p of __private.get(this).bins) {
      if (p) yield [p[0], p[1]];
    }
  }

  keys() {
    return __iterator(this, 0)();
  }

  values() {
    return __iterator(this, 1)();
  }

  forEach(fn, thisArg) {
    for (let pair of __private.get(this).bins) {
      fn.call(thisArg, pair[1], pair[0], this);
    }
  }

  clear() {
    const $this = __private.get(this);

    $this.bins = new Array(DEFAULT_CAP);
    $this.mask = 15;
    $this.size = 0;
  }

  empty() {
    return new HashMap(null, this.opts({
      cap: DEFAULT_CAP
    }));
  }

  copy() {
    const $this = __private.get(this);

    const m = new HashMap(null, this.opts({
      cap: 4
    }));
    Object.assign(__private.get(m), {
      bins: $this.bins.slice(),
      mask: $this.mask,
      size: $this.size
    });
    return m;
  }

  equiv(o) {
    return (0, _equiv2.equivMap)(this, o);
  }

  has(key) {
    const $this = __private.get(this);

    const i = this.find(key, $this);
    return i >= 0 && $this.bins[i] != undefined;
  }

  get(key, notFound) {
    const $this = __private.get(this);

    const i = this.find(key, $this);
    return i >= 0 && $this.bins[i] ? $this.bins[i][1] : notFound;
  }

  set(key, val) {
    const $this = __private.get(this);

    let i = this.find(key, $this);

    if (i >= 0 && $this.bins[i]) {
      $this.bins[i][1] = val;
      return this;
    }

    if ($this.size > $this.mask * $this.load) {
      this.resize($this);
      i = this.find(key, $this);
    }

    $this.bins[i] = [key, val];
    $this.size++;
    return this;
  }

  delete(key) {
    const $this = __private.get(this);

    let i = this.find(key, $this);
    const bins = $this.bins;

    if (i >= 0 && !bins[i]) {
      return false;
    }

    $this.size--;
    const m = $this.mask;
    let j = i;
    let k;

    while (true) {
      delete bins[i];

      do {
        j = j + 1 & m;
        if (!bins[j]) return true;
        k = $this.hash(bins[j][0]) & m;
      } while (i <= j ? i < k && k <= j : i < k || k <= j);

      bins[i] = bins[j];
      i = j;
    }
  }

  into(pairs) {
    return (0, _into.into)(this, pairs);
  }

  dissoc(keys) {
    return (0, _dissoc.dissoc)(this, keys);
  }

  opts(overrides) {
    const $this = __private.get(this);

    return Object.assign({
      hash: $this.hash,
      equiv: $this.equiv,
      load: $this.load,
      cap: $this.mask + 1
    }, overrides);
  }

  find(key, $this) {
    const m = $this.mask;
    const bins = $this.bins;
    const equiv = $this.equiv;
    let i = m;
    let h = $this.hash(key) & m;

    while (bins[h] && !equiv(bins[h][0], key)) {
      i--;
      if (i < 0) return -1;
      h = h + 1 & $this.mask;
    }

    return h;
  }

  resize($this) {
    const src = $this.bins;
    const cap = ($this.mask + 1) * 2;
    $this.bins = new Array(cap);
    $this.mask = cap - 1;
    $this.size = 0;

    for (let p of src) {
      if (p) this.set(p[0], p[1]);
    }
  }

}

exports.HashMap = HashMap;
},{"@thi.ng/binary":"../node_modules/@thi.ng/binary/index.js","@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js","./dissoc":"../node_modules/@thi.ng/associative/dissoc.js","./internal/equiv":"../node_modules/@thi.ng/associative/internal/equiv.js","./into":"../node_modules/@thi.ng/associative/into.js"}],"../node_modules/@thi.ng/associative/select-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectKeysObj = exports.selectKeysMap = void 0;

var _utils = require("./utils");

/**
 * Returns a new map of same type as input only containing given keys
 * (and only if they existed in the original map).
 *
 * @param src
 * @param ks selected keys
 */
const selectKeysMap = (src, ks) => {
  const dest = (0, _utils.empty)(src, Map);

  for (let k of ks) {
    src.has(k) && dest.set(k, src.get(k));
  }

  return dest;
};
/**
 * Returns a new object only containing given keys (and only if they
 * existed in the original).
 *
 * @param src
 * @param ks
 */


exports.selectKeysMap = selectKeysMap;

const selectKeysObj = (src, ks) => {
  const dest = {};

  for (let k of ks) {
    src.hasOwnProperty(k) && (dest[k] = src[k]);
  }

  return dest;
};

exports.selectKeysObj = selectKeysObj;
},{"./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/indexed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexed = void 0;

var _equivMap = require("./equiv-map");

var _selectKeys = require("./select-keys");

var _utils = require("./utils");

/**
 * Takes an iterable of plain objects and array of indexing keys. Calls
 * `selectKeysObj` on each value and uses returned objects as new keys
 * to group original values. Returns a new `EquivMap` of sets.
 *
 * ```
 * indexed(
 *   new Set([{a: 1, b: 1}, {a: 1, b: 2}, {a: 1, b: 1, c: 2}]),
 *   ["a","b"]
 * )
 * // EquivMap {
 * //   { a: 1, b: 1 } => Set { { a: 1, b: 1 }, { a: 1, b: 1, c: 2 } },
 * //   { a: 1, b: 2 } => Set { { a: 1, b: 2 } } }
 * ```
 *
 * @param records objects to index
 * @param ks keys used for indexing
 */
const indexed = (records, ks) => {
  const res = new _equivMap.EquivMap();
  let x, ik, rv;

  for (x of records) {
    ik = (0, _selectKeys.selectKeysObj)(x, ks);
    rv = res.get(ik);
    !rv && res.set(ik, rv = (0, _utils.empty)(records, Set));
    rv.add(x);
  }

  return res;
};

exports.indexed = indexed;
},{"./equiv-map":"../node_modules/@thi.ng/associative/equiv-map.js","./select-keys":"../node_modules/@thi.ng/associative/select-keys.js","./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/intersection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersectionR = intersectionR;
exports.intersection = void 0;

var _xformSetop = require("./internal/xform-setop");

var _into = require("./into");

var _utils = require("./utils");

/**
 * Computes the intersection of sets `a` and `b` and writes results into
 * new set or optionally given set `out` (assumed to be empty for
 * correct results). If `out` is *not* given, the returned Set type will
 * be that of `a` (provided it defines `Symbol.species`).
 *
 * @param a
 * @param b
 * @param out
 */
const intersection = (a, b, out) => {
  out = out || (0, _utils.empty)(a, Set);

  if (a === b) {
    return (0, _into.into)(out, a);
  }

  if (b.size < a.size) {
    return intersection(b, a, out);
  }

  for (let i of b) {
    if (a.has(i)) {
      out.add(i);
    }
  }

  return out;
};

exports.intersection = intersection;

function intersectionR(src) {
  return (0, _xformSetop.xformSetOp)(intersectionR, intersection, src);
}
},{"./internal/xform-setop":"../node_modules/@thi.ng/associative/internal/xform-setop.js","./into":"../node_modules/@thi.ng/associative/into.js","./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/invert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invertObj = exports.invertMap = void 0;

/**
 * Returns a new map in which the original values are used as keys and
 * original keys as values. If `dest` is given, writes results in that
 * map instead. Depending on the value type of `src` and/or if the
 * inverted map should use custom key equality semantics as provided by
 * the Map types in this package, you MUST provide a `dest` map, since
 * the default `dest` will only be a standard ES6 Map.
 *
 * ```
 * invertMap(new Map(), new Map([["a", 1], ["b", 2]]));
 * // Map { 1 => 'a', 2 => 'b' }
 * ```
 *
 * @param src
 * @param dest
 */
const invertMap = (src, dest) => {
  dest = dest || new Map();

  for (let p of src) {
    dest.set(p[1], p[0]);
  }

  return dest;
};
/**
 * Returns a new object in which the original values are used as keys
 * and original keys as values. If `dest` is given, writes results in
 * that object instead.
 *
 * ```
 * invertObj({a: 1, b: 2})
 * // { '1': 'a', '2': 'b' }
 * ```
 *
 * @param src
 * @param dest
 */


exports.invertMap = invertMap;

const invertObj = (src, dest = {}) => {
  for (let k in src) {
    dest[src[k]] = k;
  }

  return dest;
};

exports.invertObj = invertObj;
},{}],"../node_modules/@thi.ng/associative/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeObj = exports.mergeMap = void 0;

/**
 * Merges all given maps in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest
 * @param xs
 */
const mergeMap = (dest, ...xs) => {
  for (let x of xs) {
    for (let pair of x) {
      dest.set(pair[0], pair[1]);
    }
  }

  return dest;
};
/**
 * Merges all given objects in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest
 * @param xs
 */


exports.mergeMap = mergeMap;

const mergeObj = (dest, ...xs) => Object.assign(dest, ...xs);

exports.mergeObj = mergeObj;
},{}],"../node_modules/@thi.ng/associative/rename-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renameKeysObj = exports.renameKeysMap = void 0;

var _utils = require("./utils");

/**
 * Renames keys in `src` using mapping provided by key map `km`. Does
 * support key swapping / swizzling. Does not modify original.
 *
 * @param src
 * @param km
 * @param out
 */
const renameKeysMap = (src, km, out) => {
  out = out || (0, _utils.empty)(src, Map);

  for (let [k, v] of src) {
    out.set(km.has(k) ? km.get(k) : k, v);
  }

  return out;
};
/**
 * Renames keys in `src` using mapping provided by key map `km`. Does
 * support key swapping / swizzling. Does not modify original.
 *
 * ```
 * // swap a & b, rename c
 * renameKeysObj({a: 1, b: 2, c: 3}, {a: "b", b: "a", c: "cc"})
 * // {b: 1, a: 2, cc: 3}
 * ```
 *
 * @param src
 * @param km
 */


exports.renameKeysMap = renameKeysMap;

const renameKeysObj = (src, km, out = {}) => {
  for (let k in src) {
    out[km.hasOwnProperty(k) ? km[k] : k] = src[k];
  }

  return out;
};

exports.renameKeysObj = renameKeysObj;
},{"./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/join.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinWith = exports.join = void 0;

var _commonKeys = require("./common-keys");

var _indexed = require("./indexed");

var _invert = require("./invert");

var _merge = require("./merge");

var _renameKeys = require("./rename-keys");

var _selectKeys = require("./select-keys");

var _utils = require("./utils");

/**
 * Computes the natural join between the two sets of relations. Each set
 * is assumed to have plain objects as values with at least one of the
 * keys present in both sides. Furthermore the objects in each set are
 * assumed to have the same internal structure (i.e. sets of keys).
 * Returns new set of same type as `a`.
 *
 * ```
 * join(
 *   new Set([
 *     {id: 1, name: "foo"},
 *     {id: 2, name: "bar"},
 *     {id: 3, name: "baz"}]),
 *   new Set([
 *     {id: 1, color: "red"},
 *     {id: 2, color: "blue"}])
 * )
 * // Set {
 * //   { id: 1, color: 'red', name: 'foo' },
 * //   { id: 2, color: 'blue', name: 'bar' }
 * // }
 * ```
 *
 * @param a
 * @param b
 */
const join = (a, b) => {
  if (a.size && b.size) {
    const ks = (0, _commonKeys.commonKeysObj)((0, _utils.first)(a) || {}, (0, _utils.first)(b) || {});
    let aa, bb;

    if (a.size <= b.size) {
      aa = a;
      bb = b;
    } else {
      aa = b;
      bb = a;
    }

    const idx = (0, _indexed.indexed)(aa, ks);
    const res = (0, _utils.empty)(a, Set);

    for (let x of bb) {
      const found = idx.get((0, _selectKeys.selectKeysObj)(x, ks));

      if (found) {
        for (let f of found) {
          res.add((0, _merge.mergeObj)(Object.assign({}, f), x));
        }
      }
    }

    return res;
  }

  return (0, _utils.empty)(a, Set);
};
/**
 * Similar to `join()`, computes the join between two sets of relations,
 * using the given keys in `kmap` only for joining and ignoring others.
 * `kmap` can also be used to translate join keys in `b` where
 * needed. Else, if no renaming is desired, the values in `kmap` should
 * be the same as their respective keys, e.g. `{id: "id"}`. Returns new
 * set of same type as `a`.
 *
 * ```
 * joinWith(
 *   new Set([
 *     {id: 1, name: "foo"},
 *     {id: 2, name: "bar"},
 *     {id: 3, name: "baz"}]),
 *   new Set([
 *     {type: 1, color: "red"},
 *     {type: 2, color: "blue"}]),
 *   {id: "type"}
 * )
 * // Set {
 * //   { type: 1, color: 'red', id: 1, name: 'foo' },
 * //   { type: 2, color: 'blue', id: 2, name: 'bar' } }
 * ```
 *
 * @param a
 * @param b
 * @param kmap keys to compute join for
 */


exports.join = join;

const joinWith = (a, b, kmap) => {
  if (a.size && b.size) {
    let aa, bb;
    let k;

    if (a.size <= b.size) {
      aa = a;
      bb = b;
      k = (0, _invert.invertObj)(kmap);
    } else {
      aa = b;
      bb = a;
      k = kmap;
    }

    const idx = (0, _indexed.indexed)(aa, (0, _utils.objValues)(k));
    const ks = Object.keys(k);
    const res = (0, _utils.empty)(a, Set);

    for (let x of bb) {
      const found = idx.get((0, _renameKeys.renameKeysObj)((0, _selectKeys.selectKeysObj)(x, ks), k));

      if (found) {
        for (let f of found) {
          res.add((0, _merge.mergeObj)(Object.assign({}, f), x));
        }
      }
    }

    return res;
  }

  return (0, _utils.empty)(a, Set);
};

exports.joinWith = joinWith;
joinWith(new Set([{
  a: 1,
  b: 2
}]), new Set([{
  id: 1,
  c: 2
}]), {
  a: "id"
});
},{"./common-keys":"../node_modules/@thi.ng/associative/common-keys.js","./indexed":"../node_modules/@thi.ng/associative/indexed.js","./invert":"../node_modules/@thi.ng/associative/invert.js","./merge":"../node_modules/@thi.ng/associative/merge.js","./rename-keys":"../node_modules/@thi.ng/associative/rename-keys.js","./select-keys":"../node_modules/@thi.ng/associative/select-keys.js","./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/dcons/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dcons = exports.DCons = void 0;

var _api = require("@thi.ng/api");

var _checks = require("@thi.ng/checks");

var _compare = require("@thi.ng/compare");

var _equiv = require("@thi.ng/equiv");

var _errors = require("@thi.ng/errors");

var _random = require("@thi.ng/random");

var _transducers = require("@thi.ng/transducers");

class DCons {
  constructor(src) {
    this._length = 0;

    if (src) {
      this.into(src);
    }
  }

  get length() {
    return this._length;
  }

  copy() {
    return new DCons(this);
  }

  empty() {
    return new DCons();
  }

  clear() {
    this.release();
  }

  release() {
    let cell = this.head,
        next;

    while (cell) {
      next = cell.next;
      delete cell.value;
      delete cell.prev;
      delete cell.next;
      cell = next;
    }

    delete this.head;
    delete this.tail;
    this._length = 0;
    return true;
  }

  compare(o) {
    const n = this._length;

    if (n < o._length) {
      return -1;
    } else if (n > o._length) {
      return 1;
    } else if (n === 0) {
      return 0;
    } else {
      let ca = this.head;
      let cb = o.head;
      let res = 0;

      while (ca && res == 0) {
        res = (0, _compare.compare)(ca.value, cb.value);
        ca = ca.next;
        cb = cb.next;
      }

      return res;
    }
  }

  equiv(o) {
    if ((o instanceof DCons || (0, _checks.isArrayLike)(o)) && this._length === o.length) {
      if (this._length === 0) {
        return true;
      }

      let cell = this.head;

      for (let x of o) {
        if (!(0, _equiv.equiv)(cell.value, x)) {
          return false;
        }

        cell = cell.next;
      }

      return true;
    }

    return false;
  }

  *[Symbol.iterator]() {
    let cell = this.head;

    while (cell) {
      yield cell.value;
      cell = cell.next;
    }
  }
  /** {@inheritDoc @thi.ng/api#ISeqable.seq} */


  seq(start = 0, end = this.length) {
    if (start >= end || start < 0) return;
    let cell = this.nthCell(start);
    const last = this.nthCell(end - 1);

    const $seq = cell => ({
      first() {
        return cell.value;
      },

      next() {
        return cell !== last && cell.next ? $seq(cell.next) : undefined;
      }

    });

    return cell ? $seq(cell) : undefined;
  }

  *cycle() {
    while (true) {
      yield* this;
    }
  }
  /** {@inheritDoc @thi.ng/transducers#IReducible.$reduce} */


  $reduce(rfn, acc) {
    let cell = this.head;

    while (cell && !(0, _transducers.isReduced)(acc)) {
      acc = rfn(acc, cell.value);
      cell = cell.next;
    }

    return acc;
  }

  drop() {
    const cell = this.head;

    if (cell) {
      this.head = cell.next;

      if (this.head) {
        delete this.head.prev;
      } else {
        delete this.tail;
      }

      this._length--;
      return cell.value;
    }
  }

  cons(value) {
    const cell = {
      value,
      next: this.head
    };

    if (this.head) {
      this.head.prev = cell;
    } else {
      this.tail = cell;
    }

    this.head = cell;
    this._length++;
    return this;
  }

  insertBefore(cell, value) {
    if (!cell) {
      (0, _errors.illegalArgs)("cell is undefined");
    }

    const newCell = {
      value,
      next: cell,
      prev: cell.prev
    };

    if (cell.prev) {
      cell.prev.next = newCell;
    } else {
      this.head = newCell;
    }

    cell.prev = newCell;
    this._length++;
    return this;
  }

  insertAfter(cell, value) {
    if (!cell) {
      (0, _errors.illegalArgs)("cell is undefined");
    }

    const newCell = {
      value,
      next: cell.next,
      prev: cell
    };

    if (cell.next) {
      cell.next.prev = newCell;
    } else {
      this.tail = newCell;
    }

    cell.next = newCell;
    this._length++;
    return this;
  }

  insertBeforeNth(n, x) {
    if (n < 0) {
      n += this._length;
    }

    if (n <= 0) {
      return this.cons(x);
    } else {
      this.ensureIndex(n);
      return this.insertBefore(this.nthCellUnsafe(n), x);
    }
  }

  insertAfterNth(n, x) {
    if (n < 0) {
      n += this._length;
    }

    if (n >= this._length - 1) {
      return this.push(x);
    } else {
      this.ensureIndex(n);
      return this.insertAfter(this.nthCellUnsafe(n), x);
    }
  }

  insertSorted(value, cmp) {
    cmp = cmp || _compare.compare;
    let cell = this.head;

    while (cell) {
      if (cmp(value, cell.value) <= 0) {
        return this.insertBefore(cell, value);
      }

      cell = cell.next;
    }

    return this.push(value);
  }

  find(value) {
    let cell = this.head;

    while (cell) {
      if (cell.value === value) {
        return cell;
      }

      cell = cell.next;
    }
  }

  findWith(fn) {
    let cell = this.head;

    while (cell) {
      if (fn(cell.value)) {
        return cell;
      }

      cell = cell.next;
    }
  }

  concat(...slices) {
    const res = this.copy();

    for (let slice of slices) {
      res.into(slice);
    }

    return res;
  }

  into(src) {
    for (let x of src) {
      this.push(x);
    }
  }

  slice(from = 0, to = this.length) {
    let a = from < 0 ? from + this._length : from;
    let b = to < 0 ? to + this._length : to;

    if (a < 0 || b < 0) {
      (0, _errors.illegalArgs)("invalid indices: ${from} / ${to}");
    }

    const res = new DCons();
    let cell = this.nthCell(a);

    while (cell && ++a <= b) {
      res.push(cell.value);
      cell = cell.next;
    }

    return res;
  }

  splice(at, del = 0, insert) {
    let cell;

    if (typeof at === "number") {
      if (at < 0) {
        at += this._length;
      }

      this.ensureIndex(at);
      cell = this.nthCellUnsafe(at);
    } else {
      cell = at;
    }

    const removed = new DCons();

    if (del > 0) {
      while (cell && del-- > 0) {
        this.remove(cell);
        removed.push(cell.value);
        cell = cell.next;
      }
    } else if (cell) {
      cell = cell.next;
    }

    if (insert) {
      if (cell) {
        for (let i of insert) {
          this.insertBefore(cell, i);
        }
      } else {
        for (let i of insert) {
          this.push(i);
        }
      }
    }

    return removed;
  }

  remove(cell) {
    if (cell.prev) {
      cell.prev.next = cell.next;
    } else {
      this.head = cell.next;
    }

    if (cell.next) {
      cell.next.prev = cell.prev;
    } else {
      this.tail = cell.prev;
    }

    this._length--;
    return this;
  }

  swap(a, b) {
    if (a !== b) {
      const t = a.value;
      a.value = b.value;
      b.value = t;
    }

    return this;
  }

  push(value) {
    if (this.tail) {
      const cell = {
        value,
        prev: this.tail
      };
      this.tail.next = cell;
      this.tail = cell;
      this._length++;
      return this;
    } else {
      return this.cons(value);
    }
  }

  pop() {
    const cell = this.tail;

    if (!cell) {
      return;
    }

    this.tail = cell.prev;

    if (this.tail) {
      delete this.tail.next;
    } else {
      delete this.head;
    }

    this._length--;
    return cell.value;
  }

  first() {
    return this.head && this.head.value;
  }

  peek() {
    return this.tail && this.tail.value;
  }

  setHead(v) {
    if (this.head) {
      this.head.value = v;
      return this;
    }

    return this.cons(v);
  }

  setTail(v) {
    if (this.tail) {
      this.tail.value = v;
      return this;
    }

    return this.push(v);
  }

  setNth(n, v) {
    const cell = this.nthCell(n);
    !cell && (0, _errors.illegalArgs)(`index out of bounds: ${n}`);
    cell.value = v;
    return this;
  }

  nth(n, notFound) {
    const cell = this.nthCell(n);
    return cell ? cell.value : notFound;
  }

  nthCell(n) {
    if (n < 0) {
      n += this._length;
    }

    if (n < 0 || n >= this._length) {
      return;
    }

    return this.nthCellUnsafe(n);
  }

  rotateLeft() {
    switch (this._length) {
      case 0:
      case 1:
        return this;

      case 2:
        return this.swap(this.head, this.tail);

      default:
        return this.push(this.drop());
    }
  }

  rotateRight() {
    switch (this._length) {
      case 0:
      case 1:
        return this;

      case 2:
        return this.swap(this.head, this.tail);

      default:
        const x = this.peek();
        this.pop();
        return this.cons(x);
    }
  }

  map(fn) {
    const res = new DCons();
    let cell = this.head;

    while (cell) {
      res.push(fn(cell.value));
      cell = cell.next;
    }

    return res;
  }

  filter(pred) {
    const res = new DCons();
    let cell = this.head;

    while (cell) {
      pred(cell.value) && res.push(cell.value);
      cell = cell.next;
    }

    return res;
  }

  reduce(rfn, initial) {
    let acc = initial;
    let cell = this.head;

    while (cell) {
      // TODO add early termination support
      acc = rfn(acc, cell.value);
      cell = cell.next;
    }

    return acc;
  }
  /**
   * Shuffles list by probabilistically moving cells to head or tail
   * positions.
   *
   * @remarks
   * Supports configurable iterations and custom PRNG via
   * {@link @thi.ng/random#IRandom} (default:
   * {@link @thi.ng/random#SYSTEM}).
   *
   * Default iterations: `ceil(3/2 * log2(n))`
   *
   * @param iter
   * @param rnd
   */


  shuffle(iter, rnd = _random.SYSTEM) {
    if (this._length < 2) return this;

    for (iter = iter !== null && iter !== void 0 ? iter : Math.ceil(1.5 * Math.log2(this._length)); iter > 0; iter--) {
      let cell = this.head;

      while (cell) {
        const next = cell.next;
        rnd.float() < 0.5 ? this.asHead(cell) : this.asTail(cell);
        cell = next;
      }
    }

    return this;
  }
  /**
   * Merge sort implementation based on Simon Tatham's algorithm:
   * https://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
   *
   * @remarks
   * Uses {@link @thi.ng/compare#compare} as default comparator.
   *
   * @param cmp
   */


  sort(cmp = _compare.compare) {
    if (!this._length) return this;
    let inSize = 1;

    while (true) {
      let p = this.head;
      this.head = undefined;
      this.tail = undefined;
      let numMerges = 0;

      while (p) {
        numMerges++;
        let q = p;
        let psize = 0;

        for (let i = 0; i < inSize; i++) {
          psize++;
          q = q.next;
          if (!q) break;
        }

        let qsize = inSize;

        while (psize > 0 || qsize > 0 && q) {
          let e;

          if (psize === 0) {
            e = q;
            q = q.next;
            qsize--;
          } else if (!q || qsize === 0) {
            e = p;
            p = p.next;
            psize--;
          } else if (cmp(p.value, q.value) <= 0) {
            e = p;
            p = p.next;
            psize--;
          } else {
            e = q;
            q = q.next;
            qsize--;
          }

          if (this.tail) {
            this.tail.next = e;
          } else {
            this.head = e;
          }

          e.prev = this.tail;
          this.tail = e;
        }

        p = q;
      }

      this.tail.next = undefined;

      if (numMerges <= 1) {
        return this;
      }

      inSize *= 2;
    }
  }

  reverse() {
    let head = this.head;
    let tail = this.tail;
    let n = (this._length >>> 1) + (this._length & 1);

    while (head && tail && n > 0) {
      const t = head.value;
      head.value = tail.value;
      tail.value = t;
      head = head.next;
      tail = tail.prev;
      n--;
    }

    return this;
  }

  asHead(cell) {
    if (cell === this.head) {
      return this;
    }

    this.remove(cell);
    this.head.prev = cell;
    cell.next = this.head;
    cell.prev = undefined;
    this.head = cell;
    this._length++;
    return this;
  }

  asTail(cell) {
    if (cell === this.tail) {
      return this;
    }

    this.remove(cell);
    this.tail.next = cell;
    cell.prev = this.tail;
    cell.next = undefined;
    this.tail = cell;
    this._length++;
    return this;
  }

  toString() {
    let res = [];
    let cell = this.head;

    while (cell) {
      res.push(cell.value != null ? String(cell.value) : cell.value === undefined ? "undefined" : "null");
      cell = cell.next;
    }

    return res.join(", ");
  }

  toJSON() {
    return [...this];
  }

  ensureIndex(i) {
    (0, _api.assert)(i >= 0 && i < this._length, `index out of range: ${i}`);
  }

  nthCellUnsafe(n) {
    let cell, dir;

    if (n <= this._length >> 1) {
      cell = this.head;
      dir = "next";
    } else {
      cell = this.tail;
      dir = "prev";
      n = this._length - n - 1;
    }

    while (n-- > 0 && cell) {
      cell = cell[dir];
    }

    return cell;
  }

}
/**
 * Functional syntax sugar for `new DCons(src?)`.
 *
 * @param src
 */


exports.DCons = DCons;

const dcons = src => new DCons(src);

exports.dcons = dcons;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/compare":"../node_modules/@thi.ng/compare/index.js","@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","@thi.ng/random":"../node_modules/@thi.ng/random/index.js","@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js"}],"../node_modules/@thi.ng/associative/ll-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LLSet = void 0;

var _api = require("@thi.ng/api");

var _dcons = require("@thi.ng/dcons");

var _equiv = require("@thi.ng/equiv");

var _dissoc = require("./dissoc");

var _equiv2 = require("./internal/equiv");

var _into = require("./into");

const __private = new WeakMap();

const __vals = inst => __private.get(inst).vals;
/**
 * Similar to `ArraySet`, this class is an alternative implementation of
 * the native ES6 Set API using a @thi.ng/dcons linked list as backing
 * store and a customizable value equality / equivalence predicate. By
 * the default uses `@thi.ng/equiv` for equivalence checking.
 *
 * Additionally, the type also implements the `ICopy`, `IEmpty` and
 * `IEquiv` interfaces itself.
 */


class LLSet extends Set {
  constructor(vals, opts = {}) {
    super();

    __private.set(this, {
      equiv: opts.equiv || _equiv.equiv,
      vals: new _dcons.DCons()
    });

    vals && this.into(vals);
  }

  *[Symbol.iterator]() {
    yield* __vals(this);
  }

  get [Symbol.species]() {
    return LLSet;
  }

  get [Symbol.toStringTag]() {
    return "LLSet";
  }

  get size() {
    return __vals(this).length;
  }

  copy() {
    const $this = __private.get(this);

    const s = new LLSet(null, this.opts());
    __private.get(s).vals = $this.vals.copy();
    return s;
  }

  empty() {
    return new LLSet(null, this.opts());
  }

  clear() {
    __vals(this).clear();
  }

  first() {
    if (this.size) {
      return __vals(this).head.value;
    }
  }

  add(key) {
    !this.has(key) && __vals(this).push(key);
    return this;
  }

  into(keys) {
    return (0, _into.into)(this, keys);
  }

  has(key) {
    return this.get(key, _api.SEMAPHORE) !== _api.SEMAPHORE;
  }
  /**
   * Returns the canonical (stored) value for `key`, if present. If
   * the set contains no equivalent for `key`, returns `notFound`.
   *
   * @param key
   * @param notFound
   */


  get(key, notFound) {
    const $this = __private.get(this);

    const eq = $this.equiv;
    let i = $this.vals.head;

    while (i) {
      if (eq(i.value, key)) {
        return i.value;
      }

      i = i.next;
    }

    return notFound;
  }

  delete(key) {
    const $this = __private.get(this);

    const eq = $this.equiv;
    let i = $this.vals.head;

    while (i) {
      if (eq(i.value, key)) {
        $this.vals.splice(i, 1);
        return true;
      }

      i = i.next;
    }

    return false;
  }

  disj(keys) {
    return (0, _dissoc.dissoc)(this, keys);
  }

  equiv(o) {
    return (0, _equiv2.equivSet)(this, o);
  }

  forEach(fn, thisArg) {
    let i = __vals(this).head;

    while (i) {
      fn.call(thisArg, i.value, i.value, this);
      i = i.next;
    }
  }

  *entries() {
    for (let v of __vals(this)) {
      yield [v, v];
    }
  }

  *keys() {
    yield* __vals(this);
  }

  *values() {
    yield* __vals(this);
  }

  opts() {
    return {
      equiv: __private.get(this).equiv
    };
  }

}

exports.LLSet = LLSet;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/dcons":"../node_modules/@thi.ng/dcons/index.js","@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js","./dissoc":"../node_modules/@thi.ng/associative/dissoc.js","./internal/equiv":"../node_modules/@thi.ng/associative/internal/equiv.js","./into":"../node_modules/@thi.ng/associative/into.js"}],"../node_modules/@thi.ng/associative/merge-apply.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeApplyObj = exports.mergeApplyMap = void 0;

var _checks = require("@thi.ng/checks");

var _utils = require("./utils");

/**
 * Similar to `mergeApplyObj()`, but for ES6 Maps instead of plain objects.
 *
 * @param src
 * @param xs
 */
const mergeApplyMap = (src, xs) => {
  const res = (0, _utils.copy)(src, Map);

  for (let [k, v] of xs) {
    res.set(k, (0, _checks.isFunction)(v) ? v(res.get(k)) : v);
  }

  return res;
};
/**
 * Similar to `mergeObjWith()`, but only supports 2 args and any
 * function values in `xs` will be called with respective value in `src`
 * to produce a new / derived value for that key, i.e.
 *
 * ```
 * dest[k] = xs[k](src[k])
 * ```
 *
 * Returns new merged object and does not modify any of the inputs.
 *
 * ```
 * mergeApplyObj(
 *   {a: "hello", b: 23, c: 12},
 *   {a: (x) => x + " world", b: 42}
 * );
 * // { a: 'hello world', b: 42, c: 12 }
 * ```
 *
 * @param src
 * @param xs
 */


exports.mergeApplyMap = mergeApplyMap;

const mergeApplyObj = (src, xs) => {
  const res = Object.assign({}, src);

  for (let k in xs) {
    const v = xs[k];
    res[k] = (0, _checks.isFunction)(v) ? v(res[k]) : v;
  }

  return res;
};

exports.mergeApplyObj = mergeApplyObj;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/merge-with.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeObjWith = exports.mergeMapWith = void 0;

var _utils = require("./utils");

const mergeMapWith = (f, dest, ...xs) => {
  const res = (0, _utils.copy)(dest, Map);

  for (let x of xs) {
    for (let [k, v] of x) {
      res.set(k, res.has(k) ? f(res.get(k), v) : v);
    }
  }

  return res;
};

exports.mergeMapWith = mergeMapWith;

const mergeObjWith = (f, dest, ...xs) => {
  const res = Object.assign({}, dest);

  for (let x of xs) {
    for (let k in x) {
      const v = x[k];
      res[k] = res.hasOwnProperty(k) ? f(dest[k], v) : v;
    }
  }

  return res;
};

exports.mergeObjWith = mergeObjWith;
},{"./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/merge-deep.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeDeepObj = void 0;

var _checks = require("@thi.ng/checks");

var _mergeWith = require("./merge-with");

const mergeDeepObj = (dest, ...xs) => (0, _mergeWith.mergeObjWith)((a, b) => (0, _checks.isPlainObject)(a) && (0, _checks.isPlainObject)(b) ? mergeDeepObj(a, b) : b, dest, ...xs);

exports.mergeDeepObj = mergeDeepObj;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","./merge-with":"../node_modules/@thi.ng/associative/merge-with.js"}],"../node_modules/@thi.ng/associative/sorted-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortedMap = void 0;

var _api = require("@thi.ng/api");

var _compare = require("@thi.ng/compare");

var _transducers = require("@thi.ng/transducers");

var _dissoc = require("./dissoc");

var _equiv = require("./internal/equiv");

var _into = require("./into");

class Node {
  constructor(k, v, h) {
    this.k = k;
    this.v = v;
    this.next = new Array(h + 1);
  }

} // stores private properties for all instances
// http://fitzgeraldnick.com/2014/01/13/hiding-implementation-details-with-e6-weakmaps.html


const __private = new WeakMap();

class SortedMap extends Map {
  /**
   * Creates new `SortedMap` instance with optionally given pairs
   * and/or options.
   *
   * @param pairs
   * @param opts
   */
  constructor(pairs, opts = {}) {
    super();
    const cap = opts.capacity || SortedMap.DEFAULT_CAP;
    const maxh = Math.ceil(Math.log2(cap));

    __private.set(this, {
      head: new Node(null, null, 0),
      cap: Math.pow(2, maxh),
      cmp: opts.compare || _compare.compare,
      p: opts.probability || SortedMap.DEFAULT_P,
      maxh,
      length: 0,
      h: 0
    });

    if (pairs) {
      this.into(pairs);
    }
  }
  /**
   * Creates new `SortedMap` instance from given object's key-value
   * pairs.
   *
   * @param obj
   * @param opts
   */


  static fromObject(obj, opts) {
    const m = new SortedMap(null, Object.assign({
      capacity: Object.keys(obj).length
    }, opts));

    for (let k in obj) {
      obj.hasOwnProperty(k) && m.set(k, obj[k]);
    }

    return m;
  }

  get [Symbol.species]() {
    return SortedMap;
  }

  *[Symbol.iterator]() {
    let node = __private.get(this).head;

    while (node = node.next[0]) {
      yield [node.k, node.v];
    }
  }

  *entries(key, max = false) {
    const $this = __private.get(this);

    let node = $this.head;
    const cmp = $this.cmp;
    let code;

    if (max) {
      while (node = node.next[0]) {
        if (key === undefined || (code = cmp(node.k, key)) <= 0) {
          yield [node.k, node.v];
          if (code === 0) return;
        }
      }
    } else {
      while (node = node.next[0]) {
        if (key === undefined || (code = cmp(node.k, key)) >= 0) {
          yield [node.k, node.v];
        }
      }
    }
  }

  keys(key, max = false) {
    return (0, _transducers.map)(p => p[0], this.entries(key, max));
  }

  values(key, max = false) {
    return (0, _transducers.map)(p => p[1], this.entries(key, max));
  }

  get size() {
    return __private.get(this).length;
  }

  clear() {
    const $this = __private.get(this);

    $this.head = new Node(null, null, 0);
    $this.length = 0;
    $this.h = 0;
  }

  empty() {
    return new SortedMap(null, Object.assign(Object.assign({}, this.opts()), {
      capacity: SortedMap.DEFAULT_CAP
    }));
  }

  copy() {
    return new SortedMap(this, this.opts());
  }

  compare(o) {
    const n = this.size;
    const m = o.size;
    if (n < m) return -1;
    if (n > m) return 1;
    const i = this.entries();
    const j = o.entries();
    let x, y;
    let c;

    while (x = i.next(), y = j.next(), !x.done && !y.done) {
      if ((c = (0, _compare.compare)(x.value[0], y.value[0])) !== 0 || (c = (0, _compare.compare)(x.value[1], y.value[1])) !== 0) {
        return c;
      }
    }

    return 0;
  }

  equiv(o) {
    return (0, _equiv.equivMap)(this, o);
  }

  first() {
    const node = __private.get(this).head.next[0];

    return node ? [node.k, node.v] : undefined;
  }

  get(k, notFound) {
    const node = this.findPredNode(k).next[0];
    return node && __private.get(this).cmp(node.k, k) === 0 ? node.v : notFound;
  }

  has(key) {
    return this.get(key, _api.SEMAPHORE) !== _api.SEMAPHORE;
  }

  set(k, v) {
    const $this = __private.get(this);

    let node = $this.head;
    let level = $this.h;
    let stack = new Array(level);
    const cmp = $this.cmp;
    let code;

    while (level >= 0) {
      while (node.next[level] && (code = cmp(node.next[level].k, k)) < 0) {
        node = node.next[level];
      }

      if (node.next[level] && code === 0) {
        do {
          node.next[level].v = v;
        } while (--level >= 0);

        return this;
      }

      stack[level--] = node;
    }

    const h = this.pickHeight($this.maxh, $this.h, $this.p);
    node = new Node(k, v, h);

    while ($this.h < h) {
      stack[++$this.h] = $this.head;
    }

    for (let i = 0; i <= h; i++) {
      node.next[i] = stack[i].next[i];
      stack[i].next[i] = node;
    }

    $this.length++;

    if ($this.length >= $this.cap) {
      $this.cap *= 2;
      $this.maxh++;
    }

    return this;
  }

  delete(k) {
    const $this = __private.get(this);

    let node = $this.head;
    let level = $this.h;
    let removed = false;
    const cmp = $this.cmp;
    let code;

    while (level >= 0) {
      while (node.next[level] && (code = cmp(node.next[level].k, k)) < 0) {
        node = node.next[level];
      }

      if (node.next[level] && code === 0) {
        removed = true;
        node.next[level] = node.next[level].next[level];

        if (node == $this.head && !node.next[level]) {
          $this.h = Math.max(0, $this.h - 1);
        }
      }

      level--;
    }

    if (removed) $this.length--;
    return removed;
  }

  into(pairs) {
    return (0, _into.into)(this, pairs);
  }

  dissoc(keys) {
    return (0, _dissoc.dissoc)(this, keys);
  }

  forEach(fn, thisArg) {
    for (let p of this) {
      fn.call(thisArg, p[1], p[0], this);
    }
  }

  $reduce(rfn, acc) {
    let node = __private.get(this).head;

    while ((node = node.next[0]) && !(0, _transducers.isReduced)(acc)) {
      acc = rfn(acc, [node.k, node.v]);
    }

    return acc;
  }

  opts() {
    const $this = __private.get(this);

    return {
      capacity: $this.cap,
      compare: $this.cmp,
      probability: $this.p
    };
  }

  findPredNode(k) {
    const $this = __private.get(this);

    const cmp = $this.cmp;
    let node = $this.head;
    let level = $this.h;

    while (level >= 0) {
      while (node.next[level] && cmp(node.next[level].k, k) < 0) {
        node = node.next[level];
      }

      level--;
    }

    return node;
  }

  pickHeight(maxh, h, p) {
    const max = Math.min(maxh, h + 1);
    let level = 0;

    while (Math.random() < p && level < max) {
      level++;
    }

    return level;
  }

}

exports.SortedMap = SortedMap;
SortedMap.DEFAULT_CAP = 8;
SortedMap.DEFAULT_P = 1 / Math.E;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/compare":"../node_modules/@thi.ng/compare/index.js","@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","./dissoc":"../node_modules/@thi.ng/associative/dissoc.js","./internal/equiv":"../node_modules/@thi.ng/associative/internal/equiv.js","./into":"../node_modules/@thi.ng/associative/into.js"}],"../node_modules/@thi.ng/associative/sorted-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortedSet = void 0;

var _compare = require("@thi.ng/compare");

var _transducers = require("@thi.ng/transducers");

var _dissoc = require("./dissoc");

var _equiv = require("./internal/equiv");

var _into = require("./into");

var _sortedMap = require("./sorted-map");

const __private = new WeakMap();
/**
 * Sorted set implementation with standard ES6 Set API, customizable
 * value equality and comparison semantics and additional functionality:
 *
 * - range queries (via `entries`, `keys`, `values`)
 * - multiple value addition/deletion via `into()` and `disj()`
 *
 * Furthermore, this class implements the `ICopy`, IEmpty`, `ICompare`
 * and `IEquiv` interfaces defined by `@thi.ng/api`. The latter two
 * allow instances to be used as keys themselves in other data types
 * defined in this (and other) package(s).
 *
 * This set uses a `SortedMap` as backing store and therefore has the
 * same resizing characteristics.
 */


class SortedSet extends Set {
  /**
   * Creates new instance with optional given values and/or
   * implementation options. The options are the same as used by
   * `SortedMap`.
   *
   * @param values
   * @param opts
   */
  constructor(values, opts) {
    super();

    __private.set(this, new _sortedMap.SortedMap(values ? (0, _transducers.map)(x => [x, x], values) : null, opts));
  }

  [Symbol.iterator]() {
    return this.keys();
  }

  get [Symbol.species]() {
    return SortedSet;
  }

  get [Symbol.toStringTag]() {
    return "SortedSet";
  }

  get size() {
    return __private.get(this).size;
  }

  copy() {
    return new SortedSet(this.keys(), this.opts());
  }

  empty() {
    return new SortedSet(null, Object.assign(Object.assign({}, this.opts()), {
      capacity: _sortedMap.SortedMap.DEFAULT_CAP
    }));
  }

  compare(o) {
    const n = this.size;
    const m = o.size;
    if (n < m) return -1;
    if (n > m) return 1;
    const i = this.entries();
    const j = o.entries();
    let x, y;
    let c;

    while (x = i.next(), y = j.next(), !x.done && !y.done) {
      if ((c = (0, _compare.compare)(x.value[0], y.value[0])) !== 0) {
        return c;
      }
    }

    return 0;
  }

  equiv(o) {
    return (0, _equiv.equivSet)(this, o);
  }

  $reduce(rfn, acc) {
    return __private.get(this).$reduce((_acc, x) => rfn(_acc, x[0]), acc);
  }

  entries(key, max = false) {
    return __private.get(this).entries(key, max);
  }

  keys(key, max = false) {
    return __private.get(this).keys(key, max);
  }

  values(key, max = false) {
    return __private.get(this).values(key, max);
  }

  add(key) {
    __private.get(this).set(key, key);

    return this;
  }

  into(keys) {
    return (0, _into.into)(this, keys);
  }

  clear() {
    __private.get(this).clear();
  }

  first() {
    const first = __private.get(this).first();

    return first ? first[0] : undefined;
  }

  delete(key) {
    return __private.get(this).delete(key);
  }

  disj(keys) {
    return (0, _dissoc.dissoc)(this, keys);
  }

  forEach(fn, thisArg) {
    for (let p of this) {
      fn.call(thisArg, p, p, this);
    }
  }

  has(key) {
    return __private.get(this).has(key);
  }

  get(key, notFound) {
    return __private.get(this).get(key, notFound);
  }

  opts() {
    return __private.get(this).opts();
  }

}

exports.SortedSet = SortedSet;
},{"@thi.ng/compare":"../node_modules/@thi.ng/compare/index.js","@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","./dissoc":"../node_modules/@thi.ng/associative/dissoc.js","./internal/equiv":"../node_modules/@thi.ng/associative/internal/equiv.js","./into":"../node_modules/@thi.ng/associative/into.js","./sorted-map":"../node_modules/@thi.ng/associative/sorted-map.js"}],"../node_modules/@thi.ng/associative/sparse-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sparseSet = exports.SparseSet32 = exports.SparseSet16 = exports.SparseSet8 = exports.ASparseSet = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _dissoc = require("./dissoc");

var _into = require("./into");

const __private = new WeakMap();

const fail = () => (0, _errors.illegalArgs)(`dense & sparse arrays must be of same size`);
/**
 * After "An Efficient Representation for Sparse Sets"
 * Preston Briggs and Linda Torczon (1993)
 *
 * https://research.swtch.com/sparse
 * https://programmingpraxis.com/2012/03/09/sparse-sets/
 * https://blog.molecular-matters.com/2013/07/24/adventures-in-data-oriented-design-part-3c-external-references/
 */


class ASparseSet extends Set {
  constructor(dense, sparse) {
    super();

    __private.set(this, {
      dense,
      sparse,
      n: 0
    });
  }

  [Symbol.iterator]() {
    return this.keys();
  }

  get size() {
    return __private.get(this).n;
  }

  get capacity() {
    return __private.get(this).dense.length;
  }

  clear() {
    __private.get(this).n = 0;
  }

  equiv(o) {
    if (this === o) {
      return true;
    }

    if (!(o instanceof Set) || this.size !== o.size) {
      return false;
    }

    const $this = __private.get(this);

    const d = $this.dense;

    for (let i = $this.n; --i >= 0;) {
      if (!o.has(d[i])) {
        return false;
      }
    }

    return true;
  }

  add(key) {
    const $this = __private.get(this);

    const dense = $this.dense;
    const sparse = $this.sparse;
    const max = dense.length;
    const i = sparse[key];
    const n = $this.n;

    if (key < max && n < max && !(i < n && dense[i] === key)) {
      dense[n] = key;
      sparse[key] = n;
      $this.n++;
    }

    return this;
  }

  delete(key) {
    const $this = __private.get(this);

    const dense = $this.dense;
    const sparse = $this.sparse;
    const i = sparse[key];

    if (i < $this.n && dense[i] === key) {
      const j = dense[--$this.n];
      dense[i] = j;
      sparse[j] = i;
      return true;
    }

    return false;
  }

  has(key) {
    const $this = __private.get(this);

    const i = $this.sparse[key];
    return i < $this.n && $this.dense[i] === key;
  }

  get(key, notFound = -1) {
    return this.has(key) ? key : notFound;
  }

  first() {
    const $this = __private.get(this);

    return $this.n ? $this.dense[0] : undefined;
  }

  into(keys) {
    return (0, _into.into)(this, keys);
  }

  disj(keys) {
    return (0, _dissoc.dissoc)(this, keys);
  }

  forEach(fn, thisArg) {
    const $this = __private.get(this);

    const d = $this.dense;
    const n = $this.n;

    for (let i = 0; i < n; i++) {
      const v = d[i];
      fn.call(thisArg, v, v, this);
    }
  }

  *entries() {
    const $this = __private.get(this);

    const d = $this.dense;
    const n = $this.n;

    for (let i = 0; i < n; i++) {
      yield [d[i], d[i]];
    }
  }

  *keys() {
    const $this = __private.get(this);

    const d = $this.dense;
    const n = $this.n;

    for (let i = 0; i < n; i++) {
      yield d[i];
    }
  }

  values() {
    return this.keys();
  }

  __copyTo(dest) {
    const $this = __private.get(this);

    const $c = __private.get(dest);

    $c.dense = $this.dense.slice();
    $c.sparse = $this.sparse.slice();
    $c.n = $this.n;
    return dest;
  }

}

exports.ASparseSet = ASparseSet;

class SparseSet8 extends ASparseSet {
  constructor(n, sparse) {
    (0, _checks.isNumber)(n) ? super(new Uint8Array(n), new Uint8Array(n)) : n.length === sparse.length ? super(n, sparse) : fail();
  }

  get [Symbol.species]() {
    return SparseSet8;
  }

  get [Symbol.toStringTag]() {
    return "SparseSet8";
  }

  copy() {
    return this.__copyTo(new SparseSet8(0));
  }

  empty() {
    return new SparseSet8(this.capacity);
  }

}

exports.SparseSet8 = SparseSet8;

class SparseSet16 extends ASparseSet {
  constructor(n, sparse) {
    (0, _checks.isNumber)(n) ? super(new Uint16Array(n), new Uint16Array(n)) : n.length === sparse.length ? super(n, sparse) : fail();
  }

  get [Symbol.species]() {
    return SparseSet16;
  }

  get [Symbol.toStringTag]() {
    return "SparseSet16";
  }

  copy() {
    return this.__copyTo(new SparseSet16(0));
  }

  empty() {
    return new SparseSet16(this.capacity);
  }

}

exports.SparseSet16 = SparseSet16;

class SparseSet32 extends ASparseSet {
  constructor(n, sparse) {
    (0, _checks.isNumber)(n) ? super(new Uint32Array(n), new Uint32Array(n)) : n.length === sparse.length ? super(n, sparse) : fail();
  }

  get [Symbol.species]() {
    return SparseSet32;
  }

  get [Symbol.toStringTag]() {
    return "SparseSet32";
  }

  copy() {
    return this.__copyTo(new SparseSet32(0));
  }

  empty() {
    return new SparseSet32(this.capacity);
  }

}
/**
 * Creates a new sparse set with given max. capacity (max ID + 1) and
 * chooses most memory efficient implementation, e.g. if `n` <= 256
 * returns a `SparseSet8` instance.
 *
 * @param n
 */


exports.SparseSet32 = SparseSet32;

const sparseSet = n => n <= 0x100 ? new SparseSet8(n) : n <= 0x10000 ? new SparseSet16(n) : new SparseSet32(n);

exports.sparseSet = sparseSet;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./dissoc":"../node_modules/@thi.ng/associative/dissoc.js","./into":"../node_modules/@thi.ng/associative/into.js"}],"../node_modules/@thi.ng/associative/union.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionR = unionR;
exports.union = void 0;

var _xformSetop = require("./internal/xform-setop");

var _into = require("./into");

var _utils = require("./utils");

/**
 * Computes union of sets `a` and `b` and writes results to new set or
 * optionally given set `out` (assumed to be empty for correct results).
 *
 * @param a
 * @param b
 * @param out
 */
const union = (a, b, out) => {
  if (a.size < b.size) {
    const t = a;
    a = b;
    b = t;
  }

  out = out ? (0, _into.into)(out, a) : (0, _utils.copy)(a, Set);
  return a === b ? out : (0, _into.into)(out, b);
};

exports.union = union;

function unionR(src) {
  return (0, _xformSetop.xformSetOp)(unionR, union, src);
}
},{"./internal/xform-setop":"../node_modules/@thi.ng/associative/internal/xform-setop.js","./into":"../node_modules/@thi.ng/associative/into.js","./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/without-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withoutKeysObj = exports.withoutKeysMap = void 0;

var _utils = require("./utils");

const withoutKeysMap = (src, keys) => {
  const ks = (0, _utils.ensureSet)(keys);
  const dest = (0, _utils.empty)(src, Map);

  for (let p of src.entries()) {
    const k = p[0];
    !ks.has(k) && dest.set(k, p[1]);
  }

  return dest;
};

exports.withoutKeysMap = withoutKeysMap;

const withoutKeysObj = (src, keys) => {
  const ks = (0, _utils.ensureSet)(keys);
  const dest = {};

  for (let k in src) {
    src.hasOwnProperty(k) && !ks.has(k) && (dest[k] = src[k]);
  }

  return dest;
};

exports.withoutKeysObj = withoutKeysObj;
},{"./utils":"../node_modules/@thi.ng/associative/utils.js"}],"../node_modules/@thi.ng/associative/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arraySet = require("./array-set");

Object.keys(_arraySet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _arraySet[key];
    }
  });
});

var _commonKeys = require("./common-keys");

Object.keys(_commonKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _commonKeys[key];
    }
  });
});

var _difference = require("./difference");

Object.keys(_difference).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _difference[key];
    }
  });
});

var _dissoc = require("./dissoc");

Object.keys(_dissoc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dissoc[key];
    }
  });
});

var _equivMap = require("./equiv-map");

Object.keys(_equivMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _equivMap[key];
    }
  });
});

var _hashMap = require("./hash-map");

Object.keys(_hashMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hashMap[key];
    }
  });
});

var _indexed = require("./indexed");

Object.keys(_indexed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _indexed[key];
    }
  });
});

var _intersection = require("./intersection");

Object.keys(_intersection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _intersection[key];
    }
  });
});

var _into = require("./into");

Object.keys(_into).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _into[key];
    }
  });
});

var _invert = require("./invert");

Object.keys(_invert).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _invert[key];
    }
  });
});

var _join = require("./join");

Object.keys(_join).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _join[key];
    }
  });
});

var _llSet = require("./ll-set");

Object.keys(_llSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _llSet[key];
    }
  });
});

var _mergeApply = require("./merge-apply");

Object.keys(_mergeApply).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeApply[key];
    }
  });
});

var _mergeDeep = require("./merge-deep");

Object.keys(_mergeDeep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeDeep[key];
    }
  });
});

var _mergeWith = require("./merge-with");

Object.keys(_mergeWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeWith[key];
    }
  });
});

var _merge = require("./merge");

Object.keys(_merge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _merge[key];
    }
  });
});

var _renameKeys = require("./rename-keys");

Object.keys(_renameKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renameKeys[key];
    }
  });
});

var _selectKeys = require("./select-keys");

Object.keys(_selectKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _selectKeys[key];
    }
  });
});

var _sortedMap = require("./sorted-map");

Object.keys(_sortedMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sortedMap[key];
    }
  });
});

var _sortedSet = require("./sorted-set");

Object.keys(_sortedSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sortedSet[key];
    }
  });
});

var _sparseSet = require("./sparse-set");

Object.keys(_sparseSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sparseSet[key];
    }
  });
});

var _union = require("./union");

Object.keys(_union).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _union[key];
    }
  });
});

var _withoutKeys = require("./without-keys");

Object.keys(_withoutKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _withoutKeys[key];
    }
  });
});
},{"./array-set":"../node_modules/@thi.ng/associative/array-set.js","./common-keys":"../node_modules/@thi.ng/associative/common-keys.js","./difference":"../node_modules/@thi.ng/associative/difference.js","./dissoc":"../node_modules/@thi.ng/associative/dissoc.js","./equiv-map":"../node_modules/@thi.ng/associative/equiv-map.js","./hash-map":"../node_modules/@thi.ng/associative/hash-map.js","./indexed":"../node_modules/@thi.ng/associative/indexed.js","./intersection":"../node_modules/@thi.ng/associative/intersection.js","./into":"../node_modules/@thi.ng/associative/into.js","./invert":"../node_modules/@thi.ng/associative/invert.js","./join":"../node_modules/@thi.ng/associative/join.js","./ll-set":"../node_modules/@thi.ng/associative/ll-set.js","./merge-apply":"../node_modules/@thi.ng/associative/merge-apply.js","./merge-deep":"../node_modules/@thi.ng/associative/merge-deep.js","./merge-with":"../node_modules/@thi.ng/associative/merge-with.js","./merge":"../node_modules/@thi.ng/associative/merge.js","./rename-keys":"../node_modules/@thi.ng/associative/rename-keys.js","./select-keys":"../node_modules/@thi.ng/associative/select-keys.js","./sorted-map":"../node_modules/@thi.ng/associative/sorted-map.js","./sorted-set":"../node_modules/@thi.ng/associative/sorted-set.js","./sparse-set":"../node_modules/@thi.ng/associative/sparse-set.js","./union":"../node_modules/@thi.ng/associative/union.js","./without-keys":"../node_modules/@thi.ng/associative/without-keys.js"}],"../node_modules/@thi.ng/rstream/pubsub.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PubSub = exports.pubsub = void 0;

var _associative = require("@thi.ng/associative");

var _errors = require("@thi.ng/errors");

var _api = require("./api");

var _subscription = require("./subscription");

var _idgen = require("./utils/idgen");

/**
 * Topic based stream splitter. Applies `topic` function to each
 * received value and only forwards it to the child subscriptions of the
 * returned topic.
 *
 * @remarks
 * The actual topic (return value from `topic` fn) can be of any type,
 * apart from `undefined`. Complex topics (e.g objects / arrays) are
 * allowed and they're matched with registered topics using
 * @thi.ng/equiv by default (but customizable via `equiv` option). Each
 * topic can have any number of subscribers.
 *
 * If a `xform` transducer is given, it is always applied prior to
 * passing the input to the topic function. I.e. in this case the topic
 * function will receive the transformed inputs.
 *
 * {@link PubSub} supports dynamic topic subscriptions and
 * unsubscriptions via {@link PubSub.subscribeTopic} and
 * {@link PubSub.unsubscribeTopic}. However, the standard
 * {@link ISubscribable.subscribe} / {@link ISubscribable.unsubscribe}
 * methods are NOT supported (since meaningless) and will throw an
 * error! `unsubscribe()` can only be called WITHOUT argument to
 * unsubscribe the entire `PubSub` instance (incl. all topic
 * subscriptions) from the parent stream.
 *
 * @param opts
 */
const pubsub = opts => new PubSub(opts);

exports.pubsub = pubsub;

class PubSub extends _subscription.Subscription {
  constructor(opts) {
    opts = opts || {};
    super(undefined, (0, _idgen.optsWithID)("pubsub", {
      xform: opts.xform
    }));
    this.topicfn = opts.topic;
    this.topics = new _associative.EquivMap(undefined, {
      equiv: opts.equiv
    });
  }
  /**
   * Unsupported. Use `subscribeTopic()` instead.
   */


  subscribe() {
    return (0, _errors.unsupported)(`use subscribeTopic() instead`);
  }
  /**
   * Unsupported. Use `subscribeTopic()` instead.
   */


  transform() {
    return (0, _errors.unsupported)(`use subscribeTopic() instead`);
  }

  subscribeTopic(topicID, sub, opts) {
    let t = this.topics.get(topicID);
    !t && this.topics.set(topicID, t = (0, _subscription.subscription)());
    return t.subscribe(sub, opts);
  }

  unsubscribeTopic(topicID, sub) {
    const t = this.topics.get(topicID);
    return t ? t.unsubscribe(sub) : false;
  }

  unsubscribe(sub) {
    if (!sub) {
      for (let t of this.topics.values()) {
        t.unsubscribe();
      }

      this.topics.clear();
      return super.unsubscribe();
    }

    return (0, _errors.unsupported)();
  }

  done() {
    for (let t of this.topics.values()) {
      t.done();
    }

    super.done();
  }

  dispatch(x) {
    _api.LOGGER.debug(this.id, "dispatch", x);

    const t = this.topicfn(x);

    if (t !== undefined) {
      const sub = this.topics.get(t);

      if (sub) {
        try {
          sub.next && sub.next(x);
        } catch (e) {
          sub.error ? sub.error(e) : this.error(e);
        }
      }
    }
  }

}

exports.PubSub = PubSub;
},{"@thi.ng/associative":"../node_modules/@thi.ng/associative/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./api":"../node_modules/@thi.ng/rstream/api.js","./subscription":"../node_modules/@thi.ng/rstream/subscription.js","./utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/stream.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stream = stream;
exports.Stream = void 0;

var _checks = require("@thi.ng/checks");

var _api = require("./api");

var _subscription = require("./subscription");

var _idgen = require("./utils/idgen");

function stream(src, opts) {
  return new Stream(src, opts);
}

class Stream extends _subscription.Subscription {
  // prettier-ignore
  constructor(src, opts) {
    const [_src, _opts] = (0, _checks.isFunction)(src) ? [src, opts] : [undefined, src];
    super(undefined, (0, _idgen.optsWithID)("stream", _opts));
    this.src = _src;
    this._inited = false;
  }

  subscribe(...args) {
    const wrapped = super.subscribe.apply(this, args);

    if (!this._inited) {
      this._cancel = this.src && this.src(this) || (() => void 0);

      this._inited = true;
    }

    return wrapped;
  }

  unsubscribe(sub) {
    const res = super.unsubscribe(sub);

    if (res && (!sub || (!this.subs || !this.subs.length) && this.closeOut !== 0
    /* NEVER */
    )) {
      this.cancel();
    }

    return res;
  }

  done() {
    this.cancel();
    super.done();
    delete this.src;
    delete this._cancel;
  }

  error(e) {
    super.error(e);
    this.cancel();
  }

  cancel() {
    if (this._cancel) {
      _api.LOGGER.debug(this.id, "cancel");

      const f = this._cancel;
      delete this._cancel;
      f();
    }
  }

}

exports.Stream = Stream;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","./api":"../node_modules/@thi.ng/rstream/api.js","./subscription":"../node_modules/@thi.ng/rstream/subscription.js","./utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/stream-merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamMerge = exports.merge = void 0;

var _subscription = require("./subscription");

var _idgen = require("./utils/idgen");

/**
 * Returns a new {@link StreamMerge} subscription, consuming values from
 * multiple inputs and passing received values on to any subscribers.
 *
 * @remarks
 * Input streams can be added and removed dynamically. By default,
 * `StreamMerge` calls {@link ISubscriber.done} when the last active
 * input is done, but this behavior can be overridden via the provided
 * {@link StreamMergeOpts | options}.
 *
 * @example
 * ```ts
 * merge({
 *     // input streams w/ different frequencies
 *     src: [
 *         fromIterable([1, 2, 3], { delay: 10 }),
 *         fromIterable([10, 20, 30], { delay: 21 }),
 *         fromIterable([100, 200, 300], { delay: 7 })
 *     ]
 * }).subscribe(trace());
 * // 100
 * // 1
 * // 200
 * // 10
 * // 2
 * // 300
 * // 3
 * // 20
 * // 30
 * ```
 *
 * @example
 * Use the {@link @thi.ng/transducers#labeled} transducer for each
 * input to create a stream of labeled values and track their provenance:
 *
 * ```ts
 * merge({
 *     src: [
 *         fromIterable([1, 2, 3]).transform(tx.labeled("a")),
 *         fromIterable([10, 20, 30]).transform(tx.labeled("b")),
 *     ]
 * }).subscribe(trace());
 * // ["a", 1]
 * // ["b", 10]
 * // ["a", 2]
 * // ["b", 20]
 * // ["a", 3]
 * // ["b", 30]
 * ```
 *
 * @param opts
 */
const merge = opts => new StreamMerge(opts);

exports.merge = merge;

class StreamMerge extends _subscription.Subscription {
  constructor(opts) {
    opts = opts || {};
    super(undefined, (0, _idgen.optsWithID)("streammerge", opts));
    this.sources = new Map();
    opts.src && this.addAll(opts.src);
  }

  add(src) {
    this.ensureState();
    this.sources.set(src, src.subscribe({
      next: x => {
        if (x instanceof _subscription.Subscription) {
          this.add(x);
        } else {
          this.next(x);
        }
      },
      done: () => this.markDone(src),
      __owner: this
    }, {
      id: `in-${src.id}`
    }));
  }

  addAll(src) {
    for (let s of src) {
      this.add(s);
    }
  }

  remove(src) {
    const sub = this.sources.get(src);

    if (sub) {
      this.sources.delete(src);
      sub.unsubscribe();
      return true;
    }

    return false;
  }

  removeID(id) {
    for (let s of this.sources) {
      if (s[0].id === id) {
        return this.remove(s[0]);
      }
    }

    return false;
  }

  removeAll(src) {
    let ok = true;

    for (let s of src) {
      ok = this.remove(s) && ok;
    }

    return ok;
  }

  removeAllIDs(ids) {
    let ok = true;

    for (let id of ids) {
      ok = this.removeID(id) && ok;
    }

    return ok;
  }

  unsubscribe(sub) {
    if (!sub) {
      for (let s of this.sources.values()) {
        s.unsubscribe();
      }

      this.state = 2
      /* DONE */
      ;
      this.sources.clear();
    }

    return super.unsubscribe(sub);
  }

  markDone(src) {
    this.remove(src);

    if (this.closeIn === 1
    /* FIRST */
    || this.closeIn === 2
    /* LAST */
    && !this.sources.size) {
      this.done();
    }
  }

}

exports.StreamMerge = StreamMerge;
},{"./subscription":"../node_modules/@thi.ng/rstream/subscription.js","./utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/from/iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromIterableSync = exports.fromIterable = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Returns a {@link Stream} of values from provided iterable, emitted at
 * the given `delay` interval.
 *
 * @remarks
 * Asynchronously starts pulling values from source iterable when the
 * first subscriber becomes available. The values are processed &
 * emitted via `setInterval()`, using the given `delay` value (default:
 * 0). By default, once the iterable is exhausted (if finite), calls
 * {@link ISubscriber.done} to close the stream, but this can be
 * re-configured via provided {@link CommonOpts | options}.
 *
 * @param src
 * @param opts
 */
const fromIterable = (src, opts = {}) => new _stream.Stream(stream => {
  const iter = src[Symbol.iterator]();
  const id = setInterval(() => {
    let val;

    if ((val = iter.next()).done) {
      clearInterval(id);
      stream.closeIn !== 0
      /* NEVER */
      && stream.done();
    } else {
      stream.next(val.value);
    }
  }, opts.delay || 0);
  return () => clearInterval(id);
}, (0, _idgen.optsWithID)("iterable", opts));
/**
 * Creates a new `Stream` of given iterable which synchronously calls
 * `.next()` for each item of the iterable when the first (and in this
 * case the only one) subscriber becomes available. Once the iterable is
 * exhausted (MUST be finite!), then calls `.done()` by default, but can
 * be avoided by passing `false` as last argument.
 *
 * @param src
 * @param opts
 */


exports.fromIterable = fromIterable;

const fromIterableSync = (src, opts) => new _stream.Stream(stream => {
  for (let s of src) {
    stream.next(s);
  }

  stream.closeIn !== 0
  /* NEVER */
  && stream.done();
}, (0, _idgen.optsWithID)("iterable-sync", opts));

exports.fromIterableSync = fromIterableSync;
},{"../stream":"../node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/trigger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trigger = trigger;

var _iterable = require("./from/iterable");

var _idgen = require("./utils/idgen");

function trigger(x = true) {
  return (0, _iterable.fromIterable)([x], (0, _idgen.optsWithID)("trigger"));
}
},{"./from/iterable":"../node_modules/@thi.ng/rstream/from/iterable.js","./utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/from/interval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromInterval = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Returns a {@link Stream} of monotonically increasing counter values,
 * emitted at given `delay` interval and up to the optionally defined
 * max value (default: ∞), after which the stream is closed.
 *
 * @remarks
 * The stream only starts when the first subscriber becomes available.
 *
 * @param delay
 * @param opts
 */
const fromInterval = (delay, opts) => {
  opts = (0, _idgen.optsWithID)("interval", Object.assign({
    num: Infinity
  }, opts));
  return new _stream.Stream(stream => {
    let i = 0;
    let count = opts.num;
    stream.next(i++);
    let id = setInterval(() => {
      stream.next(i++);

      if (--count <= 0) {
        clearInterval(id);
        stream.closeIn !== 0
        /* NEVER */
        && stream.done();
      }
    }, delay);
    return () => clearInterval(id);
  }, opts);
};

exports.fromInterval = fromInterval;
},{"../stream":"../node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/from/raf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromRAF = void 0;

var _checks = require("@thi.ng/checks");

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

var _interval = require("./interval");

/**
 * Yields {@link Stream} of a monotonically increasing counter,
 * triggered by a `requestAnimationFrame()` loop (only available in
 * browser environments).
 *
 * @remarks
 * In NodeJS, this function falls back to {@link fromInterval}, yielding
 * a similar (approx. 60Hz) stream.
 *
 * All subscribers to this stream will be processed during that same
 * loop iteration.
 */
const fromRAF = opts => (0, _checks.isNode)() ? (0, _interval.fromInterval)(16, opts) : new _stream.Stream(stream => {
  let i = 0;
  let isActive = true;

  let loop = () => {
    isActive && stream.next(i++);
    isActive && (id = requestAnimationFrame(loop));
  };

  let id = requestAnimationFrame(loop);
  return () => {
    isActive = false;
    cancelAnimationFrame(id);
  };
}, (0, _idgen.optsWithID)("raf", opts));

exports.fromRAF = fromRAF;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","../stream":"../node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js","./interval":"../node_modules/@thi.ng/rstream/from/interval.js"}],"../node_modules/@thi.ng/rstream/tween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tweenNumber = exports.tween = void 0;

var _checks = require("@thi.ng/checks");

var _transducers = require("@thi.ng/transducers");

var _interval = require("./from/interval");

var _raf = require("./from/raf");

var _streamSync = require("./stream-sync");

/**
 * Takes an existing stream/subscription `src` and attaches new
 * subscription which interpolates between incoming values from `src`
 * using the given `mix` function.
 *
 * @remarks
 * The returned construct produces values at a rate controlled by the
 * `clock` stream or frequency. If omitted, `clock` defaults to
 * {@link fromRAF} (~60Hz). If the `clock` is given as number, creates a
 * {@link fromInterval} or else uses the given `clock` stream directly.
 * In general, the frequency of the `clock` should always be higher than
 * that of `src` or else interpolation will have undefined behavior.
 *
 * If `stop` is given as well, no values will be passed downstream if
 * that function returns true. This can be used to limit traffic once
 * the tween target value has been reached.
 *
 * The returned subscription closes automatically when either `src` or
 * `clock` are exhausted.
 *
 * @example
 * ```ts
 * val = stream();
 *
 * tween(
 *   // consume from `val` stream
 *   val,
 *   // initial start value to interpolate from
 *   0,
 *   // interpolation fn (LERP)
 *   (a, b) => a + (b - a) * 0.5,
 *   // stop emitting values if difference to previous result < 0.01
 *   (a, b) => Math.abs(a - b) < 0.01
 * ).subscribe(trace("tweened"))
 *
 * a.next(10)
 * // 5
 * // 7.5
 * // ...
 * // 9.98046875
 *
 * a.next(100)
 * // 55
 * // 77.5
 * // ...
 * // 99.989013671875
 * ```
 *
 * @param src
 * @param initial
 * @param mix
 * @param stop
 * @param clock
 */
const tween = (src, initial, mix, stop, clock) => (0, _streamSync.sync)({
  src: {
    src,
    _: clock == null ? (0, _raf.fromRAF)() : (0, _checks.isNumber)(clock) ? (0, _interval.fromInterval)(clock) : clock
  },
  closeIn: 1
  /* FIRST */

}).transform((0, _transducers.scan)((0, _transducers.reducer)(() => initial, (acc, {
  src
}) => mix(acc, src))), (0, _transducers.dedupe)(stop || (() => false)));
/**
 * Convenience version of `tween` for its most common use case, tweening
 * of numeric streams.
 *
 * @param src
 * @param init
 * @param speed
 * @param eps
 * @param clock
 */


exports.tween = tween;

const tweenNumber = (src, init = 0, speed = 0.05, eps = 1e-3, clock) => tween(src, init, (a, b) => a + (b - a) * speed, (a, b) => Math.abs(a - b) < eps, clock);

exports.tweenNumber = tweenNumber;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","./from/interval":"../node_modules/@thi.ng/rstream/from/interval.js","./from/raf":"../node_modules/@thi.ng/rstream/from/raf.js","./stream-sync":"../node_modules/@thi.ng/rstream/stream-sync.js"}],"../node_modules/@thi.ng/rstream/from/atom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromAtom = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Yields {@link Stream} of value changes in given
 * {@link @thi.ng/atom# | Atom-like state container}.
 *
 * @remarks
 * Attaches a {@link @thi.ng/api#IWatch.addWatch | watch} to the atom
 * and checks for value changes with given `changed` predicate (`!==` by
 * default). If the predicate returns truthy result, the new value is
 * emitted on the stream. If `emitFirst` is true (default), also emits
 * atom's current value when first subscriber attaches to stream.
 *
 * Also see {@link fromView}
 *
 * @example
 * ```ts
 * db = new Atom({ a: 23, b: 88 });
 * cursor = new Cursor(db, "a")
 *
 * rs.fromAtom(cursor).subscribe(rs.trace("cursor val:"))
 * // cursor val: 23
 *
 * cursor.reset(42);
 * // cursor val: 42
 *
 * db.reset({a: 66})
 * // cursor val: 66
 * ```
 *
 * @param atom
 * @param opts
 */
const fromAtom = (atom, opts) => {
  opts = (0, _idgen.optsWithID)("atom", Object.assign({
    emitFirst: true,
    changed: (a, b) => a !== b
  }, opts));
  return new _stream.Stream(stream => {
    atom.addWatch(stream.id, (_, prev, curr) => {
      if (opts.changed(prev, curr)) {
        stream.next(curr);
      }
    });
    opts.emitFirst && stream.next(atom.deref());
    return () => atom.removeWatch(stream.id);
  }, opts);
};

exports.fromAtom = fromAtom;
},{"../stream":"../node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/from/event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromDOMEvent = exports.fromEvent = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Creates a {@link Stream} of events attached to given element / event
 * target and using given event listener options (same as supported by
 * `addEventListener()`, default: false).
 *
 * @param src event target
 * @param name event name
 * @param listenerOpts listener opts
 * @param streamOpts stream opts
 */
const fromEvent = (src, name, listenerOpts = false, streamOpts) => new _stream.Stream(stream => {
  let listener = e => stream.next(e);

  src.addEventListener(name, listener, listenerOpts);
  return () => src.removeEventListener(name, listener, listenerOpts);
}, (0, _idgen.optsWithID)(`event-${name}`, streamOpts));
/**
 * Same as `fromEvent`, however only supports well-known DOM event
 * names. Returned stream instance will use corresponding concrete event
 * type in its type signature, whereas `fromEvent` will only use the
 * generic `Event`.
 *
 * ```
 * fromDOMEvent(document.body, "mousemove"); // Stream<MouseEvent>
 * fromEvent(document.body, "mousemove"); // Stream<Event>
 * ```
 *
 * @see fromEvent
 *
 * @param src
 * @param name
 * @param listenerOpts
 * @param streamOpts
 */


exports.fromEvent = fromEvent;

const fromDOMEvent = (src, name, listenerOpts = false, streamOpts) => fromEvent(src, name, listenerOpts, streamOpts);

exports.fromDOMEvent = fromDOMEvent;
},{"../stream":"../node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/from/promise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromPromise = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Yields a single-value {@link Stream} of the resolved promise and then
 * automatically marks itself done.
 *
 * @remarks
 * It doesn't matter if the promise resolves before the first subscriber
 * has attached.
 *
 * @param src
 * @param opts
 */
const fromPromise = (src, opts) => {
  let canceled = false;
  let isError = false;
  let err = {};
  src.catch(e => {
    err = e;
    isError = true;
  });
  return new _stream.Stream(stream => {
    src.then(x => {
      if (!canceled && stream.getState() < 2
      /* DONE */
      ) {
          if (isError) {
            stream.error(err);
            err = null;
          } else {
            stream.next(x);
            stream.closeIn !== 0
            /* NEVER */
            && stream.done();
          }
        }
    }, e => stream.error(e));
    return () => {
      canceled = true;
    };
  }, (0, _idgen.optsWithID)("promise", opts));
};

exports.fromPromise = fromPromise;
},{"../stream":"../node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/from/promises.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromPromises = void 0;

var _transducers = require("@thi.ng/transducers");

var _idgen = require("../utils/idgen");

var _promise = require("./promise");

/**
 * Wraps given iterable in `Promise.all()` to yield {@link Stream} of
 * results in same order as arguments, then closes.
 *
 * @remarks
 * If any of the promises rejects, all others will do so too. In this
 * case the stream calls {@link ISubscriber.error} in all of its
 * subscribers.
 *
 * @example
 * ```ts
 * fromPromises([
 *     Promise.resolve(1),
 *     Promise.resolve(2),
 *     Promise.resolve(3)
 * ]).subscribe(trace())
 * // 1
 * // 2
 * // 3
 * // done
 * ```
 *
 * @example
 * If individual error handling is required, an alternative is below
 * (however this approach provides no ordering guarantees):
 *
 * ```ts
 * fromIterable([
 *     Promise.resolve(1),
 *     new Promise(() => setTimeout(() => { throw new Error("eeek"); }, 10)),
 *     Promise.resolve(3)
 * ]).subscribe(resolve()).subscribe(trace())
 * ```
 *
 * @param promises
 */
const fromPromises = (promises, opts) => (0, _promise.fromPromise)(Promise.all(promises), (0, _idgen.optsWithID)("promises", opts)).transform((0, _transducers.mapcat)(x => x));

exports.fromPromises = fromPromises;
},{"@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js","./promise":"../node_modules/@thi.ng/rstream/from/promise.js"}],"../node_modules/@thi.ng/paths/path.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exists = exports.toPath = void 0;

var _checks = require("@thi.ng/checks");

/**
 * Converts the given key path to canonical form (array).
 *
 * ```
 * toPath("a.b.c");
 * // ["a", "b", "c"]
 *
 * toPath(0)
 * // [0]
 *
 * toPath(["a", "b", "c"])
 * // ["a", "b", "c"]
 * ```
 *
 * @param path
 */
const toPath = path => (0, _checks.isArray)(path) ? path : (0, _checks.isString)(path) ? path.length > 0 ? path.split(".") : [] : path != null ? [path] : [];
/**
 * Takes an arbitrary object and lookup path. Descends into object along
 * path and returns true if the full path exists (even if final leaf
 * value is `null` or `undefined`). Checks are performed using
 * `hasOwnProperty()`.
 *
 * @param obj
 * @param path
 */


exports.toPath = toPath;

const exists = (obj, path) => {
  if (obj == null) {
    return false;
  }

  path = toPath(path);

  for (let n = path.length - 1, i = 0; i <= n; i++) {
    const k = path[i];

    if (!obj.hasOwnProperty(k)) {
      return false;
    }

    obj = obj[k];

    if (obj == null && i < n) {
      return false;
    }
  }

  return true;
};

exports.exists = exists;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js"}],"../node_modules/@thi.ng/paths/getter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getterT = getterT;
exports.getter = void 0;

var _path = require("./path");

/**
 * Composes a getter function for given nested lookup path. Optimized
 * fast execution paths are provided for path lengths <= 4.
 *
 * @remarks
 * Supports any `[]`-indexable data structure (arrays, objects,
 * strings).
 *
 * If `path` is given as string, it will be split using `.`. Returns
 * function which accepts single object and when called, returns value
 * at given path.
 *
 * If any intermediate key is not present in the given obj, descent
 * stops and the function returns `undefined`.
 *
 * If `path` is an empty string or array, the returned getter will
 * simply return the given state arg (identity function).
 *
 * Also see: `getIn()`
 *
 * @example
 * ```ts
 * interface Foo {
 *   a: { b: { c: number; } }
 * }
 *
 * // fully typed getter
 * g = getter<Foo, "a", "b", "c">(["a","b","c"]);
 *
 * // error (wrong `d` key)
 * g = getter<Foo, "a", "b", "d">(["a","b","d"]);
 *
 * // unchecked (accepts any, returns any)
 * g = getter("a.b.c");
 *
 * g({ a: { b: { c: 23} } }) // 23
 * g({ x: 23 }) // undefined
 * g() // undefined
 * ```
 *
 * @param path
 */
const getter = path => getterT(path);

exports.getter = getter;

function getterT(path) {
  const ks = (0, _path.toPath)(path);
  let [a, b, c, d] = ks;

  switch (ks.length) {
    case 0:
      return s => s;

    case 1:
      return s => s != null ? s[a] : undefined;

    case 2:
      return s => s != null ? (s = s[a]) != null ? s[b] : undefined : undefined;

    case 3:
      return s => s != null ? (s = s[a]) != null ? (s = s[b]) != null ? s[c] : undefined : undefined : undefined;

    case 4:
      return s => s != null ? (s = s[a]) != null ? (s = s[b]) != null ? (s = s[c]) != null ? s[d] : undefined : undefined : undefined : undefined;

    default:
      return s => {
        const n = ks.length - 1;
        let res = s;

        for (let i = 0; res != null && i <= n; i++) {
          res = res[ks[i]];
        }

        return res;
      };
  }
}
},{"./path":"../node_modules/@thi.ng/paths/path.js"}],"../node_modules/@thi.ng/paths/setter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setterT = setterT;
exports.setter = void 0;

var _checks = require("@thi.ng/checks");

var _path = require("./path");

/**
 * Composes a setter function for given nested update path. Optimized
 * fast execution paths are provided for path lengths less up to 4.
 *
 * @remarks
 * Supports both arrays and objects and creates intermediate shallow
 * copies at each level of the path. Thus provides structural sharing
 * with the original data for any branches not being updated by the
 * setter.
 *
 * If `path` is given as string, it will be split using `.`. Returns
 * function which accepts single object and when called, **immutably**
 * updates value at given path, i.e. produces a partial deep copy of obj
 * up until given path.
 *
 * If any intermediate key is not present in the given obj, creates a
 * plain empty object for that key and descends further.
 *
 * If `path` is an empty string or array, the returned setter will
 * simply return the new value.
 *
 * Only keys in the path will be modified, all other keys present in the
 * given object retain their original values to provide efficient
 * structural sharing / re-use.
 *
 * Also see: {@link setIn}, {@link updateIn}, {@link deleteIn}
 *
 * @example
 * ```
 * s = setter("a.b.c");
 * // or
 * s = setter(["a","b","c"]);
 *
 * s({ a: { b: { c: 23} } }, 24)
 * // { a: { b: { c: 24} } }
 *
 * s({ x: 23 }, 24)
 * // { x: 23, a: { b: { c: 24 } } }
 *
 * s(null, 24)
 * // { a: { b: { c: 24 } } }
 * ```
 *
 * @example
 * ```ts
 * s = setter("a.b.c");
 *
 * a = {x: {y: {z: 1}}};
 * b = s(a, 2);
 * // { x: { y: { z: 1 } }, a: { b: { c: 2 } } }
 *
 * a.x === b.x // true
 * a.x.y === b.x.y // true
 * ```
 *
 * @param path
 */
const setter = path => setterT(path);

exports.setter = setter;

function setterT(path) {
  const ks = (0, _path.toPath)(path);
  let [a, b, c, d] = ks;

  switch (ks.length) {
    case 0:
      return (_, v) => v;

    case 1:
      return (s, v) => (s = _copy(s), s[a] = v, s);

    case 2:
      return (s, v) => {
        let x;
        s = _copy(s);
        s[a] = x = _copy(s[a]);
        x[b] = v;
        return s;
      };

    case 3:
      return (s, v) => {
        let x, y;
        s = _copy(s);
        s[a] = x = _copy(s[a]);
        x[b] = y = _copy(x[b]);
        y[c] = v;
        return s;
      };

    case 4:
      return (s, v) => {
        let x, y, z;
        s = _copy(s);
        s[a] = x = _copy(s[a]);
        x[b] = y = _copy(x[b]);
        y[c] = z = _copy(y[c]);
        z[d] = v;
        return s;
      };

    default:
      let f;

      for (let i = ks.length; --i >= 0;) {
        f = compS(ks[i], f);
      }

      return f;
  }
}

const _copy = s => (0, _checks.isArray)(s) ? s.slice() : Object.assign({}, s);

const compS = (k, f) => (s, v) => (s = _copy(s), s[k] = f ? f(s[k], v) : v, s);
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","./path":"../node_modules/@thi.ng/paths/path.js"}],"../node_modules/@thi.ng/paths/update-in.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateInT = updateInT;
exports.updateIn = void 0;

var _getter = require("./getter");

var _setter = require("./setter");

/**
 * Similar to {@link setIn}, but applies given function to current path
 * value (incl. any additional/optional arguments passed to `updateIn`)
 * and uses result as new value. Does not modify original state (unless
 * given function does so itself).
 *
 * ```
 * add = (x, y) => x + y;
 * updateIn({ a: { b: { c: 23 } } }, "a.b.c", add, 10);
 * // { a: { b: { c: 33 } } }
 * ```
 *
 * @param state - state to update
 * @param path - update path
 * @param fn - update function
 * @param args - optional args for `fn`
 */
const updateIn = (state, path, fn, ...args) => updateInT(state, path, fn, ...args);

exports.updateIn = updateIn;

function updateInT(state, path, fn, ...args) {
  return (0, _setter.setterT)(path)(state, fn.apply(null, (args.unshift((0, _getter.getterT)(path)(state)), args)));
}
},{"./getter":"../node_modules/@thi.ng/paths/getter.js","./setter":"../node_modules/@thi.ng/paths/setter.js"}],"../node_modules/@thi.ng/paths/delete-in.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteInT = deleteInT;
exports.deleteIn = void 0;

var _path = require("./path");

var _updateIn = require("./update-in");

/**
 * Uses {@link updateIn} and returns updated state with key for given
 * path removed. Does not modify original state.Returns `undefined` if
 * `path` is an empty string or array.
 *
 * ```
 * deleteIn({ a: { b: { c: 23 } } }, "a.b.c");
 * // { a: { b: { } } }
 * ```
 *
 * @param state
 * @param path
 */
const deleteIn = (state, path) => deleteInT(state, path);

exports.deleteIn = deleteIn;

function deleteInT(state, path) {
  const ks = [...(0, _path.toPath)(path)];

  if (ks.length > 0) {
    const k = ks.pop();
    return (0, _updateIn.updateInT)(state, ks, x => (x = Object.assign({}, x), delete x[k], x));
  }
}
},{"./path":"../node_modules/@thi.ng/paths/path.js","./update-in":"../node_modules/@thi.ng/paths/update-in.js"}],"../node_modules/@thi.ng/paths/get-in.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInT = getInT;
exports.getIn = void 0;

var _getter = require("./getter");

/**
 * Immediate use getter, i.e. same as: `getter(path)(state)`.
 *
 * @remarks
 * Supports type checked paths and values for path lengths <= 8. String
 * paths are always unchecked (i.e. `state` is `any`).
 *
 * @example
 * ```ts
 * // checked path and inferred return type
 * getIn({ a: { b: { c: 23 } } }, ["a","b","c"]);
 * // 23
 *
 * // unchecked path
 * getIn({ a: { b: { c: 23 } } }, "a.b.c");
 * // 23
 * ```
 *
 * @param state
 * @param path
 */
const getIn = (state, path) => (0, _getter.getterT)(path)(state);

exports.getIn = getIn;

function getInT(state, path) {
  return (0, _getter.getterT)(path)(state);
}
},{"./getter":"../node_modules/@thi.ng/paths/getter.js"}],"../node_modules/@thi.ng/paths/mutator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutatorT = mutatorT;
exports.mutator = void 0;

var _path = require("./path");

/**
 * Higher-order function, similar to {@link setter}. Returns function
 * which when called mutates given object/array at given path location.
 *
 * @remarks
 * The returned function bails if any intermediate path values are
 * non-indexable (only the very last path element can be missing in the
 * actual object structure). If successful, returns original (mutated)
 * object, else `undefined`. This function provides optimized versions
 * for path lengths <= 4. Type checking is supported for path lengths <=
 * 8.
 *
 * @param path
 */
const mutator = path => mutatorT(path);

exports.mutator = mutator;

function mutatorT(path) {
  const ks = (0, _path.toPath)(path);
  let [a, b, c, d] = ks;

  switch (ks.length) {
    case 0:
      return (_, x) => x;

    case 1:
      return (s, x) => s ? (s[a] = x, s) : undefined;

    case 2:
      return (s, x) => {
        let t;
        return s ? (t = s[a]) ? (t[b] = x, s) : undefined : undefined;
      };

    case 3:
      return (s, x) => {
        let t;
        return s ? (t = s[a]) ? (t = t[b]) ? (t[c] = x, s) : undefined : undefined : undefined;
      };

    case 4:
      return (s, x) => {
        let t;
        return s ? (t = s[a]) ? (t = t[b]) ? (t = t[c]) ? (t[d] = x, s) : undefined : undefined : undefined : undefined;
      };

    default:
      return (s, x) => {
        let t = s;
        const n = ks.length - 1;

        for (let k = 0; k < n; k++) {
          if (!(t = t[ks[k]])) return;
        }

        t[ks[n]] = x;
        return s;
      };
  }
}
},{"./path":"../node_modules/@thi.ng/paths/path.js"}],"../node_modules/@thi.ng/paths/mut-in.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutInT = mutInT;
exports.mutIn = void 0;

var _mutator = require("./mutator");

/**
 * Immediate use mutator, i.e. same as: `mutator(path)(state, val)`.
 *
 * @remarks
 * Also see {@link setIn}, {@link updateIn}, {@link deleteIn}.
 *
 * @example
 * ```ts
 * interface Foo {
 *   a: { b: number[]; }
 * }
 *
 * // fully type checked
 * mutIn({ a: { b: [10, 20] } }, ["a", "b", 1], 23)
 * // { a: { b: [ 10, 23 ] } }
 *
 * // unchecked
 * mutIn({ a: { b: [10, 20] } }, "a.b.1", 23);
 * // { a: { b: [ 10, 23 ] } }
 *
 * // fails (see `mutator` docs)
 * mutIn({}, "a.b.c", 23);
 * // undefined
 * ```
 *
 * @param state
 * @param path
 * @param val
 */
const mutIn = (state, path, val) => mutInT(state, path, val);

exports.mutIn = mutIn;

function mutInT(state, path, val) {
  return (0, _mutator.mutatorT)(path)(state, val);
}
},{"./mutator":"../node_modules/@thi.ng/paths/mutator.js"}],"../node_modules/@thi.ng/paths/mut-in-many.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutInMany = void 0;

var _errors = require("@thi.ng/errors");

var _mutIn = require("./mut-in");

/**
 * Similar to {@link mutIn}, but takes any number of path-value pairs as
 * args and applies them in sequence using `mutIn()`. All key paths must
 * already be present in the given data structure until their
 * penultimate key.
 *
 * @remarks
 * Unlike {@link mutIn}, this function does not use type checked paths.
 *
 * @example
 * ```ts
 * mutInMany(
 *   { a: { b: 1 }, x: { y: { z: 2 } } },
 *   "a.b", 10,
 *   "x.y.z", 20
 * )
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state
 * @param pairs
 */
const mutInMany = (state, ...pairs) => {
  const n = pairs.length;
  n & 1 && (0, _errors.illegalArgs)(`require even number of args (got ${pairs.length})`);

  for (let i = 0; i < n && state; i += 2) {
    state = (0, _mutIn.mutInT)(state, pairs[i], pairs[i + 1]);
  }

  return state;
};

exports.mutInMany = mutInMany;
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./mut-in":"../node_modules/@thi.ng/paths/mut-in.js"}],"../node_modules/@thi.ng/paths/set-in.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInT = setInT;
exports.setIn = void 0;

var _setter = require("./setter");

/**
 * Immediate use setter, i.e. same as: `setter(path)(state, val)`.
 *
 * @remarks
 * Supports type checked paths and values for path lengths <= 8. String
 * paths are always unchecked (i.e. `state` is `any`).
 *
 * @example
 * ```ts
 *
 * setIn({}, "a.b.c", 23);
 * // { a: { b: { c: 23} } }
 * ```
 *
 * @param state
 * @param path
 */
const setIn = (state, path, val) => (0, _setter.setterT)(path)(state, val);

exports.setIn = setIn;

function setInT(state, path, val) {
  return (0, _setter.setterT)(path)(state, val);
}
},{"./setter":"../node_modules/@thi.ng/paths/setter.js"}],"../node_modules/@thi.ng/paths/set-in-many.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInMany = void 0;

var _errors = require("@thi.ng/errors");

var _setIn = require("./set-in");

/**
 * Similar to {@link setIn}, but takes any number of path-value pairs as
 * args and applies them in sequence by calling `setIn()` for each.
 *
 * @remarks
 * Any key paths missing in the data structure will be created. Does
 * *not* mutate original (instead use {@link mutInMany} for this
 * purpose).
 *
 * Unlike {@link setIn}, this function does not use type checked paths.
 *
 * ```
 * setInMany({}, "a.b", 10, "x.y.z", 20)
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state
 * @param pairs
 */
const setInMany = (state, ...pairs) => {
  const n = pairs.length;
  n & 1 && (0, _errors.illegalArgs)(`require even number of KV args (got ${pairs.length})`);

  for (let i = 0; i < n; i += 2) {
    state = (0, _setIn.setInT)(state, pairs[i], pairs[i + 1]);
  }

  return state;
};

exports.setInMany = setInMany;
},{"@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./set-in":"../node_modules/@thi.ng/paths/set-in.js"}],"../node_modules/@thi.ng/paths/updater.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updaterT = updaterT;
exports.updater = void 0;

var _getter = require("./getter");

var _setter = require("./setter");

/**
 * Similar to {@link setter}, returns a function to update values at
 * given `path` using provided update `fn`.
 *
 * @remarks
 * The returned function accepts a single object / array and applies
 * `fn` to current path value (incl. any additional/optional arguments
 * passed) and uses result as new value. Does not modify original state
 * (unless given function does so itself).
 *
 * ```
 * add = updater("a.b", (x, n) => x + n);
 *
 * add({a: {b: 10}}, 13);
 * // { a: { b: 23 } }
 * ```
 *
 * @param path
 * @param fn
 */
const updater = (path, fn) => updaterT(path, fn);

exports.updater = updater;

function updaterT(path, fn) {
  const g = (0, _getter.getterT)(path);
  const s = (0, _setter.setterT)(path);
  return (state, ...args) => s(state, fn.apply(null, (args.unshift(g(state)), args)));
}
},{"./getter":"../node_modules/@thi.ng/paths/getter.js","./setter":"../node_modules/@thi.ng/paths/setter.js"}],"../node_modules/@thi.ng/paths/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deleteIn = require("./delete-in");

Object.keys(_deleteIn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deleteIn[key];
    }
  });
});

var _getter = require("./getter");

Object.keys(_getter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getter[key];
    }
  });
});

var _getIn = require("./get-in");

Object.keys(_getIn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getIn[key];
    }
  });
});

var _mutIn = require("./mut-in");

Object.keys(_mutIn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mutIn[key];
    }
  });
});

var _mutInMany = require("./mut-in-many");

Object.keys(_mutInMany).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mutInMany[key];
    }
  });
});

var _mutator = require("./mutator");

Object.keys(_mutator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mutator[key];
    }
  });
});

var _path = require("./path");

Object.keys(_path).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _path[key];
    }
  });
});

var _setter = require("./setter");

Object.keys(_setter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _setter[key];
    }
  });
});

var _setIn = require("./set-in");

Object.keys(_setIn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _setIn[key];
    }
  });
});

var _setInMany = require("./set-in-many");

Object.keys(_setInMany).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _setInMany[key];
    }
  });
});

var _updater = require("./updater");

Object.keys(_updater).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updater[key];
    }
  });
});

var _updateIn = require("./update-in");

Object.keys(_updateIn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updateIn[key];
    }
  });
});
},{"./delete-in":"../node_modules/@thi.ng/paths/delete-in.js","./getter":"../node_modules/@thi.ng/paths/getter.js","./get-in":"../node_modules/@thi.ng/paths/get-in.js","./mut-in":"../node_modules/@thi.ng/paths/mut-in.js","./mut-in-many":"../node_modules/@thi.ng/paths/mut-in-many.js","./mutator":"../node_modules/@thi.ng/paths/mutator.js","./path":"../node_modules/@thi.ng/paths/path.js","./setter":"../node_modules/@thi.ng/paths/setter.js","./set-in":"../node_modules/@thi.ng/paths/set-in.js","./set-in-many":"../node_modules/@thi.ng/paths/set-in-many.js","./updater":"../node_modules/@thi.ng/paths/updater.js","./update-in":"../node_modules/@thi.ng/paths/update-in.js"}],"../node_modules/@thi.ng/atom/idgen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextID = void 0;
let NEXT_ID = 0;

const nextID = () => NEXT_ID++;

exports.nextID = nextID;
},{}],"../node_modules/@thi.ng/atom/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _equiv2 = require("@thi.ng/equiv");

var _paths = require("@thi.ng/paths");

var _idgen = require("./idgen");

/**
 * This class implements readonly access to a deeply nested value with
 * in an Atom/Cursor. An optional transformer function can be supplied
 * at creation time to produce a derived/materialized view of the actual
 * value held in the atom. Views can be created directly or via the
 * `.addView()` method of the parent state. Views can be `deref()`'d
 * like atoms and polled for value changes using `changed()`. The
 * transformer is only applied once per value change and its result
 * cached until the next change.
 *
 * If the optional `lazy` is true (default), the transformer will only
 * be executed with the first `deref()` after each value change. If
 * `lazy` is false, the transformer function will be executed
 * immediately after a value change occurred and so can be used like a
 * watch which only triggers if there was an actual value change (in
 * contrast to normal watches, which execute with each update,
 * regardless of value change).
 *
 * Related, the actual value change predicate can be customized. If not
 * given, the default `@thi.ng/equiv` will be used.
 *
 * ```
 * a = new Atom({a: {b: 1}});
 * v = a.addView("a.b", (x) => x * 10);
 *
 * v.deref()
 * // 10
 *
 * // update atom state
 * a.swap((state) => setIn(state, "a.b", 2));
 * // {a: {b: 2}}
 *
 * v.changed()
 * // true
 * v.deref()
 * // 20
 *
 * v.release()
 * // remove view from parent state
 * ```
 */
class View {
  constructor(parent, path, tx, lazy = true, equiv = _equiv2.equiv) {
    this.parent = parent;
    this.id = `view-${(0, _idgen.nextID)()}`;

    this.tx = tx || (x => x);

    this.path = (0, _paths.toPath)(path);
    this.isDirty = true;
    this.isLazy = lazy;
    const lookup = (0, _paths.getter)(this.path);
    const state = this.parent.deref();
    this.unprocessed = state ? lookup(state) : undefined;

    if (!lazy) {
      this.state = this.tx(this.unprocessed);
      this.unprocessed = undefined;
    }

    parent.addWatch(this.id, (_, prev, curr) => {
      const pval = prev ? lookup(prev) : prev;
      const val = curr ? lookup(curr) : curr;

      if (!equiv(val, pval)) {
        if (lazy) {
          this.unprocessed = val;
        } else {
          this.state = this.tx(val);
        }

        this.isDirty = true;
      }
    });
  }

  get value() {
    return this.deref();
  }
  /**
   * Returns view's value. If the view has a transformer, the
   * transformed value is returned. The transformer is only run once
   * per value change. See class comments about difference between
   * lazy/eager behaviors.
   */


  deref() {
    if (this.isDirty) {
      if (this.isLazy) {
        this.state = this.tx(this.unprocessed);
        this.unprocessed = undefined;
      }

      this.isDirty = false;
    }

    return this.state;
  }
  /**
   * Returns true, if the view's value has changed since last
   * `deref()`.
   */


  changed() {
    return this.isDirty;
  }
  /**
   * Like `deref()`, but doesn't update view's cached state and dirty
   * flag if value has changed. If there's an unprocessed value
   * change, returns result of this sub's transformer or else the
   * cached value.
   *
   * **Important:** Use this function only if the view has none or or
   * a stateless transformer. Else might cause undefined/inconsistent
   * behavior when calling `view()` or `deref()` subsequently.
   */


  view() {
    return this.isDirty && this.isLazy ? this.tx(this.unprocessed) : this.state;
  }
  /**
   * Disconnects this view from parent state, marks itself
   * dirty/changed and sets its unprocessed raw value to `undefined`.
   */


  release() {
    this.unprocessed = undefined;

    if (!this.isLazy) {
      this.state = this.tx(undefined);
    }

    this.isDirty = true;
    return this.parent.removeWatch(this.id);
  }

}

exports.View = View;
},{"@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js","@thi.ng/paths":"../node_modules/@thi.ng/paths/index.js","./idgen":"../node_modules/@thi.ng/atom/idgen.js"}],"../node_modules/@thi.ng/atom/atom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Atom = void 0;

var _api = require("@thi.ng/api");

var _errors = require("@thi.ng/errors");

var _paths = require("@thi.ng/paths");

var _view = require("./view");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Mutable wrapper for an (usually) immutable value. Support for
 * watches.
 */
let Atom = class Atom {
  constructor(val, valid) {
    if (valid && !valid(val)) {
      (0, _errors.illegalState)("initial state value did not validate");
    }

    this._value = val;
    this.valid = valid;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this.reset(val);
  }

  deref() {
    return this._value;
  }

  equiv(o) {
    return this === o;
  }

  reset(val) {
    const old = this._value;

    if (this.valid && !this.valid(val)) {
      return old;
    }

    this._value = val;
    this.notifyWatches(old, val);
    return val;
  }

  resetIn(path, val) {
    return this.reset((0, _paths.setIn)(this._value, path, val));
  }

  swap(fn, ...args) {
    return this.reset(fn.apply(null, [this._value, ...args]));
  }

  swapIn(path, fn, ...args) {
    return this.reset((0, _paths.updateIn)(this._value, path, fn, ...args));
  } // mixin stub

  /* istanbul ignore next */


  addWatch(_, __) {
    return false;
  } // mixin stub

  /* istanbul ignore next */


  removeWatch(_) {
    return false;
  } // mixin stub

  /* istanbul ignore next */


  notifyWatches(_, __) {}

  addView(path, tx, lazy = true) {
    return new _view.View(this, path, tx, lazy);
  }

  release() {
    delete this._watches;
    delete this._value;
    return true;
  }

};
exports.Atom = Atom;
exports.Atom = Atom = __decorate([_api.IWatchMixin], Atom);
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","@thi.ng/paths":"../node_modules/@thi.ng/paths/index.js","./view":"../node_modules/@thi.ng/atom/view.js"}],"../node_modules/@thi.ng/atom/cursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cursor = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _paths = require("@thi.ng/paths");

var _atom = require("./atom");

var _idgen = require("./idgen");

var _view = require("./view");

/**
 * A cursor provides read/write access to a path location within a
 * nested parent state (Atom or another Cursor). Cursors behave like
 * Atoms for all practical purposes, i.e. support `deref()`, `reset()`,
 * `swap()`, `addWatch()` etc. However, when updating a cursor's value,
 * the parent state will be updated at the cursor's path as well (incl.
 * triggering any watches and/or validators) attached to the parent.
 * Likewise, when the parent state is modified externally, the cursor's
 * value will automatically update as well. The update order of cursor's
 * sharing a common parent is undefined, but can be overridden by
 * extending this class with a custom `notifyWatches()` implementation.
 *
 * If creating multiple cursors w/ a shared parent and each cursor
 * configured with a custom ID (provided via config object to ctor),
 * it's the user's responsibility to ensure the given IDs are unique.
 * Cursors are implemented by attaching a watch to the parent and the ID
 * is used to identify each watch.
 *
 * When using the optional validator predicate (also specified via
 * config object to ctor), the cursor's validator MUST NOT conflict with
 * the one assigned to the parent or else both will go out-of-sync.
 * Therefore, when requiring validation and updating values via cursors
 * it's recommended to only specify validators for leaf-level cursors in
 * the hierarchy.
 */
class Cursor {
  constructor(...args) {
    let parent;
    let lookup;
    let update;
    let validate;
    let opts;
    let id;

    switch (args.length) {
      case 1:
        opts = args[0];
        id = opts.id;
        parent = opts.parent;
        validate = opts.validate;

        if (opts.path) {
          if ((0, _checks.isArray)(opts.path) && (0, _checks.isFunction)(opts.path[0])) {
            [lookup, update] = opts.path;
          } else {
            lookup = (0, _paths.getter)(opts.path);
            update = (0, _paths.setter)(opts.path);
          }
        } else {
          (0, _errors.illegalArgs)("missing path config");
        }

        break;

      case 2:
        parent = args[0];
        lookup = (0, _paths.getter)(args[1]);
        update = (0, _paths.setter)(args[1]);
        break;

      case 3:
        [parent, lookup, update] = args;
        break;

      default:
        (0, _errors.illegalArity)(args.length);
    }

    this.parent = parent;
    this.id = id || `cursor-${(0, _idgen.nextID)()}`;
    this.selfUpdate = false;

    if (!lookup || !update) {
      (0, _errors.illegalArgs)();
    }

    this.local = new _atom.Atom(lookup(parent.deref()), validate);
    this.local.addWatch(this.id, (_, prev, curr) => {
      if (prev !== curr) {
        this.selfUpdate = true;
        parent.swap(state => update(state, curr));
        this.selfUpdate = false;
      }
    });
    parent.addWatch(this.id, (_, prev, curr) => {
      if (!this.selfUpdate) {
        const cval = lookup(curr);

        if (cval !== lookup(prev)) {
          this.local.reset(cval);
        }
      }
    });
  }

  get value() {
    return this.deref();
  }

  set value(val) {
    this.reset(val);
  }

  deref() {
    return this.local.deref();
  }

  release() {
    this.local.release();
    this.parent.removeWatch(this.id);
    delete this.local;
    delete this.parent;
    return true;
  }

  reset(val) {
    return this.local.reset(val);
  }

  resetIn(path, val) {
    return this.local.resetIn(path, val);
  }

  swap(fn, ...args) {
    return this.local.swap(fn, ...args);
  }

  swapIn(path, fn, ...args) {
    return this.local.swapIn(path, fn, ...args);
  }

  addWatch(id, fn) {
    return this.local.addWatch(id, fn);
  }

  removeWatch(id) {
    return this.local.removeWatch(id);
  }
  /* istanbul ignore next */


  notifyWatches(oldState, newState) {
    return this.local.notifyWatches(oldState, newState);
  }

  addView(path, tx, lazy = true) {
    return new _view.View(this, path, tx, lazy);
  }

}

exports.Cursor = Cursor;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","@thi.ng/paths":"../node_modules/@thi.ng/paths/index.js","./atom":"../node_modules/@thi.ng/atom/atom.js","./idgen":"../node_modules/@thi.ng/atom/idgen.js","./view":"../node_modules/@thi.ng/atom/view.js"}],"../node_modules/@thi.ng/atom/history.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.History = void 0;

var _api = require("@thi.ng/api");

var _equiv = require("@thi.ng/equiv");

var _paths = require("@thi.ng/paths");

var _view = require("./view");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var History_1;

/**
 * Undo/redo history stack wrapper for atoms and cursors. Implements
 * `IAtom` interface and so can be used directly in place and delegates
 * to wrapped atom/cursor. Value changes are only recorded in history if
 * `changed` predicate returns truthy value, or else by calling
 * `record()` directly. This class too implements the @thi.ng/api
 * `INotify` interface to support event listeners for `undo()`, `redo()`
 * and `record()`.
 */
let History = History_1 = class History {
  /**
   * @param state parent state
   * @param maxLen max size of undo stack
   * @param changed predicate to determine changed values (default `!equiv(a,b)`)
   */
  constructor(state, maxLen = 100, changed) {
    this.state = state;
    this.maxLen = maxLen;

    this.changed = changed || ((a, b) => !(0, _equiv.equiv)(a, b));

    this.clear();
  }

  get value() {
    return this.deref();
  }

  set value(val) {
    this.reset(val);
  }

  canUndo() {
    return this.history.length > 0;
  }

  canRedo() {
    return this.future.length > 0;
  }
  /**
   * Clears history & future stacks
   */


  clear() {
    this.history = [];
    this.future = [];
  }
  /**
   * Attempts to re-apply most recent historical value to atom and
   * returns it if successful (i.e. there's a history). Before the
   * switch, first records the atom's current value into the future
   * stack (to enable `redo()` feature). Returns `undefined` if
   * there's no history.
   *
   * If undo was possible, the `History.EVENT_UNDO` event is emitted
   * after the restoration with both the `prev` and `curr` (restored)
   * states provided as event value (and object with these two keys).
   * This allows for additional state handling to be executed, e.g.
   * application of the "Command pattern". See `addListener()` for
   * registering event listeners.
   */


  undo() {
    if (this.history.length) {
      const prev = this.state.deref();
      this.future.push(prev);
      const curr = this.state.reset(this.history.pop());
      this.notify({
        id: History_1.EVENT_UNDO,
        value: {
          prev,
          curr
        }
      });
      return curr;
    }
  }
  /**
   * Attempts to re-apply most recent value from future stack to atom
   * and returns it if successful (i.e. there's a future). Before the
   * switch, first records the atom's current value into the history
   * stack (to enable `undo()` feature). Returns `undefined` if
   * there's no future (so sad!).
   *
   * If redo was possible, the `History.EVENT_REDO` event is emitted
   * after the restoration with both the `prev` and `curr` (restored)
   * states provided as event value (and object with these two keys).
   * This allows for additional state handling to be executed, e.g.
   * application of the "Command pattern". See `addListener()` for
   * registering event listeners.
   */


  redo() {
    if (this.future.length) {
      const prev = this.state.deref();
      this.history.push(prev);
      const curr = this.state.reset(this.future.pop());
      this.notify({
        id: History_1.EVENT_REDO,
        value: {
          prev,
          curr
        }
      });
      return curr;
    }
  }
  /**
   * `IAtom.reset()` implementation. Delegates to wrapped atom/cursor,
   * but too applies `changed` predicate to determine if there was a
   * change and if the previous value should be recorded.
   *
   * @param val
   */


  reset(val) {
    const prev = this.state.deref();
    this.state.reset(val);
    const changed = this.changed(prev, this.state.deref());

    if (changed) {
      this.record(prev);
    }

    return val;
  }

  resetIn(path, val) {
    const prev = this.state.deref();
    const prevV = (0, _paths.getIn)(prev, path);
    const curr = (0, _paths.setIn)(prev, path, val);
    this.state.reset(curr);
    this.changed(prevV, (0, _paths.getIn)(curr, path)) && this.record(prev);
    return curr;
  }
  /**
   * `IAtom.swap()` implementation. Delegates to wrapped atom/cursor,
   * but too applies `changed` predicate to determine if there was a
   * change and if the previous value should be recorded.
   *
   * @param val
   */


  swap(fn, ...args) {
    return this.reset(fn(this.state.deref(), ...args));
  }

  swapIn(path, fn, ...args) {
    const prev = this.state.deref();
    const prevV = (0, _paths.getIn)(prev, path);
    const curr = (0, _paths.updateIn)(this.state.deref(), path, fn, ...args);
    this.state.reset(curr);
    this.changed(prevV, (0, _paths.getIn)(curr, path)) && this.record(prev);
    return curr;
  }
  /**
   * Records given state in history. This method is only needed when
   * manually managing snapshots, i.e. when applying multiple swaps on
   * the wrapped atom directly, but not wanting to create an history
   * entry for each change. **DO NOT call this explicitly if using
   * `History.reset()` / `History.swap()` etc.**
   *
   * If no `state` is given, uses the wrapped atom's current state
   * value (user code SHOULD always call without arg).
   *
   * If recording succeeded, the `History.EVENT_RECORD` event is
   * emitted with the recorded state provided as event value.
   *
   * @param state
   */


  record(state) {
    const history = this.history;
    const n = history.length;
    let ok = true; // check for arg given and not if `state == null` we want to
    // allow null/undefined as possible values

    if (!arguments.length) {
      state = this.state.deref();
      ok = !n || this.changed(history[n - 1], state);
    }

    if (ok) {
      if (n >= this.maxLen) {
        history.shift();
      }

      history.push(state);
      this.notify({
        id: History_1.EVENT_RECORD,
        value: state
      });
      this.future.length = 0;
    }
  }
  /**
   * Returns wrapped atom's **current** value.
   */


  deref() {
    return this.state.deref();
  }
  /**
   * `IWatch.addWatch()` implementation. Delegates to wrapped
   * atom/cursor.
   *
   * @param id
   * @param fn
   */


  addWatch(id, fn) {
    return this.state.addWatch(id, fn);
  }
  /**
   * `IWatch.removeWatch()` implementation. Delegates to wrapped
   * atom/cursor.
   *
   * @param id
   */


  removeWatch(id) {
    return this.state.removeWatch(id);
  }
  /**
   * `IWatch.notifyWatches()` implementation. Delegates to wrapped
   * atom/cursor.
   *
   * @param oldState
   * @param newState
   */


  notifyWatches(oldState, newState) {
    return this.state.notifyWatches(oldState, newState);
  }

  addView(path, tx, lazy = true) {
    return new _view.View(this, path, tx, lazy);
  }

  release() {
    this.state.release();
    delete this.state;
    return true;
  }

  addListener(_, __, ___) {
    return false;
  }

  removeListener(_, __, ___) {
    return false;
  }

  notify(_) {}

};
exports.History = History;
History.EVENT_UNDO = "undo";
History.EVENT_REDO = "redo";
History.EVENT_RECORD = "record";
exports.History = History = History_1 = __decorate([_api.INotifyMixin], History);
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js","@thi.ng/paths":"../node_modules/@thi.ng/paths/index.js","./view":"../node_modules/@thi.ng/atom/view.js"}],"../node_modules/@thi.ng/atom/transacted.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transacted = void 0;

var _api = require("@thi.ng/api");

var _paths = require("@thi.ng/paths");

var _idgen = require("./idgen");

var _view = require("./view");

class Transacted {
  constructor(parent) {
    this.parent = parent;
    this.current = undefined;
    this.isActive = false;
    this.id = `tx${(0, _idgen.nextID)()}-`;
  }

  get value() {
    return this.deref();
  }

  set value(val) {
    this.reset(val);
  }

  get isTransaction() {
    return this.isActive;
  }

  deref() {
    return this.isActive ? this.current : this.parent.deref();
  }

  equiv(o) {
    return this === o;
  }

  reset(val) {
    this.ensureTx();
    this.current = val;
    return val;
  }

  resetIn(path, val) {
    this.ensureTx();
    return this.reset((0, _paths.setIn)(this.current, path, val));
  }

  swap(fn, ...args) {
    this.ensureTx();
    return this.reset(fn.apply(null, [this.current, ...args]));
  }

  swapIn(path, fn, ...args) {
    this.ensureTx();
    return this.reset((0, _paths.updateIn)(this.current, path, fn, ...args));
  }

  begin() {
    (0, _api.assert)(!this.isActive, "transaction already started");
    this.current = this.parent.deref();
    this.isActive = true;
  }

  commit() {
    this.ensureTx();
    const val = this.current;
    this.parent.reset(this.current);
    this.isActive = false;
    this.current = undefined;
    return val;
  }

  cancel() {
    this.ensureTx();
    this.isActive = false;
    this.current = undefined;
  }

  addWatch(id, watch) {
    return this.parent.addWatch(this.id + id, (_, prev, curr) => watch(id, prev, curr));
  }

  removeWatch(id) {
    return this.parent.removeWatch(this.id + id);
  }

  notifyWatches(old, curr) {
    this.parent.notifyWatches(old, curr);
  }

  addView(path, tx, lazy = true) {
    return new _view.View(this, path, tx, lazy);
  }

  release() {
    delete this.parent;
    delete this.current;
    delete this.isActive;
    delete this._watches;
    return true;
  }

  ensureTx() {
    (0, _api.assert)(this.isActive, "no active transaction");
  }

}

exports.Transacted = Transacted;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/paths":"../node_modules/@thi.ng/paths/index.js","./idgen":"../node_modules/@thi.ng/atom/idgen.js","./view":"../node_modules/@thi.ng/atom/view.js"}],"../node_modules/@thi.ng/atom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require("./atom");

Object.keys(_atom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _atom[key];
    }
  });
});

var _cursor = require("./cursor");

Object.keys(_cursor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cursor[key];
    }
  });
});

var _history = require("./history");

Object.keys(_history).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _history[key];
    }
  });
});

var _transacted = require("./transacted");

Object.keys(_transacted).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transacted[key];
    }
  });
});

var _view = require("./view");

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _view[key];
    }
  });
});
},{"./atom":"../node_modules/@thi.ng/atom/atom.js","./cursor":"../node_modules/@thi.ng/atom/cursor.js","./history":"../node_modules/@thi.ng/atom/history.js","./transacted":"../node_modules/@thi.ng/atom/transacted.js","./view":"../node_modules/@thi.ng/atom/view.js"}],"../node_modules/@thi.ng/rstream/from/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromView = void 0;

var _atom = require("@thi.ng/atom");

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Similar to {@link fromAtom}, but creates an eager derived view for a
 * nested value in atom / cursor and yields stream of its value changes.
 *
 * @remarks
 * Views are readonly and more lightweight versions of
 * {@link @thi.ng/atom#Cursor | cursors}. The view checks for value
 * changes with given `equiv` predicate ({@link @thi.ng/equiv#equiv} by
 * default). If the predicate returns a falsy result, the new value is
 * emitted on the stream. The first value emitted is always the
 * (possibly transformed) current value at the stream's start time (i.e.
 * when the first subscriber attaches).
 *
 * If the `tx` option is given, the raw value is first passed to this
 * transformer function and its result emitted on the stream instead.
 *
 * When the stream is cancelled the view is destroyed as well.
 *
 * @example
 * ```ts
 * db = new Atom({ a: 1, b: { c: 2 }});
 *
 * fromView(
 *   db,
 *   {
 *     path: "b.c",
 *     tx: (x) => x != null ? x : "n/a"
 * }).subscribe(trace("view:"))
 * // view: 2
 *
 * db.swapIn("b.c", (x: number) => x + 1);
 * // view: 3
 *
 * db.reset({ a: 10 });
 * // view: n/a
 * ```
 *
 * @param atom
 * @param opts
 */
const fromView = (atom, opts) => {
  opts = (0, _idgen.optsWithID)("view", opts);
  return new _stream.Stream(stream => {
    let isActive = true;
    const tx = opts.tx;
    const view = new _atom.View(atom, opts.path, tx ? x => isActive && (x = tx(x), stream.next(x), x) : x => isActive && (stream.next(x), x), false, opts.equiv);
    return () => {
      isActive = false;
      view.release();
    };
  });
};

exports.fromView = fromView;
},{"@thi.ng/atom":"../node_modules/@thi.ng/atom/index.js","../stream":"../node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/from/worker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromWorker = void 0;

var _api = require("../api");

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

var _worker2 = require("../utils/worker");

/**
 * Returns a {@link Stream} which adds `message` and `error` event
 * listeners to given `worker` and then emits received values.
 *
 * @remarks
 * If `terminate` is true (default), the worker will be terminated when
 * the stream is being closed (either directly or indirectly, i.e. if
 * the user called {@link ISubscriber.done} on the stream or the last
 * child subscription has unsubscribed, depending on
 * {@link CommonOpts | config options}).
 *
 * As with {@link postWorker}, the `worker` can be an existing `Worker`
 * instance, a JS source code `Blob` or an URL string. In the latter two
 * cases, a worker is created automatically.
 *
 * @example
 * ```ts
 *
 * ```
 *
 * @param worker
 * @param opts
 */
const fromWorker = (worker, opts) => {
  const _worker = (0, _worker2.makeWorker)(worker);

  opts = (0, _idgen.optsWithID)("worker", opts);
  return new _stream.Stream(stream => {
    const ml = e => {
      stream.next(e.data);
    };

    const el = e => {
      stream.error(e.data);
    };

    _worker.addEventListener("message", ml);

    _worker.addEventListener("error", el);

    return () => {
      _worker.removeEventListener("message", ml);

      _worker.removeEventListener("error", el);

      if (opts.terminate !== false) {
        _api.LOGGER.info("terminating worker", _worker);

        _worker.terminate();
      }
    };
  }, opts);
};

exports.fromWorker = fromWorker;
},{"../api":"../node_modules/@thi.ng/rstream/api.js","../stream":"../node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js","../utils/worker":"../node_modules/@thi.ng/rstream/utils/worker.js"}],"../node_modules/@thi.ng/rstream/subs/bisect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bisect = void 0;

var _pubsub = require("../pubsub");

/**
 * Returns a {@link PubSub} using given predicate `pred` as boolean
 * {@link PubSubOpts.topic | topic function} and `truthy` & `falsey` as
 * subscribers for their respective values.
 *
 * @remarks
 * If `a` or `b` need to be subscribed to directly, then `a` / `b` MUST
 * be first created as `Subscription` (if not already) and a reference
 * kept prior to calling `bisect()`.
 *
 * @example
 * ```ts
 * fromIterable([1, 2, 3, 4]).subscribe(
 *   bisect(
 *     (x) => !!(x & 1),
 *     trace("odd"),
 *     trace("even")
 *   )
 * );
 * // odd 1
 * // even 2
 * // odd 3
 * // even 4
 * // odd done
 * // even done
 * ```
 *
 * @example
 * ```ts
 * const odd = subscription();
 * const even = subscription();
 * odd.subscribe(trace("odd"));
 * odd.subscribe(trace("odd x10"), map((x) => x * 10));
 * even.subscribe(trace("even"));
 *
 * fromIterable([1, 2, 3, 4]).subscribe(
 *     bisect((x) => !!(x & 1), odd, even)
 * );
 * ```
 *
 * @param pred predicate function
 * @param truthy subscription for truthy branch
 * @param falsy subscription for falsy branch
 */
const bisect = (pred, truthy, falsy) => {
  const sub = new _pubsub.PubSub({
    topic: pred
  });
  truthy && sub.subscribeTopic(true, truthy);
  falsy && sub.subscribeTopic(false, falsy);
  return sub;
};

exports.bisect = bisect;
},{"../pubsub":"../node_modules/@thi.ng/rstream/pubsub.js"}],"../node_modules/@thi.ng/rstream/subs/post-worker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postWorker = void 0;

var _checks = require("@thi.ng/checks");

var _api = require("../api");

var _worker2 = require("../utils/worker");

/**
 * Creates a {@link ISubscriber | subscriber} which forwards received
 * values to given worker.
 *
 * @remarks
 * The `worker` can be an existing `Worker` instance, a JS source code
 * `Blob` or an URL string. In the latter two cases, a worker is created
 * automatically. If `transfer` is true, the received values will be
 * marked as *transferrable* and the host app loses all access
 * permissions to these marked values. See `Worker.postMessage()` for
 * details.
 *
 * If `terminate` is set to a positive number, then the worker will be
 * automatically terminated after the stated number of milliseconds
 * since the parent subscription is {@link ISubscriber.done}.
 *
 * @example
 * ```ts
 * // worker source code
 * src = `self.onmessage = (e) => console.log("worker", e.data);`;
 *
 * a = stream();
 * a.subscribe(
 *   postWorker(src, { type: "application/javascript" }))
 * );
 *
 * a.next(42)
 * // worker 42
 * ```
 *
 * @param worker
 * @param transfer
 * @param terminate worker termination delay (ms)
 */
const postWorker = (worker, transfer = false, terminate = 0) => {
  const _worker = (0, _worker2.makeWorker)(worker);

  return {
    next(x) {
      if (x instanceof Promise) {
        x.then(y => this.next(y));
        return;
      }

      let tx;

      if (transfer) {
        const ta = (0, _checks.isTypedArray)(x);

        if (ta || (0, _checks.isTransferable)(x)) {
          tx = [ta ? x.buffer : x];
        }
      }

      _worker.postMessage(x, tx || []);
    },

    done() {
      if (terminate > 0) {
        setTimeout(() => {
          _api.LOGGER.info("terminating worker...");

          _worker.terminate();
        }, terminate);
      }
    }

  };
};

exports.postWorker = postWorker;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","../api":"../node_modules/@thi.ng/rstream/api.js","../utils/worker":"../node_modules/@thi.ng/rstream/utils/worker.js"}],"../node_modules/@thi.ng/rstream/subs/resolve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resolver = exports.resolve = void 0;

var _api = require("../api");

var _subscription = require("../subscription");

var _idgen = require("../utils/idgen");

/**
 * Creates a {@link Subscription} which receives promises, buffers them
 * and then passes their resolved values downstream.
 *
 * @remarks
 * If the optional `fail` handler is provided, it'll be called with the
 * error of each failed promise. If none is provided, the sub's
 * {@link ISubscriber.error} handler is called, which then stops the sub
 * from receiving further values.
 *
 * @example
 * ```ts
 * fromIterable([1, 2, 3], 100)
 *   .transform(tx.delayed(1000))
 *   .subscribe(resolve())
 *   .subscribe(trace("result"))
 * // result 1
 * // result 2
 * // result 3
 * // result done
 * ```
 *
 * @param opts
 */
const resolve = opts => new Resolver(opts);

exports.resolve = resolve;

class Resolver extends _subscription.Subscription {
  constructor(opts = {}) {
    super(undefined, (0, _idgen.optsWithID)("resolve"));
    this.outstanding = 0;
    this.fail = opts.fail;
  }

  next(x) {
    this.outstanding++;
    x.then(y => {
      if (this.state < 2
      /* DONE */
      ) {
          this.dispatch(y);

          if (--this.outstanding === 0) {
            this.done();
          }
        } else {
        _api.LOGGER.warn(`resolved value in state ${this.state} (${x})`);
      }
    }, e => {
      if (this.fail) {
        this.fail(e);
      } else {
        this.error(e);
      }
    });
  }

  done() {
    if (this.parent.getState() === 2
    /* DONE */
    && this.outstanding === 0) {
      super.done();
    }
  }

}

exports.Resolver = Resolver;
},{"../api":"../node_modules/@thi.ng/rstream/api.js","../subscription":"../node_modules/@thi.ng/rstream/subscription.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/subs/sidechain-partition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidechainPartition = exports.sidechainPartition = void 0;

var _subscription = require("../subscription");

var _idgen = require("../utils/idgen");

/**
 * Returns a {@link Subscription} which buffers values from `src` until
 * side chain fires, then emits buffer (unless empty) and repeats
 * process until either input is done.
 *
 * @remarks
 * By default, the values read from the side chain are ignored (i.e.
 * only their timing is used), however the `pred`icate option can be
 * used to only trigger for specific values / conditions.
 *
 * @example
 * ```t
 * // merge various event streams
 * events = merge([
 *     fromEvent(document,"mousemove"),
 *     fromEvent(document,"mousedown"),
 *     fromEvent(document,"mouseup")
 * ]);
 *
 * // queue event processing to only execute during the
 * // requestAnimationFrame cycle (RAF)
 * events.subscribe(sidechainPartition(fromRAF())).subscribe(trace())
 * ```
 *
 * @param side
 * @param opts
 */
const sidechainPartition = (side, opts) => new SidechainPartition(side, opts);

exports.sidechainPartition = sidechainPartition;

class SidechainPartition extends _subscription.Subscription {
  constructor(side, opts) {
    opts = (0, _idgen.optsWithID)("sidepart", opts);
    super(undefined, opts);
    this.buf = [];

    const pred = opts.pred || (() => true);

    const $this = this;
    this.sideSub = side.subscribe({
      next(x) {
        if ($this.buf.length && pred(x)) {
          $this.dispatch($this.buf);
          $this.buf = [];
        }
      },

      done() {
        if ($this.buf.length) {
          $this.dispatch($this.buf);
        }

        $this.done();
        delete $this.buf;
      }

    });
  }

  unsubscribe(sub) {
    const res = super.unsubscribe(sub);

    if (!sub || !this.subs.length) {
      this.sideSub.unsubscribe();
    }

    return res;
  }

  next(x) {
    if (this.state < 2
    /* DONE */
    ) {
        this.buf.push(x);
      }
  }

  done() {
    this.sideSub.unsubscribe();
    super.done();
  }

}

exports.SidechainPartition = SidechainPartition;
},{"../subscription":"../node_modules/@thi.ng/rstream/subscription.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/subs/sidechain-toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidechainToggle = exports.sidechainToggle = void 0;

var _subscription = require("../subscription");

var _idgen = require("../utils/idgen");

/**
 * Returns {@link Subscription} which filters values from input based on
 * values received from side chain.
 *
 * @remarks
 * By default, the value read from the side chain is ignored (i.e. only
 * their timing is used), however the `pred`icate option can be used to
 * only trigger for specific values/conditions. Every time the predicate
 * fn returns true, the filter will be toggled on/off. Whilst switched
 * off, no input values will be forwarded.
 *
 * @example
 * ```ts
 * // use slower interval stream to toggle main stream on/off
 * fromInterval(500)
 *   .subscribe(sidechainToggle(fromInterval(1000)))
 *   .subscribe(trace());
 * // 0
 * // 3
 * // 4
 * // 7
 * // 8
 * ...
 * ```
 *
 * @param side
 * @param opts
 */
const sidechainToggle = (side, opts) => new SidechainToggle(side, opts);

exports.sidechainToggle = sidechainToggle;

class SidechainToggle extends _subscription.Subscription {
  constructor(side, opts) {
    opts = (0, _idgen.optsWithID)("sidetoggle", opts);
    super(undefined, opts);
    this.isActive = !!opts.initial;

    const pred = opts.pred || (() => true);

    const $this = this;
    this.sideSub = side.subscribe({
      next(x) {
        if (pred(x)) {
          $this.isActive = !$this.isActive;
        }
      },

      done() {
        $this.done();
      }

    });
  }

  unsubscribe(sub) {
    const res = super.unsubscribe(sub);

    if (!sub || !this.subs.length) {
      this.sideSub.unsubscribe();
    }

    return res;
  }

  next(x) {
    if (this.isActive) {
      super.next(x);
    }
  }

  done() {
    super.done();
    this.sideSub.unsubscribe();
  }

}

exports.SidechainToggle = SidechainToggle;
},{"../subscription":"../node_modules/@thi.ng/rstream/subscription.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/subs/timeout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeout = void 0;

var _subscription = require("../subscription");

var _idgen = require("../utils/idgen");

/**
 * Returns a {@link Subscription} that calls the
 * {@link ISubscriber.error} handlers of all child subscriptions with an
 * arbitrary error object after a given time.
 *
 * @remarks
 * If no `error` is given, uses a new `Error` instance by default. If
 * `resetTimeout` is false (default), the error is emitted regardless of
 * any received values in the meantime. However, if `true`, the timeout
 * resets with each received value and then only triggers once the time
 * interval since the last value has exceeded.
 *
 * @param timeoutMs timeout period in milliseconds
 * @param opts
 */
const timeout = (timeoutMs, opts) => new Timeout(timeoutMs, opts);

exports.timeout = timeout;

class Timeout extends _subscription.Subscription {
  constructor(timeoutMs, opts) {
    opts = (0, _idgen.optsWithID)("timeout", opts);
    super(undefined, opts);
    this.timeoutMs = timeoutMs;
    this.errorObj = opts.error;
    this.resetTimeout = opts.reset === true;
    this.reset();
  }

  next(x) {
    if (this.resetTimeout) {
      clearTimeout(this.timeoutId);
      this.reset();
    }

    super.next(x);
  }

  reset() {
    this.timeoutId = setTimeout(() => {
      if (this.state < 2
      /* DONE */
      ) {
          this.error(this.errorObj || new Error(`Timeout stream "${this.id}" after ${this.timeoutMs} ms`));
        }
    }, this.timeoutMs);
  }

  cleanup() {
    clearTimeout(this.timeoutId);
    super.cleanup();
  }

}
},{"../subscription":"../node_modules/@thi.ng/rstream/subscription.js","../utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js"}],"../node_modules/@thi.ng/rstream/subs/trace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trace = void 0;

/**
 * Helper {@link ISubscriber} for inspection / debugging purposes.
 * Simply logs received values to console, optionally with given
 * `prefix`.
 *
 * @param prefix
 */
const trace = prefix => ({
  next(x) {
    prefix ? console.log(prefix, x) : console.log(x);
  },

  done() {
    prefix ? console.log(prefix, "done") : console.log("done");
  },

  error(e) {
    prefix ? console.log(prefix, "error", e) : console.log("error", e);
  }

});

exports.trace = trace;
},{}],"../node_modules/@thi.ng/rstream/subs/transduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transduce = void 0;

var _transducers = require("@thi.ng/transducers");

/**
 * Returns a promise which subscribes to given input and transforms
 * incoming values using given transducer `xform` and reducer `rfn`.
 *
 * @remarks
 * Once the input or the reducer is done, the promise will resolve with
 * the final reduced result (or fail with error).
 *
 * @example
 * ```ts
 * transduce(
 *   fromIterable(tx.range(10)),
 *   tx.map((x) => x * 10),
 *   tx.add()
 * ).then((x) => console.log("result", x))
 *
 * // result 450
 * ```
 *
 * @param src
 * @param xform
 * @param rfn
 * @param init
 */
const transduce = (src, xform, rfn, init) => {
  let acc = init !== undefined ? init : rfn[0]();
  let sub;
  return new Promise((resolve, reject) => {
    sub = src.subscribe({
      next(x) {
        const _acc = rfn[2](acc, x);

        if ((0, _transducers.isReduced)(_acc)) {
          resolve(_acc.deref());
        } else {
          acc = _acc;
        }
      },

      done() {
        resolve(acc);
      },

      error(e) {
        reject(e);
      }

    }, xform);
  }).then(fulfilled => {
    sub.unsubscribe();
    return fulfilled;
  }, rejected => {
    sub.unsubscribe();
    throw rejected;
  });
};

exports.transduce = transduce;
},{"@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js"}],"../node_modules/@thi.ng/rstream/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _forkjoin = require("./forkjoin");

Object.keys(_forkjoin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _forkjoin[key];
    }
  });
});

var _metastream = require("./metastream");

Object.keys(_metastream).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _metastream[key];
    }
  });
});

var _pubsub = require("./pubsub");

Object.keys(_pubsub).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pubsub[key];
    }
  });
});

var _stream = require("./stream");

Object.keys(_stream).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _stream[key];
    }
  });
});

var _streamMerge = require("./stream-merge");

Object.keys(_streamMerge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _streamMerge[key];
    }
  });
});

var _streamSync = require("./stream-sync");

Object.keys(_streamSync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _streamSync[key];
    }
  });
});

var _subscription = require("./subscription");

Object.keys(_subscription).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _subscription[key];
    }
  });
});

var _trigger = require("./trigger");

Object.keys(_trigger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _trigger[key];
    }
  });
});

var _tween = require("./tween");

Object.keys(_tween).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tween[key];
    }
  });
});

var _atom = require("./from/atom");

Object.keys(_atom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _atom[key];
    }
  });
});

var _event = require("./from/event");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _event[key];
    }
  });
});

var _interval = require("./from/interval");

Object.keys(_interval).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interval[key];
    }
  });
});

var _iterable = require("./from/iterable");

Object.keys(_iterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterable[key];
    }
  });
});

var _promise = require("./from/promise");

Object.keys(_promise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _promise[key];
    }
  });
});

var _promises = require("./from/promises");

Object.keys(_promises).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _promises[key];
    }
  });
});

var _raf = require("./from/raf");

Object.keys(_raf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _raf[key];
    }
  });
});

var _view = require("./from/view");

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _view[key];
    }
  });
});

var _worker = require("./from/worker");

Object.keys(_worker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _worker[key];
    }
  });
});

var _bisect = require("./subs/bisect");

Object.keys(_bisect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bisect[key];
    }
  });
});

var _postWorker = require("./subs/post-worker");

Object.keys(_postWorker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _postWorker[key];
    }
  });
});

var _resolve = require("./subs/resolve");

Object.keys(_resolve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resolve[key];
    }
  });
});

var _sidechainPartition = require("./subs/sidechain-partition");

Object.keys(_sidechainPartition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sidechainPartition[key];
    }
  });
});

var _sidechainToggle = require("./subs/sidechain-toggle");

Object.keys(_sidechainToggle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sidechainToggle[key];
    }
  });
});

var _timeout = require("./subs/timeout");

Object.keys(_timeout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _timeout[key];
    }
  });
});

var _trace = require("./subs/trace");

Object.keys(_trace).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _trace[key];
    }
  });
});

var _transduce = require("./subs/transduce");

Object.keys(_transduce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transduce[key];
    }
  });
});

var _tunnel = require("./subs/tunnel");

Object.keys(_tunnel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tunnel[key];
    }
  });
});

var _idgen = require("./utils/idgen");

Object.keys(_idgen).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _idgen[key];
    }
  });
});

var _worker2 = require("./utils/worker");

Object.keys(_worker2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _worker2[key];
    }
  });
});
},{"./api":"../node_modules/@thi.ng/rstream/api.js","./forkjoin":"../node_modules/@thi.ng/rstream/forkjoin.js","./metastream":"../node_modules/@thi.ng/rstream/metastream.js","./pubsub":"../node_modules/@thi.ng/rstream/pubsub.js","./stream":"../node_modules/@thi.ng/rstream/stream.js","./stream-merge":"../node_modules/@thi.ng/rstream/stream-merge.js","./stream-sync":"../node_modules/@thi.ng/rstream/stream-sync.js","./subscription":"../node_modules/@thi.ng/rstream/subscription.js","./trigger":"../node_modules/@thi.ng/rstream/trigger.js","./tween":"../node_modules/@thi.ng/rstream/tween.js","./from/atom":"../node_modules/@thi.ng/rstream/from/atom.js","./from/event":"../node_modules/@thi.ng/rstream/from/event.js","./from/interval":"../node_modules/@thi.ng/rstream/from/interval.js","./from/iterable":"../node_modules/@thi.ng/rstream/from/iterable.js","./from/promise":"../node_modules/@thi.ng/rstream/from/promise.js","./from/promises":"../node_modules/@thi.ng/rstream/from/promises.js","./from/raf":"../node_modules/@thi.ng/rstream/from/raf.js","./from/view":"../node_modules/@thi.ng/rstream/from/view.js","./from/worker":"../node_modules/@thi.ng/rstream/from/worker.js","./subs/bisect":"../node_modules/@thi.ng/rstream/subs/bisect.js","./subs/post-worker":"../node_modules/@thi.ng/rstream/subs/post-worker.js","./subs/resolve":"../node_modules/@thi.ng/rstream/subs/resolve.js","./subs/sidechain-partition":"../node_modules/@thi.ng/rstream/subs/sidechain-partition.js","./subs/sidechain-toggle":"../node_modules/@thi.ng/rstream/subs/sidechain-toggle.js","./subs/timeout":"../node_modules/@thi.ng/rstream/subs/timeout.js","./subs/trace":"../node_modules/@thi.ng/rstream/subs/trace.js","./subs/transduce":"../node_modules/@thi.ng/rstream/subs/transduce.js","./subs/tunnel":"../node_modules/@thi.ng/rstream/subs/tunnel.js","./utils/idgen":"../node_modules/@thi.ng/rstream/utils/idgen.js","./utils/worker":"../node_modules/@thi.ng/rstream/utils/worker.js"}],"../node_modules/core-js-pure/stable/promise/index.js":[function(require,module,exports) {
var parent = require('../../es/promise');

module.exports = parent;

},{"../../es/promise":"../node_modules/core-js-pure/es/promise/index.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/promise.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/promise");
},{"core-js-pure/stable/promise":"../node_modules/core-js-pure/stable/promise/index.js"}],"../node_modules/core-js-pure/internals/array-reduce.js":[function(require,module,exports) {
var aFunction = require('../internals/a-function');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');
var toLength = require('../internals/to-length');

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

},{"../internals/a-function":"../node_modules/core-js-pure/internals/a-function.js","../internals/to-object":"../node_modules/core-js-pure/internals/to-object.js","../internals/indexed-object":"../node_modules/core-js-pure/internals/indexed-object.js","../internals/to-length":"../node_modules/core-js-pure/internals/to-length.js"}],"../node_modules/core-js-pure/modules/es.array.reduce.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $reduce = require('../internals/array-reduce').left;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/array-reduce":"../node_modules/core-js-pure/internals/array-reduce.js","../internals/array-method-is-strict":"../node_modules/core-js-pure/internals/array-method-is-strict.js","../internals/array-method-uses-to-length":"../node_modules/core-js-pure/internals/array-method-uses-to-length.js"}],"../node_modules/core-js-pure/es/array/virtual/reduce.js":[function(require,module,exports) {
require('../../../modules/es.array.reduce');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').reduce;

},{"../../../modules/es.array.reduce":"../node_modules/core-js-pure/modules/es.array.reduce.js","../../../internals/entry-virtual":"../node_modules/core-js-pure/internals/entry-virtual.js"}],"../node_modules/core-js-pure/es/instance/reduce.js":[function(require,module,exports) {
var reduce = require('../array/virtual/reduce');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.reduce;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.reduce) ? reduce : own;
};

},{"../array/virtual/reduce":"../node_modules/core-js-pure/es/array/virtual/reduce.js"}],"../node_modules/core-js-pure/stable/instance/reduce.js":[function(require,module,exports) {
var parent = require('../../es/instance/reduce');

module.exports = parent;

},{"../../es/instance/reduce":"../node_modules/core-js-pure/es/instance/reduce.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/reduce.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/instance/reduce");
},{"core-js-pure/stable/instance/reduce":"../node_modules/core-js-pure/stable/instance/reduce.js"}],"../node_modules/core-js-pure/modules/es.json.stringify.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var fails = require('../internals/fails');

var $stringify = getBuiltIn('JSON', 'stringify');
var re = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = string.charAt(offset - 1);
  var next = string.charAt(offset + 1);
  if ((low.test(match) && !hi.test(next)) || (hi.test(match) && !low.test(prev))) {
    return '\\u' + match.charCodeAt(0).toString(16);
  } return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // https://github.com/tc39/proposal-well-formed-stringify
  $({ target: 'JSON', stat: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var result = $stringify.apply(null, arguments);
      return typeof result == 'string' ? result.replace(re, fix) : result;
    }
  });
}

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/get-built-in":"../node_modules/core-js-pure/internals/get-built-in.js","../internals/fails":"../node_modules/core-js-pure/internals/fails.js"}],"../node_modules/core-js-pure/es/json/stringify.js":[function(require,module,exports) {
require('../../modules/es.json.stringify');
var core = require('../../internals/path');

if (!core.JSON) core.JSON = { stringify: JSON.stringify };

// eslint-disable-next-line no-unused-vars
module.exports = function stringify(it, replacer, space) {
  return core.JSON.stringify.apply(null, arguments);
};

},{"../../modules/es.json.stringify":"../node_modules/core-js-pure/modules/es.json.stringify.js","../../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/core-js-pure/stable/json/stringify.js":[function(require,module,exports) {
var parent = require('../../es/json/stringify');

module.exports = parent;

},{"../../es/json/stringify":"../node_modules/core-js-pure/es/json/stringify.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/json/stringify.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/json/stringify");
},{"core-js-pure/stable/json/stringify":"../node_modules/core-js-pure/stable/json/stringify.js"}],"../node_modules/core-js-pure/modules/web.timers.js":[function(require,module,exports) {

var $ = require('../internals/export');
var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});

},{"../internals/export":"../node_modules/core-js-pure/internals/export.js","../internals/global":"../node_modules/core-js-pure/internals/global.js","../internals/engine-user-agent":"../node_modules/core-js-pure/internals/engine-user-agent.js"}],"../node_modules/core-js-pure/stable/set-timeout.js":[function(require,module,exports) {
require('../modules/web.timers');
var path = require('../internals/path');

module.exports = path.setTimeout;

},{"../modules/web.timers":"../node_modules/core-js-pure/modules/web.timers.js","../internals/path":"../node_modules/core-js-pure/internals/path.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/set-timeout.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/set-timeout");
},{"core-js-pure/stable/set-timeout":"../node_modules/core-js-pure/stable/set-timeout.js"}],"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/node_modules/querystring-es3/decode.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict'; // If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1000;

  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};
},{}],"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/node_modules/querystring-es3/encode.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';

  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];

  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }

  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }

  return res;
};
},{}],"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/node_modules/querystring-es3/index.js":[function(require,module,exports) {
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');
},{"./decode":"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/node_modules/querystring-es3/decode.js","./encode":"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/node_modules/querystring-es3/encode.js"}],"../src/utils/parse_URL.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse_URL = void 0;

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fix_jsdoc;
/**
 * # HREF/URL Parser
 *
 * Takes an href (full or relative) and pulls out the various
 * components to be used for instrumentation of various
 * high-level event handling.
 *
 * ## Examples:
 *
 * Ex1:
 * ```js
 * parse_href("http://localhost:1234/about?get=some#today")
 * ```
 * ```js
 * {
 *   URL: "http://localhost:1234/about?get=some#today",
 *   URL_subdomain: [],
 *   URL_domain: ["localhost:1234"],
 *   URL_path: ["about"],
 *   URL_query: { get: "some" },
 *   URL_hash: "today"
 * }
 * ```
 *
 * Ex2:
 * ```js
 * parse_href("https://github.com/thi-ng/umbrella/#blog-posts")
 * ```
 * ```js
 * {
 *   URL: 'https://github.com/thi-ng/umbrella/#blog-posts',
 *   URL_subdomain: [],
 *   URL_domain: ["github", "com"],
 *   URL_path: ["thi-ng", "umbrella"],
 *   URL_query: {},
 *   URL_hash: "blog-posts"
 * }
 * ```
 *
 * Ex3:
 * ```js
 * parse_href("https://very-long-sub.dom.cloud.eu/site/my/happy/")
 * ```
 * ```js
 * {
 *   URL: 'https://very-long-sub.dom.cloud.eu/site/my/happy/',
 *   URL_subdomain: ["very-long-sub", "dom"],
 *   URL_domain: ["cloud", "eu"],
 *   URL_path: ["site", "my", "happy"],
 *   URL_query: {},
 *   URL_hash: ""
 * }
 * ```
 *
 * Ex4:
 * ```js
 * parse_href("https://api.census.gov/data?get=NAME&in=state:01&in=county:*")
 * ```
 * ```js
 * {
 *   URL: "https://api.census.gov/data?get=NAME&in=state:01&in=county:*",
 *   URL_subdomain: ["api"],
 *   URL_domain: ["census", "gov"],
 *   URL_path: ["data"],
 *   URL_query: { get: "NAME", in: ["state:01", "county:*"] },
 *   URL_hash: ""
 * }
 * ```
 *
 * Ex5:
 * ```js
 * parse_href("/data?get=NAME&in=state#indeed")
 * ```
 * ```js
 * {
 *   URL: "/data?get=NAME&in=state#indeed",
 *   URL_subdomain: [],
 *   URL_domain: [],
 *   URL_path: ["data"],
 *   URL_query: { get: "NAME", in: "state" },
 *   URL_hash: "indeed"
 * }
 * ```
 *
 * @param {string} URL - full or partial URL/href
 *
 * */

var parse_URL = function parse_URL(URL) {
  var _context;

  var URL_subdomain = [];
  var URL_domain = [];
  var URL_path = []; // split the path on any `?` and/or `#` chars (1-3 parts)

  var parts = URL.split(/(?=\?)|(?=#)/g); // take the first component of split: the core URL

  var path_str = parts[0]; // split the path_str further into individual members and
  // remove the empty string between any adjacent slashes `//`

  var full_path = (0, _filter.default)(_context = path_str.split("/")).call(_context, function (x) {
    return x !== "";
  });

  if (/http/i.test(URL)) {
    var _context2, _context3;

    // if the input URL is HTTP(S), partition into sub components
    // domain is the last two members of the 2nd component
    URL_domain = (0, _slice.default)(_context2 = full_path[1].split(".")).call(_context2, -2); // subdomain is anything before the domain
    // see https://stackoverflow.com/a/56921347
    // for mocking subdomain on localhost

    URL_subdomain = (0, _slice.default)(_context3 = full_path[1].split(".")).call(_context3, 0, -2); // path is the last component in the

    URL_path = (0, _slice.default)(full_path).call(full_path, 2);
  } else {
    // in the case of a relative URL `<a href="/about">
    // the relative path is the full path
    URL_path = full_path;
  } // pull out the query component as a string


  var query_str = (0, _filter.default)(parts).call(parts, function (part) {
    return (0, _slice.default)(part).call(part, 0, 1) === "?";
  })[0] || ""; // pull out the hash component as a string

  var hash_str = (0, _filter.default)(parts).call(parts, function (part) {
    return (0, _slice.default)(part).call(part, 0, 1) === "#";
  })[0] || ""; // parse the query string into conventional parts using qs

  var URL_query = _querystring.default.parse((0, _slice.default)(query_str).call(query_str, 1)); // remove the actual `#` hash character from the string


  var URL_hash = (0, _slice.default)(hash_str).call(hash_str, 1);
  return {
    URL: URL,
    URL_subdomain: URL_subdomain,
    URL_domain: URL_domain,
    URL_path: URL_path,
    URL_query: URL_query,
    URL_hash: URL_hash
  };
};

exports.parse_URL = parse_URL;
},{"@babel/runtime-corejs3/core-js-stable/instance/slice":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/slice.js","@babel/runtime-corejs3/core-js-stable/instance/filter":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js","querystring":"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/node_modules/querystring-es3/index.js"}],"../src/utils/stringify_type.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify_type = void 0;

var _checks = require("@thi.ng/checks");

var fix_jsdoc; // prettier-ignore

/**
 * ### `stringify_type`
 *
 * just a little convenience function
 * takes some value and returns a string representation of its type
 * this makes it easier to create a switch statement using types
 *
 * powered by [@thi.ng/checks](http://thi.ng/checks)
 *
 */

var stringify_type = function stringify_type(x) {
  if ((0, _checks.isArray)(x)) return "ARRAY";
  if ((0, _checks.isFunction)(x) && x.length === 0) return "THUNK";
  if ((0, _checks.isFunction)(x) && x.length > 0) return "FUNCTION";
  if ((0, _checks.isPromise)(x)) return "PROMISE";
  if ((0, _checks.isString)(x)) return "STRING";
  if ((0, _checks.isBoolean)(x)) return "BOOLEAN";
  if ((0, _checks.isNull)(x)) return "NULL";
  if ((0, _checks.isObject)(x)) return "OBJECT";
  return "type_str NOT FOUND";
};

exports.stringify_type = stringify_type;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js"}],"../src/utils/traceStream.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traceStream = void 0;

var _rstream = require("@thi.ng/rstream");

var _transducers = require("@thi.ng/transducers");

var fix_jsdoc;
/**
 * ## `trace_stream`
 *
 * simple ad-hoc tracer to log one of the streams emmissions
 * @param {string} log_prefix A string that is prepended to
 *                  console.log's of emissions from the
 *                  stream
 * @param {stream}
 * */

var traceStream = function traceStream(log_prefix, stream) {
  return stream.subscribeTopic ? stream.subscribeTopic("_TRACE_STREAM", {
    next: function next(x) {
      return console.log(log_prefix, x);
    },
    error: console.warn
  }) : stream.subscribe((0, _rstream.trace)(log_prefix));
};

exports.traceStream = traceStream;
},{"@thi.ng/rstream":"../node_modules/@thi.ng/rstream/index.js","@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js"}],"../node_modules/core-js-pure/es/array/virtual/keys.js":[function(require,module,exports) {
require('../../../modules/es.array.iterator');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').keys;

},{"../../../modules/es.array.iterator":"../node_modules/core-js-pure/modules/es.array.iterator.js","../../../internals/entry-virtual":"../node_modules/core-js-pure/internals/entry-virtual.js"}],"../node_modules/core-js-pure/stable/array/virtual/keys.js":[function(require,module,exports) {
var parent = require('../../../es/array/virtual/keys');

module.exports = parent;

},{"../../../es/array/virtual/keys":"../node_modules/core-js-pure/es/array/virtual/keys.js"}],"../node_modules/core-js-pure/stable/instance/keys.js":[function(require,module,exports) {
require('../../modules/web.dom-collections.iterator');
var keys = require('../array/virtual/keys');
var classof = require('../../internals/classof');
var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.keys;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.keys)
    // eslint-disable-next-line no-prototype-builtins
    || DOMIterables.hasOwnProperty(classof(it)) ? keys : own;
};

},{"../../modules/web.dom-collections.iterator":"../node_modules/core-js-pure/modules/web.dom-collections.iterator.js","../array/virtual/keys":"../node_modules/core-js-pure/stable/array/virtual/keys.js","../../internals/classof":"../node_modules/core-js-pure/internals/classof.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/keys.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/instance/keys");
},{"core-js-pure/stable/instance/keys":"../node_modules/core-js-pure/stable/instance/keys.js"}],"../node_modules/core-js-pure/stable/array/from.js":[function(require,module,exports) {
var parent = require('../../es/array/from');

module.exports = parent;

},{"../../es/array/from":"../node_modules/core-js-pure/es/array/from.js"}],"../node_modules/@babel/runtime-corejs3/core-js-stable/array/from.js":[function(require,module,exports) {
module.exports = require("core-js-pure/stable/array/from");
},{"core-js-pure/stable/array/from":"../node_modules/core-js-pure/stable/array/from.js"}],"../src/utils/unknownKey.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unknown_key_ERR = exports.key_index_err = exports.stringify_w_functions = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _keys2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/keys"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context10; (0, _forEach.default)(_context10 = ownKeys(Object(source), true)).call(_context10, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context11; (0, _forEach.default)(_context11 = ownKeys(Object(source))).call(_context11, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * Uses a JSON.stringify "replacer" function to preserve a
 * small (truncated) version of the function signature for
 * Object values that contain them
 */
var stringify_w_functions = function stringify_w_functions(x, indent) {
  return (0, _stringify.default)(x, function (key, value) {
    if (typeof value === "function") {
      var _context;

      return (0, _slice.default)(_context = value.toString().replace(/\r?\n|\r/g, "").replace(/\s\s+/g, " ")).call(_context, 0, 12) + "...";
    } else {
      return value;
    }
  }, indent);
};

exports.stringify_w_functions = stringify_w_functions;

var key_index_err = function key_index_err(c, i) {
  var _context2, _context3, _context4;

  var idx_dict0 = (0, _reduce.default)(_context2 = (0, _from.default)((0, _keys2.default)(_context3 = Array(19)).call(_context3))).call(_context2, function (a, idx) {
    return _objectSpread({}, a, (0, _defineProperty3.default)({}, idx, "".concat(idx + 1, "th")));
  }, {});

  var idx_dict = _objectSpread({}, idx_dict0, {
    0: "1st",
    1: "2nd",
    2: "3rd"
  });

  var idx_str = idx_dict[i];
  return (0, _concat.default)(_context4 = "\uD83D\uDD0D it was the ".concat(idx_str, " Command in a Task or ")).call(_context4, idx_dict[i - 1], " in a Subtask.");
}; // prettier-ignore

/**
 *
 * `uknown_key_ERR`
 *
 * Just a  little error for people defining commands
 * that makes sure their keys don't contain typos
 */


exports.key_index_err = key_index_err;

var unknown_key_ERR = function unknown_key_ERR(str, c, unknown, sub$, index) {
  var _context5, _context6, _context7, _context8, _context9;

  var source$ = c.source$;
  var count = (0, _entries.default)(c).length;
  return (0, _concat.default)(_context5 = (0, _concat.default)(_context6 = (0, _concat.default)(_context7 = (0, _concat.default)(_context8 = "\n\n  \uD83D\uDD25 ".concat(str, " ERROR:\n  \n  \uD83D\uDD25 Unrecognized Command Key(s)\n  \n  FAULTY sub$: \"")).call(_context8, sub$, "\" \n  ")).call(_context7, (0, _keys.default)(unknown)[0][0] ? (0, _concat.default)(_context9 = "\n  ".concat(index ? key_index_err(c, index) : "", "\n\n  The problematic entry/entries: \n\n  \uD83E\uDD14 ")).call(_context9, !index && count > 3 && !source$ ? "".concat((0, _entries.default)(unknown)[0][0], ": <Stream>") : stringify_w_functions(unknown, 2)) : "", " \uD83E\uDD14\n\n  ACCEPTABLE ENTRY KEYS ")).call(_context6, index ? "WITHIN A COMMAND" : "DURING REGISTRATION", ": \n\n  'sub$' \n    - optional \n    - topic key for for registering & targeting Commands \n    - signatures:\n      - \"X\"    : String: Topic key\n      - XX$    : Stream: for dispatching args to custom stream\n\n  'args' \n    - required \n    - payload or accumulator reshaping payload function (Promises OK)\n    - signatures:\n      - PRI    : primitive: static payload -> is NOT accumulated\n      - {?}    : object: static payload -> is accumulated \n      - (+) => : function (non-nullary): dispatch payload from \n                values accumulated from prior Command payloads\n      - (0) => : thunk (nullary): dispatch to custom stream\n      - {P}    : Promise or (#) => {P} Promise returning function\n      \n  'reso' \n    - required for Promise handling \n    - converts resolved Promise payloads to Command args\n    - signature:\n      - ({A: accumulator}, {P: resolved Promise}) =>  \n\n  'erro' \n    - recommended for Promise rejections \n    - handles rejected Promise payloads\n    - signature:\n      - ({A: accumulator}, {E: error object}) =>  \n  ")).call(_context5, index ? "" : "\n  'handler' \n    - required \n    - function that is called on payload's arrival\n    - signature: \n      - (#) => : function instruments actual side-effects/work \n  \n  'source$' \n    - advanced/optional \n    - source stream (see http://thi.ng/rstream)", "\n\n  Hope that helps!\n  ");
};

exports.unknown_key_ERR = unknown_key_ERR;
},{"@babel/runtime-corejs3/core-js-stable/object/define-property":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js","@babel/runtime-corejs3/core-js-stable/object/define-properties":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js","@babel/runtime-corejs3/core-js-stable/instance/for-each":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js","@babel/runtime-corejs3/core-js-stable/instance/filter":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js","@babel/runtime-corejs3/core-js-stable/object/keys":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js","@babel/runtime-corejs3/core-js-stable/object/entries":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/entries.js","@babel/runtime-corejs3/core-js-stable/instance/concat":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js","@babel/runtime-corejs3/helpers/defineProperty":"../node_modules/@babel/runtime-corejs3/helpers/defineProperty.js","@babel/runtime-corejs3/core-js-stable/instance/keys":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/keys.js","@babel/runtime-corejs3/core-js-stable/array/from":"../node_modules/@babel/runtime-corejs3/core-js-stable/array/from.js","@babel/runtime-corejs3/core-js-stable/instance/reduce":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/reduce.js","@babel/runtime-corejs3/core-js-stable/instance/slice":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/slice.js","@babel/runtime-corejs3/core-js-stable/json/stringify":"../node_modules/@babel/runtime-corejs3/core-js-stable/json/stringify.js"}],"../src/utils/effectsDOM.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRect = getRect;
exports.FLIP_last_invert_play = exports.FLIP_last = exports.FLIP_first = exports.getScrollPosition = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _paths4 = require("@thi.ng/paths");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getScrollPosition = function getScrollPosition() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop,
    left: window.pageXOffset || document.documentElement.scrollLeft
  };
};

exports.getScrollPosition = getScrollPosition;
var boundingClientProxy = {
  getBoundingClientRect: getScrollPosition
};
/** 📌
 *
 * TODO:
 * - before flipping to next page, scroll the current page
 *   to a predictable location for returning smoothly,
 *   perhaps use a hash in the router to kill two with one:
 *
 *  0. add func to ROUTER command handler to sniff for hash
 *  1. clicking on the link first adds a hash to the history
 *  2. scroll the top of the target to the top of the page
 *  3. animate to next page <-> any back button would be
 *     centered
 */

function getRect(element, frame) {
  var _element$getBoundingC = element.getBoundingClientRect(),
      top = _element$getBoundingC.top,
      bottom = _element$getBoundingC.bottom,
      left = _element$getBoundingC.left,
      right = _element$getBoundingC.right,
      width = _element$getBoundingC.width,
      height = _element$getBoundingC.height;

  var parent = frame ? frame.getBoundingClientRect() : null;
  return {
    top: top - (parent ? parent.top : 0),
    bottom: bottom,
    left: left - (parent ? parent.left : 0),
    right: right,
    width: width,
    height: height // get transform() {
    //   return getComputedStyle(element).transform || undefined
    // }

  };
}

var view = function view(state) {
  var rootID = state.value._root;

  var _root = document.getElementById(rootID);

  var _frame_HTML = "<div \n    id=\"_frame\"\n    style=\"width: 100vw;\n      height: 100vh;\n      position: fixed;\n      pointer-events: none\"\n  >\n  </div>";

  _root.insertAdjacentHTML("beforebegin", _frame_HTML);

  var _frame = document.getElementById("_frame"); // console.log("Frame prepended", _frame)


  return _frame;
};

var is_framed = false; // 📌 turn into a Command/Task (only track DOM nodes that
// are clicked)

/**
 *
 * deps:
 * - flip target (not necessarily the clicked `el` here)
 * - current location within the viewport (snapshot Command)
 * -
 */

/*
export const FLIP_all = (el, state, uid) => {
  console.log({ state })
  let frame = is_framed
    ? document.getElementById("_frame")
    : ((is_framed = true), view(state))

  let rect_path = ["_flip_map", uid]
  // console.log({ rect_path })

  if (!getIn(state.deref(), rect_path))
    return state.resetIn(rect_path, getRect(el, frame))
  let F_flip_map = getIn(state.deref(), rect_path)
  let L_flip_map = getRect(el, frame)

  // console.log("getter: my_height ->", L_flip_map.my_height)
  let Tx = F_flip_map.left - L_flip_map.left
  let Ty = F_flip_map.top - L_flip_map.top
  let Sx = F_flip_map.width / L_flip_map.width
  let Sy = F_flip_map.height / L_flip_map.height

  // console.log({ F_flip_map, L_flip_map })

  // el.style.transformOrigin = "top left"
  el.style.transition = ""
  let trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`
  // console.log(transform)
  el.style.transform = trans

  state.resetIn(rect_path, L_flip_map)

  requestAnimationFrame(() => {
    el.style.transition = "all .6s cubic-bezier(.65,.22,.38,.77)"
    el.style.transform = "none"
  })
}

*/

/**
 *
 * order:
 * normalizeTree -> render -> diff -> init -> release
 *                 | hdom |         | dom |
 *
 * have to think backwards:
 * 1. el mounted (init): look for existing flip map for id
 *  - if exists, Play anim and store new flip map rect (for navs)
 *  - if doesn't, nada
 * 2. el clicked (render.attrs.onclick): measure and store flip map for id
 * 3. el released: if clicked, calc flip rect and lookup for id:
 *  - if first === last, no change (on nav e.g.)
 *  - if first !== last, nav change (store rect for id)
 */

var paths = function paths(uid) {
  return {
    rects: ["_FLIP", "rects", uid],
    elems: ["_FLIP", "elems", uid],
    clicks: ["_FLIP", "clicks", uid]
  };
};

var FLIP_first = function FLIP_first(state, uid, ev) {
  console.log(/id\/(\d+)/g.exec(uid)[1], "WAS CLICKED");

  var _paths = paths(uid),
      rects = _paths.rects,
      clicks = _paths.clicks,
      elems = _paths.elems; // registers component as having been clicked (active)
  // sets the rect in state for next el init to sniff


  var flip_map = getRect(ev.target);
  state.resetIn(rects, flip_map);
  state.resetIn(elems, ev.target); // notify others

  state.resetIn(clicks, true);
  console.log({
    F: {
      flip_map: flip_map,
      BCR: boundingClientProxy.getBoundingClientRect()
    }
  });
};

exports.FLIP_first = FLIP_first;

var FLIP_last = function FLIP_last(state, uid) {
  var _paths2 = paths(uid),
      elems = _paths2.elems;

  var element = (0, _paths4.getIn)(state.deref(), elems) || null;
  console.log("releasing", /id\/(\d+)/g.exec(uid)[1]); // do stuff just before removal of the el...
  // element.style.transition = "opacity 0.4s"
};

exports.FLIP_last = FLIP_last;

var FLIP_last_invert_play = function FLIP_last_invert_play(el, state, uid) {
  var _context, _context2, _context3;

  var ID = /id\/(\d+)/g.exec(uid)[1]; // console.log("FLIP init")
  // a frame will be present if any FLIP item has been activated
  // provide frame if attr is present

  var _paths3 = paths(uid),
      rects = _paths3.rects,
      clicks = _paths3.clicks;
  /**
   * 1. if it has been clicked (frame available) that means
   *    the last thing that happened was a click that
   *    triggered this init so we do the calcs
   *
   * 2. if a back/nav (no frame) event was what triggered
   *    the init (after a click) do the calcs with no frame
   */
  // NO RECT => NOT CLICKED


  var F_flip_map = (0, _paths4.getIn)(state.deref(), rects) || null;
  if (!F_flip_map) return;
  var clicked = (0, _paths4.getIn)(state.deref(), clicks) || null; // NO first_frame => NAV CAUSED RENDER

  if (!clicked) {
    console.log(ID, "FLIP'ed on navigated");
  } else {
    console.log(ID, "FLIP'ed on click! 👆");
  }

  el.scrollIntoView();
  var L_flip_map = getRect(el); // made it through = navigated with clicked item in view

  var Tx = F_flip_map.left - L_flip_map.left;
  var Ty = F_flip_map.top - L_flip_map.top; // if there's no diff, just return (no change)
  // if (Tx + Ty < 0.01) return

  var Sx = F_flip_map.width / L_flip_map.width;
  var Sy = F_flip_map.height / L_flip_map.height;
  console.log({
    LIP: {
      F_flip_map: F_flip_map,
      L_flip_map: L_flip_map
    }
  });
  el.style.transformOrigin = "0 0";
  el.style.transition = "";
  var trans = (0, _concat.default)(_context = (0, _concat.default)(_context2 = (0, _concat.default)(_context3 = "translate(".concat(Tx, "px, ")).call(_context3, Ty, "px) scale(")).call(_context2, Sx, ", ")).call(_context, Sy, ")");
  el.style.transform = trans; // set new rect in state
  // play

  requestAnimationFrame(function () {
    el.style.transition = "all .4s cubic-bezier(.65,.22,.38,.77)";
    el.style.transform = "none";
  });
  state.resetIn(rects, L_flip_map); // remove click frame

  state.resetIn(clicks, null);
};
/**
 * What's happening:
 * - on first click (render)
 *  - rect registered
 *  - frame registered
 * - navs
 * - on init of new DOM
 *  - checks for rect & frame
 *  - uses rect & frame to calc diff
 *  - PLAY
 */


exports.FLIP_last_invert_play = FLIP_last_invert_play;
},{"@babel/runtime-corejs3/core-js-stable/instance/concat":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js","@thi.ng/paths":"../node_modules/@thi.ng/paths/index.js"}],"../src/utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  msTaskDelay: true
};
exports.msTaskDelay = void 0;

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _parse_URL = require("./parse_URL");

Object.keys(_parse_URL).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _parse_URL[key];
    }
  });
});

var _stringify_type = require("./stringify_type");

Object.keys(_stringify_type).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _stringify_type[key];
    }
  });
});

var _traceStream = require("./traceStream");

Object.keys(_traceStream).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _traceStream[key];
    }
  });
});

var _unknownKey = require("./unknownKey");

Object.keys(_unknownKey).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unknownKey[key];
    }
  });
});

var _effectsDOM = require("./effectsDOM");

Object.keys(_effectsDOM).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _effectsDOM[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msTaskDelay = function msTaskDelay(t) {
  return new _promise.default(function (resolve) {
    return (0, _setTimeout2.default)(resolve, t);
  });
};

exports.msTaskDelay = msTaskDelay;
},{"@babel/runtime-corejs3/core-js-stable/set-timeout":"../node_modules/@babel/runtime-corejs3/core-js-stable/set-timeout.js","@babel/runtime-corejs3/core-js-stable/promise":"../node_modules/@babel/runtime-corejs3/core-js-stable/promise.js","./parse_URL":"../src/utils/parse_URL.js","./stringify_type":"../src/utils/stringify_type.js","./traceStream":"../src/utils/traceStream.js","./unknownKey":"../src/utils/unknownKey.js","./effectsDOM":"../src/utils/effectsDOM.js"}],"../src/spool/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spool = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _checks = require("@thi.ng/checks");

var _utils = require("../utils");

var _streams = require("../streams");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context3; (0, _forEach.default)(_context3 = ownKeys(Object(source), true)).call(_context3, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context4; (0, _forEach.default)(_context4 = ownKeys(Object(source))).call(_context4, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var err_str = "Spool Interupted"; // <- add doc link to error strings

var no_sub$_err = function no_sub$_err(c, i) {
  var _context;

  return console.warn((0, _concat.default)(_context = "\n  \uD83D\uDD25 No sub$ included for a Command with a primitive for 'args'. \n  \uD83D\uDD25 Ergo, nothing was done with this Command: \n  \n  ".concat((0, _stringify.default)(c), "\n  \n  ")).call(_context, (0, _utils.key_index_err)(c, i), "\n  \n  Hope that helps!\n  "));
};
/**
 *
 * ## `spool`
 *
 * ### TL;DR:
 *
 * Handles Collections (array) of Commands ("Tasks") which
 * require _ordered_ choreography and/or have a dependency
 * on some (a)sync data produced by a user interaction.
 *
 * ### Synopsis:
 *
 * - Async `reduce` function, that passes an accumulator
 *   (`acc`) as a local state container between Command
 *   invocations.
 * - Commands are composed in-situ in userland (Ad hoc)
 * - spools a collection of Commands as a Task
 * - resolves any promises contained within a Command
 * - passes an accumulator (acc) to subsequent Commands in a
 *   Task
 *
 * ### Type checks on function signatures
 *
 * There are two valid forms for Task entries:
 * 1. a Unary function returning an array of Commands:
 *    referred to as "Subtasks"
 * 2. A Command object: dispatch to registered handlers
 *
 * ## Recognized Keys
 *
 * There are 4 recognized keys for a Command object:
 *
 * ### Primary keys
 *
 * ##### `sub$` key
 *
 * - Topic identifier: used for registering handlers hooked
 *    onto the Command stream.
 *
 * ##### `args` key
 *
 * - __primary control structure__ with three recognized
 *   forms that do different things in the context of a
 *   Task:
 * - non-function `args` (primitives, objects) send the args
 *   as-is to the Command handler
 * - nullary fns (`(0)=>` ) send the _args_ as a Command to
 *   a `sub$` _stream_ of your choosing (ADVANCED: see
 *   Ad-hoc Stream Injection below)
 * - unary fns (`(1)=>`) are passed the inter-Task
 *   accumulated value, called and the resulting value is
 *   passed to registered Command handler
 * - Promises (and those returned from `(1)=>`) are resolved
 *   and their values sent to the handler
 * - new vals (Objects) are merged with accumulated object
 *   from preceding Task results(dupe keys overwritten)
 *
 * ### Promise-specific keys -> binary (as in two parameter,
 *   not boolean) functions:
 *
 * ##### `reso` key
 *
 * - (resolving) function `(2)=>` = handle resolved
 *   promises: MUST be a binary fn `(acc, resolved Promise)
 *   =>`
 *
 * ##### `erro` key
 *
 * - `(2)=>` = handle rejected promises: MUST be
 *   a binary fn `(acc, Promise rejection) =>`
 *
 * ### Subtasks:
 *
 * Subtasks are the way you compose tasks. Insert a Task and
 * the spool will unpack it in place (super -> sub
 * order preserved) A Subtask must be defined as a unary
 * function that accepts an accumulator object and returns a
 * Task, e.g.:
 *
 * #### PSEUDO
 * ```js
 * // { C: Command }
 * // ( { A: Accumulator }: Object ) => [{C},{C}]: Subtask
 * let someSubtask = ({A}) => [{C}, {C}, ({A})=>[{C},{C}], ...]
 * ```
 *
 * #### Example
 * ```js
 * // subtask example:
 * let subtask1 = acc => [
 *  { sub$: "acc"
 *  , args: { data: acc.data } },
 *  { sub$: "route"
 *  , args: { route: { href: acc.href } } }
 * ]
 *
 * // task
 * let task = [
 *  { args: { href: "https://my.io/todos" } }, // acc init
 *  { sub$: "fetch"
 *  , args: ({ href }) => fetch(href).then(r => r.json())
 *  , erro: (acc, err) => ({ sub$: "cancel", args: err })
 *  , reso: (acc, res) => ({ data: res }) },
 *  acc => subtask1(acc), // subtask reference
 *  { sub$: "FLIP" , args: "done" }
 * ]
 *
 * ```
 *
 * #### Use:
 * ```js
 * import { run$ } from "hurl"
 *
 * export const run = e => run$.next(e);
 *
 * //... 📌 TODO...
 * ```
 *
 * ### Ad-hoc stream injection
 *
 * ADVANCED USE ONLY 👽
 *
 * HURL tries to hide the stream implentation from the user
 * as much as possible, but allows you to go further down
 * the rabbit hole if so desired. You may send Commands to a
 * separate stream of your own creation during a Task by
 * using a nullary ("thunk") `(0)=>` function signature as
 * the `args` value of a Command. If this is the case, the
 * spool assumes the `sub$` key references a stream and
 * sends the return value of the thunk to that stream
 *
 * > Note: if you need to pass the accumulator to your
 * thunk, put it in a subtask, where you can
 * access/destructure the data from the acc passed into the
 * subtask function
 *
 * ```js
 * import { stream, trace } from "@thi.ng/rstream"
 *
 * // ad-hoc stream
 * let login = stream().subscribe(trace("login ->"))
 *
 * // task
 * let task = [
 *  { args: { href: "https://my.io/auth" } }, // <- no sub$, just pass data
 *  { sub$: login , args: () => "logging in..." },
 *  { sub$: "AUTH"
 *  , args: ({ href }) => fetch(href).then(r => r.json())
 *  , erro: (acc, err) => ({ sub$: "cancel", args: err })
 *  , reso: (acc, res) => ({ token: res }) },
 *  acc => subtask_login(acc),
 *  { sub$: login , args: () => "log in success" }
 * ]
 *
 * // subtask
 * let subtask_login = ({ token }) => [
 *  { sub$: login // <- stream
 *  , args: () => ({ token }) } // <- use acc
 * ]
 * ```
 *
 **/


var spool = function spool(task_array) {
  return (0, _reduce.default)(task_array).call(task_array,
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(a, c, i) {
      var acc, recur, sub$, args, reso, erro, unknown, arg_type, result, temp, error, resolved;
      return _regenerator.default.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return a;

            case 2:
              acc = _context2.sent;

              if (!(0, _checks.isFunction)(c)) {
                _context2.next = 14;
                break;
              }

              _context2.prev = 4;
              recur = c(acc); // this ensures the accumulator is preserved between
              // stacks

              recur.unshift({
                args: acc
              });
              return _context2.abrupt("return", spool(recur));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](4);
              console.warn(err_str, _context2.t0);
              return _context2.abrupt("return");

            case 14:
              sub$ = c.sub$, args = c.args, reso = c.reso, erro = c.erro, unknown = (0, _objectWithoutProperties2.default)(c, ["sub$", "args", "reso", "erro"]);

              if (!((0, _keys.default)(unknown).length > 0)) {
                _context2.next = 17;
                break;
              }

              throw new Error((0, _utils.unknown_key_ERR)(err_str, c, unknown, sub$, i));

            case 17:
              arg_type = (0, _utils.stringify_type)(args);
              result = args;
              /* RESOLVING ARGS */

              if (arg_type !== "PROMISE" && reso) {
                // if some signature needs to deal with both promises
                // and non-promises, non-promises are wrapped in a
                // Promise to "lift" them into the proper context for
                // handling
                result = _promise.default.resolve(args);
              }

              if (!(args !== Object(args) && !sub$)) {
                _context2.next = 23;
                break;
              }

              no_sub$_err(c, i);
              return _context2.abrupt("return", acc);

            case 23:
              if (!(arg_type === "PROMISE")) {
                _context2.next = 27;
                break;
              }

              _context2.next = 26;
              return args.catch(function (e) {
                return e;
              });

            case 26:
              result = _context2.sent;

            case 27:
              if (!(arg_type === "THUNK")) {
                _context2.next = 32;
                break;
              }

              // if thunk, dispatch to ad-hoc stream, return acc
              // as-is ⚠ this command will not be waited on
              result = args();
              console.log("dispatching to custom stream: ".concat(sub$.id));
              sub$.next(result); // 💃

              return _context2.abrupt("return", acc);

            case 32:
              if (!(arg_type === "FUNCTION")) {
                _context2.next = 42;
                break;
              }

              // if function, call it with acc and resolve any
              // promises
              temp = args(acc); // result = isPromise(temp) ? await discardable(temp).catch(e => e) : temp

              if (!(0, _checks.isPromise)(temp)) {
                _context2.next = 40;
                break;
              }

              _context2.next = 37;
              return temp.catch(function (e) {
                return e;
              });

            case 37:
              _context2.t1 = _context2.sent;
              _context2.next = 41;
              break;

            case 40:
              _context2.t1 = temp;

            case 41:
              result = _context2.t1;

            case 42:
              if (!(arg_type === "OBJECT")) {
                _context2.next = 47;
                break;
              }

              if (sub$) {
                _context2.next = 45;
                break;
              }

              return _context2.abrupt("return", _objectSpread({}, acc, {}, args));

            case 45:
              _streams.command$.next(c);

              return _context2.abrupt("return", _objectSpread({}, acc, {}, args));

            case 47:
              if (!reso) {
                _context2.next = 64;
                break;
              }

              if (!(erro & result instanceof Error)) {
                _context2.next = 54;
                break;
              }

              error = erro(acc, result);

              if (!error.sub$) {
                _context2.next = 52;
                break;
              }

              return _context2.abrupt("return", _streams.command$.next(error));

            case 52:
              console.warn(err_str, "[ Promise rejected ]:", result);
              result = error;

            case 54:
              if (result instanceof Error) {
                _context2.next = 63;
                break;
              }

              resolved = reso(acc, result);

              if (!resolved.sub$) {
                _context2.next = 60;
                break;
              }

              _streams.command$.next(resolved); // resolved promise with no sub$ key -> spread
              // resolved value into acc


              _context2.next = 62;
              break;

            case 60:
              if (sub$) {
                _context2.next = 62;
                break;
              }

              return _context2.abrupt("return", _objectSpread({}, acc, {}, resolved));

            case 62:
              result = resolved;

            case 63:
              console.warn("no 'erro' (Error handler) set for ".concat(c));

            case 64:
              if (!(!reso && !sub$)) {
                _context2.next = 66;
                break;
              }

              return _context2.abrupt("return", _objectSpread({}, acc, {}, result));

            case 66:
              if (!(result instanceof Error)) {
                _context2.next = 69;
                break;
              }

              console.warn(err_str, result);
              return _context2.abrupt("return", acc);

            case 69:
              if (!(result !== Object(result))) {
                _context2.next = 75;
                break;
              }

              if (sub$) {
                _context2.next = 73;
                break;
              }

              no_sub$_err(c, i);
              return _context2.abrupt("return", acc);

            case 73:
              // if the final result is primitive, you can't refer
              // to this value in proceeding Commands -> send the
              // Command as-is, return acc as-is.
              _streams.command$.next({
                sub$: sub$,
                args: result
              });

              return _context2.abrupt("return", acc);

            case 75:
              // if the result has made it this far, send it along
              // console.log(`${sub$} made it through`)
              _streams.command$.next({
                sub$: sub$,
                args: result
              });

              return _context2.abrupt("return", _objectSpread({}, acc, {}, result));

            case 77:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, null, [[4, 10]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }(), _promise.default.resolve({}));
};

exports.spool = spool;
},{"@babel/runtime-corejs3/core-js-stable/object/define-property":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js","@babel/runtime-corejs3/core-js-stable/object/define-properties":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js","@babel/runtime-corejs3/core-js-stable/instance/for-each":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js","@babel/runtime-corejs3/core-js-stable/instance/filter":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js","@babel/runtime-corejs3/regenerator":"../node_modules/@babel/runtime-corejs3/regenerator/index.js","@babel/runtime-corejs3/helpers/defineProperty":"../node_modules/@babel/runtime-corejs3/helpers/defineProperty.js","@babel/runtime-corejs3/core-js-stable/promise":"../node_modules/@babel/runtime-corejs3/core-js-stable/promise.js","@babel/runtime-corejs3/core-js-stable/object/keys":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js","@babel/runtime-corejs3/helpers/objectWithoutProperties":"../node_modules/@babel/runtime-corejs3/helpers/objectWithoutProperties.js","@babel/runtime-corejs3/helpers/asyncToGenerator":"../node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js","@babel/runtime-corejs3/core-js-stable/instance/reduce":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/reduce.js","@babel/runtime-corejs3/core-js-stable/json/stringify":"../node_modules/@babel/runtime-corejs3/core-js-stable/json/stringify.js","@babel/runtime-corejs3/core-js-stable/instance/concat":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js","@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","../utils":"../src/utils/index.js","../streams":"../src/streams/index.js"}],"../src/streams/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMnavigated$ = exports.DOMContentLoaded$ = exports.popstate$ = exports.task$ = exports.command$ = exports.out$ = exports.run$ = exports.log$ = void 0;

var _rstream = require("@thi.ng/rstream");

var _transducers = require("@thi.ng/transducers");

var _spool = require("../spool");

/**
 @module Streams
*/
var log$ = (0, _rstream.stream)().subscribe((0, _rstream.trace)("log$ -> "), {
  id: "log$"
});
/**
 * # Stream Architecture:
 *
 * `run$` is the primary event stream exposed to the user
 * via the `ctx` object injected into every `hdom` component
 * the command stream is the only way the user changes
 * anything in `hurl`
 *
 * ## Marble Diagram
 *
 * ```
 * 0>- |------c-----------c--[~a~b~a~]-a----c-> : calls
 * 1>- |ps|---1-----------1----------0-1----1-> : run$
 * 2>- |t0|---------a~~b~~~~~~~~~~~a~*--------> : task$
 * 3>- |t1|---c-----------c------------a----c-> : command$
 * 4>- ---|ps|c-----a--b--c--------a---a----c-> : out$
 * Handlers
 * a>- ---|ta|------*--------------*---*------> : registerCMD
 * b>- ---|tb|---------*----------------------> : registerCMD
 * c>- ---|tc|*-----------*-----------------*-> : registerCMD
 * ```
 *
 * ## Streams
 *
 * - `0>-`: `ctx.run$.next(x)` userland dispatches
 * - `1>-`: `pubsub({ topic: x => x.length === 0 })` `run$`
 *   stream
 * - `2>-`: pubsub = `false` ? -> `task$` stream
 * - `3>-`: pubsub = `true` ? ->`command$` stream
 * - `4>-`: `pubsub({ topic: x => x.sub$ })`: `out$` stream
 *   -> `register_command`
 *
 * ## Handlers
 *
 * `4>-` this is the stream to which the user (and
 * framework) attaches handlers. Handlers receive events
 * they subscribe to as topics based on a `sub$` key in a
 * Command object.
 *
 * ### Handlers (framework provided):
 * - "state": Global state mutations
 * - "route": Routing
 * - "FLIP" :
 *   [F.L.I.P.](https://aerotwist.com/blog/flip-your-animations/)
 *   animations
 *
 * TODO:
 * - add __Examples__
 * - add `beforeunload` event handler within #4 (orphan):
 *    SEE https://youtu.be/QQukWZcIptM
 * - enable ctx.run.cancel() via external or internal events
 *    (e.g., popstate / { sub$:  "cancel" })
 *
 * ## `run$`
 *
 * User-land event dispatch stream
 *
 * This stream is directly exposed to users via `ctx` Any
 * one-off Commands `next`ed into this stream are sent to
 * the `command$` stream. Arrays of Commands (Tasks) are
 * sent to the `task$` stream.
 *
 */

exports.log$ = log$;
var run$ = (0, _rstream.pubsub)({
  topic: function topic(x) {
    return !!x.sub$;
  },
  id: "run$_stream",
  equiv: function equiv(x, y) {
    return x === y || y === "_TRACE_STREAM";
  }
});
/**
 * ## `out$`
 *
 * Primary user-land _READ_ stream. For attaching handlers
 * for responding to emmitted Commands
 *
 */

exports.run$ = run$;
var out$ = (0, _rstream.pubsub)({
  topic: function topic(x) {
    return x.sub$;
  },
  id: "out$_stream",
  equiv: function equiv(x, y) {
    return x === y || y === "_TRACE_STREAM";
  }
});
/**
 * ## `command$`
 *
 * Primary fork/bisect stream for indivual commands.
 * attached to a `pubsub` stemming from this stream. The
 * `topic` function used to alert downstream handlers is a
 * simple lookup of the `sub$` key of the command
 *
 */

exports.out$ = out$;
var command$ = run$.subscribeTopic(true, {
  next: function next(x) {
    return out$.next(x);
  },
  error: console.warn
}, {
  id: "command$_stream"
});
/**
 * ## `task$`
 *
 * Batch processing stream, listens for Tasks sent as an
 * array of Commands (including subtask functions)
 *
 * stream (if array of event objects)
 *
 */

exports.command$ = command$;
var task$ = run$.subscribeTopic(false, {
  next: _spool.spool,
  error: console.warn
}, {
  id: "task$_stream"
});
exports.task$ = task$;
var popstate$ = (0, _rstream.fromDOMEvent)(window, "popstate");
exports.popstate$ = popstate$;
var DOMContentLoaded$ = (0, _rstream.fromDOMEvent)(window, "DOMContentLoaded"); // example of custom stream dispatch (logging)

/**
 *
 * There are three types of navigation we need to handle:
 * 1. DOMContentLoaded (entering the site) events
 * 2. popstate (browser back/forward button clicks) events
 * 3. <a hurl="x"> (link clicking)
 *
 * These events have different payloads and need to be
 * harmonized in order to use them consistently
 *
 * ## getting the `hurl` property from the various events:
 * 1. ev.target.location.hurl
 * 2. ev.target.location.hurl
 * 3. ev.target.hurl
 *
 * for raw events, we can just transform them, but for link
 * clicking we need to convert/wrap it to align with the
 * destructuring of the others
 */

exports.DOMContentLoaded$ = DOMContentLoaded$;
var DOMnavigated$ = (0, _rstream.merge)({
  src: [popstate$, DOMContentLoaded$]
}).transform((0, _transducers.map)(function (x) {
  return {
    URL: x.target.location.href,
    DOM: x.currentTarget
  };
}));
exports.DOMnavigated$ = DOMnavigated$;
},{"@thi.ng/rstream":"../node_modules/@thi.ng/rstream/index.js","@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","../spool":"../src/spool/index.js"}],"../src/tasks/_URL+DOM__ROUTE.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._URL__ROUTE = exports._URL_DOM__ROUTE = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _checks = require("@thi.ng/checks");

var _utils = require("../utils");

var _commands = require("../commands");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; (0, _forEach.default)(_context = ownKeys(Object(source), true)).call(_context, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context2; (0, _forEach.default)(_context2 = ownKeys(Object(source))).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var _URL_DOM__ROUTE = function _URL_DOM__ROUTE(router) {
  // instantiate router
  var match = _URL__ROUTE(router);

  return function (_ref) {
    var URL = _ref.URL,
        DOM = _ref.DOM;
    return [_objectSpread({}, _commands._HREF_PUSHSTATE_DOM, {
      args: {
        URL: URL,
        DOM: DOM
      }
    }), // example Subtask injection
    function (_ref2) {
      var URL = _ref2.URL;
      return match({
        URL: URL
      });
    }, // _FLIP_FIRST,
    // { args: msTaskDelay(2000) },
    _commands._SET_PAGE_STATE, // _FLIP_PLAY,
    // wait on pending promise(s) w/a non-nullary fn (+)=>
    _objectSpread({}, _commands._SET_ROUTER_LOADING_STATE, {
      args: function args(_) {
        return false;
      }
    }), // example ad-hoc stream injection
    // { sub$: log$, args: () => ({ DOM }) },
    _commands._SET_LINK_ATTRS_DOM, _commands._NOTIFY_PRERENDER_DOM];
  };
};
/**
 *
 * `_URL__ROUTE`
 *
 * Universal router (cross-platform) Subtask.
 *
 * This can be used in both a browser and Node context. The
 * parts that handle browser side-effects are included in an
 * Supertask `_URL__ROUTE`
 *
 * Pseudo
 * ```
 * ( router ) => ({ URL }) => [
 * - set `router_loading` path in global atom to `true`
 * - call provided `router` with the `URL` and await payload
 * - `parse_URL(URL)` for `URL_*` components
 * - set `route_path` in global store/atom to current `URL_path`
 * - set page state (data, path & page component name) in store
 * - once promise(s) resolved, set `router_loading` to `false`
 * ]
 * ```
 */


exports._URL_DOM__ROUTE = _URL_DOM__ROUTE;

var _URL__ROUTE = function _URL__ROUTE(router) {
  return function (_ref3) {
    var URL = _ref3.URL;
    return [_commands._SET_ROUTER_LOADING_STATE, {
      args: router(URL),
      reso: function reso(acc, _ref4) {
        var page = _ref4.page,
            data = _ref4.data;
        return {
          page: page,
          data: data
        };
      },
      erro: function erro(acc, err) {
        return console.warn(err);
      }
    }, {
      args: (0, _utils.parse_URL)(URL)
    }, _commands._SET_ROUTER_PATH];
  };
};

exports._URL__ROUTE = _URL__ROUTE;
},{"@babel/runtime-corejs3/core-js-stable/object/define-property":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js","@babel/runtime-corejs3/core-js-stable/object/define-properties":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js","@babel/runtime-corejs3/core-js-stable/instance/for-each":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js","@babel/runtime-corejs3/core-js-stable/instance/filter":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js","@babel/runtime-corejs3/core-js-stable/object/keys":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js","@babel/runtime-corejs3/helpers/defineProperty":"../node_modules/@babel/runtime-corejs3/helpers/defineProperty.js","@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","../utils":"../src/utils/index.js","../commands":"../src/commands/index.js"}],"../src/tasks/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _URLDOM__ROUTE = require("./_URL+DOM__ROUTE");

Object.keys(_URLDOM__ROUTE).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _URLDOM__ROUTE[key];
    }
  });
});
},{"./_URL+DOM__ROUTE":"../src/tasks/_URL+DOM__ROUTE.js"}],"../src/register/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRouter = exports.registerRouterDOM = exports.registerCMD = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _streams = require("../streams");

var _checks = require("@thi.ng/checks");

var _transducers = require("@thi.ng/transducers");

var _tasks = require("../tasks");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module registerCMD
 */
var err_str = "registerCMD";

var feedCMD$fromSource$ = function feedCMD$fromSource$(_ref) {
  var sub$ = _ref.sub$,
      args = _ref.args,
      source$ = _ref.source$;
  var args_is_fn = (0, _checks.isFunction)(args);

  var deliver = function deliver(x) {
    return {
      sub$: sub$,
      args: args(x)
    };
  };

  var delivery = {
    sub$: sub$,
    args: args
  };

  var feed = function feed($) {
    return args_is_fn ? (0, _transducers.map)(function (x) {
      return $.next(deliver(x));
    }) : (0, _transducers.map)(function () {
      return $.next(delivery);
    });
  }; // looks for the `sub$` key to determine if its a command


  return source$.subscribe(feed(_streams.command$));
};
/**
 *
 * ## `registerCMD`
 *
 * Takes a Command object with some additional information
 * and returns a Command usable in a Task or as-is. This
 * also serves the additional benefit of giving the user a
 * constant to use instead of making any typos in keys
 * during use.
 *
 * ### Destructuring Behavior
 *
 * During a `sub$` registration, the keys in the Command
 * object are used to determine the signature of incoming
 * Commands. In order to reduce the amount of boilerplate
 * for Commands that only contain the `sub$` and `args` key,
 * the `args` key is
 * [pluck](https://github.com/thi-ng/umbrella/blob/master/packages/transducers/src/xform/pluck.ts)ed
 * from the incoming Commands. This pulls the `args` value
 * out from the incoming Command objects to be used directly
 * (without the need for dstructuring).
 *
 * ### Example
 *
 * ```js
 * import { registerCMD, run$ } from "🍎"
 *
 * const cmd_pathless = {
 *   sub$: "PATHLESS",
 *   args: { static: "payload" }
 * }
 *
 * const pathless_handler = x => console.log("pathless ->", x)
 *
 * const CMD_PATHLESS = registerCMD(cmd_pathless, pathless_handler)
 *
 * run$.next(CMD_PATHLESS) // 🏃
 * // pathless -> { static: 'payload' }
 *
 * const cmd_path = {
 *   sub$: "PATH",
 *   args: { static: "payload" },
 *   path: ["default", "path"]
 * }
 *
 * const path_handler = x => console.log("path ->", x)
 *
 * const CMD_PATH = registerCMD(cmd_path, path_handler)
 *
 * run$.next(CMD_PATH) // 🏃
 * // path -> { args: { static: 'payload' }, path: [ 'default', 'path' ] }
 *
 * const test_pathless = {
 *   sub$: "PATHLESS",
 *   args: "🔥"
 * }
 *
 * run$.next(test_pathless) // 🏃
 * // pathless -> "🔥"
 * // as you can see, the Command args have been plucked out
 *
 * const test_path = {
 *   sub$: "PATH",
 *   args: "🌊",
 *   path: ["new", "path"]
 * }
 *
 * run$.next(test_path) // 🏃
 * // path -> { args: '🌊', path: [ 'new', 'path' ] }
 * // only the sub$ entry has been removed leaving the rest
 *
 * // NOW: Let's stick these into a Task
 * let TASK_1 = [
 *   { ...CMD_PATH, path: "overwritten" },
 *   CMD_PATHLESS,
 *   { ...test_path, args: "🍝" }
 * ]
 * run$.next(TASK_1)
 * // path -> { args: { static: 'payload' }, path: 'overwritten' }
 * // pathless -> { static: 'payload' }
 * // path -> { args: '🍝', path: [ 'new', 'path' ] }
 *
 * ```
 *
 * @param {Command} command an object with three required
 * keys (`sub$`, `args`, `handler`)
 *
 */


var registerCMD = function registerCMD(command) {
  // 📌 TODO: register factory function
  var sub$ = command.sub$,
      args = command.args,
      erro = command.erro,
      reso = command.reso,
      source$ = command.source$,
      handler = command.handler,
      unknown = (0, _objectWithoutProperties2.default)(command, ["sub$", "args", "erro", "reso", "source$", "handler"]);
  /**
   * destructure the args component out of the emissions
   * to save the user from having to do that PITA everytime
   */

  if ((0, _keys.default)(unknown).length > 0) {
    throw new Error((0, _utils.unknown_key_ERR)(err_str, command, unknown, sub$, undefined));
  }

  if (source$) feedCMD$fromSource$(command); // more: https://github.com/thi-ng/umbrella/blob/develop/examples/rstream-event-loop/src/events.ts

  _streams.out$.subscribeTopic(sub$, {
    next: handler,
    error: console.warn
  }, (0, _transducers.map)(function (_ref2) {
    var args = _ref2.args;
    return args;
  }));

  var CMD = reso ? {
    sub$: sub$,
    args: args,
    reso: reso,
    erro: erro
  } : {
    sub$: sub$,
    args: args
  };
  return CMD;
};

exports.registerCMD = registerCMD;

var registerRouterDOM = function registerRouterDOM(router) {
  console.log("DOM Router Registered");
  var taskFrom = (0, _tasks._URL_DOM__ROUTE)(router);
  return registerCMD({
    source$: _streams.DOMnavigated$,
    sub$: "_URL_NAVIGATED$_DOM",
    args: function args(x) {
      return x;
    },
    handler: function handler(_ref3) {
      var URL = _ref3.URL,
          DOM = _ref3.DOM;
      return _streams.run$.next(taskFrom({
        URL: URL,
        DOM: DOM
      }));
    }
  });
};

exports.registerRouterDOM = registerRouterDOM;

var registerRouter = function registerRouter(router) {
  console.log("Router Registered");
  var taskFrom = (0, _tasks._URL__ROUTE)(router);
  return registerCMD({
    sub$: "_URL_NAVIGATED$",
    source$: _streams.DOMnavigated$,
    args: function args(x) {
      return x;
    },
    handler: function handler(_ref4) {
      var URL = _ref4.URL,
          DOM = _ref4.DOM;
      return _streams.run$.next(taskFrom({
        URL: URL,
        DOM: DOM
      }));
    }
  });
};

exports.registerRouter = registerRouter;
},{"@babel/runtime-corejs3/core-js-stable/object/keys":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js","@babel/runtime-corejs3/helpers/objectWithoutProperties":"../node_modules/@babel/runtime-corejs3/helpers/objectWithoutProperties.js","../streams":"../src/streams/index.js","@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/transducers":"../node_modules/@thi.ng/transducers/index.js","../tasks":"../src/tasks/index.js","../utils":"../src/utils/index.js"}],"../src/store/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set$Root = exports.set$Page = exports.set$Loading = exports.set$Route = exports.set$State = exports.$page$ = exports.$routePath$ = exports.$routeLoading$ = exports.$store$ = void 0;

var _paths = require("@thi.ng/paths");

var _atom = require("@thi.ng/atom");

var $store$ = new _atom.Atom({
  _route_path: [],
  _route_loading: false,
  _page: "",
  _root: ""
}); // sets a value within the global atom by path/lens

exports.$store$ = $store$;
var $routeLoading$ = new _atom.Cursor($store$, "_route_loading");
exports.$routeLoading$ = $routeLoading$;
var $routePath$ = $store$.addView("_route_path");
exports.$routePath$ = $routePath$;
var $page$ = $store$.addView("_page");
exports.$page$ = $page$;

var set$State = function set$State(path, val) {
  return $store$.swap(function (state) {
    return (0, _paths.setIn)(state, path, val);
  });
};

exports.set$State = set$State;

var set$Route = function set$Route(val) {
  return set$State("_route_path", val);
};

exports.set$Route = set$Route;

var set$Loading = function set$Loading(val) {
  return $routeLoading$.reset(val);
};

exports.set$Loading = set$Loading;

var set$Page = function set$Page(val) {
  return set$State("_page", val);
};

exports.set$Page = set$Page;

var set$Root = function set$Root(val) {
  return set$State("_root", val);
}; // export const set$FLIP = ([k, v]) =>
//   $store$.swap(state => setIn(state, "_flip_els", state._flip_els.set(k, v)))


exports.set$Root = set$Root;
},{"@thi.ng/paths":"../node_modules/@thi.ng/paths/index.js","@thi.ng/atom":"../node_modules/@thi.ng/atom/index.js"}],"../src/commands/routing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._NOTIFY_PRERENDER_DOM = exports._HREF_PUSHSTATE_DOM = exports._SET_LINK_ATTRS_DOM = exports._SET_ROUTER_PATH = exports._SET_ROUTER_LOADING_STATE = exports._SET_PAGE_STATE = exports.emitHREF = void 0;

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _register = require("../register");

var _store = require("../store");

var _utils = require("../utils");

var _streams = require("../streams");

var _paths = require("@thi.ng/paths");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitHREF = function emitHREF(e) {
  e.preventDefault(); // console.log({ e })

  var href = e.target.href;
  var w_href = window.location.href;
  if (w_href === href) return;

  _streams.DOMnavigated$.next({
    target: {
      location: {
        href: href
      }
    },
    currentTarget: e.currentTarget
  });

  return e;
}; // source = TRIGGER

/**
 * ## `_SET_PAGE_STATE`
 *
 * Routing Command: Universal
 *
 * ### Payload: function
 * takes the result from two sources: the user-provided
 * `router` ([@thi.ng/associative:
 * EquivMap](http://thi.ng/associative)) and the `URL_path`
 * from `parse_URL(URL)`
 *
 * ### Handler: side-effecting
 * Hydrates the page state as well as the name of the active
 * page in the global store
 *
 */


exports.emitHREF = emitHREF;

var _SET_PAGE_STATE = (0, _register.registerCMD)({
  sub$: "_SET_PAGE_STATE",
  args: function args(_ref) {
    var URL_path = _ref.URL_path,
        page = _ref.page,
        data = _ref.data;
    return {
      URL_path: URL_path,
      page: page,
      data: data
    };
  },
  handler: function handler(_ref2) {
    var URL_path = _ref2.URL_path,
        page = _ref2.page,
        data = _ref2.data;
    var path = URL_path.length === 0 ? ["home"] : URL_path;
    (0, _store.set$State)(path, data), (0, _store.set$Page)(page);
  }
});
/**
 * ## `_SET_ROUTER_LOADING_STATE`cod
 *
 * Routing Command: Universal
 *
 * ### Payload: static
 * Simple true or false payload to alert handler
 *
 * ### Handler: side-effecting
 * Sets `route_loading` path in global Atom to true || false
 *
 */


exports._SET_PAGE_STATE = _SET_PAGE_STATE;

var _SET_ROUTER_LOADING_STATE = (0, _register.registerCMD)({
  sub$: "_SET_ROUTER_LOADING_STATE",
  args: true,
  handler: function handler(x) {
    return (0, _store.set$Loading)(x);
  }
});
/**
 * ## `_SET_ROUTER_PATH`
 *
 * Routing Command: Universal
 *
 * ### Payload: function
 * Consumes the `URL_path` property from a `parse_URL`
 * object, handed off from a prior Command
 *
 * ### Handler: side-effecting
 * Sets the current/loading router's `route_path` in the
 * global Atom
 *
 */


exports._SET_ROUTER_LOADING_STATE = _SET_ROUTER_LOADING_STATE;

var _SET_ROUTER_PATH = (0, _register.registerCMD)({
  sub$: "_SET_ROUTER_PATH",
  args: function args(_ref3) {
    var URL_path = _ref3.URL_path;
    return {
      URL_path: URL_path
    };
  },
  handler: function handler(_ref4) {
    var URL_path = _ref4.URL_path;
    return (0, _store.set$Route)(URL_path);
  }
});

exports._SET_ROUTER_PATH = _SET_ROUTER_PATH;

var setLinkAttrs = function setLinkAttrs(target) {
  var _context;

  (0, _forEach.default)(_context = document.body.querySelectorAll("a[visited]")).call(_context, function (el) {
    if (el.href === window.location.href) el.setAttribute("active", "");else el.removeAttribute("active");
  });

  if (target.setAttribute) {
    target.setAttribute("visited", "");
    target.setAttribute("active", "");
  }
};
/**
 * ## `_SET_LINK_ATTRS_DOM`
 *
 * Routing Command: DOM-specific
 *
 * ### Payload: function
 * Input = DOM node reference
 *
 * ### Handler: side-effecting
 * Takes a DOM reference and queries all visited links. Sets
 * current/clicked link as active and sets visted links that
 * don't match current URL to inactive see `setLinkAttrs`
 * function
 *
 */


var _SET_LINK_ATTRS_DOM = (0, _register.registerCMD)({
  sub$: "_SET_LINK_ATTRS_DOM",
  args: function args(_ref5) {
    var DOM = _ref5.DOM;
    return {
      DOM: DOM
    };
  },
  handler: function handler(_ref6) {
    var DOM = _ref6.DOM;
    return setLinkAttrs(DOM);
  }
});
/**
 * ## `_HREF_PUSHSTATE_DOM`
 *
 * Routing Command: DOM-specific
 *
 * ### Payload: function
 * Takes a URL and a DOM reference
 *
 * ### Handler: side-effecting
 * If the DOM reference is an `<a>` element, uses
 * `history.pushState` to add the clicked URL (plus the
 * parsed URL from `parse_URL(URL)`) to the `history` object
 *
 * export const DOMnavigated$ = merge({
 *   src: [popstate$, DOMContentLoaded$]
 * }).transform(map(x => ({ URL: x.target.location.href, DOM: x.currentTarget })))
 *
 *
 */


exports._SET_LINK_ATTRS_DOM = _SET_LINK_ATTRS_DOM;

var _HREF_PUSHSTATE_DOM = (0, _register.registerCMD)({
  sub$: "_HREF_PUSHSTATE_DOM",
  args: function args(_ref7) {
    var URL = _ref7.URL,
        DOM = _ref7.DOM;
    return {
      URL: URL,
      DOM: DOM
    };
  },
  handler: function handler(_ref8) {
    var URL = _ref8.URL,
        DOM = _ref8.DOM;
    return !DOM.document ? history.pushState((0, _utils.parse_URL)(URL), null, URL) : null;
  }
});
/**
 * ## `_NOTIFY_PRERENDER_DOM`
 *
 * ### Payload: static
 *
 * ### Handler: side-effecting
 * Routing Command: DOM-specific (used for manually
 * triggering `rendertron` prerenderer for bots/web-crawlers
 *
 *
 */


exports._HREF_PUSHSTATE_DOM = _HREF_PUSHSTATE_DOM;

var _NOTIFY_PRERENDER_DOM = (0, _register.registerCMD)({
  sub$: "_NOTIFY_PRERENDER_DOM",
  args: true,
  //👀 for prerenderer,
  handler: function handler() {
    return document.dispatchEvent(new Event("rendered"));
  }
}); //
//  888~~  888     888 888~-_    _-~88e
//  888___ 888     888 888   \  /   88"
//  888    888     888 888    | `   8P
//  888    888     888 888   /      `
//  888    888     888 888_-~     d88b
//  888    888____ 888 888        Y88P
//
//
// export const _FLIP_FIRST = registerCMD({
//   sub$: "_FLIP_FIRST",
//   args: true,
//   handler: () =>
//     $store$.deref()._flip_els.forEach(el => (el.recordBeforeUpdate(), $store$.deref(), el.update()))
//   // console.log($store$.deref()._flip_els.forEach((v, k, d) => console.log("key:", k, "val", v))) // console.log(getIn($store$, "_flip_els")) // .forEach(el => el.recordBeforeUpdate())
// })
// export const _FLIP_PLAY = registerCMD({
//   sub$: "_FLIP_PLAY",
//   args: true,
//   handler: console.log // () => $store$.deref()._flip_els.forEach(el => el.update())
// })


exports._NOTIFY_PRERENDER_DOM = _NOTIFY_PRERENDER_DOM;
},{"@babel/runtime-corejs3/core-js-stable/instance/for-each":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js","../register":"../src/register/index.js","../store":"../src/store/index.js","../utils":"../src/utils/index.js","../streams":"../src/streams/index.js","@thi.ng/paths":"../node_modules/@thi.ng/paths/index.js"}],"../src/commands/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routing = require("./routing");

Object.keys(_routing).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _routing[key];
    }
  });
});
},{"./routing":"../src/commands/routing.js"}],"../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streams = exports.store = exports.register = exports.utils = exports.tasks = exports.commands = void 0;

var commands = _interopRequireWildcard(require("./commands"));

exports.commands = commands;

var tasks = _interopRequireWildcard(require("./tasks"));

exports.tasks = tasks;

var utils = _interopRequireWildcard(require("./utils"));

exports.utils = utils;

var register = _interopRequireWildcard(require("./register"));

exports.register = register;

var store = _interopRequireWildcard(require("./store"));

exports.store = store;

var streams = _interopRequireWildcard(require("./streams"));

exports.streams = streams;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./commands":"../src/commands/index.js","./tasks":"../src/tasks/index.js","./utils":"../src/utils/index.js","./register":"../src/register/index.js","./store":"../src/store/index.js","./streams":"../src/streams/index.js"}],"../node_modules/@thi.ng/hdom/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogger = exports.LOGGER = void 0;

var _api = require("@thi.ng/api");

let LOGGER = _api.NULL_LOGGER;
exports.LOGGER = LOGGER;

const setLogger = logger => exports.LOGGER = LOGGER = logger;

exports.setLogger = setLogger;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js"}],"../node_modules/@thi.ng/diff/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiffMode = void 0;
var DiffMode;
exports.DiffMode = DiffMode;

(function (DiffMode) {
  DiffMode[DiffMode["ONLY_DISTANCE"] = 0] = "ONLY_DISTANCE";
  DiffMode[DiffMode["ONLY_DISTANCE_LINEAR"] = 1] = "ONLY_DISTANCE_LINEAR";
  DiffMode[DiffMode["ONLY_DISTANCE_LINEAR_ONLY_CHANGES"] = 2] = "ONLY_DISTANCE_LINEAR_ONLY_CHANGES";
  DiffMode[DiffMode["FULL"] = 3] = "FULL";
})(DiffMode || (exports.DiffMode = DiffMode = {}));
},{}],"../node_modules/@thi.ng/diff/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffArray = void 0;

var _equiv2 = require("@thi.ng/equiv");

let _cachedFP;

let _cachedPath;

let _cachedEPC = [];
let _cachedPathPos = [];

const cachedFP = size => _cachedFP && _cachedFP.length >= size ? _cachedFP : _cachedFP = new Int32Array(size);

const cachedPath = size => _cachedPath && _cachedPath.length >= size ? _cachedPath : _cachedPath = new Int32Array(size);

const simpleDiff = (state, src, key, logDir, mode) => {
  const n = src.length;
  const linear = state.linear;
  state.distance = n;

  if (mode !== 0
  /* ONLY_DISTANCE */
  ) {
      for (let i = 0, j = 0; i < n; i++, j += 3) {
        linear[j] = logDir;
        linear[j + 1] = i;
        linear[j + 2] = src[i];
      }

      if (mode === 3
      /* FULL */
      ) {
          const _state = state[key];

          for (let i = 0; i < n; i++) {
            _state[i] = src[i];
          }
        }
    }

  return state;
};
/**
 * Based on "An O(NP) Sequence Comparison Algorithm""
 * by Wu, Manber, Myers and Miller
 *
 * - http://www.itu.dk/stud/speciale/bepjea/xwebtex/litt/an-onp-sequence-comparison-algorithm.pdf
 * - https://github.com/cubicdaiya/onp
 *
 * Various optimizations, fixes & refactorings.
 * By default uses `@thi.ng/equiv` for equality checks.
 *
 * @param a "old" array
 * @param b "new" array
 * @param mode result mode
 * @param equiv equality predicate function
 */


const diffArray = (a, b, mode = 3
/* FULL */
, equiv = _equiv2.equiv) => {
  const state = {
    distance: 0,
    adds: {},
    dels: {},
    const: {},
    linear: []
  };

  if (a === b || a == null && b == null) {
    return state;
  } else if (a == null || a.length === 0) {
    return simpleDiff(state, b, "adds", 1, mode);
  } else if (b == null || b.length === 0) {
    return simpleDiff(state, a, "dels", -1, mode);
  }

  const reverse = a.length >= b.length;

  let _a, _b, na, nb;

  if (reverse) {
    _a = b;
    _b = a;
  } else {
    _a = a;
    _b = b;
  }

  na = _a.length;
  nb = _b.length;
  const offset = na + 1;
  const delta = nb - na;
  const doff = delta + offset;
  const size = na + nb + 3;
  const path = cachedPath(size).fill(-1, 0, size);
  const fp = cachedFP(size).fill(-1, 0, size);
  const epc = _cachedEPC;
  const pathPos = _cachedPathPos;
  epc.length = 0;
  pathPos.length = 0;

  const snake = (k, p, pp) => {
    const koff = k + offset;
    let r, y;

    if (p > pp) {
      r = path[koff - 1];
      y = p;
    } else {
      r = path[koff + 1];
      y = pp;
    }

    let x = y - k;

    while (x < na && y < nb && equiv(_a[x], _b[y])) {
      x++;
      y++;
    }

    path[koff] = pathPos.length / 3;
    pathPos.push(x, y, r);
    return y;
  };

  let p = -1,
      k,
      ko;

  do {
    p++;

    for (k = -p, ko = k + offset; k < delta; k++, ko++) {
      fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
    }

    for (k = delta + p, ko = k + offset; k > delta; k--, ko--) {
      fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
    }

    fp[doff] = snake(delta, fp[doff - 1] + 1, fp[doff + 1]);
  } while (fp[doff] !== nb);

  state.distance = delta + 2 * p;

  if (mode !== 0
  /* ONLY_DISTANCE */
  ) {
      p = path[doff] * 3;

      while (p >= 0) {
        epc.push(p);
        p = pathPos[p + 2] * 3;
      }

      if (mode === 3
      /* FULL */
      ) {
          buildFullLog(epc, pathPos, state, _a, _b, reverse);
        } else {
        buildLinearLog(epc, pathPos, state, _a, _b, reverse, mode === 1
        /* ONLY_DISTANCE_LINEAR */
        );
      }
    }

  return state;
};

exports.diffArray = diffArray;

const buildFullLog = (epc, pathPos, state, a, b, reverse) => {
  const linear = state.linear;
  const _const = state.const;
  let i = epc.length;
  let px = 0;
  let py = 0;
  let adds;
  let dels;
  let aID;
  let dID;

  if (reverse) {
    adds = state.dels;
    dels = state.adds;
    aID = -1;
    dID = 1;
  } else {
    adds = state.adds;
    dels = state.dels;
    aID = 1;
    dID = -1;
  }

  for (; --i >= 0;) {
    const e = epc[i];
    const ppx = pathPos[e];
    const ppy = pathPos[e + 1];
    const d = ppy - ppx;

    while (px < ppx || py < ppy) {
      const dp = py - px;

      if (d > dp) {
        linear.push(aID, py, adds[py] = b[py]);
        py++;
      } else if (d < dp) {
        linear.push(dID, px, dels[px] = a[px]);
        px++;
      } else {
        linear.push(0, px, _const[px] = a[px]);
        px++;
        py++;
      }
    }
  }
};

const buildLinearLog = (epc, pathPos, state, a, b, reverse, inclConst) => {
  const linear = state.linear;
  const aID = reverse ? -1 : 1;
  const dID = reverse ? 1 : -1;
  let i = epc.length,
      px = 0,
      py = 0;

  for (; --i >= 0;) {
    const e = epc[i];
    const ppx = pathPos[e];
    const ppy = pathPos[e + 1];
    const d = ppy - ppx;

    while (px < ppx || py < ppy) {
      const dp = py - px;

      if (d > dp) {
        linear.push(aID, py, b[py]);
        py++;
      } else if (d < dp) {
        linear.push(dID, px, a[px]);
        px++;
      } else {
        inclConst && linear.push(0, px, a[px]);
        px++;
        py++;
      }
    }
  }
};
},{"@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js"}],"../node_modules/@thi.ng/diff/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffObject = void 0;

var _equiv2 = require("@thi.ng/equiv");

const diffObject = (a, b, mode = 3
/* FULL */
, _equiv = _equiv2.equiv) => a === b ? {
  distance: 0
} : mode === 0
/* ONLY_DISTANCE */
? diffObjectDist(a, b, _equiv) : diffObjectFull(a, b, _equiv);

exports.diffObject = diffObject;

const diffObjectDist = (a, b, _equiv) => {
  if (!a) a = {};
  if (!b) b = {};
  let d = 0;

  for (let k in a) {
    const vb = b[k];
    (vb === undefined || !_equiv(a[k], vb)) && d++;
  }

  for (let k in b) {
    !(k in a) && d++;
  }

  return {
    distance: d
  };
};

const diffObjectFull = (a, b, _equiv) => {
  if (!a) a = {};
  if (!b) b = {};
  let d = 0;
  const adds = [];
  const dels = [];
  const edits = [];

  for (let k in a) {
    const vb = b[k];

    if (vb === undefined) {
      dels.push(k);
      d++;
    } else if (!_equiv(a[k], vb)) {
      edits.push(k, vb);
      d++;
    }
  }

  for (let k in b) {
    if (!(k in a)) {
      adds.push(k);
      d++;
    }
  }

  return {
    distance: d,
    adds,
    dels,
    edits
  };
};
},{"@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js"}],"../node_modules/@thi.ng/diff/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _array = require("./array");

Object.keys(_array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _array[key];
    }
  });
});

var _object = require("./object");

Object.keys(_object).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _object[key];
    }
  });
});
},{"./api":"../node_modules/@thi.ng/diff/api.js","./array":"../node_modules/@thi.ng/diff/array.js","./object":"../node_modules/@thi.ng/diff/object.js"}],"../node_modules/@thi.ng/hdom/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equiv = exports.releaseTree = exports.diffAttributes = exports.diffTree = void 0;

var _api = require("@thi.ng/api");

var _diff = require("@thi.ng/diff");

var _equiv2 = require("@thi.ng/equiv");

const isArray = Array.isArray;
const max = Math.max;
const OBJP = Object.getPrototypeOf({});
const FN = "function";
const STR = "string"; // child index tracking template buffer

const INDEX = (() => {
  const res = new Array(2048);

  for (let i = 2, n = res.length; i < n; i++) {
    res[i] = i - 2;
  }

  return res;
})();

const buildIndex = n => {
  if (n <= INDEX.length) {
    return INDEX.slice(0, n);
  }

  const res = new Array(n);

  while (--n >= 2) {
    res[n] = n - 2;
  }

  return res;
};
/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param impl hdom implementation
 * @param parent
 * @param prev previous tree
 * @param curr current tree
 * @param child child index
 */


const diffTree = (opts, impl, parent, prev, curr, child = 0) => {
  const attribs = curr[1];

  if (attribs.__skip) {
    return;
  } // always replace element if __diff = false


  if (attribs.__diff === false) {
    releaseTree(prev);
    impl.replaceChild(opts, parent, child, curr);
    return;
  }

  const pattribs = prev[1];

  if (pattribs && pattribs.__skip) {
    impl.replaceChild(opts, parent, child, curr, false);
    return;
  } // delegate to branch-local implementation


  let _impl = attribs.__impl;

  if (_impl && _impl !== impl) {
    return _impl.diffTree(opts, _impl, parent, prev, curr, child);
  }

  const delta = (0, _diff.diffArray)(prev, curr, 1
  /* ONLY_DISTANCE_LINEAR */
  , equiv);

  if (delta.distance === 0) {
    return;
  }

  const edits = delta.linear;
  const el = impl.getChild(parent, child);
  let i;
  let ii;
  let status;
  let val;

  if (edits[0] !== 0 || prev[1].key !== attribs.key) {
    // LOGGER.fine("replace:", prev, curr);
    releaseTree(prev);
    impl.replaceChild(opts, parent, child, curr);
    return;
  }

  if ((val = prev.__release) && val !== curr.__release) {
    releaseTree(prev);
  }

  if (edits[3] !== 0) {
    diffAttributes(impl, el, prev[1], curr[1]); // if attribs changed & distance == 2 then we're done here...

    if (delta.distance === 2) {
      return;
    }
  }

  const numEdits = edits.length;
  const prevLength = prev.length - 1;
  const equivKeys = extractEquivElements(edits);
  const offsets = buildIndex(prevLength + 1);

  for (i = 2, ii = 6; ii < numEdits; i++, ii += 3) {
    status = edits[ii];
    if (!status) continue;

    if (status === -1) {
      diffDeleted(opts, impl, el, prev, curr, edits, ii, equivKeys, offsets, prevLength);
    } else {
      diffAdded(opts, impl, el, edits, ii, equivKeys, offsets, prevLength);
    }
  } // call __init after all children have been added/updated


  if ((val = curr.__init) && val != prev.__init) {
    val.apply(curr, [el, ...curr.__args]);
  }
};

exports.diffTree = diffTree;

const diffDeleted = (opts, impl, el, prev, curr, edits, ii, equivKeys, offsets, prevLength) => {
  const val = edits[ii + 2];

  if (isArray(val)) {
    let k = val[1].key;

    if (k !== undefined && equivKeys[k][2] !== undefined) {
      const eq = equivKeys[k];
      k = eq[0]; // LOGGER.fine(`diff equiv key @ ${k}:`, prev[k], curr[eq[2]]);

      diffTree(opts, impl, el, prev[k], curr[eq[2]], offsets[k]);
    } else {
      const idx = edits[ii + 1]; // LOGGER.fine("remove @", offsets[idx], val);

      releaseTree(val);
      impl.removeChild(el, offsets[idx]);
      incOffsets(offsets, prevLength, idx);
    }
  } else if (typeof val === STR) {
    impl.setContent(el, "");
  }
};

const diffAdded = (opts, impl, el, edits, ii, equivKeys, offsets, prevLength) => {
  const val = edits[ii + 2];

  if (typeof val === STR) {
    impl.setContent(el, val);
  } else if (isArray(val)) {
    const k = val[1].key;

    if (k === undefined || equivKeys[k][0] === undefined) {
      const idx = edits[ii + 1]; // LOGGER.fine("insert @", offsets[idx], val);

      impl.createTree(opts, el, val, offsets[idx]);
      decOffsets(offsets, prevLength, idx);
    }
  }
};

const incOffsets = (offsets, j, idx) => {
  for (; j > idx; j--) {
    offsets[j] = max(offsets[j] - 1, 0);
  }
};

const decOffsets = (offsets, j, idx) => {
  for (; j >= idx; j--) {
    offsets[j]++;
  }
};
/**
 * Helper function for `diffTree()` to compute & apply the difference
 * between a node's `prev` and `curr` attributes.
 *
 * @param impl
 * @param el
 * @param prev
 * @param curr
 */


const diffAttributes = (impl, el, prev, curr) => {
  const delta = (0, _diff.diffObject)(prev, curr, 3
  /* FULL */
  , _equiv2.equiv);
  impl.removeAttribs(el, delta.dels, prev);
  let val = _api.SEMAPHORE;
  let i, e, edits;

  for (edits = delta.edits, i = edits.length; (i -= 2) >= 0;) {
    e = edits[i];
    e.indexOf("on") === 0 && impl.removeAttribs(el, [e], prev);
    e !== "value" ? impl.setAttrib(el, e, edits[i + 1], curr) : val = edits[i + 1];
  }

  for (edits = delta.adds, i = edits.length; --i >= 0;) {
    e = edits[i];
    e !== "value" ? impl.setAttrib(el, e, curr[e], curr) : val = curr[e];
  }

  val !== _api.SEMAPHORE && impl.setAttrib(el, "value", val, curr);
};
/**
 * Recursively attempts to call the `release` lifecycle method on every
 * element in given tree (branch), using depth-first descent. Each
 * element is checked for the presence of the `__release` control
 * attribute. If (and only if) it is set to `false`, further descent
 * into that element's branch is skipped.
 *
 * @param tag
 */


exports.diffAttributes = diffAttributes;

const releaseTree = tag => {
  if (isArray(tag)) {
    let x;

    if ((x = tag[1]) && x.__release === false) {
      return;
    }

    if (tag.__release) {
      // LOGGER.fine("call __release", tag);
      tag.__release.apply(tag.__this, tag.__args);

      delete tag.__release;
    }

    for (x = tag.length; --x >= 2;) {
      releaseTree(tag[x]);
    }
  }
};

exports.releaseTree = releaseTree;

const extractEquivElements = edits => {
  let k;
  let val;
  let ek;
  const equiv = {};

  for (let i = edits.length; (i -= 3) >= 0;) {
    val = edits[i + 2];

    if (isArray(val) && (k = val[1].key) !== undefined) {
      ek = equiv[k];
      !ek && (equiv[k] = ek = [,,]);
      ek[edits[i] + 1] = edits[i + 1];
    }
  }

  return equiv;
};
/**
 * Customized version @thi.ng/equiv which takes `__diff` attributes into
 * account (at any nesting level). If an hdom element's attribute object
 * contains `__diff: false`, the object will ALWAYS be considered
 * unequal, even if all other attributes in the object are equivalent.
 *
 * @param a
 * @param b
 */


const equiv = (a, b) => {
  let proto;

  if (a === b) {
    return true;
  }

  if (a != null) {
    if (typeof a.equiv === FN) {
      return a.equiv(b);
    }
  } else {
    return a == b;
  }

  if (b != null) {
    if (typeof b.equiv === FN) {
      return b.equiv(a);
    }
  } else {
    return a == b;
  }

  if (typeof a === STR || typeof b === STR) {
    return false;
  }

  if ((proto = Object.getPrototypeOf(a), proto == null || proto === OBJP) && (proto = Object.getPrototypeOf(b), proto == null || proto === OBJP)) {
    return !(a.__diff === false || b.__diff === false) && (0, _equiv2.equivObject)(a, b, equiv);
  }

  if (typeof a !== FN && a.length !== undefined && typeof b !== FN && b.length !== undefined) {
    return (0, _equiv2.equivArrayLike)(a, b, equiv);
  }

  if (a instanceof Set && b instanceof Set) {
    return (0, _equiv2.equivSet)(a, b, equiv);
  }

  if (a instanceof Map && b instanceof Map) {
    return (0, _equiv2.equivMap)(a, b, equiv);
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  } // NaN


  return a !== a && b !== b;
};

exports.equiv = equiv;
},{"@thi.ng/api":"../node_modules/@thi.ng/api/index.js","@thi.ng/diff":"../node_modules/@thi.ng/diff/index.js","@thi.ng/equiv":"../node_modules/@thi.ng/equiv/index.js"}],"../node_modules/@thi.ng/hiccup/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VOID_TAGS = exports.SVG_TAGS = exports.NO_SPANS = exports.COMMENT = exports.RE_ENTITY = exports.RE_TAG = exports.ENTITIES = exports.PROC_TAGS = exports.XHTML_NS = exports.XLINK_NS = exports.SVG_NS = void 0;
const SVG_NS = "http://www.w3.org/2000/svg";
exports.SVG_NS = SVG_NS;
const XLINK_NS = "http://www.w3.org/1999/xlink";
exports.XLINK_NS = XLINK_NS;
const XHTML_NS = "http://www.w3.org/1999/xhtml";
exports.XHTML_NS = XHTML_NS;
const PROC_TAGS = {
  "?xml": "?>\n",
  "!DOCTYPE": ">\n",
  "!ENTITY": ">\n",
  "!ELEMENT": ">\n",
  "!ATTLIST": ">\n"
};
exports.PROC_TAGS = PROC_TAGS;
const ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
};
exports.ENTITIES = ENTITIES;
const RE_TAG = /^([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?$/;
exports.RE_TAG = RE_TAG;
const RE_ENTITY = new RegExp(`[${Object.keys(ENTITIES).join("")}]`, "g");
exports.RE_ENTITY = RE_ENTITY;
const COMMENT = "__COMMENT__";
exports.COMMENT = COMMENT;
const NO_SPANS = {
  button: 1,
  option: 1,
  text: 1,
  textarea: 1
};
exports.NO_SPANS = NO_SPANS;

const tagMap = tags => tags.split(" ").reduce((acc, x) => (acc[x] = true, acc), {}); // tslint:disable-next-line


const SVG_TAGS = tagMap("animate animateColor animateMotion animateTransform circle clipPath color-profile defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font foreignObject g image line linearGradient marker mask metadata mpath path pattern polygon polyline radialGradient rect set stop style svg switch symbol text textPath title tref tspan use view"); // tslint:disable-next-line

exports.SVG_TAGS = SVG_TAGS;
const VOID_TAGS = tagMap("area base br circle col command ellipse embed hr img input keygen line link meta param path polygon polyline rect source stop track use wbr ?xml");
exports.VOID_TAGS = VOID_TAGS;
},{}],"../node_modules/@thi.ng/hiccup/css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = void 0;

var _checks = require("@thi.ng/checks");

const css = rules => {
  let css = "",
      v;

  for (let r in rules) {
    v = rules[r];

    if ((0, _checks.isFunction)(v)) {
      v = v(rules);
    }

    v != null && (css += `${r}:${v};`);
  }

  return css;
};

exports.css = css;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js"}],"../node_modules/@thi.ng/hiccup/deref.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.derefContext = void 0;

var _checks = require("@thi.ng/checks");

/**
 * Takes an arbitrary `ctx` object and array of `keys`. Attempts to call
 * `.deref()` on all given keys' values and stores result values instead
 * of original. Returns updated copy of `ctx` or original if `ctx` is
 * `null` or no keys were given.
 *
 * @param ctx
 * @param keys
 */
const derefContext = (ctx, keys) => {
  if (ctx == null || !keys || !keys.length) return ctx;
  const res = Object.assign({}, ctx);

  for (let k of keys) {
    const v = res[k];
    (0, _checks.implementsFunction)(v, "deref") && (res[k] = v.deref());
  }

  return res;
};

exports.derefContext = derefContext;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js"}],"../node_modules/@thi.ng/hiccup/escape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escape = void 0;

var _api = require("./api");

const escape = x => x.replace(_api.RE_ENTITY, y => _api.ENTITIES[y]);

exports.escape = escape;
},{"./api":"../node_modules/@thi.ng/hiccup/api.js"}],"../node_modules/@thi.ng/hiccup/normalize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _api = require("./api");

var _css = require("./css");

const normalize = tag => {
  let el = tag[0];
  let match;
  let id;
  let clazz;
  const hasAttribs = (0, _checks.isPlainObject)(tag[1]);
  const attribs = hasAttribs ? Object.assign({}, tag[1]) : {};

  if (!(0, _checks.isString)(el) || !(match = _api.RE_TAG.exec(el))) {
    (0, _errors.illegalArgs)(`"${el}" is not a valid tag name`);
  }

  el = match[1];
  id = match[2];
  clazz = match[3];

  if (id) {
    attribs.id = id;
  }

  if (clazz) {
    clazz = clazz.replace(/\./g, " ");

    if (attribs.class) {
      attribs.class += " " + clazz;
    } else {
      attribs.class = clazz;
    }
  }

  if (tag.length > 1) {
    if ((0, _checks.isPlainObject)(attribs.style)) {
      attribs.style = (0, _css.css)(attribs.style);
    }

    tag = tag.slice(hasAttribs ? 2 : 1).filter(x => x != null);

    if (tag.length > 0) {
      return [el, attribs, tag];
    }
  }

  return [el, attribs];
};

exports.normalize = normalize;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./api":"../node_modules/@thi.ng/hiccup/api.js","./css":"../node_modules/@thi.ng/hiccup/css.js"}],"../node_modules/@thi.ng/hiccup/serialize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serialize = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _api = require("./api");

var _escape = require("./escape");

var _normalize = require("./normalize");

/**
 * Recursively normalizes and serializes given tree as HTML/SVG/XML
 * string. Expands any embedded component functions with their results.
 * Each node of the input tree can have one of the following input
 * forms:
 *
 * ```js
 * ["tag", ...]
 * ["tag#id.class1.class2", ...]
 * ["tag", {other: "attrib"}, ...]
 * ["tag", {...}, "body", function, ...]
 * [function, arg1, arg2, ...]
 * [{render: (ctx,...) => [...]}, args...]
 * iterable
 * ```
 *
 * Tags can be defined in "Zencoding" convention, e.g.
 *
 * ```js
 * ["div#foo.bar.baz", "hi"] // <div id="foo" class="bar baz">hi</div>
 * ```
 *
 * The presence of the attributes object (2nd array index) is optional.
 * Any attribute values, incl. functions are allowed. If the latter, the
 * function is called with the full attribs object as argument and the
 * return value is used for the attribute. This allows for the dynamic
 * creation of attrib values based on other attribs. The only exception
 * to this are event attributes, i.e. attribute names starting with
 * "on". Function values assigned to event attributes will be omitted
 * from the output.
 *
 * ```js
 * ["div#foo", { bar: (attribs) => attribs.id + "-bar" }]
 * // <div id="foo" bar="foo-bar"></div>
 * ```
 *
 * The `style` attribute can ONLY be defined as string or object.
 *
 * ```js
 * ["div", {style: {color: "red", background: "#000"}}]
 * // <div style="color:red;background:#000;"></div>
 * ```
 *
 * Boolean attribs are serialized in HTML5 syntax (present or not).
 * `null`, `undefined` or empty string attrib values are ignored.
 *
 * Any `null` or `undefined` array values (other than in head position)
 * will also be removed, unless a function is in head position.
 *
 * A function in head position of a node acts as a mechanism for
 * component composition & delayed execution. The function will only be
 * executed at serialization time. In this case the optional global
 * context object and all other elements of that node / array are passed
 * as arguments when that function is called. The return value the
 * function MUST be a valid new tree (or `undefined`).
 *
 * If the `ctx` object it'll be passed to each embedded component fns.
 * Optionally call `derefContext()` prior to `serialize()` to auto-deref
 * context keys with values implementing the thi.ng/api `IDeref`
 * interface.
 *
 * ```js
 * const foo = (ctx, a, b) => ["div#" + a, ctx.foo, b];
 *
 * serialize([foo, "id", "body"], { foo: { class: "black" } })
 * // <div id="id" class="black">body</div>
 * ```
 *
 * Functions located in other positions are called ONLY with the global
 * context arg and can return any (serializable) value (i.e. new trees,
 * strings, numbers, iterables or any type with a suitable
 * `.toString()`, `.toHiccup()` or `.deref()` implementation).
 *
 * If the optional `span` flag is true (default: false), all text
 * content will be wrapped in <span> elements (this is to ensure DOM
 * compatibility with hdom). The only elements for spans are never
 * created are listed in `NO_SPANS` in `api.ts`.
 *
 * If the optional `keys` flag is true (default: false), all elements
 * will have an autogenerated `key` attribute injected. If `span` is
 * enabled, `keys` will be enabled by default too (since in this case we
 * assume the output is meant to be compatible with @thi.ng/hdom).
 *
 * hiccup & hdom control attributes (i.e. attrib names prefixed with
 * `__`) will be omitted from the output. The only control attrib
 * supported by this package is `__serialize`. If set to `false`, the
 * entire tree branch will be excluded from the output.
 *
 * Single or multiline comments can be included using the special
 * `COMMENT` tag (`__COMMENT__`) (always WITHOUT attributes!).
 *
 * ```
 * [COMMENT, "Hello world"]
 * // <!-- Hello world -->
 *
 * [COMMENT, "Hello", "world"]
 * <!--
 *     Hello
 *     world
 * -->
 * ```
 *
 * Currently, the only processing / DTD instructions supported are:
 *
 * - `?xml`
 * - `!DOCTYTPE`
 * - `!ELEMENT`
 * - `!ENTITY`
 * - `!ATTLIST`
 *
 * These are used as follows (attribs are only allowed for `?xml`, all
 * others only accept a body string which is taken as is):
 *
 * ```
 * ["?xml", { version: "1.0", standalone: "yes" }]
 * // <?xml version="1.0" standalone="yes"?>
 *
 * ["!DOCTYPE", "html"]
 * // <!DOCTYPE html>
 * ```
 *
 * @param tree hiccup elements / component tree
 * @param ctx arbitrary user context object
 * @param escape auto-escape entities
 * @param span use spans for text content
 * @param keys attach key attribs
 */
const serialize = (tree, ctx, escape = false, span = false, keys = span, path = [0]) => _serialize(tree, ctx, escape, span, keys, path);

exports.serialize = serialize;

const _serialize = (tree, ctx, esc, span, keys, path) => {
  if (tree == null) {
    return "";
  }

  if (Array.isArray(tree)) {
    return serializeElement(tree, ctx, esc, span, keys, path);
  }

  if ((0, _checks.isFunction)(tree)) {
    return _serialize(tree(ctx), ctx, esc, span, keys, path);
  }

  if ((0, _checks.implementsFunction)(tree, "toHiccup")) {
    return _serialize(tree.toHiccup(ctx), ctx, esc, span, keys, path);
  }

  if ((0, _checks.implementsFunction)(tree, "deref")) {
    return _serialize(tree.deref(), ctx, esc, span, keys, path);
  }

  if ((0, _checks.isNotStringAndIterable)(tree)) {
    return serializeIter(tree, ctx, esc, span, keys, path);
  }

  tree = esc ? (0, _escape.escape)(tree.toString()) : tree;
  return span ? `<span${keys ? ` key="${path.join("-")}"` : ""}>${tree}</span>` : tree;
};

const serializeElement = (tree, ctx, esc, span, keys, path) => {
  if (!tree.length) {
    return "";
  }

  let tag = tree[0];

  if ((0, _checks.isFunction)(tag)) {
    return _serialize(tag.apply(null, [ctx, ...tree.slice(1)]), ctx, esc, span, keys, path);
  }

  if ((0, _checks.implementsFunction)(tag, "render")) {
    return _serialize(tag.render.apply(null, [ctx, ...tree.slice(1)]), ctx, esc, span, keys, path);
  }

  if (tag === _api.COMMENT) {
    return serializeComment(tree);
  }

  if ((0, _checks.isString)(tag)) {
    tree = (0, _normalize.normalize)(tree);
    tag = tree[0];
    const attribs = tree[1];

    if (attribs.__skip || attribs.__serialize === false) {
      return "";
    }

    let body = tree[2];
    let res = `<${tag}`;
    keys && attribs.key === undefined && (attribs.key = path.join("-"));
    res += serializeAttribs(attribs, esc);
    res += body ? serializeBody(tag, body, ctx, esc, span, keys, path) : !_api.VOID_TAGS[tag] ? `></${tag}>` : _api.PROC_TAGS[tag] || "/>";
    return res;
  }

  if ((0, _checks.isNotStringAndIterable)(tree)) {
    return serializeIter(tree, ctx, esc, span, keys, path);
  }

  return (0, _errors.illegalArgs)(`invalid tree node: ${tree}`);
};

const serializeAttribs = (attribs, esc) => {
  let res = "";

  for (let a in attribs) {
    if (a.startsWith("__")) continue;
    let v = attribs[a];
    if (v == null) continue;
    if ((0, _checks.isFunction)(v) && (/^on\w+/.test(a) || (v = v(attribs)) == null)) continue;

    if (v === true) {
      res += " " + a;
    } else if (v !== false) {
      v = v.toString();
      v.length && (res += ` ${a}="${esc ? (0, _escape.escape)(v) : v}"`);
    }
  }

  return res;
};

const serializeBody = (tag, body, ctx, esc, span, keys, path) => {
  if (_api.VOID_TAGS[tag]) {
    (0, _errors.illegalArgs)(`No body allowed in tag: ${tag}`);
  }

  const proc = _api.PROC_TAGS[tag];
  let res = proc ? " " : ">";
  span = span && !proc && !_api.NO_SPANS[tag];

  for (let i = 0, n = body.length; i < n; i++) {
    res += _serialize(body[i], ctx, esc, span, keys, [...path, i]);
  }

  return res + (proc || `</${tag}>`);
};

const serializeComment = tree => tree.length > 2 ? `\n<!--\n${tree.slice(1).map(x => "    " + x).join("\n")}\n-->\n` : `\n<!-- ${tree[1]} -->\n`;

const serializeIter = (iter, ctx, esc, span, keys, path) => {
  const res = [];
  const p = path.slice(0, path.length - 1);
  let k = 0;

  for (let i of iter) {
    res.push(_serialize(i, ctx, esc, span, keys, [...p, k++]));
  }

  return res.join("");
};
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","./api":"../node_modules/@thi.ng/hiccup/api.js","./escape":"../node_modules/@thi.ng/hiccup/escape.js","./normalize":"../node_modules/@thi.ng/hiccup/normalize.js"}],"../node_modules/@thi.ng/hiccup/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _css = require("./css");

Object.keys(_css).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _css[key];
    }
  });
});

var _deref = require("./deref");

Object.keys(_deref).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deref[key];
    }
  });
});

var _escape = require("./escape");

Object.keys(_escape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _escape[key];
    }
  });
});

var _normalize = require("./normalize");

Object.keys(_normalize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _normalize[key];
    }
  });
});

var _serialize = require("./serialize");

Object.keys(_serialize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _serialize[key];
    }
  });
});
},{"./api":"../node_modules/@thi.ng/hiccup/api.js","./css":"../node_modules/@thi.ng/hiccup/css.js","./deref":"../node_modules/@thi.ng/hiccup/deref.js","./escape":"../node_modules/@thi.ng/hiccup/escape.js","./normalize":"../node_modules/@thi.ng/hiccup/normalize.js","./serialize":"../node_modules/@thi.ng/hiccup/serialize.js"}],"../node_modules/@thi.ng/hdom/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeChild = exports.clearDOM = exports.removeListener = exports.setListener = exports.setStyle = exports.removeAttribs = exports.updateValueAttrib = exports.setAttrib = exports.setAttribs = exports.setContent = exports.cloneWithNewAttribs = exports.replaceChild = exports.getChild = exports.addChild = exports.createTextElement = exports.createElement = exports.hydrateTree = exports.createTree = void 0;

var _checks = require("@thi.ng/checks");

var _hiccup = require("@thi.ng/hiccup");

const isArray = _checks.isArray;
const isNotStringAndIterable = _checks.isNotStringAndIterable;

const maybeInitElement = (el, tree) => tree.__init && tree.__init.apply(tree.__this, [el, ...tree.__args]);
/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param parent
 * @param tree
 * @param insert
 */


const createTree = (opts, impl, parent, tree, insert, init = true) => {
  if (isArray(tree)) {
    const tag = tree[0];

    if (typeof tag === "function") {
      return createTree(opts, impl, parent, tag.apply(null, [opts.ctx, ...tree.slice(1)]), insert);
    }

    const attribs = tree[1];

    if (attribs.__impl) {
      return attribs.__impl.createTree(opts, parent, tree, insert, init);
    }

    const el = impl.createElement(parent, tag, attribs, insert);

    if (tree.length > 2) {
      const n = tree.length;

      for (let i = 2; i < n; i++) {
        createTree(opts, impl, el, tree[i], undefined, init);
      }
    }

    init && maybeInitElement(el, tree);
    return el;
  }

  if (isNotStringAndIterable(tree)) {
    const res = [];

    for (let t of tree) {
      res.push(createTree(opts, impl, parent, t, insert, init));
    }

    return res;
  }

  if (tree == null) {
    return parent;
  }

  return impl.createTextElement(parent, tree);
};
/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param parent
 * @param tree
 * @param index
 */


exports.createTree = createTree;

const hydrateTree = (opts, impl, parent, tree, index = 0) => {
  if (isArray(tree)) {
    const el = impl.getChild(parent, index);

    if (typeof tree[0] === "function") {
      hydrateTree(opts, impl, parent, tree[0].apply(null, [opts.ctx, ...tree.slice(1)]), index);
    }

    const attribs = tree[1];

    if (attribs.__impl) {
      return attribs.__impl.hydrateTree(opts, parent, tree, index);
    }

    maybeInitElement(el, tree);

    for (let a in attribs) {
      a.indexOf("on") === 0 && impl.setAttrib(el, a, attribs[a]);
    }

    for (let n = tree.length, i = 2; i < n; i++) {
      hydrateTree(opts, impl, el, tree[i], i - 2);
    }
  } else if (isNotStringAndIterable(tree)) {
    for (let t of tree) {
      hydrateTree(opts, impl, parent, t, index);
      index++;
    }
  }
};
/**
 * Creates a new DOM element of type `tag` with optional `attribs`. If
 * `parent` is not `null`, the new element will be inserted as child at
 * given `insert` index. If `insert` is missing, the element will be
 * appended to the `parent`'s list of children. Returns new DOM node.
 *
 * If `tag` is a known SVG element name, the new element will be created
 * with the proper SVG XML namespace.
 *
 * @param parent
 * @param tag
 * @param attribs
 * @param insert
 */


exports.hydrateTree = hydrateTree;

const createElement = (parent, tag, attribs, insert) => {
  const el = _hiccup.SVG_TAGS[tag] ? document.createElementNS(_hiccup.SVG_NS, tag) : document.createElement(tag);
  attribs && setAttribs(el, attribs);
  return addChild(parent, el, insert);
};

exports.createElement = createElement;

const createTextElement = (parent, content, insert) => addChild(parent, document.createTextNode(content), insert);

exports.createTextElement = createTextElement;

const addChild = (parent, child, insert) => parent ? insert === undefined ? parent.appendChild(child) : parent.insertBefore(child, parent.children[insert]) : child;

exports.addChild = addChild;

const getChild = (parent, child) => parent.children[child];

exports.getChild = getChild;

const replaceChild = (opts, impl, parent, child, tree, init = true) => (impl.removeChild(parent, child), impl.createTree(opts, parent, tree, child, init));

exports.replaceChild = replaceChild;

const cloneWithNewAttribs = (el, attribs) => {
  const res = el.cloneNode(true);
  setAttribs(res, attribs);
  el.parentNode.replaceChild(res, el);
  return res;
};

exports.cloneWithNewAttribs = cloneWithNewAttribs;

const setContent = (el, body) => el.textContent = body;

exports.setContent = setContent;

const setAttribs = (el, attribs) => {
  for (let k in attribs) {
    setAttrib(el, k, attribs[k], attribs);
  }

  return el;
};
/**
 * Sets a single attribute on given element. If attrib name is NOT an
 * event name (prefix: "on") and its value is a function, it is called
 * with given `attribs` object (usually the full attrib object passed to
 * `setAttribs`) and the function's return value is used as the actual
 * attrib value.
 *
 * Special rules apply for certain attributes:
 *
 * - "style": delegated to `setStyle()`
 * - "value": delegated to `updateValueAttrib()`
 * - attrib IDs starting with "on" are treated as event listeners
 *
 * If the given (or computed) attrib value is `false` or `undefined` the
 * attrib is removed from the element.
 *
 * @param el
 * @param id
 * @param val
 * @param attribs
 */


exports.setAttribs = setAttribs;

const setAttrib = (el, id, val, attribs) => {
  if (id.startsWith("__")) return;
  const isListener = id.indexOf("on") === 0;

  if (!isListener && typeof val === "function") {
    val = val(attribs);
  }

  if (val !== undefined && val !== false) {
    switch (id) {
      case "style":
        setStyle(el, val);
        break;

      case "value":
        updateValueAttrib(el, val);
        break;

      case "accesskey":
        el.accessKey = val;
        break;

      case "contenteditable":
        el.contentEditable = val;
        break;

      case "tabindex":
        el.tabIndex = val;
        break;

      case "align":
      case "autocapitalize":
      case "checked":
      case "dir":
      case "draggable":
      case "hidden":
      case "id":
      case "lang":
      case "namespaceURI":
      case "scrollTop":
      case "scrollLeft":
      case "title":
        // TODO add more properties / enumerated attribs?
        el[id] = val;
        break;

      default:
        isListener ? setListener(el, id.substr(2), val) : el.setAttribute(id, val === true ? "" : val);
    }
  } else {
    el[id] != null ? el[id] = null : el.removeAttribute(id);
  }

  return el;
};
/**
 * Updates an element's `value` property. For form elements it too
 * ensures the edit cursor retains its position.
 *
 * @param el
 * @param v
 */


exports.setAttrib = setAttrib;

const updateValueAttrib = (el, v) => {
  let ev;

  switch (el.type) {
    case "text":
    case "textarea":
    case "password":
    case "search":
    case "number":
    case "email":
    case "url":
    case "tel":
    case "date":
    case "datetime-local":
    case "time":
    case "week":
    case "month":
      if ((ev = el.value) !== undefined && typeof v === "string") {
        const off = v.length - (ev.length - (el.selectionStart || 0));
        el.value = v;
        el.selectionStart = el.selectionEnd = off;
        break;
      }

    default:
      el.value = v;
  }
};

exports.updateValueAttrib = updateValueAttrib;

const removeAttribs = (el, attribs, prev) => {
  for (let i = attribs.length; --i >= 0;) {
    const a = attribs[i];

    if (a.indexOf("on") === 0) {
      removeListener(el, a.substr(2), prev[a]);
    } else {
      el.hasAttribute(a) ? el.removeAttribute(a) : el[a] = null;
    }
  }
};

exports.removeAttribs = removeAttribs;

const setStyle = (el, styles) => (el.setAttribute("style", (0, _hiccup.css)(styles)), el);
/**
 * Adds event listener (possibly with options).
 *
 * @param el
 * @param id event name (w/o `on` prefix)
 * @param listener
 */


exports.setStyle = setStyle;

const setListener = (el, id, listener) => isArray(listener) ? el.addEventListener(id, ...listener) : el.addEventListener(id, listener);
/**
 * Removes event listener (possibly with options).
 *
 * @param el
 * @param id event name (w/o `on` prefix)
 * @param listener
 */


exports.setListener = setListener;

const removeListener = (el, id, listener) => isArray(listener) ? el.removeEventListener(id, ...listener) : el.removeEventListener(id, listener);

exports.removeListener = removeListener;

const clearDOM = el => el.innerHTML = "";

exports.clearDOM = clearDOM;

const removeChild = (parent, childIdx) => {
  const n = parent.children[childIdx];
  n !== undefined && parent.removeChild(n);
};

exports.removeChild = removeChild;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/hiccup":"../node_modules/@thi.ng/hiccup/index.js"}],"../node_modules/@thi.ng/hdom/normalize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeTree = exports.normalizeElement = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _hiccup = require("@thi.ng/hiccup");

const isArray = _checks.isArray;
const isNotStringAndIterable = _checks.isNotStringAndIterable;
const isPlainObject = _checks.isPlainObject;
/**
 * Expands single hiccup element/component into its canonical form:
 *
 * ```
 * [tagname, {attribs}, ...children]
 * ```
 *
 * Emmet-style ID and class names in the original tagname are moved into
 * the attribs object, e.g.:
 *
 * ```
 * ["div#foo.bar.baz"] => ["div", {id: "foo", class: "bar baz"}]
 * ```
 *
 * If both Emmet-style classes AND a `class` attrib exists, the former
 * are appended to the latter:
 *
 * ```
 * ["div.bar.baz", {class: "foo"}] => ["div", {class: "foo bar baz"}]
 * ```
 *
 * Elements with `__skip` attrib enabled and no children, will have an
 * empty text child element injected.
 *
 * @param spec
 * @param keys
 */

const normalizeElement = (spec, keys) => {
  let tag = spec[0];
  let hasAttribs = isPlainObject(spec[1]);
  let match;
  let mtag;
  let id;
  let clazz;
  let attribs;

  if (typeof tag !== "string" || !(match = _hiccup.RE_TAG.exec(tag))) {
    (0, _errors.illegalArgs)(`${tag} is not a valid tag name`);
  }

  mtag = match[1]; // return orig if already normalized and satisfies key requirement

  if (tag === mtag && hasAttribs && (!keys || spec[1].key)) {
    return spec;
  }

  attribs = hasAttribs ? Object.assign({}, spec[1]) : {};
  id = match[2];
  clazz = match[3];

  if (id) {
    attribs.id = id;
  }

  if (clazz) {
    clazz = clazz.replace(/\./g, " ");

    if (attribs.class) {
      attribs.class += " " + clazz;
    } else {
      attribs.class = clazz;
    }
  }

  return attribs.__skip && spec.length < 3 ? [mtag, attribs] : [mtag, attribs, ...spec.slice(hasAttribs ? 2 : 1)];
};
/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param tree
 */


exports.normalizeElement = normalizeElement;

const normalizeTree = (opts, tree) => _normalizeTree(tree, opts, opts.ctx, [0], opts.keys !== false, opts.span !== false);

exports.normalizeTree = normalizeTree;

const _normalizeTree = (tree, opts, ctx, path, keys, span) => {
  if (tree == null) {
    return;
  }

  if (isArray(tree)) {
    if (tree.length === 0) {
      return;
    }

    let norm,
        nattribs = tree[1],
        impl; // if available, use branch-local normalize implementation

    if (nattribs && (impl = nattribs.__impl) && (impl = impl.normalizeTree)) {
      return impl(opts, tree);
    }

    const tag = tree[0]; // use result of function call
    // pass ctx as first arg and remaining array elements as rest args

    if (typeof tag === "function") {
      return _normalizeTree(tag.apply(null, [ctx, ...tree.slice(1)]), opts, ctx, path, keys, span);
    } // component object w/ life cycle methods
    // (render() is the only required hook)


    if (typeof tag.render === "function") {
      const args = [ctx, ...tree.slice(1)];
      norm = _normalizeTree(tag.render.apply(tag, args), opts, ctx, path, keys, span);

      if (isArray(norm)) {
        norm.__this = tag;
        norm.__init = tag.init;
        norm.__release = tag.release;
        norm.__args = args;
      }

      return norm;
    }

    norm = normalizeElement(tree, keys);
    nattribs = norm[1];

    if (nattribs.__normalize === false) {
      return norm;
    }

    if (keys && nattribs.key === undefined) {
      nattribs.key = path.join("-");
    }

    if (norm.length > 2) {
      const tag = norm[0];
      const res = [tag, nattribs];
      span = span && !_hiccup.NO_SPANS[tag];

      for (let i = 2, j = 2, k = 0, n = norm.length; i < n; i++) {
        let el = norm[i];

        if (el != null) {
          const isarray = isArray(el);

          if (isarray && isArray(el[0]) || !isarray && isNotStringAndIterable(el)) {
            for (let c of el) {
              c = _normalizeTree(c, opts, ctx, path.concat(k), keys, span);

              if (c !== undefined) {
                res[j++] = c;
              }

              k++;
            }
          } else {
            el = _normalizeTree(el, opts, ctx, path.concat(k), keys, span);

            if (el !== undefined) {
              res[j++] = el;
            }

            k++;
          }
        }
      }

      return res;
    }

    return norm;
  }

  if (typeof tree === "function") {
    return _normalizeTree(tree(ctx), opts, ctx, path, keys, span);
  }

  if (typeof tree.toHiccup === "function") {
    return _normalizeTree(tree.toHiccup(opts.ctx), opts, ctx, path, keys, span);
  }

  if (typeof tree.deref === "function") {
    return _normalizeTree(tree.deref(), opts, ctx, path, keys, span);
  }

  return span ? ["span", keys ? {
    key: path.join("-")
  } : {}, tree.toString()] : tree.toString();
};
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"../node_modules/@thi.ng/errors/index.js","@thi.ng/hiccup":"../node_modules/@thi.ng/hiccup/index.js"}],"../node_modules/@thi.ng/hdom/default.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_IMPL = void 0;

var _diff = require("./diff");

var _dom = require("./dom");

var _normalize = require("./normalize");

/**
 * Default target implementation to manipulate browser DOM.
 */
const DEFAULT_IMPL = {
  createTree(opts, parent, tree, child, init) {
    return (0, _dom.createTree)(opts, this, parent, tree, child, init);
  },

  hydrateTree(opts, parent, tree, child) {
    return (0, _dom.hydrateTree)(opts, this, parent, tree, child);
  },

  diffTree(opts, parent, prev, curr, child) {
    (0, _diff.diffTree)(opts, this, parent, prev, curr, child);
  },

  normalizeTree: _normalize.normalizeTree,

  getElementById(id) {
    return document.getElementById(id);
  },

  getChild: _dom.getChild,
  createElement: _dom.createElement,
  createTextElement: _dom.createTextElement,

  replaceChild(opts, parent, child, tree, init) {
    (0, _dom.replaceChild)(opts, this, parent, child, tree, init);
  },

  removeChild: _dom.removeChild,
  setContent: _dom.setContent,
  removeAttribs: _dom.removeAttribs,
  setAttrib: _dom.setAttrib
};
exports.DEFAULT_IMPL = DEFAULT_IMPL;
},{"./diff":"../node_modules/@thi.ng/hdom/diff.js","./dom":"../node_modules/@thi.ng/hdom/dom.js","./normalize":"../node_modules/@thi.ng/hdom/normalize.js"}],"../node_modules/@thi.ng/hdom/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveRoot = void 0;

var _checks = require("@thi.ng/checks");

const resolveRoot = (root, impl) => (0, _checks.isString)(root) ? impl.getElementById(root) : root;

exports.resolveRoot = resolveRoot;
},{"@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js"}],"../node_modules/@thi.ng/hdom/render-once.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderOnce = void 0;

var _hiccup = require("@thi.ng/hiccup");

var _default = require("./default");

var _utils = require("./utils");

/**
 * One-off hdom tree conversion & target DOM application. Takes same
 * options as `start()`, but performs no diffing and only creates or
 * hydrates target once. The given tree is first normalized and if
 * result is `null` or `undefined` no further action will be taken.
 *
 * @param tree
 * @param opts
 * @param impl
 */
const renderOnce = (tree, opts = {}, impl = _default.DEFAULT_IMPL) => {
  opts = Object.assign({
    root: "app"
  }, opts);
  opts.ctx = (0, _hiccup.derefContext)(opts.ctx, opts.autoDerefKeys);
  const root = (0, _utils.resolveRoot)(opts.root, impl);
  tree = impl.normalizeTree(opts, tree);
  if (!tree) return;
  opts.hydrate ? impl.hydrateTree(opts, root, tree) : impl.createTree(opts, root, tree);
};

exports.renderOnce = renderOnce;
},{"@thi.ng/hiccup":"../node_modules/@thi.ng/hiccup/index.js","./default":"../node_modules/@thi.ng/hdom/default.js","./utils":"../node_modules/@thi.ng/hdom/utils.js"}],"../node_modules/@thi.ng/hdom/start.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _hiccup = require("@thi.ng/hiccup");

var _default = require("./default");

var _utils = require("./utils");

/**
 * Takes an hiccup tree (array, function or component object w/ life
 * cycle methods) and an optional object of DOM update options. Starts
 * RAF update loop, in each iteration first normalizing given tree, then
 * computing diff to previous frame's tree and applying any changes to
 * the real DOM. The `ctx` option can be used for passing arbitrary
 * config data or state down into the hiccup component tree. Any
 * embedded component function in the tree will receive this context
 * object (shallow copy) as first argument, as will life cycle methods
 * in component objects. If the `autoDerefKeys` option is given, attempts
 * to auto-expand/deref the given keys in the user supplied context
 * object (`ctx` option) prior to *each* tree normalization. All of
 * these values should implement the thi.ng/api `IDeref` interface (e.g.
 * atoms, cursors, views, rstreams etc.). This feature can be used to
 * define dynamic contexts linked to the main app state, e.g. using
 * derived views provided by thi.ng/atom.
 *
 * **Selective updates**: No updates will be applied if the given hiccup
 * tree is `undefined` or `null` or a root component function returns no
 * value. This way a given root function can do some state handling of
 * its own and implement fail-fast checks to determine no DOM updates
 * are necessary, save effort re-creating a new hiccup tree and request
 * skipping DOM updates via this function. In this case, the previous
 * DOM tree is kept around until the root function returns a tree again,
 * which then is diffed and applied against the previous tree kept as
 * usual. Any number of frames may be skipped this way.
 *
 * **Important:** Unless the `hydrate` option is enabled, the parent
 * element given is assumed to have NO children at the time when
 * `start()` is called. Since hdom does NOT track the real DOM, the
 * resulting changes will result in potentially undefined behavior if
 * the parent element wasn't empty. Likewise, if `hydrate` is enabled,
 * it is assumed that an equivalent DOM (minus listeners) already exists
 * (i.e. generated via SSR) when `start()` is called. Any other
 * discrepancies between the pre-existing DOM and the hdom trees will
 * cause undefined behavior.
 *
 * Returns a function, which when called, immediately cancels the update
 * loop.
 *
 * @param tree hiccup DOM tree
 * @param opts options
 * @param impl hdom target implementation
 */
const start = (tree, opts = {}, impl = _default.DEFAULT_IMPL) => {
  const _opts = Object.assign({
    root: "app"
  }, opts);

  let prev = [];
  let isActive = true;
  const root = (0, _utils.resolveRoot)(_opts.root, impl);

  const update = () => {
    if (isActive) {
      _opts.ctx = (0, _hiccup.derefContext)(opts.ctx, _opts.autoDerefKeys);
      const curr = impl.normalizeTree(_opts, tree);

      if (curr != null) {
        if (_opts.hydrate) {
          impl.hydrateTree(_opts, root, curr);
          _opts.hydrate = false;
        } else {
          impl.diffTree(_opts, root, prev, curr);
        }

        prev = curr;
      } // check again in case one of the components called cancel


      isActive && requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
  return () => isActive = false;
};

exports.start = start;
},{"@thi.ng/hiccup":"../node_modules/@thi.ng/hiccup/index.js","./default":"../node_modules/@thi.ng/hdom/default.js","./utils":"../node_modules/@thi.ng/hdom/utils.js"}],"../node_modules/@thi.ng/hdom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _default = require("./default");

Object.keys(_default).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _default[key];
    }
  });
});

var _diff = require("./diff");

Object.keys(_diff).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _diff[key];
    }
  });
});

var _dom = require("./dom");

Object.keys(_dom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dom[key];
    }
  });
});

var _normalize = require("./normalize");

Object.keys(_normalize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _normalize[key];
    }
  });
});

var _renderOnce = require("./render-once");

Object.keys(_renderOnce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renderOnce[key];
    }
  });
});

var _start = require("./start");

Object.keys(_start).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _start[key];
    }
  });
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});
},{"./api":"../node_modules/@thi.ng/hdom/api.js","./default":"../node_modules/@thi.ng/hdom/default.js","./diff":"../node_modules/@thi.ng/hdom/diff.js","./dom":"../node_modules/@thi.ng/hdom/dom.js","./normalize":"../node_modules/@thi.ng/hdom/normalize.js","./render-once":"../node_modules/@thi.ng/hdom/render-once.js","./start":"../node_modules/@thi.ng/hdom/start.js","./utils":"../node_modules/@thi.ng/hdom/utils.js"}],"../node_modules/debounce/index.js":[function(require,module,exports) {
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;

},{}],"../node_modules/xtend/immutable.js":[function(require,module,exports) {
module.exports = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
  var target = {};

  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}
},{}],"../node_modules/@mapbox/scroll-restorer/util/get_window.js":[function(require,module,exports) {
// This makes window mockable in Jest tests
function getWindow() {
  return window;
}

module.exports = { getWindow: getWindow };

},{}],"../node_modules/@mapbox/scroll-restorer/index.js":[function(require,module,exports) {
'use strict';

var debounce = require('debounce');
var xtend = require('xtend');
var getWindow = require('./util/get_window').getWindow;

var removeListenerFunctions;

function end() {
  for (var i = 0, l = removeListenerFunctions.length; i < l; i++) {
    removeListenerFunctions[i]();
  }
}

function getSavedScroll(input) {
  input = input || getWindow().history;
  if (!input || !input.state) return;
  return input.state.scroll;
}

function restoreScroll(input, attemptsRemaining) {
  attemptsRemaining = attemptsRemaining == null ? 5 : attemptsRemaining;
  var savedScroll = getSavedScroll(input);
  if (!savedScroll) return;
  getWindow().requestAnimationFrame(function() {
    var savedX = savedScroll.x;
    var savedY = savedScroll.y;
    if (attemptsRemaining === 0) return;
    var pageXOffset = getWindow().pageXOffset;
    var pageYOffset = getWindow().pageYOffset;
    if (
      savedY < getWindow().document.body.scrollHeight &&
      (savedX !== pageXOffset || savedY !== pageYOffset)
    ) {
      getWindow().scrollTo(savedX, savedY);
    } else {
      restoreScroll(input, attemptsRemaining - 1);
    }
  });
}

function start(options) {
  options = xtend(
    {
      autoRestore: true,
      captureScrollDebounce: 50
    },
    options || {}
  );

  var captureScroll = debounce(function() {
    getWindow().requestAnimationFrame(function() {
      var x = getWindow().pageXOffset;
      var y = getWindow().pageYOffset;
      var historyState = getWindow().history.state;
      var savedX = historyState && historyState.scroll && historyState.scroll.x;
      var savedY = historyState && historyState.scroll && historyState.scroll.y;
      if (savedX !== x || savedY !== y) {
        var nextHistoryState = xtend(historyState, {
          scroll: { x: x, y: y }
        });
        getWindow().history.replaceState(
          nextHistoryState,
          null,
          getWindow().location
        );
      }
    });
  }, options.captureScrollDebounce);

  // cf. https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
  if ('scrollRestoration' in getWindow().history) {
    getWindow().history.scrollRestoration = 'manual';
  }

  // Scroll positions are saved into the history entry's state; then when that
  // the history changes (the popstate event), we try restoring any saved
  // scroll position.

  getWindow().addEventListener('scroll', captureScroll, { passive: true });
  if (options.autoRestore) {
    getWindow().addEventListener('popstate', restoreScroll);
  }

  removeListenerFunctions = [
    function() {
      getWindow().removeEventListener('scroll', captureScroll, {
        passive: true
      });
    }
  ];
  if (options.autoRestore) {
    removeListenerFunctions.push(function() {
      getWindow().removeEventListener('popstate', restoreScroll);
    });
  }
}

module.exports = {
  start: start,
  end: end,
  restoreScroll: restoreScroll,
  getSavedScroll: getSavedScroll
};

},{"debounce":"../node_modules/debounce/index.js","xtend":"../node_modules/xtend/immutable.js","./util/get_window":"../node_modules/@mapbox/scroll-restorer/util/get_window.js"}],"nav.js":[function(require,module,exports) {
"use strict";

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _src = require("../src");

var _paths = require("@thi.ng/paths");

var _checks = require("@thi.ng/checks");

var _atom = require("@thi.ng/atom");

var _hdom = require("@thi.ng/hdom");

var _associative = require("@thi.ng/associative");

var _scrollRestorer = _interopRequireDefault(require("@mapbox/scroll-restorer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context22; (0, _forEach.default)(_context22 = ownKeys(Object(source), true)).call(_context22, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context23; (0, _forEach.default)(_context23 = ownKeys(Object(source))).call(_context23, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

_scrollRestorer.default.start();
/**
 *
 * Note for Parcel (package.json):
 *
 * TRY PARCEL 2.alpha
 *
 */
// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .


var run$ = _src.streams.run$,
    command$ = _src.streams.command$;
var registerRouterDOM = _src.register.registerRouterDOM;
var emitHREF = _src.commands.emitHREF;
var parse_URL = _src.utils.parse_URL,
    traceStream = _src.utils.traceStream,
    FLIP = _src.utils.FLIP,
    FLIP_last_invert_play = _src.utils.FLIP_last_invert_play,
    FLIP_last = _src.utils.FLIP_last,
    FLIP_first = _src.utils.FLIP_first;
var $routePath$ = _src.store.$routePath$,
    $store$ = _src.store.$store$,
    set$Root = _src.store.set$Root; // ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
//
//    d8
//  _d88__ 888-~\   /~~~8e   e88~~\  e88~~8e
//   888   888          88b d888    d888  88b
//   888   888     e88~-888 8888    8888__888
//   888   888    C888  888 Y888    Y888    ,
//   "88_/ 888     "88_-888  "88__/  "88___/
//
//
// traceStream("run$ ->", run$)
// traceStream("command$ ->", command$)
// traceStream("task$ ->", task$)
// traceStream("out$ ->", out$)
// traceStream("navigated$ ->", DOMnavigated$)
//
//                             d8
//  888-~\  e88~-_  888  888 _d88__  e88~~8e  888-~\
//  888    d888   i 888  888  888   d888  88b 888
//  888    8888   | 888  888  888   8888__888 888
//  888    Y888   ' 888  888  888   Y888    , 888
//  888     "88_-~  "88_-888  "88_/  "88___/  888
//
//

var getSomeJSON =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(path, b) {
    var _context, _context2;

    var text_base, img_base, data;
    return _regenerator.default.wrap(function _callee2$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            text_base = "https://jsonplaceholder.typicode.com/";

            img_base = function img_base(id) {
              return "https://i.picsum.photos/id/".concat(id, "/600/600.jpg");
            };

            if (!b) {
              _context5.next = 10;
              break;
            }

            _context5.t1 = img_base(b);
            _context5.next = 6;
            return fetch((0, _concat.default)(_context = (0, _concat.default)(_context2 = "".concat(text_base)).call(_context2, path, "/")).call(_context, b)).then(function (r) {
              return r.json();
            });

          case 6:
            _context5.t2 = _context5.sent;
            _context5.t0 = {
              img: _context5.t1,
              text: _context5.t2
            };
            _context5.next = 11;
            break;

          case 10:
            _context5.t0 = (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee() {
              var _context3;

              var list;
              return _regenerator.default.wrap(function _callee$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return fetch((0, _concat.default)(_context3 = "".concat(text_base)).call(_context3, path, "/")).then(function (r) {
                        return r.json();
                      });

                    case 2:
                      list = _context4.sent;
                      return _context4.abrupt("return", (0, _map.default)(list).call(list, function (c, i) {
                        return {
                          img: img_base(i + 1),
                          text: c
                        };
                      }));

                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee);
            }))();

          case 11:
            data = _context5.t0;
            return _context5.abrupt("return", data);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee2);
  }));

  return function getSomeJSON(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * You know, this API warrants a little bit of a story. I
 * began the process of abstracting this part of the API
 * away from the user, thinking that there were too many
 * "implementation details" exposed. This scared me a little
 * because I really want the most simple API for me and the
 * potential future users of the framework.
 *
 * However, after creating some prototypes for this API, I
 * began to realize something. That this API, though it
 * exposes the underlying dependency of `EquivMap` from
 * `@thi.ng/associative`, is as beautiful as it gets. It's
 * what the JavaScript Map should have been and I wanted the
 * users to not only see that beauty, but also get a sense
 * of the potential of __pattern matching__ in JS, so they
 * could take it with them to put up against related
 * problems.
 *
 * Value semantics have so many benefits. As a router,
 * here's one.
 */


var router =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(url) {
    var match, URL_path, _URL_path, p_b, _ref4, data, page;

    return _regenerator.default.wrap(function _callee3$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            match = parse_URL(url);
            URL_path = match.URL_path;
            _URL_path = (0, _slicedToArray2.default)(URL_path, 2), p_b = _URL_path[1];
            _ref4 = new _associative.EquivMap([[_objectSpread({}, match, {
              URL_path: ["todos"]
            }), {
              data: function data() {
                return getSomeJSON("todos");
              },
              page: "todos"
            }], [_objectSpread({}, match, {
              URL_path: ["todos", p_b]
            }), {
              data: function data() {
                return getSomeJSON("todos", p_b);
              },
              page: "todo"
            }], [_objectSpread({}, match, {
              URL_path: ["users"]
            }), {
              data: function data() {
                return getSomeJSON("users");
              },
              page: "users"
            }], [_objectSpread({}, match, {
              URL_path: ["users", p_b]
            }), {
              data: function data() {
                return getSomeJSON("users", p_b);
              },
              page: "user"
            }]]).get(match) || {
              data: function data() {
                return {
                  home: "page"
                };
              },
              page: "bloop"
            }, data = _ref4.data, page = _ref4.page; // should probably be a 404... also need a match for an empty path: []
            // console.log("router called", { page, data: await data() })

            _context6.t0 = page;
            _context6.next = 7;
            return data();

          case 7:
            _context6.t1 = _context6.sent;
            return _context6.abrupt("return", {
              page: _context6.t0,
              data: _context6.t1
            });

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee3);
  }));

  return function router(_x3) {
    return _ref3.apply(this, arguments);
  };
}(); //
//  888   | 888
//  888   | 888
//  888   | 888
//  888   | 888
//  Y88   | 888
//   "8__/  888
//
//
// const S = JSON.stringify


var pathLink = function pathLink(ctx, id) {
  var _context7, _context8;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return (0, _concat.default)(_context7 = ["a", {
    href: (0, _concat.default)(_context8 = "".concat($routePath$.deref(), "/")).call(_context8, id),
    onclick: function onclick(e) {
      return emitHREF(e);
    }
  }]).call(_context7, args);
};

var field = function field(ctx, key, val) {
  var _context9, _context10;

  return ["li", {
    style: {
      display: "flex"
    }
  }, key === "id" ? [pathLink, val, val] : ["p", {
    style: {
      padding: "0 0.5rem"
    }
  }, key], (0, _checks.isObject)(val) ? (0, _concat.default)(_context9 = ["ul"]).call(_context9, (0, _toConsumableArray2.default)((0, _map.default)(_context10 = (0, _entries.default)(val)).call(_context10, function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];

    return [field, k, v];
  }))) : ["p", {
    style: {
      padding: "0 0.5rem"
    }
  }, val]];
};

var fields = function fields(payload) {
  var _context11, _context12, _context13;

  return (0, _concat.default)(_context11 = ["ul"]).call(_context11, (0, _toConsumableArray2.default)((0, _map.default)(_context12 = (0, _slice.default)(_context13 = (0, _entries.default)(payload)).call(_context13, 0, 4)).call(_context12, function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
        k = _ref8[0],
        v = _ref8[1];

    return [field, k, v];
  })));
};

var image = function image(ctx, img) {
  return ["img", {
    src: "https://via.placeholder.com/400x400.png",
    style: {
      "object-fit": "cover",
      "object-position": "center",
      "min-height": "100%",
      "min-width": "100%"
    },
    scale: false
  }];
};

var FLIP_img = {
  init: function init(el, _ref9, uid) {
    var $store$ = _ref9.$store$;
    return FLIP(el, $store$, uid);
  },
  render: function render(ctx, img) {
    return [image, img];
  }
};

var div = function div(ctx, attrs, img, sz) {
  var _context14;

  for (var _len2 = arguments.length, args = new Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
    args[_key2 - 4] = arguments[_key2];
  }

  return (0, _concat.default)(_context14 = ["img", _objectSpread({}, attrs, {
    src: img,
    style: sz === "sm" ? {
      height: "100px",
      width: "100px",
      overflow: "hidden" // "background-image": `url('${img}')`
      // "background-size": "cover"

    } : {
      height: "600px",
      width: "600px",
      overflow: "hidden" // "background-image": `url('${img}')`
      // "background-size": "cover"

    },
    scale: true
  })]).call(_context14, args);
}; // const FLIP_div = {
//   init: (el, { $store$, run$ }, img) => FLIP(el, $store$, img + "_div"),
//   render: (ctx, img, ...args) => [div, {}, img, ...args]
// }
// 📌 handle second image appearance... only working on click...

/**
 * There're only 3 lifecycle hooks. render is called for
 * every update and is just providing the actual hiccup for
 * that component. if that component is used the first time,
 * the order is normalizeTree ->  render -> diff ->  init.
 * The actual DOM element is only known when init is called,
 * NEVER during render (though you could cache it as local
 * component state). If during diffing it turns out the
 * component is not used anymore, then release will be
 * called
 *
 * if the object identity of your life cycle component
 * changes with every update then that count as full
 * replacement and would trigger init each time:
 *
 * https://github.com/thi-ng/umbrella/wiki/Higher-order-components
 *
 * init is called in so called "post-order", i.e. when it
 * executes all children are already present in the DOM (and
 * might have had their init hooks called) first time = 1st
 * frame the component appears in the DOM
 *
 */
// const FLIP_div = {
//   render: ({ run$ }, img, sz) => [
//     "a",
//     {
//       href: `${$routePath$.deref()}/${/id\/(\d+)/g.exec(img)[1]}`,
//       onclick: ev => {
//         console.log({ store: $store$.deref() })
//         ev.preventDefault()
//         let proxy = {
//           preventDefault: () => null,
//           target: {
//             href: `${$routePath$.deref()}/${/id\/(\d+)/g.exec(img)[1]}`
//           },
//           currentTarget: { document: null }
//         }
//         // let matches = /id\/(\d+)/g.exec(img)
//         // console.log({ matches })
//         // let id = matches[1]
//         emitHREF(proxy)
//         run$.next({
//           ..._FLIP,
//           args: { flip_el: ev.target, flip_id: img }
//         })
//       }
//     },
//     [div, {}, img, sz]
//   ]
// }


var FLIP_div = {
  render: function render(_ref10, img) {
    var _context15;

    var $store$ = _ref10.$store$;

    for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }

    return (0, _concat.default)(_context15 = [div, {
      onclick: function onclick(e) {
        var _context16;

        e.preventDefault();
        var proxy = {
          preventDefault: function preventDefault() {
            return null;
          },
          target: {
            href: (0, _concat.default)(_context16 = "".concat($routePath$.deref(), "/")).call(_context16, /id\/(\d+)/g.exec(img)[1])
          },
          currentTarget: {
            document: null
          }
        };
        FLIP_first($store$, img + "_div", e);
        emitHREF(proxy);
      }
    }, img]).call(_context15, args);
  },
  init: function init(el, _ref11, img) {
    var $store$ = _ref11.$store$;
    return FLIP_last_invert_play(el, $store$, img + "_div");
  },
  release: function release(_ref12, img) {
    var $store$ = _ref12.$store$;
    return FLIP_last($store$, img);
  }
};

var component = function component(sz) {
  return function (ctx, img, fields) {
    return ["div", {}, [FLIP_div, img, sz], //[FLIP_img, img]],
    ["p", {
      class: "title"
    }, fields]];
  };
};

var link = function link(ctx, path) {
  var _context17;

  for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    args[_key4 - 2] = arguments[_key4];
  }

  return (0, _concat.default)(_context17 = ["a", {
    href: "/" + path.join("/"),
    onclick: function onclick(e) {
      return emitHREF(e);
    }
  }]).call(_context17, args);
};

var page = function page(ctx, payload) {
  var _context18, _context19, _context21;

  return (0, _concat.default)(_context18 = ["div", {
    style: {
      "max-width": "30rem",
      margin: "auto"
    }
  }]).call(_context18, (0, _toConsumableArray2.default)((0, _map.default)(_context19 = [["users"], ["todos", 2], ["users", 9]]).call(_context19, function (path) {
    var _context20;

    return [link, path, (0, _concat.default)(_context20 = "".concat(path[0], " ")).call(_context20, path[1] ? "->" + path[1] : ""), ["br"]];
  })), [(0, _checks.isArray)(payload) ? (0, _concat.default)(_context21 = ["div"]).call(_context21, (0, _toConsumableArray2.default)((0, _map.default)(payload).call(payload, function (_ref13) {
    var img = _ref13.img,
        text = _ref13.text;
    return [component("sm"), img, fields(text)];
  }))) : [component("lg"), payload && payload.img ? payload.img : "https://i.picsum.photos/id/111/600/600.jpg", payload && payload.text ? fields(payload.text.company || payload.text) : null]]);
}; //
//       e      888~-_   888  _-~88e
//      d8b     888   \  888 /   88"
//     /Y88b    888    | 888 `   8P
//    /  Y88b   888   /  888     `
//   /____Y88b  888_-~   888   d88b
//  /      Y88b 888      888   Y88P
//
//


registerRouterDOM(router); // ✈ MOVE to register/ ✈

var registerRootByID = function registerRootByID(id) {
  set$Root(id);
  return document.getElementById(id);
};

var root = registerRootByID("app"); // consider abstracting this (just hand it a `router` Map,
// `page` object and an "id")

console.log("starting...");
(0, _hdom.start)( // 📌 page component that chooses a template based on the spec returned
function (_ref14) {
  var $store$ = _ref14.$store$;
  return [page, (0, _paths.getIn)($store$.deref(), $routePath$.deref())];
}, {
  root: root,
  ctx: {
    run$: run$,
    $store$: $store$
  },
  span: false
});
},{"@babel/runtime-corejs3/core-js-stable/object/define-property":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js","@babel/runtime-corejs3/core-js-stable/object/define-properties":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js","@babel/runtime-corejs3/core-js-stable/instance/for-each":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js","@babel/runtime-corejs3/core-js-stable/instance/filter":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js","@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js","@babel/runtime-corejs3/core-js-stable/object/keys":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js","@babel/runtime-corejs3/core-js-stable/instance/slice":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/slice.js","@babel/runtime-corejs3/core-js-stable/object/entries":"../node_modules/@babel/runtime-corejs3/core-js-stable/object/entries.js","@babel/runtime-corejs3/helpers/toConsumableArray":"../node_modules/@babel/runtime-corejs3/helpers/toConsumableArray.js","@babel/runtime-corejs3/helpers/defineProperty":"../node_modules/@babel/runtime-corejs3/helpers/defineProperty.js","@babel/runtime-corejs3/helpers/slicedToArray":"../node_modules/@babel/runtime-corejs3/helpers/slicedToArray.js","@babel/runtime-corejs3/regenerator":"../node_modules/@babel/runtime-corejs3/regenerator/index.js","@babel/runtime-corejs3/core-js-stable/instance/map":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js","@babel/runtime-corejs3/core-js-stable/instance/concat":"../node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js","@babel/runtime-corejs3/helpers/asyncToGenerator":"../node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js","../src":"../src/index.js","@thi.ng/paths":"../node_modules/@thi.ng/paths/index.js","@thi.ng/checks":"../node_modules/@thi.ng/checks/index.js","@thi.ng/atom":"../node_modules/@thi.ng/atom/index.js","@thi.ng/hdom":"../node_modules/@thi.ng/hdom/index.js","@thi.ng/associative":"../node_modules/@thi.ng/associative/index.js","@mapbox/scroll-restorer":"../node_modules/@mapbox/scroll-restorer/index.js"}],"../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53899" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}]},{},["../../../AppData/Local/nvs/node/10.16.2/x64/node_modules/parcel/src/builtins/hmr-runtime.js","nav.js"], null)
//# sourceMappingURL=/nav.ce572f91.js.map