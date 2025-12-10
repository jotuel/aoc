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

let networks = new Map<number, Set<Vec3>>();
let establishedConnectionDist = new Set<number>();
for (let added = 0; added < arr.length; added++) {
  let shortest = 10000000;
  for (const i of arr) {
    for (const j of arr) {
      if (i === j) continue;
      const vec = sub(i, j);
      const cmp = len(vec);
      if (shortest > cmp && !establishedConnectionDist.has(cmp)) {
        shortest = cmp;
      }
    }
  }
  establishedConnectionDist.add(shortest);
  let bool = false;
  for (let k = 0; k < networks.size; k++) {
    if (networks.get(k)?.has(i) || networks.get(k)?.has(j)) {
      networks.get(k)?.add(i);
      networks.get(k)?.add(j);
      bool = true;
      break;
    }
  }
  if (!bool) {
    networks.set(networks.size, new Set<Vec3>());
    networks.get(networks.size - 1)?.add(i);
    networks.get(networks.size - 1)?.add(j);
  }
}

console.log(networks);
