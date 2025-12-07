import { memoize, LruCache, type MemoizationCacheResult } from "@std/cache";
const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2025/testset.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n").map((line) => line.trim());
const start = lines[0].indexOf("S");

const cache = new LruCache<string, MemoizationCacheResult<number>>(1000);

const rec = memoize(
  (x: number, y: number): number => {
    if (!(0 <= x && x < lines.length) || !(0 <= y && y < lines[0].length))
      return 1;
    return lines[x][y] !== "^" ? rec(x + 1, y) : rec(x, y + 1) + rec(x, y - 1);
  },
  { cache },
);
const res = rec(0, start);
console.log(res);
