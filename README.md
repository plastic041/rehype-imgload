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
  .use(rehypeImgLoad)
  .use(rehypeStringify);

const output = processor.processSync('<img src="/example.jpg">');
console.log(output.toString());
// '<img src="/example.jpg" loading="lazy">'
```

## API

Default export is `rehypeImgLoad`.

### `unified().use(rehypeImgLoad[, options])`

###### `options.overwrite`

`boolean`. default: `false`

if `true`, `loading="eager"` will be overwritten to `loading="lazy"`.

## LICENCE

MIT
