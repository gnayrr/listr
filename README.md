#lodash.listr v0.2.1
A Lo-Dash mixin for generating DOM elements

###Overview

listr helps you create DOM elements. Everything you already know about DOM elements, like `className`, `tagName`, `id`, `title`, `spellcheck`, etc, are available to you as-is. I didn't want to learn a bunch of new API and methods, so I created listr (ironic, I know). I hope you find it as intuitive as I do.

It works in both the client and the server (with Node.js and something like phantom or jsdom).

####Example
> Fore more examples with live output, [check here](//gnayrr.github.io/listr "listr Page")

```js

// Creates an H1 element
_.listr(['h1', 'Title TK']);


// Creates an image
_.listr(['img', {src: '//url.to/image.png', alt: 'Some Image'}]);


// Creates an HTML5 proper article structure
_.listr(
  ['article',
    ['header',
      ['h1', 'Title TK'],
      ['p', 'Subtitle STK']
    ],
    ['blockquote', 'quote text 123'],
    ['p', 'text 123']
  ]
);

```

###Getting Started

You need [lodash](http://lodash.com "lodash.com"). Once lodash and listr are loaded:

```js
_.mixin({

  listr : listr
  
});
```

Yes you can actually rename it by replace `listr : listr` with anything else, like `lust : listr`, or `gen : listr`. If you're using listr on the server side, you should also provide a `Document object`. Check the short API document below for how to do that.

###API

####`_.listr(parameter:Array) :DocumentFragment`

Returns a DOM fragment containing the DOM elements created by listr. The `parameter` passed in should conform to the lis syntax.

> ###*lis*
> For lack of imagination, I'm calling this syntax *lis*. This is what *lis* looks like:

> `[string:required, object, string, array, [,array]]`

> #####Example
> ```js
> ['div']

> ['div', 'Show Information']

> ['div', {className: 'information'}, 'Show Information']

> ['div', {className: 'information'}, 'Show Information', ['div', 'piece']]
> ````

> ```js
> ['ul']

> ['ul',
>   ['li', 'item 1'],
>   ['li', 'item 2'],
>   ['li', {className: 'current'}, 'item 3']
> ]

> ['ol', {className: 'square-list'},
>   ['li', 'item 1'],
>   ['li', 'item 2'],
>   ['li', 'item 3']
> ]

> //Same as above
> ['ol', {className: 'square-list'},
>   [
>     ['li', 'item 1'],
>     ['li', 'item 2'],
>     ['li', 'item 3']
>   ]
> ]
> ````

> As illustrated by the `ol` list above, you can always substitute a single *lis* with a array of *lis*.

> ```js
> [
>   ['p', 'Lorem'],
>   ['p', 'Ipsum'],
>   ['p', 'The Place Promised in Our Early Days']
> ]
> ````
> 


####`_.listr('document', parameter:Document) :Boolean`

If an object is passsed as the `parameter`, it is used as the document object. Otherwise nothing is changed. In either case, the return value is the value returned by `_.listr('ready')`.

####`_.listr('ready') :Boolean`

Returns `true` or `false` for whether listr is ready for work. This is determined by three conditions:

1. it has a document object
2. the document object has the `createElement` method
3. the document object has the `createDocumentFragment` method

####`_.listr('version') :String`

Returns the version of the currently loaded listr.

###Status
The API is unlikely to change, though more options may be added until a major release. Do you have recommendations? Please contribute!


