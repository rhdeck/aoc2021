import { parse } from "path";

const data24 = `inp w
mul x 0
add x z
mod x 26
div z 1
add x 13
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 6
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 7
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 11
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 2
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -7
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 15
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 10
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 8
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 10
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 1
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -5
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 5
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -3
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 3
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x 0
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 5
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -5
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 11
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -9
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 12
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x 0
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 10
mul y x
add z y`;
const data24b = `inp w
-mul x 0
-add x z
-mod x 26
-div z 1
add x 13
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 6 y
-add y 6
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
-div z 1
add x 15
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 7 y
-add y 7
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
-div z 1
add x 15
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 10 y
-add y 10
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
-div z 1
add x 11
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 2 y
-add y 2
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
div z 26
add x -7
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 15 y
-add y 15
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
-div z 1
add x 10
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 8 y
-add y 8
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
-div z 1
add x 10
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 1 y
-add y 1
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
div z 26
add x -5
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 10 y
-add y 10
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
-div z 1
add x 15
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 5 y
-add y 5
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
div z 26
add x -3
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 3 y
-add y 3
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
div z 26
-add x 0
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 5 y
-add y 5
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
div z 26
add x -5
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 11 y
-add y 11
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
div z 26
add x -9
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 12 y
-add y 12
-mul y x
-add z y

inp w
-mul x 0
-add x z
-mod x 26
div z 26
-add x 0
-eql x w
-eql x 0
-mul y 0
-add y 25
-mul y x
-add y 1
-mul z y
-mul y 0
-add y w
+ray 10 y
-add y 10
-mul y x
-add z y`;
type Register = {
  x: number;
  y: number;
  z: number;
  w: number;
};
type inputFunc = (input: number, register: Register) => void;
type operatorFunc = (register: Register) => void;

const makeOperator = (
  operator: string,
  a: keyof Register,
  b: keyof Register | number
): inputFunc | operatorFunc => {
  b = isNaN(Number(b)) ? b : Number(b);
  switch (operator) {
    case "inp":
      return (input: number, register: Register) => {
        register.w = input;
        register.x = register.z % 26;
      };
    case "mul":
      return (register: Register) => {
        if (typeof b === "number") {
          register[a] = register[a] * b;
        } else register[a] = register[a] * register[b];
      };
    case "add":
      return (register: Register) => {
        if (typeof b === "number") register[a] = register[a] + b;
        else register[a] = register[a] + register[b];
      };
    case "mod":
      return (register: Register) => {
        if (typeof b === "number") register[a] = register[a] % b;
        else if (register[a] < 0 || register[b] <= 0)
          throw new Error("modulo by zero or negative");
        else register[a] = register[a] % register[b];
      };
    case "div":
      return (register: Register) => {
        if (typeof b === "number") register[a] = Math.floor(register[a] / b);
        else if (register[b] === 0) throw new Error("division by zero");
        else register[a] = Math.floor(register[a] / register[b]);
      };
    case "eql":
      return (register: Register) => {
        if (typeof b === "number") register[a] = register[a] === b ? 1 : 0;
        else register[a] = register[a] === register[b] ? 1 : 0;
      };
    case "ray":
      const anum = parseInt(a as string, 10);
      return (register: Register) => {
        register.x = register.x === register.w ? 0 : 1;
        register.y = (register.w + anum) * register.x;
        register.z = register.z * (25 * register.x + 1) + register.y;
        //         eql x w
        // eql x 0
        // mul y 0
        // add y 25
        // mul y x
        // add y 1
        // mul z y
        // mul y 0
        // add y w
        //         add y [ANUM]
        // -mul y x
        // -add z y
      };
  }
  throw new Error("Did not find an apporpriate operator type: " + operator);
};

const parseStr24 = (str: string) => {
  const operators = str
    .split("\n")
    .filter(Boolean)
    .filter((l) => !l.startsWith("-"))
    .map((l) => (l.startsWith("+") ? l.slice(1) : l))
    .map((line) => {
      const [operator, a, b] = line.split(" ") as [
        string,
        keyof Register,
        keyof Register
      ];
      //   if (operator.startsWith("-"))
      //     return undefined as unknown as Record<string, inputFunc>;
      return {
        operator: operator === "inp" ? "inp" : `${operator}_${a}_${b}`,
        func: makeOperator(operator, a, b),
      };
    })
    .filter(Boolean);
  return operators;
};
const makeChunks = (
  operators: ReturnType<typeof parseStr24>
): ReturnType<typeof parseStr24>[] => {
  const chunks: ReturnType<typeof parseStr24>[] = [];
  let chunk: ReturnType<typeof parseStr24> = [];
  operators.forEach((obj) => {
    if (obj.operator === "inp") {
      chunk = [];
      chunks.push(chunk);
    }
    chunk.push(obj);
  });
  return chunks;
};
const makeInputs = (length: number) =>
  Array(length)
    .fill(0)
    .map(() =>
      Array(9)
        .fill(0)
        .map((_, j) => 9 - j)
    );

const chunks = makeChunks(parseStr24(data24b));
let registers: Record<string, Register> = {};
const runChunk = (
  operators: ReturnType<typeof parseStr24>,
  inputs: number[],
  register: Register,
  soFar: number
): {
  input: number;
  register: Register;
  registerString: string;
  thusFar: number;
}[] => {
  const [first, ...rest] = operators as [
    { operator: string; func: inputFunc },
    ...{ operator: string; func: operatorFunc }[]
  ];
  const outputs = inputs.map((input) => {
    const newRegister = { ...register };
    first.func(input, newRegister);
    rest.forEach(({ func }) => func(newRegister));
    const finalRegister = newRegister;

    const registerString = [finalRegister.y, finalRegister.z].join();

    registers[registerString] = finalRegister;
    return {
      input,
      register: finalRegister,
      registerString,
      thusFar: soFar * 10 + input,
    };
  });

  return outputs;
};

const doChunk = (
  inputs: number[],
  chunk: ReturnType<typeof parseStr24>,
  out: { input: number; register: Register }[]
) => {
  console.time("flatmap");
  const newOut: Record<string, number> = {};
  out.forEach(({ input, register }) => {
    const chunked = runChunk(chunk, inputs, register, input)
      .filter(Boolean)
      .forEach(({ input, register, registerString, thusFar }) => {
        if (!newOut[registerString]) newOut[registerString] = thusFar;
      });
  });
  console.timeEnd("flatmap");
  console.time("newerout");
  const newerOut = Object.keys(newOut).map((registerString) => {
    return {
      input: newOut[registerString],
      register: registers[registerString],
    };
  });
  console.timeEnd("newerout");
  return newerOut;
};
let out2: { input: number; register: Register }[] = [
  { input: 0, register: { x: 0, y: 0, z: 0, w: 0 } },
];

makeInputs(14).forEach((inputs, index) => {
  registers = {};
  console.time("out2");
  out2 = doChunk(inputs, chunks[index], out2);
  console.timeEnd("out2");
  console.log(
    "After",
    index,
    out2.length,
    Object.keys(registers).length,
    new Date().toString()
  );
});
const sorted = out2
  .filter(({ register: { z } }) => !z)
  .map(({ input }) => input)
  .sort();

const min = sorted[0];
const max = sorted[sorted.length - 1];
console.log(out2);
console.dir(sorted);
console.log("Parts 1 and 2", { max, min });
