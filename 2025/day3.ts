const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2026/day3.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n").map((line) => line.trim());

let res = 0n;
for (const line of lines) {
  if (!line[0]) continue;
  let bigest = "0";
  let on = 0;
  for (let i = 0; i < line.length; i++) {
    if (i + 12 <= line.length && line[i] > bigest[0]) {
      bigest = line[i];
      on = 1;
    } else if (i + 12 - on <= line.length && line[i] > bigest[on]) {
      bigest.concat(line[i]);
      on += 1;
    }
  }
  console.log(bigest);
  const result = bigest;
  res += BigInt(parseInt(result, 10));
}
console.log(res.toString());
