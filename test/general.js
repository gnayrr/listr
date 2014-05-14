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

	it('is version 0.2.1', function () {

		expect(_.listr('version')).toEqual('0.2.1');
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