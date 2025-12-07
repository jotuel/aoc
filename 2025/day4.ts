const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2025/day4.txt");
const text = new TextDecoder().decode(bytes);
let lines = text.split("\n").map((line) => line.trim());

let result = 0;
let previousResult = -1;
let bool = false;

while (previousResult < result) {
  previousResult = result;
  const newLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "@") {
        let neighbors = 0;
        if (j != 0 && j != line.length - 1 && i != 0 && i < lines.length - 1) {
          let k = i - 1;
          while (k <= i + 1) {
            let l = j - 1;
            while (l <= j + 1) {
              if (lines[k][l] === "@" && !(k == i && l == j)) {
                neighbors += 1;
              }
              l += 1;
            }
            k += 1;
          }
          if (neighbors < 4) ((result += 1), (newLines[i] += "x"));
          else newLines[i] += "@";
        } else if (j == 0 && i == 0) {
          ((result += 1), (newLines[i] += "x"));
        } else if (j == line.length - 1 && i == 0) {
          ((result += 1), (newLines[i] += "x"));
        } else if (j == 0 && i == lines.length - 1) {
          ((result += 1), (newLines[i] += "x"));
        } else if (j == line.length - 1 && i == lines.length - 1) {
          ((result += 1), (newLines[i] += "x"));
        } else if (i == 0) {
          if (lines[i][j - 1] === "@") neighbors += 1;
          if (lines[i][j + 1] === "@") neighbors += 1;
          let l = j - 1;
          while (l <= j + 1) {
            if (lines[i + 1][l] === "@") neighbors += 1;
            ++l;
          }
          if (neighbors < 4) ((result += 1), (newLines[i] += "x"));
          else newLines[i] += "@";
        } else if (i == lines.length - 1) {
          if (lines[i][j - 1] === "@") neighbors += 1;
          if (lines[i][j + 1] === "@") neighbors += 1;
          let l = j - 1;
          while (l <= j + 1) {
            if (lines[i - 1][l] === "@") neighbors += 1;
            l++;
          }
          if (neighbors < 4) ((result += 1), (newLines[i] += "x"));
          else newLines[i] += "@";
        } else if (j == 0) {
          if (lines[i - 1][j] === "@") neighbors += 1;
          if (lines[i + 1][j] === "@") neighbors += 1;
          let k = i - 1;
          while (k <= i + 1) {
            if (lines[k][j + 1] === "@") neighbors += 1;
            ++k;
          }
          if (neighbors < 4) ((result += 1), (newLines[i] += "x"));
          else newLines[i] += "@";
        } else if (j == line.length - 1) {
          if (lines[i - 1][j] === "@") neighbors += 1;
          if (lines[i + 1][j] === "@") neighbors += 1;
          let k = i - 1;
          while (k <= i + 1) {
            if (lines[k][j - 1] === "@") neighbors += 1;
            k++;
          }
          if (neighbors < 4) ((result += 1), (newLines[i] += "x"));
          else newLines[i] += "@";
        }
      } else {
        newLines[i] += ".";
      }
    }
  }
  lines = newLines;
  if (!bool) {
    console.log(result);
    bool = !bool;
  }
}
console.log(result);
