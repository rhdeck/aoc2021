import { access } from "fs";

const data14 = `CNBPHFBOPCSPKOFNHVKV

CS -> S
FB -> F
VK -> V
HO -> F
SO -> K
FK -> B
VS -> C
PS -> H
HH -> P
KH -> V
PV -> V
CB -> N
BB -> N
HB -> B
HV -> O
NC -> H
NF -> B
HP -> B
HK -> S
SF -> O
ON -> K
VN -> V
SB -> H
SK -> H
VH -> N
KN -> C
CC -> N
BF -> H
SN -> N
KP -> B
FO -> N
KO -> V
BP -> O
OK -> F
HC -> B
NH -> O
SP -> O
OO -> S
VC -> O
PC -> F
VB -> O
FF -> S
BS -> F
KS -> F
OV -> P
NB -> O
CF -> F
SS -> V
KV -> K
FP -> F
KC -> C
PF -> C
OS -> C
PN -> B
OP -> C
FN -> F
OF -> C
NP -> C
CK -> N
BN -> K
BO -> K
OH -> S
BH -> O
SH -> N
CH -> K
PO -> V
CN -> N
BV -> F
FV -> B
VP -> V
FS -> O
NV -> P
PH -> C
HN -> P
VV -> C
NK -> K
CO -> N
NS -> P
VO -> P
CP -> V
OC -> S
PK -> V
NN -> F
SC -> P
BK -> F
BC -> P
FH -> B
OB -> O
FC -> N
PB -> N
VF -> N
PP -> S
HS -> O
HF -> N
KK -> C
KB -> N
SV -> N
KF -> K
CV -> N
NO -> P`;
const demo14 = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const [templateStr, ruleLines] = data14.split("\n\n");
const rules = ruleLines
  .split("\n")
  .map((line) => {
    const [from, to] = line.split(" -> ");
    return { from, to };
  })
  .reduce(
    (acc, { from, to }) => ({ ...acc, [from]: [from[0] + to, to + from[1]] }),
    {} as Record<string, string[]>
  );
//Ask what pairs it has
const pairs = Object.keys(rules).reduce(
  (acc, key) => ({ ...acc, [key]: 0 }),
  {} as Record<string, number>
);
//fill in based on the template
templateStr.split("").forEach((char, index, arr) => {
  if (index < arr.length - 1) {
    const pair = char + arr[index + 1];
    pairs[pair] = pairs[pair] + 1;
  }
});
const makePairs = (
  _pairs: Record<string, number>,
  rules: Record<string, string[]>,
  turns = 10
) => {
  let pairs = { ..._pairs };
  Array(turns)
    .fill(0)
    .forEach((_, i) => {
      const outPairs = Object.keys(pairs).reduce(
        (acc, key) => ({ ...acc, [key]: 0 }),
        {} as Record<string, number>
      );
      Object.entries(pairs).forEach(([pair, count]) => {
        const newPairs = rules[pair];
        if (newPairs) {
          newPairs.forEach((newPair) => {
            outPairs[newPair] += count;
            // usedPairs.push(newPair);
          });
        }
      });
      pairs = outPairs;
    });
  return pairs;
};
const lettersFromPairs = (pairs: Record<string, number>, templateStr = "") => {
  const letters = Object.entries(pairs).reduce((acc, [key, count]) => {
    const letter = key[0];
    return { ...acc, [letter]: count + (acc[letter] || 0) };
  }, {} as Record<string, number>);
  letters[templateStr.split("").pop()!]++;
  return letters;
};
const getTemplateFrequencySorted = (map: Record<string, number>) =>
  Object.entries(map).sort(([, a], [, b]) => b - a);

const pairsPart1 = makePairs(pairs, rules, 10);
const lettersPart1 = lettersFromPairs(pairsPart1, templateStr);
const lettersPart1Sorted = getTemplateFrequencySorted(lettersPart1);
const [, mostFrequent] = lettersPart1Sorted[0];
const [, leastFrequent] = lettersPart1Sorted[lettersPart1Sorted.length - 1];
console.log("Part 1 answer", mostFrequent - leastFrequent);

const pairsPart2 = makePairs(pairs, rules, 40);
const lettersPart2 = lettersFromPairs(pairsPart2, templateStr);
const lettersPart2Sorted = getTemplateFrequencySorted(lettersPart2);
const [, mostFrequent2] = lettersPart2Sorted[0];
const [, leastFrequent2] = lettersPart2Sorted[lettersPart2Sorted.length - 1];
console.log("Part 2 answer", mostFrequent2 - leastFrequent2);
