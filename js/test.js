$(() => {
  $(".char-form").on("submit", (e) => {
    e.preventDefault();
    let charField = $(".char-field").toArray()[0];
    let bitSeq = charField.value.charCodeAt(0).toString(2).split("");
    bitSeq = "0".repeat(8 - bitSeq.length).split("").concat(bitSeq).map(c => parseInt(c));
    $(".bit-slider").toArray().forEach((el, i) => {
      if (bitSeq[i]) {
        el.className = "bit-slider one";
      } else {
        el.className = "bit-slider zero";
      }
    });
    charField.focus();
    charField.select();
  });
});
