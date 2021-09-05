/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Properties} Properties
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
        // @ts-ignore <img>.properties is never 'undefined'.
        const isLoadingExists = node.properties.loading;
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
