const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2026/day7.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n").map((line) => line.trim());
