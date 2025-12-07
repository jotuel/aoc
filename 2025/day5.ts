const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2025/day5.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n").map((line) => line.trim());

const areOverlapping = (a: [number, number], b: [number, number]) =>
  b[0] <= a[0] ? b[1] >= a[0] : b[0] <= a[1];

const ranges: Array<[number, number]> = [];
let rememberLine = 0;
for (const line of lines) {
  rememberLine++;
  if (!line.length) break;
  const range = line.split("-").map((part) => part.trim());
  ranges[rememberLine] = [parseInt(range[0]), parseInt(range[1])];
}

ranges.sort((a, b) => a[0] - b[0]);

for (let i = 0; i < ranges.length - 1; i++) {
  if (!ranges[i + 1]) break;
  while (areOverlapping(ranges[i], ranges[i + 1])) {
    ranges[i][1] = Math.max(ranges[i][1], ranges[i + 1][1]);
    ranges.splice(i + 1, 1);
    if (!ranges[i + 1]) break;
  }
}

let part1 = 0;
let part2 = 0;

while (lines[rememberLine]) {
  const nbr = parseInt(lines[rememberLine], 10);
  for (const range in ranges) {
    if (nbr >= ranges[range][0] && nbr <= ranges[range][1]) {
      part1 += 1;
      break;
    }
  }
  rememberLine++;
}
part2 = ranges.reduce((acc, range) => acc + (range[1] - range[0] + 1), 0);
console.log(ranges);
console.log("Part 1:", part1);
console.log("Part 2:", part2);
