import { onlyData } from "./onlyData";
import { splitLines } from "./splitLines";

export const processPsl = (rawList: AsyncIterable<Buffer>) =>
  onlyData(splitLines(rawList));
