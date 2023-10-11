import { visit } from "unist-util-visit";

import type { Root } from "hast";

type Options = {
  overwrite?: boolean;
  mode?: "lazy" | "eager";
};

export default function rehypeImgLoad(option: Options = {}) {
  const setting = {
    overwrite: false,
    mode: "lazy",
    ...option,
  };

  return (hast: Root) => {
    visit(hast, "element", (node) => {
      if (node.tagName === "img") {
        const isLoadingExists =
          node.properties && node.properties.hasOwnProperty("loading") // check if "properties" is object, and has "loading" property
            ? node.properties.loading
            : false;
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
