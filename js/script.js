$(document).ready(function () { 'use strict';

	_.mixin({listr: listr});

	if (!_.listr('ready')) { console.log('listr not ready');}


	hljs.configure({tabReplace: '    '});

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
			text: 'Simple nested elements.'
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
			text: 'Creating multiple elements at once.'
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
			text: 'Automatic escaping of special characters'
		},
		{
			lis: function () {

				return _.listr(
					[
						['div', {id: 'special-k'}, 'Click me and see an alert!'],
						['script', '$("#special-k").on("click", function () { alert("clicked " + this.tagName); });']
					]
				);
			},
			text: 'SCRIPT tags are not escaped, which allow you to include inline JavaScript'
		},		
		{
			lis: function () {

				return _.listr(
					[
						['img', {title: 'Metropolis', alt: 'Image', src: '//buzzdixon.com/wp-content/uploads/2011/09/metropolis025.jpg'}],
					]
				);
			},
			text: 'Creating images is easy too.'
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
			text: 'A simple table'
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
			text: 'An ordered list and a nested list'
		},
		{
			lis: function () {
				return _.listr(
					['form',
						['input', {type: 'text', placeholder: 'Name', spellcheck: false}],
						['input', {type: 'email', placeholder: 'Email Address'}],
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
						['button', 'Don&rsquo;t Click Me']
					]
				);
			},
			text: 'Easily created forms too!'
		}

	];

	_.each(examples, function (obj, i) {

		var n = i + 1;

		var $el = $(_.listr(

			['article', {id: n},
				['header',
					['h2', 'Example ' + n],
					['p', obj.text || '']
				],
				['pre',
					['code', strip(obj.lis)]
				],
				['section']
			]
		));

		$el.appendTo('#examples');

		$('#' + n).find('section').append(obj.lis());
	});

});

hljs.initHighlightingOnLoad();

function strip (func) {

	var str = _.escape(func.toString().replace(/\s*[\'\"]use strict[\'\"];?\s*(?=[\n\r])/gi, ''));

	str = str.replace(/function\s*[\S]*?\s*\(\)\s*?\{/i, '')
				.replace(/\}$/i,'')
				.replace(/^\s*[\n\r]/,'')
				.replace(/[\n\r]\s*$/, '')
				.replace(/return\s*/,'')
				.replace(/\t\t\t(\t*)/g,'$1');
				// .replace(/\t(\t*)/g,'$1');

	return str;
}