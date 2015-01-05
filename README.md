# markdown-it-hashtag

> hashtag (`#tag`) plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

`#hashtag` => `<a class="tag" href="/tags/hashtag">#hashtag</a>`

## Install

node.js, browser:

```bash
npm install markdown-it-hashtag --save
bower install markdown-it-hashtag --save
```

## Use

#### Basic

```js
var md = require('markdown-it')()
            .use(require('markdown-it-hashtag'));

md.render('#hashtag'); // => '<p><a class="tag" href="/tags/hashtag">#hashtag</a></p>'
```

_Differences in browser._ If you load the script directly into the page, without
package system, module will add itself globally as `window.markdownitHashtag`.

#### Advanced

You can specify the allowed chars for hashtags and the preceeding chars. You can also
modify the output of the renderer. Here is an example with default values:

```js
var md = require('markdown-it')()
            .use(require('markdown-it-hashtag'),{
              preceedingChar: /\s/, // defines allowed preceeding chars
              hashtagChar:    /\w/  // defines allowed chars for hashtags
            });

md.renderer.rules.hashtag_open  = function(tokens, idx) {
  var tagName = tokens[idx].content.toLowerCase(); 
  return '<a class="tag" href="/tags/' + tagName + '">';
}

md.renderer.rules.hashtag_text  = function(tokens, idx) {
  return '#' + tokens[idx].content;
}

md.renderer.rules.hashtag_close = function { return '</a>'; }

md.render('#hashtag'); // => '<p><a class="tag" href="/tags/hashtag">#hashtag</a></p>'
```

## License

[MIT](https://github.com/svbergerem/markdown-it-hashtag/blob/master/LICENSE)