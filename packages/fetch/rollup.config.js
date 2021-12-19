// @ts-check

import ts from "rollup-plugin-ts";

export default /** @type {import("rollup").RollupOptions} */ ({
  input: "src/index.ts",
  output: [
    { dir: "dist", format: "cjs", entryFileNames: "[name].cjs" },
    { dir: "dist", format: "esm", entryFileNames: "[name].mjs" },
  ],
  plugins: [
    ts({
      typescript: require("typescript"),
      transpiler: "swc",
    }),
  ],
});
