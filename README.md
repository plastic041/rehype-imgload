# rehype-imgload

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/plastic041/rehype-imgload/Node.js%20Package)
![npm bundle size](https://img.shields.io/bundlephobia/min/rehype-imgload)
![Codecov](https://img.shields.io/codecov/c/github/plastic041/rehype-imgload)

Rehype plugin for adding `loading` property of `<img>` tags.

Currently supports setting `loading="lazy"` only.

## Installation

```bash
$ yarn add rehype-imgload # or npm install
```

## Usage

### General Use

1. Add `loading="lazy"` to your `<img>`s.

```javascript
import rehypeImgLoad from "rehype-imgload";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

const processor = unified()
  .use(rehypeParse)
  .use(rehypeImgLoad, { overwrite: false, mode: "lazy" })
  .use(rehypeStringify);

const output = processor.processSync(
  '<img src="/example.jpg"><img src="/example.jpg" loading="eager">'
);
console.log(output.toString());
// '<img src="/example.jpg" loading="lazy"><img src="/example.jpg" loading="eager">'
// second one is still "eager", because overwrite is false
```

## API

This package exports no identifiers. Default export is `rehypeImgLoad`.

### `unified().use(rehypeImgLoad[, options])`

All options are optional.

###### `options.overwrite`

`boolean`. default=`false`

If `true`, `loading="eager"` will be overwritten to `loading="lazy"`.

###### `options.mode`

`"lazy" | "eager"`, default=`"lazy"`

Indicates how the browser should load the image. [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-loading)

## LICENCE

MIT
