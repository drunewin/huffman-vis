import PentaNodeList from './penta_node_list.js';

const charBinAt = (str, idx) => {
  return padEightBits(str.charCodeAt(idx).toString(2));
};

const charToBin = (ch) => {
  return padEightBits(ch.charCodeAt(0).toString(2));
};

const stringToBin = (str) => {
  let binString = "";
  for (let i = 0; i < str.length; i++) {
    binString = binString.concat(charToBin(str.charAt(i)));
  }
  return binString;
};

const padEightBits = (bin) => {
  const numLeadingZeros = 8 - bin.length;
  return "0".repeat(numLeadingZeros).concat(bin);
};

const charToName = (ch) => {
  switch (ch) {
    case " ":
      return "space";
    case "\n":
      return "newline";
    case "\t":
      return "tab";
    default:
      return ch;
  }
};

export const rootToJson = (root) => {
  if (root.isLeaf()) {
    return {
      name: root.name,
      count: root.count,
      children: null,
    };
  } else {
    return {
      name: root.name,
      count: root.count,
      children: [
        rootToJson(root.leftChild),
        rootToJson(root.rightChild)
      ],
    };
  }
};
