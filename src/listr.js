;(function () { 'use strict';
	
	var $document = null;

	/* look for document object once */
	if (typeof window === 'object' && _.isObject(window.document)) {

		$document = window.document;
	}

	var listr = function (input, param) {

		input = input || [];

		var VERSION = '0.2.1';

		/* listr operates in the lodash context */
		var _ = this;

		/* document is used to create elements */
		/* support more methods */
		if (_.isArray(input)) {

			if (ready()) {

				return toFragment(input);
			} else {
				console.log('listr is not ready');
			}
		} else {

			switch (input) {

				case 'version':
					return VERSION;

				case 'ready':
					return ready();

				case 'document':
					$document = param;
					return ready();
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

		/* sets all property of propObj to the element */
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

		/* sets text value to the element, escaping when appropriate */
		function setValue (el, value) {

			if (el.tagName.toLowerCase() === 'script') {

				if ('text' in el) {

					el.text += value;
				} else {

					el.innerHTML += value;
				}

				return;
			}

			var escaped = _.escape(value).replace(/&amp;([^\s;&]{2,8};)/gi, '&$1');

			if ('innerHTML' in el) {

				el.innerHTML += escaped;

			} else if ('textContent' in el) {

				el.textContent += value;

			} else {

				el.innerText += value;
			}
		}

		/* convert lis array and returns a document fragment */
		function toFragment (arr) {

			var fragment = $document.createDocumentFragment();

			if (arr && arr.length > 0) {

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

		/* convert one lis to one DOM element */
		function toElement (lis) {

			var element = null;
			var x;

			if (lis && lis.length > 0 && _.isString(lis[0])) {

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

						x = _.rest(lis, 2);


						_.each(x, function (y) {

							if (_.isString(y) || _.isNumber(y) || _.isBoolean(y)) {

								setValue(element, y);
							} else if (_.isArray(y)) {

								var frag = toFragment(y);

								if (frag) {

									element.appendChild(frag);
								}
							}
						});
					}
				}

			} else {

				invalid();
			}

			return element;
		}
	};

	/* handle client and browser exposure */
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