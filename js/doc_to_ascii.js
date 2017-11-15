// import { charBinAt, charToBin, stringToBin } from './util.js';
import { appData } from './data.js';
import { cursorHuffDocHtml } from './doc_to_huff';

const passage = appData.passage;

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

export const setView = (index) => {
  let textDocContents = cursorTextDocHtml(passage, index);
  updateBitSlider(passage.charAt(index));

  if (index <= -1) {
    return true;
  } else if (index > passage.length) {
    return true;
  } else {
    return false;
  }
};

export const setViewWithHuff = (index) => {

  let textDocContents = cursorTextDocHtml(passage, index);
  let asciiDocContents = cursorAsciiDocHtml(passage, index);
  let huffDocContents = cursorHuffDocHtml(passage, index);

  if (index <= -1) {
    return true;
  } else if (index > passage.length) {
    return true;
  } else {
    return false;
  }
};

export const updateBitSlider = (c) => {
  let bitSeq = c.charCodeAt(0).toString(2).split("");
  bitSeq = "0".repeat(8 - bitSeq.length).split("").concat(bitSeq).map(bit => parseInt(bit));
  $(".bit-slider").toArray().forEach((el, i) => {
    if (bitSeq[i]) {
      el.className = "bit-slider one";
    } else {
      el.className = "bit-slider zero";
    }
  });
};

const cursorTextDocHtml = (txt, charIndex, num) => {
  const docHtml = $(".text-doc");
  const pre = $("<span>");
  pre.addClass("pre-text");
  const cur = $("<span>");
  cur.addClass("cursor");
  const post = $("<span>");
  post.addClass("post-text");

  let pText;
  let cText;
  let postText;

  if (charIndex < 0) {
    pText = "";
    cText = txt.charAt(0);
    postText = txt.substring(1);
  } else if (charIndex < txt.length) {
    pText = txt.substring(0, charIndex);
    cText = txt.charAt(charIndex);
    postText = txt.substring(charIndex + 1);
  } else {
    pText = txt.substring(0, charIndex);
    cText = " ";
    postText = "";
  }

  pre.text(pText);
  cur.text(cText);
  post.text(postText);

  $(".char-count").text((pText.length + cText.length).toString());

  docHtml.html(pre);
  docHtml.append(cur);
  docHtml.append(post);

  // docHtml.scrollTop(docHtml[0].scrollHeight - docHtml[0].clientHeight);

  return docHtml;
};

const cursorAsciiDocHtml = (txt, charIndex, num) => {
  const docHtml = $(".bin-doc");
  const pre = $("<span>");
  pre.addClass("pre-text");
  const cur = $("<span>");
  cur.addClass("cursor");
  const post = $("<span>");
  post.addClass("post-text");

  let pText = stringToBin(txt.substring(0, charIndex));
  let cText = charIndex >= txt.length ? " " : charToBin(txt.charAt(charIndex));
  pre.text(pText);
  cur.text(cText);
  post.text(txt.substring(charIndex + 1));

  $(".bit-count").text((pText.length + cText.length).toString());

  docHtml.html(pre);
  docHtml.append(cur);
  // docHtml.append(post);

  docHtml.scrollTop(docHtml[0].scrollHeight - docHtml[0].clientHeight);
  return docHtml;
};
