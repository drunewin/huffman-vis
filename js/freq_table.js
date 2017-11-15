const passage = "Ain't the snow fallin' just a bit deeper these days\nAren't they building the stairs a bit steeper these days\nAnd the town's really changin' in so many ways time time time\n\nThe young folks they're growin' exceptionally tall\nAnd the newspaper print it's becomin' quite small\nAnd folks speak so softly you can hardly hear at all time time time\n\nThe jokes don't seem as witty as the old jokes once were\nAnd the girls are half as pretty as I remember her\nAnd today you know in the park a young man called me sir time time time\n\nYeah I'm not quite as anxious for fame or success\nAnd my eye finds the girl in the plain quiet dress\nAnd I cling a bit longer to each warm caress time time time\n\nSo I breathe a bit heavy when I climb a hill\nWhat of it my life now is really much more fulfilled\nBut they're tearin' down the building that I watched them build\nTime time time time time time";

const passageHtml = "Ain't the snow fallin' just a bit deeper these days<br/>Aren't they building the stairs a bit steeper these days<br/>And the town's really changin' in so many ways time time time<br/><br/>The young folks they're growin' exceptionally tall<br/>And the newspaper print it's becomin' quite small<br/>And folks speak so softly you can hardly hear at all time time time<br/><br/>The jokes don't seem as witty as the old jokes once were<br/>And the girls are half as pretty as I remember her<br/>And today you know in the park a young man called me sir time time time<br/><br/>Yeah I'm not quite as anxious for fame or success<br/>And my eye finds the girl in the plain quiet dress<br/>And I cling a bit longer to each warm caress time time time<br/><br/>So I breathe a bit heavy when I climb a hill<br/>What of it my life now is really much more fulfilled<br/>But they're tearin' down the building that I watched them build<br/>Time time time time time time";

$(() => {
  const nodes = [];

  let index = 0;
  let intervalId = 0;
  intervalId = setInterval(() => {
    if (index < passage.length) {
      cursorTextDocHtml(passage, index, 0);
      update(dataFromCountObject(countObj(passage, index++)));
    } else {
      clearInterval(intervalId);
    }
  }, 200);

});

const update = (data) => {
  let nodes = d3.select(".freq-node-container").selectAll(".freq-node").data(data, function(d) { return d.name; });

  nodes.style("order", function(d) { return -1 * d.count; });
  nodes.select(".freq-count").text(function(d) { return d.count; });

  let enterSelection = nodes.enter().append("div").classed("freq-node", true);
  enterSelection.append("div").classed("freq-name", true).text(function(d) {
    switch (d.name) {
      case " ":
        return "[space]";
      case "\n":
        return "\\n";
      default:
        return d.name;
    }
  });
  enterSelection.append("div").classed("freq-count", true).text(function(d) { return d.count; });
  enterSelection.style("order", function(d) { return -1 * d.count; });
};

const cursorTextDocHtml = (txt, charIndex, num) => {
  const docHtml = $("#freq-table-doc");
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

  // $(".char-count").text((pText.length + cText.length).toString());

  docHtml.html(pre);
  docHtml.append(cur);
  docHtml.append(post);

  // docHtml.scrollTop(docHtml[0].scrollHeight - docHtml[0].clientHeight);

  return docHtml;
};

const countObj = (txt, index) => {
  const charFreq = {};

  for(let i = 0; i <= index; i++) {
    let c = passage.charAt(i);
    if (charFreq.hasOwnProperty(c)) {
      charFreq[c] += 1;
    } else {
      charFreq[c] = 1;
    }
  }
  return charFreq;
};

const dataFromCountObject = (obj) => {
  let keys = Object.keys(obj);
  let data = [];
  keys.forEach((key) => {
    data.push({name: key, count: obj[key]});
  });
  return data;
};
