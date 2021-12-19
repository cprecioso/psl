import { PSL_ENC } from "../psl";

export const onlyData = async function* (lines: AsyncIterable<Buffer>) {
  for await (const line of lines) {
    const commentFound = line.indexOf(COMMENT_BUF);
    const whitespaceFound = line.indexOf(WHITESPACE_BUF);
    const commentOffset = commentFound === -1 ? line.length : commentFound;
    const whitespaceOffset =
      whitespaceFound === -1 ? line.length : whitespaceFound;
    const sliceOffset = Math.min(commentOffset, whitespaceOffset);
    const dataBuf = line.slice(0, sliceOffset);
    if (dataBuf.length > 0) yield dataBuf;
  }
};
const COMMENT_BUF = Buffer.from("//", PSL_ENC);
const WHITESPACE_BUF = Buffer.from(" ", PSL_ENC);
