/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 *
 * @typedef Options
 * @property {boolean} [overwrite=false]
 **/

import { visit } from "unist-util-visit";

/**
 * @type {import('unified').Plugin<[Options] | void[], Root>}
 */
export default function rehypeImgLoad(option) {
  const setting = {
    overwrite: false,
    ...option,
  };

  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "img") {
        const isLoadingExists = !!node.properties?.loading;
        if (setting.overwrite || !isLoadingExists) {
          // if (overwrite is true) then overwrite the loading attribute
          // if (overwrite is false) then only add loading attribute if it doesn't exist
          node.properties = {
            ...node.properties,
            loading: "lazy",
          };
        }
      }
    });
  };
}
