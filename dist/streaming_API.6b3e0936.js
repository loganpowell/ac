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
})({"JkV6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.existsAndNotNull = void 0;

const existsAndNotNull = x => x != null;

exports.existsAndNotNull = existsAndNotNull;
},{}],"gHcL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exists = void 0;

const exists = t => t !== undefined;

exports.exists = exists;
},{}],"O7cb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasBigInt = void 0;

const hasBigInt = () => typeof BigInt === "function";

exports.hasBigInt = hasBigInt;
},{}],"tHdQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasCrypto = void 0;

const hasCrypto = () => typeof window !== "undefined" && window["crypto"] !== undefined;

exports.hasCrypto = hasCrypto;
},{}],"GuyH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMaxLength = void 0;

const hasMaxLength = (len, x) => x != null && x.length <= len;

exports.hasMaxLength = hasMaxLength;
},{}],"IZ1J":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMinLength = void 0;

const hasMinLength = (len, x) => x != null && x.length >= len;

exports.hasMinLength = hasMinLength;
},{}],"Bufo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = void 0;

const isFunction = x => typeof x === "function";

exports.isFunction = isFunction;
},{}],"whl6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasPerformance = void 0;

var _isFunction = require("./is-function");

const hasPerformance = () => typeof performance !== "undefined" && (0, _isFunction.isFunction)(performance.now);

exports.hasPerformance = hasPerformance;
},{"./is-function":"Bufo"}],"Plsb":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWASM = void 0;

const hasWASM = () => typeof window !== "undefined" && typeof window["WebAssembly"] !== "undefined" || typeof global !== "undefined" && typeof global["WebAssembly"] !== "undefined";

exports.hasWASM = hasWASM;
},{}],"hLmy":[function(require,module,exports) {
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
},{}],"gjyQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWebSocket = void 0;

const hasWebSocket = () => typeof WebSocket !== "undefined";

exports.hasWebSocket = hasWebSocket;
},{}],"aypl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.implementsFunction = void 0;

const implementsFunction = (x, fn) => x != null && typeof x[fn] === "function";

exports.implementsFunction = implementsFunction;
},{}],"EzY8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = void 0;
const isArray = Array.isArray;
exports.isArray = isArray;
},{}],"aMkR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArrayLike = void 0;

const isArrayLike = x => x != null && typeof x !== "function" && x.length !== undefined;

exports.isArrayLike = isArrayLike;
},{}],"cjD2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBlob = void 0;

const isBlob = x => x instanceof Blob;

exports.isBlob = isBlob;
},{}],"wIBj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBoolean = void 0;

const isBoolean = x => typeof x === "boolean";

exports.isBoolean = isBoolean;
},{}],"Q2Ck":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isChrome = void 0;

const isChrome = () => typeof window !== "undefined" && !!window["chrome"];

exports.isChrome = isChrome;
},{}],"iWZh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDate = void 0;

const isDate = x => x instanceof Date;

exports.isDate = isDate;
},{}],"DVMc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEven = void 0;

const isEven = x => x % 2 === 0;

exports.isEven = isEven;
},{}],"itLP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFalse = void 0;

const isFalse = x => x === false;

exports.isFalse = isFalse;
},{}],"nIhw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFile = void 0;

const isFile = x => x instanceof File;

exports.isFile = isFile;
},{}],"kN94":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFirefox = void 0;

const isFirefox = () => typeof window !== "undefined" && !!window["InstallTrigger"];

exports.isFirefox = isFirefox;
},{}],"YRs3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = void 0;

const isString = x => typeof x === "string";

exports.isString = isString;
},{}],"I7p9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHexColor = void 0;

var _isString = require("./is-string");

const RE = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;

const isHexColor = x => (0, _isString.isString)(x) && RE.test(x);

exports.isHexColor = isHexColor;
},{"./is-string":"YRs3"}],"uzxQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIE = void 0;

const isIE = () => typeof document !== "undefined" && (typeof document["documentMode"] !== "undefined" || navigator.userAgent.indexOf("MSIE") > 0);

exports.isIE = isIE;
},{}],"chRU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInRange = void 0;

const isInRange = (min, max, x) => x >= min && x <= max;

exports.isInRange = isInRange;
},{}],"tSTa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInt32 = void 0;

const isInt32 = x => typeof x === "number" && (x | 0) === x;

exports.isInt32 = isInt32;
},{}],"n4Mm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIterable = void 0;

const isIterable = x => x != null && typeof x[Symbol.iterator] === "function";

exports.isIterable = isIterable;
},{}],"f4lF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMap = void 0;

const isMap = x => x instanceof Map;

exports.isMap = isMap;
},{}],"D1Vz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = void 0;

const isMobile = () => typeof navigator !== "undefined" && /mobile|tablet|ip(ad|hone|od)|android|silk|crios/i.test(navigator.userAgent);

exports.isMobile = isMobile;
},{}],"PQYg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNaN = void 0;

const isNaN = x => x !== x;

exports.isNaN = isNaN;
},{}],"ujxb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNegative = void 0;

const isNegative = x => typeof x === "number" && x < 0;

exports.isNegative = isNegative;
},{}],"pcA2":[function(require,module,exports) {
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
},{}],"SDAI":[function(require,module,exports) {

},{}],"av77":[function(require,module,exports) {
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
},{"process":"SDAI"}],"h7C1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotStringAndIterable = void 0;

const isNotStringAndIterable = x => x != null && typeof x !== "string" && typeof x[Symbol.iterator] === "function";

exports.isNotStringAndIterable = isNotStringAndIterable;
},{}],"n9fW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNull = void 0;

const isNull = x => x === null;

exports.isNull = isNull;
},{}],"tVEK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = void 0;

const isNumber = x => typeof x === "number";

exports.isNumber = isNumber;
},{}],"czvy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = void 0;

const isObject = x => x !== null && typeof x === "object";

exports.isObject = isObject;
},{}],"FdDG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOdd = void 0;

const isOdd = x => x % 2 !== 0;

exports.isOdd = isOdd;
},{}],"Pfe1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPlainObject = void 0;
const OBJP = Object.getPrototypeOf;
/**
 * Similar to {@link isObject}, but also checks if prototype is that of
 * `Object` (or `null`).
 *
 * @param x -
 */

const isPlainObject = x => {
  let p;
  return x != null && typeof x === "object" && ((p = OBJP(x)) === null || OBJP(p) === null);
};

exports.isPlainObject = isPlainObject;
},{}],"LOdY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPosititve = void 0;

const isPosititve = x => typeof x === "number" && x > 0;

exports.isPosititve = isPosititve;
},{}],"woDp":[function(require,module,exports) {
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
},{}],"dJae":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromise = void 0;

const isPromise = x => x instanceof Promise;

exports.isPromise = isPromise;
},{}],"qg0p":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromiseLike = void 0;

var _implementsFunction = require("./implements-function");

const isPromiseLike = x => x instanceof Promise || (0, _implementsFunction.implementsFunction)(x, "then") && (0, _implementsFunction.implementsFunction)(x, "catch");

exports.isPromiseLike = isPromiseLike;
},{"./implements-function":"aypl"}],"ec3G":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRegExp = void 0;

const isRegExp = x => x instanceof RegExp;

exports.isRegExp = isRegExp;
},{}],"UBhm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSafari = void 0;

var _isChrome = require("./is-chrome");

const isSafari = () => typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !(0, _isChrome.isChrome)();

exports.isSafari = isSafari;
},{"./is-chrome":"Q2Ck"}],"FYtk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSet = void 0;

const isSet = x => x instanceof Set;

exports.isSet = isSet;
},{}],"yWj9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSymbol = void 0;

const isSymbol = x => typeof x === "symbol";

exports.isSymbol = isSymbol;
},{}],"DsUC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTransferable = void 0;

const isTransferable = x => x instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && x instanceof SharedArrayBuffer || typeof MessagePort !== "undefined" && x instanceof MessagePort;

exports.isTransferable = isTransferable;
},{}],"cptQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTrue = void 0;

const isTrue = x => x === true;

exports.isTrue = isTrue;
},{}],"KTQJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTypedArray = void 0;

const isTypedArray = x => x && (x.constructor === Float32Array || x.constructor === Uint32Array || x.constructor === Uint8Array || x.constructor === Uint8ClampedArray || x.constructor === Int8Array || x.constructor === Uint16Array || x.constructor === Int16Array || x.constructor === Int32Array || x.constructor === Float64Array);

exports.isTypedArray = isTypedArray;
},{}],"oPfe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUint32 = void 0;

const isUint32 = x => typeof x === "number" && x >>> 0 === x;

exports.isUint32 = isUint32;
},{}],"Nuc0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUndefined = void 0;

const isUndefined = x => x === undefined;

exports.isUndefined = isUndefined;
},{}],"y4fY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUUID = void 0;
const RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isUUID = x => RE.test(x);

exports.isUUID = isUUID;
},{}],"SOqJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUUIDv4 = void 0;
const RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUUIDv4 = x => RE.test(x);

exports.isUUIDv4 = isUUIDv4;
},{}],"xfMy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isZero = void 0;

const isZero = x => x === 0;

exports.isZero = isZero;
},{}],"XYpc":[function(require,module,exports) {
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

var _hasBigint = require("./has-bigint");

Object.keys(_hasBigint).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasBigint[key];
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
},{"./exists-not-null":"JkV6","./exists":"gHcL","./has-bigint":"O7cb","./has-crypto":"tHdQ","./has-max-length":"GuyH","./has-min-length":"IZ1J","./has-performance":"whl6","./has-wasm":"Plsb","./has-webgl":"hLmy","./has-websocket":"gjyQ","./implements-function":"aypl","./is-array":"EzY8","./is-arraylike":"aMkR","./is-blob":"cjD2","./is-boolean":"wIBj","./is-chrome":"Q2Ck","./is-date":"iWZh","./is-even":"DVMc","./is-false":"itLP","./is-file":"nIhw","./is-firefox":"kN94","./is-function":"Bufo","./is-hex-color":"I7p9","./is-ie":"uzxQ","./is-in-range":"chRU","./is-int32":"tSTa","./is-iterable":"n4Mm","./is-map":"f4lF","./is-mobile":"D1Vz","./is-nan":"PQYg","./is-negative":"ujxb","./is-nil":"pcA2","./is-node":"av77","./is-not-string-iterable":"h7C1","./is-null":"n9fW","./is-number":"tVEK","./is-object":"czvy","./is-odd":"FdDG","./is-plain-object":"Pfe1","./is-positive":"LOdY","./is-primitive":"woDp","./is-promise":"dJae","./is-promiselike":"qg0p","./is-regexp":"ec3G","./is-safari":"UBhm","./is-set":"FYtk","./is-string":"YRs3","./is-symbol":"yWj9","./is-transferable":"DsUC","./is-true":"cptQ","./is-typedarray":"KTQJ","./is-uint32":"oPfe","./is-undefined":"Nuc0","./is-uuid":"y4fY","./is-uuid4":"SOqJ","./is-zero":"xfMy"}],"ncYv":[function(require,module,exports) {
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
 * @param path -
 */
const toPath = path => (0, _checks.isArray)(path) ? path : (0, _checks.isString)(path) ? path.length > 0 ? path.split(".") : [] : path != null ? [path] : [];
/**
 * Takes an arbitrary object and lookup path. Descends into object along
 * path and returns true if the full path exists (even if final leaf
 * value is `null` or `undefined`). Checks are performed using
 * `hasOwnProperty()`.
 *
 * @param obj -
 * @param path -
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
},{"@thi.ng/checks":"XYpc"}],"KCUZ":[function(require,module,exports) {
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
 * @param path -
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
},{"./path":"ncYv"}],"u6VB":[function(require,module,exports) {
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
 * @param path -
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
},{"@thi.ng/checks":"XYpc","./path":"ncYv"}],"W4zB":[function(require,module,exports) {
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
},{"./getter":"KCUZ","./setter":"u6VB"}],"QK7d":[function(require,module,exports) {
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
 * @param state -
 * @param path -
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
},{"./path":"ncYv","./update-in":"W4zB"}],"CUV2":[function(require,module,exports) {
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
 * @param state -
 * @param path -
 */
const getIn = (state, path) => (0, _getter.getterT)(path)(state);

exports.getIn = getIn;

function getInT(state, path) {
  return (0, _getter.getterT)(path)(state);
}
},{"./getter":"KCUZ"}],"yRgl":[function(require,module,exports) {
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
 * @param path -
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
},{"./path":"ncYv"}],"QKCI":[function(require,module,exports) {
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
 * @param state -
 * @param path -
 * @param val -
 */
const mutIn = (state, path, val) => mutInT(state, path, val);

exports.mutIn = mutIn;

function mutInT(state, path, val) {
  return (0, _mutator.mutatorT)(path)(state, val);
}
},{"./mutator":"yRgl"}],"eWwg":[function(require,module,exports) {
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
},{}],"uRQP":[function(require,module,exports) {
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
},{"./deferror":"eWwg"}],"r3zx":[function(require,module,exports) {
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
},{"./deferror":"eWwg"}],"htig":[function(require,module,exports) {
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
},{"./deferror":"eWwg"}],"EzWe":[function(require,module,exports) {
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
},{"./deferror":"eWwg"}],"j3Rf":[function(require,module,exports) {
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
},{"./deferror":"eWwg","./illegal-arguments":"uRQP","./illegal-arity":"r3zx","./illegal-state":"htig","./unsupported":"EzWe"}],"Vc9X":[function(require,module,exports) {
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
 * @param state -
 * @param pairs -
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
},{"@thi.ng/errors":"j3Rf","./mut-in":"QKCI"}],"MVAh":[function(require,module,exports) {
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
 * @param state -
 * @param path -
 */
const setIn = (state, path, val) => (0, _setter.setterT)(path)(state, val);

exports.setIn = setIn;

function setInT(state, path, val) {
  return (0, _setter.setterT)(path)(state, val);
}
},{"./setter":"u6VB"}],"craz":[function(require,module,exports) {
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
 * @param state -
 * @param pairs -
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
},{"@thi.ng/errors":"j3Rf","./set-in":"MVAh"}],"oSJ5":[function(require,module,exports) {
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
 * @param path -
 * @param fn -
 */
const updater = (path, fn) => updaterT(path, fn);

exports.updater = updater;

function updaterT(path, fn) {
  const g = (0, _getter.getterT)(path);
  const s = (0, _setter.setterT)(path);
  return (state, ...args) => s(state, fn.apply(null, (args.unshift(g(state)), args)));
}
},{"./getter":"KCUZ","./setter":"u6VB"}],"jkaf":[function(require,module,exports) {
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
},{"./delete-in":"QK7d","./getter":"KCUZ","./get-in":"CUV2","./mut-in":"QKCI","./mut-in-many":"Vc9X","./mutator":"yRgl","./path":"ncYv","./setter":"u6VB","./set-in":"MVAh","./set-in-many":"craz","./updater":"oSJ5","./update-in":"W4zB"}],"jIkc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEMAPHORE = exports.DEFAULT_EPS = void 0;
const DEFAULT_EPS = 1e-6;
/**
 * Internal use only. **Do NOT use in user land code!**
 *
 * @internal
 */

exports.DEFAULT_EPS = DEFAULT_EPS;
const SEMAPHORE = Symbol();
exports.SEMAPHORE = SEMAPHORE;
},{}],"isrY":[function(require,module,exports) {
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
},{}],"xLTi":[function(require,module,exports) {
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
},{}],"lWE0":[function(require,module,exports) {
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
},{}],"XU6m":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typedArray = typedArray;
exports.intType = exports.uintType = exports.TYPEDARRAY_CTORS = exports.SIZEOF = exports.TYPE2GL = exports.GL2TYPE = exports.GLType = exports.Type = void 0;

/**
 * Type enums for Typedarray-backed buffers.
 *
 * {@link GLType}
 * {@link GL2TYPE}
 * {@link TYPE2GL}
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
 * WebGL numeric type constants. Use {@link GL2TYPE} to convert, if needed.
 *
 * {@link Type}
 * {@link GL2TYPE}
 * {@link TYPE2GL}
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
 * Conversion from {@link GLType} to {@link Type} enums.
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
 * Potentially lossy conversion from {@link Type} to {@link GLType} enums.
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
 * Size information (in bytes) for {@link Type} enums. For {@link GLType}, use this
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
 * @param x - value to classify
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
 * @param x - value to classify
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
},{}],"omIJ":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = void 0;

var _fn = require("./api/fn");

/**
 * Takes a `test` result or predicate function without args and throws
 * error with given `msg` if test failed (i.e. is falsy).
 *
 * @remarks
 * The function is only enabled if `process.env.NODE_ENV != "production"`
 * or if the `UMBRELLA_ASSERTS` env var is set to 1.
 */
const assert = typeof process === "undefined" || "production" !== "production" || undefined === "1" ? (test, msg = "assertion failed") => {
  if (typeof test === "function" && !test() || !test) {
    throw new Error(typeof msg === "function" ? msg() : msg);
  }
} : _fn.NO_OP;
exports.assert = assert;
},{"./api/fn":"xLTi","process":"SDAI"}],"RPuP":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exposeGlobal = void 0;

/**
 * Exposes given `value` as `id` in global scope, iff `always = true`
 * (default: false) or if `process.env.NODE_ENV != "production"` or if the
 * `UMBRELLA_GLOBALS` env var is set to 1.
 *
 * @param id -
 * @param value -
 * @param always -
 */
const exposeGlobal = (id, value, always = false) => {
  const glob = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;

  if (glob && (always || typeof process === "undefined" || "production" !== "production" || undefined === "1")) {
    glob[id] = value;
  }
};

exports.exposeGlobal = exposeGlobal;
},{"process":"SDAI"}],"mrOC":[function(require,module,exports) {
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
},{"./api/logger":"lWE0"}],"r7mt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixin = void 0;

/**
 * Class behavior mixin based on:
 * {@link http://raganwald.com/2015/06/26/decorators-in-es7.html}
 *
 * Additionally only injects/overwrites properties in target, which are
 * NOT marked with `@nomixin` (i.e. haven't set their `configurable`
 * property descriptor flag to `false`)
 *
 * @param behaviour - to mixin
 * @param sharedBehaviour -
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
},{}],"Jb4T":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configurable = void 0;

/**
 * Property decorator factory. Sets `configurable` flag of PropertyDescriptor
 * to given state.
 *
 * @param state - true, if propoerty is configurable
 */
const configurable = state => function (_, __, descriptor) {
  descriptor.configurable = state;
};

exports.configurable = configurable;
},{}],"RAOm":[function(require,module,exports) {
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
 * @param msg - deprecation message
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
},{"../assert":"omIJ"}],"VFtB":[function(require,module,exports) {
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
},{}],"bcfA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sealed = void 0;

/**
 * Class decorator. Seals both constructor and prototype.
 *
 * @param constructor - class ctor to seal
 */
const sealed = constructor => {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
};

exports.sealed = sealed;
},{}],"EQ47":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IEnableMixin = void 0;

var _event = require("../api/event");

var _mixin = require("../mixin");

/**
 * Mixin class decorator, injects IEnable default implementation, incl.
 * a `_enabled` property. If the target also implements the
 * {@link @thi.ng/api#INotify} interface, {@link IEnable.enable} and
 * {@link IEnable.disable} will automatically emit the respective
 * events.
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
},{"../api/event":"isrY","../mixin":"r7mt"}],"uu6d":[function(require,module,exports) {
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
},{"../api/event":"isrY","../mixin":"r7mt"}],"IAX8":[function(require,module,exports) {
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
},{"../mixin":"r7mt"}],"haK8":[function(require,module,exports) {
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
},{"../mixin":"r7mt"}],"MOSf":[function(require,module,exports) {
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

var _expose = require("./expose");

Object.keys(_expose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _expose[key];
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
},{"./api":"jIkc","./api/event":"isrY","./api/fn":"xLTi","./api/logger":"lWE0","./api/typedarray":"XU6m","./assert":"omIJ","./expose":"RPuP","./logger":"mrOC","./mixin":"r7mt","./decorators/configurable":"Jb4T","./decorators/deprecated":"RAOm","./decorators/nomixin":"VFtB","./decorators/sealed":"bcfA","./mixins/ienable":"EQ47","./mixins/inotify":"uu6d","./mixins/iterable":"IAX8","./mixins/iwatch":"haK8"}],"U8cl":[function(require,module,exports) {
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
},{}],"VaVn":[function(require,module,exports) {
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
},{}],"vPtr":[function(require,module,exports) {
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
},{"@thi.ng/equiv":"U8cl"}],"uWkF":[function(require,module,exports) {
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
},{"@thi.ng/checks":"XYpc"}],"nNr8":[function(require,module,exports) {
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
 * and by the default uses {@link @thi.ng/equiv#equiv} for equivalence
 * checking.
 *
 * Additionally, the type also implements the {@link @thi.ng/api#ICopy}, {@link @thi.ng/api#IEmpty} and
 * {@link @thi.ng/api#IEquiv} interfaces itself.
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
   * @param key - search key
   * @param notFound - default value
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
},{"@thi.ng/api":"MOSf","@thi.ng/equiv":"U8cl","./dissoc":"VaVn","./internal/equiv":"vPtr","./into":"uWkF"}],"bzzW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonKeysObj = exports.commonKeysMap = void 0;

/**
 * Like {@link commonKeysObj}, but for ES6 Maps.
 *
 * @param a - first map
 * @param b - other map
 * @param out - result array
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
 * @example
 * ```ts
 * commonKeys({ a: 1, b: 2 }, { c: 10, b: 20, a: 30 })
 * // [ "a", "b" ]
 * ```
 *
 * @param a - first object
 * @param b - other object
 * @param out - result array
 */


exports.commonKeysMap = commonKeysMap;

const commonKeysObj = (a, b, out = []) => {
  for (let k in a) {
    b.hasOwnProperty(k) && out.push(k);
  }

  return out;
};

exports.commonKeysObj = commonKeysObj;
},{}],"IMN5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureTransducer = void 0;

var _checks = require("@thi.ng/checks");

const ensureTransducer = x => (0, _checks.implementsFunction)(x, "xform") ? x.xform() : x;

exports.ensureTransducer = ensureTransducer;
},{"@thi.ng/checks":"XYpc"}],"N1be":[function(require,module,exports) {
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
},{}],"UerL":[function(require,module,exports) {
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
 * Convenience helper for building a full {@link Reducer} using the identity
 * function (i.e. `(x) => x`) as completion step (true for 90% of all
 * bundled transducers).
 *
 * @param init - init step of reducer
 * @param rfn - reduction step of reducer
 */


const reducer = (init, rfn) => [init, acc => acc, rfn];

exports.reducer = reducer;

const $$reduce = (rfn, args) => {
  const n = args.length - 1;
  return (0, _checks.isIterable)(args[n]) ? args.length > 1 ? reduce(rfn.apply(null, args.slice(0, n)), args[n]) : reduce(rfn(), args[0]) : undefined;
};

exports.$$reduce = $$reduce;
},{"@thi.ng/checks":"XYpc","@thi.ng/errors":"j3Rf","./reduced":"N1be"}],"nZPr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.push = push;

var _reduce = require("../reduce");

function push(xs) {
  return xs ? [...xs] : (0, _reduce.reducer)(() => [], (acc, x) => (acc.push(x), acc));
}
},{"../reduce":"UerL"}],"fhdf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterator = iterator;
exports.iterator1 = iterator1;
exports.$iter = void 0;

var _api = require("@thi.ng/api");

var _checks = require("@thi.ng/checks");

var _ensure = require("./internal/ensure");

var _reduced = require("./reduced");

var _push = require("./rfn/push");

/**
 * Takes a transducer and input iterable. Returns iterator of
 * transformed results.
 *
 * @param xform -
 * @param xs -
 */
function* iterator(xform, xs) {
  const rfn = (0, _ensure.ensureTransducer)(xform)((0, _push.push)());
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
 * Optimized version of {@link iterator} for transducers which are
 * guaranteed to:
 *
 * 1) Only produce none or a single result per input
 * 2) Do not require a `completion` reduction step
 *
 * @param xform -
 * @param xs -
 */


function* iterator1(xform, xs) {
  const reduce = (0, _ensure.ensureTransducer)(xform)([_api.NO_OP, _api.NO_OP, (_, x) => x])[2];

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
 * transforming iterators. Delegates to {@link iterator1} by default.
 *
 * @param xform -
 * @param args -
 * @param impl -
 *
 * @internal
 */


const $iter = (xform, args, impl = iterator1) => {
  const n = args.length - 1;
  return (0, _checks.isIterable)(args[n]) ? args.length > 1 ? impl(xform.apply(null, args.slice(0, n)), args[n]) : impl(xform(), args[0]) : undefined;
};

exports.$iter = $iter;
},{"@thi.ng/api":"MOSf","@thi.ng/checks":"XYpc","./internal/ensure":"IMN5","./reduced":"N1be","./rfn/push":"nZPr"}],"IqcY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compR = void 0;

/**
 * Reducer composition helper, internally used by various transducers
 * during initialization. Takes existing reducer `rfn` (a 3-tuple) and a
 * reducing function `fn`. Returns a new reducer tuple.
 *
 * @remarks
 * `rfn[2]` reduces values of type `B` into an accumulator of type `A`.
 * `fn` accepts values of type `C` and produces interim results of type
 * `B`, which are then (possibly) passed to the "inner" `rfn[2]`
 * function. Therefore the resulting reducer takes inputs of `C` and an
 * accumulator of type `A`.
 *
 * It is assumed that `fn` internally calls `rfn[2]` to pass its own
 * results for further processing by the nested reducer `rfn`.
 *
 * @example
 * ```ts
 * compR(rfn, fn)
 * // [rfn[0], rfn[1], fn]
 * ```
 *
 * @param rfn -
 * @param fn -
 */
const compR = (rfn, fn) => [rfn[0], rfn[1], fn];

exports.compR = compR;
},{}],"WUst":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf"}],"iqGa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transduce = transduce;

var _errors = require("@thi.ng/errors");

var _ensure = require("./internal/ensure");

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

  return (0, _reduce.reduce)((0, _ensure.ensureTransducer)(args[0])(args[1]), acc, xs);
}
},{"@thi.ng/errors":"j3Rf","./internal/ensure":"IMN5","./reduce":"UerL","./xform/map":"WUst"}],"FIKh":[function(require,module,exports) {
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
},{"@thi.ng/api":"MOSf","./transduce":"iqGa"}],"o6XN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.step = void 0;

var _ensure = require("./internal/ensure");

var _reduced = require("./reduced");

var _push = require("./rfn/push");

/**
 * Single-step transducer execution wrapper.
 * Returns array if transducer produces multiple results
 * and undefined if there was no output. Else returns single
 * result value.
 *
 * @remarks
 * Likewise, once a transducer has produced a final / reduced
 * value, all further invocations of the stepper function will
 * return undefined.
 *
 * @example
 * ```ts
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
 * @param tx -
 */
const step = tx => {
  const {
    1: complete,
    2: reduce
  } = (0, _ensure.ensureTransducer)(tx)((0, _push.push)());
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
},{"./internal/ensure":"IMN5","./reduced":"N1be","./rfn/push":"nZPr"}],"wTIN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__mathop = void 0;

var _reduce = require("../reduce");

/**
 * Higher-order reducer for math operations.
 *
 * @param rfn -
 * @param fn -
 * @param initDefault -
 * @param args -
 *
 * @internal
 */
const __mathop = (rfn, fn, initDefault, args) => {
  const res = (0, _reduce.$$reduce)(rfn, args);

  if (res !== undefined) {
    return res;
  }

  const init = args[0] || initDefault;
  return (0, _reduce.reducer)(() => init, fn);
};

exports.__mathop = __mathop;
},{"../reduce":"UerL"}],"pthq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;

var _mathop = require("../internal/mathop");

function add(...args) {
  return (0, _mathop.__mathop)(add, (acc, x) => acc + x, 0, args);
}
},{"../internal/mathop":"wTIN"}],"LIJg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assocMap = assocMap;

var _reduce = require("../reduce");

function assocMap(xs) {
  return xs ? (0, _reduce.reduce)(assocMap(), xs) : (0, _reduce.reducer)(() => new Map(), (acc, [k, v]) => acc.set(k, v));
}
},{"../reduce":"UerL"}],"H8df":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assocObj = assocObj;

var _reduce = require("../reduce");

function assocObj(xs) {
  return xs ? (0, _reduce.reduce)(assocObj(), xs) : (0, _reduce.reducer)(() => ({}), (acc, [k, v]) => (acc[k] = v, acc));
}
},{"../reduce":"UerL"}],"cBQk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conj = conj;

var _reduce = require("../reduce");

function conj(xs) {
  return xs ? (0, _reduce.reduce)(conj(), xs) : (0, _reduce.reducer)(() => new Set(), (acc, x) => acc.add(x));
}
},{"../reduce":"UerL"}],"g31l":[function(require,module,exports) {
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
},{"../reduce":"UerL"}],"J30b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.div = div;

var _reduce = require("../reduce");

function div(init, xs) {
  return xs ? (0, _reduce.reduce)(div(init), xs) : (0, _reduce.reducer)(() => init, (acc, x) => acc / x);
}
},{"../reduce":"UerL"}],"yvO9":[function(require,module,exports) {
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
},{"../reduce":"UerL","../reduced":"N1be"}],"WiAD":[function(require,module,exports) {
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
},{"../reduce":"UerL"}],"iXJj":[function(require,module,exports) {
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
 * @deprecated renamed to {@link (compL:1)}
 */


const compI = compL;
exports.compI = compI;
},{"@thi.ng/errors":"j3Rf"}],"fJFi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complement = complement;

function complement(f) {
  return (...xs) => !f(...xs);
}
},{}],"B4W5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constantly = void 0;

const constantly = x => () => x;

exports.constantly = constantly;
},{}],"nPxS":[function(require,module,exports) {
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
},{}],"ac4f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayed = void 0;

const delayed = (x, t) => new Promise(resolve => setTimeout(() => resolve(x), t));

exports.delayed = delayed;
},{}],"TBrF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = void 0;

const identity = x => x;

exports.identity = identity;
},{}],"pC2R":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ifDef = void 0;

/**
 * Returns f(x) iff `x` is not null or undefined.
 *
 * @param f - function
 * @param x - value
 */
const ifDef = (f, x) => x != null ? f(x) : undefined;

exports.ifDef = ifDef;
},{}],"GuBu":[function(require,module,exports) {
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
},{}],"l38o":[function(require,module,exports) {
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
},{"@thi.ng/errors":"j3Rf"}],"kmRz":[function(require,module,exports) {
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
 * @example
 * ```ts
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
 * {@link threadLast}
 *
 * @param init - start value
 * @param fns - functions / S-expressions
 */
const threadFirst = (init, ...fns) => fns.reduce((acc, expr) => typeof expr === "function" ? expr(acc) : expr[0](acc, ...expr.slice(1)), init);

exports.threadFirst = threadFirst;
},{}],"XUsq":[function(require,module,exports) {
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
 * @example
 * ```ts
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
 * {@link threadFirst}
 *
 * @param init - start value
 * @param fns - functions / S-expressions
 */
const threadLast = (init, ...fns) => fns.reduce((acc, expr) => typeof expr === "function" ? expr(acc) : expr[0](...expr.slice(1), acc), init);

exports.threadLast = threadLast;
},{}],"dc4t":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trampoline = void 0;

/**
 * Takes a function returning either a no-arg function (thunk) or its
 * already realized (non-function) result. Re-executes thunk for as long
 * as it returns another function/thunk. Once a non-function result has
 * been produced, `trampoline` returns that value itself.
 *
 * @remarks
 * If the final result should be function, it needs to wrapped (e.g. as
 * a 1-elem array).
 *
 * This function should be used for non-stack consuming recursion. I.e.
 * a trampoline is a form of continuation passing style and only ever
 * consumes max. 2 extra stack frames, independent from recursion depth.
 *
 * @example
 * ```ts
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
 * @param f - function
 */
const trampoline = f => {
  while (typeof f === "function") {
    f = f();
  }

  return f;
};

exports.trampoline = trampoline;
},{}],"gnoC":[function(require,module,exports) {
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
},{"./comp":"iXJj","./complement":"fJFi","./constantly":"B4W5","./delay":"nPxS","./delayed":"ac4f","./identity":"TBrF","./ifdef":"pC2R","./juxt":"GuBu","./partial":"l38o","./thread-first":"kmRz","./thread-last":"XUsq","./trampoline":"dc4t"}],"PvNE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__groupByOpts = void 0;

var _compose = require("@thi.ng/compose");

var _push = require("../rfn/push");

/**
 * Shared helper function for `groupBy*` reducers
 *
 * @param opts -
 *
 * @internal
 */
const __groupByOpts = opts => Object.assign({
  key: _compose.identity,
  group: (0, _push.push)()
}, opts);

exports.__groupByOpts = __groupByOpts;
},{"@thi.ng/compose":"gnoC","../rfn/push":"nZPr"}],"MrPH":[function(require,module,exports) {
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
  const [init, complete, reduce] = opts.group;
  return [() => new Map(), acc => {
    for (let k of acc.keys()) {
      acc.set(k, complete(acc.get(k)));
    }

    return acc;
  }, (acc, x) => {
    const k = opts.key(x);
    return acc.set(k, acc.has(k) ? reduce(acc.get(k), x) : reduce(init(), x));
  }];
}
},{"../internal/group-opts":"PvNE","../reduce":"UerL"}],"mFoP":[function(require,module,exports) {
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
},{"@thi.ng/compose":"gnoC","../reduce":"UerL","./count":"g31l","./group-by-map":"MrPH"}],"HXQi":[function(require,module,exports) {
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
  const [_init, complete, _reduce] = opts.group;
  return [() => ({}), acc => {
    for (let k in acc) {
      acc[k] = complete(acc[k]);
    }

    return acc;
  }, (acc, x) => {
    const k = opts.key(x);
    acc[k] = acc[k] ? _reduce(acc[k], x) : _reduce(_init(), x);
    return acc;
  }];
}
},{"../internal/group-opts":"PvNE","../reduce":"UerL"}],"DkVy":[function(require,module,exports) {
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
 * {@link (push:1)} reducer), but any suitable reducer can be used (e.g.
 * {@link (conj:1)} to collect values into sets).
 *
 * Index by lowest 4-bits of ID value:
 *
 * @example
 * ```ts
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
 * @example
 * ```ts
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
 * Using {@link (frequencies:1)} as leaf reducer:
 *
 * @example
 * ```ts
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
 * @param bits - index range (always from 0)
 * @param key - key function
 * @param branch - function to create a new branch container (object or
 * array)
 * @param leaf - reducer for leaf collection
 * @param left - key for storing left branches (e.g. `0` for arrays)
 * @param right - key for storing right branches (e.g. `1` for arrays)
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
},{"./group-by-obj":"HXQi","./push":"nZPr"}],"N4rn":[function(require,module,exports) {
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
},{"@thi.ng/api":"MOSf","../reduce":"UerL"}],"vzOR":[function(require,module,exports) {
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
 * @param a -
 * @param b -
 */


exports.compare = compare;

const compareNumAsc = (a, b) => a - b;
/**
 * Numeric comparator (descending order)
 *
 * @param a -
 * @param b -
 */


exports.compareNumAsc = compareNumAsc;

const compareNumDesc = (a, b) => b - a;

exports.compareNumDesc = compareNumDesc;
},{}],"Fj3f":[function(require,module,exports) {
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
},{"@thi.ng/compare":"vzOR","../reduce":"UerL"}],"ePW0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.max = max;

var _reduce = require("../reduce");

function max(xs) {
  return xs ? (0, _reduce.reduce)(max(), xs) : (0, _reduce.reducer)(() => -Infinity, (acc, x) => Math.max(acc, x));
}
},{"../reduce":"UerL"}],"N1B6":[function(require,module,exports) {
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
},{"../reduce":"UerL"}],"P2vS":[function(require,module,exports) {
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
},{"@thi.ng/compare":"vzOR","../reduce":"UerL"}],"wGHE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.min = min;

var _reduce = require("../reduce");

function min(xs) {
  return xs ? (0, _reduce.reduce)(min(), xs) : (0, _reduce.reducer)(() => Infinity, (acc, x) => Math.min(acc, x));
}
},{"../reduce":"UerL"}],"vCqj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mul = mul;

var _mathop = require("../internal/mathop");

function mul(...args) {
  return (0, _mathop.__mathop)(mul, (acc, x) => acc * x, 1, args);
}
},{"../internal/mathop":"wTIN"}],"FqE3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushCopy = void 0;

var _reduce = require("../reduce");

const pushCopy = () => (0, _reduce.reducer)(() => [], (acc, x) => ((acc = acc.slice()).push(x), acc));

exports.pushCopy = pushCopy;
},{"../reduce":"UerL"}],"PU8i":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushSort = pushSort;

var _compare = require("@thi.ng/compare");

function pushSort(cmp = _compare.compare, xs) {
  return xs ? [...xs].sort(cmp) : [() => [], acc => acc.sort(cmp), (acc, x) => (acc.push(x), acc)];
}
},{"@thi.ng/compare":"vzOR"}],"zjLI":[function(require,module,exports) {
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
},{"../reduce":"UerL","../reduced":"N1be"}],"ZD3d":[function(require,module,exports) {
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
},{"../reduce":"UerL","../reduced":"N1be"}],"js0B":[function(require,module,exports) {
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
},{"../reduce":"UerL"}],"B0kE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = sub;

var _mathop = require("../internal/mathop");

function sub(...args) {
  return (0, _mathop.__mathop)(sub, (acc, x) => acc - x, 0, args);
}
},{"../internal/mathop":"wTIN"}],"eYjS":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf"}],"arAw":[function(require,module,exports) {
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
 * of nesting from the input.
 *
 * @remarks
 * If, during processing, the transducer is given a wrapped reduced
 * input iterable, it will still be processed as normal, but then
 * immediately triggers early termination by wrapping its own result in
 * {@link reduced}. E.g. this behavior allows a {@link (mapcat:1)} user
 * functions to benefit from reduced results.
 *
 * Also see:
 * - {@link concat}
 * - {@link (mapcat:1)}
 *
 * @example
 * ```ts
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
 * @param rfn -
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
},{"../func/compr":"IqcY","../reduced":"N1be"}],"OUsy":[function(require,module,exports) {
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
},{"@thi.ng/api":"MOSf","../func/compr":"IqcY","../iterator":"fhdf","../reduced":"N1be"}],"GT77":[function(require,module,exports) {
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
 * `Iterable` and {@link IReducible} interfaces, the latter is used to
 * accelerate use with {@link (reduce:1)}.
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
},{"../reduced":"N1be"}],"DdIw":[function(require,module,exports) {
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
},{"@thi.ng/errors":"j3Rf","./range":"GT77"}],"Mdez":[function(require,module,exports) {
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
},{}],"BnrM":[function(require,module,exports) {
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

const buildKernel2d = (weights, w, h = w) => {
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
},{"@thi.ng/errors":"j3Rf","../iter/range":"GT77","../iter/range2d":"DdIw","../iter/zip":"Mdez","../iterator":"fhdf","../rfn/add":"pthq","../transduce":"iqGa","./map":"WUst"}],"ryPz":[function(require,module,exports) {
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
},{"@thi.ng/api":"MOSf","../func/compr":"IqcY","../iterator":"fhdf"}],"ya6N":[function(require,module,exports) {
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
 * @remarks
 * Only to be used in async contexts and NOT with {@link (transduce:1)}
 * directly.
 *
 * @param t -
 */
const delayed = t => (0, _map.map)(x => (0, _compose.delayed)(x, t));

exports.delayed = delayed;
},{"@thi.ng/compose":"gnoC","./map":"WUst"}],"ECm5":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf"}],"FY79":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf"}],"xVO8":[function(require,module,exports) {
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
},{"./throttle":"FY79","../iterator":"fhdf"}],"yG5g":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf"}],"Xj6O":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf"}],"xKDL":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf","../reduced":"N1be"}],"AmRG":[function(require,module,exports) {
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
},{"../iterator":"fhdf","../func/compr":"IqcY"}],"MnSf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bsEQ = exports.bsGE = exports.bsGT = exports.bsLE = exports.bsLT = exports.binarySearchNumeric = exports.binarySearch = void 0;

var _compare = require("@thi.ng/compare");

/**
 * Returns the supposed index of `x` in pre-sorted array-like collection
 * `buf`.
 *
 * @remarks
 * If `x` can't be found, returns `-index-1`, representing the negative
 * of the index, were `x` to be inserted into `buf`. E.g if the return
 * value is -3, `x` would appear/insert at index 2.
 *
 * The optional `key` function is used to obtain the actual sort value
 * of `x` and each array item (default: identity).
 *
 * The optional `cmp` comparator (default:
 * {@link @thi.ng/compare#compare}) is then used to identify the index
 * of `x`. The sort order of `buf` MUST be compatible with that of
 * `cmp`.
 *
 * @example
 * ```ts
 * binarySearch([2, 4, 6], 5);
 * // -3
 * ```
 *
 * @param buf - array
 * @param x - search value
 * @param key - key function
 * @param cmp - comparator
 * @param low - min index
 * @param high - max index
 */
const binarySearch = (buf, x, key = x => x, cmp = _compare.compare, low = 0, high = buf.length - 1) => {
  const kx = key(x);

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
 * Similar to {@link binarySearch}, but optimized for numeric arrays and
 * supporting custom comparators (default:
 * {@link @thi.ng/compare#compareNumAsc}).
 *
 * @param buf - array
 * @param x - search value
 * @param cmp - comparator
 * @param low - min index
 * @param high - max index
 */


exports.binarySearch = binarySearch;

const binarySearchNumeric = (buf, x, cmp = _compare.compareNumAsc, low = 0, high = buf.length - 1) => {
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
/**
 * {@link binarySearch} result index classifier for predecessor queries.
 * Returns index of last item less than search value or -1 if no such
 * values exist.
 *
 * @example
 * ```ts
 * bsLT(binarySearch([10, 20, 30, 40], 25))
 * // 1
 * ```
 *
 * @param i - binarySearch result index
 */


exports.binarySearchNumeric = binarySearchNumeric;

const bsLT = i => i < 0 ? -i - 2 : i - 1;
/**
 * Similar to {@link bsLT}, but for less-than-equals queries.
 *
 * @param i - binarySearch result index
 */


exports.bsLT = bsLT;

const bsLE = i => i < 0 ? -i - 2 : i;
/**
 * {@link binarySearch} result index classifier for successor queries.
 * Returns index of first item greater than search value or -1 if no
 * such values exist.
 *
 * @example
 * ```ts
 * src = [10, 20, 30, 40];
 *
 * bsGT(binarySearch(src, 25), src.length)
 * // 2
 *
 * bsGT(binarySearch(src, 40), src.length)
 * // -1
 * ```
 *
 * @param i - binarySearch result index
 * @param n - array length
 */


exports.bsLE = bsLE;

const bsGT = (i, n) => (i = i < 0 ? -i - 1 : i + 1, i < n ? i : -1);
/**
 * Similar to {@link bsGT}, but for greater-than-equals queries.
 *
 * @param i - binarySearch result index
 * @param n - array length
 */


exports.bsGT = bsGT;

const bsGE = (i, n) => (i = i < 0 ? -i - 1 : i, i < n ? i : -1);
/**
 * {@link binarySearch} result index classifier for equals queries.
 * Merely syntax sugar, casting any non-found result indices to -1.
 *
 * @param i - binarySearch result index
 */


exports.bsGE = bsGE;

const bsEQ = i => i < 0 ? -1 : i;

exports.bsEQ = bsEQ;
},{"@thi.ng/compare":"vzOR"}],"jjq4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endsWith = void 0;

var _equiv = require("@thi.ng/equiv");

/**
 * Returns true if the last items of `buf` are the same items as in
 * `needle`.
 *
 * @remarks
 * This means `buf` should have at least the same length as `needle` for
 * this to be true.
 *
 * By default, uses {@link @thi.ng/equiv#equiv} for equality checking.
 *
 * {@link startsWith}
 *
 * @param buf - array
 * @param needle - search values (array)
 * @param equiv - equivalence predicate
 */
const endsWith = (buf, needle, equiv = _equiv.equiv) => {
  let i = buf.length;
  let j = needle.length;
  if (i < j) return false;

  while (--i, --j >= 0 && equiv(buf[i], needle[j])) {}

  return j < 0;
};

exports.endsWith = endsWith;
},{"@thi.ng/equiv":"U8cl"}],"NbJv":[function(require,module,exports) {
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
 * @param x -
 */
const ensureIterable = x => {
  (x == null || !x[Symbol.iterator]) && (0, _errors.illegalArgs)(`value is not iterable: ${x}`);
  return x;
};

exports.ensureIterable = ensureIterable;
},{"@thi.ng/errors":"j3Rf"}],"YCDU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureArrayLike = exports.ensureArray = void 0;

var _checks = require("@thi.ng/checks");

var _ensureIterable = require("./ensure-iterable");

/**
 * Helper function to avoid unnecessary copying if `x` is already an
 * array.
 *
 * @remarks
 * First checks if `x` is an array and if so returns it. Else attempts
 * to obtain an iterator from `x` and if successful collects it as array
 * and returns it. Throws error if `x` isn't iterable.
 *
 * @param x -
 */
const ensureArray = x => (0, _checks.isArray)(x) ? x : [...(0, _ensureIterable.ensureIterable)(x)];
/**
 * Similar to {@link ensureArray}, but for `ArrayLike` types.
 *
 * {@link ensureArray}
 *
 * @param x -
 */


exports.ensureArray = ensureArray;

const ensureArrayLike = x => (0, _checks.isArrayLike)(x) ? x : [...(0, _ensureIterable.ensureIterable)(x)];

exports.ensureArrayLike = ensureArrayLike;
},{"@thi.ng/checks":"XYpc","./ensure-iterable":"NbJv"}],"AVZK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findIndex = exports.find = void 0;

var _equiv2 = require("@thi.ng/equiv");

/**
 * Similar to `Array.find()`, but uses {@link @thi.ng/equiv#equiv} as
 * default predicate.
 *
 * @param buf - array
 * @param x - search value
 * @param equiv - equivalence predicate
 */
const find = (buf, x, equiv = _equiv2.equiv) => {
  const i = findIndex(buf, x, equiv);
  return i !== -1 ? buf[i] : undefined;
};
/**
 * Similar to `Array.findIndex()`, but uses {@link @thi.ng/equiv#equiv}
 * as default predicate.
 *
 * @param buf - array
 * @param x - search value
 * @param equiv - equivalence predicate
 */


exports.find = find;

const findIndex = (buf, x, equiv = _equiv2.equiv) => {
  for (let i = buf.length; --i >= 0;) {
    if (equiv(x, buf[i])) return i;
  }

  return -1;
};

exports.findIndex = findIndex;
},{"@thi.ng/equiv":"U8cl"}],"KC6E":[function(require,module,exports) {
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
 * @remarks
 * The optional `equiv` predicate can be used to customize item equality
 * checking. Uses {@link @thi.ng/equiv#equiv} by default.
 *
 * Adapted and generalized from:
 * {@link https://github.com/bevacqua/fufuzzyzzysearch} (MIT)
 *
 * {@link @thi.ng/transducers#(filterFuzzy:1)}
 *
 * @param domain - array
 * @param query - search value
 * @param equiv - equivalence predicate
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
},{"@thi.ng/equiv":"U8cl"}],"xHsX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSorted = void 0;

var _compare = require("@thi.ng/compare");

/**
 * Returns true if the given array and its elements in the selected
 * index range (entire array, by default) are in the order defined by
 * the given comparator ({@link @thi.ng/compare#compare} by default).
 *
 * @remarks
 * Always returns true, if effective index range (or array length) has
 * less than two elements. No bounds checking.
 *
 * @example
 * ```ts
 * isSorted([3, 2, 1])
 * // false
 *
 * // w/ custom comparator
 * isSorted([3, 2, 1], (a, b) => b - a)
 * // true
 * ```
 *
 * @param arr - array
 * @param cmp - comparator
 * @param start - start index
 * @param end - end index
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
},{"@thi.ng/compare":"vzOR"}],"O6JA":[function(require,module,exports) {
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
},{}],"eOoC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.peek = void 0;

/**
 * Returns last element of given array or `undefined` if array is empty.
 *
 * @param buf - array
 */
const peek = buf => buf[buf.length - 1];

exports.peek = peek;
},{}],"hDYv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiSwap = exports.swap = void 0;

/**
 * Swaps values at index `x`/`y` in given array.
 *
 * @param arr - array
 * @param x - first index
 * @param y - other index
 */
const swap = (arr, x, y) => {
  const t = arr[x];
  arr[x] = arr[y];
  arr[y] = t;
};
/**
 * Higher-order version of {@link swap} for swapping elements in
 * multiple arrays at once and hence useful for sorting multiple arrays
 * based on a single criteria.
 *
 * @remarks
 * The returned function takes the same args as `swap`, and when called
 * swaps 2 elements in the array given to that function AND in the
 * arrays given to {@link multiSwap} itself. Provides fast routes for up to 3
 * extra arrays, then falls back to a loop-based approach.
 *
 * {@link (quickSort:1)}
 *
 * @example
 * ```ts
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
 * @param xs - arrays to swap in later
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
},{}],"elNV":[function(require,module,exports) {
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
},{"@thi.ng/compare":"vzOR","./swap":"hDYv"}],"OLbd":[function(require,module,exports) {
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
    return (this.int() * INV_MAX - 0.5) * 2 * norm;
  }

  minmax(min, max) {
    return this.float() * (max - min) + min;
  }
  /**
   * Returns approx. normal distribution using CLT.
   *
   * {@link https://en.wikipedia.org/wiki/Central_limit_theorem}
   *
   * @param n -
   * @param offset -
   * @param scale -
   */


  gaussian(n = 10, offset = -0.5, scale = 1) {
    let sum = 0;
    let m = n;

    while (m-- > 0) sum += this.float(scale);

    return sum / n + offset;
  }

}

exports.ARandom = ARandom;
},{}],"KRtU":[function(require,module,exports) {
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
},{"./api":"OLbd"}],"E4xu":[function(require,module,exports) {
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

  norm(norm = 1) {
    return (random() - 0.5) * 2 * norm;
  }

}

exports.SystemRandom = SystemRandom;
const SYSTEM = new SystemRandom();
exports.SYSTEM = SYSTEM;
},{"./api":"OLbd"}],"CxPr":[function(require,module,exports) {
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
},{"./api":"OLbd"}],"IyZn":[function(require,module,exports) {
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
},{"./api":"OLbd"}],"d2OW":[function(require,module,exports) {
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
},{"./api":"OLbd"}],"C1HS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomBytes = void 0;

var _checks = require("@thi.ng/checks");

var _system = require("./system");

/**
 * Fills given byte array with random values. Wrapper for
 * `crypto.getRandomValues()` with automatic fallback to using
 * `Math.random` if platform doesn't provide global crypto instance.
 */
const randomBytes = (0, _checks.hasCrypto)() ? buf => window.crypto.getRandomValues(buf) : buf => {
  const n = buf.length;

  for (let i = 0; i < n; i++) {
    buf[i] = _system.SYSTEM.int() & 0xff;
  }

  return buf;
};
exports.randomBytes = randomBytes;
},{"@thi.ng/checks":"XYpc","./system":"E4xu"}],"lzH4":[function(require,module,exports) {
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
 * @example
 * ```ts
 * randomID()
 * "qgdt"
 *
 * randomID(8, "id-", "0123456789ABCDEF")
 * "id-94EF6E1A"
 * ```
 *
 * @param len -
 * @param prefix -
 * @param syms -
 * @param rnd -
 */
const randomID = (len = 4, prefix = "", syms = "abcdefghijklmnopqrstuvwxyz", rnd = _system.SYSTEM) => {
  for (const n = syms.length; --len >= 0;) {
    prefix += syms[rnd.float(n) | 0];
  }

  return prefix;
};

exports.randomID = randomID;
},{"./system":"E4xu"}],"Zw70":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weightedRandom = void 0;

var _api = require("@thi.ng/api");

var _system = require("./system");

/**
 * Returns a no-arg function which produces a random choice of given
 * weighted `choices` and using given {@link IRandom} instance (default
 * {@link SYSTEM}. If `weights` are given, it must be the same size as
 * `choices`. If omitted, each choice will have same probability.
 *
 * {@link https://www.electricmonk.nl/log/2009/12/23/weighted-random-distribution/}
 *
 * @param choices -
 * @param weights -
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
},{"@thi.ng/api":"MOSf","./system":"E4xu"}],"C0Vh":[function(require,module,exports) {
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

var _randomBytes = require("./random-bytes");

Object.keys(_randomBytes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _randomBytes[key];
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
},{"./api":"OLbd","./smush32":"KRtU","./system":"E4xu","./xorshift128":"CxPr","./xorwow":"IyZn","./xsadd":"d2OW","./random-bytes":"C1HS","./random-id":"lzH4","./weighted-random":"Zw70"}],"oQP0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffle = exports.shuffleRange = void 0;

var _api = require("@thi.ng/api");

var _random = require("@thi.ng/random");

/**
 * Shuffles the items in the given index range of array `buf` using
 * Fisher-yates and optional `rnd` PRNG.
 *
 * @remarks
 * If neither `start` / `end` are given, the entire array will be
 * shuffled. Mutates original array.
 *
 * See {@link @thi.ng/random#IRandom}
 *
 * @param buf - array
 * @param n - num items
 * @param rnd - PRNG
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
 * Applies {@link shuffleRange} to the given array. If `n` is given,
 * only the first `n` items are shuffled. Mutates original array.
 *
 * {@link shuffleRange}
 *
 * @param buf - array
 * @param n - num items
 * @param rnd - PRNG
 */


exports.shuffleRange = shuffleRange;

const shuffle = (buf, n = buf.length, rnd = _random.SYSTEM) => shuffleRange(buf, 0, n, rnd);

exports.shuffle = shuffle;
},{"@thi.ng/api":"MOSf","@thi.ng/random":"C0Vh"}],"A0Jc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startsWith = void 0;

var _equiv = require("@thi.ng/equiv");

/**
 * Returns true if the first items of `buf` are the same items as in
 * `needle`.
 *
 * @remarks
 * This means `buf` should have at least the same length as `needle` for
 * this to be true.
 *
 * By default, uses {@link @thi.ng/equiv#equiv} for equality checking.
 *
 * {@link endsWith}
 *
 * @param buf - array
 * @param needle - search value
 * @param equiv - equivalence predicate
 */
const startsWith = (buf, needle, equiv = _equiv.equiv) => {
  let i = buf.length;
  let j = needle.length;
  if (i < j) return false;

  while (-j >= 0 && equiv(buf[j], needle[j])) {}

  return j < 0;
};

exports.startsWith = startsWith;
},{"@thi.ng/equiv":"U8cl"}],"WYrG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swizzle = void 0;

/**
 * Returns optimized function to immutably select, repeat, reshape and /
 * or reorder array / object values in the specified index order.
 *
 * @remarks
 * Fast paths for up to 8 indices are provided, before a loop based
 * approach is used.
 *
 * @example
 * ```ts
 * swizzle([0, 0, 0])([1, 2, 3, 4])    // [ 1, 1, 1 ]
 * swizzle([1, 1, 3, 3])([1, 2, 3, 4]) // [ 2, 2, 4, 4 ]
 * swizzle([2, 0])([1, 2, 3])          // [ 3, 1 ]
 * ```
 *
 * @example
 * Objects can be used as input to the generated function, but the
 * result will always be in array form.

 * ```ts
 * swizzle(["a", "c", "b"])({a: 1, b: 2, c: 3}) // [ 1, 3, 2 ]
 * ```
 *
 * @param order - indices
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
},{}],"iKN7":[function(require,module,exports) {
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
},{"./binary-search":"MnSf","./ends-with":"jjq4","./ensure-array":"YCDU","./ensure-iterable":"NbJv","./find":"AVZK","./fuzzy-match":"KC6E","./is-sorted":"xHsX","./iterator":"O6JA","./peek":"eOoC","./quicksort":"elNV","./shuffle":"oQP0","./starts-with":"A0Jc","./swap":"hDYv","./swizzle":"WYrG"}],"UIqX":[function(require,module,exports) {
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
},{"@thi.ng/arrays":"iKN7","../iterator":"fhdf","./filter":"AmRG"}],"GrLQ":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf","../reduced":"N1be"}],"FhYa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = flatten;

var _flattenWith = require("./flatten-with");

function flatten(src) {
  return (0, _flattenWith.flattenWith)(x => x != null && x[Symbol.iterator] && typeof x !== "string" ? x : undefined, src);
}
},{"./flatten-with":"GrLQ"}],"n5y9":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf"}],"v3WG":[function(require,module,exports) {
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
},{"../iterator":"fhdf","./map-indexed":"n5y9"}],"AqTY":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf","../reduced":"N1be"}],"vBNp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comp = comp;

var _compose = require("@thi.ng/compose");

var _ensure = require("../internal/ensure");

function comp(...fns) {
  fns = fns.map(_ensure.ensureTransducer);
  return _compose.comp.apply(null, fns);
}
},{"@thi.ng/compose":"gnoC","../internal/ensure":"IMN5"}],"oFfM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normRange = normRange;

/**
 * Yields sequence of `n+1` monotonically increasing numbers in the
 * closed interval (0.0 .. 1.0). If `n <= 0`, yields nothing.
 *
 * @example
 * ```ts
 * [...normRange(4)]
 * // [0, 0.25, 0.5, 0.75, 1.0]
 * ```
 *
 * @param n - number of steps
 * @param inclLast - include last value (i.e. `1.0`)
 */
function* normRange(n, inclLast = true) {
  if (n > 0) {
    for (let i = 0, m = inclLast ? n + 1 : n; i < m; i++) {
      yield i / n;
    }
  }
}
},{}],"pk6b":[function(require,module,exports) {
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
},{"../func/comp":"vBNp","../iterator":"fhdf","./cat":"arAw","./map":"WUst"}],"IixE":[function(require,module,exports) {
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
},{"../iterator":"fhdf"}],"H1Uj":[function(require,module,exports) {
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
},{"../func/comp":"vBNp","../iter/norm-range":"oFfM","../iterator":"fhdf","./map":"WUst","./mapcat":"pk6b","./partition":"IixE"}],"zd6y":[function(require,module,exports) {
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
},{}],"FWip":[function(require,module,exports) {
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
},{"./api":"zd6y"}],"uNzl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastSin = exports.fastCos = exports.normCos = exports.loc = exports.cot = exports.sec = exports.csc = exports.rad = exports.deg = exports.quadrant = exports.atan2Abs = exports.angleDist = exports.absInnerAngle = exports.absTheta = exports.cossin = exports.sincos = void 0;

var _api = require("./api");

/**
 * Returns vector of `[sin(theta)*n, cos(theta)*n]`.
 *
 * @param theta -
 * @param n -
 */
const sincos = (theta, n = 1) => [Math.sin(theta) * n, Math.cos(theta) * n];
/**
 * Returns vector of `[cos(theta)*n, sin(theta)*n]`.
 *
 * @param theta -
 * @param n -
 */


exports.sincos = sincos;

const cossin = (theta, n = 1) => [Math.cos(theta) * n, Math.sin(theta) * n];
/**
 * Projects `theta` into [0 .. 2π] interval.
 *
 * @param theta -
 */


exports.cossin = cossin;

const absTheta = theta => (theta %= _api.TAU, theta < 0 ? _api.TAU + theta : theta);

exports.absTheta = absTheta;

const absInnerAngle = theta => (theta = Math.abs(theta), theta > _api.PI ? _api.TAU - theta : theta);
/**
 * Returns smallest absolute angle difference between `a` and `b`.
 * Result will be in [0 .. π] interval.
 *
 * @param a -
 * @param b -
 */


exports.absInnerAngle = absInnerAngle;

const angleDist = (a, b) => absInnerAngle(absTheta(b % _api.TAU - a % _api.TAU));
/**
 * Like `Math.atan2`, but always returns angle in [0 .. TAU) interval.
 *
 * @param y -
 * @param x -
 */


exports.angleDist = angleDist;

const atan2Abs = (y, x) => absTheta(Math.atan2(y, x));
/**
 * Returns quadrant ID (0-3) of given angle (in radians).
 *
 * @param theta -
 */


exports.atan2Abs = atan2Abs;

const quadrant = theta => absTheta(theta) * _api.INV_HALF_PI | 0;
/**
 * Converts angle to degrees.
 *
 * @param theta - angle in radians
 */


exports.quadrant = quadrant;

const deg = theta => theta * _api.RAD2DEG;
/**
 * Converts angle to radians.
 *
 * @param theta - angle in degrees
 */


exports.deg = deg;

const rad = theta => theta * _api.DEG2RAD;
/**
 * Cosecant. Approaches `±Infinity` for `theta` near multiples of π.
 *
 * @param theta - angle in radians
 */


exports.rad = rad;

const csc = theta => 1 / Math.sin(theta);
/**
 * Secant. Approaches `±Infinity` for `theta` near π/2 ± nπ
 *
 * @param theta - angle in radians
 */


exports.csc = csc;

const sec = theta => 1 / Math.cos(theta);
/**
 * Cotangent. Approaches `±Infinity` for `theta` near multiples of π.
 *
 * @param theta - angle in radians
 */


exports.sec = sec;

const cot = theta => 1 / Math.tan(theta);
/**
 * Law of Cosines. Takes length of two sides of a triangle and the inner
 * angle (in radians) between them. Returns length of third side.
 *
 * @param a -
 * @param b -
 * @param gamma -
 */


exports.cot = cot;

const loc = (a, b, gamma) => Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(gamma));
/**
 * Approximates cos(xπ) for x in [-1,1]
 *
 * @param x -
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
 * Fast cosine approximation using {@link normCos} (polynomial). Max. error
 * ~0.00059693
 *
 * In [0 .. 2π] interval, approx. 18-20% faster than `Math.cos` on V8.
 *
 * @param theta - in radians
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
 * {@link fastCos}
 *
 * @param theta - in radians
 */


exports.fastCos = fastCos;

const fastSin = theta => fastCos(_api.HALF_PI - theta);

exports.fastSin = fastSin;
},{"./api":"zd6y"}],"SDG2":[function(require,module,exports) {
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
 * @param a - left value
 * @param b - right value
 * @param eps - epsilon / tolerance, default `1e-6`
 */

const eqDelta = (a, b, eps = _api.EPS) => abs(a - b) <= eps * max(1, abs(a), abs(b));
/**
 * Similar to {@link eqDelta}, but used given `eps` as is.
 *
 * @param a - left value
 * @param b - right value
 * @param eps - epsilon / tolerance, default `1e-6`
 */


exports.eqDelta = eqDelta;

const eqDeltaFixed = (a, b, eps = _api.EPS) => abs(a - b) <= eps;

exports.eqDeltaFixed = eqDeltaFixed;
},{"./api":"zd6y"}],"GRoL":[function(require,module,exports) {
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
 * @example
 * ```ts
 * b1  a2
 *   \/
 *   /\
 * a1  b2
 * ```
 *
 * @param a1 -
 * @param a2 -
 * @param b1 -
 * @param b2 -
 */
const isCrossOver = (a1, a2, b1, b2) => a1 < b1 && a2 > b2;
/**
 * Returns true if line A rises up over B.
 *
 * @example
 * ```ts
 * a1  b2
 *   \/
 *   /\
 * b1  a2
 * ```
 *
 * @param a1 -
 * @param a2 -
 * @param b1 -
 * @param b2 -
 */


exports.isCrossOver = isCrossOver;

const isCrossUnder = (a1, a2, b1, b2) => a1 > b1 && a2 < b2;
/**
 * Returns {@link Crossing} classifier indicating the relationship of line A
 * to line B. The optional epsilon value is used to determine if both
 * lines are considered equal or flat.
 *
 * - {@link isCrossOver}
 * - {@link isCrossUnder}
 * - {@link Crossing}
 *
 * @param a1 -
 * @param a2 -
 * @param b1 -
 * @param b2 -
 * @param eps -
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
},{"./api":"zd6y","./eqdelta":"SDG2"}],"xI7W":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maximaIndices = exports.minimaIndices = exports.maximaIndex = exports.minimaIndex = exports.isMaxima = exports.isMinima = void 0;

/**
 * Returns true if `b` is a local minima, i.e. iff a > b and b < c.
 *
 * @param a -
 * @param b -
 * @param c -
 */
const isMinima = (a, b, c) => a > b && b < c;
/**
 * Returns true if `b` is a local maxima, i.e. iff a < b and b > c.
 *
 * @param a -
 * @param b -
 * @param c -
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
 * @param values -
 * @param from -
 * @param to -
 */


const minimaIndex = (values, from = 0, to = values.length) => index(isMinima, values, from, to);
/**
 * Returns index of the first local & internal maxima found in given
 * `values` array, or -1 if no such maxima exists. The search range can
 * be optionally defined via semi-open [from, to) index interval.
 *
 * @param values -
 * @param from -
 * @param to -
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
 * @param values -
 * @param from -
 * @param to -
 */


const minimaIndices = (values, from = 0, to = values.length) => indices(minimaIndex, values, from, to);
/**
 * Returns an iterator yielding all maxima indices in given `values`
 * array. The search range can be optionally defined via semi-open
 * [from, to) index interval.
 *
 * @param values -
 * @param from -
 * @param to -
 */


exports.minimaIndices = minimaIndices;

const maximaIndices = (values, from = 0, to = values.length) => indices(minimaIndex, values, from, to);

exports.maximaIndices = maximaIndices;
},{}],"PBUS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inOpenRange = exports.inRange = exports.foldback = exports.absMax = exports.absMin = exports.sclamp = exports.smax = exports.smin = exports.max4id = exports.max3id = exports.max2id = exports.min4id = exports.min3id = exports.min2id = exports.wrap11 = exports.wrap01 = exports.wrapOnce = exports.wrap = exports.clamp05 = exports.clamp11 = exports.clamp01 = exports.clamp = void 0;

/**
 * Clamps value `x` to given closed interval.
 *
 * @param x - value to clamp
 * @param min - lower bound
 * @param max - upper bound
 */
const clamp = (x, min, max) => x < min ? min : x > max ? max : x;
/**
 * Clamps value `x` to closed [0 .. 1] interval.
 *
 * @param x
 */


exports.clamp = clamp;

const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;
/**
 * Clamps value `x` to closed [-1 .. 1] interval.
 *
 * @param x
 */


exports.clamp01 = clamp01;

const clamp11 = x => x < -1 ? -1 : x > 1 ? 1 : x;
/**
 * Clamps value `x` to closed [0 .. 0.5] interval.
 *
 * @param x
 */


exports.clamp11 = clamp11;

const clamp05 = x => x < 0 ? 0 : x > 0.5 ? 0.5 : x;
/**
 * Folds `x` back inside closed [min..max] interval. Also see
 * {@link wrapOnce}.
 *
 * @param x -
 * @param min -
 * @param max -
 */


exports.clamp05 = clamp05;

const wrap = (x, min, max) => {
  if (min === max) return min;

  if (x > max) {
    const d = max - min;
    x -= d;
    if (x > max) x -= d * ((x - min) / d | 0);
  } else if (x < min) {
    const d = max - min;
    x += d;
    if (x < min) x += d * ((min - x) / d + 1 | 0);
  }

  return x;
};
/**
 * Like {@link wrap}, but optimized for cases where `x` is guaranteed to
 * be in `[min - d, max + d]` interval, where `d = max - min`. Result
 * will be in closed `[min..max]` interval.
 *
 * @param x -
 * @param min -
 * @param max -
 */


exports.wrap = wrap;

const wrapOnce = (x, min, max) => x < min ? x - min + max : x > max ? x - max + min : x;
/**
 * Similar to {@link wrapOnce} for [0..1] interval.
 *
 * @param x -
 */


exports.wrapOnce = wrapOnce;

const wrap01 = x => x < 0 ? x + 1 : x > 1 ? x - 1 : x;
/**
 * Similar to {@link wrapOnce} for [-1..1] interval.
 *
 * @param x -
 */


exports.wrap01 = wrap01;

const wrap11 = x => x < -1 ? x + 2 : x > 1 ? x - 2 : x;

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
 * @param a -
 * @param b -
 * @param k - smooth exponent (MUST be > 0)
 */


exports.max4id = max4id;

const smin = (a, b, k) => smax(a, b, -k);
/**
 * Smooth maximum. Note: Result values will be slightly larger than max
 * value near max(a,b) + eps due to exponential decay. Higher `k` values
 * reduce the error, but also reduce the smoothing. Recommended k=16.
 *
 * {@link https://en.wikipedia.org/wiki/Smooth_maximum}
 *
 * @param a -
 * @param b -
 * @param k - smooth exponent (MUST be > 0)
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
 * @param x -
 * @param min -
 * @param max -
 * @param k -
 */


exports.smax = smax;

const sclamp = (x, min, max, k) => smin(smax(x, min, k), max, k);

exports.sclamp = sclamp;

const absMin = (a, b) => Math.abs(a) < Math.abs(b) ? a : b;

exports.absMin = absMin;

const absMax = (a, b) => Math.abs(a) > Math.abs(b) ? a : b;
/**
 * If `abs(x) > abs(e)`, recursively mirrors `x` back into `[-e .. +e]`
 * interval at respective positive/negative boundary.
 *
 * @remarks
 * References:
 * - https://www.desmos.com/calculator/lkyf2ag3ta
 * - https://www.musicdsp.org/en/latest/Effects/203-fold-back-distortion.html
 *
 * @param e - threshold (> 0)
 * @param x - input value
 */


exports.absMax = absMax;

const foldback = (e, x) => x < -e || x > e ? Math.abs(Math.abs((x - e) % (4 * e)) - 2 * e) - e : x;
/**
 * Returns true iff `x` is in closed interval `[min .. max]`
 *
 * @param x -
 * @param min -
 * @param max -
 */


exports.foldback = foldback;

const inRange = (x, min, max) => x >= min && x <= max;
/**
 * Returns true iff `x` is in open interval `(min .. max)`
 *
 * @param x -
 * @param min -
 * @param max -
 */


exports.inRange = inRange;

const inOpenRange = (x, min, max) => x > min && x < max;

exports.inOpenRange = inOpenRange;
},{}],"rFLZ":[function(require,module,exports) {
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
 * @param x -
 * @param a -
 * @param b -
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
},{"./interval":"PBUS"}],"dt8m":[function(require,module,exports) {
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
},{}],"xVeb":[function(require,module,exports) {
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
 * @param fn - function to evaluate
 * @param error - error function
 * @param q - target value
 * @param res - number of samples per interval
 * @param iter - max number of iterations / recursion limit
 * @param start - interval start
 * @param end - interval end
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
},{"./api":"zd6y"}],"B0dQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expFactor = exports.sigmoid11 = exports.sigmoid = exports.sinc = exports.cubicPulse = exports.parabola = exports.gain = exports.impulse = exports.ease = exports.bounce = exports.decimated = exports.cosine = exports.circular = exports.tween = exports.tangentDiff3 = exports.tangentCardinal = exports.mixCubicHermite = exports.mixHermite = exports.mixCubic = exports.mixQuadratic = exports.mixBilinear = exports.mix = void 0;

var _api = require("./api");

const mix = (a, b, t) => a + (b - a) * t;
/**
 * @example
 * ```ts
 * c    d
 * +----+
 * |    |
 * +----+
 * a    b
 * ```
 *
 * @param a - BL value
 * @param b - BR value
 * @param c - TL value
 * @param d - TR value
 * @param u - 1st interpolation factor
 * @param v - 2nd interpolation factor
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
 * {@link mixCubicHermite} with one of the tangent generators supporting
 * non-uniform spacing of points.
 *
 * See: {@link https://www.desmos.com/calculator/j4gf8g9vkr}
 *
 * Source:
 * {@link https://www.musicdsp.org/en/latest/Other/93-hermite-interpollation.html}
 *
 * - {@link mixCubicHermite}
 * - {@link tangentCardinal}
 * - {@link tangentDiff3}
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param t -
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
 * {@link https://en.wikipedia.org/wiki/Cubic_Hermite_spline}
 *
 * - {@link mixHermite}
 * - {@link tangentCardinal}
 * - {@link tangentDiff3}
 *
 * @param a -
 * @param ta -
 * @param b -
 * @param tb -
 * @param t -
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
 * Helper function for {@link mixCubicHermite}. Computes cardinal tangents
 * based on point neighbors of a point B (not given), i.e. `a`
 * (predecessor) and `c` (successor) and their times (defaults to
 * uniformly spaced). The optional `tension` parameter can be used to
 * scale the tangent where 0.0 produces a Cardinal spline tangent and
 * 1.0 a Catmull-Rom (opposite to the Wikipedia ref).
 *
 * {@link https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline}
 *
 * @param prev -
 * @param next -
 * @param scale -
 * @param ta -
 * @param tc -
 */


exports.mixCubicHermite = mixCubicHermite;

const tangentCardinal = (prev, next, scale = 0.5, ta = 0, tc = 2) => scale * ((next - prev) / (tc - ta));
/**
 * Helper function for {@link mixCubicHermite}. Computes tangent for `curr`,
 * based on 3-point finite difference, where `prev` & `next` are
 * `curr`'s neighbors and the `tX` the three points' respective time
 * values. The latter are equally spaced by default (each 1.0 apart).
 *
 * Using this function with equal spacing of 1.0 and together with
 * {@link mixCubicHermite} will produce same results as the somewhat
 * optimized variant {@link mixHermite}.
 *
 * {@link https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Finite_difference}
 *
 * @param prev -
 * @param curr -
 * @param next -
 * @param ta -
 * @param tb -
 * @param tc -
 */


exports.tangentCardinal = tangentCardinal;

const tangentDiff3 = (prev, curr, next, ta = 0, tb = 1, tc = 2) => 0.5 * ((next - curr) / (tc - tb) + (curr - prev) / (tb - ta));
/**
 * HOF interpolator. Takes a timing function `f` and interval `[from,
 * to]`. Returns function which takes normalized time as single arg and
 * returns interpolated value.
 *
 * @param f -
 * @param from -
 * @param to -
 */


exports.tangentDiff3 = tangentDiff3;

const tween = (f, from, to) => t => mix(from, to, f(t));
/**
 * Circular interpolation: `sqrt(1 - (1 - t)^2)`
 *
 * @param t - interpolation factor (0.0 .. 1.0)
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
 * @param ease - easing behavior [0.0 .. ∞]
 * @param t -
 */


exports.bounce = bounce;

const ease = (ease, t) => Math.pow(t, ease);
/**
 * HOF impulse generator. Peaks at `t=1/k`
 *
 * @param k - impulse width (higher values => shorter impulse)
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
 * @param k -
 * @param t -
 */


exports.sinc = sinc;

const sigmoid = (k, t) => 1 / (1 + Math.exp(-k * (2 * t - 1)));
/**
 * Sigmoid function for inputs in [-1..+1] interval.
 *
 * @param k -
 * @param t -
 */


exports.sigmoid = sigmoid;

const sigmoid11 = (k, t) => 1 / (1 + Math.exp(-k * t));
/**
 * Computes exponential factor to interpolate from `a` to `b` over
 * `num` steps. I.e. multiplying `a` with the returned factor will yield
 * `b` after `num` steps. All args must be > 0.
 *
 * @param a
 * @param b
 * @param num
 */


exports.sigmoid11 = sigmoid11;

const expFactor = (a, b, num) => Math.pow(b / a, 1 / num);

exports.expFactor = expFactor;
},{"./api":"zd6y"}],"UVR2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundEps = exports.roundTo = exports.trunc = exports.fract = exports.fmod = void 0;

var _api = require("./api");

/**
 * Returns `a - b * floor(a/b)`
 *
 * @param a -
 * @param b -
 */
const fmod = (a, b) => a - b * Math.floor(a / b);

exports.fmod = fmod;

const fract = x => x - Math.floor(x);

exports.fract = fract;

const trunc = x => x < 0 ? Math.ceil(x) : Math.floor(x);

exports.trunc = trunc;

const roundTo = (x, prec = 1) => Math.round(x / prec) * prec;
/**
 * Only rounds `x` to nearest int if `fract(x)` <= `eps` or >= `1-eps`.
 *
 * @param x -
 * @param eps -
 */


exports.roundTo = roundTo;

const roundEps = (x, eps = _api.EPS) => {
  const f = fract(x);
  return f <= eps || f >= 1 - eps ? Math.round(x) : x;
};

exports.roundEps = roundEps;
},{"./api":"zd6y"}],"KH43":[function(require,module,exports) {
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
},{}],"bgMt":[function(require,module,exports) {
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
 * {@link https://en.wikipedia.org/wiki/Derivative#Continuity_and_differentiability}
 *
 * @param fn -
 * @param eps -
 */
const derivative = (f, eps = _api.EPS) => x => (f(x + eps) - f(x)) / eps;
/**
 * Computes solution for linear equation: `ax + b = 0`.
 *
 * Note: `a` MUST NOT be zero.
 *
 * @param a - slope
 * @param b - constant offset
 */


exports.derivative = derivative;

const solveLinear = (a, b) => -b / a;
/**
 * Computes solutions for quadratic equation: `ax^2 + bx + c = 0`.
 * Returns array of real solutions.
 * Note: `a` MUST NOT be zero. If the quadratic term is missing,
 * use {@link solveLinear} instead.
 *
 * - {@link https://en.wikipedia.org/wiki/Quadratic_function}
 * - {@link https://en.wikipedia.org/wiki/Quadratic_equation}
 *
 * @param a - quadratic coefficient
 * @param b - linear coefficient
 * @param c - constant offset
 * @param eps - tolerance to determine multiple roots
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
 * use {@link solveQuadratic} or {@link solveLinear} instead.
 *
 * {@link https://en.wikipedia.org/wiki/Cubic_function}
 *
 * @param a - cubic coefficient
 * @param b - quadratic coefficient
 * @param c - linear coefficient
 * @param d - constant offset
 * @param eps - tolerance to determine multiple roots
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
},{"./api":"zd6y"}],"QhSg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expStep = exports.smootherStep = exports.smoothStep = exports.step = void 0;

var _interval = require("./interval");

/**
 * Step/threshold function.
 *
 * @param edge - threshold
 * @param x - test value
 * @returns 0, if `x < e`, else 1
 */
const step = (edge, x) => x < edge ? 0 : 1;
/**
 * GLSL-style smoothStep threshold function.
 *
 * @param edge - lower threshold
 * @param edge2 - upper threshold
 * @param x - test value
 * @returns 0, if `x < edge1`, 1 if `x > edge2`, else sigmoid interpolation
 */


exports.step = step;

const smoothStep = (edge, edge2, x) => {
  x = (0, _interval.clamp01)((x - edge) / (edge2 - edge));
  return (3 - 2 * x) * x * x;
};
/**
 * Similar to {@link smoothStep} but using different polynomial.
 *
 * @param edge -
 * @param edge2 -
 * @param x -
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
 * @param k -
 * @param n -
 * @param x -
 */


exports.smootherStep = smootherStep;

const expStep = (k, n, x) => 1 - Math.exp(-k * Math.pow(x, n));

exports.expStep = expStep;
},{"./interval":"PBUS"}],"zoYr":[function(require,module,exports) {
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
},{"./api":"zd6y","./abs":"FWip","./angle":"uNzl","./crossing":"GRoL","./eqdelta":"SDG2","./extrema":"xI7W","./fit":"rFLZ","./int":"dt8m","./interval":"PBUS","./min-error":"xVeb","./mix":"B0dQ","./prec":"UVR2","./ratio":"KH43","./solve":"bgMt","./step":"QhSg"}],"nhqr":[function(require,module,exports) {
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
},{"@thi.ng/math":"zoYr","./interpolate":"H1Uj"}],"jvQK":[function(require,module,exports) {
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
},{"@thi.ng/math":"zoYr","./interpolate":"H1Uj"}],"C4Kx":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf","../reduced":"N1be"}],"cSVz":[function(require,module,exports) {
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
},{"@thi.ng/compose":"gnoC","../func/compr":"IqcY","../iterator":"fhdf"}],"GHxA":[function(require,module,exports) {
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
},{"@thi.ng/checks":"XYpc","../iterator":"fhdf","./map":"WUst"}],"Khd6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepTransform = void 0;

var _checks = require("@thi.ng/checks");

/**
 * Higher-order deep object transformer used by {@link (mapDeep:1)}.
 * Accepts a nested `spec` array reflecting same key structure as the
 * object to be mapped, but with functions or sub-specs as their values.
 * Returns a new function, which when called, recursively applies nested
 * transformers in post-order traversal (child transformers are run
 * first) and returns the result of the root transformer.
 *
 * @remarks
 * The transform specs are given as arrays in this format:
 *
 * ```ts
 * [tx-function, { key1: [tx-function, {...}], key2: tx-fn }]
 * ```
 *
 * If a key in the spec has no further sub maps, its transform function
 * can be given directly without having to wrap it into the usual array
 * structure.
 *
 * @example
 * ```ts
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
 * @param spec - transformation spec
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
},{"@thi.ng/checks":"XYpc"}],"OxBd":[function(require,module,exports) {
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
},{"../func/deep-transform":"Khd6","../iterator":"fhdf","./map":"WUst"}],"Zidv":[function(require,module,exports) {
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
},{"../iterator":"fhdf","./map":"WUst"}],"OvXR":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf"}],"C0YV":[function(require,module,exports) {
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
},{"../iterator":"fhdf","./map":"WUst"}],"o8VT":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf","../reduced":"N1be"}],"CbTT":[function(require,module,exports) {
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
},{"../func/comp":"vBNp","../iterator":"fhdf","./filter":"AmRG","./take":"o8VT"}],"cvYg":[function(require,module,exports) {
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
 * @param buf -
 * @param complete -
 * @param reduce -
 *
 * @internal
 */
const __drain = (buf, complete, reduce) => acc => {
  while (buf.length && !(0, _reduced.isReduced)(acc)) {
    acc = reduce(acc, buf.shift());
  }

  return complete(acc);
};

exports.__drain = __drain;
},{"../reduced":"N1be"}],"OmPI":[function(require,module,exports) {
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
},{"../internal/drain":"cvYg","../iterator":"fhdf"}],"o7kz":[function(require,module,exports) {
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
},{"../func/comp":"vBNp","../iterator":"fhdf","./filter":"AmRG","./take-last":"OmPI"}],"ocT9":[function(require,module,exports) {
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
},{"@thi.ng/errors":"j3Rf","../func/compr":"IqcY","../iterator":"fhdf"}],"NZk2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__sortOpts = void 0;

var _compare = require("@thi.ng/compare");

var _compose = require("@thi.ng/compose");

/**
 * Helper function to inject default {@link SortOpts}.
 *
 * @param opts -
 *
 * @internal
 */
const __sortOpts = opts => Object.assign({
  key: _compose.identity,
  compare: _compare.compare
}, opts);

exports.__sortOpts = __sortOpts;
},{"@thi.ng/compare":"vzOR","@thi.ng/compose":"gnoC"}],"p2Dn":[function(require,module,exports) {
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
},{"../func/comp":"vBNp","../internal/sort-opts":"NZk2","../iterator":"fhdf","./map":"WUst","./partition":"IixE"}],"GmFf":[function(require,module,exports) {
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
},{"@thi.ng/compose":"gnoC","../step":"o6XN","./map":"WUst"}],"iIRC":[function(require,module,exports) {
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
},{}],"HBXk":[function(require,module,exports) {
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
},{"@thi.ng/checks":"XYpc","../func/comp":"vBNp","../func/renamer":"iIRC","../iterator":"fhdf","../transduce":"iqGa","./filter":"AmRG","./map":"WUst"}],"sFj2":[function(require,module,exports) {
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
},{"../func/comp":"vBNp","../iterator":"fhdf","./multiplex":"GmFf","./rename":"HBXk"}],"JLiJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = void 0;

/**
 * No-op / pass-through transducer, essentially the same as:
 * `map((x) => x)`, but faster. Useful for testing and / or to keep
 * existing values in a {@link (multiplex:1)} tuple lane.
 */
const noop = () => rfn => rfn;

exports.noop = noop;
},{}],"v6pt":[function(require,module,exports) {
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
},{"../iterator":"fhdf","../reduced":"N1be"}],"gT1U":[function(require,module,exports) {
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
},{"../func/comp":"vBNp","../iterator":"fhdf","./drop":"Xj6O","./take":"o8VT"}],"NsL8":[function(require,module,exports) {
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
},{"@thi.ng/api":"MOSf","../iterator":"fhdf","../reduced":"N1be"}],"L6Yr":[function(require,module,exports) {
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
},{"../iterator":"fhdf","./partition-by":"NsL8"}],"ENs0":[function(require,module,exports) {
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
},{"../func/comp":"vBNp","../internal/sort-opts":"NZk2","../iterator":"fhdf","./mapcat":"pk6b","./partition":"IixE"}],"mSEP":[function(require,module,exports) {
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
},{"@thi.ng/checks":"XYpc","@thi.ng/compose":"gnoC","@thi.ng/errors":"j3Rf","../iterator":"fhdf","../reduced":"N1be"}],"klYB":[function(require,module,exports) {
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
},{"../iterator":"fhdf","./map":"WUst"}],"YDOC":[function(require,module,exports) {
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
},{"@thi.ng/random":"C0Vh","../func/compr":"IqcY","../iterator":"fhdf"}],"aO4q":[function(require,module,exports) {
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
},{"../iterator":"fhdf","../reduced":"N1be"}],"xiIq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keySelector = void 0;

var _renamer = require("./renamer");

const keySelector = keys => (0, _renamer.renamer)(keys.reduce((acc, x) => (acc[x] = x, acc), {}));

exports.keySelector = keySelector;
},{"./renamer":"iIRC"}],"a0Sj":[function(require,module,exports) {
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
},{"../func/key-selector":"xiIq","../iterator":"fhdf","./map":"WUst"}],"PW9O":[function(require,module,exports) {
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
 * @param fn - side effect
 */
const sideEffect = fn => (0, _map.map)(x => (fn(x), x));

exports.sideEffect = sideEffect;
},{"./map":"WUst"}],"iM70":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf"}],"LJ5K":[function(require,module,exports) {
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
},{"@thi.ng/arrays":"iKN7","../iterator":"fhdf","../reduced":"N1be"}],"Ik0n":[function(require,module,exports) {
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
},{"@thi.ng/arrays":"iKN7","../internal/drain":"cvYg","../internal/sort-opts":"NZk2","../iterator":"fhdf"}],"IfpI":[function(require,module,exports) {
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
},{"../func/comp":"vBNp","../iterator":"fhdf","./map-keys":"Zidv","./partition":"IixE","./partition-of":"L6Yr","./rename":"HBXk"}],"sSrO":[function(require,module,exports) {
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
},{"@thi.ng/arrays":"iKN7","../iterator":"fhdf","./map":"WUst"}],"aUgM":[function(require,module,exports) {
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
},{"../iterator":"fhdf","./throttle":"FY79"}],"eKGP":[function(require,module,exports) {
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
},{"../func/compr":"IqcY","../iterator":"fhdf","../reduced":"N1be"}],"DYsp":[function(require,module,exports) {
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
},{"../iterator":"fhdf","./throttle":"FY79"}],"UpJA":[function(require,module,exports) {
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
},{"../iterator":"fhdf"}],"VbxX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trace = void 0;

var _sideEffect = require("./side-effect");

const trace = (prefix = "") => (0, _sideEffect.sideEffect)(x => console.log(prefix, x));

exports.trace = trace;
},{"./side-effect":"PW9O"}],"foa0":[function(require,module,exports) {
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
},{"../iterator":"fhdf","./partition-by":"NsL8"}],"mY0c":[function(require,module,exports) {
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
},{"../reduced":"N1be"}],"ZKQP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookup3d = exports.lookup2d = exports.lookup1d = void 0;

/**
 * Returns function accepting a single index arg used to
 * lookup value in given array. No bounds checks are done.
 *
 * @example
 * ```ts
 * [...map(lookup1d([10, 20, 30]), [2,0,1])]
 * // [ 30, 10, 20 ]
 * ```
 *
 * @param src - source data
 */
const lookup1d = src => i => src[i];
/**
 * Returns function accepting a single `[x, y]` index tuple, used to
 * lookup value in given array. Useful for transducers processing 2D
 * data.
 *
 * @remarks
 * The source data MUST be in row major linearized format, i.e. 1D
 * representation of 2D data (pixel buffer). No bounds checks are done.
 *
 * @example
 * ```ts
 * [...map(lookup2d([...range(9)], 3), range2d(2, -1, 0, 3))]
 * // [ 2, 1, 0, 5, 4, 3, 8, 7, 6 ]
 * ```
 *
 * @param src - source data
 * @param width - number of items along X (columns)
 */


exports.lookup1d = lookup1d;

const lookup2d = (src, width) => i => src[i[0] + i[1] * width];
/**
 * Same as {@link lookup2d}, but for 3D data. The index ordering of the
 * source data MUST be in Z, Y, X order (i.e. a stack of row major 2D slices).
 * No bounds checks are done.
 *
 * @param src - source data
 * @param width - number of items along X (columns)
 * @param height - number of items along Y (rows)
 */


exports.lookup2d = lookup2d;

const lookup3d = (src, width, height) => {
  const stridez = width * height;
  return i => src[i[0] + i[1] * width + i[2] * stridez];
};

exports.lookup3d = lookup3d;
},{}],"yRn6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asIterable = asIterable;

/**
 * Helper function / generator to (re)provide given iterable in iterator
 * form.
 *
 * @param src -
 */
function* asIterable(src) {
  yield* src;
}
},{}],"BmaF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatedly = repeatedly;

/**
 * Iterator yielding return values of given no-arg function `fn`. If `n`
 * is given, only that many values will be produced, else the iterator
 * is infinite.
 *
 * @example
 * ```ts
 * [...repeatedly(() => Math.floor(Math.random() * 10), 5)]
 * // [7, 0, 9, 3, 1]
 * ```
 *
 * @param fn - value producer
 * @param n - num values (default: ∞)
 */
function* repeatedly(fn, n = Infinity) {
  while (n-- > 0) {
    yield fn();
  }
}
},{}],"kI2L":[function(require,module,exports) {
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
 * @example
 * ```ts
 * transduce(take(1000), frequencies(), choices("abcd", [1, 0.5, 0.25, 0.125]))
 * // Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
 * ```
 *
 * {@link @thi.ng/random#weightedRandom}
 *
 * @param choices -
 * @param weights -
 */
const choices = (choices, weights, rnd = _random.SYSTEM) => (0, _repeatedly.repeatedly)(weights ? (0, _random.weightedRandom)((0, _arrays.ensureArray)(choices), weights, rnd) : () => choices[rnd.float(choices.length) | 0]);

exports.choices = choices;
},{"@thi.ng/arrays":"iKN7","@thi.ng/random":"C0Vh","./repeatedly":"BmaF"}],"Izx5":[function(require,module,exports) {
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
 * @example
 * ```ts
 * [...concat([1, 2, 3], null, [4, 5])]
 * // [ 1, 2, 3, 4, 5 ]
 *
 * [...concat([1, 2, 3, undefined], null, [4, 5])]
 * // [ 1, 2, 3, undefined, 4, 5 ]
 * ```
 *
 * @param xs -
 */
function* concat(...xs) {
  for (let x of xs) {
    x != null && (yield* (0, _arrays.ensureIterable)(x));
  }
}
},{"@thi.ng/arrays":"iKN7"}],"JKzx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curve = curve;

/**
 * Iterator producing an exponential curve (with adjustable curvature)
 * between `start` and `end` values over `num` steps. This is the
 * exponential equivalent of {@link line}.
 *
 * @remarks
 * Since `start` is the first value emitted, the `end` value is only
 * reached in the `num+1`th step.
 *
 * The curvature can be controlled via the logarithmic `rate` param.
 * Recommended range [0.0001 - 10000] (curved -> linear). Default: 0.1
 *
 * Similar functionality (w/ more options) is availble here:
 * {@link @thi.ng/dsp#curve}.
 *
 * @example
 * ```ts
 * [...curve(50, 100, 10, 2)]
 * // [
 * //   50,
 * //   73.193,
 * //   85.649,
 * //   92.339,
 * //   95.932,
 * //   97.861,
 * //   98.897,
 * //   99.454,
 * //   99.753,
 * //   99.913,
 * //   100
 * // ]
 * ```
 *
 * @param start -
 * @param end -
 * @param steps -
 * @param falloff -
 */
function* curve(start, end, steps = 10, rate = 0.1) {
  const c = Math.exp(-Math.log((Math.abs(end - start) + rate) / rate) / steps);
  const offset = (start < end ? end + rate : end - rate) * (1 - c);
  steps > 0 && (yield start);

  for (let x = start; --steps >= 0;) {
    yield x = offset + x * c;
  }
}
},{}],"y8M8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cycle = cycle;

/**
 * Iterator which yields an infinite repetition of given `input`
 * iterable's values. Produces no values if `input` is empty. If `num`
 * is given, only that many cycles will be emitted.
 *
 * @remarks
 * Also see {@link repeat}, {@link repeatedly} for related functions.
 *
 * @example
 * ```ts
 * // take 5 from infinite sequence
 * [...take(5, cycle([1, 2, 3]))]
 * // [1, 2, 3, 1, 2]
 *
 * // only produce 2 cycles
 * [...cycle(range(3), 2)]
 * // [ 0, 1, 2, 0, 1, 2 ]
 * ```
 *
 * @param input -
 * @param num -
 */
function* cycle(input, num = Infinity) {
  if (num < 1) return;
  let cache = [];

  for (let i of input) {
    cache.push(i);
    yield i;
  }

  if (cache.length > 0) {
    while (--num > 0) {
      yield* cache;
    }
  }
}
},{}],"LGj8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dup = dup;

var _arrays = require("@thi.ng/arrays");

var _checks = require("@thi.ng/checks");

var _concat = require("./concat");

function dup(x) {
  return (0, _checks.isString)(x) ? x + x : (0, _checks.isArray)(x) ? x.concat(x) : (x = (0, _arrays.ensureArray)(x), (0, _concat.concat)(x, x));
}
},{"@thi.ng/arrays":"iKN7","@thi.ng/checks":"XYpc","./concat":"Izx5"}],"dQxW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeat = repeat;

/**
 * Iterator yielding an infinite (by default) repetition of given value
 * `x`. If `n` is given, only produces that many values.
 *
 * See also: {@link repeatedly}
 *
 * @example
 * ```ts
 * [...repeat(42, 5)]
 * // [42, 42, 42, 42, 42]
 * ```
 *
 * @param x - value to repeat
 * @param n - num values (default: ∞)
 */
function* repeat(x, n = Infinity) {
  while (n-- > 0) {
    yield x;
  }
}
},{}],"CPer":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendSides = extendSides;

var _api = require("@thi.ng/api");

var _repeat = require("./repeat");

/**
 * Yields iterator of given iterable which repeats the first and/or last
 * value(s) `numLeft`/`numRight` times (default: 1).
 *
 * @remarks
 * By default both sides are repeated, but can be adjusted by setting
 * either of them to zero. `numRight` defaults to same value as
 * `numLeft`.
 *
 * @example
 * ```ts
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
 * - {@link padSides}
 * - {@link wrapSides}
 *
 * @param src -
 * @param numLeft -
 * @param numRight -
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
},{"@thi.ng/api":"MOSf","./repeat":"dQxW"}],"m7LH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterate = iterate;

/**
 * Yields an infinite iterator of the inductive sequence:
 *
 * `f(x+1) = f(f(x))`
 *
 * @remarks
 * The first value emitted always is `seed` itself, then f(seed),
 * f(f(seed)) etc. The given function is called with the current
 * iteration counter as 2nd arg.
 *
 * @example
 * ```ts
 * [...iterate((x) => x * 2, 1, 5)]
 * // [ 1, 2, 4, 8, 16 ]
 *
 * [...iterate((x, i) => x * 10 + i, 0, 8)]
 * // [ 0, 1, 12, 123, 1234, 12345, 123456, 1234567 ]
 * ```
 *
 * @param fn -
 * @param seed -
 * @param num -
 */
function* iterate(fn, seed, num = Infinity) {
  let i = 0;

  while (i < num) {
    yield seed;
    seed = fn(seed, ++i);
  }
}
},{}],"lSGD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = keys;

/**
 * Iterator which yields all names of given object's own properties
 * (Similar to `Object.keys()`).
 *
 * @remarks
 * See also:
 * - {@link pairs}
 * - {@link vals}
 *
 * @param x -
 */
function* keys(x) {
  for (let k in x) {
    if (x.hasOwnProperty(k)) {
      yield k;
    }
  }
}
},{}],"YHhn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.line = void 0;

var _map = require("../xform/map");

var _normRange = require("./norm-range");

/**
 * Iterator yielding `steps` + 1 interpolated values on a line in the
 * closed `[start .. end]` interval.
 *
 * @remarks
 * This is similar to {@link range}, but potentially provides more
 * precise values (by avoiding the accumulation of floating point errors
 * during iteration).
 *
 * Similar functionality (w/ more options) is availble here:
 * {@link @thi.ng/dsp#line}.
 *
 * @example
 * ```ts
 * [...line(50, 100, 10)]
 * // [
 * //    50, 55, 60, 65, 70,
 * //    75, 80, 85, 90, 95,
 * //   100
 * // ]
 * ```
 *
 * @param start -
 * @param end -
 * @param steps -
 */
const line = (start, end, steps = 10) => {
  const delta = end - start;
  return (0, _map.map)(t => start + delta * t, (0, _normRange.normRange)(steps));
};

exports.line = line;
},{"../xform/map":"WUst","./norm-range":"oFfM"}],"lxp1":[function(require,module,exports) {
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
 * @example
 * Essentially, syntax sugar for:
 *
 * ```ts
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
 * - {@link extendSides}
 * - {@link wrapSides}
 *
 * @param src -
 * @param x -
 * @param numLeft -
 * @param numRight -
 */
const padSides = (src, x, numLeft = 1, numRight = numLeft) => numLeft > 0 ? numRight > 0 ? (0, _concat.concat)((0, _repeat.repeat)(x, numLeft), src, (0, _repeat.repeat)(x, numRight)) : (0, _concat.concat)((0, _repeat.repeat)(x, numLeft), src) : numRight > 0 ? (0, _concat.concat)(src, (0, _repeat.repeat)(x, numRight)) : (0, _concat.concat)(src);

exports.padSides = padSides;
},{"./concat":"Izx5","./repeat":"dQxW"}],"oAHM":[function(require,module,exports) {
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
 * @example
 * ```ts
 * [...tx.reverse("hello world")]
 * // [ "d", "l", "r", "o", "w", " ", "o", "l", "l", "e", "h" ]
 * ```
 *
 * @param input -
 */
function* reverse(input) {
  const _input = (0, _arrays.ensureArray)(input);

  let n = _input.length;

  while (--n >= 0) {
    yield _input[n];
  }
}
},{"@thi.ng/arrays":"iKN7"}],"VUN1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.palindrome = palindrome;

var _arrays = require("@thi.ng/arrays");

var _checks = require("@thi.ng/checks");

var _str = require("../rfn/str");

var _concat = require("./concat");

var _reverse = require("./reverse");

function palindrome(x) {
  return (0, _checks.isString)(x) ? (0, _str.str)("", (0, _concat.concat)([x], (0, _reverse.reverse)(x))) : (0, _checks.isArray)(x) ? x.concat(x.slice().reverse()) : (x = (0, _arrays.ensureArray)(x), (0, _concat.concat)(x, (0, _reverse.reverse)(x)));
}
},{"@thi.ng/arrays":"iKN7","@thi.ng/checks":"XYpc","../rfn/str":"js0B","./concat":"Izx5","./reverse":"oAHM"}],"quz7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pairs = pairs;

/**
 * Iterator yielding key-value pairs of given object's own properties
 * and their values. Same as `zip(keys(x), vals(x))`.
 *
 * @remarks
 * - {@link vals}
 * - {@link (zip:1)}
 *
 * @example
 * ```ts
 * [...pairs({ a: 1, b: 2 })]
 * // [['a', 1], ['b', 2]]
 * ```
 *
 *
 * @param x -
 */
function* pairs(x) {
  for (let k in x) {
    if (x.hasOwnProperty(k)) {
      yield [k, x[k]];
    }
  }
}
},{}],"PzKP":[function(require,module,exports) {
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
 * each.
 *
 * @remarks
 * If `m` is not given, defaults to value of `n`. The range of `m` is
 * `0..m-1`. The optional `offsets` array can be used to define start
 * values for each dimension.
 *
 * @example
 * ```ts
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
 * @param n -
 * @param m -
 * @param offsets -
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
},{"@thi.ng/arrays":"iKN7","@thi.ng/errors":"j3Rf","./range":"GT77"}],"lElU":[function(require,module,exports) {
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
},{"@thi.ng/errors":"j3Rf","./range":"GT77"}],"aoPk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortedKeys = sortedKeys;

var _compare = require("@thi.ng/compare");

/**
 * Syntax sugar for `Object.keys(x).sort()` with support for custom
 * comparator (default: {@link @thi.ng/compare#compare}) and yielding
 * iterator of sorted keys.
 *
 * @param x -
 * @param cmp -
 */
function* sortedKeys(x, cmp = _compare.compare) {
  yield* Object.keys(x).sort(cmp);
}
},{"@thi.ng/compare":"vzOR"}],"ygRn":[function(require,module,exports) {
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
 * @example
 * ```ts
 * [...symmetric([1, 2, 3])]
 * // [ 1, 2, 3, 3, 2, 1 ]
 * ```
 *
 * @param src -
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
},{}],"Af4g":[function(require,module,exports) {
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
 * @remarks
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
 * @example
 * ```ts
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
 * Using easing functions (e.g. via {@link @thi.ng/math# | @thi.ng/math}),
 * non-linear interpolation within each keyframe interval can be achieved:
 *
 * @example
 * ```ts
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
 *
 * - {@link TweenOpts}
 * - {@link (interpolate:1)}
 * - {@link (interpolateHermite:1)}
 * - {@link (interpolateLinear:1)}
 *
 * @param opts -
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
},{"./norm-range":"oFfM","./repeat":"dQxW"}],"vew7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vals = vals;

/**
 * Iterator which yields all values of given object's own properties
 * (Similar to `Object.values()`).
 *
 * @remarks
 * See also:
 * - {@link keys}
 * - {@link pairs}
 *
 * @param x -
 */
function* vals(x) {
  for (let k in x) {
    if (x.hasOwnProperty(k)) {
      yield x[k];
    }
  }
}
},{}],"ib3h":[function(require,module,exports) {
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
 * appended at the end.
 *
 * @remarks
 * `numLeft` defaults to 1 and `numRight` defaults to same value as
 * `numLeft`, therefore wraps both sides by default and throws error if
 * either `nXXX < 0` or larger than `src.length`.
 *
 * See also:
 * - {@link extendSides}
 * - {@link padSides}
 *
 * @param src -
 * @param numLeft -
 * @param numRight -
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
},{"@thi.ng/arrays":"iKN7","@thi.ng/errors":"j3Rf","@thi.ng/math":"zoYr"}],"GbKR":[function(require,module,exports) {
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

var _pushSort = require("./rfn/push-sort");

Object.keys(_pushSort).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pushSort[key];
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

var _curve = require("./iter/curve");

Object.keys(_curve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _curve[key];
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

var _dup = require("./iter/dup");

Object.keys(_dup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dup[key];
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

var _line = require("./iter/line");

Object.keys(_line).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _line[key];
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

var _palindrome = require("./iter/palindrome");

Object.keys(_palindrome).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _palindrome[key];
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

var _sortedKeys = require("./iter/sorted-keys");

Object.keys(_sortedKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sortedKeys[key];
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
},{"./iterator":"fhdf","./reduce":"UerL","./reduced":"N1be","./run":"FIKh","./step":"o6XN","./transduce":"iqGa","./rfn/add":"pthq","./rfn/assoc-map":"LIJg","./rfn/assoc-obj":"H8df","./rfn/conj":"cBQk","./rfn/count":"g31l","./rfn/div":"J30b","./rfn/every":"yvO9","./rfn/fill":"WiAD","./rfn/frequencies":"mFoP","./rfn/group-binary":"DkVy","./rfn/group-by-map":"MrPH","./rfn/group-by-obj":"HXQi","./rfn/last":"N4rn","./rfn/max-compare":"Fj3f","./rfn/max":"ePW0","./rfn/mean":"N1B6","./rfn/min-compare":"P2vS","./rfn/min":"wGHE","./rfn/mul":"vCqj","./rfn/push":"nZPr","./rfn/push-copy":"FqE3","./rfn/push-sort":"PU8i","./rfn/reductions":"zjLI","./rfn/some":"ZD3d","./rfn/str":"js0B","./rfn/sub":"B0kE","./xform/benchmark":"eYjS","./xform/cat":"arAw","./xform/converge":"OUsy","./xform/convolve":"BnrM","./xform/dedupe":"ryPz","./xform/delayed":"ya6N","./xform/distinct":"ECm5","./xform/drop-nth":"xVO8","./xform/drop-while":"yG5g","./xform/drop":"Xj6O","./xform/duplicate":"xKDL","./xform/filter":"AmRG","./xform/filter-fuzzy":"UIqX","./xform/flatten-with":"GrLQ","./xform/flatten":"FhYa","./xform/indexed":"v3WG","./xform/interleave":"AqTY","./xform/interpolate":"H1Uj","./xform/interpolate-hermite":"nhqr","./xform/interpolate-linear":"jvQK","./xform/interpose":"C4Kx","./xform/keep":"cSVz","./xform/labeled":"GHxA","./xform/map-deep":"OxBd","./xform/map-indexed":"n5y9","./xform/map-keys":"Zidv","./xform/map-nth":"OvXR","./xform/map-vals":"C0YV","./xform/map":"WUst","./xform/mapcat":"pk6b","./xform/match-first":"CbTT","./xform/match-last":"o7kz","./xform/moving-average":"ocT9","./xform/moving-median":"p2Dn","./xform/multiplex":"GmFf","./xform/multiplex-obj":"sFj2","./xform/noop":"JLiJ","./xform/pad-last":"v6pt","./xform/page":"gT1U","./xform/partition-by":"NsL8","./xform/partition-of":"L6Yr","./xform/partition-sort":"ENs0","./xform/partition-sync":"mSEP","./xform/partition":"IixE","./xform/pluck":"klYB","./xform/rename":"HBXk","./xform/sample":"YDOC","./xform/scan":"aO4q","./xform/select-keys":"a0Sj","./xform/side-effect":"PW9O","./xform/sliding-window":"iM70","./xform/stream-shuffle":"LJ5K","./xform/stream-sort":"Ik0n","./xform/struct":"IfpI","./xform/swizzle":"sSrO","./xform/take-nth":"aUgM","./xform/take-last":"OmPI","./xform/take-while":"eKGP","./xform/take":"o8VT","./xform/throttle":"FY79","./xform/throttle-time":"DYsp","./xform/toggle":"UpJA","./xform/trace":"VbxX","./xform/word-wrap":"foa0","./func/comp":"vBNp","./func/compr":"IqcY","./func/deep-transform":"Khd6","./func/juxtr":"mY0c","./func/key-selector":"xiIq","./func/lookup":"ZKQP","./func/renamer":"iIRC","./iter/as-iterable":"yRn6","./iter/choices":"kI2L","./iter/concat":"Izx5","./iter/curve":"JKzx","./iter/cycle":"y8M8","./iter/dup":"LGj8","./iter/extend-sides":"CPer","./iter/iterate":"m7LH","./iter/keys":"lSGD","./iter/line":"YHhn","./iter/norm-range":"oFfM","./iter/pad-sides":"lxp1","./iter/palindrome":"VUN1","./iter/pairs":"quz7","./iter/permutations":"PzKP","./iter/range":"GT77","./iter/range2d":"DdIw","./iter/range3d":"lElU","./iter/repeat":"dQxW","./iter/repeatedly":"BmaF","./iter/reverse":"oAHM","./iter/sorted-keys":"aoPk","./iter/symmetric":"ygRn","./iter/tween":"Af4g","./iter/vals":"vew7","./iter/wrap-sides":"ib3h","./iter/zip":"Mdez"}],"Sfpi":[function(require,module,exports) {
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
},{"@thi.ng/checks":"XYpc"}],"PlIK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xformSetOp = void 0;

var _transducers = require("@thi.ng/transducers");

var _utils = require("../utils");

const xformSetOp = (rfn, op, src) => src ? (0, _transducers.reduce)(rfn(), src) : [() => null, acc => acc || new Set(), (acc, x) => !acc ? (0, _utils.ensureSet)(x) : op(acc, (0, _utils.ensureSet)(x))];

exports.xformSetOp = xformSetOp;
},{"@thi.ng/transducers":"GbKR","../utils":"Sfpi"}],"zqSd":[function(require,module,exports) {
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
 * @param a - first set
 * @param b - other set
 * @param out - optional result set
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
},{"./internal/xform-setop":"PlIK","./into":"uWkF","./utils":"Sfpi"}],"CNH3":[function(require,module,exports) {
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
   * Converts given vanilla object into an {@link EquivMap} instance with
   * default (or optionally provided) options and returns it. By
   * default uses strict `===` equality check for `equiv` option.
   *
   * @param obj - source object
   * @param opts - config options
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
   * storing canonical keys and {@link @thi.ng/equiv#equiv} for
   * checking key equivalence.
   *
   * @param pairs - key-value pairs
   * @param opts - config options
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
},{"@thi.ng/api":"MOSf","@thi.ng/equiv":"U8cl","./array-set":"nNr8","./dissoc":"VaVn","./internal/equiv":"vPtr","./into":"uWkF"}],"j0sP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MASKS = void 0;
const MASKS = new Array(33).fill(0).map((_, i) => Math.pow(2, i) - 1);
exports.MASKS = MASKS;
},{}],"NdNd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAligned = exports.align = void 0;

/**
 * Aligns `addr` to next multiple of `size`. The latter must be a power
 * of 2.
 *
 * @param addr - value to align
 * @param size - alignment value
 */
const align = (addr, size) => (size--, addr + size & ~size);
/**
 * Returns true if `addr` is aligned to wordsize `size`.
 */


exports.align = align;

const isAligned = (addr, size) => !(addr & size - 1);

exports.isAligned = isAligned;
},{}],"bkmp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bitSize = exports.ctz32 = exports.clz32 = exports.hammingDist = exports.popCount = void 0;

/**
 * Returns number of 1 bits in `x`.
 *
 * @param x -
 */
const popCount = x => (x = x - (x >>> 1 & 0x55555555), x = (x & 0x33333333) + (x >>> 2 & 0x33333333), (x + (x >>> 4) & 0xf0f0f0f) * 0x1010101 >>> 24);
/**
 * Returns number of bit changes between `x` and `y`.
 *
 * {@link https://en.wikipedia.org/wiki/Hamming_distance}
 *
 * @param x -
 * @param y -
 */


exports.popCount = popCount;

const hammingDist = (x, y) => popCount(x ^ y);
/**
 * Math.clz32() polyfill (corrected).
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32$revision/1426816}
 *
 * @param x -
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
 * Returns the number of bits required to encode `x`. Returns zero if
 * `x` <= 1.
 *
 * @param x -
 */


exports.ctz32 = ctz32;

const bitSize = x => x > 1 ? Math.ceil(Math.log2(x)) : 0;

exports.bitSize = bitSize;
},{}],"K0Rj":[function(require,module,exports) {
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
 * @example
 * ```ts
 * defMask(1,31).toString(16) // 7ffffffe
 * defMask(3,8).toString(16)  // f8
 * ```
 *
 * @param a - first bit
 * @param b - last bit
 */
const defMask = (a, b) => (~_api.MASKS[a] & _api.MASKS[b]) >>> 0;
/**
 * Returns unsigned version of `x` with only lowest `n` bits.
 *
 * @param n - number of LSB bits
 * @param x - value
 */


exports.defMask = defMask;

const maskL = (n, x) => (x & _api.MASKS[n]) >>> 0;
/**
 * Returns unsigned version of `x` with only highest `n` bits.
 *
 * @param n - number of MSB bits
 * @param x - value
 */


exports.maskL = maskL;

const maskH = (n, x) => (x & ~_api.MASKS[n]) >>> 0;

exports.maskH = maskH;
},{"./api":"j0sP"}],"dOyP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bitClearWindow = exports.bitSetWindow = exports.bitSet = exports.bitFlip = exports.bitClear = void 0;

var _mask = require("./mask");

/**
 * Clears bit in given uint `x`.
 *
 * @param x - value
 * @param bit - bit number (0..31)
 */
const bitClear = (x, bit) => (x & ~(1 << bit)) >>> 0;
/**
 * Toggles bit in given uint `x`.
 *
 * @param x - value
 * @param bit - bit ID
 */


exports.bitClear = bitClear;

const bitFlip = (x, bit) => (x ^ 1 << bit) >>> 0;
/**
 * Sets bit in given uint `x`.
 *
 * @param x - value
 * @param bit - bit number (0..31)
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
},{"./mask":"K0Rj"}],"Herc":[function(require,module,exports) {
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
 * raw bitwise conversion via {@link floatToIntBits}.
 *
 * {@link https://github.com/tzaeschke/phtree/blob/master/PhTreeRevisited.pdf}
 * (page 3)
 *
 * @param x - value to convert
 */


exports.uintBitsToFloat = uintBitsToFloat;

const floatToSortableInt = x => {
  if (x === -0) x = 0;
  const i = floatToIntBits(x);
  return x < 0 ? ~i | 1 << 31 : i;
};

exports.floatToSortableInt = floatToSortableInt;
},{}],"Ay8c":[function(require,module,exports) {
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
 * {@link https://en.wikipedia.org/wiki/Gray_code}
 *
 * @param x - u32
 */
const encodeGray32 = x => (x ^ x >>> 1) >>> 0;
/**
 * Converts 32bit Gray code to binary / unsigned int.
 *
 * {@link https://en.wikipedia.org/wiki/Gray_code}
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
},{}],"vMRu":[function(require,module,exports) {
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
},{"./mask":"K0Rj"}],"Vmyt":[function(require,module,exports) {
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
},{}],"z1VJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotateRight = exports.rotateLeft = void 0;

/**
 * Rotates `x` `n` bits to the left.
 *
 * @param x - value
 * @param n - rotation step
 */
const rotateLeft = (x, n) => (x << n | x >>> 32 - n) >>> 0;
/**
 * Rotates `x` `n` bits to the right.
 *
 * @param x - value
 * @param n - rotation step
 */


exports.rotateLeft = rotateLeft;

const rotateRight = (x, n) => (x >>> n | x << 32 - n) >>> 0;

exports.rotateRight = rotateRight;
},{}],"mleM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.same8 = exports.same4 = exports.splat16_32 = exports.splat8_32 = exports.splat8_24 = exports.splat4_32 = exports.splat4_24 = void 0;

/**
 * Repeats lowest nibble of `x` as 24 bit uint.
 *
 * @param x -
 */
const splat4_24 = x => (x & 0xf) * 0x111111;
/**
 * Repeats lowest nibble of `x` as 32 bit uint.
 *
 * @param x -
 */


exports.splat4_24 = splat4_24;

const splat4_32 = x => (x & 0xf) * 0x11111111 >>> 0;
/**
 * Repeats lowest byte of `x` as 24 bit uint.
 *
 * @param x -
 */


exports.splat4_32 = splat4_32;

const splat8_24 = x => (x & 0xff) * 0x010101;
/**
 * Repeats lowest byte of `x` as 32 bit uint.
 *
 * @param x -
 */


exports.splat8_24 = splat8_24;

const splat8_32 = x => (x & 0xff) * 0x01010101 >>> 0;
/**
 * Repeats lowest 16bit of `x` as 32 bit uint.
 *
 * @param x -
 */


exports.splat8_32 = splat8_32;

const splat16_32 = x => (x &= 0xffff, (x << 16 | x) >>> 0);
/**
 * Returns true if bits 0-3 are same as bits 4-7.
 *
 * @param x -
 */


exports.splat16_32 = splat16_32;

const same4 = x => (x >> 4 & 0xf) === (x & 0xf);
/**
 * Returns true if bits 0-7 are same as bits 8-15.
 *
 * @param x -
 */


exports.same4 = same4;

const same8 = x => (x >> 8 & 0xff) === (x & 0xff);

exports.same8 = same8;
},{}],"QhQA":[function(require,module,exports) {
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
 * @param x -
 * @param lane - lane ID enum
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
 * @param x -
 * @param lane - lane ID enum
 */


exports.lane8 = lane8;

const lane4 = (x, lane) => x >>> (7 - lane << 2) & 0xf;

exports.lane4 = lane4;

const lane2 = (x, lane) => x >>> (15 - lane << 1) & 0x3;
/**
 * Sets 8-bit `lane` with value`y` in `x`.
 *
 * {@link lane8}
 *
 * @param x -
 * @param y -
 * @param lane - lane ID enum
 */


exports.lane2 = lane2;

const setLane8 = (x, y, lane) => {
  const l = 3 - lane << 3;
  return (~(0xff << l) & x | (y & 0xff) << l) >>> 0;
};
/**
 * Sets 4-bit `lane` with value `y` in `x`.
 *
 * {@link lane4}
 *
 * @param x -
 * @param y -
 * @param lane - lane ID enum
 */


exports.setLane8 = setLane8;

const setLane4 = (x, y, lane) => {
  const l = 7 - lane << 2;
  return (~(0xf << l) & x | (y & 0xf) << l) >>> 0;
};
/**
 * Sets 2-bit `lane` with value `y` in `x`.
 *
 * {@link lane2}
 *
 * @param x -
 * @param y -
 * @param lane - lane ID enum
 */


exports.setLane4 = setLane4;

const setLane2 = (x, y, lane) => {
  const l = 15 - lane << 1;
  return (~(0x3 << l) & x | (y & 0x3) << l) >>> 0;
};
/**
 * Re-orders byte lanes in given order (MSB).
 *
 * @example
 * ```ts
 * swizzle(0x12345678, 3, 2, 1, 0) // 0x78563412
 * swizzle(0x12345678, 1, 0, 3, 2) // 0x34127856
 * swizzle(0x12345678, 2, 2, 0, 0) // 0x56561212
 * ```
 *
 * @param x - value
 * @param a - lane ID enum
 * @param b - lane ID enum
 * @param c - lane ID enum
 * @param d - lane ID enum
 */


exports.setLane2 = setLane2;

const swizzle8 = (x, a, b, c, d) => (lane8(x, a) << 24 | lane8(x, b) << 16 | lane8(x, c) << 8 | lane8(x, d)) >>> 0;
/**
 *
 * @param x - value
 * @param a - lane ID enum
 * @param b - lane ID enum
 * @param c - lane ID enum
 * @param d - lane ID enum
 * @param e - lane ID enum
 * @param f - lane ID enum
 * @param g - lane ID enum
 * @param h - lane ID enum
 */


exports.swizzle8 = swizzle8;

const swizzle4 = (x, a, b, c, d, e, f, g, h) => (lane4(x, a) << 28 | lane4(x, b) << 24 | lane4(x, c) << 20 | lane4(x, d) << 16 | lane4(x, e) << 12 | lane4(x, f) << 8 | lane4(x, g) << 4 | lane4(x, h)) >>> 0;
/**
 * Same as `swizzle8(x, 3, 2, 1, 0)`, but faster.
 *
 * @param x -
 */


exports.swizzle4 = swizzle4;

const flipBytes = x => (x >>> 24 | x >> 8 & 0xff00 | (x & 0xff00) << 8 | x << 24) >>> 0;

exports.flipBytes = flipBytes;
},{}],"qqrF":[function(require,module,exports) {
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
},{"./api":"j0sP","./align":"NdNd","./count":"bkmp","./edit":"dOyP","./float":"Herc","./gray":"Ay8c","./logic":"vMRu","./mask":"K0Rj","./pow":"Vmyt","./rotate":"z1VJ","./splat":"mleM","./swizzle":"QhQA"}],"TmjW":[function(require,module,exports) {
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
 * See {@link HashMapOpts} for further configuration & behavior details.
 *
 * @example
 * ```ts
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
},{"@thi.ng/binary":"qqrF","@thi.ng/equiv":"U8cl","./dissoc":"VaVn","./internal/equiv":"vPtr","./into":"uWkF"}],"uMkH":[function(require,module,exports) {
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
 * @param src - source map
 * @param ks - selected keys
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
 * @param src - source object
 * @param ks - selected keys
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
},{"./utils":"Sfpi"}],"j63x":[function(require,module,exports) {
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
 * {@link selectKeysObj} on each value and uses returned objects as new keys
 * to group original values. Returns a new {@link EquivMap} of sets.
 *
 * @example
 * ```ts
 * indexed(
 *   new Set([{a: 1, b: 1}, {a: 1, b: 2}, {a: 1, b: 1, c: 2}]),
 *   ["a","b"]
 * )
 * // EquivMap {
 * //   { a: 1, b: 1 } => Set { { a: 1, b: 1 }, { a: 1, b: 1, c: 2 } },
 * //   { a: 1, b: 2 } => Set { { a: 1, b: 2 } } }
 * ```
 *
 * @param records - objects to index
 * @param ks - keys used for indexing
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
},{"./equiv-map":"CNH3","./select-keys":"uMkH","./utils":"Sfpi"}],"xP85":[function(require,module,exports) {
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
 * @param a - first set
 * @param b - other set
 * @param out - result set
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
},{"./internal/xform-setop":"PlIK","./into":"uWkF","./utils":"Sfpi"}],"SoPs":[function(require,module,exports) {
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
 * @example
 * ```ts
 * invertMap(new Map(), new Map([["a", 1], ["b", 2]]));
 * // Map { 1 => 'a', 2 => 'b' }
 * ```
 *
 * @param src - map to invert
 * @param dest - result map
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
 * @example
 * ```ts
 * invertObj({a: 1, b: 2})
 * // { '1': 'a', '2': 'b' }
 * ```
 *
 * @param src - object to invert
 * @param dest - result object
 */


exports.invertMap = invertMap;

const invertObj = (src, dest = {}) => {
  for (let k in src) {
    dest[src[k]] = k;
  }

  return dest;
};

exports.invertObj = invertObj;
},{}],"bRDf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeObj = exports.mergeMap = void 0;

/**
 * Merges all given maps in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest - target map
 * @param xs - input maps
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
 * @param dest - target object
 * @param xs - input objects
 */


exports.mergeMap = mergeMap;

const mergeObj = (dest, ...xs) => Object.assign(dest, ...xs);

exports.mergeObj = mergeObj;
},{}],"nZGQ":[function(require,module,exports) {
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
 * @param src - source map
 * @param km - key mappings
 * @param out - result map
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
 * @param src - source object
 * @param km - key mappings
 * @param out - result object
 */


exports.renameKeysMap = renameKeysMap;

const renameKeysObj = (src, km, out = {}) => {
  for (let k in src) {
    out[km.hasOwnProperty(k) ? km[k] : k] = src[k];
  }

  return out;
};

exports.renameKeysObj = renameKeysObj;
},{"./utils":"Sfpi"}],"J3Rj":[function(require,module,exports) {
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
 * @example
 * ```ts
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
 * @param a - first set
 * @param b - other set
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
 * Similar to {@link join}, computes the join between two sets of relations,
 * using the given keys in `kmap` only for joining and ignoring others.
 * `kmap` can also be used to translate join keys in `b` where
 * needed. Else, if no renaming is desired, the values in `kmap` should
 * be the same as their respective keys, e.g. `{id: "id"}`. Returns new
 * set of same type as `a`.
 *
 * @example
 * ```ts
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
 * @param a - first set
 * @param b - other set
 * @param kmap - keys to compute join for
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
},{"./common-keys":"bzzW","./indexed":"j63x","./invert":"SoPs","./merge":"bRDf","./rename-keys":"nZGQ","./select-keys":"uMkH","./utils":"Sfpi"}],"U7kD":[function(require,module,exports) {
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
   * @param iter -
   * @param rnd -
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
   * @param cmp -
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
 * @param src -
 */


exports.DCons = DCons;

const dcons = src => new DCons(src);

exports.dcons = dcons;
},{"@thi.ng/api":"MOSf","@thi.ng/checks":"XYpc","@thi.ng/compare":"vzOR","@thi.ng/equiv":"U8cl","@thi.ng/errors":"j3Rf","@thi.ng/random":"C0Vh","@thi.ng/transducers":"GbKR"}],"FIr1":[function(require,module,exports) {
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
 * Similar to {@link ArraySet}, this class is an alternative implementation of
 * the native ES6 Set API using a {@link @thi.ng/dcons#DCons} linked
 * list as backing store and a customizable value equality / equivalence
 * predicate. By the default uses {@link @thi.ng/equiv#equiv} for
 * equivalence checking.
 *
 * Additionally, the type also implements the {@link @thi.ng/api#ICopy}, {@link @thi.ng/api#IEmpty} and
 * {@link @thi.ng/api#IEquiv} interfaces itself.
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
   * @param key - search key
   * @param notFound - default value
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
},{"@thi.ng/api":"MOSf","@thi.ng/dcons":"U7kD","@thi.ng/equiv":"U8cl","./dissoc":"VaVn","./internal/equiv":"vPtr","./into":"uWkF"}],"RHRt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeApplyObj = exports.mergeApplyMap = void 0;

var _checks = require("@thi.ng/checks");

var _utils = require("./utils");

/**
 * Similar to {@link mergeApplyObj}, but for ES6 Maps instead of plain objects.
 *
 * @param src - source map
 * @param xs - map w/ transformation functions
 */
const mergeApplyMap = (src, xs) => {
  const res = (0, _utils.copy)(src, Map);

  for (let [k, v] of xs) {
    res.set(k, (0, _checks.isFunction)(v) ? v(res.get(k)) : v);
  }

  return res;
};
/**
 * Similar to {@link mergeObjWith}, but only supports 2 args and any
 * function values in `xs` will be called with respective value in `src`
 * to produce a new / derived value for that key, i.e.
 *
 * @example
 * ```ts
 * dest[k] = xs[k](src[k])
 * ```
 *
 * Returns new merged object and does not modify any of the inputs.
 *
 * @example
 * ```ts
 * mergeApplyObj(
 *   { a: "hello", b: 23, c: 12 },
 *   { a: (x) => x + " world", b: 42 }
 * );
 * // { a: 'hello world', b: 42, c: 12 }
 * ```
 *
 * @param src - source object
 * @param xs - object w/ transformation functions
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
},{"@thi.ng/checks":"XYpc","./utils":"Sfpi"}],"ZgfX":[function(require,module,exports) {
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
},{"./utils":"Sfpi"}],"oluS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeDeepObj = void 0;

var _checks = require("@thi.ng/checks");

var _mergeWith = require("./merge-with");

const mergeDeepObj = (dest, ...xs) => (0, _mergeWith.mergeObjWith)((a, b) => (0, _checks.isPlainObject)(a) && (0, _checks.isPlainObject)(b) ? mergeDeepObj(a, b) : b, dest, ...xs);

exports.mergeDeepObj = mergeDeepObj;
},{"@thi.ng/checks":"XYpc","./merge-with":"ZgfX"}],"JwtR":[function(require,module,exports) {
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
   * Creates new {@link SortedMap} instance with optionally given pairs
   * and/or options.
   *
   * @param pairs - key-value pairs
   * @param opts - config options
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
   * Creates new {@link SortedMap} instance from given object's key-value
   * pairs.
   *
   * @param obj - source object
   * @param opts - config options
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
},{"@thi.ng/api":"MOSf","@thi.ng/compare":"vzOR","@thi.ng/transducers":"GbKR","./dissoc":"VaVn","./internal/equiv":"vPtr","./into":"uWkF"}],"pEDV":[function(require,module,exports) {
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
 * - range queries (via {@link SortedSet.entries},
 *   {@link SortedSet.keys}, {@link SortedSet.values})
 * - multiple value addition/deletion via {@link SortedSet.into} and
 *   {@link SortedSet.disj}
 *
 * Furthermore, this class implements the {@link @thi.ng/api#ICopy},
 * IEmpty`, {@link @thi.ng/api#ICompare} and {@link @thi.ng/api#IEquiv}
 * interfaces defined by {@link @thi.ng/api# | @thi.ng/api}. The latter two allow
 * instances to be used as keys themselves in other data types defined
 * in this (and other) package(s).
 *
 * This set uses a {@link SortedMap} as backing store and therefore has
 * the same resizing characteristics.
 */


class SortedSet extends Set {
  /**
   * Creates new instance with optional given values and/or
   * implementation options. The options are the same as used by
   * {@link SortedMap}.
   *
   * @param values - input values
   * @param opts - config options
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
},{"@thi.ng/compare":"vzOR","@thi.ng/transducers":"GbKR","./dissoc":"VaVn","./internal/equiv":"vPtr","./into":"uWkF","./sorted-map":"JwtR"}],"kUdH":[function(require,module,exports) {
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
 * - {@link https://research.swtch.com/sparse}
 * - {@link https://programmingpraxis.com/2012/03/09/sparse-sets/}
 * - {@link https://blog.molecular-matters.com/2013/07/24/adventures-in-data-oriented-design-part-3c-external-references/}
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
 * returns a {@link SparseSet8} instance.
 *
 * @param n - max capacity, ID range: [0...n)
 */


exports.SparseSet32 = SparseSet32;

const sparseSet = n => n <= 0x100 ? new SparseSet8(n) : n <= 0x10000 ? new SparseSet16(n) : new SparseSet32(n);

exports.sparseSet = sparseSet;
},{"@thi.ng/checks":"XYpc","@thi.ng/errors":"j3Rf","./dissoc":"VaVn","./into":"uWkF"}],"PFMP":[function(require,module,exports) {
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
 * @param a - first set
 * @param b - other set
 * @param out - result set
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
},{"./internal/xform-setop":"PlIK","./into":"uWkF","./utils":"Sfpi"}],"xQ5D":[function(require,module,exports) {
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
},{"./utils":"Sfpi"}],"GmJl":[function(require,module,exports) {
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
},{"./array-set":"nNr8","./common-keys":"bzzW","./difference":"zqSd","./dissoc":"VaVn","./equiv-map":"CNH3","./hash-map":"TmjW","./indexed":"j63x","./intersection":"xP85","./into":"uWkF","./invert":"SoPs","./join":"J3Rj","./ll-set":"FIr1","./merge-apply":"RHRt","./merge-deep":"oluS","./merge-with":"ZgfX","./merge":"bRDf","./rename-keys":"nZGQ","./select-keys":"uMkH","./sorted-map":"JwtR","./sorted-set":"pEDV","./sparse-set":"kUdH","./union":"PFMP","./without-keys":"xQ5D"}],"EFLD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextID = void 0;
let NEXT_ID = 0;

const nextID = () => NEXT_ID++;

exports.nextID = nextID;
},{}],"LPQS":[function(require,module,exports) {
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
 * value held in the atom.
 *
 * @remarks
 * Views can be created directly or via the {@link IViewable.addView}
 * method of the parent state. Views can be
 * {@link @thi.ng/api#IDeref.deref}'d like atoms and polled for value
 * changes using {@link IView.changed}. The transformer is only applied
 * once per value change and its result cached until the next change.
 *
 * If the optional `lazy` is true (default), the transformer will only
 * be executed with the first {@link @thi.ng/api#IDeref.deref} after
 * each value change. If `lazy` is false, the transformer function will
 * be executed immediately after a value change occurred and so can be
 * used like a watch which only triggers if there was an actual value
 * change (in contrast to normal watches, which execute with each
 * update, regardless of value change).
 *
 * Related, the actual value change predicate can be customized. If not
 * given, the default {@link @thi.ng/equiv#equiv} will be used.
 *
 * @example
 * ```ts
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
   * per value change.
   *
   * @remarks
   * See class comments about difference between lazy/eager behaviors.
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
   * {@link @thi.ng/api#IDeref.deref}.
   */


  changed() {
    return this.isDirty;
  }
  /**
   * Like {@link @thi.ng/api#IDeref.deref}, but doesn't update view's
   * cached state and dirty flag if value has changed.
   *
   * @remarks
   * If there's an unprocessed value change, returns result of this
   * sub's transformer or else the cached value.
   *
   * **Important:** Use this function only if the view has none or or
   * a stateless transformer. Else might cause undefined/inconsistent
   * behavior when calling `view` or {@link @thi.ng/api#IDeref.deref}
   * subsequently.
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
},{"@thi.ng/equiv":"U8cl","@thi.ng/paths":"jkaf","./idgen":"EFLD"}],"MkkA":[function(require,module,exports) {
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
  }
  /* istanbul ignore next */
  // @ts-ignore: mixin


  addWatch(id, fn) {}
  /* istanbul ignore next */
  // @ts-ignore: mixin


  removeWatch(id) {} // mixin stub

  /* istanbul ignore next */
  // @ts-ignore: mixin


  notifyWatches(old, prev) {}

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
},{"@thi.ng/api":"MOSf","@thi.ng/errors":"j3Rf","@thi.ng/paths":"jkaf","./view":"LPQS"}],"Xraa":[function(require,module,exports) {
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
 * nested parent state (Atom or another Cursor).
 *
 * @remarks
 * Cursors behave like Atoms for all practical purposes, i.e. support
 * {@link @thi.ng/api#IDeref.deref}, {@link IReset.reset},
 * {@link ISwap.swap}, {@link @thi.ng/api#IWatch.addWatch} etc. However,
 * when updating a cursor's value, the parent state will be updated at
 * the cursor's path as well (incl. triggering any watches and/or
 * validators) attached to the parent. Likewise, when the parent state
 * is modified externally, the cursor's value will automatically update
 * as well. The update order of cursor's sharing a common parent is
 * undefined, but can be overridden by extending this class with a
 * custom {@link @thi.ng/api#IWatch.notifyWatches} implementation.
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
},{"@thi.ng/checks":"XYpc","@thi.ng/errors":"j3Rf","@thi.ng/paths":"jkaf","./atom":"MkkA","./idgen":"EFLD","./view":"LPQS"}],"Vh1i":[function(require,module,exports) {
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
 * {@link IAtom} interface and so can be used directly in place and
 * delegates to wrapped atom/cursor.
 *
 * @remarks
 * Value changes are only recorded in history if `changed` predicate
 * returns truthy value, or else by calling {@link History.record}
 * directly. This class too implements the {@link @thi.ng/api#INotify}
 * interface to support event listeners for {@link History.undo},
 * {@link History.redo} and {@link History.record}.
 */
let History = History_1 = class History {
  /**
   * @param state - parent state
   * @param maxLen - max size of undo stack
   * @param changed - predicate to determine changed values (default `!equiv(a,b)`)
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
   * returns it if successful (i.e. there's a history).
   *
   * @remarks
   * Before the switch, first records the atom's current value into
   * the future stack (to enable {@link History.redo} feature).
   * Returns `undefined` if there's no history.
   *
   * If undo was possible, the `History.EVENT_UNDO` event is emitted
   * after the restoration with both the `prev` and `curr` (restored)
   * states provided as event value (and object with these two keys).
   * This allows for additional state handling to be executed, e.g.
   * application of the "Command pattern". See
   * {@link History.addListener} for registering event listeners.
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
   * and returns it if successful (i.e. there's a future).
   *
   * @remarks
   * Before the switch, first records the atom's current value into
   * the history stack (to enable {@link History.undo} feature).
   * Returns `undefined` if there's no future (so sad!).
   *
   * If redo was possible, the `History.EVENT_REDO` event is emitted
   * after the restoration with both the `prev` and `curr` (restored)
   * states provided as event value (and object with these two keys).
   * This allows for additional state handling to be executed, e.g.
   * application of the "Command pattern". See
   * {@link History.addListener} for registering event listeners.
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
   * `IReset.reset()` implementation. Delegates to wrapped
   * atom/cursor, but too applies `changed` predicate to determine if
   * there was a change and if the previous value should be recorded.
   *
   * @param val - replacement value
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
   * `ISwap.swap()` implementation. Delegates to wrapped atom/cursor,
   * but too applies `changed` predicate to determine if there was a
   * change and if the previous value should be recorded.
   *
   * @param fn - update function
   * @param args - additional args passed to `fn`
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
   * entry for each change.
   *
   * @remarks
   * **DO NOT call this explicitly if using {@link History.reset} /
   * {@link History.swap} etc.**
   *
   * If no `state` is given, uses the wrapped atom's current state
   * value (user code SHOULD always call without arg).
   *
   * If recording succeeded, the `History.EVENT_RECORD` event is
   * emitted with the recorded state provided as event value.
   *
   * @param state - state to record
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
   * @param id - watch ID
   * @param fn - watch function
   */


  addWatch(id, fn) {
    return this.state.addWatch(id, fn);
  }
  /**
   * `IWatch.removeWatch()` implementation. Delegates to wrapped
   * atom/cursor.
   *
   * @param id - watch iD
   */


  removeWatch(id) {
    return this.state.removeWatch(id);
  }
  /**
   * `IWatch.notifyWatches()` implementation. Delegates to wrapped
   * atom/cursor.
   *
   * @param oldState -
   * @param newState -
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
  /** {@inheritDoc @thi.ng/api#INotify.addListener} */
  // @ts-ignore: mixin


  addListener(id, fn, scope) {}
  /** {@inheritDoc @thi.ng/api#INotify.removeListener} */
  // @ts-ignore: mixin


  removeListener(id, fn, scope) {}
  /** {@inheritDoc @thi.ng/api#INotify.notify} */
  // @ts-ignore: mixin


  notify(e) {}

};
exports.History = History;
History.EVENT_UNDO = "undo";
History.EVENT_REDO = "redo";
History.EVENT_RECORD = "record";
exports.History = History = History_1 = __decorate([_api.INotifyMixin], History);
},{"@thi.ng/api":"MOSf","@thi.ng/equiv":"U8cl","@thi.ng/paths":"jkaf","./view":"LPQS"}],"JIcZ":[function(require,module,exports) {
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
},{"@thi.ng/api":"MOSf","@thi.ng/paths":"jkaf","./idgen":"EFLD","./view":"LPQS"}],"GVpA":[function(require,module,exports) {
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
},{"./atom":"MkkA","./cursor":"Xraa","./history":"Vh1i","./transacted":"JIcZ","./view":"LPQS"}],"DFXy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_CFG = exports.ROOT_ = exports.PAGE_TEMPLATE_ = exports.ROUTE_LOADING_ = exports.ROUTE_PATH_ = exports.trace_ = exports.draft_ = exports.app_ = exports.root_ = exports.state_ = exports.run_ = exports.source$_ = exports.handler_ = exports.erro_ = exports.reso_ = exports.args_ = exports.sub$_ = exports.STATE_ = exports.PATH_ = exports.router_ = exports.prefix_ = exports.post_ = exports.prep_ = exports.HEAD_ = exports.BODY_ = exports.URL_page_ = exports.URL_hash_ = exports.URL_query_ = exports.URL_subdomain_ = exports.URL_domain_ = exports.URL_data_ = exports.URL_path_ = exports.URL_ = exports.DOM_ = void 0;
const DOM_ = "DOM";
exports.DOM_ = DOM_;
const URL_ = "URL";
exports.URL_ = URL_;
const URL_path_ = "URL_path";
exports.URL_path_ = URL_path_;
const URL_data_ = "URL_data";
exports.URL_data_ = URL_data_;
const URL_domain_ = "URL_domain";
exports.URL_domain_ = URL_domain_;
const URL_subdomain_ = "URL_subdomain";
exports.URL_subdomain_ = URL_subdomain_;
const URL_query_ = "URL_query";
exports.URL_query_ = URL_query_;
const URL_hash_ = "URL_hash";
exports.URL_hash_ = URL_hash_;
const URL_page_ = "URL_page"; // userland router metadata constants

exports.URL_page_ = URL_page_;
const BODY_ = "BODY";
exports.BODY_ = BODY_;
const HEAD_ = "HEAD";
exports.HEAD_ = HEAD_;
const prep_ = "prep";
exports.prep_ = prep_;
const post_ = "post";
exports.post_ = post_;
const prefix_ = "prefix";
exports.prefix_ = prefix_;
const router_ = "router"; // set$$tate constants

exports.router_ = router_;
const PATH_ = "PATH";
exports.PATH_ = PATH_;
const STATE_ = "STATE"; // state setting Command constants

exports.STATE_ = STATE_;
const sub$_ = "sub$";
exports.sub$_ = sub$_;
const args_ = "args";
exports.args_ = args_;
const reso_ = "reso";
exports.reso_ = reso_;
const erro_ = "erro";
exports.erro_ = erro_;
const handler_ = "handler";
exports.handler_ = handler_;
const source$_ = "source$"; // boot config constants

exports.source$_ = source$_;
const run_ = "run";
exports.run_ = run_;
const state_ = "state";
exports.state_ = state_;
const root_ = "root";
exports.root_ = root_;
const app_ = "app";
exports.app_ = app_;
const draft_ = "draft";
exports.draft_ = draft_;
const trace_ = "trace"; // Global state keys/constants

exports.trace_ = trace_;
const ROUTE_PATH_ = "_ROUTE_PATH";
exports.ROUTE_PATH_ = ROUTE_PATH_;
const ROUTE_LOADING_ = "_ROUTE_LOADING";
exports.ROUTE_LOADING_ = ROUTE_LOADING_;
const PAGE_TEMPLATE_ = "_PAGE_TEMPLATE";
exports.PAGE_TEMPLATE_ = PAGE_TEMPLATE_;
const ROOT_ = "_ROOT";
exports.ROOT_ = ROOT_;
const DEFAULT_CFG = {
  [ROUTE_PATH_]: null,
  // home page / defaults to empty path
  [ROUTE_LOADING_]: true,
  [PAGE_TEMPLATE_]: null,
  [ROOT_]: null
};
exports.DEFAULT_CFG = DEFAULT_CFG;
},{}],"mjlp":[function(require,module,exports) {
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
},{"@thi.ng/api":"MOSf"}],"KTbf":[function(require,module,exports) {
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
},{}],"kQ3j":[function(require,module,exports) {
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
 * @param sub -
 * @param opts -
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
   * @param subs -
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
   * @param sub -
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
},{"@thi.ng/api":"MOSf","@thi.ng/arrays":"iKN7","@thi.ng/checks":"XYpc","@thi.ng/errors":"j3Rf","@thi.ng/transducers":"GbKR","./api":"mjlp","./utils/idgen":"KTbf"}],"cdxq":[function(require,module,exports) {
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
 * The synchronization is done via the
 * {@link @thi.ng/transducers#(partitionSync:1)} transducer fro the
 * {@link @thi.ng/transducers# | @thi.ng/transducers} package. See this
 * function's docs for further details.
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
 * Also see: {@link StreamSyncOpts}
 *
 * @param opts -
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
},{"@thi.ng/checks":"XYpc","@thi.ng/transducers":"GbKR","./api":"mjlp","./subscription":"kQ3j","./utils/idgen":"KTbf"}],"s9XI":[function(require,module,exports) {
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
},{}],"e0wi":[function(require,module,exports) {
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
 * @param opts -
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
},{"../api":"mjlp","../subscription":"kQ3j","../utils/idgen":"KTbf","../utils/worker":"s9XI"}],"SMpR":[function(require,module,exports) {
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
 * @param src - input stream
 * @param opts -
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
 * @param minChunkSize -
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
 * @param fn -
 */


exports.forkBuffer = forkBuffer;

const joinBuffer = fn => fn ? parts => [...(0, _transducers.mapcat)(fn, parts)] : parts => Array.prototype.concat.apply([], parts);

exports.joinBuffer = joinBuffer;
},{"@thi.ng/transducers":"GbKR","./stream-sync":"cdxq","./subs/tunnel":"e0wi"}],"jreL":[function(require,module,exports) {
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
 * @param factory -
 * @param id -
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
},{"@thi.ng/api":"MOSf","./subscription":"kQ3j","./utils/idgen":"KTbf"}],"RoOF":[function(require,module,exports) {
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
 * {@link @thi.ng/equiv#equiv} by default (but customizable via `equiv`
 * option). Each topic can have any number of subscribers.
 *
 * If a `xform` transducer is given, it is always applied prior to
 * passing the input to the topic function. I.e. in this case the topic
 * function will receive the transformed inputs.
 *
 * {@link PubSub} supports dynamic topic subscriptions and
 * unsubscriptions via {@link PubSub.(subscribeTopic:1)} and
 * {@link PubSub.unsubscribeTopic}. However, the standard
 * {@link ISubscribable.(subscribe:1)} /
 * {@link ISubscribable.unsubscribe} methods are NOT supported (since
 * meaningless) and will throw an error! `unsubscribe()` can only be
 * called WITHOUT argument to unsubscribe the entire `PubSub` instance
 * (incl. all topic subscriptions) from the parent stream.
 *
 * @param opts -
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
   * Unsupported. Use {@link PubSub.(subscribeTopic:1)} instead.
   */


  subscribe() {
    return (0, _errors.unsupported)(`use subscribeTopic() instead`);
  }
  /**
   * Unsupported. Use {@link PubSub.(subscribeTopic:1)} instead.
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
},{"@thi.ng/associative":"GmJl","@thi.ng/errors":"j3Rf","./api":"mjlp","./subscription":"kQ3j","./utils/idgen":"KTbf"}],"B10I":[function(require,module,exports) {
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
},{"@thi.ng/checks":"XYpc","./api":"mjlp","./subscription":"kQ3j","./utils/idgen":"KTbf"}],"napU":[function(require,module,exports) {
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
 * Use the {@link @thi.ng/transducers#(labeled:1)} transducer for each
 * input to create a stream of labeled values and track their provenance:
 *
 * @example
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
 * @param opts -
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
},{"./subscription":"kQ3j","./utils/idgen":"KTbf"}],"gm8K":[function(require,module,exports) {
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
 * @param src -
 * @param opts -
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
 * Creates a new {@link Stream} of given iterable which synchronously calls
 * `.next()` for each item of the iterable when the first (and in this
 * case the only one) subscriber becomes available. Once the iterable is
 * exhausted (MUST be finite!), then calls `.done()` by default, but can
 * be avoided by passing `false` as last argument.
 *
 * @param src -
 * @param opts -
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
},{"../stream":"B10I","../utils/idgen":"KTbf"}],"mcGq":[function(require,module,exports) {
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
},{"./from/iterable":"gm8K","./utils/idgen":"KTbf"}],"M2dW":[function(require,module,exports) {
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
 * @param delay -
 * @param opts -
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
},{"../stream":"B10I","../utils/idgen":"KTbf"}],"c4wU":[function(require,module,exports) {
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
},{"@thi.ng/checks":"XYpc","../stream":"B10I","../utils/idgen":"KTbf","./interval":"M2dW"}],"hAFn":[function(require,module,exports) {
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
 * @param src -
 * @param initial -
 * @param mix -
 * @param stop -
 * @param clock -
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
 * Convenience version of {@link tween} for its most common use case, tweening
 * of numeric streams.
 *
 * @param src -
 * @param init -
 * @param speed -
 * @param eps -
 * @param clock -
 */


exports.tween = tween;

const tweenNumber = (src, init = 0, speed = 0.05, eps = 1e-3, clock) => tween(src, init, (a, b) => a + (b - a) * speed, (a, b) => Math.abs(a - b) < eps, clock);

exports.tweenNumber = tweenNumber;
},{"@thi.ng/checks":"XYpc","@thi.ng/transducers":"GbKR","./from/interval":"M2dW","./from/raf":"c4wU","./stream-sync":"cdxq"}],"VCXn":[function(require,module,exports) {
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
 * @param atom -
 * @param opts -
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
},{"../stream":"B10I","../utils/idgen":"KTbf"}],"BKGr":[function(require,module,exports) {
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
 * @param src - event target
 * @param name - event name
 * @param listenerOpts - listener opts
 * @param streamOpts - stream opts
 */
const fromEvent = (src, name, listenerOpts = false, streamOpts) => new _stream.Stream(stream => {
  let listener = e => stream.next(e);

  src.addEventListener(name, listener, listenerOpts);
  return () => src.removeEventListener(name, listener, listenerOpts);
}, (0, _idgen.optsWithID)(`event-${name}`, streamOpts));
/**
 * Same as {@link fromEvent}, however only supports well-known DOM event
 * names. Returned stream instance will use corresponding concrete event
 * type in its type signature, whereas {@link fromEvent} will only use the
 * generic `Event`.
 *
 * @example
 * ```ts
 * fromDOMEvent(document.body, "mousemove"); // Stream<MouseEvent>
 * fromEvent(document.body, "mousemove"); // Stream<Event>
 * ```
 *
 * Also see: {@link fromEvent}
 *
 * @param src -
 * @param name -
 * @param listenerOpts -
 * @param streamOpts -
 */


exports.fromEvent = fromEvent;

const fromDOMEvent = (src, name, listenerOpts = false, streamOpts) => fromEvent(src, name, listenerOpts, streamOpts);

exports.fromDOMEvent = fromDOMEvent;
},{"../stream":"B10I","../utils/idgen":"KTbf"}],"jaYB":[function(require,module,exports) {
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
 * @param src -
 * @param opts -
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
},{"../stream":"B10I","../utils/idgen":"KTbf"}],"oREN":[function(require,module,exports) {
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
 * @param promises -
 */
const fromPromises = (promises, opts) => (0, _promise.fromPromise)(Promise.all(promises), (0, _idgen.optsWithID)("promises", opts)).transform((0, _transducers.mapcat)(x => x));

exports.fromPromises = fromPromises;
},{"@thi.ng/transducers":"GbKR","../utils/idgen":"KTbf","./promise":"jaYB"}],"TBRw":[function(require,module,exports) {
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
 * @param atom -
 * @param opts -
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
},{"@thi.ng/atom":"GVpA","../stream":"B10I","../utils/idgen":"KTbf"}],"biHq":[function(require,module,exports) {
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
 * @param worker -
 * @param opts -
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
},{"../api":"mjlp","../stream":"B10I","../utils/idgen":"KTbf","../utils/worker":"s9XI"}],"jF4T":[function(require,module,exports) {
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
 * @param pred - predicate function
 * @param truthy - subscription for truthy branch
 * @param falsy - subscription for falsy branch
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
},{"../pubsub":"RoOF"}],"sK4n":[function(require,module,exports) {
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
 * @param worker -
 * @param transfer -
 * @param terminate - worker termination delay (ms)
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
},{"@thi.ng/checks":"XYpc","../api":"mjlp","../utils/worker":"s9XI"}],"JzJ5":[function(require,module,exports) {
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
 * @param opts -
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
},{"../api":"mjlp","../subscription":"kQ3j","../utils/idgen":"KTbf"}],"unsB":[function(require,module,exports) {
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
 * @param side -
 * @param opts -
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
},{"../subscription":"kQ3j","../utils/idgen":"KTbf"}],"Q8oA":[function(require,module,exports) {
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
 * @param side -
 * @param opts -
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
},{"../subscription":"kQ3j","../utils/idgen":"KTbf"}],"GuAA":[function(require,module,exports) {
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
 * @param timeoutMs - timeout period in milliseconds
 * @param opts -
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
},{"../subscription":"kQ3j","../utils/idgen":"KTbf"}],"lDjW":[function(require,module,exports) {
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
 * @param prefix -
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
},{}],"NKOk":[function(require,module,exports) {
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
 * @param src -
 * @param xform -
 * @param rfn -
 * @param init -
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
},{"@thi.ng/transducers":"GbKR"}],"RCxb":[function(require,module,exports) {
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
},{"./api":"mjlp","./forkjoin":"SMpR","./metastream":"jreL","./pubsub":"RoOF","./stream":"B10I","./stream-merge":"napU","./stream-sync":"cdxq","./subscription":"kQ3j","./trigger":"mcGq","./tween":"hAFn","./from/atom":"VCXn","./from/event":"BKGr","./from/interval":"M2dW","./from/iterable":"gm8K","./from/promise":"jaYB","./from/promises":"oREN","./from/raf":"c4wU","./from/view":"TBRw","./from/worker":"biHq","./subs/bisect":"jF4T","./subs/post-worker":"sK4n","./subs/resolve":"JzJ5","./subs/sidechain-partition":"unsB","./subs/sidechain-toggle":"Q8oA","./subs/timeout":"GuAA","./subs/trace":"lDjW","./subs/transduce":"NKOk","./subs/tunnel":"e0wi","./utils/idgen":"KTbf","./utils/worker":"s9XI"}],"hI2k":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMnavigated$ = exports.DOMContentLoaded$ = exports.popstate$ = exports.command$ = exports.out$ = exports.run$ = void 0;

var _rstream = require("@thi.ng/rstream");

var _transducers = require("@thi.ng/transducers");

var _constants = require("../constants.js");

/**
 * @module streams
 * @format
 */

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
const run$ = (0, _rstream.pubsub)({
  topic: x => !!x.sub$,
  id: "run$_stream",
  equiv: (x, y) => x === y || y === "_TRACE_STREAM"
});
/**
 * ## `out$`
 *
 * Primary user-land _READ_ stream. For attaching handlers
 * for responding to emmitted Commands
 *
 */

exports.run$ = run$;
const out$ = (0, _rstream.pubsub)({
  topic: x => x.sub$,
  id: "out$_stream",
  equiv: (x, y) => x === y || y === "_TRACE_STREAM"
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
const command$ = run$.subscribeTopic(true, {
  next: x => out$.next(x),
  error: console.warn
}, {
  id: "command$_stream"
});
exports.command$ = command$;
const popstate$ = (0, _rstream.fromDOMEvent)(window, "popstate");
exports.popstate$ = popstate$;
const DOMContentLoaded$ = (0, _rstream.fromDOMEvent)(window, "DOMContentLoaded"); // example of custom stream dispatch (logging)

/**
 *
 * There are three types of navigation we need to handle:
 * 1. DOMContentLoaded (entering the site) events
 * 2. popstate (browser back/forward button clicks) events
 * 3. `<a hurl="x">` (link clicking)
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
 *
 * see _HURL in `/commands/routing.js` for ad-hoc stream
 * injection example
 */

exports.DOMContentLoaded$ = DOMContentLoaded$;
const DOMnavigated$ = (0, _rstream.merge)({
  src: [popstate$, DOMContentLoaded$]
}).transform((0, _transducers.map)(x => ({
  [_constants.URL_]: x.target.location.href,
  [_constants.DOM_]: x.currentTarget
})));
exports.DOMnavigated$ = DOMnavigated$;
},{"@thi.ng/rstream":"RCxb","@thi.ng/transducers":"GbKR","../constants.js":"DFXy"}],"WyOZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msTaskPromiseDelay = void 0;

const msTaskPromiseDelay = t => new Promise(resolve => setTimeout(resolve, t));

exports.msTaskPromiseDelay = msTaskPromiseDelay;
},{}],"wlvZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff_keys = diff_keys;

/** @format */
function diff_keys(nKeys = [], nObj = {}) {
  const all = Object.keys(nObj);
  const xKeys = all.filter(key => !nKeys.includes(key));
  const xObj = Object.entries(nObj).reduce((a, [k, v]) => {
    if (!nKeys.includes(k)) return { ...a,
      [k]: v
    };else return a;
  }, {});
  return [xKeys, xObj];
}

diff_keys(["a", "b"], {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}); //?

diff_keys([1, 2, 3]); //?
},{}],"itCy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify_type = void 0;

var _checks = require("@thi.ng/checks");

/** @format */
// prettier-ignore

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
const stringify_type = x => {
  if ((0, _checks.isFunction)(x) && x.length === 0) return "THUNK";
  if ((0, _checks.isFunction)(x) && x.length > 0) return "FUNCTION";
  if ((0, _checks.isPromise)(x)) return "PROMISE";
  if ((0, _checks.isObject)(x)) return "OBJECT";
  return "type_str NOT FOUND";
};

exports.stringify_type = stringify_type;
},{"@thi.ng/checks":"XYpc"}],"CBID":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trace$ = void 0;

var _rstream = require("@thi.ng/rstream");

/** @format */

/**
 * ## `trace_stream`
 *
 * simple ad-hoc tracer to log one of the streams emmissions
 * @param {string} log_prefix A string that is prepended to
 *                  console.log's of emissions from the
 *                  stream
 * @param {stream}
 * */
const trace$ = (log_prefix, stream) => stream.subscribeTopic ? stream.subscribeTopic("_TRACE_STREAM", {
  next: x => console.log(log_prefix, x),
  error: console.warn
}) : stream.subscribe((0, _rstream.trace)(log_prefix));

exports.trace$ = trace$;
},{"@thi.ng/rstream":"RCxb"}],"ZsgN":[function(require,module,exports) {
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
},{}],"LpfZ":[function(require,module,exports) {
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
},{}],"nGIe":[function(require,module,exports) {
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');
},{"./decode":"ZsgN","./encode":"LpfZ"}],"DgSw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unfURL = exports.fURL = void 0;

var _querystring = _interopRequireDefault(require("querystring"));

var _constants = require("../constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */
// import gql from "nanographql"

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
const fURL = (_URL, prefixRGX) => {
  // console.log("parsing...")
  let URL_subdomain = [];
  let URL_domain = [];
  let URL_path = [];
  const splitRGX = /(?=\?)|(?=#)/g; // split the path on any `?` and/or `#` chars (1-3 parts)

  const parts = prefixRGX ? _URL.replace(prefixRGX, "").split(splitRGX) : _URL.split(splitRGX); // take the first component of split: the core URL

  const path_str = parts[0]; // split the path_str further into individual members and
  // remove the empty string between any adjacent slashes `//`

  const full_path = path_str.split("/").filter(x => x !== "");

  if (/http/i.test(_URL)) {
    // if the input URL is HTTP(S), partition into sub components
    // domain is the last two members of the 2nd component
    URL_domain = full_path[1].split(".").slice(-2); // subdomain is anything before the domain
    // see https://stackoverflow.com/a/56921347
    // for mocking subdomain on localhost

    URL_subdomain = full_path[1].split(".").slice(0, -2); // path is the last component in the

    URL_path = full_path.slice(2);
  } else {
    // in the case of a relative URL `<a href="/about">
    // the relative path is the full path
    URL_path = full_path;
  } // pull out the query component as a string


  const query_str = parts.filter(part => part.slice(0, 1) === "?")[0] || ""; // pull out the hash component as a string

  const hash_str = parts.filter(part => part.slice(0, 1) === "#")[0] || ""; // parse the query string into conventional parts using qs

  const URL_query = _querystring.default.parse(query_str.slice(1)); // remove the actual `#` hash character from the string


  const URL_hash = hash_str.slice(1);
  return {
    [_constants.URL_]: _URL,
    [_constants.URL_subdomain_]: URL_subdomain,
    [_constants.URL_domain_]: URL_domain,
    [_constants.URL_path_]: URL_path,
    [_constants.URL_query_]: URL_query,
    [_constants.URL_hash_]: URL_hash
  };
};
/**
 *
 * `unparse_URL`
 *
 * The reverse of `parse_URL` that enables talking to the
 * router with a friendlier API than having to always
 * construct URLs manually.
 *
 * TODO: testing for `unparse_URL`
 *
 */


exports.fURL = fURL;

const unfURL = (parsed, isAbsolute = false) => {
  // console.log("unparsing...")
  const {
    [_constants.URL_subdomain_]: URL_subdomain,
    [_constants.URL_domain_]: URL_domain,
    [_constants.URL_path_]: URL_path,
    [_constants.URL_query_]: URL_query,
    [_constants.URL_hash_]: URL_hash
  } = fURL(parsed[_constants.URL_] || window.location.href);
  const {
    _URL_subdomain = URL_subdomain,
    _URL_domain = URL_domain,
    _URL_path = URL_path,
    _URL_query = URL_query,
    _URL_hash = URL_hash
  } = parsed;

  const [protocol, rest] = _constants.URL_.split("//");

  const [root] = rest.split("/");
  const [part_one, ...other_parts] = root.split("."); // console.log({ part_one, other_parts })

  const domain = _URL_subdomain && _URL_domain ? [..._URL_subdomain, ..._URL_domain] : _URL_subdomain && other_parts.length > 1 ? [..._URL_subdomain, ...other_parts] : _URL_subdomain && other_parts.length === 1 ? [..._URL_subdomain, part_one, ...other_parts] : [..._URL_subdomain, part_one];

  const query_string = _querystring.default.encode(_URL_query);

  const rootRelative = `${_URL_path.length > 0 ? "/" + _URL_path.join("/") : ""}${_URL_hash ? "#" + _URL_hash : null}?${query_string}`; // console.log({ domain })
  // console.log({ protocol, rest, root, domain, URL_domain })

  return !isAbsolute ? rootRelative : `${protocol}//${domain.join(".")}${rootRelative}`;
};
/*
let test1 = {
  // URL: "https://api.census.gov",
  // URL_subdomain: ["sub"],
  // URL_domain: ["swing", "bloop", "com"],
  URL_path: ["lens", "path"],
  // URL_query: {
  //   GQL: `
  //       query($name: String!) {
  //         movie(name: $name) {
  //           releaseDate
  //         }
  //       }
  //     `.replace(/ |\n/g, ""),
  //   name: "Back to the Future"
  // },
  URL_hash: "scroll-to"
}
unparse_URL(test1, true) //?

parse_URL(
  "https://poop.bloop.gov/data/wipe#something?get=NAME,B101001_10E,group(B61010)&in=state:01&in=county:*&for=tract:*"
)

parse_URL(
  "http://sub.swing.bloop.com/lens/path#scroll-to?GQL=query(%24name%3AString!)%7Bmovie(name%3A%24name)%7BreleaseDate%7D%7D&name=Back%20to%20the%20Future"
) //?

*/


exports.unfURL = unfURL;
},{"querystring":"nGIe","../constants.js":"DFXy"}],"lEyc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.x_key_ERR = exports.key_index_err = exports.stringify_w_functions = void 0;

/**
 * Uses a JSON.stringify "replacer" function to preserve a
 * small (truncated) version of the function signature for
 * Object values that contain them
 *
 * @format
 */
const stringify_w_functions = (x, indent) => JSON.stringify(x, (key, value) => {
  if (typeof value === "function") {
    return value.toString().replace(/\r?\n|\r/g, "").replace(/\s\s+/g, " ").slice(0, 12) + "...";
  } else {
    return value;
  }
}, indent);

exports.stringify_w_functions = stringify_w_functions;

const key_index_err = (c, i) => {
  const idx_dict0 = Array.from(Array(19).keys()).reduce((a, idx) => ({ ...a,
    [idx]: `${idx + 1}th`
  }), {});
  const idx_dict = { ...idx_dict0,
    0: "1st",
    1: "2nd",
    2: "3rd"
  };
  const idx_str = idx_dict[i];
  return `🔍 it was the ${idx_str} Command in a Task or ${idx_dict[i - 1]} in a Subtask.`;
}; // prettier-ignore

/**
 *
 * `uknown_key_ERR`
 *
 * Just a  little error for people defining commands
 * that makes sure their keys don't contain typos
 */


exports.key_index_err = key_index_err;

const x_key_ERR = (str, c, unknown, sub$, index) => {
  const {
    source$
  } = c;
  const count = Object.entries(c).length;
  return `

  🔥 ${str} ERROR:
  
  🔥 Unrecognized Command Key(s)
  
  FAULTY sub$: "${sub$}" 
  ${Object.keys(unknown)[0][0] ? `
  ${index ? key_index_err(c, index) : ""}

  The problematic entry/entries: 

  🤔 ${!index && count > 3 && !source$ ? `${Object.entries(unknown)[0][0]}: <Stream>` : stringify_w_functions(unknown, 2)}` : ""} 🤔

  ACCEPTABLE ENTRY KEYS ${index ? "WITHIN A COMMAND" : "DURING REGISTRATION"}: 

  'sub$' 
    - optional 
    - topic key for for registering & targeting Commands 
    - signatures:
      - "X"    : String: Topic key
      - XX$    : Stream: for dispatching args to custom stream

  'args' 
    - required 
    - payload or accumulator reshaping payload function (Promises OK)
    - signatures:
      - PRI    : primitive: static payload -> is NOT accumulated
      - {?}    : object: static payload -> is accumulated 
      - (+) => : function (non-nullary): dispatch payload from 
                values accumulated from prior Command payloads
      - (0) => : thunk (nullary): dispatch to custom stream
      - {P}    : Promise or (#) => {P} Promise returning function
      
  'reso' 
    - required for Promise handling 
    - converts resolved Promise payloads to Command args
    - signature:
      - ({A: accumulator}, {P: resolved Promise}) =>  

  'erro' 
    - recommended for Promise rejections 
    - handles rejected Promise payloads
    - signature:
      - ({A: accumulator}, {E: error object}) =>  
  ${index ? `` : `
  'handler' 
    - required 
    - function that is called on payload's arrival
    - signature: 
      - (#) => : function instruments actual side-effects/work 
  
  'source$' 
    - advanced/optional 
    - source stream (see http://thi.ng/rstream)`}

  Hope that helps!
  `;
};

exports.x_key_ERR = x_key_ERR;
},{}],"BNjd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "msTaskPromiseDelay", {
  enumerable: true,
  get: function () {
    return _taskDelay.msTaskPromiseDelay;
  }
});
Object.defineProperty(exports, "diff_keys", {
  enumerable: true,
  get: function () {
    return _diff_keys.diff_keys;
  }
});
Object.defineProperty(exports, "stringify_type", {
  enumerable: true,
  get: function () {
    return _strinigify_type.stringify_type;
  }
});
Object.defineProperty(exports, "trace$", {
  enumerable: true,
  get: function () {
    return _trace$.trace$;
  }
});
Object.defineProperty(exports, "fURL", {
  enumerable: true,
  get: function () {
    return _URL.fURL;
  }
});
Object.defineProperty(exports, "unfURL", {
  enumerable: true,
  get: function () {
    return _URL.unfURL;
  }
});
Object.defineProperty(exports, "key_index_err", {
  enumerable: true,
  get: function () {
    return _xKey.key_index_err;
  }
});
Object.defineProperty(exports, "stringify_w_functions", {
  enumerable: true,
  get: function () {
    return _xKey.stringify_w_functions;
  }
});
Object.defineProperty(exports, "x_key_ERR", {
  enumerable: true,
  get: function () {
    return _xKey.x_key_ERR;
  }
});

var _taskDelay = require("./taskDelay");

var _diff_keys = require("./diff_keys.js");

var _strinigify_type = require("./strinigify_type.js");

var _trace$ = require("./trace$.js");

var _URL = require("./URL.js");

var _xKey = require("./xKey.js");
},{"./taskDelay":"WyOZ","./diff_keys.js":"wlvZ","./strinigify_type.js":"itCy","./trace$.js":"CBID","./URL.js":"DgSw","./xKey.js":"lEyc"}],"liNl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCMD = registerCMD;

var _associative = require("@thi.ng/associative");

var _transducers = require("@thi.ng/transducers");

var _checks = require("@thi.ng/checks");

var _constants = require("../constants.js");

var _stream$ = require("../core/stream$.js");

var _utils = require("../utils");

/**
 * @module Registration
 * @format
 */
const err_str = "command Registration `registerCMD`";

const feedCMD$fromSource$ = cmd => {
  const _sub$ = cmd[_constants.sub$_];
  const _args = cmd[_constants.args_];
  const args_is_fn = (0, _checks.isFunction)(_args);

  const deliver = x => ({
    [_constants.sub$_]: _sub$,
    [_constants.args_]: _args(x)
  });

  const delivery = {
    [_constants.sub$_]: _sub$,
    [_constants.args_]: _args
  };

  const feed = $ => args_is_fn ? (0, _transducers.map)(x => $.next(deliver(x))) : (0, _transducers.map)(() => $.next(delivery)); // looks for the `sub$` key to determine if its a command


  return cmd[_constants.source$_].subscribe(feed(_stream$.command$));
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
 * @param {Command} command an object with four keys:
 *  1. `sub$` (required)
 *  2. `handler` (required)
 *  3. `args` (optional, sets default) during registration
 *  4. `source$` (optional, enables stream to feed Command)
 *
 */


let registered = new _associative.EquivMap();

function registerCMD(command) {
  // 📌 TODO: register factory function
  const _sub$ = command[_constants.sub$_];
  const _args = command[_constants.args_];
  const _erro = command[_constants.erro_];
  const _reso = command[_constants.reso_];
  const _source$ = command[_constants.source$_];
  const _handler = command[_constants.handler_];
  const knowns = [_constants.sub$_, _constants.args_, _constants.reso_, _constants.erro_, _constants.source$_, _constants.handler_];
  const [unknowns] = (0, _utils.diff_keys)(knowns, command); // console.log({ knowns, unknowns })

  /**
   * destructure the args component out of the emissions
   * to save the user from having to do that PITA everytime
   */

  if (unknowns.length > 0) {
    throw new Error((0, _utils.x_key_ERR)(err_str, command, unknowns, _sub$, undefined));
  }

  if (_source$) feedCMD$fromSource$(command); // more: https://github.com/thi-ng/umbrella/blob/develop/examples/rstream-event-loop/src/events.ts

  _stream$.out$.subscribeTopic(_sub$, {
    next: _handler,
    error: console.warn
  }, (0, _transducers.map)(emissions => emissions[_constants.args_]));

  const CMD = _reso ? {
    [_constants.sub$_]: _sub$,
    [_constants.args_]: _args,
    [_constants.reso_]: _reso,
    [_constants.erro_]: _erro
  } : {
    [_constants.sub$_]: _sub$,
    [_constants.args_]: _args
  }; // Set.add not supported by IE

  if (registered.set) {
    if (registered.has(_sub$)) {
      throw new Error(`

🔥 duplicate \`sub$\` value detected in Command:
${(0, _utils.stringify_w_functions)(CMD)}
existing registered Commands:
${JSON.stringify([...registered.keys()], null, 2)}
🔥 Please use a different/unique Command \`sub$\` string

🔎 Inspect existing Commands using js Map API \`registerCMD.all\`
🔎 (\`registerCMD.all.entries()\`, \`registerCMD.all.has("X")\`, etc.)

        `);
    }

    registered.set(_sub$, CMD);
  }

  return CMD;
}
/**
 * enables inspection of the existing Command registrations
 * if using Chrome, there's an additional advantage of being
 * able to find the `[[FunctionLocation]]` of the Command,
 * @example
 * registerCMD.all.entries()
 * // => ⬇ [[Entries]]
 * //      ⬇ 0: {"HURL_CMD" => Object}
 * //          key: "HURL_CMD"
 * //        ⬇ value:
 * //            sub$: "HURL_CMD"
 * //          ⬇ args: ev => ev
 * //              arguments: (...)
 * //              caller: (...)
 * //              length: 1
 * //              name: "args"
 * //            ➡ __proto__: ƒ ()
 * //              [[FunctionLocation]]: routing.js:32 (♻ Chrome)
 * //            ➡ [[Scopes]]: Scopes[2]
 */


registerCMD.all = registered;
},{"@thi.ng/associative":"GmJl","@thi.ng/transducers":"GbKR","@thi.ng/checks":"XYpc","../constants.js":"DFXy","../core/stream$.js":"hI2k","../utils":"BNjd"}],"LyFD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FLIP_LAST_INVERSE_PLAY = exports.FLIP_FIRST = void 0;

var _atom = require("@thi.ng/atom");

var _paths = require("@thi.ng/paths");

var _constants = require("../constants.js");

var _register = require("./register.js");

/**
 * @module FLIP
 * @format
 */
//
//    d8                  888
//  _d88__  e88~-_   e88~\888  e88~-_
//   888   d888   i d888  888 d888   i
//   888   8888   | 8888  888 8888   |
//   888   Y888   ' Y888  888 Y888   '
//   "88_/  "88_-~   "88_/888  "88_-~
//
//
// add before/after transition hooks for support animations
function getRect(element, frame) {
  const {
    top,
    bottom,
    left,
    right,
    width,
    height
  } = element.getBoundingClientRect();
  const parent = frame ? frame.getBoundingClientRect() : null;
  return {
    top: top - (parent ? parent.top : 0),
    bottom,
    left: left - (parent ? parent.left : 0),
    right,
    width,
    height
  };
}

const shuffle_paths = uid => ({
  rects: ["_FLIP_shuffle", "rects", uid],
  elems: ["_FLIP_shuffle", "elems", uid]
});

const FLIP_all = (el, state, uid, frameDOMel = null) => {
  const {
    rects
  } = shuffle_paths(uid);
  if (!(0, _paths.getIn)(state.deref(), rects)) return state.resetIn(rects, getRect(el, frameDOMel));
  const F_flip_map = (0, _paths.getIn)(state.deref(), rects);
  const L_flip_map = getRect(el, frameDOMel); // console.log({ F_flip_map, L_flip_map })

  const Tx = F_flip_map.left - L_flip_map.left;
  const Ty = F_flip_map.top - L_flip_map.top;
  const Sx = F_flip_map.width / L_flip_map.width;
  const Sy = F_flip_map.height / L_flip_map.height;
  el.style.transformOrigin = "0 0";
  el.style.transition = "";
  const trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`;
  el.style.transform = trans;
  state.resetIn(rects, L_flip_map);
  requestAnimationFrame(() => {
    el.style.transition = "all .4s cubic-bezier(.54,-0.29,.17,1.11)";
    el.style.transform = "none";
  });
};

const zoom_paths = uid => ({
  rects: ["_FLIP_zoom", "rects", uid],
  elems: ["_FLIP_zoom", "elems", uid],
  clicks: ["_FLIP_zoom", "clicks", uid],
  scrolls: ["_FLIP_zoom", "scroll", uid]
});
/**
 *
 * order:
 * normalizeTree -> render -> diff -> init -> release
 *                 | hdom |         | dom  | post-dom
 *
 * have to think backwards:
 * 1. el mounted (init): look for existing flip map for id
 *  - if exists, Play anim and store new flip map rect (for navs)
 *  - if doesn't, nada
 * 2. el clicked (render.attrs.onclick): measure and store flip map for id
 * 3. el released: if clicked, calc flip rect and lookup for id:
 *  - if first === last, no change (on nav e.g.)
 *  - if first !== last, nav change (store rect for id)
 * @example
 * FLIPFirst({ state: "bloop"})
 *
 */


const FLIPFirst = ({
  state,
  id,
  target
}) => {
  // 📌 TODO: GOOD PLACE FOR AN `onStart` hook animation/callback
  const {
    rects,
    clicks,
    scrolls
  } = zoom_paths(id); // sets the rect in state for next el init to sniff

  const flip_map = getRect(target);
  state.resetIn(rects, flip_map); // registers component as having been clicked (focused)

  state.resetIn(clicks, true);
  state.resetIn(scrolls, {
    y: window.scrollY,
    x: window.scrollX
  });
};
/**
 * https://coder-coder.com/z-index-isnt-working/
 */


const zIndex = (el, idx) => el.style.zIndex = idx;
/**
 * 1. if it has been clicked that means the last thing
 *    that happened was a click that triggered this init
 *    so we do the calcs
 *
 * 2. if a back/nav (no frame) event was what triggered
 *    the init do the calcs with no frame
 */


const FLIPLastInvertPlay = ({
  element,
  state,
  id,
  // just baffle them with https://cubic-bezier.com/
  transition = "all .3s cubic-bezier(.54,-0.29,.17,1.11)"
}) => {
  element.setAttribute("flip", id);
  const {
    rects,
    clicks,
    scrolls
  } = zoom_paths(id);
  const F_flip_map = (0, _paths.getIn)(state.deref(), rects) || null; // NO RECT => NOT CLICKED

  if (!F_flip_map) return; // 🕛 if flip active, scroll element on init
  // element.scrollIntoView()

  /**
   * 🔥 this may cause issues for parrallel anims append this
   * to a specific target using:
   * Array.from(el.querySelectorAll("[flip]")).forEach(x=>
   * if i last... el.scrollIntoView())
   *
   */
  // 🕞 calculate location and size

  let L_flip_map = getRect(element); // recalc rect if out of initial view after scrolling into view

  if (Math.abs(F_flip_map.top - L_flip_map.top) > window.innerHeight) {
    element.scrollIntoView();
    L_flip_map = getRect(element);
  }

  const Tx = F_flip_map.left - L_flip_map.left;
  const Ty = F_flip_map.top - L_flip_map.top;
  const Sx = F_flip_map.width / L_flip_map.width;
  const Sy = F_flip_map.height / L_flip_map.height; // 🕕 just before "Last", scroll element to middle of page
  // const top = L_flip_map.top + window.pageYOffset

  const {
    x,
    y
  } = (0, _paths.getIn)(state.deref(), scrolls); // top - window.innerHeight / 2

  window.scrollTo(x, y); // console.log({ Tx, Ty, Sx, Sy })

  element.style.transformOrigin = "top left";
  element.style.transition = "";
  const trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`;
  element.style.transform = trans; // PLAY

  requestAnimationFrame(() => {
    // 🕤 just before animating, scroll to new location
    window.scrollTo(x, y); // element.style.transformOrigin = "top left"

    element.style.transition = transition;
    element.style.transform = "none"; // 💩 hack for removing zIndex after animation is complete
    // 📌 TODO:    🔻 GOOD PLACE FOR AN `onComplete` hook animation/callback

    setTimeout(() => zIndex(element, 0), 200);
  }); // move element to front

  zIndex(element, 1); // 🔍 consider exposing in the API

  const clicked = (0, _paths.getIn)(state.deref(), clicks) || null;

  if (!clicked) {
    // console.log(uid, "FLIP'ed on navigated")
    state.resetIn(rects, null);
  } else {
    // console.log(uid, "FLIP'ed on click! 👆")
    state.resetIn(rects, L_flip_map);
  } // remove click frame


  state.resetIn(clicks, null);
};
/**
 * What's happening:
 * - on first click (render)
 * - rect registered
 * - frame registered
 * - navs
 * - on init of new DOM
 * - checks for rect & frame
 * - uses rect & frame to calc diff
 * - PLAY
 */


const state = new _atom.Atom({});
const FLIP_FIRST = (0, _register.registerCMD)({
  [_constants.sub$_]: "FLIP_FIRST",
  [_constants.args_]: x => x,
  [_constants.handler_]: ({
    id,
    target
  }) => FLIPFirst({
    id,
    target,
    state
  })
});
exports.FLIP_FIRST = FLIP_FIRST;
const FLIP_LAST_INVERSE_PLAY = (0, _register.registerCMD)({
  [_constants.sub$_]: "FLIP_LAST_INVERSE_PLAY",
  [_constants.args_]: x => x,
  [_constants.handler_]: ({
    id,
    element
  }) => FLIPLastInvertPlay({
    id,
    element,
    state
  })
});
exports.FLIP_LAST_INVERSE_PLAY = FLIP_LAST_INVERSE_PLAY;
},{"@thi.ng/atom":"GVpA","@thi.ng/paths":"jkaf","../constants.js":"DFXy","./register.js":"liNl"}],"NVrH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INJECT_HEAD = void 0;

var _constants = require("../constants.js");

var _register = require("./register.js");

/**
 * @module INJECT_HEAD
 * @format
 */
const setFavicon = href => {
  let link = document.querySelector("link[rel*='icon']") || document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = href;
  document.getElementsByTagName("head")[0].appendChild(link);
};

const replaceMeta = (obj = defalt_cfg) => {
  Object.entries(obj).forEach(([key, val]) => {
    try {
      return {
        HEAD_title: () => {
          document.title = val;
        },
        HEAD_meta: () => {
          Object.entries(val).forEach(([prop, content]) => {
            document.head.querySelector(`meta[property="${prop}"]`).content = content;
          });
        },
        HEAD_favicon: () => setFavicon(val)
      }[key]();
    } catch (e) {
      console.warn(e);
    }
  });
};

const defalt_cfg = {
  meta: {
    "og:title": "My thi.ng",
    "og:image": "https://github.com/loganpowell/ac/raw/master/assets/thing400x400.png",
    "og:image:width": 400,
    "og:image:height": 400,
    "og:description": "web app",
    "og:type": "website"
  },
  title: "My thi.ng",
  favicon: "https://github.com/loganpowell/ac/raw/master/assets/favicon.ico"
};

const conform_head = ({
  title = defalt_cfg.meta.title,
  description = defalt_cfg.meta["og:description"],
  image: {
    url = defalt_cfg.meta["og:image"],
    height = defalt_cfg.meta["og:image:height"],
    width = defalt_cfg.meta["og:image:width"]
  },
  favicon = defalt_cfg.favicon,
  type = defalt_cfg.meta["og:type"]
}) => ({
  HEAD_meta: {
    /**
     * og:url can tell scrapers to ignore the page and
     * scrape this instead. Would save scraping the whole
     * page and might be friendlier for `jsdom`
     */
    // "og:url": history.state.URL,
    "og:title": title,
    "og:type": type,
    "og:description": description,
    "og:image:width": width,
    "og:image:height": height,
    "og:image": url
  },
  HEAD_title: title,
  HEAD_favicon: favicon
});

const INJECT_HEAD = (0, _register.registerCMD)({
  // source$: DOMnavigated$,
  [_constants.sub$_]: "INJECT_HEAD",
  [_constants.args_]: acc => ({
    [_constants.URL_data_]: acc[_constants.URL_data_]
  }),
  [_constants.handler_]: ({
    [_constants.URL_data_]: {
      [_constants.HEAD_]: {
        title,
        description,
        image,
        favicon,
        type
      }
    }
  }) => replaceMeta(conform_head({
    title,
    description,
    image,
    favicon,
    type
  }))
});
exports.INJECT_HEAD = INJECT_HEAD;
},{"../constants.js":"DFXy","./register.js":"liNl"}],"gXtp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__NOTIFY_PRERENDER_DOM = exports.__HREF_PUSHSTATE_DOM = exports.__SET_LINK_ATTRS_DOM = exports.HURL = exports.HURLer = void 0;

var _utils = require("../utils");

var _stream$ = require("../core/stream$.js");

var _constants = require("../constants.js");

var _register = require("./register.js");

/**
 * @module Routing
 * @format
 */

/**
 * we need to transform the payload to align with the
 * object structure of the native DOM events ('popstate'
 * and 'DOMContentLoaded') payloads, so they're
 * transformed correctly by the `navigated$` stream
 * transforms
 */
const HURLer = ev => {
  // ev.preventDefault()
  // console.log({ e })
  let href = ev.target.href;
  let w_href = window.location.href;
  let parsed = (0, _utils.fURL)(w_href);
  let w_path = `/${parsed[_constants.URL_path_].join("/")}`; // handle both absolute and root relative paths

  if (href === w_href || href === w_path) return;

  _stream$.DOMnavigated$.next({
    target: {
      location: {
        href
      }
    },
    currentTarget: ev.currentTarget
  });

  return ev;
};

exports.HURLer = HURLer;
const HURL = (0, _register.registerCMD)({
  [_constants.sub$_]: "HURL",
  [_constants.args_]: ev => ev,
  [_constants.handler_]: HURLer
});
exports.HURL = HURL;

const setLinkAttrs = target => {
  document.body.querySelectorAll("a[visited]").forEach(el => {
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
 * default payload `args` signature:
 * ```
 * args: ({ DOM }) => ({ DOM }),
 * ```
 * Input = DOM node reference
 *
 * ### Handler: side-effecting
 * Takes a DOM reference and queries all visited links. Sets
 * current/clicked link as active and sets visted links that
 * don't match current URL to inactive see `setLinkAttrs`
 * function
 *
 */


const __SET_LINK_ATTRS_DOM = (0, _register.registerCMD)({
  [_constants.sub$_]: "__SET_LINK_ATTRS_DOM",
  [_constants.args_]: acc => ({
    [_constants.DOM_]: acc[_constants.DOM_]
  }),
  [_constants.handler_]: args => setLinkAttrs(args[_constants.DOM_])
});
/**
 * ## `_HREF_PUSHSTATE_DOM`
 *
 * Routing Command: DOM-specific
 *
 * ### Payload: function
 * default payload `args` signature:
 * ```
 * args: ({ URL, DOM }) => ({ URL, DOM }),
 * ```
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


exports.__SET_LINK_ATTRS_DOM = __SET_LINK_ATTRS_DOM;

const __HREF_PUSHSTATE_DOM = (0, _register.registerCMD)({
  [_constants.sub$_]: "__HREF_PUSHSTATE_DOM",
  [_constants.args_]: acc => ({
    [_constants.URL_]: acc[_constants.URL_],
    [_constants.DOM_]: acc[_constants.DOM_]
  }),
  [_constants.handler_]: args => !args[_constants.DOM_].document ? history.pushState((0, _utils.fURL)(args[_constants.URL_]), null, args[_constants.URL_]) : null
});
/**
 * ## `_NOTIFY_PRERENDER_DOM`
 *
 * ### Payload: static
 * default payload `args` signature
 * ```
 * args: true,
 * ```
 * ### Handler: side-effecting
 * Routing Command: DOM-specific (used for manually
 * triggering `rendertron` prerenderer for bots/web-crawlers
 *
 *
 * TODO: `jsdom` prerender testing
 *
 * basic `http` server that returns static content for
 * certain user-agents
 *
 * import { JSDOM } from "jsdom"
 *
 * const document = (new JSDOM(...)).window.document
 * document.addEventListener("rendered", () => {...scrape
 * stuff here...
 * })
 *
 *
 */


exports.__HREF_PUSHSTATE_DOM = __HREF_PUSHSTATE_DOM;

const __NOTIFY_PRERENDER_DOM = (0, _register.registerCMD)({
  [_constants.sub$_]: "__NOTIFY_PRERENDER_DOM",
  [_constants.args_]: true,
  //👀 for prerenderer,
  [_constants.handler_]: () => document.dispatchEvent(new Event("rendered"))
});

exports.__NOTIFY_PRERENDER_DOM = __NOTIFY_PRERENDER_DOM;
},{"../utils":"BNjd","../core/stream$.js":"hI2k","../constants.js":"DFXy","./register.js":"liNl"}],"oN56":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set$$tate = exports.$store$ = void 0;

var _atom = require("@thi.ng/atom");

var _checks = require("@thi.ng/checks");

var _constants = require("../constants.js");

/**
 * @module set$$tate
 * @format
 */
// Global $store$ Container from [@thi.ng/atom](http://thi.ng/atom)
const $store$ = new _atom.Atom(_constants.DEFAULT_CFG);
/**
 *
 * ## `set$$tate`
 *
 * Swaps the current value at the given path/lens into the
 * global store with that of the given value. Checks to see
 * if that value should be either spread into an existing
 * object or a complete replacement
 *
 */

exports.$store$ = $store$;

const set$$tate = (path, val) => $store$.swapIn(path, x => !path.length && !(0, _checks.isPlainObject)(val) ? { ...x,
  [Object.keys(val)[0]]: val
} : (0, _checks.isPlainObject)(x) && (0, _checks.isPlainObject)(val) ? { ...x,
  ...val
} : val); // $store$.resetIn(path, val)


exports.set$$tate = set$$tate;
},{"@thi.ng/atom":"GVpA","@thi.ng/checks":"XYpc","../constants.js":"DFXy"}],"si7o":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "$store$", {
  enumerable: true,
  get: function () {
    return _state.$store$;
  }
});
Object.defineProperty(exports, "set$$tate", {
  enumerable: true,
  get: function () {
    return _state.set$$tate;
  }
});

var _state = require("./state.js");
},{"./state.js":"oN56"}],"hwx7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_STATE = void 0;

var _constants = require("../constants.js");

var _store = require("../store");

var _register = require("./register.js");

/**
 * @module SET_STATE
 * @format
 */
const SET_STATE = (0, _register.registerCMD)({
  [_constants.sub$_]: "SET_STATE",
  [_constants.args_]: x => x,
  [_constants.handler_]: ({
    STATE,
    PATH
  }) => (0, _store.set$$tate)(PATH, STATE)
});
exports.SET_STATE = SET_STATE;
},{"../constants.js":"DFXy","../store":"si7o","./register.js":"liNl"}],"j2Dl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FLIP_FIRST", {
  enumerable: true,
  get: function () {
    return _FLIP.FLIP_FIRST;
  }
});
Object.defineProperty(exports, "FLIP_LAST_INVERSE_PLAY", {
  enumerable: true,
  get: function () {
    return _FLIP.FLIP_LAST_INVERSE_PLAY;
  }
});
Object.defineProperty(exports, "INJECT_HEAD", {
  enumerable: true,
  get: function () {
    return _head.INJECT_HEAD;
  }
});
Object.defineProperty(exports, "HURL", {
  enumerable: true,
  get: function () {
    return _routing.HURL;
  }
});
Object.defineProperty(exports, "HURLer", {
  enumerable: true,
  get: function () {
    return _routing.HURLer;
  }
});
Object.defineProperty(exports, "__HREF_PUSHSTATE_DOM", {
  enumerable: true,
  get: function () {
    return _routing.__HREF_PUSHSTATE_DOM;
  }
});
Object.defineProperty(exports, "__NOTIFY_PRERENDER_DOM", {
  enumerable: true,
  get: function () {
    return _routing.__NOTIFY_PRERENDER_DOM;
  }
});
Object.defineProperty(exports, "__SET_LINK_ATTRS_DOM", {
  enumerable: true,
  get: function () {
    return _routing.__SET_LINK_ATTRS_DOM;
  }
});
Object.defineProperty(exports, "SET_STATE", {
  enumerable: true,
  get: function () {
    return _state.SET_STATE;
  }
});
Object.defineProperty(exports, "registerCMD", {
  enumerable: true,
  get: function () {
    return _register.registerCMD;
  }
});

var _FLIP = require("./FLIP.js");

var _head = require("./head.js");

var _routing = require("./routing.js");

var _state = require("./state.js");

var _register = require("./register.js");
},{"./FLIP.js":"LyFD","./head.js":"NVrH","./routing.js":"gXtp","./state.js":"hwx7","./register.js":"liNl"}],"sx3Q":[function(require,module,exports) {
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
},{"@thi.ng/api":"MOSf"}],"gimq":[function(require,module,exports) {
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
},{}],"s5qO":[function(require,module,exports) {
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
 * Based on "An O(NP) Sequence Comparison Algorithm"" by Wu, Manber,
 * Myers and Miller.
 *
 * @remarks
 * Various optimizations, fixes & refactorings. By default uses
 * {@link @thi.ng/equiv#equiv} for equality checks.
 *
 * - {@link http://www.itu.dk/stud/speciale/bepjea/xwebtex/litt/an-onp-sequence-comparison-algorithm.pdf}
 * - {@link https://github.com/cubicdaiya/onp}
 *
 * @param a - "old" array
 * @param b - "new" array
 * @param mode - result mode
 * @param equiv - equality predicate function
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
},{"@thi.ng/equiv":"U8cl"}],"D8na":[function(require,module,exports) {
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
},{"@thi.ng/equiv":"U8cl"}],"xpOK":[function(require,module,exports) {
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
},{"./api":"gimq","./array":"s5qO","./object":"D8na"}],"p4eH":[function(require,module,exports) {
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
 * See {@link HDOMImplementation} interface for further details.
 *
 * @param opts - hdom config options
 * @param impl - hdom implementation
 * @param parent - parent element (DOM node)
 * @param prev - previous tree
 * @param curr - current tree
 * @param child - child index
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
 * Helper function for {@link diffTree} to compute & apply the difference
 * between a node's `prev` and `curr` attributes.
 *
 * @param impl - hdom implementation
 * @param el - DOM element
 * @param prev - previous attributes
 * @param curr - current attributes
 *
 * @internal
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
 * Recursively attempts to call the {@link ILifecycle.release} lifecycle
 * method on every element in given tree (branch), using depth-first
 * descent. Each element is checked for the presence of the `__release`
 * control attribute. If (and only if) it is set to `false`, further
 * descent into that element's branch is skipped.
 *
 * @param tree - hdom sub-tree
 *
 * @internal
 */


exports.diffAttributes = diffAttributes;

const releaseTree = tree => {
  if (isArray(tree)) {
    let x;

    if ((x = tree[1]) && x.__release === false) {
      return;
    }

    if (tree.__release) {
      // LOGGER.fine("call __release", tag);
      tree.__release.apply(tree.__this, tree.__args);

      delete tree.__release;
    }

    for (x = tree.length; --x >= 2;) {
      releaseTree(tree[x]);
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
 * Customized version {@link @thi.ng/equiv#equiv} which takes `__diff`
 * attributes into account (at any nesting level). If an hdom element's
 * attribute object contains `__diff: false`, the object will ALWAYS be
 * considered unequal, even if all other attributes in the object are
 * equivalent.
 *
 * @param a -
 * @param b -
 *
 * @internal
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
},{"@thi.ng/api":"MOSf","@thi.ng/diff":"xpOK","@thi.ng/equiv":"U8cl"}],"paoD":[function(require,module,exports) {
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
/** @internal */

exports.XHTML_NS = XHTML_NS;
const PROC_TAGS = {
  "?xml": "?>\n",
  "!DOCTYPE": ">\n",
  "!ENTITY": ">\n",
  "!ELEMENT": ">\n",
  "!ATTLIST": ">\n"
};
/** @internal */

exports.PROC_TAGS = PROC_TAGS;
const ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
};
/** @internal */

exports.ENTITIES = ENTITIES;
const RE_TAG = /^([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?$/;
/** @internal */

exports.RE_TAG = RE_TAG;
const RE_ENTITY = new RegExp(`[${Object.keys(ENTITIES).join("")}]`, "g");
/** @internal */

exports.RE_ENTITY = RE_ENTITY;
const COMMENT = "__COMMENT__";
/** @internal */

exports.COMMENT = COMMENT;
const NO_SPANS = {
  button: 1,
  option: 1,
  text: 1,
  textarea: 1
};
exports.NO_SPANS = NO_SPANS;

const tagMap = tags => tags.split(" ").reduce((acc, x) => (acc[x] = true, acc), {});
/** @internal */
// tslint:disable-next-line


const SVG_TAGS = tagMap("animate animateColor animateMotion animateTransform circle clipPath color-profile defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font foreignObject g image line linearGradient marker mask metadata mpath path pattern polygon polyline radialGradient rect set stop style svg switch symbol text textPath title tref tspan use view");
/** @internal */
// tslint:disable-next-line

exports.SVG_TAGS = SVG_TAGS;
const VOID_TAGS = tagMap("area base br circle col command ellipse embed hr img input keygen line link meta param path polygon polyline rect source stop track use wbr ?xml");
exports.VOID_TAGS = VOID_TAGS;
},{}],"MnEL":[function(require,module,exports) {
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
},{"@thi.ng/checks":"XYpc"}],"yqXH":[function(require,module,exports) {
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
 * @param ctx - user context object
 * @param keys - keys to deref
 *
 * @internal
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
},{"@thi.ng/checks":"XYpc"}],"kHIx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escape = void 0;

var _api = require("./api");

const escape = x => x.replace(_api.RE_ENTITY, y => _api.ENTITIES[y]);

exports.escape = escape;
},{"./api":"paoD"}],"WaCX":[function(require,module,exports) {
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
},{"@thi.ng/checks":"XYpc","@thi.ng/errors":"j3Rf","./api":"paoD","./css":"MnEL"}],"m9wu":[function(require,module,exports) {
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
 *
 * @remarks
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
 * Optionally call {@link derefContext} prior to {@link serialize} to
 * auto-deref context keys with values implementing the
 * {@link @thi.ng/api#IDeref} interface.
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
 * assume the output is meant to be compatible with
 * {@link @thi.ng/hdom# | @thi.ng/hdom}).
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
 * @param tree - hiccup elements / component tree
 * @param ctx - arbitrary user context object
 * @param escape - auto-escape entities
 * @param span - use spans for text content
 * @param keys - attach key attribs
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
},{"@thi.ng/checks":"XYpc","@thi.ng/errors":"j3Rf","./api":"paoD","./escape":"kHIx","./normalize":"WaCX"}],"t26P":[function(require,module,exports) {
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
},{"./api":"paoD","./css":"MnEL","./deref":"yqXH","./escape":"kHIx","./normalize":"WaCX","./serialize":"m9wu"}],"sRTa":[function(require,module,exports) {
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
 * See {@link HDOMImplementation} interface for further details.
 *
 * @param opts - hdom config options
 * @param parent - DOM element
 * @param tree - component tree
 * @param insert - child index
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
 * See {@link HDOMImplementation} interface for further details.
 *
 * @param opts - hdom config options
 * @param parent - DOM element
 * @param tree - component tree
 * @param index - child index
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
 * @param parent - DOM element
 * @param tag - component tree
 * @param attribs - attributes
 * @param insert - child index
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
 * {@link setAttribs}) and the function's return value is used as the actual
 * attrib value.
 *
 * Special rules apply for certain attributes:
 *
 * - "style": delegated to {@link setStyle}
 * - "value": delegated to {@link updateValueAttrib}
 * - attrib IDs starting with "on" are treated as event listeners
 *
 * If the given (or computed) attrib value is `false` or `undefined` the
 * attrib is removed from the element.
 *
 * @param el - DOM element
 * @param id - attribute name
 * @param val - attribute value
 * @param attribs - object of all attribs
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
 * @param el - DOM element
 * @param value - value
 */


exports.setAttrib = setAttrib;

const updateValueAttrib = (el, value) => {
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
      if ((ev = el.value) !== undefined && typeof value === "string") {
        const off = value.length - (ev.length - (el.selectionStart || 0));
        el.value = value;
        el.selectionStart = el.selectionEnd = off;
        break;
      }

    default:
      el.value = value;
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
 * @param el - DOM element
 * @param id - event name (w/o `on` prefix)
 * @param listener -
 */


exports.setStyle = setStyle;

const setListener = (el, id, listener) => isArray(listener) ? el.addEventListener(id, ...listener) : el.addEventListener(id, listener);
/**
 * Removes event listener (possibly with options).
 *
 * @param el - DOM element
 * @param id - event name (w/o `on` prefix)
 * @param listener -
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
},{"@thi.ng/checks":"XYpc","@thi.ng/hiccup":"t26P"}],"p6KX":[function(require,module,exports) {
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
 * @param spec - single hdom component
 * @param keys -
 *
 * @internal
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
 * See {@link HDOMImplementation} interface for further details.
 *
 * @param opts - hdom config options
 * @param tree - component tree
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
},{"@thi.ng/checks":"XYpc","@thi.ng/errors":"j3Rf","@thi.ng/hiccup":"t26P"}],"NgEa":[function(require,module,exports) {
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
},{"./diff":"p4eH","./dom":"sRTa","./normalize":"p6KX"}],"Fj0P":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveRoot = void 0;

var _checks = require("@thi.ng/checks");

const resolveRoot = (root, impl) => (0, _checks.isString)(root) ? impl.getElementById(root) : root;

exports.resolveRoot = resolveRoot;
},{"@thi.ng/checks":"XYpc"}],"NSDr":[function(require,module,exports) {
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
 * options as {@link start}, but performs no diffing and only creates or
 * hydrates target once. The given tree is first normalized and if
 * result is `null` or `undefined` no further action will be taken.
 *
 * @param tree - component tree
 * @param opts - hdom config options
 * @param impl - hdom implementation
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
},{"@thi.ng/hiccup":"t26P","./default":"NgEa","./utils":"Fj0P"}],"mPAr":[function(require,module,exports) {
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
 * in component objects. If the `autoDerefKeys` option is given,
 * attempts to auto-expand/deref the given keys in the user supplied
 * context object (`ctx` option) prior to *each* tree normalization. All
 * of these values should implement the {@link @thi.ng/api#IDeref}
 * interface (e.g. atoms, cursors, views, rstreams etc.). This feature
 * can be used to define dynamic contexts linked to the main app state,
 * e.g. using derived views provided by {@link @thi.ng/atom# | @thi.ng/atom}.
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
 * @param tree - hiccup DOM tree
 * @param opts - options
 * @param impl - hdom target implementation
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
},{"@thi.ng/hiccup":"t26P","./default":"NgEa","./utils":"Fj0P"}],"RaP4":[function(require,module,exports) {
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
},{"./api":"sx3Q","./default":"NgEa","./diff":"p4eH","./dom":"sRTa","./normalize":"p6KX","./render-once":"NSDr","./start":"mPAr","./utils":"Fj0P"}],"fEFP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDOM = void 0;

var _hdom = require("@thi.ng/hdom");

var _hiccup = require("@thi.ng/hiccup");

var _transducers = require("@thi.ng/transducers");

/**
 * Side-effecting & stateful transducer which receives {@link
 * @thi.ng/hdom} component trees, diffs each against previous value and
 * applies required changes to browser DOM starting at given root
 * element.
 *
 * By default, incoming values are first normalized using hdom's
 * {@link @thi.ng/hdom#normalizeTree} function and a copy of the given
 * (optional) `ctx` object is provided to all embedded component
 * functions in the tree. If the `autoDerefKeys` option is given,
 * attempts to auto-expand/deref the given keys in the user supplied
 * context object (`ctx` option) prior to *each* tree normalization. All
 * of these values should implement the {@link @thi.ng/api#IDeref}
 * interface (e.g. atoms, cursors, views, rstreams etc.). This feature
 * can be used to define dynamic contexts linked to the main app state,
 * e.g. using derived views provided by {@link @thi.ng/atom# | @thi.ng/atom}.
 *
 * If the `hydrate` option is given, the first received tree is only
 * used to inject event listeners and initialize components with
 * lifecycle {@link @thi.ng/hdom#ILifecycle.init} methods and expects an
 * otherwise identical, pre-existing DOM. All succeeding trees are
 * diffed then as usual.
 *
 * This transducer is primarily intended for {@link @thi.ng/rstream# | @thi.ng/rstream}
 * dataflow graph based applications, where it can be used as final leaf
 * subscription to reactively reflect UI changes back to the user,
 * without using the usual RAF update loop used by hdom by default. In
 * this setup, DOM updates will only be performed when the stream this
 * transducer is attached to emits new values (i.e. hdom component
 * trees).
 *
 * Please see here for further details:
 * {@link @thi.ng/hdom#start}
 *
 * @param opts - hdom options
 */
const updateDOM = (opts = {}, impl = _hdom.DEFAULT_IMPL) => {
  const _opts = Object.assign({
    root: "app"
  }, opts);

  const root = (0, _hdom.resolveRoot)(_opts.root, impl);
  return (0, _transducers.scan)([() => [], acc => acc, (prev, curr) => {
    _opts.ctx = (0, _hiccup.derefContext)(opts.ctx, _opts.autoDerefKeys);
    curr = impl.normalizeTree(_opts, curr);

    if (curr != null) {
      if (_opts.hydrate) {
        impl.hydrateTree(_opts, root, curr);
        _opts.hydrate = false;
      } else {
        impl.diffTree(_opts, root, prev, curr, 0);
      }

      return curr;
    }

    return prev;
  }]);
};

exports.updateDOM = updateDOM;
},{"@thi.ng/hdom":"RaP4","@thi.ng/hiccup":"t26P","@thi.ng/transducers":"GbKR"}],"dTfx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__URL_DOM__ROUTE = exports.__URL__ROUTE = void 0;

var _checks = require("@thi.ng/checks");

var _commands = require("../commands");

var _constants = require("../constants.js");

var _utils = require("../utils");

/**
 * @module Routing
 * @format
 */

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
 * reserved Command keys:
 * - `URL_page`
 * - `URL_data`
 * - `URL_path`
 * - `URL`
 * - `DOM`
 */
const __URL__ROUTE = CFG => {
  let __router, __pre, __post, __prefix;

  if ((0, _checks.isObject)(CFG)) {
    const _router = CFG[_constants.router_];
    const _pre = CFG[_constants.prep_];
    const _post = CFG[_constants.post_];

    const _prefix = CFG[_constants.prefix_] || null;

    const escRGX = /[-/\\^$*+?.()|[\]{}]/g;

    const escaped = string => string.replace(escRGX, "\\$&");

    const RGX = _prefix ? new RegExp(escaped(_prefix), "g") : null; // console.log({ router, pre, post })

    __router = _router;
    __pre = (0, _checks.isObject)(_pre) ? [_pre] : _pre || [];
    __post = (0, _checks.isObject)(_post) ? [_post] : _post || [];
    __prefix = RGX;
  } else {
    __router = CFG;
    __pre = [];
    __post = [];
    __prefix = null;
  }

  return acc => [...__pre, // 📌 enable progress observation

  /**
   * ## `_SET_ROUTER_LOADING_STATE`cod
   *
   * Routing Command: Universal
   *
   * ### Payload: static
   * default payload `args` signature:
   * ```
   * args: true,
   * ```
   * Simple true or false payload to alert handler
   *
   * ### Handler: side-effecting
   * Sets `route_loading` path in global Atom to true || false
   *
   */
  {
    [_constants.args_]: __prefix ? __router(acc[_constants.URL_].replace(__prefix, "")) : __router(acc[_constants.URL_]),
    [_constants.reso_]: (_acc, _res) => ({
      [_constants.URL_page_]: _res[_constants.URL_page_],
      [_constants.URL_data_]: _res[_constants.URL_data_]
    }),
    [_constants.erro_]: (_acc, _err) => console.warn("Error in __URL__ROUTE:", _err, "constructed:", _acc)
  }, {
    [_constants.args_]: __prefix ? (0, _utils.fURL)(acc[_constants.URL_], __prefix) : (0, _utils.fURL)(acc[_constants.URL_])
  },
  /**
   * ## `_SET_ROUTER_PATH`
   *
   * Routing Command: Universal
   *
   * ### Payload: function
   * default payload `args` signature:
   * ```
   * args: ({ URL_path }) => ({ URL_path }),
   * ```
   * Consumes the `URL_path` property from a `parse_URL`
   * object, handed off from a prior Command
   *
   * ### Handler: side-effecting
   * Sets the current/loading router's `route_path` in the
   * global Atom
   *
   */
  { ..._commands.SET_STATE,
    [_constants.args_]: _acc => ({
      [_constants.STATE_]: _acc[_constants.URL_path_],
      [_constants.PATH_]: [_constants.ROUTE_PATH_]
    })
  }, ...__post];
};
/**
 *
 * `_URL__ROUTE_DOM`
 *
 * DOM Router that contains a cross-platform routing Subtask
 * `_URL__ROUTE`
 *
 *
 * Subtask HOF for router registration. Takes a
 * `@thi.ng/associative` `EquivMap` route matching function,
 * registers that router as a member of a Task for following
 * Commands to leverage the returned data (`{ data, page }`)
 *
 * Pseudo
 * ```
 * ( router ) => ({ URL, DOM event }) => [
 * - if href, push to `history.pushState`
 * - SUBTASK: _URL__ROUTE (universal router)
 * - remove `active` attribute from visited links except current
 * - notify rendertron (TBD) of new page
 * ]
 * ```
 *
 * reserved Command keys:
 * - `URL`
 * - `DOM`
 * - `URL_page`
 * - `URL_path`
 * - `URL_data`
 */


exports.__URL__ROUTE = __URL__ROUTE;

const __URL_DOM__ROUTE = CFG => {
  // autoscroll view into position
  // scrolly.start()
  // instantiate router
  const match = __URL__ROUTE(CFG);

  return acc => [{ ..._commands.SET_STATE,
    [_constants.args_]: {
      [_constants.PATH_]: [_constants.ROUTE_LOADING_],
      [_constants.STATE_]: true
    }
  }, { ..._commands.__HREF_PUSHSTATE_DOM,
    [_constants.args_]: {
      [_constants.URL_]: acc[_constants.URL_],
      [_constants.DOM_]: acc[_constants.DOM_]
    }
  }, // example Subtask injection
  _acc => match({
    [_constants.URL_]: _acc[_constants.URL_]
  }), // { args: msTaskDelay(2000) },

  /**
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
  { ..._commands.SET_STATE,
    [_constants.args_]: _acc => ({
      [_constants.PATH_]: [_constants.PAGE_TEMPLATE_],
      [_constants.STATE_]: _acc[_constants.URL_page_]
    })
  }, { ..._commands.SET_STATE,
    [_constants.args_]: _acc => ({
      [_constants.PATH_]: _acc[_constants.URL_path_],
      [_constants.STATE_]: _acc[_constants.URL_data_][_constants.BODY_] || _acc[_constants.URL_data_]
    })
  }, // wait on pending promise(s) w/a non-nullary fn (+)=>
  // { ...__SET_ROUTER_LOADING_STATE, args: _ => false },
  // example ad-hoc stream injection
  // { sub$: log$, args: () => ({ DOM }) },
  _commands.__SET_LINK_ATTRS_DOM, { ..._commands.SET_STATE,
    [_constants.args_]: _ => ({
      [_constants.PATH_]: [_constants.ROUTE_LOADING_],
      [_constants.STATE_]: false
    })
  }, _commands.__NOTIFY_PRERENDER_DOM];
};

exports.__URL_DOM__ROUTE = __URL_DOM__ROUTE;
},{"@thi.ng/checks":"XYpc","../commands":"j2Dl","../constants.js":"DFXy","../utils":"BNjd"}],"bbvI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boot = exports.registerRouter = exports.registerRouterDOM = void 0;

var _rstream = require("@thi.ng/rstream");

var _arrays = require("@thi.ng/arrays");

var _transducers = require("@thi.ng/transducers");

var _transducersHdom = require("@thi.ng/transducers-hdom");

var _paths = require("@thi.ng/paths");

var _constants = require("../constants.js");

var _store = require("../store");

var _commands = require("../commands");

var _routing = require("../tasks/routing.js");

var _utils = require("../utils");

var _stream$ = require("./stream$.js");

/**
 * @module Registration
 * @format
 */

/**
 *
 * expects payload of
 * ```
 * { target: { location: { href } }, currentTarget }
 * ```
 */
const registerRouterDOM = router => {
  console.log("DOM Router Registered");
  const taskFrom = (0, _routing.__URL_DOM__ROUTE)(router);
  return (0, _commands.registerCMD)({
    [_constants.source$_]: _stream$.DOMnavigated$,
    [_constants.sub$_]: "_URL_NAVIGATED$_DOM",
    [_constants.args_]: x => x,
    [_constants.handler_]: args => _stream$.run$.next(taskFrom({
      [_constants.URL_]: args[_constants.URL_],
      [_constants.DOM_]: args[_constants.DOM_]
    }))
  });
};

exports.registerRouterDOM = registerRouterDOM;

const registerRouter = router => {
  console.log("Router Registered");
  const taskFrom = (0, _routing.__URL__ROUTE)(router);
  return (0, _commands.registerCMD)({
    [_constants.sub$_]: "_URL_NAVIGATED$",
    // 📌 TODO: add source for API access/server source$
    [_constants.source$_]: _stream$.DOMnavigated$,
    [_constants.args_]: x => x,
    [_constants.handler_]: args => _stream$.run$.next(taskFrom({
      [_constants.URL_]: args[_constants.URL_],
      [_constants.DOM_]: args[_constants.DOM_]
    }))
  });
};

exports.registerRouter = registerRouter;

const pre = (ctx, body) => (console.log(`no \`app\` component provided to \`${boot.name}({${_constants.app_}})\`. Rendering state by route path`), ["pre", JSON.stringify(body[1], null, 2)]);
/**
 *
 *  Part I: Needs to be a functional component to accept the
 *  `ctx` object to pass it to children
 *
 *  Part II: Takes the root RAF stream and updates the shell
 *  on every global state mutation
 *
 *  Part III: Connects the app shell to the state stream,
 *  which is triggered by any updates to the global
 *  `$store$`
 */

/* ({
  root = document.body,
  app = pre,
  draft,
  router,
  trace,
  ...others
}) */


const boot = async CFG => {
  // console.log({ URL_page })
  const _root = CFG[_constants.root_] || document.body;

  const _app = CFG[_constants.app_] || pre;

  const _draft = CFG[_constants.draft_];
  const _router = CFG[_constants.router_];
  const _trace = CFG[_constants.trace_];
  const knowns = [_constants.root_, _constants.app_, _constants.draft_, _constants.router_, _constants.trace_];
  const [, others] = (0, _utils.diff_keys)(knowns, CFG);
  const escRGX = /[-/\\^$*+?.()|[\]{}]/g;

  const escaped = string => string.replace(escRGX, "\\$&");

  const _prefix = _router[_constants.prefix_] || null;

  const RGX = _prefix ? new RegExp(escaped(_prefix || ""), "g") : null;
  if (_router) registerRouterDOM(_router);
  const state$ = (0, _rstream.fromAtom)(_store.$store$);

  const shell = state$ => (_trace ? console.log(_trace, state$) : null, state$[_constants.ROUTE_LOADING_] ? null : [_app, [state$[_constants.PAGE_TEMPLATE_], (0, _paths.getIn)(state$, state$[_constants.ROUTE_PATH_])]]);

  if (_draft) _store.$store$.swap(x => ({ ..._draft,
    ...x
  }));

  _store.$store$.resetIn(_constants.ROOT_, _root);

  state$.subscribe((0, _rstream.sidechainPartition)((0, _rstream.fromRAF)())).transform((0, _transducers.map)(_arrays.peek), (0, _transducers.map)(shell), (0, _transducersHdom.updateDOM)({
    root: _root,
    span: false,
    ctx: {
      [_constants.run_]: x => _stream$.run$.next(x),
      [_constants.state_]: _store.$store$,
      // remove any staging path components (e.g., gh-pages)
      [_utils.fURL.name]: () => // console.log({ fURL }),
      (0, _utils.fURL)(window.location.href, RGX),
      // <- 🔍
      ...others
    }
  }));
};

exports.boot = boot;
},{"@thi.ng/rstream":"RCxb","@thi.ng/arrays":"iKN7","@thi.ng/transducers":"GbKR","@thi.ng/transducers-hdom":"fEFP","@thi.ng/paths":"jkaf","../constants.js":"DFXy","../store":"si7o","../commands":"j2Dl","../tasks/routing.js":"dTfx","../utils":"BNjd","./stream$.js":"hI2k"}],"rgLt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiplex = void 0;

var _checks = require("@thi.ng/checks");

var _constants = require("../constants.js");

var _utils = require("../utils");

var _stream$ = require("./stream$.js");

/**
 * @module multiplex
 * @format
 */
const err_str = "Spooling Interupted"; // <- add doc link to error strings

const nosub$_err = (c, i) => console.warn(`
  🔥 No sub$ included for a Command with a primitive for 'args'. 
  🔥 Ergo, nothing was done with this Command: 
  
  ${JSON.stringify(c)}
  
  ${(0, _utils.key_index_err)(c, i)}
  
  Hope that helps!
  `);
/**
 *
 * ## `multiplex`
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
 * - nullary fns (`(0)=>` ) send the args_ as a Command to
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


const multiplex = task_array => task_array.reduce(async (a, c, i) => {
  const acc = await a; // console.log("ACCUMULATOR =>", acc)

  if ((0, _checks.isFunction)(c)) {
    try {
      const recur = c(acc); // this ensures the accumulator is preserved between
      // stacks

      recur.unshift({
        [_constants.args_]: acc
      });
      return multiplex(recur);
    } catch (e) {
      console.warn(err_str, e);
      return;
    }
  }

  const sub$ = c[_constants.sub$_];
  const args = c[_constants.args_];
  const erro = c[_constants.erro_];
  const reso = c[_constants.reso_]; // const _source$ = c[source$]
  // const _handler = c[handler]

  const knowns = [_constants.sub$_, _constants.args_, _constants.reso_, _constants.erro_, _constants.source$_, _constants.handler_];
  const [unknowns] = (0, _utils.diff_keys)(knowns, c);
  if (unknowns.length > 0) throw new Error((0, _utils.x_key_ERR)(err_str, c, unknowns, sub$, i));
  const arg_type = (0, _utils.stringify_type)(args);
  let result = args;
  /* RESOLVING ARGS */

  if (arg_type !== "PROMISE" && reso) {
    // if some signature needs to deal with both promises
    // and non-promises, non-promises are wrapped in a
    // Promise to "lift" them into the proper context for
    // handling
    result = Promise.resolve(args);
  }

  if (args !== Object(args) && !sub$) {
    nosub$_err(c, i);
    return acc;
  }

  if (arg_type === "PROMISE") {
    // result = await discardable(args).catch(e => e)
    result = await args.catch(e => e);
  }

  if (arg_type === "THUNK") {
    // if thunk, dispatch to ad-hoc stream, return acc
    // as-is ⚠ this command will not be waited on
    result = args();
    console.log(`dispatching to ad-hoc stream: ${sub$.id}`);
    sub$.next(result); // 💃

    return acc;
  }

  if (arg_type === "FUNCTION") {
    // if function, call it with acc and resolve any
    // promises
    let temp = args(acc); // result = isPromise(temp) ? await discardable(temp).catch(e => e) : temp

    result = (0, _checks.isPromise)(temp) ? await temp.catch(e => e) : temp;
  }

  if (arg_type === "OBJECT") {
    // if object, send the Command as-is and spread into
    // acc
    if (!sub$) return { ...acc,
      ...args
    };

    _stream$.command$.next(c);

    return { ...acc,
      ...args
    };
  }
  /* RESULT HANDLERS */


  if (reso) {
    // promise rejection handler
    if (erro & result instanceof Error) {
      let error = (0, _constants.erro_)(acc, result);
      if (error.sub$) return _stream$.command$.next(error);
      console.warn(err_str, "[ Promise rejected ]:", result);
      result = error;
    } // resovled promise handler


    if (!(result instanceof Error)) {
      let resolved = reso(acc, result);
      if (resolved.sub$) _stream$.command$.next(resolved); // resolved promise with no sub$ key -> spread
      // resolved value into acc
      else if (!sub$) return { ...acc,
          ...resolved
        };
      result = resolved;
    }

    console.warn(`no 'erro' (Error handler) set for ${c}`);
  } // no sub$ key & not a promise -> just spread into acc


  if (!reso && !sub$) return { ...acc,
    ...result
  }; // error, but no error handler

  if (result instanceof Error) {
    console.warn(err_str, result);
    return acc;
  }

  if (result !== Object(result)) {
    if (!sub$) {
      nosub$_err(c, i);
      return acc;
    } // if the final result is primitive, you can't refer
    // to this value in proceeding Commands -> send the
    // Command as-is, return acc as-is.


    _stream$.command$.next({
      [_constants.sub$_]: sub$,
      [_constants.args_]: result
    });

    return acc;
  } // if the result has made it this far, send it along
  // console.log(`${sub$} made it through`)


  _stream$.command$.next({
    [_constants.sub$_]: sub$,
    [_constants.args_]: result
  });

  return { ...acc,
    ...result
  };
}, Promise.resolve({}));

exports.multiplex = multiplex;
},{"@thi.ng/checks":"XYpc","../constants.js":"DFXy","../utils":"BNjd","./stream$.js":"hI2k"}],"P12t":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "boot", {
  enumerable: true,
  get: function () {
    return _registers.boot;
  }
});
Object.defineProperty(exports, "registerCMD", {
  enumerable: true,
  get: function () {
    return _registers.registerCMD;
  }
});
Object.defineProperty(exports, "registerRouter", {
  enumerable: true,
  get: function () {
    return _registers.registerRouter;
  }
});
Object.defineProperty(exports, "registerRouterDOM", {
  enumerable: true,
  get: function () {
    return _registers.registerRouterDOM;
  }
});
Object.defineProperty(exports, "multiplex", {
  enumerable: true,
  get: function () {
    return _multiplex.multiplex;
  }
});
Object.defineProperty(exports, "DOMnavigated$", {
  enumerable: true,
  get: function () {
    return _stream$.DOMnavigated$;
  }
});
Object.defineProperty(exports, "DOMContentLoaded$", {
  enumerable: true,
  get: function () {
    return _stream$.DOMContentLoaded$;
  }
});
Object.defineProperty(exports, "command$", {
  enumerable: true,
  get: function () {
    return _stream$.command$;
  }
});
Object.defineProperty(exports, "out$", {
  enumerable: true,
  get: function () {
    return _stream$.out$;
  }
});
Object.defineProperty(exports, "popstate$", {
  enumerable: true,
  get: function () {
    return _stream$.popstate$;
  }
});
Object.defineProperty(exports, "run$", {
  enumerable: true,
  get: function () {
    return _stream$.run$;
  }
});

var _registers = require("./registers.js");

var _multiplex = require("./multiplex.js");

var _stream$ = require("./stream$.js");
},{"./registers.js":"bbvI","./multiplex.js":"rgLt","./stream$.js":"hI2k"}],"GVGW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FLIPkid = void 0;

var _commands = require("../commands");

var _constants = require("../constants.js");

/**
 * @module FLIP
 * @format
 */

/**
 * There're only 3 lifecycle hooks. render is called for
 * every update and is just providing the actual hiccup for
 * that component. if that component is used the first time,
 * the order is normalizeTree -> render -> diff -> init.
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
const err_str = prop => `
  No '${prop}' property found on FLIPkid firstChild. 
  Ensure you are providing FLIPkid a component with an 
  attributes object as its second argument with a ${prop}
  property for proper FLIP routing.
`; // const [tag, attrs, ..._args] = kid(ctx, ...args)
// const { href } = attrs


const sim_event = href => ({
  currentTarget: {
    document: null
  },
  target: {
    href
  }
});

const FLIPkid = Object.freeze({
  render: (ctx, ...rest) => // console.log("FLIPkid"),
  ["div", {
    onclick: ev => {
      ev.preventDefault();
      const target = ev.target;
      const href = target.getAttribute("href"); // console.log({ target, href })

      if (!href) return new Error(err_str("href"));

      ctx[_constants.run_]([{ ..._commands.HURL,
        [_constants.args_]: sim_event(href)
      }, { ..._commands.FLIP_FIRST,
        [_constants.args_]: {
          id: href,
          target
        }
      }]);
    }
  }, ...rest],
  init: (el, ctx) => {
    // console.log({
    //   el,
    //   firstChild: el.firstChild,
    //   id: el.firstChild.getAttribute("href")
    // }),
    ctx[_constants.run_]({ ..._commands.FLIP_LAST_INVERSE_PLAY,
      [_constants.args_]: {
        element: el.firstChild,
        id: el.firstChild.getAttribute("href")
      }
    });
  }
});
exports.FLIPkid = FLIPkid;
},{"../commands":"j2Dl","../constants.js":"DFXy"}],"Kr4k":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FLIPkid", {
  enumerable: true,
  get: function () {
    return _FLIPkid.FLIPkid;
  }
});

var _FLIPkid = require("./FLIPkid.js");
},{"./FLIPkid.js":"GVGW"}],"q9Vk":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.task$ = void 0;

var _stream$ = require("../core/stream$.js");

var _multiplex = require("../core/multiplex.js");

const task$ = _stream$.run$.subscribeTopic(false, {
  next: _multiplex.multiplex,
  error: console.warn
}, {
  id: "task$_stream"
});

exports.task$ = task$;
},{"../core/stream$.js":"hI2k","../core/multiplex.js":"rgLt"}],"B1Dx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "__URL_DOM__ROUTE", {
  enumerable: true,
  get: function () {
    return _routing.__URL_DOM__ROUTE;
  }
});
Object.defineProperty(exports, "__URL__ROUTE", {
  enumerable: true,
  get: function () {
    return _routing.__URL__ROUTE;
  }
});
Object.defineProperty(exports, "task$", {
  enumerable: true,
  get: function () {
    return _task$.task$;
  }
});

var _routing = require("./routing.js");

var _task$ = require("./task$.js");
},{"./routing.js":"dTfx","./task$.js":"q9Vk"}],"K6of":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FLIP_FIRST", {
  enumerable: true,
  get: function () {
    return _commands.FLIP_FIRST;
  }
});
Object.defineProperty(exports, "FLIP_LAST_INVERSE_PLAY", {
  enumerable: true,
  get: function () {
    return _commands.FLIP_LAST_INVERSE_PLAY;
  }
});
Object.defineProperty(exports, "INJECT_HEAD", {
  enumerable: true,
  get: function () {
    return _commands.INJECT_HEAD;
  }
});
Object.defineProperty(exports, "HURL", {
  enumerable: true,
  get: function () {
    return _commands.HURL;
  }
});
Object.defineProperty(exports, "HURLer", {
  enumerable: true,
  get: function () {
    return _commands.HURLer;
  }
});
Object.defineProperty(exports, "SET_STATE", {
  enumerable: true,
  get: function () {
    return _commands.SET_STATE;
  }
});
Object.defineProperty(exports, "registerCMD", {
  enumerable: true,
  get: function () {
    return _commands.registerCMD;
  }
});
Object.defineProperty(exports, "boot", {
  enumerable: true,
  get: function () {
    return _core.boot;
  }
});
Object.defineProperty(exports, "registerRouter", {
  enumerable: true,
  get: function () {
    return _core.registerRouter;
  }
});
Object.defineProperty(exports, "registerRouterDOM", {
  enumerable: true,
  get: function () {
    return _core.registerRouterDOM;
  }
});
Object.defineProperty(exports, "DOMnavigated$", {
  enumerable: true,
  get: function () {
    return _core.DOMnavigated$;
  }
});
Object.defineProperty(exports, "run$", {
  enumerable: true,
  get: function () {
    return _core.run$;
  }
});
Object.defineProperty(exports, "command$", {
  enumerable: true,
  get: function () {
    return _core.command$;
  }
});
Object.defineProperty(exports, "out$", {
  enumerable: true,
  get: function () {
    return _core.out$;
  }
});
Object.defineProperty(exports, "$store$", {
  enumerable: true,
  get: function () {
    return _store.$store$;
  }
});
Object.defineProperty(exports, "set$$tate", {
  enumerable: true,
  get: function () {
    return _store.set$$tate;
  }
});
Object.defineProperty(exports, "FLIPkid", {
  enumerable: true,
  get: function () {
    return _components.FLIPkid;
  }
});
Object.defineProperty(exports, "__URL_DOM__ROUTE", {
  enumerable: true,
  get: function () {
    return _tasks.__URL_DOM__ROUTE;
  }
});
Object.defineProperty(exports, "__URL__ROUTE", {
  enumerable: true,
  get: function () {
    return _tasks.__URL__ROUTE;
  }
});
Object.defineProperty(exports, "task$", {
  enumerable: true,
  get: function () {
    return _tasks.task$;
  }
});
Object.defineProperty(exports, "BODY_", {
  enumerable: true,
  get: function () {
    return _constants.BODY_;
  }
});
Object.defineProperty(exports, "DEFAULT_CFG", {
  enumerable: true,
  get: function () {
    return _constants.DEFAULT_CFG;
  }
});
Object.defineProperty(exports, "DOM_", {
  enumerable: true,
  get: function () {
    return _constants.DOM_;
  }
});
Object.defineProperty(exports, "HEAD_", {
  enumerable: true,
  get: function () {
    return _constants.HEAD_;
  }
});
Object.defineProperty(exports, "PAGE_TEMPLATE_", {
  enumerable: true,
  get: function () {
    return _constants.PAGE_TEMPLATE_;
  }
});
Object.defineProperty(exports, "ROOT_", {
  enumerable: true,
  get: function () {
    return _constants.ROOT_;
  }
});
Object.defineProperty(exports, "ROUTE_LOADING_", {
  enumerable: true,
  get: function () {
    return _constants.ROUTE_LOADING_;
  }
});
Object.defineProperty(exports, "ROUTE_PATH_", {
  enumerable: true,
  get: function () {
    return _constants.ROUTE_PATH_;
  }
});
Object.defineProperty(exports, "URL_", {
  enumerable: true,
  get: function () {
    return _constants.URL_;
  }
});
Object.defineProperty(exports, "URL_data_", {
  enumerable: true,
  get: function () {
    return _constants.URL_data_;
  }
});
Object.defineProperty(exports, "URL_domain_", {
  enumerable: true,
  get: function () {
    return _constants.URL_domain_;
  }
});
Object.defineProperty(exports, "URL_hash_", {
  enumerable: true,
  get: function () {
    return _constants.URL_hash_;
  }
});
Object.defineProperty(exports, "URL_page_", {
  enumerable: true,
  get: function () {
    return _constants.URL_page_;
  }
});
Object.defineProperty(exports, "URL_path_", {
  enumerable: true,
  get: function () {
    return _constants.URL_path_;
  }
});
Object.defineProperty(exports, "URL_query_", {
  enumerable: true,
  get: function () {
    return _constants.URL_query_;
  }
});
Object.defineProperty(exports, "URL_subdomain_", {
  enumerable: true,
  get: function () {
    return _constants.URL_subdomain_;
  }
});
Object.defineProperty(exports, "app_", {
  enumerable: true,
  get: function () {
    return _constants.app_;
  }
});
Object.defineProperty(exports, "args_", {
  enumerable: true,
  get: function () {
    return _constants.args_;
  }
});
Object.defineProperty(exports, "draft_", {
  enumerable: true,
  get: function () {
    return _constants.draft_;
  }
});
Object.defineProperty(exports, "erro_", {
  enumerable: true,
  get: function () {
    return _constants.erro_;
  }
});
Object.defineProperty(exports, "handler_", {
  enumerable: true,
  get: function () {
    return _constants.handler_;
  }
});
Object.defineProperty(exports, "post_", {
  enumerable: true,
  get: function () {
    return _constants.post_;
  }
});
Object.defineProperty(exports, "prefix_", {
  enumerable: true,
  get: function () {
    return _constants.prefix_;
  }
});
Object.defineProperty(exports, "prep_", {
  enumerable: true,
  get: function () {
    return _constants.prep_;
  }
});
Object.defineProperty(exports, "reso_", {
  enumerable: true,
  get: function () {
    return _constants.reso_;
  }
});
Object.defineProperty(exports, "root_", {
  enumerable: true,
  get: function () {
    return _constants.root_;
  }
});
Object.defineProperty(exports, "router_", {
  enumerable: true,
  get: function () {
    return _constants.router_;
  }
});
Object.defineProperty(exports, "run_", {
  enumerable: true,
  get: function () {
    return _constants.run_;
  }
});
Object.defineProperty(exports, "source$_", {
  enumerable: true,
  get: function () {
    return _constants.source$_;
  }
});
Object.defineProperty(exports, "state_", {
  enumerable: true,
  get: function () {
    return _constants.state_;
  }
});
Object.defineProperty(exports, "sub$_", {
  enumerable: true,
  get: function () {
    return _constants.sub$_;
  }
});
Object.defineProperty(exports, "trace_", {
  enumerable: true,
  get: function () {
    return _constants.trace_;
  }
});
Object.defineProperty(exports, "trace$", {
  enumerable: true,
  get: function () {
    return _utils.trace$;
  }
});
Object.defineProperty(exports, "fURL", {
  enumerable: true,
  get: function () {
    return _utils.fURL;
  }
});
Object.defineProperty(exports, "unfURL", {
  enumerable: true,
  get: function () {
    return _utils.unfURL;
  }
});

var _commands = require("./commands");

var _core = require("./core");

var _store = require("./store");

var _components = require("./components");

var _tasks = require("./tasks");

var _constants = require("./constants.js");

var _utils = require("./utils");
},{"./commands":"j2Dl","./core":"P12t","./store":"si7o","./components":"Kr4k","./tasks":"B1Dx","./constants.js":"DFXy","./utils":"BNjd"}],"QcZX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.theme = exports.styles = exports.zIndices = exports.space = exports.shadows = exports.sizes = exports.radii = exports.lineHeights = exports.baseLineHeights = exports.letterSpacings = exports.inputs = exports.fontWeights = exports.baseFontWeights = exports.fontSizes = exports.fonts = exports.baseFonts = exports.colors = exports.buttons = exports.baseColors = exports.breakpoints = exports.borderWidths = void 0;
// Based on https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
// and https://tailwindcss.com/components
const borderWidths = {
  px: "1px",
  "0": "0",
  "2": "2px",
  "4": "4px",
  "8": "8px"
};
exports.borderWidths = borderWidths;
const breakpoints = ["640px", "768px", "1024px", "1280px"];
exports.breakpoints = breakpoints;
const baseColors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  blueCool: ["#e7f2f5", "#dae9ee", "#adcfdc", "#82b4c9", "#6499af", "#3a7d95", "#2e6276", "#224a58", "#14333d", "#0f191c"],
  blueCoolVivid: ["#e1f3f8", "#97d4ea", "#59b9de", "#28a0cb", "#0d7ea2", "#07648d", "#074b69", "#002d3f"],
  blueWarm: ["#ecf1f7", "#e1e7f1", "#bbcae4", "#98afd2", "#7292c7", "#4a77b4", "#345d96", "#2f4668", "#252f3e", "#13171f"],
  blueWarmVivid: ["#b7caf0", "#81aefc", "#5994f6", "#2672de", "#0050d8", "#1a4480", "#162e51"],
  blue: ["#eff6fb", "#d9e8f6", "#aacdec", "#73b3e7", "#4f97d1", "#2378c3", "#2c608a", "#274863", "#1f303e", "#11181d"],
  blueVivid: ["#58b4ff", "#2491ff", "#0076d6", "#005ea2", "#0b4778", "#112f4e"],
  cyan: ["#e7f6f8", "#ccecf2", "#9ddfeb", "#6ecbdb", "#449dac", "#168092", "#2a646d", "#2c4a4e", "#203133", "#111819"],
  cyanVivid: ["#a8f2ff", "#52daf2", "#00bde3", "#009ec1"],
  gold: ["#f5f0e6", "#f1e5cd", "#dec69a", "#c7a97b", "#ad8b65", "#8e704f", "#6b5947", "#4d4438", "#322d26", "#191714"],
  goldVivid: ["#fef0c8", "#ffe396", "#ffbe2e", "#e5a000", "#c2850c", "#936f38"],
  grayCool: ["#fbfcfd", "#f7f9fa", "#f5f6f7", "#f1f3f6", "#edeff0", "#dcdee0", "#c6cace", "#a9aeb1", "#8d9297", "#71767a", "#565c65", "#3d4551", "#2d2e2f", "#1c1d1f"],
  grayWarm: ["#fcfcfb", "#f9f9f7", "#f6f6f2", "#f5f5f0", "#f0f0ec", "#e6e6e2", "#cac9c0", "#afaea2", "#929285", "#76766a", "#5d5d52", "#454540", "#2e2e2a", "#171716"],
  gray: ["#fcfcfc", "#f9f9f9", "#f6f6f6", "#f3f3f3", "#f0f0f0", "#e6e6e6", "#c9c9c9", "#adadad", "#919191", "#757575", "#5c5c5c", "#454545", "#2e2e2e", "#1b1b1b", "#000000"],
  greenCool: ["#ecf3ec", "#dbebde", "#b4d0b9", "#86b98e", "#5e9f69", "#4d8055", "#446443", "#37493b", "#28312a", "#1a1f1a"],
  greenCoolVivid: ["#e3f5e1", "#b7f5bd", "#70e17b", "#21c834", "#00a91c", "#008817"],
  greenWarm: ["#f1f4d7", "#e7eab7", "#cbd17a", "#a6b557", "#8a984b", "#6f7a41", "#5a5f38", "#45472f", "#2d2f21", "#171712"],
  greenWarmVivid: ["#f1f6a5", "#e2f106", "#c5d30a", "#a3b72c", "#7e9c1d", "#6a7d00"],
  green: ["#eaf4dd", "#dfeacd", "#b8d293", "#9bb672", "#7d9b4e", "#607f35", "#4c6424", "#3c4a29", "#293021", "#161814"],
  greenVivid: ["#ddf9c7", "#c3ee90", "#98d035", "#7fb135", "#719f2a", "#538200"],
  indigoCool: ["#eef0f9", "#e1e6f9", "#bbc8f5", "#96abee", "#6b8ee8", "#496fd8", "#3f57a6", "#374274", "#292d42", "#151622"],
  indigoCoolVivid: ["#628ef4", "#4150f2"],
  indigoWarm: ["#f1eff7", "#e7e3fa", "#cbc4f2", "#afa5e8", "#9287d8", "#7665d1", "#5e519e", "#453c7b", "#2e2c40", "#18161d"],
  indigoWarmVivid: ["#b69fff", "#967efb", "#745fe9", "#5942d2"],
  indigo: ["#efeff8", "#e5e4fa", "#c5c5f3", "#a5a8eb", "#8889db", "#676cc8", "#4d52af", "#3d4076", "#2b2c40", "#16171f"],
  indigoVivid: ["#c4c6f2", "#a5a8e8", "#656bd7", "#4d52b0"],
  magenta: ["#f9f0f2", "#f6e1e8", "#f0bbcc", "#e895b3", "#e0699f", "#c84281", "#8b4566", "#66364b", "#402731", "#1b1617"],
  magentaVivid: ["#ffddea", "#ffb4cf", "#ff87b2", "#fd4496", "#d72d79", "#ab2165"],
  mintCool: ["#e0f7f6", "#c4eeeb", "#9bd4cf", "#6fbab3", "#4f9e99", "#21827f", "#376462", "#2a4b45", "#203131", "#111818"],
  mintCoolVivid: ["#d5fbf3", "#7efbe1", "#29e1cb", "#1dc2ae", "#00a398"],
  mint: ["#dbf6ed", "#c7efe2", "#92d9bb", "#5abf95", "#34a37e", "#1f8462", "#286846", "#204e34", "#193324", "#0d1a12"],
  mintVivid: ["#c9fbeb", "#5dfdc8", "#0ceda6", "#04c585", "#146947"],
  orangeWarm: ["#faeee5", "#fbe0d0", "#f7bca2", "#f3966d", "#e17141", "#bd5727", "#914734", "#633a32", "#3d2925", "#1c1615"],
  orangeWarmVivid: ["#fbbaa7", "#fc906d", "#ff580a", "#d24302"],
  orange: ["#f6efe9", "#f2e4d4", "#f3bf90", "#f09860", "#dd7533", "#a86437", "#775540", "#524236", "#332d27", "#1b1614"],
  orangeVivid: ["#fef2e4", "#fce2c5", "#ffbc78", "#fa9441", "#e66f0e", "#c05600"],
  redCool: ["#f8eff1", "#f3e1e4", "#ecbec6", "#e09aa6", "#e16b80", "#cd425b", "#9e394b", "#68363f", "#40282c", "#1e1517"],
  redCoolVivid: ["#f8dfe2", "#f8b9c5", "#fd8ba0", "#f45d79", "#e41d3d", "#b21d38", "#822133"],
  redWarm: ["#f6efea", "#f4e3db", "#ecc0a7", "#dca081", "#d27a56", "#c3512c", "#805039", "#524236", "#332d29", "#1f1c18"],
  redWarmVivid: ["#f6bd9c", "#f39268", "#ee601d", "#d63e04"],
  red: ["#f9eeee", "#f8e1de", "#f7bbb1", "#f2938c", "#e9695f", "#d83933", "#a23737", "#6f3331", "#3e2927", "#1b1616"],
  redVivid: ["#fde0db", "#fdb8ae", "#ff8d7b", "#fb5a47", "#e52207", "#b50909", "#8b0a03", "#5c1111"],
  violetWarm: ["#f8f0f9", "#f6dff8", "#e2bee4", "#d29ad8", "#bf77c8", "#b04abd", "#864381", "#5c395a", "#382936", "#1b151b"],
  violetWarmVivid: ["#fbebfd", "#fbdcff", "#f4b2ff", "#ee83ff", "#d85bef", "#be32d0"],
  violet: ["#f4f1f9", "#ebe3f9", "#d0c3e9", "#b8a2e3", "#9d84d2", "#8168b3", "#665190", "#4c3d69", "#312b3f", "#18161d"],
  violetVivid: ["#ede3ff", "#d5bfff", "#c39deb", "#ad79e9", "#9355dc", "#783cb9", "#562b97"],
  yellow: ["#faf3d1", "#f5e6af", "#e6c74c", "#c9ab48", "#a88f48", "#8a7237", "#6b5a39", "#504332", "#332d27", "#1a1614"],
  yellowVivid: ["#fee685", "#face00"]
};
exports.baseColors = baseColors;
const commonButtonStyles = {
  py: 2,
  px: 3,
  cursor: "pointer",
  fontSize: "100%",
  lineHeight: "inherit",
  whiteSpace: "nowrap"
};
const buttons = {
  simple: { ...commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
    "&:hover": {
      backgroundColor: "primaryHover",
      textDecoration: "none"
    }
  },
  pill: { ...commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "full",
    "&:hover": {
      backgroundColor: "primaryHover"
    }
  },
  outline: { ...commonButtonStyles,
    backgroundColor: "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "primary",
    color: "primary",
    fontWeight: "semibold",
    borderRadius: "default",
    "&:hover": {
      backgroundColor: "primary",
      color: "white",
      borderColor: "transparent"
    }
  },
  bordered: { ...commonButtonStyles,
    backgroundColor: "primary",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "primaryHover",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
    "&:hover": {
      backgroundColor: "primaryHover"
    }
  },
  disabled: { ...commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    opacity: 0.5,
    cursor: "not-allowed",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default"
  },
  "3D": { ...commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    borderBottomWidth: "4px",
    borderBottomStyle: "solid",
    borderBottomColor: "primaryHover",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-1px)"
    }
  },
  elevated: { ...commonButtonStyles,
    backgroundColor: "white",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "gray.4",
    color: "text",
    fontWeight: "bold",
    borderRadius: "default",
    boxShadow: "default",
    "&:hover": {
      backgroundColor: "gray.1"
    }
  }
};
exports.buttons = buttons;
const colors = { ...baseColors,
  grayDark: baseColors.gray[8],
  text: baseColors.gray[8],
  background: baseColors.white,
  primary: baseColors.blue[7],
  primaryHover: baseColors.blue[8],
  secondary: baseColors.gray[6],
  muted: baseColors.gray[3],
  success: baseColors.green[3],
  info: baseColors.blue[4],
  warning: baseColors.yellow[3],
  danger: baseColors.red[3],
  light: baseColors.gray[1],
  dark: baseColors.gray[8],
  textMuted: baseColors.gray[6]
};
exports.colors = colors;
const baseFonts = {
  sans: '"Open Sans", system-ui',
  serif: "Merriweather, system-ui",
  mono: '"Fira Code",monospace'
};
exports.baseFonts = baseFonts;
const fonts = { ...baseFonts,
  body: baseFonts.sans,
  heading: baseFonts.serif,
  monospace: baseFonts.mono
};
exports.fonts = fonts;
const fontSizes = ["0.875rem", "1rem", "1.25rem", "1.5rem", "1.875rem", "2.25rem", "3rem", "4rem", "4.5rem"];
exports.fontSizes = fontSizes;
const baseFontWeights = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
};
exports.baseFontWeights = baseFontWeights;
const fontWeights = { ...baseFontWeights,
  body: baseFontWeights.normal,
  heading: baseFontWeights.bold
};
exports.fontWeights = fontWeights;
const commonInputStyles = {
  py: 2,
  px: 3,
  fontSize: "100%",
  borderRadius: "default",
  appearance: "none",
  lineHeight: "tight"
};
const inputs = {
  shadow: { ...commonInputStyles,
    border: "none",
    color: "gray.7",
    boxShadow: "default",
    "&:focus": {
      outline: "none",
      boxShadow: "outline"
    }
  },
  inline: { ...commonInputStyles,
    backgroundColor: "gray.2",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "gray.2",
    color: "gray.7",
    "&:focus": {
      outline: "none",
      borderColor: "primary",
      backgroundColor: "white"
    }
  },
  underline: { ...commonInputStyles,
    backgroundColor: "transparent",
    border: "none",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "primary",
    borderRadius: "0px",
    color: "gray.7",
    "&:focus": {
      outline: "none",
      borderColor: "primary",
      backgroundColor: "white"
    }
  }
};
exports.inputs = inputs;
const letterSpacings = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em"
};
exports.letterSpacings = letterSpacings;
const baseLineHeights = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
};
exports.baseLineHeights = baseLineHeights;
const lineHeights = { ...baseLineHeights,
  body: baseLineHeights.relaxed,
  heading: baseLineHeights.tight
};
exports.lineHeights = lineHeights;
const radii = {
  none: "0",
  sm: "0.125rem",
  default: "0.25rem",
  lg: "0.5rem",
  full: "9999px"
};
exports.radii = radii;
const sizes = {
  px: "1px",
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  "1/12": "8.333333%",
  "2/12": "16.666667%",
  "3/12": "25%",
  "4/12": "33.333333%",
  "5/12": "41.666667%",
  "6/12": "50%",
  "7/12": "58.333333%",
  "8/12": "66.666667%",
  "9/12": "75%",
  "10/12": "83.333333%",
  "11/12": "91.666667%",
  full: "100%",
  screenHeight: "100vh",
  screenWidth: "100vw"
};
exports.sizes = sizes;
const shadows = {
  default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 0px 2px rgba(0, 0, 0, 0.03)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
  none: "none"
};
exports.shadows = shadows;
const space = [0, "0.25rem", "0.5rem", "1rem", "2rem", "4rem", "8rem", "16rem", "32rem"];
exports.space = space;
const zIndices = {
  auto: "auto",
  "0": "0",
  "10": "10",
  "20": "20",
  "30": "30",
  "40": "40",
  "50": "50"
};
exports.zIndices = zIndices;
const heading = {
  fontFamily: "heading",
  fontWeight: "heading",
  lineHeight: "heading",
  mt: 4
};
const styles = {
  root: {
    fontFamily: "body",
    lineHeight: "body",
    fontWeight: "body"
  },
  p: {
    lineHeight: [1.75, 2],
    fontSize: [1, 2],
    mt: [0, 1]
  },
  a: {
    color: "primary",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  strong: {
    fontWeight: "bold"
  },
  ul: {
    listStylePostition: "outside",
    mt: 2,
    mx: 0
  },
  li: {
    listStyleType: "disc",
    lineHeight: 1.75,
    fontSize: [2, 3],
    mt: 3
  },
  h1: { ...heading,
    fontSize: [6, 7],
    mt: 6
  },
  h2: { ...heading,
    fontSize: [5, 6],
    pt: 5
  },
  h3: { ...heading,
    fontSize: [4, 5],
    pt: 4
  },
  h4: { ...heading,
    fontSize: [3, 4],
    pt: 4
  },
  h5: { ...heading,
    fontSize: [2, 3]
  },
  h6: { ...heading,
    fontSize: [1, 2]
  },
  pre: {
    lineHeight: 1.75,
    my: 4,
    mx: -2
  },
  code: {
    boxShadow: "inner",
    background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJ0lEQVQIW2O8e/fufwYGBgZBQUEQxcCIIfDu3Tuwivfv30NUoAsAALHpFMMLqZlPAAAAAElFTkSuQmCC) repeat",
    color: "dark",
    fontSize: [0, 1],
    fontFamily: "mono",
    borderRadius: "default",
    p: 1
  },
  hr: {
    background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJ0lEQVQIW2O8e/fufwYGBgZBQUEQxcCIIfDu3Tuwivfv30NUoAsAALHpFMMLqZlPAAAAAElFTkSuQmCC) repeat",
    height: 1,
    width: "100vw",
    position: "relative",
    marginLeft: "-50vw",
    mt: 6,
    left: "50%"
  },
  blockquote: {
    background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAPUlEQVQYV2NkQAN37979r6yszIgujiIAU4RNMVwhuiQ6H6wQl3XI4oy4FMHcCJPHcDS6J2A2EqUQpJhohQDexSef15DBCwAAAABJRU5ErkJggg==) repeat",
    fontFamily: "mono",
    fontStyle: "italic",
    fontSize: [3, 4],
    lineHeight: 1.5,
    mx: -4,
    my: 4,
    p: 5
  },
  table: {
    borderRadius: "default",
    overflow: "hidden",
    fontSize: [1, 2],
    width: "100%",
    mt: 4
  },
  tr: {
    backgroundColor: "muted",
    "&:first-child": {
      fontWeight: "bold",
      backgroundColor: "dark",
      color: "muted"
    },
    lineHeight: [1.75, 2],
    "&:nth-child(2n)": {
      backgroundColor: "background"
    }
  },
  td: {
    p: 2
  },
  img: {
    display: "block",
    my: [2, 3],
    objectFit: "cover",
    borderRadius: "default"
  }
};
exports.styles = styles;
const theme = {
  borderWidths,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  sizes,
  shadows,
  space,
  radii,
  zIndices,
  styles,
  buttons,
  inputs
};
exports.theme = theme;
var _default = theme;
exports.default = _default;
},{}],"buUl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutInMany = exports.mutIn = exports.mutator = exports.deleteIn = exports.updateIn = exports.updater = exports.setInMany = exports.setIn = exports.getIn = exports.setter = exports.getter = exports.exists = exports.toPath = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

const isa = Array.isArray;
const iss = _checks.isString;

const _copy = s => isa(s) ? s.slice() : Object.assign({}, s);

const compS = (k, f) => (s, v) => (s = _copy(s), s[k] = f ? f(s[k], v) : v, s);
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


const toPath = path => isa(path) ? path : iss(path) ? path.length > 0 ? path.split(".") : [] : path != null ? [path] : [];
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
/**
 * Composes a getter function for given nested lookup path. Optimized
 * fast execution paths are provided for path lengths less than 5.
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
 * ```
 * g = getter("a.b.c");
 * // or
 * g = getter(["a","b","c"]);
 *
 * g({a: {b: {c: 23}}}) // 23
 * g({x: 23}) // undefined
 * g() // undefined
 * ```
 *
 * @param path
 */


exports.exists = exists;

const getter = path => {
  const ks = toPath(path);
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
};
/**
 * Composes a setter function for given nested update path. Optimized
 * fast execution paths are provided for path lengths less up to 4.
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
 * Also see: `setIn()`, `updateIn()`, `deleteIn()`
 *
 * ```
 * s = setter("a.b.c");
 * // or
 * s = setter(["a","b","c"]);
 *
 * s({a: {b: {c: 23}}}, 24)
 * // {a: {b: {c: 24}}}
 *
 * s({x: 23}, 24)
 * // { x: 23, a: { b: { c: 24 } } }
 *
 * s(null, 24)
 * // { a: { b: { c: 24 } } }
 * ```
 *
 * Only keys in the path will be modified, all other keys present in the
 * given object retain their original values to provide efficient
 * structural sharing / re-use.
 *
 * ```
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


exports.getter = getter;

const setter = path => {
  const ks = toPath(path);
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
};
/**
 * Immediate use getter, i.e. same as: `getter(path)(state)`.
 *
 * ```
 * getIn({a: {b: {c: 23}}}, "a.b.c");
 * // 23
 * ```
 *
 * @param state
 * @param path
 */


exports.setter = setter;

const getIn = (state, path) => getter(path)(state);
/**
 * Immediate use setter, i.e. same as: `setter(path)(state, val)`.
 *
 * ```
 * setIn({}, "a.b.c", 23);
 * // {a: {b: {c: 23}}}
 * ```
 *
 * @param state
 * @param path
 */


exports.getIn = getIn;

const setIn = (state, path, val) => setter(path)(state, val);
/**
 * Like `setIn()`, but takes any number of path-value pairs and applies
 * them in sequence by calling `setIn()` for each. Any key paths missing
 * in the data structure will be created. Does *not* mutate original
 * (instead use `mutInMany()` for this purpose).
 *
 * ```
 * setInMany({}, "a.b", 10, "x.y.z", 20)
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state
 * @param pairs
 */


exports.setIn = setIn;

const setInMany = (state, ...pairs) => {
  const n = pairs.length;
  n & 1 && (0, _errors.illegalArgs)(`require even number of args (got ${pairs.length})`);

  for (let i = 0; i < n; i += 2) {
    state = setIn(state, pairs[i], pairs[i + 1]);
  }

  return state;
};
/**
 * Similar to `setter()`, returns a function to update values at given
 * `path` using provided update `fn`. The returned function accepts a
 * single object / array and applies `fn` to current path value (incl.
 * any additional/optional arguments passed) and uses result as new
 * value. Does not modify original state (unless given function does so
 * itself).
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


exports.setInMany = setInMany;

const updater = (path, fn) => {
  const g = getter(path);
  const s = setter(path);
  return (state, ...args) => s(state, fn.apply(null, (args.unshift(g(state)), args)));
};
/**
 * Similar to `setIn()`, but applies given function to current path
 * value (incl. any additional/optional arguments passed to `updateIn`)
 * and uses result as new value. Does not modify original state (unless
 * given function does so itself).
 *
 * ```
 * add = (x, y) => x + y;
 * updateIn({a: {b: {c: 23}}}, "a.b.c", add, 10);
 * // {a: {b: {c: 33}}}
 * ```
 *
 * @param state
 * @param path
 */


exports.updater = updater;

const updateIn = (state, path, fn, ...args) => setter(path)(state, fn.apply(null, (args.unshift(getter(path)(state)), args)));
/**
 * Uses `updateIn()` and returns updated state with key for given path
 * removed. Does not modify original state.
 *
 * Returns `undefined` if `path` is an empty string or array.
 *
 * ```
 * deleteIn({a:{b:{c: 23}}}, "a.b.c");
 * // {a: {b: {}}}
 * ```
 *
 * @param state
 * @param path
 */


exports.updateIn = updateIn;

const deleteIn = (state, path) => {
  const ks = [...toPath(path)];

  if (ks.length > 0) {
    const k = ks.pop();
    return updateIn(state, ks, x => (x = Object.assign({}, x), delete x[k], x));
  }
};
/**
 * Higher-order function, similar to `setter()`. Returns function which
 * when called mutates given object/array at given path location and
 * bails if any intermediate path values are non-indexable (only the
 * very last path element can be missing in the actual object
 * structure). If successful, returns original (mutated) object, else
 * `undefined`. This function provides optimized versions for path
 * lengths <= 4.
 *
 * @param path
 */


exports.deleteIn = deleteIn;

const mutator = path => {
  const ks = toPath(path);
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
};
/**
 * Immediate use mutator, i.e. same as: `mutator(path)(state, val)`.
 *
 * ```
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


exports.mutator = mutator;

const mutIn = (state, path, val) => mutator(path)(state, val);
/**
 * Like `mutIn()`, but takes any number of path-value pairs and applies
 * them in sequence. All key paths must already be present in the given
 * data structure until their penultimate key.
 *
 * ```
 * mutInMany({a: {b: 1}, x: {y: {z: 2}}}, "a.b", 10, "x.y.z", 20)
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state
 * @param pairs
 */


exports.mutIn = mutIn;

const mutInMany = (state, ...pairs) => {
  const n = pairs.length;
  n & 1 && (0, _errors.illegalArgs)(`require even number of args (got ${pairs.length})`);

  for (let i = 0; i < n && state; i += 2) {
    state = mutIn(state, pairs[i], pairs[i + 1]);
  }

  return state;
};

exports.mutInMany = mutInMany;
},{"@thi.ng/checks":"XYpc","@thi.ng/errors":"j3Rf"}],"HS8T":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.css = exports.responsive = exports.get = void 0;

var _scales;

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
} // based on https://github.com/developit/dlv


var get = function get(obj, key, def, p, undef) {
  key = key && key.split ? key.split('.') : [key];

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
};

exports.get = get;
var defaultBreakpoints = [40, 52, 64].map(function (n) {
  return n + 'em';
});
var defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
var aliases = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY'
};
var multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height']
};
var scales = (_scales = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles'
}, _scales["borderTopLeftRadius"] = 'radii', _scales["borderTopRightRadius"] = 'radii', _scales.borderBottomWidth = 'borderWidths', _scales.borderBottomColor = 'colors', _scales.borderBottomStyle = 'borderStyles', _scales["borderBottomLeftRadius"] = 'radii', _scales["borderBottomRightRadius"] = 'radii', _scales.borderLeftWidth = 'borderWidths', _scales.borderLeftColor = 'colors', _scales.borderLeftStyle = 'borderStyles', _scales.borderRightWidth = 'borderWidths', _scales.borderRightColor = 'colors', _scales.borderRightStyle = 'borderStyles', _scales.outlineColor = 'colors', _scales.boxShadow = 'shadows', _scales.textShadow = 'shadows', _scales.zIndex = 'zIndices', _scales.width = 'sizes', _scales.minWidth = 'sizes', _scales.maxWidth = 'sizes', _scales.height = 'sizes', _scales.minHeight = 'sizes', _scales.maxHeight = 'sizes', _scales.flexBasis = 'sizes', _scales.size = 'sizes', _scales.fill = 'colors', _scales.stroke = 'colors', _scales);

var positiveOrNegative = function positiveOrNegative(scale, value) {
  if (typeof value !== 'number' || value >= 0) {
    return get(scale, value, value);
  }

  var absolute = Math.abs(value);
  var n = get(scale, absolute, absolute);
  if (typeof n === 'string') return '-' + n;
  return n * -1;
};

var transforms = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'top', 'bottom', 'left', 'right'].reduce(function (acc, curr) {
  var _extends2;

  return _extends({}, acc, (_extends2 = {}, _extends2[curr] = positiveOrNegative, _extends2));
}, {});

var responsive = function responsive(styles) {
  return function (theme) {
    var next = {};
    var breakpoints = get(theme, 'breakpoints', defaultBreakpoints);
    var mediaQueries = [null].concat(breakpoints.map(function (n) {
      return "@media screen and (min-width: " + n + ")";
    }));

    for (var key in styles) {
      var value = typeof styles[key] === 'function' ? styles[key](theme) : styles[key];
      if (value == null) continue;

      if (!Array.isArray(value)) {
        next[key] = value;
        continue;
      }

      for (var i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
        var media = mediaQueries[i];
        if (value[i] == null) continue;

        if (!media) {
          next[key] = value[i];
          continue;
        }

        next[media] = next[media] || {};
        next[media][key] = value[i];
      }
    }

    return next;
  };
};

exports.responsive = responsive;

var css = function css(args) {
  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = _extends({}, defaultTheme, {}, props.theme || props);

    var result = {};
    var obj = typeof args === 'function' ? args(theme) : args;
    var styles = responsive(obj)(theme);

    for (var key in styles) {
      var x = styles[key];
      var val = typeof x === 'function' ? x(theme) : x;

      if (key === 'variant') {
        var variant = css(get(theme, val))(theme);
        result = _extends({}, result, {}, variant);
        continue;
      }

      if (val && typeof val === 'object') {
        result[key] = css(val)(theme);
        continue;
      }

      var prop = get(aliases, key, key);
      var scaleName = get(scales, prop);
      var scale = get(theme, scaleName, get(theme, prop, {}));
      var transform = get(transforms, prop, get);
      var value = transform(scale, val, val);

      if (multiples[prop]) {
        var dirs = multiples[prop];

        for (var i = 0; i < dirs.length; i++) {
          result[dirs[i]] = value;
        }
      } else {
        result[prop] = value;
      }
    }

    return result;
  };
};

exports.css = css;
var _default = css;
exports.default = _default;
},{}],"FV5p":[function(require,module,exports) {
'use strict';

module.exports = function (str, sep) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  sep = typeof sep === 'undefined' ? '_' : sep;
  return str.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2').toLowerCase();
};
},{}],"tCQj":[function(require,module,exports) {
'use strict';

module.exports = function (obj, cb) {
  var ret = {};
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var res = cb(key, obj[key], obj);
    ret[res[0]] = res[1];
  }

  return ret;
};
},{}],"bGVb":[function(require,module,exports) {
var decamelize = require("decamelize");
var mapObj = require("map-obj");

module.exports = function decamelizeKeysDeep(obj, options) {
  // Any falsy, which includes `null` whose typeof is `object`.
  if (!obj) {
    return obj;
  }
  // Date, whose typeof is `object` too.
  if (obj instanceof Date) {
    return obj;
  }
  // Array, whose typeof is `object` too.
  if (Array.isArray(obj)) {
    return obj.map(function(element) {
      return decamelizeKeysDeep(element, options);
    });
  }
  // So, if this is still an `object`, we might be interested in it.
  if (typeof obj === "object") {
    return mapObj(obj, function(key, value) {
      var newKey = decamelize(key, options);
      if (key !== newKey && newKey in obj) {
        throw new Error("Decamelized key `" + newKey + "` would overwrite existing key of the given JSON object");
      }
      return [newKey, decamelizeKeysDeep(value, options)];
    });
  }
  // Something else like a String or Number.
  return obj;
}

},{"decamelize":"FV5p","map-obj":"tCQj"}],"AxCm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRETTY = exports.COMPACT = exports.DEFAULT_VENDORS = void 0;
const DEFAULT_VENDORS = ["-moz-", "-ms-", "-o-", "-webkit-"];
/**
 * Default format config used by {@link css} function.
 * Forms "minimized" CSS without obsolete white space
 * and omits comments unless they were forced.
 */

exports.DEFAULT_VENDORS = DEFAULT_VENDORS;
const COMPACT = {
  rules: "",
  ruleSep: ",",
  valSep: "",
  decls: "",
  declStart: "{",
  declEnd: "}",
  indent: "",
  comments: false
};
/**
 * Pretty printing format config with line breaks
 * and indentation.
 */

exports.COMPACT = COMPACT;
const PRETTY = {
  rules: "\n",
  ruleSep: ", ",
  valSep: " ",
  decls: "\n",
  declStart: " {\n",
  declEnd: "}\n",
  indent: "    ",
  comments: true
};
exports.PRETTY = PRETTY;
},{}],"XXZp":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"Reur":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indent = exports.formatDecls = exports.expand = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _transducers = require("@thi.ng/transducers");

const EMPTY = new Set();
const NO_SPACES = ":[";
const xfSel = (0, _transducers.comp)((0, _transducers.flatten)(), (0, _transducers.map)(x => NO_SPACES.indexOf(x.charAt(0)) >= 0 ? x : " " + x));

const withScope = (xf, scope) => (0, _transducers.comp)(xf, (0, _transducers.map)(x => (0, _checks.isString)(x) && x.indexOf(" .") == 0 ? x + scope : x));
/** @internal */


const expand = (acc, parent, rules, opts) => {
  const n = rules.length;
  const sel = [];
  let curr, isFn;

  const process = (i, r) => {
    let rfn = null;

    if ((0, _checks.isArray)(r)) {
      expand(acc, makeSelector(parent, sel), r, opts);
    } else if ((0, _checks.isIterable)(r) && !(0, _checks.isString)(r)) {
      expand(acc, makeSelector(parent, sel), [...r], opts);
    } else if ((isFn = (0, _checks.isFunction)(r)) || (rfn = opts.fns[r])) {
      if (!parent.length) {
        if (rfn) {
          rfn.apply(null, rules.slice(i + 1))(acc, opts);
          return true;
        }

        r(acc, opts);
      } else if (isFn) {
        process(i, r());
      } else {
        (0, _errors.illegalArgs)(`quoted fn ('${r}') only allowed at head position`);
      }
    } else if ((0, _checks.isPlainObject)(r)) {
      curr = Object.assign(curr || {}, r);
    } else if (r != null) {
      sel.push(r);
    }
  };

  for (let i = 0; i < n; i++) {
    if (process(i, rules[i])) {
      return acc;
    }
  }

  curr && acc.push(formatRule(parent, sel, curr, opts));
  return acc;
};

exports.expand = expand;

const makeSelector = (parent, curr) => parent.length ? [...(0, _transducers.permutations)(parent, curr)] : curr;

const formatRule = (parent, sel, curr, opts) => {
  const f = opts.format;
  const space = indent(opts);
  const xf = opts.scope ? withScope(xfSel, opts.scope) : xfSel;
  return [space, (0, _transducers.transduce)((0, _transducers.map)(sel => (0, _transducers.transduce)(xf, (0, _transducers.str)(), (0, _checks.isArray)(sel) ? sel : [sel]).trim()), (0, _transducers.str)(f.ruleSep), makeSelector(parent, sel)), f.declStart, formatDecls(curr, opts), space, f.declEnd].join("");
};
/** @internal */


const formatDecls = (rules, opts) => {
  const f = opts.format;
  const prefixes = opts.autoprefix || EMPTY;
  const space = indent(opts, opts.depth + 1);
  const acc = [];

  for (let r in rules) {
    if (rules.hasOwnProperty(r)) {
      let val = rules[r];

      if ((0, _checks.isFunction)(val)) {
        val = val(rules);
      }

      if ((0, _checks.isArray)(val)) {
        val = val.map(v => (0, _checks.isArray)(v) ? v.join(" ") : v).join(f.ruleSep);
      }

      if (prefixes.has(r)) {
        for (let v of opts.vendors) {
          acc.push(`${space}${v}${r}:${f.valSep}${val};`);
        }
      }

      acc.push(`${space}${r}:${f.valSep}${val};`);
    }
  }

  return acc.join(f.decls) + f.decls;
};
/** @internal */


exports.formatDecls = formatDecls;

const indent = (opts, d = opts.depth) => d > 1 ? [...(0, _transducers.repeat)(opts.format.indent, d)].join("") : d > 0 ? opts.format.indent : "";

exports.indent = indent;
},{"@thi.ng/checks":"XYpc","@thi.ng/errors":"j3Rf","@thi.ng/transducers":"GbKR","process":"XXZp"}],"MnM7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.turn = exports.rad = exports.deg = exports.sec = exports.ms = exports.vw = exports.vh = exports.px = exports.percent = exports.rem = exports.ex = exports.em = void 0;

const em = x => `${x}em`;

exports.em = em;

const ex = x => `${x}ex`;

exports.ex = ex;

const rem = x => `${x}rem`;

exports.rem = rem;

const percent = x => `${x}%`;

exports.percent = percent;

const px = x => `${x >>> 0}px`;

exports.px = px;

const vh = x => `${x}vh`;

exports.vh = vh;

const vw = x => `${x}vw`;

exports.vw = vw;

const ms = x => `${x >>> 0}ms`;

exports.ms = ms;

const sec = x => `${x}s`;

exports.sec = sec;

const deg = x => `${x}deg`;

exports.deg = deg;

const rad = x => `${x}rad`;

exports.rad = rad;

const turn = x => `${x}turn`;

exports.turn = turn;
},{}],"CbOE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.at_keyframes = at_keyframes;

var _impl = require("./impl");

var _units = require("./units");

function at_keyframes(id, ...args) {
  const stops = args.length === 1 ? args[0] : {
    0: args[0],
    100: args[1]
  };
  return (acc, opts) => {
    const outer = (0, _impl.indent)(opts);
    opts.depth++;
    const inner = (0, _impl.indent)(opts);
    acc.push(`${outer}@keyframes ${id}${opts.format.declStart}`);

    for (let s in stops) {
      if (stops.hasOwnProperty(s)) {
        acc.push([inner, (0, _units.percent)(s), opts.format.declStart, (0, _impl.formatDecls)(stops[s], opts), inner, opts.format.declEnd].join(""));
      }
    }

    opts.depth--;
    acc.push(outer + opts.format.declEnd);
    return acc;
  };
}
},{"./impl":"Reur","./units":"MnM7"}],"Xoss":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = void 0;

var _keyframes = require("./keyframes");

/**
 * Defines new `@keyframes` with given `id` and creates related class of
 * same name to configure given animation `opts`. Only the `duration`
 * option is given a default value (250ms), all others are optional.
 *
 * @example
 * ```ts
 * css(
 *   animation(
 *     "fadein",
 *     { delay: "0.5s" },
 *     { opacity: 0 },
 *     { opacity: 1 }
 *   )
 * );
 * ```
 *
 * ```css
 * @keyframes fadein {
 *     0% {
 *         opacity: 0;
 *     }
 *     100% {
 *         opacity: 1;
 *     }
 * }
 *
 * .fadein {
 *     animation-duration: 250ms;
 *     animation-name: fadein;
 *     animation-delay: 0.5s;
 * }
 * ```
 *
 * @param id - animation name
 * @param opts - animation config options
 * @param keyframes - keyframes
 */
const animation = (id, opts, ...keyframes) => {
  opts = Object.assign({
    duration: "250ms",
    name: id
  }, opts);
  return [_keyframes.at_keyframes.apply(null, [id, ...keyframes]), [`.${id}`, Object.keys(opts).reduce((acc, k) => (acc[`animation-${k}`] = opts[k], acc), {})]];
};

exports.animation = animation;
},{"./keyframes":"CbOE"}],"YdP4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attribMatches = exports.attribSuffix = exports.attribPrefix = exports.attribContains = exports.attribEq = exports.withAttrib = void 0;

const $ = op => (id, x, caseSensitve = false) => `[${id}${op}="${x}"${caseSensitve ? " i" : ""}]`;
/**
 * Returns attrib selector: `[id]`
 *
 * @param id -
 */


const withAttrib = id => `[${id}]`;
/**
 * Returns attrib selector `[id=x]`
 *
 * @param id -
 * @param x -
 * @param caseSensitive -
 */


exports.withAttrib = withAttrib;
const attribEq = $("");
/**
 * Returns attrib selector `[id~=x]`
 *
 * @param id -
 * @param x -
 * @param caseSensitive -
 */

exports.attribEq = attribEq;
const attribContains = $("~");
/**
 * Returns attrib selector `[id^=x]`
 *
 * @param id -
 * @param x -
 * @param caseSensitive -
 */

exports.attribContains = attribContains;
const attribPrefix = $("^");
/**
 * Returns attrib selector `[id$=x]`
 *
 * @param id -
 * @param x -
 * @param caseSensitive -
 */

exports.attribPrefix = attribPrefix;
const attribSuffix = $("$");
/**
 * Returns attrib selector `[id*=x]`
 * @param id -
 * @param x -
 * @param caseSensitive -
 */

exports.attribSuffix = attribSuffix;
const attribMatches = $("*");
exports.attribMatches = attribMatches;
},{}],"Qpy9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment = void 0;

var _impl = require("./impl");

const comment = (body, force = false) => (acc, opts) => {
  const space = (0, _impl.indent)(opts);
  const inner = (0, _impl.indent)(opts, opts.depth + 1);

  if (opts.format.comments || force) {
    acc.push(space + "/*", body.split("\n").map(l => inner + l).join("\n"), space + "*/");
  }

  return acc;
};

exports.comment = comment;
},{"./impl":"Reur"}],"BO29":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conditional = void 0;

var _checks = require("@thi.ng/checks");

var _impl = require("./impl");

const conditional = (type, cond, rules) => (acc, opts) => {
  const space = (0, _impl.indent)(opts);
  acc.push(`${space}${type} ${formatCond(cond)}${opts.format.declStart}`);
  opts.depth++;
  (0, _impl.expand)(acc, [], rules, opts);
  opts.depth--;
  acc.push(space + opts.format.declEnd);
  return acc;
};

exports.conditional = conditional;

const formatCond = cond => {
  if ((0, _checks.isString)(cond)) {
    return cond;
  }

  const acc = [];

  for (let c in cond) {
    if (cond.hasOwnProperty(c)) {
      let v = cond[c];

      if (v === true) {
        v = c;
      } else if (v === false) {
        v = "not " + c;
      } else if (v === "only") {
        v += " " + c;
      } else {
        v = `(${c}:${v})`;
      }

      acc.push(v);
    }
  }

  return acc.join(" and ");
};
},{"@thi.ng/checks":"XYpc","./impl":"Reur"}],"M08m":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = void 0;

var _checks = require("@thi.ng/checks");

var _api = require("./api");

var _impl = require("./impl");

const css = (rules, opts) => {
  opts = Object.assign({
    format: _api.COMPACT,
    vendors: _api.DEFAULT_VENDORS,
    fns: {},
    depth: 0
  }, opts);

  if ((0, _checks.isPlainObject)(rules)) {
    return (0, _impl.formatDecls)(rules, opts);
  }

  if ((0, _checks.isArray)(opts.autoprefix)) {
    opts.autoprefix = new Set(opts.autoprefix);
  }

  if ((0, _checks.isIterable)(rules) && !(0, _checks.isString)(rules)) {
    rules = [...rules];
  }

  if ((0, _checks.isArray)(rules)) {
    return (0, _impl.expand)([], [], rules, opts).join(opts.format.rules);
  }

  if ((0, _checks.isFunction)(rules)) {
    return rules([], opts).join(opts.format.rules);
  }
};

exports.css = css;
},{"@thi.ng/checks":"XYpc","./api":"AxCm","./impl":"Reur"}],"uYdA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.at_import = void 0;

const at_import = (url, ...queries) => (acc, opts) => (acc.push(queries.length ? `@import url(${url}) ${queries.join(opts.format.ruleSep)};` : `@import url(${url});`), acc);

exports.at_import = at_import;
},{}],"wueV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectStyleSheet = void 0;

// https://davidwalsh.name/add-rules-stylesheets

/**
 * Injects given CSS string as global stylesheet in DOM head. If `first`
 * is true, inserts it as first stylesheet, else (default) appends it.
 *
 * Returns created style DOM element.
 *
 * @param css - CSS string
 * @param first - true, if prepend to stylesheet list (else append)
 */
const injectStyleSheet = (css, first = false) => {
  const head = document.getElementsByTagName("head")[0];
  const sheet = document.createElement("style");
  sheet.setAttribute("type", "text/css");

  if (sheet.styleSheet !== undefined) {
    sheet.styleSheet.cssText = css;
  } else {
    sheet.textContent = css;
  }

  if (first) {
    head.insertBefore(sheet, head.firstChild);
  } else {
    head.appendChild(sheet);
  }

  return sheet;
};

exports.injectStyleSheet = injectStyleSheet;
},{}],"pE13":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.at_media = void 0;

var _conditional = require("./conditional");

const at_media = (cond, rules) => (0, _conditional.conditional)("@media", cond, rules);

exports.at_media = at_media;
},{"./conditional":"BO29"}],"BreG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.at_namespace = at_namespace;

function at_namespace(...args) {
  return (acc, _) => (acc.push(args.length > 1 ? `@namespace ${args[0]} url(${args[1]});` : `@namespace url(${args[0]});`), acc);
}
},{}],"rzYy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.at_supports = void 0;

var _conditional = require("./conditional");

const at_supports = (cond, rules) => (0, _conditional.conditional)("@supports", cond, rules);

exports.at_supports = at_supports;
},{"./conditional":"BO29"}],"udVy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QUOTED_FNS = void 0;

var _comment = require("./comment");

var _import = require("./import");

var _keyframes = require("./keyframes");

var _media = require("./media");

var _namespace = require("./namespace");

var _supports = require("./supports");

/** @internal */
const QUOTED_FNS = {
  "@comment": _comment.comment,
  "@import": _import.at_import,
  "@keyframes": _keyframes.at_keyframes,
  "@media": _media.at_media,
  "@namespace": _namespace.at_namespace,
  "@supports": _supports.at_supports
};
exports.QUOTED_FNS = QUOTED_FNS;
},{"./comment":"Qpy9","./import":"uYdA","./keyframes":"CbOE","./media":"pE13","./namespace":"BreG","./supports":"rzYy"}],"ggHL":[function(require,module,exports) {
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

var _animation = require("./animation");

Object.keys(_animation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _animation[key];
    }
  });
});

var _attribs = require("./attribs");

Object.keys(_attribs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _attribs[key];
    }
  });
});

var _comment = require("./comment");

Object.keys(_comment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _comment[key];
    }
  });
});

var _conditional = require("./conditional");

Object.keys(_conditional).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _conditional[key];
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

var _import = require("./import");

Object.keys(_import).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _import[key];
    }
  });
});

var _inject = require("./inject");

Object.keys(_inject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inject[key];
    }
  });
});

var _keyframes = require("./keyframes");

Object.keys(_keyframes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keyframes[key];
    }
  });
});

var _media = require("./media");

Object.keys(_media).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _media[key];
    }
  });
});

var _namespace = require("./namespace");

Object.keys(_namespace).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _namespace[key];
    }
  });
});

var _quotedFunctions = require("./quoted-functions");

Object.keys(_quotedFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _quotedFunctions[key];
    }
  });
});

var _supports = require("./supports");

Object.keys(_supports).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _supports[key];
    }
  });
});

var _units = require("./units");

Object.keys(_units).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _units[key];
    }
  });
});
},{"./api":"AxCm","./animation":"Xoss","./attribs":"YdP4","./comment":"Qpy9","./conditional":"BO29","./css":"M08m","./import":"uYdA","./inject":"wueV","./keyframes":"CbOE","./media":"pE13","./namespace":"BreG","./quoted-functions":"udVy","./supports":"rzYy","./units":"MnM7"}],"wHaB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.themer = exports.parse_theme = void 0;

var rand = _interopRequireWildcard(require("@thi.ng/random"));

var _atom = require("@thi.ng/atom");

var _paths = require("@thi.ng/paths");

var _css = _interopRequireDefault(require("@styled-system/css"));

var _decamelizeKeysDeep = _interopRequireDefault(require("decamelize-keys-deep"));

var _hiccupCss = require("@thi.ng/hiccup-css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const log = (...args) => console.log(...args); // Atom structure

/*
{
  queries: {
    "min-width: 10rem": { hash: {} }
  },
  pseudos: {
    hash: { ":hover": {} }
  },
  basics: {
    hash: {}
  }
}
*/

/**
 * basic skeleton of the style atom
 * */


const global_structure = {
  basics: {},
  pseudos: {},
  queries: {}
};
/**
 * creates a new atom/state container for storing styles
 * */

const global_atom = new _atom.Atom(global_structure);
/**
 * dispatches various types of style definitions to their
 * approprate shape within the style atom/state
 * */

const partitioner = (atom, macro, meso, micro = null) => {
  const current = atom.deref();
  const has_macro = !!current[macro];
  const has_meso = !!(0, _paths.getIn)(current, [macro, meso]); // 🔥: dot_hash will get it's nuts cut off if you don't use array path syntax

  if (micro) {
    if (has_meso) {
      atom.swapIn([macro, meso], xx => ({ ...xx,
        ...micro
      }));
    } else if (has_macro) {
      atom.swapIn([macro], xx => ({ ...xx,
        [meso]: micro
      }));
    } else {
      atom.swap(xx => ({ ...xx,
        [macro]: {
          [meso]: micro
        }
      }));
    }
  } else {
    if (has_macro) {
      atom.swapIn([macro], xx => ({ ...xx,
        ...meso
      }));
    } else {
      atom.swap(xx => ({ ...xx,
        [macro]: meso
      }));
    }
  }
};
/**
 * defines cursors to specific areas within the style state/atom
 * */


const q_crsr = new _atom.Cursor(global_atom, "queries");
const p_crsr = new _atom.Cursor(global_atom, "pseudos");
const b_crsr = new _atom.Cursor(global_atom, "basics");
/**
 * determines what kind of style is being handled and sends it
 * to the partitioner to be digested into the style state/atom
 * */

const partition = (selector, styles) => {
  const entries = Object.entries(styles);
  const is_root = selector === "root";

  if (is_root) {
    partitioner(b_crsr, ":root", styles);
  } else {
    entries.forEach(([key, val]) => {
      const is_pseudo = key.slice(0, 1) === "&";
      const is_query = key.slice(0, 6) === "@media";
      const is_basic = typeof val !== "object";

      if (is_pseudo) {
        partitioner(p_crsr, selector, key.slice(1), val);
      } else if (is_query) {
        const rgx = /\(.*?\)/g;
        const media_query = key.match(rgx)[0].slice(1, -1);
        partitioner(q_crsr, media_query, selector, val);
      } else if (is_basic) {
        partitioner(b_crsr, selector, {
          [key]: val
        });
      } else {
        log("partition failure:", {
          selector,
          styles
        });
        return;
      }
    });
  }
};
/**
 * Takes a styled-system theme-spec compliant theme object
 * returns ready-to-wear css
 * */


const parse_theme = theme => (0, _decamelizeKeysDeep.default)((0, _css.default)(theme)(theme), "-");
/**
 * Takes a styled-system theme-spec compliant theme object
 * returns a function that then takes
 * @param {string} sel - a css selector (e.g., 'button')
 * @param {Object} [styles] - a css-in-js style object
 * @param {string|string[]} [path] - a path string or array into the global theme
 *
 * When called with the arguments, registers the styles to the global style atom
 * and returns a unique hash string to be used by the component for scoped css
 * */


exports.parse_theme = parse_theme;

const style_fire = theme_spec => (sel, styles = null, path = null) => {
  const hash = `${sel}${rand.randomID(5, "_", "0123456789abcdefghijklmnopqrstuvwxyz")}`;
  const dot_hash = `.${hash}`;
  const spec_lens = (0, _paths.getIn)(theme_spec, path);
  const style_obj = path ? (0, _decamelizeKeysDeep.default)((0, _css.default)(spec_lens)(theme_spec), "-") : {};
  const themed_styles = styles ? (0, _decamelizeKeysDeep.default)((0, _css.default)(styles)(theme_spec), "-") : {};
  const computed_styles = { ...style_obj,
    ...themed_styles
  }; // -> to injection! 💉

  partition(dot_hash, computed_styles);
  return hash;
};
/**
 * registers theme-spec compliant theme
 * Takes a theme-spec compliant object and returns a tuple that contains
 * [theme_styler, THEME]
 * theme_styler calls style_fire (registering styles and returns a unique hash string)
 * THEME is the theme-spec complaint object parsed into standards compliant css
 * */


const themer = theme_spec => {
  const THEME = parse_theme(theme_spec);
  const BASE = THEME.styles;
  const basic_entries = Object.entries(BASE);
  basic_entries.forEach(([selector, styles]) => partition(selector, styles));
  const theme_styler = style_fire(theme_spec); // returns tuple [ configured_theme_obj, theme_styler_fn ] 😈

  return [theme_styler, THEME];
};

exports.themer = themer;

const dereference = (atom, opts) => {
  const entries = Object.entries(atom.deref());
  let results = [];
  entries.forEach(([cursor, styles]) => {
    let style_array = Object.entries(styles);

    switch (cursor) {
      case "basics":
        style_array.forEach(style => {
          results.push(style);
        });
        break;

      case "pseudos":
        style_array.forEach(([tag, style]) => {
          results.push([tag, ...Object.entries(style)]);
        });
        break;

      case "queries":
        style_array.forEach(style => {
          let [m, q] = style[0].split(":");
          results.push([(0, _hiccupCss.at_media)({
            screen: true,
            [m]: q
          }, Object.entries(style[1]))]);
        });
        break;

      default:
        log("no case found for:", cursor);
    }
  }); // const results = hiccup_css(res)

  return (0, _hiccupCss.css)(results, opts);
}; //?


var _default = themer;
exports.default = _default;
const opts = "production" !== "production" ? {
  format: _hiccupCss.PRETTY
} : null;
/**
 * Waits for the DOMContentLoaded event to inject all registered component styles
 * and basic `styles` from the theme into the <head> of the webpage
 * */

window.addEventListener("DOMContentLoaded", () => {
  const formatted_styles = dereference(global_atom, opts);
  (0, _hiccupCss.injectStyleSheet)(formatted_styles);
});
},{"@thi.ng/random":"C0Vh","@thi.ng/atom":"GVpA","@thi.ng/paths":"buUl","@styled-system/css":"HS8T","decamelize-keys-deep":"bGVb","@thi.ng/hiccup-css":"ggHL"}],"ndBe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.THEME = exports.theme_styler = void 0;

var _uswds_theme = require("./uswds_theme");

var _styledSystemHdom = require("styled-system-hdom");

const [theme_styler, THEME] = (0, _styledSystemHdom.themer)(_uswds_theme.theme);
exports.THEME = THEME;
exports.theme_styler = theme_styler;
},{"./uswds_theme":"QcZX","styled-system-hdom":"wHaB"}],"Focm":[function(require,module,exports) {
"use strict";

var _paths = require("@thi.ng/paths");

var _checks = require("@thi.ng/checks");

var _associative = require("@thi.ng/associative");

var _spule = require("spule");

var _theme = require("./theme");

// import "regenerator-runtime"
// import scrolly from "@mapbox/scroll-restorer"
// scrolly.start()
// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
// import { button_x } from "./components"

/**
 *
 * Note for Parcel (package.json):
 *
 * TRY PARCEL 2.alpha
 *
 */
//
//  888                /
//  888  e88~-_  e88~88e  d88~\
//  888 d888   i 888 888 C888
//  888 8888   | "88_88"  Y88b
//  888 Y888   '  /        888D
//  888  "88_-~  Cb      \_88P
//                Y8""8D
//
const log = console.log; // trace$("run$ ->", run$)
// trace$("command$ ->", command$)
// trace$("out$ ->", out$)
//
//        888             d8
//   e88~\888   /~~~8e  _d88__   /~~~8e
//  d888  888       88b  888         88b
//  8888  888  e88~-888  888    e88~-888
//  Y888  888 C888  888  888   C888  888
//   "88_/888  "88_-888  "88_/  "88_-888
//
//

/**
 *
 * When using a router config object (rather than a plain
 * router function), payloads can also separate display data
 * under a `BODY` key to separate the content from any
 * metadata you may want to use in `pre`/`post`
 * Commands/Tasks. For example, the built-in
 * `INJECT_HEAD_CMD` pulls from a `HEAD` key in the payload.
 *
 * Regarding state MGMT: The payload (value) will be
 * destructured from the `BODY` to keep your lenses (paths)
 * and state clean. I.e., you do not have to destructure
 * this from your page/app template manually. However,
 * within a `pre`/`post` Command/Task, the user can/must
 * use/destructure `HEAD`/`POST` payloads for their own
 * needs
 *
 */

const getSomeJSON = async (path, uid) => {
  const text_base = "https://jsonplaceholder.typicode.com/";

  const img_base = (id, sz) => `https://i.picsum.photos/id/${id}/${sz}/${sz}.jpg`;

  const data = uid ? (async () => {
    let detail = await fetch(`${text_base}${path}/${uid}`).then(r => r.json());
    let {
      name = `User ${(0, _paths.getIn)(detail, "id")}`,
      company: {
        catchPhrase
      } = {
        catchPhrase: detail.title
      }
    } = detail;
    return {
      HEAD: {
        title: `${name}'s Details`,
        description: `${name} handles ${catchPhrase}`,
        image: {
          url: img_base(uid, 600)
        }
      },
      BODY: {
        // lesson -> don't use the actual url as the uid (not flexible)
        img: img_base(uid, 600),
        // this needs fixin' 📌
        text: detail,
        uid
      }
    };
  })() : (async () => {
    let list = await fetch(`${text_base}${path}/`).then(r => r.json());
    return {
      HEAD: {
        title: `${path.replace(/^\w/, c => c.toUpperCase())} list`,
        description: `List page for ${path}`,
        image: {
          url: img_base(222, 200)
        }
      },
      BODY: list.map((c, i) => ({
        img: img_base(i + 1, 200),
        text: c,
        uid: i + 1
      }))
    };
  })();
  return data;
}; //
//                             d8
//  888-~\  e88~-_  888  888 _d88__  e88~~8e  888-~\
//  888    d888   i 888  888  888   d888  88b 888
//  888    8888   | 888  888  888   8888__888 888
//  888    Y888   ' 888  888  888   Y888    , 888
//  888     "88_-~  "88_-888  "88_/  "88___/  888
//
//

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
 *
 * TODO: Graphql Example
 */


const routerCfg = async url => {
  let match = (0, _spule.fURL)(url);
  let {
    // URL,
    // URL_subdomain, // array
    // URL_domain, // array
    // URL_query, // object
    // URL_hash, // string
    URL_path // array

  } = match;
  let [, p_b] = URL_path;
  let {
    URL_data,
    URL_page
  } = new _associative.EquivMap([[{ ...match,
    URL_path: ["todos"]
  }, {
    URL_data: () => getSomeJSON("todos"),
    URL_page: set
  }], [{ ...match,
    URL_path: ["todos", p_b]
  }, {
    URL_data: () => getSomeJSON("todos", p_b),
    URL_page: single
  }], [{ ...match,
    URL_path: ["users"]
  }, {
    URL_data: () => getSomeJSON("users"),
    URL_page: set
  }], [{ ...match,
    URL_path: ["users", p_b]
  }, {
    URL_data: () => getSomeJSON("users", p_b),
    URL_page: single
  }], // home page (empty path)
  [{ ...match,
    URL_path: []
  }, {
    URL_data: () => getSomeJSON("users", 1),
    URL_page: single
  }] // get match || 404 data
  ]).get(match) || {
    URL_data: () => getSomeJSON("users", 9),
    URL_page: single
  };
  return {
    URL_data: await URL_data(),
    URL_page
  };
}; //
//  888            888
//  888-~88e  e88~\888  e88~-_  888-~88e-~88e
//  888  888 d888  888 d888   i 888  888  888
//  888  888 8888  888 8888   | 888  888  888
//  888  888 Y888  888 Y888   ' 888  888  888
//  888  888  "88_/888  "88_-~  888  888  888
//
//
//////////////////// FLIP API 🔻 //////////////////////////
// CHILD DEF: sig = (ctx, attrs, ...any)


const child = (ctx, id, img, sz, ...args) => // log("child"),
["img", {
  src: img,
  style: sz === "sm" ? {
    height: "100px",
    width: "100px",
    cursor: "pointer"
  } : {
    height: "600px",
    width: "600px"
  },
  href: sz === "sm" ? `/${ctx.fURL().URL_path}/${id}` : `/${ctx.fURL().URL_path.join("/")}`
}, ...args];

const zoomOnNav = (ctx, id, img, sz) => [_spule.FLIPkid, [child, id, img, sz]]; //////////////////// FLIP API 🔺  //////////////////////////

/**
 * higher order components should only take static parameters
 * so that they can be cached. I.e., in this case a string
 * Do not nest an HDOM functional component within another
 * in an attempt to pass state between components. Use an atom,
 * which is deref'able for that
 */


const component = sz => // log("component"),
(ctx, uid, img, fields) => ["div", {
  style: {
    "margin-bottom": "30px"
  }
}, [zoomOnNav, uid, img, sz], ["p", {
  class: "title"
}, fields]]; // babel/core-js will complain if pages aren't defined
// before they're used even though eslint will allow it


const single = (ctx, body) => // log("single"),
[component("lg"), (0, _paths.getIn)(body, "uid"), (0, _paths.getIn)(body, "img") || "https://i.picsum.photos/id/1/600/600.jpg", (0, _paths.getIn)(body, "text") ? fields(body.text.company || body.text) : null];

const set = (ctx, bodies) => // log("set"),
["div", ...bodies.map(({
  img,
  text,
  uid
}) => [component("sm"), uid, img, fields(text)])]; // const S = JSON.stringify // <- handy for adornment phase
// declare button before using in-site (prevent re-registration on RAF)
// const btn_outline = button_x({ tag: "a" }, "buttons.outline")


const pathLink = (ctx, uid, ...args) => // log("pathLink"),
["div", // btn_outline,
uid === 3 ? {
  disabled: true
} : {
  href: `/${ctx.fURL().URL_path}/${uid}`,
  onclick: e => {
    e.preventDefault();
    ctx.run({ ..._spule.HURL,
      args: e
    });
  }
}, ...args];

const field = (ctx, key, val) => // log("field"),
["li", {
  style: {
    display: "flex"
  }
}, key === "id" ? [pathLink, val, val] : (0, _checks.isObject)(val) ? ["ul", ...Object.entries(val).map(([k, v]) => [field, k, v])] : ["p", {
  style: {
    padding: "0 0.5rem"
  }
}, val]];

const fields = payload => // log("fields", { payload }),
["ul", ...Object.entries(payload).slice(0, 4).map(([k, v]) => [field, k, v])];

const link = (ctx, path, ...args) => // log("link"),
["a", {
  href: "/" + path.join("/"),
  // regular href just works if there's no extra paths in
  // URL (e.g., gh-pages URLs will break these)...
  onclick: e => (e.preventDefault(), ctx.run({ ..._spule.HURL,
    args: e
  }))
}, ...args]; //
//
//    /~~~8e  888-~88e  888-~88e
//        88b 888  888b 888  888b
//   e88~-888 888  8888 888  8888
//  C888  888 888  888P 888  888P
//   "88_-888 888-_88"  888-_88"
//            888       888
//
// TODO: example of using cursors for local state


const app = (ctx, page) => // log("app"),
["div", {
  style: {
    "max-width": "30rem",
    margin: "auto",
    padding: "2rem"
  }
}, ...[["users"], ["todos"], ["todos", 2], ["users", 9]].map(path => [link, path, `/${path[0]}${path[1] ? "/" + path[1] : ""}`, ["br"]]), // default to homepage `single` shell during
// hydration/start (before any async is done)
page]; // TODO: add default / 404 page here (could help the ugly $page.deref() ||...)


const router = {
  prefix: "ac/",
  router: routerCfg,
  post: _spule.INJECT_HEAD
}; // const router = routerCfg

const w_config = {
  app,
  router,
  root: document.getElementById("app"),
  // <- 🔍
  prefix: "ac/",
  // draft: { users: [] },
  // trace: "app stream ->",
  // arbitrary context k/v pairs...
  theme: _theme.THEME
};
(0, _spule.boot)(w_config); // registerCMD({
//   sub$: "HURL_CMD",
//   args: x => x
// })

console.log("registered Commands:", _spule.registerCMD.all.entries());
console.log("starting...");
},{"@thi.ng/paths":"jkaf","@thi.ng/checks":"XYpc","@thi.ng/associative":"GmJl","spule":"K6of","./theme":"ndBe"}]},{},["Focm"], null)
//# sourceMappingURL=streaming_API.6b3e0936.js.map