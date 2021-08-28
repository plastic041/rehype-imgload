import rehypeImgLoad from "../index.js";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import test from "tape";
import { unified } from "unified";

test("rehypeImgLazy", (t) => {
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad)
    .use(rehypeStringify)
    .process('<img src="cat.png">', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [null, '<img src="cat.png" loading="lazy">'],
        "default overwrite=false && no loading"
      );
    });

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad)
    .use(rehypeStringify)
    .process('<img src="cat.png" loading="eager">', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [null, '<img src="cat.png" loading="eager">'],
        "default overwrite=false && loading"
      );
    });

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: true })
    .use(rehypeStringify)
    .process('<img src="cat.png">', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [null, '<img src="cat.png" loading="lazy">'],
        "set overwrite=true && no loading"
      );
    });

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: true })
    .use(rehypeStringify)
    .process('<img src="cat.png" loading="eager">', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [null, '<img src="cat.png" loading="lazy">'],
        "set overwrite=true && loading"
      );
    });

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: false })
    .use(rehypeStringify)
    .process('<img src="cat.png">', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [null, '<img src="cat.png" loading="lazy">'],
        "set overwrite=false && no loading"
      );
    });

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: false })
    .use(rehypeStringify)
    .process('<img src="cat.png" loading="eager">', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [null, '<img src="cat.png" loading="eager">'],
        "set overwrite=false && loading"
      );
    });

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: true })
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
          "set overwrite=true && loading and no loading"
        );
      }
    );

  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeImgLoad, { overwrite: false })
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
          "set overwrite=false && loading and no loading"
        );
      }
    );

  t.end();
});
