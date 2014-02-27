
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = '../../../build/val_book_spmv.data';
    var REMOTE_PACKAGE_NAME = (Module['filePackagePrefixURL'] || '') + 'val_book_spmv.data';
    var REMOTE_PACKAGE_SIZE = 40949;
    var PACKAGE_UUID = '587cf756-2e8e-4650-98d7-e186268e79ad';
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 40949, 0, 0).open('GET', '/spmv.mm');
    new DataRequest(40949, 40949, 0, 0).open('GET', '/spmv.cl');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though.
      var ptr = Module['_malloc'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/spmv.mm"].onload();
          DataRequest.prototype.requests["/spmv.cl"].onload();
          Module['removeRunDependency']('datafile_../../../build/val_book_spmv.data');

    };
    Module['addRunDependency']('datafile_../../../build/val_book_spmv.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();

// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  Module['arguments'] = process['argv'].slice(2);

  module['exports'] = Module;
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  this['Module'] = Module;

  eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined"); // wipe out the SpiderMonkey shell 'gc' function, which can confuse closure (uses it as a minified name, and it is then initted to a non-falsey value unexpectedly)
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Auto-generated preamble library stuff ===

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?\{ ?[^}]* ?\}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_ && type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      assert(args.length == sig.length-1);
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      assert(sig.length == 1);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    code = Pointer_stringify(code);
    if (code[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (code.indexOf('"', 1) === code.length-1) {
        code = code.substr(1, code.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + code + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + code + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;

      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }

      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }

      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8);(assert((((STACKTOP|0) < (STACK_MAX|0))|0))|0); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + (assert(!staticSealed),size))|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + (assert(DYNAMICTOP > 0),size))|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;









//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}

// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;

// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;

// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }

  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;

// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;

function demangle(func) {
  var i = 3;
  // params, etc.
  var basicTypes = {
    'v': 'void',
    'b': 'bool',
    'c': 'char',
    's': 'short',
    'i': 'int',
    'l': 'long',
    'f': 'float',
    'd': 'double',
    'w': 'wchar_t',
    'a': 'signed char',
    'h': 'unsigned char',
    't': 'unsigned short',
    'j': 'unsigned int',
    'm': 'unsigned long',
    'x': 'long long',
    'y': 'unsigned long long',
    'z': '...'
  };
  var subs = [];
  var first = true;
  function dump(x) {
    //return;
    if (x) Module.print(x);
    Module.print(func);
    var pre = '';
    for (var a = 0; a < i; a++) pre += ' ';
    Module.print (pre + '^');
  }
  function parseNested() {
    i++;
    if (func[i] === 'K') i++; // ignore const
    var parts = [];
    while (func[i] !== 'E') {
      if (func[i] === 'S') { // substitution
        i++;
        var next = func.indexOf('_', i);
        var num = func.substring(i, next) || 0;
        parts.push(subs[num] || '?');
        i = next+1;
        continue;
      }
      if (func[i] === 'C') { // constructor
        parts.push(parts[parts.length-1]);
        i += 2;
        continue;
      }
      var size = parseInt(func.substr(i));
      var pre = size.toString().length;
      if (!size || !pre) { i--; break; } // counter i++ below us
      var curr = func.substr(i + pre, size);
      parts.push(curr);
      subs.push(curr);
      i += pre + size;
    }
    i++; // skip E
    return parts;
  }
  function parse(rawList, limit, allowVoid) { // main parser
    limit = limit || Infinity;
    var ret = '', list = [];
    function flushList() {
      return '(' + list.join(', ') + ')';
    }
    var name;
    if (func[i] === 'N') {
      // namespaced N-E
      name = parseNested().join('::');
      limit--;
      if (limit === 0) return rawList ? [name] : name;
    } else {
      // not namespaced
      if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
      var size = parseInt(func.substr(i));
      if (size) {
        var pre = size.toString().length;
        name = func.substr(i + pre, size);
        i += pre + size;
      }
    }
    first = false;
    if (func[i] === 'I') {
      i++;
      var iList = parse(true);
      var iRet = parse(true, 1, true);
      ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
    } else {
      ret = name;
    }
    paramLoop: while (i < func.length && limit-- > 0) {
      //dump('paramLoop');
      var c = func[i++];
      if (c in basicTypes) {
        list.push(basicTypes[c]);
      } else {
        switch (c) {
          case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
          case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
          case 'L': { // literal
            i++; // skip basic type
            var end = func.indexOf('E', i);
            var size = end - i;
            list.push(func.substr(i, size));
            i += size + 2; // size + 'EE'
            break;
          }
          case 'A': { // array
            var size = parseInt(func.substr(i));
            i += size.toString().length;
            if (func[i] !== '_') throw '?';
            i++; // skip _
            list.push(parse(true, 1, true)[0] + ' [' + size + ']');
            break;
          }
          case 'E': break paramLoop;
          default: ret += '?' + c; break paramLoop;
        }
      }
    }
    if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
    return rawList ? list : ret + flushList();
  }
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    return parse();
  } catch(e) {
    return func;
  }
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}

// Memory management

var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk

function enlargeMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
}

var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;

var totalMemory = 4096;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be more reasonable');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'JS engine does not provide full typed array support');

var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;

function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    Module.printErr('Exiting runtime. Any attempt to access the compiled C code may fail from now. If you want to keep the runtime alive, set Module["noExitRuntime"] = true or build with -s NO_EXIT_RUNTIME=1');
  }
  callRuntimeCallbacks(__ATEXIT__);
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools

// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 10000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;

// === Body ===





STATIC_BASE = 8;

STATICTOP = STATIC_BASE + Runtime.alignMemory(5259);
/* global initializers */ __ATINIT__.push();


/* memory initializer */ allocate([114,0,0,0,0,0,0,0,69,114,114,111,114,32,111,112,101,110,105,110,103,32,109,97,120,116,114,105,120,32,102,105,108,101,32,37,115,10,0,0,37,49,57,115,32,37,49,57,115,32,37,49,57,115,32,37,49,57,115,32,37,49,57,115,10,0,0,0,0,0,0,0,101,114,114,111,114,32,114,101,97,100,105,110,103,32,109,97,116,114,105,120,32,109,97,114,107,101,116,32,102,111,114,109,97,116,32,104,101,97,100,101,114,32,108,105,110,101,10,0,112,97,116,116,101,114,110,0,103,101,110,101,114,97,108,0,37,100,32,37,100,32,37,100,10,0,0,0,0,0,0,0,70,97,105,108,101,100,32,97,108,108,111,99,97,116,105,111,110,32,111,102,32,37,108,108,100,32,98,121,116,101,115,32,102,111,114,32,37,115,10,0,114,97,119,95,105,120,0,0,114,97,119,95,105,121,0,0,114,97,119,95,100,97,116,97,0,0,0,0,0,0,0,0,108,105,110,101,95,100,97,116,97,95,97,114,114,97,121,0,108,105,110,101,95,120,95,105,110,100,101,120,95,97,114,114,97,121,0,0,0,0,0,0,99,111,117,110,116,95,97,114,114,97,121,0,0,0,0,0,37,100,32,37,100,10,0,0,37,108,102,10,0,0,0,0,103,97,112,32,105,110,32,116,104,101,32,105,110,112,117,116,32,40,110,111,110,45,105,110,118,101,114,116,105,98,108,101,32,109,97,116,114,105,120,41,58,32,105,32,61,32,37,100,44,32,105,121,32,61,32,37,100,44,32,99,117,114,114,121,32,61,32,37,100,10,0,0,101,120,112,108,105,99,105,116,95,122,101,114,111,95,99,111,117,110,116,32,61,32,37,100,10,0,0,0,0,0,0,0,108,105,110,101,95,100,97,116,97,95,97,114,114,97,121,91,105,93,0,0,0,0,0,0,108,105,110,101,95,120,95,105,110,100,101,120,95,97,114,114,97,121,91,105,93,0,0,0,110,120,32,61,32,37,100,44,32,110,121,32,61,32,37,100,44,32,110,111,110,95,122,101,114,111,32,61,32,37,100,44,32,100,101,110,115,105,116,121,32,61,32,37,102,10,0,0,100,97,116,97,95,97,114,114,97,121,0,0,0,0,0,0,120,95,105,110,100,101,120,95,97,114,114,97,121,0,0,0,114,111,119,95,105,110,100,101,120,95,97,114,114,97,121,0,115,108,97,98,95,115,116,97,114,116,114,111,119,0,0,0,99,111,101,114,99,105,110,103,32,103,112,117,32,119,111,114,107,32,103,114,111,117,112,32,115,105,122,101,32,116,111,32,77,65,88,32,87,79,82,75,32,71,82,79,85,80,32,83,73,90,69,44,32,119,104,105,99,104,32,105,115,32,37,100,10,0,0,0,0,0,0,0,99,111,101,114,99,105,110,103,32,103,112,117,32,119,111,114,107,32,103,114,111,117,112,32,115,105,122,101,32,116,111,32,77,73,78,32,87,79,82,75,32,71,82,79,85,80,32,83,73,90,69,44,32,119,104,105,99,104,32,105,115,32,49,54,10,0,0,0,0,0,0,0,99,111,101,114,115,105,110,103,32,103,112,117,32,119,111,114,107,32,103,114,111,117,112,32,115,105,122,101,32,116,111,32,110,101,120,116,32,108,111,119,101,114,32,112,111,119,101,114,32,111,102,32,50,44,32,119,104,105,99,104,32,105,115,32,37,100,10,0,0,0,0,0,99,111,101,114,99,105,110,103,32,103,112,117,32,119,111,114,107,32,103,114,111,117,112,32,115,105,122,101,32,116,111,32,102,105,116,32,119,105,116,104,105,110,32,104,97,114,100,119,97,114,101,32,108,105,109,105,116,115,46,32,32,78,101,119,32,115,105,122,101,32,105,115,32,37,100,10,0,0,0,0,40,109,103,115,45,62,115,108,97,98,95,115,116,97,114,116,114,111,119,41,0,0,0,0,114,111,119,95,115,116,97,114,116,0,0,0,0,0,0,0,114,111,119,95,99,117,114,114,0,0,0,0,0,0,0,0,42,115,101,103,95,119,111,114,107,115,112,97,99,101,0,0,101,101,107,33,10,0,0,0,10,0,0,0,0,0,0,0,85,115,97,103,101,58,32,115,112,109,118,32,45,102,32,60,109,97,116,114,105,120,102,105,108,101,62,32,91,100,101,118,105,99,101,95,116,121,112,101,93,32,91,107,101,114,110,101,108,95,116,121,112,101,93,32,91,111,112,116,105,111,110,115,93,10,0,0,0,0,0,0,78,111,116,101,58,32,60,109,97,116,114,105,120,102,105,108,101,62,32,115,104,111,117,108,100,32,105,110,99,108,117,100,101,32,116,104,101,32,114,101,108,97,116,105,118,101,32,112,97,116,104,32,102,114,111,109,32,116,104,105,115,32,101,120,101,99,117,116,97,98,108,101,46,10,0,0,0,0,0,0,32,68,101,118,105,99,101,32,84,121,112,101,58,10,0,0,32,32,45,99,44,32,45,45,99,112,117,32,32,32,32,32,32,32,32,32,32,85,115,101,32,67,80,85,32,100,101,118,105,99,101,32,102,111,114,32,107,101,114,110,101,108,32,99,111,109,112,117,116,97,116,105,111,110,115,46,10,0,0,0,32,32,45,103,44,32,45,45,103,112,117,32,32,32,32,32,32,32,32,32,32,85,115,101,32,71,80,85,32,100,101,118,105,99,101,32,102,111,114,32,107,101,114,110,101,108,32,99,111,109,112,117,116,97,116,105,111,110,115,46,10,0,0,0,32,32,45,97,44,32,45,45,97,99,99,101,108,32,32,32,32,32,32,32,32,85,115,101,32,65,67,67,69,76,69,82,65,84,79,82,32,100,101,118,105,99,101,32,102,111,114,32,107,101,114,110,101,108,32,99,111,109,112,117,116,97,116,105,111,110,115,46,10,0,0,0,32,75,101,114,110,101,108,32,84,121,112,101,32,40,100,101,102,97,117,108,116,32,105,115,32,45,65,32,102,111,114,32,65,67,67,69,76,69,82,65,84,79,82,32,100,101,118,105,99,101,44,32,45,76,32,111,116,104,101,114,119,105,115,101,41,58,10,0,0,0,0,0,32,32,45,76,44,32,45,45,108,115,32,32,32,32,32,32,32,32,32,32,32,85,115,101,32,39,108,111,97,100,45,115,116,111,114,101,39,32,107,101,114,110,101,108,32,116,111,32,115,111,108,118,101,32,112,114,111,98,108,101,109,46,10,0,32,32,45,65,44,32,45,45,97,119,103,99,32,32,32,32,32,32,32,32,32,85,115,101,32,39,97,115,121,110,99,45,119,111,114,107,45,103,114,111,117,112,45,99,111,112,121,39,32,107,101,114,110,101,108,32,116,111,32,115,111,108,118,101,32,112,114,111,98,108,101,109,46,10,0,0,0,0,0,0,32,79,112,116,105,111,110,115,32,40,97,108,108,32,111,112,116,105,111,110,115,32,100,101,102,97,117,108,116,32,116,111,32,39,110,111,116,32,115,101,108,101,99,116,101,100,39,41,58,10,0,0,0,0,0,0,32,32,45,108,44,32,45,45,108,119,103,115,105,122,101,32,91,110,93,32,32,83,112,101,99,105,102,121,32,108,111,99,97,108,32,119,111,114,107,32,103,114,111,117,112,32,115,105,122,101,32,102,111,114,32,71,80,85,32,117,115,101,32,40,99,111,101,114,99,101,100,32,116,111,32,112,111,119,101,114,32,111,102,32,50,41,46,10,0,0,0,0,0,0,0,0,32,32,45,104,44,32,45,45,104,101,108,112,32,32,32,32,32,32,32,32,32,80,114,105,110,116,32,116,104,105,115,32,117,115,97,103,101,32,109,101,115,115,97,103,101,46,10,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,232,6,0,0,0,0,0,0,115,112,109,118,46,109,109,0,115,112,109,118,46,99,108,0,116,105,108,101,100,95,115,112,109,118,95,107,101,114,110,101,108,95,76,83,0,0,0,0,116,105,108,101,100,95,115,112,109,118,95,107,101,114,110,101,108,95,65,87,71,67,0,0,104,101,108,112,0,0,0,0,97,99,99,101,108,0,0,0,99,112,117,0,0,0,0,0,103,112,117,0,0,0,0,0,108,115,0,0,0,0,0,0,97,119,103,99,0,0,0,0,118,101,114,105,102,121,0,0,108,119,103,115,105,122,101,0,102,105,108,101,110,97,109,101,0,0,0,0,0,0,0,0,40,7,0,0,0,0,0,0,0,0,0,0,104,0,0,0,48,7,0,0,0,0,0,0,0,0,0,0,97,0,0,0,56,7,0,0,0,0,0,0,0,0,0,0,99,0,0,0,64,7,0,0,0,0,0,0,0,0,0,0,103,0,0,0,72,7,0,0,0,0,0,0,0,0,0,0,76,0,0,0,80,7,0,0,0,0,0,0,0,0,0,0,65,0,0,0,88,7,0,0,0,0,0,0,0,0,0,0,118,0,0,0,96,7,0,0,1,0,0,0,0,0,0,0,108,0,0,0,104,7,0,0,1,0,0,0,0,0,0,0,102,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,97,99,103,76,65,108,58,102,58,0,0,0,0,0,0,84,114,121,32,39,37,115,32,45,45,104,101,108,112,39,32,102,111,114,32,109,111,114,101,32,105,110,102,111,114,109,97,116,105,111,110,46,10,0,0,37,115,58,32,117,110,114,101,99,111,103,110,105,122,101,100,32,111,112,116,105,111,110,32,39,37,115,39,46,10,0,0,37,115,32,102,97,105,108,101,100,46,32,114,99,32,61,32,37,100,10,0,0,0,0,0,99,108,71,101,116,80,108,97,116,102,111,114,109,73,68,115,40,110,117,109,95,112,108,97,116,102,111,114,109,115,41,0,70,97,105,108,101,100,32,97,108,108,111,99,97,116,105,111,110,32,111,102,32,37,108,108,100,32,98,121,116,101,115,32,102,111,114,32,37,115,10,0,112,108,97,116,102,111,114,109,0,0,0,0,0,0,0,0,98,117,102,102,101,114,0,0,116,101,109,112,95,112,108,97,116,102,111,114,109,95,105,100,95,97,114,114,97,121,0,0,99,108,71,101,116,80,108,97,116,102,111,114,109,32,73,68,115,40,80,108,97,116,102,111,114,109,32,73,68,115,41,0,91,83,84,65,82,84,32,82,85,78,93,10,0,0,0,0,99,111,109,109,97,110,100,32,108,105,110,101,58,32,0,0,37,115,32,0,0,0,0,0,99,108,71,101,116,80,108,97,116,102,111,114,109,73,110,102,111,40,115,105,122,101,32,111,102,32,112,108,97,116,102,111,114,109,32,110,97,109,101,41,0,0,0,0,0,0,0,0,112,108,97,116,102,111,114,109,32,110,97,109,101,0,0,0,99,108,71,101,116,80,108,97,116,102,111,114,109,73,110,102,111,40,112,108,97,116,102,111,114,109,32,110,97,109,101,41,0,0,0,0,0,0,0,0,99,108,71,101,116,68,101,118,105,99,101,73,68,115,40,110,117,109,98,101,114,32,111,102,32,100,101,118,105,99,101,115,41,0,0,0,0,0,0,0,100,101,118,105,99,101,32,115,116,114,117,99,116,117,114,101,0,0,0,0,0,0,0,0,116,109,112,100,101,118,105,99,101,115,0,0,0,0,0,0,99,108,71,101,116,68,101,118,105,99,101,73,68,115,40,108,105,115,116,32,111,102,32,100,101,118,105,99,101,32,73,68,115,41,0,0,0,0,0,0,99,108,71,101,116,68,101,118,105,99,101,73,110,102,111,40,100,101,118,105,99,101,32,116,121,112,101,41,0,0,0,0,110,111,32,100,101,118,105,99,101,115,32,111,102,32,97,110,121,32,107,105,110,100,32,119,101,114,101,32,102,111,117,110,100,32,111,110,32,116,104,105,115,32,115,121,115,116,101,109,46,32,32,76,101,97,118,105,110,103,46,46,46,10,0,0,110,111,32,100,101,118,105,99,101,115,32,111,102,32,116,104,101,32,114,101,113,117,101,115,116,101,100,32,116,121,112,101,32,119,101,114,101,32,102,111,117,110,100,32,111,110,32,116,104,105,115,32,115,121,115,116,101,109,46,32,32,76,101,97,118,105,110,103,46,46,46,10,0,0,0,0,0,0,0,0,99,108,67,114,101,97,116,101,67,111,110,116,101,120,116,0,69,114,114,111,114,58,32,70,97,105,108,101,100,32,116,111,32,108,111,97,100,32,99,111,109,112,117,116,101,32,112,114,111,103,114,97,109,32,102,114,111,109,32,102,105,108,101,33,10,0,0,0,0,0,0,0,99,108,67,114,101,97,116,101,80,114,111,103,114,97,109,87,105,116,104,83,111,117,114,99,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,108,66,117,105,108,100,80,114,111,103,114,97,109,0,0,99,108,67,114,101,97,116,101,75,101,114,110,101,108,0,0,99,108,67,114,101,97,116,101,67,111,109,109,97,110,100,81,117,101,117,101,0,0,0,0,99,108,71,101,116,68,101,118,105,99,101,73,110,102,111,40,115,105,122,101,32,111,102,32,67,76,95,68,69,86,73,67,69,95,78,65,77,69,41,0,100,101,118,105,99,101,32,110,97,109,101,0,0,0,0,0,99,108,71,101,116,68,101,118,105,99,101,73,110,102,111,40,67,76,95,68,69,86,73,67,69,95,78,65,77,69,41,0,87,101,39,108,108,32,114,117,110,32,107,101,114,110,101,108,32,37,115,32,111,110,32,100,101,118,105,99,101,32,37,115,10,0,0,0,0,0,0,0,107,101,114,110,101,108,95,108,115,0,0,0,0,0,0,0,107,101,114,110,101,108,95,97,119,103,99,0,0,0,0,0,99,108,71,101,116,68,101,118,105,99,101,73,110,102,111,40,67,76,95,68,69,86,73,67,69,95,77,69,77,95,66,65,83,69,95,65,68,68,82,95,65,76,73,71,78,41,0,0,99,108,71,101,116,75,101,114,110,101,108,87,111,114,107,71,114,111,117,112,73,110,102,111,40,67,76,95,75,69,82,78,69,76,95,87,79,82,75,95,71,82,79,85,80,95,83,73,90,69,41,0,0,0,0,0,99,108,71,101,116,68,101,118,105,99,101,73,110,102,111,40,67,76,95,68,69,86,73,67,69,95,76,79,67,65,76,95,77,69,77,95,83,73,90,69,41,0,0,0,0,0,0,0,99,108,71,101,116,75,101,114,110,101,108,87,111,114,107,71,114,111,117,112,73,110,102,111,40,67,76,95,75,69,82,78,69,76,95,76,79,67,65,76,95,77,69,77,95,83,73,90,69,41,0,0,0,0,0,0,99,111,101,114,99,105,110,103,32,119,111,114,107,32,103,114,111,117,112,32,115,105,122,101,32,116,111,32,102,105,116,32,119,105,116,104,105,110,32,104,97,114,100,119,97,114,101,32,108,105,109,105,116,115,46,32,32,78,101,119,32,115,105,122,101,32,105,115,32,37,100,10,0,0,0,0,0,0,0,0,111,117,116,112,117,116,95,97,114,114,97,121,95,118,101,114,105,102,121,0,0,0,0,0,105,110,115,117,102,102,105,99,105,101,110,116,32,109,101,109,111,114,121,32,116,111,32,112,101,114,102,111,114,109,32,116,104,105,115,32,119,111,114,107,108,111,97,100,46,10,0,0,99,108,67,114,101,97,116,101,66,117,102,102,101,114,40,105,110,112,117,116,95,98,117,102,102,101,114,41,0,0,0,0,99,108,67,114,101,97,116,101,66,117,102,102,101,114,40,109,97,116,114,105,120,95,98,117,102,102,101,114,41,0,0,0,99,108,67,114,101,97,116,101,66,117,102,102,101,114,40,111,117,116,112,117,116,95,98,117,102,102,101,114,41,0,0,0,99,108,69,110,113,117,101,117,101,77,97,112,66,117,102,102,101,114,40,105,110,112,117,116,95,97,114,114,97,121,41,0,99,108,69,110,113,117,101,117,101,77,97,112,66,117,102,102,101,114,40,116,105,108,101,98,117,102,102,101,114,41,0,0,99,108,69,110,113,117,101,117,101,77,97,112,66,117,102,102,101,114,40,111,117,116,112,117,116,95,97,114,114,97,121,41,0,0,0,0,0,0,0,0,99,108,69,110,113,117,101,117,101,85,110,109,97,112,77,101,109,79,98,106,101,99,116,40,116,105,108,101,98,117,102,102,101,114,41,0,0,0,0,0,99,108,69,110,113,117,101,117,101,85,110,109,97,112,77,101,109,79,98,106,101,99,116,40,105,110,112,117,116,95,97,114,114,97,121,41,0,0,0,0,99,108,69,110,113,117,101,117,101,85,110,109,97,112,77,101,109,79,98,106,101,99,116,40,111,117,116,112,117,116,95,97,114,114,97,121,41,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,48,41,0,0,0,0,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,49,41,0,0,0,0,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,50,41,0,0,0,0,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,51,41,0,0,0,0,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,52,41,0,0,0,0,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,53,41,0,0,0,0,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,54,41,0,0,0,0,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,55,41,0,0,0,0,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,56,41,0,0,0,0,0,0,0,99,108,83,101,116,75,101,114,110,101,108,65,114,103,40,57,41,0,0,0,0,0,0,0,99,108,69,110,113,117,101,117,101,78,68,82,97,110,103,101,75,101,114,110,101,108,0,0,97,118,103,32,101,114,114,111,114,32,61,32,37,108,101,44,32,0,0,0,0,0,0,0,40,109,97,116,114,105,120,32,37,115,41,10,0,0,0,0,99,108,69,110,113,117,101,117,101,85,110,109,97,112,77,101,109,79,98,106,101,99,116,40,105,110,112,117,116,41,0,0,99,108,69,110,113,117,101,117,101,85,110,109,97,112,77,101,109,79,98,106,101,99,116,40,111,117,116,112,117,116,41,0,99,108,70,105,110,105,115,104,0,0,0,0,0,0,0,0,99,108,82,101,108,101,97,115,101,69,118,101,110,116,40,48,41,0,0,0,0,0,0,0,99,108,82,101,108,101,97,115,101,69,118,101,110,116,40,49,41,0,0,0,0,0,0,0,99,108,82,101,108,101,97,115,101,77,101,109,79,98,106,101,99,116,40,105,110,112,117,116,41,0,0,0,0,0,0,0,99,108,82,101,108,101,97,115,101,77,101,109,79,98,106,101,99,116,40,109,97,116,114,105,120,41,0,0,0,0,0,0,99,108,82,101,108,101,97,115,101,77,101,109,79,98,106,101,99,116,40,111,117,116,112,117,116,41,0,0,0,0,0,0,99,108,82,101,108,101,97,115,101,67,111,109,109,97,110,100,81,117,101,117,101,0,0,0,99,108,82,101,108,101,97,115,101,75,101,114,110,101,108,0,99,108,82,101,108,101,97,115,101,80,114,111,103,114,97,109,0,0,0,0,0,0,0,0,99,108,82,101,108,101,97,115,101,67,111,110,116,101,120,116,0,0,0,0,0,0,0,0,114,0,0,0,0,0,0,0,67,111,117,108,100,110,39,116,32,111,112,101,110,32,37,115,10,0,0,0,0,0,0,0,109,97,108,108,111,99,32,102,97,105,108,101,100,10,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,58,32,105,108,108,101,103,97,108,32,111,112,116,105,111,110,58,32,0,0,0,0,0,0,10,0,0,0,0,0,0,0,58,32,111,112,116,105,111,110,32,114,101,113,117,105,114,101,115,32,97,110,32,97,114,103,117,109,101,110,116,58,32,0,0,0,0,0,0,0,0,0,2,0,0,192,3,0,0,192,4,0,0,192,5,0,0,192,6,0,0,192,7,0,0,192,8,0,0,192,9,0,0,192,10,0,0,192,11,0,0,192,12,0,0,192,13,0,0,192,14,0,0,192,15,0,0,192,16,0,0,192,17,0,0,192,18,0,0,192,19,0,0,192,20,0,0,192,21,0,0,192,22,0,0,192,23,0,0,192,24,0,0,192,25,0,0,192,26,0,0,192,27,0,0,192,28,0,0,192,29,0,0,192,30,0,0,192,31,0,0,192,0,0,0,179,1,0,0,195,2,0,0,195,3,0,0,195,4,0,0,195,5,0,0,195,6,0,0,195,7,0,0,195,8,0,0,195,9,0,0,195,10,0,0,195,11,0,0,195,12,0,0,195,13,0,0,211,14,0,0,195,15,0,0,195,0,0,12,187,1,0,12,195,2,0,12,195,3,0,12,195,4,0,12,211,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);




var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}


  function _llvm_lifetime_end() {}

  
   
  Module["_rand_r"] = _rand_r;
  
  var ___rand_seed=allocate([0x0273459b, 0, 0, 0], "i32", ALLOC_STATIC); 
  Module["_rand"] = _rand;

   
  Module["_i64Subtract"] = _i64Subtract;

  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }

  
  
  var GL={counter:1,lastError:0,buffers:[],programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],vaos:[],byteSizeByTypeRoot:5120,byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],programInfos:{},stringCache:{},packAlignment:4,unpackAlignment:4,init:function () {
        GL.createLog2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        Browser.moduleContextCreatedCallbacks.push(GL.initExtensions);
      },recordError:function recordError(errorCode) {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },getNewId:function (table) {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },MINI_TEMP_BUFFER_SIZE:16,miniTempBuffer:null,miniTempBufferViews:[0],MAX_TEMP_BUFFER_SIZE:2097152,tempVertexBuffers1:[],tempVertexBufferCounters1:[],tempVertexBuffers2:[],tempVertexBufferCounters2:[],numTempVertexBuffersPerSize:64,tempIndexBuffers:[],tempQuadIndexBuffer:null,log2ceilLookup:null,createLog2ceilLookup:function (maxValue) {
        GL.log2ceilLookup = new Uint8Array(maxValue+1);
        var log2 = 0;
        var pow2 = 1;
        GL.log2ceilLookup[0] = 0;
        for(var i = 1; i <= maxValue; ++i) {
          if (i > pow2) {
            pow2 <<= 1;
            ++log2;
          }
          GL.log2ceilLookup[i] = log2;
        }
      },generateTempBuffers:function (quads) {
        var largestIndex = GL.log2ceilLookup[GL.MAX_TEMP_BUFFER_SIZE];
        GL.tempVertexBufferCounters1.length = GL.tempVertexBufferCounters2.length = largestIndex+1;
        GL.tempVertexBuffers1.length = GL.tempVertexBuffers2.length = largestIndex+1;
        GL.tempIndexBuffers.length = largestIndex+1;
        for(var i = 0; i <= largestIndex; ++i) {
          GL.tempIndexBuffers[i] = null; // Created on-demand
          GL.tempVertexBufferCounters1[i] = GL.tempVertexBufferCounters2[i] = 0;
          var ringbufferLength = GL.numTempVertexBuffersPerSize;
          GL.tempVertexBuffers1[i] = [];
          GL.tempVertexBuffers2[i] = [];
          var ringbuffer1 = GL.tempVertexBuffers1[i];
          var ringbuffer2 = GL.tempVertexBuffers2[i];
          ringbuffer1.length = ringbuffer2.length = ringbufferLength;
          for(var j = 0; j < ringbufferLength; ++j) {
            ringbuffer1[j] = ringbuffer2[j] = null; // Created on-demand
          }
        }
  
        if (quads) {
          // GL_QUAD indexes can be precalculated
          GL.tempQuadIndexBuffer = GLctx.createBuffer();
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0, v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+3;
            if (i >= numIndexes) break;
            v += 4;
          }
          GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, quadIndexes, GLctx.STATIC_DRAW);
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, null);
        }
      },getTempVertexBuffer:function getTempVertexBuffer(sizeBytes) {
        var idx = GL.log2ceilLookup[sizeBytes];
        var ringbuffer = GL.tempVertexBuffers1[idx];
        var nextFreeBufferIndex = GL.tempVertexBufferCounters1[idx];
        GL.tempVertexBufferCounters1[idx] = (GL.tempVertexBufferCounters1[idx]+1) & (GL.numTempVertexBuffersPerSize-1);
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
          return vbo;
        }
        var prevVBO = GLctx.getParameter(GLctx.ARRAY_BUFFER_BINDING);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(GLctx.ARRAY_BUFFER, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(GLctx.ARRAY_BUFFER, 1 << idx, GLctx.DYNAMIC_DRAW);
        GLctx.bindBuffer(GLctx.ARRAY_BUFFER, prevVBO);
        return ringbuffer[nextFreeBufferIndex];
      },getTempIndexBuffer:function getTempIndexBuffer(sizeBytes) {
        var idx = GL.log2ceilLookup[sizeBytes];
        var ibo = GL.tempIndexBuffers[idx];
        if (ibo) {
          return ibo;
        }
        var prevIBO = GLctx.getParameter(GLctx.ELEMENT_ARRAY_BUFFER_BINDING);
        GL.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.tempIndexBuffers[idx]);
        GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, 1 << idx, GLctx.DYNAMIC_DRAW);
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, prevIBO);
        return GL.tempIndexBuffers[idx];
      },newRenderingFrameStarted:function newRenderingFrameStarted() {
        var vb = GL.tempVertexBuffers1;
        GL.tempVertexBuffers1 = GL.tempVertexBuffers2;
        GL.tempVertexBuffers2 = vb;
        vb = GL.tempVertexBufferCounters1;
        GL.tempVertexBufferCounters1 = GL.tempVertexBufferCounters2;
        GL.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup[GL.MAX_TEMP_BUFFER_SIZE];
        for(var i = 0; i <= largestIndex; ++i) {
          GL.tempVertexBufferCounters1[i] = 0;
        }
      },getSource:function (shader, count, string, length) {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var frag;
          if (length) {
            var len = HEAP32[(((length)+(i*4))>>2)];
            if (len < 0) {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
            } else {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)], len);
            }
          } else {
            frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
          }
          source += frag;
        }
        return source;
      },computeImageSize:function (width, height, sizePerPixel, alignment) {
        function roundedToNextMultipleOf(x, y) {
          return Math.floor((x + y - 1) / y) * y
        }
        var plainRowSize = width * sizePerPixel;
        var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
        return (height <= 0) ? 0 :
                 ((height - 1) * alignedRowSize + plainRowSize);
      },get:function (name_, p, type) {
        // Guard against user passing a null pointer.
        // Note that GLES2 spec does not say anything about how passing a null pointer should be treated.
        // Testing on desktop core GL 3, the application crashes on glGetIntegerv to a null pointer, but
        // better to report an error instead of doing anything random.
        if (!p) {
          GL.recordError(0x0501 /* GL_INVALID_VALUE */);
          return;
        }
        var ret = undefined;
        switch(name_) { // Handle a few trivial GLES values
          case 0x8DFA: // GL_SHADER_COMPILER
            ret = 1;
            break;
          case 0x8DF8: // GL_SHADER_BINARY_FORMATS
            if (type !== 'Integer') {
              GL.recordError(0x0500); // GL_INVALID_ENUM
            }
            return; // Do not write anything to the out pointer, since no binary formats are supported.
          case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
            ret = 0;
            break;
          case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
            // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be queried for length),
            // so implement it ourselves to allow C++ GLES2 code get the length.
            var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
            ret = formats.length;
            break;
          case 0x8B9A: // GL_IMPLEMENTATION_COLOR_READ_TYPE
            ret = 0x1401; // GL_UNSIGNED_BYTE
            break;
          case 0x8B9B: // GL_IMPLEMENTATION_COLOR_READ_FORMAT
            ret = 0x1908; // GL_RGBA
            break;
        }
  
        if (ret === undefined) {
          var result = GLctx.getParameter(name_);
          switch (typeof(result)) {
            case "number":
              ret = result;
              break;
            case "boolean":
              ret = result ? 1 : 0;
              break;
            case "string":
              GL.recordError(0x0500); // GL_INVALID_ENUM
              return;
            case "object":
              if (result === null) {
                // null is a valid result for some (e.g., which buffer is bound - perhaps nothing is bound), but otherwise
                // can mean an invalid name_, which we need to report as an error
                switch(name_) {
                  case 0x8894: // ARRAY_BUFFER_BINDING
                  case 0x8B8D: // CURRENT_PROGRAM
                  case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                  case 0x8CA6: // FRAMEBUFFER_BINDING
                  case 0x8CA7: // RENDERBUFFER_BINDING
                  case 0x8069: // TEXTURE_BINDING_2D
                  case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                    ret = 0;
                    break;
                  }
                  default: {
                    GL.recordError(0x0500); // GL_INVALID_ENUM
                    return;
                  }
                }
              } else if (result instanceof Float32Array ||
                         result instanceof Uint32Array ||
                         result instanceof Int32Array ||
                         result instanceof Array) {
                for (var i = 0; i < result.length; ++i) {
                  switch (type) {
                    case 'Integer': HEAP32[(((p)+(i*4))>>2)]=result[i];   break;
                    case 'Float':   HEAPF32[(((p)+(i*4))>>2)]=result[i]; break;
                    case 'Boolean': HEAP8[(((p)+(i))|0)]=result[i] ? 1 : 0;    break;
                    default: throw 'internal glGet error, bad type: ' + type;
                  }
                }
                return;
              } else if (result instanceof WebGLBuffer ||
                         result instanceof WebGLProgram ||
                         result instanceof WebGLFramebuffer ||
                         result instanceof WebGLRenderbuffer ||
                         result instanceof WebGLTexture) {
                ret = result.name | 0;
              } else {
                GL.recordError(0x0500); // GL_INVALID_ENUM
                return;
              }
              break;
            default:
              GL.recordError(0x0500); // GL_INVALID_ENUM
              return;
          }
        }
  
        switch (type) {
          case 'Integer': HEAP32[((p)>>2)]=ret;    break;
          case 'Float':   HEAPF32[((p)>>2)]=ret;  break;
          case 'Boolean': HEAP8[(p)]=ret ? 1 : 0; break;
          default: throw 'internal glGet error, bad type: ' + type;
        }
      },getTexPixelData:function (type, format, width, height, pixels, internalFormat) {
        var sizePerPixel;
        switch (type) {
          case 0x1401 /* GL_UNSIGNED_BYTE */:
            switch (format) {
              case 0x1906 /* GL_ALPHA */:
              case 0x1909 /* GL_LUMINANCE */:
                sizePerPixel = 1;
                break;
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4;
                break;
              case 0x190A /* GL_LUMINANCE_ALPHA */:
                sizePerPixel = 2;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1403 /* GL_UNSIGNED_SHORT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 2;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1405 /* GL_UNSIGNED_INT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 4;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x84FA /* UNSIGNED_INT_24_8_WEBGL */:
            sizePerPixel = 4;
            break;
          case 0x8363 /* GL_UNSIGNED_SHORT_5_6_5 */:
          case 0x8033 /* GL_UNSIGNED_SHORT_4_4_4_4 */:
          case 0x8034 /* GL_UNSIGNED_SHORT_5_5_5_1 */:
            sizePerPixel = 2;
            break;
          case 0x1406 /* GL_FLOAT */:
            assert(GL.floatExt, 'Must have OES_texture_float to use float textures');
            switch (format) {
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3*4;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4*4;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            internalFormat = GLctx.RGBA;
            break;
          default:
            throw 'Invalid type (' + type + ')';
        }
        var bytes = GL.computeImageSize(width, height, sizePerPixel, GL.unpackAlignment);
        if (type == 0x1401 /* GL_UNSIGNED_BYTE */) {
          pixels = HEAPU8.subarray((pixels),(pixels+bytes));
        } else if (type == 0x1406 /* GL_FLOAT */) {
          pixels = HEAPF32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else if (type == 0x1405 /* GL_UNSIGNED_INT */ || type == 0x84FA /* UNSIGNED_INT_24_8_WEBGL */) {
          pixels = HEAPU32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else {
          pixels = HEAPU16.subarray((pixels)>>1,(pixels+bytes)>>1);
        }
        return {
          pixels: pixels,
          internalFormat: internalFormat
        }
      },initExtensions:function () {
        if (GL.initExtensions.done) return;
        GL.initExtensions.done = true;
  
        if (!Module.useWebGL) return; // an app might link both gl and 2d backends
  
        GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
        for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
          GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i+1);
        }
  
        GL.maxVertexAttribs = GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);
  
        // Detect the presence of a few extensions manually, this GL interop layer itself will need to know if they exist. 
        GL.compressionExt = GLctx.getExtension('WEBGL_compressed_texture_s3tc') ||
                            GLctx.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
                            GLctx.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
  
        GL.anisotropicExt = GLctx.getExtension('EXT_texture_filter_anisotropic') ||
                            GLctx.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
                            GLctx.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
  
        GL.floatExt = GLctx.getExtension('OES_texture_float');
        
        // Extension available from Firefox 26 and Google Chrome 30
        GL.instancedArraysExt = GLctx.getExtension('ANGLE_instanced_arrays');
        
        // Extension available from Firefox 25 and WebKit
        GL.vaoExt = Module.ctx.getExtension('OES_vertex_array_object');
  
        // These are the 'safe' feature-enabling extensions that don't add any performance impact related to e.g. debugging, and
        // should be enabled by default so that client GLES2/GL code will not need to go through extra hoops to get its stuff working.
        // As new extensions are ratified at http://www.khronos.org/registry/webgl/extensions/ , feel free to add your new extensions
        // here, as long as they don't produce a performance impact for users that might not be using those extensions.
        // E.g. debugging-related extensions should probably be off by default.
        var automaticallyEnabledExtensions = [ "OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives",
                                               "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture",
                                               "OES_element_index_uint", "EXT_texture_filter_anisotropic", "ANGLE_instanced_arrays",
                                               "OES_texture_float_linear", "OES_texture_half_float_linear", "WEBGL_compressed_texture_atc",
                                               "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float",
                                               "EXT_frag_depth", "EXT_sRGB", "WEBGL_draw_buffers", "WEBGL_shared_resources" ];
  
        function shouldEnableAutomatically(extension) {
          for(var i in automaticallyEnabledExtensions) {
            var include = automaticallyEnabledExtensions[i];
            if (ext.indexOf(include) != -1) {
              return true;
            }
          }
          return false;
        }
  
        var extensions = GLctx.getSupportedExtensions();
        for(var e in extensions) {
          var ext = extensions[e].replace('MOZ_', '').replace('WEBKIT_', '');
          if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
            GLctx.getExtension(ext); // Calling .getExtension enables that extension permanently, no need to store the return value to be enabled.
          }
        }
      },populateUniformTable:function (program) {
        var p = GL.programs[program];
        GL.programInfos[program] = {
          uniforms: {},
          maxUniformLength: 0, // This is eagerly computed below, since we already enumerate all uniforms anyway.
          maxAttributeLength: -1 // This is lazily computed and cached, computed when/if first asked, "-1" meaning not computed yet.
        };
  
        var ptable = GL.programInfos[program];
        var utable = ptable.uniforms;
        // A program's uniform table maps the string name of an uniform to an integer location of that uniform.
        // The global GL.uniforms map maps integer locations to WebGLUniformLocations.
        var numUniforms = GLctx.getProgramParameter(p, GLctx.ACTIVE_UNIFORMS);
        for (var i = 0; i < numUniforms; ++i) {
          var u = GLctx.getActiveUniform(p, i);
  
          var name = u.name;
          ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length+1);
  
          // Strip off any trailing array specifier we might have got, e.g. "[0]".
          if (name.indexOf(']', name.length-1) !== -1) {
            var ls = name.lastIndexOf('[');
            name = name.slice(0, ls);
          }
  
          // Optimize memory usage slightly: If we have an array of uniforms, e.g. 'vec3 colors[3];', then 
          // only store the string 'colors' in utable, and 'colors[0]', 'colors[1]' and 'colors[2]' will be parsed as 'colors'+i.
          // Note that for the GL.uniforms table, we still need to fetch the all WebGLUniformLocations for all the indices.
          var loc = GLctx.getUniformLocation(p, name);
          var id = GL.getNewId(GL.uniforms);
          utable[name] = [u.size, id];
          GL.uniforms[id] = loc;
  
          for (var j = 1; j < u.size; ++j) {
            var n = name + '['+j+']';
            loc = GLctx.getUniformLocation(p, n);
            id = GL.getNewId(GL.uniforms);
  
            GL.uniforms[id] = loc;
          }
        }
      }};var CL={cl_init:0,cl_extensions:["KHR_GL_SHARING","KHR_fp16","KHR_fp64"],cl_digits:[1,2,3,4,5,6,7,8,9,0],cl_kernels_sig:{},cl_structs_sig:{},cl_pn_type:[],cl_objects:{},cl_objects_map:{},cl_objects_retains:{},cl_objects_mem_callback:{},cl_validator:{},cl_validator_argsize:{},init:function () {
        if (CL.cl_init == 0) {
          console.log('%c WebCL-Translator + Validator V2.0 ! ', 'background: #222; color: #bada55');
          var nodejs = (typeof window === 'undefined');
          if(nodejs) {
            webcl = require('../webcl');
          }
  
          if (webcl == undefined) {
            alert("Unfortunately your system does not support WebCL. " +
            "Make sure that you have WebKit Samsung or Firefox Nokia plugin");
  
            console.error("Unfortunately your system does not support WebCL.\n");
            console.error("Make sure that you have WebKit Samsung or Firefox Nokia plugin\n");  
          } else {
  
            // Add webcl constant for parser
            // Object.defineProperty(webcl, "SAMPLER"      , { value : 0x1300,writable : false });
            // Object.defineProperty(webcl, "IMAGE2D"      , { value : 0x1301,writable : false });
            // Object.defineProperty(webcl, "IMAGE3D"      , { value : 0x1302,writable : false });          
            // Object.defineProperty(webcl, "UNSIGNED_LONG", { value : 0x1304,writable : false });
            // Object.defineProperty(webcl, "LONG"         , { value : 0x1303,writable : false });
            // Object.defineProperty(webcl, "MAP_READ"     , { value : 0x1   ,writable : false });
            // Object.defineProperty(webcl, "MAP_WRITE"    , { value : 0x2   ,writable : false });
  
            for (var i = 0; i < CL.cl_extensions.length; i ++) {
  
              if (webcl.enableExtension(CL.cl_extensions[i])) {
                console.info("WebCL Init : extension "+CL.cl_extensions[i]+" supported.");
              } else {
                console.info("WebCL Init : extension "+CL.cl_extensions[i]+" not supported !!!");
              }
            }
            CL.cl_init = 1;
          }
        }
  
        return CL.cl_init;
      },udid:function (obj) {    
        var _id;
  
        if (obj !== undefined) {
  
          if ( obj.hasOwnProperty('udid') ) {
           _id = obj.udid;
  
           if (_id !== undefined) {
             return _id;
           }
          }
        }
  
        var _uuid = [];
  
        _uuid[0] = CL.cl_digits[0 | Math.random()*CL.cl_digits.length-1]; // First digit of udid can't be 0
        for (var i = 1; i < 6; i++) _uuid[i] = CL.cl_digits[0 | Math.random()*CL.cl_digits.length];
  
        _id = _uuid.join('');
  
      
        // /!\ Call udid when you add inside cl_objects if you pass object in parameter
        if (obj !== undefined) {
          Object.defineProperty(obj, "udid", { value : _id,writable : false });
          CL.cl_objects[_id]=obj;
        }
  
        return _id;      
      },cast_long:function (arg_size) {
        var _sizelong = [];
        _sizelong.push(((arg_size & 0xFFFFFFFF00000000) >> 32));
        _sizelong.push((arg_size & 0xFFFFFFFF));
        // var _origin = x << 32 | y;
        return new Int32Array(_sizelong);
      },stringType:function (pn_type) {
        switch(pn_type) {
          case webcl.SIGNED_INT8:
            return 'INT8';
          case webcl.SIGNED_INT16:
            return 'INT16';
          case webcl.SIGNED_INT32:
            return 'INT32';
          case webcl.UNSIGNED_INT8:
            return 'UINT8';
          case webcl.UNSIGNED_INT16:
            return 'UINT16';
          case webcl.UNSIGNED_INT32:
            return 'UINT32';
          case 0x1304 /*webcl.UNSIGNED_LONG*/:
            return 'ULONG';
          case 0x1303 /*webcl.SIGNED_LONG*/:
            return 'LONG';       
          case webcl.FLOAT:
            return 'FLOAT';
          case webcl.LOCAL:
            return '__local';   
          case 0x1300 /*webcl.SAMPLER*/:
            return 'sampler_t';   
          case 0x1301 /*webcl.IMAGE2D*/:
            return 'image2d_t';        
          case 0x1302 /*webcl.IMAGE3D*/:
            return 'image3d_t';            
          default:
            if (typeof(pn_type) == "string") return 'struct';
            return 'UNKNOWN';
        }
      },parseType:function (string) {
        var _value = -1;
      
        // First ulong for the webcl validator
        if ( (string.indexOf("ulong") >= 0 ) || (string.indexOf("unsigned long") >= 0 ) ) {
          // \todo : long ???? 
          _value = 0x1304 /*webcl.UNSIGNED_LONG*/;  
        } else if ( string.indexOf("long") >= 0 ) {
          _value = 0x1303 /*webcl.SIGNED_LONG*/;
        } else if (string.indexOf("float") >= 0 ) {
          _value = webcl.FLOAT;
        } else if ( (string.indexOf("uchar") >= 0 ) || (string.indexOf("unsigned char") >= 0 ) ) {
          _value = webcl.UNSIGNED_INT8;
        } else if ( string.indexOf("char") >= 0 ) {
          _value = webcl.SIGNED_INT8;
        } else if ( (string.indexOf("ushort") >= 0 ) || (string.indexOf("unsigned short") >= 0 ) ) {
          _value = webcl.UNSIGNED_INT16;
        } else if ( string.indexOf("short") >= 0 ) {
          _value = webcl.SIGNED_INT16;                     
        } else if ( (string.indexOf("uint") >= 0 ) || (string.indexOf("unsigned int") >= 0 ) ) {
          _value = webcl.UNSIGNED_INT32;          
        } else if ( ( string.indexOf("int") >= 0 ) || ( string.indexOf("enum") >= 0 ) ) {
          _value = webcl.SIGNED_INT32;
        } else if ( string.indexOf("image3d_t") >= 0 ) {
          _value = 0x1302 /*webcl.IMAGE3D*/;        
        } else if ( string.indexOf("image2d_t") >= 0 ) {
          _value = 0x1301 /*webcl.IMAGE2D*/;
        } else if ( string.indexOf("sampler_t") >= 0 ) {
          _value = 0x1300 /*webcl.SAMPLER*/;
        }
  
        return _value;
      },parseStruct:function (kernel_string,struct_name) {
  
        // Experimental parse of Struct
        // Search kernel function like 'struct_name { }' or '{ } struct_name'
        // --------------------------------------------------------------------------------
        // Step 1 : Search pattern struct_name { }
        // Step 2 : if no result : Search pattern { } struct_name
        // Step 3 : if no result : return
        // Step 4 : split by ; // Num of variable of the structure  : int toto; float tata;
        // Step 5 : split by , // Num of variable for each type     : float toto,tata,titi;
        // Step 6 : Search pattern [num] // Array Variable          : float toto[4];
        // Step 7 : Search type of the line
        // Step 8 : if exist add type else search other struct
        // --------------------------------------------------------------------------------
  
        CL.cl_structs_sig[struct_name] = [];
  
        // First search if is #define
        var _re_define = new RegExp("#[\ ]*define[\ ]*"+struct_name+"[\ ]*[A-Za-z0-9_\s]*");
        var _define = kernel_string.match(_re_define);
  
        if (_define != null && _define.length == 1) {
  
          // Get type of the line
          var _str = _define[0];
          var _type = CL.parseType(_str);
          
          if (_type != -1) {
            CL.cl_structs_sig[struct_name].push(_type);
          } else {
            var _lastSpace = _str.lastIndexOf(" ");
            var _res = _str.substr(_lastSpace + 1,_str.length - _lastSpace);
  
            CL.parseStruct(kernel_string,_res);
          }
      
          return;
        }
  
        // Second search if is typedef type name;
        var _re_typedef = new RegExp("typedef[\ ]*[A-Za-z0-9_\s]*[\ ]*"+struct_name+"[\ ]*;");
        var _typedef = kernel_string.match(_re_typedef);
  
        if (_typedef != null && _typedef.length == 1) {
  
          // Get type of the line
          var _str = _typedef[0];
          var _type = CL.parseType(_str);
  
          if (_type != -1) {
            CL.cl_structs_sig[struct_name].push(_type);
          } else {
            _str = _str.replace(/^\s+|\s+$/g, ""); // trim
            var _firstSpace = _str.indexOf(" ");
            var _lastSpace = _str.lastIndexOf(" ");
            var _res = _str.substr(_firstSpace + 1,_lastSpace - _firstSpace - 1);
            
            CL.parseStruct(kernel_string,_res);
          }
          
          return;
        }
  
        // search pattern : struct_name { } ;
        var _re_before = new RegExp(struct_name+"[\ ]"+"\{([^}]+)\}");
  
        // search pattern : { } struct_name;
        var _re_after = new RegExp("\{([^}]+)\}"+"[\ ]"+struct_name);
  
        var _res = kernel_string.match(_re_before);
        var _contains_struct = "";
        
        if (_res != null && _res.length == 2) {
          _contains_struct = _res[1];
        } else {
          _res = kernel_string.match(_re_after);
          if (_res != null && _res.length == 2) {
              _contains_struct = _res[1];
          } else {
            return;
          }
        }
  
        var _var = _contains_struct.split(";");
        for (var i = 0; i < _var.length-1; i++ ) {
          // Need for unsigned int width, height;
          var _subvar = _var[i].split(","); 
          
          // Get type of the line
          var _type = CL.parseType(_var[i]);
        
          // Need for float mu[4];
          var _arrayNum = 0;
          _res = _var[i].match(/[0-9]+/); 
          if (_res != null) _arrayNum = _res;
        
          if ( _type != -1) {
            for (var j = 0; j < Math.max(_subvar.length,_arrayNum) ; j++ ) {
              CL.cl_structs_sig[struct_name].push(_type);
            }
          } else {
            // Search name of the parameter
            var _struct = _subvar[0].replace(/^\s+|\s+$/g, ""); // trim
            var _name = "";
            var _start = _struct.lastIndexOf(" "); 
            for (var j = _start - 1; j >= 0 ; j--) {
              var _chara = _struct.charAt(j);
              if (_chara == ' ' && _name.length > 0) {
                break;
              } else if (_chara != ' ') {
                _name = _chara + _name;
              }
            }
            
            // If struct is unknow search it
            if (!(_name in CL.cl_structs_sig && CL.cl_structs_sig[_name].length > 0)) {
              CL.parseStruct(kernel_string,_name);
            }
  
            for (var j = 0; j < Math.max(_subvar.length,_arrayNum) ; j++ ) {
              CL.cl_structs_sig[struct_name] = CL.cl_structs_sig[struct_name].concat(CL.cl_structs_sig[_name]);  
            }
          }
        }
      },parseKernel:function (kernel_string) {
  
  
        // Experimental parse of Kernel
        // ----------------------------
        //
        // /!\ The minify kernel could be use by the program but some trouble with line
        // /!\ containing macro #define, for the moment only use the minify kernel for 
        // /!\ parsing __kernel and struct
        //
        // Search kernel function like __kernel ... NAME ( p1 , p2 , p3)  
        // --------------------------------------------------------------------------------
        // Step 1 : Minimize kernel removing all the comment and \r \n \t and multispace
        // Step 2 : Search pattern __kernel ... ( ... )
        // Step 3 : For each kernel
        // Step 3 . 1 : Search Open Brace
        // Step 3 . 2 : Search Kernel Name
        // Step 3 . 3 : Search Kernel Parameter
        // Step 3 . 4 : Grab { name : [ param, ... ] }
        // --------------------------------------------------------------------------------
  
        // Remove all comments ...
        var _mini_kernel_string  = kernel_string.replace(/(?:((["'])(?:(?:\\\\)|\\\2|(?!\\\2)\\|(?!\2).|[\n\r])*\2)|(\/\*(?:(?!\*\/).|[\n\r])*\*\/)|(\/\/[^\n\r]*(?:[\n\r]+|$))|((?:=|:)\s*(?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/)[gimy]?\.(?:exec|test|match|search|replace|split)\()|(\.(?:exec|test|match|search|replace|split)\((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|(<!--(?:(?!-->).)*-->))/g
  , "");
        
        // Remove all char \n \r \t ...
        _mini_kernel_string = _mini_kernel_string.replace(/\n/g, " ");
        _mini_kernel_string = _mini_kernel_string.replace(/\r/g, " ");
  
        // Remove all the multispace
        _mini_kernel_string = _mini_kernel_string.replace(/\s{2,}/g, " ");
  
        // Search pattern : __kernel ... ( ... )
        // var _matches = _mini_kernel_string.match(/__kernel[A-Za-z0-9_\s]+\(([^)]+)\)/g);
        // if (_matches == null) {
        //   console.error("/!\\ Not found kernel !!!");
        //   return;
        // }
  
        // Search kernel (Pattern doesn't work with extra __attribute__)
        var _matches = [];
        var _found = 1;
        var _stringKern = _mini_kernel_string;
        var _security = 10;
  
        // Search all the kernel
        while (_found && _security) {
          // Just in case no more than 10 loop
          _security --;
  
          var _pattern = "__kernel ";
          var _kern = _stringKern.indexOf(_pattern);
  
          if (_kern == -1) {
            _pattern = " kernel ";
            _kern = _stringKern.indexOf(" kernel ");
            if (_kern == -1) { 
              _pattern = "kernel ";
              _kern = _stringKern.indexOf("kernel ");
              if (_kern == -1) {
                _found = 0;
                continue;
              } else if (_kern != 0) {
                console.error("/!\\ Find word 'kernel' but is not a real kernel  .. ("+_kern+")");
                _stringKern = _stringKern.substr(_kern + _pattern.length,_stringKern.length - _kern);
                continue;
              }
            }
          }
  
          _stringKern = _stringKern.substr(_kern + _pattern.length,_stringKern.length - _kern);
   
          var _brace = _stringKern.indexOf("{");
          var _stringKern2 = _stringKern.substr(0,_brace);
          var _braceOpen = _stringKern2.lastIndexOf("(");
          var _braceClose = _stringKern2.lastIndexOf(")");
          var _stringKern3 = _stringKern2.substr(0,_braceOpen).replace(/^\s+|\s+$/g, ""); // trim
          var _space = _stringKern3.lastIndexOf(" ");
  
          _stringKern2 = _stringKern2.substr(_space + 1,_braceClose);
  
          // Add the kernel result like name_kernel(..., ... ,...)
          _matches.push(_stringKern2);
        }
  
        // For each kernel ....
        for (var i = 0; i < _matches.length; i ++) {
          // Search the open Brace
          var _brace = _matches[i].lastIndexOf("(");
  
          // Part before '('
          var _first_part = _matches[i].substr(0,_brace);
          _first_part = _first_part.replace(/^\s+|\s+$/g, ""); // trim
  
          // Part after ')'
          var _second_part = _matches[i].substr(_brace+1,_matches[i].length-_brace-2);
          _second_part = _second_part.replace(/^\s+|\s+$/g, ""); // trim
  
          // Search name part
          var _name = _first_part.substr(_first_part.lastIndexOf(" ") + 1);
  
          // If name already present reparse it may be is another test with not the same num of parameter ....
          if (_name in CL.cl_kernels_sig) {
            delete CL.cl_kernels_sig[_name]
          }
  
          // Search parameter part
          var _param = [];
  
          var _param_validator = [];
          var _param_argsize_validator = [];
          var _array = _second_part.split(","); 
          for (var j = 0; j < _array.length; j++) {
            var _type = CL.parseType(_array[j]);
  
            if (_array[j].indexOf("__local") >= 0 ) {
              _param.push(webcl.LOCAL);
  
              if (_array[j].indexOf("ulong _wcl") == -1 ) {
                _param_validator.push(_param.length - 1);
              } else {
                _param_argsize_validator.push(_param.length - 1);
              }
  
            } else if (_type == -1) {
                         
              _array[j] = _array[j].replace(/^\s+|\s+$/g, "");
              _array[j] = _array[j].replace("*", "");
  
              var _start = _array[j].lastIndexOf(" "); 
              if (_start != -1) {
                var _kernels_struct_name = "";
                // Search Parameter type Name
                for (var k = _start - 1; k >= 0 ; k--) {
  
                  var _chara = _array[j].charAt(k);
                  if (_chara == ' ' && _kernels_struct_name.length > 0) {
                    break;
                  } else if (_chara != ' ') {
                    _kernels_struct_name = _chara + _kernels_struct_name;
                  }
                }             
  
                // Parse struct only if is not already inside the map
                if (!(_kernels_struct_name in CL.cl_structs_sig))
                  CL.parseStruct(_mini_kernel_string, _kernels_struct_name);
              
                // Add the name of the struct inside the map of param kernel
                _param.push(_kernels_struct_name);         
  
              } else {
                _param.push(webcl.FLOAT);
              }
  
              if (_array[j].indexOf("ulong _wcl") == -1 ) {
                _param_validator.push(_param.length - 1);
              } else {
                _param_argsize_validator.push(_param.length - 1);
              }
  
            } else {
              _param.push(_type);
  
              if (_array[j].indexOf("ulong _wcl") == -1 ) {
                _param_validator.push(_param.length - 1);
              } else {
                _param_argsize_validator.push(_param.length - 1);
              }
            }
          }        
  
          CL.cl_kernels_sig[_name] = _param;
  
          CL.cl_validator[_name] = _param_validator;
          CL.cl_validator_argsize[_name] = _param_argsize_validator;
        }
  
        return _mini_kernel_string;
  
      },getImageSizeType:function (image) {
        var _sizeType = 0;
  
        
        var _info = CL.cl_objects[image].getInfo();
  
        switch (_info.channelType) {
          case webcl.SNORM_INT8:
          case webcl.SIGNED_INT8:
          case webcl.UNORM_INT8:        
          case webcl.UNSIGNED_INT8:
            _sizeType = 1;
            break;
          case webcl.SNORM_INT16:
          case webcl.SIGNED_INT16:
          case webcl.UNORM_INT16:        
          case webcl.UNSIGNED_INT16:
          case webcl.HALF_FLOAT:
            _sizeType = 2;      
            break;
          case webcl.SIGNED_INT32:
          case webcl.UNSIGNED_INT32:      
          case webcl.FLOAT:
            _sizeType = 4;
            break;
          default:
            console.error("getImageSizeType : This channel type is not yet implemented => "+_info.channelType);
        }
  
        return _sizeType;
      },getImageFormatType:function (image) {
        var _type = 0;
  
  
        var _info = CL.cl_objects[image].getInfo();
  
        switch (_info.channelType) {
          case webcl.SNORM_INT8:
          case webcl.SIGNED_INT8:
            _type = webcl.SIGNED_INT8;
            break;
          case webcl.UNORM_INT8:        
          case webcl.UNSIGNED_INT8:
            _type = webcl.UNSIGNED_INT8;
            break;
          case webcl.SNORM_INT16:
          case webcl.SIGNED_INT16:
            _type = webcl.SIGNED_INT16;
            break;
          case webcl.UNORM_INT16:        
          case webcl.UNSIGNED_INT16:
            _type = webcl.UNSIGNED_INT16;
            break;
          case webcl.SIGNED_INT32:
            _type = webcl.SIGNED_INT32;
          case webcl.UNSIGNED_INT32:
            _type = webcl.UNSIGNED_INT32;
            break;        
          case webcl.FLOAT:
            _type = webcl.FLOAT;
            break;
          default:
            console.error("getImageFormatType : This channel type is not yet implemented => "+_info.channelType);
        }
  
        return _type;
      },getImageSizeOrder:function (image) {
        var _sizeOrder = 0;
  
  
        var _info = CL.cl_objects[image].getInfo();
  
        switch (_info.channelOrder) {
          case webcl.R:
          case webcl.A:
          case webcl.INTENSITY:
          case webcl.LUMINANCE:
            _sizeOrder = 1;
            break;
          case webcl.RG:
          case webcl.RA:
            _sizeOrder = 2;
            break;
          case webcl.RGB:
            _sizeOrder = 3;
            break; 
          case webcl.RGBA:
          case webcl.BGRA:
          case webcl.ARGB:      
            _sizeOrder = 4;
            break;        
          default:
            console.error("getImageFormatType : This channel order is not yet implemented => "+_info.channelOrder);
        }
  
        return _sizeOrder;
      },getHostPtrArray:function (size,type) { 
  
        var _host_ptr = null;
  
        if (type.length == 0) {
        }
  
        if (type.length == 1) {
          switch(type[0][0]) {
            case webcl.SIGNED_INT8:
              _host_ptr = new Int8Array( size );
              break;
            case webcl.SIGNED_INT16:
              _host_ptr = new Int16Array( size >> 1 );
              break;
            case webcl.SIGNED_INT32:
              _host_ptr = new Int32Array( size >> 2 );
              break;
            case webcl.UNSIGNED_INT8:
              _host_ptr = new Uint8Array( size );
              break;
            case webcl.UNSIGNED_INT16:
              _host_ptr = new Uint16Array( size >> 1 );
              break;
            case webcl.UNSIGNED_INT32:
              _host_ptr = new Uint32Array( size >> 2 );
              break;         
            default:
              _host_ptr = new Float32Array( size >> 2 );
              break;
          }
        } else {
          _host_ptr = new Float32Array( size >> 2 );
        }
  
        return _host_ptr;
      },getCopyPointerToArray:function (ptr,size,type) { 
  
        var _host_ptr = null;
  
        if (type.length == 0) {
        }
  
        if (type.length == 1) {
          switch(type[0][0]) {
            case webcl.SIGNED_INT8:
              _host_ptr = new Int8Array( HEAP8.subarray((ptr),(ptr+size)) );
              break;
            case webcl.SIGNED_INT16:
              _host_ptr = new Int16Array( HEAP16.subarray((ptr)>>1,(ptr+size)>>1) );
              break;
            case webcl.SIGNED_INT32:
              _host_ptr = new Int32Array( HEAP32.subarray((ptr)>>2,(ptr+size)>>2) );
              break;
            case webcl.UNSIGNED_INT8:
              _host_ptr = new Uint8Array( HEAPU8.subarray((ptr),(ptr+size)) );
              break;
            case webcl.UNSIGNED_INT16:
              _host_ptr = new Uint16Array( HEAPU16.subarray((ptr)>>1,(ptr+size)>>1) );
              break;
            case webcl.UNSIGNED_INT32:
              _host_ptr = new Uint32Array( HEAPU32.subarray((ptr)>>2,(ptr+size)>>2) );
              break;         
            default:
              _host_ptr = new Float32Array( HEAPF32.subarray((ptr)>>2,(ptr+size)>>2) );
              break;
          }
        } else {
          _host_ptr = new Float32Array( HEAPF32.subarray((ptr)>>2,(ptr+size)>>2) );
          
          // console.info("------");
          // _host_ptr = new DataView(new ArrayBuffer(size));
  
          // var _offset = 0;
          // for (var i = 0; i < type.length; i++) {
          //   var _type = type[i][0];
          //   var _num = type[i][1];
          //   switch(_type) {
          //     case webcl.SIGNED_INT8:
          //       _host_ptr.setInt8(_offset,new Int8Array( HEAP8.subarray((ptr+_offset),(ptr+_offset+_num)) ));
          //       console.info("setInt8 : "+_offset+ " - "+(_offset+_num)+" / "+size );
          //       _offset += _num;
          //       break;
          //     case webcl.SIGNED_INT16:
          //       _host_ptr.setInt16(_offset,new Int16Array( HEAP16.subarray((ptr+_offset)>>1,(ptr+_offset+_num*2)>>1) ));
          //       console.info("setInt16 : "+_offset+ " - "+(_offset+_num*2)+" / "+size );
          //       _offset += 2*_num;
          //       break;
          //     case webcl.SIGNED_INT32:
          //       _host_ptr.setInt32(_offset,new Int32Array( HEAP32.subarray((ptr+_offset)>>2,(ptr+_offset+_num*4)>>2) ));
          //       console.info("setInt32 : "+_offset+ " - "+(_offset+_num*4)+" / "+size );
          //       _offset += 4*_num;
          //       break;
          //     case webcl.UNSIGNED_INT8:
          //       _host_ptr.setUint8(_offset,new Uint8Array( HEAPU8.subarray((ptr+_offset),(ptr+_offset+_num)) ));
          //       console.info("setUint8 : "+_offset+ " - "+(_offset+_num)+" / "+size );
          //       _offset += _num;
          //       break;
          //     case webcl.UNSIGNED_INT16:
          //       host_ptr.setUint16(_offset,new Uint16Array( HEAPU16.subarray((ptr+_offset)>>1,(ptr+_offset+_num*2)>>1) ));
          //       console.info("setUint16 : "+_offset+ " - "+(_offset+_num*2)+" / "+size );
          //       _offset += 2*_num;
          //       break;
          //     case webcl.UNSIGNED_INT32:
          //       _host_ptr.setUint32(_offset,new Uint32Array( HEAPU32.subarray((ptr+_offset)>>2,(ptr+_offset+_num*4)>>2) ));
          //       console.info("setUint32 : "+_offset+ " - "+(_offset+_num*4)+" / "+size );
          //       _offset += 4*_num;
          //       break;         
          //     default:
          //       _host_ptr.setFloat32(_offset,new Float32Array( HEAPF32.subarray((ptr+_offset)>>2,(ptr+_offset+_num*4)>>2) ));
          //       console.info("setFloat32 : "+_offset+ " - "+(_offset+_num*4)+" / "+size );
          //       _offset += 4*_num;
          //       break;
          //   }
          // }
        }
  
        return _host_ptr;
      },getReferencePointerToArray:function (ptr,size,type) {  
        var _host_ptr = null;
  
        if (type.length == 0) {
        }
  
        if (type.length == 1) {
          switch(type[0][0]) {
            case webcl.SIGNED_INT8:
              _host_ptr = HEAP8.subarray((ptr),(ptr+size));
              break;
            case webcl.SIGNED_INT16:
              _host_ptr = HEAP16.subarray((ptr)>>1,(ptr+size)>>1);
              break;
            case webcl.SIGNED_INT32:
              _host_ptr = HEAP32.subarray((ptr)>>2,(ptr+size)>>2);
              break;
            case webcl.UNSIGNED_INT8:
              _host_ptr = HEAPU8.subarray((ptr),(ptr+size));
              break;
            case webcl.UNSIGNED_INT16:
              _host_ptr = HEAPU16.subarray((ptr)>>1,(ptr+size)>>1);
              break;
            case webcl.UNSIGNED_INT32:
              _host_ptr = HEAPU32.subarray((ptr)>>2,(ptr+size)>>2);
              break;         
            default:
              _host_ptr = HEAPF32.subarray((ptr)>>2,(ptr+size)>>2);
              break;
          }
        } else {
          _host_ptr = HEAPF32.subarray((ptr)>>2,(ptr+size)>>2);
          
          // console.info("------");
          // _host_ptr = new DataView(new ArrayBuffer(size));
  
          // var _offset = 0;
          // for (var i = 0; i < type.length; i++) {
          //   var _type = type[i][0];
          //   var _num = type[i][1];
          //   switch(_type) {
          //     case webcl.SIGNED_INT8:
          //       _host_ptr.setInt8(_offset,HEAP8.subarray((ptr+_offset),(ptr+_offset+_num)) );
          //       console.info("setInt8 : "+_offset+ " - "+(_offset+_num)+" / "+size );
          //       _offset += _num;
          //       break;
          //     case webcl.SIGNED_INT16:
          //       _host_ptr.setInt16(_offset,HEAP16.subarray((ptr+_offset)>>1,(ptr+_offset+_num*2)>>1) );
          //       console.info("setInt16 : "+_offset+ " - "+(_offset+_num*2)+" / "+size );
          //       _offset += 2*_num;
          //       break;
          //     case webcl.SIGNED_INT32:
          //       _host_ptr.setInt32(_offset,HEAP32.subarray((ptr+_offset)>>2,(ptr+_offset+_num*4)>>2) );
          //       console.info("setInt32 : "+_offset+ " - "+(_offset+_num*4)+" / "+size );
          //       _offset += 4*_num;
          //       break;
          //     case webcl.UNSIGNED_INT8:
          //       _host_ptr.setUint8(_offset,HEAPU8.subarray((ptr+_offset),(ptr+_offset+_num)) );
          //       console.info("setUint8 : "+_offset+ " - "+(_offset+_num)+" / "+size );
          //       _offset += _num;
          //       break;
          //     case webcl.UNSIGNED_INT16:
          //       host_ptr.setUint16(_offset,HEAPU16.subarray((ptr+_offset)>>1,(ptr+_offset+_num*2)>>1) );
          //       console.info("setUint16 : "+_offset+ " - "+(_offset+_num*2)+" / "+size );
          //       _offset += 2*_num;
          //       break;
          //     case webcl.UNSIGNED_INT32:
          //       _host_ptr.setUint32(_offset,HEAPU32.subarray((ptr+_offset)>>2,(ptr+_offset+_num*4)>>2) );
          //       console.info("setUint32 : "+_offset+ " - "+(_offset+_num*4)+" / "+size );
          //       _offset += 4*_num;
          //       break;         
          //     default:
          //       _host_ptr.setFloat32(_offset,HEAPF32.subarray((ptr+_offset)>>2,(ptr+_offset+_num*4)>>2) );
          //       console.info("setFloat32 : "+_offset+ " - "+(_offset+_num*4)+" / "+size );
          //       _offset += 4*_num;
          //       break;
          //   }
          // }
        }
  
        return _host_ptr;
      },catchError:function (e) {
        console.error(e);
        var _error = -1;
  
        if (e instanceof WebCLException) {
          var _str=e.message;
          var _n=_str.lastIndexOf(" ");
          _error = _str.substr(_n+1,_str.length-_n-1);
        }
        
        return _error;
      }};function _clGetDeviceIDs(platform,device_type_i64_1,device_type_i64_2,num_entries,devices,num_devices) {
      // Assume the device_type is i32 
      assert(device_type_i64_2 == 0, 'Invalid device_type i64');
  
      
      // Init webcl variable if necessary
      if (CL.init() == 0) {
        return webcl.INVALID_VALUE;
      }
  
      if ( num_entries == 0 && devices != 0) {
        return webcl.INVALID_VALUE;
      }
  
      if ( num_devices == 0 && devices == 0) {
        return webcl.INVALID_VALUE;
      }
  
      if ( platform != 0 && !(platform in CL.cl_objects)) {
        return webcl.INVALID_PLATFORM;  
      }
  
      var _device = null;
  
      try {
  
        // If platform is NULL use the first platform found ...
        if (platform == 0) {
          var _platforms = webcl.getPlatforms();
          if (_platforms.length == 0) {
            return webcl.INVALID_PLATFORM;  
          }
  
          // Create a new UDID 
          platform = CL.udid(_platforms[0]);
        } 
  
        var _platform = CL.cl_objects[platform];
  
          
        _devices = _platform.getDevices(device_type_i64_1);
  
      } catch (e) {
  
        var _error = CL.catchError(e);
  
        return _error;
      }
  
      if (num_devices != 0) {
        HEAP32[((num_devices)>>2)]=_devices.length /* Num of device */;
      } 
  
      if (devices != 0) {
        for (var i = 0; i < Math.min(num_entries,_devices.length); i++) {
          var _id = CL.udid(_devices[i]);
          HEAP32[(((devices)+(i*4))>>2)]=_id;
        }
      }
  
      return webcl.SUCCESS;
  
    }

  function _clReleaseMemObject(memobj) {
  
      // If is an object retain don't release it until retains > 0...
      if (memobj in CL.cl_objects_retains) {
  
        var _retain = CL.cl_objects_retains[memobj] - 1;
  
        CL.cl_objects_retains[memobj] = _retain;
  
        if (_retain >= 0) {
          
          // Call the callback 
          if (memobj in CL.cl_objects_mem_callback) {
            if (CL.cl_objects_mem_callback[memobj].length > 0)
              CL.cl_objects_mem_callback[memobj].pop()();
          }
  
          return webcl.SUCCESS;
        }
      }
  
      try {
  
        // Call the callback 
        if (memobj in CL.cl_objects_mem_callback) {
          if (CL.cl_objects_mem_callback[memobj].length > 0)
            CL.cl_objects_mem_callback[memobj].pop()();
        }
  
        CL.cl_objects[memobj].release();
        delete CL.cl_objects[memobj];  
  
      } catch (e) {
        var _error = CL.catchError(e);
  
  
        return _error;
      }
  
      return webcl.SUCCESS;
    }

  
  function ___libgenSplitName(path) {
      if (path === 0 || HEAP8[(path)] === 0) {
        // Null or empty results in '.'.
        var me = ___libgenSplitName;
        if (!me.ret) {
          me.ret = allocate([46, 0], 'i8', ALLOC_NORMAL);
        }
        return [me.ret, -1];
      } else {
        var slash = 47;
        var allSlashes = true;
        var slashPositions = [];
        for (var i = 0; HEAP8[(((path)+(i))|0)] !== 0; i++) {
          if (HEAP8[(((path)+(i))|0)] === slash) {
            slashPositions.push(i);
          } else {
            allSlashes = false;
          }
        }
        var length = i;
        if (allSlashes) {
          // All slashes result in a single slash.
          HEAP8[(((path)+(1))|0)]=0;
          return [path, -1];
        } else {
          // Strip trailing slashes.
          while (slashPositions.length &&
                 slashPositions[slashPositions.length - 1] == length - 1) {
            HEAP8[(((path)+(slashPositions.pop(i)))|0)]=0;
            length--;
          }
          return [path, slashPositions.pop()];
        }
      }
    }function _basename(path) {
      // char *basename(char *path);
      // http://pubs.opengroup.org/onlinepubs/007908799/xsh/basename.html
      var result = ___libgenSplitName(path);
      return result[0] + result[1] + 1;
    }

   
  Module["_memset"] = _memset;

  function _clReleaseKernel(kernel) {
  
      // If is an object retain don't release it until retains > 0...
      if (kernel in CL.cl_objects_retains) {
  
        var _retain = CL.cl_objects_retains[kernel] - 1;
  
        CL.cl_objects_retains[kernel] = _retain;
  
        if (_retain >= 0) {
          return webcl.SUCCESS;
        }
      }
  
  
      try {
  
        CL.cl_objects[kernel].release();
          
      } catch (e) {
        var _error = CL.catchError(e);
  
  
        return _error;
      }
  
      delete CL.cl_objects[kernel];
  
  
      return webcl.SUCCESS;
    }

  var _llvm_memset_p0i8_i32=_memset;

  
  function _clEnqueueWriteBuffer(command_queue,buffer,blocking_write,offset,cb,ptr,num_events_in_wait_list,event_wait_list,event) {
  
      var _event_wait_list = [];
      var _host_ptr = CL.getReferencePointerToArray(ptr,cb,CL.cl_pn_type);
  
      for (var i = 0; i < num_events_in_wait_list; i++) {
        var _event_wait = HEAP32[(((event_wait_list)+(i*4))>>2)];
  
        _event_wait_list.push(CL.cl_objects[_event_wait]);
      } 
  
      try {
            
        if (event != 0) {
          var _event = new WebCLEvent();
          CL.cl_objects[command_queue].enqueueWriteBuffer(CL.cl_objects[buffer],blocking_write,offset,cb,_host_ptr,_event_wait_list,_event);    
          HEAP32[((event)>>2)]=CL.udid(_event);
        } else {
          CL.cl_objects[command_queue].enqueueWriteBuffer(CL.cl_objects[buffer],blocking_write,offset,cb,_host_ptr,_event_wait_list);    
        }
  
      } catch (e) {
        var _error = CL.catchError(e);
   
  
        return _error;
      }
  
  
      return webcl.SUCCESS;  
    }function _clEnqueueUnmapMemObject(command_queue,memobj,mapped_ptr,num_events_in_wait_list,event_wait_list,event) {
  //#if CL_CHECK_VALID_OBJECT   
      // If the call is comming from clEnqueueMapImage the Unmap can't work
      if (!(mapped_ptr in CL.cl_objects_map)) {
        return webcl.INVALID_MEM_OBJECT;
      }
  //#endif 
  
      if (CL.cl_objects_map[mapped_ptr]["mode"] == 0x2 /*webcl.MAP_WRITE*/) {
  
        // Call write buffer .... may be add try ... catch
        _clEnqueueWriteBuffer(command_queue,memobj,CL.cl_objects_map[mapped_ptr]["blocking"],CL.cl_objects_map[mapped_ptr]["offset"],CL.cl_objects_map[mapped_ptr]["size"],mapped_ptr,num_events_in_wait_list,event_wait_list,event);
      
      }
  
      // Remove the object from the map
      delete CL.cl_objects[mapped_ptr];
  
      // Free malloc
      _free(mapped_ptr);
  
  
      return mapped_ptr; 
    }

  function _abort() {
      Module['abort']();
    }

  
  
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            assert(buffer.length);
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          fileStore.createIndex('timestamp', 'timestamp', { unique: false });
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function() {
          callback(this.error);
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          var index = store.index('timestamp');
  
          index.openKeyCursor().onsuccess = function(event) {
            var cursor = event.target.result;
  
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, entries: entries });
            }
  
            entries[cursor.primaryKey] = { timestamp: cursor.key };
  
            cursor.continue();
          };
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { encoding: 'binary', canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function() { callback(this.error); };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function() { done(this.error); };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          stream.position = position;
          return position;
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (stream.__proto__) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },getStreamFromPtr:function (ptr) {
        return FS.streams[ptr - 1];
      },getPtrForStream:function (stream) {
        return stream ? stream.fd + 1 : 0;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            callback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0, opts.canOwn);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0, opts.canOwn);
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=FS.getPtrForStream(stdin);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=FS.getPtrForStream(stdout);
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=FS.getPtrForStream(stderr);
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
          if (this.stack) this.stack = demangleAll(this.stack);
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
  
              if (!hasByteServing) chunkSize = datalength;
  
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
  
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
  
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
  
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  
  
  
  
  function _mkport() { throw 'TODO' }var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('error', function() {
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
            }
          });
          sock.server.on('closed', function() {
            sock.server = null;
          });
          sock.server.on('error', function() {
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  
  function _fileno(stream) {
      // int fileno(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fileno.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) return -1;
      return stream.fd;
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var fd = _fileno(stream);
      var bytesWritten = _write(fd, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  
  
   
  Module["_strlen"] = _strlen;
  
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = (HEAP32[((tempDoublePtr)>>2)]=HEAP32[(((varargs)+(argIndex))>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((varargs)+((argIndex)+(4)))>>2)],(+(HEAPF64[(tempDoublePtr)>>3])));
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+4))>>2)]];
  
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Runtime.getNativeFieldSize(type);
        return ret;
      }
  
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
  
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
  
          // Handle precision.
          var precisionSet = false, precision = -1;
          if (next == 46) {
            precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          }
          if (precision < 0) {
            precision = 6; // Standard default.
            precisionSet = false;
          }
  
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
  
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
  
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
  
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
  
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
  
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
  
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
  
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
  
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
  
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
  
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
  
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
  
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
  
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length;
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }

  function _clCreateContext(properties,num_devices,devices,pfn_notify,user_data,cl_errcode_ret) {
  
      // Init webcl variable if necessary
      if (CL.init() == 0) {
        if (cl_errcode_ret != 0) {
          HEAP32[((cl_errcode_ret)>>2)]=webcl.INVALID_VALUE;
        }
  
        return 0; // NULL Pointer      
      }
      
      var _id = null;
      var _context = null;
  
      try { 
  
        var _platform = null;
        var _devices = [];
        var _glclSharedContext = false;
  
        // Verify the device, theorically on OpenCL there are CL_INVALID_VALUE when devices or num_devices is null,
        // WebCL can work using default device / platform, we check only if parameter are set.
        for (var i = 0; i < num_devices; i++) {
          var _idxDevice = HEAP32[(((devices)+(i*4))>>2)];
            _devices.push(CL.cl_objects[_idxDevice]);
        }
  
        // Verify the property
        var _propertiesCounter = 0;
        var _properties = [];
  
        if (properties != 0) {
          while(1) {
            var _readprop = HEAP32[(((properties)+(_propertiesCounter*4))>>2)];
            _properties.push(_readprop);
  
            if (_readprop == 0) break;
  
            switch (_readprop) {
              case webcl.CONTEXT_PLATFORM:
                _propertiesCounter ++;
                var _idxPlatform = HEAP32[(((properties)+(_propertiesCounter*4))>>2)];
                _properties.push(_idxPlatform);
  
                  _platform = CL.cl_objects[_idxPlatform];
                break;
  
              // /!\ This part, it's for the CL_GL_Interop
              case (0x200A) /*CL_GLX_DISPLAY_KHR*/:
              case (0x2008) /*CL_GL_CONTEXT_KHR*/:
              case (0x200C) /*CL_CGL_SHAREGROUP_KHR*/:            
                _propertiesCounter ++;
                _glclSharedContext = true;
                
                break;
  
              default:
                if (cl_errcode_ret != 0) {
                  HEAP32[((cl_errcode_ret)>>2)]=webcl.INVALID_PROPERTY;
                }
  
                return 0; 
            };
  
            _propertiesCounter ++;
          }
        }
  
        if (num_devices > 0) {
          if (_glclSharedContext) {       
            if (_devices.length == 1) {
              _context = webcl.createContext(Module.ctx,_devices[0]); 
            } else {
              _context = webcl.createContext(Module.ctx,_devices); 
            }
          } else {
          
            if (_devices.length == 1) {
              _context = webcl.createContext(_devices[0]); 
            } else {
              _context = webcl.createContext(_devices);  
            }
          }
        } else if (_platform != null) {
          
          if (_glclSharedContext) {
            _context = webcl.createContext(Module.ctx,_platform);  
          } else {
            _context = webcl.createContext(_platform);  
          }
  
        } else {
  
          if (cl_errcode_ret != 0) {
            HEAP32[((cl_errcode_ret)>>2)]=webcl.INVALID_CONTEXT;
          }
  
          return 0; // NULL Pointer      
        }
  
      } catch (e) {
        var _error = CL.catchError(e);
      
        if (cl_errcode_ret != 0) {
          HEAP32[((cl_errcode_ret)>>2)]=_error;
        }
  
        return 0; // NULL Pointer
      }
  
      if (cl_errcode_ret != 0) {
        HEAP32[((cl_errcode_ret)>>2)]=0;
      }
  
      _id = CL.udid(_context);
  
      // Add properties array for getInfo
      Object.defineProperty(_context, "properties", { value : _properties,writable : false });
  
  
      return _id;
    }

  function _printf(format, varargs) {
      // int printf(const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var stdout = HEAP32[((_stdout)>>2)];
      return _fprintf(stdout, format, varargs);
    }


  function _dirname(path) {
      // char *dirname(char *path);
      // http://pubs.opengroup.org/onlinepubs/007908799/xsh/dirname.html
      var result = ___libgenSplitName(path);
      if (result[1] == 0) {
        HEAP8[(((result[0])+(1))|0)]=0;
      } else if (result[1] !== -1) {
        HEAP8[(((result[0])+(result[1]))|0)]=0;
      }
      return result[0];
    }


  function _clCreateCommandQueue(context,device,properties_1,properties_2,cl_errcode_ret) {
      // Assume the properties is i32 
      assert(properties_2 == 0, 'Invalid properties i64');
  
  
      var _id = null;
      var _command = null;
  
      // Context must be created
  
      // Context must be created
  
      try { 
  
  
        _command = CL.cl_objects[context].createCommandQueue(CL.cl_objects[device],properties_1);
  
      } catch (e) {
        var _error = CL.catchError(e);
      
        if (cl_errcode_ret != 0) {
          HEAP32[((cl_errcode_ret)>>2)]=_error;
        }
  
        return 0; // NULL Pointer
      }
  
      if (cl_errcode_ret != 0) {
        HEAP32[((cl_errcode_ret)>>2)]=0;
      }
  
      _id = CL.udid(_command);
  
  
      return _id;
    }

  function _clGetPlatformIDs(num_entries,platforms,num_platforms) {
  
  
      // Init webcl variable if necessary
      if (CL.init() == 0) {
        return webcl.INVALID_VALUE;
      }
  
      if ( num_entries == 0 && platforms != 0) {
        return webcl.INVALID_VALUE;
      }
  
      if ( num_platforms == 0 && platforms == 0) {
        return webcl.INVALID_VALUE;
      }
  
      var _platforms = null;
  
      try { 
  
        _platforms = webcl.getPlatforms();
  
      } catch (e) {
        var _error = CL.catchError(e);
  
        return _error;
      }
  
      if (num_platforms != 0) {
        HEAP32[((num_platforms)>>2)]=_platforms.length /* Num of platforms */;
      } 
  
      if (platforms != 0) {
        for (var i = 0; i < Math.min(num_entries,_platforms.length); i++) {
          var _id = CL.udid(_platforms[i]);
          HEAP32[(((platforms)+(i*4))>>2)]=_id;
        }
      }
  
      return webcl.SUCCESS;
    }

  function _clReleaseProgram(program) {
  
  
      // If is an object retain don't release it until retains > 0...
      if (program in CL.cl_objects_retains) {
  
        var _retain = CL.cl_objects_retains[program] - 1;
  
        CL.cl_objects_retains[program] = _retain;
  
        if (_retain >= 0) {
          return webcl.SUCCESS;
        }
      }
  
      try {
  
          CL.cl_objects[program].release();
          delete CL.cl_objects[program]; 
  
      } catch (e) {
        var _error = CL.catchError(e);
  
  
        return _error;
      }
  
  
      return webcl.SUCCESS;
  
    }

  
  function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      var mode = HEAP32[((varargs)>>2)];
      path = Pointer_stringify(path);
      try {
        var stream = FS.open(path, oflag, mode);
        return stream.fd;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fopen(filename, mode) {
      // FILE *fopen(const char *restrict filename, const char *restrict mode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fopen.html
      var flags;
      mode = Pointer_stringify(mode);
      if (mode[0] == 'r') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 0;
        }
      } else if (mode[0] == 'w') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 512;
      } else if (mode[0] == 'a') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 1024;
      } else {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var fd = _open(filename, flags, allocate([0x1FF, 0, 0, 0], 'i32', ALLOC_STACK));  // All creation permissions.
      return fd === -1 ? 0 : FS.getPtrForStream(FS.getStream(fd));
    }

  function _clBuildProgram(program,num_devices,device_list,options,pfn_notify,user_data) {
  
      try {
  
        var _devices = [];
        var _option = (options == 0) ? "" : Pointer_stringify(options); 
  
        if (device_list != 0 && num_devices > 0 ) {
          for (var i = 0; i < num_devices ; i++) {
            var _device = HEAP32[(((device_list)+(i*4))>>2)]
              _devices.push(CL.cl_objects[_device]);
          }
        }
  
        // If device_list is NULL value, the program executable is built for all devices associated with program.
        if (_devices.length == 0) {
          _devices = CL.cl_objects[program].getInfo(webcl.PROGRAM_DEVICES); 
        }
  
        var _callback = null
        if (pfn_notify != 0) {
          /**
           * Description
           * @return 
           */
          _callback = function() { 
            console.info("\nCall ( clBuildProgram ) callback function : FUNCTION_TABLE["+pfn_notify+"]("+program+", "+user_data+")");
            FUNCTION_TABLE[pfn_notify](program, user_data) 
          };
        }
  
        
        CL.cl_objects[program].build(_devices,_option,_callback);
  
      } catch (e) {
        var _error = CL.catchError(e);
  
  
        return _error;
      }
  
  
      return webcl.SUCCESS;      
  
    }

  function _clGetKernelWorkGroupInfo(kernel,device,param_name,param_value_size,param_value,param_value_size_ret) {
  
      try {
  
        var _info = CL.cl_objects[kernel].getWorkGroupInfo(CL.cl_objects[device], param_name);
  
        if(typeof(_info) == "number") {
  
          if (param_value != 0) HEAP32[((param_value)>>2)]=_info;
          if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=4;
  
        } else if (_info instanceof Int32Array) {
         
          for (var i = 0; i < Math.min(param_value_size>>2,_info.length); i++) {
            if (param_value != 0) HEAP32[(((param_value)+(i*4))>>2)]=_info[i];
          }
          if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=_info.length * 4;
        
        } else {
  
          console.error("clGetKernelWorkGroupInfo: unknow type of info '"+_info+"'")
          
          if (param_value != 0) HEAP32[((param_value)>>2)]=0;
          if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=0;
  
        }
  
      } catch (e) {
        var _error = CL.catchError(e);
  
        if (param_value != 0) HEAP32[((param_value)>>2)]=0;
        if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=0;
        
        return _error;
      }
  
      return webcl.SUCCESS;
    }

  function _clReleaseEvent(event) {
  
      // If is an object retain don't release it until retains > 0...
      if (event in CL.cl_objects_retains) {
  
        var _retain = CL.cl_objects_retains[event] - 1;
  
        CL.cl_objects_retains[event] = _retain;
  
        if (_retain >= 0) {
          return webcl.SUCCESS;
        }
      }
  
  
      try {
  
        CL.cl_objects[event].release();
          
      } catch (e) {
        var _error = CL.catchError(e);
  
  
        return _error;
      }
  
      delete CL.cl_objects[event];
  
  
      return webcl.SUCCESS;
    }

  function _clGetDeviceInfo(device,param_name,param_value_size,param_value,param_value_size_ret) {
  
    
      var  _info = null;
  
      try { 
  
          var _object = CL.cl_objects[device];
  
        switch (param_name) {
          case 0x1001 /*CL_DEVICE_VENDOR_ID*/ :
            _info = parseInt(CL.udid(_object));
          break;
          case 0x102B /*CL_DEVICE_NAME*/ :
            var _type = _object.getInfo(webcl.DEVICE_TYPE);
            switch (_type) {
              case webcl.DEVICE_TYPE_CPU:
                _info = "WEBCL_DEVICE_CPU";
              break;
              case webcl.DEVICE_TYPE_GPU:
                _info = "WEBCL_DEVICE_GPU";
              break;
              case webcl.DEVICE_TYPE_ACCELERATOR:
                _info = "WEBCL_DEVICE_ACCELERATOR";
              break;
              case webcl.DEVICE_TYPE_DEFAULT:
                _info = "WEBCL_DEVICE_DEFAULT";
              break;
            }
          break;
          case 0x102C /*CL_DEVICE_VENDOR*/ :
            _info = "WEBCL_DEVICE_VENDOR";
          break;
          case 0x100B /*CL_DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE*/ :
            _info = 0;
          break;
          case 0x1030 /*CL_DEVICE_EXTENSIONS*/ :
            _info = webcl.getSupportedExtensions().join(' ') ; 
          break;
          case 0x101A /*CL_DEVICE_MIN_DATA_TYPE_ALIGN_SIZE*/ :
            _info = _object.getInfo(webcl.DEVICE_MEM_BASE_ADDR_ALIGN) >> 3;
          break;
          default:
            _info = _object.getInfo(param_name);
        }  
      } catch (e) {
        var _error = CL.catchError(e);
  
        if (param_value != 0) {
          HEAP32[((param_value)>>2)]=0;
        }
      
        if (param_value_size_ret != 0) {
          HEAP32[((param_value_size_ret)>>2)]=0;
        }
  
        return _error;
      }
          
      if(typeof(_info) == "number") {
  
        if (param_value_size == 8) {
          if (param_value != 0) (tempI64 = [_info>>>0,((+(Math_abs(_info))) >= 1.0 ? (_info > 0.0 ? ((Math_min((+(Math_floor((_info)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((_info - +(((~~(_info)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((param_value)>>2)]=tempI64[0],HEAP32[(((param_value)+(4))>>2)]=tempI64[1]);
          if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=8;
        } else {
          if (param_value != 0) HEAP32[((param_value)>>2)]=_info;
          if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=4;
        } 
        
      } else if(typeof(_info) == "boolean") {
  
        if (param_value != 0) (_info == true) ? HEAP32[((param_value)>>2)]=1 : HEAP32[((param_value)>>2)]=0;
        if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=4;
  
      } else if(typeof(_info) == "string") {
  
        if (param_name != webcl.DEVICE_PROFILE) _info += " ";
        if (param_value != 0) writeStringToMemory(_info, param_value);
        if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=_info.length + 1;
  
      } else if(typeof(_info) == "object") {
  
        if (_info instanceof Array) {
         
          for (var i = 0; i < Math.min(param_value_size>>2,_info.length); i++) {
            if (param_value != 0) HEAP32[(((param_value)+(i*4))>>2)]=_info[i];
          }
          if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=_info.length * 4;
        
        } else if (_info instanceof WebCLPlatform) {
       
          var _id = CL.udid(_info);
          if (param_value != 0) HEAP32[((param_value)>>2)]=_id;
          if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=4;
        
        } else if (_info == null) {
  
          if (param_value != 0) HEAP32[((param_value)>>2)]=0;
          if (param_value_size_ret != 0) HEAP32[((param_value_size_ret)>>2)]=0;
  
        } else {
          return webcl.INVALID_VALUE;
        }
      } else {
        return webcl.INVALID_VALUE;
      }
  
      return webcl.SUCCESS;
    }

  function _clEnqueueNDRangeKernel(command_queue,kernel,work_dim,global_work_offset,global_work_size,local_work_size,num_events_in_wait_list,event_wait_list,event) {
  
      var _event_wait_list;
      var _local_work_size;
  
      // \todo need to be remove when webkit will be support null
      /**** **** **** **** **** **** **** ****/
      if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        _event_wait_list = num_events_in_wait_list > 0 ? [] : null;
        _local_work_size = (local_work_size != 0) ? [] : null;
      } else {
        _event_wait_list = [];
        _local_work_size = [];
      }
  
  
      var _global_work_offset = [];
      var _global_work_size = [];
      
  
      for (var i = 0; i < work_dim; i++) {
        _global_work_size.push(HEAP32[(((global_work_size)+(i*4))>>2)]);
  
        if (global_work_offset != 0)
          _global_work_offset.push(HEAP32[(((global_work_offset)+(i*4))>>2)]);
      
        if (local_work_size != 0)
          _local_work_size.push(HEAP32[(((local_work_size)+(i*4))>>2)]);
      }
  
      for (var i = 0; i < num_events_in_wait_list; i++) {
        var _event_wait = HEAP32[(((event_wait_list)+(i*4))>>2)];
         
        _event_wait_list.push(CL.cl_objects[_event_wait]);
      }
             
      try { 
        
        if (event != 0) {
          var _event = new WebCLEvent();
          CL.cl_objects[command_queue].enqueueNDRangeKernel(CL.cl_objects[kernel],work_dim,_global_work_offset,_global_work_size,_local_work_size,_event_wait_list,_event);  
          HEAP32[((event)>>2)]=CL.udid(_event);
        } else {
          CL.cl_objects[command_queue].enqueueNDRangeKernel(CL.cl_objects[kernel],work_dim,_global_work_offset,_global_work_size,_local_work_size,_event_wait_list);  
        }
  
      } catch (e) {
        var _error = CL.catchError(e);
  
  
        return _error;
      }
  
      
      return webcl.SUCCESS;    
  
    }


   
  Module["_strcpy"] = _strcpy;

  var Browser={mainLoop:{scheduler:null,method:"",shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            assert(typeof url == 'string', 'createObjectURL must return a url as a string');
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
  
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
  
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        var errorInfo = '?';
        function onContextCreationError(event) {
          errorInfo = event.statusMessage || errorInfo;
        }
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
  
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
  
  
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            try {
              ['experimental-webgl', 'webgl'].some(function(webglId) {
                return ctx = canvas.getContext(webglId, contextAttributes);
              });
            } finally {
              canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            }
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas: ' + [errorInfo, e]);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
  
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          GLctx = Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
  
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function (event) {
        return Math.max(-1, Math.min(1, event.type === 'DOMMouseScroll' ? event.detail : -event.wheelDelta));
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
          // and we have no viable fallback.
          assert((typeof scrollX !== 'undefined') && (typeof scrollY !== 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (scrollX + rect.left);
              y = t.pageY - (scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (scrollX + rect.left);
            y = event.pageY - (scrollY + rect.top);
          }
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      }};

  
  function _clEnqueueReadBuffer(command_queue,buffer,blocking_read,offset,cb,ptr,num_events_in_wait_list,event_wait_list,event) {
   
      var _event_wait_list = [];
      var _host_ptr = CL.getReferencePointerToArray(ptr,cb,CL.cl_pn_type);
    
      for (var i = 0; i < num_events_in_wait_list; i++) {
        var _event_wait = HEAP32[(((event_wait_list)+(i*4))>>2)];
  
        _event_wait_list.push(CL.cl_objects[_event_wait]);
      } 
  
      try {
  
        if (event != 0) {
          var _event = new WebCLEvent();
          CL.cl_objects[command_queue].enqueueReadBuffer(CL.cl_objects[buffer],blocking_read,offset,cb,_host_ptr,_event_wait_list,_event);
          HEAP32[((event)>>2)]=CL.udid(_event);
        } else {
          CL.cl_objects[command_queue].enqueueReadBuffer(CL.cl_objects[buffer],blocking_read,offset,cb,_host_ptr,_event_wait_list);
        } 
      } catch (e) {
        var _error = CL.catchError(e);
          
  
        return _error;
      }
  
      return webcl.SUCCESS;    
    }function _clEnqueueMapBuffer(command_queue,buffer,blocking_map,map_flags_i64_1,map_flags_i64_2,offset,cb,num_events_in_wait_list,event_wait_list,event,cl_errcode_ret) {
      // Assume the map_flags is i32 
      assert(map_flags_i64_2 == 0, 'Invalid map flags i64');
  
      var mapped_ptr = _malloc(cb);
  
      // { SIZE , BLOCKING_MAP , OFFSET }
      CL.cl_objects_map[mapped_ptr] = {"size":cb,"blocking":blocking_map,"offset":offset,"mode":map_flags_i64_1};
  
      if (CL.cl_objects_map[mapped_ptr]["mode"] == 0x1 /*webcl.MAP_READ*/) {
  
        // Call write buffer .... may be add try ... catch
        _clEnqueueReadBuffer(command_queue,buffer,CL.cl_objects_map[mapped_ptr]["blocking"],CL.cl_objects_map[mapped_ptr]["offset"],CL.cl_objects_map[mapped_ptr]["size"],mapped_ptr,num_events_in_wait_list,event_wait_list,event);
      
      }
  
  
      if (cl_errcode_ret != 0) {
        HEAP32[((cl_errcode_ret)>>2)]=webcl.SUCCESS;
      }
  
      return mapped_ptr;
    }

  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }

  function _stat(path, buf, dontResolveLastLink) {
      // http://pubs.opengroup.org/onlinepubs/7908799/xsh/stat.html
      // int stat(const char *path, struct stat *buf);
      // NOTE: dontResolveLastLink is a shortcut for lstat(). It should never be
      //       used in client code.
      path = typeof path !== 'string' ? Pointer_stringify(path) : path;
      try {
        var stat = dontResolveLastLink ? FS.lstat(path) : FS.stat(path);
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode;
        HEAP32[(((buf)+(16))>>2)]=stat.nlink;
        HEAP32[(((buf)+(20))>>2)]=stat.uid;
        HEAP32[(((buf)+(24))>>2)]=stat.gid;
        HEAP32[(((buf)+(28))>>2)]=stat.rdev;
        HEAP32[(((buf)+(32))>>2)]=0;
        HEAP32[(((buf)+(36))>>2)]=stat.size;
        HEAP32[(((buf)+(40))>>2)]=4096;
        HEAP32[(((buf)+(44))>>2)]=stat.blocks;
        HEAP32[(((buf)+(48))>>2)]=Math.floor(stat.atime.getTime() / 1000);
        HEAP32[(((buf)+(52))>>2)]=0;
        HEAP32[(((buf)+(56))>>2)]=Math.floor(stat.mtime.getTime() / 1000);
        HEAP32[(((buf)+(60))>>2)]=0;
        HEAP32[(((buf)+(64))>>2)]=Math.floor(stat.ctime.getTime() / 1000);
        HEAP32[(((buf)+(68))>>2)]=0;
        HEAP32[(((buf)+(72))>>2)]=stat.ino;
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }

  
  
  function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) {
        return 0;
      }
      var bytesRead = 0;
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return 0;
      }
      while (streamObj.ungotten.length && bytesToRead > 0) {
        HEAP8[((ptr++)|0)]=streamObj.ungotten.pop();
        bytesToRead--;
        bytesRead++;
      }
      var err = _read(streamObj.fd, ptr, bytesToRead);
      if (err == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      }
      bytesRead += err;
      if (bytesRead < bytesToRead) streamObj.eof = true;
      return Math.floor(bytesRead / size);
    }

  function _clCreateKernel(program,kernel_name,cl_errcode_ret) {
      
  
      var _id = null;
      var _kernel = null;
      var _name = (kernel_name == 0) ? "" : Pointer_stringify(kernel_name);
  
      // program must be created
      try {
      
  
        _kernel = CL.cl_objects[program].createKernel(_name);
        
        Object.defineProperty(_kernel, "name", { value : _name,writable : false });
        Object.defineProperty(_kernel, "sig", { value : CL.cl_kernels_sig[_name],writable : false });
  
        Object.defineProperty(_kernel, "val_param", { value : CL.cl_validator[_name],writable : false });
        Object.defineProperty(_kernel, "val_param_argsize", { value : CL.cl_validator_argsize[_name],writable : false });
  
        
      } catch (e) {
        var _error = CL.catchError(e);
      
        if (cl_errcode_ret != 0) {
          HEAP32[((cl_errcode_ret)>>2)]=_error;
        }
  
        return 0; // NULL Pointer
      }
  
      if (cl_errcode_ret != 0) {
        HEAP32[((cl_errcode_ret)>>2)]=0;
      }
  
      _id = CL.udid(_kernel);
  
  
      return _id;
    }

  function _clReleaseCommandQueue(command_queue) {
  
      // If is an object retain don't release it until retains > 0...
      if (command_queue in CL.cl_objects_retains) {
  
        var _retain = CL.cl_objects_retains[command_queue] - 1;
  
        CL.cl_objects_retains[command_queue] = _retain;
  
        if (_retain >= 0) {
          return webcl.SUCCESS;
        }
      }
  
      try {
  
          CL.cl_objects[command_queue].release();
          delete CL.cl_objects[command_queue];  
  
      } catch (e) {
        var _error = CL.catchError(e);
  
  
        return _error;
      }
  
      return webcl.SUCCESS;
    }

  function _clCreateProgramWithSource(context,count,strings,lengths,cl_errcode_ret) {
      
  
      var _id = null;
      var _program = null;
  
      // Context must be created
  
      try {
        
        var _string = "";
  
        for (var i = 0; i < count; i++) {
          if (lengths) {
            var _len = HEAP32[(((lengths)+(i*4))>>2)];
            if (_len < 0) {
              _string += Pointer_stringify(HEAP32[(((strings)+(i*4))>>2)]);   
            } else {
              _string += Pointer_stringify(HEAP32[(((strings)+(i*4))>>2)], _len);   
            }
          } else {
            _string += Pointer_stringify(HEAP32[(((strings)+(i*4))>>2)]); 
          }
        }
  
        CL.parseKernel(_string);
  
  
        _program = CL.cl_objects[context].createProgram(_string);
    
      } catch (e) {
        var _error = CL.catchError(e);
  
        if (cl_errcode_ret != 0) {
          HEAP32[((cl_errcode_ret)>>2)]=_error;
        }
  
        return 0; // NULL Pointer
      }
  
      if (cl_errcode_ret != 0) {
        HEAP32[((cl_errcode_ret)>>2)]=0;
      }
  
      _id = CL.udid(_program);
  
  
      return _id;
    }

  function _clGetPlatformInfo(platform,param_name,param_value_size,param_value,param_value_size_ret) {
      
  
    
      var _info = null;
    
      try { 
  
  
        switch (param_name) {
          case 0x0902 /*CL_PLATFORM_NAME*/ :
            _info = "WEBCL_PLATFORM_NAME";
          break;
          case 0x0903 /*CL_PLATFORM_VENDOR*/ :
            _info = "WEBCL_PLATFORM_VENDOR";
          break;
            case 0x0904 /*CL_PLATFORM_EXTENSIONS*/ :
            _info = "WEBCL_PLATFORM_EXTENSIONS";
          break;
          default:
            _info = CL.cl_objects[platform].getInfo(param_name);  
        }      
      } catch (e) {
        
        var _error = CL.catchError(e);
        var _info = "undefined";
  
        if (param_value != 0) {
          writeStringToMemory(_info, param_value);
        }
    
        if (param_value_size_ret != 0) {
          HEAP32[((param_value_size_ret)>>2)]=_info.length + 1;
        }
  
        return _error;
      }
  
      if (param_name == webcl.PLATFORM_VERSION) _info += " "; 
      
      if (param_value != 0) {
        writeStringToMemory(_info, param_value);
      }
    
      if (param_value_size_ret != 0) {
        HEAP32[((param_value_size_ret)>>2)]=_info.length + 1;
      }
  
      return webcl.SUCCESS;
  
    }

  function _clReleaseContext(context) {
  
  
      // If is an object retain don't release it until retains > 0...
      if (context in CL.cl_objects_retains) {
  
        var _retain = CL.cl_objects_retains[context] - 1;
  
        CL.cl_objects_retains[context] = _retain;
  
        if (_retain >= 0) {
          return webcl.SUCCESS;
        }
      }
  
      try {
  
          CL.cl_objects[context].release();
          delete CL.cl_objects[context];     
  
      } catch (e) {
        var _error = CL.catchError(e);
  
  
        return _error;
      }
  
      return webcl.SUCCESS;
    }

  
  
  
  function _isspace(chr) {
      return (chr == 32) || (chr >= 9 && chr <= 13);
    }function __parseInt(str, endptr, base, min, max, bits, unsign) {
      // Skip space.
      while (_isspace(HEAP8[(str)])) str++;
  
      // Check for a plus/minus sign.
      var multiplier = 1;
      if (HEAP8[(str)] == 45) {
        multiplier = -1;
        str++;
      } else if (HEAP8[(str)] == 43) {
        str++;
      }
  
      // Find base.
      var finalBase = base;
      if (!finalBase) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            finalBase = 16;
            str += 2;
          } else {
            finalBase = 8;
            str++;
          }
        }
      } else if (finalBase==16) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            str += 2;
          }
        }
      }
      if (!finalBase) finalBase = 10;
  
      // Get digits.
      var chr;
      var ret = 0;
      while ((chr = HEAP8[(str)]) != 0) {
        var digit = parseInt(String.fromCharCode(chr), finalBase);
        if (isNaN(digit)) {
          break;
        } else {
          ret = ret * finalBase + digit;
          str++;
        }
      }
  
      // Apply sign.
      ret *= multiplier;
  
      // Set end pointer.
      if (endptr) {
        HEAP32[((endptr)>>2)]=str;
      }
  
      // Unsign if needed.
      if (unsign) {
        if (Math.abs(ret) > max) {
          ret = max;
          ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          ret = unSign(ret, bits);
        }
      }
  
      // Validate range.
      if (ret > max || ret < min) {
        ret = ret > max ? max : min;
        ___setErrNo(ERRNO_CODES.ERANGE);
      }
  
      if (bits == 64) {
        return ((asm["setTempRet0"]((tempDouble=ret,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)),ret>>>0)|0);
      }
  
      return ret;
    }function _strtol(str, endptr, base) {
      return __parseInt(str, endptr, base, -2147483648, 2147483647, 32);  // LONG_MIN, LONG_MAX.
    }function _atoi(ptr) {
      return _strtol(ptr, null, 10);
    }

  function _clWaitForEvents(num_events,event_list) {
  
      var _events = [];
  
      for (var i = 0; i < num_events; i++) {
        var _event = HEAP32[(((event_list)+(i*4))>>2)];
        
        _events.push(CL.cl_objects[_event]) 
      }
  
      try {
  
        webcl.waitForEvents(_events);
  
      } catch (e) {
        var _error = CL.catchError(e);
  
        return _error;
      }
  
      return webcl.SUCCESS;
    }

  function _clSetKernelArg(kernel,arg_index,arg_size,arg_value) {
      if (CL.cl_objects[kernel].sig.length < arg_index) {
        return webcl.INVALID_KERNEL;          
      }
  
      var _kernel = CL.cl_objects[kernel];
  
      var _posarg = _kernel.val_param[arg_index];
  
      var _sig = _kernel.sig[_posarg];
      
      try {
  
        // LOCAL ARG
        if (_sig == webcl.LOCAL) {
  
          var _array = new Uint32Array([arg_size]);
  
          _kernel.setArg(_posarg,_array);
  
          var _sizearg = CL.cast_long(arg_size);
  
          if (_kernel.val_param_argsize.indexOf(_posarg+1) >= 0) {
            _kernel.setArg(_posarg+1,_sizearg);
          }
  
        } else {
  
          var _value = HEAP32[((arg_value)>>2)];
  
          // WEBCL OBJECT ARG
          if (_value in CL.cl_objects) {
  
            _kernel.setArg(_posarg,CL.cl_objects[_value]);
            
            if (! (CL.cl_objects[_value] instanceof WebCLSampler)) {
  
            
              var _size = CL.cl_objects[_value].getInfo(webcl.MEM_SIZE);
              var _sizearg = CL.cast_long(_size);
  
              if (_kernel.val_param_argsize.indexOf(_posarg+1) >= 0) {
                _kernel.setArg(_posarg+1,_sizearg);
              }
            }
            
          } else {
  
            var _array = CL.getReferencePointerToArray(arg_value,arg_size,[[_sig,1]]);
           
            _kernel.setArg(_posarg,_array);
  
            var _sizearg = CL.cast_long(arg_size);
  
            if (_kernel.val_param_argsize.indexOf(_posarg+1) >= 0) {
              _kernel.setArg(_posarg+1,_sizearg);
            }
          }
        }
      } catch (e) {
  
        var _error = CL.catchError(e);
  
  
        return _error;
      }
  
  
      return webcl.SUCCESS;
    }

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;

  function _chdir(path) {
      // int chdir(const char *path);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/chdir.html
      // NOTE: The path argument may be a string, to simplify fchdir().
      if (typeof path !== 'string') path = Pointer_stringify(path);
      try {
        FS.chdir(path);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }

  
  
  function __getFloat(text) {
      return /^[+-]?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?/.exec(text);
    }function __scanString(format, get, unget, varargs) {
      if (!__scanString.whiteSpace) {
        __scanString.whiteSpace = {};
        __scanString.whiteSpace[32] = 1;
        __scanString.whiteSpace[9] = 1;
        __scanString.whiteSpace[10] = 1;
        __scanString.whiteSpace[11] = 1;
        __scanString.whiteSpace[12] = 1;
        __scanString.whiteSpace[13] = 1;
      }
      // Supports %x, %4x, %d.%d, %lld, %s, %f, %lf.
      // TODO: Support all format specifiers.
      format = Pointer_stringify(format);
      var soFar = 0;
      if (format.indexOf('%n') >= 0) {
        // need to track soFar
        var _get = get;
        get = function get() {
          soFar++;
          return _get();
        }
        var _unget = unget;
        unget = function unget() {
          soFar--;
          return _unget();
        }
      }
      var formatIndex = 0;
      var argsi = 0;
      var fields = 0;
      var argIndex = 0;
      var next;
  
      mainLoop:
      for (var formatIndex = 0; formatIndex < format.length;) {
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'n') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
  
        if (format[formatIndex] === '%') {
          var nextC = format.indexOf('c', formatIndex+1);
          if (nextC > 0) {
            var maxx = 1;
            if (nextC > formatIndex+1) {
              var sub = format.substring(formatIndex+1, nextC);
              maxx = parseInt(sub);
              if (maxx != sub) maxx = 0;
            }
            if (maxx) {
              var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
              argIndex += Runtime.getAlignSize('void*', null, true);
              fields++;
              for (var i = 0; i < maxx; i++) {
                next = get();
                HEAP8[((argPtr++)|0)]=next;
                if (next === 0) return i > 0 ? fields : fields-1; // we failed to read the full length of this field
              }
              formatIndex += nextC - formatIndex + 1;
              continue;
            }
          }
        }
  
        // handle %[...]
        if (format[formatIndex] === '%' && format.indexOf('[', formatIndex+1) > 0) {
          var match = /\%([0-9]*)\[(\^)?(\]?[^\]]*)\]/.exec(format.substring(formatIndex));
          if (match) {
            var maxNumCharacters = parseInt(match[1]) || Infinity;
            var negateScanList = (match[2] === '^');
            var scanList = match[3];
  
            // expand "middle" dashs into character sets
            var middleDashMatch;
            while ((middleDashMatch = /([^\-])\-([^\-])/.exec(scanList))) {
              var rangeStartCharCode = middleDashMatch[1].charCodeAt(0);
              var rangeEndCharCode = middleDashMatch[2].charCodeAt(0);
              for (var expanded = ''; rangeStartCharCode <= rangeEndCharCode; expanded += String.fromCharCode(rangeStartCharCode++));
              scanList = scanList.replace(middleDashMatch[1] + '-' + middleDashMatch[2], expanded);
            }
  
            var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
            argIndex += Runtime.getAlignSize('void*', null, true);
            fields++;
  
            for (var i = 0; i < maxNumCharacters; i++) {
              next = get();
              if (negateScanList) {
                if (scanList.indexOf(String.fromCharCode(next)) < 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              } else {
                if (scanList.indexOf(String.fromCharCode(next)) >= 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              }
            }
  
            // write out null-terminating character
            HEAP8[((argPtr++)|0)]=0;
            formatIndex += match[0].length;
            
            continue;
          }
        }      
        // remove whitespace
        while (1) {
          next = get();
          if (next == 0) return fields;
          if (!(next in __scanString.whiteSpace)) break;
        }
        unget();
  
        if (format[formatIndex] === '%') {
          formatIndex++;
          var suppressAssignment = false;
          if (format[formatIndex] == '*') {
            suppressAssignment = true;
            formatIndex++;
          }
          var maxSpecifierStart = formatIndex;
          while (format[formatIndex].charCodeAt(0) >= 48 &&
                 format[formatIndex].charCodeAt(0) <= 57) {
            formatIndex++;
          }
          var max_;
          if (formatIndex != maxSpecifierStart) {
            max_ = parseInt(format.slice(maxSpecifierStart, formatIndex), 10);
          }
          var long_ = false;
          var half = false;
          var longLong = false;
          if (format[formatIndex] == 'l') {
            long_ = true;
            formatIndex++;
            if (format[formatIndex] == 'l') {
              longLong = true;
              formatIndex++;
            }
          } else if (format[formatIndex] == 'h') {
            half = true;
            formatIndex++;
          }
          var type = format[formatIndex];
          formatIndex++;
          var curr = 0;
          var buffer = [];
          // Read characters according to the format. floats are trickier, they may be in an unfloat state in the middle, then be a valid float later
          if (type == 'f' || type == 'e' || type == 'g' ||
              type == 'F' || type == 'E' || type == 'G') {
            next = get();
            while (next > 0 && (!(next in __scanString.whiteSpace)))  {
              buffer.push(String.fromCharCode(next));
              next = get();
            }
            var m = __getFloat(buffer.join(''));
            var last = m ? m[0].length : 0;
            for (var i = 0; i < buffer.length - last + 1; i++) {
              unget();
            }
            buffer.length = last;
          } else {
            next = get();
            var first = true;
            
            // Strip the optional 0x prefix for %x.
            if ((type == 'x' || type == 'X') && (next == 48)) {
              var peek = get();
              if (peek == 120 || peek == 88) {
                next = get();
              } else {
                unget();
              }
            }
            
            while ((curr < max_ || isNaN(max_)) && next > 0) {
              if (!(next in __scanString.whiteSpace) && // stop on whitespace
                  (type == 's' ||
                   ((type === 'd' || type == 'u' || type == 'i') && ((next >= 48 && next <= 57) ||
                                                                     (first && next == 45))) ||
                   ((type === 'x' || type === 'X') && (next >= 48 && next <= 57 ||
                                     next >= 97 && next <= 102 ||
                                     next >= 65 && next <= 70))) &&
                  (formatIndex >= format.length || next !== format[formatIndex].charCodeAt(0))) { // Stop when we read something that is coming up
                buffer.push(String.fromCharCode(next));
                next = get();
                curr++;
                first = false;
              } else {
                break;
              }
            }
            unget();
          }
          if (buffer.length === 0) return 0;  // Failure.
          if (suppressAssignment) continue;
  
          var text = buffer.join('');
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          switch (type) {
            case 'd': case 'u': case 'i':
              if (half) {
                HEAP16[((argPtr)>>1)]=parseInt(text, 10);
              } else if (longLong) {
                (tempI64 = [parseInt(text, 10)>>>0,(tempDouble=parseInt(text, 10),(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((argPtr)>>2)]=tempI64[0],HEAP32[(((argPtr)+(4))>>2)]=tempI64[1]);
              } else {
                HEAP32[((argPtr)>>2)]=parseInt(text, 10);
              }
              break;
            case 'X':
            case 'x':
              HEAP32[((argPtr)>>2)]=parseInt(text, 16);
              break;
            case 'F':
            case 'f':
            case 'E':
            case 'e':
            case 'G':
            case 'g':
            case 'E':
              // fallthrough intended
              if (long_) {
                HEAPF64[((argPtr)>>3)]=parseFloat(text);
              } else {
                HEAPF32[((argPtr)>>2)]=parseFloat(text);
              }
              break;
            case 's':
              var array = intArrayFromString(text);
              for (var j = 0; j < array.length; j++) {
                HEAP8[(((argPtr)+(j))|0)]=array[j];
              }
              break;
          }
          fields++;
        } else if (format[formatIndex].charCodeAt(0) in __scanString.whiteSpace) {
          next = get();
          while (next in __scanString.whiteSpace) {
            if (next <= 0) break mainLoop;  // End of input.
            next = get();
          }
          unget(next);
          formatIndex++;
        } else {
          // Not a specifier.
          next = get();
          if (format[formatIndex].charCodeAt(0) !== next) {
            unget(next);
            break mainLoop;
          }
          formatIndex++;
        }
      }
      return fields;
    }
  
  function _fgetc(stream) {
      // int fgetc(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgetc.html
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) return -1;
      if (streamObj.eof || streamObj.error) return -1;
      var ret = _fread(_fgetc.ret, 1, 1, stream);
      if (ret == 0) {
        return -1;
      } else if (ret == -1) {
        streamObj.error = true;
        return -1;
      } else {
        return HEAPU8[((_fgetc.ret)|0)];
      }
    }
  
  function _ungetc(c, stream) {
      // int ungetc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ungetc.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) {
        return -1;
      }
      if (c === -1) {
        // do nothing for EOF character
        return c;
      }
      c = unSign(c & 0xFF);
      stream.ungotten.push(c);
      stream.eof = false;
      return c;
    }function _fscanf(stream, format, varargs) {
      // int fscanf(FILE *restrict stream, const char *restrict format, ... );
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/scanf.html
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) {
        return -1;
      }
      var buffer = [];
      function get() {
        var c = _fgetc(stream);
        buffer.push(c);
        return c;
      };
      function unget() {
        _ungetc(buffer.pop(), stream);
      };
      return __scanString(format, get, unget, varargs);
    }

  function ___errno_location() {
      return ___errno_state;
    }

  function _clFinish(command_queue) {
  
  
      try {
  
        CL.cl_objects[command_queue].finish();
  
      } catch (e) {
        var _error = CL.catchError(e);
  
        return _error;
      }
  
  
      return webcl.SUCCESS;
    }

  function _clCreateBuffer(context,flags_i64_1,flags_i64_2,size,host_ptr,cl_errcode_ret) {
      // Assume the flags is i32 
      assert(flags_i64_2 == 0, 'Invalid flags i64');
      
  
      var _id = null;
      var _buffer = null;
  
      // Context must be created
      
      var _flags;
  
      if (flags_i64_1 & webcl.MEM_READ_WRITE) {
        _flags = webcl.MEM_READ_WRITE;
      } else if (flags_i64_1 & webcl.MEM_WRITE_ONLY) {
        _flags = webcl.MEM_WRITE_ONLY;
      } else if (flags_i64_1 & webcl.MEM_READ_ONLY) {
        _flags = webcl.MEM_READ_ONLY;
      } else {
        _flags |= webcl.MEM_READ_WRITE;
      }
  
      var _host_ptr = null;
  
      if ( host_ptr != 0 ) _host_ptr = CL.getCopyPointerToArray(host_ptr,size,CL.cl_pn_type); 
      else if (
        (flags_i64_1 & (1 << 4) /* CL_MEM_ALLOC_HOST_PTR  */) ||
        (flags_i64_1 & (1 << 5) /* CL_MEM_COPY_HOST_PTR   */) ||
        (flags_i64_1 & (1 << 3) /* CL_MEM_USE_HOST_PTR    */)
        ) {
        _host_ptr = CL.getHostPtrArray(size,CL.cl_pn_type);
      } 
  
      try {
  
      
        if (_host_ptr != null) {
          _buffer = CL.cl_objects[context].createBuffer(_flags,size,_host_ptr);
        } else
          _buffer = CL.cl_objects[context].createBuffer(_flags,size);
  
      } catch (e) {
        var _error = CL.catchError(e);
      
        if (cl_errcode_ret != 0) {
          HEAP32[((cl_errcode_ret)>>2)]=_error;
        }
        
        return 0; // NULL Pointer
      }
  
      if (cl_errcode_ret != 0) {
        HEAP32[((cl_errcode_ret)>>2)]=0;
      }
  
      // Add flags property
      Object.defineProperty(_buffer, "flags", { value : flags_i64_1,writable : false });
      _id = CL.udid(_buffer);
    
      // \todo need to be remove when firefox will be support hot_ptr
      /**** **** **** **** **** **** **** ****/
      if (_host_ptr != null) {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
          // Search command
          var commandqueue = null;
          for (var obj in CL.cl_objects) {
            if (CL.cl_objects[obj] instanceof WebCLCommandQueue) {
              commandqueue = CL.cl_objects[obj];
              break;
            }
          }
          
          if (commandqueue != null) {
            _clEnqueueWriteBuffer(obj,_id,true,0,size,host_ptr,0,0,0);
          } else {
            if (cl_errcode_ret != 0) {
              HEAP32[((cl_errcode_ret)>>2)]=webcl.INVALID_VALUE;
            }
  
            return 0; 
          }
        }
      }
      /**** **** **** **** **** **** **** ****/
  
  
      return _id;
    }

  var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;

  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

  function _llvm_lifetime_start() {}

___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
var GLctx; GL.init()
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + 5242880;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

 var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_DYNAMIC);
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);

var Math_min = Math.min;
function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm = (function(global, env, buffer) {
  'almost asm';
  var HEAP8 = new global.Int8Array(buffer);
  var HEAP16 = new global.Int16Array(buffer);
  var HEAP32 = new global.Int32Array(buffer);
  var HEAPU8 = new global.Uint8Array(buffer);
  var HEAPU16 = new global.Uint16Array(buffer);
  var HEAPU32 = new global.Uint32Array(buffer);
  var HEAPF32 = new global.Float32Array(buffer);
  var HEAPF64 = new global.Float64Array(buffer);

  var STACKTOP=env.STACKTOP|0;
  var STACK_MAX=env.STACK_MAX|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;
  var cttz_i8=env.cttz_i8|0;
  var ctlz_i8=env.ctlz_i8|0;
  var ___rand_seed=env.___rand_seed|0;
  var _stderr=env._stderr|0;

  var __THREW__ = 0;
  var threwValue = 0;
  var setjmpId = 0;
  var undef = 0;
  var nan = +env.NaN, inf = +env.Infinity;
  var tempInt = 0, tempBigInt = 0, tempBigIntP = 0, tempBigIntS = 0, tempBigIntR = 0.0, tempBigIntI = 0, tempBigIntD = 0, tempValue = 0, tempDouble = 0.0;

  var tempRet0 = 0;
  var tempRet1 = 0;
  var tempRet2 = 0;
  var tempRet3 = 0;
  var tempRet4 = 0;
  var tempRet5 = 0;
  var tempRet6 = 0;
  var tempRet7 = 0;
  var tempRet8 = 0;
  var tempRet9 = 0;
  var Math_floor=global.Math.floor;
  var Math_abs=global.Math.abs;
  var Math_sqrt=global.Math.sqrt;
  var Math_pow=global.Math.pow;
  var Math_cos=global.Math.cos;
  var Math_sin=global.Math.sin;
  var Math_tan=global.Math.tan;
  var Math_acos=global.Math.acos;
  var Math_asin=global.Math.asin;
  var Math_atan=global.Math.atan;
  var Math_atan2=global.Math.atan2;
  var Math_exp=global.Math.exp;
  var Math_log=global.Math.log;
  var Math_ceil=global.Math.ceil;
  var Math_imul=global.Math.imul;
  var abort=env.abort;
  var assert=env.assert;
  var asmPrintInt=env.asmPrintInt;
  var asmPrintFloat=env.asmPrintFloat;
  var Math_min=env.min;
  var _mkport=env._mkport;
  var _llvm_lifetime_start=env._llvm_lifetime_start;
  var _clReleaseEvent=env._clReleaseEvent;
  var _clReleaseProgram=env._clReleaseProgram;
  var _send=env._send;
  var _clBuildProgram=env._clBuildProgram;
  var _fread=env._fread;
  var _clReleaseKernel=env._clReleaseKernel;
  var _clReleaseContext=env._clReleaseContext;
  var _open=env._open;
  var _clEnqueueNDRangeKernel=env._clEnqueueNDRangeKernel;
  var _ungetc=env._ungetc;
  var _clCreateContext=env._clCreateContext;
  var _clEnqueueWriteBuffer=env._clEnqueueWriteBuffer;
  var _clCreateProgramWithSource=env._clCreateProgramWithSource;
  var _atoi=env._atoi;
  var _fflush=env._fflush;
  var _clEnqueueUnmapMemObject=env._clEnqueueUnmapMemObject;
  var ___errno_location=env.___errno_location;
  var _chdir=env._chdir;
  var _strtol=env._strtol;
  var _fscanf=env._fscanf;
  var ___setErrNo=env.___setErrNo;
  var _sbrk=env._sbrk;
  var ___libgenSplitName=env.___libgenSplitName;
  var _dirname=env._dirname;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var _fileno=env._fileno;
  var _basename=env._basename;
  var _clGetPlatformIDs=env._clGetPlatformIDs;
  var _read=env._read;
  var _sysconf=env._sysconf;
  var _clGetPlatformInfo=env._clGetPlatformInfo;
  var __formatString=env.__formatString;
  var _clFinish=env._clFinish;
  var _clWaitForEvents=env._clWaitForEvents;
  var _isspace=env._isspace;
  var _pwrite=env._pwrite;
  var _clCreateCommandQueue=env._clCreateCommandQueue;
  var _clGetDeviceIDs=env._clGetDeviceIDs;
  var _clReleaseCommandQueue=env._clReleaseCommandQueue;
  var __parseInt=env.__parseInt;
  var __reallyNegative=env.__reallyNegative;
  var _clReleaseMemObject=env._clReleaseMemObject;
  var _clGetDeviceInfo=env._clGetDeviceInfo;
  var _write=env._write;
  var _pread=env._pread;
  var _clEnqueueReadBuffer=env._clEnqueueReadBuffer;
  var _clGetKernelWorkGroupInfo=env._clGetKernelWorkGroupInfo;
  var _clCreateBuffer=env._clCreateBuffer;
  var _stat=env._stat;
  var _recv=env._recv;
  var _fgetc=env._fgetc;
  var _printf=env._printf;
  var __scanString=env.__scanString;
  var __exit=env.__exit;
  var __getFloat=env.__getFloat;
  var _clSetKernelArg=env._clSetKernelArg;
  var _abort=env._abort;
  var _fwrite=env._fwrite;
  var _time=env._time;
  var _fprintf=env._fprintf;
  var _llvm_lifetime_end=env._llvm_lifetime_end;
  var _clEnqueueMapBuffer=env._clEnqueueMapBuffer;
  var _fopen=env._fopen;
  var _exit=env._exit;
  var _clCreateKernel=env._clCreateKernel;
  var tempFloat = 0.0;

// EMSCRIPTEN_START_FUNCS
function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
STACKTOP = (STACKTOP + 7)&-8;
  return ret|0;
}
function stackSave() {
  return STACKTOP|0;
}
function stackRestore(top) {
  top = top|0;
  STACKTOP = top;
}
function setThrew(threw, value) {
  threw = threw|0;
  value = value|0;
  if ((__THREW__|0) == 0) {
    __THREW__ = threw;
    threwValue = value;
  }
}
function copyTempFloat(ptr) {
  ptr = ptr|0;
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1|0] = HEAP8[ptr+1|0];
  HEAP8[tempDoublePtr+2|0] = HEAP8[ptr+2|0];
  HEAP8[tempDoublePtr+3|0] = HEAP8[ptr+3|0];
}
function copyTempDouble(ptr) {
  ptr = ptr|0;
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1|0] = HEAP8[ptr+1|0];
  HEAP8[tempDoublePtr+2|0] = HEAP8[ptr+2|0];
  HEAP8[tempDoublePtr+3|0] = HEAP8[ptr+3|0];
  HEAP8[tempDoublePtr+4|0] = HEAP8[ptr+4|0];
  HEAP8[tempDoublePtr+5|0] = HEAP8[ptr+5|0];
  HEAP8[tempDoublePtr+6|0] = HEAP8[ptr+6|0];
  HEAP8[tempDoublePtr+7|0] = HEAP8[ptr+7|0];
}

function setTempRet0(value) {
  value = value|0;
  tempRet0 = value;
}

function setTempRet1(value) {
  value = value|0;
  tempRet1 = value;
}

function setTempRet2(value) {
  value = value|0;
  tempRet2 = value;
}

function setTempRet3(value) {
  value = value|0;
  tempRet3 = value;
}

function setTempRet4(value) {
  value = value|0;
  tempRet4 = value;
}

function setTempRet5(value) {
  value = value|0;
  tempRet5 = value;
}

function setTempRet6(value) {
  value = value|0;
  tempRet6 = value;
}

function setTempRet7(value) {
  value = value|0;
  tempRet7 = value;
}

function setTempRet8(value) {
  value = value|0;
  tempRet8 = value;
}

function setTempRet9(value) {
  value = value|0;
  tempRet9 = value;
}

function __Z10matrix_genP18_matrix_gen_struct($mgs) {
 $mgs = $mgs|0;
 var $1 = 0, $10 = 0, $100 = 0, $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0;
 var $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0;
 var $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0;
 var $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0, $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0;
 var $1070 = 0, $1071 = 0, $1072 = 0, $1073 = 0, $1074 = 0, $1075 = 0, $1076 = 0, $1077 = 0, $1078 = 0, $1079 = 0, $108 = 0, $1080 = 0, $1081 = 0, $1082 = 0, $1083 = 0, $1084 = 0, $1085 = 0, $1086 = 0, $1087 = 0, $1088 = 0;
 var $1089 = 0, $109 = 0, $1090 = 0, $1091 = 0, $1092 = 0, $1093 = 0, $1094 = 0, $1095 = 0, $1096 = 0, $1097 = 0, $1098 = 0, $1099 = 0, $11 = 0, $110 = 0, $1100 = 0, $1101 = 0, $1102 = 0, $1103 = 0, $1104 = 0, $1105 = 0;
 var $1106 = 0, $1107 = 0, $1108 = 0, $1109 = 0, $111 = 0, $1110 = 0, $1111 = 0, $1112 = 0, $1113 = 0, $1114 = 0, $1115 = 0, $1116 = 0, $1117 = 0, $1118 = 0, $1119 = 0, $112 = 0, $1120 = 0, $1121 = 0, $1122 = 0, $1123 = 0;
 var $1124 = 0, $1125 = 0, $1126 = 0, $1127 = 0, $1128 = 0, $1129 = 0, $113 = 0, $1130 = 0, $1131 = 0, $1132 = 0, $1133 = 0, $1134 = 0, $1135 = 0, $1136 = 0, $1137 = 0, $1138 = 0, $1139 = 0, $114 = 0, $1140 = 0, $1141 = 0;
 var $1142 = 0, $1143 = 0, $1144 = 0, $1145 = 0, $1146 = 0, $1147 = 0, $1148 = 0, $1149 = 0, $115 = 0, $1150 = 0, $1151 = 0, $1152 = 0, $1153 = 0, $1154 = 0, $1155 = 0, $1156 = 0, $1157 = 0, $1158 = 0, $1159 = 0, $116 = 0;
 var $1160 = 0, $1161 = 0, $1162 = 0, $1163 = 0, $1164 = 0, $1165 = 0, $1166 = 0, $1167 = 0, $1168 = 0, $1169 = 0, $117 = 0, $1170 = 0, $1171 = 0, $1172 = 0, $1173 = 0, $1174 = 0, $1175 = 0, $1176 = 0, $1177 = 0, $1178 = 0;
 var $1179 = 0, $118 = 0, $1180 = 0, $1181 = 0, $1182 = 0, $1183 = 0, $1184 = 0, $1185 = 0, $1186 = 0, $1187 = 0, $1188 = 0, $1189 = 0, $119 = 0, $1190 = 0, $1191 = 0, $1192 = 0, $1193 = 0, $1194 = 0, $1195 = 0, $1196 = 0;
 var $1197 = 0, $1198 = 0, $1199 = 0, $12 = 0, $120 = 0, $1200 = 0, $1201 = 0, $1202 = 0, $1203 = 0, $1204 = 0, $1205 = 0, $1206 = 0, $1207 = 0, $1208 = 0, $1209 = 0, $121 = 0, $1210 = 0, $1211 = 0, $1212 = 0, $1213 = 0;
 var $1214 = 0, $1215 = 0, $1216 = 0, $1217 = 0, $1218 = 0, $1219 = 0, $122 = 0, $1220 = 0, $1221 = 0, $1222 = 0, $1223 = 0, $1224 = 0, $1225 = 0, $1226 = 0, $1227 = 0, $1228 = 0, $1229 = 0, $123 = 0, $1230 = 0, $1231 = 0;
 var $1232 = 0, $1233 = 0, $1234 = 0, $1235 = 0, $1236 = 0, $1237 = 0, $1238 = 0, $1239 = 0, $124 = 0, $1240 = 0, $1241 = 0, $1242 = 0, $1243 = 0, $1244 = 0, $1245 = 0, $1246 = 0, $1247 = 0, $1248 = 0, $1249 = 0, $125 = 0;
 var $1250 = 0, $1251 = 0, $1252 = 0, $1253 = 0, $1254 = 0, $1255 = 0, $1256 = 0, $1257 = 0, $1258 = 0, $1259 = 0, $126 = 0, $1260 = 0, $1261 = 0, $1262 = 0, $1263 = 0, $1264 = 0, $1265 = 0, $1266 = 0, $1267 = 0, $1268 = 0;
 var $1269 = 0, $127 = 0, $1270 = 0, $1271 = 0, $1272 = 0, $1273 = 0, $1274 = 0, $1275 = 0, $1276 = 0, $1277 = 0, $1278 = 0, $1279 = 0, $128 = 0, $1280 = 0, $1281 = 0, $1282 = 0, $1283 = 0, $1284 = 0, $1285 = 0, $1286 = 0;
 var $1287 = 0, $1288 = 0, $1289 = 0, $129 = 0, $1290 = 0, $1291 = 0, $1292 = 0, $1293 = 0, $1294 = 0, $1295 = 0, $1296 = 0, $1297 = 0, $1298 = 0, $1299 = 0, $13 = 0, $130 = 0, $1300 = 0, $1301 = 0, $1302 = 0, $1303 = 0;
 var $1304 = 0, $1305 = 0, $1306 = 0, $1307 = 0, $1308 = 0, $1309 = 0, $131 = 0, $1310 = 0, $1311 = 0, $1312 = 0, $1313 = 0, $1314 = 0, $1315 = 0, $1316 = 0, $1317 = 0, $1318 = 0, $1319 = 0, $132 = 0, $1320 = 0, $1321 = 0;
 var $1322 = 0, $1323 = 0, $1324 = 0, $1325 = 0, $1326 = 0, $1327 = 0, $1328 = 0, $1329 = 0, $133 = 0, $1330 = 0, $1331 = 0, $1332 = 0, $1333 = 0, $1334 = 0, $1335 = 0, $1336 = 0, $1337 = 0, $1338 = 0, $1339 = 0, $134 = 0;
 var $1340 = 0, $1341 = 0, $1342 = 0, $1343 = 0, $1344 = 0, $1345 = 0, $1346 = 0, $1347 = 0, $1348 = 0, $1349 = 0, $135 = 0, $1350 = 0, $1351 = 0, $1352 = 0, $1353 = 0, $1354 = 0, $1355 = 0, $1356 = 0, $1357 = 0, $1358 = 0;
 var $1359 = 0, $136 = 0, $1360 = 0, $1361 = 0, $1362 = 0, $1363 = 0, $1364 = 0, $1365 = 0, $1366 = 0, $1367 = 0, $1368 = 0, $1369 = 0, $137 = 0, $1370 = 0, $1371 = 0, $1372 = 0, $1373 = 0, $1374 = 0, $1375 = 0, $1376 = 0;
 var $1377 = 0, $1378 = 0, $1379 = 0, $138 = 0, $1380 = 0, $1381 = 0, $1382 = 0, $1383 = 0, $1384 = 0, $1385 = 0, $1386 = 0, $1387 = 0, $1388 = 0, $1389 = 0, $139 = 0, $1390 = 0, $1391 = 0, $1392 = 0, $1393 = 0, $1394 = 0;
 var $1395 = 0, $1396 = 0, $1397 = 0, $1398 = 0, $1399 = 0, $14 = 0, $140 = 0, $1400 = 0, $1401 = 0, $1402 = 0, $1403 = 0, $1404 = 0, $1405 = 0, $1406 = 0, $1407 = 0, $1408 = 0, $1409 = 0, $141 = 0, $1410 = 0, $1411 = 0;
 var $1412 = 0, $1413 = 0, $1414 = 0, $1415 = 0, $1416 = 0, $1417 = 0, $1418 = 0, $1419 = 0, $142 = 0, $1420 = 0, $1421 = 0, $1422 = 0, $1423 = 0, $1424 = 0, $1425 = 0, $1426 = 0, $1427 = 0, $1428 = 0, $1429 = 0, $143 = 0;
 var $1430 = 0, $1431 = 0, $1432 = 0, $1433 = 0, $1434 = 0, $1435 = 0, $1436 = 0, $1437 = 0, $1438 = 0, $1439 = 0, $144 = 0, $1440 = 0, $1441 = 0, $1442 = 0, $1443 = 0, $1444 = 0, $1445 = 0, $1446 = 0, $1447 = 0, $1448 = 0;
 var $1449 = 0, $145 = 0, $1450 = 0, $1451 = 0, $1452 = 0, $1453 = 0, $1454 = 0, $1455 = 0, $1456 = 0, $1457 = 0, $1458 = 0, $1459 = 0, $146 = 0, $1460 = 0, $1461 = 0, $1462 = 0, $1463 = 0, $1464 = 0, $1465 = 0, $1466 = 0;
 var $1467 = 0, $1468 = 0, $1469 = 0, $147 = 0, $1470 = 0, $1471 = 0, $1472 = 0, $1473 = 0, $1474 = 0, $1475 = 0, $1476 = 0, $1477 = 0, $1478 = 0, $1479 = 0, $148 = 0, $1480 = 0, $1481 = 0, $1482 = 0, $1483 = 0, $1484 = 0;
 var $1485 = 0, $1486 = 0, $1487 = 0, $1488 = 0, $1489 = 0, $149 = 0, $1490 = 0, $1491 = 0, $1492 = 0, $1493 = 0, $1494 = 0, $1495 = 0, $1496 = 0, $1497 = 0, $1498 = 0, $1499 = 0, $15 = 0, $150 = 0, $1500 = 0, $1501 = 0;
 var $1502 = 0, $1503 = 0, $1504 = 0, $1505 = 0, $1506 = 0, $1507 = 0, $1508 = 0, $1509 = 0, $151 = 0, $1510 = 0, $1511 = 0, $1512 = 0, $1513 = 0, $1514 = 0, $1515 = 0, $1516 = 0, $1517 = 0, $1518 = 0, $1519 = 0, $152 = 0;
 var $1520 = 0, $1521 = 0, $1522 = 0, $1523 = 0, $1524 = 0, $1525 = 0, $1526 = 0, $1527 = 0, $1528 = 0, $1529 = 0, $153 = 0, $1530 = 0, $1531 = 0, $1532 = 0, $1533 = 0, $1534 = 0, $1535 = 0, $1536 = 0, $1537 = 0, $1538 = 0;
 var $1539 = 0, $154 = 0, $1540 = 0, $1541 = 0, $1542 = 0, $1543 = 0, $1544 = 0, $1545 = 0, $1546 = 0, $1547 = 0, $1548 = 0, $1549 = 0, $155 = 0, $1550 = 0, $1551 = 0, $1552 = 0, $1553 = 0, $1554 = 0, $1555 = 0, $1556 = 0;
 var $1557 = 0, $1558 = 0, $1559 = 0, $156 = 0, $1560 = 0, $1561 = 0, $1562 = 0, $1563 = 0, $1564 = 0, $1565 = 0, $1566 = 0, $1567 = 0, $1568 = 0, $1569 = 0, $157 = 0, $1570 = 0, $1571 = 0, $1572 = 0, $1573 = 0, $1574 = 0;
 var $1575 = 0, $1576 = 0, $1577 = 0, $1578 = 0, $1579 = 0, $158 = 0, $1580 = 0, $1581 = 0, $1582 = 0, $1583 = 0, $1584 = 0, $1585 = 0, $1586 = 0, $1587 = 0, $1588 = 0, $1589 = 0, $159 = 0, $1590 = 0, $1591 = 0, $1592 = 0;
 var $1593 = 0, $1594 = 0, $1595 = 0, $1596 = 0, $1597 = 0, $1598 = 0, $1599 = 0, $16 = 0, $160 = 0, $1600 = 0, $1601 = 0, $1602 = 0, $1603 = 0, $1604 = 0, $1605 = 0, $1606 = 0, $1607 = 0, $1608 = 0, $1609 = 0, $161 = 0;
 var $1610 = 0, $1611 = 0, $1612 = 0, $1613 = 0, $1614 = 0, $1615 = 0, $1616 = 0, $1617 = 0, $1618 = 0, $1619 = 0, $162 = 0, $1620 = 0, $1621 = 0, $1622 = 0, $1623 = 0, $1624 = 0, $1625 = 0, $1626 = 0, $1627 = 0, $1628 = 0;
 var $1629 = 0, $163 = 0, $1630 = 0, $1631 = 0, $1632 = 0, $1633 = 0, $1634 = 0, $1635 = 0, $1636 = 0, $1637 = 0, $1638 = 0, $1639 = 0, $164 = 0, $1640 = 0, $1641 = 0, $1642 = 0, $1643 = 0, $1644 = 0, $1645 = 0, $1646 = 0;
 var $1647 = 0, $1648 = 0, $1649 = 0, $165 = 0, $1650 = 0, $1651 = 0, $1652 = 0, $1653 = 0, $1654 = 0, $1655 = 0, $1656 = 0, $1657 = 0, $1658 = 0, $1659 = 0, $166 = 0, $1660 = 0, $1661 = 0, $1662 = 0, $1663 = 0, $1664 = 0;
 var $1665 = 0, $1666 = 0, $1667 = 0, $1668 = 0, $1669 = 0, $167 = 0, $1670 = 0, $1671 = 0, $1672 = 0, $1673 = 0, $1674 = 0, $1675 = 0, $1676 = 0, $1677 = 0, $1678 = 0, $1679 = 0, $168 = 0, $1680 = 0, $1681 = 0, $1682 = 0;
 var $1683 = 0, $1684 = 0, $1685 = 0, $1686 = 0, $1687 = 0, $1688 = 0, $1689 = 0, $169 = 0, $1690 = 0, $1691 = 0, $1692 = 0, $1693 = 0, $1694 = 0, $1695 = 0, $1696 = 0, $1697 = 0, $1698 = 0, $1699 = 0, $17 = 0, $170 = 0;
 var $1700 = 0, $1701 = 0, $1702 = 0, $1703 = 0, $1704 = 0, $1705 = 0, $1706 = 0, $1707 = 0, $1708 = 0, $1709 = 0, $171 = 0, $1710 = 0, $1711 = 0, $1712 = 0, $1713 = 0, $1714 = 0, $1715 = 0, $1716 = 0, $1717 = 0, $1718 = 0;
 var $1719 = 0, $172 = 0, $1720 = 0, $1721 = 0, $1722 = 0, $1723 = 0, $1724 = 0, $1725 = 0, $1726 = 0, $1727 = 0, $1728 = 0, $1729 = 0, $173 = 0, $1730 = 0, $1731 = 0, $1732 = 0, $1733 = 0, $1734 = 0, $1735 = 0, $1736 = 0;
 var $1737 = 0, $1738 = 0, $1739 = 0, $174 = 0, $1740 = 0, $1741 = 0, $1742 = 0, $1743 = 0, $1744 = 0, $1745 = 0, $1746 = 0, $1747 = 0, $1748 = 0, $1749 = 0, $175 = 0.0, $1750 = 0, $1751 = 0, $1752 = 0, $1753 = 0, $1754 = 0;
 var $1755 = 0, $1756 = 0, $1757 = 0, $1758 = 0, $1759 = 0, $176 = 0.0, $1760 = 0, $1761 = 0, $1762 = 0, $1763 = 0, $1764 = 0, $1765 = 0, $1766 = 0, $1767 = 0, $1768 = 0, $1769 = 0, $177 = 0, $1770 = 0, $1771 = 0, $1772 = 0;
 var $1773 = 0, $1774 = 0, $1775 = 0, $1776 = 0, $1777 = 0, $1778 = 0, $1779 = 0, $178 = 0, $1780 = 0, $1781 = 0, $1782 = 0, $1783 = 0, $1784 = 0, $1785 = 0, $1786 = 0, $1787 = 0, $1788 = 0, $1789 = 0, $179 = 0.0, $1790 = 0;
 var $1791 = 0, $1792 = 0, $1793 = 0, $1794 = 0, $1795 = 0, $1796 = 0, $1797 = 0, $1798 = 0, $1799 = 0, $18 = 0, $180 = 0.0, $1800 = 0, $1801 = 0, $1802 = 0, $1803 = 0, $1804 = 0.0, $1805 = 0, $1806 = 0, $1807 = 0, $1808 = 0;
 var $1809 = 0, $181 = 0.0, $1810 = 0, $1811 = 0, $1812 = 0, $1813 = 0, $1814 = 0, $1815 = 0, $1816 = 0, $1817 = 0, $1818 = 0, $1819 = 0, $182 = 0, $1820 = 0, $1821 = 0, $1822 = 0, $1823 = 0, $1824 = 0, $1825 = 0, $1826 = 0;
 var $1827 = 0, $1828 = 0, $1829 = 0, $183 = 0, $1830 = 0, $1831 = 0, $1832 = 0, $1833 = 0, $1834 = 0, $1835 = 0, $1836 = 0, $1837 = 0, $1838 = 0, $1839 = 0, $184 = 0.0, $1840 = 0, $1841 = 0, $1842 = 0, $1843 = 0, $1844 = 0;
 var $1845 = 0, $1846 = 0, $1847 = 0, $1848 = 0, $1849 = 0, $185 = 0.0, $1850 = 0, $1851 = 0, $1852 = 0, $1853 = 0, $1854 = 0, $1855 = 0, $1856 = 0, $1857 = 0, $1858 = 0, $1859 = 0, $186 = 0, $1860 = 0, $1861 = 0, $1862 = 0;
 var $1863 = 0, $1864 = 0, $1865 = 0, $1866 = 0, $1867 = 0, $1868 = 0, $1869 = 0, $187 = 0, $1870 = 0, $1871 = 0, $1872 = 0, $1873 = 0, $1874 = 0, $1875 = 0, $1876 = 0, $1877 = 0, $1878 = 0, $1879 = 0, $188 = 0, $1880 = 0;
 var $1881 = 0, $1882 = 0, $1883 = 0, $1884 = 0, $1885 = 0, $1886 = 0, $1887 = 0, $1888 = 0, $1889 = 0, $189 = 0, $1890 = 0, $1891 = 0, $1892 = 0, $1893 = 0, $1894 = 0, $1895 = 0, $1896 = 0, $1897 = 0, $1898 = 0, $1899 = 0;
 var $19 = 0, $190 = 0, $1900 = 0, $1901 = 0, $1902 = 0, $1903 = 0, $1904 = 0, $1905 = 0, $1906 = 0, $1907 = 0, $1908 = 0, $1909 = 0, $191 = 0, $1910 = 0, $1911 = 0, $1912 = 0, $1913 = 0, $1914 = 0, $1915 = 0, $1916 = 0;
 var $1917 = 0, $1918 = 0, $1919 = 0, $192 = 0, $1920 = 0, $1921 = 0, $1922 = 0, $1923 = 0, $1924 = 0, $1925 = 0, $1926 = 0, $1927 = 0, $1928 = 0, $1929 = 0, $193 = 0, $1930 = 0, $1931 = 0, $1932 = 0, $1933 = 0, $1934 = 0;
 var $1935 = 0, $1936 = 0, $1937 = 0, $1938 = 0, $1939 = 0, $194 = 0, $1940 = 0, $1941 = 0, $1942 = 0, $1943 = 0, $1944 = 0, $1945 = 0, $1946 = 0, $1947 = 0, $1948 = 0, $1949 = 0, $195 = 0, $1950 = 0, $1951 = 0, $1952 = 0;
 var $1953 = 0, $1954 = 0, $1955 = 0, $1956 = 0, $1957 = 0, $1958 = 0, $1959 = 0, $196 = 0, $1960 = 0, $1961 = 0, $1962 = 0, $1963 = 0, $1964 = 0, $1965 = 0, $1966 = 0, $1967 = 0, $1968 = 0, $1969 = 0, $197 = 0, $1970 = 0;
 var $1971 = 0, $1972 = 0, $1973 = 0, $1974 = 0, $1975 = 0, $1976 = 0, $1977 = 0, $1978 = 0, $1979 = 0, $198 = 0, $1980 = 0, $1981 = 0, $1982 = 0, $1983 = 0, $1984 = 0, $1985 = 0, $1986 = 0, $1987 = 0, $1988 = 0, $1989 = 0;
 var $199 = 0, $1990 = 0, $1991 = 0, $1992 = 0, $1993 = 0, $1994 = 0, $1995 = 0, $1996 = 0, $1997 = 0, $1998 = 0, $1999 = 0, $2 = 0, $20 = 0, $200 = 0, $2000 = 0, $2001 = 0, $2002 = 0, $2003 = 0, $2004 = 0, $2005 = 0;
 var $2006 = 0, $2007 = 0, $2008 = 0, $2009 = 0, $201 = 0.0, $2010 = 0, $2011 = 0, $2012 = 0, $2013 = 0, $2014 = 0, $2015 = 0, $2016 = 0, $2017 = 0, $2018 = 0, $2019 = 0, $202 = 0, $2020 = 0, $2021 = 0, $2022 = 0, $2023 = 0;
 var $2024 = 0, $2025 = 0, $2026 = 0, $2027 = 0, $2028 = 0, $2029 = 0, $203 = 0, $2030 = 0, $2031 = 0, $2032 = 0, $2033 = 0, $2034 = 0, $2035 = 0, $2036 = 0, $2037 = 0, $2038 = 0, $2039 = 0, $204 = 0, $2040 = 0, $2041 = 0;
 var $2042 = 0, $2043 = 0, $2044 = 0, $2045 = 0, $2046 = 0, $2047 = 0, $2048 = 0, $2049 = 0.0, $205 = 0, $2050 = 0, $2051 = 0, $2052 = 0, $2053 = 0, $2054 = 0, $2055 = 0, $2056 = 0, $2057 = 0, $2058 = 0, $2059 = 0, $206 = 0;
 var $2060 = 0, $2061 = 0, $2062 = 0, $2063 = 0, $2064 = 0, $2065 = 0, $2066 = 0, $2067 = 0, $2068 = 0, $2069 = 0, $207 = 0, $2070 = 0, $2071 = 0, $2072 = 0, $2073 = 0, $2074 = 0, $2075 = 0, $2076 = 0, $2077 = 0, $2078 = 0;
 var $2079 = 0, $208 = 0, $2080 = 0, $2081 = 0, $2082 = 0, $2083 = 0, $2084 = 0, $2085 = 0, $2086 = 0, $2087 = 0, $2088 = 0, $2089 = 0, $209 = 0, $2090 = 0, $2091 = 0, $2092 = 0, $2093 = 0, $2094 = 0, $2095 = 0, $2096 = 0;
 var $2097 = 0, $2098 = 0, $2099 = 0, $21 = 0, $210 = 0, $2100 = 0, $2101 = 0, $2102 = 0, $2103 = 0, $2104 = 0, $2105 = 0, $2106 = 0, $2107 = 0, $2108 = 0, $2109 = 0, $211 = 0, $2110 = 0, $2111 = 0, $2112 = 0, $2113 = 0;
 var $2114 = 0, $2115 = 0, $2116 = 0, $2117 = 0, $2118 = 0, $2119 = 0, $212 = 0, $2120 = 0, $2121 = 0, $2122 = 0, $2123 = 0, $2124 = 0, $2125 = 0, $2126 = 0, $2127 = 0, $2128 = 0, $2129 = 0, $213 = 0, $2130 = 0, $2131 = 0;
 var $2132 = 0, $2133 = 0, $2134 = 0, $2135 = 0, $2136 = 0, $2137 = 0, $2138 = 0, $2139 = 0, $214 = 0, $2140 = 0, $2141 = 0, $2142 = 0, $2143 = 0, $2144 = 0, $2145 = 0, $2146 = 0, $2147 = 0, $2148 = 0, $2149 = 0, $215 = 0;
 var $2150 = 0, $2151 = 0.0, $2152 = 0, $2153 = 0.0, $2154 = 0.0, $2155 = 0.0, $2156 = 0.0, $2157 = 0, $2158 = 0, $2159 = 0, $216 = 0, $2160 = 0, $2161 = 0, $2162 = 0, $2163 = 0, $2164 = 0, $2165 = 0, $2166 = 0, $2167 = 0, $2168 = 0;
 var $2169 = 0, $217 = 0, $2170 = 0, $2171 = 0, $2172 = 0, $2173 = 0, $2174 = 0, $2175 = 0, $2176 = 0, $2177 = 0, $2178 = 0, $2179 = 0, $218 = 0, $2180 = 0, $2181 = 0, $2182 = 0, $2183 = 0, $2184 = 0, $2185 = 0, $2186 = 0;
 var $2187 = 0, $2188 = 0, $2189 = 0, $219 = 0, $2190 = 0, $2191 = 0, $2192 = 0, $2193 = 0, $2194 = 0, $2195 = 0, $2196 = 0, $2197 = 0, $2198 = 0, $2199 = 0, $22 = 0, $220 = 0, $2200 = 0, $2201 = 0, $2202 = 0, $2203 = 0;
 var $2204 = 0, $2205 = 0, $2206 = 0, $2207 = 0, $2208 = 0, $2209 = 0, $221 = 0, $2210 = 0, $2211 = 0, $2212 = 0, $2213 = 0, $2214 = 0, $2215 = 0, $2216 = 0, $2217 = 0, $2218 = 0, $2219 = 0, $222 = 0, $2220 = 0, $2221 = 0;
 var $2222 = 0, $2223 = 0, $2224 = 0, $2225 = 0, $2226 = 0, $2227 = 0, $2228 = 0, $2229 = 0, $223 = 0, $2230 = 0, $2231 = 0, $2232 = 0, $2233 = 0, $2234 = 0, $2235 = 0, $2236 = 0, $2237 = 0, $2238 = 0, $2239 = 0, $224 = 0;
 var $2240 = 0, $2241 = 0, $2242 = 0, $2243 = 0, $2244 = 0, $2245 = 0, $2246 = 0, $2247 = 0, $2248 = 0, $2249 = 0, $225 = 0, $2250 = 0, $2251 = 0, $2252 = 0, $2253 = 0, $2254 = 0, $2255 = 0, $2256 = 0, $2257 = 0, $2258 = 0;
 var $2259 = 0, $226 = 0, $2260 = 0, $2261 = 0, $2262 = 0, $2263 = 0, $2264 = 0, $2265 = 0, $2266 = 0, $2267 = 0, $2268 = 0, $2269 = 0, $227 = 0, $2270 = 0, $2271 = 0, $2272 = 0, $2273 = 0, $2274 = 0, $2275 = 0, $2276 = 0;
 var $2277 = 0, $2278 = 0, $2279 = 0, $228 = 0, $2280 = 0, $2281 = 0, $2282 = 0, $2283 = 0, $2284 = 0, $2285 = 0, $2286 = 0, $2287 = 0, $2288 = 0, $2289 = 0, $229 = 0, $2290 = 0, $2291 = 0, $2292 = 0, $2293 = 0, $2294 = 0;
 var $2295 = 0, $2296 = 0, $2297 = 0, $2298 = 0, $2299 = 0, $23 = 0, $230 = 0, $2300 = 0, $2301 = 0, $2302 = 0, $2303 = 0, $2304 = 0, $2305 = 0, $2306 = 0, $2307 = 0, $2308 = 0, $2309 = 0, $231 = 0, $2310 = 0, $2311 = 0;
 var $2312 = 0, $2313 = 0, $2314 = 0, $2315 = 0, $2316 = 0, $2317 = 0, $2318 = 0, $2319 = 0, $232 = 0, $2320 = 0, $2321 = 0, $2322 = 0, $2323 = 0, $2324 = 0, $2325 = 0, $2326 = 0, $2327 = 0, $2328 = 0, $2329 = 0, $233 = 0;
 var $2330 = 0, $2331 = 0, $2332 = 0, $2333 = 0, $2334 = 0, $2335 = 0, $2336 = 0, $2337 = 0, $2338 = 0, $2339 = 0, $234 = 0, $2340 = 0, $2341 = 0, $2342 = 0, $2343 = 0, $2344 = 0, $2345 = 0, $2346 = 0, $2347 = 0, $2348 = 0;
 var $2349 = 0, $235 = 0, $2350 = 0, $2351 = 0, $2352 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0;
 var $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0;
 var $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0;
 var $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0;
 var $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0.0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0;
 var $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0;
 var $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0;
 var $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0.0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0;
 var $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0;
 var $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0;
 var $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0;
 var $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0.0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0.0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0.0, $447 = 0.0;
 var $448 = 0.0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0.0, $462 = 0, $463 = 0, $464 = 0, $465 = 0;
 var $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0;
 var $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0;
 var $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0;
 var $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0;
 var $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0;
 var $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0;
 var $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0;
 var $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0;
 var $61 = 0, $610 = 0, $611 = 0, $612 = 0.0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0;
 var $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0, $643 = 0, $644 = 0, $645 = 0;
 var $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0, $661 = 0, $662 = 0, $663 = 0;
 var $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0, $68 = 0, $680 = 0, $681 = 0;
 var $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0, $698 = 0, $699 = 0, $7 = 0;
 var $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0;
 var $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0;
 var $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0, $751 = 0, $752 = 0, $753 = 0;
 var $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0, $77 = 0, $770 = 0, $771 = 0;
 var $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0, $788 = 0, $789 = 0, $79 = 0;
 var $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0, $805 = 0, $806 = 0, $807 = 0;
 var $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0, $823 = 0, $824 = 0, $825 = 0;
 var $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0, $841 = 0, $842 = 0, $843 = 0;
 var $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0, $86 = 0, $860 = 0, $861 = 0;
 var $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0, $878 = 0, $879 = 0, $88 = 0;
 var $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0, $896 = 0, $897 = 0, $898 = 0;
 var $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0, $913 = 0, $914 = 0, $915 = 0;
 var $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0, $931 = 0, $932 = 0, $933 = 0;
 var $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0, $95 = 0, $950 = 0, $951 = 0;
 var $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0, $968 = 0, $969 = 0, $97 = 0;
 var $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0, $985 = 0, $986 = 0, $987 = 0, $988 = 0;
 var $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $acctg_avgcount = 0.0, $acctg_maxcount = 0, $actual_non_zero = 0, $biggest_slab = 0, $candidate_row = 0, $count = 0, $count2 = 0, $count_array = 0;
 var $countdex = 0, $countdex5 = 0, $curr_input_offset = 0, $current_slab = 0, $curry = 0, $data = 0.0, $data_present = 0, $density = 0.0, $double_data = 0, $expected_nslabs = 0, $explicit_zero_count = 0, $first_team_offset = 0, $foo = 0, $i = 0, $index = 0, $inputMTX = 0, $ix = 0, $iy = 0, $j = 0, $jloop = 0;
 var $k = 0, $kk = 0, $kk1 = 0, $line_data_array = 0, $line_x_index_array = 0, $maxcount = 0, $maxcount3 = 0, $min_compute_units = 0, $next_input_offset = 0, $npackets = 0, $nslabs = 0, $nslabs_base = 0, $nteams = 0, $packet_count = 0, $packet_offset = 0, $pattern_flag = 0, $preferred_alignment = 0, $preferred_alignment_by_elements = 0, $raw_data = 0, $raw_ix = 0;
 var $raw_iy = 0, $realdata = 0, $row_curr = 0, $row_start = 0, $seg_index = 0, $slab_ptr = 0, $slab_threshhold = 0, $slabsize = 0, $smallest_slab = 0, $sum = 0, $sum4 = 0, $symmetric = 0, $symmetric_flag = 0, $target_value = 0, $target_workpacket = 0, $temp = 0, $temp_count = 0, $tempavgcount = 0, $tempcount = 0, $tempmaxcount = 0;
 var $tmp = 0, $totaldata = 0, $totpackets = 0, $totslabs = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, $vararg_buffer10 = 0, $vararg_buffer103 = 0, $vararg_buffer107 = 0, $vararg_buffer111 = 0, $vararg_buffer115 = 0, $vararg_buffer15 = 0, $vararg_buffer19 = 0, $vararg_buffer23 = 0, $vararg_buffer27 = 0, $vararg_buffer31 = 0, $vararg_buffer35 = 0, $vararg_buffer39 = 0, $vararg_buffer43 = 0, $vararg_buffer46 = 0;
 var $vararg_buffer51 = 0, $vararg_buffer54 = 0, $vararg_buffer58 = 0, $vararg_buffer62 = 0, $vararg_buffer68 = 0, $vararg_buffer72 = 0, $vararg_buffer76 = 0, $vararg_buffer8 = 0, $vararg_buffer80 = 0, $vararg_buffer84 = 0, $vararg_buffer87 = 0, $vararg_buffer89 = 0, $vararg_buffer92 = 0, $vararg_buffer95 = 0, $vararg_buffer99 = 0, $vararg_lifetime_bitcast = 0, $vararg_lifetime_bitcast100 = 0, $vararg_lifetime_bitcast104 = 0, $vararg_lifetime_bitcast108 = 0, $vararg_lifetime_bitcast11 = 0;
 var $vararg_lifetime_bitcast112 = 0, $vararg_lifetime_bitcast116 = 0, $vararg_lifetime_bitcast16 = 0, $vararg_lifetime_bitcast2 = 0, $vararg_lifetime_bitcast20 = 0, $vararg_lifetime_bitcast24 = 0, $vararg_lifetime_bitcast28 = 0, $vararg_lifetime_bitcast32 = 0, $vararg_lifetime_bitcast36 = 0, $vararg_lifetime_bitcast40 = 0, $vararg_lifetime_bitcast44 = 0, $vararg_lifetime_bitcast47 = 0, $vararg_lifetime_bitcast52 = 0, $vararg_lifetime_bitcast55 = 0, $vararg_lifetime_bitcast59 = 0, $vararg_lifetime_bitcast63 = 0, $vararg_lifetime_bitcast69 = 0, $vararg_lifetime_bitcast73 = 0, $vararg_lifetime_bitcast77 = 0, $vararg_lifetime_bitcast81 = 0;
 var $vararg_lifetime_bitcast85 = 0, $vararg_lifetime_bitcast88 = 0, $vararg_lifetime_bitcast9 = 0, $vararg_lifetime_bitcast90 = 0, $vararg_lifetime_bitcast93 = 0, $vararg_lifetime_bitcast96 = 0, $vararg_ptr = 0, $vararg_ptr101 = 0, $vararg_ptr102 = 0, $vararg_ptr105 = 0, $vararg_ptr106 = 0, $vararg_ptr109 = 0, $vararg_ptr110 = 0, $vararg_ptr113 = 0, $vararg_ptr114 = 0, $vararg_ptr12 = 0, $vararg_ptr13 = 0, $vararg_ptr14 = 0, $vararg_ptr17 = 0, $vararg_ptr18 = 0;
 var $vararg_ptr21 = 0, $vararg_ptr22 = 0, $vararg_ptr25 = 0, $vararg_ptr26 = 0, $vararg_ptr29 = 0, $vararg_ptr3 = 0, $vararg_ptr30 = 0, $vararg_ptr33 = 0, $vararg_ptr34 = 0, $vararg_ptr37 = 0, $vararg_ptr38 = 0, $vararg_ptr4 = 0, $vararg_ptr41 = 0, $vararg_ptr42 = 0, $vararg_ptr45 = 0, $vararg_ptr48 = 0, $vararg_ptr49 = 0, $vararg_ptr5 = 0, $vararg_ptr50 = 0, $vararg_ptr53 = 0;
 var $vararg_ptr56 = 0, $vararg_ptr57 = 0, $vararg_ptr6 = 0, $vararg_ptr60 = 0, $vararg_ptr61 = 0, $vararg_ptr64 = 0, $vararg_ptr65 = 0, $vararg_ptr66 = 0, $vararg_ptr67 = 0, $vararg_ptr7 = 0, $vararg_ptr70 = 0, $vararg_ptr71 = 0, $vararg_ptr74 = 0, $vararg_ptr75 = 0, $vararg_ptr78 = 0, $vararg_ptr79 = 0, $vararg_ptr82 = 0, $vararg_ptr83 = 0, $vararg_ptr86 = 0, $vararg_ptr91 = 0;
 var $vararg_ptr94 = 0, $vararg_ptr97 = 0, $vararg_ptr98 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 8|0;
 $vararg_buffer115 = sp;
 $vararg_lifetime_bitcast116 = $vararg_buffer115;
 $vararg_buffer111 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast112 = $vararg_buffer111;
 $vararg_buffer107 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast108 = $vararg_buffer107;
 $vararg_buffer103 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast104 = $vararg_buffer103;
 $vararg_buffer99 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast100 = $vararg_buffer99;
 $vararg_buffer95 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast96 = $vararg_buffer95;
 $vararg_buffer92 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast93 = $vararg_buffer92;
 $vararg_buffer89 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast90 = $vararg_buffer89;
 $vararg_buffer87 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast88 = $vararg_buffer87;
 $vararg_buffer84 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast85 = $vararg_buffer84;
 $vararg_buffer80 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast81 = $vararg_buffer80;
 $vararg_buffer76 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast77 = $vararg_buffer76;
 $vararg_buffer72 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast73 = $vararg_buffer72;
 $vararg_buffer68 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast69 = $vararg_buffer68;
 $vararg_buffer62 = STACKTOP; STACKTOP = STACKTOP + 24|0;
 $vararg_lifetime_bitcast63 = $vararg_buffer62;
 $vararg_buffer58 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast59 = $vararg_buffer58;
 $vararg_buffer54 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast55 = $vararg_buffer54;
 $vararg_buffer51 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast52 = $vararg_buffer51;
 $vararg_buffer46 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast47 = $vararg_buffer46;
 $vararg_buffer43 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast44 = $vararg_buffer43;
 $vararg_buffer39 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast40 = $vararg_buffer39;
 $vararg_buffer35 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast36 = $vararg_buffer35;
 $vararg_buffer31 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast32 = $vararg_buffer31;
 $vararg_buffer27 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast28 = $vararg_buffer27;
 $vararg_buffer23 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast24 = $vararg_buffer23;
 $vararg_buffer19 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast20 = $vararg_buffer19;
 $vararg_buffer15 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast16 = $vararg_buffer15;
 $vararg_buffer10 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast11 = $vararg_buffer10;
 $vararg_buffer8 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast9 = $vararg_buffer8;
 $vararg_buffer1 = STACKTOP; STACKTOP = STACKTOP + 24|0;
 $vararg_lifetime_bitcast2 = $vararg_buffer1;
 $vararg_buffer = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast = $vararg_buffer;
 $tmp = STACKTOP; STACKTOP = STACKTOP + 24|0;
 $pattern_flag = STACKTOP; STACKTOP = STACKTOP + 24|0;
 $symmetric_flag = STACKTOP; STACKTOP = STACKTOP + 24|0;
 $count_array = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $line_data_array = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $line_x_index_array = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $raw_data = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $raw_ix = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $raw_iy = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $ix = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $iy = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $double_data = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $row_start = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $row_curr = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $count = STACKTOP; STACKTOP = STACKTOP + 64|0;
 $count2 = STACKTOP; STACKTOP = STACKTOP + 64|0;
 $2 = $mgs;
 $3 = $2;
 $4 = (($3) + 52|0);
 $5 = HEAP32[$4>>2]|0;
 $preferred_alignment = $5;
 $6 = $preferred_alignment;
 $7 = (($6>>>0) / 4)&-1;
 $preferred_alignment_by_elements = $7;
 $8 = $preferred_alignment_by_elements;
 $9 = ($8>>>0)<(16);
 if ($9) {
  $preferred_alignment_by_elements = 16;
 }
 $10 = $2;
 $11 = (($10) + 48|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = (_fopen(($12|0),((8)|0))|0);
 $inputMTX = $13;
 $14 = $inputMTX;
 $15 = ($14|0)==(0|0);
 if ($15) {
  $16 = $2;
  $17 = (($16) + 48|0);
  $18 = HEAP32[$17>>2]|0;
  $vararg_ptr = ($vararg_buffer);
  HEAP32[$vararg_ptr>>2] = $18;
  (_printf(((16)|0),($vararg_buffer|0))|0);
  _exit(1);
  // unreachable;
 }
 $19 = $inputMTX;
 $20 = ($tmp);
 $21 = ($tmp);
 $22 = ($tmp);
 $23 = ($pattern_flag);
 $24 = ($symmetric_flag);
 $vararg_ptr3 = ($vararg_buffer1);
 HEAP32[$vararg_ptr3>>2] = $20;
 $vararg_ptr4 = (($vararg_buffer1) + 4|0);
 HEAP32[$vararg_ptr4>>2] = $21;
 $vararg_ptr5 = (($vararg_buffer1) + 8|0);
 HEAP32[$vararg_ptr5>>2] = $22;
 $vararg_ptr6 = (($vararg_buffer1) + 12|0);
 HEAP32[$vararg_ptr6>>2] = $23;
 $vararg_ptr7 = (($vararg_buffer1) + 16|0);
 HEAP32[$vararg_ptr7>>2] = $24;
 $25 = (_fscanf(($19|0),((48)|0),($vararg_buffer1|0))|0);
 $26 = (5)!=($25|0);
 if ($26) {
  $27 = HEAP32[(_stderr)>>2]|0;
  (_fprintf(($27|0),((80)|0),($vararg_buffer8|0))|0);
  _exit(1);
  // unreachable;
 }
 $28 = ($pattern_flag);
 $29 = (_strcmp($28,(128))|0);
 $data_present = $29;
 $30 = ($symmetric_flag);
 $31 = (_strcmp($30,(136))|0);
 $symmetric = $31;
 $32 = $inputMTX;
 $33 = $2;
 $34 = (($33) + 36|0);
 $35 = HEAP32[$34>>2]|0;
 $36 = $2;
 $37 = (($36) + 40|0);
 $38 = HEAP32[$37>>2]|0;
 $39 = $2;
 $40 = (($39) + 44|0);
 $41 = HEAP32[$40>>2]|0;
 $vararg_ptr12 = ($vararg_buffer10);
 HEAP32[$vararg_ptr12>>2] = $35;
 $vararg_ptr13 = (($vararg_buffer10) + 4|0);
 HEAP32[$vararg_ptr13>>2] = $38;
 $vararg_ptr14 = (($vararg_buffer10) + 8|0);
 HEAP32[$vararg_ptr14>>2] = $41;
 (_fscanf(($32|0),((144)|0),($vararg_buffer10|0))|0);
 $42 = $raw_ix;
 $43 = $preferred_alignment;
 $44 = $2;
 $45 = (($44) + 44|0);
 $46 = HEAP32[$45>>2]|0;
 $47 = HEAP32[$46>>2]|0;
 $48 = $47<<2;
 (_posix_memalign($42,$43,$48)|0);
 $49 = HEAP32[$raw_ix>>2]|0;
 $50 = ($49|0)==(0|0);
 if ($50) {
  $51 = $2;
  $52 = (($51) + 44|0);
  $53 = HEAP32[$52>>2]|0;
  $54 = HEAP32[$53>>2]|0;
  $55 = $54<<2;
  $vararg_ptr17 = ($vararg_buffer15);
  $56 = $vararg_ptr17;
  $57 = $56;
  HEAP32[$57>>2] = $55;
  $58 = (($56) + 4)|0;
  $59 = $58;
  HEAP32[$59>>2] = 0;
  $vararg_ptr18 = (($vararg_buffer15) + 8|0);
  HEAP32[$vararg_ptr18>>2] = (200);
  (_printf(((160)|0),($vararg_buffer15|0))|0);
  _exit(1);
  // unreachable;
 }
 $60 = $raw_iy;
 $61 = $preferred_alignment;
 $62 = $2;
 $63 = (($62) + 44|0);
 $64 = HEAP32[$63>>2]|0;
 $65 = HEAP32[$64>>2]|0;
 $66 = $65<<2;
 (_posix_memalign($60,$61,$66)|0);
 $67 = HEAP32[$raw_iy>>2]|0;
 $68 = ($67|0)==(0|0);
 if ($68) {
  $69 = $2;
  $70 = (($69) + 44|0);
  $71 = HEAP32[$70>>2]|0;
  $72 = HEAP32[$71>>2]|0;
  $73 = $72<<2;
  $vararg_ptr21 = ($vararg_buffer19);
  $74 = $vararg_ptr21;
  $75 = $74;
  HEAP32[$75>>2] = $73;
  $76 = (($74) + 4)|0;
  $77 = $76;
  HEAP32[$77>>2] = 0;
  $vararg_ptr22 = (($vararg_buffer19) + 8|0);
  HEAP32[$vararg_ptr22>>2] = (208);
  (_printf(((160)|0),($vararg_buffer19|0))|0);
  _exit(1);
  // unreachable;
 }
 $78 = $raw_data;
 $79 = $preferred_alignment;
 $80 = $2;
 $81 = (($80) + 44|0);
 $82 = HEAP32[$81>>2]|0;
 $83 = HEAP32[$82>>2]|0;
 $84 = $83<<2;
 (_posix_memalign($78,$79,$84)|0);
 $85 = HEAP32[$raw_data>>2]|0;
 $86 = ($85|0)==(0|0);
 if ($86) {
  $87 = $2;
  $88 = (($87) + 44|0);
  $89 = HEAP32[$88>>2]|0;
  $90 = HEAP32[$89>>2]|0;
  $91 = $90<<2;
  $vararg_ptr25 = ($vararg_buffer23);
  $92 = $vararg_ptr25;
  $93 = $92;
  HEAP32[$93>>2] = $91;
  $94 = (($92) + 4)|0;
  $95 = $94;
  HEAP32[$95>>2] = 0;
  $vararg_ptr26 = (($vararg_buffer23) + 8|0);
  HEAP32[$vararg_ptr26>>2] = (216);
  (_printf(((160)|0),($vararg_buffer23|0))|0);
  _exit(1);
  // unreachable;
 }
 $96 = $line_data_array;
 $97 = $preferred_alignment;
 $98 = $2;
 $99 = (($98) + 40|0);
 $100 = HEAP32[$99>>2]|0;
 $101 = HEAP32[$100>>2]|0;
 $102 = $101<<2;
 (_posix_memalign($96,$97,$102)|0);
 $103 = HEAP32[$line_data_array>>2]|0;
 $104 = ($103|0)==(0|0);
 if ($104) {
  $105 = $2;
  $106 = (($105) + 40|0);
  $107 = HEAP32[$106>>2]|0;
  $108 = HEAP32[$107>>2]|0;
  $109 = $108<<2;
  $vararg_ptr29 = ($vararg_buffer27);
  $110 = $vararg_ptr29;
  $111 = $110;
  HEAP32[$111>>2] = $109;
  $112 = (($110) + 4)|0;
  $113 = $112;
  HEAP32[$113>>2] = 0;
  $vararg_ptr30 = (($vararg_buffer27) + 8|0);
  HEAP32[$vararg_ptr30>>2] = (232);
  (_printf(((160)|0),($vararg_buffer27|0))|0);
  _exit(1);
  // unreachable;
 }
 $114 = $line_x_index_array;
 $115 = $preferred_alignment;
 $116 = $2;
 $117 = (($116) + 40|0);
 $118 = HEAP32[$117>>2]|0;
 $119 = HEAP32[$118>>2]|0;
 $120 = $119<<2;
 (_posix_memalign($114,$115,$120)|0);
 $121 = HEAP32[$line_x_index_array>>2]|0;
 $122 = ($121|0)==(0|0);
 if ($122) {
  $123 = $2;
  $124 = (($123) + 40|0);
  $125 = HEAP32[$124>>2]|0;
  $126 = HEAP32[$125>>2]|0;
  $127 = $126<<2;
  $vararg_ptr33 = ($vararg_buffer31);
  $128 = $vararg_ptr33;
  $129 = $128;
  HEAP32[$129>>2] = $127;
  $130 = (($128) + 4)|0;
  $131 = $130;
  HEAP32[$131>>2] = 0;
  $vararg_ptr34 = (($vararg_buffer31) + 8|0);
  HEAP32[$vararg_ptr34>>2] = (248);
  (_printf(((160)|0),($vararg_buffer31|0))|0);
  _exit(1);
  // unreachable;
 }
 $132 = $count_array;
 $133 = $preferred_alignment;
 $134 = $2;
 $135 = (($134) + 40|0);
 $136 = HEAP32[$135>>2]|0;
 $137 = HEAP32[$136>>2]|0;
 $138 = $137<<2;
 (_posix_memalign($132,$133,$138)|0);
 $139 = HEAP32[$count_array>>2]|0;
 $140 = ($139|0)==(0|0);
 if ($140) {
  $141 = $2;
  $142 = (($141) + 40|0);
  $143 = HEAP32[$142>>2]|0;
  $144 = HEAP32[$143>>2]|0;
  $145 = $144<<2;
  $vararg_ptr37 = ($vararg_buffer35);
  $146 = $vararg_ptr37;
  $147 = $146;
  HEAP32[$147>>2] = $145;
  $148 = (($146) + 4)|0;
  $149 = $148;
  HEAP32[$149>>2] = 0;
  $vararg_ptr38 = (($vararg_buffer35) + 8|0);
  HEAP32[$vararg_ptr38>>2] = (272);
  (_printf(((160)|0),($vararg_buffer35|0))|0);
  _exit(1);
  // unreachable;
 }
 $i = 0;
 while(1) {
  $150 = $i;
  $151 = $2;
  $152 = (($151) + 40|0);
  $153 = HEAP32[$152>>2]|0;
  $154 = HEAP32[$153>>2]|0;
  $155 = ($150>>>0)<($154>>>0);
  if (!($155)) {
   break;
  }
  $156 = $i;
  $157 = HEAP32[$count_array>>2]|0;
  $158 = (($157) + ($156<<2)|0);
  HEAP32[$158>>2] = 0;
  $159 = $i;
  $160 = (($159) + 1)|0;
  $i = $160;
 }
 $actual_non_zero = 0;
 $curry = 0;
 $explicit_zero_count = 0;
 $i = 0;
 while(1) {
  $161 = $i;
  $162 = $2;
  $163 = (($162) + 44|0);
  $164 = HEAP32[$163>>2]|0;
  $165 = HEAP32[$164>>2]|0;
  $166 = ($161>>>0)<($165>>>0);
  if (!($166)) {
   break;
  }
  $167 = $inputMTX;
  $vararg_ptr41 = ($vararg_buffer39);
  HEAP32[$vararg_ptr41>>2] = $ix;
  $vararg_ptr42 = (($vararg_buffer39) + 4|0);
  HEAP32[$vararg_ptr42>>2] = $iy;
  (_fscanf(($167|0),((288)|0),($vararg_buffer39|0))|0);
  $168 = $i;
  $169 = ($168|0)==(0);
  if ($169) {
   $170 = HEAP32[$iy>>2]|0;
   $171 = (($170) - 1)|0;
   $curry = $171;
  }
  $172 = $data_present;
  $173 = ($172|0)!=(0);
  if ($173) {
   $174 = $inputMTX;
   $vararg_ptr45 = ($vararg_buffer43);
   HEAP32[$vararg_ptr45>>2] = $double_data;
   (_fscanf(($174|0),((296)|0),($vararg_buffer43|0))|0);
   $175 = +HEAPF64[$double_data>>3];
   $176 = $175;
   $data = $176;
  } else {
   $177 = (_rand()|0);
   $178 = $177 & 32767;
   $179 = (+($178|0));
   $180 = $179 * 0.00100000004749745130539;
   $181 = $180 - 15.0;
   $data = $181;
  }
  $182 = $data_present;
  $183 = ($182|0)!=(0);
  do {
   if ($183) {
    $184 = $data;
    $185 = $184;
    $186 = $185 == 0.0;
    if (!($186)) {
     label = 34;
     break;
    }
    $187 = $explicit_zero_count;
    $188 = (($187) + 1)|0;
    $explicit_zero_count = $188;
   } else {
    label = 34;
   }
  } while(0);
  if ((label|0) == 34) {
   label = 0;
   $189 = HEAP32[$ix>>2]|0;
   $190 = (($189) + -1)|0;
   HEAP32[$ix>>2] = $190;
   $191 = HEAP32[$iy>>2]|0;
   $192 = (($191) + -1)|0;
   HEAP32[$iy>>2] = $192;
   $193 = HEAP32[$ix>>2]|0;
   $194 = $actual_non_zero;
   $195 = HEAP32[$raw_ix>>2]|0;
   $196 = (($195) + ($194<<2)|0);
   HEAP32[$196>>2] = $193;
   $197 = HEAP32[$iy>>2]|0;
   $198 = $actual_non_zero;
   $199 = HEAP32[$raw_iy>>2]|0;
   $200 = (($199) + ($198<<2)|0);
   HEAP32[$200>>2] = $197;
   $201 = $data;
   $202 = $actual_non_zero;
   $203 = HEAP32[$raw_data>>2]|0;
   $204 = (($203) + ($202<<2)|0);
   HEAPF32[$204>>2] = $201;
   $205 = $actual_non_zero;
   $206 = (($205) + 1)|0;
   $actual_non_zero = $206;
   $207 = HEAP32[$iy>>2]|0;
   $208 = HEAP32[$count_array>>2]|0;
   $209 = (($208) + ($207<<2)|0);
   $210 = HEAP32[$209>>2]|0;
   $211 = (($210) + 1)|0;
   HEAP32[$209>>2] = $211;
   $212 = $symmetric;
   $213 = ($212|0)!=(0);
   do {
    if ($213) {
     $214 = HEAP32[$ix>>2]|0;
     $215 = HEAP32[$iy>>2]|0;
     $216 = ($214|0)!=($215|0);
     if (!($216)) {
      break;
     }
     $217 = HEAP32[$ix>>2]|0;
     $218 = HEAP32[$count_array>>2]|0;
     $219 = (($218) + ($217<<2)|0);
     $220 = HEAP32[$219>>2]|0;
     $221 = (($220) + 1)|0;
     HEAP32[$219>>2] = $221;
    }
   } while(0);
   $222 = HEAP32[$iy>>2]|0;
   $223 = $curry;
   $224 = ($222|0)!=($223|0);
   if ($224) {
    $225 = HEAP32[$iy>>2]|0;
    $226 = $curry;
    $227 = (($226) + 1)|0;
    $228 = ($225|0)!=($227|0);
    if ($228) {
     $229 = $actual_non_zero;
     $230 = HEAP32[$iy>>2]|0;
     $231 = $curry;
     $vararg_ptr48 = ($vararg_buffer46);
     HEAP32[$vararg_ptr48>>2] = $229;
     $vararg_ptr49 = (($vararg_buffer46) + 4|0);
     HEAP32[$vararg_ptr49>>2] = $230;
     $vararg_ptr50 = (($vararg_buffer46) + 8|0);
     HEAP32[$vararg_ptr50>>2] = $231;
     (_printf(((304)|0),($vararg_buffer46|0))|0);
    }
    $232 = HEAP32[$iy>>2]|0;
    $curry = $232;
   }
  }
  $233 = $i;
  $234 = (($233) + 1)|0;
  $i = $234;
 }
 $235 = $explicit_zero_count;
 $236 = ($235|0)!=(0);
 if ($236) {
  $237 = $explicit_zero_count;
  $vararg_ptr53 = ($vararg_buffer51);
  HEAP32[$vararg_ptr53>>2] = $237;
  (_printf(((376)|0),($vararg_buffer51|0))|0);
 }
 $238 = $actual_non_zero;
 $239 = $2;
 $240 = (($239) + 44|0);
 $241 = HEAP32[$240>>2]|0;
 HEAP32[$241>>2] = $238;
 $i = 0;
 while(1) {
  $242 = $i;
  $243 = $2;
  $244 = (($243) + 40|0);
  $245 = HEAP32[$244>>2]|0;
  $246 = HEAP32[$245>>2]|0;
  $247 = ($242>>>0)<($246>>>0);
  if (!($247)) {
   label = 54;
   break;
  }
  $248 = $i;
  $249 = HEAP32[$line_data_array>>2]|0;
  $250 = (($249) + ($248<<2)|0);
  $251 = $250;
  $252 = $preferred_alignment;
  $253 = $i;
  $254 = HEAP32[$count_array>>2]|0;
  $255 = (($254) + ($253<<2)|0);
  $256 = HEAP32[$255>>2]|0;
  $257 = $256<<2;
  (_posix_memalign($251,$252,$257)|0);
  $258 = $i;
  $259 = HEAP32[$line_data_array>>2]|0;
  $260 = (($259) + ($258<<2)|0);
  $261 = HEAP32[$260>>2]|0;
  $262 = ($261|0)==(0|0);
  if ($262) {
   label = 49;
   break;
  }
  $272 = $i;
  $273 = HEAP32[$line_x_index_array>>2]|0;
  $274 = (($273) + ($272<<2)|0);
  $275 = $274;
  $276 = $preferred_alignment;
  $277 = $i;
  $278 = HEAP32[$count_array>>2]|0;
  $279 = (($278) + ($277<<2)|0);
  $280 = HEAP32[$279>>2]|0;
  $281 = $280<<2;
  (_posix_memalign($275,$276,$281)|0);
  $282 = $i;
  $283 = HEAP32[$line_x_index_array>>2]|0;
  $284 = (($283) + ($282<<2)|0);
  $285 = HEAP32[$284>>2]|0;
  $286 = ($285|0)==(0|0);
  if ($286) {
   label = 51;
   break;
  }
  $296 = $i;
  $297 = HEAP32[$count_array>>2]|0;
  $298 = (($297) + ($296<<2)|0);
  HEAP32[$298>>2] = 0;
  $299 = $i;
  $300 = (($299) + 1)|0;
  $i = $300;
 }
 if ((label|0) == 49) {
  $263 = $i;
  $264 = HEAP32[$count_array>>2]|0;
  $265 = (($264) + ($263<<2)|0);
  $266 = HEAP32[$265>>2]|0;
  $267 = $266<<2;
  $vararg_ptr56 = ($vararg_buffer54);
  $268 = $vararg_ptr56;
  $269 = $268;
  HEAP32[$269>>2] = $267;
  $270 = (($268) + 4)|0;
  $271 = $270;
  HEAP32[$271>>2] = 0;
  $vararg_ptr57 = (($vararg_buffer54) + 8|0);
  HEAP32[$vararg_ptr57>>2] = (408);
  (_printf(((160)|0),($vararg_buffer54|0))|0);
  _exit(1);
  // unreachable;
 }
 else if ((label|0) == 51) {
  $287 = $i;
  $288 = HEAP32[$count_array>>2]|0;
  $289 = (($288) + ($287<<2)|0);
  $290 = HEAP32[$289>>2]|0;
  $291 = $290<<2;
  $vararg_ptr60 = ($vararg_buffer58);
  $292 = $vararg_ptr60;
  $293 = $292;
  HEAP32[$293>>2] = $291;
  $294 = (($292) + 4)|0;
  $295 = $294;
  HEAP32[$295>>2] = 0;
  $vararg_ptr61 = (($vararg_buffer58) + 8|0);
  HEAP32[$vararg_ptr61>>2] = (432);
  (_printf(((160)|0),($vararg_buffer58|0))|0);
  _exit(1);
  // unreachable;
 }
 else if ((label|0) == 54) {
  $i = 0;
  while(1) {
   $301 = $i;
   $302 = $2;
   $303 = (($302) + 44|0);
   $304 = HEAP32[$303>>2]|0;
   $305 = HEAP32[$304>>2]|0;
   $306 = ($301>>>0)<($305>>>0);
   if (!($306)) {
    break;
   }
   $307 = $i;
   $308 = HEAP32[$raw_data>>2]|0;
   $309 = (($308) + ($307<<2)|0);
   $310 = +HEAPF32[$309>>2];
   $311 = $i;
   $312 = HEAP32[$raw_iy>>2]|0;
   $313 = (($312) + ($311<<2)|0);
   $314 = HEAP32[$313>>2]|0;
   $315 = HEAP32[$count_array>>2]|0;
   $316 = (($315) + ($314<<2)|0);
   $317 = HEAP32[$316>>2]|0;
   $318 = $i;
   $319 = HEAP32[$raw_iy>>2]|0;
   $320 = (($319) + ($318<<2)|0);
   $321 = HEAP32[$320>>2]|0;
   $322 = HEAP32[$line_data_array>>2]|0;
   $323 = (($322) + ($321<<2)|0);
   $324 = HEAP32[$323>>2]|0;
   $325 = (($324) + ($317<<2)|0);
   HEAPF32[$325>>2] = $310;
   $326 = $i;
   $327 = HEAP32[$raw_ix>>2]|0;
   $328 = (($327) + ($326<<2)|0);
   $329 = HEAP32[$328>>2]|0;
   $330 = $i;
   $331 = HEAP32[$raw_iy>>2]|0;
   $332 = (($331) + ($330<<2)|0);
   $333 = HEAP32[$332>>2]|0;
   $334 = HEAP32[$count_array>>2]|0;
   $335 = (($334) + ($333<<2)|0);
   $336 = HEAP32[$335>>2]|0;
   $337 = $i;
   $338 = HEAP32[$raw_iy>>2]|0;
   $339 = (($338) + ($337<<2)|0);
   $340 = HEAP32[$339>>2]|0;
   $341 = HEAP32[$line_x_index_array>>2]|0;
   $342 = (($341) + ($340<<2)|0);
   $343 = HEAP32[$342>>2]|0;
   $344 = (($343) + ($336<<2)|0);
   HEAP32[$344>>2] = $329;
   $345 = $i;
   $346 = HEAP32[$raw_iy>>2]|0;
   $347 = (($346) + ($345<<2)|0);
   $348 = HEAP32[$347>>2]|0;
   $349 = HEAP32[$count_array>>2]|0;
   $350 = (($349) + ($348<<2)|0);
   $351 = HEAP32[$350>>2]|0;
   $352 = (($351) + 1)|0;
   HEAP32[$350>>2] = $352;
   $353 = $symmetric;
   $354 = ($353|0)!=(0);
   do {
    if ($354) {
     $355 = $i;
     $356 = HEAP32[$raw_ix>>2]|0;
     $357 = (($356) + ($355<<2)|0);
     $358 = HEAP32[$357>>2]|0;
     $359 = $i;
     $360 = HEAP32[$raw_iy>>2]|0;
     $361 = (($360) + ($359<<2)|0);
     $362 = HEAP32[$361>>2]|0;
     $363 = ($358|0)!=($362|0);
     if (!($363)) {
      break;
     }
     $364 = $i;
     $365 = HEAP32[$raw_data>>2]|0;
     $366 = (($365) + ($364<<2)|0);
     $367 = +HEAPF32[$366>>2];
     $368 = $i;
     $369 = HEAP32[$raw_ix>>2]|0;
     $370 = (($369) + ($368<<2)|0);
     $371 = HEAP32[$370>>2]|0;
     $372 = HEAP32[$count_array>>2]|0;
     $373 = (($372) + ($371<<2)|0);
     $374 = HEAP32[$373>>2]|0;
     $375 = $i;
     $376 = HEAP32[$raw_ix>>2]|0;
     $377 = (($376) + ($375<<2)|0);
     $378 = HEAP32[$377>>2]|0;
     $379 = HEAP32[$line_data_array>>2]|0;
     $380 = (($379) + ($378<<2)|0);
     $381 = HEAP32[$380>>2]|0;
     $382 = (($381) + ($374<<2)|0);
     HEAPF32[$382>>2] = $367;
     $383 = $i;
     $384 = HEAP32[$raw_iy>>2]|0;
     $385 = (($384) + ($383<<2)|0);
     $386 = HEAP32[$385>>2]|0;
     $387 = $i;
     $388 = HEAP32[$raw_ix>>2]|0;
     $389 = (($388) + ($387<<2)|0);
     $390 = HEAP32[$389>>2]|0;
     $391 = HEAP32[$count_array>>2]|0;
     $392 = (($391) + ($390<<2)|0);
     $393 = HEAP32[$392>>2]|0;
     $394 = $i;
     $395 = HEAP32[$raw_ix>>2]|0;
     $396 = (($395) + ($394<<2)|0);
     $397 = HEAP32[$396>>2]|0;
     $398 = HEAP32[$line_x_index_array>>2]|0;
     $399 = (($398) + ($397<<2)|0);
     $400 = HEAP32[$399>>2]|0;
     $401 = (($400) + ($393<<2)|0);
     HEAP32[$401>>2] = $386;
     $402 = $i;
     $403 = HEAP32[$raw_ix>>2]|0;
     $404 = (($403) + ($402<<2)|0);
     $405 = HEAP32[$404>>2]|0;
     $406 = HEAP32[$count_array>>2]|0;
     $407 = (($406) + ($405<<2)|0);
     $408 = HEAP32[$407>>2]|0;
     $409 = (($408) + 1)|0;
     HEAP32[$407>>2] = $409;
    }
   } while(0);
   $410 = $i;
   $411 = (($410) + 1)|0;
   $i = $411;
  }
  $412 = $2;
  $413 = (($412) + 44|0);
  $414 = HEAP32[$413>>2]|0;
  HEAP32[$414>>2] = 0;
  $i = 0;
  while(1) {
   $415 = $i;
   $416 = $2;
   $417 = (($416) + 40|0);
   $418 = HEAP32[$417>>2]|0;
   $419 = HEAP32[$418>>2]|0;
   $420 = ($415>>>0)<($419>>>0);
   if (!($420)) {
    break;
   }
   $421 = $i;
   $422 = HEAP32[$count_array>>2]|0;
   $423 = (($422) + ($421<<2)|0);
   $424 = HEAP32[$423>>2]|0;
   $425 = $2;
   $426 = (($425) + 44|0);
   $427 = HEAP32[$426>>2]|0;
   $428 = HEAP32[$427>>2]|0;
   $429 = (($428) + ($424))|0;
   HEAP32[$427>>2] = $429;
   $430 = $i;
   $431 = (($430) + 1)|0;
   $i = $431;
  }
  $432 = $2;
  $433 = (($432) + 44|0);
  $434 = HEAP32[$433>>2]|0;
  $435 = HEAP32[$434>>2]|0;
  $436 = (+($435>>>0));
  $437 = $2;
  $438 = (($437) + 36|0);
  $439 = HEAP32[$438>>2]|0;
  $440 = HEAP32[$439>>2]|0;
  $441 = (+($440>>>0));
  $442 = $2;
  $443 = (($442) + 40|0);
  $444 = HEAP32[$443>>2]|0;
  $445 = HEAP32[$444>>2]|0;
  $446 = (+($445>>>0));
  $447 = $441 * $446;
  $448 = $436 / $447;
  $density = $448;
  $449 = $2;
  $450 = (($449) + 36|0);
  $451 = HEAP32[$450>>2]|0;
  $452 = HEAP32[$451>>2]|0;
  $453 = $2;
  $454 = (($453) + 40|0);
  $455 = HEAP32[$454>>2]|0;
  $456 = HEAP32[$455>>2]|0;
  $457 = $2;
  $458 = (($457) + 44|0);
  $459 = HEAP32[$458>>2]|0;
  $460 = HEAP32[$459>>2]|0;
  $461 = $density;
  $vararg_ptr64 = ($vararg_buffer62);
  HEAP32[$vararg_ptr64>>2] = $452;
  $vararg_ptr65 = (($vararg_buffer62) + 4|0);
  HEAP32[$vararg_ptr65>>2] = $456;
  $vararg_ptr66 = (($vararg_buffer62) + 8|0);
  HEAP32[$vararg_ptr66>>2] = $460;
  $vararg_ptr67 = (($vararg_buffer62) + 12|0);
  HEAPF64[tempDoublePtr>>3]=$461;HEAP32[$vararg_ptr67>>2]=HEAP32[tempDoublePtr>>2];HEAP32[$vararg_ptr67+4>>2]=HEAP32[tempDoublePtr+4>>2];
  (_printf(((456)|0),($vararg_buffer62|0))|0);
  $462 = $2;
  $463 = (($462) + 40|0);
  $464 = HEAP32[$463>>2]|0;
  $465 = HEAP32[$464>>2]|0;
  $466 = $preferred_alignment_by_elements;
  $467 = (($466) - 1)|0;
  $468 = (($465) + ($467))|0;
  $469 = $preferred_alignment_by_elements;
  $470 = (($469) - 1)|0;
  $471 = $470 ^ -1;
  $472 = $468 & $471;
  $473 = $2;
  $474 = (($473) + 28|0);
  $475 = HEAP32[$474>>2]|0;
  HEAP32[$475>>2] = $472;
  $476 = $2;
  $477 = (($476) + 28|0);
  $478 = HEAP32[$477>>2]|0;
  $479 = HEAP32[$478>>2]|0;
  $480 = $preferred_alignment_by_elements;
  $481 = ($479>>>0)<($480>>>0);
  if ($481) {
   $482 = $preferred_alignment_by_elements;
   $483 = $2;
   $484 = (($483) + 28|0);
   $485 = HEAP32[$484>>2]|0;
   HEAP32[$485>>2] = $482;
  }
  $486 = $2;
  $487 = (($486) + 28|0);
  $488 = HEAP32[$487>>2]|0;
  $489 = HEAP32[$488>>2]|0;
  $490 = $preferred_alignment_by_elements;
  $491 = (($489) + ($490))|0;
  $492 = (($491) - 1)|0;
  $493 = $preferred_alignment_by_elements;
  $494 = (($492>>>0) / ($493>>>0))&-1;
  $min_compute_units = $494;
  $495 = $2;
  $496 = (($495) + 56|0);
  $497 = HEAP32[$496>>2]|0;
  $498 = HEAP32[$497>>2]|0;
  $499 = $min_compute_units;
  $500 = ($498>>>0)>($499>>>0);
  if ($500) {
   $501 = $min_compute_units;
   $502 = $2;
   $503 = (($502) + 56|0);
   $504 = HEAP32[$503>>2]|0;
   HEAP32[$504>>2] = $501;
  }
  $505 = HEAP32[$raw_ix>>2]|0;
  $506 = $505;
  _free($506);
  $507 = HEAP32[$raw_iy>>2]|0;
  $508 = $507;
  _free($508);
  $509 = HEAP32[$raw_data>>2]|0;
  $510 = $509;
  _free($510);
  $511 = $2;
  $512 = (($511) + 20|0);
  $513 = HEAP32[$512>>2]|0;
  $514 = $513;
  $515 = $preferred_alignment;
  $516 = $2;
  $517 = (($516) + 44|0);
  $518 = HEAP32[$517>>2]|0;
  $519 = HEAP32[$518>>2]|0;
  $520 = $519<<2;
  (_posix_memalign($514,$515,$520)|0);
  $521 = $2;
  $522 = (($521) + 20|0);
  $523 = HEAP32[$522>>2]|0;
  $524 = HEAP32[$523>>2]|0;
  $525 = ($524|0)==(0|0);
  if ($525) {
   $526 = $2;
   $527 = (($526) + 44|0);
   $528 = HEAP32[$527>>2]|0;
   $529 = HEAP32[$528>>2]|0;
   $530 = $529<<2;
   $vararg_ptr70 = ($vararg_buffer68);
   $531 = $vararg_ptr70;
   $532 = $531;
   HEAP32[$532>>2] = $530;
   $533 = (($531) + 4)|0;
   $534 = $533;
   HEAP32[$534>>2] = 0;
   $vararg_ptr71 = (($vararg_buffer68) + 8|0);
   HEAP32[$vararg_ptr71>>2] = (504);
   (_printf(((160)|0),($vararg_buffer68|0))|0);
   _exit(1);
   // unreachable;
  }
  $535 = $2;
  $536 = (($535) + 16|0);
  $537 = HEAP32[$536>>2]|0;
  $538 = $537;
  $539 = $preferred_alignment;
  $540 = $2;
  $541 = (($540) + 44|0);
  $542 = HEAP32[$541>>2]|0;
  $543 = HEAP32[$542>>2]|0;
  $544 = (($543) + 1)|0;
  $545 = $544<<2;
  (_posix_memalign($538,$539,$545)|0);
  $546 = $2;
  $547 = (($546) + 16|0);
  $548 = HEAP32[$547>>2]|0;
  $549 = HEAP32[$548>>2]|0;
  $550 = ($549|0)==(0|0);
  if ($550) {
   $551 = $2;
   $552 = (($551) + 44|0);
   $553 = HEAP32[$552>>2]|0;
   $554 = HEAP32[$553>>2]|0;
   $555 = (($554) + 1)|0;
   $556 = $555<<2;
   $vararg_ptr74 = ($vararg_buffer72);
   $557 = $vararg_ptr74;
   $558 = $557;
   HEAP32[$558>>2] = $556;
   $559 = (($557) + 4)|0;
   $560 = $559;
   HEAP32[$560>>2] = 0;
   $vararg_ptr75 = (($vararg_buffer72) + 8|0);
   HEAP32[$vararg_ptr75>>2] = (520);
   (_printf(((160)|0),($vararg_buffer72|0))|0);
   _exit(1);
   // unreachable;
  }
  $561 = $2;
  $562 = (($561) + 12|0);
  $563 = HEAP32[$562>>2]|0;
  $564 = $563;
  $565 = $preferred_alignment;
  $566 = $2;
  $567 = (($566) + 28|0);
  $568 = HEAP32[$567>>2]|0;
  $569 = HEAP32[$568>>2]|0;
  $570 = (($569) + 1)|0;
  $571 = $570<<2;
  (_posix_memalign($564,$565,$571)|0);
  $572 = $2;
  $573 = (($572) + 12|0);
  $574 = HEAP32[$573>>2]|0;
  $575 = HEAP32[$574>>2]|0;
  $576 = ($575|0)==(0|0);
  if ($576) {
   $577 = $2;
   $578 = (($577) + 28|0);
   $579 = HEAP32[$578>>2]|0;
   $580 = HEAP32[$579>>2]|0;
   $581 = (($580) + 1)|0;
   $582 = $581<<2;
   $vararg_ptr78 = ($vararg_buffer76);
   $583 = $vararg_ptr78;
   $584 = $583;
   HEAP32[$584>>2] = $582;
   $585 = (($583) + 4)|0;
   $586 = $585;
   HEAP32[$586>>2] = 0;
   $vararg_ptr79 = (($vararg_buffer76) + 8|0);
   HEAP32[$vararg_ptr79>>2] = (536);
   (_printf(((160)|0),($vararg_buffer76|0))|0);
   _exit(1);
   // unreachable;
  }
  $index = 0;
  $i = 0;
  while(1) {
   $587 = $i;
   $588 = $2;
   $589 = (($588) + 40|0);
   $590 = HEAP32[$589>>2]|0;
   $591 = HEAP32[$590>>2]|0;
   $592 = ($587>>>0)<($591>>>0);
   if (!($592)) {
    break;
   }
   $593 = $index;
   $594 = $i;
   $595 = $2;
   $596 = (($595) + 12|0);
   $597 = HEAP32[$596>>2]|0;
   $598 = HEAP32[$597>>2]|0;
   $599 = (($598) + ($594<<2)|0);
   HEAP32[$599>>2] = $593;
   $j = 0;
   while(1) {
    $600 = $j;
    $601 = $i;
    $602 = HEAP32[$count_array>>2]|0;
    $603 = (($602) + ($601<<2)|0);
    $604 = HEAP32[$603>>2]|0;
    $605 = ($600>>>0)<($604>>>0);
    if (!($605)) {
     break;
    }
    $606 = $j;
    $607 = $i;
    $608 = HEAP32[$line_data_array>>2]|0;
    $609 = (($608) + ($607<<2)|0);
    $610 = HEAP32[$609>>2]|0;
    $611 = (($610) + ($606<<2)|0);
    $612 = +HEAPF32[$611>>2];
    $613 = $index;
    $614 = $2;
    $615 = (($614) + 20|0);
    $616 = HEAP32[$615>>2]|0;
    $617 = HEAP32[$616>>2]|0;
    $618 = (($617) + ($613<<2)|0);
    HEAPF32[$618>>2] = $612;
    $619 = $j;
    $620 = $i;
    $621 = HEAP32[$line_x_index_array>>2]|0;
    $622 = (($621) + ($620<<2)|0);
    $623 = HEAP32[$622>>2]|0;
    $624 = (($623) + ($619<<2)|0);
    $625 = HEAP32[$624>>2]|0;
    $626 = $index;
    $627 = $2;
    $628 = (($627) + 16|0);
    $629 = HEAP32[$628>>2]|0;
    $630 = HEAP32[$629>>2]|0;
    $631 = (($630) + ($626<<2)|0);
    HEAP32[$631>>2] = $625;
    $632 = $index;
    $633 = (($632) + 1)|0;
    $index = $633;
    $634 = $j;
    $635 = (($634) + 1)|0;
    $j = $635;
   }
   $636 = $i;
   $637 = (($636) + 1)|0;
   $i = $637;
  }
  $638 = $2;
  $639 = (($638) + 40|0);
  $640 = HEAP32[$639>>2]|0;
  $641 = HEAP32[$640>>2]|0;
  $i = $641;
  while(1) {
   $642 = $i;
   $643 = $2;
   $644 = (($643) + 28|0);
   $645 = HEAP32[$644>>2]|0;
   $646 = HEAP32[$645>>2]|0;
   $647 = ($642>>>0)<=($646>>>0);
   if (!($647)) {
    break;
   }
   $648 = $2;
   $649 = (($648) + 44|0);
   $650 = HEAP32[$649>>2]|0;
   $651 = HEAP32[$650>>2]|0;
   $652 = $i;
   $653 = $2;
   $654 = (($653) + 12|0);
   $655 = HEAP32[$654>>2]|0;
   $656 = HEAP32[$655>>2]|0;
   $657 = (($656) + ($652<<2)|0);
   HEAP32[$657>>2] = $651;
   $658 = $i;
   $659 = (($658) + 1)|0;
   $i = $659;
  }
  $i = 0;
  while(1) {
   $660 = $i;
   $661 = $2;
   $662 = (($661) + 40|0);
   $663 = HEAP32[$662>>2]|0;
   $664 = HEAP32[$663>>2]|0;
   $665 = ($660>>>0)<($664>>>0);
   if (!($665)) {
    break;
   }
   $666 = $i;
   $667 = HEAP32[$count_array>>2]|0;
   $668 = (($667) + ($666<<2)|0);
   $669 = HEAP32[$668>>2]|0;
   $670 = ($669|0)!=(0);
   if ($670) {
    $671 = $i;
    $672 = HEAP32[$line_data_array>>2]|0;
    $673 = (($672) + ($671<<2)|0);
    $674 = HEAP32[$673>>2]|0;
    $675 = $674;
    _free($675);
    $676 = $i;
    $677 = HEAP32[$line_x_index_array>>2]|0;
    $678 = (($677) + ($676<<2)|0);
    $679 = HEAP32[$678>>2]|0;
    $680 = $679;
    _free($680);
   }
   $681 = $i;
   $682 = (($681) + 1)|0;
   $i = $682;
  }
  $683 = HEAP32[$line_data_array>>2]|0;
  $684 = $683;
  _free($684);
  $685 = HEAP32[$line_x_index_array>>2]|0;
  $686 = $685;
  _free($686);
  $687 = HEAP32[$count_array>>2]|0;
  $688 = $687;
  _free($688);
  $689 = $2;
  $690 = (($689) + 60|0);
  $691 = HEAP32[$690>>2]|0;
  $692 = ($691|0)==(2);
  if ($692) {
   $693 = $2;
   $694 = (($693) + 68|0);
   $695 = HEAP32[$694>>2]|0;
   $696 = (($695>>>0) / 64)&-1;
   $697 = $2;
   $698 = (($697) + 64|0);
   $699 = HEAP32[$698>>2]|0;
   HEAP32[$699>>2] = $696;
  }
  $700 = $2;
  $701 = (($700) + 60|0);
  $702 = HEAP32[$701>>2]|0;
  $703 = ($702|0)==(1);
  if ($703) {
   $704 = $2;
   $705 = (($704) + 64|0);
   $706 = HEAP32[$705>>2]|0;
   HEAP32[$706>>2] = 65536;
  }
  $707 = $2;
  $708 = (($707) + 64|0);
  $709 = HEAP32[$708>>2]|0;
  $710 = HEAP32[$709>>2]|0;
  $711 = $2;
  $712 = (($711) + 36|0);
  $713 = HEAP32[$712>>2]|0;
  $714 = HEAP32[$713>>2]|0;
  $715 = ($710>>>0)>($714>>>0);
  if ($715) {
   $716 = $2;
   $717 = (($716) + 36|0);
   $718 = HEAP32[$717>>2]|0;
   $719 = HEAP32[$718>>2]|0;
   $720 = $2;
   $721 = (($720) + 64|0);
   $722 = HEAP32[$721>>2]|0;
   HEAP32[$722>>2] = $719;
  }
  $723 = $2;
  $724 = (($723) + 64|0);
  $725 = HEAP32[$724>>2]|0;
  $726 = HEAP32[$725>>2]|0;
  $727 = ($726>>>0)>(65536);
  if ($727) {
   $728 = $2;
   $729 = (($728) + 64|0);
   $730 = HEAP32[$729>>2]|0;
   HEAP32[$730>>2] = 65536;
  }
  while(1) {
   $731 = $2;
   $732 = (($731) + 64|0);
   $733 = HEAP32[$732>>2]|0;
   $734 = HEAP32[$733>>2]|0;
   $735 = $2;
   $736 = (($735) + 64|0);
   $737 = HEAP32[$736>>2]|0;
   $738 = HEAP32[$737>>2]|0;
   $739 = (($738) - 1)|0;
   $740 = $734 & $739;
   $741 = ($740|0)!=(0);
   if (!($741)) {
    break;
   }
   $742 = $2;
   $743 = (($742) + 64|0);
   $744 = HEAP32[$743>>2]|0;
   $745 = HEAP32[$744>>2]|0;
   $746 = (($745) + 1)|0;
   HEAP32[$744>>2] = $746;
  }
  $747 = $2;
  $748 = (($747) + 36|0);
  $749 = HEAP32[$748>>2]|0;
  $750 = HEAP32[$749>>2]|0;
  $751 = $2;
  $752 = (($751) + 64|0);
  $753 = HEAP32[$752>>2]|0;
  $754 = HEAP32[$753>>2]|0;
  $755 = (($754) - 1)|0;
  $756 = (($750) + ($755))|0;
  $757 = $2;
  $758 = (($757) + 64|0);
  $759 = HEAP32[$758>>2]|0;
  $760 = HEAP32[$759>>2]|0;
  $761 = (($760) - 1)|0;
  $762 = $761 ^ -1;
  $763 = $756 & $762;
  $764 = $2;
  $765 = (($764) + 24|0);
  $766 = HEAP32[$765>>2]|0;
  HEAP32[$766>>2] = $763;
  $767 = $2;
  $768 = (($767) + 56|0);
  $769 = HEAP32[$768>>2]|0;
  $770 = HEAP32[$769>>2]|0;
  $nslabs_base = $770;
  $nslabs = 0;
  $771 = $2;
  $772 = (($771) + 60|0);
  $773 = HEAP32[$772>>2]|0;
  $774 = ($773|0)==(2);
  if ($774) {
   $775 = $2;
   $776 = (($775) + 68|0);
   $777 = HEAP32[$776>>2]|0;
   $778 = (($777>>>0) / 4)&-1;
   $779 = ($778*7)|0;
   $780 = (($779>>>0) / 16)&-1;
   $781 = (($780) - 1)|0;
   $slab_threshhold = $781;
   $782 = $preferred_alignment_by_elements;
   $783 = (($782) - 1)|0;
   $784 = $783 ^ -1;
   $785 = $slab_threshhold;
   $786 = $785 & $784;
   $slab_threshhold = $786;
   $787 = $2;
   $788 = (($787) + 28|0);
   $789 = HEAP32[$788>>2]|0;
   $790 = HEAP32[$789>>2]|0;
   $791 = $slab_threshhold;
   $792 = (($790>>>0) / ($791>>>0))&-1;
   $expected_nslabs = $792;
   $793 = $expected_nslabs;
   $794 = $nslabs_base;
   $795 = ($793>>>0)<($794>>>0);
   if ($795) {
    $796 = $nslabs_base;
    $expected_nslabs = $796;
   }
   $797 = $2;
   $798 = (($797) + 44|0);
   $799 = HEAP32[$798>>2]|0;
   $800 = HEAP32[$799>>2]|0;
   $801 = $expected_nslabs;
   $802 = (($800>>>0) / ($801>>>0))&-1;
   $target_workpacket = $802;
   $803 = $2;
   $804 = (($803) + 68|0);
   $805 = HEAP32[$804>>2]|0;
   $806 = (($805>>>0) / 8192)&-1;
   $807 = $2;
   $808 = (($807) + 72|0);
   $809 = HEAP32[$808>>2]|0;
   HEAP32[$809>>2] = $806;
   while(1) {
    $810 = $2;
    $811 = (($810) + 72|0);
    $812 = HEAP32[$811>>2]|0;
    $813 = HEAP32[$812>>2]|0;
    $814 = $2;
    $815 = (($814) + 72|0);
    $816 = HEAP32[$815>>2]|0;
    $817 = HEAP32[$816>>2]|0;
    $818 = (($817) - 1)|0;
    $819 = $813 & $818;
    $820 = ($819|0)!=(0);
    if (!($820)) {
     break;
    }
    $821 = $2;
    $822 = (($821) + 72|0);
    $823 = HEAP32[$822>>2]|0;
    $824 = HEAP32[$823>>2]|0;
    $825 = (($824) + 1)|0;
    HEAP32[$823>>2] = $825;
   }
   $candidate_row = 0;
   $826 = $target_workpacket;
   $target_value = $826;
   $slabsize = 0;
   while(1) {
    $827 = $candidate_row;
    $828 = $2;
    $829 = (($828) + 28|0);
    $830 = HEAP32[$829>>2]|0;
    $831 = HEAP32[$830>>2]|0;
    $832 = ($827>>>0)<($831>>>0);
    if (!($832)) {
     break;
    }
    while(1) {
     $833 = $candidate_row;
     $834 = $2;
     $835 = (($834) + 12|0);
     $836 = HEAP32[$835>>2]|0;
     $837 = HEAP32[$836>>2]|0;
     $838 = (($837) + ($833<<2)|0);
     $839 = HEAP32[$838>>2]|0;
     $840 = $target_value;
     $841 = ($839>>>0)<($840>>>0);
     do {
      if ($841) {
       $842 = $slabsize;
       $843 = $preferred_alignment_by_elements;
       $844 = (($842) + ($843))|0;
       $845 = $slab_threshhold;
       $846 = ($844>>>0)<($845>>>0);
       if (!($846)) {
        $853 = 0;
        break;
       }
       $847 = $candidate_row;
       $848 = $2;
       $849 = (($848) + 28|0);
       $850 = HEAP32[$849>>2]|0;
       $851 = HEAP32[$850>>2]|0;
       $852 = ($847>>>0)<($851>>>0);
       $853 = $852;
      } else {
       $853 = 0;
      }
     } while(0);
     if (!($853)) {
      break;
     }
     $854 = $preferred_alignment_by_elements;
     $855 = $candidate_row;
     $856 = (($855) + ($854))|0;
     $candidate_row = $856;
     $857 = $preferred_alignment_by_elements;
     $858 = $slabsize;
     $859 = (($858) + ($857))|0;
     $slabsize = $859;
    }
    $860 = $nslabs;
    $861 = (($860) + 1)|0;
    $nslabs = $861;
    $slabsize = 0;
    $862 = $candidate_row;
    $863 = $2;
    $864 = (($863) + 12|0);
    $865 = HEAP32[$864>>2]|0;
    $866 = HEAP32[$865>>2]|0;
    $867 = (($866) + ($862<<2)|0);
    $868 = HEAP32[$867>>2]|0;
    $869 = $target_workpacket;
    $870 = (($868) + ($869))|0;
    $target_value = $870;
   }
   $871 = $2;
   $872 = (($871) + 32|0);
   $873 = HEAP32[$872>>2]|0;
   $874 = $873;
   $875 = $preferred_alignment;
   $876 = $nslabs;
   $877 = (($876) + 1)|0;
   $878 = $877<<2;
   (_posix_memalign($874,$875,$878)|0);
   $879 = $2;
   $880 = (($879) + 32|0);
   $881 = HEAP32[$880>>2]|0;
   $882 = HEAP32[$881>>2]|0;
   $883 = ($882|0)==(0|0);
   if ($883) {
    $884 = $nslabs;
    $885 = (($884) + 1)|0;
    $886 = $885<<2;
    $vararg_ptr82 = ($vararg_buffer80);
    $887 = $vararg_ptr82;
    $888 = $887;
    HEAP32[$888>>2] = $886;
    $889 = (($887) + 4)|0;
    $890 = $889;
    HEAP32[$890>>2] = 0;
    $vararg_ptr83 = (($vararg_buffer80) + 8|0);
    HEAP32[$vararg_ptr83>>2] = (552);
    (_printf(((160)|0),($vararg_buffer80|0))|0);
    _exit(1);
    // unreachable;
   }
   $891 = $2;
   $892 = (($891) + 32|0);
   $893 = HEAP32[$892>>2]|0;
   $894 = HEAP32[$893>>2]|0;
   $895 = ($894);
   HEAP32[$895>>2] = 0;
   $896 = $2;
   $897 = (($896) + 28|0);
   $898 = HEAP32[$897>>2]|0;
   $899 = HEAP32[$898>>2]|0;
   $900 = $nslabs;
   $901 = $2;
   $902 = (($901) + 32|0);
   $903 = HEAP32[$902>>2]|0;
   $904 = HEAP32[$903>>2]|0;
   $905 = (($904) + ($900<<2)|0);
   HEAP32[$905>>2] = $899;
   $candidate_row = 0;
   $906 = $target_workpacket;
   $target_value = $906;
   $slabsize = 0;
   $nslabs = 0;
   while(1) {
    $907 = $candidate_row;
    $908 = $2;
    $909 = (($908) + 28|0);
    $910 = HEAP32[$909>>2]|0;
    $911 = HEAP32[$910>>2]|0;
    $912 = ($907>>>0)<($911>>>0);
    if (!($912)) {
     break;
    }
    while(1) {
     $913 = $candidate_row;
     $914 = $2;
     $915 = (($914) + 12|0);
     $916 = HEAP32[$915>>2]|0;
     $917 = HEAP32[$916>>2]|0;
     $918 = (($917) + ($913<<2)|0);
     $919 = HEAP32[$918>>2]|0;
     $920 = $target_value;
     $921 = ($919>>>0)<($920>>>0);
     do {
      if ($921) {
       $922 = $slabsize;
       $923 = $slab_threshhold;
       $924 = ($922>>>0)<($923>>>0);
       if (!($924)) {
        $931 = 0;
        break;
       }
       $925 = $candidate_row;
       $926 = $2;
       $927 = (($926) + 28|0);
       $928 = HEAP32[$927>>2]|0;
       $929 = HEAP32[$928>>2]|0;
       $930 = ($925>>>0)<($929>>>0);
       $931 = $930;
      } else {
       $931 = 0;
      }
     } while(0);
     if (!($931)) {
      break;
     }
     $932 = $preferred_alignment_by_elements;
     $933 = $candidate_row;
     $934 = (($933) + ($932))|0;
     $candidate_row = $934;
     $935 = $preferred_alignment_by_elements;
     $936 = $slabsize;
     $937 = (($936) + ($935))|0;
     $slabsize = $937;
    }
    $938 = $nslabs;
    $939 = (($938) + 1)|0;
    $nslabs = $939;
    $slabsize = 0;
    $940 = $candidate_row;
    $941 = $nslabs;
    $942 = $2;
    $943 = (($942) + 32|0);
    $944 = HEAP32[$943>>2]|0;
    $945 = HEAP32[$944>>2]|0;
    $946 = (($945) + ($941<<2)|0);
    HEAP32[$946>>2] = $940;
    $947 = $candidate_row;
    $948 = $2;
    $949 = (($948) + 12|0);
    $950 = HEAP32[$949>>2]|0;
    $951 = HEAP32[$950>>2]|0;
    $952 = (($951) + ($947<<2)|0);
    $953 = HEAP32[$952>>2]|0;
    $954 = $target_workpacket;
    $955 = (($953) + ($954))|0;
    $target_value = $955;
   }
   $956 = $2;
   $957 = (($956) + 76|0);
   $958 = HEAP32[$957>>2]|0;
   HEAP32[$958>>2] = 0;
   $i = 0;
   while(1) {
    $959 = $i;
    $960 = $nslabs;
    $961 = ($959>>>0)<($960>>>0);
    if (!($961)) {
     break;
    }
    $962 = $i;
    $963 = (($962) + 1)|0;
    $964 = $2;
    $965 = (($964) + 32|0);
    $966 = HEAP32[$965>>2]|0;
    $967 = HEAP32[$966>>2]|0;
    $968 = (($967) + ($963<<2)|0);
    $969 = HEAP32[$968>>2]|0;
    $970 = $i;
    $971 = $2;
    $972 = (($971) + 32|0);
    $973 = HEAP32[$972>>2]|0;
    $974 = HEAP32[$973>>2]|0;
    $975 = (($974) + ($970<<2)|0);
    $976 = HEAP32[$975>>2]|0;
    $977 = (($969) - ($976))|0;
    $978 = $2;
    $979 = (($978) + 76|0);
    $980 = HEAP32[$979>>2]|0;
    $981 = HEAP32[$980>>2]|0;
    $982 = ($977>>>0)>($981>>>0);
    if ($982) {
     $983 = $i;
     $984 = (($983) + 1)|0;
     $985 = $2;
     $986 = (($985) + 32|0);
     $987 = HEAP32[$986>>2]|0;
     $988 = HEAP32[$987>>2]|0;
     $989 = (($988) + ($984<<2)|0);
     $990 = HEAP32[$989>>2]|0;
     $991 = $i;
     $992 = $2;
     $993 = (($992) + 32|0);
     $994 = HEAP32[$993>>2]|0;
     $995 = HEAP32[$994>>2]|0;
     $996 = (($995) + ($991<<2)|0);
     $997 = HEAP32[$996>>2]|0;
     $998 = (($990) - ($997))|0;
     $999 = $2;
     $1000 = (($999) + 76|0);
     $1001 = HEAP32[$1000>>2]|0;
     HEAP32[$1001>>2] = $998;
    }
    $1002 = $i;
    $1003 = (($1002) + 1)|0;
    $i = $1003;
   }
  } else {
   $1004 = $2;
   $1005 = (($1004) + 80|0);
   $1006 = $1005;
   $1007 = $1006;
   $1008 = HEAP32[$1007>>2]|0;
   $1009 = (($1006) + 4)|0;
   $1010 = $1009;
   $1011 = HEAP32[$1010>>2]|0;
   $1012 = ($1008|0)==(4);
   $1013 = ($1011|0)==(0);
   $1014 = $1012 & $1013;
   if ($1014) {
    $1015 = $2;
    $1016 = (($1015) + 88|0);
    $1017 = HEAP32[$1016>>2]|0;
    $1018 = HEAP32[$1017>>2]|0;
    $1019 = ($1018|0)>(1024);
    if ($1019) {
     $vararg_ptr86 = ($vararg_buffer84);
     HEAP32[$vararg_ptr86>>2] = 1024;
     (_printf(((568)|0),($vararg_buffer84|0))|0);
     $1020 = $2;
     $1021 = (($1020) + 88|0);
     $1022 = HEAP32[$1021>>2]|0;
     HEAP32[$1022>>2] = 1024;
    }
    $1023 = $2;
    $1024 = (($1023) + 88|0);
    $1025 = HEAP32[$1024>>2]|0;
    $1026 = HEAP32[$1025>>2]|0;
    $1027 = ($1026|0)<(16);
    if ($1027) {
     (_printf(((640)|0),($vararg_buffer87|0))|0);
     $1028 = $2;
     $1029 = (($1028) + 88|0);
     $1030 = HEAP32[$1029>>2]|0;
     HEAP32[$1030>>2] = 16;
    }
    $1031 = $2;
    $1032 = (($1031) + 88|0);
    $1033 = HEAP32[$1032>>2]|0;
    $1034 = HEAP32[$1033>>2]|0;
    $1035 = $2;
    $1036 = (($1035) + 88|0);
    $1037 = HEAP32[$1036>>2]|0;
    $1038 = HEAP32[$1037>>2]|0;
    $1039 = (($1038) - 1)|0;
    $1040 = $1034 & $1039;
    $1041 = ($1040|0)!=(0);
    if ($1041) {
     while(1) {
      $1042 = $2;
      $1043 = (($1042) + 88|0);
      $1044 = HEAP32[$1043>>2]|0;
      $1045 = HEAP32[$1044>>2]|0;
      $1046 = $2;
      $1047 = (($1046) + 88|0);
      $1048 = HEAP32[$1047>>2]|0;
      $1049 = HEAP32[$1048>>2]|0;
      $1050 = (($1049) - 1)|0;
      $1051 = $1045 & $1050;
      $1052 = ($1051|0)!=(0);
      if (!($1052)) {
       break;
      }
      $1053 = $2;
      $1054 = (($1053) + 88|0);
      $1055 = HEAP32[$1054>>2]|0;
      $1056 = HEAP32[$1055>>2]|0;
      $1057 = (($1056) + -1)|0;
      HEAP32[$1055>>2] = $1057;
     }
     $1058 = $2;
     $1059 = (($1058) + 88|0);
     $1060 = HEAP32[$1059>>2]|0;
     $1061 = HEAP32[$1060>>2]|0;
     $vararg_ptr91 = ($vararg_buffer89);
     HEAP32[$vararg_ptr91>>2] = $1061;
     (_printf(((712)|0),($vararg_buffer89|0))|0);
    }
    $1062 = $2;
    $1063 = (($1062) + 88|0);
    $1064 = HEAP32[$1063>>2]|0;
    $1065 = HEAP32[$1064>>2]|0;
    $1066 = $2;
    $1067 = (($1066) + 92|0);
    $1068 = HEAP32[$1067>>2]|0;
    $1069 = ($1065|0)>($1068|0);
    if ($1069) {
     while(1) {
      $1070 = $2;
      $1071 = (($1070) + 88|0);
      $1072 = HEAP32[$1071>>2]|0;
      $1073 = HEAP32[$1072>>2]|0;
      $1074 = $2;
      $1075 = (($1074) + 92|0);
      $1076 = HEAP32[$1075>>2]|0;
      $1077 = ($1073|0)>($1076|0);
      if (!($1077)) {
       break;
      }
      $1078 = $2;
      $1079 = (($1078) + 88|0);
      $1080 = HEAP32[$1079>>2]|0;
      $1081 = HEAP32[$1080>>2]|0;
      $1082 = (($1081|0) / 2)&-1;
      HEAP32[$1080>>2] = $1082;
     }
     $1083 = $2;
     $1084 = (($1083) + 88|0);
     $1085 = HEAP32[$1084>>2]|0;
     $1086 = HEAP32[$1085>>2]|0;
     $vararg_ptr94 = ($vararg_buffer92);
     HEAP32[$vararg_ptr94>>2] = $1086;
     (_printf(((784)|0),($vararg_buffer92|0))|0);
    }
    $1087 = $2;
    $1088 = (($1087) + 28|0);
    $1089 = HEAP32[$1088>>2]|0;
    $1090 = HEAP32[$1089>>2]|0;
    $1091 = $2;
    $1092 = (($1091) + 88|0);
    $1093 = HEAP32[$1092>>2]|0;
    $1094 = HEAP32[$1093>>2]|0;
    $1095 = (($1090) + ($1094))|0;
    $1096 = (($1095) - 1)|0;
    $1097 = $2;
    $1098 = (($1097) + 88|0);
    $1099 = HEAP32[$1098>>2]|0;
    $1100 = HEAP32[$1099>>2]|0;
    $1101 = (($1096>>>0) / ($1100>>>0))&-1;
    $nslabs = $1101;
    while(1) {
     $1102 = $nslabs;
     $1103 = $2;
     $1104 = (($1103) + 56|0);
     $1105 = HEAP32[$1104>>2]|0;
     $1106 = HEAP32[$1105>>2]|0;
     $1107 = ($1102>>>0)<($1106>>>0);
     if (!($1107)) {
      break;
     }
     $1108 = $2;
     $1109 = (($1108) + 88|0);
     $1110 = HEAP32[$1109>>2]|0;
     $1111 = HEAP32[$1110>>2]|0;
     $1112 = (($1111|0) / 2)&-1;
     HEAP32[$1110>>2] = $1112;
     $1113 = $2;
     $1114 = (($1113) + 28|0);
     $1115 = HEAP32[$1114>>2]|0;
     $1116 = HEAP32[$1115>>2]|0;
     $1117 = $2;
     $1118 = (($1117) + 88|0);
     $1119 = HEAP32[$1118>>2]|0;
     $1120 = HEAP32[$1119>>2]|0;
     $1121 = (($1116) + ($1120))|0;
     $1122 = (($1121) - 1)|0;
     $1123 = $2;
     $1124 = (($1123) + 88|0);
     $1125 = HEAP32[$1124>>2]|0;
     $1126 = HEAP32[$1125>>2]|0;
     $1127 = (($1122>>>0) / ($1126>>>0))&-1;
     $nslabs = $1127;
    }
    $1128 = $2;
    $1129 = (($1128) + 32|0);
    $1130 = HEAP32[$1129>>2]|0;
    $1131 = $1130;
    $1132 = $preferred_alignment;
    $1133 = $nslabs;
    $1134 = (($1133) + 1)|0;
    $1135 = $1134<<2;
    (_posix_memalign($1131,$1132,$1135)|0);
    $1136 = $2;
    $1137 = (($1136) + 32|0);
    $1138 = HEAP32[$1137>>2]|0;
    $1139 = HEAP32[$1138>>2]|0;
    $1140 = ($1139|0)==(0|0);
    if ($1140) {
     $1141 = $nslabs;
     $1142 = (($1141) + 1)|0;
     $1143 = $1142<<2;
     $vararg_ptr97 = ($vararg_buffer95);
     $1144 = $vararg_ptr97;
     $1145 = $1144;
     HEAP32[$1145>>2] = $1143;
     $1146 = (($1144) + 4)|0;
     $1147 = $1146;
     HEAP32[$1147>>2] = 0;
     $vararg_ptr98 = (($vararg_buffer95) + 8|0);
     HEAP32[$vararg_ptr98>>2] = (864);
     (_printf(((160)|0),($vararg_buffer95|0))|0);
     _exit(1);
     // unreachable;
    }
    $i = 0;
    while(1) {
     $1148 = $i;
     $1149 = $nslabs;
     $1150 = ($1148>>>0)<($1149>>>0);
     if (!($1150)) {
      break;
     }
     $1151 = $2;
     $1152 = (($1151) + 88|0);
     $1153 = HEAP32[$1152>>2]|0;
     $1154 = HEAP32[$1153>>2]|0;
     $1155 = $i;
     $1156 = Math_imul($1154, $1155)|0;
     $1157 = $i;
     $1158 = $2;
     $1159 = (($1158) + 32|0);
     $1160 = HEAP32[$1159>>2]|0;
     $1161 = HEAP32[$1160>>2]|0;
     $1162 = (($1161) + ($1157<<2)|0);
     HEAP32[$1162>>2] = $1156;
     $1163 = $i;
     $1164 = (($1163) + 1)|0;
     $i = $1164;
    }
    $1165 = $2;
    $1166 = (($1165) + 28|0);
    $1167 = HEAP32[$1166>>2]|0;
    $1168 = HEAP32[$1167>>2]|0;
    $1169 = $nslabs;
    $1170 = $2;
    $1171 = (($1170) + 32|0);
    $1172 = HEAP32[$1171>>2]|0;
    $1173 = HEAP32[$1172>>2]|0;
    $1174 = (($1173) + ($1169<<2)|0);
    HEAP32[$1174>>2] = $1168;
    $1175 = $2;
    $1176 = (($1175) + 88|0);
    $1177 = HEAP32[$1176>>2]|0;
    $1178 = HEAP32[$1177>>2]|0;
    $1179 = $2;
    $1180 = (($1179) + 76|0);
    $1181 = HEAP32[$1180>>2]|0;
    HEAP32[$1181>>2] = $1178;
   } else {
    $1182 = $2;
    $1183 = (($1182) + 56|0);
    $1184 = HEAP32[$1183>>2]|0;
    $1185 = HEAP32[$1184>>2]|0;
    $nslabs = $1185;
    while(1) {
     $1186 = $2;
     $1187 = (($1186) + 28|0);
     $1188 = HEAP32[$1187>>2]|0;
     $1189 = HEAP32[$1188>>2]|0;
     $1190 = $nslabs;
     $1191 = (($1189>>>0) / ($1190>>>0))&-1;
     $1192 = $2;
     $1193 = (($1192) + 68|0);
     $1194 = HEAP32[$1193>>2]|0;
     $1195 = (($1194>>>0) / 4)&-1;
     $1196 = ($1191>>>0)>=($1195>>>0);
     if (!($1196)) {
      break;
     }
     $1197 = $nslabs;
     $1198 = $1197<<1;
     $nslabs = $1198;
    }
    $1199 = $2;
    $1200 = (($1199) + 32|0);
    $1201 = HEAP32[$1200>>2]|0;
    $1202 = $1201;
    $1203 = $preferred_alignment;
    $1204 = $nslabs;
    $1205 = (($1204) + 1)|0;
    $1206 = $1205<<2;
    (_posix_memalign($1202,$1203,$1206)|0);
    $1207 = $2;
    $1208 = (($1207) + 32|0);
    $1209 = HEAP32[$1208>>2]|0;
    $1210 = HEAP32[$1209>>2]|0;
    $1211 = ($1210|0)==(0|0);
    if ($1211) {
     $1212 = $nslabs;
     $1213 = (($1212) + 1)|0;
     $1214 = $1213<<2;
     $vararg_ptr101 = ($vararg_buffer99);
     $1215 = $vararg_ptr101;
     $1216 = $1215;
     HEAP32[$1216>>2] = $1214;
     $1217 = (($1215) + 4)|0;
     $1218 = $1217;
     HEAP32[$1218>>2] = 0;
     $vararg_ptr102 = (($vararg_buffer99) + 8|0);
     HEAP32[$vararg_ptr102>>2] = (864);
     (_printf(((160)|0),($vararg_buffer99|0))|0);
     _exit(1);
     // unreachable;
    }
    $i = 0;
    while(1) {
     $1219 = $i;
     $1220 = $nslabs;
     $1221 = ($1219>>>0)<=($1220>>>0);
     if (!($1221)) {
      break;
     }
     $1222 = $2;
     $1223 = (($1222) + 28|0);
     $1224 = HEAP32[$1223>>2]|0;
     $1225 = HEAP32[$1224>>2]|0;
     $1226 = $preferred_alignment_by_elements;
     $1227 = (($1225>>>0) / ($1226>>>0))&-1;
     $1228 = $i;
     $1229 = Math_imul($1227, $1228)|0;
     $1230 = $nslabs;
     $1231 = (($1229>>>0) / ($1230>>>0))&-1;
     $1232 = $preferred_alignment_by_elements;
     $1233 = Math_imul($1231, $1232)|0;
     $1234 = $i;
     $1235 = $2;
     $1236 = (($1235) + 32|0);
     $1237 = HEAP32[$1236>>2]|0;
     $1238 = HEAP32[$1237>>2]|0;
     $1239 = (($1238) + ($1234<<2)|0);
     HEAP32[$1239>>2] = $1233;
     $1240 = $i;
     $1241 = (($1240) + 1)|0;
     $i = $1241;
    }
    $1242 = $2;
    $1243 = (($1242) + 76|0);
    $1244 = HEAP32[$1243>>2]|0;
    HEAP32[$1244>>2] = 0;
    $i = 0;
    while(1) {
     $1245 = $i;
     $1246 = $nslabs;
     $1247 = ($1245>>>0)<($1246>>>0);
     if (!($1247)) {
      break;
     }
     $1248 = $i;
     $1249 = (($1248) + 1)|0;
     $1250 = $2;
     $1251 = (($1250) + 32|0);
     $1252 = HEAP32[$1251>>2]|0;
     $1253 = HEAP32[$1252>>2]|0;
     $1254 = (($1253) + ($1249<<2)|0);
     $1255 = HEAP32[$1254>>2]|0;
     $1256 = $i;
     $1257 = $2;
     $1258 = (($1257) + 32|0);
     $1259 = HEAP32[$1258>>2]|0;
     $1260 = HEAP32[$1259>>2]|0;
     $1261 = (($1260) + ($1256<<2)|0);
     $1262 = HEAP32[$1261>>2]|0;
     $1263 = (($1255) - ($1262))|0;
     $temp = $1263;
     $1264 = $2;
     $1265 = (($1264) + 76|0);
     $1266 = HEAP32[$1265>>2]|0;
     $1267 = HEAP32[$1266>>2]|0;
     $1268 = $temp;
     $1269 = ($1267>>>0)<($1268>>>0);
     if ($1269) {
      $1270 = $temp;
      $1271 = $2;
      $1272 = (($1271) + 76|0);
      $1273 = HEAP32[$1272>>2]|0;
      HEAP32[$1273>>2] = $1270;
     }
     $1274 = $i;
     $1275 = (($1274) + 1)|0;
     $i = $1275;
    }
   }
  }
  $biggest_slab = 0;
  $smallest_slab = 2147483647;
  $totpackets = 0;
  $totslabs = 0;
  $1276 = $row_start;
  $1277 = $preferred_alignment;
  $1278 = $2;
  $1279 = (($1278) + 76|0);
  $1280 = HEAP32[$1279>>2]|0;
  $1281 = HEAP32[$1280>>2]|0;
  $1282 = (($1281) + 1)|0;
  $1283 = $1282<<2;
  (_posix_memalign($1276,$1277,$1283)|0);
  $1284 = HEAP32[$row_start>>2]|0;
  $1285 = ($1284|0)==(0|0);
  if ($1285) {
   $1286 = $2;
   $1287 = (($1286) + 76|0);
   $1288 = HEAP32[$1287>>2]|0;
   $1289 = HEAP32[$1288>>2]|0;
   $1290 = (($1289) + 1)|0;
   $1291 = $1290<<2;
   $vararg_ptr105 = ($vararg_buffer103);
   $1292 = $vararg_ptr105;
   $1293 = $1292;
   HEAP32[$1293>>2] = $1291;
   $1294 = (($1292) + 4)|0;
   $1295 = $1294;
   HEAP32[$1295>>2] = 0;
   $vararg_ptr106 = (($vararg_buffer103) + 8|0);
   HEAP32[$vararg_ptr106>>2] = (888);
   (_printf(((160)|0),($vararg_buffer103|0))|0);
   _exit(1);
   // unreachable;
  }
  $1296 = $row_curr;
  $1297 = $preferred_alignment;
  $1298 = $2;
  $1299 = (($1298) + 76|0);
  $1300 = HEAP32[$1299>>2]|0;
  $1301 = HEAP32[$1300>>2]|0;
  $1302 = $1301<<2;
  (_posix_memalign($1296,$1297,$1302)|0);
  $1303 = HEAP32[$row_curr>>2]|0;
  $1304 = ($1303|0)==(0|0);
  if ($1304) {
   $1305 = $2;
   $1306 = (($1305) + 76|0);
   $1307 = HEAP32[$1306>>2]|0;
   $1308 = HEAP32[$1307>>2]|0;
   $1309 = $1308<<2;
   $vararg_ptr109 = ($vararg_buffer107);
   $1310 = $vararg_ptr109;
   $1311 = $1310;
   HEAP32[$1311>>2] = $1309;
   $1312 = (($1310) + 4)|0;
   $1313 = $1312;
   HEAP32[$1313>>2] = 0;
   $vararg_ptr110 = (($vararg_buffer107) + 8|0);
   HEAP32[$vararg_ptr110>>2] = (904);
   (_printf(((160)|0),($vararg_buffer107|0))|0);
   _exit(1);
   // unreachable;
  }
  $realdata = 0;
  $totaldata = 0;
  $current_slab = 0;
  $1314 = $2;
  $1315 = (($1314) + 60|0);
  $1316 = HEAP32[$1315>>2]|0;
  $1317 = ($1316|0)==(2);
  if ($1317) {
   $1329 = 1;
  } else {
   $1318 = $2;
   $1319 = (($1318) + 80|0);
   $1320 = $1319;
   $1321 = $1320;
   $1322 = HEAP32[$1321>>2]|0;
   $1323 = (($1320) + 4)|0;
   $1324 = $1323;
   $1325 = HEAP32[$1324>>2]|0;
   $1326 = ($1322|0)!=(4);
   $1327 = ($1325|0)!=(0);
   $1328 = $1326 | $1327;
   $1329 = $1328;
  }
  $1330 = $1329 ? 0 : 2;
  $1331 = $2;
  $1332 = (($1331) + 8|0);
  $1333 = HEAP32[$1332>>2]|0;
  HEAP32[$1333>>2] = $1330;
  $1334 = $2;
  $1335 = (($1334) + 44|0);
  $1336 = HEAP32[$1335>>2]|0;
  $1337 = HEAP32[$1336>>2]|0;
  $1338 = ($1337>>>0)>(16);
  if ($1338) {
   $1339 = $2;
   $1340 = (($1339) + 44|0);
   $1341 = HEAP32[$1340>>2]|0;
   $1342 = HEAP32[$1341>>2]|0;
   $1343 = $1342;
  } else {
   $1343 = 16;
  }
  $temp_count = $1343;
  $1344 = $2;
  $1345 = (($1344) + 4|0);
  $1346 = HEAP32[$1345>>2]|0;
  $1347 = $1346;
  $1348 = $preferred_alignment;
  $1349 = $temp_count;
  $1350 = (($1349>>>0) / 2)&-1;
  $1351 = $1350<<7;
  (_posix_memalign($1347,$1348,$1351)|0);
  $1352 = $2;
  $1353 = (($1352) + 4|0);
  $1354 = HEAP32[$1353>>2]|0;
  $1355 = HEAP32[$1354>>2]|0;
  $1356 = ($1355|0)==(0|0);
  if ($1356) {
   $1357 = $temp_count;
   $1358 = (($1357>>>0) / 2)&-1;
   $1359 = $1358<<7;
   $vararg_ptr113 = ($vararg_buffer111);
   $1360 = $vararg_ptr113;
   $1361 = $1360;
   HEAP32[$1361>>2] = $1359;
   $1362 = (($1360) + 4)|0;
   $1363 = $1362;
   HEAP32[$1363>>2] = 0;
   $vararg_ptr114 = (($vararg_buffer111) + 8|0);
   HEAP32[$vararg_ptr114>>2] = (920);
   (_printf(((160)|0),($vararg_buffer111|0))|0);
   _exit(1);
   // unreachable;
  }
  $i = 0;
  while(1) {
   $1364 = $i;
   $1365 = $temp_count;
   $1366 = $1365 >>> 1;
   $1367 = ($1364>>>0)<($1366>>>0);
   if (!($1367)) {
    break;
   }
   $j = 0;
   while(1) {
    $1368 = $j;
    $1369 = ($1368>>>0)<(16);
    if (!($1369)) {
     break;
    }
    $1370 = $j;
    $1371 = $i;
    $1372 = $2;
    $1373 = (($1372) + 4|0);
    $1374 = HEAP32[$1373>>2]|0;
    $1375 = HEAP32[$1374>>2]|0;
    $1376 = (($1375) + ($1371<<7)|0);
    $1377 = (($1376) + 32|0);
    $1378 = (($1377) + ($1370<<1)|0);
    HEAP16[$1378>>1] = 0;
    $1379 = $j;
    $1380 = $i;
    $1381 = $2;
    $1382 = (($1381) + 4|0);
    $1383 = HEAP32[$1382>>2]|0;
    $1384 = HEAP32[$1383>>2]|0;
    $1385 = (($1384) + ($1380<<7)|0);
    $1386 = (($1385) + 64|0);
    $1387 = (($1386) + ($1379<<2)|0);
    HEAPF32[$1387>>2] = 0.0;
    $1388 = $j;
    $1389 = (($1388) + 1)|0;
    $j = $1389;
   }
   $1390 = $i;
   $1391 = (($1390) + 1)|0;
   $i = $1391;
  }
  $1392 = $nslabs;
  $1393 = $2;
  $1394 = (($1393) + 96|0);
  $1395 = HEAP32[$1394>>2]|0;
  HEAP32[$1395>>2] = $1392;
  $1396 = $2;
  $1397 = (($1396) + 96|0);
  $1398 = HEAP32[$1397>>2]|0;
  $1399 = HEAP32[$1398>>2]|0;
  $1400 = (($1399) + 1)|0;
  $1401 = ($1400*12)|0;
  $1402 = $2;
  $1403 = (($1402) + 100|0);
  $1404 = HEAP32[$1403>>2]|0;
  HEAP32[$1404>>2] = $1401;
  $1405 = $2;
  $1406 = (($1405) + 100|0);
  $1407 = HEAP32[$1406>>2]|0;
  $1408 = HEAP32[$1407>>2]|0;
  $1409 = (($1408) + 128)|0;
  HEAP32[$1407>>2] = $1409;
  $1410 = $2;
  $1411 = (($1410) + 100|0);
  $1412 = HEAP32[$1411>>2]|0;
  $1413 = HEAP32[$1412>>2]|0;
  $1414 = (($1413>>>0) / 128)&-1;
  HEAP32[$1412>>2] = $1414;
  $1415 = $2;
  $1416 = (($1415) + 100|0);
  $1417 = HEAP32[$1416>>2]|0;
  $1418 = HEAP32[$1417>>2]|0;
  $1419 = $1418<<7;
  HEAP32[$1417>>2] = $1419;
  $1420 = $2;
  $1421 = (($1420) + 4|0);
  $1422 = HEAP32[$1421>>2]|0;
  $1423 = HEAP32[$1422>>2]|0;
  $1424 = $1423;
  $1425 = $2;
  $1426 = ($1425);
  $1427 = HEAP32[$1426>>2]|0;
  HEAP32[$1427>>2] = $1424;
  $1428 = $2;
  $1429 = (($1428) + 100|0);
  $1430 = HEAP32[$1429>>2]|0;
  $1431 = HEAP32[$1430>>2]|0;
  $1432 = (($1431>>>0) / 128)&-1;
  $1433 = $2;
  $1434 = (($1433) + 4|0);
  $1435 = HEAP32[$1434>>2]|0;
  $1436 = HEAP32[$1435>>2]|0;
  $1437 = (($1436) + ($1432<<7)|0);
  $slab_ptr = $1437;
  $seg_index = 0;
  $acctg_maxcount = 0;
  $acctg_avgcount = 0.0;
  $i = 0;
  L271: while(1) {
   $1438 = $i;
   $1439 = $2;
   $1440 = (($1439) + 96|0);
   $1441 = HEAP32[$1440>>2]|0;
   $1442 = HEAP32[$1441>>2]|0;
   $1443 = ($1438>>>0)<($1442>>>0);
   if (!($1443)) {
    break;
   }
   $1444 = $2;
   $1445 = (($1444) + 88|0);
   $1446 = HEAP32[$1445>>2]|0;
   $1447 = HEAP32[$1446>>2]|0;
   $1448 = (($1447|0) / 16)&-1;
   $nteams = $1448;
   $1449 = $2;
   $1450 = (($1449) + 100|0);
   $1451 = HEAP32[$1450>>2]|0;
   $1452 = HEAP32[$1451>>2]|0;
   $1453 = (($1452>>>0) / 128)&-1;
   $1454 = $current_slab;
   $1455 = $2;
   $1456 = ($1455);
   $1457 = HEAP32[$1456>>2]|0;
   $1458 = HEAP32[$1457>>2]|0;
   $1459 = (($1458) + (($1454*12)|0)|0);
   $1460 = ($1459);
   HEAP32[$1460>>2] = $1453;
   $1461 = $i;
   $1462 = $2;
   $1463 = (($1462) + 32|0);
   $1464 = HEAP32[$1463>>2]|0;
   $1465 = HEAP32[$1464>>2]|0;
   $1466 = (($1465) + ($1461<<2)|0);
   $1467 = HEAP32[$1466>>2]|0;
   $1468 = $2;
   $1469 = (($1468) + 32|0);
   $1470 = HEAP32[$1469>>2]|0;
   $1471 = HEAP32[$1470>>2]|0;
   $1472 = ($1471);
   $1473 = HEAP32[$1472>>2]|0;
   $1474 = (($1467) - ($1473))|0;
   $1475 = $current_slab;
   $1476 = $2;
   $1477 = ($1476);
   $1478 = HEAP32[$1477>>2]|0;
   $1479 = HEAP32[$1478>>2]|0;
   $1480 = (($1479) + (($1475*12)|0)|0);
   $1481 = (($1480) + 4|0);
   HEAP32[$1481>>2] = $1474;
   $1482 = $i;
   $1483 = (($1482) + 1)|0;
   $1484 = $2;
   $1485 = (($1484) + 32|0);
   $1486 = HEAP32[$1485>>2]|0;
   $1487 = HEAP32[$1486>>2]|0;
   $1488 = (($1487) + ($1483<<2)|0);
   $1489 = HEAP32[$1488>>2]|0;
   $1490 = $i;
   $1491 = $2;
   $1492 = (($1491) + 32|0);
   $1493 = HEAP32[$1492>>2]|0;
   $1494 = HEAP32[$1493>>2]|0;
   $1495 = (($1494) + ($1490<<2)|0);
   $1496 = HEAP32[$1495>>2]|0;
   $1497 = (($1489) - ($1496))|0;
   $1498 = $current_slab;
   $1499 = $2;
   $1500 = ($1499);
   $1501 = HEAP32[$1500>>2]|0;
   $1502 = HEAP32[$1501>>2]|0;
   $1503 = (($1502) + (($1498*12)|0)|0);
   $1504 = (($1503) + 8|0);
   HEAP32[$1504>>2] = $1497;
   $1505 = $i;
   $1506 = $2;
   $1507 = (($1506) + 32|0);
   $1508 = HEAP32[$1507>>2]|0;
   $1509 = HEAP32[$1508>>2]|0;
   $1510 = (($1509) + ($1505<<2)|0);
   $1511 = HEAP32[$1510>>2]|0;
   $1512 = $2;
   $1513 = (($1512) + 12|0);
   $1514 = HEAP32[$1513>>2]|0;
   $1515 = HEAP32[$1514>>2]|0;
   $1516 = (($1515) + ($1511<<2)|0);
   $1517 = HEAP32[$1516>>2]|0;
   $1518 = $i;
   $1519 = (($1518) + 1)|0;
   $1520 = $2;
   $1521 = (($1520) + 32|0);
   $1522 = HEAP32[$1521>>2]|0;
   $1523 = HEAP32[$1522>>2]|0;
   $1524 = (($1523) + ($1519<<2)|0);
   $1525 = HEAP32[$1524>>2]|0;
   $1526 = $2;
   $1527 = (($1526) + 12|0);
   $1528 = HEAP32[$1527>>2]|0;
   $1529 = HEAP32[$1528>>2]|0;
   $1530 = (($1529) + ($1525<<2)|0);
   $1531 = HEAP32[$1530>>2]|0;
   $1532 = ($1517|0)==($1531|0);
   if ($1532) {
    $1533 = $2;
    $1534 = (($1533) + 8|0);
    $1535 = HEAP32[$1534>>2]|0;
    $1536 = HEAP32[$1535>>2]|0;
    $1537 = ($1536>>>0)>(0);
    if ($1537) {
     $1538 = $2;
     $1539 = (($1538) + 8|0);
     $1540 = HEAP32[$1539>>2]|0;
     $1541 = HEAP32[$1540>>2]|0;
     $1542 = $1541;
    } else {
     $1542 = 1;
    }
    $jloop = $1542;
    $j = 0;
    while(1) {
     $1543 = $j;
     $1544 = $jloop;
     $1545 = ($1543>>>0)<($1544>>>0);
     if (!($1545)) {
      break;
     }
     $1546 = $seg_index;
     $1547 = $slab_ptr;
     $1548 = (($1547) + ($1546<<7)|0);
     $1549 = $1548;
     $foo = $1549;
     $k = 0;
     while(1) {
      $1550 = $k;
      $1551 = ($1550>>>0)<(32);
      if (!($1551)) {
       break;
      }
      $1552 = $k;
      $1553 = $foo;
      $1554 = (($1553) + ($1552<<2)|0);
      HEAP32[$1554>>2] = 0;
      $1555 = $k;
      $1556 = (($1555) + 1)|0;
      $k = $1556;
     }
     $1557 = $seg_index;
     $1558 = (($1557) + 1)|0;
     $seg_index = $1558;
     $1559 = $2;
     $1560 = (($1559) + 100|0);
     $1561 = HEAP32[$1560>>2]|0;
     $1562 = HEAP32[$1561>>2]|0;
     $1563 = (($1562) + 128)|0;
     HEAP32[$1561>>2] = $1563;
     $1564 = $j;
     $1565 = (($1564) + 1)|0;
     $j = $1565;
    }
   } else {
    $j = 0;
    while(1) {
     $1566 = $j;
     $1567 = $i;
     $1568 = (($1567) + 1)|0;
     $1569 = $2;
     $1570 = (($1569) + 32|0);
     $1571 = HEAP32[$1570>>2]|0;
     $1572 = HEAP32[$1571>>2]|0;
     $1573 = (($1572) + ($1568<<2)|0);
     $1574 = HEAP32[$1573>>2]|0;
     $1575 = $i;
     $1576 = $2;
     $1577 = (($1576) + 32|0);
     $1578 = HEAP32[$1577>>2]|0;
     $1579 = HEAP32[$1578>>2]|0;
     $1580 = (($1579) + ($1575<<2)|0);
     $1581 = HEAP32[$1580>>2]|0;
     $1582 = (($1574) - ($1581))|0;
     $1583 = ($1566>>>0)<=($1582>>>0);
     if (!($1583)) {
      break;
     }
     $1584 = $i;
     $1585 = $2;
     $1586 = (($1585) + 32|0);
     $1587 = HEAP32[$1586>>2]|0;
     $1588 = HEAP32[$1587>>2]|0;
     $1589 = (($1588) + ($1584<<2)|0);
     $1590 = HEAP32[$1589>>2]|0;
     $1591 = $j;
     $1592 = (($1590) + ($1591))|0;
     $1593 = $2;
     $1594 = (($1593) + 12|0);
     $1595 = HEAP32[$1594>>2]|0;
     $1596 = HEAP32[$1595>>2]|0;
     $1597 = (($1596) + ($1592<<2)|0);
     $1598 = HEAP32[$1597>>2]|0;
     $1599 = $j;
     $1600 = HEAP32[$row_start>>2]|0;
     $1601 = (($1600) + ($1599<<2)|0);
     HEAP32[$1601>>2] = $1598;
     $1602 = $j;
     $1603 = (($1602) + 1)|0;
     $j = $1603;
    }
    $1604 = $2;
    $1605 = (($1604) + 80|0);
    $1606 = $1605;
    $1607 = $1606;
    $1608 = HEAP32[$1607>>2]|0;
    $1609 = (($1606) + 4)|0;
    $1610 = $1609;
    $1611 = HEAP32[$1610>>2]|0;
    $1612 = ($1608|0)!=(4);
    $1613 = ($1611|0)!=(0);
    $1614 = $1612 | $1613;
    do {
     if ($1614) {
      label = 219;
     } else {
      $1615 = $2;
      $1616 = (($1615) + 60|0);
      $1617 = HEAP32[$1616>>2]|0;
      $1618 = ($1617|0)==(2);
      if ($1618) {
       label = 219;
       break;
      }
      $1845 = $seg_index;
      $1846 = $slab_ptr;
      $1847 = (($1846) + ($1845<<7)|0);
      $1848 = $1847;
      $first_team_offset = $1848;
      $j = 0;
      while(1) {
       $1849 = $j;
       $1850 = $2;
       $1851 = (($1850) + 8|0);
       $1852 = HEAP32[$1851>>2]|0;
       $1853 = HEAP32[$1852>>2]|0;
       $1854 = ($1849>>>0)<($1853>>>0);
       if (!($1854)) {
        break;
       }
       $1855 = $seg_index;
       $1856 = (($1855) + 1)|0;
       $seg_index = $1856;
       $1857 = $2;
       $1858 = (($1857) + 100|0);
       $1859 = HEAP32[$1858>>2]|0;
       $1860 = HEAP32[$1859>>2]|0;
       $1861 = (($1860) + 128)|0;
       HEAP32[$1859>>2] = $1861;
       $1862 = $j;
       $1863 = (($1862) + 1)|0;
       $j = $1863;
      }
      $packet_offset = 0;
      $k = 0;
      while(1) {
       $1864 = $k;
       $1865 = $i;
       $1866 = (($1865) + 1)|0;
       $1867 = $2;
       $1868 = (($1867) + 32|0);
       $1869 = HEAP32[$1868>>2]|0;
       $1870 = HEAP32[$1869>>2]|0;
       $1871 = (($1870) + ($1866<<2)|0);
       $1872 = HEAP32[$1871>>2]|0;
       $1873 = $i;
       $1874 = $2;
       $1875 = (($1874) + 32|0);
       $1876 = HEAP32[$1875>>2]|0;
       $1877 = HEAP32[$1876>>2]|0;
       $1878 = (($1877) + ($1873<<2)|0);
       $1879 = HEAP32[$1878>>2]|0;
       $1880 = (($1872) - ($1879))|0;
       $1881 = ($1864>>>0)<($1880>>>0);
       if (!($1881)) {
        break;
       }
       $packet_count = 0;
       $j = 0;
       while(1) {
        $1882 = $j;
        $1883 = $2;
        $1884 = (($1883) + 24|0);
        $1885 = HEAP32[$1884>>2]|0;
        $1886 = HEAP32[$1885>>2]|0;
        $1887 = ($1882>>>0)<($1886>>>0);
        if (!($1887)) {
         break;
        }
        $kk1 = 0;
        while(1) {
         $1888 = $kk1;
         $1889 = ($1888>>>0)<(16);
         if (!($1889)) {
          break;
         }
         $1890 = $kk1;
         $1891 = (($count2) + ($1890<<2)|0);
         HEAP32[$1891>>2] = 0;
         $1892 = $k;
         $1893 = $kk1;
         $1894 = (($1892) + ($1893))|0;
         $1895 = HEAP32[$row_start>>2]|0;
         $1896 = (($1895) + ($1894<<2)|0);
         $1897 = HEAP32[$1896>>2]|0;
         $1898 = $k;
         $1899 = $kk1;
         $1900 = (($1898) + ($1899))|0;
         $1901 = HEAP32[$row_curr>>2]|0;
         $1902 = (($1901) + ($1900<<2)|0);
         HEAP32[$1902>>2] = $1897;
         while(1) {
          $1903 = $k;
          $1904 = $kk1;
          $1905 = (($1903) + ($1904))|0;
          $1906 = HEAP32[$row_curr>>2]|0;
          $1907 = (($1906) + ($1905<<2)|0);
          $1908 = HEAP32[$1907>>2]|0;
          $1909 = $2;
          $1910 = (($1909) + 16|0);
          $1911 = HEAP32[$1910>>2]|0;
          $1912 = HEAP32[$1911>>2]|0;
          $1913 = (($1912) + ($1908<<2)|0);
          $1914 = HEAP32[$1913>>2]|0;
          $1915 = $j;
          $1916 = $2;
          $1917 = (($1916) + 64|0);
          $1918 = HEAP32[$1917>>2]|0;
          $1919 = HEAP32[$1918>>2]|0;
          $1920 = (($1915) + ($1919))|0;
          $1921 = ($1914>>>0)<($1920>>>0);
          if ($1921) {
           $1922 = $k;
           $1923 = $kk1;
           $1924 = (($1922) + ($1923))|0;
           $1925 = HEAP32[$row_curr>>2]|0;
           $1926 = (($1925) + ($1924<<2)|0);
           $1927 = HEAP32[$1926>>2]|0;
           $1928 = $i;
           $1929 = $2;
           $1930 = (($1929) + 32|0);
           $1931 = HEAP32[$1930>>2]|0;
           $1932 = HEAP32[$1931>>2]|0;
           $1933 = (($1932) + ($1928<<2)|0);
           $1934 = HEAP32[$1933>>2]|0;
           $1935 = $k;
           $1936 = (($1934) + ($1935))|0;
           $1937 = $kk1;
           $1938 = (($1936) + ($1937))|0;
           $1939 = (($1938) + 1)|0;
           $1940 = $2;
           $1941 = (($1940) + 12|0);
           $1942 = HEAP32[$1941>>2]|0;
           $1943 = HEAP32[$1942>>2]|0;
           $1944 = (($1943) + ($1939<<2)|0);
           $1945 = HEAP32[$1944>>2]|0;
           $1946 = ($1927>>>0)<($1945>>>0);
           $1947 = $1946;
          } else {
           $1947 = 0;
          }
          if (!($1947)) {
           break;
          }
          $1948 = $k;
          $1949 = $kk1;
          $1950 = (($1948) + ($1949))|0;
          $1951 = HEAP32[$row_curr>>2]|0;
          $1952 = (($1951) + ($1950<<2)|0);
          $1953 = HEAP32[$1952>>2]|0;
          $1954 = (($1953) + 1)|0;
          HEAP32[$1952>>2] = $1954;
          $1955 = $kk1;
          $1956 = (($count2) + ($1955<<2)|0);
          $1957 = HEAP32[$1956>>2]|0;
          $1958 = (($1957) + 1)|0;
          HEAP32[$1956>>2] = $1958;
         }
         $1959 = $kk1;
         $1960 = (($1959) + 1)|0;
         $kk1 = $1960;
        }
        $maxcount3 = 0;
        $kk1 = 0;
        while(1) {
         $1961 = $kk1;
         $1962 = ($1961>>>0)<(16);
         if (!($1962)) {
          break;
         }
         $1963 = $kk1;
         $1964 = (($count2) + ($1963<<2)|0);
         $1965 = HEAP32[$1964>>2]|0;
         $1966 = $maxcount3;
         $1967 = ($1965>>>0)>($1966>>>0);
         if ($1967) {
          $1968 = $kk1;
          $1969 = (($count2) + ($1968<<2)|0);
          $1970 = HEAP32[$1969>>2]|0;
          $maxcount3 = $1970;
         }
         $1971 = $kk1;
         $1972 = (($1971) + 1)|0;
         $kk1 = $1972;
        }
        $sum4 = 0;
        $kk1 = 0;
        while(1) {
         $1973 = $kk1;
         $1974 = ($1973>>>0)<(16);
         if (!($1974)) {
          break;
         }
         $1975 = $kk1;
         $1976 = (($count2) + ($1975<<2)|0);
         $1977 = HEAP32[$1976>>2]|0;
         $1978 = $sum4;
         $1979 = (($1978) + ($1977))|0;
         $sum4 = $1979;
         $1980 = $kk1;
         $1981 = (($1980) + 1)|0;
         $kk1 = $1981;
        }
        $1982 = $sum4;
        $1983 = $realdata;
        $1984 = (($1983) + ($1982))|0;
        $realdata = $1984;
        $1985 = $maxcount3;
        $1986 = $1985<<4;
        $1987 = $totaldata;
        $1988 = (($1987) + ($1986))|0;
        $totaldata = $1988;
        $countdex5 = 0;
        while(1) {
         $1989 = $countdex5;
         $1990 = $maxcount3;
         $1991 = ($1989>>>0)<($1990>>>0);
         if (!($1991)) {
          break;
         }
         $1992 = $j;
         $1993 = $seg_index;
         $1994 = $slab_ptr;
         $1995 = (($1994) + ($1993<<7)|0);
         $1996 = ($1995);
         HEAP32[$1996>>2] = $1992;
         $1997 = $k;
         $1998 = $seg_index;
         $1999 = $slab_ptr;
         $2000 = (($1999) + ($1998<<7)|0);
         $2001 = (($2000) + 12|0);
         HEAP32[$2001>>2] = $1997;
         $kk1 = 0;
         while(1) {
          $2002 = $kk1;
          $2003 = ($2002>>>0)<(16);
          if (!($2003)) {
           break;
          }
          $2004 = $countdex5;
          $2005 = $kk1;
          $2006 = (($count2) + ($2005<<2)|0);
          $2007 = HEAP32[$2006>>2]|0;
          $2008 = ($2004>>>0)<($2007>>>0);
          if ($2008) {
           $2009 = $k;
           $2010 = $kk1;
           $2011 = (($2009) + ($2010))|0;
           $2012 = HEAP32[$row_start>>2]|0;
           $2013 = (($2012) + ($2011<<2)|0);
           $2014 = HEAP32[$2013>>2]|0;
           $2015 = $countdex5;
           $2016 = (($2014) + ($2015))|0;
           $2017 = $2;
           $2018 = (($2017) + 16|0);
           $2019 = HEAP32[$2018>>2]|0;
           $2020 = HEAP32[$2019>>2]|0;
           $2021 = (($2020) + ($2016<<2)|0);
           $2022 = HEAP32[$2021>>2]|0;
           $2023 = $2;
           $2024 = (($2023) + 64|0);
           $2025 = HEAP32[$2024>>2]|0;
           $2026 = HEAP32[$2025>>2]|0;
           $2027 = (($2026) - 1)|0;
           $2028 = $2022 & $2027;
           $2029 = $2028&65535;
           $2030 = $kk1;
           $2031 = $seg_index;
           $2032 = $slab_ptr;
           $2033 = (($2032) + ($2031<<7)|0);
           $2034 = (($2033) + 32|0);
           $2035 = (($2034) + ($2030<<1)|0);
           HEAP16[$2035>>1] = $2029;
           $2036 = $k;
           $2037 = $kk1;
           $2038 = (($2036) + ($2037))|0;
           $2039 = HEAP32[$row_start>>2]|0;
           $2040 = (($2039) + ($2038<<2)|0);
           $2041 = HEAP32[$2040>>2]|0;
           $2042 = $countdex5;
           $2043 = (($2041) + ($2042))|0;
           $2044 = $2;
           $2045 = (($2044) + 20|0);
           $2046 = HEAP32[$2045>>2]|0;
           $2047 = HEAP32[$2046>>2]|0;
           $2048 = (($2047) + ($2043<<2)|0);
           $2049 = +HEAPF32[$2048>>2];
           $2050 = $kk1;
           $2051 = $seg_index;
           $2052 = $slab_ptr;
           $2053 = (($2052) + ($2051<<7)|0);
           $2054 = (($2053) + 64|0);
           $2055 = (($2054) + ($2050<<2)|0);
           HEAPF32[$2055>>2] = $2049;
          }
          $2056 = $kk1;
          $2057 = (($2056) + 1)|0;
          $kk1 = $2057;
         }
         $2058 = $seg_index;
         $2059 = (($2058) + 1)|0;
         $seg_index = $2059;
         $2060 = $packet_count;
         $2061 = (($2060) + 1)|0;
         $packet_count = $2061;
         $2062 = $2;
         $2063 = (($2062) + 100|0);
         $2064 = HEAP32[$2063>>2]|0;
         $2065 = HEAP32[$2064>>2]|0;
         $2066 = (($2065) + 128)|0;
         HEAP32[$2064>>2] = $2066;
         $2067 = $countdex5;
         $2068 = (($2067) + 1)|0;
         $countdex5 = $2068;
        }
        $kk1 = 0;
        while(1) {
         $2069 = $kk1;
         $2070 = ($2069>>>0)<(16);
         if (!($2070)) {
          break;
         }
         $2071 = $k;
         $2072 = $kk1;
         $2073 = (($2071) + ($2072))|0;
         $2074 = HEAP32[$row_curr>>2]|0;
         $2075 = (($2074) + ($2073<<2)|0);
         $2076 = HEAP32[$2075>>2]|0;
         $2077 = $k;
         $2078 = $kk1;
         $2079 = (($2077) + ($2078))|0;
         $2080 = HEAP32[$row_start>>2]|0;
         $2081 = (($2080) + ($2079<<2)|0);
         HEAP32[$2081>>2] = $2076;
         $2082 = $kk1;
         $2083 = (($2082) + 1)|0;
         $kk1 = $2083;
        }
        $2084 = $2;
        $2085 = (($2084) + 64|0);
        $2086 = HEAP32[$2085>>2]|0;
        $2087 = HEAP32[$2086>>2]|0;
        $2088 = $j;
        $2089 = (($2088) + ($2087))|0;
        $j = $2089;
       }
       $2090 = $packet_offset;
       $2091 = ($2090|0)>(65535);
       if ($2091) {
        label = 306;
        break L271;
       }
       $2092 = $packet_count;
       $2093 = ($2092|0)>(65535);
       if ($2093) {
        label = 306;
        break L271;
       }
       $2094 = $packet_offset;
       $2095 = $2094<<16;
       $2096 = $packet_count;
       $2097 = (($2095) + ($2096))|0;
       $2098 = $k;
       $2099 = $2098 >>> 4;
       $2100 = $first_team_offset;
       $2101 = (($2100) + ($2099<<2)|0);
       HEAP32[$2101>>2] = $2097;
       $2102 = $packet_count;
       $2103 = $packet_offset;
       $2104 = (($2103) + ($2102))|0;
       $packet_offset = $2104;
       $2105 = $k;
       $2106 = (($2105) + 16)|0;
       $k = $2106;
      }
      $2107 = $i;
      $2108 = (($2107) + 1)|0;
      $2109 = $2;
      $2110 = (($2109) + 32|0);
      $2111 = HEAP32[$2110>>2]|0;
      $2112 = HEAP32[$2111>>2]|0;
      $2113 = (($2112) + ($2108<<2)|0);
      $2114 = HEAP32[$2113>>2]|0;
      $2115 = $i;
      $2116 = $2;
      $2117 = (($2116) + 32|0);
      $2118 = HEAP32[$2117>>2]|0;
      $2119 = HEAP32[$2118>>2]|0;
      $2120 = (($2119) + ($2115<<2)|0);
      $2121 = HEAP32[$2120>>2]|0;
      $2122 = (($2114) - ($2121))|0;
      $k = $2122;
      while(1) {
       $2123 = $k;
       $2124 = $nteams;
       $2125 = $2124<<4;
       $2126 = ($2123>>>0)<($2125>>>0);
       if (!($2126)) {
        break;
       }
       $2127 = $k;
       $2128 = $2127 >>> 4;
       $2129 = $first_team_offset;
       $2130 = (($2129) + ($2128<<2)|0);
       HEAP32[$2130>>2] = 0;
       $2131 = $k;
       $2132 = (($2131) + 16)|0;
       $k = $2132;
      }
      $tempmaxcount = 0;
      $tempavgcount = 0;
      $k = 0;
      while(1) {
       $2133 = $k;
       $2134 = $nteams;
       $2135 = ($2133>>>0)<($2134>>>0);
       if (!($2135)) {
        break;
       }
       $2136 = $k;
       $2137 = $first_team_offset;
       $2138 = (($2137) + ($2136<<2)|0);
       $2139 = HEAP32[$2138>>2]|0;
       $2140 = (($2139|0) % 65536)&-1;
       $tempcount = $2140;
       $2141 = $tempcount;
       $2142 = $tempavgcount;
       $2143 = (($2142) + ($2141))|0;
       $tempavgcount = $2143;
       $2144 = $tempcount;
       $2145 = $tempmaxcount;
       $2146 = ($2144|0)>($2145|0);
       if ($2146) {
        $2147 = $tempcount;
        $tempmaxcount = $2147;
       }
       $2148 = $k;
       $2149 = (($2148) + 1)|0;
       $k = $2149;
      }
      $2150 = $tempavgcount;
      $2151 = (+($2150|0));
      $2152 = $nteams;
      $2153 = (+($2152>>>0));
      $2154 = $2151 / $2153;
      $2155 = $acctg_avgcount;
      $2156 = $2155 + $2154;
      $acctg_avgcount = $2156;
      $2157 = $tempmaxcount;
      $2158 = $acctg_maxcount;
      $2159 = (($2158) + ($2157))|0;
      $acctg_maxcount = $2159;
     }
    } while(0);
    if ((label|0) == 219) {
     label = 0;
     $j = 0;
     while(1) {
      $1619 = $j;
      $1620 = $2;
      $1621 = (($1620) + 24|0);
      $1622 = HEAP32[$1621>>2]|0;
      $1623 = HEAP32[$1622>>2]|0;
      $1624 = ($1619>>>0)<($1623>>>0);
      if (!($1624)) {
       break;
      }
      $k = 0;
      while(1) {
       $1625 = $k;
       $1626 = $i;
       $1627 = (($1626) + 1)|0;
       $1628 = $2;
       $1629 = (($1628) + 32|0);
       $1630 = HEAP32[$1629>>2]|0;
       $1631 = HEAP32[$1630>>2]|0;
       $1632 = (($1631) + ($1627<<2)|0);
       $1633 = HEAP32[$1632>>2]|0;
       $1634 = $i;
       $1635 = $2;
       $1636 = (($1635) + 32|0);
       $1637 = HEAP32[$1636>>2]|0;
       $1638 = HEAP32[$1637>>2]|0;
       $1639 = (($1638) + ($1634<<2)|0);
       $1640 = HEAP32[$1639>>2]|0;
       $1641 = (($1633) - ($1640))|0;
       $1642 = ($1625>>>0)<($1641>>>0);
       if (!($1642)) {
        break;
       }
       $kk = 0;
       while(1) {
        $1643 = $kk;
        $1644 = ($1643>>>0)<(16);
        if (!($1644)) {
         break;
        }
        $1645 = $kk;
        $1646 = (($count) + ($1645<<2)|0);
        HEAP32[$1646>>2] = 0;
        $1647 = $k;
        $1648 = $kk;
        $1649 = (($1647) + ($1648))|0;
        $1650 = HEAP32[$row_start>>2]|0;
        $1651 = (($1650) + ($1649<<2)|0);
        $1652 = HEAP32[$1651>>2]|0;
        $1653 = $k;
        $1654 = $kk;
        $1655 = (($1653) + ($1654))|0;
        $1656 = HEAP32[$row_curr>>2]|0;
        $1657 = (($1656) + ($1655<<2)|0);
        HEAP32[$1657>>2] = $1652;
        while(1) {
         $1658 = $k;
         $1659 = $kk;
         $1660 = (($1658) + ($1659))|0;
         $1661 = HEAP32[$row_curr>>2]|0;
         $1662 = (($1661) + ($1660<<2)|0);
         $1663 = HEAP32[$1662>>2]|0;
         $1664 = $2;
         $1665 = (($1664) + 16|0);
         $1666 = HEAP32[$1665>>2]|0;
         $1667 = HEAP32[$1666>>2]|0;
         $1668 = (($1667) + ($1663<<2)|0);
         $1669 = HEAP32[$1668>>2]|0;
         $1670 = $j;
         $1671 = $2;
         $1672 = (($1671) + 64|0);
         $1673 = HEAP32[$1672>>2]|0;
         $1674 = HEAP32[$1673>>2]|0;
         $1675 = (($1670) + ($1674))|0;
         $1676 = ($1669>>>0)<($1675>>>0);
         if ($1676) {
          $1677 = $k;
          $1678 = $kk;
          $1679 = (($1677) + ($1678))|0;
          $1680 = HEAP32[$row_curr>>2]|0;
          $1681 = (($1680) + ($1679<<2)|0);
          $1682 = HEAP32[$1681>>2]|0;
          $1683 = $i;
          $1684 = $2;
          $1685 = (($1684) + 32|0);
          $1686 = HEAP32[$1685>>2]|0;
          $1687 = HEAP32[$1686>>2]|0;
          $1688 = (($1687) + ($1683<<2)|0);
          $1689 = HEAP32[$1688>>2]|0;
          $1690 = $k;
          $1691 = (($1689) + ($1690))|0;
          $1692 = $kk;
          $1693 = (($1691) + ($1692))|0;
          $1694 = (($1693) + 1)|0;
          $1695 = $2;
          $1696 = (($1695) + 12|0);
          $1697 = HEAP32[$1696>>2]|0;
          $1698 = HEAP32[$1697>>2]|0;
          $1699 = (($1698) + ($1694<<2)|0);
          $1700 = HEAP32[$1699>>2]|0;
          $1701 = ($1682>>>0)<($1700>>>0);
          $1702 = $1701;
         } else {
          $1702 = 0;
         }
         if (!($1702)) {
          break;
         }
         $1703 = $k;
         $1704 = $kk;
         $1705 = (($1703) + ($1704))|0;
         $1706 = HEAP32[$row_curr>>2]|0;
         $1707 = (($1706) + ($1705<<2)|0);
         $1708 = HEAP32[$1707>>2]|0;
         $1709 = (($1708) + 1)|0;
         HEAP32[$1707>>2] = $1709;
         $1710 = $kk;
         $1711 = (($count) + ($1710<<2)|0);
         $1712 = HEAP32[$1711>>2]|0;
         $1713 = (($1712) + 1)|0;
         HEAP32[$1711>>2] = $1713;
        }
        $1714 = $kk;
        $1715 = (($1714) + 1)|0;
        $kk = $1715;
       }
       $maxcount = 0;
       $kk = 0;
       while(1) {
        $1716 = $kk;
        $1717 = ($1716>>>0)<(16);
        if (!($1717)) {
         break;
        }
        $1718 = $kk;
        $1719 = (($count) + ($1718<<2)|0);
        $1720 = HEAP32[$1719>>2]|0;
        $1721 = $maxcount;
        $1722 = ($1720>>>0)>($1721>>>0);
        if ($1722) {
         $1723 = $kk;
         $1724 = (($count) + ($1723<<2)|0);
         $1725 = HEAP32[$1724>>2]|0;
         $maxcount = $1725;
        }
        $1726 = $kk;
        $1727 = (($1726) + 1)|0;
        $kk = $1727;
       }
       $sum = 0;
       $kk = 0;
       while(1) {
        $1728 = $kk;
        $1729 = ($1728>>>0)<(16);
        if (!($1729)) {
         break;
        }
        $1730 = $kk;
        $1731 = (($count) + ($1730<<2)|0);
        $1732 = HEAP32[$1731>>2]|0;
        $1733 = $sum;
        $1734 = (($1733) + ($1732))|0;
        $sum = $1734;
        $1735 = $kk;
        $1736 = (($1735) + 1)|0;
        $kk = $1736;
       }
       $1737 = $sum;
       $1738 = $realdata;
       $1739 = (($1738) + ($1737))|0;
       $realdata = $1739;
       $1740 = $maxcount;
       $1741 = $1740<<4;
       $1742 = $totaldata;
       $1743 = (($1742) + ($1741))|0;
       $totaldata = $1743;
       $countdex = 0;
       while(1) {
        $1744 = $countdex;
        $1745 = $maxcount;
        $1746 = ($1744>>>0)<($1745>>>0);
        if (!($1746)) {
         break;
        }
        $1747 = $j;
        $1748 = $seg_index;
        $1749 = $slab_ptr;
        $1750 = (($1749) + ($1748<<7)|0);
        $1751 = ($1750);
        HEAP32[$1751>>2] = $1747;
        $1752 = $k;
        $1753 = $seg_index;
        $1754 = $slab_ptr;
        $1755 = (($1754) + ($1753<<7)|0);
        $1756 = (($1755) + 12|0);
        HEAP32[$1756>>2] = $1752;
        $kk = 0;
        while(1) {
         $1757 = $kk;
         $1758 = ($1757>>>0)<(16);
         if (!($1758)) {
          break;
         }
         $1759 = $countdex;
         $1760 = $kk;
         $1761 = (($count) + ($1760<<2)|0);
         $1762 = HEAP32[$1761>>2]|0;
         $1763 = ($1759>>>0)<($1762>>>0);
         if ($1763) {
          $1764 = $k;
          $1765 = $kk;
          $1766 = (($1764) + ($1765))|0;
          $1767 = HEAP32[$row_start>>2]|0;
          $1768 = (($1767) + ($1766<<2)|0);
          $1769 = HEAP32[$1768>>2]|0;
          $1770 = $countdex;
          $1771 = (($1769) + ($1770))|0;
          $1772 = $2;
          $1773 = (($1772) + 16|0);
          $1774 = HEAP32[$1773>>2]|0;
          $1775 = HEAP32[$1774>>2]|0;
          $1776 = (($1775) + ($1771<<2)|0);
          $1777 = HEAP32[$1776>>2]|0;
          $1778 = $2;
          $1779 = (($1778) + 64|0);
          $1780 = HEAP32[$1779>>2]|0;
          $1781 = HEAP32[$1780>>2]|0;
          $1782 = (($1781) - 1)|0;
          $1783 = $1777 & $1782;
          $1784 = $1783&65535;
          $1785 = $kk;
          $1786 = $seg_index;
          $1787 = $slab_ptr;
          $1788 = (($1787) + ($1786<<7)|0);
          $1789 = (($1788) + 32|0);
          $1790 = (($1789) + ($1785<<1)|0);
          HEAP16[$1790>>1] = $1784;
          $1791 = $k;
          $1792 = $kk;
          $1793 = (($1791) + ($1792))|0;
          $1794 = HEAP32[$row_start>>2]|0;
          $1795 = (($1794) + ($1793<<2)|0);
          $1796 = HEAP32[$1795>>2]|0;
          $1797 = $countdex;
          $1798 = (($1796) + ($1797))|0;
          $1799 = $2;
          $1800 = (($1799) + 20|0);
          $1801 = HEAP32[$1800>>2]|0;
          $1802 = HEAP32[$1801>>2]|0;
          $1803 = (($1802) + ($1798<<2)|0);
          $1804 = +HEAPF32[$1803>>2];
          $1805 = $kk;
          $1806 = $seg_index;
          $1807 = $slab_ptr;
          $1808 = (($1807) + ($1806<<7)|0);
          $1809 = (($1808) + 64|0);
          $1810 = (($1809) + ($1805<<2)|0);
          HEAPF32[$1810>>2] = $1804;
         }
         $1811 = $kk;
         $1812 = (($1811) + 1)|0;
         $kk = $1812;
        }
        $1813 = $seg_index;
        $1814 = (($1813) + 1)|0;
        $seg_index = $1814;
        $1815 = $2;
        $1816 = (($1815) + 100|0);
        $1817 = HEAP32[$1816>>2]|0;
        $1818 = HEAP32[$1817>>2]|0;
        $1819 = (($1818) + 128)|0;
        HEAP32[$1817>>2] = $1819;
        $1820 = $countdex;
        $1821 = (($1820) + 1)|0;
        $countdex = $1821;
       }
       $kk = 0;
       while(1) {
        $1822 = $kk;
        $1823 = ($1822>>>0)<(16);
        if (!($1823)) {
         break;
        }
        $1824 = $k;
        $1825 = $kk;
        $1826 = (($1824) + ($1825))|0;
        $1827 = HEAP32[$row_curr>>2]|0;
        $1828 = (($1827) + ($1826<<2)|0);
        $1829 = HEAP32[$1828>>2]|0;
        $1830 = $k;
        $1831 = $kk;
        $1832 = (($1830) + ($1831))|0;
        $1833 = HEAP32[$row_start>>2]|0;
        $1834 = (($1833) + ($1832<<2)|0);
        HEAP32[$1834>>2] = $1829;
        $1835 = $kk;
        $1836 = (($1835) + 1)|0;
        $kk = $1836;
       }
       $1837 = $k;
       $1838 = (($1837) + 16)|0;
       $k = $1838;
      }
      $1839 = $2;
      $1840 = (($1839) + 64|0);
      $1841 = HEAP32[$1840>>2]|0;
      $1842 = HEAP32[$1841>>2]|0;
      $1843 = $j;
      $1844 = (($1843) + ($1842))|0;
      $j = $1844;
     }
    }
   }
   $2160 = $current_slab;
   $2161 = (($2160) + 1)|0;
   $current_slab = $2161;
   $2162 = $i;
   $2163 = (($2162) + 1)|0;
   $i = $2163;
  }
  if ((label|0) == 306) {
   (_printf(((936)|0),($vararg_buffer115|0))|0);
   $1 = -1;
   $2352 = $1;
   STACKTOP = sp;return ($2352|0);
  }
  $2164 = HEAP32[$row_start>>2]|0;
  $2165 = $2164;
  _free($2165);
  $2166 = HEAP32[$row_curr>>2]|0;
  $2167 = $2166;
  _free($2167);
  $2168 = $2;
  $2169 = (($2168) + 100|0);
  $2170 = HEAP32[$2169>>2]|0;
  $2171 = HEAP32[$2170>>2]|0;
  $2172 = (($2171>>>0) / 128)&-1;
  $2173 = $current_slab;
  $2174 = $2;
  $2175 = ($2174);
  $2176 = HEAP32[$2175>>2]|0;
  $2177 = HEAP32[$2176>>2]|0;
  $2178 = (($2177) + (($2173*12)|0)|0);
  $2179 = ($2178);
  HEAP32[$2179>>2] = $2172;
  $2180 = $2;
  $2181 = (($2180) + 96|0);
  $2182 = HEAP32[$2181>>2]|0;
  $2183 = HEAP32[$2182>>2]|0;
  $2184 = $2;
  $2185 = (($2184) + 32|0);
  $2186 = HEAP32[$2185>>2]|0;
  $2187 = HEAP32[$2186>>2]|0;
  $2188 = (($2187) + ($2183<<2)|0);
  $2189 = HEAP32[$2188>>2]|0;
  $2190 = $2;
  $2191 = (($2190) + 32|0);
  $2192 = HEAP32[$2191>>2]|0;
  $2193 = HEAP32[$2192>>2]|0;
  $2194 = ($2193);
  $2195 = HEAP32[$2194>>2]|0;
  $2196 = (($2189) - ($2195))|0;
  $2197 = $current_slab;
  $2198 = $2;
  $2199 = ($2198);
  $2200 = HEAP32[$2199>>2]|0;
  $2201 = HEAP32[$2200>>2]|0;
  $2202 = (($2201) + (($2197*12)|0)|0);
  $2203 = (($2202) + 4|0);
  HEAP32[$2203>>2] = $2196;
  $2204 = $current_slab;
  $2205 = $2;
  $2206 = ($2205);
  $2207 = HEAP32[$2206>>2]|0;
  $2208 = HEAP32[$2207>>2]|0;
  $2209 = (($2208) + (($2204*12)|0)|0);
  $2210 = (($2209) + 8|0);
  HEAP32[$2210>>2] = 0;
  $i = 0;
  while(1) {
   $2211 = $i;
   $2212 = $2;
   $2213 = (($2212) + 96|0);
   $2214 = HEAP32[$2213>>2]|0;
   $2215 = HEAP32[$2214>>2]|0;
   $2216 = ($2211>>>0)<($2215>>>0);
   if (!($2216)) {
    break;
   }
   $2217 = $i;
   $2218 = (($2217) + 1)|0;
   $2219 = $2;
   $2220 = ($2219);
   $2221 = HEAP32[$2220>>2]|0;
   $2222 = HEAP32[$2221>>2]|0;
   $2223 = (($2222) + (($2218*12)|0)|0);
   $2224 = ($2223);
   $2225 = HEAP32[$2224>>2]|0;
   $2226 = $i;
   $2227 = $2;
   $2228 = ($2227);
   $2229 = HEAP32[$2228>>2]|0;
   $2230 = HEAP32[$2229>>2]|0;
   $2231 = (($2230) + (($2226*12)|0)|0);
   $2232 = ($2231);
   $2233 = HEAP32[$2232>>2]|0;
   $2234 = (($2225) - ($2233))|0;
   $npackets = $2234;
   $2235 = $npackets;
   $2236 = $smallest_slab;
   $2237 = ($2235>>>0)<($2236>>>0);
   if ($2237) {
    $2238 = $npackets;
    $smallest_slab = $2238;
   }
   $2239 = $npackets;
   $2240 = $biggest_slab;
   $2241 = ($2239>>>0)>($2240>>>0);
   if ($2241) {
    $2242 = $npackets;
    $biggest_slab = $2242;
   }
   $2243 = $npackets;
   $2244 = $totpackets;
   $2245 = (($2244) + ($2243))|0;
   $totpackets = $2245;
   $2246 = $totslabs;
   $2247 = (($2246) + 1)|0;
   $totslabs = $2247;
   $2248 = $npackets;
   $2249 = $2;
   $2250 = (($2249) + 8|0);
   $2251 = HEAP32[$2250>>2]|0;
   $2252 = HEAP32[$2251>>2]|0;
   $2253 = (($2248) - ($2252))|0;
   $2254 = $i;
   $2255 = $2;
   $2256 = ($2255);
   $2257 = HEAP32[$2256>>2]|0;
   $2258 = HEAP32[$2257>>2]|0;
   $2259 = (($2258) + (($2254*12)|0)|0);
   $2260 = ($2259);
   $2261 = HEAP32[$2260>>2]|0;
   $2262 = $2;
   $2263 = (($2262) + 8|0);
   $2264 = HEAP32[$2263>>2]|0;
   $2265 = HEAP32[$2264>>2]|0;
   $2266 = (($2261) + ($2265))|0;
   $2267 = $2;
   $2268 = (($2267) + 4|0);
   $2269 = HEAP32[$2268>>2]|0;
   $2270 = HEAP32[$2269>>2]|0;
   $2271 = (($2270) + ($2266<<7)|0);
   $2272 = (($2271) + 8|0);
   HEAP32[$2272>>2] = $2253;
   $2273 = $i;
   $2274 = (($2273) + 1)|0;
   $i = $2274;
  }
  $2275 = $2;
  $2276 = (($2275) + 100|0);
  $2277 = HEAP32[$2276>>2]|0;
  $2278 = HEAP32[$2277>>2]|0;
  $2279 = (($2278) + 4096)|0;
  HEAP32[$2277>>2] = $2279;
  $i = 0;
  while(1) {
   $2280 = $i;
   $2281 = $2;
   $2282 = (($2281) + 96|0);
   $2283 = HEAP32[$2282>>2]|0;
   $2284 = HEAP32[$2283>>2]|0;
   $2285 = ($2280>>>0)<($2284>>>0);
   if (!($2285)) {
    break;
   }
   $2286 = $i;
   $2287 = $2;
   $2288 = ($2287);
   $2289 = HEAP32[$2288>>2]|0;
   $2290 = HEAP32[$2289>>2]|0;
   $2291 = (($2290) + (($2286*12)|0)|0);
   $2292 = ($2291);
   $2293 = HEAP32[$2292>>2]|0;
   $2294 = $2;
   $2295 = (($2294) + 4|0);
   $2296 = HEAP32[$2295>>2]|0;
   $2297 = HEAP32[$2296>>2]|0;
   $2298 = (($2297) + ($2293<<7)|0);
   $slab_ptr = $2298;
   $2299 = $i;
   $2300 = (($2299) + 1)|0;
   $2301 = $2;
   $2302 = ($2301);
   $2303 = HEAP32[$2302>>2]|0;
   $2304 = HEAP32[$2303>>2]|0;
   $2305 = (($2304) + (($2300*12)|0)|0);
   $2306 = ($2305);
   $2307 = HEAP32[$2306>>2]|0;
   $2308 = $i;
   $2309 = $2;
   $2310 = ($2309);
   $2311 = HEAP32[$2310>>2]|0;
   $2312 = HEAP32[$2311>>2]|0;
   $2313 = (($2312) + (($2308*12)|0)|0);
   $2314 = ($2313);
   $2315 = HEAP32[$2314>>2]|0;
   $2316 = (($2307) - ($2315))|0;
   $seg_index = $2316;
   $2317 = $seg_index;
   $2318 = (($2317) + -1)|0;
   $seg_index = $2318;
   $2319 = $seg_index;
   $2320 = $slab_ptr;
   $2321 = (($2320) + ($2319<<7)|0);
   $2322 = ($2321);
   $2323 = HEAP32[$2322>>2]|0;
   $curr_input_offset = $2323;
   $next_input_offset = 0;
   while(1) {
    $2324 = $seg_index;
    $2325 = $2;
    $2326 = (($2325) + 8|0);
    $2327 = HEAP32[$2326>>2]|0;
    $2328 = HEAP32[$2327>>2]|0;
    $2329 = ($2324|0)>=($2328|0);
    if (!($2329)) {
     break;
    }
    $2330 = $seg_index;
    $2331 = $slab_ptr;
    $2332 = (($2331) + ($2330<<7)|0);
    $2333 = ($2332);
    $2334 = HEAP32[$2333>>2]|0;
    $2335 = $curr_input_offset;
    $2336 = ($2334>>>0)<($2335>>>0);
    if ($2336) {
     $2337 = $curr_input_offset;
     $next_input_offset = $2337;
     $2338 = $seg_index;
     $2339 = $slab_ptr;
     $2340 = (($2339) + ($2338<<7)|0);
     $2341 = ($2340);
     $2342 = HEAP32[$2341>>2]|0;
     $curr_input_offset = $2342;
    }
    $2343 = $next_input_offset;
    $2344 = $seg_index;
    $2345 = $slab_ptr;
    $2346 = (($2345) + ($2344<<7)|0);
    $2347 = (($2346) + 4|0);
    HEAP32[$2347>>2] = $2343;
    $2348 = $seg_index;
    $2349 = (($2348) + -1)|0;
    $seg_index = $2349;
   }
   $2350 = $i;
   $2351 = (($2350) + 1)|0;
   $i = $2351;
  }
  $1 = 0;
  $2352 = $1;
  STACKTOP = sp;return ($2352|0);
 }
 return 0|0;
}
function __Z5usagev() {
 var $vararg_buffer = 0, $vararg_buffer1 = 0, $vararg_buffer11 = 0, $vararg_buffer13 = 0, $vararg_buffer15 = 0, $vararg_buffer17 = 0, $vararg_buffer19 = 0, $vararg_buffer21 = 0, $vararg_buffer23 = 0, $vararg_buffer25 = 0, $vararg_buffer27 = 0, $vararg_buffer29 = 0, $vararg_buffer3 = 0, $vararg_buffer31 = 0, $vararg_buffer33 = 0, $vararg_buffer35 = 0, $vararg_buffer37 = 0, $vararg_buffer39 = 0, $vararg_buffer41 = 0, $vararg_buffer5 = 0;
 var $vararg_buffer7 = 0, $vararg_buffer9 = 0, $vararg_lifetime_bitcast = 0, $vararg_lifetime_bitcast10 = 0, $vararg_lifetime_bitcast12 = 0, $vararg_lifetime_bitcast14 = 0, $vararg_lifetime_bitcast16 = 0, $vararg_lifetime_bitcast18 = 0, $vararg_lifetime_bitcast2 = 0, $vararg_lifetime_bitcast20 = 0, $vararg_lifetime_bitcast22 = 0, $vararg_lifetime_bitcast24 = 0, $vararg_lifetime_bitcast26 = 0, $vararg_lifetime_bitcast28 = 0, $vararg_lifetime_bitcast30 = 0, $vararg_lifetime_bitcast32 = 0, $vararg_lifetime_bitcast34 = 0, $vararg_lifetime_bitcast36 = 0, $vararg_lifetime_bitcast38 = 0, $vararg_lifetime_bitcast4 = 0;
 var $vararg_lifetime_bitcast40 = 0, $vararg_lifetime_bitcast42 = 0, $vararg_lifetime_bitcast6 = 0, $vararg_lifetime_bitcast8 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 8|0;
 $vararg_buffer41 = sp;
 $vararg_lifetime_bitcast42 = $vararg_buffer41;
 $vararg_buffer39 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast40 = $vararg_buffer39;
 $vararg_buffer37 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast38 = $vararg_buffer37;
 $vararg_buffer35 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast36 = $vararg_buffer35;
 $vararg_buffer33 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast34 = $vararg_buffer33;
 $vararg_buffer31 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast32 = $vararg_buffer31;
 $vararg_buffer29 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast30 = $vararg_buffer29;
 $vararg_buffer27 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast28 = $vararg_buffer27;
 $vararg_buffer25 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast26 = $vararg_buffer25;
 $vararg_buffer23 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast24 = $vararg_buffer23;
 $vararg_buffer21 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast22 = $vararg_buffer21;
 $vararg_buffer19 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast20 = $vararg_buffer19;
 $vararg_buffer17 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast18 = $vararg_buffer17;
 $vararg_buffer15 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast16 = $vararg_buffer15;
 $vararg_buffer13 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast14 = $vararg_buffer13;
 $vararg_buffer11 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast12 = $vararg_buffer11;
 $vararg_buffer9 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast10 = $vararg_buffer9;
 $vararg_buffer7 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast8 = $vararg_buffer7;
 $vararg_buffer5 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast6 = $vararg_buffer5;
 $vararg_buffer3 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast4 = $vararg_buffer3;
 $vararg_buffer1 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast2 = $vararg_buffer1;
 $vararg_buffer = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast = $vararg_buffer;
 (_printf(((944)|0),($vararg_buffer|0))|0);
 (_printf(((952)|0),($vararg_buffer1|0))|0);
 (_printf(((944)|0),($vararg_buffer3|0))|0);
 (_printf(((1024)|0),($vararg_buffer5|0))|0);
 (_printf(((944)|0),($vararg_buffer7|0))|0);
 (_printf(((1104)|0),($vararg_buffer9|0))|0);
 (_printf(((944)|0),($vararg_buffer11|0))|0);
 (_printf(((1120)|0),($vararg_buffer13|0))|0);
 (_printf(((1184)|0),($vararg_buffer15|0))|0);
 (_printf(((1248)|0),($vararg_buffer17|0))|0);
 (_printf(((944)|0),($vararg_buffer19|0))|0);
 (_printf(((1320)|0),($vararg_buffer21|0))|0);
 (_printf(((944)|0),($vararg_buffer23|0))|0);
 (_printf(((1392)|0),($vararg_buffer25|0))|0);
 (_printf(((1456)|0),($vararg_buffer27|0))|0);
 (_printf(((944)|0),($vararg_buffer29|0))|0);
 (_printf(((1536)|0),($vararg_buffer31|0))|0);
 (_printf(((944)|0),($vararg_buffer33|0))|0);
 (_printf(((1592)|0),($vararg_buffer35|0))|0);
 (_printf(((944)|0),($vararg_buffer37|0))|0);
 (_printf(((1688)|0),($vararg_buffer39|0))|0);
 (_printf(((944)|0),($vararg_buffer41|0))|0);
 STACKTOP = sp;return;
}
function _main($argc,$argv) {
 $argc = $argc|0;
 $argv = $argv|0;
 var $1 = 0, $10 = 0, $100 = 0, $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0;
 var $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0.0;
 var $1034 = 0.0, $1035 = 0.0, $1036 = 0.0, $1037 = 0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0;
 var $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0, $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0;
 var $1070 = 0, $1071 = 0, $1072 = 0, $1073 = 0, $1074 = 0, $1075 = 0, $1076 = 0, $1077 = 0, $1078 = 0, $1079 = 0, $108 = 0, $1080 = 0, $1081 = 0, $1082 = 0, $1083 = 0, $1084 = 0, $1085 = 0, $1086 = 0, $1087 = 0, $1088 = 0;
 var $1089 = 0, $109 = 0, $1090 = 0, $1091 = 0, $1092 = 0, $1093 = 0, $1094 = 0, $1095 = 0, $1096 = 0, $1097 = 0, $1098 = 0, $1099 = 0, $11 = 0, $110 = 0, $1100 = 0, $1101 = 0, $1102 = 0, $1103 = 0, $1104 = 0, $1105 = 0;
 var $1106 = 0, $1107 = 0, $1108 = 0, $1109 = 0, $111 = 0, $1110 = 0, $1111 = 0, $1112 = 0, $1113 = 0, $1114 = 0, $1115 = 0, $1116 = 0, $1117 = 0, $1118 = 0, $1119 = 0, $112 = 0, $1120 = 0, $1121 = 0, $1122 = 0, $1123 = 0;
 var $1124 = 0, $1125 = 0, $1126 = 0, $1127 = 0, $1128 = 0, $1129 = 0, $113 = 0, $1130 = 0, $1131 = 0, $1132 = 0, $1133 = 0, $1134 = 0, $1135 = 0, $1136 = 0, $1137 = 0, $1138 = 0, $1139 = 0, $114 = 0, $1140 = 0, $1141 = 0;
 var $1142 = 0, $1143 = 0, $1144 = 0, $1145 = 0, $1146 = 0, $1147 = 0, $1148 = 0, $1149 = 0, $115 = 0, $1150 = 0, $1151 = 0, $1152 = 0, $1153 = 0, $1154 = 0, $1155 = 0, $1156 = 0, $1157 = 0, $1158 = 0, $1159 = 0, $116 = 0;
 var $1160 = 0, $1161 = 0, $1162 = 0, $1163 = 0, $1164 = 0, $1165 = 0, $1166 = 0, $1167 = 0, $1168 = 0, $1169 = 0, $117 = 0, $1170 = 0, $1171 = 0, $1172 = 0, $1173 = 0, $1174 = 0, $1175 = 0, $1176 = 0, $1177 = 0, $1178 = 0;
 var $1179 = 0, $118 = 0, $1180 = 0, $1181 = 0, $1182 = 0, $1183 = 0, $1184 = 0, $1185 = 0, $1186 = 0, $1187 = 0, $1188 = 0, $1189 = 0, $119 = 0, $1190 = 0, $1191 = 0, $1192 = 0, $1193 = 0, $1194 = 0, $1195 = 0, $1196 = 0;
 var $1197 = 0, $1198 = 0, $1199 = 0, $12 = 0, $120 = 0, $1200 = 0, $1201 = 0, $1202 = 0, $1203 = 0, $1204 = 0, $1205 = 0, $1206 = 0, $1207 = 0, $1208 = 0, $1209 = 0, $121 = 0, $1210 = 0, $1211 = 0, $1212 = 0, $1213 = 0;
 var $1214 = 0, $1215 = 0, $1216 = 0, $1217 = 0, $1218 = 0, $1219 = 0, $122 = 0, $1220 = 0, $1221 = 0, $1222 = 0, $1223 = 0, $1224 = 0, $1225 = 0, $1226 = 0, $1227 = 0, $1228 = 0, $1229 = 0, $123 = 0, $1230 = 0, $1231 = 0;
 var $1232 = 0, $1233 = 0, $1234 = 0, $1235 = 0, $1236 = 0, $1237 = 0, $1238 = 0, $1239 = 0, $124 = 0, $1240 = 0, $1241 = 0, $1242 = 0, $1243 = 0, $1244 = 0, $1245 = 0, $1246 = 0, $1247 = 0, $1248 = 0, $1249 = 0, $125 = 0;
 var $1250 = 0, $1251 = 0, $1252 = 0, $1253 = 0, $1254 = 0, $1255 = 0, $1256 = 0, $1257 = 0, $1258 = 0, $1259 = 0, $126 = 0, $1260 = 0, $1261 = 0, $1262 = 0, $1263 = 0, $1264 = 0, $1265 = 0, $1266 = 0, $1267 = 0, $1268 = 0;
 var $1269 = 0, $127 = 0, $1270 = 0, $1271 = 0, $1272 = 0, $1273 = 0, $1274 = 0, $1275 = 0, $1276 = 0, $1277 = 0, $1278 = 0, $1279 = 0, $128 = 0, $1280 = 0, $1281 = 0, $1282 = 0, $1283 = 0, $1284 = 0, $1285 = 0, $1286 = 0;
 var $1287 = 0, $1288 = 0, $1289 = 0, $129 = 0, $1290 = 0, $1291 = 0.0, $1292 = 0, $1293 = 0, $1294 = 0, $1295 = 0, $1296 = 0, $1297 = 0, $1298 = 0.0, $1299 = 0.0, $13 = 0, $130 = 0, $1300 = 0.0, $1301 = 0.0, $1302 = 0, $1303 = 0;
 var $1304 = 0.0, $1305 = 0, $1306 = 0, $1307 = 0, $1308 = 0, $1309 = 0, $131 = 0, $1310 = 0, $1311 = 0, $1312 = 0, $1313 = 0, $1314 = 0, $1315 = 0, $1316 = 0.0, $1317 = 0, $1318 = 0, $1319 = 0, $132 = 0, $1320 = 0.0, $1321 = 0.0;
 var $1322 = 0.0, $1323 = 0.0, $1324 = 0.0, $1325 = 0.0, $1326 = 0.0, $1327 = 0.0, $1328 = 0.0, $1329 = 0, $133 = 0, $1330 = 0.0, $1331 = 0.0, $1332 = 0.0, $1333 = 0.0, $1334 = 0.0, $1335 = 0, $1336 = 0.0, $1337 = 0.0, $1338 = 0.0, $1339 = 0.0, $134 = 0;
 var $1340 = 0.0, $1341 = 0.0, $1342 = 0.0, $1343 = 0.0, $1344 = 0.0, $1345 = 0.0, $1346 = 0, $1347 = 0, $1348 = 0.0, $1349 = 0.0, $135 = 0, $1350 = 0.0, $1351 = 0.0, $1352 = 0.0, $1353 = 0.0, $1354 = 0, $1355 = 0, $1356 = 0, $1357 = 0, $1358 = 0;
 var $1359 = 0, $136 = 0, $1360 = 0, $1361 = 0, $1362 = 0, $1363 = 0, $1364 = 0, $1365 = 0, $1366 = 0, $1367 = 0, $1368 = 0, $1369 = 0, $137 = 0, $1370 = 0, $1371 = 0, $1372 = 0, $1373 = 0, $1374 = 0, $1375 = 0, $1376 = 0;
 var $1377 = 0, $1378 = 0, $1379 = 0, $138 = 0, $1380 = 0, $1381 = 0, $1382 = 0, $1383 = 0, $1384 = 0, $1385 = 0, $1386 = 0, $1387 = 0, $1388 = 0, $1389 = 0, $139 = 0, $1390 = 0, $1391 = 0, $1392 = 0, $1393 = 0, $1394 = 0;
 var $1395 = 0, $1396 = 0, $1397 = 0, $1398 = 0, $1399 = 0, $14 = 0, $140 = 0, $1400 = 0, $1401 = 0, $1402 = 0, $1403 = 0, $1404 = 0, $1405 = 0, $1406 = 0, $1407 = 0, $1408 = 0, $1409 = 0, $141 = 0, $1410 = 0, $1411 = 0;
 var $1412 = 0, $1413 = 0, $1414 = 0, $1415 = 0, $1416 = 0, $1417 = 0, $1418 = 0, $1419 = 0, $142 = 0, $1420 = 0, $1421 = 0, $1422 = 0, $1423 = 0, $1424 = 0, $1425 = 0, $1426 = 0, $1427 = 0, $1428 = 0, $1429 = 0, $143 = 0;
 var $1430 = 0, $1431 = 0, $1432 = 0, $1433 = 0, $1434 = 0, $1435 = 0, $1436 = 0, $1437 = 0, $1438 = 0, $1439 = 0, $144 = 0, $1440 = 0, $1441 = 0, $1442 = 0, $1443 = 0, $1444 = 0, $1445 = 0, $1446 = 0, $1447 = 0, $1448 = 0;
 var $1449 = 0, $145 = 0, $1450 = 0, $1451 = 0, $1452 = 0, $1453 = 0, $1454 = 0, $1455 = 0, $1456 = 0, $1457 = 0, $1458 = 0, $1459 = 0, $146 = 0, $1460 = 0, $1461 = 0, $1462 = 0, $1463 = 0, $1464 = 0, $1465 = 0, $1466 = 0;
 var $1467 = 0, $1468 = 0, $1469 = 0, $147 = 0, $1470 = 0, $1471 = 0, $1472 = 0, $1473 = 0, $1474 = 0, $1475 = 0, $1476 = 0, $1477 = 0, $1478 = 0, $1479 = 0, $148 = 0, $1480 = 0, $1481 = 0, $1482 = 0, $1483 = 0, $1484 = 0;
 var $1485 = 0, $1486 = 0, $1487 = 0, $1488 = 0, $1489 = 0, $149 = 0, $1490 = 0, $1491 = 0, $1492 = 0, $1493 = 0, $1494 = 0, $1495 = 0, $1496 = 0, $1497 = 0, $1498 = 0, $1499 = 0, $15 = 0, $150 = 0, $1500 = 0, $1501 = 0;
 var $1502 = 0, $1503 = 0, $1504 = 0, $1505 = 0, $1506 = 0, $1507 = 0, $1508 = 0, $1509 = 0, $151 = 0, $1510 = 0, $1511 = 0, $1512 = 0, $1513 = 0, $1514 = 0, $1515 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0;
 var $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0;
 var $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0;
 var $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0;
 var $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0;
 var $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0;
 var $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0;
 var $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0;
 var $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0;
 var $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0;
 var $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0;
 var $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0;
 var $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0;
 var $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0;
 var $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0;
 var $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0;
 var $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0;
 var $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0;
 var $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0;
 var $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0;
 var $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0;
 var $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0;
 var $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0;
 var $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0;
 var $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0;
 var $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0;
 var $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0;
 var $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0;
 var $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0;
 var $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0;
 var $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0;
 var $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0;
 var $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0;
 var $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0;
 var $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0;
 var $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0;
 var $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0;
 var $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0;
 var $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0;
 var $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0;
 var $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0;
 var $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0;
 var $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0;
 var $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0;
 var $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0;
 var $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0;
 var $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0, $985 = 0;
 var $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $a = 0.0, $abs_a = 0.0, $accel_found = 0, $aggregate_local_work_group_size = 0, $b = 0.0;
 var $buffer = 0, $column_span = 0, $command_queue_properties = 0, $cpu_found = 0, $data_array = 0, $ddex = 0, $delta = 0.0, $device_found = 0, $diffsum = 0.0, $events = 0, $global_work_size = 0, $gpu_found = 0, $i = 0, $input_array = 0, $input_buffer = 0, $input_buffer_size = 0, $j = 0, $kernel_name = 0, $kernel_name_AWGC = 0, $kernel_name_LS = 0;
 var $kernel_source = 0, $kernel_source_file = 0, $kernel_wg_size = 0, $lb = 0, $local_mem_size = 0, $local_work_size = 0, $long_options = 0, $matrix_buffer = 0, $matrix_buffer_size = 0, $matrix_header = 0, $max_aggregate_local_work_group_size = 0, $max_compute_units = 0, $max_slabheight = 0, $memsize = 0, $mgs = 0, $name = 0, $ndims = 0, $non_zero = 0, $nslabs_round = 0, $num_header_packets = 0;
 var $num_platforms = 0, $nx = 0, $nx_pad = 0, $ny = 0, $nyround = 0, $opt = 0, $option_index = 0, $output_array = 0, $output_array_verify = 0, $output_buffer = 0, $output_buffer_size = 0, $param_value_size_ret = 0, $pdex = 0, $platform = 0, $preferred_alignment = 0, $properties = 0, $rc = 0, $return_size = 0, $retval = 0, $row_index_array = 0;
 var $rval = 0.0, $seg_workspace = 0, $segcachesize = 0, $slab_startrow = 0, $sum = 0.0, $t = 0.0, $team_size = 0, $temp_platform_id_array = 0, $tilebuffer = 0, $tmpdevices = 0, $total_local_mem = 0, $ub = 0, $used_local_mem = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, $vararg_buffer103 = 0, $vararg_buffer107 = 0, $vararg_buffer111 = 0, $vararg_buffer115 = 0, $vararg_buffer119 = 0;
 var $vararg_buffer12 = 0, $vararg_buffer123 = 0, $vararg_buffer127 = 0, $vararg_buffer130 = 0, $vararg_buffer134 = 0, $vararg_buffer136 = 0, $vararg_buffer140 = 0, $vararg_buffer144 = 0, $vararg_buffer148 = 0, $vararg_buffer152 = 0, $vararg_buffer156 = 0, $vararg_buffer16 = 0, $vararg_buffer160 = 0, $vararg_buffer164 = 0, $vararg_buffer168 = 0, $vararg_buffer172 = 0, $vararg_buffer176 = 0, $vararg_buffer180 = 0, $vararg_buffer184 = 0, $vararg_buffer188 = 0;
 var $vararg_buffer192 = 0, $vararg_buffer196 = 0, $vararg_buffer20 = 0, $vararg_buffer200 = 0, $vararg_buffer204 = 0, $vararg_buffer208 = 0, $vararg_buffer212 = 0, $vararg_buffer216 = 0, $vararg_buffer220 = 0, $vararg_buffer224 = 0, $vararg_buffer228 = 0, $vararg_buffer232 = 0, $vararg_buffer236 = 0, $vararg_buffer239 = 0, $vararg_buffer24 = 0, $vararg_buffer242 = 0, $vararg_buffer246 = 0, $vararg_buffer250 = 0, $vararg_buffer254 = 0, $vararg_buffer258 = 0;
 var $vararg_buffer262 = 0, $vararg_buffer266 = 0, $vararg_buffer270 = 0, $vararg_buffer274 = 0, $vararg_buffer278 = 0, $vararg_buffer28 = 0, $vararg_buffer282 = 0, $vararg_buffer286 = 0, $vararg_buffer30 = 0, $vararg_buffer32 = 0, $vararg_buffer35 = 0, $vararg_buffer37 = 0, $vararg_buffer41 = 0, $vararg_buffer45 = 0, $vararg_buffer49 = 0, $vararg_buffer5 = 0, $vararg_buffer53 = 0, $vararg_buffer57 = 0, $vararg_buffer61 = 0, $vararg_buffer65 = 0;
 var $vararg_buffer69 = 0, $vararg_buffer71 = 0, $vararg_buffer73 = 0, $vararg_buffer77 = 0, $vararg_buffer79 = 0, $vararg_buffer8 = 0, $vararg_buffer83 = 0, $vararg_buffer87 = 0, $vararg_buffer91 = 0, $vararg_buffer95 = 0, $vararg_buffer99 = 0, $vararg_lifetime_bitcast = 0, $vararg_lifetime_bitcast100 = 0, $vararg_lifetime_bitcast104 = 0, $vararg_lifetime_bitcast108 = 0, $vararg_lifetime_bitcast112 = 0, $vararg_lifetime_bitcast116 = 0, $vararg_lifetime_bitcast120 = 0, $vararg_lifetime_bitcast124 = 0, $vararg_lifetime_bitcast128 = 0;
 var $vararg_lifetime_bitcast13 = 0, $vararg_lifetime_bitcast131 = 0, $vararg_lifetime_bitcast135 = 0, $vararg_lifetime_bitcast137 = 0, $vararg_lifetime_bitcast141 = 0, $vararg_lifetime_bitcast145 = 0, $vararg_lifetime_bitcast149 = 0, $vararg_lifetime_bitcast153 = 0, $vararg_lifetime_bitcast157 = 0, $vararg_lifetime_bitcast161 = 0, $vararg_lifetime_bitcast165 = 0, $vararg_lifetime_bitcast169 = 0, $vararg_lifetime_bitcast17 = 0, $vararg_lifetime_bitcast173 = 0, $vararg_lifetime_bitcast177 = 0, $vararg_lifetime_bitcast181 = 0, $vararg_lifetime_bitcast185 = 0, $vararg_lifetime_bitcast189 = 0, $vararg_lifetime_bitcast193 = 0, $vararg_lifetime_bitcast197 = 0;
 var $vararg_lifetime_bitcast2 = 0, $vararg_lifetime_bitcast201 = 0, $vararg_lifetime_bitcast205 = 0, $vararg_lifetime_bitcast209 = 0, $vararg_lifetime_bitcast21 = 0, $vararg_lifetime_bitcast213 = 0, $vararg_lifetime_bitcast217 = 0, $vararg_lifetime_bitcast221 = 0, $vararg_lifetime_bitcast225 = 0, $vararg_lifetime_bitcast229 = 0, $vararg_lifetime_bitcast233 = 0, $vararg_lifetime_bitcast237 = 0, $vararg_lifetime_bitcast240 = 0, $vararg_lifetime_bitcast243 = 0, $vararg_lifetime_bitcast247 = 0, $vararg_lifetime_bitcast25 = 0, $vararg_lifetime_bitcast251 = 0, $vararg_lifetime_bitcast255 = 0, $vararg_lifetime_bitcast259 = 0, $vararg_lifetime_bitcast263 = 0;
 var $vararg_lifetime_bitcast267 = 0, $vararg_lifetime_bitcast271 = 0, $vararg_lifetime_bitcast275 = 0, $vararg_lifetime_bitcast279 = 0, $vararg_lifetime_bitcast283 = 0, $vararg_lifetime_bitcast287 = 0, $vararg_lifetime_bitcast29 = 0, $vararg_lifetime_bitcast31 = 0, $vararg_lifetime_bitcast33 = 0, $vararg_lifetime_bitcast36 = 0, $vararg_lifetime_bitcast38 = 0, $vararg_lifetime_bitcast42 = 0, $vararg_lifetime_bitcast46 = 0, $vararg_lifetime_bitcast50 = 0, $vararg_lifetime_bitcast54 = 0, $vararg_lifetime_bitcast58 = 0, $vararg_lifetime_bitcast6 = 0, $vararg_lifetime_bitcast62 = 0, $vararg_lifetime_bitcast66 = 0, $vararg_lifetime_bitcast70 = 0;
 var $vararg_lifetime_bitcast72 = 0, $vararg_lifetime_bitcast74 = 0, $vararg_lifetime_bitcast78 = 0, $vararg_lifetime_bitcast80 = 0, $vararg_lifetime_bitcast84 = 0, $vararg_lifetime_bitcast88 = 0, $vararg_lifetime_bitcast9 = 0, $vararg_lifetime_bitcast92 = 0, $vararg_lifetime_bitcast96 = 0, $vararg_ptr = 0, $vararg_ptr10 = 0, $vararg_ptr101 = 0, $vararg_ptr102 = 0, $vararg_ptr105 = 0, $vararg_ptr106 = 0, $vararg_ptr109 = 0, $vararg_ptr11 = 0, $vararg_ptr110 = 0, $vararg_ptr113 = 0, $vararg_ptr114 = 0;
 var $vararg_ptr117 = 0, $vararg_ptr118 = 0, $vararg_ptr121 = 0, $vararg_ptr122 = 0, $vararg_ptr125 = 0, $vararg_ptr126 = 0, $vararg_ptr129 = 0, $vararg_ptr132 = 0, $vararg_ptr133 = 0, $vararg_ptr138 = 0, $vararg_ptr139 = 0, $vararg_ptr14 = 0, $vararg_ptr142 = 0, $vararg_ptr143 = 0, $vararg_ptr146 = 0, $vararg_ptr147 = 0, $vararg_ptr15 = 0, $vararg_ptr150 = 0, $vararg_ptr151 = 0, $vararg_ptr154 = 0;
 var $vararg_ptr155 = 0, $vararg_ptr158 = 0, $vararg_ptr159 = 0, $vararg_ptr162 = 0, $vararg_ptr163 = 0, $vararg_ptr166 = 0, $vararg_ptr167 = 0, $vararg_ptr170 = 0, $vararg_ptr171 = 0, $vararg_ptr174 = 0, $vararg_ptr175 = 0, $vararg_ptr178 = 0, $vararg_ptr179 = 0, $vararg_ptr18 = 0, $vararg_ptr182 = 0, $vararg_ptr183 = 0, $vararg_ptr186 = 0, $vararg_ptr187 = 0, $vararg_ptr19 = 0, $vararg_ptr190 = 0;
 var $vararg_ptr191 = 0, $vararg_ptr194 = 0, $vararg_ptr195 = 0, $vararg_ptr198 = 0, $vararg_ptr199 = 0, $vararg_ptr202 = 0, $vararg_ptr203 = 0, $vararg_ptr206 = 0, $vararg_ptr207 = 0, $vararg_ptr210 = 0, $vararg_ptr211 = 0, $vararg_ptr214 = 0, $vararg_ptr215 = 0, $vararg_ptr218 = 0, $vararg_ptr219 = 0, $vararg_ptr22 = 0, $vararg_ptr222 = 0, $vararg_ptr223 = 0, $vararg_ptr226 = 0, $vararg_ptr227 = 0;
 var $vararg_ptr23 = 0, $vararg_ptr230 = 0, $vararg_ptr231 = 0, $vararg_ptr234 = 0, $vararg_ptr235 = 0, $vararg_ptr238 = 0, $vararg_ptr241 = 0, $vararg_ptr244 = 0, $vararg_ptr245 = 0, $vararg_ptr248 = 0, $vararg_ptr249 = 0, $vararg_ptr252 = 0, $vararg_ptr253 = 0, $vararg_ptr256 = 0, $vararg_ptr257 = 0, $vararg_ptr26 = 0, $vararg_ptr260 = 0, $vararg_ptr261 = 0, $vararg_ptr264 = 0, $vararg_ptr265 = 0;
 var $vararg_ptr268 = 0, $vararg_ptr269 = 0, $vararg_ptr27 = 0, $vararg_ptr272 = 0, $vararg_ptr273 = 0, $vararg_ptr276 = 0, $vararg_ptr277 = 0, $vararg_ptr280 = 0, $vararg_ptr281 = 0, $vararg_ptr284 = 0, $vararg_ptr285 = 0, $vararg_ptr288 = 0, $vararg_ptr289 = 0, $vararg_ptr3 = 0, $vararg_ptr34 = 0, $vararg_ptr39 = 0, $vararg_ptr4 = 0, $vararg_ptr40 = 0, $vararg_ptr43 = 0, $vararg_ptr44 = 0;
 var $vararg_ptr47 = 0, $vararg_ptr48 = 0, $vararg_ptr51 = 0, $vararg_ptr52 = 0, $vararg_ptr55 = 0, $vararg_ptr56 = 0, $vararg_ptr59 = 0, $vararg_ptr60 = 0, $vararg_ptr63 = 0, $vararg_ptr64 = 0, $vararg_ptr67 = 0, $vararg_ptr68 = 0, $vararg_ptr7 = 0, $vararg_ptr75 = 0, $vararg_ptr76 = 0, $vararg_ptr81 = 0, $vararg_ptr82 = 0, $vararg_ptr85 = 0, $vararg_ptr86 = 0, $vararg_ptr89 = 0;
 var $vararg_ptr90 = 0, $vararg_ptr93 = 0, $vararg_ptr94 = 0, $vararg_ptr97 = 0, $vararg_ptr98 = 0, $x_index_array = 0, dest = 0, label = 0, sp = 0, src = 0, stop = 0, u$0 = 0, u$1 = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 8|0;
 $vararg_buffer286 = sp;
 $vararg_lifetime_bitcast287 = $vararg_buffer286;
 $vararg_buffer282 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast283 = $vararg_buffer282;
 $vararg_buffer278 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast279 = $vararg_buffer278;
 $vararg_buffer274 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast275 = $vararg_buffer274;
 $vararg_buffer270 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast271 = $vararg_buffer270;
 $vararg_buffer266 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast267 = $vararg_buffer266;
 $vararg_buffer262 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast263 = $vararg_buffer262;
 $vararg_buffer258 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast259 = $vararg_buffer258;
 $vararg_buffer254 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast255 = $vararg_buffer254;
 $vararg_buffer250 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast251 = $vararg_buffer250;
 $vararg_buffer246 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast247 = $vararg_buffer246;
 $vararg_buffer242 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast243 = $vararg_buffer242;
 $vararg_buffer239 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast240 = $vararg_buffer239;
 $vararg_buffer236 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast237 = $vararg_buffer236;
 $vararg_buffer232 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast233 = $vararg_buffer232;
 $vararg_buffer228 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast229 = $vararg_buffer228;
 $vararg_buffer224 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast225 = $vararg_buffer224;
 $vararg_buffer220 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast221 = $vararg_buffer220;
 $vararg_buffer216 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast217 = $vararg_buffer216;
 $vararg_buffer212 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast213 = $vararg_buffer212;
 $vararg_buffer208 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast209 = $vararg_buffer208;
 $vararg_buffer204 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast205 = $vararg_buffer204;
 $vararg_buffer200 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast201 = $vararg_buffer200;
 $vararg_buffer196 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast197 = $vararg_buffer196;
 $vararg_buffer192 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast193 = $vararg_buffer192;
 $vararg_buffer188 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast189 = $vararg_buffer188;
 $vararg_buffer184 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast185 = $vararg_buffer184;
 $vararg_buffer180 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast181 = $vararg_buffer180;
 $vararg_buffer176 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast177 = $vararg_buffer176;
 $vararg_buffer172 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast173 = $vararg_buffer172;
 $vararg_buffer168 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast169 = $vararg_buffer168;
 $vararg_buffer164 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast165 = $vararg_buffer164;
 $vararg_buffer160 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast161 = $vararg_buffer160;
 $vararg_buffer156 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast157 = $vararg_buffer156;
 $vararg_buffer152 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast153 = $vararg_buffer152;
 $vararg_buffer148 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast149 = $vararg_buffer148;
 $vararg_buffer144 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast145 = $vararg_buffer144;
 $vararg_buffer140 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast141 = $vararg_buffer140;
 $vararg_buffer136 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast137 = $vararg_buffer136;
 $vararg_buffer134 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast135 = $vararg_buffer134;
 $vararg_buffer130 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast131 = $vararg_buffer130;
 $vararg_buffer127 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast128 = $vararg_buffer127;
 $vararg_buffer123 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast124 = $vararg_buffer123;
 $vararg_buffer119 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast120 = $vararg_buffer119;
 $vararg_buffer115 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast116 = $vararg_buffer115;
 $vararg_buffer111 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast112 = $vararg_buffer111;
 $vararg_buffer107 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast108 = $vararg_buffer107;
 $vararg_buffer103 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast104 = $vararg_buffer103;
 $vararg_buffer99 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast100 = $vararg_buffer99;
 $vararg_buffer95 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast96 = $vararg_buffer95;
 $vararg_buffer91 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast92 = $vararg_buffer91;
 $vararg_buffer87 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast88 = $vararg_buffer87;
 $vararg_buffer83 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast84 = $vararg_buffer83;
 $vararg_buffer79 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast80 = $vararg_buffer79;
 $vararg_buffer77 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast78 = $vararg_buffer77;
 $vararg_buffer73 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast74 = $vararg_buffer73;
 $vararg_buffer71 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast72 = $vararg_buffer71;
 $vararg_buffer69 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast70 = $vararg_buffer69;
 $vararg_buffer65 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast66 = $vararg_buffer65;
 $vararg_buffer61 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast62 = $vararg_buffer61;
 $vararg_buffer57 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast58 = $vararg_buffer57;
 $vararg_buffer53 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast54 = $vararg_buffer53;
 $vararg_buffer49 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast50 = $vararg_buffer49;
 $vararg_buffer45 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast46 = $vararg_buffer45;
 $vararg_buffer41 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast42 = $vararg_buffer41;
 $vararg_buffer37 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast38 = $vararg_buffer37;
 $vararg_buffer35 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast36 = $vararg_buffer35;
 $vararg_buffer32 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast33 = $vararg_buffer32;
 $vararg_buffer30 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast31 = $vararg_buffer30;
 $vararg_buffer28 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast29 = $vararg_buffer28;
 $vararg_buffer24 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast25 = $vararg_buffer24;
 $vararg_buffer20 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast21 = $vararg_buffer20;
 $vararg_buffer16 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast17 = $vararg_buffer16;
 $vararg_buffer12 = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $vararg_lifetime_bitcast13 = $vararg_buffer12;
 $vararg_buffer8 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast9 = $vararg_buffer8;
 $vararg_buffer5 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast6 = $vararg_buffer5;
 $vararg_buffer1 = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast2 = $vararg_buffer1;
 $vararg_buffer = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast = $vararg_buffer;
 $rc = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $return_size = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $column_span = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $kernel_source_file = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $kernel_name_LS = STACKTOP; STACKTOP = STACKTOP + 24|0;
 $kernel_name_AWGC = STACKTOP; STACKTOP = STACKTOP + 24|0;
 $kernel_name = STACKTOP; STACKTOP = STACKTOP + 32|0;
 $nx = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $ny = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $non_zero = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $nx_pad = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $nyround = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $slab_startrow = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $segcachesize = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $max_slabheight = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $param_value_size_ret = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $option_index = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $long_options = STACKTOP; STACKTOP = STACKTOP + 160|0;
 $preferred_alignment = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $num_platforms = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $platform = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $buffer = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $temp_platform_id_array = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $tmpdevices = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $properties = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $kernel_source = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $command_queue_properties = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $kernel_wg_size = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $total_local_mem = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $used_local_mem = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $local_mem_size = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $max_compute_units = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $mgs = STACKTOP; STACKTOP = STACKTOP + 104|0;
 $nslabs_round = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $memsize = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $seg_workspace = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $matrix_header = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $num_header_packets = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $row_index_array = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $x_index_array = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $data_array = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $team_size = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $global_work_size = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $local_work_size = STACKTOP; STACKTOP = STACKTOP + 16|0;
 $output_array_verify = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $input_buffer = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $matrix_buffer = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $output_buffer = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $events = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $1 = 0;
 $2 = $argc;
 $3 = $argv;
 HEAP32[$column_span>>2] = 0;
 $4 = $kernel_source_file;
 ;HEAP8[$4+0|0]=HEAP8[(1776)+0|0]|0;HEAP8[$4+1|0]=HEAP8[(1776)+1|0]|0;HEAP8[$4+2|0]=HEAP8[(1776)+2|0]|0;HEAP8[$4+3|0]=HEAP8[(1776)+3|0]|0;HEAP8[$4+4|0]=HEAP8[(1776)+4|0]|0;HEAP8[$4+5|0]=HEAP8[(1776)+5|0]|0;HEAP8[$4+6|0]=HEAP8[(1776)+6|0]|0;HEAP8[$4+7|0]=HEAP8[(1776)+7|0]|0;
 $5 = $kernel_name_LS;
 dest=$5+0|0; src=(1784)+0|0; stop=dest+21|0; do { HEAP8[dest]=HEAP8[src]|0; dest=dest+1|0; src=src+1|0; } while ((dest|0) < (stop|0));;
 $6 = $kernel_name_AWGC;
 dest=$6+0|0; src=(1808)+0|0; stop=dest+23|0; do { HEAP8[dest]=HEAP8[src]|0; dest=dest+1|0; src=src+1|0; } while ((dest|0) < (stop|0));;
 HEAP32[$slab_startrow>>2] = 0;
 $pdex = 0;
 $ddex = 0;
 $7 = $long_options;
 _memcpy(($7|0),((1912)|0),160)|0;
 $8 = $3;
 $9 = ($8);
 $10 = HEAP32[$9>>2]|0;
 $11 = (_basename(($10|0))|0);
 $name = $11;
 $12 = $3;
 $13 = ($12);
 $14 = HEAP32[$13>>2]|0;
 $15 = (_dirname(($14|0))|0);
 (_chdir(($15|0))|0);
 L1: while(1) {
  $16 = $2;
  $17 = $3;
  $18 = ($long_options);
  $19 = (_getopt_long($16,$17,(2072),$18,$option_index)|0);
  $opt = $19;
  $20 = $opt;
  $21 = ($20|0)==(-1);
  if ($21) {
   label = 3;
   break;
  }
  $22 = $opt;
  switch ($22|0) {
  case 104:  {
   label = 5;
   break L1;
   break;
  }
  case 97:  {
   $23 = (1736);
   $24 = $23;
   HEAP32[$24>>2] = 8;
   $25 = (($23) + 4)|0;
   $26 = $25;
   HEAP32[$26>>2] = 0;
   break;
  }
  case 99:  {
   $27 = (1736);
   $28 = $27;
   HEAP32[$28>>2] = 2;
   $29 = (($27) + 4)|0;
   $30 = $29;
   HEAP32[$30>>2] = 0;
   break;
  }
  case 103:  {
   $31 = (1736);
   $32 = $31;
   HEAP32[$32>>2] = 4;
   $33 = (($31) + 4)|0;
   $34 = $33;
   HEAP32[$34>>2] = 0;
   break;
  }
  case 76:  {
   HEAP32[(1744)>>2] = 1;
   break;
  }
  case 65:  {
   HEAP32[(1744)>>2] = 2;
   break;
  }
  case 108:  {
   $35 = HEAP32[(4552)>>2]|0;
   $36 = (_atoi(($35|0))|0);
   HEAP32[(1752)>>2] = $36;
   break;
  }
  case 102:  {
   $37 = HEAP32[(4552)>>2]|0;
   $38 = (_strlen(($37|0))|0);
   $39 = (1 + ($38))|0;
   (_posix_memalign((1760),128,$39)|0);
   $40 = HEAP32[(1760)>>2]|0;
   $41 = HEAP32[(4552)>>2]|0;
   (_strcpy(($40|0),($41|0))|0);
   break;
  }
  case 63:  {
   label = 13;
   break L1;
   break;
  }
  default: {
  }
  }
 }
 if ((label|0) == 3) {
  $43 = HEAP32[(4448)>>2]|0;
  $44 = $2;
  $45 = ($43|0)!=($44|0);
  if ($45) {
   $46 = $name;
   $47 = HEAP32[(4448)>>2]|0;
   $48 = $3;
   $49 = (($48) + ($47<<2)|0);
   $50 = HEAP32[$49>>2]|0;
   $vararg_ptr3 = ($vararg_buffer1);
   HEAP32[$vararg_ptr3>>2] = $46;
   $vararg_ptr4 = (($vararg_buffer1) + 4|0);
   HEAP32[$vararg_ptr4>>2] = $50;
   (_printf(((2128)|0),($vararg_buffer1|0))|0);
   $51 = $name;
   $vararg_ptr7 = ($vararg_buffer5);
   HEAP32[$vararg_ptr7>>2] = $51;
   (_printf(((2088)|0),($vararg_buffer5|0))|0);
   _exit(1);
   // unreachable;
  }
  HEAP32[$preferred_alignment>>2] = 16;
  $52 = (_clGetPlatformIDs(0,(0|0),($num_platforms|0))|0);
  HEAP32[$rc>>2] = $52;
  $53 = HEAP32[$rc>>2]|0;
  $54 = ($53|0)!=(0);
  if ($54) {
   $55 = HEAP32[$rc>>2]|0;
   $vararg_ptr10 = ($vararg_buffer8);
   HEAP32[$vararg_ptr10>>2] = (2184);
   $vararg_ptr11 = (($vararg_buffer8) + 4|0);
   HEAP32[$vararg_ptr11>>2] = $55;
   (_printf(((2160)|0),($vararg_buffer8|0))|0);
  }
  $56 = $platform;
  $57 = HEAP32[$preferred_alignment>>2]|0;
  $58 = HEAP32[$num_platforms>>2]|0;
  $59 = ($58*28)|0;
  (_posix_memalign($56,$57,$59)|0);
  $60 = HEAP32[$platform>>2]|0;
  $61 = ($60|0)==(0|0);
  if ($61) {
   $62 = HEAP32[$num_platforms>>2]|0;
   $63 = ($62*28)|0;
   $vararg_ptr14 = ($vararg_buffer12);
   $64 = $vararg_ptr14;
   $65 = $64;
   HEAP32[$65>>2] = $63;
   $66 = (($64) + 4)|0;
   $67 = $66;
   HEAP32[$67>>2] = 0;
   $vararg_ptr15 = (($vararg_buffer12) + 8|0);
   HEAP32[$vararg_ptr15>>2] = (2256);
   (_printf(((2216)|0),($vararg_buffer12|0))|0);
   _exit(1);
   // unreachable;
  }
  $68 = $buffer;
  $69 = HEAP32[$preferred_alignment>>2]|0;
  $70 = HEAP32[$num_platforms>>2]|0;
  $71 = $70<<2;
  (_posix_memalign($68,$69,$71)|0);
  $72 = HEAP32[$buffer>>2]|0;
  $73 = ($72|0)==(0|0);
  if ($73) {
   $74 = HEAP32[$num_platforms>>2]|0;
   $75 = $74<<2;
   $vararg_ptr18 = ($vararg_buffer16);
   $76 = $vararg_ptr18;
   $77 = $76;
   HEAP32[$77>>2] = $75;
   $78 = (($76) + 4)|0;
   $79 = $78;
   HEAP32[$79>>2] = 0;
   $vararg_ptr19 = (($vararg_buffer16) + 8|0);
   HEAP32[$vararg_ptr19>>2] = (2272);
   (_printf(((2216)|0),($vararg_buffer16|0))|0);
   _exit(1);
   // unreachable;
  }
  $80 = $temp_platform_id_array;
  $81 = HEAP32[$preferred_alignment>>2]|0;
  $82 = HEAP32[$num_platforms>>2]|0;
  $83 = $82<<2;
  (_posix_memalign($80,$81,$83)|0);
  $84 = HEAP32[$temp_platform_id_array>>2]|0;
  $85 = ($84|0)==(0|0);
  if ($85) {
   $86 = HEAP32[$num_platforms>>2]|0;
   $87 = $86<<2;
   $vararg_ptr22 = ($vararg_buffer20);
   $88 = $vararg_ptr22;
   $89 = $88;
   HEAP32[$89>>2] = $87;
   $90 = (($88) + 4)|0;
   $91 = $90;
   HEAP32[$91>>2] = 0;
   $vararg_ptr23 = (($vararg_buffer20) + 8|0);
   HEAP32[$vararg_ptr23>>2] = (2280);
   (_printf(((2216)|0),($vararg_buffer20|0))|0);
   _exit(1);
   // unreachable;
  }
  $92 = HEAP32[$num_platforms>>2]|0;
  $93 = HEAP32[$temp_platform_id_array>>2]|0;
  $94 = (_clGetPlatformIDs(($92|0),($93|0),(0|0))|0);
  HEAP32[$rc>>2] = $94;
  $95 = HEAP32[$rc>>2]|0;
  $96 = ($95|0)!=(0);
  if ($96) {
   $97 = HEAP32[$rc>>2]|0;
   $vararg_ptr26 = ($vararg_buffer24);
   HEAP32[$vararg_ptr26>>2] = (2304);
   $vararg_ptr27 = (($vararg_buffer24) + 4|0);
   HEAP32[$vararg_ptr27>>2] = $97;
   (_printf(((2160)|0),($vararg_buffer24|0))|0);
  }
  $i = 0;
  while(1) {
   $98 = $i;
   $99 = HEAP32[$num_platforms>>2]|0;
   $100 = ($98>>>0)<($99>>>0);
   if (!($100)) {
    break;
   }
   $101 = $i;
   $102 = HEAP32[$temp_platform_id_array>>2]|0;
   $103 = (($102) + ($101<<2)|0);
   $104 = HEAP32[$103>>2]|0;
   $105 = $i;
   $106 = HEAP32[$platform>>2]|0;
   $107 = (($106) + (($105*28)|0)|0);
   $108 = (($107) + 4|0);
   HEAP32[$108>>2] = $104;
   $109 = $i;
   $110 = (($109) + 1)|0;
   $i = $110;
  }
  $111 = HEAP32[$temp_platform_id_array>>2]|0;
  $112 = $111;
  _free($112);
  (_printf(((2336)|0),($vararg_buffer28|0))|0);
  (_printf(((2352)|0),($vararg_buffer30|0))|0);
  $i = 0;
  while(1) {
   $113 = $i;
   $114 = $2;
   $115 = ($113>>>0)<($114>>>0);
   if (!($115)) {
    break;
   }
   $116 = $i;
   $117 = $3;
   $118 = (($117) + ($116<<2)|0);
   $119 = HEAP32[$118>>2]|0;
   $vararg_ptr34 = ($vararg_buffer32);
   HEAP32[$vararg_ptr34>>2] = $119;
   (_printf(((2368)|0),($vararg_buffer32|0))|0);
   $120 = $i;
   $121 = (($120) + 1)|0;
   $i = $121;
  }
  (_printf(((944)|0),($vararg_buffer35|0))|0);
  $i = 0;
  while(1) {
   $122 = $i;
   $123 = HEAP32[$num_platforms>>2]|0;
   $124 = ($122>>>0)<($123>>>0);
   if (!($124)) {
    label = 59;
    break;
   }
   $125 = $i;
   $126 = HEAP32[$platform>>2]|0;
   $127 = (($126) + (($125*28)|0)|0);
   $128 = (($127) + 4|0);
   $129 = HEAP32[$128>>2]|0;
   $130 = (_clGetPlatformInfo(($129|0),2306,0,(0|0),($param_value_size_ret|0))|0);
   HEAP32[$rc>>2] = $130;
   $131 = HEAP32[$rc>>2]|0;
   $132 = ($131|0)!=(0);
   if ($132) {
    $133 = HEAP32[$rc>>2]|0;
    $vararg_ptr39 = ($vararg_buffer37);
    HEAP32[$vararg_ptr39>>2] = (2376);
    $vararg_ptr40 = (($vararg_buffer37) + 4|0);
    HEAP32[$vararg_ptr40>>2] = $133;
    (_printf(((2160)|0),($vararg_buffer37|0))|0);
   }
   $134 = $i;
   $135 = HEAP32[$platform>>2]|0;
   $136 = (($135) + (($134*28)|0)|0);
   $137 = ($136);
   $138 = HEAP32[$preferred_alignment>>2]|0;
   $139 = HEAP32[$param_value_size_ret>>2]|0;
   (_posix_memalign($137,$138,$139)|0);
   $140 = $i;
   $141 = HEAP32[$platform>>2]|0;
   $142 = (($141) + (($140*28)|0)|0);
   $143 = ($142);
   $144 = HEAP32[$143>>2]|0;
   $145 = ($144|0)==(0|0);
   if ($145) {
    label = 40;
    break;
   }
   $151 = $i;
   $152 = HEAP32[$platform>>2]|0;
   $153 = (($152) + (($151*28)|0)|0);
   $154 = (($153) + 4|0);
   $155 = HEAP32[$154>>2]|0;
   $156 = HEAP32[$param_value_size_ret>>2]|0;
   $157 = $i;
   $158 = HEAP32[$platform>>2]|0;
   $159 = (($158) + (($157*28)|0)|0);
   $160 = ($159);
   $161 = HEAP32[$160>>2]|0;
   $162 = (_clGetPlatformInfo(($155|0),2306,($156|0),($161|0),(0|0))|0);
   HEAP32[$rc>>2] = $162;
   $163 = HEAP32[$rc>>2]|0;
   $164 = ($163|0)!=(0);
   if ($164) {
    $165 = HEAP32[$rc>>2]|0;
    $vararg_ptr47 = ($vararg_buffer45);
    HEAP32[$vararg_ptr47>>2] = (2440);
    $vararg_ptr48 = (($vararg_buffer45) + 4|0);
    HEAP32[$vararg_ptr48>>2] = $165;
    (_printf(((2160)|0),($vararg_buffer45|0))|0);
   }
   $166 = $i;
   $167 = HEAP32[$platform>>2]|0;
   $168 = (($167) + (($166*28)|0)|0);
   $169 = (($168) + 4|0);
   $170 = HEAP32[$169>>2]|0;
   $171 = $i;
   $172 = HEAP32[$platform>>2]|0;
   $173 = (($172) + (($171*28)|0)|0);
   $174 = (($173) + 8|0);
   $175 = (_clGetDeviceIDs(($170|0),-1,0,0,(0|0),($174|0))|0);
   HEAP32[$rc>>2] = $175;
   $176 = HEAP32[$rc>>2]|0;
   $177 = ($176|0)!=(0);
   if ($177) {
    $178 = HEAP32[$rc>>2]|0;
    $vararg_ptr51 = ($vararg_buffer49);
    HEAP32[$vararg_ptr51>>2] = (2480);
    $vararg_ptr52 = (($vararg_buffer49) + 4|0);
    HEAP32[$vararg_ptr52>>2] = $178;
    (_printf(((2160)|0),($vararg_buffer49|0))|0);
   }
   $179 = $i;
   $180 = HEAP32[$platform>>2]|0;
   $181 = (($180) + (($179*28)|0)|0);
   $182 = (($181) + 12|0);
   $183 = $182;
   $184 = HEAP32[$preferred_alignment>>2]|0;
   $185 = $i;
   $186 = HEAP32[$platform>>2]|0;
   $187 = (($186) + (($185*28)|0)|0);
   $188 = (($187) + 8|0);
   $189 = HEAP32[$188>>2]|0;
   $190 = ($189*24)|0;
   (_posix_memalign($183,$184,$190)|0);
   $191 = $i;
   $192 = HEAP32[$platform>>2]|0;
   $193 = (($192) + (($191*28)|0)|0);
   $194 = (($193) + 12|0);
   $195 = HEAP32[$194>>2]|0;
   $196 = ($195|0)==(0|0);
   if ($196) {
    label = 46;
    break;
   }
   $207 = $tmpdevices;
   $208 = HEAP32[$preferred_alignment>>2]|0;
   $209 = $i;
   $210 = HEAP32[$platform>>2]|0;
   $211 = (($210) + (($209*28)|0)|0);
   $212 = (($211) + 8|0);
   $213 = HEAP32[$212>>2]|0;
   $214 = $213<<2;
   (_posix_memalign($207,$208,$214)|0);
   $215 = HEAP32[$tmpdevices>>2]|0;
   $216 = ($215|0)==(0|0);
   if ($216) {
    label = 48;
    break;
   }
   $227 = $i;
   $228 = HEAP32[$platform>>2]|0;
   $229 = (($228) + (($227*28)|0)|0);
   $230 = (($229) + 4|0);
   $231 = HEAP32[$230>>2]|0;
   $232 = $i;
   $233 = HEAP32[$platform>>2]|0;
   $234 = (($233) + (($232*28)|0)|0);
   $235 = (($234) + 8|0);
   $236 = HEAP32[$235>>2]|0;
   $237 = HEAP32[$tmpdevices>>2]|0;
   $238 = (_clGetDeviceIDs(($231|0),-1,0,($236|0),($237|0),(0|0))|0);
   HEAP32[$rc>>2] = $238;
   $239 = HEAP32[$rc>>2]|0;
   $240 = ($239|0)!=(0);
   if ($240) {
    $241 = HEAP32[$rc>>2]|0;
    $vararg_ptr63 = ($vararg_buffer61);
    HEAP32[$vararg_ptr63>>2] = (2560);
    $vararg_ptr64 = (($vararg_buffer61) + 4|0);
    HEAP32[$vararg_ptr64>>2] = $241;
    (_printf(((2160)|0),($vararg_buffer61|0))|0);
   }
   $j = 0;
   while(1) {
    $242 = $j;
    $243 = $i;
    $244 = HEAP32[$platform>>2]|0;
    $245 = (($244) + (($243*28)|0)|0);
    $246 = (($245) + 8|0);
    $247 = HEAP32[$246>>2]|0;
    $248 = ($242>>>0)<($247>>>0);
    if (!($248)) {
     break;
    }
    $249 = $j;
    $250 = HEAP32[$tmpdevices>>2]|0;
    $251 = (($250) + ($249<<2)|0);
    $252 = HEAP32[$251>>2]|0;
    $253 = $j;
    $254 = $i;
    $255 = HEAP32[$platform>>2]|0;
    $256 = (($255) + (($254*28)|0)|0);
    $257 = (($256) + 12|0);
    $258 = HEAP32[$257>>2]|0;
    $259 = (($258) + (($253*24)|0)|0);
    $260 = ($259);
    HEAP32[$260>>2] = $252;
    $261 = $j;
    $262 = $i;
    $263 = HEAP32[$platform>>2]|0;
    $264 = (($263) + (($262*28)|0)|0);
    $265 = (($264) + 12|0);
    $266 = HEAP32[$265>>2]|0;
    $267 = (($266) + (($261*24)|0)|0);
    $268 = ($267);
    $269 = HEAP32[$268>>2]|0;
    $270 = $j;
    $271 = $i;
    $272 = HEAP32[$platform>>2]|0;
    $273 = (($272) + (($271*28)|0)|0);
    $274 = (($273) + 12|0);
    $275 = HEAP32[$274>>2]|0;
    $276 = (($275) + (($270*24)|0)|0);
    $277 = (($276) + 8|0);
    $278 = $277;
    $279 = (_clGetDeviceInfo(($269|0),4096,8,($278|0),(0|0))|0);
    HEAP32[$rc>>2] = $279;
    $280 = HEAP32[$rc>>2]|0;
    $281 = ($280|0)!=(0);
    if ($281) {
     $282 = HEAP32[$rc>>2]|0;
     $vararg_ptr67 = ($vararg_buffer65);
     HEAP32[$vararg_ptr67>>2] = (2600);
     $vararg_ptr68 = (($vararg_buffer65) + 4|0);
     HEAP32[$vararg_ptr68>>2] = $282;
     (_printf(((2160)|0),($vararg_buffer65|0))|0);
    }
    $283 = $j;
    $284 = (($283) + 1)|0;
    $j = $284;
   }
   $285 = HEAP32[$tmpdevices>>2]|0;
   $286 = $285;
   _free($286);
   $287 = $i;
   $288 = (($287) + 1)|0;
   $i = $288;
  }
  if ((label|0) == 40) {
   $146 = HEAP32[$param_value_size_ret>>2]|0;
   $vararg_ptr43 = ($vararg_buffer41);
   $147 = $vararg_ptr43;
   $148 = $147;
   HEAP32[$148>>2] = $146;
   $149 = (($147) + 4)|0;
   $150 = $149;
   HEAP32[$150>>2] = 0;
   $vararg_ptr44 = (($vararg_buffer41) + 8|0);
   HEAP32[$vararg_ptr44>>2] = (2424);
   (_printf(((2216)|0),($vararg_buffer41|0))|0);
   _exit(1);
   // unreachable;
  }
  else if ((label|0) == 46) {
   $197 = $i;
   $198 = HEAP32[$platform>>2]|0;
   $199 = (($198) + (($197*28)|0)|0);
   $200 = (($199) + 8|0);
   $201 = HEAP32[$200>>2]|0;
   $202 = ($201*24)|0;
   $vararg_ptr55 = ($vararg_buffer53);
   $203 = $vararg_ptr55;
   $204 = $203;
   HEAP32[$204>>2] = $202;
   $205 = (($203) + 4)|0;
   $206 = $205;
   HEAP32[$206>>2] = 0;
   $vararg_ptr56 = (($vararg_buffer53) + 8|0);
   HEAP32[$vararg_ptr56>>2] = (2520);
   (_printf(((2216)|0),($vararg_buffer53|0))|0);
   _exit(1);
   // unreachable;
  }
  else if ((label|0) == 48) {
   $217 = $i;
   $218 = HEAP32[$platform>>2]|0;
   $219 = (($218) + (($217*28)|0)|0);
   $220 = (($219) + 8|0);
   $221 = HEAP32[$220>>2]|0;
   $222 = $221<<2;
   $vararg_ptr59 = ($vararg_buffer57);
   $223 = $vararg_ptr59;
   $224 = $223;
   HEAP32[$224>>2] = $222;
   $225 = (($223) + 4)|0;
   $226 = $225;
   HEAP32[$226>>2] = 0;
   $vararg_ptr60 = (($vararg_buffer57) + 8|0);
   HEAP32[$vararg_ptr60>>2] = (2544);
   (_printf(((2216)|0),($vararg_buffer57|0))|0);
   _exit(1);
   // unreachable;
  }
  else if ((label|0) == 59) {
   $289 = (1736);
   $290 = $289;
   $291 = HEAP32[$290>>2]|0;
   $292 = (($289) + 4)|0;
   $293 = $292;
   $294 = HEAP32[$293>>2]|0;
   $295 = ($291|0)==(1);
   $296 = ($294|0)==(0);
   $297 = $295 & $296;
   do {
    if ($297) {
     $accel_found = 0;
     $i = 0;
     while(1) {
      $298 = $i;
      $299 = HEAP32[$num_platforms>>2]|0;
      $300 = ($298>>>0)<($299>>>0);
      if (!($300)) {
       break;
      }
      $j = 0;
      while(1) {
       $301 = $j;
       $302 = $i;
       $303 = HEAP32[$platform>>2]|0;
       $304 = (($303) + (($302*28)|0)|0);
       $305 = (($304) + 8|0);
       $306 = HEAP32[$305>>2]|0;
       $307 = ($301>>>0)<($306>>>0);
       if (!($307)) {
        break;
       }
       $308 = $j;
       $309 = $i;
       $310 = HEAP32[$platform>>2]|0;
       $311 = (($310) + (($309*28)|0)|0);
       $312 = (($311) + 12|0);
       $313 = HEAP32[$312>>2]|0;
       $314 = (($313) + (($308*24)|0)|0);
       $315 = (($314) + 8|0);
       $316 = $315;
       $317 = $316;
       $318 = HEAP32[$317>>2]|0;
       $319 = (($316) + 4)|0;
       $320 = $319;
       $321 = HEAP32[$320>>2]|0;
       $322 = ($318|0)==(8);
       $323 = ($321|0)==(0);
       $324 = $322 & $323;
       if ($324) {
        $accel_found = 1;
        $325 = $i;
        $pdex = $325;
        $326 = $j;
        $ddex = $326;
       }
       $327 = $j;
       $328 = (($327) + 1)|0;
       $j = $328;
      }
      $329 = $i;
      $330 = (($329) + 1)|0;
      $i = $330;
     }
     $331 = $accel_found;
     $332 = ($331|0)!=(0);
     if (!($332)) {
      $gpu_found = 0;
      $i = 0;
      while(1) {
       $333 = $i;
       $334 = HEAP32[$num_platforms>>2]|0;
       $335 = ($333>>>0)<($334>>>0);
       if (!($335)) {
        break;
       }
       $j = 0;
       while(1) {
        $336 = $j;
        $337 = $i;
        $338 = HEAP32[$platform>>2]|0;
        $339 = (($338) + (($337*28)|0)|0);
        $340 = (($339) + 8|0);
        $341 = HEAP32[$340>>2]|0;
        $342 = ($336>>>0)<($341>>>0);
        if (!($342)) {
         break;
        }
        $343 = $gpu_found;
        $344 = ($343|0)==(0);
        do {
         if ($344) {
          $345 = $j;
          $346 = $i;
          $347 = HEAP32[$platform>>2]|0;
          $348 = (($347) + (($346*28)|0)|0);
          $349 = (($348) + 12|0);
          $350 = HEAP32[$349>>2]|0;
          $351 = (($350) + (($345*24)|0)|0);
          $352 = (($351) + 8|0);
          $353 = $352;
          $354 = $353;
          $355 = HEAP32[$354>>2]|0;
          $356 = (($353) + 4)|0;
          $357 = $356;
          $358 = HEAP32[$357>>2]|0;
          $359 = ($355|0)==(4);
          $360 = ($358|0)==(0);
          $361 = $359 & $360;
          if (!($361)) {
           break;
          }
          $gpu_found = 1;
          $362 = $i;
          $pdex = $362;
          $363 = $j;
          $ddex = $363;
         }
        } while(0);
        $364 = $j;
        $365 = (($364) + 1)|0;
        $j = $365;
       }
       $366 = $i;
       $367 = (($366) + 1)|0;
       $i = $367;
      }
      $368 = $gpu_found;
      $369 = ($368|0)!=(0);
      do {
       if (!($369)) {
        $cpu_found = 0;
        $i = 0;
        while(1) {
         $370 = $i;
         $371 = HEAP32[$num_platforms>>2]|0;
         $372 = ($370>>>0)<($371>>>0);
         if (!($372)) {
          break;
         }
         $j = 0;
         while(1) {
          $373 = $j;
          $374 = $i;
          $375 = HEAP32[$platform>>2]|0;
          $376 = (($375) + (($374*28)|0)|0);
          $377 = (($376) + 8|0);
          $378 = HEAP32[$377>>2]|0;
          $379 = ($373>>>0)<($378>>>0);
          if (!($379)) {
           break;
          }
          $380 = $j;
          $381 = $i;
          $382 = HEAP32[$platform>>2]|0;
          $383 = (($382) + (($381*28)|0)|0);
          $384 = (($383) + 12|0);
          $385 = HEAP32[$384>>2]|0;
          $386 = (($385) + (($380*24)|0)|0);
          $387 = (($386) + 8|0);
          $388 = $387;
          $389 = $388;
          $390 = HEAP32[$389>>2]|0;
          $391 = (($388) + 4)|0;
          $392 = $391;
          $393 = HEAP32[$392>>2]|0;
          $394 = ($390|0)==(2);
          $395 = ($393|0)==(0);
          $396 = $394 & $395;
          if ($396) {
           $cpu_found = 1;
           $397 = $i;
           $pdex = $397;
           $398 = $j;
           $ddex = $398;
          }
          $399 = $j;
          $400 = (($399) + 1)|0;
          $j = $400;
         }
         $401 = $i;
         $402 = (($401) + 1)|0;
         $i = $402;
        }
        $403 = $cpu_found;
        $404 = ($403|0)!=(0);
        if ($404) {
         break;
        } else {
         $405 = HEAP32[(_stderr)>>2]|0;
         (_fprintf(($405|0),((2632)|0),($vararg_buffer69|0))|0);
         $406 = HEAP32[(_stderr)>>2]|0;
         (_fflush(($406|0))|0);
         _exit(1);
         // unreachable;
        }
       }
      } while(0);
     }
    } else {
     $device_found = 0;
     $i = 0;
     while(1) {
      $407 = $i;
      $408 = HEAP32[$num_platforms>>2]|0;
      $409 = ($407>>>0)<($408>>>0);
      if (!($409)) {
       break;
      }
      $j = 0;
      while(1) {
       $410 = $j;
       $411 = $i;
       $412 = HEAP32[$platform>>2]|0;
       $413 = (($412) + (($411*28)|0)|0);
       $414 = (($413) + 8|0);
       $415 = HEAP32[$414>>2]|0;
       $416 = ($410>>>0)<($415>>>0);
       if (!($416)) {
        break;
       }
       $417 = $j;
       $418 = $i;
       $419 = HEAP32[$platform>>2]|0;
       $420 = (($419) + (($418*28)|0)|0);
       $421 = (($420) + 12|0);
       $422 = HEAP32[$421>>2]|0;
       $423 = (($422) + (($417*24)|0)|0);
       $424 = (($423) + 8|0);
       $425 = $424;
       $426 = $425;
       $427 = HEAP32[$426>>2]|0;
       $428 = (($425) + 4)|0;
       $429 = $428;
       $430 = HEAP32[$429>>2]|0;
       $431 = (1736);
       $432 = $431;
       $433 = HEAP32[$432>>2]|0;
       $434 = (($431) + 4)|0;
       $435 = $434;
       $436 = HEAP32[$435>>2]|0;
       $437 = ($427|0)==($433|0);
       $438 = ($430|0)==($436|0);
       $439 = $437 & $438;
       if ($439) {
        $device_found = 1;
        $440 = $i;
        $pdex = $440;
        $441 = $j;
        $ddex = $441;
       }
       $442 = $j;
       $443 = (($442) + 1)|0;
       $j = $443;
      }
      $444 = $i;
      $445 = (($444) + 1)|0;
      $i = $445;
     }
     $446 = $device_found;
     $447 = ($446|0)==(0);
     if ($447) {
      $448 = HEAP32[(_stderr)>>2]|0;
      (_fprintf(($448|0),((2696)|0),($vararg_buffer71|0))|0);
      $449 = HEAP32[(_stderr)>>2]|0;
      (_fflush(($449|0))|0);
      _exit(1);
      // unreachable;
     } else {
      break;
     }
    }
   } while(0);
   $450 = HEAP32[(1744)>>2]|0;
   $451 = ($450|0)==(0);
   if ($451) {
    $452 = $ddex;
    $453 = $pdex;
    $454 = HEAP32[$platform>>2]|0;
    $455 = (($454) + (($453*28)|0)|0);
    $456 = (($455) + 12|0);
    $457 = HEAP32[$456>>2]|0;
    $458 = (($457) + (($452*24)|0)|0);
    $459 = (($458) + 8|0);
    $460 = $459;
    $461 = $460;
    $462 = HEAP32[$461>>2]|0;
    $463 = (($460) + 4)|0;
    $464 = $463;
    $465 = HEAP32[$464>>2]|0;
    $466 = ($462|0)==(8);
    $467 = ($465|0)==(0);
    $468 = $466 & $467;
    $469 = $468 ? 2 : 1;
    HEAP32[(1744)>>2] = $469;
   }
   $470 = ($properties);
   HEAP32[$470>>2] = 4228;
   $471 = $pdex;
   $472 = HEAP32[$platform>>2]|0;
   $473 = (($472) + (($471*28)|0)|0);
   $474 = (($473) + 4|0);
   $475 = HEAP32[$474>>2]|0;
   $476 = $475;
   $477 = (($properties) + 4|0);
   HEAP32[$477>>2] = $476;
   $478 = (($properties) + 8|0);
   HEAP32[$478>>2] = 0;
   $479 = ($properties);
   $480 = $ddex;
   $481 = $pdex;
   $482 = HEAP32[$platform>>2]|0;
   $483 = (($482) + (($481*28)|0)|0);
   $484 = (($483) + 12|0);
   $485 = HEAP32[$484>>2]|0;
   $486 = (($485) + (($480*24)|0)|0);
   $487 = ($486);
   $488 = (_clCreateContext(($479|0),1,($487|0),(0|0),(0|0),($rc|0))|0);
   $489 = $pdex;
   $490 = HEAP32[$platform>>2]|0;
   $491 = (($490) + (($489*28)|0)|0);
   $492 = (($491) + 16|0);
   HEAP32[$492>>2] = $488;
   $493 = HEAP32[$rc>>2]|0;
   $494 = ($493|0)!=(0);
   if ($494) {
    $495 = HEAP32[$rc>>2]|0;
    $vararg_ptr75 = ($vararg_buffer73);
    HEAP32[$vararg_ptr75>>2] = (2776);
    $vararg_ptr76 = (($vararg_buffer73) + 4|0);
    HEAP32[$vararg_ptr76>>2] = $495;
    (_printf(((2160)|0),($vararg_buffer73|0))|0);
   }
   $496 = HEAP32[(1744)>>2]|0;
   if ((($496|0) == 1)) {
    $497 = ($kernel_name);
    $498 = ($kernel_name_LS);
    (_strcpy(($497|0),($498|0))|0);
   } else if ((($496|0) == 2)) {
    $499 = ($kernel_name);
    $500 = ($kernel_name_AWGC);
    (_strcpy(($499|0),($500|0))|0);
   }
   $501 = ($kernel_source_file);
   $502 = (__ZL19load_program_sourcePKc($501)|0);
   HEAP32[$kernel_source>>2] = $502;
   $503 = HEAP32[$kernel_source>>2]|0;
   $504 = ($503|0)==(0|0);
   if ($504) {
    $505 = HEAP32[(_stderr)>>2]|0;
    (_fprintf(($505|0),((2792)|0),($vararg_buffer77|0))|0);
    _exit(1);
    // unreachable;
   }
   $506 = $pdex;
   $507 = HEAP32[$platform>>2]|0;
   $508 = (($507) + (($506*28)|0)|0);
   $509 = (($508) + 16|0);
   $510 = HEAP32[$509>>2]|0;
   $511 = (_clCreateProgramWithSource(($510|0),1,($kernel_source|0),(0|0),($rc|0))|0);
   $512 = $pdex;
   $513 = HEAP32[$platform>>2]|0;
   $514 = (($513) + (($512*28)|0)|0);
   $515 = (($514) + 20|0);
   HEAP32[$515>>2] = $511;
   $516 = HEAP32[$rc>>2]|0;
   $517 = ($516|0)!=(0);
   if ($517) {
    $518 = HEAP32[$rc>>2]|0;
    $vararg_ptr81 = ($vararg_buffer79);
    HEAP32[$vararg_ptr81>>2] = (2848);
    $vararg_ptr82 = (($vararg_buffer79) + 4|0);
    HEAP32[$vararg_ptr82>>2] = $518;
    (_printf(((2160)|0),($vararg_buffer79|0))|0);
   }
   $519 = HEAP32[$kernel_source>>2]|0;
   _free($519);
   $520 = $pdex;
   $521 = HEAP32[$platform>>2]|0;
   $522 = (($521) + (($520*28)|0)|0);
   $523 = (($522) + 20|0);
   $524 = HEAP32[$523>>2]|0;
   $525 = $ddex;
   $526 = $pdex;
   $527 = HEAP32[$platform>>2]|0;
   $528 = (($527) + (($526*28)|0)|0);
   $529 = (($528) + 12|0);
   $530 = HEAP32[$529>>2]|0;
   $531 = (($530) + (($525*24)|0)|0);
   $532 = ($531);
   $533 = (_clBuildProgram(($524|0),1,($532|0),((2880)|0),(0|0),(0|0))|0);
   HEAP32[$rc>>2] = $533;
   $534 = HEAP32[$rc>>2]|0;
   $535 = ($534|0)!=(0);
   if ($535) {
    $536 = HEAP32[$rc>>2]|0;
    $vararg_ptr85 = ($vararg_buffer83);
    HEAP32[$vararg_ptr85>>2] = (2888);
    $vararg_ptr86 = (($vararg_buffer83) + 4|0);
    HEAP32[$vararg_ptr86>>2] = $536;
    (_printf(((2160)|0),($vararg_buffer83|0))|0);
   }
   $537 = $pdex;
   $538 = HEAP32[$platform>>2]|0;
   $539 = (($538) + (($537*28)|0)|0);
   $540 = (($539) + 20|0);
   $541 = HEAP32[$540>>2]|0;
   $542 = ($kernel_name);
   $543 = (_clCreateKernel(($541|0),($542|0),($rc|0))|0);
   $544 = $pdex;
   $545 = HEAP32[$platform>>2]|0;
   $546 = (($545) + (($544*28)|0)|0);
   $547 = (($546) + 24|0);
   HEAP32[$547>>2] = $543;
   $548 = HEAP32[$rc>>2]|0;
   $549 = ($548|0)!=(0);
   if ($549) {
    $550 = HEAP32[$rc>>2]|0;
    $vararg_ptr89 = ($vararg_buffer87);
    HEAP32[$vararg_ptr89>>2] = (2904);
    $vararg_ptr90 = (($vararg_buffer87) + 4|0);
    HEAP32[$vararg_ptr90>>2] = $550;
    (_printf(((2160)|0),($vararg_buffer87|0))|0);
   }
   $551 = $pdex;
   $552 = HEAP32[$platform>>2]|0;
   $553 = (($552) + (($551*28)|0)|0);
   $554 = (($553) + 16|0);
   $555 = HEAP32[$554>>2]|0;
   $556 = $ddex;
   $557 = $pdex;
   $558 = HEAP32[$platform>>2]|0;
   $559 = (($558) + (($557*28)|0)|0);
   $560 = (($559) + 12|0);
   $561 = HEAP32[$560>>2]|0;
   $562 = (($561) + (($556*24)|0)|0);
   $563 = ($562);
   $564 = HEAP32[$563>>2]|0;
   $565 = (_clCreateCommandQueue(($555|0),($564|0),1,0,($rc|0))|0);
   $566 = $ddex;
   $567 = $pdex;
   $568 = HEAP32[$platform>>2]|0;
   $569 = (($568) + (($567*28)|0)|0);
   $570 = (($569) + 12|0);
   $571 = HEAP32[$570>>2]|0;
   $572 = (($571) + (($566*24)|0)|0);
   $573 = (($572) + 16|0);
   HEAP32[$573>>2] = $565;
   $574 = HEAP32[$rc>>2]|0;
   $575 = ($574|0)!=(0);
   if ($575) {
    $576 = HEAP32[$rc>>2]|0;
    $vararg_ptr93 = ($vararg_buffer91);
    HEAP32[$vararg_ptr93>>2] = (2920);
    $vararg_ptr94 = (($vararg_buffer91) + 4|0);
    HEAP32[$vararg_ptr94>>2] = $576;
    (_printf(((2160)|0),($vararg_buffer91|0))|0);
   }
   $577 = $ddex;
   $578 = $pdex;
   $579 = HEAP32[$platform>>2]|0;
   $580 = (($579) + (($578*28)|0)|0);
   $581 = (($580) + 12|0);
   $582 = HEAP32[$581>>2]|0;
   $583 = (($582) + (($577*24)|0)|0);
   $584 = ($583);
   $585 = HEAP32[$584>>2]|0;
   $586 = (_clGetDeviceInfo(($585|0),4139,0,(0|0),($param_value_size_ret|0))|0);
   HEAP32[$rc>>2] = $586;
   $587 = HEAP32[$rc>>2]|0;
   $588 = ($587|0)!=(0);
   if ($588) {
    $589 = HEAP32[$rc>>2]|0;
    $vararg_ptr97 = ($vararg_buffer95);
    HEAP32[$vararg_ptr97>>2] = (2944);
    $vararg_ptr98 = (($vararg_buffer95) + 4|0);
    HEAP32[$vararg_ptr98>>2] = $589;
    (_printf(((2160)|0),($vararg_buffer95|0))|0);
   }
   $590 = $ddex;
   $591 = $pdex;
   $592 = HEAP32[$platform>>2]|0;
   $593 = (($592) + (($591*28)|0)|0);
   $594 = (($593) + 12|0);
   $595 = HEAP32[$594>>2]|0;
   $596 = (($595) + (($590*24)|0)|0);
   $597 = (($596) + 20|0);
   $598 = HEAP32[$preferred_alignment>>2]|0;
   $599 = HEAP32[$param_value_size_ret>>2]|0;
   (_posix_memalign($597,$598,$599)|0);
   $600 = $ddex;
   $601 = $pdex;
   $602 = HEAP32[$platform>>2]|0;
   $603 = (($602) + (($601*28)|0)|0);
   $604 = (($603) + 12|0);
   $605 = HEAP32[$604>>2]|0;
   $606 = (($605) + (($600*24)|0)|0);
   $607 = (($606) + 20|0);
   $608 = HEAP32[$607>>2]|0;
   $609 = ($608|0)==(0|0);
   if ($609) {
    $610 = HEAP32[$param_value_size_ret>>2]|0;
    $vararg_ptr101 = ($vararg_buffer99);
    $611 = $vararg_ptr101;
    $612 = $611;
    HEAP32[$612>>2] = $610;
    $613 = (($611) + 4)|0;
    $614 = $613;
    HEAP32[$614>>2] = 0;
    $vararg_ptr102 = (($vararg_buffer99) + 8|0);
    HEAP32[$vararg_ptr102>>2] = (2984);
    (_printf(((2216)|0),($vararg_buffer99|0))|0);
    _exit(1);
    // unreachable;
   }
   $615 = $ddex;
   $616 = $pdex;
   $617 = HEAP32[$platform>>2]|0;
   $618 = (($617) + (($616*28)|0)|0);
   $619 = (($618) + 12|0);
   $620 = HEAP32[$619>>2]|0;
   $621 = (($620) + (($615*24)|0)|0);
   $622 = ($621);
   $623 = HEAP32[$622>>2]|0;
   $624 = HEAP32[$param_value_size_ret>>2]|0;
   $625 = $ddex;
   $626 = $pdex;
   $627 = HEAP32[$platform>>2]|0;
   $628 = (($627) + (($626*28)|0)|0);
   $629 = (($628) + 12|0);
   $630 = HEAP32[$629>>2]|0;
   $631 = (($630) + (($625*24)|0)|0);
   $632 = (($631) + 20|0);
   $633 = HEAP32[$632>>2]|0;
   $634 = (_clGetDeviceInfo(($623|0),4139,($624|0),($633|0),(0|0))|0);
   HEAP32[$rc>>2] = $634;
   $635 = HEAP32[$rc>>2]|0;
   $636 = ($635|0)!=(0);
   if ($636) {
    $637 = HEAP32[$rc>>2]|0;
    $vararg_ptr105 = ($vararg_buffer103);
    HEAP32[$vararg_ptr105>>2] = (3000);
    $vararg_ptr106 = (($vararg_buffer103) + 4|0);
    HEAP32[$vararg_ptr106>>2] = $637;
    (_printf(((2160)|0),($vararg_buffer103|0))|0);
   }
   $638 = HEAP32[(1744)>>2]|0;
   $639 = ($638|0)==(1);
   $640 = $639 ? (3072) : (3088);
   $641 = $ddex;
   $642 = $pdex;
   $643 = HEAP32[$platform>>2]|0;
   $644 = (($643) + (($642*28)|0)|0);
   $645 = (($644) + 12|0);
   $646 = HEAP32[$645>>2]|0;
   $647 = (($646) + (($641*24)|0)|0);
   $648 = (($647) + 20|0);
   $649 = HEAP32[$648>>2]|0;
   $vararg_ptr109 = ($vararg_buffer107);
   HEAP32[$vararg_ptr109>>2] = $640;
   $vararg_ptr110 = (($vararg_buffer107) + 4|0);
   HEAP32[$vararg_ptr110>>2] = $649;
   (_printf(((3032)|0),($vararg_buffer107|0))|0);
   $650 = $ddex;
   $651 = $pdex;
   $652 = HEAP32[$platform>>2]|0;
   $653 = (($652) + (($651*28)|0)|0);
   $654 = (($653) + 12|0);
   $655 = HEAP32[$654>>2]|0;
   $656 = (($655) + (($650*24)|0)|0);
   $657 = ($656);
   $658 = HEAP32[$657>>2]|0;
   $659 = $preferred_alignment;
   $660 = (_clGetDeviceInfo(($658|0),4121,4,($659|0),(0|0))|0);
   HEAP32[$rc>>2] = $660;
   $661 = HEAP32[$rc>>2]|0;
   $662 = ($661|0)!=(0);
   if ($662) {
    $663 = HEAP32[$rc>>2]|0;
    $vararg_ptr113 = ($vararg_buffer111);
    HEAP32[$vararg_ptr113>>2] = (3104);
    $vararg_ptr114 = (($vararg_buffer111) + 4|0);
    HEAP32[$vararg_ptr114>>2] = $663;
    (_printf(((2160)|0),($vararg_buffer111|0))|0);
   }
   $664 = HEAP32[$preferred_alignment>>2]|0;
   $665 = ($664>>>0)>(1024);
   if ($665) {
    HEAP32[$preferred_alignment>>2] = 1024;
   }
   $666 = HEAP32[$preferred_alignment>>2]|0;
   $667 = (($666>>>0) / 8)&-1;
   HEAP32[$preferred_alignment>>2] = $667;
   $668 = $ddex;
   $669 = $pdex;
   $670 = HEAP32[$platform>>2]|0;
   $671 = (($670) + (($669*28)|0)|0);
   $672 = (($671) + 12|0);
   $673 = HEAP32[$672>>2]|0;
   $674 = (($673) + (($668*24)|0)|0);
   $675 = ($674);
   $676 = HEAP32[$675>>2]|0;
   $677 = $command_queue_properties;
   (_clGetDeviceInfo(($676|0),4138,8,($677|0),(0|0))|0);
   $678 = $command_queue_properties;
   $679 = $678;
   $680 = HEAP32[$679>>2]|0;
   $681 = (($678) + 4)|0;
   $682 = $681;
   u$0 = HEAP32[$682>>2]|0;
   $683 = $680 & 1;
   $684 = $command_queue_properties;
   $685 = $684;
   HEAP32[$685>>2] = $683;
   $686 = (($684) + 4)|0;
   $687 = $686;
   HEAP32[$687>>2] = 0;
   $688 = $pdex;
   $689 = HEAP32[$platform>>2]|0;
   $690 = (($689) + (($688*28)|0)|0);
   $691 = (($690) + 24|0);
   $692 = HEAP32[$691>>2]|0;
   $693 = $ddex;
   $694 = $pdex;
   $695 = HEAP32[$platform>>2]|0;
   $696 = (($695) + (($694*28)|0)|0);
   $697 = (($696) + 12|0);
   $698 = HEAP32[$697>>2]|0;
   $699 = (($698) + (($693*24)|0)|0);
   $700 = ($699);
   $701 = HEAP32[$700>>2]|0;
   $702 = $kernel_wg_size;
   $703 = ($return_size);
   $704 = (_clGetKernelWorkGroupInfo(($692|0),($701|0),4528,4,($702|0),($703|0))|0);
   HEAP32[$rc>>2] = $704;
   $705 = HEAP32[$rc>>2]|0;
   $706 = ($705|0)!=(0);
   if ($706) {
    $707 = HEAP32[$rc>>2]|0;
    $vararg_ptr117 = ($vararg_buffer115);
    HEAP32[$vararg_ptr117>>2] = (3152);
    $vararg_ptr118 = (($vararg_buffer115) + 4|0);
    HEAP32[$vararg_ptr118>>2] = $707;
    (_printf(((2160)|0),($vararg_buffer115|0))|0);
   }
   $708 = $ddex;
   $709 = $pdex;
   $710 = HEAP32[$platform>>2]|0;
   $711 = (($710) + (($709*28)|0)|0);
   $712 = (($711) + 12|0);
   $713 = HEAP32[$712>>2]|0;
   $714 = (($713) + (($708*24)|0)|0);
   $715 = ($714);
   $716 = HEAP32[$715>>2]|0;
   $717 = $total_local_mem;
   $718 = (_clGetDeviceInfo(($716|0),4131,8,($717|0),(0|0))|0);
   HEAP32[$rc>>2] = $718;
   $719 = HEAP32[$rc>>2]|0;
   $720 = ($719|0)!=(0);
   if ($720) {
    $721 = HEAP32[$rc>>2]|0;
    $vararg_ptr121 = ($vararg_buffer119);
    HEAP32[$vararg_ptr121>>2] = (3208);
    $vararg_ptr122 = (($vararg_buffer119) + 4|0);
    HEAP32[$vararg_ptr122>>2] = $721;
    (_printf(((2160)|0),($vararg_buffer119|0))|0);
   }
   $722 = $pdex;
   $723 = HEAP32[$platform>>2]|0;
   $724 = (($723) + (($722*28)|0)|0);
   $725 = (($724) + 24|0);
   $726 = HEAP32[$725>>2]|0;
   $727 = $ddex;
   $728 = $pdex;
   $729 = HEAP32[$platform>>2]|0;
   $730 = (($729) + (($728*28)|0)|0);
   $731 = (($730) + 12|0);
   $732 = HEAP32[$731>>2]|0;
   $733 = (($732) + (($727*24)|0)|0);
   $734 = ($733);
   $735 = HEAP32[$734>>2]|0;
   $736 = $used_local_mem;
   $737 = (_clGetKernelWorkGroupInfo(($726|0),($735|0),4530,8,($736|0),(0|0))|0);
   HEAP32[$rc>>2] = $737;
   $738 = HEAP32[$rc>>2]|0;
   $739 = ($738|0)!=(0);
   if ($739) {
    $740 = HEAP32[$rc>>2]|0;
    $vararg_ptr125 = ($vararg_buffer123);
    HEAP32[$vararg_ptr125>>2] = (3256);
    $vararg_ptr126 = (($vararg_buffer123) + 4|0);
    HEAP32[$vararg_ptr126>>2] = $740;
    (_printf(((2160)|0),($vararg_buffer123|0))|0);
   }
   $741 = $total_local_mem;
   $742 = $741;
   $743 = HEAP32[$742>>2]|0;
   $744 = (($741) + 4)|0;
   $745 = $744;
   $746 = HEAP32[$745>>2]|0;
   $747 = $used_local_mem;
   $748 = $747;
   $749 = HEAP32[$748>>2]|0;
   $750 = (($747) + 4)|0;
   $751 = $750;
   $752 = HEAP32[$751>>2]|0;
   $753 = (_i64Subtract(($743|0),($746|0),($749|0),($752|0))|0);
   $754 = tempRet0;
   $755 = $local_mem_size;
   $756 = $755;
   HEAP32[$756>>2] = $753;
   $757 = (($755) + 4)|0;
   $758 = $757;
   HEAP32[$758>>2] = $754;
   $759 = $ddex;
   $760 = $pdex;
   $761 = HEAP32[$platform>>2]|0;
   $762 = (($761) + (($760*28)|0)|0);
   $763 = (($762) + 12|0);
   $764 = HEAP32[$763>>2]|0;
   $765 = (($764) + (($759*24)|0)|0);
   $766 = ($765);
   $767 = HEAP32[$766>>2]|0;
   $768 = $max_compute_units;
   (_clGetDeviceInfo(($767|0),4098,4,($768|0),(0|0))|0);
   HEAP32[$row_index_array>>2] = 0;
   HEAP32[$x_index_array>>2] = 0;
   HEAP32[$data_array>>2] = 0;
   $769 = ($mgs);
   HEAP32[$769>>2] = $matrix_header;
   $770 = (($mgs) + 4|0);
   HEAP32[$770>>2] = $seg_workspace;
   $771 = (($mgs) + 8|0);
   HEAP32[$771>>2] = $num_header_packets;
   $772 = (($mgs) + 12|0);
   HEAP32[$772>>2] = $row_index_array;
   $773 = (($mgs) + 16|0);
   HEAP32[$773>>2] = $x_index_array;
   $774 = (($mgs) + 20|0);
   HEAP32[$774>>2] = $data_array;
   $775 = (($mgs) + 24|0);
   HEAP32[$775>>2] = $nx_pad;
   $776 = (($mgs) + 28|0);
   HEAP32[$776>>2] = $nyround;
   $777 = (($mgs) + 32|0);
   HEAP32[$777>>2] = $slab_startrow;
   $778 = (($mgs) + 36|0);
   HEAP32[$778>>2] = $nx;
   $779 = (($mgs) + 40|0);
   HEAP32[$779>>2] = $ny;
   $780 = (($mgs) + 44|0);
   HEAP32[$780>>2] = $non_zero;
   $781 = HEAP32[(1760)>>2]|0;
   $782 = (($mgs) + 48|0);
   HEAP32[$782>>2] = $781;
   $783 = HEAP32[$preferred_alignment>>2]|0;
   $784 = (($mgs) + 52|0);
   HEAP32[$784>>2] = $783;
   $785 = (($mgs) + 56|0);
   HEAP32[$785>>2] = $max_compute_units;
   $786 = HEAP32[(1744)>>2]|0;
   $787 = (($mgs) + 60|0);
   HEAP32[$787>>2] = $786;
   $788 = (($mgs) + 64|0);
   HEAP32[$788>>2] = $column_span;
   $789 = $local_mem_size;
   $790 = $789;
   $791 = HEAP32[$790>>2]|0;
   $792 = (($789) + 4)|0;
   $793 = $792;
   u$1 = HEAP32[$793>>2]|0;
   $794 = (($mgs) + 68|0);
   HEAP32[$794>>2] = $791;
   $795 = (($mgs) + 72|0);
   HEAP32[$795>>2] = $segcachesize;
   $796 = (($mgs) + 76|0);
   HEAP32[$796>>2] = $max_slabheight;
   $797 = $ddex;
   $798 = $pdex;
   $799 = HEAP32[$platform>>2]|0;
   $800 = (($799) + (($798*28)|0)|0);
   $801 = (($800) + 12|0);
   $802 = HEAP32[$801>>2]|0;
   $803 = (($802) + (($797*24)|0)|0);
   $804 = (($803) + 8|0);
   $805 = $804;
   $806 = $805;
   $807 = HEAP32[$806>>2]|0;
   $808 = (($805) + 4)|0;
   $809 = $808;
   $810 = HEAP32[$809>>2]|0;
   $811 = (($mgs) + 80|0);
   $812 = $811;
   $813 = $812;
   HEAP32[$813>>2] = $807;
   $814 = (($812) + 4)|0;
   $815 = $814;
   HEAP32[$815>>2] = $810;
   $816 = (($mgs) + 88|0);
   HEAP32[$816>>2] = (1752);
   $817 = HEAP32[$kernel_wg_size>>2]|0;
   $818 = (($mgs) + 92|0);
   HEAP32[$818>>2] = $817;
   $819 = (($mgs) + 96|0);
   HEAP32[$819>>2] = $nslabs_round;
   $820 = (($mgs) + 100|0);
   HEAP32[$820>>2] = $memsize;
   $821 = (__Z10matrix_genP18_matrix_gen_struct($mgs)|0);
   HEAP32[$rc>>2] = $821;
   $822 = HEAP32[(1744)>>2]|0;
   $823 = ($822|0)==(2);
   if ($823) {
    $ndims = 1;
    $824 = HEAP32[$nslabs_round>>2]|0;
    $825 = ($global_work_size);
    HEAP32[$825>>2] = $824;
    $826 = ($local_work_size);
    HEAP32[$826>>2] = 1;
   } else {
    $ndims = 2;
    $827 = $ddex;
    $828 = $pdex;
    $829 = HEAP32[$platform>>2]|0;
    $830 = (($829) + (($828*28)|0)|0);
    $831 = (($830) + 12|0);
    $832 = HEAP32[$831>>2]|0;
    $833 = (($832) + (($827*24)|0)|0);
    $834 = (($833) + 8|0);
    $835 = $834;
    $836 = $835;
    $837 = HEAP32[$836>>2]|0;
    $838 = (($835) + 4)|0;
    $839 = $838;
    $840 = HEAP32[$839>>2]|0;
    $841 = ($837|0)==(4);
    $842 = ($840|0)==(0);
    $843 = $841 & $842;
    $844 = $843 ? 16 : 1;
    HEAP32[$team_size>>2] = $844;
    $845 = HEAP32[$nslabs_round>>2]|0;
    $846 = (($global_work_size) + 4|0);
    HEAP32[$846>>2] = $845;
    $847 = (($local_work_size) + 4|0);
    HEAP32[$847>>2] = 1;
    $848 = $ddex;
    $849 = $pdex;
    $850 = HEAP32[$platform>>2]|0;
    $851 = (($850) + (($849*28)|0)|0);
    $852 = (($851) + 12|0);
    $853 = HEAP32[$852>>2]|0;
    $854 = (($853) + (($848*24)|0)|0);
    $855 = (($854) + 8|0);
    $856 = $855;
    $857 = $856;
    $858 = HEAP32[$857>>2]|0;
    $859 = (($856) + 4)|0;
    $860 = $859;
    $861 = HEAP32[$860>>2]|0;
    $862 = ($858|0)==(4);
    $863 = ($861|0)==(0);
    $864 = $862 & $863;
    if ($864) {
     $865 = HEAP32[(1752)>>2]|0;
     $866 = $865;
    } else {
     $866 = 1;
    }
    $867 = ($local_work_size);
    HEAP32[$867>>2] = $866;
    $868 = ($global_work_size);
    HEAP32[$868>>2] = $866;
    $max_aggregate_local_work_group_size = 0;
    $aggregate_local_work_group_size = 1;
    $i = 0;
    while(1) {
     $869 = $i;
     $870 = $ndims;
     $871 = ($869>>>0)<($870>>>0);
     if (!($871)) {
      break;
     }
     $872 = $i;
     $873 = (($local_work_size) + ($872<<2)|0);
     $874 = HEAP32[$873>>2]|0;
     $875 = $aggregate_local_work_group_size;
     $876 = Math_imul($875, $874)|0;
     $aggregate_local_work_group_size = $876;
     $877 = $i;
     $878 = (($877) + 1)|0;
     $i = $878;
    }
    $879 = $aggregate_local_work_group_size;
    $max_aggregate_local_work_group_size = $879;
    $880 = $max_aggregate_local_work_group_size;
    $881 = HEAP32[$kernel_wg_size>>2]|0;
    $882 = ($880|0)>($881|0);
    if ($882) {
     while(1) {
      $883 = $max_aggregate_local_work_group_size;
      $884 = HEAP32[$kernel_wg_size>>2]|0;
      $885 = ($883|0)>($884|0);
      if (!($885)) {
       break;
      }
      $886 = ($local_work_size);
      $887 = HEAP32[$886>>2]|0;
      $888 = (($887>>>0) / 2)&-1;
      HEAP32[$886>>2] = $888;
      $889 = HEAP32[(1752)>>2]|0;
      $890 = (($889|0) / 2)&-1;
      HEAP32[(1752)>>2] = $890;
      $891 = $max_aggregate_local_work_group_size;
      $892 = (($891|0) / 2)&-1;
      $max_aggregate_local_work_group_size = $892;
     }
     $893 = HEAP32[(1752)>>2]|0;
     $vararg_ptr129 = ($vararg_buffer127);
     HEAP32[$vararg_ptr129>>2] = $893;
     (_printf(((3312)|0),($vararg_buffer127|0))|0);
    }
   }
   $894 = $output_array_verify;
   $895 = HEAP32[$preferred_alignment>>2]|0;
   $896 = HEAP32[$nyround>>2]|0;
   $897 = $896<<2;
   (_posix_memalign($894,$895,$897)|0);
   $898 = HEAP32[$output_array_verify>>2]|0;
   $899 = ($898|0)==(0|0);
   if ($899) {
    $900 = HEAP32[$nyround>>2]|0;
    $901 = $900<<2;
    $vararg_ptr132 = ($vararg_buffer130);
    $902 = $vararg_ptr132;
    $903 = $902;
    HEAP32[$903>>2] = $901;
    $904 = (($902) + 4)|0;
    $905 = $904;
    HEAP32[$905>>2] = 0;
    $vararg_ptr133 = (($vararg_buffer130) + 8|0);
    HEAP32[$vararg_ptr133>>2] = (3392);
    (_printf(((2216)|0),($vararg_buffer130|0))|0);
    _exit(1);
    // unreachable;
   }
   $906 = HEAP32[$output_array_verify>>2]|0;
   $907 = ($906|0)==(0|0);
   if ($907) {
    $908 = HEAP32[(_stderr)>>2]|0;
    (_fprintf(($908|0),((3416)|0),($vararg_buffer134|0))|0);
    $909 = HEAP32[(_stderr)>>2]|0;
    (_fflush(($909|0))|0);
    _exit(1);
    // unreachable;
   }
   $910 = HEAP32[$nx_pad>>2]|0;
   $911 = $910<<2;
   $input_buffer_size = $911;
   $912 = $pdex;
   $913 = HEAP32[$platform>>2]|0;
   $914 = (($913) + (($912*28)|0)|0);
   $915 = (($914) + 16|0);
   $916 = HEAP32[$915>>2]|0;
   $917 = $input_buffer_size;
   $918 = (_clCreateBuffer(($916|0),16,0,($917|0),(0|0),($rc|0))|0);
   HEAP32[$input_buffer>>2] = $918;
   $919 = HEAP32[$rc>>2]|0;
   $920 = ($919|0)!=(0);
   if ($920) {
    $921 = HEAP32[$rc>>2]|0;
    $vararg_ptr138 = ($vararg_buffer136);
    HEAP32[$vararg_ptr138>>2] = (3464);
    $vararg_ptr139 = (($vararg_buffer136) + 4|0);
    HEAP32[$vararg_ptr139>>2] = $921;
    (_printf(((2160)|0),($vararg_buffer136|0))|0);
   }
   $922 = HEAP32[$memsize>>2]|0;
   $matrix_buffer_size = $922;
   $923 = $pdex;
   $924 = HEAP32[$platform>>2]|0;
   $925 = (($924) + (($923*28)|0)|0);
   $926 = (($925) + 16|0);
   $927 = HEAP32[$926>>2]|0;
   $928 = $matrix_buffer_size;
   $929 = (_clCreateBuffer(($927|0),16,0,($928|0),(0|0),($rc|0))|0);
   HEAP32[$matrix_buffer>>2] = $929;
   $930 = HEAP32[$rc>>2]|0;
   $931 = ($930|0)!=(0);
   if ($931) {
    $932 = HEAP32[$rc>>2]|0;
    $vararg_ptr142 = ($vararg_buffer140);
    HEAP32[$vararg_ptr142>>2] = (3496);
    $vararg_ptr143 = (($vararg_buffer140) + 4|0);
    HEAP32[$vararg_ptr143>>2] = $932;
    (_printf(((2160)|0),($vararg_buffer140|0))|0);
   }
   $933 = HEAP32[$nslabs_round>>2]|0;
   $934 = HEAP32[$slab_startrow>>2]|0;
   $935 = (($934) + ($933<<2)|0);
   $936 = HEAP32[$935>>2]|0;
   $937 = HEAP32[$slab_startrow>>2]|0;
   $938 = ($937);
   $939 = HEAP32[$938>>2]|0;
   $940 = (($936) - ($939))|0;
   $941 = $940<<2;
   $output_buffer_size = $941;
   $942 = $pdex;
   $943 = HEAP32[$platform>>2]|0;
   $944 = (($943) + (($942*28)|0)|0);
   $945 = (($944) + 16|0);
   $946 = HEAP32[$945>>2]|0;
   $947 = $output_buffer_size;
   $948 = (_clCreateBuffer(($946|0),16,0,($947|0),(0|0),($rc|0))|0);
   HEAP32[$output_buffer>>2] = $948;
   $949 = HEAP32[$rc>>2]|0;
   $950 = ($949|0)!=(0);
   if ($950) {
    $951 = HEAP32[$rc>>2]|0;
    $vararg_ptr146 = ($vararg_buffer144);
    HEAP32[$vararg_ptr146>>2] = (3528);
    $vararg_ptr147 = (($vararg_buffer144) + 4|0);
    HEAP32[$vararg_ptr147>>2] = $951;
    (_printf(((2160)|0),($vararg_buffer144|0))|0);
   }
   $952 = $ddex;
   $953 = $pdex;
   $954 = HEAP32[$platform>>2]|0;
   $955 = (($954) + (($953*28)|0)|0);
   $956 = (($955) + 12|0);
   $957 = HEAP32[$956>>2]|0;
   $958 = (($957) + (($952*24)|0)|0);
   $959 = (($958) + 16|0);
   $960 = HEAP32[$959>>2]|0;
   $961 = HEAP32[$input_buffer>>2]|0;
   $962 = $input_buffer_size;
   $963 = (_clEnqueueMapBuffer(($960|0),($961|0),1,2,0,0,($962|0),0,(0|0),(0|0),($rc|0))|0);
   $964 = $963;
   $input_array = $964;
   $965 = HEAP32[$rc>>2]|0;
   $966 = ($965|0)!=(0);
   if ($966) {
    $967 = HEAP32[$rc>>2]|0;
    $vararg_ptr150 = ($vararg_buffer148);
    HEAP32[$vararg_ptr150>>2] = (3560);
    $vararg_ptr151 = (($vararg_buffer148) + 4|0);
    HEAP32[$vararg_ptr151>>2] = $967;
    (_printf(((2160)|0),($vararg_buffer148|0))|0);
   }
   $968 = $ddex;
   $969 = $pdex;
   $970 = HEAP32[$platform>>2]|0;
   $971 = (($970) + (($969*28)|0)|0);
   $972 = (($971) + 12|0);
   $973 = HEAP32[$972>>2]|0;
   $974 = (($973) + (($968*24)|0)|0);
   $975 = (($974) + 16|0);
   $976 = HEAP32[$975>>2]|0;
   $977 = HEAP32[$matrix_buffer>>2]|0;
   $978 = $matrix_buffer_size;
   $979 = (_clEnqueueMapBuffer(($976|0),($977|0),1,2,0,0,($978|0),0,(0|0),(0|0),($rc|0))|0);
   $980 = $979;
   $tilebuffer = $980;
   $981 = HEAP32[$rc>>2]|0;
   $982 = ($981|0)!=(0);
   if ($982) {
    $983 = HEAP32[$rc>>2]|0;
    $vararg_ptr154 = ($vararg_buffer152);
    HEAP32[$vararg_ptr154>>2] = (3592);
    $vararg_ptr155 = (($vararg_buffer152) + 4|0);
    HEAP32[$vararg_ptr155>>2] = $983;
    (_printf(((2160)|0),($vararg_buffer152|0))|0);
   }
   $984 = $ddex;
   $985 = $pdex;
   $986 = HEAP32[$platform>>2]|0;
   $987 = (($986) + (($985*28)|0)|0);
   $988 = (($987) + 12|0);
   $989 = HEAP32[$988>>2]|0;
   $990 = (($989) + (($984*24)|0)|0);
   $991 = (($990) + 16|0);
   $992 = HEAP32[$991>>2]|0;
   $993 = HEAP32[$output_buffer>>2]|0;
   $994 = $output_buffer_size;
   $995 = (_clEnqueueMapBuffer(($992|0),($993|0),1,2,0,0,($994|0),0,(0|0),(0|0),($rc|0))|0);
   $996 = $995;
   $output_array = $996;
   $997 = HEAP32[$rc>>2]|0;
   $998 = ($997|0)!=(0);
   if ($998) {
    $999 = HEAP32[$rc>>2]|0;
    $vararg_ptr158 = ($vararg_buffer156);
    HEAP32[$vararg_ptr158>>2] = (3624);
    $vararg_ptr159 = (($vararg_buffer156) + 4|0);
    HEAP32[$vararg_ptr159>>2] = $999;
    (_printf(((2160)|0),($vararg_buffer156|0))|0);
   }
   $1000 = $tilebuffer;
   $1001 = $1000;
   $1002 = HEAP32[$seg_workspace>>2]|0;
   $1003 = $1002;
   $1004 = HEAP32[$nslabs_round>>2]|0;
   $1005 = HEAP32[$matrix_header>>2]|0;
   $1006 = (($1005) + (($1004*12)|0)|0);
   $1007 = ($1006);
   $1008 = HEAP32[$1007>>2]|0;
   $1009 = $1008<<7;
   _memcpy(($1001|0),($1003|0),($1009|0))|0;
   $1010 = $ddex;
   $1011 = $pdex;
   $1012 = HEAP32[$platform>>2]|0;
   $1013 = (($1012) + (($1011*28)|0)|0);
   $1014 = (($1013) + 12|0);
   $1015 = HEAP32[$1014>>2]|0;
   $1016 = (($1015) + (($1010*24)|0)|0);
   $1017 = (($1016) + 16|0);
   $1018 = HEAP32[$1017>>2]|0;
   $1019 = HEAP32[$matrix_buffer>>2]|0;
   $1020 = $tilebuffer;
   $1021 = $1020;
   $1022 = ($events);
   $1023 = (_clEnqueueUnmapMemObject(($1018|0),($1019|0),($1021|0),0,(0|0),($1022|0))|0);
   HEAP32[$rc>>2] = $1023;
   $1024 = HEAP32[$rc>>2]|0;
   $1025 = ($1024|0)!=(0);
   if ($1025) {
    $1026 = HEAP32[$rc>>2]|0;
    $vararg_ptr162 = ($vararg_buffer160);
    HEAP32[$vararg_ptr162>>2] = (3664);
    $vararg_ptr163 = (($vararg_buffer160) + 4|0);
    HEAP32[$vararg_ptr163>>2] = $1026;
    (_printf(((2160)|0),($vararg_buffer160|0))|0);
   }
   $1027 = ($events);
   (_clWaitForEvents(1,($1027|0))|0);
   $i = 0;
   while(1) {
    $1028 = $i;
    $1029 = HEAP32[$nx>>2]|0;
    $1030 = ($1028>>>0)<($1029>>>0);
    if (!($1030)) {
     break;
    }
    $1031 = (_rand()|0);
    $1032 = $1031 & 32767;
    $1033 = (+($1032|0));
    $1034 = $1033 * 0.00100000004749745130539;
    $1035 = $1034 - 15.0;
    $rval = $1035;
    $1036 = $rval;
    $1037 = $i;
    $1038 = $input_array;
    $1039 = (($1038) + ($1037<<2)|0);
    HEAPF32[$1039>>2] = $1036;
    $1040 = $i;
    $1041 = (($1040) + 1)|0;
    $i = $1041;
   }
   $1042 = $output_array;
   $1043 = $1042;
   $1044 = $output_buffer_size;
   _memset(($1043|0),0,($1044|0))|0;
   $1045 = $ddex;
   $1046 = $pdex;
   $1047 = HEAP32[$platform>>2]|0;
   $1048 = (($1047) + (($1046*28)|0)|0);
   $1049 = (($1048) + 12|0);
   $1050 = HEAP32[$1049>>2]|0;
   $1051 = (($1050) + (($1045*24)|0)|0);
   $1052 = (($1051) + 16|0);
   $1053 = HEAP32[$1052>>2]|0;
   $1054 = HEAP32[$input_buffer>>2]|0;
   $1055 = $input_array;
   $1056 = $1055;
   $1057 = ($events);
   $1058 = (_clEnqueueUnmapMemObject(($1053|0),($1054|0),($1056|0),0,(0|0),($1057|0))|0);
   HEAP32[$rc>>2] = $1058;
   $1059 = HEAP32[$rc>>2]|0;
   $1060 = ($1059|0)!=(0);
   if ($1060) {
    $1061 = HEAP32[$rc>>2]|0;
    $vararg_ptr166 = ($vararg_buffer164);
    HEAP32[$vararg_ptr166>>2] = (3704);
    $vararg_ptr167 = (($vararg_buffer164) + 4|0);
    HEAP32[$vararg_ptr167>>2] = $1061;
    (_printf(((2160)|0),($vararg_buffer164|0))|0);
   }
   $1062 = $ddex;
   $1063 = $pdex;
   $1064 = HEAP32[$platform>>2]|0;
   $1065 = (($1064) + (($1063*28)|0)|0);
   $1066 = (($1065) + 12|0);
   $1067 = HEAP32[$1066>>2]|0;
   $1068 = (($1067) + (($1062*24)|0)|0);
   $1069 = (($1068) + 16|0);
   $1070 = HEAP32[$1069>>2]|0;
   $1071 = HEAP32[$output_buffer>>2]|0;
   $1072 = $output_array;
   $1073 = $1072;
   $1074 = (($events) + 4|0);
   $1075 = (_clEnqueueUnmapMemObject(($1070|0),($1071|0),($1073|0),0,(0|0),($1074|0))|0);
   HEAP32[$rc>>2] = $1075;
   $1076 = HEAP32[$rc>>2]|0;
   $1077 = ($1076|0)!=(0);
   if ($1077) {
    $1078 = HEAP32[$rc>>2]|0;
    $vararg_ptr170 = ($vararg_buffer168);
    HEAP32[$vararg_ptr170>>2] = (3744);
    $vararg_ptr171 = (($vararg_buffer168) + 4|0);
    HEAP32[$vararg_ptr171>>2] = $1078;
    (_printf(((2160)|0),($vararg_buffer168|0))|0);
   }
   $1079 = ($events);
   (_clWaitForEvents(2,($1079|0))|0);
   $1080 = $pdex;
   $1081 = HEAP32[$platform>>2]|0;
   $1082 = (($1081) + (($1080*28)|0)|0);
   $1083 = (($1082) + 24|0);
   $1084 = HEAP32[$1083>>2]|0;
   $1085 = $input_buffer;
   $1086 = (_clSetKernelArg(($1084|0),0,4,($1085|0))|0);
   HEAP32[$rc>>2] = $1086;
   $1087 = HEAP32[$rc>>2]|0;
   $1088 = ($1087|0)!=(0);
   if ($1088) {
    $1089 = HEAP32[$rc>>2]|0;
    $vararg_ptr174 = ($vararg_buffer172);
    HEAP32[$vararg_ptr174>>2] = (3784);
    $vararg_ptr175 = (($vararg_buffer172) + 4|0);
    HEAP32[$vararg_ptr175>>2] = $1089;
    (_printf(((2160)|0),($vararg_buffer172|0))|0);
   }
   $1090 = $pdex;
   $1091 = HEAP32[$platform>>2]|0;
   $1092 = (($1091) + (($1090*28)|0)|0);
   $1093 = (($1092) + 24|0);
   $1094 = HEAP32[$1093>>2]|0;
   $1095 = $output_buffer;
   $1096 = (_clSetKernelArg(($1094|0),1,4,($1095|0))|0);
   HEAP32[$rc>>2] = $1096;
   $1097 = HEAP32[$rc>>2]|0;
   $1098 = ($1097|0)!=(0);
   if ($1098) {
    $1099 = HEAP32[$rc>>2]|0;
    $vararg_ptr178 = ($vararg_buffer176);
    HEAP32[$vararg_ptr178>>2] = (3808);
    $vararg_ptr179 = (($vararg_buffer176) + 4|0);
    HEAP32[$vararg_ptr179>>2] = $1099;
    (_printf(((2160)|0),($vararg_buffer176|0))|0);
   }
   $1100 = $pdex;
   $1101 = HEAP32[$platform>>2]|0;
   $1102 = (($1101) + (($1100*28)|0)|0);
   $1103 = (($1102) + 24|0);
   $1104 = HEAP32[$1103>>2]|0;
   $1105 = $matrix_buffer;
   $1106 = (_clSetKernelArg(($1104|0),2,4,($1105|0))|0);
   HEAP32[$rc>>2] = $1106;
   $1107 = HEAP32[$rc>>2]|0;
   $1108 = ($1107|0)!=(0);
   if ($1108) {
    $1109 = HEAP32[$rc>>2]|0;
    $vararg_ptr182 = ($vararg_buffer180);
    HEAP32[$vararg_ptr182>>2] = (3832);
    $vararg_ptr183 = (($vararg_buffer180) + 4|0);
    HEAP32[$vararg_ptr183>>2] = $1109;
    (_printf(((2160)|0),($vararg_buffer180|0))|0);
   }
   $1110 = $pdex;
   $1111 = HEAP32[$platform>>2]|0;
   $1112 = (($1111) + (($1110*28)|0)|0);
   $1113 = (($1112) + 24|0);
   $1114 = HEAP32[$1113>>2]|0;
   $1115 = $column_span;
   $1116 = (_clSetKernelArg(($1114|0),3,4,($1115|0))|0);
   HEAP32[$rc>>2] = $1116;
   $1117 = HEAP32[$rc>>2]|0;
   $1118 = ($1117|0)!=(0);
   if ($1118) {
    $1119 = HEAP32[$rc>>2]|0;
    $vararg_ptr186 = ($vararg_buffer184);
    HEAP32[$vararg_ptr186>>2] = (3856);
    $vararg_ptr187 = (($vararg_buffer184) + 4|0);
    HEAP32[$vararg_ptr187>>2] = $1119;
    (_printf(((2160)|0),($vararg_buffer184|0))|0);
   }
   $1120 = $pdex;
   $1121 = HEAP32[$platform>>2]|0;
   $1122 = (($1121) + (($1120*28)|0)|0);
   $1123 = (($1122) + 24|0);
   $1124 = HEAP32[$1123>>2]|0;
   $1125 = $max_slabheight;
   $1126 = (_clSetKernelArg(($1124|0),4,4,($1125|0))|0);
   HEAP32[$rc>>2] = $1126;
   $1127 = HEAP32[$rc>>2]|0;
   $1128 = ($1127|0)!=(0);
   if ($1128) {
    $1129 = HEAP32[$rc>>2]|0;
    $vararg_ptr190 = ($vararg_buffer188);
    HEAP32[$vararg_ptr190>>2] = (3880);
    $vararg_ptr191 = (($vararg_buffer188) + 4|0);
    HEAP32[$vararg_ptr191>>2] = $1129;
    (_printf(((2160)|0),($vararg_buffer188|0))|0);
   }
   $1130 = HEAP32[(1744)>>2]|0;
   $1131 = ($1130|0)==(1);
   if ($1131) {
    $1132 = $pdex;
    $1133 = HEAP32[$platform>>2]|0;
    $1134 = (($1133) + (($1132*28)|0)|0);
    $1135 = (($1134) + 24|0);
    $1136 = HEAP32[$1135>>2]|0;
    $1137 = $team_size;
    $1138 = (_clSetKernelArg(($1136|0),5,4,($1137|0))|0);
    HEAP32[$rc>>2] = $1138;
    $1139 = HEAP32[$rc>>2]|0;
    $1140 = ($1139|0)!=(0);
    if ($1140) {
     $1141 = HEAP32[$rc>>2]|0;
     $vararg_ptr194 = ($vararg_buffer192);
     HEAP32[$vararg_ptr194>>2] = (3904);
     $vararg_ptr195 = (($vararg_buffer192) + 4|0);
     HEAP32[$vararg_ptr195>>2] = $1141;
     (_printf(((2160)|0),($vararg_buffer192|0))|0);
    }
    $1142 = $pdex;
    $1143 = HEAP32[$platform>>2]|0;
    $1144 = (($1143) + (($1142*28)|0)|0);
    $1145 = (($1144) + 24|0);
    $1146 = HEAP32[$1145>>2]|0;
    $1147 = $num_header_packets;
    $1148 = (_clSetKernelArg(($1146|0),6,4,($1147|0))|0);
    HEAP32[$rc>>2] = $1148;
    $1149 = HEAP32[$rc>>2]|0;
    $1150 = ($1149|0)!=(0);
    if ($1150) {
     $1151 = HEAP32[$rc>>2]|0;
     $vararg_ptr198 = ($vararg_buffer196);
     HEAP32[$vararg_ptr198>>2] = (3928);
     $vararg_ptr199 = (($vararg_buffer196) + 4|0);
     HEAP32[$vararg_ptr199>>2] = $1151;
     (_printf(((2160)|0),($vararg_buffer196|0))|0);
    }
    $1152 = $pdex;
    $1153 = HEAP32[$platform>>2]|0;
    $1154 = (($1153) + (($1152*28)|0)|0);
    $1155 = (($1154) + 24|0);
    $1156 = HEAP32[$1155>>2]|0;
    $1157 = HEAP32[$max_slabheight>>2]|0;
    $1158 = $1157<<2;
    $1159 = (_clSetKernelArg(($1156|0),7,($1158|0),(0|0))|0);
    HEAP32[$rc>>2] = $1159;
    $1160 = HEAP32[$rc>>2]|0;
    $1161 = ($1160|0)!=(0);
    if ($1161) {
     $1162 = HEAP32[$rc>>2]|0;
     $vararg_ptr202 = ($vararg_buffer200);
     HEAP32[$vararg_ptr202>>2] = (3952);
     $vararg_ptr203 = (($vararg_buffer200) + 4|0);
     HEAP32[$vararg_ptr203>>2] = $1162;
     (_printf(((2160)|0),($vararg_buffer200|0))|0);
    }
   } else {
    $1163 = $pdex;
    $1164 = HEAP32[$platform>>2]|0;
    $1165 = (($1164) + (($1163*28)|0)|0);
    $1166 = (($1165) + 24|0);
    $1167 = HEAP32[$1166>>2]|0;
    $1168 = $segcachesize;
    $1169 = (_clSetKernelArg(($1167|0),5,4,($1168|0))|0);
    HEAP32[$rc>>2] = $1169;
    $1170 = HEAP32[$rc>>2]|0;
    $1171 = ($1170|0)!=(0);
    if ($1171) {
     $1172 = HEAP32[$rc>>2]|0;
     $vararg_ptr206 = ($vararg_buffer204);
     HEAP32[$vararg_ptr206>>2] = (3904);
     $vararg_ptr207 = (($vararg_buffer204) + 4|0);
     HEAP32[$vararg_ptr207>>2] = $1172;
     (_printf(((2160)|0),($vararg_buffer204|0))|0);
    }
    $1173 = $pdex;
    $1174 = HEAP32[$platform>>2]|0;
    $1175 = (($1174) + (($1173*28)|0)|0);
    $1176 = (($1175) + 24|0);
    $1177 = HEAP32[$1176>>2]|0;
    $1178 = $num_header_packets;
    $1179 = (_clSetKernelArg(($1177|0),6,4,($1178|0))|0);
    HEAP32[$rc>>2] = $1179;
    $1180 = HEAP32[$rc>>2]|0;
    $1181 = ($1180|0)!=(0);
    if ($1181) {
     $1182 = HEAP32[$rc>>2]|0;
     $vararg_ptr210 = ($vararg_buffer208);
     HEAP32[$vararg_ptr210>>2] = (3928);
     $vararg_ptr211 = (($vararg_buffer208) + 4|0);
     HEAP32[$vararg_ptr211>>2] = $1182;
     (_printf(((2160)|0),($vararg_buffer208|0))|0);
    }
    $1183 = $pdex;
    $1184 = HEAP32[$platform>>2]|0;
    $1185 = (($1184) + (($1183*28)|0)|0);
    $1186 = (($1185) + 24|0);
    $1187 = HEAP32[$1186>>2]|0;
    $1188 = HEAP32[$column_span>>2]|0;
    $1189 = $1188<<1;
    $1190 = $1189<<2;
    $1191 = (_clSetKernelArg(($1187|0),7,($1190|0),(0|0))|0);
    HEAP32[$rc>>2] = $1191;
    $1192 = HEAP32[$rc>>2]|0;
    $1193 = ($1192|0)!=(0);
    if ($1193) {
     $1194 = HEAP32[$rc>>2]|0;
     $vararg_ptr214 = ($vararg_buffer212);
     HEAP32[$vararg_ptr214>>2] = (3952);
     $vararg_ptr215 = (($vararg_buffer212) + 4|0);
     HEAP32[$vararg_ptr215>>2] = $1194;
     (_printf(((2160)|0),($vararg_buffer212|0))|0);
    }
    $1195 = $pdex;
    $1196 = HEAP32[$platform>>2]|0;
    $1197 = (($1196) + (($1195*28)|0)|0);
    $1198 = (($1197) + 24|0);
    $1199 = HEAP32[$1198>>2]|0;
    $1200 = HEAP32[$max_slabheight>>2]|0;
    $1201 = $1200<<2;
    $1202 = (_clSetKernelArg(($1199|0),8,($1201|0),(0|0))|0);
    HEAP32[$rc>>2] = $1202;
    $1203 = HEAP32[$rc>>2]|0;
    $1204 = ($1203|0)!=(0);
    if ($1204) {
     $1205 = HEAP32[$rc>>2]|0;
     $vararg_ptr218 = ($vararg_buffer216);
     HEAP32[$vararg_ptr218>>2] = (3976);
     $vararg_ptr219 = (($vararg_buffer216) + 4|0);
     HEAP32[$vararg_ptr219>>2] = $1205;
     (_printf(((2160)|0),($vararg_buffer216|0))|0);
    }
    $1206 = $pdex;
    $1207 = HEAP32[$platform>>2]|0;
    $1208 = (($1207) + (($1206*28)|0)|0);
    $1209 = (($1208) + 24|0);
    $1210 = HEAP32[$1209>>2]|0;
    $1211 = HEAP32[$segcachesize>>2]|0;
    $1212 = $1211<<7;
    $1213 = (_clSetKernelArg(($1210|0),9,($1212|0),(0|0))|0);
    HEAP32[$rc>>2] = $1213;
    $1214 = HEAP32[$rc>>2]|0;
    $1215 = ($1214|0)!=(0);
    if ($1215) {
     $1216 = HEAP32[$rc>>2]|0;
     $vararg_ptr222 = ($vararg_buffer220);
     HEAP32[$vararg_ptr222>>2] = (4000);
     $vararg_ptr223 = (($vararg_buffer220) + 4|0);
     HEAP32[$vararg_ptr223>>2] = $1216;
     (_printf(((2160)|0),($vararg_buffer220|0))|0);
    }
   }
   $1217 = $ddex;
   $1218 = $pdex;
   $1219 = HEAP32[$platform>>2]|0;
   $1220 = (($1219) + (($1218*28)|0)|0);
   $1221 = (($1220) + 12|0);
   $1222 = HEAP32[$1221>>2]|0;
   $1223 = (($1222) + (($1217*24)|0)|0);
   $1224 = (($1223) + 16|0);
   $1225 = HEAP32[$1224>>2]|0;
   $1226 = $pdex;
   $1227 = HEAP32[$platform>>2]|0;
   $1228 = (($1227) + (($1226*28)|0)|0);
   $1229 = (($1228) + 24|0);
   $1230 = HEAP32[$1229>>2]|0;
   $1231 = $ndims;
   $1232 = ($global_work_size);
   $1233 = ($local_work_size);
   $1234 = ($events);
   $1235 = (_clEnqueueNDRangeKernel(($1225|0),($1230|0),($1231|0),(0|0),($1232|0),($1233|0),0,(0|0),($1234|0))|0);
   HEAP32[$rc>>2] = $1235;
   $1236 = HEAP32[$rc>>2]|0;
   $1237 = ($1236|0)!=(0);
   if ($1237) {
    $1238 = HEAP32[$rc>>2]|0;
    $vararg_ptr226 = ($vararg_buffer224);
    HEAP32[$vararg_ptr226>>2] = (4024);
    $vararg_ptr227 = (($vararg_buffer224) + 4|0);
    HEAP32[$vararg_ptr227>>2] = $1238;
    (_printf(((2160)|0),($vararg_buffer224|0))|0);
   }
   $1239 = ($events);
   (_clWaitForEvents(1,($1239|0))|0);
   $1240 = $ddex;
   $1241 = $pdex;
   $1242 = HEAP32[$platform>>2]|0;
   $1243 = (($1242) + (($1241*28)|0)|0);
   $1244 = (($1243) + 12|0);
   $1245 = HEAP32[$1244>>2]|0;
   $1246 = (($1245) + (($1240*24)|0)|0);
   $1247 = (($1246) + 16|0);
   $1248 = HEAP32[$1247>>2]|0;
   $1249 = HEAP32[$output_buffer>>2]|0;
   $1250 = $output_buffer_size;
   $1251 = (_clEnqueueMapBuffer(($1248|0),($1249|0),1,3,0,0,($1250|0),0,(0|0),(0|0),($rc|0))|0);
   $1252 = $1251;
   $output_array = $1252;
   $1253 = HEAP32[$rc>>2]|0;
   $1254 = ($1253|0)!=(0);
   if ($1254) {
    $1255 = HEAP32[$rc>>2]|0;
    $vararg_ptr230 = ($vararg_buffer228);
    HEAP32[$vararg_ptr230>>2] = (3624);
    $vararg_ptr231 = (($vararg_buffer228) + 4|0);
    HEAP32[$vararg_ptr231>>2] = $1255;
    (_printf(((2160)|0),($vararg_buffer228|0))|0);
   }
   $1256 = $ddex;
   $1257 = $pdex;
   $1258 = HEAP32[$platform>>2]|0;
   $1259 = (($1258) + (($1257*28)|0)|0);
   $1260 = (($1259) + 12|0);
   $1261 = HEAP32[$1260>>2]|0;
   $1262 = (($1261) + (($1256*24)|0)|0);
   $1263 = (($1262) + 16|0);
   $1264 = HEAP32[$1263>>2]|0;
   $1265 = HEAP32[$input_buffer>>2]|0;
   $1266 = $input_buffer_size;
   $1267 = (_clEnqueueMapBuffer(($1264|0),($1265|0),1,3,0,0,($1266|0),0,(0|0),(0|0),($rc|0))|0);
   $1268 = $1267;
   $input_array = $1268;
   $1269 = HEAP32[$rc>>2]|0;
   $1270 = ($1269|0)!=(0);
   if ($1270) {
    $1271 = HEAP32[$rc>>2]|0;
    $vararg_ptr234 = ($vararg_buffer232);
    HEAP32[$vararg_ptr234>>2] = (3560);
    $vararg_ptr235 = (($vararg_buffer232) + 4|0);
    HEAP32[$vararg_ptr235>>2] = $1271;
    (_printf(((2160)|0),($vararg_buffer232|0))|0);
   }
   HEAP32[$rc>>2] = 0;
   $i = 0;
   while(1) {
    $1272 = $i;
    $1273 = HEAP32[$ny>>2]|0;
    $1274 = ($1272>>>0)<($1273>>>0);
    if (!($1274)) {
     break;
    }
    $t = 0.0;
    $1275 = $i;
    $1276 = HEAP32[$row_index_array>>2]|0;
    $1277 = (($1276) + ($1275<<2)|0);
    $1278 = HEAP32[$1277>>2]|0;
    $lb = $1278;
    $1279 = $i;
    $1280 = (($1279) + 1)|0;
    $1281 = HEAP32[$row_index_array>>2]|0;
    $1282 = (($1281) + ($1280<<2)|0);
    $1283 = HEAP32[$1282>>2]|0;
    $ub = $1283;
    $1284 = $lb;
    $j = $1284;
    while(1) {
     $1285 = $j;
     $1286 = $ub;
     $1287 = ($1285>>>0)<($1286>>>0);
     if (!($1287)) {
      break;
     }
     $1288 = $j;
     $1289 = HEAP32[$data_array>>2]|0;
     $1290 = (($1289) + ($1288<<2)|0);
     $1291 = +HEAPF32[$1290>>2];
     $1292 = $j;
     $1293 = HEAP32[$x_index_array>>2]|0;
     $1294 = (($1293) + ($1292<<2)|0);
     $1295 = HEAP32[$1294>>2]|0;
     $1296 = $input_array;
     $1297 = (($1296) + ($1295<<2)|0);
     $1298 = +HEAPF32[$1297>>2];
     $1299 = $1291 * $1298;
     $1300 = $t;
     $1301 = $1300 + $1299;
     $t = $1301;
     $1302 = $j;
     $1303 = (($1302) + 1)|0;
     $j = $1303;
    }
    $1304 = $t;
    $1305 = $i;
    $1306 = HEAP32[$output_array_verify>>2]|0;
    $1307 = (($1306) + ($1305<<2)|0);
    HEAPF32[$1307>>2] = $1304;
    $1308 = $i;
    $1309 = (($1308) + 1)|0;
    $i = $1309;
   }
   $sum = 0.0;
   $diffsum = 0.0;
   $i = 0;
   while(1) {
    $1310 = $i;
    $1311 = HEAP32[$ny>>2]|0;
    $1312 = ($1310>>>0)<($1311>>>0);
    if (!($1312)) {
     break;
    }
    $1313 = $i;
    $1314 = HEAP32[$output_array_verify>>2]|0;
    $1315 = (($1314) + ($1313<<2)|0);
    $1316 = +HEAPF32[$1315>>2];
    $a = $1316;
    $1317 = $i;
    $1318 = $output_array;
    $1319 = (($1318) + ($1317<<2)|0);
    $1320 = +HEAPF32[$1319>>2];
    $b = $1320;
    $1321 = $a;
    $1322 = $1321;
    $abs_a = $1322;
    $1323 = $a;
    $1324 = $1323;
    $1325 = $b;
    $1326 = $1325;
    $1327 = $1324 - $1326;
    $delta = $1327;
    $1328 = $abs_a;
    $1329 = $1328 < 0.0;
    if ($1329) {
     $1330 = $abs_a;
     $1331 = -$1330;
     $1333 = $1331;
    } else {
     $1332 = $abs_a;
     $1333 = $1332;
    }
    $abs_a = $1333;
    $1334 = $delta;
    $1335 = $1334 < 0.0;
    if ($1335) {
     $1336 = $delta;
     $1337 = -$1336;
     $1339 = $1337;
    } else {
     $1338 = $delta;
     $1339 = $1338;
    }
    $delta = $1339;
    $1340 = $abs_a;
    $1341 = $sum;
    $1342 = $1341 + $1340;
    $sum = $1342;
    $1343 = $delta;
    $1344 = $diffsum;
    $1345 = $1344 + $1343;
    $diffsum = $1345;
    $1346 = $i;
    $1347 = (($1346) + 1)|0;
    $i = $1347;
   }
   $1348 = $diffsum;
   $1349 = $sum;
   $1350 = $1348 / $1349;
   $vararg_ptr238 = ($vararg_buffer236);
   HEAPF64[tempDoublePtr>>3]=$1350;HEAP32[$vararg_ptr238>>2]=HEAP32[tempDoublePtr>>2];HEAP32[$vararg_ptr238+4>>2]=HEAP32[tempDoublePtr+4>>2];
   (_printf(((4048)|0),($vararg_buffer236|0))|0);
   $1351 = $diffsum;
   $1352 = $sum;
   $1353 = $1351 / $1352;
   $1354 = $1353 > 1.00000000000000004792E-4;
   if ($1354) {
    HEAP32[$rc>>2] = -1;
   }
   $1355 = HEAP32[(1760)>>2]|0;
   $vararg_ptr241 = ($vararg_buffer239);
   HEAP32[$vararg_ptr241>>2] = $1355;
   (_printf(((4072)|0),($vararg_buffer239|0))|0);
   $1356 = HEAP32[$rc>>2]|0;
   $retval = $1356;
   $1357 = $ddex;
   $1358 = $pdex;
   $1359 = HEAP32[$platform>>2]|0;
   $1360 = (($1359) + (($1358*28)|0)|0);
   $1361 = (($1360) + 12|0);
   $1362 = HEAP32[$1361>>2]|0;
   $1363 = (($1362) + (($1357*24)|0)|0);
   $1364 = (($1363) + 16|0);
   $1365 = HEAP32[$1364>>2]|0;
   $1366 = HEAP32[$input_buffer>>2]|0;
   $1367 = $input_array;
   $1368 = $1367;
   $1369 = (_clEnqueueUnmapMemObject(($1365|0),($1366|0),($1368|0),0,(0|0),(0|0))|0);
   HEAP32[$rc>>2] = $1369;
   $1370 = HEAP32[$rc>>2]|0;
   $1371 = ($1370|0)!=(0);
   if ($1371) {
    $1372 = HEAP32[$rc>>2]|0;
    $vararg_ptr244 = ($vararg_buffer242);
    HEAP32[$vararg_ptr244>>2] = (4088);
    $vararg_ptr245 = (($vararg_buffer242) + 4|0);
    HEAP32[$vararg_ptr245>>2] = $1372;
    (_printf(((2160)|0),($vararg_buffer242|0))|0);
   }
   $1373 = $ddex;
   $1374 = $pdex;
   $1375 = HEAP32[$platform>>2]|0;
   $1376 = (($1375) + (($1374*28)|0)|0);
   $1377 = (($1376) + 12|0);
   $1378 = HEAP32[$1377>>2]|0;
   $1379 = (($1378) + (($1373*24)|0)|0);
   $1380 = (($1379) + 16|0);
   $1381 = HEAP32[$1380>>2]|0;
   $1382 = HEAP32[$output_buffer>>2]|0;
   $1383 = $output_array;
   $1384 = $1383;
   $1385 = (_clEnqueueUnmapMemObject(($1381|0),($1382|0),($1384|0),0,(0|0),(0|0))|0);
   HEAP32[$rc>>2] = $1385;
   $1386 = HEAP32[$rc>>2]|0;
   $1387 = ($1386|0)!=(0);
   if ($1387) {
    $1388 = HEAP32[$rc>>2]|0;
    $vararg_ptr248 = ($vararg_buffer246);
    HEAP32[$vararg_ptr248>>2] = (4120);
    $vararg_ptr249 = (($vararg_buffer246) + 4|0);
    HEAP32[$vararg_ptr249>>2] = $1388;
    (_printf(((2160)|0),($vararg_buffer246|0))|0);
   }
   $1389 = $ddex;
   $1390 = $pdex;
   $1391 = HEAP32[$platform>>2]|0;
   $1392 = (($1391) + (($1390*28)|0)|0);
   $1393 = (($1392) + 12|0);
   $1394 = HEAP32[$1393>>2]|0;
   $1395 = (($1394) + (($1389*24)|0)|0);
   $1396 = (($1395) + 16|0);
   $1397 = HEAP32[$1396>>2]|0;
   $1398 = (_clFinish(($1397|0))|0);
   HEAP32[$rc>>2] = $1398;
   $1399 = HEAP32[$rc>>2]|0;
   $1400 = ($1399|0)!=(0);
   if ($1400) {
    $1401 = HEAP32[$rc>>2]|0;
    $vararg_ptr252 = ($vararg_buffer250);
    HEAP32[$vararg_ptr252>>2] = (4152);
    $vararg_ptr253 = (($vararg_buffer250) + 4|0);
    HEAP32[$vararg_ptr253>>2] = $1401;
    (_printf(((2160)|0),($vararg_buffer250|0))|0);
   }
   $1402 = ($events);
   $1403 = HEAP32[$1402>>2]|0;
   $1404 = (_clReleaseEvent(($1403|0))|0);
   HEAP32[$rc>>2] = $1404;
   $1405 = HEAP32[$rc>>2]|0;
   $1406 = ($1405|0)!=(0);
   if ($1406) {
    $1407 = HEAP32[$rc>>2]|0;
    $vararg_ptr256 = ($vararg_buffer254);
    HEAP32[$vararg_ptr256>>2] = (4168);
    $vararg_ptr257 = (($vararg_buffer254) + 4|0);
    HEAP32[$vararg_ptr257>>2] = $1407;
    (_printf(((2160)|0),($vararg_buffer254|0))|0);
   }
   $1408 = (($events) + 4|0);
   $1409 = HEAP32[$1408>>2]|0;
   $1410 = (_clReleaseEvent(($1409|0))|0);
   HEAP32[$rc>>2] = $1410;
   $1411 = HEAP32[$rc>>2]|0;
   $1412 = ($1411|0)!=(0);
   if ($1412) {
    $1413 = HEAP32[$rc>>2]|0;
    $vararg_ptr260 = ($vararg_buffer258);
    HEAP32[$vararg_ptr260>>2] = (4192);
    $vararg_ptr261 = (($vararg_buffer258) + 4|0);
    HEAP32[$vararg_ptr261>>2] = $1413;
    (_printf(((2160)|0),($vararg_buffer258|0))|0);
   }
   $1414 = HEAP32[$input_buffer>>2]|0;
   $1415 = (_clReleaseMemObject(($1414|0))|0);
   HEAP32[$rc>>2] = $1415;
   $1416 = HEAP32[$rc>>2]|0;
   $1417 = ($1416|0)!=(0);
   if ($1417) {
    $1418 = HEAP32[$rc>>2]|0;
    $vararg_ptr264 = ($vararg_buffer262);
    HEAP32[$vararg_ptr264>>2] = (4216);
    $vararg_ptr265 = (($vararg_buffer262) + 4|0);
    HEAP32[$vararg_ptr265>>2] = $1418;
    (_printf(((2160)|0),($vararg_buffer262|0))|0);
   }
   $1419 = HEAP32[$matrix_buffer>>2]|0;
   $1420 = (_clReleaseMemObject(($1419|0))|0);
   HEAP32[$rc>>2] = $1420;
   $1421 = HEAP32[$rc>>2]|0;
   $1422 = ($1421|0)!=(0);
   if ($1422) {
    $1423 = HEAP32[$rc>>2]|0;
    $vararg_ptr268 = ($vararg_buffer266);
    HEAP32[$vararg_ptr268>>2] = (4248);
    $vararg_ptr269 = (($vararg_buffer266) + 4|0);
    HEAP32[$vararg_ptr269>>2] = $1423;
    (_printf(((2160)|0),($vararg_buffer266|0))|0);
   }
   $1424 = HEAP32[$output_buffer>>2]|0;
   $1425 = (_clReleaseMemObject(($1424|0))|0);
   HEAP32[$rc>>2] = $1425;
   $1426 = HEAP32[$rc>>2]|0;
   $1427 = ($1426|0)!=(0);
   if ($1427) {
    $1428 = HEAP32[$rc>>2]|0;
    $vararg_ptr272 = ($vararg_buffer270);
    HEAP32[$vararg_ptr272>>2] = (4280);
    $vararg_ptr273 = (($vararg_buffer270) + 4|0);
    HEAP32[$vararg_ptr273>>2] = $1428;
    (_printf(((2160)|0),($vararg_buffer270|0))|0);
   }
   $1429 = $ddex;
   $1430 = $pdex;
   $1431 = HEAP32[$platform>>2]|0;
   $1432 = (($1431) + (($1430*28)|0)|0);
   $1433 = (($1432) + 12|0);
   $1434 = HEAP32[$1433>>2]|0;
   $1435 = (($1434) + (($1429*24)|0)|0);
   $1436 = (($1435) + 16|0);
   $1437 = HEAP32[$1436>>2]|0;
   $1438 = (_clReleaseCommandQueue(($1437|0))|0);
   HEAP32[$rc>>2] = $1438;
   $1439 = HEAP32[$rc>>2]|0;
   $1440 = ($1439|0)!=(0);
   if ($1440) {
    $1441 = HEAP32[$rc>>2]|0;
    $vararg_ptr276 = ($vararg_buffer274);
    HEAP32[$vararg_ptr276>>2] = (4312);
    $vararg_ptr277 = (($vararg_buffer274) + 4|0);
    HEAP32[$vararg_ptr277>>2] = $1441;
    (_printf(((2160)|0),($vararg_buffer274|0))|0);
   }
   $1442 = $pdex;
   $1443 = HEAP32[$platform>>2]|0;
   $1444 = (($1443) + (($1442*28)|0)|0);
   $1445 = (($1444) + 24|0);
   $1446 = HEAP32[$1445>>2]|0;
   $1447 = (_clReleaseKernel(($1446|0))|0);
   HEAP32[$rc>>2] = $1447;
   $1448 = HEAP32[$rc>>2]|0;
   $1449 = ($1448|0)!=(0);
   if ($1449) {
    $1450 = HEAP32[$rc>>2]|0;
    $vararg_ptr280 = ($vararg_buffer278);
    HEAP32[$vararg_ptr280>>2] = (4336);
    $vararg_ptr281 = (($vararg_buffer278) + 4|0);
    HEAP32[$vararg_ptr281>>2] = $1450;
    (_printf(((2160)|0),($vararg_buffer278|0))|0);
   }
   $1451 = $pdex;
   $1452 = HEAP32[$platform>>2]|0;
   $1453 = (($1452) + (($1451*28)|0)|0);
   $1454 = (($1453) + 20|0);
   $1455 = HEAP32[$1454>>2]|0;
   $1456 = (_clReleaseProgram(($1455|0))|0);
   HEAP32[$rc>>2] = $1456;
   $1457 = HEAP32[$rc>>2]|0;
   $1458 = ($1457|0)!=(0);
   if ($1458) {
    $1459 = HEAP32[$rc>>2]|0;
    $vararg_ptr284 = ($vararg_buffer282);
    HEAP32[$vararg_ptr284>>2] = (4352);
    $vararg_ptr285 = (($vararg_buffer282) + 4|0);
    HEAP32[$vararg_ptr285>>2] = $1459;
    (_printf(((2160)|0),($vararg_buffer282|0))|0);
   }
   $1460 = $pdex;
   $1461 = HEAP32[$platform>>2]|0;
   $1462 = (($1461) + (($1460*28)|0)|0);
   $1463 = (($1462) + 16|0);
   $1464 = HEAP32[$1463>>2]|0;
   $1465 = (_clReleaseContext(($1464|0))|0);
   HEAP32[$rc>>2] = $1465;
   $1466 = HEAP32[$rc>>2]|0;
   $1467 = ($1466|0)!=(0);
   if ($1467) {
    $1468 = HEAP32[$rc>>2]|0;
    $vararg_ptr288 = ($vararg_buffer286);
    HEAP32[$vararg_ptr288>>2] = (4376);
    $vararg_ptr289 = (($vararg_buffer286) + 4|0);
    HEAP32[$vararg_ptr289>>2] = $1468;
    (_printf(((2160)|0),($vararg_buffer286|0))|0);
   }
   $1469 = HEAP32[$data_array>>2]|0;
   $1470 = $1469;
   _free($1470);
   $1471 = HEAP32[$x_index_array>>2]|0;
   $1472 = $1471;
   _free($1472);
   $1473 = HEAP32[$row_index_array>>2]|0;
   $1474 = $1473;
   _free($1474);
   $1475 = HEAP32[$slab_startrow>>2]|0;
   $1476 = $1475;
   _free($1476);
   $1477 = HEAP32[$seg_workspace>>2]|0;
   $1478 = $1477;
   _free($1478);
   $1479 = HEAP32[$output_array_verify>>2]|0;
   $1480 = $1479;
   _free($1480);
   $1481 = $ddex;
   $1482 = $pdex;
   $1483 = HEAP32[$platform>>2]|0;
   $1484 = (($1483) + (($1482*28)|0)|0);
   $1485 = (($1484) + 12|0);
   $1486 = HEAP32[$1485>>2]|0;
   $1487 = (($1486) + (($1481*24)|0)|0);
   $1488 = (($1487) + 20|0);
   $1489 = HEAP32[$1488>>2]|0;
   _free($1489);
   $i = 0;
   while(1) {
    $1490 = $i;
    $1491 = HEAP32[$num_platforms>>2]|0;
    $1492 = ($1490>>>0)<($1491>>>0);
    if (!($1492)) {
     break;
    }
    $1493 = $i;
    $1494 = HEAP32[$platform>>2]|0;
    $1495 = (($1494) + (($1493*28)|0)|0);
    $1496 = (($1495) + 12|0);
    $1497 = HEAP32[$1496>>2]|0;
    $1498 = $1497;
    _free($1498);
    $1499 = $i;
    $1500 = (($1499) + 1)|0;
    $i = $1500;
   }
   $i = 0;
   while(1) {
    $1501 = $i;
    $1502 = HEAP32[$num_platforms>>2]|0;
    $1503 = ($1501>>>0)<($1502>>>0);
    if (!($1503)) {
     break;
    }
    $1504 = $i;
    $1505 = HEAP32[$platform>>2]|0;
    $1506 = (($1505) + (($1504*28)|0)|0);
    $1507 = ($1506);
    $1508 = HEAP32[$1507>>2]|0;
    _free($1508);
    $1509 = $i;
    $1510 = (($1509) + 1)|0;
    $i = $1510;
   }
   $1511 = HEAP32[$buffer>>2]|0;
   $1512 = $1511;
   _free($1512);
   $1513 = HEAP32[$platform>>2]|0;
   $1514 = $1513;
   _free($1514);
   $1515 = $retval;
   STACKTOP = sp;return ($1515|0);
  }
 }
 else if ((label|0) == 5) {
  __Z5usagev();
  _exit(0);
  // unreachable;
 }
 else if ((label|0) == 13) {
  $42 = $name;
  $vararg_ptr = ($vararg_buffer);
  HEAP32[$vararg_ptr>>2] = $42;
  (_printf(((2088)|0),($vararg_buffer|0))|0);
  _exit(1);
  // unreachable;
 }
 return 0|0;
}
function __ZL19load_program_sourcePKc($filename) {
 $filename = $filename|0;
 var $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $3 = 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $fh = 0, $source = 0, $statbuf = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, $vararg_lifetime_bitcast = 0, $vararg_lifetime_bitcast2 = 0, $vararg_ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 8|0;
 $vararg_buffer1 = sp;
 $vararg_lifetime_bitcast2 = $vararg_buffer1;
 $vararg_buffer = STACKTOP; STACKTOP = STACKTOP + 8|0;
 $vararg_lifetime_bitcast = $vararg_buffer;
 $statbuf = STACKTOP; STACKTOP = STACKTOP + 80|0;
 $2 = $filename;
 $3 = $2;
 $4 = (_fopen(($3|0),((4400)|0))|0);
 $fh = $4;
 $5 = $fh;
 $6 = ($5|0)==(0|0);
 if ($6) {
  $7 = HEAP32[(_stderr)>>2]|0;
  $8 = $2;
  $vararg_ptr = ($vararg_buffer);
  HEAP32[$vararg_ptr>>2] = $8;
  (_fprintf(($7|0),((4408)|0),($vararg_buffer|0))|0);
  $1 = 0;
  $26 = $1;
  STACKTOP = sp;return ($26|0);
 }
 $9 = $2;
 (_stat(($9|0),($statbuf|0))|0);
 $10 = (($statbuf) + 36|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = (($11) + 1)|0;
 $13 = (_malloc($12)|0);
 $source = $13;
 $14 = $source;
 $15 = ($14|0)==(0|0);
 if ($15) {
  $16 = HEAP32[(_stderr)>>2]|0;
  (_fprintf(($16|0),((4432)|0),($vararg_buffer1|0))|0);
  $1 = 0;
  $26 = $1;
  STACKTOP = sp;return ($26|0);
 } else {
  $17 = $source;
  $18 = (($statbuf) + 36|0);
  $19 = HEAP32[$18>>2]|0;
  $20 = $fh;
  (_fread(($17|0),($19|0),1,($20|0))|0);
  $21 = (($statbuf) + 36|0);
  $22 = HEAP32[$21>>2]|0;
  $23 = $source;
  $24 = (($23) + ($22)|0);
  HEAP8[$24] = 0;
  $25 = $source;
  $1 = $25;
  $26 = $1;
  STACKTOP = sp;return ($26|0);
 }
 return 0|0;
}
function _getopt($argc,$argv,$optstring) {
 $argc = $argc|0;
 $argv = $argv|0;
 $optstring = $optstring|0;
 var $$0 = 0, $$pre = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0;
 var $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $8 = 0, $9 = 0, $c = 0, $d = 0, $i$0$lcssa = 0, $i$04 = 0, $k$0 = 0, $or$cond = 0;
 var $or$cond3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0;
 $c = sp;
 $d = sp + 8|0;
 $1 = HEAP32[(4448)>>2]|0;
 $2 = ($1|0)==(0);
 $3 = HEAP32[(4464)>>2]|0;
 $4 = ($3|0)!=(0);
 $or$cond = $2 | $4;
 if ($or$cond) {
  HEAP32[(4464)>>2] = 0;
  HEAP32[(4472)>>2] = 0;
  HEAP32[(4448)>>2] = 1;
  $5 = 1;
 } else {
  $5 = $1;
 }
 $6 = ($5|0)<($argc|0);
 if (!($6)) {
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 $7 = (($argv) + ($5<<2)|0);
 $8 = HEAP32[$7>>2]|0;
 $9 = ($8|0)==(0|0);
 if ($9) {
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 $10 = HEAP8[$8]|0;
 $11 = ($10<<24>>24)==(45);
 if (!($11)) {
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 $12 = (($8) + 1|0);
 $13 = HEAP8[$12]|0;
 if ((($13<<24>>24) == 45)) {
  label = 7;
 } else if ((($13<<24>>24) == 0)) {
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 do {
  if ((label|0) == 7) {
   $14 = (($8) + 2|0);
   $15 = HEAP8[$14]|0;
   $16 = ($15<<24>>24)==(0);
   if (!($16)) {
    break;
   }
   $17 = (($5) + 1)|0;
   HEAP32[(4448)>>2] = $17;
   $$0 = -1;
   STACKTOP = sp;return ($$0|0);
  }
 } while(0);
 $18 = HEAP32[(4472)>>2]|0;
 $19 = ($18|0)==(0);
 if ($19) {
  HEAP32[(4472)>>2] = 1;
  $20 = 1;
 } else {
  $20 = $18;
 }
 $21 = (($8) + ($20)|0);
 $22 = (_mbtowc($c,$21,4)|0);
 $23 = ($22|0)<(0);
 if ($23) {
  HEAP32[$c>>2] = 65533;
  $24 = 65533;$k$0 = 1;
 } else {
  $$pre = HEAP32[$c>>2]|0;
  $24 = $$pre;$k$0 = $22;
 }
 $25 = HEAP32[(4448)>>2]|0;
 $26 = (($argv) + ($25<<2)|0);
 $27 = HEAP32[$26>>2]|0;
 $28 = HEAP32[(4472)>>2]|0;
 $29 = (($27) + ($28)|0);
 HEAP32[(4480)>>2] = $24;
 $30 = (($28) + ($k$0))|0;
 HEAP32[(4472)>>2] = $30;
 $31 = (($27) + ($30)|0);
 $32 = HEAP8[$31]|0;
 $33 = ($32<<24>>24)==(0);
 if ($33) {
  $34 = (($25) + 1)|0;
  HEAP32[(4448)>>2] = $34;
  HEAP32[(4472)>>2] = 0;
 }
 $35 = (_mbtowc($d,$optstring,4)|0);
 $36 = ($35|0)==(0);
 L30: do {
  if ($36) {
   $i$0$lcssa = 0;
  } else {
   $37 = $35;$i$04 = 0;
   while(1) {
    $38 = HEAP32[$d>>2]|0;
    $39 = HEAP32[$c>>2]|0;
    $40 = ($38|0)==($39|0);
    if ($40) {
     $i$0$lcssa = $i$04;
     break L30;
    }
    $41 = ($37|0)<(1);
    $42 = $41 ? 1 : $37;
    $43 = (($42) + ($i$04))|0;
    $44 = (($optstring) + ($43)|0);
    $45 = (_mbtowc($d,$44,4)|0);
    $46 = ($45|0)==(0);
    if ($46) {
     $i$0$lcssa = $43;
     break;
    } else {
     $37 = $45;$i$04 = $43;
    }
   }
  }
 } while(0);
 $47 = HEAP32[$d>>2]|0;
 $48 = HEAP32[$c>>2]|0;
 $49 = ($47|0)==($48|0);
 if (!($49)) {
  $50 = HEAP8[$optstring]|0;
  $51 = ($50<<24>>24)!=(58);
  $52 = HEAP32[(4456)>>2]|0;
  $53 = ($52|0)!=(0);
  $or$cond3 = $51 & $53;
  if (!($or$cond3)) {
   $$0 = 63;
   STACKTOP = sp;return ($$0|0);
  }
  $54 = HEAP32[$argv>>2]|0;
  $55 = (_strlen(($54|0))|0);
  (_write(2,($54|0),($55|0))|0);
  (_write(2,((4488)|0),18)|0);
  (_write(2,($29|0),($k$0|0))|0);
  (_write(2,((4512)|0),1)|0);
  $$0 = 63;
  STACKTOP = sp;return ($$0|0);
 }
 $56 = (($i$0$lcssa) + 1)|0;
 $57 = (($optstring) + ($56)|0);
 $58 = HEAP8[$57]|0;
 $59 = ($58<<24>>24)==(58);
 if (!($59)) {
  $$0 = $47;
  STACKTOP = sp;return ($$0|0);
 }
 $60 = HEAP32[(4448)>>2]|0;
 $61 = ($60|0)<($argc|0);
 if ($61) {
  $68 = (($60) + 1)|0;
  HEAP32[(4448)>>2] = $68;
  $69 = (($argv) + ($60<<2)|0);
  $70 = HEAP32[$69>>2]|0;
  $71 = HEAP32[(4472)>>2]|0;
  $72 = (($70) + ($71)|0);
  HEAP32[(4552)>>2] = $72;
  HEAP32[(4472)>>2] = 0;
  $$0 = $47;
  STACKTOP = sp;return ($$0|0);
 }
 $62 = HEAP8[$optstring]|0;
 $63 = ($62<<24>>24)==(58);
 if ($63) {
  $$0 = 58;
  STACKTOP = sp;return ($$0|0);
 }
 $64 = HEAP32[(4456)>>2]|0;
 $65 = ($64|0)==(0);
 if ($65) {
  $$0 = 63;
  STACKTOP = sp;return ($$0|0);
 }
 $66 = HEAP32[$argv>>2]|0;
 $67 = (_strlen(($66|0))|0);
 (_write(2,($66|0),($67|0))|0);
 (_write(2,((4520)|0),31)|0);
 (_write(2,($29|0),($k$0|0))|0);
 (_write(2,((4512)|0),1)|0);
 $$0 = 63;
 STACKTOP = sp;return ($$0|0);
}
function _getopt_long($argc,$argv,$optstring,$longopts,$idx) {
 $argc = $argc|0;
 $argv = $argv|0;
 $optstring = $optstring|0;
 $longopts = $longopts|0;
 $idx = $idx|0;
 var $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = (___getopt_long($argc,$argv,$optstring,$longopts,$idx,0)|0);
 STACKTOP = sp;return ($1|0);
}
function ___getopt_long($argc,$argv,$optstring,$longopts,$idx,$longonly) {
 $argc = $argc|0;
 $argv = $argv|0;
 $optstring = $optstring|0;
 $longopts = $longopts|0;
 $idx = $idx|0;
 $longonly = $longonly|0;
 var $$ = 0, $$0 = 0, $$phi$trans$insert = 0, $$pr = 0, $$pre = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0;
 var $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0;
 var $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, $i$018 = 0, $name$05 = 0, $opt$04 = 0, $opt$06 = 0, $or$cond = 0, $phitmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = HEAP32[(4448)>>2]|0;
 $2 = ($1|0)==(0);
 $3 = HEAP32[(4464)>>2]|0;
 $4 = ($3|0)!=(0);
 $or$cond = $2 | $4;
 if ($or$cond) {
  HEAP32[(4464)>>2] = 0;
  HEAP32[(4472)>>2] = 0;
  HEAP32[(4448)>>2] = 1;
  $5 = 1;
 } else {
  $5 = $1;
 }
 $6 = ($5|0)<($argc|0);
 if (!($6)) {
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 $7 = (($argv) + ($5<<2)|0);
 $8 = HEAP32[$7>>2]|0;
 $9 = ($8|0)==(0|0);
 if ($9) {
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 $10 = HEAP8[$8]|0;
 $11 = ($10<<24>>24)==(45);
 if (!($11)) {
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 $12 = ($longonly|0)==(0);
 $$phi$trans$insert = (($8) + 1|0);
 $$pre = HEAP8[$$phi$trans$insert]|0;
 do {
  if ($12) {
   $phitmp = ($$pre<<24>>24)==(45);
   if (!($phitmp)) {
    break;
   }
   $14 = (($8) + 2|0);
   $15 = HEAP8[$14]|0;
   $16 = ($15<<24>>24)==(0);
   if (!($16)) {
    $17 = 45;
    label = 10;
   }
  } else {
   $13 = ($$pre<<24>>24)==(0);
   if (!($13)) {
    $17 = $$pre;
    label = 10;
   }
  }
 } while(0);
 do {
  if ((label|0) == 10) {
   $18 = ($longopts);
   $19 = HEAP32[$18>>2]|0;
   $20 = ($19|0)==(0|0);
   $21 = (($8) + 1|0);
   $22 = ($17<<24>>24)==(45);
   L19: do {
    if (!($20)) {
     $23 = $19;$i$018 = 0;
     L20: while(1) {
      $24 = (($8) + 2|0);
      $$ = $22 ? $24 : $21;
      $25 = HEAP8[$23]|0;
      $26 = ($25<<24>>24)==(0);
      L22: do {
       if ($26) {
        $opt$04 = $$;
        label = 15;
       } else {
        $$pr = $25;$name$05 = $23;$opt$06 = $$;
        while(1) {
         $27 = HEAP8[$opt$06]|0;
         $28 = ($$pr<<24>>24)==($27<<24>>24);
         if (!($28)) {
          break;
         }
         $29 = (($name$05) + 1|0);
         $30 = (($opt$06) + 1|0);
         $31 = HEAP8[$29]|0;
         $32 = ($31<<24>>24)==(0);
         if ($32) {
          $opt$04 = $30;
          label = 15;
          break L22;
         } else {
          $$pr = $31;$name$05 = $29;$opt$06 = $30;
         }
        }
        $33 = ($$pr<<24>>24)==(0);
        if ($33) {
         $opt$04 = $opt$06;
         label = 15;
        }
       }
      } while(0);
      do {
       if ((label|0) == 15) {
        label = 0;
        $34 = HEAP8[$opt$04]|0;
        if (!((($34<<24>>24) == 61) | (($34<<24>>24) == 0))) {
         break;
        }
        $35 = ($34<<24>>24)==(61);
        $36 = ((($longopts) + ($i$018<<4)|0) + 4|0);
        $37 = HEAP32[$36>>2]|0;
        if (!($35)) {
         label = 19;
         break L20;
        }
        $38 = ($37|0)==(0);
        if (!($38)) {
         label = 18;
         break L20;
        }
       }
      } while(0);
      $53 = (($i$018) + 1)|0;
      $54 = (($longopts) + ($53<<4)|0);
      $55 = HEAP32[$54>>2]|0;
      $56 = ($55|0)==(0|0);
      if ($56) {
       break L19;
      } else {
       $23 = $55;$i$018 = $53;
      }
     }
     do {
      if ((label|0) == 18) {
       $39 = (($opt$04) + 1|0);
       HEAP32[(4552)>>2] = $39;
       $45 = $5;
      }
      else if ((label|0) == 19) {
       $40 = ($37|0)==(1);
       if (!($40)) {
        HEAP32[(4552)>>2] = 0;
        $45 = $5;
        break;
       }
       $41 = (($5) + 1)|0;
       HEAP32[(4448)>>2] = $41;
       $42 = (($argv) + ($41<<2)|0);
       $43 = HEAP32[$42>>2]|0;
       HEAP32[(4552)>>2] = $43;
       $44 = ($43|0)==(0|0);
       if ($44) {
        $$0 = 58;
       } else {
        $45 = $41;
        break;
       }
       STACKTOP = sp;return ($$0|0);
      }
     } while(0);
     $46 = (($45) + 1)|0;
     HEAP32[(4448)>>2] = $46;
     $47 = ($idx|0)==(0|0);
     if (!($47)) {
      HEAP32[$idx>>2] = $i$018;
     }
     $48 = ((($longopts) + ($i$018<<4)|0) + 8|0);
     $49 = HEAP32[$48>>2]|0;
     $50 = ($49|0)==(0|0);
     $51 = ((($longopts) + ($i$018<<4)|0) + 12|0);
     $52 = HEAP32[$51>>2]|0;
     if ($50) {
      $$0 = $52;
      STACKTOP = sp;return ($$0|0);
     }
     HEAP32[$49>>2] = $52;
     $$0 = 0;
     STACKTOP = sp;return ($$0|0);
    }
   } while(0);
   if (!($22)) {
    break;
   }
   $57 = (($5) + 1)|0;
   HEAP32[(4448)>>2] = $57;
   $$0 = 63;
   STACKTOP = sp;return ($$0|0);
  }
 } while(0);
 $58 = (_getopt($argc,$argv,$optstring)|0);
 $$0 = $58;
 STACKTOP = sp;return ($$0|0);
}
function _mbtowc($wc,$src,$n) {
 $wc = $wc|0;
 $src = $src|0;
 $n = $n|0;
 var $$0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 8|0;
 $1 = sp;
 HEAP32[$1>>2] = $wc;
 $2 = ($src|0)==(0|0);
 if ($2) {
  $$0 = 0;
  STACKTOP = sp;return ($$0|0);
 }
 $3 = ($n|0)==(0);
 do {
  if (!($3)) {
   $4 = ($wc|0)==(0|0);
   if ($4) {
    $5 = $1;
    HEAP32[$1>>2] = $5;
    $6 = $5;
   } else {
    $6 = $wc;
   }
   $7 = HEAP8[$src]|0;
   $8 = $7&255;
   $9 = ($7<<24>>24)>(-1);
   if ($9) {
    HEAP32[$6>>2] = $8;
    $10 = ($7<<24>>24)!=(0);
    $11 = $10&1;
    $$0 = $11;
    STACKTOP = sp;return ($$0|0);
   }
   $12 = (($8) + -194)|0;
   $13 = ($12>>>0)>(50);
   if ($13) {
    break;
   }
   $14 = (($src) + 1|0);
   $15 = ((4560) + ($12<<2)|0);
   $16 = HEAP32[$15>>2]|0;
   $17 = ($n>>>0)<(4);
   if ($17) {
    $18 = ($n*6)|0;
    $19 = (($18) + -6)|0;
    $20 = -2147483648 >>> $19;
    $21 = $16 & $20;
    $22 = ($21|0)==(0);
    if (!($22)) {
     break;
    }
   }
   $23 = HEAP8[$14]|0;
   $24 = $23&255;
   $25 = $24 >>> 3;
   $26 = (($25) + -16)|0;
   $27 = $16 >> 26;
   $28 = (($25) + ($27))|0;
   $29 = $26 | $28;
   $30 = ($29>>>0)>(7);
   if ($30) {
    break;
   }
   $31 = $16 << 6;
   $32 = (($24) + -128)|0;
   $33 = $32 | $31;
   $34 = ($33|0)<(0);
   if (!($34)) {
    HEAP32[$6>>2] = $33;
    $$0 = 2;
    STACKTOP = sp;return ($$0|0);
   }
   $35 = (($src) + 2|0);
   $36 = HEAP8[$35]|0;
   $37 = $36&255;
   $38 = (($37) + -128)|0;
   $39 = ($38>>>0)>(63);
   if ($39) {
    break;
   }
   $40 = $33 << 6;
   $41 = $38 | $40;
   $42 = ($41|0)<(0);
   if (!($42)) {
    HEAP32[$6>>2] = $41;
    $$0 = 3;
    STACKTOP = sp;return ($$0|0);
   }
   $43 = (($src) + 3|0);
   $44 = HEAP8[$43]|0;
   $45 = $44&255;
   $46 = (($45) + -128)|0;
   $47 = ($46>>>0)>(63);
   if ($47) {
    break;
   }
   $48 = $41 << 6;
   $49 = $46 | $48;
   HEAP32[$6>>2] = $49;
   $$0 = 4;
   STACKTOP = sp;return ($$0|0);
  }
 } while(0);
 $50 = (___errno_location()|0);
 HEAP32[$50>>2] = 84;
 $$0 = -1;
 STACKTOP = sp;return ($$0|0);
}
function _malloc($bytes) {
 $bytes = $bytes|0;
 var $$$i = 0, $$3$i = 0, $$4$i = 0, $$c$i$i = 0, $$c6$i$i = 0, $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i25 = 0, $$pre$i25$i = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i26$iZ2D = 0, $$pre$phi$i26Z2D = 0, $$pre$phi$iZ2D = 0, $$pre$phi58$i$iZ2D = 0, $$pre$phiZ2D = 0, $$pre57$i$i = 0, $$rsize$0$i = 0, $$rsize$3$i = 0, $$sum = 0;
 var $$sum$i$i = 0, $$sum$i$i$i = 0, $$sum$i14$i = 0, $$sum$i15$i = 0, $$sum$i18$i = 0, $$sum$i21$i = 0, $$sum$i2334 = 0, $$sum$i32 = 0, $$sum$i35 = 0, $$sum1 = 0, $$sum1$i = 0, $$sum1$i$i = 0, $$sum1$i16$i = 0, $$sum1$i22$i = 0, $$sum1$i24 = 0, $$sum10 = 0, $$sum10$i = 0, $$sum10$i$i = 0, $$sum10$pre$i$i = 0, $$sum107$i = 0;
 var $$sum108$i = 0, $$sum109$i = 0, $$sum11$i = 0, $$sum11$i$i = 0, $$sum11$i24$i = 0, $$sum110$i = 0, $$sum111$i = 0, $$sum1112 = 0, $$sum112$i = 0, $$sum113$i = 0, $$sum114$i = 0, $$sum115$i = 0, $$sum116$i = 0, $$sum117$i = 0, $$sum118$i = 0, $$sum119$i = 0, $$sum12$i = 0, $$sum12$i$i = 0, $$sum120$i = 0, $$sum13$i = 0;
 var $$sum13$i$i = 0, $$sum14$i$i = 0, $$sum14$pre$i = 0, $$sum15$i = 0, $$sum15$i$i = 0, $$sum16$i = 0, $$sum16$i$i = 0, $$sum17$i = 0, $$sum17$i$i = 0, $$sum18$i = 0, $$sum1819$i$i = 0, $$sum2 = 0, $$sum2$i = 0, $$sum2$i$i = 0, $$sum2$i$i$i = 0, $$sum2$i17$i = 0, $$sum2$i19$i = 0, $$sum2$i23$i = 0, $$sum2$pre$i = 0, $$sum20$i$i = 0;
 var $$sum21$i$i = 0, $$sum22$i$i = 0, $$sum23$i$i = 0, $$sum24$i$i = 0, $$sum25$i$i = 0, $$sum26$pre$i$i = 0, $$sum27$i$i = 0, $$sum28$i$i = 0, $$sum29$i$i = 0, $$sum3$i = 0, $$sum3$i$i = 0, $$sum3$i27 = 0, $$sum30$i$i = 0, $$sum3132$i$i = 0, $$sum34$i$i = 0, $$sum3536$i$i = 0, $$sum3738$i$i = 0, $$sum39$i$i = 0, $$sum4 = 0, $$sum4$i = 0;
 var $$sum4$i28 = 0, $$sum40$i$i = 0, $$sum41$i$i = 0, $$sum42$i$i = 0, $$sum5$i = 0, $$sum5$i$i = 0, $$sum56 = 0, $$sum6$i = 0, $$sum67$i$i = 0, $$sum7$i = 0, $$sum8$i = 0, $$sum8$pre = 0, $$sum9 = 0, $$sum9$i = 0, $$sum9$i$i = 0, $$tsize$1$i = 0, $$v$0$i = 0, $1 = 0, $10 = 0, $100 = 0;
 var $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0;
 var $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0;
 var $1037 = 0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0;
 var $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0, $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0, $1070 = 0, $1071 = 0, $1072 = 0;
 var $1073 = 0, $1074 = 0, $1075 = 0, $1076 = 0, $1077 = 0, $1078 = 0, $1079 = 0, $108 = 0, $1080 = 0, $1081 = 0, $1082 = 0, $1083 = 0, $1084 = 0, $1085 = 0, $1086 = 0, $1087 = 0, $1088 = 0, $1089 = 0, $109 = 0, $1090 = 0;
 var $1091 = 0, $1092 = 0, $1093 = 0, $1094 = 0, $1095 = 0, $1096 = 0, $1097 = 0, $1098 = 0, $1099 = 0, $11 = 0, $110 = 0, $1100 = 0, $1101 = 0, $1102 = 0, $1103 = 0, $1104 = 0, $1105 = 0, $1106 = 0, $1107 = 0, $1108 = 0;
 var $1109 = 0, $111 = 0, $1110 = 0, $1111 = 0, $1112 = 0, $1113 = 0, $1114 = 0, $1114$phi = 0, $1115 = 0, $1116 = 0, $1117 = 0, $1118 = 0, $1119 = 0, $112 = 0, $1120 = 0, $1121 = 0, $1122 = 0, $1123 = 0, $1124 = 0, $1125 = 0;
 var $1126 = 0, $1127 = 0, $1128 = 0, $1129 = 0, $113 = 0, $1130 = 0, $1131 = 0, $1132 = 0, $1133 = 0, $1134 = 0, $1135 = 0, $1136 = 0, $1137 = 0, $1138 = 0, $1139 = 0, $114 = 0, $1140 = 0, $1141 = 0, $1142 = 0, $1143 = 0;
 var $1144 = 0, $1145 = 0, $1146 = 0, $1147 = 0, $1148 = 0, $1149 = 0, $115 = 0, $1150 = 0, $1151 = 0, $1152 = 0, $1153 = 0, $1154 = 0, $1155 = 0, $1156 = 0, $1157 = 0, $1158 = 0, $1159 = 0, $116 = 0, $1160 = 0, $1161 = 0;
 var $1162 = 0, $1163 = 0, $1164 = 0, $1165 = 0, $1166 = 0, $1167 = 0, $1168 = 0, $1169 = 0, $117 = 0, $1170 = 0, $1171 = 0, $1172 = 0, $1173 = 0, $1174 = 0, $1175 = 0, $1176 = 0, $1177 = 0, $1178 = 0, $1179 = 0, $118 = 0;
 var $1180 = 0, $1181 = 0, $1182 = 0, $1183 = 0, $1184 = 0, $1185 = 0, $1186 = 0, $1187 = 0, $1188 = 0, $1189 = 0, $119 = 0, $1190 = 0, $1191 = 0, $1192 = 0, $1193 = 0, $1194 = 0, $1195 = 0, $1196 = 0, $1197 = 0, $1198 = 0;
 var $1199 = 0, $12 = 0, $120 = 0, $1200 = 0, $1201 = 0, $1202 = 0, $1203 = 0, $1204 = 0, $1205 = 0, $1206 = 0, $1207 = 0, $1208 = 0, $1209 = 0, $121 = 0, $1210 = 0, $1211 = 0, $1212 = 0, $1213 = 0, $1214 = 0, $1215 = 0;
 var $1216 = 0, $1217 = 0, $1218 = 0, $1219 = 0, $122 = 0, $1220 = 0, $1221 = 0, $1222 = 0, $1223 = 0, $1224 = 0, $1225 = 0, $1226 = 0, $1227 = 0, $1228 = 0, $1229 = 0, $123 = 0, $1230 = 0, $1231 = 0, $1232 = 0, $1233 = 0;
 var $1234 = 0, $1235 = 0, $1236 = 0, $1237 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0;
 var $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0;
 var $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0;
 var $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0;
 var $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0;
 var $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0;
 var $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0;
 var $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0;
 var $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0;
 var $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0;
 var $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0;
 var $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0;
 var $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0;
 var $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0;
 var $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0;
 var $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0;
 var $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0;
 var $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0;
 var $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0;
 var $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0;
 var $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0;
 var $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0;
 var $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0;
 var $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0;
 var $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0;
 var $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0;
 var $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0;
 var $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0;
 var $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0;
 var $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0;
 var $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0;
 var $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0;
 var $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0;
 var $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0;
 var $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0;
 var $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0;
 var $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0;
 var $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0;
 var $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0;
 var $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0;
 var $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0;
 var $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0;
 var $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0;
 var $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0;
 var $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0;
 var $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0;
 var $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0;
 var $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0, $985 = 0;
 var $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $F$0$i$i = 0, $F1$0$i = 0, $F4$0 = 0, $F4$0$i$i = 0, $F5$0$i = 0;
 var $I1$0$c$i$i = 0, $I1$0$i$i = 0, $I7$0$i = 0, $I7$0$i$i = 0, $K12$025$i = 0, $K2$014$i$i = 0, $K8$052$i$i = 0, $R$0$i = 0, $R$0$i$i = 0, $R$0$i$i$phi = 0, $R$0$i$phi = 0, $R$0$i18 = 0, $R$0$i18$phi = 0, $R$1$i = 0, $R$1$i$i = 0, $R$1$i20 = 0, $RP$0$i = 0, $RP$0$i$i = 0, $RP$0$i$i$phi = 0, $RP$0$i$phi = 0;
 var $RP$0$i17 = 0, $RP$0$i17$phi = 0, $T$0$c$i$i = 0, $T$0$c7$i$i = 0, $T$0$lcssa$i = 0, $T$0$lcssa$i$i = 0, $T$0$lcssa$i28$i = 0, $T$013$i$i = 0, $T$013$i$i$phi = 0, $T$024$i = 0, $T$024$i$phi = 0, $T$051$i$i = 0, $T$051$i$i$phi = 0, $br$0$i = 0, $cond$i = 0, $cond$i$i = 0, $cond$i21 = 0, $exitcond$i$i = 0, $i$02$i$i = 0, $i$02$i$i$phi = 0;
 var $idx$0$i = 0, $mem$0 = 0, $nb$0 = 0, $notlhs$i = 0, $notrhs$i = 0, $oldfirst$0$i$i = 0, $or$cond$i = 0, $or$cond$i29 = 0, $or$cond1$i = 0, $or$cond10$i = 0, $or$cond19$i = 0, $or$cond2$i = 0, $or$cond49$i = 0, $or$cond5$i = 0, $or$cond6$i = 0, $or$cond8$not$i = 0, $or$cond9$i = 0, $qsize$0$i$i = 0, $rsize$0$i = 0, $rsize$0$i15 = 0;
 var $rsize$1$i = 0, $rsize$2$i = 0, $rsize$3$lcssa$i = 0, $rsize$329$i = 0, $rsize$329$i$phi = 0, $rst$0$i = 0, $rst$1$i = 0, $sizebits$0$i = 0, $sp$0$i$i = 0, $sp$0$i$i$i = 0, $sp$075$i = 0, $sp$168$i = 0, $ssize$0$$i = 0, $ssize$0$i = 0, $ssize$1$i = 0, $ssize$2$i = 0, $t$0$i = 0, $t$0$i14 = 0, $t$1$i = 0, $t$2$ph$i = 0;
 var $t$2$v$3$i = 0, $t$228$i = 0, $t$228$i$phi = 0, $tbase$0$i = 0, $tbase$247$i = 0, $tsize$0$i = 0, $tsize$0323841$i = 0, $tsize$1$i = 0, $tsize$246$i = 0, $v$0$i = 0, $v$0$i16 = 0, $v$1$i = 0, $v$2$i = 0, $v$3$lcssa$i = 0, $v$330$i = 0, $v$330$i$phi = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($bytes>>>0)<(245);
 do {
  if ($1) {
   $2 = ($bytes>>>0)<(11);
   if ($2) {
    $5 = 16;
   } else {
    $3 = (($bytes) + 11)|0;
    $4 = $3 & -8;
    $5 = $4;
   }
   $6 = $5 >>> 3;
   $7 = HEAP32[((4768))>>2]|0;
   $8 = $7 >>> $6;
   $9 = $8 & 3;
   $10 = ($9|0)==(0);
   if (!($10)) {
    $11 = $8 & 1;
    $12 = $11 ^ 1;
    $13 = (($12) + ($6))|0;
    $14 = $13 << 1;
    $15 = (((4768) + ($14<<2)|0) + 40|0);
    $16 = $15;
    $$sum10 = (($14) + 2)|0;
    $17 = (((4768) + ($$sum10<<2)|0) + 40|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = (($18) + 8|0);
    $20 = HEAP32[$19>>2]|0;
    $21 = ($16|0)==($20|0);
    do {
     if ($21) {
      $22 = 1 << $13;
      $23 = $22 ^ -1;
      $24 = $7 & $23;
      HEAP32[((4768))>>2] = $24;
     } else {
      $25 = $20;
      $26 = HEAP32[(((4768) + 16|0))>>2]|0;
      $27 = ($25>>>0)<($26>>>0);
      if ($27) {
       _abort();
       // unreachable;
      }
      $28 = (($20) + 12|0);
      $29 = HEAP32[$28>>2]|0;
      $30 = ($29|0)==($18|0);
      if ($30) {
       HEAP32[$28>>2] = $16;
       HEAP32[$17>>2] = $20;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $31 = $13 << 3;
    $32 = $31 | 3;
    $33 = (($18) + 4|0);
    HEAP32[$33>>2] = $32;
    $34 = $18;
    $$sum1112 = $31 | 4;
    $35 = (($34) + ($$sum1112)|0);
    $36 = $35;
    $37 = HEAP32[$36>>2]|0;
    $38 = $37 | 1;
    HEAP32[$36>>2] = $38;
    $39 = $19;
    $mem$0 = $39;
    STACKTOP = sp;return ($mem$0|0);
   }
   $40 = HEAP32[(((4768) + 8|0))>>2]|0;
   $41 = ($5>>>0)>($40>>>0);
   if (!($41)) {
    $nb$0 = $5;
    break;
   }
   $42 = ($8|0)==(0);
   if (!($42)) {
    $43 = $8 << $6;
    $44 = 2 << $6;
    $45 = (0 - ($44))|0;
    $46 = $44 | $45;
    $47 = $43 & $46;
    $48 = (0 - ($47))|0;
    $49 = $47 & $48;
    $50 = (($49) + -1)|0;
    $51 = $50 >>> 12;
    $52 = $51 & 16;
    $53 = $50 >>> $52;
    $54 = $53 >>> 5;
    $55 = $54 & 8;
    $56 = $55 | $52;
    $57 = $53 >>> $55;
    $58 = $57 >>> 2;
    $59 = $58 & 4;
    $60 = $56 | $59;
    $61 = $57 >>> $59;
    $62 = $61 >>> 1;
    $63 = $62 & 2;
    $64 = $60 | $63;
    $65 = $61 >>> $63;
    $66 = $65 >>> 1;
    $67 = $66 & 1;
    $68 = $64 | $67;
    $69 = $65 >>> $67;
    $70 = (($68) + ($69))|0;
    $71 = $70 << 1;
    $72 = (((4768) + ($71<<2)|0) + 40|0);
    $73 = $72;
    $$sum4 = (($71) + 2)|0;
    $74 = (((4768) + ($$sum4<<2)|0) + 40|0);
    $75 = HEAP32[$74>>2]|0;
    $76 = (($75) + 8|0);
    $77 = HEAP32[$76>>2]|0;
    $78 = ($73|0)==($77|0);
    do {
     if ($78) {
      $79 = 1 << $70;
      $80 = $79 ^ -1;
      $81 = $7 & $80;
      HEAP32[((4768))>>2] = $81;
     } else {
      $82 = $77;
      $83 = HEAP32[(((4768) + 16|0))>>2]|0;
      $84 = ($82>>>0)<($83>>>0);
      if ($84) {
       _abort();
       // unreachable;
      }
      $85 = (($77) + 12|0);
      $86 = HEAP32[$85>>2]|0;
      $87 = ($86|0)==($75|0);
      if ($87) {
       HEAP32[$85>>2] = $73;
       HEAP32[$74>>2] = $77;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $88 = $70 << 3;
    $89 = (($88) - ($5))|0;
    $90 = $5 | 3;
    $91 = (($75) + 4|0);
    HEAP32[$91>>2] = $90;
    $92 = $75;
    $93 = (($92) + ($5)|0);
    $94 = $93;
    $95 = $89 | 1;
    $$sum56 = $5 | 4;
    $96 = (($92) + ($$sum56)|0);
    $97 = $96;
    HEAP32[$97>>2] = $95;
    $98 = (($92) + ($88)|0);
    $99 = $98;
    HEAP32[$99>>2] = $89;
    $100 = HEAP32[(((4768) + 8|0))>>2]|0;
    $101 = ($100|0)==(0);
    if (!($101)) {
     $102 = HEAP32[(((4768) + 20|0))>>2]|0;
     $103 = $100 >>> 3;
     $104 = $103 << 1;
     $105 = (((4768) + ($104<<2)|0) + 40|0);
     $106 = $105;
     $107 = HEAP32[((4768))>>2]|0;
     $108 = 1 << $103;
     $109 = $107 & $108;
     $110 = ($109|0)==(0);
     do {
      if ($110) {
       $111 = $107 | $108;
       HEAP32[((4768))>>2] = $111;
       $$sum8$pre = (($104) + 2)|0;
       $$pre = (((4768) + ($$sum8$pre<<2)|0) + 40|0);
       $$pre$phiZ2D = $$pre;$F4$0 = $106;
      } else {
       $$sum9 = (($104) + 2)|0;
       $112 = (((4768) + ($$sum9<<2)|0) + 40|0);
       $113 = HEAP32[$112>>2]|0;
       $114 = $113;
       $115 = HEAP32[(((4768) + 16|0))>>2]|0;
       $116 = ($114>>>0)<($115>>>0);
       if (!($116)) {
        $$pre$phiZ2D = $112;$F4$0 = $113;
        break;
       }
       _abort();
       // unreachable;
      }
     } while(0);
     HEAP32[$$pre$phiZ2D>>2] = $102;
     $117 = (($F4$0) + 12|0);
     HEAP32[$117>>2] = $102;
     $118 = (($102) + 8|0);
     HEAP32[$118>>2] = $F4$0;
     $119 = (($102) + 12|0);
     HEAP32[$119>>2] = $106;
    }
    HEAP32[(((4768) + 8|0))>>2] = $89;
    HEAP32[(((4768) + 20|0))>>2] = $94;
    $120 = $76;
    $mem$0 = $120;
    STACKTOP = sp;return ($mem$0|0);
   }
   $121 = HEAP32[(((4768) + 4|0))>>2]|0;
   $122 = ($121|0)==(0);
   if ($122) {
    $nb$0 = $5;
    break;
   }
   $123 = (0 - ($121))|0;
   $124 = $121 & $123;
   $125 = (($124) + -1)|0;
   $126 = $125 >>> 12;
   $127 = $126 & 16;
   $128 = $125 >>> $127;
   $129 = $128 >>> 5;
   $130 = $129 & 8;
   $131 = $130 | $127;
   $132 = $128 >>> $130;
   $133 = $132 >>> 2;
   $134 = $133 & 4;
   $135 = $131 | $134;
   $136 = $132 >>> $134;
   $137 = $136 >>> 1;
   $138 = $137 & 2;
   $139 = $135 | $138;
   $140 = $136 >>> $138;
   $141 = $140 >>> 1;
   $142 = $141 & 1;
   $143 = $139 | $142;
   $144 = $140 >>> $142;
   $145 = (($143) + ($144))|0;
   $146 = (((4768) + ($145<<2)|0) + 304|0);
   $147 = HEAP32[$146>>2]|0;
   $148 = (($147) + 4|0);
   $149 = HEAP32[$148>>2]|0;
   $150 = $149 & -8;
   $151 = (($150) - ($5))|0;
   $rsize$0$i = $151;$t$0$i = $147;$v$0$i = $147;
   while(1) {
    $152 = (($t$0$i) + 16|0);
    $153 = HEAP32[$152>>2]|0;
    $154 = ($153|0)==(0|0);
    if ($154) {
     $155 = (($t$0$i) + 20|0);
     $156 = HEAP32[$155>>2]|0;
     $157 = ($156|0)==(0|0);
     if ($157) {
      break;
     } else {
      $158 = $156;
     }
    } else {
     $158 = $153;
    }
    $159 = (($158) + 4|0);
    $160 = HEAP32[$159>>2]|0;
    $161 = $160 & -8;
    $162 = (($161) - ($5))|0;
    $163 = ($162>>>0)<($rsize$0$i>>>0);
    $$rsize$0$i = $163 ? $162 : $rsize$0$i;
    $$v$0$i = $163 ? $158 : $v$0$i;
    $rsize$0$i = $$rsize$0$i;$t$0$i = $158;$v$0$i = $$v$0$i;
   }
   $164 = $v$0$i;
   $165 = HEAP32[(((4768) + 16|0))>>2]|0;
   $166 = ($164>>>0)<($165>>>0);
   if ($166) {
    _abort();
    // unreachable;
   }
   $167 = (($164) + ($5)|0);
   $168 = $167;
   $169 = ($164>>>0)<($167>>>0);
   if (!($169)) {
    _abort();
    // unreachable;
   }
   $170 = (($v$0$i) + 24|0);
   $171 = HEAP32[$170>>2]|0;
   $172 = (($v$0$i) + 12|0);
   $173 = HEAP32[$172>>2]|0;
   $174 = ($173|0)==($v$0$i|0);
   do {
    if ($174) {
     $185 = (($v$0$i) + 20|0);
     $186 = HEAP32[$185>>2]|0;
     $187 = ($186|0)==(0|0);
     if ($187) {
      $188 = (($v$0$i) + 16|0);
      $189 = HEAP32[$188>>2]|0;
      $190 = ($189|0)==(0|0);
      if ($190) {
       $R$1$i = 0;
       break;
      } else {
       $R$0$i = $189;$RP$0$i = $188;
      }
     } else {
      $R$0$i = $186;$RP$0$i = $185;
     }
     while(1) {
      $191 = (($R$0$i) + 20|0);
      $192 = HEAP32[$191>>2]|0;
      $193 = ($192|0)==(0|0);
      if (!($193)) {
       $RP$0$i$phi = $191;$R$0$i$phi = $192;$RP$0$i = $RP$0$i$phi;$R$0$i = $R$0$i$phi;
       continue;
      }
      $194 = (($R$0$i) + 16|0);
      $195 = HEAP32[$194>>2]|0;
      $196 = ($195|0)==(0|0);
      if ($196) {
       break;
      } else {
       $R$0$i = $195;$RP$0$i = $194;
      }
     }
     $197 = $RP$0$i;
     $198 = ($197>>>0)<($165>>>0);
     if ($198) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0$i>>2] = 0;
      $R$1$i = $R$0$i;
      break;
     }
    } else {
     $175 = (($v$0$i) + 8|0);
     $176 = HEAP32[$175>>2]|0;
     $177 = $176;
     $178 = ($177>>>0)<($165>>>0);
     if ($178) {
      _abort();
      // unreachable;
     }
     $179 = (($176) + 12|0);
     $180 = HEAP32[$179>>2]|0;
     $181 = ($180|0)==($v$0$i|0);
     if (!($181)) {
      _abort();
      // unreachable;
     }
     $182 = (($173) + 8|0);
     $183 = HEAP32[$182>>2]|0;
     $184 = ($183|0)==($v$0$i|0);
     if ($184) {
      HEAP32[$179>>2] = $173;
      HEAP32[$182>>2] = $176;
      $R$1$i = $173;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $199 = ($171|0)==(0|0);
   L78: do {
    if (!($199)) {
     $200 = (($v$0$i) + 28|0);
     $201 = HEAP32[$200>>2]|0;
     $202 = (((4768) + ($201<<2)|0) + 304|0);
     $203 = HEAP32[$202>>2]|0;
     $204 = ($v$0$i|0)==($203|0);
     do {
      if ($204) {
       HEAP32[$202>>2] = $R$1$i;
       $cond$i = ($R$1$i|0)==(0|0);
       if (!($cond$i)) {
        break;
       }
       $205 = 1 << $201;
       $206 = $205 ^ -1;
       $207 = HEAP32[(((4768) + 4|0))>>2]|0;
       $208 = $207 & $206;
       HEAP32[(((4768) + 4|0))>>2] = $208;
       break L78;
      } else {
       $209 = $171;
       $210 = HEAP32[(((4768) + 16|0))>>2]|0;
       $211 = ($209>>>0)<($210>>>0);
       if ($211) {
        _abort();
        // unreachable;
       }
       $212 = (($171) + 16|0);
       $213 = HEAP32[$212>>2]|0;
       $214 = ($213|0)==($v$0$i|0);
       if ($214) {
        HEAP32[$212>>2] = $R$1$i;
       } else {
        $215 = (($171) + 20|0);
        HEAP32[$215>>2] = $R$1$i;
       }
       $216 = ($R$1$i|0)==(0|0);
       if ($216) {
        break L78;
       }
      }
     } while(0);
     $217 = $R$1$i;
     $218 = HEAP32[(((4768) + 16|0))>>2]|0;
     $219 = ($217>>>0)<($218>>>0);
     if ($219) {
      _abort();
      // unreachable;
     }
     $220 = (($R$1$i) + 24|0);
     HEAP32[$220>>2] = $171;
     $221 = (($v$0$i) + 16|0);
     $222 = HEAP32[$221>>2]|0;
     $223 = ($222|0)==(0|0);
     do {
      if (!($223)) {
       $224 = $222;
       $225 = HEAP32[(((4768) + 16|0))>>2]|0;
       $226 = ($224>>>0)<($225>>>0);
       if ($226) {
        _abort();
        // unreachable;
       } else {
        $227 = (($R$1$i) + 16|0);
        HEAP32[$227>>2] = $222;
        $228 = (($222) + 24|0);
        HEAP32[$228>>2] = $R$1$i;
        break;
       }
      }
     } while(0);
     $229 = (($v$0$i) + 20|0);
     $230 = HEAP32[$229>>2]|0;
     $231 = ($230|0)==(0|0);
     if ($231) {
      break;
     }
     $232 = $230;
     $233 = HEAP32[(((4768) + 16|0))>>2]|0;
     $234 = ($232>>>0)<($233>>>0);
     if ($234) {
      _abort();
      // unreachable;
     } else {
      $235 = (($R$1$i) + 20|0);
      HEAP32[$235>>2] = $230;
      $236 = (($230) + 24|0);
      HEAP32[$236>>2] = $R$1$i;
      break;
     }
    }
   } while(0);
   $237 = ($rsize$0$i>>>0)<(16);
   if ($237) {
    $238 = (($rsize$0$i) + ($5))|0;
    $239 = $238 | 3;
    $240 = (($v$0$i) + 4|0);
    HEAP32[$240>>2] = $239;
    $$sum4$i = (($238) + 4)|0;
    $241 = (($164) + ($$sum4$i)|0);
    $242 = $241;
    $243 = HEAP32[$242>>2]|0;
    $244 = $243 | 1;
    HEAP32[$242>>2] = $244;
   } else {
    $245 = $5 | 3;
    $246 = (($v$0$i) + 4|0);
    HEAP32[$246>>2] = $245;
    $247 = $rsize$0$i | 1;
    $$sum$i35 = $5 | 4;
    $248 = (($164) + ($$sum$i35)|0);
    $249 = $248;
    HEAP32[$249>>2] = $247;
    $$sum1$i = (($rsize$0$i) + ($5))|0;
    $250 = (($164) + ($$sum1$i)|0);
    $251 = $250;
    HEAP32[$251>>2] = $rsize$0$i;
    $252 = HEAP32[(((4768) + 8|0))>>2]|0;
    $253 = ($252|0)==(0);
    if (!($253)) {
     $254 = HEAP32[(((4768) + 20|0))>>2]|0;
     $255 = $252 >>> 3;
     $256 = $255 << 1;
     $257 = (((4768) + ($256<<2)|0) + 40|0);
     $258 = $257;
     $259 = HEAP32[((4768))>>2]|0;
     $260 = 1 << $255;
     $261 = $259 & $260;
     $262 = ($261|0)==(0);
     do {
      if ($262) {
       $263 = $259 | $260;
       HEAP32[((4768))>>2] = $263;
       $$sum2$pre$i = (($256) + 2)|0;
       $$pre$i = (((4768) + ($$sum2$pre$i<<2)|0) + 40|0);
       $$pre$phi$iZ2D = $$pre$i;$F1$0$i = $258;
      } else {
       $$sum3$i = (($256) + 2)|0;
       $264 = (((4768) + ($$sum3$i<<2)|0) + 40|0);
       $265 = HEAP32[$264>>2]|0;
       $266 = $265;
       $267 = HEAP32[(((4768) + 16|0))>>2]|0;
       $268 = ($266>>>0)<($267>>>0);
       if (!($268)) {
        $$pre$phi$iZ2D = $264;$F1$0$i = $265;
        break;
       }
       _abort();
       // unreachable;
      }
     } while(0);
     HEAP32[$$pre$phi$iZ2D>>2] = $254;
     $269 = (($F1$0$i) + 12|0);
     HEAP32[$269>>2] = $254;
     $270 = (($254) + 8|0);
     HEAP32[$270>>2] = $F1$0$i;
     $271 = (($254) + 12|0);
     HEAP32[$271>>2] = $258;
    }
    HEAP32[(((4768) + 8|0))>>2] = $rsize$0$i;
    HEAP32[(((4768) + 20|0))>>2] = $168;
   }
   $272 = (($v$0$i) + 8|0);
   $273 = $272;
   $mem$0 = $273;
   STACKTOP = sp;return ($mem$0|0);
  } else {
   $274 = ($bytes>>>0)>(4294967231);
   if ($274) {
    $nb$0 = -1;
    break;
   }
   $275 = (($bytes) + 11)|0;
   $276 = $275 & -8;
   $277 = HEAP32[(((4768) + 4|0))>>2]|0;
   $278 = ($277|0)==(0);
   if ($278) {
    $nb$0 = $276;
    break;
   }
   $279 = (0 - ($276))|0;
   $280 = $275 >>> 8;
   $281 = ($280|0)==(0);
   do {
    if ($281) {
     $idx$0$i = 0;
    } else {
     $282 = ($276>>>0)>(16777215);
     if ($282) {
      $idx$0$i = 31;
      break;
     }
     $283 = (($280) + 1048320)|0;
     $284 = $283 >>> 16;
     $285 = $284 & 8;
     $286 = $280 << $285;
     $287 = (($286) + 520192)|0;
     $288 = $287 >>> 16;
     $289 = $288 & 4;
     $290 = $289 | $285;
     $291 = $286 << $289;
     $292 = (($291) + 245760)|0;
     $293 = $292 >>> 16;
     $294 = $293 & 2;
     $295 = $290 | $294;
     $296 = (14 - ($295))|0;
     $297 = $291 << $294;
     $298 = $297 >>> 15;
     $299 = (($296) + ($298))|0;
     $300 = $299 << 1;
     $301 = (($299) + 7)|0;
     $302 = $276 >>> $301;
     $303 = $302 & 1;
     $304 = $303 | $300;
     $idx$0$i = $304;
    }
   } while(0);
   $305 = (((4768) + ($idx$0$i<<2)|0) + 304|0);
   $306 = HEAP32[$305>>2]|0;
   $307 = ($306|0)==(0|0);
   L126: do {
    if ($307) {
     $rsize$2$i = $279;$t$1$i = 0;$v$2$i = 0;
    } else {
     $308 = ($idx$0$i|0)==(31);
     if ($308) {
      $311 = 0;
     } else {
      $309 = $idx$0$i >>> 1;
      $310 = (25 - ($309))|0;
      $311 = $310;
     }
     $312 = $276 << $311;
     $rsize$0$i15 = $279;$rst$0$i = 0;$sizebits$0$i = $312;$t$0$i14 = $306;$v$0$i16 = 0;
     while(1) {
      $313 = (($t$0$i14) + 4|0);
      $314 = HEAP32[$313>>2]|0;
      $315 = $314 & -8;
      $316 = (($315) - ($276))|0;
      $317 = ($316>>>0)<($rsize$0$i15>>>0);
      if ($317) {
       $318 = ($315|0)==($276|0);
       if ($318) {
        $rsize$2$i = $316;$t$1$i = $t$0$i14;$v$2$i = $t$0$i14;
        break L126;
       } else {
        $rsize$1$i = $316;$v$1$i = $t$0$i14;
       }
      } else {
       $rsize$1$i = $rsize$0$i15;$v$1$i = $v$0$i16;
      }
      $319 = (($t$0$i14) + 20|0);
      $320 = HEAP32[$319>>2]|0;
      $321 = $sizebits$0$i >>> 31;
      $322 = ((($t$0$i14) + ($321<<2)|0) + 16|0);
      $323 = HEAP32[$322>>2]|0;
      $324 = ($320|0)==(0|0);
      $325 = ($320|0)==($323|0);
      $or$cond$i = $324 | $325;
      $rst$1$i = $or$cond$i ? $rst$0$i : $320;
      $326 = ($323|0)==(0|0);
      $327 = $sizebits$0$i << 1;
      if ($326) {
       $rsize$2$i = $rsize$1$i;$t$1$i = $rst$1$i;$v$2$i = $v$1$i;
       break;
      } else {
       $rsize$0$i15 = $rsize$1$i;$rst$0$i = $rst$1$i;$sizebits$0$i = $327;$t$0$i14 = $323;$v$0$i16 = $v$1$i;
      }
     }
    }
   } while(0);
   $328 = ($t$1$i|0)==(0|0);
   $329 = ($v$2$i|0)==(0|0);
   $or$cond19$i = $328 & $329;
   if ($or$cond19$i) {
    $330 = 2 << $idx$0$i;
    $331 = (0 - ($330))|0;
    $332 = $330 | $331;
    $333 = $277 & $332;
    $334 = ($333|0)==(0);
    if ($334) {
     $nb$0 = $276;
     break;
    }
    $335 = (0 - ($333))|0;
    $336 = $333 & $335;
    $337 = (($336) + -1)|0;
    $338 = $337 >>> 12;
    $339 = $338 & 16;
    $340 = $337 >>> $339;
    $341 = $340 >>> 5;
    $342 = $341 & 8;
    $343 = $342 | $339;
    $344 = $340 >>> $342;
    $345 = $344 >>> 2;
    $346 = $345 & 4;
    $347 = $343 | $346;
    $348 = $344 >>> $346;
    $349 = $348 >>> 1;
    $350 = $349 & 2;
    $351 = $347 | $350;
    $352 = $348 >>> $350;
    $353 = $352 >>> 1;
    $354 = $353 & 1;
    $355 = $351 | $354;
    $356 = $352 >>> $354;
    $357 = (($355) + ($356))|0;
    $358 = (((4768) + ($357<<2)|0) + 304|0);
    $359 = HEAP32[$358>>2]|0;
    $t$2$ph$i = $359;
   } else {
    $t$2$ph$i = $t$1$i;
   }
   $360 = ($t$2$ph$i|0)==(0|0);
   if ($360) {
    $rsize$3$lcssa$i = $rsize$2$i;$v$3$lcssa$i = $v$2$i;
   } else {
    $rsize$329$i = $rsize$2$i;$t$228$i = $t$2$ph$i;$v$330$i = $v$2$i;
    while(1) {
     $361 = (($t$228$i) + 4|0);
     $362 = HEAP32[$361>>2]|0;
     $363 = $362 & -8;
     $364 = (($363) - ($276))|0;
     $365 = ($364>>>0)<($rsize$329$i>>>0);
     $$rsize$3$i = $365 ? $364 : $rsize$329$i;
     $t$2$v$3$i = $365 ? $t$228$i : $v$330$i;
     $366 = (($t$228$i) + 16|0);
     $367 = HEAP32[$366>>2]|0;
     $368 = ($367|0)==(0|0);
     if (!($368)) {
      $v$330$i$phi = $t$2$v$3$i;$t$228$i$phi = $367;$rsize$329$i$phi = $$rsize$3$i;$v$330$i = $v$330$i$phi;$t$228$i = $t$228$i$phi;$rsize$329$i = $rsize$329$i$phi;
      continue;
     }
     $369 = (($t$228$i) + 20|0);
     $370 = HEAP32[$369>>2]|0;
     $371 = ($370|0)==(0|0);
     if ($371) {
      $rsize$3$lcssa$i = $$rsize$3$i;$v$3$lcssa$i = $t$2$v$3$i;
      break;
     } else {
      $v$330$i$phi = $t$2$v$3$i;$rsize$329$i$phi = $$rsize$3$i;$t$228$i = $370;$v$330$i = $v$330$i$phi;$rsize$329$i = $rsize$329$i$phi;
     }
    }
   }
   $372 = ($v$3$lcssa$i|0)==(0|0);
   if ($372) {
    $nb$0 = $276;
    break;
   }
   $373 = HEAP32[(((4768) + 8|0))>>2]|0;
   $374 = (($373) - ($276))|0;
   $375 = ($rsize$3$lcssa$i>>>0)<($374>>>0);
   if (!($375)) {
    $nb$0 = $276;
    break;
   }
   $376 = $v$3$lcssa$i;
   $377 = HEAP32[(((4768) + 16|0))>>2]|0;
   $378 = ($376>>>0)<($377>>>0);
   if ($378) {
    _abort();
    // unreachable;
   }
   $379 = (($376) + ($276)|0);
   $380 = $379;
   $381 = ($376>>>0)<($379>>>0);
   if (!($381)) {
    _abort();
    // unreachable;
   }
   $382 = (($v$3$lcssa$i) + 24|0);
   $383 = HEAP32[$382>>2]|0;
   $384 = (($v$3$lcssa$i) + 12|0);
   $385 = HEAP32[$384>>2]|0;
   $386 = ($385|0)==($v$3$lcssa$i|0);
   do {
    if ($386) {
     $397 = (($v$3$lcssa$i) + 20|0);
     $398 = HEAP32[$397>>2]|0;
     $399 = ($398|0)==(0|0);
     if ($399) {
      $400 = (($v$3$lcssa$i) + 16|0);
      $401 = HEAP32[$400>>2]|0;
      $402 = ($401|0)==(0|0);
      if ($402) {
       $R$1$i20 = 0;
       break;
      } else {
       $R$0$i18 = $401;$RP$0$i17 = $400;
      }
     } else {
      $R$0$i18 = $398;$RP$0$i17 = $397;
     }
     while(1) {
      $403 = (($R$0$i18) + 20|0);
      $404 = HEAP32[$403>>2]|0;
      $405 = ($404|0)==(0|0);
      if (!($405)) {
       $RP$0$i17$phi = $403;$R$0$i18$phi = $404;$RP$0$i17 = $RP$0$i17$phi;$R$0$i18 = $R$0$i18$phi;
       continue;
      }
      $406 = (($R$0$i18) + 16|0);
      $407 = HEAP32[$406>>2]|0;
      $408 = ($407|0)==(0|0);
      if ($408) {
       break;
      } else {
       $R$0$i18 = $407;$RP$0$i17 = $406;
      }
     }
     $409 = $RP$0$i17;
     $410 = ($409>>>0)<($377>>>0);
     if ($410) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0$i17>>2] = 0;
      $R$1$i20 = $R$0$i18;
      break;
     }
    } else {
     $387 = (($v$3$lcssa$i) + 8|0);
     $388 = HEAP32[$387>>2]|0;
     $389 = $388;
     $390 = ($389>>>0)<($377>>>0);
     if ($390) {
      _abort();
      // unreachable;
     }
     $391 = (($388) + 12|0);
     $392 = HEAP32[$391>>2]|0;
     $393 = ($392|0)==($v$3$lcssa$i|0);
     if (!($393)) {
      _abort();
      // unreachable;
     }
     $394 = (($385) + 8|0);
     $395 = HEAP32[$394>>2]|0;
     $396 = ($395|0)==($v$3$lcssa$i|0);
     if ($396) {
      HEAP32[$391>>2] = $385;
      HEAP32[$394>>2] = $388;
      $R$1$i20 = $385;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $411 = ($383|0)==(0|0);
   L176: do {
    if (!($411)) {
     $412 = (($v$3$lcssa$i) + 28|0);
     $413 = HEAP32[$412>>2]|0;
     $414 = (((4768) + ($413<<2)|0) + 304|0);
     $415 = HEAP32[$414>>2]|0;
     $416 = ($v$3$lcssa$i|0)==($415|0);
     do {
      if ($416) {
       HEAP32[$414>>2] = $R$1$i20;
       $cond$i21 = ($R$1$i20|0)==(0|0);
       if (!($cond$i21)) {
        break;
       }
       $417 = 1 << $413;
       $418 = $417 ^ -1;
       $419 = HEAP32[(((4768) + 4|0))>>2]|0;
       $420 = $419 & $418;
       HEAP32[(((4768) + 4|0))>>2] = $420;
       break L176;
      } else {
       $421 = $383;
       $422 = HEAP32[(((4768) + 16|0))>>2]|0;
       $423 = ($421>>>0)<($422>>>0);
       if ($423) {
        _abort();
        // unreachable;
       }
       $424 = (($383) + 16|0);
       $425 = HEAP32[$424>>2]|0;
       $426 = ($425|0)==($v$3$lcssa$i|0);
       if ($426) {
        HEAP32[$424>>2] = $R$1$i20;
       } else {
        $427 = (($383) + 20|0);
        HEAP32[$427>>2] = $R$1$i20;
       }
       $428 = ($R$1$i20|0)==(0|0);
       if ($428) {
        break L176;
       }
      }
     } while(0);
     $429 = $R$1$i20;
     $430 = HEAP32[(((4768) + 16|0))>>2]|0;
     $431 = ($429>>>0)<($430>>>0);
     if ($431) {
      _abort();
      // unreachable;
     }
     $432 = (($R$1$i20) + 24|0);
     HEAP32[$432>>2] = $383;
     $433 = (($v$3$lcssa$i) + 16|0);
     $434 = HEAP32[$433>>2]|0;
     $435 = ($434|0)==(0|0);
     do {
      if (!($435)) {
       $436 = $434;
       $437 = HEAP32[(((4768) + 16|0))>>2]|0;
       $438 = ($436>>>0)<($437>>>0);
       if ($438) {
        _abort();
        // unreachable;
       } else {
        $439 = (($R$1$i20) + 16|0);
        HEAP32[$439>>2] = $434;
        $440 = (($434) + 24|0);
        HEAP32[$440>>2] = $R$1$i20;
        break;
       }
      }
     } while(0);
     $441 = (($v$3$lcssa$i) + 20|0);
     $442 = HEAP32[$441>>2]|0;
     $443 = ($442|0)==(0|0);
     if ($443) {
      break;
     }
     $444 = $442;
     $445 = HEAP32[(((4768) + 16|0))>>2]|0;
     $446 = ($444>>>0)<($445>>>0);
     if ($446) {
      _abort();
      // unreachable;
     } else {
      $447 = (($R$1$i20) + 20|0);
      HEAP32[$447>>2] = $442;
      $448 = (($442) + 24|0);
      HEAP32[$448>>2] = $R$1$i20;
      break;
     }
    }
   } while(0);
   $449 = ($rsize$3$lcssa$i>>>0)<(16);
   L204: do {
    if ($449) {
     $450 = (($rsize$3$lcssa$i) + ($276))|0;
     $451 = $450 | 3;
     $452 = (($v$3$lcssa$i) + 4|0);
     HEAP32[$452>>2] = $451;
     $$sum18$i = (($450) + 4)|0;
     $453 = (($376) + ($$sum18$i)|0);
     $454 = $453;
     $455 = HEAP32[$454>>2]|0;
     $456 = $455 | 1;
     HEAP32[$454>>2] = $456;
    } else {
     $457 = $276 | 3;
     $458 = (($v$3$lcssa$i) + 4|0);
     HEAP32[$458>>2] = $457;
     $459 = $rsize$3$lcssa$i | 1;
     $$sum$i2334 = $276 | 4;
     $460 = (($376) + ($$sum$i2334)|0);
     $461 = $460;
     HEAP32[$461>>2] = $459;
     $$sum1$i24 = (($rsize$3$lcssa$i) + ($276))|0;
     $462 = (($376) + ($$sum1$i24)|0);
     $463 = $462;
     HEAP32[$463>>2] = $rsize$3$lcssa$i;
     $464 = $rsize$3$lcssa$i >>> 3;
     $465 = ($rsize$3$lcssa$i>>>0)<(256);
     if ($465) {
      $466 = $464 << 1;
      $467 = (((4768) + ($466<<2)|0) + 40|0);
      $468 = $467;
      $469 = HEAP32[((4768))>>2]|0;
      $470 = 1 << $464;
      $471 = $469 & $470;
      $472 = ($471|0)==(0);
      do {
       if ($472) {
        $473 = $469 | $470;
        HEAP32[((4768))>>2] = $473;
        $$sum14$pre$i = (($466) + 2)|0;
        $$pre$i25 = (((4768) + ($$sum14$pre$i<<2)|0) + 40|0);
        $$pre$phi$i26Z2D = $$pre$i25;$F5$0$i = $468;
       } else {
        $$sum17$i = (($466) + 2)|0;
        $474 = (((4768) + ($$sum17$i<<2)|0) + 40|0);
        $475 = HEAP32[$474>>2]|0;
        $476 = $475;
        $477 = HEAP32[(((4768) + 16|0))>>2]|0;
        $478 = ($476>>>0)<($477>>>0);
        if (!($478)) {
         $$pre$phi$i26Z2D = $474;$F5$0$i = $475;
         break;
        }
        _abort();
        // unreachable;
       }
      } while(0);
      HEAP32[$$pre$phi$i26Z2D>>2] = $380;
      $479 = (($F5$0$i) + 12|0);
      HEAP32[$479>>2] = $380;
      $$sum15$i = (($276) + 8)|0;
      $480 = (($376) + ($$sum15$i)|0);
      $481 = $480;
      HEAP32[$481>>2] = $F5$0$i;
      $$sum16$i = (($276) + 12)|0;
      $482 = (($376) + ($$sum16$i)|0);
      $483 = $482;
      HEAP32[$483>>2] = $468;
      break;
     }
     $484 = $379;
     $485 = $rsize$3$lcssa$i >>> 8;
     $486 = ($485|0)==(0);
     do {
      if ($486) {
       $I7$0$i = 0;
      } else {
       $487 = ($rsize$3$lcssa$i>>>0)>(16777215);
       if ($487) {
        $I7$0$i = 31;
        break;
       }
       $488 = (($485) + 1048320)|0;
       $489 = $488 >>> 16;
       $490 = $489 & 8;
       $491 = $485 << $490;
       $492 = (($491) + 520192)|0;
       $493 = $492 >>> 16;
       $494 = $493 & 4;
       $495 = $494 | $490;
       $496 = $491 << $494;
       $497 = (($496) + 245760)|0;
       $498 = $497 >>> 16;
       $499 = $498 & 2;
       $500 = $495 | $499;
       $501 = (14 - ($500))|0;
       $502 = $496 << $499;
       $503 = $502 >>> 15;
       $504 = (($501) + ($503))|0;
       $505 = $504 << 1;
       $506 = (($504) + 7)|0;
       $507 = $rsize$3$lcssa$i >>> $506;
       $508 = $507 & 1;
       $509 = $508 | $505;
       $I7$0$i = $509;
      }
     } while(0);
     $510 = (((4768) + ($I7$0$i<<2)|0) + 304|0);
     $$sum2$i = (($276) + 28)|0;
     $511 = (($376) + ($$sum2$i)|0);
     $512 = $511;
     HEAP32[$512>>2] = $I7$0$i;
     $$sum3$i27 = (($276) + 16)|0;
     $513 = (($376) + ($$sum3$i27)|0);
     $$sum4$i28 = (($276) + 20)|0;
     $514 = (($376) + ($$sum4$i28)|0);
     $515 = $514;
     HEAP32[$515>>2] = 0;
     $516 = $513;
     HEAP32[$516>>2] = 0;
     $517 = HEAP32[(((4768) + 4|0))>>2]|0;
     $518 = 1 << $I7$0$i;
     $519 = $517 & $518;
     $520 = ($519|0)==(0);
     if ($520) {
      $521 = $517 | $518;
      HEAP32[(((4768) + 4|0))>>2] = $521;
      HEAP32[$510>>2] = $484;
      $522 = $510;
      $$sum5$i = (($276) + 24)|0;
      $523 = (($376) + ($$sum5$i)|0);
      $524 = $523;
      HEAP32[$524>>2] = $522;
      $$sum6$i = (($276) + 12)|0;
      $525 = (($376) + ($$sum6$i)|0);
      $526 = $525;
      HEAP32[$526>>2] = $484;
      $$sum7$i = (($276) + 8)|0;
      $527 = (($376) + ($$sum7$i)|0);
      $528 = $527;
      HEAP32[$528>>2] = $484;
      break;
     }
     $529 = HEAP32[$510>>2]|0;
     $530 = ($I7$0$i|0)==(31);
     if ($530) {
      $533 = 0;
     } else {
      $531 = $I7$0$i >>> 1;
      $532 = (25 - ($531))|0;
      $533 = $532;
     }
     $534 = (($529) + 4|0);
     $535 = HEAP32[$534>>2]|0;
     $536 = $535 & -8;
     $537 = ($536|0)==($rsize$3$lcssa$i|0);
     L225: do {
      if ($537) {
       $T$0$lcssa$i = $529;
      } else {
       $538 = $rsize$3$lcssa$i << $533;
       $K12$025$i = $538;$T$024$i = $529;
       while(1) {
        $544 = $K12$025$i >>> 31;
        $545 = ((($T$024$i) + ($544<<2)|0) + 16|0);
        $546 = HEAP32[$545>>2]|0;
        $547 = ($546|0)==(0|0);
        if ($547) {
         break;
        }
        $539 = $K12$025$i << 1;
        $540 = (($546) + 4|0);
        $541 = HEAP32[$540>>2]|0;
        $542 = $541 & -8;
        $543 = ($542|0)==($rsize$3$lcssa$i|0);
        if ($543) {
         $T$0$lcssa$i = $546;
         break L225;
        } else {
         $T$024$i$phi = $546;$K12$025$i = $539;$T$024$i = $T$024$i$phi;
        }
       }
       $548 = $545;
       $549 = HEAP32[(((4768) + 16|0))>>2]|0;
       $550 = ($548>>>0)<($549>>>0);
       if ($550) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$545>>2] = $484;
        $$sum11$i = (($276) + 24)|0;
        $551 = (($376) + ($$sum11$i)|0);
        $552 = $551;
        HEAP32[$552>>2] = $T$024$i;
        $$sum12$i = (($276) + 12)|0;
        $553 = (($376) + ($$sum12$i)|0);
        $554 = $553;
        HEAP32[$554>>2] = $484;
        $$sum13$i = (($276) + 8)|0;
        $555 = (($376) + ($$sum13$i)|0);
        $556 = $555;
        HEAP32[$556>>2] = $484;
        break L204;
       }
      }
     } while(0);
     $557 = (($T$0$lcssa$i) + 8|0);
     $558 = HEAP32[$557>>2]|0;
     $559 = $T$0$lcssa$i;
     $560 = HEAP32[(((4768) + 16|0))>>2]|0;
     $561 = ($559>>>0)<($560>>>0);
     if ($561) {
      _abort();
      // unreachable;
     }
     $562 = $558;
     $563 = ($562>>>0)<($560>>>0);
     if ($563) {
      _abort();
      // unreachable;
     } else {
      $564 = (($558) + 12|0);
      HEAP32[$564>>2] = $484;
      HEAP32[$557>>2] = $484;
      $$sum8$i = (($276) + 8)|0;
      $565 = (($376) + ($$sum8$i)|0);
      $566 = $565;
      HEAP32[$566>>2] = $558;
      $$sum9$i = (($276) + 12)|0;
      $567 = (($376) + ($$sum9$i)|0);
      $568 = $567;
      HEAP32[$568>>2] = $T$0$lcssa$i;
      $$sum10$i = (($276) + 24)|0;
      $569 = (($376) + ($$sum10$i)|0);
      $570 = $569;
      HEAP32[$570>>2] = 0;
      break;
     }
    }
   } while(0);
   $571 = (($v$3$lcssa$i) + 8|0);
   $572 = $571;
   $mem$0 = $572;
   STACKTOP = sp;return ($mem$0|0);
  }
 } while(0);
 $573 = HEAP32[(((4768) + 8|0))>>2]|0;
 $574 = ($nb$0>>>0)>($573>>>0);
 if (!($574)) {
  $575 = (($573) - ($nb$0))|0;
  $576 = HEAP32[(((4768) + 20|0))>>2]|0;
  $577 = ($575>>>0)>(15);
  if ($577) {
   $578 = $576;
   $579 = (($578) + ($nb$0)|0);
   $580 = $579;
   HEAP32[(((4768) + 20|0))>>2] = $580;
   HEAP32[(((4768) + 8|0))>>2] = $575;
   $581 = $575 | 1;
   $$sum2 = (($nb$0) + 4)|0;
   $582 = (($578) + ($$sum2)|0);
   $583 = $582;
   HEAP32[$583>>2] = $581;
   $584 = (($578) + ($573)|0);
   $585 = $584;
   HEAP32[$585>>2] = $575;
   $586 = $nb$0 | 3;
   $587 = (($576) + 4|0);
   HEAP32[$587>>2] = $586;
  } else {
   HEAP32[(((4768) + 8|0))>>2] = 0;
   HEAP32[(((4768) + 20|0))>>2] = 0;
   $588 = $573 | 3;
   $589 = (($576) + 4|0);
   HEAP32[$589>>2] = $588;
   $590 = $576;
   $$sum1 = (($573) + 4)|0;
   $591 = (($590) + ($$sum1)|0);
   $592 = $591;
   $593 = HEAP32[$592>>2]|0;
   $594 = $593 | 1;
   HEAP32[$592>>2] = $594;
  }
  $595 = (($576) + 8|0);
  $596 = $595;
  $mem$0 = $596;
  STACKTOP = sp;return ($mem$0|0);
 }
 $597 = HEAP32[(((4768) + 12|0))>>2]|0;
 $598 = ($nb$0>>>0)<($597>>>0);
 if ($598) {
  $599 = (($597) - ($nb$0))|0;
  HEAP32[(((4768) + 12|0))>>2] = $599;
  $600 = HEAP32[(((4768) + 24|0))>>2]|0;
  $601 = $600;
  $602 = (($601) + ($nb$0)|0);
  $603 = $602;
  HEAP32[(((4768) + 24|0))>>2] = $603;
  $604 = $599 | 1;
  $$sum = (($nb$0) + 4)|0;
  $605 = (($601) + ($$sum)|0);
  $606 = $605;
  HEAP32[$606>>2] = $604;
  $607 = $nb$0 | 3;
  $608 = (($600) + 4|0);
  HEAP32[$608>>2] = $607;
  $609 = (($600) + 8|0);
  $610 = $609;
  $mem$0 = $610;
  STACKTOP = sp;return ($mem$0|0);
 }
 $611 = HEAP32[((5240))>>2]|0;
 $612 = ($611|0)==(0);
 do {
  if ($612) {
   $613 = (_sysconf(30)|0);
   $614 = (($613) + -1)|0;
   $615 = $614 & $613;
   $616 = ($615|0)==(0);
   if ($616) {
    HEAP32[(((5240) + 8|0))>>2] = $613;
    HEAP32[(((5240) + 4|0))>>2] = $613;
    HEAP32[(((5240) + 12|0))>>2] = -1;
    HEAP32[(((5240) + 16|0))>>2] = -1;
    HEAP32[(((5240) + 20|0))>>2] = 0;
    HEAP32[(((4768) + 444|0))>>2] = 0;
    $617 = (_time((0|0))|0);
    $618 = $617 & -16;
    $619 = $618 ^ 1431655768;
    HEAP32[((5240))>>2] = $619;
    break;
   } else {
    _abort();
    // unreachable;
   }
  }
 } while(0);
 $620 = (($nb$0) + 48)|0;
 $621 = HEAP32[(((5240) + 8|0))>>2]|0;
 $622 = (($nb$0) + 47)|0;
 $623 = (($621) + ($622))|0;
 $624 = (0 - ($621))|0;
 $625 = $623 & $624;
 $626 = ($625>>>0)>($nb$0>>>0);
 if (!($626)) {
  $mem$0 = 0;
  STACKTOP = sp;return ($mem$0|0);
 }
 $627 = HEAP32[(((4768) + 440|0))>>2]|0;
 $628 = ($627|0)==(0);
 do {
  if (!($628)) {
   $629 = HEAP32[(((4768) + 432|0))>>2]|0;
   $630 = (($629) + ($625))|0;
   $631 = ($630>>>0)<=($629>>>0);
   $632 = ($630>>>0)>($627>>>0);
   $or$cond1$i = $631 | $632;
   if ($or$cond1$i) {
    $mem$0 = 0;
   } else {
    break;
   }
   STACKTOP = sp;return ($mem$0|0);
  }
 } while(0);
 $633 = HEAP32[(((4768) + 444|0))>>2]|0;
 $634 = $633 & 4;
 $635 = ($634|0)==(0);
 L269: do {
  if ($635) {
   $636 = HEAP32[(((4768) + 24|0))>>2]|0;
   $637 = ($636|0)==(0|0);
   L271: do {
    if ($637) {
     label = 182;
    } else {
     $638 = $636;
     $sp$0$i$i = (((4768) + 448|0));
     while(1) {
      $639 = ($sp$0$i$i);
      $640 = HEAP32[$639>>2]|0;
      $641 = ($640>>>0)>($638>>>0);
      if (!($641)) {
       $642 = (($sp$0$i$i) + 4|0);
       $643 = HEAP32[$642>>2]|0;
       $644 = (($640) + ($643)|0);
       $645 = ($644>>>0)>($638>>>0);
       if ($645) {
        break;
       }
      }
      $646 = (($sp$0$i$i) + 8|0);
      $647 = HEAP32[$646>>2]|0;
      $648 = ($647|0)==(0|0);
      if ($648) {
       label = 182;
       break L271;
      } else {
       $sp$0$i$i = $647;
      }
     }
     $649 = ($sp$0$i$i|0)==(0|0);
     if ($649) {
      label = 182;
      break;
     }
     $672 = HEAP32[(((4768) + 12|0))>>2]|0;
     $673 = (($623) - ($672))|0;
     $674 = $673 & $624;
     $675 = ($674>>>0)<(2147483647);
     if (!($675)) {
      $tsize$0323841$i = 0;
      break;
     }
     $676 = (_sbrk(($674|0))|0);
     $677 = HEAP32[$639>>2]|0;
     $678 = HEAP32[$642>>2]|0;
     $679 = (($677) + ($678)|0);
     $680 = ($676|0)==($679|0);
     $$3$i = $680 ? $674 : 0;
     $$4$i = $680 ? $676 : (-1);
     $br$0$i = $676;$ssize$1$i = $674;$tbase$0$i = $$4$i;$tsize$0$i = $$3$i;
     label = 191;
    }
   } while(0);
   do {
    if ((label|0) == 182) {
     $650 = (_sbrk(0)|0);
     $651 = ($650|0)==((-1)|0);
     if ($651) {
      $tsize$0323841$i = 0;
      break;
     }
     $652 = $650;
     $653 = HEAP32[(((5240) + 4|0))>>2]|0;
     $654 = (($653) + -1)|0;
     $655 = $654 & $652;
     $656 = ($655|0)==(0);
     if ($656) {
      $ssize$0$i = $625;
     } else {
      $657 = (($654) + ($652))|0;
      $658 = (0 - ($653))|0;
      $659 = $657 & $658;
      $660 = (($625) - ($652))|0;
      $661 = (($660) + ($659))|0;
      $ssize$0$i = $661;
     }
     $662 = HEAP32[(((4768) + 432|0))>>2]|0;
     $663 = (($662) + ($ssize$0$i))|0;
     $664 = ($ssize$0$i>>>0)>($nb$0>>>0);
     $665 = ($ssize$0$i>>>0)<(2147483647);
     $or$cond$i29 = $664 & $665;
     if (!($or$cond$i29)) {
      $tsize$0323841$i = 0;
      break;
     }
     $666 = HEAP32[(((4768) + 440|0))>>2]|0;
     $667 = ($666|0)==(0);
     if (!($667)) {
      $668 = ($663>>>0)<=($662>>>0);
      $669 = ($663>>>0)>($666>>>0);
      $or$cond2$i = $668 | $669;
      if ($or$cond2$i) {
       $tsize$0323841$i = 0;
       break;
      }
     }
     $670 = (_sbrk(($ssize$0$i|0))|0);
     $671 = ($670|0)==($650|0);
     $ssize$0$$i = $671 ? $ssize$0$i : 0;
     $$$i = $671 ? $650 : (-1);
     $br$0$i = $670;$ssize$1$i = $ssize$0$i;$tbase$0$i = $$$i;$tsize$0$i = $ssize$0$$i;
     label = 191;
    }
   } while(0);
   L291: do {
    if ((label|0) == 191) {
     $681 = (0 - ($ssize$1$i))|0;
     $682 = ($tbase$0$i|0)==((-1)|0);
     if (!($682)) {
      $tbase$247$i = $tbase$0$i;$tsize$246$i = $tsize$0$i;
      label = 202;
      break L269;
     }
     $683 = ($br$0$i|0)!=((-1)|0);
     $684 = ($ssize$1$i>>>0)<(2147483647);
     $or$cond5$i = $683 & $684;
     $685 = ($ssize$1$i>>>0)<($620>>>0);
     $or$cond6$i = $or$cond5$i & $685;
     do {
      if ($or$cond6$i) {
       $686 = HEAP32[(((5240) + 8|0))>>2]|0;
       $687 = (($622) - ($ssize$1$i))|0;
       $688 = (($687) + ($686))|0;
       $689 = (0 - ($686))|0;
       $690 = $688 & $689;
       $691 = ($690>>>0)<(2147483647);
       if (!($691)) {
        $ssize$2$i = $ssize$1$i;
        break;
       }
       $692 = (_sbrk(($690|0))|0);
       $693 = ($692|0)==((-1)|0);
       if ($693) {
        (_sbrk(($681|0))|0);
        $tsize$0323841$i = $tsize$0$i;
        break L291;
       } else {
        $694 = (($690) + ($ssize$1$i))|0;
        $ssize$2$i = $694;
        break;
       }
      } else {
       $ssize$2$i = $ssize$1$i;
      }
     } while(0);
     $695 = ($br$0$i|0)==((-1)|0);
     if ($695) {
      $tsize$0323841$i = $tsize$0$i;
     } else {
      $tbase$247$i = $br$0$i;$tsize$246$i = $ssize$2$i;
      label = 202;
      break L269;
     }
    }
   } while(0);
   $696 = HEAP32[(((4768) + 444|0))>>2]|0;
   $697 = $696 | 4;
   HEAP32[(((4768) + 444|0))>>2] = $697;
   $tsize$1$i = $tsize$0323841$i;
   label = 199;
  } else {
   $tsize$1$i = 0;
   label = 199;
  }
 } while(0);
 do {
  if ((label|0) == 199) {
   $698 = ($625>>>0)<(2147483647);
   if (!($698)) {
    break;
   }
   $699 = (_sbrk(($625|0))|0);
   $700 = (_sbrk(0)|0);
   $notlhs$i = ($699|0)!=((-1)|0);
   $notrhs$i = ($700|0)!=((-1)|0);
   $or$cond8$not$i = $notrhs$i & $notlhs$i;
   $701 = ($699>>>0)<($700>>>0);
   $or$cond9$i = $or$cond8$not$i & $701;
   if (!($or$cond9$i)) {
    break;
   }
   $702 = $700;
   $703 = $699;
   $704 = (($702) - ($703))|0;
   $705 = (($nb$0) + 40)|0;
   $706 = ($704>>>0)>($705>>>0);
   $$tsize$1$i = $706 ? $704 : $tsize$1$i;
   if ($706) {
    $tbase$247$i = $699;$tsize$246$i = $$tsize$1$i;
    label = 202;
   }
  }
 } while(0);
 do {
  if ((label|0) == 202) {
   $707 = HEAP32[(((4768) + 432|0))>>2]|0;
   $708 = (($707) + ($tsize$246$i))|0;
   HEAP32[(((4768) + 432|0))>>2] = $708;
   $709 = HEAP32[(((4768) + 436|0))>>2]|0;
   $710 = ($708>>>0)>($709>>>0);
   if ($710) {
    HEAP32[(((4768) + 436|0))>>2] = $708;
   }
   $711 = HEAP32[(((4768) + 24|0))>>2]|0;
   $712 = ($711|0)==(0|0);
   L311: do {
    if ($712) {
     $713 = HEAP32[(((4768) + 16|0))>>2]|0;
     $714 = ($713|0)==(0|0);
     $715 = ($tbase$247$i>>>0)<($713>>>0);
     $or$cond10$i = $714 | $715;
     if ($or$cond10$i) {
      HEAP32[(((4768) + 16|0))>>2] = $tbase$247$i;
     }
     HEAP32[(((4768) + 448|0))>>2] = $tbase$247$i;
     HEAP32[(((4768) + 452|0))>>2] = $tsize$246$i;
     HEAP32[(((4768) + 460|0))>>2] = 0;
     $716 = HEAP32[((5240))>>2]|0;
     HEAP32[(((4768) + 36|0))>>2] = $716;
     HEAP32[(((4768) + 32|0))>>2] = -1;
     $i$02$i$i = 0;
     while(1) {
      $717 = $i$02$i$i << 1;
      $718 = (((4768) + ($717<<2)|0) + 40|0);
      $719 = $718;
      $$sum$i$i = (($717) + 3)|0;
      $720 = (((4768) + ($$sum$i$i<<2)|0) + 40|0);
      HEAP32[$720>>2] = $719;
      $$sum1$i$i = (($717) + 2)|0;
      $721 = (((4768) + ($$sum1$i$i<<2)|0) + 40|0);
      HEAP32[$721>>2] = $719;
      $722 = (($i$02$i$i) + 1)|0;
      $exitcond$i$i = ($722|0)==(32);
      if ($exitcond$i$i) {
       break;
      } else {
       $i$02$i$i$phi = $722;$i$02$i$i = $i$02$i$i$phi;
      }
     }
     $723 = (($tsize$246$i) + -40)|0;
     $724 = (($tbase$247$i) + 8|0);
     $725 = $724;
     $726 = $725 & 7;
     $727 = ($726|0)==(0);
     if ($727) {
      $730 = 0;
     } else {
      $728 = (0 - ($725))|0;
      $729 = $728 & 7;
      $730 = $729;
     }
     $731 = (($tbase$247$i) + ($730)|0);
     $732 = $731;
     $733 = (($723) - ($730))|0;
     HEAP32[(((4768) + 24|0))>>2] = $732;
     HEAP32[(((4768) + 12|0))>>2] = $733;
     $734 = $733 | 1;
     $$sum$i14$i = (($730) + 4)|0;
     $735 = (($tbase$247$i) + ($$sum$i14$i)|0);
     $736 = $735;
     HEAP32[$736>>2] = $734;
     $$sum2$i$i = (($tsize$246$i) + -36)|0;
     $737 = (($tbase$247$i) + ($$sum2$i$i)|0);
     $738 = $737;
     HEAP32[$738>>2] = 40;
     $739 = HEAP32[(((5240) + 16|0))>>2]|0;
     HEAP32[(((4768) + 28|0))>>2] = $739;
    } else {
     $sp$075$i = (((4768) + 448|0));
     while(1) {
      $740 = ($sp$075$i);
      $741 = HEAP32[$740>>2]|0;
      $742 = (($sp$075$i) + 4|0);
      $743 = HEAP32[$742>>2]|0;
      $744 = (($741) + ($743)|0);
      $745 = ($tbase$247$i|0)==($744|0);
      if ($745) {
       label = 214;
       break;
      }
      $746 = (($sp$075$i) + 8|0);
      $747 = HEAP32[$746>>2]|0;
      $748 = ($747|0)==(0|0);
      if ($748) {
       break;
      } else {
       $sp$075$i = $747;
      }
     }
     do {
      if ((label|0) == 214) {
       $749 = (($sp$075$i) + 12|0);
       $750 = HEAP32[$749>>2]|0;
       $751 = $750 & 8;
       $752 = ($751|0)==(0);
       if (!($752)) {
        break;
       }
       $753 = $711;
       $754 = ($753>>>0)>=($741>>>0);
       $755 = ($753>>>0)<($tbase$247$i>>>0);
       $or$cond49$i = $754 & $755;
       if (!($or$cond49$i)) {
        break;
       }
       $756 = (($743) + ($tsize$246$i))|0;
       HEAP32[$742>>2] = $756;
       $757 = HEAP32[(((4768) + 12|0))>>2]|0;
       $758 = (($757) + ($tsize$246$i))|0;
       $759 = (($711) + 8|0);
       $760 = $759;
       $761 = $760 & 7;
       $762 = ($761|0)==(0);
       if ($762) {
        $765 = 0;
       } else {
        $763 = (0 - ($760))|0;
        $764 = $763 & 7;
        $765 = $764;
       }
       $766 = (($753) + ($765)|0);
       $767 = $766;
       $768 = (($758) - ($765))|0;
       HEAP32[(((4768) + 24|0))>>2] = $767;
       HEAP32[(((4768) + 12|0))>>2] = $768;
       $769 = $768 | 1;
       $$sum$i18$i = (($765) + 4)|0;
       $770 = (($753) + ($$sum$i18$i)|0);
       $771 = $770;
       HEAP32[$771>>2] = $769;
       $$sum2$i19$i = (($758) + 4)|0;
       $772 = (($753) + ($$sum2$i19$i)|0);
       $773 = $772;
       HEAP32[$773>>2] = 40;
       $774 = HEAP32[(((5240) + 16|0))>>2]|0;
       HEAP32[(((4768) + 28|0))>>2] = $774;
       break L311;
      }
     } while(0);
     $775 = HEAP32[(((4768) + 16|0))>>2]|0;
     $776 = ($tbase$247$i>>>0)<($775>>>0);
     if ($776) {
      HEAP32[(((4768) + 16|0))>>2] = $tbase$247$i;
     }
     $777 = (($tbase$247$i) + ($tsize$246$i)|0);
     $sp$168$i = (((4768) + 448|0));
     while(1) {
      $778 = ($sp$168$i);
      $779 = HEAP32[$778>>2]|0;
      $780 = ($779|0)==($777|0);
      if ($780) {
       label = 224;
       break;
      }
      $781 = (($sp$168$i) + 8|0);
      $782 = HEAP32[$781>>2]|0;
      $783 = ($782|0)==(0|0);
      if ($783) {
       break;
      } else {
       $sp$168$i = $782;
      }
     }
     do {
      if ((label|0) == 224) {
       $784 = (($sp$168$i) + 12|0);
       $785 = HEAP32[$784>>2]|0;
       $786 = $785 & 8;
       $787 = ($786|0)==(0);
       if (!($787)) {
        break;
       }
       HEAP32[$778>>2] = $tbase$247$i;
       $788 = (($sp$168$i) + 4|0);
       $789 = HEAP32[$788>>2]|0;
       $790 = (($789) + ($tsize$246$i))|0;
       HEAP32[$788>>2] = $790;
       $791 = (($tbase$247$i) + 8|0);
       $792 = $791;
       $793 = $792 & 7;
       $794 = ($793|0)==(0);
       if ($794) {
        $797 = 0;
       } else {
        $795 = (0 - ($792))|0;
        $796 = $795 & 7;
        $797 = $796;
       }
       $798 = (($tbase$247$i) + ($797)|0);
       $$sum107$i = (($tsize$246$i) + 8)|0;
       $799 = (($tbase$247$i) + ($$sum107$i)|0);
       $800 = $799;
       $801 = $800 & 7;
       $802 = ($801|0)==(0);
       if ($802) {
        $805 = 0;
       } else {
        $803 = (0 - ($800))|0;
        $804 = $803 & 7;
        $805 = $804;
       }
       $$sum108$i = (($805) + ($tsize$246$i))|0;
       $806 = (($tbase$247$i) + ($$sum108$i)|0);
       $807 = $806;
       $808 = $806;
       $809 = $798;
       $810 = (($808) - ($809))|0;
       $$sum$i21$i = (($797) + ($nb$0))|0;
       $811 = (($tbase$247$i) + ($$sum$i21$i)|0);
       $812 = $811;
       $813 = (($810) - ($nb$0))|0;
       $814 = $nb$0 | 3;
       $$sum1$i22$i = (($797) + 4)|0;
       $815 = (($tbase$247$i) + ($$sum1$i22$i)|0);
       $816 = $815;
       HEAP32[$816>>2] = $814;
       $817 = HEAP32[(((4768) + 24|0))>>2]|0;
       $818 = ($807|0)==($817|0);
       L348: do {
        if ($818) {
         $819 = HEAP32[(((4768) + 12|0))>>2]|0;
         $820 = (($819) + ($813))|0;
         HEAP32[(((4768) + 12|0))>>2] = $820;
         HEAP32[(((4768) + 24|0))>>2] = $812;
         $821 = $820 | 1;
         $$sum42$i$i = (($$sum$i21$i) + 4)|0;
         $822 = (($tbase$247$i) + ($$sum42$i$i)|0);
         $823 = $822;
         HEAP32[$823>>2] = $821;
        } else {
         $824 = HEAP32[(((4768) + 20|0))>>2]|0;
         $825 = ($807|0)==($824|0);
         if ($825) {
          $826 = HEAP32[(((4768) + 8|0))>>2]|0;
          $827 = (($826) + ($813))|0;
          HEAP32[(((4768) + 8|0))>>2] = $827;
          HEAP32[(((4768) + 20|0))>>2] = $812;
          $828 = $827 | 1;
          $$sum40$i$i = (($$sum$i21$i) + 4)|0;
          $829 = (($tbase$247$i) + ($$sum40$i$i)|0);
          $830 = $829;
          HEAP32[$830>>2] = $828;
          $$sum41$i$i = (($827) + ($$sum$i21$i))|0;
          $831 = (($tbase$247$i) + ($$sum41$i$i)|0);
          $832 = $831;
          HEAP32[$832>>2] = $827;
          break;
         }
         $$sum2$i23$i = (($tsize$246$i) + 4)|0;
         $$sum109$i = (($$sum2$i23$i) + ($805))|0;
         $833 = (($tbase$247$i) + ($$sum109$i)|0);
         $834 = $833;
         $835 = HEAP32[$834>>2]|0;
         $836 = $835 & 3;
         $837 = ($836|0)==(1);
         if ($837) {
          $838 = $835 & -8;
          $839 = $835 >>> 3;
          $840 = ($835>>>0)<(256);
          L356: do {
           if ($840) {
            $$sum3738$i$i = $805 | 8;
            $$sum119$i = (($$sum3738$i$i) + ($tsize$246$i))|0;
            $841 = (($tbase$247$i) + ($$sum119$i)|0);
            $842 = $841;
            $843 = HEAP32[$842>>2]|0;
            $$sum39$i$i = (($tsize$246$i) + 12)|0;
            $$sum120$i = (($$sum39$i$i) + ($805))|0;
            $844 = (($tbase$247$i) + ($$sum120$i)|0);
            $845 = $844;
            $846 = HEAP32[$845>>2]|0;
            $847 = $839 << 1;
            $848 = (((4768) + ($847<<2)|0) + 40|0);
            $849 = $848;
            $850 = ($843|0)==($849|0);
            do {
             if (!($850)) {
              $851 = $843;
              $852 = HEAP32[(((4768) + 16|0))>>2]|0;
              $853 = ($851>>>0)<($852>>>0);
              if ($853) {
               _abort();
               // unreachable;
              }
              $854 = (($843) + 12|0);
              $855 = HEAP32[$854>>2]|0;
              $856 = ($855|0)==($807|0);
              if ($856) {
               break;
              }
              _abort();
              // unreachable;
             }
            } while(0);
            $857 = ($846|0)==($843|0);
            if ($857) {
             $858 = 1 << $839;
             $859 = $858 ^ -1;
             $860 = HEAP32[((4768))>>2]|0;
             $861 = $860 & $859;
             HEAP32[((4768))>>2] = $861;
             break;
            }
            $862 = ($846|0)==($849|0);
            do {
             if ($862) {
              $$pre57$i$i = (($846) + 8|0);
              $$pre$phi58$i$iZ2D = $$pre57$i$i;
             } else {
              $863 = $846;
              $864 = HEAP32[(((4768) + 16|0))>>2]|0;
              $865 = ($863>>>0)<($864>>>0);
              if ($865) {
               _abort();
               // unreachable;
              }
              $866 = (($846) + 8|0);
              $867 = HEAP32[$866>>2]|0;
              $868 = ($867|0)==($807|0);
              if ($868) {
               $$pre$phi58$i$iZ2D = $866;
               break;
              }
              _abort();
              // unreachable;
             }
            } while(0);
            $869 = (($843) + 12|0);
            HEAP32[$869>>2] = $846;
            HEAP32[$$pre$phi58$i$iZ2D>>2] = $843;
           } else {
            $870 = $806;
            $$sum34$i$i = $805 | 24;
            $$sum110$i = (($$sum34$i$i) + ($tsize$246$i))|0;
            $871 = (($tbase$247$i) + ($$sum110$i)|0);
            $872 = $871;
            $873 = HEAP32[$872>>2]|0;
            $$sum5$i$i = (($tsize$246$i) + 12)|0;
            $$sum111$i = (($$sum5$i$i) + ($805))|0;
            $874 = (($tbase$247$i) + ($$sum111$i)|0);
            $875 = $874;
            $876 = HEAP32[$875>>2]|0;
            $877 = ($876|0)==($870|0);
            do {
             if ($877) {
              $$sum67$i$i = $805 | 16;
              $$sum117$i = (($$sum2$i23$i) + ($$sum67$i$i))|0;
              $890 = (($tbase$247$i) + ($$sum117$i)|0);
              $891 = $890;
              $892 = HEAP32[$891>>2]|0;
              $893 = ($892|0)==(0|0);
              if ($893) {
               $$sum118$i = (($$sum67$i$i) + ($tsize$246$i))|0;
               $894 = (($tbase$247$i) + ($$sum118$i)|0);
               $895 = $894;
               $896 = HEAP32[$895>>2]|0;
               $897 = ($896|0)==(0|0);
               if ($897) {
                $R$1$i$i = 0;
                break;
               } else {
                $R$0$i$i = $896;$RP$0$i$i = $895;
               }
              } else {
               $R$0$i$i = $892;$RP$0$i$i = $891;
              }
              while(1) {
               $898 = (($R$0$i$i) + 20|0);
               $899 = HEAP32[$898>>2]|0;
               $900 = ($899|0)==(0|0);
               if (!($900)) {
                $RP$0$i$i$phi = $898;$R$0$i$i$phi = $899;$RP$0$i$i = $RP$0$i$i$phi;$R$0$i$i = $R$0$i$i$phi;
                continue;
               }
               $901 = (($R$0$i$i) + 16|0);
               $902 = HEAP32[$901>>2]|0;
               $903 = ($902|0)==(0|0);
               if ($903) {
                break;
               } else {
                $R$0$i$i = $902;$RP$0$i$i = $901;
               }
              }
              $904 = $RP$0$i$i;
              $905 = HEAP32[(((4768) + 16|0))>>2]|0;
              $906 = ($904>>>0)<($905>>>0);
              if ($906) {
               _abort();
               // unreachable;
              } else {
               HEAP32[$RP$0$i$i>>2] = 0;
               $R$1$i$i = $R$0$i$i;
               break;
              }
             } else {
              $$sum3536$i$i = $805 | 8;
              $$sum112$i = (($$sum3536$i$i) + ($tsize$246$i))|0;
              $878 = (($tbase$247$i) + ($$sum112$i)|0);
              $879 = $878;
              $880 = HEAP32[$879>>2]|0;
              $881 = $880;
              $882 = HEAP32[(((4768) + 16|0))>>2]|0;
              $883 = ($881>>>0)<($882>>>0);
              if ($883) {
               _abort();
               // unreachable;
              }
              $884 = (($880) + 12|0);
              $885 = HEAP32[$884>>2]|0;
              $886 = ($885|0)==($870|0);
              if (!($886)) {
               _abort();
               // unreachable;
              }
              $887 = (($876) + 8|0);
              $888 = HEAP32[$887>>2]|0;
              $889 = ($888|0)==($870|0);
              if ($889) {
               HEAP32[$884>>2] = $876;
               HEAP32[$887>>2] = $880;
               $R$1$i$i = $876;
               break;
              } else {
               _abort();
               // unreachable;
              }
             }
            } while(0);
            $907 = ($873|0)==(0|0);
            if ($907) {
             break;
            }
            $$sum30$i$i = (($tsize$246$i) + 28)|0;
            $$sum113$i = (($$sum30$i$i) + ($805))|0;
            $908 = (($tbase$247$i) + ($$sum113$i)|0);
            $909 = $908;
            $910 = HEAP32[$909>>2]|0;
            $911 = (((4768) + ($910<<2)|0) + 304|0);
            $912 = HEAP32[$911>>2]|0;
            $913 = ($870|0)==($912|0);
            do {
             if ($913) {
              HEAP32[$911>>2] = $R$1$i$i;
              $cond$i$i = ($R$1$i$i|0)==(0|0);
              if (!($cond$i$i)) {
               break;
              }
              $914 = 1 << $910;
              $915 = $914 ^ -1;
              $916 = HEAP32[(((4768) + 4|0))>>2]|0;
              $917 = $916 & $915;
              HEAP32[(((4768) + 4|0))>>2] = $917;
              break L356;
             } else {
              $918 = $873;
              $919 = HEAP32[(((4768) + 16|0))>>2]|0;
              $920 = ($918>>>0)<($919>>>0);
              if ($920) {
               _abort();
               // unreachable;
              }
              $921 = (($873) + 16|0);
              $922 = HEAP32[$921>>2]|0;
              $923 = ($922|0)==($870|0);
              if ($923) {
               HEAP32[$921>>2] = $R$1$i$i;
              } else {
               $924 = (($873) + 20|0);
               HEAP32[$924>>2] = $R$1$i$i;
              }
              $925 = ($R$1$i$i|0)==(0|0);
              if ($925) {
               break L356;
              }
             }
            } while(0);
            $926 = $R$1$i$i;
            $927 = HEAP32[(((4768) + 16|0))>>2]|0;
            $928 = ($926>>>0)<($927>>>0);
            if ($928) {
             _abort();
             // unreachable;
            }
            $929 = (($R$1$i$i) + 24|0);
            HEAP32[$929>>2] = $873;
            $$sum3132$i$i = $805 | 16;
            $$sum114$i = (($$sum3132$i$i) + ($tsize$246$i))|0;
            $930 = (($tbase$247$i) + ($$sum114$i)|0);
            $931 = $930;
            $932 = HEAP32[$931>>2]|0;
            $933 = ($932|0)==(0|0);
            do {
             if (!($933)) {
              $934 = $932;
              $935 = HEAP32[(((4768) + 16|0))>>2]|0;
              $936 = ($934>>>0)<($935>>>0);
              if ($936) {
               _abort();
               // unreachable;
              } else {
               $937 = (($R$1$i$i) + 16|0);
               HEAP32[$937>>2] = $932;
               $938 = (($932) + 24|0);
               HEAP32[$938>>2] = $R$1$i$i;
               break;
              }
             }
            } while(0);
            $$sum115$i = (($$sum2$i23$i) + ($$sum3132$i$i))|0;
            $939 = (($tbase$247$i) + ($$sum115$i)|0);
            $940 = $939;
            $941 = HEAP32[$940>>2]|0;
            $942 = ($941|0)==(0|0);
            if ($942) {
             break;
            }
            $943 = $941;
            $944 = HEAP32[(((4768) + 16|0))>>2]|0;
            $945 = ($943>>>0)<($944>>>0);
            if ($945) {
             _abort();
             // unreachable;
            } else {
             $946 = (($R$1$i$i) + 20|0);
             HEAP32[$946>>2] = $941;
             $947 = (($941) + 24|0);
             HEAP32[$947>>2] = $R$1$i$i;
             break;
            }
           }
          } while(0);
          $$sum9$i$i = $838 | $805;
          $$sum116$i = (($$sum9$i$i) + ($tsize$246$i))|0;
          $948 = (($tbase$247$i) + ($$sum116$i)|0);
          $949 = $948;
          $950 = (($838) + ($813))|0;
          $oldfirst$0$i$i = $949;$qsize$0$i$i = $950;
         } else {
          $oldfirst$0$i$i = $807;$qsize$0$i$i = $813;
         }
         $951 = (($oldfirst$0$i$i) + 4|0);
         $952 = HEAP32[$951>>2]|0;
         $953 = $952 & -2;
         HEAP32[$951>>2] = $953;
         $954 = $qsize$0$i$i | 1;
         $$sum10$i$i = (($$sum$i21$i) + 4)|0;
         $955 = (($tbase$247$i) + ($$sum10$i$i)|0);
         $956 = $955;
         HEAP32[$956>>2] = $954;
         $$sum11$i24$i = (($qsize$0$i$i) + ($$sum$i21$i))|0;
         $957 = (($tbase$247$i) + ($$sum11$i24$i)|0);
         $958 = $957;
         HEAP32[$958>>2] = $qsize$0$i$i;
         $959 = $qsize$0$i$i >>> 3;
         $960 = ($qsize$0$i$i>>>0)<(256);
         if ($960) {
          $961 = $959 << 1;
          $962 = (((4768) + ($961<<2)|0) + 40|0);
          $963 = $962;
          $964 = HEAP32[((4768))>>2]|0;
          $965 = 1 << $959;
          $966 = $964 & $965;
          $967 = ($966|0)==(0);
          do {
           if ($967) {
            $968 = $964 | $965;
            HEAP32[((4768))>>2] = $968;
            $$sum26$pre$i$i = (($961) + 2)|0;
            $$pre$i25$i = (((4768) + ($$sum26$pre$i$i<<2)|0) + 40|0);
            $$pre$phi$i26$iZ2D = $$pre$i25$i;$F4$0$i$i = $963;
           } else {
            $$sum29$i$i = (($961) + 2)|0;
            $969 = (((4768) + ($$sum29$i$i<<2)|0) + 40|0);
            $970 = HEAP32[$969>>2]|0;
            $971 = $970;
            $972 = HEAP32[(((4768) + 16|0))>>2]|0;
            $973 = ($971>>>0)<($972>>>0);
            if (!($973)) {
             $$pre$phi$i26$iZ2D = $969;$F4$0$i$i = $970;
             break;
            }
            _abort();
            // unreachable;
           }
          } while(0);
          HEAP32[$$pre$phi$i26$iZ2D>>2] = $812;
          $974 = (($F4$0$i$i) + 12|0);
          HEAP32[$974>>2] = $812;
          $$sum27$i$i = (($$sum$i21$i) + 8)|0;
          $975 = (($tbase$247$i) + ($$sum27$i$i)|0);
          $976 = $975;
          HEAP32[$976>>2] = $F4$0$i$i;
          $$sum28$i$i = (($$sum$i21$i) + 12)|0;
          $977 = (($tbase$247$i) + ($$sum28$i$i)|0);
          $978 = $977;
          HEAP32[$978>>2] = $963;
          break;
         }
         $979 = $811;
         $980 = $qsize$0$i$i >>> 8;
         $981 = ($980|0)==(0);
         do {
          if ($981) {
           $I7$0$i$i = 0;
          } else {
           $982 = ($qsize$0$i$i>>>0)>(16777215);
           if ($982) {
            $I7$0$i$i = 31;
            break;
           }
           $983 = (($980) + 1048320)|0;
           $984 = $983 >>> 16;
           $985 = $984 & 8;
           $986 = $980 << $985;
           $987 = (($986) + 520192)|0;
           $988 = $987 >>> 16;
           $989 = $988 & 4;
           $990 = $989 | $985;
           $991 = $986 << $989;
           $992 = (($991) + 245760)|0;
           $993 = $992 >>> 16;
           $994 = $993 & 2;
           $995 = $990 | $994;
           $996 = (14 - ($995))|0;
           $997 = $991 << $994;
           $998 = $997 >>> 15;
           $999 = (($996) + ($998))|0;
           $1000 = $999 << 1;
           $1001 = (($999) + 7)|0;
           $1002 = $qsize$0$i$i >>> $1001;
           $1003 = $1002 & 1;
           $1004 = $1003 | $1000;
           $I7$0$i$i = $1004;
          }
         } while(0);
         $1005 = (((4768) + ($I7$0$i$i<<2)|0) + 304|0);
         $$sum12$i$i = (($$sum$i21$i) + 28)|0;
         $1006 = (($tbase$247$i) + ($$sum12$i$i)|0);
         $1007 = $1006;
         HEAP32[$1007>>2] = $I7$0$i$i;
         $$sum13$i$i = (($$sum$i21$i) + 16)|0;
         $1008 = (($tbase$247$i) + ($$sum13$i$i)|0);
         $$sum14$i$i = (($$sum$i21$i) + 20)|0;
         $1009 = (($tbase$247$i) + ($$sum14$i$i)|0);
         $1010 = $1009;
         HEAP32[$1010>>2] = 0;
         $1011 = $1008;
         HEAP32[$1011>>2] = 0;
         $1012 = HEAP32[(((4768) + 4|0))>>2]|0;
         $1013 = 1 << $I7$0$i$i;
         $1014 = $1012 & $1013;
         $1015 = ($1014|0)==(0);
         if ($1015) {
          $1016 = $1012 | $1013;
          HEAP32[(((4768) + 4|0))>>2] = $1016;
          HEAP32[$1005>>2] = $979;
          $1017 = $1005;
          $$sum15$i$i = (($$sum$i21$i) + 24)|0;
          $1018 = (($tbase$247$i) + ($$sum15$i$i)|0);
          $1019 = $1018;
          HEAP32[$1019>>2] = $1017;
          $$sum16$i$i = (($$sum$i21$i) + 12)|0;
          $1020 = (($tbase$247$i) + ($$sum16$i$i)|0);
          $1021 = $1020;
          HEAP32[$1021>>2] = $979;
          $$sum17$i$i = (($$sum$i21$i) + 8)|0;
          $1022 = (($tbase$247$i) + ($$sum17$i$i)|0);
          $1023 = $1022;
          HEAP32[$1023>>2] = $979;
          break;
         }
         $1024 = HEAP32[$1005>>2]|0;
         $1025 = ($I7$0$i$i|0)==(31);
         if ($1025) {
          $1028 = 0;
         } else {
          $1026 = $I7$0$i$i >>> 1;
          $1027 = (25 - ($1026))|0;
          $1028 = $1027;
         }
         $1029 = (($1024) + 4|0);
         $1030 = HEAP32[$1029>>2]|0;
         $1031 = $1030 & -8;
         $1032 = ($1031|0)==($qsize$0$i$i|0);
         L445: do {
          if ($1032) {
           $T$0$lcssa$i28$i = $1024;
          } else {
           $1033 = $qsize$0$i$i << $1028;
           $K8$052$i$i = $1033;$T$051$i$i = $1024;
           while(1) {
            $1039 = $K8$052$i$i >>> 31;
            $1040 = ((($T$051$i$i) + ($1039<<2)|0) + 16|0);
            $1041 = HEAP32[$1040>>2]|0;
            $1042 = ($1041|0)==(0|0);
            if ($1042) {
             break;
            }
            $1034 = $K8$052$i$i << 1;
            $1035 = (($1041) + 4|0);
            $1036 = HEAP32[$1035>>2]|0;
            $1037 = $1036 & -8;
            $1038 = ($1037|0)==($qsize$0$i$i|0);
            if ($1038) {
             $T$0$lcssa$i28$i = $1041;
             break L445;
            } else {
             $T$051$i$i$phi = $1041;$K8$052$i$i = $1034;$T$051$i$i = $T$051$i$i$phi;
            }
           }
           $1043 = $1040;
           $1044 = HEAP32[(((4768) + 16|0))>>2]|0;
           $1045 = ($1043>>>0)<($1044>>>0);
           if ($1045) {
            _abort();
            // unreachable;
           } else {
            HEAP32[$1040>>2] = $979;
            $$sum23$i$i = (($$sum$i21$i) + 24)|0;
            $1046 = (($tbase$247$i) + ($$sum23$i$i)|0);
            $1047 = $1046;
            HEAP32[$1047>>2] = $T$051$i$i;
            $$sum24$i$i = (($$sum$i21$i) + 12)|0;
            $1048 = (($tbase$247$i) + ($$sum24$i$i)|0);
            $1049 = $1048;
            HEAP32[$1049>>2] = $979;
            $$sum25$i$i = (($$sum$i21$i) + 8)|0;
            $1050 = (($tbase$247$i) + ($$sum25$i$i)|0);
            $1051 = $1050;
            HEAP32[$1051>>2] = $979;
            break L348;
           }
          }
         } while(0);
         $1052 = (($T$0$lcssa$i28$i) + 8|0);
         $1053 = HEAP32[$1052>>2]|0;
         $1054 = $T$0$lcssa$i28$i;
         $1055 = HEAP32[(((4768) + 16|0))>>2]|0;
         $1056 = ($1054>>>0)<($1055>>>0);
         if ($1056) {
          _abort();
          // unreachable;
         }
         $1057 = $1053;
         $1058 = ($1057>>>0)<($1055>>>0);
         if ($1058) {
          _abort();
          // unreachable;
         } else {
          $1059 = (($1053) + 12|0);
          HEAP32[$1059>>2] = $979;
          HEAP32[$1052>>2] = $979;
          $$sum20$i$i = (($$sum$i21$i) + 8)|0;
          $1060 = (($tbase$247$i) + ($$sum20$i$i)|0);
          $1061 = $1060;
          HEAP32[$1061>>2] = $1053;
          $$sum21$i$i = (($$sum$i21$i) + 12)|0;
          $1062 = (($tbase$247$i) + ($$sum21$i$i)|0);
          $1063 = $1062;
          HEAP32[$1063>>2] = $T$0$lcssa$i28$i;
          $$sum22$i$i = (($$sum$i21$i) + 24)|0;
          $1064 = (($tbase$247$i) + ($$sum22$i$i)|0);
          $1065 = $1064;
          HEAP32[$1065>>2] = 0;
          break;
         }
        }
       } while(0);
       $$sum1819$i$i = $797 | 8;
       $1066 = (($tbase$247$i) + ($$sum1819$i$i)|0);
       $mem$0 = $1066;
       STACKTOP = sp;return ($mem$0|0);
      }
     } while(0);
     $1067 = $711;
     $sp$0$i$i$i = (((4768) + 448|0));
     while(1) {
      $1068 = ($sp$0$i$i$i);
      $1069 = HEAP32[$1068>>2]|0;
      $1070 = ($1069>>>0)>($1067>>>0);
      if (!($1070)) {
       $1071 = (($sp$0$i$i$i) + 4|0);
       $1072 = HEAP32[$1071>>2]|0;
       $1073 = (($1069) + ($1072)|0);
       $1074 = ($1073>>>0)>($1067>>>0);
       if ($1074) {
        break;
       }
      }
      $1075 = (($sp$0$i$i$i) + 8|0);
      $1076 = HEAP32[$1075>>2]|0;
      $sp$0$i$i$i = $1076;
     }
     $$sum$i15$i = (($1072) + -47)|0;
     $$sum1$i16$i = (($1072) + -39)|0;
     $1077 = (($1069) + ($$sum1$i16$i)|0);
     $1078 = $1077;
     $1079 = $1078 & 7;
     $1080 = ($1079|0)==(0);
     if ($1080) {
      $1083 = 0;
     } else {
      $1081 = (0 - ($1078))|0;
      $1082 = $1081 & 7;
      $1083 = $1082;
     }
     $$sum2$i17$i = (($$sum$i15$i) + ($1083))|0;
     $1084 = (($1069) + ($$sum2$i17$i)|0);
     $1085 = (($711) + 16|0);
     $1086 = $1085;
     $1087 = ($1084>>>0)<($1086>>>0);
     $1088 = $1087 ? $1067 : $1084;
     $1089 = (($1088) + 8|0);
     $1090 = $1089;
     $1091 = (($tsize$246$i) + -40)|0;
     $1092 = (($tbase$247$i) + 8|0);
     $1093 = $1092;
     $1094 = $1093 & 7;
     $1095 = ($1094|0)==(0);
     if ($1095) {
      $1098 = 0;
     } else {
      $1096 = (0 - ($1093))|0;
      $1097 = $1096 & 7;
      $1098 = $1097;
     }
     $1099 = (($tbase$247$i) + ($1098)|0);
     $1100 = $1099;
     $1101 = (($1091) - ($1098))|0;
     HEAP32[(((4768) + 24|0))>>2] = $1100;
     HEAP32[(((4768) + 12|0))>>2] = $1101;
     $1102 = $1101 | 1;
     $$sum$i$i$i = (($1098) + 4)|0;
     $1103 = (($tbase$247$i) + ($$sum$i$i$i)|0);
     $1104 = $1103;
     HEAP32[$1104>>2] = $1102;
     $$sum2$i$i$i = (($tsize$246$i) + -36)|0;
     $1105 = (($tbase$247$i) + ($$sum2$i$i$i)|0);
     $1106 = $1105;
     HEAP32[$1106>>2] = 40;
     $1107 = HEAP32[(((5240) + 16|0))>>2]|0;
     HEAP32[(((4768) + 28|0))>>2] = $1107;
     $1108 = (($1088) + 4|0);
     $1109 = $1108;
     HEAP32[$1109>>2] = 27;
     ;HEAP32[$1089+0>>2]=HEAP32[((((4768) + 448|0)))+0>>2]|0;HEAP32[$1089+4>>2]=HEAP32[((((4768) + 448|0)))+4>>2]|0;HEAP32[$1089+8>>2]=HEAP32[((((4768) + 448|0)))+8>>2]|0;HEAP32[$1089+12>>2]=HEAP32[((((4768) + 448|0)))+12>>2]|0;
     HEAP32[(((4768) + 448|0))>>2] = $tbase$247$i;
     HEAP32[(((4768) + 452|0))>>2] = $tsize$246$i;
     HEAP32[(((4768) + 460|0))>>2] = 0;
     HEAP32[(((4768) + 456|0))>>2] = $1090;
     $1110 = (($1088) + 28|0);
     $1111 = $1110;
     HEAP32[$1111>>2] = 7;
     $1112 = (($1088) + 32|0);
     $1113 = ($1112>>>0)<($1073>>>0);
     if ($1113) {
      $1114 = $1111;
      while(1) {
       $1115 = (($1114) + 4|0);
       HEAP32[$1115>>2] = 7;
       $1116 = (($1114) + 8|0);
       $1117 = $1116;
       $1118 = ($1117>>>0)<($1073>>>0);
       if ($1118) {
        $1114$phi = $1115;$1114 = $1114$phi;
       } else {
        break;
       }
      }
     }
     $1119 = ($1088|0)==($1067|0);
     if ($1119) {
      break;
     }
     $1120 = $1088;
     $1121 = $711;
     $1122 = (($1120) - ($1121))|0;
     $1123 = (($1067) + ($1122)|0);
     $$sum3$i$i = (($1122) + 4)|0;
     $1124 = (($1067) + ($$sum3$i$i)|0);
     $1125 = $1124;
     $1126 = HEAP32[$1125>>2]|0;
     $1127 = $1126 & -2;
     HEAP32[$1125>>2] = $1127;
     $1128 = $1122 | 1;
     $1129 = (($711) + 4|0);
     HEAP32[$1129>>2] = $1128;
     $1130 = $1123;
     HEAP32[$1130>>2] = $1122;
     $1131 = $1122 >>> 3;
     $1132 = ($1122>>>0)<(256);
     if ($1132) {
      $1133 = $1131 << 1;
      $1134 = (((4768) + ($1133<<2)|0) + 40|0);
      $1135 = $1134;
      $1136 = HEAP32[((4768))>>2]|0;
      $1137 = 1 << $1131;
      $1138 = $1136 & $1137;
      $1139 = ($1138|0)==(0);
      do {
       if ($1139) {
        $1140 = $1136 | $1137;
        HEAP32[((4768))>>2] = $1140;
        $$sum10$pre$i$i = (($1133) + 2)|0;
        $$pre$i$i = (((4768) + ($$sum10$pre$i$i<<2)|0) + 40|0);
        $$pre$phi$i$iZ2D = $$pre$i$i;$F$0$i$i = $1135;
       } else {
        $$sum11$i$i = (($1133) + 2)|0;
        $1141 = (((4768) + ($$sum11$i$i<<2)|0) + 40|0);
        $1142 = HEAP32[$1141>>2]|0;
        $1143 = $1142;
        $1144 = HEAP32[(((4768) + 16|0))>>2]|0;
        $1145 = ($1143>>>0)<($1144>>>0);
        if (!($1145)) {
         $$pre$phi$i$iZ2D = $1141;$F$0$i$i = $1142;
         break;
        }
        _abort();
        // unreachable;
       }
      } while(0);
      HEAP32[$$pre$phi$i$iZ2D>>2] = $711;
      $1146 = (($F$0$i$i) + 12|0);
      HEAP32[$1146>>2] = $711;
      $1147 = (($711) + 8|0);
      HEAP32[$1147>>2] = $F$0$i$i;
      $1148 = (($711) + 12|0);
      HEAP32[$1148>>2] = $1135;
      break;
     }
     $1149 = $711;
     $1150 = $1122 >>> 8;
     $1151 = ($1150|0)==(0);
     do {
      if ($1151) {
       $I1$0$i$i = 0;
      } else {
       $1152 = ($1122>>>0)>(16777215);
       if ($1152) {
        $I1$0$i$i = 31;
        break;
       }
       $1153 = (($1150) + 1048320)|0;
       $1154 = $1153 >>> 16;
       $1155 = $1154 & 8;
       $1156 = $1150 << $1155;
       $1157 = (($1156) + 520192)|0;
       $1158 = $1157 >>> 16;
       $1159 = $1158 & 4;
       $1160 = $1159 | $1155;
       $1161 = $1156 << $1159;
       $1162 = (($1161) + 245760)|0;
       $1163 = $1162 >>> 16;
       $1164 = $1163 & 2;
       $1165 = $1160 | $1164;
       $1166 = (14 - ($1165))|0;
       $1167 = $1161 << $1164;
       $1168 = $1167 >>> 15;
       $1169 = (($1166) + ($1168))|0;
       $1170 = $1169 << 1;
       $1171 = (($1169) + 7)|0;
       $1172 = $1122 >>> $1171;
       $1173 = $1172 & 1;
       $1174 = $1173 | $1170;
       $I1$0$i$i = $1174;
      }
     } while(0);
     $1175 = (((4768) + ($I1$0$i$i<<2)|0) + 304|0);
     $1176 = (($711) + 28|0);
     $I1$0$c$i$i = $I1$0$i$i;
     HEAP32[$1176>>2] = $I1$0$c$i$i;
     $1177 = (($711) + 20|0);
     HEAP32[$1177>>2] = 0;
     $1178 = (($711) + 16|0);
     HEAP32[$1178>>2] = 0;
     $1179 = HEAP32[(((4768) + 4|0))>>2]|0;
     $1180 = 1 << $I1$0$i$i;
     $1181 = $1179 & $1180;
     $1182 = ($1181|0)==(0);
     if ($1182) {
      $1183 = $1179 | $1180;
      HEAP32[(((4768) + 4|0))>>2] = $1183;
      HEAP32[$1175>>2] = $1149;
      $1184 = (($711) + 24|0);
      $$c$i$i = $1175;
      HEAP32[$1184>>2] = $$c$i$i;
      $1185 = (($711) + 12|0);
      HEAP32[$1185>>2] = $711;
      $1186 = (($711) + 8|0);
      HEAP32[$1186>>2] = $711;
      break;
     }
     $1187 = HEAP32[$1175>>2]|0;
     $1188 = ($I1$0$i$i|0)==(31);
     if ($1188) {
      $1191 = 0;
     } else {
      $1189 = $I1$0$i$i >>> 1;
      $1190 = (25 - ($1189))|0;
      $1191 = $1190;
     }
     $1192 = (($1187) + 4|0);
     $1193 = HEAP32[$1192>>2]|0;
     $1194 = $1193 & -8;
     $1195 = ($1194|0)==($1122|0);
     L499: do {
      if ($1195) {
       $T$0$lcssa$i$i = $1187;
      } else {
       $1196 = $1122 << $1191;
       $K2$014$i$i = $1196;$T$013$i$i = $1187;
       while(1) {
        $1202 = $K2$014$i$i >>> 31;
        $1203 = ((($T$013$i$i) + ($1202<<2)|0) + 16|0);
        $1204 = HEAP32[$1203>>2]|0;
        $1205 = ($1204|0)==(0|0);
        if ($1205) {
         break;
        }
        $1197 = $K2$014$i$i << 1;
        $1198 = (($1204) + 4|0);
        $1199 = HEAP32[$1198>>2]|0;
        $1200 = $1199 & -8;
        $1201 = ($1200|0)==($1122|0);
        if ($1201) {
         $T$0$lcssa$i$i = $1204;
         break L499;
        } else {
         $T$013$i$i$phi = $1204;$K2$014$i$i = $1197;$T$013$i$i = $T$013$i$i$phi;
        }
       }
       $1206 = $1203;
       $1207 = HEAP32[(((4768) + 16|0))>>2]|0;
       $1208 = ($1206>>>0)<($1207>>>0);
       if ($1208) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$1203>>2] = $1149;
        $1209 = (($711) + 24|0);
        $T$0$c7$i$i = $T$013$i$i;
        HEAP32[$1209>>2] = $T$0$c7$i$i;
        $1210 = (($711) + 12|0);
        HEAP32[$1210>>2] = $711;
        $1211 = (($711) + 8|0);
        HEAP32[$1211>>2] = $711;
        break L311;
       }
      }
     } while(0);
     $1212 = (($T$0$lcssa$i$i) + 8|0);
     $1213 = HEAP32[$1212>>2]|0;
     $1214 = $T$0$lcssa$i$i;
     $1215 = HEAP32[(((4768) + 16|0))>>2]|0;
     $1216 = ($1214>>>0)<($1215>>>0);
     if ($1216) {
      _abort();
      // unreachable;
     }
     $1217 = $1213;
     $1218 = ($1217>>>0)<($1215>>>0);
     if ($1218) {
      _abort();
      // unreachable;
     } else {
      $1219 = (($1213) + 12|0);
      HEAP32[$1219>>2] = $1149;
      HEAP32[$1212>>2] = $1149;
      $1220 = (($711) + 8|0);
      $$c6$i$i = $1213;
      HEAP32[$1220>>2] = $$c6$i$i;
      $1221 = (($711) + 12|0);
      $T$0$c$i$i = $T$0$lcssa$i$i;
      HEAP32[$1221>>2] = $T$0$c$i$i;
      $1222 = (($711) + 24|0);
      HEAP32[$1222>>2] = 0;
      break;
     }
    }
   } while(0);
   $1223 = HEAP32[(((4768) + 12|0))>>2]|0;
   $1224 = ($1223>>>0)>($nb$0>>>0);
   if (!($1224)) {
    break;
   }
   $1225 = (($1223) - ($nb$0))|0;
   HEAP32[(((4768) + 12|0))>>2] = $1225;
   $1226 = HEAP32[(((4768) + 24|0))>>2]|0;
   $1227 = $1226;
   $1228 = (($1227) + ($nb$0)|0);
   $1229 = $1228;
   HEAP32[(((4768) + 24|0))>>2] = $1229;
   $1230 = $1225 | 1;
   $$sum$i32 = (($nb$0) + 4)|0;
   $1231 = (($1227) + ($$sum$i32)|0);
   $1232 = $1231;
   HEAP32[$1232>>2] = $1230;
   $1233 = $nb$0 | 3;
   $1234 = (($1226) + 4|0);
   HEAP32[$1234>>2] = $1233;
   $1235 = (($1226) + 8|0);
   $1236 = $1235;
   $mem$0 = $1236;
   STACKTOP = sp;return ($mem$0|0);
  }
 } while(0);
 $1237 = (___errno_location()|0);
 HEAP32[$1237>>2] = 12;
 $mem$0 = 0;
 STACKTOP = sp;return ($mem$0|0);
}
function _free($mem) {
 $mem = $mem|0;
 var $$c = 0, $$c12 = 0, $$pre = 0, $$pre$phi68Z2D = 0, $$pre$phi70Z2D = 0, $$pre$phiZ2D = 0, $$pre67 = 0, $$pre69 = 0, $$sum = 0, $$sum16$pre = 0, $$sum17 = 0, $$sum18 = 0, $$sum19 = 0, $$sum2 = 0, $$sum20 = 0, $$sum2324 = 0, $$sum25 = 0, $$sum26 = 0, $$sum28 = 0, $$sum29 = 0;
 var $$sum3 = 0, $$sum30 = 0, $$sum31 = 0, $$sum32 = 0, $$sum33 = 0, $$sum34 = 0, $$sum35 = 0, $$sum36 = 0, $$sum37 = 0, $$sum5 = 0, $$sum67 = 0, $$sum8 = 0, $$sum9 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0;
 var $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0;
 var $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0;
 var $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0;
 var $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0;
 var $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0;
 var $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0;
 var $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0;
 var $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0;
 var $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0;
 var $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0;
 var $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0;
 var $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0;
 var $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0;
 var $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0;
 var $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0;
 var $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0;
 var $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0;
 var $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0;
 var $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F16$0 = 0, $I18$0 = 0, $I18$0$c = 0;
 var $K19$057 = 0, $R$0 = 0, $R$0$phi = 0, $R$1 = 0, $R7$0 = 0, $R7$0$phi = 0, $R7$1 = 0, $RP$0 = 0, $RP$0$phi = 0, $RP9$0 = 0, $RP9$0$phi = 0, $T$0$c = 0, $T$0$c13 = 0, $T$0$lcssa = 0, $T$056 = 0, $T$056$phi = 0, $cond = 0, $cond54 = 0, $p$0 = 0, $psize$0 = 0;
 var $psize$1 = 0, $sp$0$i = 0, $sp$0$in$i = 0, $sp$0$in$i$phi = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($mem|0)==(0|0);
 if ($1) {
  STACKTOP = sp;return;
 }
 $2 = (($mem) + -8|0);
 $3 = $2;
 $4 = HEAP32[(((4768) + 16|0))>>2]|0;
 $5 = ($2>>>0)<($4>>>0);
 if ($5) {
  _abort();
  // unreachable;
 }
 $6 = (($mem) + -4|0);
 $7 = $6;
 $8 = HEAP32[$7>>2]|0;
 $9 = $8 & 3;
 $10 = ($9|0)==(1);
 if ($10) {
  _abort();
  // unreachable;
 }
 $11 = $8 & -8;
 $$sum = (($11) + -8)|0;
 $12 = (($mem) + ($$sum)|0);
 $13 = $12;
 $14 = $8 & 1;
 $15 = ($14|0)==(0);
 L10: do {
  if ($15) {
   $16 = $2;
   $17 = HEAP32[$16>>2]|0;
   $18 = ($9|0)==(0);
   if ($18) {
    STACKTOP = sp;return;
   }
   $$sum2 = (-8 - ($17))|0;
   $19 = (($mem) + ($$sum2)|0);
   $20 = $19;
   $21 = (($17) + ($11))|0;
   $22 = ($19>>>0)<($4>>>0);
   if ($22) {
    _abort();
    // unreachable;
   }
   $23 = HEAP32[(((4768) + 20|0))>>2]|0;
   $24 = ($20|0)==($23|0);
   if ($24) {
    $$sum3 = (($11) + -4)|0;
    $130 = (($mem) + ($$sum3)|0);
    $131 = $130;
    $132 = HEAP32[$131>>2]|0;
    $133 = $132 & 3;
    $134 = ($133|0)==(3);
    if (!($134)) {
     $p$0 = $20;$psize$0 = $21;
     break;
    }
    HEAP32[(((4768) + 8|0))>>2] = $21;
    $135 = HEAP32[$131>>2]|0;
    $136 = $135 & -2;
    HEAP32[$131>>2] = $136;
    $137 = $21 | 1;
    $$sum26 = (($$sum2) + 4)|0;
    $138 = (($mem) + ($$sum26)|0);
    $139 = $138;
    HEAP32[$139>>2] = $137;
    $140 = $12;
    HEAP32[$140>>2] = $21;
    STACKTOP = sp;return;
   }
   $25 = $17 >>> 3;
   $26 = ($17>>>0)<(256);
   if ($26) {
    $$sum36 = (($$sum2) + 8)|0;
    $27 = (($mem) + ($$sum36)|0);
    $28 = $27;
    $29 = HEAP32[$28>>2]|0;
    $$sum37 = (($$sum2) + 12)|0;
    $30 = (($mem) + ($$sum37)|0);
    $31 = $30;
    $32 = HEAP32[$31>>2]|0;
    $33 = $25 << 1;
    $34 = (((4768) + ($33<<2)|0) + 40|0);
    $35 = $34;
    $36 = ($29|0)==($35|0);
    do {
     if (!($36)) {
      $37 = $29;
      $38 = ($37>>>0)<($4>>>0);
      if ($38) {
       _abort();
       // unreachable;
      }
      $39 = (($29) + 12|0);
      $40 = HEAP32[$39>>2]|0;
      $41 = ($40|0)==($20|0);
      if ($41) {
       break;
      }
      _abort();
      // unreachable;
     }
    } while(0);
    $42 = ($32|0)==($29|0);
    if ($42) {
     $43 = 1 << $25;
     $44 = $43 ^ -1;
     $45 = HEAP32[((4768))>>2]|0;
     $46 = $45 & $44;
     HEAP32[((4768))>>2] = $46;
     $p$0 = $20;$psize$0 = $21;
     break;
    }
    $47 = ($32|0)==($35|0);
    do {
     if ($47) {
      $$pre69 = (($32) + 8|0);
      $$pre$phi70Z2D = $$pre69;
     } else {
      $48 = $32;
      $49 = ($48>>>0)<($4>>>0);
      if ($49) {
       _abort();
       // unreachable;
      }
      $50 = (($32) + 8|0);
      $51 = HEAP32[$50>>2]|0;
      $52 = ($51|0)==($20|0);
      if ($52) {
       $$pre$phi70Z2D = $50;
       break;
      }
      _abort();
      // unreachable;
     }
    } while(0);
    $53 = (($29) + 12|0);
    HEAP32[$53>>2] = $32;
    HEAP32[$$pre$phi70Z2D>>2] = $29;
    $p$0 = $20;$psize$0 = $21;
    break;
   }
   $54 = $19;
   $$sum28 = (($$sum2) + 24)|0;
   $55 = (($mem) + ($$sum28)|0);
   $56 = $55;
   $57 = HEAP32[$56>>2]|0;
   $$sum29 = (($$sum2) + 12)|0;
   $58 = (($mem) + ($$sum29)|0);
   $59 = $58;
   $60 = HEAP32[$59>>2]|0;
   $61 = ($60|0)==($54|0);
   do {
    if ($61) {
     $$sum31 = (($$sum2) + 20)|0;
     $73 = (($mem) + ($$sum31)|0);
     $74 = $73;
     $75 = HEAP32[$74>>2]|0;
     $76 = ($75|0)==(0|0);
     if ($76) {
      $$sum30 = (($$sum2) + 16)|0;
      $77 = (($mem) + ($$sum30)|0);
      $78 = $77;
      $79 = HEAP32[$78>>2]|0;
      $80 = ($79|0)==(0|0);
      if ($80) {
       $R$1 = 0;
       break;
      } else {
       $R$0 = $79;$RP$0 = $78;
      }
     } else {
      $R$0 = $75;$RP$0 = $74;
     }
     while(1) {
      $81 = (($R$0) + 20|0);
      $82 = HEAP32[$81>>2]|0;
      $83 = ($82|0)==(0|0);
      if (!($83)) {
       $RP$0$phi = $81;$R$0$phi = $82;$RP$0 = $RP$0$phi;$R$0 = $R$0$phi;
       continue;
      }
      $84 = (($R$0) + 16|0);
      $85 = HEAP32[$84>>2]|0;
      $86 = ($85|0)==(0|0);
      if ($86) {
       break;
      } else {
       $R$0 = $85;$RP$0 = $84;
      }
     }
     $87 = $RP$0;
     $88 = ($87>>>0)<($4>>>0);
     if ($88) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0>>2] = 0;
      $R$1 = $R$0;
      break;
     }
    } else {
     $$sum35 = (($$sum2) + 8)|0;
     $62 = (($mem) + ($$sum35)|0);
     $63 = $62;
     $64 = HEAP32[$63>>2]|0;
     $65 = $64;
     $66 = ($65>>>0)<($4>>>0);
     if ($66) {
      _abort();
      // unreachable;
     }
     $67 = (($64) + 12|0);
     $68 = HEAP32[$67>>2]|0;
     $69 = ($68|0)==($54|0);
     if (!($69)) {
      _abort();
      // unreachable;
     }
     $70 = (($60) + 8|0);
     $71 = HEAP32[$70>>2]|0;
     $72 = ($71|0)==($54|0);
     if ($72) {
      HEAP32[$67>>2] = $60;
      HEAP32[$70>>2] = $64;
      $R$1 = $60;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $89 = ($57|0)==(0|0);
   if ($89) {
    $p$0 = $20;$psize$0 = $21;
    break;
   }
   $$sum32 = (($$sum2) + 28)|0;
   $90 = (($mem) + ($$sum32)|0);
   $91 = $90;
   $92 = HEAP32[$91>>2]|0;
   $93 = (((4768) + ($92<<2)|0) + 304|0);
   $94 = HEAP32[$93>>2]|0;
   $95 = ($54|0)==($94|0);
   do {
    if ($95) {
     HEAP32[$93>>2] = $R$1;
     $cond = ($R$1|0)==(0|0);
     if (!($cond)) {
      break;
     }
     $96 = 1 << $92;
     $97 = $96 ^ -1;
     $98 = HEAP32[(((4768) + 4|0))>>2]|0;
     $99 = $98 & $97;
     HEAP32[(((4768) + 4|0))>>2] = $99;
     $p$0 = $20;$psize$0 = $21;
     break L10;
    } else {
     $100 = $57;
     $101 = HEAP32[(((4768) + 16|0))>>2]|0;
     $102 = ($100>>>0)<($101>>>0);
     if ($102) {
      _abort();
      // unreachable;
     }
     $103 = (($57) + 16|0);
     $104 = HEAP32[$103>>2]|0;
     $105 = ($104|0)==($54|0);
     if ($105) {
      HEAP32[$103>>2] = $R$1;
     } else {
      $106 = (($57) + 20|0);
      HEAP32[$106>>2] = $R$1;
     }
     $107 = ($R$1|0)==(0|0);
     if ($107) {
      $p$0 = $20;$psize$0 = $21;
      break L10;
     }
    }
   } while(0);
   $108 = $R$1;
   $109 = HEAP32[(((4768) + 16|0))>>2]|0;
   $110 = ($108>>>0)<($109>>>0);
   if ($110) {
    _abort();
    // unreachable;
   }
   $111 = (($R$1) + 24|0);
   HEAP32[$111>>2] = $57;
   $$sum33 = (($$sum2) + 16)|0;
   $112 = (($mem) + ($$sum33)|0);
   $113 = $112;
   $114 = HEAP32[$113>>2]|0;
   $115 = ($114|0)==(0|0);
   do {
    if (!($115)) {
     $116 = $114;
     $117 = HEAP32[(((4768) + 16|0))>>2]|0;
     $118 = ($116>>>0)<($117>>>0);
     if ($118) {
      _abort();
      // unreachable;
     } else {
      $119 = (($R$1) + 16|0);
      HEAP32[$119>>2] = $114;
      $120 = (($114) + 24|0);
      HEAP32[$120>>2] = $R$1;
      break;
     }
    }
   } while(0);
   $$sum34 = (($$sum2) + 20)|0;
   $121 = (($mem) + ($$sum34)|0);
   $122 = $121;
   $123 = HEAP32[$122>>2]|0;
   $124 = ($123|0)==(0|0);
   if ($124) {
    $p$0 = $20;$psize$0 = $21;
    break;
   }
   $125 = $123;
   $126 = HEAP32[(((4768) + 16|0))>>2]|0;
   $127 = ($125>>>0)<($126>>>0);
   if ($127) {
    _abort();
    // unreachable;
   } else {
    $128 = (($R$1) + 20|0);
    HEAP32[$128>>2] = $123;
    $129 = (($123) + 24|0);
    HEAP32[$129>>2] = $R$1;
    $p$0 = $20;$psize$0 = $21;
    break;
   }
  } else {
   $p$0 = $3;$psize$0 = $11;
  }
 } while(0);
 $141 = $p$0;
 $142 = ($141>>>0)<($12>>>0);
 if (!($142)) {
  _abort();
  // unreachable;
 }
 $$sum25 = (($11) + -4)|0;
 $143 = (($mem) + ($$sum25)|0);
 $144 = $143;
 $145 = HEAP32[$144>>2]|0;
 $146 = $145 & 1;
 $147 = ($146|0)==(0);
 if ($147) {
  _abort();
  // unreachable;
 }
 $148 = $145 & 2;
 $149 = ($148|0)==(0);
 do {
  if ($149) {
   $150 = HEAP32[(((4768) + 24|0))>>2]|0;
   $151 = ($13|0)==($150|0);
   if ($151) {
    $152 = HEAP32[(((4768) + 12|0))>>2]|0;
    $153 = (($152) + ($psize$0))|0;
    HEAP32[(((4768) + 12|0))>>2] = $153;
    HEAP32[(((4768) + 24|0))>>2] = $p$0;
    $154 = $153 | 1;
    $155 = (($p$0) + 4|0);
    HEAP32[$155>>2] = $154;
    $156 = HEAP32[(((4768) + 20|0))>>2]|0;
    $157 = ($p$0|0)==($156|0);
    if (!($157)) {
     STACKTOP = sp;return;
    }
    HEAP32[(((4768) + 20|0))>>2] = 0;
    HEAP32[(((4768) + 8|0))>>2] = 0;
    STACKTOP = sp;return;
   }
   $158 = HEAP32[(((4768) + 20|0))>>2]|0;
   $159 = ($13|0)==($158|0);
   if ($159) {
    $160 = HEAP32[(((4768) + 8|0))>>2]|0;
    $161 = (($160) + ($psize$0))|0;
    HEAP32[(((4768) + 8|0))>>2] = $161;
    HEAP32[(((4768) + 20|0))>>2] = $p$0;
    $162 = $161 | 1;
    $163 = (($p$0) + 4|0);
    HEAP32[$163>>2] = $162;
    $164 = (($141) + ($161)|0);
    $165 = $164;
    HEAP32[$165>>2] = $161;
    STACKTOP = sp;return;
   }
   $166 = $145 & -8;
   $167 = (($166) + ($psize$0))|0;
   $168 = $145 >>> 3;
   $169 = ($145>>>0)<(256);
   L113: do {
    if ($169) {
     $170 = (($mem) + ($11)|0);
     $171 = $170;
     $172 = HEAP32[$171>>2]|0;
     $$sum2324 = $11 | 4;
     $173 = (($mem) + ($$sum2324)|0);
     $174 = $173;
     $175 = HEAP32[$174>>2]|0;
     $176 = $168 << 1;
     $177 = (((4768) + ($176<<2)|0) + 40|0);
     $178 = $177;
     $179 = ($172|0)==($178|0);
     do {
      if (!($179)) {
       $180 = $172;
       $181 = HEAP32[(((4768) + 16|0))>>2]|0;
       $182 = ($180>>>0)<($181>>>0);
       if ($182) {
        _abort();
        // unreachable;
       }
       $183 = (($172) + 12|0);
       $184 = HEAP32[$183>>2]|0;
       $185 = ($184|0)==($13|0);
       if ($185) {
        break;
       }
       _abort();
       // unreachable;
      }
     } while(0);
     $186 = ($175|0)==($172|0);
     if ($186) {
      $187 = 1 << $168;
      $188 = $187 ^ -1;
      $189 = HEAP32[((4768))>>2]|0;
      $190 = $189 & $188;
      HEAP32[((4768))>>2] = $190;
      break;
     }
     $191 = ($175|0)==($178|0);
     do {
      if ($191) {
       $$pre67 = (($175) + 8|0);
       $$pre$phi68Z2D = $$pre67;
      } else {
       $192 = $175;
       $193 = HEAP32[(((4768) + 16|0))>>2]|0;
       $194 = ($192>>>0)<($193>>>0);
       if ($194) {
        _abort();
        // unreachable;
       }
       $195 = (($175) + 8|0);
       $196 = HEAP32[$195>>2]|0;
       $197 = ($196|0)==($13|0);
       if ($197) {
        $$pre$phi68Z2D = $195;
        break;
       }
       _abort();
       // unreachable;
      }
     } while(0);
     $198 = (($172) + 12|0);
     HEAP32[$198>>2] = $175;
     HEAP32[$$pre$phi68Z2D>>2] = $172;
    } else {
     $199 = $12;
     $$sum5 = (($11) + 16)|0;
     $200 = (($mem) + ($$sum5)|0);
     $201 = $200;
     $202 = HEAP32[$201>>2]|0;
     $$sum67 = $11 | 4;
     $203 = (($mem) + ($$sum67)|0);
     $204 = $203;
     $205 = HEAP32[$204>>2]|0;
     $206 = ($205|0)==($199|0);
     do {
      if ($206) {
       $$sum9 = (($11) + 12)|0;
       $219 = (($mem) + ($$sum9)|0);
       $220 = $219;
       $221 = HEAP32[$220>>2]|0;
       $222 = ($221|0)==(0|0);
       if ($222) {
        $$sum8 = (($11) + 8)|0;
        $223 = (($mem) + ($$sum8)|0);
        $224 = $223;
        $225 = HEAP32[$224>>2]|0;
        $226 = ($225|0)==(0|0);
        if ($226) {
         $R7$1 = 0;
         break;
        } else {
         $R7$0 = $225;$RP9$0 = $224;
        }
       } else {
        $R7$0 = $221;$RP9$0 = $220;
       }
       while(1) {
        $227 = (($R7$0) + 20|0);
        $228 = HEAP32[$227>>2]|0;
        $229 = ($228|0)==(0|0);
        if (!($229)) {
         $RP9$0$phi = $227;$R7$0$phi = $228;$RP9$0 = $RP9$0$phi;$R7$0 = $R7$0$phi;
         continue;
        }
        $230 = (($R7$0) + 16|0);
        $231 = HEAP32[$230>>2]|0;
        $232 = ($231|0)==(0|0);
        if ($232) {
         break;
        } else {
         $R7$0 = $231;$RP9$0 = $230;
        }
       }
       $233 = $RP9$0;
       $234 = HEAP32[(((4768) + 16|0))>>2]|0;
       $235 = ($233>>>0)<($234>>>0);
       if ($235) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$RP9$0>>2] = 0;
        $R7$1 = $R7$0;
        break;
       }
      } else {
       $207 = (($mem) + ($11)|0);
       $208 = $207;
       $209 = HEAP32[$208>>2]|0;
       $210 = $209;
       $211 = HEAP32[(((4768) + 16|0))>>2]|0;
       $212 = ($210>>>0)<($211>>>0);
       if ($212) {
        _abort();
        // unreachable;
       }
       $213 = (($209) + 12|0);
       $214 = HEAP32[$213>>2]|0;
       $215 = ($214|0)==($199|0);
       if (!($215)) {
        _abort();
        // unreachable;
       }
       $216 = (($205) + 8|0);
       $217 = HEAP32[$216>>2]|0;
       $218 = ($217|0)==($199|0);
       if ($218) {
        HEAP32[$213>>2] = $205;
        HEAP32[$216>>2] = $209;
        $R7$1 = $205;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $236 = ($202|0)==(0|0);
     if ($236) {
      break;
     }
     $$sum18 = (($11) + 20)|0;
     $237 = (($mem) + ($$sum18)|0);
     $238 = $237;
     $239 = HEAP32[$238>>2]|0;
     $240 = (((4768) + ($239<<2)|0) + 304|0);
     $241 = HEAP32[$240>>2]|0;
     $242 = ($199|0)==($241|0);
     do {
      if ($242) {
       HEAP32[$240>>2] = $R7$1;
       $cond54 = ($R7$1|0)==(0|0);
       if (!($cond54)) {
        break;
       }
       $243 = 1 << $239;
       $244 = $243 ^ -1;
       $245 = HEAP32[(((4768) + 4|0))>>2]|0;
       $246 = $245 & $244;
       HEAP32[(((4768) + 4|0))>>2] = $246;
       break L113;
      } else {
       $247 = $202;
       $248 = HEAP32[(((4768) + 16|0))>>2]|0;
       $249 = ($247>>>0)<($248>>>0);
       if ($249) {
        _abort();
        // unreachable;
       }
       $250 = (($202) + 16|0);
       $251 = HEAP32[$250>>2]|0;
       $252 = ($251|0)==($199|0);
       if ($252) {
        HEAP32[$250>>2] = $R7$1;
       } else {
        $253 = (($202) + 20|0);
        HEAP32[$253>>2] = $R7$1;
       }
       $254 = ($R7$1|0)==(0|0);
       if ($254) {
        break L113;
       }
      }
     } while(0);
     $255 = $R7$1;
     $256 = HEAP32[(((4768) + 16|0))>>2]|0;
     $257 = ($255>>>0)<($256>>>0);
     if ($257) {
      _abort();
      // unreachable;
     }
     $258 = (($R7$1) + 24|0);
     HEAP32[$258>>2] = $202;
     $$sum19 = (($11) + 8)|0;
     $259 = (($mem) + ($$sum19)|0);
     $260 = $259;
     $261 = HEAP32[$260>>2]|0;
     $262 = ($261|0)==(0|0);
     do {
      if (!($262)) {
       $263 = $261;
       $264 = HEAP32[(((4768) + 16|0))>>2]|0;
       $265 = ($263>>>0)<($264>>>0);
       if ($265) {
        _abort();
        // unreachable;
       } else {
        $266 = (($R7$1) + 16|0);
        HEAP32[$266>>2] = $261;
        $267 = (($261) + 24|0);
        HEAP32[$267>>2] = $R7$1;
        break;
       }
      }
     } while(0);
     $$sum20 = (($11) + 12)|0;
     $268 = (($mem) + ($$sum20)|0);
     $269 = $268;
     $270 = HEAP32[$269>>2]|0;
     $271 = ($270|0)==(0|0);
     if ($271) {
      break;
     }
     $272 = $270;
     $273 = HEAP32[(((4768) + 16|0))>>2]|0;
     $274 = ($272>>>0)<($273>>>0);
     if ($274) {
      _abort();
      // unreachable;
     } else {
      $275 = (($R7$1) + 20|0);
      HEAP32[$275>>2] = $270;
      $276 = (($270) + 24|0);
      HEAP32[$276>>2] = $R7$1;
      break;
     }
    }
   } while(0);
   $277 = $167 | 1;
   $278 = (($p$0) + 4|0);
   HEAP32[$278>>2] = $277;
   $279 = (($141) + ($167)|0);
   $280 = $279;
   HEAP32[$280>>2] = $167;
   $281 = HEAP32[(((4768) + 20|0))>>2]|0;
   $282 = ($p$0|0)==($281|0);
   if (!($282)) {
    $psize$1 = $167;
    break;
   }
   HEAP32[(((4768) + 8|0))>>2] = $167;
   STACKTOP = sp;return;
  } else {
   $283 = $145 & -2;
   HEAP32[$144>>2] = $283;
   $284 = $psize$0 | 1;
   $285 = (($p$0) + 4|0);
   HEAP32[$285>>2] = $284;
   $286 = (($141) + ($psize$0)|0);
   $287 = $286;
   HEAP32[$287>>2] = $psize$0;
   $psize$1 = $psize$0;
  }
 } while(0);
 $288 = $psize$1 >>> 3;
 $289 = ($psize$1>>>0)<(256);
 if ($289) {
  $290 = $288 << 1;
  $291 = (((4768) + ($290<<2)|0) + 40|0);
  $292 = $291;
  $293 = HEAP32[((4768))>>2]|0;
  $294 = 1 << $288;
  $295 = $293 & $294;
  $296 = ($295|0)==(0);
  do {
   if ($296) {
    $297 = $293 | $294;
    HEAP32[((4768))>>2] = $297;
    $$sum16$pre = (($290) + 2)|0;
    $$pre = (((4768) + ($$sum16$pre<<2)|0) + 40|0);
    $$pre$phiZ2D = $$pre;$F16$0 = $292;
   } else {
    $$sum17 = (($290) + 2)|0;
    $298 = (((4768) + ($$sum17<<2)|0) + 40|0);
    $299 = HEAP32[$298>>2]|0;
    $300 = $299;
    $301 = HEAP32[(((4768) + 16|0))>>2]|0;
    $302 = ($300>>>0)<($301>>>0);
    if (!($302)) {
     $$pre$phiZ2D = $298;$F16$0 = $299;
     break;
    }
    _abort();
    // unreachable;
   }
  } while(0);
  HEAP32[$$pre$phiZ2D>>2] = $p$0;
  $303 = (($F16$0) + 12|0);
  HEAP32[$303>>2] = $p$0;
  $304 = (($p$0) + 8|0);
  HEAP32[$304>>2] = $F16$0;
  $305 = (($p$0) + 12|0);
  HEAP32[$305>>2] = $292;
  STACKTOP = sp;return;
 }
 $306 = $p$0;
 $307 = $psize$1 >>> 8;
 $308 = ($307|0)==(0);
 do {
  if ($308) {
   $I18$0 = 0;
  } else {
   $309 = ($psize$1>>>0)>(16777215);
   if ($309) {
    $I18$0 = 31;
    break;
   }
   $310 = (($307) + 1048320)|0;
   $311 = $310 >>> 16;
   $312 = $311 & 8;
   $313 = $307 << $312;
   $314 = (($313) + 520192)|0;
   $315 = $314 >>> 16;
   $316 = $315 & 4;
   $317 = $316 | $312;
   $318 = $313 << $316;
   $319 = (($318) + 245760)|0;
   $320 = $319 >>> 16;
   $321 = $320 & 2;
   $322 = $317 | $321;
   $323 = (14 - ($322))|0;
   $324 = $318 << $321;
   $325 = $324 >>> 15;
   $326 = (($323) + ($325))|0;
   $327 = $326 << 1;
   $328 = (($326) + 7)|0;
   $329 = $psize$1 >>> $328;
   $330 = $329 & 1;
   $331 = $330 | $327;
   $I18$0 = $331;
  }
 } while(0);
 $332 = (((4768) + ($I18$0<<2)|0) + 304|0);
 $333 = (($p$0) + 28|0);
 $I18$0$c = $I18$0;
 HEAP32[$333>>2] = $I18$0$c;
 $334 = (($p$0) + 20|0);
 HEAP32[$334>>2] = 0;
 $335 = (($p$0) + 16|0);
 HEAP32[$335>>2] = 0;
 $336 = HEAP32[(((4768) + 4|0))>>2]|0;
 $337 = 1 << $I18$0;
 $338 = $336 & $337;
 $339 = ($338|0)==(0);
 L199: do {
  if ($339) {
   $340 = $336 | $337;
   HEAP32[(((4768) + 4|0))>>2] = $340;
   HEAP32[$332>>2] = $306;
   $341 = (($p$0) + 24|0);
   $$c = $332;
   HEAP32[$341>>2] = $$c;
   $342 = (($p$0) + 12|0);
   HEAP32[$342>>2] = $p$0;
   $343 = (($p$0) + 8|0);
   HEAP32[$343>>2] = $p$0;
  } else {
   $344 = HEAP32[$332>>2]|0;
   $345 = ($I18$0|0)==(31);
   if ($345) {
    $348 = 0;
   } else {
    $346 = $I18$0 >>> 1;
    $347 = (25 - ($346))|0;
    $348 = $347;
   }
   $349 = (($344) + 4|0);
   $350 = HEAP32[$349>>2]|0;
   $351 = $350 & -8;
   $352 = ($351|0)==($psize$1|0);
   L205: do {
    if ($352) {
     $T$0$lcssa = $344;
    } else {
     $353 = $psize$1 << $348;
     $K19$057 = $353;$T$056 = $344;
     while(1) {
      $359 = $K19$057 >>> 31;
      $360 = ((($T$056) + ($359<<2)|0) + 16|0);
      $361 = HEAP32[$360>>2]|0;
      $362 = ($361|0)==(0|0);
      if ($362) {
       break;
      }
      $354 = $K19$057 << 1;
      $355 = (($361) + 4|0);
      $356 = HEAP32[$355>>2]|0;
      $357 = $356 & -8;
      $358 = ($357|0)==($psize$1|0);
      if ($358) {
       $T$0$lcssa = $361;
       break L205;
      } else {
       $T$056$phi = $361;$K19$057 = $354;$T$056 = $T$056$phi;
      }
     }
     $363 = $360;
     $364 = HEAP32[(((4768) + 16|0))>>2]|0;
     $365 = ($363>>>0)<($364>>>0);
     if ($365) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$360>>2] = $306;
      $366 = (($p$0) + 24|0);
      $T$0$c13 = $T$056;
      HEAP32[$366>>2] = $T$0$c13;
      $367 = (($p$0) + 12|0);
      HEAP32[$367>>2] = $p$0;
      $368 = (($p$0) + 8|0);
      HEAP32[$368>>2] = $p$0;
      break L199;
     }
    }
   } while(0);
   $369 = (($T$0$lcssa) + 8|0);
   $370 = HEAP32[$369>>2]|0;
   $371 = $T$0$lcssa;
   $372 = HEAP32[(((4768) + 16|0))>>2]|0;
   $373 = ($371>>>0)<($372>>>0);
   if ($373) {
    _abort();
    // unreachable;
   }
   $374 = $370;
   $375 = ($374>>>0)<($372>>>0);
   if ($375) {
    _abort();
    // unreachable;
   } else {
    $376 = (($370) + 12|0);
    HEAP32[$376>>2] = $306;
    HEAP32[$369>>2] = $306;
    $377 = (($p$0) + 8|0);
    $$c12 = $370;
    HEAP32[$377>>2] = $$c12;
    $378 = (($p$0) + 12|0);
    $T$0$c = $T$0$lcssa;
    HEAP32[$378>>2] = $T$0$c;
    $379 = (($p$0) + 24|0);
    HEAP32[$379>>2] = 0;
    break;
   }
  }
 } while(0);
 $380 = HEAP32[(((4768) + 32|0))>>2]|0;
 $381 = (($380) + -1)|0;
 HEAP32[(((4768) + 32|0))>>2] = $381;
 $382 = ($381|0)==(0);
 if ($382) {
  $sp$0$in$i = (((4768) + 456|0));
 } else {
  STACKTOP = sp;return;
 }
 while(1) {
  $sp$0$i = HEAP32[$sp$0$in$i>>2]|0;
  $383 = ($sp$0$i|0)==(0|0);
  $384 = (($sp$0$i) + 8|0);
  if ($383) {
   break;
  } else {
   $sp$0$in$i$phi = $384;$sp$0$in$i = $sp$0$in$i$phi;
  }
 }
 HEAP32[(((4768) + 32|0))>>2] = -1;
 STACKTOP = sp;return;
}
function _internal_memalign($alignment,$bytes) {
 $alignment = $alignment|0;
 $bytes = $bytes|0;
 var $$1 = 0, $$alignment = 0, $$sum1 = 0, $$sum2 = 0, $$sum3 = 0, $$sum4 = 0, $$sum6 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0;
 var $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0;
 var $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0;
 var $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0;
 var $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $a$0 = 0;
 var $a$0$phi = 0, $mem$0 = 0, $p$0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($alignment>>>0)<(16);
 $$alignment = $1 ? 16 : $alignment;
 $2 = (($$alignment) + -1)|0;
 $3 = $2 & $$alignment;
 $4 = ($3|0)==(0);
 if ($4) {
  $$1 = $$alignment;
 } else {
  $a$0 = 16;
  while(1) {
   $5 = ($a$0>>>0)<($$alignment>>>0);
   $6 = $a$0 << 1;
   if ($5) {
    $a$0$phi = $6;$a$0 = $a$0$phi;
   } else {
    $$1 = $a$0;
    break;
   }
  }
 }
 $7 = (-64 - ($$1))|0;
 $8 = ($7>>>0)>($bytes>>>0);
 if (!($8)) {
  $9 = (___errno_location()|0);
  HEAP32[$9>>2] = 12;
  $mem$0 = 0;
  STACKTOP = sp;return ($mem$0|0);
 }
 $10 = ($bytes>>>0)<(11);
 if ($10) {
  $13 = 16;
 } else {
  $11 = (($bytes) + 11)|0;
  $12 = $11 & -8;
  $13 = $12;
 }
 $14 = (($$1) + 12)|0;
 $15 = (($14) + ($13))|0;
 $16 = (_malloc($15)|0);
 $17 = ($16|0)==(0|0);
 if ($17) {
  $mem$0 = 0;
  STACKTOP = sp;return ($mem$0|0);
 }
 $18 = (($16) + -8|0);
 $19 = $18;
 $20 = $16;
 $21 = (($$1) + -1)|0;
 $22 = $20 & $21;
 $23 = ($22|0)==(0);
 do {
  if ($23) {
   $p$0 = $19;
  } else {
   $24 = (($16) + ($21)|0);
   $25 = $24;
   $26 = (0 - ($$1))|0;
   $27 = $25 & $26;
   $28 = $27;
   $29 = (($28) + -8|0);
   $30 = $29;
   $31 = $18;
   $32 = (($30) - ($31))|0;
   $33 = ($32>>>0)>(15);
   if ($33) {
    $35 = $29;
   } else {
    $$sum3 = (($$1) + -8)|0;
    $34 = (($28) + ($$sum3)|0);
    $35 = $34;
   }
   $36 = $35;
   $37 = $35;
   $38 = (($37) - ($31))|0;
   $39 = (($16) + -4|0);
   $40 = $39;
   $41 = HEAP32[$40>>2]|0;
   $42 = $41 & -8;
   $43 = (($42) - ($38))|0;
   $44 = $41 & 3;
   $45 = ($44|0)==(0);
   if ($45) {
    $46 = $18;
    $47 = HEAP32[$46>>2]|0;
    $48 = (($47) + ($38))|0;
    $49 = $35;
    HEAP32[$49>>2] = $48;
    $50 = (($35) + 4|0);
    $51 = $50;
    HEAP32[$51>>2] = $43;
    $p$0 = $36;
    break;
   } else {
    $52 = (($35) + 4|0);
    $53 = $52;
    $54 = HEAP32[$53>>2]|0;
    $55 = $54 & 1;
    $56 = $43 | $55;
    $57 = $56 | 2;
    HEAP32[$53>>2] = $57;
    $$sum4 = (($43) + 4)|0;
    $58 = (($35) + ($$sum4)|0);
    $59 = $58;
    $60 = HEAP32[$59>>2]|0;
    $61 = $60 | 1;
    HEAP32[$59>>2] = $61;
    $62 = HEAP32[$40>>2]|0;
    $63 = $62 & 1;
    $64 = $38 | $63;
    $65 = $64 | 2;
    HEAP32[$40>>2] = $65;
    $$sum6 = (($38) + -4)|0;
    $66 = (($16) + ($$sum6)|0);
    $67 = $66;
    $68 = HEAP32[$67>>2]|0;
    $69 = $68 | 1;
    HEAP32[$67>>2] = $69;
    _dispose_chunk($19,$38);
    $p$0 = $36;
    break;
   }
  }
 } while(0);
 $70 = (($p$0) + 4|0);
 $71 = HEAP32[$70>>2]|0;
 $72 = $71 & 3;
 $73 = ($72|0)==(0);
 do {
  if (!($73)) {
   $74 = $71 & -8;
   $75 = (($13) + 16)|0;
   $76 = ($74>>>0)>($75>>>0);
   if (!($76)) {
    break;
   }
   $77 = (($74) - ($13))|0;
   $78 = $p$0;
   $79 = (($78) + ($13)|0);
   $80 = $79;
   $81 = $71 & 1;
   $82 = $13 | $81;
   $83 = $82 | 2;
   HEAP32[$70>>2] = $83;
   $$sum1 = $13 | 4;
   $84 = (($78) + ($$sum1)|0);
   $85 = $84;
   $86 = $77 | 3;
   HEAP32[$85>>2] = $86;
   $$sum2 = $74 | 4;
   $87 = (($78) + ($$sum2)|0);
   $88 = $87;
   $89 = HEAP32[$88>>2]|0;
   $90 = $89 | 1;
   HEAP32[$88>>2] = $90;
   _dispose_chunk($80,$77);
  }
 } while(0);
 $91 = (($p$0) + 8|0);
 $92 = $91;
 $mem$0 = $92;
 STACKTOP = sp;return ($mem$0|0);
}
function _posix_memalign($pp,$alignment,$bytes) {
 $pp = $pp|0;
 $alignment = $alignment|0;
 $bytes = $bytes|0;
 var $$0 = 0, $$alignment = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $mem$0 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($alignment|0)==(8);
 do {
  if ($1) {
   $2 = (_malloc($bytes)|0);
   $mem$0 = $2;
   label = 7;
  } else {
   $3 = $alignment >>> 2;
   $4 = $alignment & 3;
   $5 = ($4|0)!=(0);
   $6 = ($3|0)==(0);
   $or$cond = $5 | $6;
   if ($or$cond) {
    $$0 = 22;
    break;
   }
   $7 = (($3) + 1073741823)|0;
   $8 = $7 & $3;
   $9 = ($8|0)==(0);
   if (!($9)) {
    $$0 = 22;
    break;
   }
   $10 = (-64 - ($alignment))|0;
   $11 = ($10>>>0)<($bytes>>>0);
   if ($11) {
    $$0 = 12;
    break;
   }
   $12 = ($alignment>>>0)<(16);
   $$alignment = $12 ? 16 : $alignment;
   $13 = (_internal_memalign($$alignment,$bytes)|0);
   $mem$0 = $13;
   label = 7;
  }
 } while(0);
 do {
  if ((label|0) == 7) {
   $14 = ($mem$0|0)==(0|0);
   if ($14) {
    $$0 = 12;
    break;
   }
   HEAP32[$pp>>2] = $mem$0;
   $$0 = 0;
  }
 } while(0);
 STACKTOP = sp;return ($$0|0);
}
function _dispose_chunk($p,$psize) {
 $p = $p|0;
 $psize = $psize|0;
 var $$0 = 0, $$02 = 0, $$1 = 0, $$c = 0, $$c8 = 0, $$pre = 0, $$pre$phi63Z2D = 0, $$pre$phi65Z2D = 0, $$pre$phiZ2D = 0, $$pre62 = 0, $$pre64 = 0, $$sum = 0, $$sum1 = 0, $$sum12$pre = 0, $$sum13 = 0, $$sum14 = 0, $$sum15 = 0, $$sum16 = 0, $$sum17 = 0, $$sum18 = 0;
 var $$sum19 = 0, $$sum2 = 0, $$sum20 = 0, $$sum22 = 0, $$sum23 = 0, $$sum24 = 0, $$sum25 = 0, $$sum26 = 0, $$sum27 = 0, $$sum28 = 0, $$sum29 = 0, $$sum3 = 0, $$sum30 = 0, $$sum31 = 0, $$sum4 = 0, $$sum5 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0;
 var $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0;
 var $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0;
 var $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0;
 var $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0;
 var $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0;
 var $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0;
 var $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0;
 var $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0;
 var $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0;
 var $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0;
 var $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0;
 var $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0;
 var $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0;
 var $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0;
 var $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $38 = 0;
 var $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0;
 var $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0;
 var $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0;
 var $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F16$0 = 0, $I19$0 = 0, $I19$0$c = 0, $K20$049 = 0, $R$0 = 0, $R$0$phi = 0, $R$1 = 0, $R7$0 = 0, $R7$0$phi = 0, $R7$1 = 0, $RP$0 = 0, $RP$0$phi = 0, $RP9$0 = 0;
 var $RP9$0$phi = 0, $T$0$c = 0, $T$0$c9 = 0, $T$0$lcssa = 0, $T$048 = 0, $T$048$phi = 0, $cond = 0, $cond46 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = $p;
 $2 = (($1) + ($psize)|0);
 $3 = $2;
 $4 = (($p) + 4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 1;
 $7 = ($6|0)==(0);
 L1: do {
  if ($7) {
   $8 = ($p);
   $9 = HEAP32[$8>>2]|0;
   $10 = $5 & 3;
   $11 = ($10|0)==(0);
   if ($11) {
    STACKTOP = sp;return;
   }
   $12 = (0 - ($9))|0;
   $13 = (($1) + ($12)|0);
   $14 = $13;
   $15 = (($9) + ($psize))|0;
   $16 = HEAP32[(((4768) + 16|0))>>2]|0;
   $17 = ($13>>>0)<($16>>>0);
   if ($17) {
    _abort();
    // unreachable;
   }
   $18 = HEAP32[(((4768) + 20|0))>>2]|0;
   $19 = ($14|0)==($18|0);
   if ($19) {
    $$sum = (($psize) + 4)|0;
    $125 = (($1) + ($$sum)|0);
    $126 = $125;
    $127 = HEAP32[$126>>2]|0;
    $128 = $127 & 3;
    $129 = ($128|0)==(3);
    if (!($129)) {
     $$0 = $14;$$02 = $15;
     break;
    }
    HEAP32[(((4768) + 8|0))>>2] = $15;
    $130 = HEAP32[$126>>2]|0;
    $131 = $130 & -2;
    HEAP32[$126>>2] = $131;
    $132 = $15 | 1;
    $$sum20 = (4 - ($9))|0;
    $133 = (($1) + ($$sum20)|0);
    $134 = $133;
    HEAP32[$134>>2] = $132;
    $135 = $2;
    HEAP32[$135>>2] = $15;
    STACKTOP = sp;return;
   }
   $20 = $9 >>> 3;
   $21 = ($9>>>0)<(256);
   if ($21) {
    $$sum30 = (8 - ($9))|0;
    $22 = (($1) + ($$sum30)|0);
    $23 = $22;
    $24 = HEAP32[$23>>2]|0;
    $$sum31 = (12 - ($9))|0;
    $25 = (($1) + ($$sum31)|0);
    $26 = $25;
    $27 = HEAP32[$26>>2]|0;
    $28 = $20 << 1;
    $29 = (((4768) + ($28<<2)|0) + 40|0);
    $30 = $29;
    $31 = ($24|0)==($30|0);
    do {
     if (!($31)) {
      $32 = $24;
      $33 = ($32>>>0)<($16>>>0);
      if ($33) {
       _abort();
       // unreachable;
      }
      $34 = (($24) + 12|0);
      $35 = HEAP32[$34>>2]|0;
      $36 = ($35|0)==($14|0);
      if ($36) {
       break;
      }
      _abort();
      // unreachable;
     }
    } while(0);
    $37 = ($27|0)==($24|0);
    if ($37) {
     $38 = 1 << $20;
     $39 = $38 ^ -1;
     $40 = HEAP32[((4768))>>2]|0;
     $41 = $40 & $39;
     HEAP32[((4768))>>2] = $41;
     $$0 = $14;$$02 = $15;
     break;
    }
    $42 = ($27|0)==($30|0);
    do {
     if ($42) {
      $$pre64 = (($27) + 8|0);
      $$pre$phi65Z2D = $$pre64;
     } else {
      $43 = $27;
      $44 = ($43>>>0)<($16>>>0);
      if ($44) {
       _abort();
       // unreachable;
      }
      $45 = (($27) + 8|0);
      $46 = HEAP32[$45>>2]|0;
      $47 = ($46|0)==($14|0);
      if ($47) {
       $$pre$phi65Z2D = $45;
       break;
      }
      _abort();
      // unreachable;
     }
    } while(0);
    $48 = (($24) + 12|0);
    HEAP32[$48>>2] = $27;
    HEAP32[$$pre$phi65Z2D>>2] = $24;
    $$0 = $14;$$02 = $15;
    break;
   }
   $49 = $13;
   $$sum22 = (24 - ($9))|0;
   $50 = (($1) + ($$sum22)|0);
   $51 = $50;
   $52 = HEAP32[$51>>2]|0;
   $$sum23 = (12 - ($9))|0;
   $53 = (($1) + ($$sum23)|0);
   $54 = $53;
   $55 = HEAP32[$54>>2]|0;
   $56 = ($55|0)==($49|0);
   do {
    if ($56) {
     $$sum24 = (16 - ($9))|0;
     $$sum25 = (($$sum24) + 4)|0;
     $68 = (($1) + ($$sum25)|0);
     $69 = $68;
     $70 = HEAP32[$69>>2]|0;
     $71 = ($70|0)==(0|0);
     if ($71) {
      $72 = (($1) + ($$sum24)|0);
      $73 = $72;
      $74 = HEAP32[$73>>2]|0;
      $75 = ($74|0)==(0|0);
      if ($75) {
       $R$1 = 0;
       break;
      } else {
       $R$0 = $74;$RP$0 = $73;
      }
     } else {
      $R$0 = $70;$RP$0 = $69;
     }
     while(1) {
      $76 = (($R$0) + 20|0);
      $77 = HEAP32[$76>>2]|0;
      $78 = ($77|0)==(0|0);
      if (!($78)) {
       $RP$0$phi = $76;$R$0$phi = $77;$RP$0 = $RP$0$phi;$R$0 = $R$0$phi;
       continue;
      }
      $79 = (($R$0) + 16|0);
      $80 = HEAP32[$79>>2]|0;
      $81 = ($80|0)==(0|0);
      if ($81) {
       break;
      } else {
       $R$0 = $80;$RP$0 = $79;
      }
     }
     $82 = $RP$0;
     $83 = ($82>>>0)<($16>>>0);
     if ($83) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0>>2] = 0;
      $R$1 = $R$0;
      break;
     }
    } else {
     $$sum29 = (8 - ($9))|0;
     $57 = (($1) + ($$sum29)|0);
     $58 = $57;
     $59 = HEAP32[$58>>2]|0;
     $60 = $59;
     $61 = ($60>>>0)<($16>>>0);
     if ($61) {
      _abort();
      // unreachable;
     }
     $62 = (($59) + 12|0);
     $63 = HEAP32[$62>>2]|0;
     $64 = ($63|0)==($49|0);
     if (!($64)) {
      _abort();
      // unreachable;
     }
     $65 = (($55) + 8|0);
     $66 = HEAP32[$65>>2]|0;
     $67 = ($66|0)==($49|0);
     if ($67) {
      HEAP32[$62>>2] = $55;
      HEAP32[$65>>2] = $59;
      $R$1 = $55;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $84 = ($52|0)==(0|0);
   if ($84) {
    $$0 = $14;$$02 = $15;
    break;
   }
   $$sum26 = (28 - ($9))|0;
   $85 = (($1) + ($$sum26)|0);
   $86 = $85;
   $87 = HEAP32[$86>>2]|0;
   $88 = (((4768) + ($87<<2)|0) + 304|0);
   $89 = HEAP32[$88>>2]|0;
   $90 = ($49|0)==($89|0);
   do {
    if ($90) {
     HEAP32[$88>>2] = $R$1;
     $cond = ($R$1|0)==(0|0);
     if (!($cond)) {
      break;
     }
     $91 = 1 << $87;
     $92 = $91 ^ -1;
     $93 = HEAP32[(((4768) + 4|0))>>2]|0;
     $94 = $93 & $92;
     HEAP32[(((4768) + 4|0))>>2] = $94;
     $$0 = $14;$$02 = $15;
     break L1;
    } else {
     $95 = $52;
     $96 = HEAP32[(((4768) + 16|0))>>2]|0;
     $97 = ($95>>>0)<($96>>>0);
     if ($97) {
      _abort();
      // unreachable;
     }
     $98 = (($52) + 16|0);
     $99 = HEAP32[$98>>2]|0;
     $100 = ($99|0)==($49|0);
     if ($100) {
      HEAP32[$98>>2] = $R$1;
     } else {
      $101 = (($52) + 20|0);
      HEAP32[$101>>2] = $R$1;
     }
     $102 = ($R$1|0)==(0|0);
     if ($102) {
      $$0 = $14;$$02 = $15;
      break L1;
     }
    }
   } while(0);
   $103 = $R$1;
   $104 = HEAP32[(((4768) + 16|0))>>2]|0;
   $105 = ($103>>>0)<($104>>>0);
   if ($105) {
    _abort();
    // unreachable;
   }
   $106 = (($R$1) + 24|0);
   HEAP32[$106>>2] = $52;
   $$sum27 = (16 - ($9))|0;
   $107 = (($1) + ($$sum27)|0);
   $108 = $107;
   $109 = HEAP32[$108>>2]|0;
   $110 = ($109|0)==(0|0);
   do {
    if (!($110)) {
     $111 = $109;
     $112 = HEAP32[(((4768) + 16|0))>>2]|0;
     $113 = ($111>>>0)<($112>>>0);
     if ($113) {
      _abort();
      // unreachable;
     } else {
      $114 = (($R$1) + 16|0);
      HEAP32[$114>>2] = $109;
      $115 = (($109) + 24|0);
      HEAP32[$115>>2] = $R$1;
      break;
     }
    }
   } while(0);
   $$sum28 = (($$sum27) + 4)|0;
   $116 = (($1) + ($$sum28)|0);
   $117 = $116;
   $118 = HEAP32[$117>>2]|0;
   $119 = ($118|0)==(0|0);
   if ($119) {
    $$0 = $14;$$02 = $15;
    break;
   }
   $120 = $118;
   $121 = HEAP32[(((4768) + 16|0))>>2]|0;
   $122 = ($120>>>0)<($121>>>0);
   if ($122) {
    _abort();
    // unreachable;
   } else {
    $123 = (($R$1) + 20|0);
    HEAP32[$123>>2] = $118;
    $124 = (($118) + 24|0);
    HEAP32[$124>>2] = $R$1;
    $$0 = $14;$$02 = $15;
    break;
   }
  } else {
   $$0 = $p;$$02 = $psize;
  }
 } while(0);
 $136 = HEAP32[(((4768) + 16|0))>>2]|0;
 $137 = ($2>>>0)<($136>>>0);
 if ($137) {
  _abort();
  // unreachable;
 }
 $$sum1 = (($psize) + 4)|0;
 $138 = (($1) + ($$sum1)|0);
 $139 = $138;
 $140 = HEAP32[$139>>2]|0;
 $141 = $140 & 2;
 $142 = ($141|0)==(0);
 do {
  if ($142) {
   $143 = HEAP32[(((4768) + 24|0))>>2]|0;
   $144 = ($3|0)==($143|0);
   if ($144) {
    $145 = HEAP32[(((4768) + 12|0))>>2]|0;
    $146 = (($145) + ($$02))|0;
    HEAP32[(((4768) + 12|0))>>2] = $146;
    HEAP32[(((4768) + 24|0))>>2] = $$0;
    $147 = $146 | 1;
    $148 = (($$0) + 4|0);
    HEAP32[$148>>2] = $147;
    $149 = HEAP32[(((4768) + 20|0))>>2]|0;
    $150 = ($$0|0)==($149|0);
    if (!($150)) {
     STACKTOP = sp;return;
    }
    HEAP32[(((4768) + 20|0))>>2] = 0;
    HEAP32[(((4768) + 8|0))>>2] = 0;
    STACKTOP = sp;return;
   }
   $151 = HEAP32[(((4768) + 20|0))>>2]|0;
   $152 = ($3|0)==($151|0);
   if ($152) {
    $153 = HEAP32[(((4768) + 8|0))>>2]|0;
    $154 = (($153) + ($$02))|0;
    HEAP32[(((4768) + 8|0))>>2] = $154;
    HEAP32[(((4768) + 20|0))>>2] = $$0;
    $155 = $154 | 1;
    $156 = (($$0) + 4|0);
    HEAP32[$156>>2] = $155;
    $157 = $$0;
    $158 = (($157) + ($154)|0);
    $159 = $158;
    HEAP32[$159>>2] = $154;
    STACKTOP = sp;return;
   }
   $160 = $140 & -8;
   $161 = (($160) + ($$02))|0;
   $162 = $140 >>> 3;
   $163 = ($140>>>0)<(256);
   L101: do {
    if ($163) {
     $$sum18 = (($psize) + 8)|0;
     $164 = (($1) + ($$sum18)|0);
     $165 = $164;
     $166 = HEAP32[$165>>2]|0;
     $$sum19 = (($psize) + 12)|0;
     $167 = (($1) + ($$sum19)|0);
     $168 = $167;
     $169 = HEAP32[$168>>2]|0;
     $170 = $162 << 1;
     $171 = (((4768) + ($170<<2)|0) + 40|0);
     $172 = $171;
     $173 = ($166|0)==($172|0);
     do {
      if (!($173)) {
       $174 = $166;
       $175 = ($174>>>0)<($136>>>0);
       if ($175) {
        _abort();
        // unreachable;
       }
       $176 = (($166) + 12|0);
       $177 = HEAP32[$176>>2]|0;
       $178 = ($177|0)==($3|0);
       if ($178) {
        break;
       }
       _abort();
       // unreachable;
      }
     } while(0);
     $179 = ($169|0)==($166|0);
     if ($179) {
      $180 = 1 << $162;
      $181 = $180 ^ -1;
      $182 = HEAP32[((4768))>>2]|0;
      $183 = $182 & $181;
      HEAP32[((4768))>>2] = $183;
      break;
     }
     $184 = ($169|0)==($172|0);
     do {
      if ($184) {
       $$pre62 = (($169) + 8|0);
       $$pre$phi63Z2D = $$pre62;
      } else {
       $185 = $169;
       $186 = ($185>>>0)<($136>>>0);
       if ($186) {
        _abort();
        // unreachable;
       }
       $187 = (($169) + 8|0);
       $188 = HEAP32[$187>>2]|0;
       $189 = ($188|0)==($3|0);
       if ($189) {
        $$pre$phi63Z2D = $187;
        break;
       }
       _abort();
       // unreachable;
      }
     } while(0);
     $190 = (($166) + 12|0);
     HEAP32[$190>>2] = $169;
     HEAP32[$$pre$phi63Z2D>>2] = $166;
    } else {
     $191 = $2;
     $$sum2 = (($psize) + 24)|0;
     $192 = (($1) + ($$sum2)|0);
     $193 = $192;
     $194 = HEAP32[$193>>2]|0;
     $$sum3 = (($psize) + 12)|0;
     $195 = (($1) + ($$sum3)|0);
     $196 = $195;
     $197 = HEAP32[$196>>2]|0;
     $198 = ($197|0)==($191|0);
     do {
      if ($198) {
       $$sum5 = (($psize) + 20)|0;
       $210 = (($1) + ($$sum5)|0);
       $211 = $210;
       $212 = HEAP32[$211>>2]|0;
       $213 = ($212|0)==(0|0);
       if ($213) {
        $$sum4 = (($psize) + 16)|0;
        $214 = (($1) + ($$sum4)|0);
        $215 = $214;
        $216 = HEAP32[$215>>2]|0;
        $217 = ($216|0)==(0|0);
        if ($217) {
         $R7$1 = 0;
         break;
        } else {
         $R7$0 = $216;$RP9$0 = $215;
        }
       } else {
        $R7$0 = $212;$RP9$0 = $211;
       }
       while(1) {
        $218 = (($R7$0) + 20|0);
        $219 = HEAP32[$218>>2]|0;
        $220 = ($219|0)==(0|0);
        if (!($220)) {
         $RP9$0$phi = $218;$R7$0$phi = $219;$RP9$0 = $RP9$0$phi;$R7$0 = $R7$0$phi;
         continue;
        }
        $221 = (($R7$0) + 16|0);
        $222 = HEAP32[$221>>2]|0;
        $223 = ($222|0)==(0|0);
        if ($223) {
         break;
        } else {
         $R7$0 = $222;$RP9$0 = $221;
        }
       }
       $224 = $RP9$0;
       $225 = ($224>>>0)<($136>>>0);
       if ($225) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$RP9$0>>2] = 0;
        $R7$1 = $R7$0;
        break;
       }
      } else {
       $$sum17 = (($psize) + 8)|0;
       $199 = (($1) + ($$sum17)|0);
       $200 = $199;
       $201 = HEAP32[$200>>2]|0;
       $202 = $201;
       $203 = ($202>>>0)<($136>>>0);
       if ($203) {
        _abort();
        // unreachable;
       }
       $204 = (($201) + 12|0);
       $205 = HEAP32[$204>>2]|0;
       $206 = ($205|0)==($191|0);
       if (!($206)) {
        _abort();
        // unreachable;
       }
       $207 = (($197) + 8|0);
       $208 = HEAP32[$207>>2]|0;
       $209 = ($208|0)==($191|0);
       if ($209) {
        HEAP32[$204>>2] = $197;
        HEAP32[$207>>2] = $201;
        $R7$1 = $197;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $226 = ($194|0)==(0|0);
     if ($226) {
      break;
     }
     $$sum14 = (($psize) + 28)|0;
     $227 = (($1) + ($$sum14)|0);
     $228 = $227;
     $229 = HEAP32[$228>>2]|0;
     $230 = (((4768) + ($229<<2)|0) + 304|0);
     $231 = HEAP32[$230>>2]|0;
     $232 = ($191|0)==($231|0);
     do {
      if ($232) {
       HEAP32[$230>>2] = $R7$1;
       $cond46 = ($R7$1|0)==(0|0);
       if (!($cond46)) {
        break;
       }
       $233 = 1 << $229;
       $234 = $233 ^ -1;
       $235 = HEAP32[(((4768) + 4|0))>>2]|0;
       $236 = $235 & $234;
       HEAP32[(((4768) + 4|0))>>2] = $236;
       break L101;
      } else {
       $237 = $194;
       $238 = HEAP32[(((4768) + 16|0))>>2]|0;
       $239 = ($237>>>0)<($238>>>0);
       if ($239) {
        _abort();
        // unreachable;
       }
       $240 = (($194) + 16|0);
       $241 = HEAP32[$240>>2]|0;
       $242 = ($241|0)==($191|0);
       if ($242) {
        HEAP32[$240>>2] = $R7$1;
       } else {
        $243 = (($194) + 20|0);
        HEAP32[$243>>2] = $R7$1;
       }
       $244 = ($R7$1|0)==(0|0);
       if ($244) {
        break L101;
       }
      }
     } while(0);
     $245 = $R7$1;
     $246 = HEAP32[(((4768) + 16|0))>>2]|0;
     $247 = ($245>>>0)<($246>>>0);
     if ($247) {
      _abort();
      // unreachable;
     }
     $248 = (($R7$1) + 24|0);
     HEAP32[$248>>2] = $194;
     $$sum15 = (($psize) + 16)|0;
     $249 = (($1) + ($$sum15)|0);
     $250 = $249;
     $251 = HEAP32[$250>>2]|0;
     $252 = ($251|0)==(0|0);
     do {
      if (!($252)) {
       $253 = $251;
       $254 = HEAP32[(((4768) + 16|0))>>2]|0;
       $255 = ($253>>>0)<($254>>>0);
       if ($255) {
        _abort();
        // unreachable;
       } else {
        $256 = (($R7$1) + 16|0);
        HEAP32[$256>>2] = $251;
        $257 = (($251) + 24|0);
        HEAP32[$257>>2] = $R7$1;
        break;
       }
      }
     } while(0);
     $$sum16 = (($psize) + 20)|0;
     $258 = (($1) + ($$sum16)|0);
     $259 = $258;
     $260 = HEAP32[$259>>2]|0;
     $261 = ($260|0)==(0|0);
     if ($261) {
      break;
     }
     $262 = $260;
     $263 = HEAP32[(((4768) + 16|0))>>2]|0;
     $264 = ($262>>>0)<($263>>>0);
     if ($264) {
      _abort();
      // unreachable;
     } else {
      $265 = (($R7$1) + 20|0);
      HEAP32[$265>>2] = $260;
      $266 = (($260) + 24|0);
      HEAP32[$266>>2] = $R7$1;
      break;
     }
    }
   } while(0);
   $267 = $161 | 1;
   $268 = (($$0) + 4|0);
   HEAP32[$268>>2] = $267;
   $269 = $$0;
   $270 = (($269) + ($161)|0);
   $271 = $270;
   HEAP32[$271>>2] = $161;
   $272 = HEAP32[(((4768) + 20|0))>>2]|0;
   $273 = ($$0|0)==($272|0);
   if (!($273)) {
    $$1 = $161;
    break;
   }
   HEAP32[(((4768) + 8|0))>>2] = $161;
   STACKTOP = sp;return;
  } else {
   $274 = $140 & -2;
   HEAP32[$139>>2] = $274;
   $275 = $$02 | 1;
   $276 = (($$0) + 4|0);
   HEAP32[$276>>2] = $275;
   $277 = $$0;
   $278 = (($277) + ($$02)|0);
   $279 = $278;
   HEAP32[$279>>2] = $$02;
   $$1 = $$02;
  }
 } while(0);
 $280 = $$1 >>> 3;
 $281 = ($$1>>>0)<(256);
 if ($281) {
  $282 = $280 << 1;
  $283 = (((4768) + ($282<<2)|0) + 40|0);
  $284 = $283;
  $285 = HEAP32[((4768))>>2]|0;
  $286 = 1 << $280;
  $287 = $285 & $286;
  $288 = ($287|0)==(0);
  do {
   if ($288) {
    $289 = $285 | $286;
    HEAP32[((4768))>>2] = $289;
    $$sum12$pre = (($282) + 2)|0;
    $$pre = (((4768) + ($$sum12$pre<<2)|0) + 40|0);
    $$pre$phiZ2D = $$pre;$F16$0 = $284;
   } else {
    $$sum13 = (($282) + 2)|0;
    $290 = (((4768) + ($$sum13<<2)|0) + 40|0);
    $291 = HEAP32[$290>>2]|0;
    $292 = $291;
    $293 = HEAP32[(((4768) + 16|0))>>2]|0;
    $294 = ($292>>>0)<($293>>>0);
    if (!($294)) {
     $$pre$phiZ2D = $290;$F16$0 = $291;
     break;
    }
    _abort();
    // unreachable;
   }
  } while(0);
  HEAP32[$$pre$phiZ2D>>2] = $$0;
  $295 = (($F16$0) + 12|0);
  HEAP32[$295>>2] = $$0;
  $296 = (($$0) + 8|0);
  HEAP32[$296>>2] = $F16$0;
  $297 = (($$0) + 12|0);
  HEAP32[$297>>2] = $284;
  STACKTOP = sp;return;
 }
 $298 = $$0;
 $299 = $$1 >>> 8;
 $300 = ($299|0)==(0);
 do {
  if ($300) {
   $I19$0 = 0;
  } else {
   $301 = ($$1>>>0)>(16777215);
   if ($301) {
    $I19$0 = 31;
    break;
   }
   $302 = (($299) + 1048320)|0;
   $303 = $302 >>> 16;
   $304 = $303 & 8;
   $305 = $299 << $304;
   $306 = (($305) + 520192)|0;
   $307 = $306 >>> 16;
   $308 = $307 & 4;
   $309 = $308 | $304;
   $310 = $305 << $308;
   $311 = (($310) + 245760)|0;
   $312 = $311 >>> 16;
   $313 = $312 & 2;
   $314 = $309 | $313;
   $315 = (14 - ($314))|0;
   $316 = $310 << $313;
   $317 = $316 >>> 15;
   $318 = (($315) + ($317))|0;
   $319 = $318 << 1;
   $320 = (($318) + 7)|0;
   $321 = $$1 >>> $320;
   $322 = $321 & 1;
   $323 = $322 | $319;
   $I19$0 = $323;
  }
 } while(0);
 $324 = (((4768) + ($I19$0<<2)|0) + 304|0);
 $325 = (($$0) + 28|0);
 $I19$0$c = $I19$0;
 HEAP32[$325>>2] = $I19$0$c;
 $326 = (($$0) + 20|0);
 HEAP32[$326>>2] = 0;
 $327 = (($$0) + 16|0);
 HEAP32[$327>>2] = 0;
 $328 = HEAP32[(((4768) + 4|0))>>2]|0;
 $329 = 1 << $I19$0;
 $330 = $328 & $329;
 $331 = ($330|0)==(0);
 if ($331) {
  $332 = $328 | $329;
  HEAP32[(((4768) + 4|0))>>2] = $332;
  HEAP32[$324>>2] = $298;
  $333 = (($$0) + 24|0);
  $$c = $324;
  HEAP32[$333>>2] = $$c;
  $334 = (($$0) + 12|0);
  HEAP32[$334>>2] = $$0;
  $335 = (($$0) + 8|0);
  HEAP32[$335>>2] = $$0;
  STACKTOP = sp;return;
 }
 $336 = HEAP32[$324>>2]|0;
 $337 = ($I19$0|0)==(31);
 if ($337) {
  $340 = 0;
 } else {
  $338 = $I19$0 >>> 1;
  $339 = (25 - ($338))|0;
  $340 = $339;
 }
 $341 = (($336) + 4|0);
 $342 = HEAP32[$341>>2]|0;
 $343 = $342 & -8;
 $344 = ($343|0)==($$1|0);
 L194: do {
  if ($344) {
   $T$0$lcssa = $336;
  } else {
   $345 = $$1 << $340;
   $K20$049 = $345;$T$048 = $336;
   while(1) {
    $351 = $K20$049 >>> 31;
    $352 = ((($T$048) + ($351<<2)|0) + 16|0);
    $353 = HEAP32[$352>>2]|0;
    $354 = ($353|0)==(0|0);
    if ($354) {
     break;
    }
    $346 = $K20$049 << 1;
    $347 = (($353) + 4|0);
    $348 = HEAP32[$347>>2]|0;
    $349 = $348 & -8;
    $350 = ($349|0)==($$1|0);
    if ($350) {
     $T$0$lcssa = $353;
     break L194;
    } else {
     $T$048$phi = $353;$K20$049 = $346;$T$048 = $T$048$phi;
    }
   }
   $355 = $352;
   $356 = HEAP32[(((4768) + 16|0))>>2]|0;
   $357 = ($355>>>0)<($356>>>0);
   if ($357) {
    _abort();
    // unreachable;
   }
   HEAP32[$352>>2] = $298;
   $358 = (($$0) + 24|0);
   $T$0$c9 = $T$048;
   HEAP32[$358>>2] = $T$0$c9;
   $359 = (($$0) + 12|0);
   HEAP32[$359>>2] = $$0;
   $360 = (($$0) + 8|0);
   HEAP32[$360>>2] = $$0;
   STACKTOP = sp;return;
  }
 } while(0);
 $361 = (($T$0$lcssa) + 8|0);
 $362 = HEAP32[$361>>2]|0;
 $363 = $T$0$lcssa;
 $364 = HEAP32[(((4768) + 16|0))>>2]|0;
 $365 = ($363>>>0)<($364>>>0);
 if ($365) {
  _abort();
  // unreachable;
 }
 $366 = $362;
 $367 = ($366>>>0)<($364>>>0);
 if ($367) {
  _abort();
  // unreachable;
 }
 $368 = (($362) + 12|0);
 HEAP32[$368>>2] = $298;
 HEAP32[$361>>2] = $298;
 $369 = (($$0) + 8|0);
 $$c8 = $362;
 HEAP32[$369>>2] = $$c8;
 $370 = (($$0) + 12|0);
 $T$0$c = $T$0$lcssa;
 HEAP32[$370>>2] = $T$0$c;
 $371 = (($$0) + 24|0);
 HEAP32[$371>>2] = 0;
 STACKTOP = sp;return;
}
function _strcmp($l,$r) {
 $l = $l|0;
 $r = $r|0;
 var $$027 = 0, $$027$phi = 0, $$08 = 0, $$08$phi = 0, $$lcssa = 0, $$lcssa4 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, $or$cond = 0, $or$cond3 = 0, $or$cond36 = 0, $or$cond5 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = HEAP8[$l]|0;
 $2 = HEAP8[$r]|0;
 $3 = ($1<<24>>24)!=($2<<24>>24);
 $4 = ($1<<24>>24)==(0);
 $or$cond5 = $3 | $4;
 $5 = ($2<<24>>24)==(0);
 $or$cond36 = $or$cond5 | $5;
 if ($or$cond36) {
  $$lcssa = $1;$$lcssa4 = $2;
  $13 = $$lcssa&255;
  $14 = $$lcssa4&255;
  $15 = (($13) - ($14))|0;
  STACKTOP = sp;return ($15|0);
 } else {
  $$027 = $l;$$08 = $r;
 }
 while(1) {
  $6 = (($$027) + 1|0);
  $7 = (($$08) + 1|0);
  $8 = HEAP8[$6]|0;
  $9 = HEAP8[$7]|0;
  $10 = ($8<<24>>24)!=($9<<24>>24);
  $11 = ($8<<24>>24)==(0);
  $or$cond = $10 | $11;
  $12 = ($9<<24>>24)==(0);
  $or$cond3 = $or$cond | $12;
  if ($or$cond3) {
   $$lcssa = $8;$$lcssa4 = $9;
   break;
  } else {
   $$08$phi = $7;$$027$phi = $6;$$08 = $$08$phi;$$027 = $$027$phi;
  }
 }
 $13 = $$lcssa&255;
 $14 = $$lcssa4&255;
 $15 = (($13) - ($14))|0;
 STACKTOP = sp;return ($15|0);
}
function runPostSets() {
 
}
function _rand_r(seedp) {
    seedp = seedp|0; 
    var val = 0;
    val = ((Math_imul(((HEAP32[((seedp)>>2)])|0), 31010991)|0) + 0x676e6177 ) & 2147483647; // assumes RAND_MAX is in bit mask form (power of 2 minus 1)
    HEAP32[((seedp)>>2)]=val;
    return val|0;
}
function _rand() {
    return _rand_r(___rand_seed)|0;
}
function _i64Subtract(a, b, c, d) {
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a - c)>>>0;
    h = (b - d)>>>0;
    h = (b - d - (((c>>>0) > (a>>>0))|0))>>>0; // Borrow one from high word to low word on underflow.
    return ((tempRet0 = h,l|0)|0);
}
function _memset(ptr, value, num) {
    ptr = ptr|0; value = value|0; num = num|0;
    var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
    stop = (ptr + num)|0;
    if ((num|0) >= 20) {
      // This is unaligned, but quite large, so work hard to get to aligned settings
      value = value & 0xff;
      unaligned = ptr & 3;
      value4 = value | (value << 8) | (value << 16) | (value << 24);
      stop4 = stop & ~3;
      if (unaligned) {
        unaligned = (ptr + 4 - unaligned)|0;
        while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
          HEAP8[(ptr)]=value;
          ptr = (ptr+1)|0;
        }
      }
      while ((ptr|0) < (stop4|0)) {
        HEAP32[((ptr)>>2)]=value4;
        ptr = (ptr+4)|0;
      }
    }
    while ((ptr|0) < (stop|0)) {
      HEAP8[(ptr)]=value;
      ptr = (ptr+1)|0;
    }
    return (ptr-num)|0;
}
function _strlen(ptr) {
    ptr = ptr|0;
    var curr = 0;
    curr = ptr;
    while (((HEAP8[(curr)])|0)) {
      curr = (curr + 1)|0;
    }
    return (curr - ptr)|0;
}
function _strcpy(pdest, psrc) {
    pdest = pdest|0; psrc = psrc|0;
    var i = 0;
    do {
      HEAP8[(((pdest+i)|0)|0)]=HEAP8[(((psrc+i)|0)|0)];
      i = (i+1)|0;
    } while (((HEAP8[(((psrc)+(i-1))|0)])|0));
    return pdest|0;
}
function _memcpy(dest, src, num) {
    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    if ((num|0) >= 4096) return _emscripten_memcpy_big(dest|0, src|0, num|0)|0;
    ret = dest|0;
    if ((dest&3) == (src&3)) {
      while (dest & 3) {
        if ((num|0) == 0) return ret|0;
        HEAP8[(dest)]=((HEAP8[(src)])|0);
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      while ((num|0) >= 4) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
        num = (num-4)|0;
      }
    }
    while ((num|0) > 0) {
      HEAP8[(dest)]=((HEAP8[(src)])|0);
      dest = (dest+1)|0;
      src = (src+1)|0;
      num = (num-1)|0;
    }
    return ret|0;
}
function _i64Add(a, b, c, d) {
    /*
      x = a + b*2^32
      y = c + d*2^32
      result = l + h*2^32
    */
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a + c)>>>0;
    h = (b + d + (((l>>>0) < (a>>>0))|0))>>>0; // Add carry from low word to high word on overflow.
    return ((tempRet0 = h,l|0)|0);
  }
function _bitshift64Shl(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = (high << bits) | ((low&(ander << (32 - bits))) >>> (32 - bits));
      return low << bits;
    }
    tempRet0 = low << (bits - 32);
    return 0;
  }
function _bitshift64Lshr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >>> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = 0;
    return (high >>> (bits - 32))|0;
  }
function _bitshift64Ashr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = (high|0) < 0 ? -1 : 0;
    return (high >> (bits - 32))|0;
  }
function _llvm_ctlz_i32(x) {
    x = x|0;
    var ret = 0;
    ret = ((HEAP8[(((ctlz_i8)+(x >>> 24))|0)])|0);
    if ((ret|0) < 8) return ret|0;
    ret = ((HEAP8[(((ctlz_i8)+((x >> 16)&0xff))|0)])|0);
    if ((ret|0) < 8) return (ret + 8)|0;
    ret = ((HEAP8[(((ctlz_i8)+((x >> 8)&0xff))|0)])|0);
    if ((ret|0) < 8) return (ret + 16)|0;
    return (((HEAP8[(((ctlz_i8)+(x&0xff))|0)])|0) + 24)|0;
  }

function _llvm_cttz_i32(x) {
    x = x|0;
    var ret = 0;
    ret = ((HEAP8[(((cttz_i8)+(x & 0xff))|0)])|0);
    if ((ret|0) < 8) return ret|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 8)&0xff))|0)])|0);
    if ((ret|0) < 8) return (ret + 8)|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 16)&0xff))|0)])|0);
    if ((ret|0) < 8) return (ret + 16)|0;
    return (((HEAP8[(((cttz_i8)+(x >>> 24))|0)])|0) + 24)|0;
  }

// ======== compiled code from system/lib/compiler-rt , see readme therein
function ___muldsi3($a, $b) {
  $a = $a | 0;
  $b = $b | 0;
  var $1 = 0, $2 = 0, $3 = 0, $6 = 0, $8 = 0, $11 = 0, $12 = 0;
  $1 = $a & 65535;
  $2 = $b & 65535;
  $3 = Math_imul($2, $1) | 0;
  $6 = $a >>> 16;
  $8 = ($3 >>> 16) + (Math_imul($2, $6) | 0) | 0;
  $11 = $b >>> 16;
  $12 = Math_imul($11, $1) | 0;
  return (tempRet0 = (($8 >>> 16) + (Math_imul($11, $6) | 0) | 0) + ((($8 & 65535) + $12 | 0) >>> 16) | 0, 0 | ($8 + $12 << 16 | $3 & 65535)) | 0;
}
function ___divdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $1$0 = 0, $1$1 = 0, $2$0 = 0, $2$1 = 0, $4$0 = 0, $4$1 = 0, $6$0 = 0, $7$0 = 0, $7$1 = 0, $8$0 = 0, $10$0 = 0;
  $1$0 = $a$1 >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $1$1 = (($a$1 | 0) < 0 ? -1 : 0) >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $2$0 = $b$1 >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $2$1 = (($b$1 | 0) < 0 ? -1 : 0) >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $4$0 = _i64Subtract($1$0 ^ $a$0, $1$1 ^ $a$1, $1$0, $1$1) | 0;
  $4$1 = tempRet0;
  $6$0 = _i64Subtract($2$0 ^ $b$0, $2$1 ^ $b$1, $2$0, $2$1) | 0;
  $7$0 = $2$0 ^ $1$0;
  $7$1 = $2$1 ^ $1$1;
  $8$0 = ___udivmoddi4($4$0, $4$1, $6$0, tempRet0, 0) | 0;
  $10$0 = _i64Subtract($8$0 ^ $7$0, tempRet0 ^ $7$1, $7$0, $7$1) | 0;
  return (tempRet0 = tempRet0, $10$0) | 0;
}
function ___remdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $rem = 0, $1$0 = 0, $1$1 = 0, $2$0 = 0, $2$1 = 0, $4$0 = 0, $4$1 = 0, $6$0 = 0, $10$0 = 0, $10$1 = 0, __stackBase__ = 0;
  __stackBase__ = STACKTOP;
  STACKTOP = STACKTOP + 8 | 0;
  $rem = __stackBase__ | 0;
  $1$0 = $a$1 >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $1$1 = (($a$1 | 0) < 0 ? -1 : 0) >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $2$0 = $b$1 >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $2$1 = (($b$1 | 0) < 0 ? -1 : 0) >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $4$0 = _i64Subtract($1$0 ^ $a$0, $1$1 ^ $a$1, $1$0, $1$1) | 0;
  $4$1 = tempRet0;
  $6$0 = _i64Subtract($2$0 ^ $b$0, $2$1 ^ $b$1, $2$0, $2$1) | 0;
  ___udivmoddi4($4$0, $4$1, $6$0, tempRet0, $rem) | 0;
  $10$0 = _i64Subtract(HEAP32[$rem >> 2] ^ $1$0, HEAP32[$rem + 4 >> 2] ^ $1$1, $1$0, $1$1) | 0;
  $10$1 = tempRet0;
  STACKTOP = __stackBase__;
  return (tempRet0 = $10$1, $10$0) | 0;
}
function ___muldi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $x_sroa_0_0_extract_trunc = 0, $y_sroa_0_0_extract_trunc = 0, $1$0 = 0, $1$1 = 0, $2 = 0;
  $x_sroa_0_0_extract_trunc = $a$0;
  $y_sroa_0_0_extract_trunc = $b$0;
  $1$0 = ___muldsi3($x_sroa_0_0_extract_trunc, $y_sroa_0_0_extract_trunc) | 0;
  $1$1 = tempRet0;
  $2 = Math_imul($a$1, $y_sroa_0_0_extract_trunc) | 0;
  return (tempRet0 = ((Math_imul($b$1, $x_sroa_0_0_extract_trunc) | 0) + $2 | 0) + $1$1 | $1$1 & 0, 0 | $1$0 & -1) | 0;
}
function ___udivdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $1$0 = 0;
  $1$0 = ___udivmoddi4($a$0, $a$1, $b$0, $b$1, 0) | 0;
  return (tempRet0 = tempRet0, $1$0) | 0;
}
function ___uremdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $rem = 0, __stackBase__ = 0;
  __stackBase__ = STACKTOP;
  STACKTOP = STACKTOP + 8 | 0;
  $rem = __stackBase__ | 0;
  ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) | 0;
  STACKTOP = __stackBase__;
  return (tempRet0 = HEAP32[$rem + 4 >> 2] | 0, HEAP32[$rem >> 2] | 0) | 0;
}
function ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  $rem = $rem | 0;
  var $n_sroa_0_0_extract_trunc = 0, $n_sroa_1_4_extract_shift$0 = 0, $n_sroa_1_4_extract_trunc = 0, $d_sroa_0_0_extract_trunc = 0, $d_sroa_1_4_extract_shift$0 = 0, $d_sroa_1_4_extract_trunc = 0, $4 = 0, $17 = 0, $37 = 0, $49 = 0, $51 = 0, $57 = 0, $58 = 0, $66 = 0, $78 = 0, $86 = 0, $88 = 0, $89 = 0, $91 = 0, $92 = 0, $95 = 0, $105 = 0, $117 = 0, $119 = 0, $125 = 0, $126 = 0, $130 = 0, $q_sroa_1_1_ph = 0, $q_sroa_0_1_ph = 0, $r_sroa_1_1_ph = 0, $r_sroa_0_1_ph = 0, $sr_1_ph = 0, $d_sroa_0_0_insert_insert99$0 = 0, $d_sroa_0_0_insert_insert99$1 = 0, $137$0 = 0, $137$1 = 0, $carry_0203 = 0, $sr_1202 = 0, $r_sroa_0_1201 = 0, $r_sroa_1_1200 = 0, $q_sroa_0_1199 = 0, $q_sroa_1_1198 = 0, $147 = 0, $149 = 0, $r_sroa_0_0_insert_insert42$0 = 0, $r_sroa_0_0_insert_insert42$1 = 0, $150$1 = 0, $151$0 = 0, $152 = 0, $154$0 = 0, $r_sroa_0_0_extract_trunc = 0, $r_sroa_1_4_extract_trunc = 0, $155 = 0, $carry_0_lcssa$0 = 0, $carry_0_lcssa$1 = 0, $r_sroa_0_1_lcssa = 0, $r_sroa_1_1_lcssa = 0, $q_sroa_0_1_lcssa = 0, $q_sroa_1_1_lcssa = 0, $q_sroa_0_0_insert_ext75$0 = 0, $q_sroa_0_0_insert_ext75$1 = 0, $q_sroa_0_0_insert_insert77$1 = 0, $_0$0 = 0, $_0$1 = 0;
  $n_sroa_0_0_extract_trunc = $a$0;
  $n_sroa_1_4_extract_shift$0 = $a$1;
  $n_sroa_1_4_extract_trunc = $n_sroa_1_4_extract_shift$0;
  $d_sroa_0_0_extract_trunc = $b$0;
  $d_sroa_1_4_extract_shift$0 = $b$1;
  $d_sroa_1_4_extract_trunc = $d_sroa_1_4_extract_shift$0;
  if (($n_sroa_1_4_extract_trunc | 0) == 0) {
    $4 = ($rem | 0) != 0;
    if (($d_sroa_1_4_extract_trunc | 0) == 0) {
      if ($4) {
        HEAP32[$rem >> 2] = ($n_sroa_0_0_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
        HEAP32[$rem + 4 >> 2] = 0;
      }
      $_0$1 = 0;
      $_0$0 = ($n_sroa_0_0_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    } else {
      if (!$4) {
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      HEAP32[$rem >> 2] = $a$0 & -1;
      HEAP32[$rem + 4 >> 2] = $a$1 & 0;
      $_0$1 = 0;
      $_0$0 = 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    }
  }
  $17 = ($d_sroa_1_4_extract_trunc | 0) == 0;
  do {
    if (($d_sroa_0_0_extract_trunc | 0) == 0) {
      if ($17) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
          HEAP32[$rem + 4 >> 2] = 0;
        }
        $_0$1 = 0;
        $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      if (($n_sroa_0_0_extract_trunc | 0) == 0) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = 0;
          HEAP32[$rem + 4 >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_1_4_extract_trunc >>> 0);
        }
        $_0$1 = 0;
        $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_1_4_extract_trunc >>> 0) >>> 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $37 = $d_sroa_1_4_extract_trunc - 1 | 0;
      if (($37 & $d_sroa_1_4_extract_trunc | 0) == 0) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = 0 | $a$0 & -1;
          HEAP32[$rem + 4 >> 2] = $37 & $n_sroa_1_4_extract_trunc | $a$1 & 0;
        }
        $_0$1 = 0;
        $_0$0 = $n_sroa_1_4_extract_trunc >>> ((_llvm_cttz_i32($d_sroa_1_4_extract_trunc | 0) | 0) >>> 0);
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $49 = _llvm_ctlz_i32($d_sroa_1_4_extract_trunc | 0) | 0;
      $51 = $49 - (_llvm_ctlz_i32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
      if ($51 >>> 0 <= 30) {
        $57 = $51 + 1 | 0;
        $58 = 31 - $51 | 0;
        $sr_1_ph = $57;
        $r_sroa_0_1_ph = $n_sroa_1_4_extract_trunc << $58 | $n_sroa_0_0_extract_trunc >>> ($57 >>> 0);
        $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($57 >>> 0);
        $q_sroa_0_1_ph = 0;
        $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $58;
        break;
      }
      if (($rem | 0) == 0) {
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      HEAP32[$rem >> 2] = 0 | $a$0 & -1;
      HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
      $_0$1 = 0;
      $_0$0 = 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    } else {
      if (!$17) {
        $117 = _llvm_ctlz_i32($d_sroa_1_4_extract_trunc | 0) | 0;
        $119 = $117 - (_llvm_ctlz_i32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
        if ($119 >>> 0 <= 31) {
          $125 = $119 + 1 | 0;
          $126 = 31 - $119 | 0;
          $130 = $119 - 31 >> 31;
          $sr_1_ph = $125;
          $r_sroa_0_1_ph = $n_sroa_0_0_extract_trunc >>> ($125 >>> 0) & $130 | $n_sroa_1_4_extract_trunc << $126;
          $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($125 >>> 0) & $130;
          $q_sroa_0_1_ph = 0;
          $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $126;
          break;
        }
        if (($rem | 0) == 0) {
          $_0$1 = 0;
          $_0$0 = 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        HEAP32[$rem >> 2] = 0 | $a$0 & -1;
        HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $66 = $d_sroa_0_0_extract_trunc - 1 | 0;
      if (($66 & $d_sroa_0_0_extract_trunc | 0) != 0) {
        $86 = (_llvm_ctlz_i32($d_sroa_0_0_extract_trunc | 0) | 0) + 33 | 0;
        $88 = $86 - (_llvm_ctlz_i32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
        $89 = 64 - $88 | 0;
        $91 = 32 - $88 | 0;
        $92 = $91 >> 31;
        $95 = $88 - 32 | 0;
        $105 = $95 >> 31;
        $sr_1_ph = $88;
        $r_sroa_0_1_ph = $91 - 1 >> 31 & $n_sroa_1_4_extract_trunc >>> ($95 >>> 0) | ($n_sroa_1_4_extract_trunc << $91 | $n_sroa_0_0_extract_trunc >>> ($88 >>> 0)) & $105;
        $r_sroa_1_1_ph = $105 & $n_sroa_1_4_extract_trunc >>> ($88 >>> 0);
        $q_sroa_0_1_ph = $n_sroa_0_0_extract_trunc << $89 & $92;
        $q_sroa_1_1_ph = ($n_sroa_1_4_extract_trunc << $89 | $n_sroa_0_0_extract_trunc >>> ($95 >>> 0)) & $92 | $n_sroa_0_0_extract_trunc << $91 & $88 - 33 >> 31;
        break;
      }
      if (($rem | 0) != 0) {
        HEAP32[$rem >> 2] = $66 & $n_sroa_0_0_extract_trunc;
        HEAP32[$rem + 4 >> 2] = 0;
      }
      if (($d_sroa_0_0_extract_trunc | 0) == 1) {
        $_0$1 = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
        $_0$0 = 0 | $a$0 & -1;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      } else {
        $78 = _llvm_cttz_i32($d_sroa_0_0_extract_trunc | 0) | 0;
        $_0$1 = 0 | $n_sroa_1_4_extract_trunc >>> ($78 >>> 0);
        $_0$0 = $n_sroa_1_4_extract_trunc << 32 - $78 | $n_sroa_0_0_extract_trunc >>> ($78 >>> 0) | 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
    }
  } while (0);
  if (($sr_1_ph | 0) == 0) {
    $q_sroa_1_1_lcssa = $q_sroa_1_1_ph;
    $q_sroa_0_1_lcssa = $q_sroa_0_1_ph;
    $r_sroa_1_1_lcssa = $r_sroa_1_1_ph;
    $r_sroa_0_1_lcssa = $r_sroa_0_1_ph;
    $carry_0_lcssa$1 = 0;
    $carry_0_lcssa$0 = 0;
  } else {
    $d_sroa_0_0_insert_insert99$0 = 0 | $b$0 & -1;
    $d_sroa_0_0_insert_insert99$1 = $d_sroa_1_4_extract_shift$0 | $b$1 & 0;
    $137$0 = _i64Add($d_sroa_0_0_insert_insert99$0, $d_sroa_0_0_insert_insert99$1, -1, -1) | 0;
    $137$1 = tempRet0;
    $q_sroa_1_1198 = $q_sroa_1_1_ph;
    $q_sroa_0_1199 = $q_sroa_0_1_ph;
    $r_sroa_1_1200 = $r_sroa_1_1_ph;
    $r_sroa_0_1201 = $r_sroa_0_1_ph;
    $sr_1202 = $sr_1_ph;
    $carry_0203 = 0;
    while (1) {
      $147 = $q_sroa_0_1199 >>> 31 | $q_sroa_1_1198 << 1;
      $149 = $carry_0203 | $q_sroa_0_1199 << 1;
      $r_sroa_0_0_insert_insert42$0 = 0 | ($r_sroa_0_1201 << 1 | $q_sroa_1_1198 >>> 31);
      $r_sroa_0_0_insert_insert42$1 = $r_sroa_0_1201 >>> 31 | $r_sroa_1_1200 << 1 | 0;
      _i64Subtract($137$0, $137$1, $r_sroa_0_0_insert_insert42$0, $r_sroa_0_0_insert_insert42$1) | 0;
      $150$1 = tempRet0;
      $151$0 = $150$1 >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1;
      $152 = $151$0 & 1;
      $154$0 = _i64Subtract($r_sroa_0_0_insert_insert42$0, $r_sroa_0_0_insert_insert42$1, $151$0 & $d_sroa_0_0_insert_insert99$0, ((($150$1 | 0) < 0 ? -1 : 0) >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1) & $d_sroa_0_0_insert_insert99$1) | 0;
      $r_sroa_0_0_extract_trunc = $154$0;
      $r_sroa_1_4_extract_trunc = tempRet0;
      $155 = $sr_1202 - 1 | 0;
      if (($155 | 0) == 0) {
        break;
      } else {
        $q_sroa_1_1198 = $147;
        $q_sroa_0_1199 = $149;
        $r_sroa_1_1200 = $r_sroa_1_4_extract_trunc;
        $r_sroa_0_1201 = $r_sroa_0_0_extract_trunc;
        $sr_1202 = $155;
        $carry_0203 = $152;
      }
    }
    $q_sroa_1_1_lcssa = $147;
    $q_sroa_0_1_lcssa = $149;
    $r_sroa_1_1_lcssa = $r_sroa_1_4_extract_trunc;
    $r_sroa_0_1_lcssa = $r_sroa_0_0_extract_trunc;
    $carry_0_lcssa$1 = 0;
    $carry_0_lcssa$0 = $152;
  }
  $q_sroa_0_0_insert_ext75$0 = $q_sroa_0_1_lcssa;
  $q_sroa_0_0_insert_ext75$1 = 0;
  $q_sroa_0_0_insert_insert77$1 = $q_sroa_1_1_lcssa | $q_sroa_0_0_insert_ext75$1;
  if (($rem | 0) != 0) {
    HEAP32[$rem >> 2] = 0 | $r_sroa_0_1_lcssa;
    HEAP32[$rem + 4 >> 2] = $r_sroa_1_1_lcssa | 0;
  }
  $_0$1 = (0 | $q_sroa_0_0_insert_ext75$0) >>> 31 | $q_sroa_0_0_insert_insert77$1 << 1 | ($q_sroa_0_0_insert_ext75$1 << 1 | $q_sroa_0_0_insert_ext75$0 >>> 31) & 0 | $carry_0_lcssa$1;
  $_0$0 = ($q_sroa_0_0_insert_ext75$0 << 1 | 0 >>> 31) & -2 | $carry_0_lcssa$0;
  return (tempRet0 = $_0$1, $_0$0) | 0;
}
// =======================================================================



// EMSCRIPTEN_END_FUNCS

  

  // EMSCRIPTEN_END_FUNCS
  

  return { _i64Subtract: _i64Subtract, _free: _free, _main: _main, _rand_r: _rand_r, _strlen: _strlen, _memset: _memset, _malloc: _malloc, _memcpy: _memcpy, _strcpy: _strcpy, _rand: _rand, runPostSets: runPostSets, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, setThrew: setThrew, setTempRet0: setTempRet0, setTempRet1: setTempRet1, setTempRet2: setTempRet2, setTempRet3: setTempRet3, setTempRet4: setTempRet4, setTempRet5: setTempRet5, setTempRet6: setTempRet6, setTempRet7: setTempRet7, setTempRet8: setTempRet8, setTempRet9: setTempRet9 };
})
// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "_mkport": _mkport, "_llvm_lifetime_start": _llvm_lifetime_start, "_clReleaseEvent": _clReleaseEvent, "_clReleaseProgram": _clReleaseProgram, "_send": _send, "_clBuildProgram": _clBuildProgram, "_fread": _fread, "_clReleaseKernel": _clReleaseKernel, "_clReleaseContext": _clReleaseContext, "_open": _open, "_clEnqueueNDRangeKernel": _clEnqueueNDRangeKernel, "_ungetc": _ungetc, "_clCreateContext": _clCreateContext, "_clEnqueueWriteBuffer": _clEnqueueWriteBuffer, "_clCreateProgramWithSource": _clCreateProgramWithSource, "_atoi": _atoi, "_fflush": _fflush, "_clEnqueueUnmapMemObject": _clEnqueueUnmapMemObject, "___errno_location": ___errno_location, "_chdir": _chdir, "_strtol": _strtol, "_fscanf": _fscanf, "___setErrNo": ___setErrNo, "_sbrk": _sbrk, "___libgenSplitName": ___libgenSplitName, "_dirname": _dirname, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_fileno": _fileno, "_basename": _basename, "_clGetPlatformIDs": _clGetPlatformIDs, "_read": _read, "_sysconf": _sysconf, "_clGetPlatformInfo": _clGetPlatformInfo, "__formatString": __formatString, "_clFinish": _clFinish, "_clWaitForEvents": _clWaitForEvents, "_isspace": _isspace, "_pwrite": _pwrite, "_clCreateCommandQueue": _clCreateCommandQueue, "_clGetDeviceIDs": _clGetDeviceIDs, "_clReleaseCommandQueue": _clReleaseCommandQueue, "__parseInt": __parseInt, "__reallyNegative": __reallyNegative, "_clReleaseMemObject": _clReleaseMemObject, "_clGetDeviceInfo": _clGetDeviceInfo, "_write": _write, "_pread": _pread, "_clEnqueueReadBuffer": _clEnqueueReadBuffer, "_clGetKernelWorkGroupInfo": _clGetKernelWorkGroupInfo, "_clCreateBuffer": _clCreateBuffer, "_stat": _stat, "_recv": _recv, "_fgetc": _fgetc, "_printf": _printf, "__scanString": __scanString, "__exit": __exit, "__getFloat": __getFloat, "_clSetKernelArg": _clSetKernelArg, "_abort": _abort, "_fwrite": _fwrite, "_time": _time, "_fprintf": _fprintf, "_llvm_lifetime_end": _llvm_lifetime_end, "_clEnqueueMapBuffer": _clEnqueueMapBuffer, "_fopen": _fopen, "_exit": _exit, "_clCreateKernel": _clCreateKernel, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "ctlz_i8": ctlz_i8, "___rand_seed": ___rand_seed, "NaN": NaN, "Infinity": Infinity, "_stderr": _stderr }, buffer);
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _rand_r = Module["_rand_r"] = asm["_rand_r"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _strcpy = Module["_strcpy"] = asm["_strcpy"];
var _rand = Module["_rand"] = asm["_rand"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];

Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };


// TODO: strip out parts of this we do not need

//======= begin closure i64 code =======

// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */

var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };


  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.

    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };


  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.


  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};


  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }

    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };


  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };


  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };


  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }

    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));

    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };


  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.


  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;


  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);


  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);


  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);


  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);


  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);


  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);


  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };


  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };


  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (this.isZero()) {
      return '0';
    }

    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));

    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);

      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };


  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };


  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };


  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };


  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };


  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };


  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };


  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };


  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }

    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }

    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };


  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };


  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };


  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }

    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }

      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }

      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };


  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };


  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };


  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };


  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };


  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };


  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };

  //======= begin jsbn =======

  var navigator = { appName: 'Modern Browser' }; // polyfill a little

  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/

  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */

  // Basic JavaScript BN library - subset useful for RSA encryption.

  // Bits per digit
  var dbits;

  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);

  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }

  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }

  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.

  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;

  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }

  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }

  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }

  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }

  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }

  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }

  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }

  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }

  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }

  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }

  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }

  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }

  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }

  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }

  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // jsbn2 stuff

  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }

  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }

  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }

  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }

  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }

  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;

  //======= end jsbn =======

  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();

//======= end closure i64 code =======



// === Auto-generated postamble setup entry stuff ===

if (memoryInitializer) {
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    var data = Module['readBinary'](memoryInitializer);
    HEAPU8.set(data, STATIC_BASE);
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      HEAPU8.set(data, STATIC_BASE);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    ensureInitRuntime();

    preMain();

    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;

  // exit the runtime
  exitRuntime();

  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371

  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }

  ABORT = true;
  EXITSTATUS = 1;

  throw 'abort() at ' + stackTrace();
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}


run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}



//# sourceMappingURL=val_book_spmv.js.map