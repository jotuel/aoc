const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2025/day3.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n").map((line) => line.trim());

let res1 = 0;
let res2 = 0n;

function findLargestNumber(numStr: string, targetLen: number): string {
  let result = "";
  let start = 0;

  while (result.length < targetLen && start < numStr.length) {
    const need = targetLen - result.length;
    const lastIndex = numStr.length - need;
    if (lastIndex < start) break;

    let bestChar = "";
    let bestPos = start;
    for (let i = start; i <= lastIndex; i++) {
      const ch = numStr[i];
      if (ch > bestChar) {
        bestChar = ch;
        bestPos = i;
        if (bestChar === "9") break;
      }
    }

    if (!bestChar) break;
    result += bestChar;
    start = bestPos + 1;
  }

  return result;
}

for (const line of lines) {
  if (!line[0]) continue;
  const result = findLargestNumber(line, 12);
  res2 += BigInt(parseInt(result, 10));
  res1 += parseInt(findLargestNumber(line, 2));
}
console.log(res1);
console.log(res2.toString());
