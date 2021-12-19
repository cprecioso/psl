import { PSL_ENC } from "../psl";

const NEWLINE_BUF = Buffer.from("\n", PSL_ENC);
export const splitLines = async function* (stream: AsyncIterable<Buffer>) {
  let buffered: Buffer[] = [];

  const drain = function* () {
    const fullBuffer = Buffer.concat(buffered);
    if (fullBuffer.length > 0) yield fullBuffer;
    buffered = [];
  };

  for await (const buf of stream) {
    let searchBuf = buf;
    newlineSearch: while (true) {
      const offset = searchBuf.indexOf(NEWLINE_BUF);
      if (offset === -1) {
        buffered.push(searchBuf);
        break newlineSearch;
      }
      buffered.push(searchBuf.slice(0, offset));
      yield* drain();
      searchBuf = searchBuf.slice(offset + NEWLINE_BUF.length);
    }
  }
  if (buffered.length >= 0) yield Buffer.concat([...buffered]);
};
