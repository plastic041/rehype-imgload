import rehypeImgLoad from "../dist/lib/index.js";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { test, expect } from "bun:test";

test("overwrite=true && mode='lazy'", () => {
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: true, mode: "lazy" })
    .use(rehypeStringify)
    .process(
      '<img src="cat.png"><img src="cat.png" loading="eager">',
      (error, file) => {
        expect(error).toBe(undefined);
        expect(String(file)).toBe(
          '<img src="cat.png" loading="lazy"><img src="cat.png" loading="lazy">'
        );
      }
    );
});

test("overwrite=true && mode='eager'", () => {
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: true, mode: "eager" })
    .use(rehypeStringify)
    .process(
      '<img src="cat.png"><img src="cat.png" loading="lazy">',
      (error, file) => {
        expect(error).toBe(undefined);
        expect(String(file)).toBe(
          '<img src="cat.png" loading="eager"><img src="cat.png" loading="eager">'
        );
      }
    );
});

test("overwrite=false && mode='lazy'", () => {
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: false, mode: "lazy" })
    .use(rehypeStringify)
    .process(
      '<img src="cat.png"><img src="cat.png" loading="eager">',
      (error, file) => {
        expect(error).toBe(undefined);
        expect(String(file)).toBe(
          '<img src="cat.png" loading="lazy"><img src="cat.png" loading="eager">'
        );
      }
    );
});

test("overwrite=false && mode='eager'", () => {
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: false, mode: "eager" })
    .use(rehypeStringify)
    .process(
      '<img src="cat.png"><img src="cat.png" loading="lazy">',
      (error, file) => {
        expect(error).toBe(undefined);
        expect(String(file)).toBe(
          '<img src="cat.png" loading="eager"><img src="cat.png" loading="lazy">'
        );
      }
    );
});
