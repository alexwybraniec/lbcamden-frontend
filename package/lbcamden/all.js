(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('LBCamdenFrontend', ['exports'], factory) :
	(factory((global.LBCamdenFrontend = {})));
}(this, (function (exports) { 'use strict';

/**
 * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
 * This seems to fail in IE8, requires more investigation.
 * See: https://github.com/imagitama/nodelist-foreach-polyfill
 */
function nodeListForEach (nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (var i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes);
  }
}

const settings = {
  minWidth: '40.0625em',
  desktop: '48em'
};

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) :
	(factory());
}(undefined, (function () {
	// @ts-nocheck
	(function (undefined) {

	// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Window/detect.js
	var detect = ('Window' in this);

	if (detect) return

	// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Window&flags=always
	if ((typeof WorkerGlobalScope === "undefined") && (typeof importScripts !== "function")) {
		(function (global) {
			if (global.constructor) {
				global.Window = global.constructor;
			} else {
				(global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
			}
		}(this));
	}

	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

	// @ts-nocheck
	(function (undefined) {

	// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
	var detect = ("Document" in this);

	if (detect) return

	// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always
	if ((typeof WorkerGlobalScope === "undefined") && (typeof importScripts !== "function")) {

		if (this.HTMLDocument) { // IE8

			// HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
			this.Document = this.HTMLDocument;

		} else {

			// Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
			this.Document = this.HTMLDocument = document.constructor = (new Function('return function Document() {}')());
			this.Document.prototype = document;
		}
	}


	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

	// @ts-nocheck

	(function(undefined) {

	// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
	var detect = ('Element' in this && 'HTMLElement' in this);

	if (detect) return

	// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always
	(function () {

		// IE8
		if (window.Element && !window.HTMLElement) {
			window.HTMLElement = window.Element;
			return;
		}

		// create Element constructor
		window.Element = window.HTMLElement = new Function('return function Element() {}')();

		// generate sandboxed iframe
		var vbody = document.appendChild(document.createElement('body'));
		var frame = vbody.appendChild(document.createElement('iframe'));

		// use sandboxed iframe to replicate Element functionality
		var frameDocument = frame.contentWindow.document;
		var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
		var cache = {};

		// polyfill Element.prototype on an element
		var shiv = function (element, deep) {
			var
			childNodes = element.childNodes || [],
			index = -1,
			key, value, childNode;

			if (element.nodeType === 1 && element.constructor !== Element) {
				element.constructor = Element;

				for (key in cache) {
					value = cache[key];
					element[key] = value;
				}
			}

			while (childNode = deep && childNodes[++index]) {
				shiv(childNode, deep);
			}

			return element;
		};

		var elements = document.getElementsByTagName('*');
		var nativeCreateElement = document.createElement;
		var interval;
		var loopLimit = 100;

		prototype.attachEvent('onpropertychange', function (event) {
			var
			propertyName = event.propertyName,
			nonValue = !cache.hasOwnProperty(propertyName),
			newValue = prototype[propertyName],
			oldValue = cache[propertyName],
			index = -1,
			element;

			while (element = elements[++index]) {
				if (element.nodeType === 1) {
					if (nonValue || element[propertyName] === oldValue) {
						element[propertyName] = newValue;
					}
				}
			}

			cache[propertyName] = newValue;
		});

		prototype.constructor = Element;

		if (!prototype.hasAttribute) {
			// <Element>.hasAttribute
			prototype.hasAttribute = function hasAttribute(name) {
				return this.getAttribute(name) !== null;
			};
		}

		// Apply Element prototype to the pre-existing DOM as soon as the body element appears.
		function bodyCheck() {
			if (!(loopLimit--)) clearTimeout(interval);
			if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
				shiv(document, true);
				if (interval && document.body.prototype) clearTimeout(interval);
				return (!!document.body.prototype);
			}
			return false;
		}
		if (!bodyCheck()) {
			document.onreadystatechange = bodyCheck;
			interval = setInterval(bodyCheck, 25);
		}

		// Apply to any new elements created after load
		document.createElement = function createElement(nodeName) {
			var element = nativeCreateElement(String(nodeName).toLowerCase());
			return shiv(element);
		};

		// remove sandboxed iframe
		document.removeChild(vbody);
	}());

	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

	// @ts-nocheck
	(function (undefined) {

	// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
	var detect = (
	  // In IE8, defineProperty could only act on DOM elements, so full support
	  // for the feature requires the ability to set a property on an arbitrary object
	  'defineProperty' in Object && (function() {
	  	try {
	  		var a = {};
	  		Object.defineProperty(a, 'test', {value:42});
	  		return true;
	  	} catch(e) {
	  		return false
	  	}
	  }())
	);

	if (detect) return

	// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always
	(function (nativeDefineProperty) {

		var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
		var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
		var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

		Object.defineProperty = function defineProperty(object, property, descriptor) {

			// Where native support exists, assume it
			if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
				return nativeDefineProperty(object, property, descriptor);
			}

			if (object === null || !(object instanceof Object || typeof object === 'object')) {
				throw new TypeError('Object.defineProperty called on non-object');
			}

			if (!(descriptor instanceof Object)) {
				throw new TypeError('Property description must be an object');
			}

			var propertyString = String(property);
			var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
			var getterType = 'get' in descriptor && typeof descriptor.get;
			var setterType = 'set' in descriptor && typeof descriptor.set;

			// handle descriptor.get
			if (getterType) {
				if (getterType !== 'function') {
					throw new TypeError('Getter must be a function');
				}
				if (!supportsAccessors) {
					throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
				}
				if (hasValueOrWritable) {
					throw new TypeError(ERR_VALUE_ACCESSORS);
				}
				Object.__defineGetter__.call(object, propertyString, descriptor.get);
			} else {
				object[propertyString] = descriptor.value;
			}

			// handle descriptor.set
			if (setterType) {
				if (setterType !== 'function') {
					throw new TypeError('Setter must be a function');
				}
				if (!supportsAccessors) {
					throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
				}
				if (hasValueOrWritable) {
					throw new TypeError(ERR_VALUE_ACCESSORS);
				}
				Object.__defineSetter__.call(object, propertyString, descriptor.set);
			}

			// OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above
			if ('value' in descriptor) {
				object[propertyString] = descriptor.value;
			}

			return object;
		};
	}(Object.defineProperty));
	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

	// @ts-nocheck

	(function(undefined) {

	// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Event/detect.js
	var detect = (
	  (function(global) {

	  	if (!('Event' in global)) return false;
	  	if (typeof global.Event === 'function') return true;

	  	try {

	  		// In IE 9-11, the Event object exists but cannot be instantiated
	  		new Event('click');
	  		return true;
	  	} catch(e) {
	  		return false;
	  	}
	  }(this))
	);

	if (detect) return

	// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Event&flags=always
	(function () {
		var unlistenableWindowEvents = {
			click: 1,
			dblclick: 1,
			keyup: 1,
			keypress: 1,
			keydown: 1,
			mousedown: 1,
			mouseup: 1,
			mousemove: 1,
			mouseover: 1,
			mouseenter: 1,
			mouseleave: 1,
			mouseout: 1,
			storage: 1,
			storagecommit: 1,
			textinput: 1
		};

		// This polyfill depends on availability of `document` so will not run in a worker
		// However, we asssume there are no browsers with worker support that lack proper
		// support for `Event` within the worker
		if (typeof document === 'undefined' || typeof window === 'undefined') return;

		function indexOf(array, element) {
			var
			index = -1,
			length = array.length;

			while (++index < length) {
				if (index in array && array[index] === element) {
					return index;
				}
			}

			return -1;
		}

		var existingProto = (window.Event && window.Event.prototype) || null;
		window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
			if (!type) {
				throw new Error('Not enough arguments');
			}

			var event;
			// Shortcut if browser supports createEvent
			if ('createEvent' in document) {
				event = document.createEvent('Event');
				var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
				var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;

				event.initEvent(type, bubbles, cancelable);

				return event;
			}

			event = document.createEventObject();

			event.type = type;
			event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
			event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;

			return event;
		};
		if (existingProto) {
			Object.defineProperty(window.Event, 'prototype', {
				configurable: false,
				enumerable: false,
				writable: true,
				value: existingProto
			});
		}

		if (!('createEvent' in document)) {
			window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
				var
				element = this,
				type = arguments[0],
				listener = arguments[1];

				if (element === window && type in unlistenableWindowEvents) {
					throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
				}

				if (!element._events) {
					element._events = {};
				}

				if (!element._events[type]) {
					element._events[type] = function (event) {
						var
						list = element._events[event.type].list,
						events = list.slice(),
						index = -1,
						length = events.length,
						eventElement;

						event.preventDefault = function preventDefault() {
							if (event.cancelable !== false) {
								event.returnValue = false;
							}
						};

						event.stopPropagation = function stopPropagation() {
							event.cancelBubble = true;
						};

						event.stopImmediatePropagation = function stopImmediatePropagation() {
							event.cancelBubble = true;
							event.cancelImmediate = true;
						};

						event.currentTarget = element;
						event.relatedTarget = event.fromElement || null;
						event.target = event.target || event.srcElement || element;
						event.timeStamp = new Date().getTime();

						if (event.clientX) {
							event.pageX = event.clientX + document.documentElement.scrollLeft;
							event.pageY = event.clientY + document.documentElement.scrollTop;
						}

						while (++index < length && !event.cancelImmediate) {
							if (index in events) {
								eventElement = events[index];

								if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
									eventElement.call(element, event);
								}
							}
						}
					};

					element._events[type].list = [];

					if (element.attachEvent) {
						element.attachEvent('on' + type, element._events[type]);
					}
				}

				element._events[type].list.push(listener);
			};

			window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
				var
				element = this,
				type = arguments[0],
				listener = arguments[1],
				index;

				if (element._events && element._events[type] && element._events[type].list) {
					index = indexOf(element._events[type].list, listener);

					if (index !== -1) {
						element._events[type].list.splice(index, 1);

						if (!element._events[type].list.length) {
							if (element.detachEvent) {
								element.detachEvent('on' + type, element._events[type]);
							}
							delete element._events[type];
						}
					}
				}
			};

			window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
				if (!arguments.length) {
					throw new Error('Not enough arguments');
				}

				if (!event || typeof event.type !== 'string') {
					throw new Error('DOM Events Exception 0');
				}

				var element = this, type = event.type;

				try {
					if (!event.bubbles) {
						event.cancelBubble = true;

						var cancelBubbleEvent = function (event) {
							event.cancelBubble = true;

							(element || window).detachEvent('on' + type, cancelBubbleEvent);
						};

						this.attachEvent('on' + type, cancelBubbleEvent);
					}

					this.fireEvent('on' + type, event);
				} catch (error) {
					event.target = element;

					do {
						event.currentTarget = element;

						if ('_events' in element && typeof element._events[type] === 'function') {
							element._events[type].call(element, event);
						}

						if (typeof element['on' + type] === 'function') {
							element['on' + type].call(element, event);
						}

						element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
					} while (element && !event.cancelBubble);
				}

				return true;
			};

			// Add the DOMContentLoaded Event
			document.attachEvent('onreadystatechange', function() {
				if (document.readyState === 'complete') {
					document.dispatchEvent(new Event('DOMContentLoaded', {
						bubbles: true
					}));
				}
			});
		}
	}());

	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

})));

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) :
	(factory());
}(undefined, (function () {
	// @ts-nocheck
	(function (undefined) {

	// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
	var detect = (
	  // In IE8, defineProperty could only act on DOM elements, so full support
	  // for the feature requires the ability to set a property on an arbitrary object
	  'defineProperty' in Object && (function() {
	  	try {
	  		var a = {};
	  		Object.defineProperty(a, 'test', {value:42});
	  		return true;
	  	} catch(e) {
	  		return false
	  	}
	  }())
	);

	if (detect) return

	// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always
	(function (nativeDefineProperty) {

		var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
		var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
		var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

		Object.defineProperty = function defineProperty(object, property, descriptor) {

			// Where native support exists, assume it
			if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
				return nativeDefineProperty(object, property, descriptor);
			}

			if (object === null || !(object instanceof Object || typeof object === 'object')) {
				throw new TypeError('Object.defineProperty called on non-object');
			}

			if (!(descriptor instanceof Object)) {
				throw new TypeError('Property description must be an object');
			}

			var propertyString = String(property);
			var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
			var getterType = 'get' in descriptor && typeof descriptor.get;
			var setterType = 'set' in descriptor && typeof descriptor.set;

			// handle descriptor.get
			if (getterType) {
				if (getterType !== 'function') {
					throw new TypeError('Getter must be a function');
				}
				if (!supportsAccessors) {
					throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
				}
				if (hasValueOrWritable) {
					throw new TypeError(ERR_VALUE_ACCESSORS);
				}
				Object.__defineGetter__.call(object, propertyString, descriptor.get);
			} else {
				object[propertyString] = descriptor.value;
			}

			// handle descriptor.set
			if (setterType) {
				if (setterType !== 'function') {
					throw new TypeError('Setter must be a function');
				}
				if (!supportsAccessors) {
					throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
				}
				if (hasValueOrWritable) {
					throw new TypeError(ERR_VALUE_ACCESSORS);
				}
				Object.__defineSetter__.call(object, propertyString, descriptor.set);
			}

			// OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above
			if ('value' in descriptor) {
				object[propertyString] = descriptor.value;
			}

			return object;
		};
	}(Object.defineProperty));
	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

	// @ts-nocheck

	(function(undefined) {
	  // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
	  var detect = 'bind' in Function.prototype;

	  if (detect) return

	  // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always
	  Object.defineProperty(Function.prototype, 'bind', {
	      value: function bind(that) { // .length is 1
	          // add necessary es5-shim utilities
	          var $Array = Array;
	          var $Object = Object;
	          var ObjectPrototype = $Object.prototype;
	          var ArrayPrototype = $Array.prototype;
	          var Empty = function Empty() {};
	          var to_string = ObjectPrototype.toString;
	          var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	          var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, tryFunctionObject = function tryFunctionObject(value) { try { fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]'; isCallable = function isCallable(value) { if (typeof value !== 'function') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };
	          var array_slice = ArrayPrototype.slice;
	          var array_concat = ArrayPrototype.concat;
	          var array_push = ArrayPrototype.push;
	          var max = Math.max;
	          // /add necessary es5-shim utilities

	          // 1. Let Target be the this value.
	          var target = this;
	          // 2. If IsCallable(Target) is false, throw a TypeError exception.
	          if (!isCallable(target)) {
	              throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	          }
	          // 3. Let A be a new (possibly empty) internal list of all of the
	          //   argument values provided after thisArg (arg1, arg2 etc), in order.
	          // XXX slicedArgs will stand in for "A" if used
	          var args = array_slice.call(arguments, 1); // for normal call
	          // 4. Let F be a new native ECMAScript object.
	          // 11. Set the [[Prototype]] internal property of F to the standard
	          //   built-in Function prototype object as specified in 15.3.3.1.
	          // 12. Set the [[Call]] internal property of F as described in
	          //   15.3.4.5.1.
	          // 13. Set the [[Construct]] internal property of F as described in
	          //   15.3.4.5.2.
	          // 14. Set the [[HasInstance]] internal property of F as described in
	          //   15.3.4.5.3.
	          var bound;
	          var binder = function () {

	              if (this instanceof bound) {
	                  // 15.3.4.5.2 [[Construct]]
	                  // When the [[Construct]] internal method of a function object,
	                  // F that was created using the bind function is called with a
	                  // list of arguments ExtraArgs, the following steps are taken:
	                  // 1. Let target be the value of F's [[TargetFunction]]
	                  //   internal property.
	                  // 2. If target has no [[Construct]] internal method, a
	                  //   TypeError exception is thrown.
	                  // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                  //   property.
	                  // 4. Let args be a new list containing the same values as the
	                  //   list boundArgs in the same order followed by the same
	                  //   values as the list ExtraArgs in the same order.
	                  // 5. Return the result of calling the [[Construct]] internal
	                  //   method of target providing args as the arguments.

	                  var result = target.apply(
	                      this,
	                      array_concat.call(args, array_slice.call(arguments))
	                  );
	                  if ($Object(result) === result) {
	                      return result;
	                  }
	                  return this;

	              } else {
	                  // 15.3.4.5.1 [[Call]]
	                  // When the [[Call]] internal method of a function object, F,
	                  // which was created using the bind function is called with a
	                  // this value and a list of arguments ExtraArgs, the following
	                  // steps are taken:
	                  // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                  //   property.
	                  // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                  //   property.
	                  // 3. Let target be the value of F's [[TargetFunction]] internal
	                  //   property.
	                  // 4. Let args be a new list containing the same values as the
	                  //   list boundArgs in the same order followed by the same
	                  //   values as the list ExtraArgs in the same order.
	                  // 5. Return the result of calling the [[Call]] internal method
	                  //   of target providing boundThis as the this value and
	                  //   providing args as the arguments.

	                  // equiv: target.call(this, ...boundArgs, ...args)
	                  return target.apply(
	                      that,
	                      array_concat.call(args, array_slice.call(arguments))
	                  );

	              }

	          };

	          // 15. If the [[Class]] internal property of Target is "Function", then
	          //     a. Let L be the length property of Target minus the length of A.
	          //     b. Set the length own property of F to either 0 or L, whichever is
	          //       larger.
	          // 16. Else set the length own property of F to 0.

	          var boundLength = max(0, target.length - args.length);

	          // 17. Set the attributes of the length own property of F to the values
	          //   specified in 15.3.5.1.
	          var boundArgs = [];
	          for (var i = 0; i < boundLength; i++) {
	              array_push.call(boundArgs, '$' + i);
	          }

	          // XXX Build a dynamic function with desired amount of arguments is the only
	          // way to set the length property of a function.
	          // In environments where Content Security Policies enabled (Chrome extensions,
	          // for ex.) all use of eval or Function costructor throws an exception.
	          // However in all of these environments Function.prototype.bind exists
	          // and so this code will never be executed.
	          bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

	          if (target.prototype) {
	              Empty.prototype = target.prototype;
	              bound.prototype = new Empty();
	              // Clean up dangling references.
	              Empty.prototype = null;
	          }

	          // TODO
	          // 18. Set the [[Extensible]] internal property of F to true.

	          // TODO
	          // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	          // 20. Call the [[DefineOwnProperty]] internal method of F with
	          //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	          //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	          //   false.
	          // 21. Call the [[DefineOwnProperty]] internal method of F with
	          //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	          //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	          //   and false.

	          // TODO
	          // NOTE Function objects created using Function.prototype.bind do not
	          // have a prototype property or the [[Code]], [[FormalParameters]], and
	          // [[Scope]] internal properties.
	          // XXX can't delete prototype in pure-js.

	          // 22. Return F.
	          return bound;
	      }
	  });
	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

})));

var KEY_SPACE = 32;
var DEBOUNCE_TIMEOUT_IN_SECONDS = 1;

function Button ($module) {
  this.$module = $module;
  this.debounceFormSubmitTimer = null;
}

/**
* JavaScript 'shim' to trigger the click event of element(s) when the space key is pressed.
*
* Created since some Assistive Technologies (for example some Screenreaders)
* will tell a user to press space on a 'button', so this functionality needs to be shimmed
* See https://github.com/alphagov/govuk_elements/pull/272#issuecomment-233028270
*
* @param {object} event event
*/
Button.prototype.handleKeyDown = function (event) {
  // get the target element
  var target = event.target;
  // if the element has a role='button' and the pressed key is a space, we'll simulate a click
  if (target.getAttribute('role') === 'button' && event.keyCode === KEY_SPACE) {
    event.preventDefault();
    // trigger the target's click event
    target.click();
  }
};

/**
* If the click quickly succeeds a previous click then nothing will happen.
* This stops people accidentally causing multiple form submissions by
* double clicking buttons.
*/
Button.prototype.debounce = function (event) {
  var target = event.target;
  // Check the button that is clicked on has the preventDoubleClick feature enabled
  if (target.getAttribute('data-prevent-double-click') !== 'true') {
    return
  }

  // If the timer is still running then we want to prevent the click from submitting the form
  if (this.debounceFormSubmitTimer) {
    event.preventDefault();
    return false
  }

  this.debounceFormSubmitTimer = setTimeout(function () {
    this.debounceFormSubmitTimer = null;
  }.bind(this), DEBOUNCE_TIMEOUT_IN_SECONDS * 1000);
};

/**
* Initialise an event listener for keydown at document level
* this will help listening for later inserted elements with a role="button"
*/
Button.prototype.init = function () {
  this.$module.addEventListener('keydown', this.handleKeyDown);
  this.$module.addEventListener('click', this.debounce);
};

function LBCamdenGuideContent ($module) {
  this.$module = $module;
}

LBCamdenGuideContent.prototype.init = function () {
  if (!this.$module) {
    return
  }

  window.addEventListener('hashchange', () => this.showActiveGuide());
  this.showActiveGuide({ handleNotFound: true });
  this.$module.classList.add('lbcamden-guide-content--loaded');
};

LBCamdenGuideContent.prototype.showActiveGuide = function ({ handleNotFound } = {}) {
  if (!this.$module) return

  if (!window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname + window.location.search);
  }

  const articles = this.getArticles();
  const activeItem = this.getActiveItem();

  // This is needed to prevent internal navigation by anchor links (most importantly, "skip to main content")
  // from navigating to a 'not found' view
  if (!handleNotFound && !activeItem) {
    return
  }

  for (const item of articles) {
    this.setArticleVisibility(item, item === activeItem);
  }

  if (activeItem) {
    const notFoundContent = this.getNotFoundArticle();
    this.setArticleVisibility(notFoundContent, false, {
      hiddenAttr: true
    });
  } else {
    const notFoundContent = this.getNotFoundArticle();

    this.setArticleVisibility(notFoundContent, true, {
      setContent: DEFAULT_NOT_FOUND_CONTENT,
      setHeading: DEFAULT_NOT_FOUND_HEADING,
      setPagination: { next: articles[0] },
      hiddenAttr: true
    });
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
};

LBCamdenGuideContent.prototype.setPagination = function ({ next, prev }) {
  const [prevTarget, nextTarget] = this.getPaginationTargets();

  prevTarget.querySelector('.govuk-pagination__link-label').innerText = prev && getHeading(prev);
  nextTarget.querySelector('.govuk-pagination__link-label').innerText = next && getHeading(next);

  prevTarget.querySelector('.govuk-pagination__link').href = prev && `#${prev.dataset.guideArticle}`;
  nextTarget.querySelector('.govuk-pagination__link').href = next && `#${next.dataset.guideArticle}`;

  this.$module.classList.toggle('lbcamden-guide-content--prev', !!prev);
  this.$module.classList.toggle('lbcamden-guide-content--next', !!next);
};

LBCamdenGuideContent.prototype.setArticleVisibility = function (article, visible, { setPagination, setContent, setHeading, hiddenAttr } = {}) {
  const content = article.querySelector('.lbcamden-guide-content__item');

  if (visible) {
    const articles = this.getArticles();
    const i = articles.indexOf(article);

    const prev = articles[i - 1];
    const next = articles[i + 1];

    if (content && setContent) {
      content.innerHTML = setContent;
    }

    if (setHeading) {
      const h2 = article.querySelector('h2');

      if (h2) {
        h2.innerText = setHeading;
      }
    }

    this.setPagination(setPagination || { next, prev });
  }

  if (hiddenAttr) {
    article.hidden = !visible;
  } else {
    article.classList.toggle('lbcamden-guide-content--hidden', !visible);
  }
};

LBCamdenGuideContent.prototype.getArticles = function () {
  return Array.from(this.$module.querySelectorAll('[data-guide-article]'))
};

LBCamdenGuideContent.prototype.getActiveItem = function () {
  const targets = this.getArticles();
  const id = window.location.hash.substring(1);

  if (!id) {
    return targets[0]
  }

  for (const t of targets) {
    if (t.dataset.guideArticle === id) {
      return t
    }
  }
};

LBCamdenGuideContent.prototype.getPaginationTargets = function () {
  return [
    this.$module.querySelector('.govuk-pagination__prev'),
    this.$module.querySelector('.govuk-pagination__next')
  ]
};

LBCamdenGuideContent.prototype.getNotFoundArticle = function () {
  return this.$module.querySelector('[data-guide-not-found]')
};

const DEFAULT_NOT_FOUND_HEADING = 'Sorry, this content has been moved or deleted.';
const DEFAULT_NOT_FOUND_CONTENT = '<p>Try navigating the topic or search the site.</p>';

function getHeading (content) {
  const heading = content.querySelector('[data-guide-heading]');
  return heading && heading.innerText
}

function LBCamdenGuideHeader ($module) {
  this.$module = $module;
}

LBCamdenGuideHeader.prototype.init = function () {
  if (!this.$module) {
    return
  }

  window.addEventListener('hashchange', () => this.updateActiveLink());
  this.updateActiveLink({ handleNotFound: true });
};

LBCamdenGuideHeader.prototype.updateActiveLink = function ({ handleNotFound } = {}) {
  // This is needed to prevent internal navigation by anchor links (most importantly, "skip to main content")
  // from navigating to a 'not found' view
  if (!handleNotFound) {
    if (!this.$module.querySelector(`[href="${window.location.hash}"]`)) {
      return
    }
  }

  const isEmptyHash = !window.location.hash || window.location.hash === '#';
  let i = 0;

  for (const link of this.getLinks()) {
    if (i === 0 && isEmptyHash) {
      link.classList.toggle(':active', true);
    } else {
      const fullUrl = new URL(link.href, window.location.href);
      const isActive = !isEmptyHash && fullUrl.href === window.location.href;

      link.classList.toggle(':active', isActive);
    }

    i += 1;
  }
};

LBCamdenGuideHeader.prototype.getLinks = function () {
  return this.$module.querySelectorAll('.govuk-link')
};

function LBCamdenHeader ($module) {
  this.$module = $module;
  this.$navigationToggle = this.$module.querySelector('.lbcamden-header__navigation-top-toggle-button');
  this.$navigationMenu = this.$module.querySelector('.lbcamden-header__navigation-items');
  this.$searchToggle = this.$module.querySelector('.lbcamden-header__search-toggle-button');
  this.$searchMenu = this.$module.querySelector('.lbcamden-header__search-items');
  this.$emergencyBanner = this.$module.querySelector('.lbcamden-header__emergency-banner');
  this.$buttons = this.$module.querySelectorAll('button[aria-controls][data-toggle-mobile-group][data-toggle-desktop-group]');
  this.$menuButtons = this.$module.querySelectorAll('.lbcamden-header__navigation-item--with-children');
  this.$phaseBanner = document.querySelector('.govuk-phase-banner');
  this.$navContainer = this.$module.children[0];
  // this.$menuButtons = this.$module.querySelectorAll('.lbcamden-header__navigation-second-toggle-button')
  this.hiddenButtons = this.$module.querySelectorAll('button[hidden]');
  this.$contentShiftContainer = this.$module.querySelector('.lbcamden-header__bar') || this.$module;
  this.menuOpen = false;
  this.searchOpen = false;
  this.lastWindowSize = null;
}

LBCamdenHeader.prototype.init = function () {
  if (!this.$module) {
    return
  }
  this.$module.classList.add('js-module-initialised');
  if (typeof window.matchMedia === 'function') {
    this.setupResponsiveChecks();
  }
};

LBCamdenHeader.prototype.setupResponsiveChecks = function () {
  this.mql = window.matchMedia('(min-width: ' + settings.desktop + ')');
  this.mql.addListener(this.checkMode.bind(this));
  this.checkMode();
};

LBCamdenHeader.prototype.checkMode = function () {
  if (this.mql.matches) {
    this.teardownMobileMenu();
    this.setupDesktopMenu();
  } else {
    this.teardownDesktopMenu();
    this.setupMobileMenu();
  }
};

LBCamdenHeader.prototype.setupMobileMenu = function () {
  this.setAttributes('mobile');
  if (this.$navigationMenu != null) {
    this.$navigationToggle.boundMenuClick = this.handleMenuButtonClick.bind(this);
    this.$navigationToggle.addEventListener('click', this.$navigationToggle.boundMenuClick, true);
  }
  if (this.$searchMenu != null) {
    this.$searchToggle.boundSearchClick = this.handleSearchButtonClick.bind(this);
    this.$searchToggle.addEventListener('click', this.$searchToggle.boundSearchClick, true);
  }
};

LBCamdenHeader.prototype.teardownMobileMenu = function () {
  this.unsetAttributes('mobile');
  if (this.$navigationMenu != null) {
    this.$navigationToggle.removeEventListener('click', this.$navigationToggle.boundMenuClick, true);
  }
  if (this.$searchMenu != null) {
    this.$searchToggle.removeEventListener('click', this.$searchToggle.boundSearchClick, true);
  }
};

LBCamdenHeader.prototype.setupDesktopMenu = function () {
  this.setAttributes('desktop');
  if (this.$searchMenu != null) {
    this.$searchToggle.boundSearchClick = this.handleSearchButtonClick.bind(this);
    this.$searchToggle.addEventListener('click', this.$searchToggle.boundSearchClick, true);
  }
};

LBCamdenHeader.prototype.teardownDesktopMenu = function () {
  this.unsetAttributes('desktop');
  if (this.$navigationMenu != null) {
    this.$navigationToggle.removeEventListener('click', this.$navigationToggle.boundMenuClick, true);
  }
  if (this.$searchMenu != null) {
    this.$searchToggle.removeEventListener('click', this.$searchToggle.boundSearchClick, true);
  }
};

LBCamdenHeader.prototype.menuItemClick = function (e) {
  let theTargetID = e.target.getAttribute('aria-controls');
  if (theTargetID == null) {
    theTargetID = e.target.parentNode.getAttribute('aria-controls');
    e.target.parentNode.classList.toggle('lbcamden-header__open-button');
  } else {
    e.target.classList.toggle('lbcamden-header__open-button');
  }

  this.$module.querySelectorAll('.lbcamden-header__navigation-second-toggle-button:not([aria-controls=' + theTargetID + '])').forEach(i => i.classList.remove('lbcamden-header__open-button'));

  const theTarget = document.getElementById(theTargetID);

  // AW: Only close other sub-menus when in desktop mode
  if (this.mql.matches === true) {
    this.$module.querySelectorAll('.lbcamden-header__navigation-dropdown-menu:not(#' + theTargetID + ')').forEach(i => i.setAttribute('hidden', true));
  }

  document.getElementById(theTargetID).getAttribute('hidden') != null ? document.getElementById(theTargetID).removeAttribute('hidden') : document.getElementById(theTargetID).setAttribute('hidden', 'true');

  if (this.mql.matches === true) {
    this.menuContentShift(theTarget.offsetHeight);
  }
  if (this.$searchMenu != null) {
    this.closeSearch(this.$searchToggle, this.$searchMenu);
  }
};

LBCamdenHeader.prototype.menuContentShift = function (offsetPixels) {
  if (this.$emergencyBanner) {
    this.$emergencyBanner.style.marginTop = offsetPixels + 'px';
  } else {
    this.$contentShiftContainer.style.marginBottom = offsetPixels + 'px';
  }
};

LBCamdenHeader.prototype.setAttributes = function ($type) {
  if ($type === 'mobile') {
    if (this.$navigationMenu != null) {
      this.$navigationToggle.removeAttribute('hidden');
      this.$navigationToggle.setAttribute('aria-expanded', false);
      this.$navigationMenu.setAttribute('hidden', true);
    }
  }
  if (this.$searchMenu != null) {
    this.$searchMenu.setAttribute('hidden', true);
    this.$searchToggle.setAttribute('aria-expanded', false);
    this.$searchToggle.setAttribute('aria-label', 'Show search menu');
    this.$module.querySelector('.lbcamden-header__search-item-link').setAttribute('hidden', true);
    this.$module.querySelector('.lbcamden-header__search-and-popular').removeAttribute('hidden');
    this.$searchToggle.removeAttribute('hidden');
  }
  nodeListForEach(this.$menuButtons, function ($button) {
    $button.querySelector('.lbcamden-header__navigation-item-link').setAttribute('hidden', true);
    $button.querySelector('.lbcamden-header__navigation-second-toggle-button').removeAttribute('hidden');
    // Save bounded functions to use when removing event listeners during teardown
    $button.boundMenuItemClick = this.menuItemClick.bind(this);
    // Handle events
    $button.querySelector('button').addEventListener('click', $button.boundMenuItemClick, true);
  }.bind(this));
};

LBCamdenHeader.prototype.unsetAttributes = function ($type) {
  if ($type === 'mobile') {
    if (this.$navigationMenu != null) {
      this.$navigationToggle.setAttribute('hidden', true);
      this.$navigationMenu.removeAttribute('hidden');
    }
    if (this.$searchMenu != null) {
      this.$searchToggle.setAttribute('hidden', true);
      this.$searchMenu.removeAttribute('hidden');
    }
  }
  this.$module.style.marginBottom = '0px';
  this.searchOpen = false;
  this.menuOpen = false;
  if (this.$navigationMenu != null) {
    this.closeDesktopMenus();
  }
  if (this.$searchMenu != null) {
    this.$searchToggle.classList.remove('lbcamden-header__open-button');
  }
  nodeListForEach(this.$menuButtons, function ($button) {
    $button.querySelector('button').removeEventListener('click', $button.boundMenuItemClick, true);
  });
};

LBCamdenHeader.prototype.handleMenuButtonClick = function () {
  if (this.menuOpen === true) {
    this.closeMenu(this.$navigationToggle, this.$navigationMenu);
  } else {
    this.openMenu(this.$navigationToggle, this.$navigationMenu);
  }
};

LBCamdenHeader.prototype.handleSearchButtonClick = function () {
  if (this.searchOpen === true) {
    this.closeSearch(this.$searchToggle, this.$searchMenu);

    if (this.mql.matches === true) {
      this.$module.style.marginBottom = '0';
      this.menuContentShift(0);
    }
  } else {
    this.openSearch(this.$searchToggle, this.$searchMenu);

    if (this.mql.matches === true) {
      this.menuContentShift(this.$searchMenu.offsetHeight);
    }
  }
};

LBCamdenHeader.prototype.openMenu = function ($button, $target) {
  this.menuOpen = true;
  $button.classList.add('lbcamden-header__open-button');
  $button.setAttribute('aria-expanded', !0);
  $button.setAttribute('aria-label', 'Hide navigation menu');
  $button.classList.add('lbcamden-header__open-button');
  $target.removeAttribute('hidden');
  if (this.$searchMenu != null) {
    this.closeSearch(this.$searchToggle, this.$searchMenu);
  }
};

LBCamdenHeader.prototype.closeMenu = function ($button, $target) {
  this.menuOpen = false;
  this.menuContentShift(0);
  if (this.$navigationMenu != null) {
    $button.classList.remove('lbcamden-header__open-button');
    $button.setAttribute('aria-expanded', !1);
    $button.setAttribute('aria-label', 'Show navigation menu');
    $button.classList.remove('lbcamden-header__open-button');
    $target.setAttribute('hidden', !0);
  }
};

LBCamdenHeader.prototype.closeDesktopMenus = function () {
  this.$module.querySelectorAll('.lbcamden-header__navigation-dropdown-menu').forEach(x => x.setAttribute('hidden', true));
};

LBCamdenHeader.prototype.openSearch = function ($button, $target) {
  this.searchOpen = true;
  $button.setAttribute('aria-expanded', !0);
  $button.setAttribute('aria-label', 'Hide navigation menu');
  this.$module.querySelectorAll('.lbcamden-header__open-button').forEach(x => x.classList.remove('lbcamden-header__open-button'));
  $button.classList.add('lbcamden-header__open-button');
  $target.style.top = this.$navContainer.offsetHeight + 'px';
  $target.removeAttribute('hidden');
  // document.getElementById('lbs-search__box').focus()
  if (this.mql.matches !== true) {
    this.closeMenu(this.$navigationToggle, this.$navigationMenu);
  } else {
    this.closeDesktopMenus();
  }
};

LBCamdenHeader.prototype.closeSearch = function ($button, $target) {
  this.searchOpen = false;
  $button.setAttribute('aria-expanded', !1);
  $button.setAttribute('aria-label', 'Show navigation menu');
  $button.classList.remove('lbcamden-header__open-button');
  $target.setAttribute('hidden', !0);
};

function initAll (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {};

  // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document;

  var $LBCamdenHeaders = scope.querySelectorAll('[data-module="lbcamden-header"]');
  nodeListForEach($LBCamdenHeaders, function ($LBCamdenHeader) {
    new LBCamdenHeader($LBCamdenHeader).init();
  });

  var $LBCamdenButtons = scope.querySelectorAll('[data-module="lbcamden-button"]');
  nodeListForEach($LBCamdenButtons, function ($LBCamdenButton) {
    new Button($LBCamdenButton).init();
  });

  var $LBCamdenGuideContents = scope.querySelectorAll('[data-module="lbcamden-guide-content"]');
  nodeListForEach($LBCamdenGuideContents, function ($LBCamdenGuideContent) {
    new LBCamdenGuideContent($LBCamdenGuideContent).init();
  });

  var $LBCamdenGuideHeaders = scope.querySelectorAll('[data-module="lbcamden-guide-header"]');
  nodeListForEach($LBCamdenGuideHeaders, function ($LBCamdenGuideHeader) {
    new LBCamdenGuideHeader($LBCamdenGuideHeader).init();
  });
}

exports.initAll = initAll;
exports.LBCamdenButton = Button;
exports.LBCamdenGuideContent = LBCamdenGuideContent;
exports.LBCamdenGuideHeader = LBCamdenGuideHeader;
exports.LBCamdenHeader = LBCamdenHeader;

Object.defineProperty(exports, '__esModule', { value: true });

})));
