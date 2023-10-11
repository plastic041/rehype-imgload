// node_modules/unist-util-is/lib/index.js
var anyFactory = function(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].apply(this, parameters))
        return true;
    }
    return false;
  }
};
var propsFactory = function(check) {
  const checkAsRecord = check;
  return castFactory(all);
  function all(node) {
    const nodeAsRecord = node;
    let key;
    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key])
        return false;
    }
    return true;
  }
};
var typeFactory = function(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
};
var castFactory = function(testFunction) {
  return check;
  function check(value, index, parent) {
    return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index === "number" ? index : undefined, parent || undefined));
  }
};
var ok = function() {
  return true;
};
var looksLikeANode = function(value) {
  return value !== null && typeof value === "object" && ("type" in value);
};
var convert = function(test) {
  if (test === null || test === undefined) {
    return ok;
  }
  if (typeof test === "function") {
    return castFactory(test);
  }
  if (typeof test === "object") {
    return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
  }
  if (typeof test === "string") {
    return typeFactory(test);
  }
  throw new Error("Expected function, string, or object as test");
};
// node_modules/unist-util-visit-parents/lib/color.js
function color(d) {
  return d;
}

// node_modules/unist-util-visit-parents/lib/index.js
function visitParents(tree, test, visitor, reverse) {
  let check;
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
  } else {
    check = test;
  }
  const is2 = convert(check);
  const step = reverse ? -1 : 1;
  factory(tree, undefined, [])();
  function factory(node, index, parents) {
    const value = node && typeof node === "object" ? node : {};
    if (typeof value.type === "string") {
      const name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : undefined;
      Object.defineProperty(visit, "name", {
        value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit;
    function visit() {
      let result = empty;
      let subresult;
      let offset;
      let grandparents;
      if (!test || is2(node, index, parents[parents.length - 1] || undefined)) {
        result = toResult(visitor(node, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if (("children" in node) && node.children) {
        const nodeAsParent = node;
        if (nodeAsParent.children && result[0] !== SKIP) {
          offset = (reverse ? nodeAsParent.children.length : -1) + step;
          grandparents = parents.concat(nodeAsParent);
          while (offset > -1 && offset < nodeAsParent.children.length) {
            const child = nodeAsParent.children[offset];
            subresult = factory(child, offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
      }
      return result;
    }
  }
}
var toResult = function(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return value === null || value === undefined ? empty : [value];
};
var empty = [];
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
// node_modules/unist-util-visit/lib/index.js
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
  let reverse;
  let test;
  let visitor;
  if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
    test = undefined;
    visitor = testOrVisitor;
    reverse = visitorOrReverse;
  } else {
    test = testOrVisitor;
    visitor = visitorOrReverse;
    reverse = maybeReverse;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node, parents) {
    const parent = parents[parents.length - 1];
    const index = parent ? parent.children.indexOf(node) : undefined;
    return visitor(node, index, parent);
  }
}
// lib/index.ts
function rehypeImgLoad(option = {}) {
  const setting = {
    overwrite: false,
    mode: "lazy",
    ...option
  };
  return (hast) => {
    visit(hast, "element", (node) => {
      if (node.tagName === "img") {
        const isLoadingExists = node.properties && node.properties.hasOwnProperty("loading") ? node.properties.loading : false;
        if (setting.overwrite || !isLoadingExists) {
          node.properties = {
            ...node.properties,
            loading: setting.mode
          };
        }
      }
    });
  };
}
export {
  rehypeImgLoad as default
};
