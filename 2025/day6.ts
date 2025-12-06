const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2025/day6.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n");
const ops = lines.pop()!;

const longest = lines.reduce((max, line) => Math.max(max, line.length), 0);

const part1 = new Array<number>(lines[lines.length - 1].length).fill(0);
const part2 = new Array<number>(lines[lines.length - 1].length).fill(0);
let opsArr: string[] = [];
let index = 0;

for (let i = 0; i < longest; i++) {
  switch (ops[i]) {
    case "+":
      for (const line of lines) {
        part1[index] += parseInt(line.slice(i));
        if (isNaN(parseInt(line.at(i)!))) continue;
        part2[i] *= 10;
        part2[i] += parseInt(line[i]);
      }
      opsArr.push(ops[i]);
      index++;
      break;
    case "*":
      part1[index] = 1;
      for (const line of lines) {
        part1[index] *= parseInt(line.slice(i));
        if (isNaN(parseInt(line.at(i)!))) continue;
        part2[i] *= 10;
        part2[i] += parseInt(line[i]);
      }
      index++;
      opsArr.push(ops[i]);
      break;
    default:
      for (const line of lines) {
        if (isNaN(parseInt(line.at(i)!))) continue;
        part2[i] *= 10;
        part2[i] += parseInt(line[i]);
      }
      break;
  }
}

let res = 0;
for (const nbr of part1) {
  res += nbr;
}
console.log(res);

let res1 = 0;
opsArr = opsArr.reverse();
let bool = opsArr.pop() === "+" ? true : false;
let res2 = bool ? 0 : 1;
let next = true;
for (const nbr of part2) {
  if (next && nbr) bool ? (res2 += nbr) : (res2 *= nbr);
  else if (nbr) {
    next = true;
    bool = opsArr.pop() === "+" ? true : false;
    bool ? (res2 = 0) : (res2 = 1);
    bool ? (res2 += nbr) : (res2 *= nbr);
  } else {
    next = false;
    res1 += res2;
    res2 = 0;
  }
}
res1 += res2;
if (!opsArr.at(0)) console.log(res1);
