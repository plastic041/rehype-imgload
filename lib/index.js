/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 *
 * @typedef Options
 * @property {boolean} [overwrite=false]
 * @property {"lazy" | "eager"} [mode="lazy"]
 **/

import { visit } from "unist-util-visit";

/**
 * @type {import('unified').Plugin<[Options] | void[], Root, Root>}
 */
export default function rehypeImgLoad(option) {
  const setting = {
    overwrite: false,
    mode: "lazy",
    ...option,
  };

  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "img") {
        /** @type {any} */
        // hast's Element.properties is typed as Properties | undefined,
        // but rehype-parse parses <img>'s node.properties as {}
        // when <img> doen't have any properties.
        // And {} is a truthy value,
        // means if node.tagName === "img", node.properties always exists.
        // so we need to use 'any' here to avoid typeerror.
        const properties = node.properties;
        const isLoadingExists = !!properties.loading;
        if (setting.overwrite || !isLoadingExists) {
          // if (overwrite is true) then overwrite the loading attribute
          // if (overwrite is false) then only add loading attribute if it doesn't exist
          node.properties = {
            ...node.properties,
            loading: setting.mode,
          };
        }
      }
    });
  };
}
