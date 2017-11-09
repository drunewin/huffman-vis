import PentaNodeList from './penta_node_list';
import { rootToJson } from './util';

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

const charFreq = {};

for(let i = 0; i < passage.length; i++) {
  let c = passage.charAt(i);
  if (charFreq.hasOwnProperty(c)) {
    charFreq[c] += 1;
  } else {
    charFreq[c] = 1;
  }
}

$(() => {
  console.log(charFreq);
  console.log(Object.keys(charFreq).length);
  let linkedList = new PentaNodeList(charFreq);
  console.log(linkedList);
  let pentaTree = linkedList.getPentaNodeTree();
  console.log(pentaTree);
  let rootNode = rootToJson(pentaTree);
  console.log(rootNode);
  let treeData = rootNode;
  // $("body").text(JSON.stringify(rootNode));


  let margin = {top: 20, right: 90, bottom: 30, left: 90};
  let width = 1200 - margin.left - margin.right;
  let height = 900 - margin.top - margin.bottom;

  let svg = d3.select("body").append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate("
  + margin.left + "," + margin.top + ")");

  let i = 0;
  let duration = 750;

  let treemap = d3.tree().size([width, height]);

  // Assigns parent, children, height, depth
  let root = d3.hierarchy(treeData, function(d) { return d.children; });
  root.x0 = width / 2;
  root.y0 = 0;
  // debugger
  // Collapse after the second level
  // root.children.forEach(collapse);

  update(root);

  // Collapse the node and all it's children
  function collapse(d) {
    if(d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function update(source) {

    // Assigns the x and y position for the nodes
    let treeData = treemap(root);

    // Compute the new tree layout.
    let nodes = treeData.descendants(),
    links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 60;});

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node')
    .data(nodes, function(d) {return d.id || (d.id = ++i); });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr("transform", function(d) {
      return "translate(" + source.x0 + "," + source.y0 + ")";
    })
    // .on('click', click)
    .on('click', getHuffmanCode)
    .on('mouseover', showPath)
    .on('mouseout', () => update(root));

    // Add Circle for the nodes
    nodeEnter.append('circle')
    .attr('class', 'node')
    .attr('r', 1e-6)
    .style("fill", function(d) {
      return d._children ? "lightsteelblue" : "#fff";
    });

    // Add labels for the nodes
    nodeEnter.append('text')
    .attr("dx", -5)
    .attr("y", function(d) {
      return d.children || d._children ? -23 : 23;
    })
    .attr("text-anchor", function(d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function(d) { return !d.height ? d.data.name + `[${d.depth}]` : ""; });

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
      return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + source.x + "," + source.y + ")";
    })
    .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
    .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
    .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link')
    .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
    .attr("class", "link")
    .attr('d', function(d){
      var o = {x: source.x0, y: source.y0};
      return diagonal(o, o);
    });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
    .duration(duration)
    .attr('d', function(d){ return diagonal(d, d.parent); });

    // Remove any exiting links
    var linkExit = link.exit().transition()
    .duration(duration)
    .attr('d', function(d) {
      var o = {x: source.x, y: source.y};
      return diagonal(o, o);
    })
    .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      // ${(s.x + d.x) / 2} ${s.y},
      // ${(s.x + d.x) / 2} ${d.y},
      let path = `M ${s.x} ${s.y}
      L
      ${d.x} ${d.y}`;

      return path;
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    // Highlight node's path
    function showPath(d) {
      // debugger
      let ids = d.ancestors().map((n) => n.id);
      let c = d3.selectAll("circle.node").filter(function(d) {
        return ids.includes(d.id);}).style("fill",  "yellow");
      // update(root);
    }

    // Return tree node's Huffman code
    function getHuffmanCode(d) {
      // debugger
      const path = [];
      const fromRoot = d.ancestors().reverse();
      for(i = 1; i < fromRoot.length; i++) {
        if(fromRoot[i - 1].children[0] === fromRoot[i]) {
          path.push("0");
        } else {
          path.push("1");
        }
      }
      console.log(path.join(""));
      console.log(d);
      return path.join("");
    }

    function getHuffmanCodeTable(r) {
      const huffmanTable = [];
      let leafNodes = r.leaves();
      // debugger
      leafNodes.forEach(
        (leaf) => {
          // debugger
          huffmanTable.push(
            {
              symbol: leaf.data.name,
              hCode: getHuffmanCode(leaf),
              frequency: leaf.data.count,
              node: leaf,
            }
          );
        }
      );
      return huffmanTable;
    }
    let c = getHuffmanCodeTable(source);
    console.log({data: c.sort(huffCodeSort)});

    tabulate(c.sort(huffCodeSort), ['symbol', 'hCode', 'frequency']);
    setTimeout(() => (showPath(c[19].node)), 2000);
    console.log(huffDictionaryFromData(c));

    let sp = $("<span>").text(JSON.stringify(charFreq));
    // let sp = $("<span>").text(JSON.stringify(huffDictionaryFromData(c)));
    $("body").append(sp);
  }

});

const huffCodeSort = (a, b) => (b.frequency - a.frequency);

const tabulate = (data, columns) => {
  let table = d3.select("body").append("table").classed("huff-code-lookup", true);
  let thead = table.append("thead");
  let tbody = table.append("tbody");

  // append header row
  thead.append("tr")
    .selectAll("th")
    .data(columns).enter()
      .append("th")
      .text(column => column);

  // append rows for each Object
  let rows = tbody.selectAll("tr")
    .data(data).enter()
      .append("tr");

  // create cells
  let cells = rows.selectAll("td")
    .data(function (row) {
            return columns.map(
              column => ({
                column: column,
                value: row[column],
              })
            );
          }
        )
        .enter()
        .append("td")
          .text(d => d.value);

  return table;
};

const huffDictionaryFromData = (data) => {
  const dict = {};
  data.forEach(
    (datum) => {
      dict[datum.symbol.toString()] = datum.hCode;
    }
  );
  return dict;
};
