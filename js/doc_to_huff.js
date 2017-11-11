// import { charBinAt, charToBin, stringToBin } from './util.js';

const passage = `The last question was asked for the first time, half in jest, on May 21, 2061, at a time when humanity first stepped into the light. The question came about as a result of a five dollar bet over highballs, and it happened this way:
Alexander Adell and Bertram Lupov were two of the faithful attendants of Multivac. As well as any human beings could, they knew what lay behind the cold, clicking, flashing face -- miles and miles of face -- of that giant computer. They had at least a vague notion of the general plan of relays and circuits that had long since grown past the point where any single human could possibly have a firm grasp of the whole.

Multivac was self-adjusting and self-correcting. It had to be, for nothing human could adjust and correct it quickly enough or even adequately enough -- so Adell and Lupov attended the monstrous giant only lightly and superficially, yet as well as any men could. They fed it data, adjusted questions to its needs and translated the answers that were issued. Certainly they, and all others like them, were fully entitled to share In the glory that was Multivac's.

For decades, Multivac had helped design the ships and plot the trajectories that enabled man to reach the Moon, Mars, and Venus, but past that, Earth's poor resources could not support the ships. Too much energy was needed for the long trips. Earth exploited its coal and uranium with increasing efficiency, but there was only so much of both.

But slowly Multivac learned enough to answer deeper questions more fundamentally, and on May 14, 2061, what had been theory, became fact.

The energy of the sun was stored, converted, and utilized directly on a planet-wide scale. All Earth turned off its burning coal, its fissioning uranium, and flipped the switch that connected all of it to a small station, one mile in diameter, circling the Earth at half the distance of the Moon. All Earth ran by invisible beams of sunpower.

Seven days had not sufficed to dim the glory of it and Adell and Lupov finally managed to escape from the public function, and to meet in quiet where no one would think of looking for them, in the deserted underground chambers, where portions of the mighty buried body of Multivac showed. Unattended, idling, sorting data with contented lazy clickings, Multivac, too, had earned its vacation and the boys appreciated that. They had no intention, originally, of disturbing it.

They had brought a bottle with them, and their only concern at the moment was to relax in the company of each other and the bottle.

"It's amazing when you think of it," said Adell. His broad face had lines of weariness in it, and he stirred his drink slowly with a glass rod, watching the cubes of ice slur clumsily about. "All the energy we can possibly ever use for free. Enough energy, if we wanted to draw on it, to melt all Earth into a big drop of impure liquid iron, and still never miss the energy so used. All the energy we could ever use, forever and forever and forever."

Lupov cocked his head sideways. He had a trick of doing that when he wanted to be contrary, and he wanted to be contrary now, partly because he had had to carry the ice and glassware. "Not forever," he said.

"Oh, hell, just about forever. Till the sun runs down, Bert."

"That's not forever."

"All right, then. Billions and billions of years. Twenty billion, maybe. Are you satisfied?"

Lupov put his fingers through his thinning hair as though to reassure himself that some was still left and sipped gently at his own drink. "Twenty billion years isn't forever."

"Will, it will last our time, won't it?"`;

const huffDict = {
  "0":"01001100001",
  "1":"0111110000",
  "2":"00111100010",
  "4":"001111011011",
  "6":"01001100000",
  " ":"000",
  "e":"111",
  "t":"0101",
  "a":"0110",
  "n":"1000",
  "o":"1001",
  "i":"1011",
  "s":"1101",
  "l":"00100",
  "h":"00101",
  "r":"00110",
  "d":"01000",
  "u":"10101",
  "c":"11001",
  "f":"001110",
  "y":"010010",
  "w":"011110",
  "g":"011100",
  ",":"011101",
  "m":"101001",
  "p":"110000",
  "b":"110001",
  ".":"0011111",
  "v":"0100111",
  "\n":"0111111",
  "\"":"01001101",
  "k":"01111101",
  "A":"10100001",
  "M":"10100010",
  "T":"10100011",
  "-":"001111010",
  "q":"010011001",
  "E":"011111001",
  "j":"0011110000",
  "'":"101000001",
  "L":"0011110010",
  "B":"0100110001",
  "I":"1010000000",
  "x":"1010000001",
  "z":"0111110001",
  "?":"00111101110",
  "H":"00111101111",
  "S":"001111001110",
  "F":"001111011000",
  "U":"001111001101",
  "N":"001111001100",
  "C":"001111011001",
  "O":"001111000111",
  "W":"001111000110",
  ":":"001111011010",
  "V":"001111001111",
};

const charFreq = {
  "0":2,
  "1":4,
  "2":3,
  "4":1,
  "6":2,
  "T":12,
  "h":154,
  "e":311,
  " ":623,
  "l":156,
  "a":230,
  "s":160,
  "t":260,
  "q":8,
  "u":94,
  "i":187,
  "o":193,
  "n":207,
  "w":57,
  "k":13,
  "d":136,
  "f":73,
  "r":148,
  "m":47,
  ",":57,
  "j":6,
  "M":12,
  "y":64,
  "p":44,
  "g":57,
  ".":35,
  "c":79,
  "b":39,
  "v":31,
  ":":1,
  "\n":27,
  "A":12,
  "x":3,
  "B":4,
  "L":5,
  "-":9,
  "I":3,
  "C":1,
  "'":6,
  "F":1,
  "V":1,
  "E":7,
  "z":3,
  "S":1,
  "U":1,
  "\"":16,
  "H":2,
  "N":1,
  "O":1,
  "?":2,
  "W":1
};

const charBinAt = (str, idx) => {
  return padEightBits(str.charCodeAt(idx).toString(2));
};

const charToBin = (ch) => {
  return padEightBits(ch.charCodeAt(0).toString(2));
};

const stringToHuff = (str, dict) => {
  let binString = "";
  for (let i = 0; i < str.length; i++) {
    binString = binString.concat(dict[str.charAt(i)]);
  }
  return binString;
};

const padEightBits = (bin) => {
  const numLeadingZeros = 8 - bin.length;
  return "0".repeat(numLeadingZeros).concat(bin);
};

const padToNBIts = (bin, n) => {
  const numLeadingZeros = n - bin.length;
  if (numLeadingZeros < 0) {
    // debugger
    console.log(`bin: ${bin}\nnumBits: ${n}`);
  }
  return "0".repeat(numLeadingZeros).concat(bin);
};


$(() => {
  let index = 0;
  setView(index);
  let intervalId = 0;
  intervalId = setInterval(() => {
    if (index < passage.length) {
      setView(index++);

    } else {
      clearInterval(intervalId);
    }
  }, 500);

  let hh = getHuffHeader(huffDict, charFreq);
  $(".huff-header").text(hh);
  $(".huff-header-length").text(hh.length.toString());
});

const setView = (index) => {
  let body = $('.docs-view');

  let textDocContents = cursorTextDocHtml(passage, index);
  let asciiDocContents = cursorAsciiDocHtml(passage, index);
};

const cursorTextDocHtml = (txt, charIndex) => {
  const docHtml = $(".text-doc");
  const pre = $("<span>");
  pre.addClass("pre-text");
  const cur = $("<span>");
  cur.addClass("cursor");
  const post = $("<span>");

  pre.text(txt.substring(0, charIndex));
  cur.text(txt.charAt(charIndex));
  post.text(txt.substring(charIndex + 1));
  docHtml.html(pre);
  docHtml.append(cur);
  docHtml.append(post);
  return docHtml;
};

const cursorAsciiDocHtml = (txt, charIndex) => {
  const docHtml = $(".bin-doc");
  const pre = $("<span>");
  pre.addClass("pre-text");
  const cur = $("<span>");
  cur.addClass("cursor");
  const post = $("<span>");

  let pText = stringToHuff(txt.substring(0, charIndex), huffDict);
  let cText = huffDict[txt.charAt(charIndex)];
  $(".bit-count").text((pText.length + cText.length).toString());
  pre.text(pText);
  cur.text(cText);

  docHtml.html(pre);
  docHtml.append(cur);
  docHtml.append(post);

  docHtml.scrollTop(docHtml[0].scrollHeight - 700);
  return docHtml;
};

const nToUBinInt = (num) => {
  switch (num) {
    case 0:
      return "00";
    case 1:
      return "01";
    case 2:
      return "10";
    case 3:
      return "11";
    default:
      return nToUBinInt(Math.floor(num / 2)).concat((num % 2).toString());
  }
};

const getHuffHeader = (dict, freq) => {
  const headerElements = [];
  let symbols = Object.keys(dict);
  let fourByteLength = padToNBIts(nToUBinInt(symbols.length), 32);
  headerElements.push(fourByteLength);

  let fourByteFour = padToNBIts(nToUBinInt(4), 32);
  headerElements.push(fourByteFour);

  symbols.forEach(
    (sym) => {
      let fourByteFreq = padToNBIts(nToUBinInt(freq[sym]), 32);
      headerElements.push(`${charToBin(sym)}${fourByteFreq}`);
    }
  );
  return headerElements.join("");
};

// 36.0676723% compression
