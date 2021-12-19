// @ts-check

import { fetchPSLTree } from "@cprecioso/psl-fetch";
import virtual from "@rollup/plugin-virtual";
import ts from "rollup-plugin-ts";

const js = String.raw;

export default (async () => {
  const pslData = await fetchPSLTree();

  return /** @type {import("rollup").RollupOptions} */ ({
    input: "src/index.ts",
    output: [
      { dir: "dist", format: "cjs", entryFileNames: "[name].cjs" },
      { dir: "dist", format: "esm", entryFileNames: "[name].mjs" },
    ],
    plugins: [
      virtual({
        __DATA__: js`export default (${JSON.stringify(pslData)});`,
      }),
      ts({
        typescript: require("typescript"),
        transpiler: "swc",
      }),
    ],
  });
})();
