const data16 = `020D78804D397973DB5B934D9280CC9F43080286957D9F60923592619D3230047C0109763976295356007365B37539ADE687F333EA8469200B666F5DC84E80232FC2C91B8490041332EB4006C4759775933530052C0119FAA7CB6ED57B9BBFBDC153004B0024299B490E537AFE3DA069EC507800370980F96F924A4F1E0495F691259198031C95AEF587B85B254F49C27AA2640082490F4B0F9802B2CFDA0094D5FB5D626E32B16D300565398DC6AFF600A080371BA12C1900042A37C398490F67BDDB131802928F5A009080351DA1FC441006A3C46C82020084FC1BE07CEA298029A008CCF08E5ED4689FD73BAA4510C009981C20056E2E4FAACA36000A10600D45A8750CC8010989716A299002171E634439200B47001009C749C7591BD7D0431002A4A73029866200F1277D7D8570043123A976AD72FFBD9CC80501A00AE677F5A43D8DB54D5FDECB7C8DEB0C77F8683005FC0109FCE7C89252E72693370545007A29C5B832E017CFF3E6B262126E7298FA1CC4A072E0054F5FBECC06671FE7D2C802359B56A0040245924585400F40313580B9B10031C00A500354009100300081D50028C00C1002C005BA300204008200FB50033F70028001FE60053A7E93957E1D09940209B7195A56BCC75AE7F18D46E273882402CCD006A600084C1D8ED0E8401D8A90BE12CCF2F4C4ADA602013BC401B8C11360880021B1361E4511007609C7B8CA8002DC32200F3AC01698EE2FF8A2C95B42F2DBAEB48A401BC5802737F8460C537F8460CF3D953100625C5A7D766E9CB7A39D8820082F29A9C9C244D6529C589F8C693EA5CD0218043382126492AD732924022CE006AE200DC248471D00010986D17A3547F200CA340149EDC4F67B71399BAEF2A64024B78028200FC778311CC40188AF0DA194CF743CC014E4D5A5AFBB4A4F30C9AC435004E662BB3EF0`;
const demo16c = `A0016C880162017C3686B18A3D4780`;
const demo16a = `D2FE28`;
const demo16b = "C0015000016115A2E0802F182340";
const demo16d = "9C0141080250320F1802104A08";
const hexToBins = (hex: string) => {
  const bins = parseInt(hex, 16).toString(2);
  return bins.padStart(4, "0").split("").map(Number);
};

const processString = (str: string, processor: (bit: number) => void) => {
  str.split("").forEach((hex) => {
    const bins = hexToBins(hex);
    bins.forEach(processor);
  });
};
interface Packet {
  version?: number;
  type?: number;
  parent?: OperatorPacket;
  isOperator?: boolean;
}
interface OperatorPacket extends Packet {
  length?: number;
  lengthType: "count" | "bits";
  packets: (OperatorPacket | ValuePacket)[];
  isOperator: true;
}
interface ValuePacket extends Packet {
  bytes: number[][];
  isOperator: false;
}
let accumulator: number[] = [];
let currentState: "VERSION" | "TYPE" | "LENGTH" | "DATA" | "TRASH" = "VERSION";
let currentPacket: OperatorPacket | ValuePacket | Packet = {}!;
const packets = [currentPacket];
const packetToString = (packet: Packet): string => {
  const { packets: _packets, parent, ...rest } = <OperatorPacket>packet;
  const { bytes } = <ValuePacket>packet;
  return JSON.stringify(
    {
      ...rest,
      packetCount: _packets && _packets.length,
      hasParent: !!parent,
      bytes: bytes && bytes.map((b) => b.join("")),
      parentIndex: parent && packets.findIndex((p) => p === parent),
    },
    null,
    2
  );
};
const getLengthOfPacket = (
  packet: OperatorPacket | ValuePacket,
  skipHeader = false
): number => {
  let len = skipHeader ? 0 : 6; //Version + Type
  if (packet.isOperator) {
    if (packet.lengthType === "count")
      len +=
        (skipHeader ? 0 : 12) +
        packet.packets.reduce((acc, p) => acc + getLengthOfPacket(p), 0);
    if (packet.lengthType === "bits")
      len +=
        (skipHeader ? 0 : 16) +
        packet.packets.reduce((acc, p) => acc + getLengthOfPacket(p), 0);
  } else {
    len += packet.bytes.length * 5;
  }
  return len;
};
// const getLength = (packets: ValuePacket | OperatorPacket): number => {
//     let len = 0;

//     if(packet.packets)
// }
const checkParent = (thisPacket: Packet): boolean => {
  const { parent } = thisPacket;
  if (parent) {
    if (parent.lengthType === "count") {
      if (parent.packets.length === parent.length) {
        //Go up the tree again?
        return checkParent(parent);
      } else {
        //make a new packet
        const newPacket = {};
        thisPacket.parent!.packets.push(<OperatorPacket>newPacket);
        currentPacket = newPacket;
        currentPacket.parent = thisPacket.parent;
        packets.push(currentPacket);
        return true;
      }
    } else {
      //This is about length
      if (getLengthOfPacket(parent, true) === parent.length) {
        //Go up the tree again?
        return checkParent(parent);
      } else {
        //make a new packet
        const newPacket = {};
        thisPacket.parent!.packets.push(<OperatorPacket>newPacket);
        currentPacket = newPacket;
        currentPacket.parent = thisPacket.parent;
        packets.push(currentPacket);
        return true;
      }
    }
  } else {
    return false;
  }
};
const processor = (bit: number) => {
  //What is my current state
  accumulator.push(bit);
  switch (currentState) {
    case "VERSION":
      if (accumulator.length === 3) {
        const version = parseInt(accumulator.join(""), 2);
        currentPacket.version = version;
        accumulator = [];
        currentState = "TYPE";
      }
      break;
    case "TYPE":
      if (accumulator.length === 3) {
        const type = parseInt(accumulator.join(""), 2);
        currentPacket.type = type;
        accumulator = [];
        //Now we need to find out what's what
        if (currentPacket.type === 4) {
          const thisPacket = <ValuePacket>currentPacket;
          currentPacket.isOperator = false;
          currentState = "DATA";
          thisPacket.bytes = [];
        } else {
          currentPacket = <OperatorPacket>currentPacket;
          currentPacket.isOperator = true;
          currentState = "LENGTH";
        }
      }
      break;
    case "DATA":
      if (accumulator.length === 5) {
        const [isAnother, ...halfword] = accumulator;
        accumulator = [];
        const word = parseInt(halfword.join(""), 2);
        (<ValuePacket>currentPacket).bytes.push(halfword);
        if (isAnother) {
          currentState = "DATA";
        } else {
          if (checkParent(currentPacket)) {
            currentState = "VERSION";
          } else {
            currentState = "TRASH";
          }
        }
      }
      break;
    case "LENGTH":
      if (accumulator.length === (accumulator[0] ? 12 : 16)) {
        const [lengthType, ...lengthBits] = accumulator;
        const length = parseInt(lengthBits.join(""), 2);
        const thisPacket = <OperatorPacket>currentPacket;
        thisPacket.lengthType = lengthType ? "count" : "bits";
        thisPacket.length = length;
        currentPacket = { parent: thisPacket } as Packet;
        packets.push(currentPacket);
        thisPacket.packets = [<OperatorPacket>currentPacket];
        currentState = "VERSION";
        accumulator = [];
      }
      break;
    case "TRASH":

    //do nothing
  }
};
const calculatePacket = (packet: ValuePacket | OperatorPacket): number => {
  switch (packet.type) {
    case 0:
      return (<OperatorPacket>packet).packets
        .filter(({ isOperator }) => isOperator !== undefined)
        .map(calculatePacket)
        .filter((p) => p !== -1)
        .reduce((a, b) => a + b, 0);
    case 1:
      return (<OperatorPacket>packet).packets
        .filter(({ isOperator }) => isOperator !== undefined)
        .map(calculatePacket)
        .reduce((a, b) => a * b, 1);
    case 2:
      return Math.min(
        ...(<OperatorPacket>packet).packets
          .filter(({ isOperator }) => isOperator !== undefined)
          .map(calculatePacket)
      );
    case 3:
      return Math.max(
        ...(<OperatorPacket>packet).packets
          .filter(({ isOperator }) => isOperator !== undefined)
          .map(calculatePacket)
      );
    case 4:
      return parseInt((<ValuePacket>packet).bytes.flat().join(""), 2);
    case 5:
      return calculatePacket((<OperatorPacket>packet).packets[0]) >
        calculatePacket((<OperatorPacket>packet).packets[1])
        ? 1
        : 0;
    case 6:
      return calculatePacket((<OperatorPacket>packet).packets[0]) <
        calculatePacket((<OperatorPacket>packet).packets[1])
        ? 1
        : 0;
    case 7:
      return calculatePacket((<OperatorPacket>packet).packets[0]) ===
        calculatePacket((<OperatorPacket>packet).packets[1])
        ? 1
        : 0;
  }
  return -1;
};
processString(data16, processor);
// console.log(packets.map(packetToString).join("\n"));
// console.log(packets.length);
console.log(
  "Part 1",
  packets.reduce((accumulator, { version }) => (version || 0) + accumulator, 0)
);
console.log("Part 2", calculatePacket(<OperatorPacket>packets[0]));
