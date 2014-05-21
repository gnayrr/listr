var html5 = {};

html5.sections = {

	body 		: {tagName: 'BODY'},
	section 	: {tagName: 'SECTION'},
	nav		: {tagName: 'NAV'},
	h1			: {tagName: 'H1'},
	h2			: {tagName: 'H2'},
	h3			: {tagName: 'H3'},
	h4			: {tagName: 'H4'},
	h5			: {tagName: 'H5'},
	h6			: {tagName: 'H6'},
	article	: {tagName: 'ARTICLE'},
	header	: {tagName: 'HEADER'},
	footer	: {tagName: 'FOOTER'},
	address	: {tagName: 'ADDRESS'},
	main		: {tagName: 'MAIN'}
};

html5.groups = {

	p 			: {tagName: 'P'},
	hr 		: {tagName: 'HR'},
	pre 		: {tagName: 'PRE'},
	ol			: {tagName: 'OL'},
	ul			: {tagName: 'UL'},
	li 		: {tagName: 'LI'},
	dl 		: {tagName: 'DL'},
	dt 		: {tagName: 'DT'},
	dd			: {tagName: 'DD'},
	figure	: {tagName: 'FIGURE'},
	div 		: {tagName: 'DIV'},
	blockquote 	: {tagName: 'BLOCKQUOTE'},
	figcaption 	: {tagName: 'FIGCAPTION'}
};

html5.semantics = {

	a 			: {tagName: 'A'},
	em 		: {tagName: 'EM'},
	strong 	: {tagName: 'STRONG'},
	small		: {tagName: 'SMALL'},
	s 			: {tagName: 'S'},
	cite 		: {tagName: 'CITE'},
	q 			: {tagName: 'Q'},
	dfn 		: {tagName: 'DFN'},
	abbr 		: {tagName: 'ABBR'},
	data 		: {tagName: 'DATA'},
	time 		: {tagName: 'TIME'},
	code 		: {tagName: 'CODE'},
	'var' 	: {tagName: 'VAR'},
	samp 		: {tagName: 'SAMP'},
	kbd 		: {tagName: 'KBD'},
	sub 		: {tagName: 'SUB'},
	sup 		: {tagName: 'SUP'},
	i 			: {tagName: 'I'},
	b 			: {tagName: 'B'},
	u 			: {tagName: 'U'},
	mark 		: {tagName: 'MARK'},
	ruby 		: {tagName: 'RUBY'},
	rt 		: {tagName: 'RT'},
	rp 		: {tagName: 'RP'},
	bdi 		: {tagName: 'BDI'},
	bdo 		: {tagName: 'BDO'},
	span 		: {tagName: 'SPAN'},
	br 		: {tagName: 'BR', skip: true },
	wbr 		: {tagName: 'WBR', skip: true}
};

html5.embedded = {

	img 		: {tagName: 'IMG'},
	iframe 	: {tagName: 'IFRAME'},
	embed 	: {tagName: 'EMBED'},
	object 	: {tagName: 'OBJECT'},
	param 	: {tagName: 'PARAM'},
	video 	: {tagName: 'VIDEO'},
	audio 	: {tagName: 'AUDIO'},
	source 	: {tagName: 'SOURCE'},
	track 	: {tagName: 'TRACK'},
	canvas 	: {tagName: 'CANVAS'},
	map 		: {tagName: 'MAP'},
	area 		: {tagName: 'AREA'},
	svg 		: {tagName: 'SVG'},
	math 		: {tagName: 'MATH'}
};

html5.tabular = {

	table		: {tagName: 'TABLE'},
	caption	: {tagName: 'CAPTION'},
	colgroup	: {tagName: 'COLGROUP', skip: true}, // colgroup do not allow text value
	col		: {tagName: 'COL'},
	tbody		: {tagName: 'TBODY'},
	thead		: {tagName: 'THEAD'},
	tfoot		: {tagName: 'TFOOT'},
	tr			: {tagName: 'TR'},
	td			: {tagName: 'TD'},
	th			: {tagName: 'TH'}
};

html5.form = {

	form		: {tagName: 'FORM'},
	fieldset	: {tagName: 'FIELDSET'},
	legend	: {tagName: 'LEGEND'},
	label		: {tagName: 'LABEL'},
	input		: {tagName: 'INPUT'},
	button	: {tagName: 'BUTTON'},
	select	: {tagName: 'SELECT'},
	datalist	: {tagName: 'DATALIST'},
	optgroup	: {tagName: 'OPTGROUP'},
	option	: {tagName: 'OPTION'},
	textarea	: {tagName: 'TEXTAREA'},
	keygen	: {tagName: 'KEYGEN'},
	output	: {tagName: 'OUTPUT'},
	progress	: {tagName: 'PROGRESS'},
	meter		: {tagName: 'METER'}
};

html5.interactive = {

	details	: {tagName: 'DETAILS'},
	summary	: {tagName: 'SUMMARY'},
	menuitem	: {tagName: 'MENUITEM'},
	menu 		: {tagName: 'MENU'}
};


describe('_.listr plugin/mixin', function () {

	_.mixin({ listr: listr });

	it('is not ready without a document object', function () {

		_.listr('document', {});
		expect(_.listr('ready')).toBe(false);
	});

	it('returns undefined when called before ready', function () {

		expect(_.listr(['p', 'Boo'])).toBe(undefined);
	});

	it('is ready once there is a document object', function () {

		expect(_.listr('document', window.document)).toBe(true);
	});

	it('is version 0.3.1', function () {

		expect(_.listr('version')).toEqual('0.3.1');
	});

	it('has access to the DOM via the window object', function () {

		expect(_.listr('ready')).toBe(true);
	});

});


describe('_.listr basic operations', function () {

	it('returns a document fragment by default', function () {

		expect(_.listr().toString()).toEqual('[object DocumentFragment]');
		expect(_.listr([]).toString()).toEqual('[object DocumentFragment]');
	});


	it('creates single html5 sectioning elements', function () {

		_.each(html5.sections, function (el, key) {

			expect(_.listr([key]).firstChild.tagName).toEqual(el.tagName);
		});
	});


	it('creates single html5 grouping elements', function () {

		_.each(html5.groups, function (el, key) {

			expect(_.listr([key]).firstChild.tagName).toEqual(el.tagName);
		});
	});


	it('creates single html5 semantic elements', function () {

		_.each(html5.semantics, function (el, key) {

			expect(_.listr([key]).firstChild.tagName).toEqual(el.tagName);
		});
	});


	it('creates single html5 embedded elements', function () {

		_.each(html5.embedded, function (el, key) {

			expect(_.listr([key]).firstChild.tagName).toEqual(el.tagName);
		});
	});


	it('creates single html5 tabular elements', function () {

		_.each(html5.tabular, function (el, key) {

			expect(_.listr([key]).firstChild.tagName).toEqual(el.tagName);
		});
	});


	it('creates single html5 form elements', function () {

		_.each(html5.form, function (el, key) {

			expect(_.listr([key]).firstChild.tagName).toEqual(el.tagName);
		});
	});


	it('creates single html5 interactive elements', function () {

		_.each(html5.interactive, function (el, key) {

			expect(_.listr([key]).firstChild.tagName).toEqual(el.tagName);
		});
	});


	it('creates single elements with class xyz', function () {

		_.each(html5, function (group) {

			_.each(group, function (el, key) {

				expect(_.listr([key, {className: 'xyz'}]).firstChild.className).toEqual('xyz');
			});
		});
	});


	it('creates single elements with text value', function () {

		_.each(html5, function (group) {

			_.each(group, function (el, key) {

				if (!el.skip) {

					expect(_.listr([key, 'test']).firstChild.textContent).toEqual('test');
				}
			});
		});
	});


	it('creates single elements with number value', function () {

		_.each(html5, function (group) {

			_.each(group, function (el, key) {

				if (!el.skip) {

					var e = _.listr([key, 42]);

					expect(_.listr([key, 42]).firstChild.textContent).toEqual('42');

					if (e.firstChild.textContent !== '42') {

						console.log(e.firstChild.tagName);
					}
				}
			});
		});
	});


	it('creates single elements with text value and class xyz', function () {

		_.each(html5, function (group) {

			_.each(group, function (el, key) {

				if (!el.skip) {

					var e = _.listr([key, {className: 'xyz'}, 'test']);

					expect(e.firstChild.tagName).toEqual(el.tagName);
					expect(e.firstChild.className).toEqual('xyz');
					expect(e.firstChild.textContent).toEqual('test');
				}
			});
		});
	});


	it('creates single elements with special html entities', function () {

		_.each(html5.semantics, function (el, key) {

			expect(_.listr([key, '&']).firstChild.textContent).toEqual('&');
			expect(_.listr([key, '"']).firstChild.textContent).toEqual('"');
			expect(_.listr([key, '\'']).firstChild.textContent).toEqual('\'');
			expect(_.listr([key, '<']).firstChild.textContent).toEqual('<');
			expect(_.listr([key, '>']).firstChild.textContent).toEqual('>');

			expect(_.listr([key, '&amp;']).firstChild.textContent).toEqual('&');
			expect(_.listr([key, '&quot;']).firstChild.textContent).toEqual('"');
			expect(_.listr([key, '&lt;']).firstChild.textContent).toEqual('<');
			expect(_.listr([key, '&gt;']).firstChild.textContent).toEqual('>');
			expect(_.listr([key, '&reg;']).firstChild.textContent).toEqual('®');
			expect(_.listr([key, '&lowbar;']).firstChild.textContent).toEqual('_');
			expect(_.listr([key, '&#167;']).firstChild.textContent).toEqual('§');
			expect(_.listr([key, '&#338;']).firstChild.textContent).toEqual('Œ');

			expect(_.listr([key, '><&gt;']).firstChild.textContent).toEqual('><>');
			expect(_.listr([key, '"&gt;"']).firstChild.textContent).toEqual('">"');
			expect(_.listr([key, '&copy; 2014']).firstChild.textContent).toEqual('© 2014');
			expect(_.listr([key, '&undefined;']).firstChild.textContent).toEqual('&undefined;');
			expect(_.listr([key, '&   ;']).firstChild.textContent).toEqual('&   ;');

			expect(_.listr([key, '"Hello Kitty"']).firstChild.textContent).toEqual('"Hello Kitty"');
		});
	});


	it('creates single elements with invalid html entities', function () {

		_.each(html5.semantics, function (el, key) {

			if (!el.skip) {

				expect(_.listr([key, '&xxx;']).firstChild.textContent).toEqual('&xxx;');
				expect(_.listr([key, '&&;;&;&;']).firstChild.textContent).toEqual('&&;;&;&;');
				expect(_.listr([key, '&x&x&x&x;;xx;&;']).firstChild.textContent).toEqual('&x&x&x&x;;xx;&;');
				expect(_.listr([key, '&xxx;']).firstChild.innerHTML).toEqual('&amp;xxx;');
			}
		});
	});


	it('creates single elements with escaped html string', function () {

		var lis;

		_.each(html5.semantics, function (el, key) {

			if (!el.skip) {

				lis = [key, '<script src="malicious"></script>'];

				expect(_.listr(lis).firstChild.textContent).toEqual('<script src="malicious"></script>');
				expect(_.listr(lis).firstChild.children.length).toEqual(0);
			}
		});

		lis = [
			['span', '<a>test</a>'],
			['p', '<script></script>']
		];

		expect(_.listr(lis).firstChild.textContent).toEqual('<a>test</a>');
		expect(_.listr(lis).lastChild.children.length).toEqual(0);
		expect(_.listr(lis).lastChild.textContent).toEqual('<script></script>');
		expect(_.listr(lis).lastChild.innerHTML).toEqual('&lt;script&gt;&lt;/script&gt;');
	});


	it('creates single element with inline tags', function () {

		expect(_.listr(['p', ['em', 'hello'], ' world']).firstChild.textContent).toEqual('hello world');
		expect(_.listr(['p', 'a', 'b','c', ['em', 'd'], 'e']).firstChild.textContent).toEqual('abcde');

		var el = _.listr(
			[
				['span', 'a', 'b', 'c'],
				['span', ['em', 'x'], ['strong', 'y'], ['code', 'z']]
			]
		);

		expect(el.firstChild.textContent).toEqual('abc');
		expect(el.lastChild.textContent).toEqual('xyz');

		el = _.listr(
			['p',
				['p', 'crawling ',
					['span', 'book', 'store', ['em', 'emphasis']],
					['span', ' tunnel'],
					' solar beam'
				]
			]
		);

		expect(el.firstChild.textContent).toEqual('crawling bookstoreemphasis tunnel solar beam');

		el = _.listr(
			['p', {className: 'boom'},
				[
					['span', 'Fight ']
				],
				'Boomerang ',
				'rain ', 'shadow ', ['em', 'meats']
			]
		);

		expect(el.firstChild.textContent).toEqual('Fight Boomerang rain shadow meats');


		el = _.listr(
			['p', true, false, true]
		);

		expect(el.firstChild.textContent).toEqual('truefalsetrue');


		el = _.listr(
			['p',
				'Then things got ',
				['em',
					['strong', 'out of control']
				],
				' fast!'
			]
		);

		expect(el.firstChild.textContent).toEqual('Then things got out of control fast!');

	});

});


describe('_.listr batch operations', function () {

	it('creates div, div, span', function () {

		var lis = 
		[
			['div'],
			['div'],
			['span']
		];

		expect(_.listr(lis).childNodes.length).toEqual(3);
	});


	it('creates article > h1, p, p, ul, p', function () {

		var lis = 
		[ 'article',
			['h1', 'heading'],
			['p', 'first paragraph'],
			['p', 'second paragraph'],
			['ul', {className: 'xyz'}],
			['p', 'last paragraph']
		];

		var fragment = _.listr(lis);

		expect(fragment.childNodes.length).toEqual(1);
		expect(fragment.firstChild.childNodes.length).toEqual(5);
		expect(fragment.firstChild.childNodes[0].textContent).toEqual('heading');
		expect(fragment.firstChild.childNodes[1].textContent).toEqual('first paragraph');
		expect(fragment.firstChild.childNodes[2].textContent).toEqual('second paragraph');
		expect(fragment.firstChild.childNodes[3].className).toEqual('xyz');
		expect(fragment.firstChild.childNodes[4].textContent).toEqual('last paragraph');

	});


	it('creates section > section > section > section', function () {

		var lis = 
		[ 'section',
			['section',
				['section', 
					['section']
				]
			]
		];

		var fragment = _.listr(lis);

		expect(fragment.childNodes.length).toEqual(1);
		expect(fragment.firstChild.childNodes.length).toEqual(1);
		expect(fragment.firstChild.firstChild.childNodes.length).toEqual(1);
		expect(fragment.firstChild.firstChild.firstChild.childNodes.length).toEqual(1);
		expect(fragment.firstChild.firstChild.firstChild.firstChild.childNodes.length).toEqual(0);

	});


	it('creates simple form elements', function () {

		var lis = 
		['form',
			['label', 'name',
				['input', {type: 'text', spellcheck: true}]
			],
			['label', 'date',
				['input', {type: 'text', spellcheck: false, placeholder: 'xxx'}]
			]
		];

		var fragment = _.listr(lis);


		expect(fragment.childNodes.length).toEqual(1);
		expect(fragment.firstChild.childNodes.length).toEqual(2);
		expect(fragment.firstChild.firstChild.tagName).toEqual('LABEL');
		expect(fragment.firstChild.lastChild.tagName).toEqual('LABEL');

		// expect(fragment.firstChild.firstChild.textContent).toEqual('name');
		// expect(fragment.firstChild.lastChild.textContent).toEqual('date');

	});


	it('creates complicated structure 1', function () {

		var lis = 
		[ 'section',
			['article',
				['section', 
					['section']
				]
			],
			['article', {className: 'xyz'},
				['h1', 'heading'],
				['p'],
				['p']
			],
			[
				['img'],
				['img'],
				['img'],
				['img']
			]
		];

		var fragment = _.listr(lis);

		expect(fragment.childNodes.length).toEqual(1);
		expect(fragment.firstChild.childNodes.length).toEqual(6);
		expect(fragment.firstChild.firstChild.childNodes.length).toEqual(1);
		expect(fragment.firstChild.firstChild.firstChild.childNodes.length).toEqual(1);
		expect(fragment.firstChild.firstChild.firstChild.firstChild.childNodes.length).toEqual(0);

	});


	it('creates complicated structure 2', function () {

		var lis = 
		[
			['ol',
				[
					['li', 'Aa'],
					['li', 'Bb'],
					['li', 'Cc']
				],
				['li', 'Dd'],
				['li', 'Ee']
			],
			['ul',
				[
					[
						[
							['li', 'aA'],
							['li', 'bB'],
							['li', 'cC']
						]
					]
				]
			]
		];

		var fragment = _.listr(lis);

		expect(fragment.childNodes.length).toEqual(2);
		expect(fragment.firstChild.childNodes.length).toEqual(5);
		expect(fragment.lastChild.childNodes.length).toEqual(3);

	});

});


describe('_.listr text behaviors', function () {

	it('automatically escapes html special characters', function () {

		expect(_.listr(['span', '<']).firstChild.innerHTML).toEqual('&lt;');
		expect(_.listr(['span', '>']).firstChild.innerHTML).toEqual('&gt;');
		expect(_.listr(['span', '&lt;']).firstChild.innerHTML).toEqual('&lt;');
		expect(_.listr(['span', '&eacute;']).firstChild.innerHTML).toEqual('é');
		expect(_.listr(['span', '&amp;']).firstChild.innerHTML).toEqual('&amp;');
		expect(_.listr(['span', '&']).firstChild.innerHTML).toEqual('&amp;');
		expect(_.listr(['div', 'alert("hello");']).firstChild.innerHTML).toEqual('alert("hello");');
		expect(_.listr(['p', 'killer <em>instinct</em>']).firstChild.innerHTML).toEqual('killer &lt;em&gt;instinct&lt;/em&gt;');
	});

	it('does not escape characters for SCRIPT tags', function () {

		expect(_.listr(['script', 'alert("hello");']).firstChild.innerHTML).toEqual('alert("hello");');
		expect(_.listr(['script', '&amp;']).firstChild.innerHTML).toEqual('&amp;');
		expect(_.listr(['script', '"<>"']).firstChild.innerHTML).toEqual('"<>"');
	});

	it('ignores null, undefined, and regular expressions', function () {

		expect(_.listr(['p', null]).firstChild.textContent).toEqual('');
		expect(_.listr(['p', undefined]).firstChild.textContent).toEqual('');
		expect(_.listr(['p', /kkk/]).firstChild.textContent).toEqual('');
		expect(_.listr(['p', undefined, null, /kkk/]).firstChild.textContent).toEqual('');
	});

	it('accepts strings, numbers and booleans', function () {

		expect(_.listr(['p', 'string']).firstChild.textContent).toEqual('string');
		expect(_.listr(['p', 9]).firstChild.textContent).toEqual('9');
		expect(_.listr(['p', 0]).firstChild.textContent).toEqual('0');
		expect(_.listr(['p', true]).firstChild.textContent).toEqual('true');
		expect(_.listr(['p', false]).firstChild.textContent).toEqual('false');
		expect(_.listr(['p', '']).firstChild.textContent).toEqual('');
		expect(_.listr(['p', true, false, false]).firstChild.textContent).toEqual('truefalsefalse');
	});

	it('renders JavaScript in escaped plain text', function () {

		expect(_.listr(['p', 'alert("killer app");']).firstChild.textContent).toEqual('alert("killer app");');
		expect(_.listr(['p', 'alert(\'killer app\');']).firstChild.textContent).toEqual('alert(\'killer app\');');
		expect(_.listr(['p', 'new String(\'boomerang\')']).firstChild.textContent).toEqual('new String(\'boomerang\')');
	});

	it('renders inline elements as expected', function () {

		var el = _.listr(['p', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']);

		expect(el.firstChild.textContent).toEqual('abcdefghijk');

		el = _.listr(
			['div',
				['span', 'apple '],
				'bottom jeans, ',
				['em', 'boots with the '],
				['strong', 'furrr']
			]
		);

		expect(el.firstChild.textContent).toEqual('apple bottom jeans, boots with the furrr');

		el = _.listr(['div', 'div', 'div', 'div', 'div', 'div']);

		expect(el.firstChild.textContent).toEqual('divdivdivdivdiv');

		el = _.listr(['p', '&&&', '&', 'amp', ';', '@', '&copy;', '&lt;', '&l;', '&lt', ';']);

		expect(el.firstChild.textContent).toEqual('&&&&amp;@©<&l;&lt;');

		el = _.listr(['p', '&amp;']);

		expect(el.firstChild.textContent).toEqual('&');

		el = _.listr(['p', '&', 'amp', ';']);

		expect(el.firstChild.textContent).toEqual('&amp;');
	});

});