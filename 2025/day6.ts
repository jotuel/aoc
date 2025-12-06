const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2026/day6.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n");

const part1 = new Array<number>(lines[lines.length - 1].length).fill(0);
let part2 = new Array<number>(lines[lines.length - 1].length).fill(0);
let index = 0;

for (let i = 0; lines[lines.length - 1][i]; i++) {
  switch (lines[lines.length - 1][i]) {
    case "+":
      for (const line of lines) {
        if (!line[i] || line[i] === "+") break;
        part1[index] += parseInt(line.slice(i));
      }
      index++;
      break;
    case "*":
      part1[index] = 1;
      for (const line of lines) {
        if (!line[i] || line[i] === "*") break;
        part1[index] *= parseInt(line.slice(i));
      }
      index++;
      break;
    default:
      break;
  }
}
let res = 0;
for (const nbr of part1) {
  res += nbr;
}
console.log(res);
