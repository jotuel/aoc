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
for (let added = 0; added < 1000; added++) {
  let shortest = 10000000;
  let v: Vec3 = { x: 0, y: 0, z: 0 },
    v1: Vec3 = { x: 0, y: 0, z: 0 };
  for (const i of arr) {
    for (const j of arr) {
      if (i === j) continue;
      const vec = sub(i, j);
      const cmp = len(vec);
      if (shortest > cmp && !establishedConnectionDist.has(cmp)) {
        shortest = cmp;
        v = i;
        v1 = j;
      }
    }
  }
  establishedConnectionDist.add(shortest);
  let bool = false;
  for (let k = 0; k < networks.size; k++) {
    if (networks.get(k)?.has(v) || networks.get(k)?.has(v1)) {
      networks.get(k)?.add(v);
      networks.get(k)?.add(v1);
      bool = true;
      break;
    }
  }
  if (!bool) {
    networks.set(networks.size, new Set<Vec3>());
    networks.get(networks.size - 1)?.add(v);
    networks.get(networks.size - 1)?.add(v1);
  }
}

const a = networks.values().toArray();
a.forEach((b) =>
  b.forEach((v) => {
    a.forEach((c) => {
      if (c.has(v)) {
        c.forEach(b.add, b);
      }
    });
  }),
);

a.forEach((b) => console.log(b.size));
