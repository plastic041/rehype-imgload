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
        /** @type {any} */
        // hast's Element.properties is typed as Properties | undefined,
        // but <img>'s node.properties is always created as {},
        // which is a truthy value,
        // even if it doesn't have any properties.
        const properties = node.properties;
        const isLoadingExists = !!properties.loading;
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
