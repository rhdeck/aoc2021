const data11 = `1172728874
6751454281
2612343533
1884877511
7574346247
2117413745
7766736517
4331783444
4841215828
6857766273`;

let source = data11.split("\n").map((line) => line.split("").map(Number));
const octopi = source.map((line) => line.map((n) => n));
const updateOctopus = (rowIndex: number, colIndex: number, arr: number[][]) => {
  if (rowIndex < 0) return;
  if (rowIndex >= arr.length) return;
  if (colIndex < 0) return;
  if (colIndex >= arr[0].length) return;
  if (arr[rowIndex][colIndex] > 9) return;
  arr[rowIndex][colIndex]++;
  if (arr[rowIndex][colIndex] > 9) {
    //get my neighbors and update them
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i || j) updateOctopus(rowIndex + i, colIndex + j, arr);
      }
    }
  }
};
const doStep = (octopi: number[][]): [number[][], number] => {
  let newOctopi = octopi.map((line) => line.map((n) => n));
  //Then, tick up each adjacent cell
  newOctopi.forEach((row, rowIndex, arr) =>
    row.map((_, colIndex) => {
      updateOctopus(rowIndex, colIndex, arr);
    })
  );
  //Find all my flashes and bring them down
  let flashes = 0;
  const finalOctopi = newOctopi.map((row) =>
    row.map((octopus) => {
      if (octopus > 9) {
        flashes++;
        return 0;
      } else return octopus;
    })
  );
  return [finalOctopi, flashes];
};
let part1 = octopi.map((line) => line.map((n) => n));
const flashCount = Array(100)
  .fill(0)
  .map((_, i) => {
    const [myOctopi, flashes] = doStep(part1);
    part1 = myOctopi;
    return flashes;
  })
  .reduce((a, b) => a + b, 0);
console.log("Part 1 answer", flashCount);

let part2 = octopi.map((line) => line.map((n) => n));
let p2FlashCount = 0;
let currentStep = 0;
while (p2FlashCount < 100) {
  currentStep++;
  const [myOctopi, flashes] = doStep(part2);
  part2 = myOctopi;
  p2FlashCount = flashes;
}
console.log("Part 2 answer", currentStep);
