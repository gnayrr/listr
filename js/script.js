$(document).ready(function () { 'use strict';

	_.mixin({listr: listr});

	if (!_.listr('ready')) { console.log('listr not ready');}

	var examples = [

		{
			lis: function () {
				return _.listr(
					['div',
						['h2', 'Slow Down'],
						['p', 'Boom box bell-bottoms']
					]
				);
			},
			text: 'Simple nested elements.',
			test: function ($el) {

				return (
					$el.children().length === 2 &&
					$el.children().first().text() === 'Slow Down' &&
					$el.children().last().text() === 'Boom box bell-bottoms'
				);
			}
		},
		{
			lis: function () {
				return _.listr(
					['article', {className: 'main'},
						['h1', 
							'After This, ', ['em', 'Arthritis '], 'Hits'
						],
						['p', 
							['strong', 'Long before '], 'the plague'
						],
						['p',
							'Then things got ',
							['em', ['strong', 'out of control']],
							' fast!'
						]
					]
				);
			},
			text: 'Easily create inline elements too.',
			test: function ($el) {

				return (
					$el.hasClass('main')	&&
					$el.prop('tagName').toLowerCase() === 'article'	&&
					$el.children().length === 3	&&
					$el.children().first().text() === 'After This, Arthritis Hits'	&&
					$el.children().last().text() === 'Then things got out of control fast!'	&&
					$el.find('em').text() === 'Arthritis out of control'	&&
					$el.find('strong').text() === 'Long before out of control'
				);
			}
		},
		{
			lis: function () {

				return _.listr(
					[
						['h1', 'A Title Before Time'],
						['h2', 'Substituting subtitles for subjects'],
						['p', 'Hey man, sup?'],
						['ul',
							['li', 'Medical'],
							['li', 'Device']
						]
					]
				);
			},
			text: 'Creating multiple elements at once.',
			test: function ($el) {

				return (
					$el.length === 4 &&
					$($el[0]).text() === 'A Title Before Time' &&
					$($el[1]).text() === 'Substituting subtitles for subjects' &&
					$($el[2]).text() === 'Hey man, sup?' &&
					$($el[3]).children().length === 2 &&
					$($el[3]).children().first().text() === 'Medical' &&
					$($el[3]).children().last().text() === 'Device'
				);
			}
		},
		{
			lis: function () {

				return _.listr(
					['ul',
						['li', '&;"'],
						['li', '&undefined;'],
						['li', '&reg;'],
						['li', '&copy;'],
						['li', '<script src="malicious.js"></script>']
					]
				);
			},
			text: 'Automatic escaping of special characters.',
			test: function ($el) {

				return (
					$el.prop('tagName').toLowerCase() === 'ul' &&
					$el.children().length === 5 &&
					$el.children().first().text() === '&;"' &&
					$($el.children()[1]).text() === '&undefined;' &&
					$($el.children()[2]).text() === '®' &&
					$($el.children()[3]).text() === '©' &&
					$($el.children()[4]).text() === '<script src="malicious.js"></script>'
				);
			}
		},
		{
			lis: function () {

				return _.listr(
					[
						['button', {id: 'special-k'}, 'Click me and see an alert!'],
						['script', '$("#special-k").on("click", function () { alert("clicked " + this.tagName); });']
					]
				);
			},
			text: 'SCRIPT tags are not escaped, allowing inline JavaScript.',
			test: function ($el) {

				return (
					$($el[0]).prop('tagName').toLowerCase() === 'button' &&
					$($el[0]).prop('id') === 'special-k' &&
					$($el[0]).text() === 'Click me and see an alert!' &&
					$($el[1]).prop('tagName').toLowerCase() === 'script'
				);
			}
		},		
		{
			lis: function () {

				return _.listr(
					['img', {title: 'Metropolis', alt: 'Image', src: 'http://buzzdixon.com/wp-content/uploads/2011/09/metropolis025.jpg'}]
				);
			},
			text: 'Creating images is easy too.',
			test: function ($el) {

				return (
					$el.prop('tagName').toLowerCase() === 'img'
				);
			}			
		},		
		{
			lis: function () {
				return _.listr(
					['table',
						['tr',
							['th', 'Header 1'],
							['th', 'Header 2'],
							['th', 'Header 3']
						],					
						['tr',
							['td', 'Cell 1'],
							['td', 'Cell 2'],
							['td', 'Cell 3']
						],
						['tr',
							['td', 'Cell 4'],
							['td', 'Cell 5'],
							['td', 'Cell 6']
						]
					]
				);
			},
			text: 'A simple table.',
			test: function ($el) {

				var pass = (
					$el.children().length === 3 &&
					$el.prop('tagName').toLowerCase() === 'table'
				);

				$el.children().each(function (i,e) {

					pass = pass && (

						$(e).children().length === 3 &&
						$(e).prop('tagName').toLowerCase() === 'tr'
					);
				});

				return pass;
			}
		},
		{
			lis: function () {
				return _.listr(
					['ol',
						['li', 'Eggs'],
						['li', 'Peanuts'],
						['li',
							['ul',
								['li', 'Monkey'],
								['li', 'Dogs'],
								['li', 'Osprey']
							]
						]
					]
				);
			},
			text: 'An ordered list with an unordered sublist.',
			test: function ($el) {

				return (
					$el.prop('tagName').toLowerCase() === 'ol' &&
					$el.children().length === 3 &&
					$($el.children()[0]).text() === 'Eggs' &&
					$($el.children()[1]).text() === 'Peanuts' &&
					$($el.children()[2]).children().first().children().length === 3
				);
			}
		},
		{
			lis: function () {
				return _.listr(
					['form',
						['input', {type: 'text', placeholder: 'Name', spellcheck: false}],
						['select', {name: 'category'},
							['option', {value: 'red'}, 'Public'],
							['option', {value: 'blue', selected: true}, 'Private'],
							['option', {value: 'blue'}, 'Unknown']
						],
						['fieldset',
							['legend', 'Options'],
							['input', {type: 'checkbox', id: 's1', name: 'options', value: 'show_this'}],
							['label', {'for':'s1'}, 'Show This'],
							['input', {type: 'checkbox', id: 's2', name: 'options', value: 'display_that'}],
							['label', {'for':'s2'}, 'Display That']
						],
						['fieldset',
							['legend', 'Settings'],
							['label', 
								['input', {type: 'radio', name: 'options-radio', value: 'y'}],
								['span', 'Yes!']
							],
							['label', 
								['input', {type: 'radio', name: 'options-radio', value: 'n'}],
								['span', 'Noooo!']
							]
						],
						['button', {disabled: true}, 'Disabled'],
						['button', 'Don\'t Click Me']
					]
				);
			},
			text: 'Create structured forms.',
			test: function ($el) {

				return (
					$el.prop('tagName').toLowerCase() === 'form' &&
					$el.children().length === 6 &&
					$el.children().first().prop('tagName').toLowerCase() === 'input' &&
					$el.children().last().prop('tagName').toLowerCase() === 'button' &&
					$($el.children()[1]).children().length === 3 &&
					$($el.children()[2]).children().length === 5 &&
					$($el.children()[3]).children().length === 3 &&
					$($el.children()[4]).prop('disabled') === true
				);
			}
		},
		{
			lis: function () {
				return _.listr(
					['span', 'a', 1, 'c', 2, true, false, 'null',
						/background/,
						['em', 'e'],
						null,
						undefined
					]
				);
			},
			text: 'Multiple inline text, numbers, boolean. Regular expressions, undefined, and null are ommitted.',
			test: function ($el) {

				return $el.text() === 'a1c2truefalsenulle';
			}
		},
		{
			lis: function () {
				return _.listr(
					['p', 
						'&amp;',
						'&lt;',
						['em', '&gt;'],
						'&&amp;&'
					]
				);
			},
			text: 'Multiple inline HTML entities and text.',
			test: function ($el) {

				return $el.text() === '&<>&&&';
			}
		},
		{
			lis: function () {
				return _.listr(
					['p', 
						['div',
							['div',
								['div',
									['div',
										['em', 'boo'],
										' far'
									],
									['div',
										['em', 'foo'],
										' bar'
									]
								]
							],
							['div',
								['div',
									['div',
										['span', '&lowbar;'],
										['span', '&ndash;'],
										['span', '-'],
										' dangerous duty'
									]
								]
							]
						]
					]
				);
			},
			text: 'Weird nesting elements.',
			test: function ($el) {

				return $el.text() === 'boo farfoo bar_–- dangerous duty';
			}
		}
	];

	_.each(examples, function (obj, i) {

		var $c = $(obj.lis()).children();

		var testPass = false;
		var untested = false;

		if (obj.test) {

			testPass = obj.test($c);
		} else {

			untested = true;
		}

		var n = i + 1;

		var $el = $(_.listr(

			['article', {id: n, className: untested? 'untested' : (testPass ? 'pass' : 'fail')},
				['header', {title: untested ? 'No Test Case' : (testPass ? '' : 'Failed Test')},
					['h2', 'Example ' + n],
					['p', obj.text || '']
				],
				['pre', {className: 'prettyprint'},
					['code', strip(obj.lis)]
				],
				['section']
			]
		));

		$el.appendTo('#examples');

		$c = $('#' + n).find('section').append(obj.lis()).children().first();
	});


	$('#test-countall').text(examples.length);
	$('#test-countran, #test-tested').text($('#examples').children().length);
	$('#test-pass').text($('#examples .pass').length);
	$('#test-fail').text($('#examples .fail').length);
	$('#test-untested').text($('#examples .untested').length);

});

try {

	/* highlightjs doesn't work for ie8, so catch the exception if it is thrown */
	hljs.initHighlightingOnLoad();
	
} catch (e) {}

function strip (func) {

	var str = _.escape(func.toString().replace(/\s*[\'\"]use strict[\'\"];?\s*(?=[\n\r])/gi, ''));

	str = str.replace(/function\s*[\S]*?\s*\(\)\s*?\{/i, '')
				.replace(/\}$/i,'')
				.replace(/^\s*[\n\r]/,'')
				.replace(/[\n\r]\s*$/, '')
				.replace(/return\s*/,'')
				.replace(/\t\t\t(\t*)/g,'$1');
				// .replace(/\t(\t*)/g,'$1');

	return str.replace(/\t/g, '   ');
}