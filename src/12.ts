const data12 = `end-ry
jf-jb
jf-IO
jb-hz
jo-LM
hw-end
hw-LM
hz-ry
WI-start
LM-start
kd-jf
xi-WI
hw-jb
hz-jf
LM-jb
jb-xi
ry-jf
WI-jb
end-hz
jo-start
WI-jo
xi-ry
xi-LM
xi-hw
jo-xi
WI-jf`;

const edges1 = data12.split("\n").map((line) => line.split("-"));
const edges = edges1.concat(edges1.map((edge) => [edge[1], edge[0]]));
const nodes = edges.reduce(
  (acc, [to, from]) =>
    [...acc, to, from].filter((node, i, arr) => arr.indexOf(node) === i),
  []
);
const isSmall = (node: string) => node[0].toLowerCase() === node[0];
const getTo = (from: string, path: string[]) => {
  return from === "end"
    ? undefined
    : edges
        .filter(
          ([_from, _to]) =>
            _from === from && !path.filter(isSmall).includes(_to)
        )
        .map(([_, to]) => to);
};
let paths = [["start"]];
do {
  paths = paths.flatMap((path) => {
    const tos = getTo(path[path.length - 1], path);
    if (tos) {
      return tos.map((to) => [...path, to]);
    } else return [path];
  });
} while (paths.filter((path) => path[path.length - 1] !== "end").length);
console.log("Part 1", paths.length);
const getTo2 = (from: string, path: string[]) => {
  const doubleSmalls = Object.entries(
    path
      .filter(isSmall)
      .reduce(
        (acc, node) => ({ ...acc, [node]: (acc[node] || 0) + 1 }),
        {} as Record<string, number>
      )
  )
    .filter(([key, value]) => value > 1)
    .map(([key]) => key);
  //   console.log({ doubleSmalls });
  return from === "end"
    ? undefined
    : edges
        .filter(([_, to]) => to !== "start")
        .filter(
          ([_from, _to]) =>
            _from === from &&
            !doubleSmalls.includes(_to) &&
            (!doubleSmalls.length || !path.filter(isSmall).includes(_to))
        )
        .map(([_, to]) => to);
};
let paths2 = [["start"]];
do {
  paths2 = paths2.flatMap((path) => {
    const tos = getTo2(path[path.length - 1], path);
    if (tos) {
      return tos.map((to) => [...path, to]);
    } else return [path];
  });
} while (paths2.filter((path) => path[path.length - 1] !== "end").length);
console.log("Part 2", paths2.length);
