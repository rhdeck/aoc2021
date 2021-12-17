const data17 = "target area: x=102..157, y=-146..-90";
const demo17 = "target area: x=20..30, y=-10..-5";

const [[x0, x1], [y0, y1]] = data17
  .split(":")
  .pop()!
  .trim()
  .split(",")
  .map((s) =>
    s
      .trim()
      .split("=")
      .pop()!
      .trim()
      .split("..")
      .map((n) => parseInt(n))
  );
const inTarget = (x: number, y: number) =>
  x >= x0 && x <= x1 && y >= y0 && y <= y1;
const passedTarget = (x: number, y: number) =>
  x > Math.max(x1, x0) || y < Math.min(y1, y0);

const doesHit = (
  x: number,
  y: number,
  originX: number = 0,
  originY: number = 0
): boolean => {
  const posX = originX + x;
  const posY = originY + y;
  //   console.log("New position", posX, posY);
  if (inTarget(posX, posY)) {
    return true;
  }
  if (passedTarget(posX, posY)) return false;
  return doesHit(Math.max(0, x - 1), y - 1, posX, posY);
};
const maxHeight = (y: number): number => {
  if (y < 0) return 0;
  return Array(y)
    .fill(0)
    .reduce((a, _, index) => a + index + 1, 0);
};

const testValues = (x: number, y: number) => {
  if (doesHit(x, y)) {
    return maxHeight(y);
  }
  return -1;
};
let testx = 0;
let testy = 0;
let maxY = 0;
let hits = 0;
Array(1000)
  .fill(1)
  .forEach((_, x) =>
    Array(1000)
      .fill(1)
      .forEach((_, y) => {
        (y === 0 ? [1] : [1, -1]).forEach((multiplier) => {
          const test = testValues(x, y * multiplier);
          if (test > -1) {
            hits = hits + 1;
          }
          if (test > maxY) {
            maxY = test;
            testx = x;
            testy = y;
          }
        });
      })
  );
console.log("Part1", maxY);
console.log("Part2", hits);
