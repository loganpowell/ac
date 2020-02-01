(function () {
function $parcel$interopDefault(a) {
  return a && a.__esModule ? {
    d: a.default
  } : {
    d: a
  };
}

var $parcel$global = this;
// ASSET: node_modules\@babel\runtime-corejs3\core-js-stable\instance\slice.js
var $joq7$exports = {};
// ASSET: node_modules\core-js-pure\internals\entry-virtual.js
var $gwGg$exports = {};
// ASSET: node_modules\core-js-pure\internals\global.js
var $UZxb$exports = {};

var $UZxb$var$check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


$UZxb$exports = // eslint-disable-next-line no-undef
$UZxb$var$check(typeof globalThis == 'object' && globalThis) || $UZxb$var$check(typeof window == 'object' && window) || $UZxb$var$check(typeof self == 'object' && self) || $UZxb$var$check(typeof $parcel$global == 'object' && $parcel$global) || // eslint-disable-next-line no-new-func
Function('return this')();
// ASSET: node_modules\core-js-pure\internals\fails.js
var $YquT$exports = {};

$YquT$exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// ASSET: node_modules\core-js-pure\internals\descriptors.js
var $e7ya$exports = {};
// Thank's IE8 for his funny defineProperty
$e7ya$exports = !$YquT$exports(function () {
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});
var $dS8w$var$nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var $dS8w$var$getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var $dS8w$var$NASHORN_BUG = $dS8w$var$getOwnPropertyDescriptor && !$dS8w$var$nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

var $dS8w$export$f = $dS8w$var$NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = $dS8w$var$getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $dS8w$var$nativePropertyIsEnumerable;
// ASSET: node_modules\core-js-pure\internals\create-property-descriptor.js
var $XagN$exports = {};

$XagN$exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

// ASSET: node_modules\core-js-pure\internals\classof-raw.js
var $JOgV$exports = {};
var $JOgV$var$toString = {}.toString;

$JOgV$exports = function (it) {
  return $JOgV$var$toString.call(it).slice(8, -1);
};

// ASSET: node_modules\core-js-pure\internals\indexed-object.js
var $M9KC$exports = {};
var $M9KC$var$split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

$M9KC$exports = $YquT$exports(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return $JOgV$exports(it) == 'String' ? $M9KC$var$split.call(it, '') : Object(it);
} : Object;
// ASSET: node_modules\core-js-pure\internals\require-object-coercible.js
var $NJKJ$exports = {}; // `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible

$NJKJ$exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// ASSET: node_modules\core-js-pure\internals\to-indexed-object.js
var $R59A$exports = {}; // toObject with fallback for non-array-like ES3 strings

$R59A$exports = function (it) {
  return $M9KC$exports($NJKJ$exports(it));
};

// ASSET: node_modules\core-js-pure\internals\is-object.js
var $LQEH$exports = {};

$LQEH$exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// ASSET: node_modules\core-js-pure\internals\to-primitive.js
var $VUoW$exports = {};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
$VUoW$exports = function (input, PREFERRED_STRING) {
  if (!$LQEH$exports(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !$LQEH$exports(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !$LQEH$exports(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !$LQEH$exports(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

// ASSET: node_modules\core-js-pure\internals\has.js
var $XjYt$exports = {};
var $XjYt$var$hasOwnProperty = {}.hasOwnProperty;

$XjYt$exports = function (it, key) {
  return $XjYt$var$hasOwnProperty.call(it, key);
};

// ASSET: node_modules\core-js-pure\internals\document-create-element.js
var $N1Ut$exports = {};
var $N1Ut$var$document = $UZxb$exports.document; // typeof document.createElement is 'object' in old IE

var $N1Ut$var$EXISTS = $LQEH$exports($N1Ut$var$document) && $LQEH$exports($N1Ut$var$document.createElement);

$N1Ut$exports = function (it) {
  return $N1Ut$var$EXISTS ? $N1Ut$var$document.createElement(it) : {};
};

// ASSET: node_modules\core-js-pure\internals\ie8-dom-define.js
var $Nehv$exports = {};
// Thank's IE8 for his funny defineProperty
$Nehv$exports = !$e7ya$exports && !$YquT$exports(function () {
  return Object.defineProperty($N1Ut$exports('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});
var $qmhA$var$nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var $qmhA$export$f = $e7ya$exports ? $qmhA$var$nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = $R59A$exports(O);
  P = $VUoW$exports(P, true);
  if ($Nehv$exports) try {
    return $qmhA$var$nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if ($XjYt$exports(O, P)) return $XagN$exports(!$dS8w$export$f.call(O, P), O[P]);
};
// ASSET: node_modules\core-js-pure\internals\is-forced.js
var $LIYz$exports = {};
var $LIYz$var$replacement = /#|\.prototype\./;

var $LIYz$var$isForced = function (feature, detection) {
  var value = $LIYz$var$data[$LIYz$var$normalize(feature)];
  return value == $LIYz$var$POLYFILL ? true : value == $LIYz$var$NATIVE ? false : typeof detection == 'function' ? $YquT$exports(detection) : !!detection;
};

var $LIYz$var$normalize = $LIYz$var$isForced.normalize = function (string) {
  return String(string).replace($LIYz$var$replacement, '.').toLowerCase();
};

var $LIYz$var$data = $LIYz$var$isForced.data = {};
var $LIYz$var$NATIVE = $LIYz$var$isForced.NATIVE = 'N';
var $LIYz$var$POLYFILL = $LIYz$var$isForced.POLYFILL = 'P';
$LIYz$exports = $LIYz$var$isForced;
// ASSET: node_modules\core-js-pure\internals\path.js
var $N3bf$exports = {};
$N3bf$exports = {};
// ASSET: node_modules\core-js-pure\internals\a-function.js
var $IZUK$exports = {};

$IZUK$exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

// ASSET: node_modules\core-js-pure\internals\function-bind-context.js
var $eNCf$exports = {};

// optional / simple context binding
$eNCf$exports = function (fn, that, length) {
  $IZUK$exports(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

// ASSET: node_modules\core-js-pure\internals\an-object.js
var $iTjQ$exports = {};

$iTjQ$exports = function (it) {
  if (!$LQEH$exports(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

var $KTov$var$nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var $KTov$export$f = $e7ya$exports ? $KTov$var$nativeDefineProperty : function defineProperty(O, P, Attributes) {
  $iTjQ$exports(O);
  P = $VUoW$exports(P, true);
  $iTjQ$exports(Attributes);
  if ($Nehv$exports) try {
    return $KTov$var$nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
// ASSET: node_modules\core-js-pure\internals\create-non-enumerable-property.js
var $Ouyn$exports = {};
$Ouyn$exports = $e7ya$exports ? function (object, key, value) {
  return $KTov$export$f(object, key, $XagN$exports(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};
// ASSET: node_modules\core-js-pure\internals\export.js
var $deMH$exports = {};
var $deMH$var$getOwnPropertyDescriptor = $qmhA$export$f;

var $deMH$var$wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0:
          return new NativeConstructor();

        case 1:
          return new NativeConstructor(a);

        case 2:
          return new NativeConstructor(a, b);
      }

      return new NativeConstructor(a, b, c);
    }

    return NativeConstructor.apply(this, arguments);
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


$deMH$exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;
  var nativeSource = GLOBAL ? $UZxb$exports : STATIC ? $UZxb$exports[TARGET] : ($UZxb$exports[TARGET] || {}).prototype;
  var target = GLOBAL ? $N3bf$exports : $N3bf$exports[TARGET] || ($N3bf$exports[TARGET] = {});
  var targetPrototype = target.prototype;
  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = $LIYz$exports(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

    USE_NATIVE = !FORCED && nativeSource && $XjYt$exports(nativeSource, key);
    targetProperty = target[key];
    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = $deMH$var$getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key]; // export native or implementation

    sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

    if (options.bind && USE_NATIVE) resultProperty = $eNCf$exports(sourceProperty, $UZxb$exports); // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = $deMH$var$wrapConstructor(sourceProperty); // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function') resultProperty = $eNCf$exports(Function.call, sourceProperty); // default case
        else resultProperty = sourceProperty; // add a flag to not completely full polyfills

    if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
      $Ouyn$exports(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

      if (!$XjYt$exports($N3bf$exports, VIRTUAL_PROTOTYPE)) {
        $Ouyn$exports($N3bf$exports, VIRTUAL_PROTOTYPE, {});
      } // export virtual prototype methods


      $N3bf$exports[VIRTUAL_PROTOTYPE][key] = sourceProperty; // export real prototype methods

      if (options.real && targetPrototype && !targetPrototype[key]) {
        $Ouyn$exports(targetPrototype, key, sourceProperty);
      }
    }
  }
};

// ASSET: node_modules\core-js-pure\internals\is-array.js
var $HeH8$exports = {};

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
$HeH8$exports = Array.isArray || function isArray(arg) {
  return $JOgV$exports(arg) == 'Array';
};

// ASSET: node_modules\core-js-pure\internals\to-integer.js
var $Ztp7$exports = {};
var $Ztp7$var$ceil = Math.ceil;
var $Ztp7$var$floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

$Ztp7$exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? $Ztp7$var$floor : $Ztp7$var$ceil)(argument);
};

// ASSET: node_modules\core-js-pure\internals\to-absolute-index.js
var $oMc3$exports = {};
var $oMc3$var$max = Math.max;
var $oMc3$var$min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

$oMc3$exports = function (index, length) {
  var integer = $Ztp7$exports(index);
  return integer < 0 ? $oMc3$var$max(integer + length, 0) : $oMc3$var$min(integer, length);
};

// ASSET: node_modules\core-js-pure\internals\to-length.js
var $ONIT$exports = {};
var $ONIT$var$min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

$ONIT$exports = function (argument) {
  return argument > 0 ? $ONIT$var$min($Ztp7$exports(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

// ASSET: node_modules\core-js-pure\internals\create-property.js
var $PkFu$exports = {};

$PkFu$exports = function (object, key, value) {
  var propertyKey = $VUoW$exports(key);
  if (propertyKey in object) $KTov$export$f(object, propertyKey, $XagN$exports(0, value));else object[propertyKey] = value;
};

// ASSET: node_modules\core-js-pure\internals\is-pure.js
var $SpFQ$exports = {};
$SpFQ$exports = true;
// ASSET: node_modules\core-js-pure\internals\set-global.js
var $ZojI$exports = {};

$ZojI$exports = function (key, value) {
  try {
    $Ouyn$exports($UZxb$exports, key, value);
  } catch (error) {
    $UZxb$exports[key] = value;
  }

  return value;
};

// ASSET: node_modules\core-js-pure\internals\shared-store.js
var $eGlF$exports = {};
var $eGlF$var$SHARED = '__core-js_shared__';
var $eGlF$var$store = $UZxb$exports[$eGlF$var$SHARED] || $ZojI$exports($eGlF$var$SHARED, {});
$eGlF$exports = $eGlF$var$store;
// ASSET: node_modules\core-js-pure\internals\shared.js
var $ye9O$exports = {};
($ye9O$exports = function (key, value) {
  return $eGlF$exports[key] || ($eGlF$exports[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: $SpFQ$exports ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
// ASSET: node_modules\core-js-pure\internals\uid.js
var $uxGM$exports = {};
var $uxGM$var$id = 0;
var $uxGM$var$postfix = Math.random();

$uxGM$exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++$uxGM$var$id + $uxGM$var$postfix).toString(36);
};

// ASSET: node_modules\core-js-pure\internals\native-symbol.js
var $uSak$exports = {};
$uSak$exports = !!Object.getOwnPropertySymbols && !$YquT$exports(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});
// ASSET: node_modules\core-js-pure\internals\use-symbol-as-uid.js
var $So3u$exports = {};
$So3u$exports = $uSak$exports // eslint-disable-next-line no-undef
&& !Symbol.sham && typeof Symbol.iterator == 'symbol';
// ASSET: node_modules\core-js-pure\internals\well-known-symbol.js
var $t71M$exports = {};
var $t71M$var$WellKnownSymbolsStore = $ye9O$exports('wks');
var $t71M$var$Symbol = $UZxb$exports.Symbol;
var $t71M$var$createWellKnownSymbol = $So3u$exports ? $t71M$var$Symbol : $t71M$var$Symbol && $t71M$var$Symbol.withoutSetter || $uxGM$exports;

$t71M$exports = function (name) {
  if (!$XjYt$exports($t71M$var$WellKnownSymbolsStore, name)) {
    if ($uSak$exports && $XjYt$exports($t71M$var$Symbol, name)) $t71M$var$WellKnownSymbolsStore[name] = $t71M$var$Symbol[name];else $t71M$var$WellKnownSymbolsStore[name] = $t71M$var$createWellKnownSymbol('Symbol.' + name);
  }

  return $t71M$var$WellKnownSymbolsStore[name];
};

// ASSET: node_modules\core-js-pure\internals\get-built-in.js
var $j2J9$exports = {};

var $j2J9$var$aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

$j2J9$exports = function (namespace, method) {
  return arguments.length < 2 ? $j2J9$var$aFunction($N3bf$exports[namespace]) || $j2J9$var$aFunction($UZxb$exports[namespace]) : $N3bf$exports[namespace] && $N3bf$exports[namespace][method] || $UZxb$exports[namespace] && $UZxb$exports[namespace][method];
};

// ASSET: node_modules\core-js-pure\internals\engine-user-agent.js
var $wGO7$exports = {};
$wGO7$exports = $j2J9$exports('navigator', 'userAgent') || '';
// ASSET: node_modules\core-js-pure\internals\engine-v8-version.js
var $CAzM$exports = {};
var $CAzM$var$process = $UZxb$exports.process;
var $CAzM$var$versions = $CAzM$var$process && $CAzM$var$process.versions;
var $CAzM$var$v8 = $CAzM$var$versions && $CAzM$var$versions.v8;
var $CAzM$var$match, $CAzM$var$version;

if ($CAzM$var$v8) {
  $CAzM$var$match = $CAzM$var$v8.split('.');
  $CAzM$var$version = $CAzM$var$match[0] + $CAzM$var$match[1];
} else if ($wGO7$exports) {
  $CAzM$var$match = $wGO7$exports.match(/Edge\/(\d+)/);

  if (!$CAzM$var$match || $CAzM$var$match[1] >= 74) {
    $CAzM$var$match = $wGO7$exports.match(/Chrome\/(\d+)/);
    if ($CAzM$var$match) $CAzM$var$version = $CAzM$var$match[1];
  }
}

$CAzM$exports = $CAzM$var$version && +$CAzM$var$version;
// ASSET: node_modules\core-js-pure\internals\array-method-has-species-support.js
var $Wjjp$exports = {};
var $Wjjp$var$SPECIES = $t71M$exports('species');

$Wjjp$exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return $CAzM$exports >= 51 || !$YquT$exports(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[$Wjjp$var$SPECIES] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

// ASSET: node_modules\core-js-pure\internals\array-method-uses-to-length.js
var $erxC$exports = {};
var $erxC$var$defineProperty = Object.defineProperty;
var $erxC$var$cache = {};

var $erxC$var$thrower = function (it) {
  throw it;
};

$erxC$exports = function (METHOD_NAME, options) {
  if ($XjYt$exports($erxC$var$cache, METHOD_NAME)) return $erxC$var$cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = $XjYt$exports(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = $XjYt$exports(options, 0) ? options[0] : $erxC$var$thrower;
  var argument1 = $XjYt$exports(options, 1) ? options[1] : undefined;
  return $erxC$var$cache[METHOD_NAME] = !!method && !$YquT$exports(function () {
    if (ACCESSORS && !$e7ya$exports) return true;
    var O = {
      length: -1
    };
    if (ACCESSORS) $erxC$var$defineProperty(O, 1, {
      enumerable: true,
      get: $erxC$var$thrower
    });else O[1] = 1;
    method.call(O, argument0, argument1);
  });
};

var $ka7e$var$HAS_SPECIES_SUPPORT = $Wjjp$exports('slice');
var $ka7e$var$USES_TO_LENGTH = $erxC$exports('slice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var $ka7e$var$SPECIES = $t71M$exports('species');
var $ka7e$var$nativeSlice = [].slice;
var $ka7e$var$max = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$deMH$exports({
  target: 'Array',
  proto: true,
  forced: !$ka7e$var$HAS_SPECIES_SUPPORT || !$ka7e$var$USES_TO_LENGTH
}, {
  slice: function slice(start, end) {
    var O = $R59A$exports(this);
    var length = $ONIT$exports(O.length);
    var k = $oMc3$exports(start, length);
    var fin = $oMc3$exports(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if ($HeH8$exports(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || $HeH8$exports(Constructor.prototype))) {
        Constructor = undefined;
      } else if ($LQEH$exports(Constructor)) {
        Constructor = Constructor[$ka7e$var$SPECIES];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return $ka7e$var$nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)($ka7e$var$max(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) $PkFu$exports(result, n, O[k]);

    result.length = n;
    return result;
  }
});

$gwGg$exports = function (CONSTRUCTOR) {
  return $N3bf$exports[CONSTRUCTOR + 'Prototype'];
};

// ASSET: node_modules\core-js-pure\es\array\virtual\slice.js
var $Sg2z$exports = {};
$Sg2z$exports = $gwGg$exports('Array').slice;
// ASSET: node_modules\core-js-pure\es\instance\slice.js
var $b92o$exports = {};
var $b92o$var$ArrayPrototype = Array.prototype;

$b92o$exports = function (it) {
  var own = it.slice;
  return it === $b92o$var$ArrayPrototype || it instanceof Array && own === $b92o$var$ArrayPrototype.slice ? $Sg2z$exports : own;
};

// ASSET: node_modules\core-js-pure\stable\instance\slice.js
var $zR1j$exports = {};
$zR1j$exports = $b92o$exports;
$joq7$exports = $zR1j$exports;
// ASSET: node_modules\@babel\runtime-corejs3\core-js-stable\object\entries.js
var $pziW$exports = {};
// ASSET: node_modules\core-js-pure\es\object\entries.js
var $nQ1w$exports = {};
// ASSET: node_modules\core-js-pure\internals\array-includes.js
var $M1rU$exports = {};

// `Array.prototype.{ indexOf, includes }` methods implementation
var $M1rU$var$createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = $R59A$exports($this);
    var length = $ONIT$exports(O.length);
    var index = $oMc3$exports(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

$M1rU$exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: $M1rU$var$createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: $M1rU$var$createMethod(false)
};
// ASSET: node_modules\core-js-pure\internals\hidden-keys.js
var $z2fa$exports = {};
$z2fa$exports = {};
// ASSET: node_modules\core-js-pure\internals\object-keys-internal.js
var $ImCz$exports = {};
var $ImCz$var$indexOf = $M1rU$exports.indexOf;

$ImCz$exports = function (object, names) {
  var O = $R59A$exports(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !$XjYt$exports($z2fa$exports, key) && $XjYt$exports(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if ($XjYt$exports(O, key = names[i++])) {
    ~$ImCz$var$indexOf(result, key) || result.push(key);
  }

  return result;
};

// ASSET: node_modules\core-js-pure\internals\enum-bug-keys.js
var $MM50$exports = {};
$MM50$exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
// ASSET: node_modules\core-js-pure\internals\object-keys.js
var $XLmh$exports = {};

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$XLmh$exports = Object.keys || function keys(O) {
  return $ImCz$exports(O, $MM50$exports);
};

// ASSET: node_modules\core-js-pure\internals\object-to-array.js
var $l74c$exports = {};
var $l74c$var$propertyIsEnumerable = $dS8w$export$f; // `Object.{ entries, values }` methods implementation

var $l74c$var$createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = $R59A$exports(it);
    var keys = $XLmh$exports(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!$e7ya$exports || $l74c$var$propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

$l74c$exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: $l74c$var$createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: $l74c$var$createMethod(false)
};
var $vLVP$var$$entries = $l74c$exports.entries; // `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries

$deMH$exports({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $vLVP$var$$entries(O);
  }
});
$nQ1w$exports = $N3bf$exports.Object.entries;
// ASSET: node_modules\core-js-pure\stable\object\entries.js
var $QVzt$exports = {};
$QVzt$exports = $nQ1w$exports;
$pziW$exports = $QVzt$exports;
// ASSET: node_modules\@babel\runtime-corejs3\core-js-stable\instance\map.js
var $n32p$exports = {};
// ASSET: node_modules\core-js-pure\es\array\virtual\map.js
var $gNzr$exports = {};
// ASSET: node_modules\core-js-pure\internals\to-object.js
var $TOVz$exports = {};

// `ToObject` abstract operation
$TOVz$exports = function (argument) {
  return Object($NJKJ$exports(argument));
};

// ASSET: node_modules\core-js-pure\internals\array-species-create.js
var $jfhz$exports = {};
var $jfhz$var$SPECIES = $t71M$exports('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

$jfhz$exports = function (originalArray, length) {
  var C;

  if ($HeH8$exports(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || $HeH8$exports(C.prototype))) C = undefined;else if ($LQEH$exports(C)) {
      C = C[$jfhz$var$SPECIES];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

// ASSET: node_modules\core-js-pure\internals\array-iteration.js
var $zHd1$exports = {};
var $zHd1$var$push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var $zHd1$var$createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = $TOVz$exports($this);
    var self = $M9KC$exports(O);
    var boundFunction = $eNCf$exports(callbackfn, that, 3);
    var length = $ONIT$exports(self.length);
    var index = 0;
    var create = specificCreate || $jfhz$exports;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              $zHd1$var$push.call(target, value);
            // filter
          } else if (IS_EVERY) return false; // every
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

$zHd1$exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: $zHd1$var$createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: $zHd1$var$createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: $zHd1$var$createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: $zHd1$var$createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: $zHd1$var$createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: $zHd1$var$createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: $zHd1$var$createMethod(6)
};
var $NagU$var$$map = $zHd1$exports.map;
var $NagU$var$HAS_SPECIES_SUPPORT = $Wjjp$exports('map'); // FF49- issue

var $NagU$var$USES_TO_LENGTH = $erxC$exports('map'); // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

$deMH$exports({
  target: 'Array',
  proto: true,
  forced: !$NagU$var$HAS_SPECIES_SUPPORT || !$NagU$var$USES_TO_LENGTH
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $NagU$var$$map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
$gNzr$exports = $gwGg$exports('Array').map;
// ASSET: node_modules\core-js-pure\es\instance\map.js
var $jawy$exports = {};
var $jawy$var$ArrayPrototype = Array.prototype;

$jawy$exports = function (it) {
  var own = it.map;
  return it === $jawy$var$ArrayPrototype || it instanceof Array && own === $jawy$var$ArrayPrototype.map ? $gNzr$exports : own;
};

// ASSET: node_modules\core-js-pure\stable\instance\map.js
var $NJ2X$exports = {};
$NJ2X$exports = $jawy$exports;
$n32p$exports = $NJ2X$exports;

const $O43L$export$isFunction = x => typeof x === "function";

const $MqiA$export$implementsFunction = (x, fn) => x != null && typeof x[fn] === "function";

const $GCHm$export$isArray = Array.isArray;

const $bt5q$export$isArrayLike = x => x != null && typeof x !== "function" && x.length !== undefined;

const $NqbO$export$isString = x => typeof x === "string";

const $MgVO$export$isIterable = x => x != null && typeof x[Symbol.iterator] === "function";

const $lTuS$export$isMap = x => x instanceof Map;

const $CwkB$export$isObject = x => x !== null && typeof x === "object";

const $RJHr$var$OBJP = Object.getPrototypeOf;
/**
 * Similar to {@link isObject}, but also checks if prototype is that of
 * `Object` (or `null`).
 *
 * @param x -
 */

const $RJHr$export$isPlainObject = x => {
  let p;
  return x != null && typeof x === "object" && ((p = $RJHr$var$OBJP(x)) === null || $RJHr$var$OBJP(p) === null);
};

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
const $AoxZ$export$toPath = path => $GCHm$export$isArray(path) ? path : $NqbO$export$isString(path) ? path.length > 0 ? path.split(".") : [] : path != null ? [path] : [];
/**
 * Takes an arbitrary object and lookup path. Descends into object along
 * path and returns true if the full path exists (even if final leaf
 * value is `null` or `undefined`). Checks are performed using
 * `hasOwnProperty()`.
 *
 * @param obj -
 * @param path -
 */


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
const $aPTM$export$getter = path => $aPTM$export$getterT(path);

function $aPTM$export$getterT(path) {
  const ks = $AoxZ$export$toPath(path);
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
const $CG20$export$setter = path => $CG20$export$setterT(path);

function $CG20$export$setterT(path) {
  const ks = $AoxZ$export$toPath(path);
  let [a, b, c, d] = ks;

  switch (ks.length) {
    case 0:
      return (_, v) => v;

    case 1:
      return (s, v) => (s = $CG20$var$_copy(s), s[a] = v, s);

    case 2:
      return (s, v) => {
        let x;
        s = $CG20$var$_copy(s);
        s[a] = x = $CG20$var$_copy(s[a]);
        x[b] = v;
        return s;
      };

    case 3:
      return (s, v) => {
        let x, y;
        s = $CG20$var$_copy(s);
        s[a] = x = $CG20$var$_copy(s[a]);
        x[b] = y = $CG20$var$_copy(x[b]);
        y[c] = v;
        return s;
      };

    case 4:
      return (s, v) => {
        let x, y, z;
        s = $CG20$var$_copy(s);
        s[a] = x = $CG20$var$_copy(s[a]);
        x[b] = y = $CG20$var$_copy(x[b]);
        y[c] = z = $CG20$var$_copy(y[c]);
        z[d] = v;
        return s;
      };

    default:
      let f;

      for (let i = ks.length; --i >= 0;) {
        f = $CG20$var$compS(ks[i], f);
      }

      return f;
  }
}

const $CG20$var$_copy = s => $GCHm$export$isArray(s) ? s.slice() : Object.assign({}, s);

const $CG20$var$compS = (k, f) => (s, v) => (s = $CG20$var$_copy(s), s[k] = f ? f(s[k], v) : v, s);

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
const $T1Wd$export$updateIn = (state, path, fn, ...args) => $T1Wd$export$updateInT(state, path, fn, ...args);

function $T1Wd$export$updateInT(state, path, fn, ...args) {
  return $CG20$export$setterT(path)(state, fn.apply(null, (args.unshift($aPTM$export$getterT(path)(state)), args)));
}

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
const $VaFF$export$getIn = (state, path) => $aPTM$export$getterT(path)(state);

const $kOLs$export$defError = (prefix, suffix = msg => msg !== undefined ? ": " + msg : "") => class extends Error {
  constructor(msg) {
    super(prefix(msg) + suffix(msg));
  }

};

const $lITh$export$IllegalArgumentError = $kOLs$export$defError(() => "illegal argument(s)");

const $lITh$export$illegalArgs = msg => {
  throw new $lITh$export$IllegalArgumentError(msg);
};

const $qdh1$export$IllegalArityError = $kOLs$export$defError(() => "illegal arity");

const $qdh1$export$illegalArity = n => {
  throw new $qdh1$export$IllegalArityError(n);
};

const $Ro8m$export$IllegalStateError = $kOLs$export$defError(() => "illegal state");

const $Ro8m$export$illegalState = msg => {
  throw new $Ro8m$export$IllegalStateError(msg);
};

const $O0h9$export$setIn = (state, path, val) => $CG20$export$setterT(path)(state, val);

const $rb6u$export$SEMAPHORE = Symbol();

const $biA9$export$NO_OP = () => {};

const $ikqU$export$mixin = (behaviour, sharedBehaviour = {}) => {
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

const $TKeT$export$IWatchMixin = $ikqU$export$mixin({
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
const $ATNO$var$OBJP = Object.getPrototypeOf({});
const $ATNO$var$FN = "function";
const $ATNO$var$STR = "string";

const $ATNO$export$equiv = (a, b) => {
  let proto;

  if (a === b) {
    return true;
  }

  if (a != null) {
    if (typeof a.equiv === $ATNO$var$FN) {
      return a.equiv(b);
    }
  } else {
    return a == b;
  }

  if (b != null) {
    if (typeof b.equiv === $ATNO$var$FN) {
      return b.equiv(a);
    }
  } else {
    return a == b;
  }

  if (typeof a === $ATNO$var$STR || typeof b === $ATNO$var$STR) {
    return false;
  }

  if ((proto = Object.getPrototypeOf(a), proto == null || proto === $ATNO$var$OBJP) && (proto = Object.getPrototypeOf(b), proto == null || proto === $ATNO$var$OBJP)) {
    return $ATNO$export$equivObject(a, b);
  }

  if (typeof a !== $ATNO$var$FN && a.length !== undefined && typeof b !== $ATNO$var$FN && b.length !== undefined) {
    return $ATNO$export$equivArrayLike(a, b);
  }

  if (a instanceof Set && b instanceof Set) {
    return $ATNO$export$equivSet(a, b);
  }

  if (a instanceof Map && b instanceof Map) {
    return $ATNO$export$equivMap(a, b);
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  } // NaN


  return a !== a && b !== b;
};

const $ATNO$export$equivArrayLike = (a, b, _equiv = $ATNO$export$equiv) => {
  let l = a.length;

  if (l === b.length) {
    while (--l >= 0 && _equiv(a[l], b[l]));
  }

  return l < 0;
};

const $ATNO$export$equivSet = (a, b, _equiv = $ATNO$export$equiv) => a.size === b.size && _equiv([...a.keys()].sort(), [...b.keys()].sort());

const $ATNO$export$equivMap = (a, b, _equiv = $ATNO$export$equiv) => a.size === b.size && _equiv([...a].sort(), [...b].sort());

const $ATNO$export$equivObject = (a, b, _equiv = $ATNO$export$equiv) => {
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

function $Egnc$export$dissoc(coll, keys) {
  for (let k of keys) {
    coll.delete(k);
  }

  return coll;
}

const $AcUa$export$equivMap = (a, b) => {
  if (a === b) {
    return true;
  }

  if (!(b instanceof Map) || a.size !== b.size) {
    return false;
  }

  for (let p of a.entries()) {
    if (!$ATNO$export$equiv(b.get(p[0]), p[1])) {
      return false;
    }
  }

  return true;
};

const $AcUa$export$equivSet = (a, b) => {
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

function $IExg$export$into(dest, src) {
  if ($lTuS$export$isMap(dest)) {
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

const $XOqx$var$__private = new WeakMap();

const $XOqx$var$__vals = inst => $XOqx$var$__private.get(inst).vals;
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


class $XOqx$export$ArraySet extends Set {
  constructor(vals, opts = {}) {
    super();
    $XOqx$var$__private.set(this, {
      equiv: opts.equiv || $ATNO$export$equiv,
      vals: []
    });
    vals && this.into(vals);
  }

  *[Symbol.iterator]() {
    yield* $XOqx$var$__vals(this);
  }

  get [Symbol.species]() {
    return $XOqx$export$ArraySet;
  }

  get [Symbol.toStringTag]() {
    return "ArraySet";
  }

  get size() {
    return $XOqx$var$__vals(this).length;
  }

  copy() {
    const $this = $XOqx$var$__private.get(this);
    const s = new $XOqx$export$ArraySet(null, {
      equiv: $this.equiv
    });
    $XOqx$var$__private.get(s).vals = $this.vals.slice();
    return s;
  }

  empty() {
    return new $XOqx$export$ArraySet(null, this.opts());
  }

  clear() {
    $XOqx$var$__vals(this).length = 0;
  }

  first() {
    if (this.size) {
      return $XOqx$var$__vals(this)[0];
    }
  }

  add(key) {
    !this.has(key) && $XOqx$var$__vals(this).push(key);
    return this;
  }

  into(keys) {
    return $IExg$export$into(this, keys);
  }

  has(key) {
    return this.get(key, $rb6u$export$SEMAPHORE) !== $rb6u$export$SEMAPHORE;
  }
  /**
   * Returns the canonical value for `x`, if present. If the set
   * contains no equivalent for `x`, returns `notFound`.
   *
   * @param key - search key
   * @param notFound - default value
   */


  get(key, notFound) {
    const $this = $XOqx$var$__private.get(this);
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
    const $this = $XOqx$var$__private.get(this);
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
    return $Egnc$export$dissoc(this, keys);
  }

  equiv(o) {
    return $AcUa$export$equivSet(this, o);
  }

  forEach(fn, thisArg) {
    const vals = $XOqx$var$__vals(this);

    for (let i = vals.length; --i >= 0;) {
      const v = vals[i];
      fn.call(thisArg, v, v, this);
    }
  }

  *entries() {
    for (let v of $XOqx$var$__vals(this)) {
      yield [v, v];
    }
  }

  *keys() {
    yield* $XOqx$var$__vals(this);
  }

  *values() {
    yield* $XOqx$var$__vals(this);
  }

  opts() {
    return {
      equiv: $XOqx$var$__private.get(this).equiv
    };
  }

}

const $GDPU$export$ensureTransducer = x => $MqiA$export$implementsFunction(x, "xform") ? x.xform() : x;

class $cx02$export$Reduced {
  constructor(val) {
    this.value = val;
  }

  deref() {
    return this.value;
  }

}

const $cx02$export$isReduced = x => x instanceof $cx02$export$Reduced;

const $cx02$export$unreduced = x => x instanceof $cx02$export$Reduced ? x.deref() : x;

const $eXuG$var$parseArgs = args => args.length === 2 ? [undefined, args[1]] : args.length === 3 ? [args[1], args[2]] : $qdh1$export$illegalArity(args.length);

function $eXuG$export$reduce(...args) {
  const rfn = args[0];
  const init = rfn[0];
  const complete = rfn[1];
  const reduce = rfn[2];
  args = $eXuG$var$parseArgs(args);
  const acc = args[0] == null ? init() : args[0];
  const xs = args[1];
  return $cx02$export$unreduced(complete($MqiA$export$implementsFunction(xs, "$reduce") ? xs.$reduce(reduce, acc) : $bt5q$export$isArrayLike(xs) ? $eXuG$var$reduceArray(reduce, acc, xs) : $eXuG$var$reduceIterable(reduce, acc, xs)));
}

const $eXuG$var$reduceArray = (rfn, acc, xs) => {
  for (let i = 0, n = xs.length; i < n; i++) {
    acc = rfn(acc, xs[i]);

    if ($cx02$export$isReduced(acc)) {
      acc = acc.deref();
      break;
    }
  }

  return acc;
};

const $eXuG$var$reduceIterable = (rfn, acc, xs) => {
  for (let x of xs) {
    acc = rfn(acc, x);

    if ($cx02$export$isReduced(acc)) {
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


const $eXuG$export$reducer = (init, rfn) => [init, acc => acc, rfn];

function $igRM$export$push(xs) {
  return xs ? [...xs] : $eXuG$export$reducer(() => [], (acc, x) => (acc.push(x), acc));
}

/**
 * Takes a transducer and input iterable. Returns iterator of
 * transformed results.
 *
 * @param xform -
 * @param xs -
 */
function* $sIZF$export$iterator(xform, xs) {
  const rfn = $GDPU$export$ensureTransducer(xform)($igRM$export$push());
  const complete = rfn[1];
  const reduce = rfn[2];

  for (let x of xs) {
    const y = reduce([], x);

    if ($cx02$export$isReduced(y)) {
      yield* $cx02$export$unreduced(complete(y.deref()));
      return;
    }

    if (y.length) {
      yield* y;
    }
  }

  yield* $cx02$export$unreduced(complete([]));
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


function* $sIZF$export$iterator1(xform, xs) {
  const reduce = $GDPU$export$ensureTransducer(xform)([$biA9$export$NO_OP, $biA9$export$NO_OP, (_, x) => x])[2];

  for (let x of xs) {
    let y = reduce($rb6u$export$SEMAPHORE, x);

    if ($cx02$export$isReduced(y)) {
      y = $cx02$export$unreduced(y.deref());

      if (y !== $rb6u$export$SEMAPHORE) {
        yield y;
      }

      return;
    }

    if (y !== $rb6u$export$SEMAPHORE) {
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


const $U2YI$export$compR = (rfn, fn) => [rfn[0], rfn[1], fn];

function $t9zY$export$map(fn, src) {
  return src ? $sIZF$export$iterator1($t9zY$export$map(fn), src) : rfn => {
    const r = rfn[2];
    return $U2YI$export$compR(rfn, (acc, x) => r(acc, fn(x)));
  };
}

function $UQCU$export$transduce(...args) {
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
      return $t9zY$export$map(x => $UQCU$export$transduce(args[0], args[1], x));

    default:
      $qdh1$export$illegalArity(args.length);
  }

  return $eXuG$export$reduce($GDPU$export$ensureTransducer(args[0])(args[1]), acc, xs);
}

function $uNGU$export$comp(...fns) {
  let [a, b, c, d, e, f, g, h, i, j] = fns;

  switch (fns.length) {
    case 0:
      $qdh1$export$illegalArity(0);

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

      return fns.length === 10 ? fn : $uNGU$export$comp(fn, ...fns.slice(10));
  }
}

function $aQR0$export$str(sep, xs) {
  sep = sep || "";
  let first = true;
  return xs ? [...xs].join(sep) : $eXuG$export$reducer(() => "", (acc, x) => (acc = first ? acc + x : acc + sep + x, first = false, acc));
}

class $Wb7Y$export$Range {
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
      for (let i = this.from, n = this.to; i < n && !$cx02$export$isReduced(acc); i += step) {
        acc = rfn(acc, i);
      }
    } else {
      for (let i = this.from, n = this.to; i > n && !$cx02$export$isReduced(acc); i += step) {
        acc = rfn(acc, i);
      }
    }

    return acc;
  }

}

const $qpA2$export$ensureIterable = x => {
  (x == null || !x[Symbol.iterator]) && $lITh$export$illegalArgs(`value is not iterable: ${x}`);
  return x;
};

const $pbxK$export$ensureArrayLike = x => $bt5q$export$isArrayLike(x) ? x : [...$qpA2$export$ensureIterable(x)];

function $ulpz$export$flattenWith(fn, src) {
  return src ? $sIZF$export$iterator($ulpz$export$flattenWith(fn), src) : rfn => {
    const reduce = rfn[2];

    const flatten = (acc, x) => {
      const xx = fn(x);

      if (xx) {
        for (let y of xx) {
          acc = flatten(acc, y);

          if ($cx02$export$isReduced(acc)) {
            break;
          }
        }

        return acc;
      }

      return reduce(acc, x);
    };

    return $U2YI$export$compR(rfn, flatten);
  };
}

function $mJ7z$export$flatten(src) {
  return $ulpz$export$flattenWith(x => x != null && x[Symbol.iterator] && typeof x !== "string" ? x : undefined, src);
}

function $TOye$export$comp(...fns) {
  fns = fns.map($GDPU$export$ensureTransducer);
  return $uNGU$export$comp.apply(null, fns);
}

function* $Ho5I$export$repeat(x, n = Infinity) {
  while (n-- > 0) {
    yield x;
  }
}

function* $WAdb$export$permutations(...src) {
  const n = src.length - 1;

  if (n < 0) {
    return;
  }

  const step = new Array(n + 1).fill(0);
  const realized = src.map($pbxK$export$ensureArrayLike);
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


const $jZih$var$__private = new WeakMap();

const $jZih$var$__map = map => $jZih$var$__private.get(map).map;

class $jZih$export$EquivMap extends Map {
  /**
   * Converts given vanilla object into an {@link EquivMap} instance with
   * default (or optionally provided) options and returns it. By
   * default uses strict `===` equality check for `equiv` option.
   *
   * @param obj - source object
   * @param opts - config options
   */
  static fromObject(obj, opts) {
    const m = new $jZih$export$EquivMap(null, Object.assign({
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
      equiv: $ATNO$export$equiv,
      keys: $XOqx$export$ArraySet
    }, opts);

    $jZih$var$__private.set(this, {
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
    return $jZih$export$EquivMap;
  }

  get [Symbol.toStringTag]() {
    return "EquivMap";
  }

  get size() {
    return $jZih$var$__private.get(this).keys.size;
  }

  clear() {
    const $this = $jZih$var$__private.get(this);
    $this.keys.clear();
    $this.map.clear();
  }

  empty() {
    return new $jZih$export$EquivMap(null, $jZih$var$__private.get(this).opts);
  }

  copy() {
    const $this = $jZih$var$__private.get(this);
    const m = new $jZih$export$EquivMap();
    $jZih$var$__private.set(m, {
      keys: $this.keys.copy(),
      map: new Map($this.map),
      opts: $this.opts
    });
    return m;
  }

  equiv(o) {
    return $AcUa$export$equivMap(this, o);
  }

  delete(key) {
    const $this = $jZih$var$__private.get(this);
    key = $this.keys.get(key, $rb6u$export$SEMAPHORE);

    if (key !== $rb6u$export$SEMAPHORE) {
      $this.map.delete(key);
      $this.keys.delete(key);
      return true;
    }

    return false;
  }

  dissoc(keys) {
    return $Egnc$export$dissoc(this, keys);
  }

  forEach(fn, thisArg) {
    for (let pair of $jZih$var$__map(this)) {
      fn.call(thisArg, pair[1], pair[0], this);
    }
  }

  get(key, notFound) {
    const $this = $jZih$var$__private.get(this);
    key = $this.keys.get(key, $rb6u$export$SEMAPHORE);

    if (key !== $rb6u$export$SEMAPHORE) {
      return $this.map.get(key);
    }

    return notFound;
  }

  has(key) {
    return $jZih$var$__private.get(this).keys.has(key);
  }

  set(key, value) {
    const $this = $jZih$var$__private.get(this);
    const k = $this.keys.get(key, $rb6u$export$SEMAPHORE);

    if (k !== $rb6u$export$SEMAPHORE) {
      $this.map.set(k, value);
    } else {
      $this.keys.add(key);
      $this.map.set(key, value);
    }

    return this;
  }

  into(pairs) {
    return $IExg$export$into(this, pairs);
  }

  entries() {
    return $jZih$var$__map(this).entries();
  }

  keys() {
    return $jZih$var$__map(this).keys();
  }

  values() {
    return $jZih$var$__map(this).values();
  }

  opts() {
    return $jZih$var$__private.get(this).opts;
  }

}

// ASSET: ..\..\node_modules\@thi.ng\rstream\api.js
var $mjlp$var$_temp, $mjlp$var$_temp2;
const $jIkc$export$SEMAPHORE = Symbol();

const $xLTi$export$NO_OP = () => {};

// ASSET: ..\..\node_modules\@thi.ng\api\api\logger.js
var $lWE0$var$_temp;
var $lWE0$export$LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["FINE"] = 0] = "FINE";
  LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["SEVERE"] = 4] = "SEVERE";
  LogLevel[LogLevel["NONE"] = 5] = "NONE";
})($lWE0$export$LogLevel || ($lWE0$var$_temp = $lWE0$export$LogLevel = {}, $lWE0$var$_temp));

const $mrOC$export$NULL_LOGGER = Object.freeze({
  level: $lWE0$export$LogLevel.NONE,

  fine() {},

  debug() {},

  info() {},

  warn() {},

  severe() {}

});

const $r7mt$export$mixin = (behaviour, sharedBehaviour = {}) => {
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

const $haK8$export$IWatchMixin = $r7mt$export$mixin({
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
var $mjlp$export$State;

(function (State) {
  State[State["IDLE"] = 0] = "IDLE";
  State[State["ACTIVE"] = 1] = "ACTIVE";
  State[State["DONE"] = 2] = "DONE";
  State[State["ERROR"] = 3] = "ERROR";
  State[State["DISABLED"] = 4] = "DISABLED"; // TODO currently unused
})($mjlp$export$State || ($mjlp$var$_temp = $mjlp$export$State = {}, $mjlp$var$_temp));

var $mjlp$export$CloseMode;

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
})($mjlp$export$CloseMode || ($mjlp$var$_temp2 = $mjlp$export$CloseMode = {}, $mjlp$var$_temp2));

let $mjlp$export$LOGGER = $mrOC$export$NULL_LOGGER;

const $Bufo$export$isFunction = x => typeof x === "function";

const $aypl$export$implementsFunction = (x, fn) => x != null && typeof x[fn] === "function";

const $EzY8$export$isArray = Array.isArray;

const $YRs3$export$isString = x => typeof x === "string";

const $n4Mm$export$isIterable = x => x != null && typeof x[Symbol.iterator] === "function";

const $f4lF$export$isMap = x => x instanceof Map;

var $av77$var$process = {};

const $av77$export$isNode = () => {
  if (typeof $av77$var$process === "object") {
    if (typeof $av77$var$process.versions === "object") {
      if (typeof $av77$var$process.versions.node !== "undefined") {
        return true;
      }
    }
  }

  return false;
};

const $h7C1$export$isNotStringAndIterable = x => x != null && typeof x !== "string" && typeof x[Symbol.iterator] === "function";

const $czvy$export$isObject = x => x !== null && typeof x === "object";

const $Pfe1$var$OBJP = Object.getPrototypeOf;

const $Pfe1$export$isPlainObject = x => {
  let p;
  return x != null && typeof x === "object" && ((p = $Pfe1$var$OBJP(x)) === null || $Pfe1$var$OBJP(p) === null);
};

const $dJae$export$isPromise = x => x instanceof Promise;

class $N1be$export$Reduced {
  constructor(val) {
    this.value = val;
  }

  deref() {
    return this.value;
  }

}

const $N1be$export$isReduced = x => x instanceof $N1be$export$Reduced;

const $N1be$export$ensureReduced = x => x instanceof $N1be$export$Reduced ? x : new $N1be$export$Reduced(x);

const $N1be$export$unreduced = x => x instanceof $N1be$export$Reduced ? x.deref() : x;

const $eWwg$export$defError = (prefix, suffix = msg => msg !== undefined ? ": " + msg : "") => class extends Error {
  constructor(msg) {
    super(prefix(msg) + suffix(msg));
  }

};

const $uRQP$export$IllegalArgumentError = $eWwg$export$defError(() => "illegal argument(s)");

const $uRQP$export$illegalArgs = msg => {
  throw new $uRQP$export$IllegalArgumentError(msg);
};

const $r3zx$export$IllegalArityError = $eWwg$export$defError(() => "illegal arity");

const $r3zx$export$illegalArity = n => {
  throw new $r3zx$export$IllegalArityError(n);
};

const $htig$export$IllegalStateError = $eWwg$export$defError(() => "illegal state");

const $htig$export$illegalState = msg => {
  throw new $htig$export$IllegalStateError(msg);
};

const $EzWe$export$UnsupportedOperationError = $eWwg$export$defError(() => "unsupported operation");

const $EzWe$export$unsupported = msg => {
  throw new $EzWe$export$UnsupportedOperationError(msg);
};

const $UerL$export$reducer = (init, rfn) => [init, acc => acc, rfn];

function $nZPr$export$push(xs) {
  return xs ? [...xs] : $UerL$export$reducer(() => [], (acc, x) => (acc.push(x), acc));
}

/**
 * Takes a transducer and input iterable. Returns iterator of
 * transformed results.
 *
 * @param xform
 * @param xs
 */
function* $fhdf$export$iterator(xform, xs) {
  const rfn = xform($nZPr$export$push());
  const complete = rfn[1];
  const reduce = rfn[2];

  for (let x of xs) {
    const y = reduce([], x);

    if ($N1be$export$isReduced(y)) {
      yield* $N1be$export$unreduced(complete(y.deref()));
      return;
    }

    if (y.length) {
      yield* y;
    }
  }

  yield* $N1be$export$unreduced(complete([]));
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


function* $fhdf$export$iterator1(xform, xs) {
  const reduce = xform([$xLTi$export$NO_OP, $xLTi$export$NO_OP, (_, x) => x])[2];

  for (let x of xs) {
    let y = reduce($jIkc$export$SEMAPHORE, x);

    if ($N1be$export$isReduced(y)) {
      y = $N1be$export$unreduced(y.deref());

      if (y !== $jIkc$export$SEMAPHORE) {
        yield y;
      }

      return;
    }

    if (y !== $jIkc$export$SEMAPHORE) {
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


const $fhdf$export$$iter = (xform, args, impl = $fhdf$export$iterator1) => {
  const n = args.length - 1;
  return $n4Mm$export$isIterable(args[n]) ? args.length > 1 ? impl(xform.apply(null, args.slice(0, n)), args[n]) : impl(xform(), args[0]) : undefined;
};

const $IqcY$export$compR = (rfn, fn) => [rfn[0], rfn[1], fn];

function $WUst$export$map(fn, src) {
  return src ? $fhdf$export$iterator1($WUst$export$map(fn), src) : rfn => {
    const r = rfn[2];
    return $IqcY$export$compR(rfn, (acc, x) => r(acc, fn(x)));
  };
}

function $iXJj$export$comp(...fns) {
  let [a, b, c, d, e, f, g, h, i, j] = fns;

  switch (fns.length) {
    case 0:
      $r3zx$export$illegalArity(0);

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

      return fns.length === 10 ? fn : $iXJj$export$comp(fn, ...fns.slice(10));
  }
}

const $U8cl$var$OBJP = Object.getPrototypeOf({});
const $U8cl$var$FN = "function";
const $U8cl$var$STR = "string";

const $U8cl$export$equiv = (a, b) => {
  let proto;

  if (a === b) {
    return true;
  }

  if (a != null) {
    if (typeof a.equiv === $U8cl$var$FN) {
      return a.equiv(b);
    }
  } else {
    return a == b;
  }

  if (b != null) {
    if (typeof b.equiv === $U8cl$var$FN) {
      return b.equiv(a);
    }
  } else {
    return a == b;
  }

  if (typeof a === $U8cl$var$STR || typeof b === $U8cl$var$STR) {
    return false;
  }

  if ((proto = Object.getPrototypeOf(a), proto == null || proto === $U8cl$var$OBJP) && (proto = Object.getPrototypeOf(b), proto == null || proto === $U8cl$var$OBJP)) {
    return $U8cl$export$equivObject(a, b);
  }

  if (typeof a !== $U8cl$var$FN && a.length !== undefined && typeof b !== $U8cl$var$FN && b.length !== undefined) {
    return $U8cl$export$equivArrayLike(a, b);
  }

  if (a instanceof Set && b instanceof Set) {
    return $U8cl$export$equivSet(a, b);
  }

  if (a instanceof Map && b instanceof Map) {
    return $U8cl$export$equivMap(a, b);
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  return a !== a && b !== b;
};

const $U8cl$export$equivArrayLike = (a, b, _equiv = $U8cl$export$equiv) => {
  let l = a.length;

  if (l === b.length) {
    while (--l >= 0 && _equiv(a[l], b[l]));
  }

  return l < 0;
};

const $U8cl$export$equivSet = (a, b, _equiv = $U8cl$export$equiv) => a.size === b.size && _equiv([...a.keys()].sort(), [...b.keys()].sort());

const $U8cl$export$equivMap = (a, b, _equiv = $U8cl$export$equiv) => a.size === b.size && _equiv([...a].sort(), [...b].sort());

const $U8cl$export$equivObject = (a, b, _equiv = $U8cl$export$equiv) => {
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

const $eOoC$export$peek = x => x[x.length - 1];

function $vBNp$export$comp(...fns) {
  return $iXJj$export$comp.apply(null, fns);
}

function $aO4q$export$scan(...args) {
  return args.length > 2 && $fhdf$export$$iter($aO4q$export$scan, args, $fhdf$export$iterator) || (([inito, completeo, reduceo]) => {
    const [initi, completei, reducei] = args[0];
    let acc = args.length > 1 && args[1] != null ? args[1] : initi();
    return [inito, _acc => {
      let a = completei(acc);

      if (a !== acc) {
        _acc = $N1be$export$unreduced(reduceo(_acc, a));
      }

      acc = a;
      return completeo(_acc);
    }, (_acc, x) => {
      acc = reducei(acc, x);

      if ($N1be$export$isReduced(acc)) {
        return $N1be$export$ensureReduced(reduceo(_acc, acc.deref()));
      }

      return reduceo(_acc, acc);
    }];
  });
}

let $KTbf$var$NEXT_ID = 0;

const $KTbf$export$nextID = () => $KTbf$var$NEXT_ID++;

const $KTbf$export$optsWithID = (prefix, opts) => !opts || !opts.id ? Object.assign(Object.assign({}, opts), {
  id: prefix + "-" + $KTbf$export$nextID()
}) : opts;

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
const $kQ3j$export$subscription = (sub, opts) => new $kQ3j$export$Subscription(sub, opts);

class $kQ3j$export$Subscription {
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
    this.id = opts.id || `sub-${$KTbf$export$nextID()}`;
    this.last = $jIkc$export$SEMAPHORE;
    this.subs = [];

    if (sub) {
      this.subs.push(sub);
    }

    if (opts.xform) {
      this.xform = opts.xform($nZPr$export$push());
    }
  }

  deref() {
    return this.last !== $jIkc$export$SEMAPHORE ? this.last : undefined;
  }

  getState() {
    return this.state;
  }

  subscribe(...args) {
    this.ensureState();
    let sub;
    let opts = args.length > 1 && $Pfe1$export$isPlainObject($eOoC$export$peek(args)) ? Object.assign({}, args.pop()) : {};

    switch (args.length) {
      case 1:
        if ($Bufo$export$isFunction(args[0])) {
          opts.xform = args[0];
          !opts.id && (opts.id = `xform-${$KTbf$export$nextID()}`);
        } else {
          sub = args[0];
        }

        break;

      case 2:
        sub = args[0];
        opts.xform = args[1];
        break;

      default:
        $r3zx$export$illegalArity(args.length);
    }

    if ($aypl$export$implementsFunction(sub, "subscribe")) {
      sub.parent = this;
    } else {
      // FIXME inherit options from this sub or defaults?
      sub = $kQ3j$export$subscription(sub, Object.assign({
        parent: this
      }, opts));
    }

    this.last !== $jIkc$export$SEMAPHORE && sub.next(this.last);
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
    return $Pfe1$export$isPlainObject(xf[n]) ? this.subscribe($vBNp$export$comp(...xf.slice(0, n)), xf[n]) : this.subscribe($vBNp$export$comp(...xf));
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
    $mjlp$export$LOGGER.debug(this.id, "unsub start", sub ? sub.id : "self");

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
      $mjlp$export$LOGGER.debug(this.id, "unsub child", sub.id);
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
          const uacc = $N1be$export$unreduced(acc);
          const n = uacc.length;

          for (let i = 0; i < n; i++) {
            this.dispatch(uacc[i]);
          }

          if ($N1be$export$isReduced(acc)) {
            this.done();
          }
        } else {
          this.dispatch(x);
        }
      }
  }

  done() {
    $mjlp$export$LOGGER.debug(this.id, "entering done()");

    if (this.state < 2
    /* DONE */
    ) {
        if (this.xform) {
          const acc = this.xform[1]([]);
          const uacc = $N1be$export$unreduced(acc);
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
        $mjlp$export$LOGGER.debug(this.id, "exiting done()");
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
      $mjlp$export$LOGGER.warn(this.id, "unhandled error:", e);

      if (this.parent) {
        $mjlp$export$LOGGER.debug(this.id, "unsubscribing...");
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
        $htig$export$illegalState(`operation not allowed in state ${this.state}`);
      }
  }

  cleanup() {
    $mjlp$export$LOGGER.debug(this.id, "cleanup");
    this.subs.length = 0;
    delete this.parent;
    delete this.xform;
    delete this.last;
  }

}

function $VaVn$export$dissoc(coll, keys) {
  for (let k of keys) {
    coll.delete(k);
  }

  return coll;
}

const $vPtr$export$equivMap = (a, b) => {
  if (a === b) {
    return true;
  }

  if (!(b instanceof Map) || a.size !== b.size) {
    return false;
  }

  for (let p of a.entries()) {
    if (!$U8cl$export$equiv(b.get(p[0]), p[1])) {
      return false;
    }
  }

  return true;
};

const $vPtr$export$equivSet = (a, b) => {
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

function $uWkF$export$into(dest, src) {
  if ($f4lF$export$isMap(dest)) {
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

const $nNr8$var$__private = new WeakMap();

const $nNr8$var$__vals = inst => $nNr8$var$__private.get(inst).vals;

class $nNr8$export$ArraySet extends Set {
  constructor(vals, opts = {}) {
    super();
    $nNr8$var$__private.set(this, {
      equiv: opts.equiv || $U8cl$export$equiv,
      vals: []
    });
    vals && this.into(vals);
  }

  *[Symbol.iterator]() {
    yield* $nNr8$var$__vals(this);
  }

  get [Symbol.species]() {
    return $nNr8$export$ArraySet;
  }

  get [Symbol.toStringTag]() {
    return "ArraySet";
  }

  get size() {
    return $nNr8$var$__vals(this).length;
  }

  copy() {
    const $this = $nNr8$var$__private.get(this);
    const s = new $nNr8$export$ArraySet(null, {
      equiv: $this.equiv
    });
    $nNr8$var$__private.get(s).vals = $this.vals.slice();
    return s;
  }

  empty() {
    return new $nNr8$export$ArraySet(null, this.opts());
  }

  clear() {
    $nNr8$var$__vals(this).length = 0;
  }

  first() {
    if (this.size) {
      return $nNr8$var$__vals(this)[0];
    }
  }

  add(key) {
    !this.has(key) && $nNr8$var$__vals(this).push(key);
    return this;
  }

  into(keys) {
    return $uWkF$export$into(this, keys);
  }

  has(key) {
    return this.get(key, $jIkc$export$SEMAPHORE) !== $jIkc$export$SEMAPHORE;
  }
  /**
   * Returns the canonical value for `x`, if present. If the set
   * contains no equivalent for `x`, returns `notFound`.
   *
   * @param key
   * @param notFound
   */


  get(key, notFound) {
    const $this = $nNr8$var$__private.get(this);
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
    const $this = $nNr8$var$__private.get(this);
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
    return $VaVn$export$dissoc(this, keys);
  }

  equiv(o) {
    return $vPtr$export$equivSet(this, o);
  }

  forEach(fn, thisArg) {
    const vals = $nNr8$var$__vals(this);

    for (let i = vals.length; --i >= 0;) {
      const v = vals[i];
      fn.call(thisArg, v, v, this);
    }
  }

  *entries() {
    for (let v of $nNr8$var$__vals(this)) {
      yield [v, v];
    }
  }

  *keys() {
    yield* $nNr8$var$__vals(this);
  }

  *values() {
    yield* $nNr8$var$__vals(this);
  }

  opts() {
    return {
      equiv: $nNr8$var$__private.get(this).equiv
    };
  }

}

const $CNH3$var$__private = new WeakMap();

const $CNH3$var$__map = map => $CNH3$var$__private.get(map).map;

class $CNH3$export$EquivMap extends Map {
  static fromObject(obj, opts) {
    const m = new $CNH3$export$EquivMap(null, Object.assign({
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
      equiv: $U8cl$export$equiv,
      keys: $nNr8$export$ArraySet
    }, opts);

    $CNH3$var$__private.set(this, {
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
    return $CNH3$export$EquivMap;
  }

  get [Symbol.toStringTag]() {
    return "EquivMap";
  }

  get size() {
    return $CNH3$var$__private.get(this).keys.size;
  }

  clear() {
    const $this = $CNH3$var$__private.get(this);
    $this.keys.clear();
    $this.map.clear();
  }

  empty() {
    return new $CNH3$export$EquivMap(null, $CNH3$var$__private.get(this).opts);
  }

  copy() {
    const $this = $CNH3$var$__private.get(this);
    const m = new $CNH3$export$EquivMap();
    $CNH3$var$__private.set(m, {
      keys: $this.keys.copy(),
      map: new Map($this.map),
      opts: $this.opts
    });
    return m;
  }

  equiv(o) {
    return $vPtr$export$equivMap(this, o);
  }

  delete(key) {
    const $this = $CNH3$var$__private.get(this);
    key = $this.keys.get(key, $jIkc$export$SEMAPHORE);

    if (key !== $jIkc$export$SEMAPHORE) {
      $this.map.delete(key);
      $this.keys.delete(key);
      return true;
    }

    return false;
  }

  dissoc(keys) {
    return $VaVn$export$dissoc(this, keys);
  }

  forEach(fn, thisArg) {
    for (let pair of $CNH3$var$__map(this)) {
      fn.call(thisArg, pair[1], pair[0], this);
    }
  }

  get(key, notFound) {
    const $this = $CNH3$var$__private.get(this);
    key = $this.keys.get(key, $jIkc$export$SEMAPHORE);

    if (key !== $jIkc$export$SEMAPHORE) {
      return $this.map.get(key);
    }

    return notFound;
  }

  has(key) {
    return $CNH3$var$__private.get(this).keys.has(key);
  }

  set(key, value) {
    const $this = $CNH3$var$__private.get(this);
    const k = $this.keys.get(key, $jIkc$export$SEMAPHORE);

    if (k !== $jIkc$export$SEMAPHORE) {
      $this.map.set(k, value);
    } else {
      $this.keys.add(key);
      $this.map.set(key, value);
    }

    return this;
  }

  into(pairs) {
    return $uWkF$export$into(this, pairs);
  }

  entries() {
    return $CNH3$var$__map(this).entries();
  }

  keys() {
    return $CNH3$var$__map(this).keys();
  }

  values() {
    return $CNH3$var$__map(this).values();
  }

  opts() {
    return $CNH3$var$__private.get(this).opts;
  }

}

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
const $RoOF$export$pubsub = opts => new $RoOF$export$PubSub(opts);

class $RoOF$export$PubSub extends $kQ3j$export$Subscription {
  constructor(opts) {
    opts = opts || {};
    super(undefined, $KTbf$export$optsWithID("pubsub", {
      xform: opts.xform
    }));
    this.topicfn = opts.topic;
    this.topics = new $CNH3$export$EquivMap(undefined, {
      equiv: opts.equiv
    });
  }
  /**
   * Unsupported. Use `subscribeTopic()` instead.
   */


  subscribe() {
    return $EzWe$export$unsupported(`use subscribeTopic() instead`);
  }
  /**
   * Unsupported. Use `subscribeTopic()` instead.
   */


  transform() {
    return $EzWe$export$unsupported(`use subscribeTopic() instead`);
  }

  subscribeTopic(topicID, sub, opts) {
    let t = this.topics.get(topicID);
    !t && this.topics.set(topicID, t = $kQ3j$export$subscription());
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

    return $EzWe$export$unsupported();
  }

  done() {
    for (let t of this.topics.values()) {
      t.done();
    }

    super.done();
  }

  dispatch(x) {
    $mjlp$export$LOGGER.debug(this.id, "dispatch", x);
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

function $B10I$export$stream(src, opts) {
  return new $B10I$export$Stream(src, opts);
}

class $B10I$export$Stream extends $kQ3j$export$Subscription {
  constructor(src, opts) {
    const [_src, _opts] = $Bufo$export$isFunction(src) ? [src, opts] : [undefined, src];
    super(undefined, $KTbf$export$optsWithID("stream", _opts));
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
      $mjlp$export$LOGGER.debug(this.id, "cancel");
      const f = this._cancel;
      delete this._cancel;
      f();
    }
  }

}

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
const $napU$export$merge = opts => new $napU$export$StreamMerge(opts);

class $napU$export$StreamMerge extends $kQ3j$export$Subscription {
  constructor(opts) {
    opts = opts || {};
    super(undefined, $KTbf$export$optsWithID("streammerge", opts));
    this.sources = new Map();
    opts.src && this.addAll(opts.src);
  }

  add(src) {
    this.ensureState();
    this.sources.set(src, src.subscribe({
      next: x => {
        if (x instanceof $kQ3j$export$Subscription) {
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
const $M2dW$export$fromInterval = (delay, opts) => {
  opts = $KTbf$export$optsWithID("interval", Object.assign({
    num: Infinity
  }, opts));
  return new $B10I$export$Stream(stream => {
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
const $c4wU$export$fromRAF = opts => $av77$export$isNode() ? $M2dW$export$fromInterval(16, opts) : new $B10I$export$Stream(stream => {
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
}, $KTbf$export$optsWithID("raf", opts));

const $VCXn$export$fromAtom = (atom, opts) => {
  opts = $KTbf$export$optsWithID("atom", Object.assign({
    emitFirst: true,
    changed: (a, b) => a !== b
  }, opts));
  return new $B10I$export$Stream(stream => {
    atom.addWatch(stream.id, (_, prev, curr) => {
      if (opts.changed(prev, curr)) {
        stream.next(curr);
      }
    });
    opts.emitFirst && stream.next(atom.deref());
    return () => atom.removeWatch(stream.id);
  }, opts);
};

const $BKGr$export$fromEvent = (src, name, listenerOpts = false, streamOpts) => new $B10I$export$Stream(stream => {
  let listener = e => stream.next(e);

  src.addEventListener(name, listener, listenerOpts);
  return () => src.removeEventListener(name, listener, listenerOpts);
}, $KTbf$export$optsWithID(`event-${name}`, streamOpts));
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


const $BKGr$export$fromDOMEvent = (src, name, listenerOpts = false, streamOpts) => $BKGr$export$fromEvent(src, name, listenerOpts, streamOpts);

// ASSET: ..\..\node_modules\@thi.ng\atom\atom.js
var $MkkA$exports = {};

const $ncYv$export$toPath = path => $EzY8$export$isArray(path) ? path : $YRs3$export$isString(path) ? path.length > 0 ? path.split(".") : [] : path != null ? [path] : [];
/**
 * Takes an arbitrary object and lookup path. Descends into object along
 * path and returns true if the full path exists (even if final leaf
 * value is `null` or `undefined`). Checks are performed using
 * `hasOwnProperty()`.
 *
 * @param obj
 * @param path
 */


const $KCUZ$export$getter = path => $KCUZ$export$getterT(path);

function $KCUZ$export$getterT(path) {
  const ks = $ncYv$export$toPath(path);
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

function $u6VB$export$setterT(path) {
  const ks = $ncYv$export$toPath(path);
  let [a, b, c, d] = ks;

  switch (ks.length) {
    case 0:
      return (_, v) => v;

    case 1:
      return (s, v) => (s = $u6VB$var$_copy(s), s[a] = v, s);

    case 2:
      return (s, v) => {
        let x;
        s = $u6VB$var$_copy(s);
        s[a] = x = $u6VB$var$_copy(s[a]);
        x[b] = v;
        return s;
      };

    case 3:
      return (s, v) => {
        let x, y;
        s = $u6VB$var$_copy(s);
        s[a] = x = $u6VB$var$_copy(s[a]);
        x[b] = y = $u6VB$var$_copy(x[b]);
        y[c] = v;
        return s;
      };

    case 4:
      return (s, v) => {
        let x, y, z;
        s = $u6VB$var$_copy(s);
        s[a] = x = $u6VB$var$_copy(s[a]);
        x[b] = y = $u6VB$var$_copy(x[b]);
        y[c] = z = $u6VB$var$_copy(y[c]);
        z[d] = v;
        return s;
      };

    default:
      let f;

      for (let i = ks.length; --i >= 0;) {
        f = $u6VB$var$compS(ks[i], f);
      }

      return f;
  }
}

const $u6VB$var$_copy = s => $EzY8$export$isArray(s) ? s.slice() : Object.assign({}, s);

const $u6VB$var$compS = (k, f) => (s, v) => (s = $u6VB$var$_copy(s), s[k] = f ? f(s[k], v) : v, s);

const $W4zB$export$updateIn = (state, path, fn, ...args) => $W4zB$export$updateInT(state, path, fn, ...args);

function $W4zB$export$updateInT(state, path, fn, ...args) {
  return $u6VB$export$setterT(path)(state, fn.apply(null, (args.unshift($KCUZ$export$getterT(path)(state)), args)));
}

const $CUV2$export$getIn = (state, path) => $KCUZ$export$getterT(path)(state);

const $MVAh$export$setIn = (state, path, val) => $u6VB$export$setterT(path)(state, val);

let $EFLD$var$NEXT_ID = 0;

const $EFLD$export$nextID = () => $EFLD$var$NEXT_ID++;

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
class $LPQS$export$View {
  constructor(parent, path, tx, lazy = true, equiv = $U8cl$export$equiv) {
    this.parent = parent;
    this.id = `view-${$EFLD$export$nextID()}`;

    this.tx = tx || (x => x);

    this.path = $ncYv$export$toPath(path);
    this.isDirty = true;
    this.isLazy = lazy;
    const lookup = $KCUZ$export$getter(this.path);
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

var $MkkA$var$__decorate = $MkkA$exports && $MkkA$exports.__decorate || function (decorators, target, key, desc) {
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


let $MkkA$export$Atom = class Atom {
  constructor(val, valid) {
    if (valid && !valid(val)) {
      $htig$export$illegalState("initial state value did not validate");
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
    return this.reset($MVAh$export$setIn(this._value, path, val));
  }

  swap(fn, ...args) {
    return this.reset(fn.apply(null, [this._value, ...args]));
  }

  swapIn(path, fn, ...args) {
    return this.reset($W4zB$export$updateIn(this._value, path, fn, ...args));
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
    return new $LPQS$export$View(this, path, tx, lazy);
  }

  release() {
    delete this._watches;
    delete this._value;
    return true;
  }

};
$MkkA$export$Atom = $MkkA$var$__decorate([$haK8$export$IWatchMixin], $MkkA$export$Atom);
$MkkA$exports.Atom = $MkkA$export$Atom;
$MkkA$exports.Atom = $MkkA$export$Atom;

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
const $unsB$export$sidechainPartition = (side, opts) => new $unsB$export$SidechainPartition(side, opts);

class $unsB$export$SidechainPartition extends $kQ3j$export$Subscription {
  constructor(side, opts) {
    opts = $KTbf$export$optsWithID("sidepart", opts);
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

const $lDjW$export$trace = prefix => ({
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

let $s5qO$var$_cachedFP;
let $s5qO$var$_cachedPath;
let $s5qO$var$_cachedEPC = [];
let $s5qO$var$_cachedPathPos = [];

const $s5qO$var$cachedFP = size => $s5qO$var$_cachedFP && $s5qO$var$_cachedFP.length >= size ? $s5qO$var$_cachedFP : $s5qO$var$_cachedFP = new Int32Array(size);

const $s5qO$var$cachedPath = size => $s5qO$var$_cachedPath && $s5qO$var$_cachedPath.length >= size ? $s5qO$var$_cachedPath : $s5qO$var$_cachedPath = new Int32Array(size);

const $s5qO$var$simpleDiff = (state, src, key, logDir, mode) => {
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


const $s5qO$export$diffArray = (a, b, mode = 3, equiv = $U8cl$export$equiv) => {
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
    return $s5qO$var$simpleDiff(state, b, "adds", 1, mode);
  } else if (b == null || b.length === 0) {
    return $s5qO$var$simpleDiff(state, a, "dels", -1, mode);
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
  const path = $s5qO$var$cachedPath(size).fill(-1, 0, size);
  const fp = $s5qO$var$cachedFP(size).fill(-1, 0, size);
  const epc = $s5qO$var$_cachedEPC;
  const pathPos = $s5qO$var$_cachedPathPos;
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
          $s5qO$var$buildFullLog(epc, pathPos, state, _a, _b, reverse);
        } else {
        $s5qO$var$buildLinearLog(epc, pathPos, state, _a, _b, reverse, mode === 1
        /* ONLY_DISTANCE_LINEAR */
        );
      }
    }

  return state;
};

const $s5qO$var$buildFullLog = (epc, pathPos, state, a, b, reverse) => {
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

const $s5qO$var$buildLinearLog = (epc, pathPos, state, a, b, reverse, inclConst) => {
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

const $D8na$export$diffObject = (a, b, mode = 3
/* FULL */
, _equiv = $U8cl$export$equiv) => a === b ? {
  distance: 0
} : mode === 0
/* ONLY_DISTANCE */
? $D8na$var$diffObjectDist(a, b, _equiv) : $D8na$var$diffObjectFull(a, b, _equiv);

const $D8na$var$diffObjectDist = (a, b, _equiv) => {
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

const $D8na$var$diffObjectFull = (a, b, _equiv) => {
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

const $p4eH$var$isArray = Array.isArray;
const $p4eH$var$max = Math.max;
const $p4eH$var$OBJP = Object.getPrototypeOf({});
const $p4eH$var$FN = "function";
const $p4eH$var$STR = "string"; // child index tracking template buffer

const $p4eH$var$INDEX = (() => {
  const res = new Array(2048);

  for (let i = 2, n = res.length; i < n; i++) {
    res[i] = i - 2;
  }

  return res;
})();

const $p4eH$var$buildIndex = n => {
  if (n <= $p4eH$var$INDEX.length) {
    return $p4eH$var$INDEX.slice(0, n);
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


const $p4eH$export$diffTree = (opts, impl, parent, prev, curr, child = 0) => {
  const attribs = curr[1];

  if (attribs.__skip) {
    return;
  } // always replace element if __diff = false


  if (attribs.__diff === false) {
    $p4eH$export$releaseTree(prev);
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

  const delta = $s5qO$export$diffArray(prev, curr, 1
  /* ONLY_DISTANCE_LINEAR */
  , $p4eH$export$equiv);

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
    $p4eH$export$releaseTree(prev);
    impl.replaceChild(opts, parent, child, curr);
    return;
  }

  if ((val = prev.__release) && val !== curr.__release) {
    $p4eH$export$releaseTree(prev);
  }

  if (edits[3] !== 0) {
    $p4eH$export$diffAttributes(impl, el, prev[1], curr[1]); // if attribs changed & distance == 2 then we're done here...

    if (delta.distance === 2) {
      return;
    }
  }

  const numEdits = edits.length;
  const prevLength = prev.length - 1;
  const equivKeys = $p4eH$var$extractEquivElements(edits);
  const offsets = $p4eH$var$buildIndex(prevLength + 1);

  for (i = 2, ii = 6; ii < numEdits; i++, ii += 3) {
    status = edits[ii];
    if (!status) continue;

    if (status === -1) {
      $p4eH$var$diffDeleted(opts, impl, el, prev, curr, edits, ii, equivKeys, offsets, prevLength);
    } else {
      $p4eH$var$diffAdded(opts, impl, el, edits, ii, equivKeys, offsets, prevLength);
    }
  } // call __init after all children have been added/updated


  if ((val = curr.__init) && val != prev.__init) {
    val.apply(curr, [el, ...curr.__args]);
  }
};

const $p4eH$var$diffDeleted = (opts, impl, el, prev, curr, edits, ii, equivKeys, offsets, prevLength) => {
  const val = edits[ii + 2];

  if ($p4eH$var$isArray(val)) {
    let k = val[1].key;

    if (k !== undefined && equivKeys[k][2] !== undefined) {
      const eq = equivKeys[k];
      k = eq[0]; // LOGGER.fine(`diff equiv key @ ${k}:`, prev[k], curr[eq[2]]);

      $p4eH$export$diffTree(opts, impl, el, prev[k], curr[eq[2]], offsets[k]);
    } else {
      const idx = edits[ii + 1]; // LOGGER.fine("remove @", offsets[idx], val);

      $p4eH$export$releaseTree(val);
      impl.removeChild(el, offsets[idx]);
      $p4eH$var$incOffsets(offsets, prevLength, idx);
    }
  } else if (typeof val === $p4eH$var$STR) {
    impl.setContent(el, "");
  }
};

const $p4eH$var$diffAdded = (opts, impl, el, edits, ii, equivKeys, offsets, prevLength) => {
  const val = edits[ii + 2];

  if (typeof val === $p4eH$var$STR) {
    impl.setContent(el, val);
  } else if ($p4eH$var$isArray(val)) {
    const k = val[1].key;

    if (k === undefined || equivKeys[k][0] === undefined) {
      const idx = edits[ii + 1]; // LOGGER.fine("insert @", offsets[idx], val);

      impl.createTree(opts, el, val, offsets[idx]);
      $p4eH$var$decOffsets(offsets, prevLength, idx);
    }
  }
};

const $p4eH$var$incOffsets = (offsets, j, idx) => {
  for (; j > idx; j--) {
    offsets[j] = $p4eH$var$max(offsets[j] - 1, 0);
  }
};

const $p4eH$var$decOffsets = (offsets, j, idx) => {
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


const $p4eH$export$diffAttributes = (impl, el, prev, curr) => {
  const delta = $D8na$export$diffObject(prev, curr, 3
  /* FULL */
  , $U8cl$export$equiv);
  impl.removeAttribs(el, delta.dels, prev);
  let val = $jIkc$export$SEMAPHORE;
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

  val !== $jIkc$export$SEMAPHORE && impl.setAttrib(el, "value", val, curr);
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


const $p4eH$export$releaseTree = tag => {
  if ($p4eH$var$isArray(tag)) {
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
      $p4eH$export$releaseTree(tag[x]);
    }
  }
};

const $p4eH$var$extractEquivElements = edits => {
  let k;
  let val;
  let ek;
  const equiv = {};

  for (let i = edits.length; (i -= 3) >= 0;) {
    val = edits[i + 2];

    if ($p4eH$var$isArray(val) && (k = val[1].key) !== undefined) {
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


const $p4eH$export$equiv = (a, b) => {
  let proto;

  if (a === b) {
    return true;
  }

  if (a != null) {
    if (typeof a.equiv === $p4eH$var$FN) {
      return a.equiv(b);
    }
  } else {
    return a == b;
  }

  if (b != null) {
    if (typeof b.equiv === $p4eH$var$FN) {
      return b.equiv(a);
    }
  } else {
    return a == b;
  }

  if (typeof a === $p4eH$var$STR || typeof b === $p4eH$var$STR) {
    return false;
  }

  if ((proto = Object.getPrototypeOf(a), proto == null || proto === $p4eH$var$OBJP) && (proto = Object.getPrototypeOf(b), proto == null || proto === $p4eH$var$OBJP)) {
    return !(a.__diff === false || b.__diff === false) && $U8cl$export$equivObject(a, b, $p4eH$export$equiv);
  }

  if (typeof a !== $p4eH$var$FN && a.length !== undefined && typeof b !== $p4eH$var$FN && b.length !== undefined) {
    return $U8cl$export$equivArrayLike(a, b, $p4eH$export$equiv);
  }

  if (a instanceof Set && b instanceof Set) {
    return $U8cl$export$equivSet(a, b, $p4eH$export$equiv);
  }

  if (a instanceof Map && b instanceof Map) {
    return $U8cl$export$equivMap(a, b, $p4eH$export$equiv);
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  } // NaN


  return a !== a && b !== b;
};

const $paoD$export$SVG_NS = "http://www.w3.org/2000/svg";
const $paoD$export$ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
};
const $paoD$export$RE_TAG = /^([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?$/;
const $paoD$export$RE_ENTITY = new RegExp(`[${Object.keys($paoD$export$ENTITIES).join("")}]`, "g");
const $paoD$export$NO_SPANS = {
  button: 1,
  option: 1,
  text: 1,
  textarea: 1
};

const $paoD$var$tagMap = tags => tags.split(" ").reduce((acc, x) => (acc[x] = true, acc), {}); // tslint:disable-next-line


const $paoD$export$SVG_TAGS = $paoD$var$tagMap("animate animateColor animateMotion animateTransform circle clipPath color-profile defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font foreignObject g image line linearGradient marker mask metadata mpath path pattern polygon polyline radialGradient rect set stop style svg switch symbol text textPath title tref tspan use view"); // tslint:disable-next-line

const $paoD$export$VOID_TAGS = $paoD$var$tagMap("area base br circle col command ellipse embed hr img input keygen line link meta param path polygon polyline rect source stop track use wbr ?xml");

const $MnEL$export$css = rules => {
  let css = "",
      v;

  for (let r in rules) {
    v = rules[r];

    if ($Bufo$export$isFunction(v)) {
      v = v(rules);
    }

    v != null && (css += `${r}:${v};`);
  }

  return css;
};

const $yqXH$export$derefContext = (ctx, keys) => {
  if (ctx == null || !keys || !keys.length) return ctx;
  const res = Object.assign({}, ctx);

  for (let k of keys) {
    const v = res[k];
    $aypl$export$implementsFunction(v, "deref") && (res[k] = v.deref());
  }

  return res;
};

const $sRTa$var$isArray = $EzY8$export$isArray;
const $sRTa$var$isNotStringAndIterable = $h7C1$export$isNotStringAndIterable;

const $sRTa$var$maybeInitElement = (el, tree) => tree.__init && tree.__init.apply(tree.__this, [el, ...tree.__args]);
/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param parent
 * @param tree
 * @param insert
 */


const $sRTa$export$createTree = (opts, impl, parent, tree, insert, init = true) => {
  if ($sRTa$var$isArray(tree)) {
    const tag = tree[0];

    if (typeof tag === "function") {
      return $sRTa$export$createTree(opts, impl, parent, tag.apply(null, [opts.ctx, ...tree.slice(1)]), insert);
    }

    const attribs = tree[1];

    if (attribs.__impl) {
      return attribs.__impl.createTree(opts, parent, tree, insert, init);
    }

    const el = impl.createElement(parent, tag, attribs, insert);

    if (tree.length > 2) {
      const n = tree.length;

      for (let i = 2; i < n; i++) {
        $sRTa$export$createTree(opts, impl, el, tree[i], undefined, init);
      }
    }

    init && $sRTa$var$maybeInitElement(el, tree);
    return el;
  }

  if ($sRTa$var$isNotStringAndIterable(tree)) {
    const res = [];

    for (let t of tree) {
      res.push($sRTa$export$createTree(opts, impl, parent, t, insert, init));
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


const $sRTa$export$hydrateTree = (opts, impl, parent, tree, index = 0) => {
  if ($sRTa$var$isArray(tree)) {
    const el = impl.getChild(parent, index);

    if (typeof tree[0] === "function") {
      $sRTa$export$hydrateTree(opts, impl, parent, tree[0].apply(null, [opts.ctx, ...tree.slice(1)]), index);
    }

    const attribs = tree[1];

    if (attribs.__impl) {
      return attribs.__impl.hydrateTree(opts, parent, tree, index);
    }

    $sRTa$var$maybeInitElement(el, tree);

    for (let a in attribs) {
      a.indexOf("on") === 0 && impl.setAttrib(el, a, attribs[a]);
    }

    for (let n = tree.length, i = 2; i < n; i++) {
      $sRTa$export$hydrateTree(opts, impl, el, tree[i], i - 2);
    }
  } else if ($sRTa$var$isNotStringAndIterable(tree)) {
    for (let t of tree) {
      $sRTa$export$hydrateTree(opts, impl, parent, t, index);
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


const $sRTa$export$createElement = (parent, tag, attribs, insert) => {
  const el = $paoD$export$SVG_TAGS[tag] ? document.createElementNS($paoD$export$SVG_NS, tag) : document.createElement(tag);
  attribs && $sRTa$export$setAttribs(el, attribs);
  return $sRTa$export$addChild(parent, el, insert);
};

const $sRTa$export$createTextElement = (parent, content, insert) => $sRTa$export$addChild(parent, document.createTextNode(content), insert);

const $sRTa$export$addChild = (parent, child, insert) => parent ? insert === undefined ? parent.appendChild(child) : parent.insertBefore(child, parent.children[insert]) : child;

const $sRTa$export$getChild = (parent, child) => parent.children[child];

const $sRTa$export$replaceChild = (opts, impl, parent, child, tree, init = true) => (impl.removeChild(parent, child), impl.createTree(opts, parent, tree, child, init));

const $sRTa$export$setContent = (el, body) => el.textContent = body;

const $sRTa$export$setAttribs = (el, attribs) => {
  for (let k in attribs) {
    $sRTa$export$setAttrib(el, k, attribs[k], attribs);
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


const $sRTa$export$setAttrib = (el, id, val, attribs) => {
  if (id.startsWith("__")) return;
  const isListener = id.indexOf("on") === 0;

  if (!isListener && typeof val === "function") {
    val = val(attribs);
  }

  if (val !== undefined && val !== false) {
    switch (id) {
      case "style":
        $sRTa$export$setStyle(el, val);
        break;

      case "value":
        $sRTa$export$updateValueAttrib(el, val);
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
        isListener ? $sRTa$export$setListener(el, id.substr(2), val) : el.setAttribute(id, val === true ? "" : val);
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


const $sRTa$export$updateValueAttrib = (el, v) => {
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

const $sRTa$export$removeAttribs = (el, attribs, prev) => {
  for (let i = attribs.length; --i >= 0;) {
    const a = attribs[i];

    if (a.indexOf("on") === 0) {
      $sRTa$export$removeListener(el, a.substr(2), prev[a]);
    } else {
      el.hasAttribute(a) ? el.removeAttribute(a) : el[a] = null;
    }
  }
};

const $sRTa$export$setStyle = (el, styles) => (el.setAttribute("style", $MnEL$export$css(styles)), el);
/**
 * Adds event listener (possibly with options).
 *
 * @param el
 * @param id event name (w/o `on` prefix)
 * @param listener
 */


const $sRTa$export$setListener = (el, id, listener) => $sRTa$var$isArray(listener) ? el.addEventListener(id, ...listener) : el.addEventListener(id, listener);
/**
 * Removes event listener (possibly with options).
 *
 * @param el
 * @param id event name (w/o `on` prefix)
 * @param listener
 */


const $sRTa$export$removeListener = (el, id, listener) => $sRTa$var$isArray(listener) ? el.removeEventListener(id, ...listener) : el.removeEventListener(id, listener);

const $sRTa$export$removeChild = (parent, childIdx) => {
  const n = parent.children[childIdx];
  n !== undefined && parent.removeChild(n);
};

const $p6KX$var$isArray = $EzY8$export$isArray;
const $p6KX$var$isNotStringAndIterable = $h7C1$export$isNotStringAndIterable;
const $p6KX$var$isPlainObject = $Pfe1$export$isPlainObject;
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

const $p6KX$export$normalizeElement = (spec, keys) => {
  let tag = spec[0];
  let hasAttribs = $p6KX$var$isPlainObject(spec[1]);
  let match;
  let mtag;
  let id;
  let clazz;
  let attribs;

  if (typeof tag !== "string" || !(match = $paoD$export$RE_TAG.exec(tag))) {
    $uRQP$export$illegalArgs(`${tag} is not a valid tag name`);
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


const $p6KX$export$normalizeTree = (opts, tree) => $p6KX$var$_normalizeTree(tree, opts, opts.ctx, [0], opts.keys !== false, opts.span !== false);

const $p6KX$var$_normalizeTree = (tree, opts, ctx, path, keys, span) => {
  if (tree == null) {
    return;
  }

  if ($p6KX$var$isArray(tree)) {
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
      return $p6KX$var$_normalizeTree(tag.apply(null, [ctx, ...tree.slice(1)]), opts, ctx, path, keys, span);
    } // component object w/ life cycle methods
    // (render() is the only required hook)


    if (typeof tag.render === "function") {
      const args = [ctx, ...tree.slice(1)];
      norm = $p6KX$var$_normalizeTree(tag.render.apply(tag, args), opts, ctx, path, keys, span);

      if ($p6KX$var$isArray(norm)) {
        norm.__this = tag;
        norm.__init = tag.init;
        norm.__release = tag.release;
        norm.__args = args;
      }

      return norm;
    }

    norm = $p6KX$export$normalizeElement(tree, keys);
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
      span = span && !$paoD$export$NO_SPANS[tag];

      for (let i = 2, j = 2, k = 0, n = norm.length; i < n; i++) {
        let el = norm[i];

        if (el != null) {
          const isarray = $p6KX$var$isArray(el);

          if (isarray && $p6KX$var$isArray(el[0]) || !isarray && $p6KX$var$isNotStringAndIterable(el)) {
            for (let c of el) {
              c = $p6KX$var$_normalizeTree(c, opts, ctx, path.concat(k), keys, span);

              if (c !== undefined) {
                res[j++] = c;
              }

              k++;
            }
          } else {
            el = $p6KX$var$_normalizeTree(el, opts, ctx, path.concat(k), keys, span);

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
    return $p6KX$var$_normalizeTree(tree(ctx), opts, ctx, path, keys, span);
  }

  if (typeof tree.toHiccup === "function") {
    return $p6KX$var$_normalizeTree(tree.toHiccup(opts.ctx), opts, ctx, path, keys, span);
  }

  if (typeof tree.deref === "function") {
    return $p6KX$var$_normalizeTree(tree.deref(), opts, ctx, path, keys, span);
  }

  return span ? ["span", keys ? {
    key: path.join("-")
  } : {}, tree.toString()] : tree.toString();
};

/**
 * Default target implementation to manipulate browser DOM.
 */
const $NgEa$export$DEFAULT_IMPL = {
  createTree(opts, parent, tree, child, init) {
    return $sRTa$export$createTree(opts, this, parent, tree, child, init);
  },

  hydrateTree(opts, parent, tree, child) {
    return $sRTa$export$hydrateTree(opts, this, parent, tree, child);
  },

  diffTree(opts, parent, prev, curr, child) {
    $p4eH$export$diffTree(opts, this, parent, prev, curr, child);
  },

  normalizeTree: $p6KX$export$normalizeTree,

  getElementById(id) {
    return document.getElementById(id);
  },

  getChild: $sRTa$export$getChild,
  createElement: $sRTa$export$createElement,
  createTextElement: $sRTa$export$createTextElement,

  replaceChild(opts, parent, child, tree, init) {
    $sRTa$export$replaceChild(opts, this, parent, child, tree, init);
  },

  removeChild: $sRTa$export$removeChild,
  setContent: $sRTa$export$setContent,
  removeAttribs: $sRTa$export$removeAttribs,
  setAttrib: $sRTa$export$setAttrib
};

const $Fj0P$export$resolveRoot = (root, impl) => $YRs3$export$isString(root) ? impl.getElementById(root) : root;

/**
 * Side-effecting & stateful transducer which receives @thi.ng/hdom
 * component trees, diffs each against previous value and applies
 * required changes to browser DOM starting at given root element.
 *
 * By default, incoming values are first normalized using hdom's
 * `normalizeTree()` function and a copy of the given (optional) `ctx`
 * object is provided to all embedded component functions in the tree.
 * If the `autoDerefKeys` option is given, attempts to auto-expand/deref
 * the given keys in the user supplied context object (`ctx` option)
 * prior to *each* tree normalization. All of these values should
 * implement the thi.ng/api `IDeref` interface (e.g. atoms, cursors,
 * views, rstreams etc.). This feature can be used to define dynamic
 * contexts linked to the main app state, e.g. using derived views
 * provided by thi.ng/atom.
 *
 * If the `hydrate` option is given, the first received tree is only
 * used to inject event listeners and initialize components with
 * lifecycle `init()` methods and expects an otherwise identical,
 * pre-existing DOM. All succeeding trees are diffed then as usual.
 *
 * This transducer is primarily intended for @thi.ng/rstream dataflow
 * graph based applications, where it can be used as final leaf
 * subscription to reactively reflect UI changes back to the user,
 * without using the usual RAF update loop used by hdom by default. In
 * this setup, DOM updates will only be performed when the stream this
 * transducer is attached to emits new values (i.e. hdom component
 * trees).
 *
 * Please see here for further details:
 * https://github.com/thi-ng/umbrella/blob/master/packages/hdom/src/start.ts
 *
 * @param opts hdom options
 */
const $fEFP$export$updateDOM = (opts = {}, impl = $NgEa$export$DEFAULT_IMPL) => {
  const _opts = Object.assign({
    root: "app"
  }, opts);

  const root = $Fj0P$export$resolveRoot(_opts.root, impl);
  return $aO4q$export$scan([() => [], acc => acc, (prev, curr) => {
    _opts.ctx = $yqXH$export$derefContext(opts.ctx, _opts.autoDerefKeys);
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

// ASSET: ..\..\..\..\AppData\Local\nvs\node\10.16.2\x64\node_modules\parcel\node_modules\querystring-es3\decode.js
var $ZsgN$exports,
    $ZsgN$var$isArray,
    $ZsgN$executed = false;

// obj.hasOwnProperty(prop) will break.
function $ZsgN$var$hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function $ZsgN$init() {
  if ($ZsgN$executed) return;
  $ZsgN$executed = true;
  $ZsgN$exports = {};

  $ZsgN$exports = function (qs, sep, eq, options) {
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

      if (!$ZsgN$var$hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if ($ZsgN$var$isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  };

  $ZsgN$var$isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
}

// ASSET: ..\..\..\..\AppData\Local\nvs\node\10.16.2\x64\node_modules\parcel\node_modules\querystring-es3\encode.js
var $LpfZ$exports,
    $LpfZ$var$stringifyPrimitive,
    $LpfZ$var$isArray,
    $LpfZ$var$objectKeys,
    $LpfZ$executed = false;

function $LpfZ$var$map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];

  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }

  return res;
}

function $LpfZ$init() {
  if ($LpfZ$executed) return;
  $LpfZ$executed = true;
  $LpfZ$exports = {};

  $LpfZ$var$stringifyPrimitive = function (v) {
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

  $LpfZ$exports = function (obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';

    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return $LpfZ$var$map($LpfZ$var$objectKeys(obj), function (k) {
        var ks = encodeURIComponent($LpfZ$var$stringifyPrimitive(k)) + eq;

        if ($LpfZ$var$isArray(obj[k])) {
          return $LpfZ$var$map(obj[k], function (v) {
            return ks + encodeURIComponent($LpfZ$var$stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent($LpfZ$var$stringifyPrimitive(obj[k]));
        }
      }).join(sep);
    }

    if (!name) return '';
    return encodeURIComponent($LpfZ$var$stringifyPrimitive(name)) + eq + encodeURIComponent($LpfZ$var$stringifyPrimitive(obj));
  };

  $LpfZ$var$isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };

  $LpfZ$var$objectKeys = Object.keys || function (obj) {
    var res = [];

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    }

    return res;
  };
}

// ASSET: ..\..\..\..\AppData\Local\nvs\node\10.16.2\x64\node_modules\parcel\node_modules\querystring-es3\index.js
var $nGIe$export$parse,
    $nGIe$export$stringify,
    $nGIe$exports = {};
var $nGIe$export$decode = ($nGIe$export$parse = ($ZsgN$init(), $ZsgN$exports), $nGIe$exports.parse = $nGIe$export$parse);
$nGIe$exports.decode = $nGIe$export$decode;
var $nGIe$export$encode = ($nGIe$export$stringify = ($LpfZ$init(), $LpfZ$exports), $nGIe$exports.stringify = $nGIe$export$stringify);
$nGIe$exports.encode = $nGIe$export$encode;
// parse_URL constants
const $o53l$export$DOM = "DOM";
const $o53l$export$URL = "URL";
const $o53l$export$URL_path = "URL_path";
const $o53l$export$URL_data = "URL_data";
const $o53l$export$URL_domain = "URL_domain";
const $o53l$export$URL_subdomain = "URL_subdomain";
const $o53l$export$URL_query = "URL_query";
const $o53l$export$URL_hash = "URL_hash";
const $o53l$export$URL_page = "URL_page"; // userland router metadata constants

const $o53l$export$BODY = "BODY";
const $o53l$export$HEAD = "HEAD";
const $o53l$export$pre = "pre";
const $o53l$export$post = "post";
const $o53l$export$prefix = "prefix";
const $o53l$export$router = "router"; // state setting Command constants

const $o53l$export$sub$ = "sub$";
const $o53l$export$args = "args";
const $o53l$export$reso = "reso";
const $o53l$export$erro = "erro";
const $o53l$export$handler = "handler";
const $o53l$export$source$ = "source$";
const $o53l$export$STATE = "STATE";
const $o53l$export$PATH = "PATH"; // boot config constants

const $o53l$export$run = "run";
const $o53l$export$state = "state";
const $o53l$export$root = "root";
const $o53l$export$app = "app";
const $o53l$export$draft = "draft";
const $o53l$export$trace = "trace"; // Global state keys/constants

const $o53l$export$ROUTE_PATH = "_ROUTE_PATH";
const $o53l$export$ROUTE_LOADING = "_ROUTE_LOADING";
const $o53l$export$PAGE_TEMPLATE = "_PAGE_TEMPLATE";
const $o53l$export$ROOT = "_ROOT";
const $o53l$export$DEFAULT_CFG = {
  [$o53l$export$ROUTE_PATH]: null,
  // home page / defaults to empty path
  [$o53l$export$ROUTE_LOADING]: true,
  [$o53l$export$PAGE_TEMPLATE]: null,
  [$o53l$export$ROOT]: null
}; // Global $store$ Container from [@thi.ng/atom](http://thi.ng/atom)

let $o53l$export$$store$ = new $MkkA$export$Atom($o53l$export$DEFAULT_CFG);
/**
 *
 *  Swaps the current value at the given path/lens into the
 *  global store with that of the given value. Checks to see
 *  if that value should be either spread into an existing
 *  object or a complete replacement
 *
 */

const $o53l$export$set$State = (path, val) => $o53l$export$$store$.swapIn(path, x => !path.length && !$Pfe1$export$isPlainObject(val) ? { ...x,
  [Object.keys(val)[0]]: val
} : $Pfe1$export$isPlainObject(x) && $Pfe1$export$isPlainObject(val) ? { ...x,
  ...val
} : val); // $store$.resetIn(path, val)


let $mkih$var$fix_jsdoc;
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

const $mkih$export$fURL = (_URL, prefixRGX) => {
  // console.log("parsing...")
  let _URL_subdomain = [];
  let _URL_domain = [];
  let _URL_path = [];
  let splitRGX = /(?=\?)|(?=#)/g; // split the path on any `?` and/or `#` chars (1-3 parts)

  const parts = prefixRGX ? _URL.replace(prefixRGX, "").split(splitRGX) : _URL.split(splitRGX); // take the first component of split: the core URL

  const path_str = parts[0]; // remove the empty string between any adjacent slashes `//`

  const full_path = path_str.split("/").filter(x => x !== "");

  if (/http/i.test(_URL)) {
    // if the input URL is HTTP(S), partition into sub components
    // domain is the last two members of the 2nd component
    _URL_domain = full_path[1].split(".").slice(-2); // subdomain is anything before the domain
    // see https://stackoverflow.com/a/56921347
    // for mocking subdomain on localhost

    _URL_subdomain = full_path[1].split(".").slice(0, -2); // path is the last component in the

    _URL_path = full_path.slice(2);
  } else {
    // in the case of a relative URL `<a href="/about">
    // the relative path is the full path
    _URL_path = full_path;
  } // pull out the query component as a string


  const query_str = parts.filter(part => part.slice(0, 1) === "?")[0] || ""; // pull out the hash component as a string

  const hash_str = parts.filter(part => part.slice(0, 1) === "#")[0] || ""; // parse the query string into conventional parts using qs

  var $nGIe$$interop$default = $parcel$interopDefault($nGIe$exports);

  const _URL_query = $nGIe$$interop$default.d.parse(query_str.slice(1)); // remove the actual `#` hash character from the string


  const _URL_hash = hash_str.slice(1);

  return {
    [$o53l$export$URL]: _URL,
    [$o53l$export$URL_subdomain]: _URL_subdomain,
    [$o53l$export$URL_domain]: _URL_domain,
    [$o53l$export$URL_path]: _URL_path,
    [$o53l$export$URL_query]: _URL_query,
    [$o53l$export$URL_hash]: _URL_hash
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


let $HaQ4$var$fix_jsdoc; // prettier-ignore

const $HaQ4$export$stringify_type = x => {
  if ($Bufo$export$isFunction(x) && x.length === 0) return "THUNK";
  if ($Bufo$export$isFunction(x) && x.length > 0) return "FUNCTION";
  if ($dJae$export$isPromise(x)) return "PROMISE";
  if ($czvy$export$isObject(x)) return "OBJECT";
  return "type_str NOT FOUND";
};

let $aAYG$var$fix_jsdoc;

const $zJvm$export$stringify_w_functions = (x, indent) => JSON.stringify(x, (key, value) => {
  if (typeof value === "function") {
    return value.toString().replace(/\r?\n|\r/g, "").replace(/\s\s+/g, " ").slice(0, 12) + "...";
  } else {
    return value;
  }
}, indent);

const $zJvm$export$key_index_err = (c, i) => {
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
};
/**
 *
 * `uknown_key_ERR`
 *
 * Just a  little error for people defining commands
 * that makes sure their keys don't contain typos
 */


const $zJvm$export$x_key_ERR = (str, c, unknown, sub$, index) => {
  let {
    source$
  } = c;
  let count = Object.entries(c).length;
  return `

  🔥 ${str} ERROR:
  
  🔥 Unrecognized Command Key(s)
  
  FAULTY sub$: "${sub$}" 
  ${Object.keys(unknown)[0][0] ? `
  ${index ? $zJvm$export$key_index_err(c, index) : ""}

  The problematic entry/entries: 

  🤔 ${!index && count > 3 && !source$ ? `${Object.entries(unknown)[0][0]}: <Stream>` : $zJvm$export$stringify_w_functions(unknown, 2)}` : ""} 🤔

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

// import { memoize1 } from "@thi.ng/memoize"
const $GCJh$export$insulated = {
  /**
   * Init lifecycle method. In the base case, this is only
   * used to cache this component's actual root DOM element.
   *
   * @param el
   */
  el: null,

  init(el) {
    this.el = el;
  },

  /**
   * Call this function with any args usually given to your
   * component when a re-render of this component's sub-tree
   * is required. The component should set the `__diff` hdom
   * behavior control attribute of the root element to
   * false, to avoid potential clashes with future diffs
   * during a full DOM update.
   *
   * @param args - component args
   */
  isorender(...args) {
    const el = this.el;
    const children = el.parentElement.children;

    for (let i = children.length; --i >= 0;) {
      if (children[i] === el) {
        $sRTa$export$replaceChild({}, $NgEa$export$DEFAULT_IMPL, this.el.parentElement, i, $p6KX$export$normalizeTree({}, [this, ...args]), true);
        return;
      }
    }
  }

}; // Dummy test component with local on-demand re-render

/*
const Foo = id => ({
  ...insulated,
  id,
  col: COLORS.next().value,
  render(ctx, time) {
    this.time = time
    return [
      `div.dib.w4.br2.pa2.mr2.tc.nosel.bg-${this.col}`,
      {
        // important (see comment further above)
        __diff: false,
        // pick new color and immediately re-render this
        // component's subtree
        onclick: () => {
          this.col = COLORS.next().value
          this.isorender(this.time)
        }
      },
      `${this.id}: ${time}`
    ]
  }
})

// Memoized component factory. This is needed to preserve
// local state and avoid the infectious behavior of HOF
// component initialization propagating up the component
// tree... Also see other versions of `memoize` available
// (http://thi.ng/memoize) In general, only pass component
// unique base config or IDs to the memoized function,
// **NOT** any dynamically changing state (e.g. not the
// `time` state value below). Such state can still be passed
// to the memoized component via `[component, ...arg]`.
// However, the args given to the factory are only used as
// cache key to find an already memoized component...
const foo = memoize1(id => Foo(id))
const app = ({ time }) => [
  "div",
  {},
  // use memoized components (lazy invocation): the
  // `foo(id)` calls merely return the memoized component
  // (or, in the first frame, actually create the
  // components, and which are then cached, i.e.
  // memoized...)
  [foo("a"), time],
  [foo("b"), time],
  [foo("c"), time]
]

*/

const $OuDe$export$keys_diff = (known_keys = [], known_obj = {}) => {
  let all = Object.keys(known_obj);
  let uknown_keys = all.filter(key => !known_keys.includes(key));
  let uknown_obj = Object.entries(known_obj).reduce((a, [k, v]) => {
    if (!known_keys.includes(k)) return { ...a,
      [k]: v
    };else return a;
  }, {});
  return [uknown_keys, uknown_obj];
}; // keys_diff(["a", "b"], { a: 1, b: 2, c: 3, d: 4 })
// => [ [ 'c', 'd' ], { c: 3, d: 4 } ]


let $N7il$var$err_str = "Spool Interupted";

let $N7il$var$no_sub$_err = (c, i) => console.warn(`
  🔥 No sub$ included for a Command with a primitive for 'args'. 
  🔥 Ergo, nothing was done with this Command: 
  
  ${JSON.stringify(c)}
  
  ${$zJvm$export$key_index_err(c, i)}
  
  Hope that helps!
  `);
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


const $N7il$export$spool = task_array => task_array.reduce(async (a, c, i) => {
  const acc = await a; // console.log("ACCUMULATOR =>", acc)

  if ($Bufo$export$isFunction(c)) {
    try {
      let recur = c(acc); // this ensures the accumulator is preserved between
      // stacks

      recur.unshift({
        [$o53l$export$args]: acc
      });
      return $N7il$export$spool(recur);
    } catch (e) {
      console.warn($N7il$var$err_str, e);
      return;
    }
  }

  let _sub$ = c[$o53l$export$sub$];
  let _args = c[$o53l$export$args];
  let _erro = c[$o53l$export$erro];
  let _reso = c[$o53l$export$reso]; // let _source$ = c[source$]
  // let _handler = c[handler]

  let knowns = [$o53l$export$sub$, $o53l$export$args, $o53l$export$reso, $o53l$export$erro, $o53l$export$source$, $o53l$export$handler];
  let [unknowns] = $OuDe$export$keys_diff(knowns, c);
  if (unknowns.length > 0) throw new Error($zJvm$export$x_key_ERR($N7il$var$err_str, c, unknowns, _sub$, i));
  let arg_type = $HaQ4$export$stringify_type(_args);
  let result = _args;
  /* RESOLVING ARGS */

  if (arg_type !== "PROMISE" && _reso) {
    // if some signature needs to deal with both promises
    // and non-promises, non-promises are wrapped in a
    // Promise to "lift" them into the proper context for
    // handling
    result = Promise.resolve(_args);
  }

  if (_args !== Object(_args) && !_sub$) {
    $N7il$var$no_sub$_err(c, i);
    return acc;
  }

  if (arg_type === "PROMISE") {
    // result = await discardable(args).catch(e => e)
    result = await _args.catch(e => e);
  }

  if (arg_type === "THUNK") {
    // if thunk, dispatch to ad-hoc stream, return acc
    // as-is ⚠ this command will not be waited on
    result = _args();
    console.log(`dispatching to ad-hoc stream: ${_sub$.id}`);

    _sub$.next(result); // 💃


    return acc;
  }

  if (arg_type === "FUNCTION") {
    // if function, call it with acc and resolve any
    // promises
    let temp = _args(acc); // result = isPromise(temp) ? await discardable(temp).catch(e => e) : temp


    result = $dJae$export$isPromise(temp) ? await temp.catch(e => e) : temp;
  }

  if (arg_type === "OBJECT") {
    // if object, send the Command as-is and spread into
    // acc
    if (!_sub$) return { ...acc,
      ..._args
    };
    $skAQ$export$command$.next(c);
    return { ...acc,
      ..._args
    };
  }
  /* RESULT HANDLERS */


  if (_reso) {
    // promise rejection handler
    if (_erro & result instanceof Error) {
      let error = $o53l$export$erro(acc, result);
      if (error._sub$) return $skAQ$export$command$.next(error);
      console.warn($N7il$var$err_str, "[ Promise rejected ]:", result);
      result = error;
    } // resovled promise handler


    if (!(result instanceof Error)) {
      let resolved = _reso(acc, result);

      if (resolved._sub$) $skAQ$export$command$.next(resolved); // resolved promise with no _sub$ key -> spread
      // resolved value into acc
      else if (!_sub$) return { ...acc,
          ...resolved
        };
      result = resolved;
    }

    console.warn(`no 'erro' (Error handler) set for ${c}`);
  } // no _sub$ key & not a promise -> just spread into acc


  if (!_reso && !_sub$) return { ...acc,
    ...result
  }; // error, but no error handler

  if (result instanceof Error) {
    console.warn($N7il$var$err_str, result);
    return acc;
  }

  if (result !== Object(result)) {
    if (!_sub$) {
      $N7il$var$no_sub$_err(c, i);
      return acc;
    } // if the final result is primitive, you can't refer
    // to this value in proceeding Commands -> send the
    // Command as-is, return acc as-is.


    $skAQ$export$command$.next({
      [$o53l$export$sub$]: _sub$,
      [$o53l$export$args]: result
    });
    return acc;
  } // if the result has made it this far, send it along
  // console.log(`${sub$} made it through`)


  $skAQ$export$command$.next({
    [$o53l$export$sub$]: _sub$,
    [$o53l$export$args]: result
  });
  return { ...acc,
    ...result
  };
}, Promise.resolve({}));

const $skAQ$export$log$ = $B10I$export$stream().subscribe($lDjW$export$trace("log$ -> "), {
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

const $skAQ$export$run$ = $RoOF$export$pubsub({
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

const $skAQ$export$out$ = $RoOF$export$pubsub({
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

const $skAQ$export$command$ = $skAQ$export$run$.subscribeTopic(true, {
  next: x => $skAQ$export$out$.next(x),
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

const $skAQ$export$task$ = $skAQ$export$run$.subscribeTopic(false, {
  next: $N7il$export$spool,
  error: console.warn
}, {
  id: "task$_stream"
});
const $skAQ$export$popstate$ = $BKGr$export$fromDOMEvent(window, "popstate");
const $skAQ$export$DOMContentLoaded$ = $BKGr$export$fromDOMEvent(window, "DOMContentLoaded"); // example of custom stream dispatch (logging)

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
 *
 * see _HURL in `/commands/routing.js` for ad-hoc stream
 * injection example
 */

const $skAQ$export$DOMnavigated$ = $napU$export$merge({
  src: [$skAQ$export$popstate$, $skAQ$export$DOMContentLoaded$]
}).transform($WUst$export$map(x => ({
  [$o53l$export$URL]: x.target.location.href,
  [$o53l$export$DOM]: x.currentTarget
})));

// import { log$ } from "../streams"
// import scrolly from "@mapbox/scroll-restorer"
const $zvTi$export$__URL__ROUTE = CFG => {
  let __router, __pre, __post, __prefix;

  if ($czvy$export$isObject(CFG)) {
    let _router = CFG[$o53l$export$router];
    let _pre = CFG[$o53l$export$pre];
    let _post = CFG[$o53l$export$post];

    let _prefix = CFG[$o53l$export$prefix] || null;

    const escRGX = /[-/\\^$*+?.()|[\]{}]/g;

    const escaped = string => string.replace(escRGX, "\\$&");

    const RGX = _prefix ? new RegExp(escaped(_prefix), "g") : null; // console.log({ router, pre, post })

    __router = _router;
    __pre = $czvy$export$isObject(_pre) ? [_pre] : _pre || [];
    __post = $czvy$export$isObject(_post) ? [_post] : _post || [];
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
    [$o53l$export$args]: __prefix ? __router(acc[$o53l$export$URL].replace(__prefix, "")) : __router(acc[$o53l$export$URL]),
    [$o53l$export$reso]: (_acc, _res) => ({
      [$o53l$export$URL_page]: _res[$o53l$export$URL_page],
      [$o53l$export$URL_data]: _res[$o53l$export$URL_data]
    }),
    [$o53l$export$erro]: (_acc, _err) => console.warn("Error in __URL__ROUTE:", _err, "constructed:", _acc)
  }, {
    [$o53l$export$args]: __prefix ? $mkih$export$fURL(acc[$o53l$export$URL], __prefix) : $mkih$export$fURL(acc[$o53l$export$URL])
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
  { ...$o7zf$export$__SET_STATE,
    args: _acc => ({
      [$o53l$export$STATE]: _acc[$o53l$export$URL_path],
      [$o53l$export$PATH]: [$o53l$export$ROUTE_PATH]
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


const $zvTi$export$__URL_DOM__ROUTE = CFG => {
  // autoscroll view into position
  // scrolly.start()
  // instantiate router
  let match = $zvTi$export$__URL__ROUTE(CFG);
  return acc => [{ ...$o7zf$export$__SET_STATE,
    args: {
      [$o53l$export$PATH]: [$o53l$export$ROUTE_LOADING],
      [$o53l$export$STATE]: true
    }
  }, { ...$n9Ph$export$__HREF_PUSHSTATE_DOM,
    args: {
      [$o53l$export$URL]: acc[$o53l$export$URL],
      [$o53l$export$DOM]: acc[$o53l$export$DOM]
    }
  }, // example Subtask injection
  _acc => match({
    [$o53l$export$URL]: _acc[$o53l$export$URL]
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
  { ...$o7zf$export$__SET_STATE,
    args: _acc => ({
      [$o53l$export$PATH]: [$o53l$export$PAGE_TEMPLATE],
      [$o53l$export$STATE]: _acc[$o53l$export$URL_page]
    })
  }, { ...$o7zf$export$__SET_STATE,
    args: _acc => ({
      [$o53l$export$PATH]: _acc[$o53l$export$URL_path],
      [$o53l$export$STATE]: _acc[$o53l$export$URL_data][$o53l$export$BODY] || _acc[$o53l$export$URL_data]
    })
  }, // wait on pending promise(s) w/a non-nullary fn (+)=>
  // { ...__SET_ROUTER_LOADING_STATE, args: _ => false },
  // example ad-hoc stream injection
  // { sub$: log$, args: () => ({ DOM }) },
  $n9Ph$export$__SET_LINK_ATTRS_DOM, { ...$o7zf$export$__SET_STATE,
    args: _ => ({
      [$o53l$export$PATH]: [$o53l$export$ROUTE_LOADING],
      [$o53l$export$STATE]: false
    })
  }, $n9Ph$export$__NOTIFY_PRERENDER_DOM];
};

const $vRmK$var$err_str = "registerCMD";

const $vRmK$var$feedCMD$fromSource$ = cmd => {
  let _sub$ = cmd[$o53l$export$sub$];
  let _args = cmd[$o53l$export$args];
  let args_is_fn = $Bufo$export$isFunction(_args);

  let deliver = x => ({
    [$o53l$export$sub$]: _sub$,
    [$o53l$export$args]: _args(x)
  });

  let delivery = {
    [$o53l$export$sub$]: _sub$,
    [$o53l$export$args]: _args
  };

  let feed = $ => args_is_fn ? $WUst$export$map(x => $.next(deliver(x))) : $WUst$export$map(() => $.next(delivery)); // looks for the `sub$` key to determine if its a command


  return cmd[$o53l$export$source$].subscribe(feed($skAQ$export$command$));
}; //   let args_is_fn = isFunction(args)
//   let deliver = x => ({ sub$, args: args(x) })
//   let delivery = { sub$, args }
//   let feed = $ =>
//     args_is_fn ? map(x => $.next(deliver(x))) : map(() => $.next(delivery))
//   return source$.subscribe(feed(command$))
// }

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


let $vRmK$var$registered = new $CNH3$export$EquivMap();

function $vRmK$export$registerCMD(command) {
  // 📌 TODO: register factory function
  let _sub$ = command[$o53l$export$sub$];
  let _args = command[$o53l$export$args];
  let _erro = command[$o53l$export$erro];
  let _reso = command[$o53l$export$reso];
  let _source$ = command[$o53l$export$source$];
  let _handler = command[$o53l$export$handler];
  let knowns = [$o53l$export$sub$, $o53l$export$args, $o53l$export$reso, $o53l$export$erro, $o53l$export$source$, $o53l$export$handler];
  let [unknowns] = $OuDe$export$keys_diff(knowns, command); // console.log({ knowns, all, unknowns })

  /**
   * destructure the args component out of the emissions
   * to save the user from having to do that PITA everytime
   */

  if (unknowns.length > 0) {
    throw new Error($zJvm$export$x_key_ERR($vRmK$var$err_str, command, unknowns, _sub$, undefined));
  }

  if (_source$) $vRmK$var$feedCMD$fromSource$(command); // more: https://github.com/thi-ng/umbrella/blob/develop/examples/rstream-event-loop/src/events.ts

  $skAQ$export$out$.subscribeTopic(_sub$, {
    next: _handler,
    error: console.warn
  }, $WUst$export$map(emissions => emissions[$o53l$export$args]));
  let CMD = _reso ? {
    [$o53l$export$sub$]: _sub$,
    [$o53l$export$args]: _args,
    [$o53l$export$reso]: _reso,
    [$o53l$export$erro]: _erro
  } : {
    [$o53l$export$sub$]: _sub$,
    [$o53l$export$args]: _args
  }; // Set.add not supported by IE

  if ($vRmK$var$registered.set) {
    if ($vRmK$var$registered.has(_sub$)) {
      throw new Error(`

🔥 duplicate \`sub$\` value detected in Command:
${$zJvm$export$stringify_w_functions(CMD)}
existing registered Commands:
${JSON.stringify([...$vRmK$var$registered.keys()], null, 2)}
🔥 Please use a different/unique Command \`sub$\` string

🔎 Inspect existing Commands using js Map API \`registerCMD.all\`
🔎 (\`registerCMD.all.entries()\`, \`registerCMD.all.has("X")\`, etc.)

        `);
    }

    $vRmK$var$registered.set(_sub$, CMD);
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


$vRmK$export$registerCMD.all = $vRmK$var$registered;
/**
 *
 * expects payload of
 * ```
 * { target: { location: { href } }, currentTarget }
 * ```
 */

const $vRmK$export$registerRouterDOM = router => {
  console.log("DOM Router Registered");
  const taskFrom = $zvTi$export$__URL_DOM__ROUTE(router);
  return $vRmK$export$registerCMD({
    [$o53l$export$source$]: $skAQ$export$DOMnavigated$,
    [$o53l$export$sub$]: "_URL_NAVIGATED$_DOM",
    [$o53l$export$args]: x => x,
    [$o53l$export$handler]: args => $skAQ$export$run$.next(taskFrom({
      [$o53l$export$URL]: args[$o53l$export$URL],
      [$o53l$export$DOM]: args[$o53l$export$DOM]
    }))
  });
};

const $vRmK$var$pre = (ctx, body) => (console.log(`no \`app\` component provided to \`${$vRmK$export$boot.name}({${$o53l$export$app}})\`. Rendering state by route path`), ["pre", JSON.stringify(body[1], null, 2)]);
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


const $vRmK$export$boot = async CFG => {
  // console.log({ URL_page })
  const _root = CFG[$o53l$export$root] || document.body;

  const _app = CFG[$o53l$export$app] || $vRmK$var$pre;

  const _draft = CFG[$o53l$export$draft];
  const _router = CFG[$o53l$export$router];
  const _trace = CFG[$o53l$export$trace];
  const knowns = [$o53l$export$root, $o53l$export$app, $o53l$export$draft, $o53l$export$router, $o53l$export$trace];
  const [, others] = $OuDe$export$keys_diff(knowns, CFG);
  const escRGX = /[-/\\^$*+?.()|[\]{}]/g;

  const escaped = string => string.replace(escRGX, "\\$&");

  const _prefix = _router[$o53l$export$prefix] || null;

  const RGX = _prefix ? new RegExp(escaped(_prefix || ""), "g") : null;
  if (_router) $vRmK$export$registerRouterDOM(_router);
  const state$ = $VCXn$export$fromAtom($o53l$export$$store$);

  const shell = state$ => (_trace ? console.log(_trace, state$) : null, state$[$o53l$export$ROUTE_LOADING] ? null : [_app, [state$[$o53l$export$PAGE_TEMPLATE], $CUV2$export$getIn(state$, state$[$o53l$export$ROUTE_PATH])]]);

  if (_draft) $o53l$export$$store$.swap(x => ({ ..._draft,
    ...x
  }));
  $o53l$export$$store$.resetIn($o53l$export$ROOT, _root);
  state$.subscribe($unsB$export$sidechainPartition($c4wU$export$fromRAF())).transform($WUst$export$map($eOoC$export$peek), $WUst$export$map(shell), $fEFP$export$updateDOM({
    root: _root,
    span: false,
    ctx: {
      [$o53l$export$run]: x => $skAQ$export$run$.next(x),
      [$o53l$export$state]: $o53l$export$$store$,
      // remove any staging path components (e.g., gh-pages)
      [$mkih$export$fURL.name]: () => // console.log({ fURL }),
      $mkih$export$fURL(window.location.href, RGX),
      // <- 🔍
      ...others
    }
  }));
};

/**
 * we need to transform the payload to align with the
 * object structure of the native DOM events ('popstate'
 * and 'DOMContentLoaded') payloads, so they're
 * transformed correctly by the `navigated$` stream
 * transforms
 */
const $n9Ph$export$HURLer = ev => {
  // ev.preventDefault()
  // console.log({ e })
  let href = ev.target.href;
  let w_href = window.location.href;
  let parsed = $mkih$export$fURL(w_href);
  let w_path = `/${parsed[$o53l$export$URL_path].join("/")}`; // handle both absolute and root relative paths

  if (href === w_href || href === w_path) return;
  $skAQ$export$DOMnavigated$.next({
    target: {
      location: {
        href
      }
    },
    currentTarget: ev.currentTarget
  });
  return ev;
};

const $n9Ph$export$HURL = $vRmK$export$registerCMD({
  [$o53l$export$sub$]: "HURL",
  [$o53l$export$args]: ev => ev,
  [$o53l$export$handler]: $n9Ph$export$HURLer
});

const $n9Ph$var$setLinkAttrs = target => {
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


const $n9Ph$export$__SET_LINK_ATTRS_DOM = $vRmK$export$registerCMD({
  [$o53l$export$sub$]: "__SET_LINK_ATTRS_DOM",
  [$o53l$export$args]: acc => ({
    [$o53l$export$DOM]: acc[$o53l$export$DOM]
  }),
  [$o53l$export$handler]: args => $n9Ph$var$setLinkAttrs(args[$o53l$export$DOM])
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

const $n9Ph$export$__HREF_PUSHSTATE_DOM = $vRmK$export$registerCMD({
  [$o53l$export$sub$]: "__HREF_PUSHSTATE_DOM",
  [$o53l$export$args]: acc => ({
    [$o53l$export$URL]: acc[$o53l$export$URL],
    [$o53l$export$DOM]: acc[$o53l$export$DOM]
  }),
  [$o53l$export$handler]: args => !args[$o53l$export$DOM].document ? history.pushState($mkih$export$fURL(args[$o53l$export$URL]), null, args[$o53l$export$URL]) : null
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

const $n9Ph$export$__NOTIFY_PRERENDER_DOM = $vRmK$export$registerCMD({
  [$o53l$export$sub$]: "__NOTIFY_PRERENDER_DOM",
  [$o53l$export$args]: true,
  //👀 for prerenderer,
  [$o53l$export$handler]: () => document.dispatchEvent(new Event("rendered"))
});

const $wFfN$export$setFavicon = href => {
  let link = document.querySelector("link[rel*='icon']") || document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = href;
  document.getElementsByTagName("head")[0].appendChild(link);
};

const $wFfN$export$replaceMeta = (obj = $wFfN$var$defalt_cfg) => {
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
        HEAD_favicon: () => $wFfN$export$setFavicon(val)
      }[key]();
    } catch (e) {
      console.warn(e);
    }
  });
};

const $wFfN$var$defalt_cfg = {
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

const $wFfN$export$HEAD_CMD = ({
  title = $wFfN$var$defalt_cfg.meta.title,
  description = $wFfN$var$defalt_cfg.meta["og:description"],
  image: {
    url = $wFfN$var$defalt_cfg.meta["og:image"],
    height = $wFfN$var$defalt_cfg.meta["og:image:height"],
    width = $wFfN$var$defalt_cfg.meta["og:image:width"]
  },
  favicon = $wFfN$var$defalt_cfg.favicon,
  type = $wFfN$var$defalt_cfg.meta["og:type"]
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

const $wFfN$export$INJECT_HEAD = $vRmK$export$registerCMD({
  // source$: DOMnavigated$,
  [$o53l$export$sub$]: "INJECT_HEAD",
  [$o53l$export$args]: acc => ({
    [$o53l$export$URL_data]: acc[$o53l$export$URL_data]
  }),
  [$o53l$export$handler]: ({
    [$o53l$export$URL_data]: {
      [$o53l$export$HEAD]: {
        title,
        description,
        image,
        favicon,
        type
      }
    }
  }) => $wFfN$export$replaceMeta($wFfN$export$HEAD_CMD({
    title,
    description,
    image,
    favicon,
    type
  }))
});

//  _d88__  e88~-_   e88~\888  e88~-_
//   888   d888   i d888  888 d888   i
//   888   8888   | 8888  888 8888   |
//   888   Y888   ' Y888  888 Y888   '
//   "88_/  "88_-~   "88_/888  "88_-~
//
//
function $qRDr$export$getRect(element, frame) {
  const {
    top,
    bottom,
    left,
    right,
    width,
    height
  } = element.getBoundingClientRect();
  let parent = frame ? frame.getBoundingClientRect() : null;
  return {
    top: top - (parent ? parent.top : 0),
    bottom,
    left: left - (parent ? parent.left : 0),
    right,
    width,
    height
  };
}

const $qRDr$var$zoom_paths = uid => ({
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
 */


const $qRDr$export$FLIP_first = ({
  state,
  id,
  target
}) => {
  // 📌 TODO: GOOD PLACE FOR AN `onStart` hook animation/callback
  let {
    rects,
    clicks,
    scrolls
  } = $qRDr$var$zoom_paths(id); // sets the rect in state for next el init to sniff

  let flip_map = $qRDr$export$getRect(target);
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


const $qRDr$var$zIndex = (el, idx) => el.style.zIndex = idx;
/**
 * 1. if it has been clicked that means the last thing
 *    that happened was a click that triggered this init
 *    so we do the calcs
 *
 * 2. if a back/nav (no frame) event was what triggered
 *    the init do the calcs with no frame
 */


const $qRDr$export$FLIP_last_invert_play = ({
  element,
  state,
  id,
  // just baffle them with https://cubic-bezier.com/
  transition = "all .3s cubic-bezier(.54,-0.29,.17,1.11)"
}) => {
  element.setAttribute("flip", id);
  let {
    rects,
    clicks,
    scrolls
  } = $qRDr$var$zoom_paths(id);
  let F_flip_map = $CUV2$export$getIn(state.deref(), rects) || null; // NO RECT => NOT CLICKED

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

  let L_flip_map = $qRDr$export$getRect(element); // recalc rect if out of initial view after scrolling into view

  if (Math.abs(F_flip_map.top - L_flip_map.top) > window.innerHeight) {
    element.scrollIntoView();
    L_flip_map = $qRDr$export$getRect(element);
  }

  let Tx = F_flip_map.left - L_flip_map.left;
  let Ty = F_flip_map.top - L_flip_map.top;
  let Sx = F_flip_map.width / L_flip_map.width;
  let Sy = F_flip_map.height / L_flip_map.height; // 🕕 just before "Last", scroll element to middle of page
  // let top = L_flip_map.top + window.pageYOffset

  let {
    x,
    y
  } = $CUV2$export$getIn(state.deref(), scrolls); // top - window.innerHeight / 2

  window.scrollTo(x, y); // console.log({ Tx, Ty, Sx, Sy })

  element.style.transformOrigin = "top left";
  element.style.transition = "";
  let trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`;
  element.style.transform = trans; // PLAY

  requestAnimationFrame(() => {
    // 🕤 just before animating, scroll to new location
    window.scrollTo(x, y); // element.style.transformOrigin = "top left"

    element.style.transition = transition;
    element.style.transform = "none"; // 💩 hack for removing zIndex after animation is complete
    // 📌 TODO:    🔻 GOOD PLACE FOR AN `onComplete` hook animation/callback

    setTimeout(() => $qRDr$var$zIndex(element, 0), 200);
  }); // move element to front

  $qRDr$var$zIndex(element, 1); // 🔍 consider exposing in the API

  let clicked = $CUV2$export$getIn(state.deref(), clicks) || null;

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
 *  - rect registered
 *  - frame registered
 * - navs
 * - on init of new DOM
 *  - checks for rect & frame
 *  - uses rect & frame to calc diff
 *  - PLAY
 */


const $qRDr$var$state = new $MkkA$export$Atom({});
const $qRDr$export$_F_LIP = $vRmK$export$registerCMD({
  [$o53l$export$sub$]: "_F_LIP",
  [$o53l$export$args]: x => x,
  [$o53l$export$handler]: ({
    id,
    target
  }) => $qRDr$export$FLIP_first({
    id,
    target,
    state: $qRDr$var$state
  })
});
const $qRDr$export$F_LIP_ = $vRmK$export$registerCMD({
  [$o53l$export$sub$]: "F_LIP_",
  [$o53l$export$args]: x => x,
  [$o53l$export$handler]: ({
    id,
    element
  }) => $qRDr$export$FLIP_last_invert_play({
    id,
    element,
    state: $qRDr$var$state
  })
});
const $o7zf$export$__SET_STATE = $vRmK$export$registerCMD({
  [$o53l$export$sub$]: "__SET_STATE",
  [$o53l$export$args]: x => x,
  [$o53l$export$handler]: args => $o53l$export$set$State(args[$o53l$export$PATH], args[$o53l$export$STATE])
});

const $Fx88$var$err_str = prop => `
  No '${prop}' property found on FLIPkid firstChild. 
  Ensure you are providing FLIPkid a component with an 
  attributes object as its second argument with a ${prop}
  property for proper FLIP routing.
`; // const [tag, attrs, ..._args] = kid(ctx, ...args)
// const { href } = attrs


const $Fx88$var$simEvent = href => ({
  currentTarget: {
    document: null
  },
  target: {
    href
  }
});

const $Fx88$export$FLIPkid = Object.freeze({
  render: (ctx, ...rest) => // console.log("FLIPkid"),
  ["div", {
    onclick: ev => {
      ev.preventDefault();
      const target = ev.target;
      const href = target.getAttribute("href"); // console.log({ target, href })

      if (!href) return new Error($Fx88$var$err_str("href"));
      ctx[$o53l$export$run]([{ ...$n9Ph$export$HURL,
        [$o53l$export$args]: $Fx88$var$simEvent(href)
      }, { ...$qRDr$export$_F_LIP,
        [$o53l$export$args]: {
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
    console.log("FLIPkid_init");
    ctx[$o53l$export$run]({ ...$qRDr$export$F_LIP_,
      [$o53l$export$args]: {
        element: el.firstChild,
        id: el.firstChild.getAttribute("href")
      }
    });
  }
});
/* OLD (non FRP) APPROACH
let attrs = {
  onclick: ev => {
    ev.preventDefault()
    const target = ev.target
    const href = target.getAttribute("href")
    // console.log({ target, href })
    if (!href) return new Error(err_str("href"))
    HURL(synthEvent(href))
    FLIP_first({
      state: $FLIP$,
      id: href,
      target
    })
  }
}

export const FLIPkid = {
  render: (ctx, ...args) => ["a", attrs, ...args],
  init: el =>
    // console.log({
    //   el,
    //   firstChild: el.firstChild,
    //   id: el.firstChild.getAttribute("href")
    // }),
    FLIP_last_invert_play({
      el: el.firstChild,
      state: $FLIP$,
      id: el.firstChild.getAttribute("href")
    })
}
*/

// and https://tailwindcss.com/components
const $QcZX$export$borderWidths = {
  px: "1px",
  "0": "0",
  "2": "2px",
  "4": "4px",
  "8": "8px"
};
const $QcZX$export$breakpoints = ["640px", "768px", "1024px", "1280px"];
const $QcZX$export$baseColors = {
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
const $QcZX$var$commonButtonStyles = {
  py: 2,
  px: 3,
  cursor: "pointer",
  fontSize: "100%",
  lineHeight: "inherit",
  whiteSpace: "nowrap"
};
const $QcZX$export$buttons = {
  simple: { ...$QcZX$var$commonButtonStyles,
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
  pill: { ...$QcZX$var$commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "full",
    "&:hover": {
      backgroundColor: "primaryHover"
    }
  },
  outline: { ...$QcZX$var$commonButtonStyles,
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
  bordered: { ...$QcZX$var$commonButtonStyles,
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
  disabled: { ...$QcZX$var$commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    opacity: 0.5,
    cursor: "not-allowed",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default"
  },
  "3D": { ...$QcZX$var$commonButtonStyles,
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
  elevated: { ...$QcZX$var$commonButtonStyles,
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
const $QcZX$export$colors = { ...$QcZX$export$baseColors,
  grayDark: $QcZX$export$baseColors.gray[8],
  text: $QcZX$export$baseColors.gray[8],
  background: $QcZX$export$baseColors.white,
  primary: $QcZX$export$baseColors.blue[7],
  primaryHover: $QcZX$export$baseColors.blue[8],
  secondary: $QcZX$export$baseColors.gray[6],
  muted: $QcZX$export$baseColors.gray[3],
  success: $QcZX$export$baseColors.green[3],
  info: $QcZX$export$baseColors.blue[4],
  warning: $QcZX$export$baseColors.yellow[3],
  danger: $QcZX$export$baseColors.red[3],
  light: $QcZX$export$baseColors.gray[1],
  dark: $QcZX$export$baseColors.gray[8],
  textMuted: $QcZX$export$baseColors.gray[6]
};
const $QcZX$export$baseFonts = {
  sans: '"Open Sans", system-ui',
  serif: "Merriweather, system-ui",
  mono: '"Fira Code",monospace'
};
const $QcZX$export$fonts = { ...$QcZX$export$baseFonts,
  body: $QcZX$export$baseFonts.sans,
  heading: $QcZX$export$baseFonts.serif,
  monospace: $QcZX$export$baseFonts.mono
};
const $QcZX$export$fontSizes = ["0.875rem", "1rem", "1.25rem", "1.5rem", "1.875rem", "2.25rem", "3rem", "4rem", "4.5rem"];
const $QcZX$export$baseFontWeights = {
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
const $QcZX$export$fontWeights = { ...$QcZX$export$baseFontWeights,
  body: $QcZX$export$baseFontWeights.normal,
  heading: $QcZX$export$baseFontWeights.bold
};
const $QcZX$var$commonInputStyles = {
  py: 2,
  px: 3,
  fontSize: "100%",
  borderRadius: "default",
  appearance: "none",
  lineHeight: "tight"
};
const $QcZX$export$inputs = {
  shadow: { ...$QcZX$var$commonInputStyles,
    border: "none",
    color: "gray.7",
    boxShadow: "default",
    "&:focus": {
      outline: "none",
      boxShadow: "outline"
    }
  },
  inline: { ...$QcZX$var$commonInputStyles,
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
  underline: { ...$QcZX$var$commonInputStyles,
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
const $QcZX$export$letterSpacings = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em"
};
const $QcZX$export$baseLineHeights = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
};
const $QcZX$export$lineHeights = { ...$QcZX$export$baseLineHeights,
  body: $QcZX$export$baseLineHeights.relaxed,
  heading: $QcZX$export$baseLineHeights.tight
};
const $QcZX$export$radii = {
  none: "0",
  sm: "0.125rem",
  default: "0.25rem",
  lg: "0.5rem",
  full: "9999px"
};
const $QcZX$export$sizes = {
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
const $QcZX$export$shadows = {
  default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 0px 2px rgba(0, 0, 0, 0.03)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
  none: "none"
};
const $QcZX$export$space = [0, "0.25rem", "0.5rem", "1rem", "2rem", "4rem", "8rem", "16rem", "32rem"];
const $QcZX$export$zIndices = {
  auto: "auto",
  "0": "0",
  "10": "10",
  "20": "20",
  "30": "30",
  "40": "40",
  "50": "50"
};
const $QcZX$var$heading = {
  fontFamily: "heading",
  fontWeight: "heading",
  lineHeight: "heading",
  mt: 4
};
const $QcZX$export$styles = {
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
  h1: { ...$QcZX$var$heading,
    fontSize: [6, 7],
    mt: 6
  },
  h2: { ...$QcZX$var$heading,
    fontSize: [5, 6],
    pt: 5
  },
  h3: { ...$QcZX$var$heading,
    fontSize: [4, 5],
    pt: 4
  },
  h4: { ...$QcZX$var$heading,
    fontSize: [3, 4],
    pt: 4
  },
  h5: { ...$QcZX$var$heading,
    fontSize: [2, 3]
  },
  h6: { ...$QcZX$var$heading,
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
const $QcZX$export$theme = {
  borderWidths: $QcZX$export$borderWidths,
  breakpoints: $QcZX$export$breakpoints,
  colors: $QcZX$export$colors,
  fonts: $QcZX$export$fonts,
  fontSizes: $QcZX$export$fontSizes,
  fontWeights: $QcZX$export$fontWeights,
  letterSpacings: $QcZX$export$letterSpacings,
  lineHeights: $QcZX$export$lineHeights,
  sizes: $QcZX$export$sizes,
  shadows: $QcZX$export$shadows,
  space: $QcZX$export$space,
  radii: $QcZX$export$radii,
  zIndices: $QcZX$export$zIndices,
  styles: $QcZX$export$styles,
  buttons: $QcZX$export$buttons,
  inputs: $QcZX$export$inputs
};
// ASSET: node_modules\@thi.ng\atom\atom.js
var $YMU6$exports = {};
let $VLKd$var$NEXT_ID = 0;

const $VLKd$export$nextID = () => $VLKd$var$NEXT_ID++;

class $Ft3L$export$View {
  constructor(parent, path, tx, lazy = true, equiv = $ATNO$export$equiv) {
    this.parent = parent;
    this.id = `view-${$VLKd$export$nextID()}`;

    this.tx = tx || (x => x);

    this.path = $AoxZ$export$toPath(path);
    this.isDirty = true;
    this.isLazy = lazy;
    const lookup = $aPTM$export$getter(this.path);
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

var $YMU6$var$__decorate = $YMU6$exports && $YMU6$exports.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let $YMU6$export$Atom = class Atom {
  constructor(val, valid) {
    if (valid && !valid(val)) {
      $Ro8m$export$illegalState("initial state value did not validate");
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
    return this.reset($O0h9$export$setIn(this._value, path, val));
  }

  swap(fn, ...args) {
    return this.reset(fn.apply(null, [this._value, ...args]));
  }

  swapIn(path, fn, ...args) {
    return this.reset($T1Wd$export$updateIn(this._value, path, fn, ...args));
  }
  /* istanbul ignore next */
  // @ts-ignore: mixin


  addWatch(id, fn) {}
  /* istanbul ignore next */


  removeWatch(id) {}
  /* istanbul ignore next */
  // @ts-ignore: mixin


  notifyWatches(old, prev) {}

  addView(path, tx, lazy = true) {
    return new $Ft3L$export$View(this, path, tx, lazy);
  }

  release() {
    delete this._watches;
    delete this._value;
    return true;
  }

};
$YMU6$export$Atom = $YMU6$var$__decorate([$TKeT$export$IWatchMixin], $YMU6$export$Atom);
$YMU6$exports.Atom = $YMU6$export$Atom;
$YMU6$exports.Atom = $YMU6$export$Atom;

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
class $RraV$export$Cursor {
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
          if ($GCHm$export$isArray(opts.path) && $O43L$export$isFunction(opts.path[0])) {
            [lookup, update] = opts.path;
          } else {
            lookup = $aPTM$export$getter(opts.path);
            update = $CG20$export$setter(opts.path);
          }
        } else {
          $lITh$export$illegalArgs("missing path config");
        }

        break;

      case 2:
        parent = args[0];
        lookup = $aPTM$export$getter(args[1]);
        update = $CG20$export$setter(args[1]);
        break;

      case 3:
        [parent, lookup, update] = args;
        break;

      default:
        $qdh1$export$illegalArity(args.length);
    }

    this.parent = parent;
    this.id = id || `cursor-${$VLKd$export$nextID()}`;
    this.selfUpdate = false;

    if (!lookup || !update) {
      $lITh$export$illegalArgs();
    }

    this.local = new $YMU6$export$Atom(lookup(parent.deref()), validate);
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
    return new $Ft3L$export$View(this, path, tx, lazy);
  }

}

const $Fdu1$var$isa = Array.isArray;
const $Fdu1$var$iss = $NqbO$export$isString;

const $Fdu1$export$toPath = path => $Fdu1$var$isa(path) ? path : $Fdu1$var$iss(path) ? path.length > 0 ? path.split(".") : [] : path != null ? [path] : [];
/**
 * Takes an arbitrary object and lookup path. Descends into object along
 * path and returns true if the full path exists (even if final leaf
 * value is `null` or `undefined`). Checks are performed using
 * `hasOwnProperty()`.
 *
 * @param obj
 * @param path
 */


const $Fdu1$export$getter = path => {
  const ks = $Fdu1$export$toPath(path);
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


const $Fdu1$export$getIn = (state, path) => $Fdu1$export$getter(path)(state);
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


var $j1ZB$var$_scales;

function $j1ZB$var$_extends() {
  $j1ZB$var$_extends = Object.assign || function (target) {
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

  return $j1ZB$var$_extends.apply(this, arguments);
} // based on https://github.com/developit/dlv


var $j1ZB$export$get = function get(obj, key, def, p, undef) {
  key = key && key.split ? key.split('.') : [key];

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
};

var $j1ZB$var$defaultBreakpoints = [40, 52, 64].map(function (n) {
  return n + 'em';
});
var $j1ZB$var$defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
var $j1ZB$var$aliases = {
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
var $j1ZB$var$multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height']
};
var $j1ZB$var$scales = ($j1ZB$var$_scales = {
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
}, $j1ZB$var$_scales["borderTopLeftRadius"] = 'radii', $j1ZB$var$_scales["borderTopRightRadius"] = 'radii', $j1ZB$var$_scales.borderBottomWidth = 'borderWidths', $j1ZB$var$_scales.borderBottomColor = 'colors', $j1ZB$var$_scales.borderBottomStyle = 'borderStyles', $j1ZB$var$_scales["borderBottomLeftRadius"] = 'radii', $j1ZB$var$_scales["borderBottomRightRadius"] = 'radii', $j1ZB$var$_scales.borderLeftWidth = 'borderWidths', $j1ZB$var$_scales.borderLeftColor = 'colors', $j1ZB$var$_scales.borderLeftStyle = 'borderStyles', $j1ZB$var$_scales.borderRightWidth = 'borderWidths', $j1ZB$var$_scales.borderRightColor = 'colors', $j1ZB$var$_scales.borderRightStyle = 'borderStyles', $j1ZB$var$_scales.outlineColor = 'colors', $j1ZB$var$_scales.boxShadow = 'shadows', $j1ZB$var$_scales.textShadow = 'shadows', $j1ZB$var$_scales.zIndex = 'zIndices', $j1ZB$var$_scales.width = 'sizes', $j1ZB$var$_scales.minWidth = 'sizes', $j1ZB$var$_scales.maxWidth = 'sizes', $j1ZB$var$_scales.height = 'sizes', $j1ZB$var$_scales.minHeight = 'sizes', $j1ZB$var$_scales.maxHeight = 'sizes', $j1ZB$var$_scales.flexBasis = 'sizes', $j1ZB$var$_scales.size = 'sizes', $j1ZB$var$_scales.fill = 'colors', $j1ZB$var$_scales.stroke = 'colors', $j1ZB$var$_scales);

var $j1ZB$var$positiveOrNegative = function positiveOrNegative(scale, value) {
  if (typeof value !== 'number' || value >= 0) {
    return $j1ZB$export$get(scale, value, value);
  }

  var absolute = Math.abs(value);
  var n = $j1ZB$export$get(scale, absolute, absolute);
  if (typeof n === 'string') return '-' + n;
  return n * -1;
};

var $j1ZB$var$transforms = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'top', 'bottom', 'left', 'right'].reduce(function (acc, curr) {
  var _extends2;

  return $j1ZB$var$_extends({}, acc, (_extends2 = {}, _extends2[curr] = $j1ZB$var$positiveOrNegative, _extends2));
}, {});

var $j1ZB$export$responsive = function responsive(styles) {
  return function (theme) {
    var next = {};
    var breakpoints = $j1ZB$export$get(theme, 'breakpoints', $j1ZB$var$defaultBreakpoints);
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

var $j1ZB$export$css = function css(args) {
  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = $j1ZB$var$_extends({}, $j1ZB$var$defaultTheme, {}, props.theme || props);
    var result = {};
    var obj = typeof args === 'function' ? args(theme) : args;
    var styles = $j1ZB$export$responsive(obj)(theme);

    for (var key in styles) {
      var x = styles[key];
      var val = typeof x === 'function' ? x(theme) : x;

      if (key === 'variant') {
        var variant = css($j1ZB$export$get(theme, val))(theme);
        result = $j1ZB$var$_extends({}, result, {}, variant);
        continue;
      }

      if (val && typeof val === 'object') {
        result[key] = css(val)(theme);
        continue;
      }

      var prop = $j1ZB$export$get($j1ZB$var$aliases, key, key);
      var scaleName = $j1ZB$export$get($j1ZB$var$scales, prop);
      var scale = $j1ZB$export$get(theme, scaleName, $j1ZB$export$get(theme, prop, {}));
      var transform = $j1ZB$export$get($j1ZB$var$transforms, prop, $j1ZB$export$get);
      var value = transform(scale, val, val);

      if ($j1ZB$var$multiples[prop]) {
        var dirs = $j1ZB$var$multiples[prop];

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

// ASSET: node_modules\decamelize\index.js
var $g2Cw$exports = {};

$g2Cw$exports = function (str, sep) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  sep = typeof sep === 'undefined' ? '_' : sep;
  return str.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2').toLowerCase();
};

// ASSET: node_modules\map-obj\index.js
var $fEFO$exports = {};

$fEFO$exports = function (obj, cb) {
  var ret = {};
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var res = cb(key, obj[key], obj);
    ret[res[0]] = res[1];
  }

  return ret;
};

// ASSET: node_modules\decamelize-keys-deep\index.js
var $hReq$exports = {};

$hReq$exports = function decamelizeKeysDeep(obj, options) {
  // Any falsy, which includes `null` whose typeof is `object`.
  if (!obj) {
    return obj;
  } // Date, whose typeof is `object` too.


  if (obj instanceof Date) {
    return obj;
  } // Array, whose typeof is `object` too.


  if (Array.isArray(obj)) {
    return obj.map(function (element) {
      return decamelizeKeysDeep(element, options);
    });
  } // So, if this is still an `object`, we might be interested in it.


  if (typeof obj === "object") {
    return $fEFO$exports(obj, function (key, value) {
      var newKey = $g2Cw$exports(key, options);

      if (key !== newKey && newKey in obj) {
        throw new Error("Decamelized key `" + newKey + "` would overwrite existing key of the given JSON object");
      }

      return [newKey, decamelizeKeysDeep(value, options)];
    });
  } // Something else like a String or Number.


  return obj;
};

const $w9Ja$export$DEFAULT_VENDORS = ["-moz-", "-ms-", "-o-", "-webkit-"];
const $w9Ja$export$COMPACT = {
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

const $w9Ja$export$PRETTY = {
  rules: "\n",
  ruleSep: ", ",
  valSep: " ",
  decls: "\n",
  declStart: " {\n",
  declEnd: "}\n",
  indent: "    ",
  comments: true
};
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var $XXZp$var$cachedSetTimeout;
var $XXZp$var$cachedClearTimeout;

function $XXZp$var$defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function $XXZp$var$defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      $XXZp$var$cachedSetTimeout = setTimeout;
    } else {
      $XXZp$var$cachedSetTimeout = $XXZp$var$defaultSetTimout;
    }
  } catch (e) {
    $XXZp$var$cachedSetTimeout = $XXZp$var$defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      $XXZp$var$cachedClearTimeout = clearTimeout;
    } else {
      $XXZp$var$cachedClearTimeout = $XXZp$var$defaultClearTimeout;
    }
  } catch (e) {
    $XXZp$var$cachedClearTimeout = $XXZp$var$defaultClearTimeout;
  }
})();

function $XXZp$var$runTimeout(fun) {
  if ($XXZp$var$cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if (($XXZp$var$cachedSetTimeout === $XXZp$var$defaultSetTimout || !$XXZp$var$cachedSetTimeout) && setTimeout) {
    $XXZp$var$cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return $XXZp$var$cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return $XXZp$var$cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      return $XXZp$var$cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function $XXZp$var$runClearTimeout(marker) {
  if ($XXZp$var$cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if (($XXZp$var$cachedClearTimeout === $XXZp$var$defaultClearTimeout || !$XXZp$var$cachedClearTimeout) && clearTimeout) {
    $XXZp$var$cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return $XXZp$var$cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return $XXZp$var$cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return $XXZp$var$cachedClearTimeout.call(this, marker);
    }
  }
}

var $XXZp$var$queue = [];
var $XXZp$var$draining = false;
var $XXZp$var$currentQueue;
var $XXZp$var$queueIndex = -1;

function $XXZp$var$cleanUpNextTick() {
  if (!$XXZp$var$draining || !$XXZp$var$currentQueue) {
    return;
  }

  $XXZp$var$draining = false;

  if ($XXZp$var$currentQueue.length) {
    $XXZp$var$queue = $XXZp$var$currentQueue.concat($XXZp$var$queue);
  } else {
    $XXZp$var$queueIndex = -1;
  }

  if ($XXZp$var$queue.length) {
    $XXZp$var$drainQueue();
  }
}

function $XXZp$var$drainQueue() {
  if ($XXZp$var$draining) {
    return;
  }

  var timeout = $XXZp$var$runTimeout($XXZp$var$cleanUpNextTick);
  $XXZp$var$draining = true;
  var len = $XXZp$var$queue.length;

  while (len) {
    $XXZp$var$currentQueue = $XXZp$var$queue;
    $XXZp$var$queue = [];

    while (++$XXZp$var$queueIndex < len) {
      if ($XXZp$var$currentQueue) {
        $XXZp$var$currentQueue[$XXZp$var$queueIndex].run();
      }
    }

    $XXZp$var$queueIndex = -1;
    len = $XXZp$var$queue.length;
  }

  $XXZp$var$currentQueue = null;
  $XXZp$var$draining = false;
  $XXZp$var$runClearTimeout(timeout);
}

// v8 likes predictible objects
function $XXZp$var$Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

$XXZp$var$Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

const $uujL$var$EMPTY = new Set();
const $uujL$var$NO_SPACES = ":[";
const $uujL$var$xfSel = $TOye$export$comp($mJ7z$export$flatten(), $t9zY$export$map(x => $uujL$var$NO_SPACES.indexOf(x.charAt(0)) >= 0 ? x : " " + x));

const $uujL$var$withScope = (xf, scope) => $TOye$export$comp(xf, $t9zY$export$map(x => $NqbO$export$isString(x) && x.indexOf(" .") == 0 ? x + scope : x));
/** @internal */


const $uujL$export$expand = (acc, parent, rules, opts) => {
  const n = rules.length;
  const sel = [];
  let curr, isFn;

  const process = (i, r) => {
    let rfn = null;

    if ($GCHm$export$isArray(r)) {
      $uujL$export$expand(acc, $uujL$var$makeSelector(parent, sel), r, opts);
    } else if ($MgVO$export$isIterable(r) && !$NqbO$export$isString(r)) {
      $uujL$export$expand(acc, $uujL$var$makeSelector(parent, sel), [...r], opts);
    } else if ((isFn = $O43L$export$isFunction(r)) || (rfn = opts.fns[r])) {
      if (!parent.length) {
        if (rfn) {
          rfn.apply(null, rules.slice(i + 1))(acc, opts);
          return true;
        }

        r(acc, opts);
      } else if (isFn) {
        process(i, r());
      } else {
        $lITh$export$illegalArgs(`quoted fn ('${r}') only allowed at head position`);
      }
    } else if ($RJHr$export$isPlainObject(r)) {
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

  curr && acc.push($uujL$var$formatRule(parent, sel, curr, opts));
  return acc;
};

const $uujL$var$makeSelector = (parent, curr) => parent.length ? [...$WAdb$export$permutations(parent, curr)] : curr;

const $uujL$var$formatRule = (parent, sel, curr, opts) => {
  const f = opts.format;
  const space = $uujL$export$indent(opts);
  const xf = opts.scope ? $uujL$var$withScope($uujL$var$xfSel, opts.scope) : $uujL$var$xfSel;
  return [space, $UQCU$export$transduce($t9zY$export$map(sel => $UQCU$export$transduce(xf, $aQR0$export$str(), $GCHm$export$isArray(sel) ? sel : [sel]).trim()), $aQR0$export$str(f.ruleSep), $uujL$var$makeSelector(parent, sel)), f.declStart, $uujL$export$formatDecls(curr, opts), space, f.declEnd].join("");
};
/** @internal */


const $uujL$export$formatDecls = (rules, opts) => {
  const f = opts.format;
  const prefixes = opts.autoprefix || $uujL$var$EMPTY;
  const space = $uujL$export$indent(opts, opts.depth + 1);
  const acc = [];

  for (let r in rules) {
    if (rules.hasOwnProperty(r)) {
      let val = rules[r];

      if ($O43L$export$isFunction(val)) {
        val = val(rules);
      }

      if ($GCHm$export$isArray(val)) {
        val = val.map(v => $GCHm$export$isArray(v) ? v.join(" ") : v).join(f.ruleSep);
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


const $uujL$export$indent = (opts, d = opts.depth) => d > 1 ? [...$Ho5I$export$repeat(opts.format.indent, d)].join("") : d > 0 ? opts.format.indent : "";

const $eN7Q$export$conditional = (type, cond, rules) => (acc, opts) => {
  const space = $uujL$export$indent(opts);
  acc.push(`${space}${type} ${$eN7Q$var$formatCond(cond)}${opts.format.declStart}`);
  opts.depth++;
  $uujL$export$expand(acc, [], rules, opts);
  opts.depth--;
  acc.push(space + opts.format.declEnd);
  return acc;
};

const $eN7Q$var$formatCond = cond => {
  if ($NqbO$export$isString(cond)) {
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

const $TYCa$export$css = (rules, opts) => {
  opts = Object.assign({
    format: $w9Ja$export$COMPACT,
    vendors: $w9Ja$export$DEFAULT_VENDORS,
    fns: {},
    depth: 0
  }, opts);

  if ($RJHr$export$isPlainObject(rules)) {
    return $uujL$export$formatDecls(rules, opts);
  }

  if ($GCHm$export$isArray(opts.autoprefix)) {
    opts.autoprefix = new Set(opts.autoprefix);
  }

  if ($MgVO$export$isIterable(rules) && !$NqbO$export$isString(rules)) {
    rules = [...rules];
  }

  if ($GCHm$export$isArray(rules)) {
    return $uujL$export$expand([], [], rules, opts).join(opts.format.rules);
  }

  if ($O43L$export$isFunction(rules)) {
    return rules([], opts).join(opts.format.rules);
  }
};

/**
 * Injects given CSS string as global stylesheet in DOM head. If `first`
 * is true, inserts it as first stylesheet, else (default) appends it.
 *
 * Returns created style DOM element.
 *
 * @param css - CSS string
 * @param first - true, if prepend to stylesheet list (else append)
 */
const $MMao$export$injectStyleSheet = (css, first = false) => {
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

const $lML5$export$at_media = (cond, rules) => $eN7Q$export$conditional("@media", cond, rules);

const $mzHx$var$log = (...args) => console.log(...args); // Atom structure

/**
 * basic skeleton of the style atom
 * */


const $mzHx$var$global_structure = {
  basics: {},
  pseudos: {},
  queries: {}
};
/**
 * creates a new atom/state container for storing styles
 * */

const $mzHx$var$global_atom = new $YMU6$export$Atom($mzHx$var$global_structure);
/**
 * dispatches various types of style definitions to their
 * approprate shape within the style atom/state
 * */

const $mzHx$var$partitioner = (atom, macro, meso, micro = null) => {
  const current = atom.deref();
  const has_macro = !!current[macro];
  const has_meso = !!$Fdu1$export$getIn(current, [macro, meso]); // 🔥: dot_hash will get it's nuts cut off if you don't use array path syntax

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

const $mzHx$var$q_crsr = new $RraV$export$Cursor($mzHx$var$global_atom, "queries");
const $mzHx$var$p_crsr = new $RraV$export$Cursor($mzHx$var$global_atom, "pseudos");
const $mzHx$var$b_crsr = new $RraV$export$Cursor($mzHx$var$global_atom, "basics");
/**
 * determines what kind of style is being handled and sends it
 * to the partitioner to be digested into the style state/atom
 * */

const $mzHx$var$partition = (selector, styles) => {
  const entries = Object.entries(styles);
  const is_root = selector === "root";

  if (is_root) {
    $mzHx$var$partitioner($mzHx$var$b_crsr, ":root", styles);
  } else {
    entries.forEach(([key, val]) => {
      const is_pseudo = key.slice(0, 1) === "&";
      const is_query = key.slice(0, 6) === "@media";
      const is_basic = typeof val !== "object";

      if (is_pseudo) {
        $mzHx$var$partitioner($mzHx$var$p_crsr, selector, key.slice(1), val);
      } else if (is_query) {
        const rgx = /\(.*?\)/g;
        const media_query = key.match(rgx)[0].slice(1, -1);
        $mzHx$var$partitioner($mzHx$var$q_crsr, media_query, selector, val);
      } else if (is_basic) {
        $mzHx$var$partitioner($mzHx$var$b_crsr, selector, {
          [key]: val
        });
      } else {
        $mzHx$var$log("partition failure:", {
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


var $hReq$$interop$default = $parcel$interopDefault($hReq$exports);

const $mzHx$export$parse_theme = theme => $hReq$$interop$default.d($j1ZB$export$css(theme)(theme), "-");
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


const $mzHx$var$style_fire = theme_spec => (sel, styles = null, path = null) => {
  const hash = `${sel}${$UVAT$export$randomID(5, "_", "0123456789abcdefghijklmnopqrstuvwxyz")}`;
  const dot_hash = `.${hash}`;
  const spec_lens = $Fdu1$export$getIn(theme_spec, path);
  var $hReq$$interop$default = $parcel$interopDefault($hReq$exports);
  const style_obj = path ? $hReq$$interop$default.d($j1ZB$export$css(spec_lens)(theme_spec), "-") : {};
  const themed_styles = styles ? $hReq$$interop$default.d($j1ZB$export$css(styles)(theme_spec), "-") : {};
  const computed_styles = { ...style_obj,
    ...themed_styles
  }; // -> to injection! 💉

  $mzHx$var$partition(dot_hash, computed_styles);
  return hash;
};
/**
 * registers theme-spec compliant theme
 * Takes a theme-spec compliant object and returns a tuple that contains
 * [theme_styler, THEME]
 * theme_styler calls style_fire (registering styles and returns a unique hash string)
 * THEME is the theme-spec complaint object parsed into standards compliant css
 * */


const $mzHx$export$themer = theme_spec => {
  const THEME = $mzHx$export$parse_theme(theme_spec);
  const BASE = THEME.styles;
  const basic_entries = Object.entries(BASE);
  basic_entries.forEach(([selector, styles]) => $mzHx$var$partition(selector, styles));
  const theme_styler = $mzHx$var$style_fire(theme_spec); // returns tuple [ configured_theme_obj, theme_styler_fn ] 😈

  return [theme_styler, THEME];
};

const $mzHx$var$dereference = (atom, opts) => {
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
          results.push([$lML5$export$at_media({
            screen: true,
            [m]: q
          }, Object.entries(style[1]))]);
        });
        break;

      default:
        $mzHx$var$log("no case found for:", cursor);
    }
  }); // const results = hiccup_css(res)

  return $TYCa$export$css(results, opts);
}; //?


const $mzHx$var$opts = "production" !== "production" ? {
  format: $w9Ja$export$PRETTY
} : null;
/**
 * Waits for the DOMContentLoaded event to inject all registered component styles
 * and basic `styles` from the theme into the <head> of the webpage
 * */

window.addEventListener("DOMContentLoaded", () => {
  const formatted_styles = $mzHx$var$dereference($mzHx$var$global_atom, $mzHx$var$opts);
  $MMao$export$injectStyleSheet(formatted_styles);
});
const [$ndBe$export$theme_styler, $ndBe$export$THEME] = $mzHx$export$themer($QcZX$export$theme);
// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
//
//  888                /
//  888  e88~-_  e88~88e  d88~\
//  888 d888   i 888 888 C888
//  888 8888   | "88_88"  Y88b
//  888  "88_-~  Cb      \_88P
//                Y8""8D
//
const $Focm$var$log = console.log; // trace$("run$ ->", run$)
// trace$("command$ ->", command$)
// trace$("out$ ->", out$)
//        888             d8
//  d888  888       88b  888         88b
//  8888  888  e88~-888  888    e88~-888
//  Y888  888 C888  888  888   C888  888
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

const $Focm$var$getSomeJSON = async (path, uid) => {
  const text_base = "https://jsonplaceholder.typicode.com/";

  const img_base = (id, sz) => `https://i.picsum.photos/id/${id}/${sz}/${sz}.jpg`;

  const data = uid ? (async () => {
    let detail = await fetch(`${text_base}${path}/${uid}`).then(r => r.json());
    let {
      name = `User ${$VaFF$export$getIn(detail, "id")}`,
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
        img: img_base(uid, 600),
        // this needs fixin' 📌
        text: detail,
        uid
      }
    };
  })() : (async () => {
    let list = await fetch(`${text_base}${path}/`).then(r => r.json());
    var $n32p$$interop$default = $parcel$interopDefault($n32p$exports);
    return {
      HEAD: {
        title: `${path.replace(/^\w/, c => c.toUpperCase())} list`,
        description: `List page for ${path}`,
        image: {
          url: img_base(222, 200)
        }
      },
      BODY: $n32p$$interop$default.d(list).call(list, (c, i) => ({
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


const $Focm$var$routerCfg = async url => {
  let match = $mkih$export$fURL(url);
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
  } = new $jZih$export$EquivMap([[{ ...match,
    URL_path: ["todos"]
  }, {
    URL_data: () => $Focm$var$getSomeJSON("todos"),
    URL_page: $Focm$var$set
  }], [{ ...match,
    URL_path: ["todos", p_b]
  }, {
    URL_data: () => $Focm$var$getSomeJSON("todos", p_b),
    URL_page: $Focm$var$single
  }], [{ ...match,
    URL_path: ["users"]
  }, {
    URL_data: () => $Focm$var$getSomeJSON("users"),
    URL_page: $Focm$var$set
  }], [{ ...match,
    URL_path: ["users", p_b]
  }, {
    URL_data: () => $Focm$var$getSomeJSON("users", p_b),
    URL_page: $Focm$var$single
  }], // home page (empty path)
  [{ ...match,
    URL_path: []
  }, {
    URL_data: () => $Focm$var$getSomeJSON("users", 1),
    URL_page: $Focm$var$single
  }] // get match || 404 data
  ]).get(match) || {
    URL_data: () => $Focm$var$getSomeJSON("users", 9),
    URL_page: $Focm$var$single
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


const $Focm$var$child = (ctx, id, img, sz, ...args) => // log("child"),
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

const $Focm$var$zoomOnNav = (ctx, id, img, sz) => [$Fx88$export$FLIPkid, [$Focm$var$child, id, img, sz]]; //////////////////// FLIP API 🔺  //////////////////////////

/**
 * higher order components should only take static parameters
 * so that they can be cached. I.e., in this case a string
 * Do not nest an HDOM functional component within another
 * in an attempt to pass state between components. Use an atom,
 * which is deref'able for that
 */


const $Focm$var$component = sz => // log("component"),
(ctx, uid, img, fields) => ["div", {
  style: {
    "margin-bottom": "30px"
  }
}, [$Focm$var$zoomOnNav, uid, img, sz], ["p", {
  class: "title"
}, fields]]; // babel/core-js will complain if pages aren't defined
// before they're used even though eslint will allow it


const $Focm$var$single = (ctx, body) => // log("single"),
[$Focm$var$component("lg"), $VaFF$export$getIn(body, "uid"), $VaFF$export$getIn(body, "img") || "https://i.picsum.photos/id/1/600/600.jpg", $VaFF$export$getIn(body, "text") ? $Focm$var$fields(body.text.company || body.text) : null];

var $n32p$$interop$default = $parcel$interopDefault($n32p$exports);

const $Focm$var$set = (ctx, bodies) => // log("set"),
["div", ...$n32p$$interop$default.d(bodies).call(bodies, ({
  img,
  text,
  uid
}) => [$Focm$var$component("sm"), uid, img, $Focm$var$fields(text)])]; // const S = JSON.stringify // <- handy for adornment phase
// declare button before using in-site (prevent re-registration on RAF)
// const btn_outline = button_x({ tag: "a" }, "buttons.outline")


const $Focm$var$pathLink = (ctx, uid, ...args) => // log("pathLink"),
["div", // btn_outline,
uid === 3 ? {
  disabled: true
} : {
  href: `/${ctx.fURL().URL_path}/${uid}`,
  onclick: e => {
    e.preventDefault();
    ctx.run({ ...$n9Ph$export$HURL,
      args: e
    });
  }
}, ...args];

const $Focm$var$field = (ctx, key, val) => {
  var _context;

  var $n32p$$interop$default = $parcel$interopDefault($n32p$exports);
  var $pziW$$interop$default = $parcel$interopDefault($pziW$exports);
  return (// log("field"),
    ["li", {
      style: {
        display: "flex"
      }
    }, key === "id" ? [$Focm$var$pathLink, val, val] : $CwkB$export$isObject(val) ? ["ul", ...$n32p$$interop$default.d(_context = $pziW$$interop$default.d(val)).call(_context, ([k, v]) => [$Focm$var$field, k, v])] : ["p", {
      style: {
        padding: "0 0.5rem"
      }
    }, val]]
  );
};

const $Focm$var$fields = payload => {
  var _context2, _context3;

  var $n32p$$interop$default = $parcel$interopDefault($n32p$exports);
  var $joq7$$interop$default = $parcel$interopDefault($joq7$exports);
  var $pziW$$interop$default = $parcel$interopDefault($pziW$exports);
  return (// log("fields", { payload }),
    ["ul", ...$n32p$$interop$default.d(_context2 = $joq7$$interop$default.d(_context3 = $pziW$$interop$default.d(payload)).call(_context3, 0, 4)).call(_context2, ([k, v]) => [$Focm$var$field, k, v])]
  );
};

const $Focm$var$link = (ctx, path, ...args) => // log("link"),
["a", {
  href: "/" + path.join("/"),
  // regular href just works if there's no extra paths in
  // URL (e.g., gh-pages URLs will break these)...
  onclick: e => (e.preventDefault(), ctx.run({ ...$n9Ph$export$HURL,
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


const $Focm$var$app = (ctx, page) => {
  var _context4;

  var $n32p$$interop$default = $parcel$interopDefault($n32p$exports);
  return (// log("app"),
    ["div", {
      style: {
        "max-width": "30rem",
        margin: "auto",
        padding: "2rem"
      }
    }, ...$n32p$$interop$default.d(_context4 = [["users"], ["todos"], ["todos", 2], ["users", 9]]).call(_context4, path => [$Focm$var$link, path, `/${path[0]}${path[1] ? "/" + path[1] : ""}`, ["br"]]), // default to homepage `single` shell during
    // hydration/start (before any async is done)
    page]
  );
}; // TODO: add default / 404 page here (could help the ugly $page.deref() ||...)


const $Focm$var$router = {
  prefix: "ac/",
  router: $Focm$var$routerCfg,
  post: $wFfN$export$INJECT_HEAD
}; // const router = routerCfg

const $Focm$var$w_config = {
  app: $Focm$var$app,
  router: $Focm$var$router,
  root: document.getElementById("app"),
  // <- 🔍
  prefix: "ac/",
  // draft: { users: [] },
  trace: "app stream ->",
  // arbitrary context k/v pairs...
  theme: $ndBe$export$THEME
};
$vRmK$export$boot($Focm$var$w_config); // registerCMD({
//   sub$: "HURL_CMD",
//   args: x => x
// })
// console.log(registerCMD.all.entries())

console.log("starting...");
})();