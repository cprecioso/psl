import { PSLTree, ResultKey } from "@cprecioso/psl-types";
import type http from "http";
import https from "https";
import { PSL_URL } from "./psl";
import { processPsl } from "./psl-process";

const buildObj = (obj: PSLTree, path: string[], value: boolean): void => {
  if (path.length === 0) throw new Error("Empty path");

  let currentObj = obj;
  let currentPath = path;
  while (true) {
    const [child, ...rest] = currentPath;
    currentObj = (currentObj[child] ??= {}) as PSLTree;
    if (rest.length === 0) {
      currentObj[ResultKey] = value;
      return;
    }
    currentPath = rest;
  }
};

export const fetchPSLTree = async () => {
  const rawList = await new Promise<http.IncomingMessage>((f) =>
    https.get(PSL_URL, (res) => f(res))
  );
  const tree: PSLTree = {};

  for await (const line of processPsl(rawList)) {
    const lineStr = line.toString("utf-8");
    const isException = lineStr.startsWith("!");

    const components = (isException ? lineStr.slice(1) : lineStr)
      .split(".")
      .reverse();

    buildObj(tree, components, !isException);
  }

  return tree;
};
