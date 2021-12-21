const data21 = `Player 1 starting position: 7
Player 2 starting position: 6`;

const parseStr21 = (source: string) =>
  source
    .split("\n")
    .map((line) => Number(line.trim().split(":").pop()!.trim()));
const playTurn21 = (position: number, roll: number) =>
  ((position + roll - 1) % 10) + 1;

const _players = parseStr21(data21);
const players = [..._players];
let scores = Array(players.length).fill(0);
let dieRoll = 0;
while (Math.max(...scores) < 1000) {
  //Play the game
  players.map((position, index, arr) => {
    Array(3)
      .fill(0)
      .map(() => {
        if (Math.max(...scores) < 1000) {
          dieRoll++;
          const newPos = playTurn21(arr[index], dieRoll);
          arr[index] = newPos;
        }
      });
    if (Math.max(...scores) < 1000) scores[index] += arr[index];
  });
}
console.log("Part 1 Answer", Math.min(...scores) * dieRoll);
const possibleOutcomes = [1, 2, 3].flatMap((a) =>
  [1, 2, 3].flatMap((b) => [1, 2, 3].flatMap((c) => a + b + c)).sort()
);
const cachedTurns: Record<string, number[]> = {};
const quantumTurn = (positions: number[], scores: number[], turn = 0) => {
  const cacheKey = JSON.stringify({ positions, scores, turn });
  if (cachedTurns[cacheKey]) {
    return cachedTurns[cacheKey];
  }
  const found = scores.map((score) => (score > 20 ? 1 : 0));
  if (found.find(Boolean)) return found;
  const newPositions = possibleOutcomes.map(
    (outcome) => ((positions[turn] + outcome - 1) % 10) + 1
  );
  const newScores = newPositions.map((position) => scores[turn] + position);
  const games: number[][] = newPositions.map((position, positionIndex) =>
    quantumTurn(
      positions.map((p, i) => (i === turn ? position : p)),
      scores.map((s, i) => (turn === i ? newScores[positionIndex] : s)),
      (turn + 1) % positions.length
    )
  );
  cachedTurns[cacheKey] = games.reduce(
    (acc: number[], game: number[]) => [acc[0] + game[0], acc[1] + game[1]],
    [0, 0] as number[]
  );
  return cachedTurns[cacheKey];
};
const part2Players = [..._players];
const output = quantumTurn(part2Players, [0, 0], 0);
const max = Math.max(...output);
console.log("part 2", max);
