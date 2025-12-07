const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2025/day7.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n").map((line) => line.trim());
const start = lines[0].indexOf("S");
const set = new Set<[number, number]>();
console.log(start, lines);
function lightsOn(y: number, x: number): number {
  if (lines[y][x] === "^") {
    if (set.has([y, x + 1]) && set.has([y, x - 1])) {
      return 0;
    } else if (set.has([y, x + 1])) {
      return lightsOn(y, x - 1);
    } else if (set.has([y, x - 1])) {
      return lightsOn(y, x + 1);
    } else {
      return lightsOn(y, x + 1) + lightsOn(y, x - 1);
    }
  } else set.add([y, x]);
  return y + 1 < lines.length ? lightsOn(y + 1, x) : 1;
}

let res = 1;
res += lightsOn(1, start) / 2;
console.log(res, set);
