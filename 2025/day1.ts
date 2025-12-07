const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2025/day1.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n").map((line) => line.trim());

let dial = 50;
let part1 = 0;
let part2 = 0;

for (const line of lines) {
  const numLine = line.slice(1);
  const num = parseInt(numLine, 10);
  if (line[0] === "R") dial += num;
  else dial -= num;
  if (dial % 100 === 0) {
    part1 += 1;
  }
}

dial = 50;

for (const line of lines) {
  const numLine = line.slice(1);
  console.log(numLine, dial);
  let num = parseInt(numLine, 10);
  while (num > 100) {
    part2 += 1;
    num -= 100;
  }

  const bool = dial === 0;
  if (line[0] === "R") dial += num;
  else dial -= num;
  if (dial > 99) {
    dial -= 100;
    part2 += 1;
  } else if (dial < 0) {
    dial += 100;
    if (!bool) part2 += 1;
  } else if (dial === 0) {
    part2 += 1;
  }
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);

/*
The dial is rotated L68 to point at 82; during this rotation, it points at 0 once.
The dial is rotated L30 to point at 52.
The dial is rotated R48 to point at 0.
The dial is rotated L5 to point at 95.
The dial is rotated R60 to point at 55; during this rotation, it points at 0 once.
The dial is rotated L55 to point at 0.
The dial is rotated L1 to point at 99.
The dial is rotated L99 to point at 0.
The dial is rotated R14 to point at 14.
The dial is rotated L82 to point at 32; during this rotation, it points at 0 once.
*/
