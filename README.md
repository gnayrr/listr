##lodash.listr

listr is a lodash mixin. It produces DOM elements on the fly. It works in both the client and the server (with Node.js and something like phantom or jsdom).


#####Example

````

// Creates an H1 element
_.listr(['h1', 'Title TK']);


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

````
