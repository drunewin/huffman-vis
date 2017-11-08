export const charBinAt = (str, idx) => {
  return padEightBits(str.charCodeAt(idx).toString(2));
};

export const charToBin = (ch) => {
  return padEightBits(ch.charCodeAt(0).toString(2));
};

export const stringToBin = (str) => {
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
