const bytes = await Deno.readFile("/home/jwnz/Git/aoc/2025/day9.txt");
const text = new TextDecoder().decode(bytes);
const lines = text.split("\n").map((line) => line.trim());

type Point = {
  x: number;
  y: number;
};

let points: Point[] = [];

for (const line of lines) {
  if (line.length < 3) break;
  const l = line.split(",");
  const p: Point = { x: Number(l[0]), y: Number(l[1]) };
  points = points.concat(p);
}

function comparePoints(p: Point, p1: Point, largest: number): boolean {
  if ((Math.abs(p.x - p1.x) + 1) * (Math.abs(p.y - p1.y) + 1) > largest)
    return true;
  return false;
}

function hasPointInside(p: Point, p1: Point): boolean {
  for (const point of points) {
    if (point.x > p1.x && point.x < p.x)
      if (
        p.y > p1.y
          ? point.y > p1.y && point.y < p.y
          : point.y > p.y && point.y < p1.y
      )
        return true;
  }
  return false;
}

let res = 0;
let res1 = 0;
for (const p of points) {
  for (const p1 of points) {
    if (comparePoints(p, p1, res))
      res = (Math.abs(p.x - p1.x) + 1) * (Math.abs(p.y - p1.y) + 1);
    if (p.x > p1.x ? !hasPointInside(p, p1) : !hasPointInside(p1, p))
      if (comparePoints(p, p1, res1))
        res1 = (Math.abs(p.x - p1.x) + 1) * (Math.abs(p.y - p1.y) + 1);
  }
}
console.log(res, res1);

res = 0;
