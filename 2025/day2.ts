import { parse } from "@std/csv/parse";
const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2026/day2.txt");
const text = new TextDecoder().decode(bytes);
const lines = parse(text, { skipFirstRow: false });

const isRepeating = (str = "") => {
  if (!str.length) {
    return false;
  }
  for (let j = 1; j <= str.length / 2; j++) {
    if (str.length % j != 0) {
      continue;
    }
    let flag = true;
    for (let i = j; i < str.length; ++i) {
      if (str[i] != str[i - j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      return true;
    }
  }
  return false;
};

let invalid = 0,
  invalid2 = 0;
const line = lines[0];

for (const one of line) {
  const range = parse(one, { separator: "-" });
  let start = parseInt(range[0][0], 10);
  const end = parseInt(range[0][1]);
  for (start; start <= end; start++) {
    const str = start.toString();
    if (
      str.length % 2 === 0 &&
      str.slice(0, str.length / 2) === str.slice(str.length / 2)
    ) {
      invalid += start;
    }
    if (isRepeating(str)) {
      invalid2 += start;
    }
  }
}

console.log(invalid.toString());

console.log(invalid2.toString());
