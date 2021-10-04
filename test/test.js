import rehypeImgLoad from "../index.js";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import test from "tape";
import { unified } from "unified";
import { visit } from "unist-util-visit";

test("rehypeImgLazy", (t) => {
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: true, mode: "lazy" })
    .use(rehypeStringify)
    .process(
      '<img src="cat.png"><img src="cat.png" loading="eager">',
      (error, file) => {
        t.deepEqual(
          [error, String(file)],
          [
            null,
            '<img src="cat.png" loading="lazy"><img src="cat.png" loading="lazy">',
          ],
          "overwrite=true && mode='lazy'"
        );
      }
    );

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: true, mode: "eager" })
    .use(rehypeStringify)
    .process(
      '<img src="cat.png"><img src="cat.png" loading="lazy">',
      (error, file) => {
        t.deepEqual(
          [error, String(file)],
          [
            null,
            '<img src="cat.png" loading="eager"><img src="cat.png" loading="eager">',
          ],
          "overwrite=true && mode='eager'"
        );
      }
    );

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: false, mode: "lazy" })
    .use(rehypeStringify)
    .process(
      '<img src="cat.png"><img src="cat.png" loading="eager">',
      (error, file) => {
        t.deepEqual(
          [error, String(file)],
          [
            null,
            '<img src="cat.png" loading="lazy"><img src="cat.png" loading="eager">',
          ],
          "overwrite=false && mode='lazy'"
        );
      }
    );

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: false, mode: "eager" })
    .use(rehypeStringify)
    .process(
      '<img src="cat.png"><img src="cat.png" loading="lazy">',
      (error, file) => {
        t.deepEqual(
          [error, String(file)],
          [
            null,
            '<img src="cat.png" loading="eager"><img src="cat.png" loading="lazy">',
          ],
          "overwrite=false && mode='eager'"
        );
      }
    );

  unified()
    .use(rehypeParse, { fragment: true })
    .use(() => {
      return (tree) => {
        visit(tree, "element", (node) => {
          if (node.tagName === "img") {
            node.properties = undefined;
          }
        });
      };
    })
    .use(rehypeImgLoad)
    .use(rehypeStringify)
    .process("<img>", (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [null, '<img loading="lazy">'],
        "Element.Properties === undefined"
      );
    });

  t.end();
});
