import { data as pslData, PSLTree, ResultKey } from "@cprecioso/psl-data";

export const checkDomain = (hostname: string) => {
  const parts = hostname.toLowerCase().split(".").reverse();
  if (parts.length === 0) throw new Error("Empty hostname");
  if (parts.includes(ResultKey))
    throw new Error("Can't work with this hostname");

  let tree = pslData;
  const publicParts = [];

  while (true) {
    const currentPart = parts[0];
    const currentTree = (tree[currentPart] ?? tree["*"]) as PSLTree | undefined;

    const isPublic = currentTree?.[ResultKey] ?? publicParts.length === 0;

    if (isPublic) {
      publicParts.unshift(parts.shift());
      tree = currentTree!;
      continue;
    } else {
      break;
    }
  }

  return {
    publicParts: publicParts.join("."),
    privateParts: parts.reverse().join("."),
  };
};
