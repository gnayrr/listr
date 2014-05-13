;(function () { 'use strict';

	var $document = null;

	var listr = function (input, param) {

		input = input || [];


		var VERSION = '0.1.0';


		/* listr operates in the lodash context */
		var _ = this;


		/* document is used to create elements */
		if (typeof window === 'object' && _.isObject(window.document)) {

			$document = window.document;
		}


		/* support commands without consuming more function names */
		if (_.isArray(input)) {

			if (ready()) {

				return toFragment(input);
			}
		} else {

			switch (input) {

				case 'version':
					return VERSION;

				case 'ready':
					return ready();

				case 'document':
					if (_.isObject(param)) {

						$document = param;
					}

					break;
			}
		}


		/* check preconditions */
		function ready () {
			return (
				_.isObject($document) &&
				_.isFunction($document.createElement) &&
				_.isFunction($document.createDocumentFragment)
			);
		}


		/* default invalid format error */
		function invalid () {

			console.log('invalid input format');
		}


		function setProperty (el, propObj) {

			if (el && propObj) {

				_.forOwn(propObj, function (value, key) {

					key = _.escape(key);

					if (key in el) {
						el[key] = value;
					} else { 
						el.setAttribute(key, value);
					}
				});
			}
		}


		function setValue (el, value) {

			var escaped = _.escape(value).replace(/&amp;([^\s;&]{2,7};)/gi, '&$1');

			if ('innerHTML' in el) {

				el.innerHTML = escaped;

			} else if ('textContent' in el) {

				el.textContent = value;

			} else {

				el.innerText = value;
			}
		}

		// toFragment takes an input array that conforms to 'lis'
		// and returns a document fragment 
		function toFragment (arr) {

			var fragment = $document.createDocumentFragment();

			if (arr.length > 0) {

				var head = arr[0];

				if (_.isArray(head)) {

					_.each(arr, function (lis) {

						var frags = toFragment(lis);

						if (frags) {

							fragment.appendChild(frags);
						}
					});

				} else if (_.isString(head)) {

					var el = toElement(arr);

					if (el) {

						fragment.appendChild(el);
					}

				} else {

					invalid();
				}
			}

			return fragment;
		}


		// toElement takes a 'lis' and returns a single DOM element
		function toElement (lis) {

			var element = null;
			var x;

			if (lis.length > 0 && _.isString(lis[0])) {

				element = $document.createElement(lis[0]);

				if (lis.length > 1) {

					x = lis[1];

					// optional configuration object
					if (_.isPlainObject(x)) {

						setProperty(element, x);

					// optional node value
					} else if (_.isString(x) || _.isNumber(x) || _.isBoolean(x)) {

						setValue(element, x);

					} else if (_.isArray(x)) {

						x = toFragment(x);

						if (x) {

							element.appendChild(x);
						}
					}

					if (lis.length > 2) {

						x = lis[2];

						if (_.isString(x) || _.isNumber(x) || _.isBoolean(x)) {

							setValue(element, x);
						} else if (_.isArray(x)) {

							x = toFragment(x);

							if (x) {

								element.appendChild(x);
							}
						}

						if (lis.length > 3) {

							x = _.rest(lis, 3);

							x = toFragment(x);

							if (x) {

								element.appendChild(x);
							}
						}
					}
				}

			} else {

				invalid();
			}

			return element;
		}

	};


	var root = (typeof window === 'object' && window) || this;

	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		define(function () {
			return listr;
		});

	} else {

		if (typeof module === 'object' && module.exports) {

			module.exports = listr;
		} else {

			root.listr = listr;
		}
	}

}).call(this);