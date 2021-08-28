# rehype-imgload

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/plastic041/rehype-imgload/Node.js%20Package)
![npm bundle size](https://img.shields.io/bundlephobia/min/rehype-imgload)
![Codecov](https://img.shields.io/codecov/c/github/plastic041/rehype-imgload)

Rehype plugin to add `loading` property into `<img>` tags.

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
  .use(rehypeImgLoad)
  .use(rehypeStringify);

const output = processor.processSync(
  '<img src="/example.jpg"><img src="/example.jpg" loading="eager">'
);
console.log(output.toString());
// '<img src="/example.jpg" loading="lazy"><img src="/example.jpg" loading="eager">'
// loading="eager" is not changed because default overwrite option is false.
// pass { overwrite: true } option to overwrite existing loading property.
```

## API

This package exports no identifiers. Default export is `rehypeImgLoad`.

### `unified().use(rehypeImgLoad[, options])`

All options are optional.

###### `options.overwrite`

`boolean`. default=`false`

- If `false`, existing `loading` properties will remain unchanged.
- If `true`, all `loading` properties will be overwritten to `loading=options.mode`(see below).

###### `options.mode`

`"lazy" | "eager"`, default=`"lazy"`

Indicates how the browser should load the image. [MDN Reference](https://developer.mozilla.org/docs/Web/HTML/Element/img#attr-loading)

## LICENSE

MIT
