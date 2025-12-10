const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2025/day8.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n").map((line) => line.trim());

type Vec3 = {
  x: number;
  y: number;
  z: number;
};

let arr: Vec3[] = [];
for (const line of lines) {
  const split = line.split(",");
  const vec: Vec3 = {
    x: Number(split[0]),
    y: Number(split[1]),
    z: Number(split[2]),
  };
  arr = arr.concat(vec);
}

function sub(v: Vec3, v1: Vec3): Vec3 {
  return { x: v.x - v1.x, y: v.y - v1.y, z: v.z - v1.z };
}

function len(v: Vec3): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

let shortest = 10000000;
let networks = new Map<number, Set<Vec3>>();
for (const i of arr) {
  for (const j of arr) {
    if (i === j) continue;
    const vec = sub(i, j);
    const cmp = len(vec);
    if (shortest > cmp) {
      shortest = cmp;
    }
  }
}

console.log(shortest);
