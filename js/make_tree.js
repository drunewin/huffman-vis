import PentaNodeList from './penta_node_list';
import { rootToJson } from './util';
import { appData } from './data';
import { hierarchyFromData, dataFromCountObject } from './list_collapse';
import HuffmanTreeView from './huffman_tree_view';

const passage = appData.passage;

const charFreq = appData.charFreq;

for(let i = 0; i < passage.length; i++) {
  let c = passage.charAt(i);
  if (charFreq.hasOwnProperty(c)) {
    charFreq[c] += 1;
  } else {
    charFreq[c] = 1;
  }
}

export const listenerCallback = () => {
  let linkedList = new PentaNodeList(charFreq);
  // let pentaTree = linkedList.getPentaNodeTree();
  // let rootNode = rootToJson(pentaTree);
  // let treeData = rootNode;

  // for(let i = 0; i < 26; i++) {
  //   linkedList.nextMorphState();
  // }

  let treeView = new HuffmanTreeView(linkedList, 789, 677);
  return (i) => {treeView.setView(i);};
};

export const makeTree = () => {
  console.log(charFreq);
  console.log(Object.keys(charFreq).length);
  let linkedList = new PentaNodeList(charFreq);
  console.log(linkedList);
  let pentaTree = linkedList.getPentaNodeTree();
  console.log(pentaTree);
  let rootNode = rootToJson(pentaTree);
  console.log(rootNode);
  let treeData = rootNode;
  // let treeData = hierarchyFromData(dataFromCountObject(charFreq));
  // $("body").text(JSON.stringify(rootNode));

  // let treeView = new HuffmanTreeView(treeData, 789, 677);
  let treeView = new HuffmanTreeView(pentaTree.toHierarchyObject(), 789, 677);

  let n = treeView.numLeaves() * 2;
  console.log(n);
  let i = 0;

  // let timer = setInterval((() => {
  //   if (i < n) {
  //     treeView.setView(i++);
  //   } else {
  //     clearInterval(timer);
  //   }
  // }), 1500);
  //
  // let margin = {top: 20, right: 90, bottom: 30, left: 90};
  // let width = 1125 - margin.left - margin.right;
  // let height = 750 - margin.top - margin.bottom;
  //
  // let svg = d3.select("#make-tree").append("svg")
  // .attr("width", "70%")
  // .attr("height", "90%")
  // .append("g")
  // .attr("transform", "translate("
  // + "0" + "," + margin.top + ")");
  //
  // let i = 0;
  // let duration = 750;
  //
  // let treemap = d3.tree().size([789, 677]);
  //
  // // Assigns parent, children, height, depth
  // let root = d3.hierarchy(treeData, function(d) { return d.children; });
  // root.x0 = "35%";
  // root.y0 = 0;
  // // debugger
  // // Collapse after the second level
  // // root.children.forEach(collapse);
  // // collapse(root);
  //
  // update(root);
  //
  // // Collapse the node and all it's children
  // function collapse(d) {
  //   if(d.children) {
  //     d._children = d.children;
  //     d._children.forEach(collapse);
  //     d.children = null;
  //   }
  // }
  //
  // function update(source) {
  //
  //   // Assigns the x and y position for the nodes
  //   let treeData = treemap(root);
  //
  //   // Compute the new tree layout.
  //   let nodes = treeData.descendants(),
  //   links = treeData.descendants().slice(1);
  //
  //   // Normalize for fixed-depth.
  //   nodes.forEach(function(d) { d.y = d.depth * 50;});
  //
  //   // ****************** Nodes section ***************************
  //
  //   // Update the nodes...
  //   var node = svg.selectAll('g.node')
  //   .data(nodes, function(d) {return d.id || (d.id = ++i); });
  //
  //   // Enter any new modes at the parent's previous position.
  //   var nodeEnter = node.enter().append('g')
  //   .attr('class', 'node')
  //   .attr("transform", function(d) {
  //     return "translate(" + source.x0 + "," + source.y0 + ")";
  //   })
  //   // .on('click', click)
  //   // .on('click', getHuffmanCode)
  //   .on('click', showPath);
  //   // .on('mouseout', () => update(root));
  //
  //   // Add Circle for the nodes
  //   nodeEnter.append('circle')
  //   .attr('class', 'node')
  //   .attr('r', 1e-6)
  //   .style("fill", function(d) {
  //     return d._children ? "lightsteelblue" : "#fff";
  //   });
  //
  //   // Add labels for the nodes
  //   nodeEnter.append('text')
  //   .attr("dx", -5)
  //   .attr("y", function(d) {
  //     return d.children || d._children ? -23 : 23;
  //   })
  //   .attr("text-anchor", function(d) {
  //     return d.children || d._children ? "end" : "start";
  //   })
  //   .text(function(d) { return !d.height ? d.data.name + `` : ""; });
  //   // [${d.depth}]
  //
  //   // UPDATE
  //   var nodeUpdate = nodeEnter.merge(node);
  //
  //   // Transition to the proper position for the node
  //   nodeUpdate.transition()
  //   .duration(duration)
  //   .attr("transform", function(d) {
  //     return "translate(" + d.x + "," + d.y + ")";
  //   });
  //
  //   // Update the node attributes and style
  //   nodeUpdate.select('circle.node')
  //   .attr('r', 10)
  //   .style("fill", function(d) {
  //     return d._children ? "lightsteelblue" : "#fff";
  //   })
  //   .attr('cursor', 'pointer');
  //
  //
  //   // Remove any exiting nodes
  //   var nodeExit = node.exit().transition()
  //   .duration(duration)
  //   .attr("transform", function(d) {
  //     return "translate(" + source.x + "," + source.y + ")";
  //   })
  //   .remove();
  //
  //   // On exit reduce the node circles size to 0
  //   nodeExit.select('circle')
  //   .attr('r', 1e-6);
  //
  //   // On exit reduce the opacity of text labels
  //   nodeExit.select('text')
  //   .style('fill-opacity', 1e-6);
  //
  //   // ****************** links section ***************************
  //
  //   // Update the links...
  //   var link = svg.selectAll('path.link')
  //   .data(links, function(d) { return d.id; });
  //
  //   // Enter any new links at the parent's previous position.
  //   var linkEnter = link.enter().insert('path', "g")
  //   .attr("class", "link")
  //   .attr('d', function(d){
  //     var o = {x: source.x0, y: source.y0};
  //     return diagonal(o, o);
  //   });
  //
  //   // UPDATE
  //   var linkUpdate = linkEnter.merge(link);
  //
  //   // Transition back to the parent element position
  //   linkUpdate.transition()
  //   .duration(duration)
  //   .attr('d', function(d){ return diagonal(d, d.parent); });
  //
  //   // Remove any exiting links
  //   var linkExit = link.exit().transition()
  //   .duration(duration)
  //   .attr('d', function(d) {
  //     var o = {x: source.x, y: source.y};
  //     return diagonal(o, o);
  //   })
  //   .remove();
  //
  //   // Store the old positions for transition.
  //   nodes.forEach(function(d){
  //     d.x0 = d.x;
  //     d.y0 = d.y;
  //   });
  //
  //   // Creates a curved (diagonal) path from parent to the child nodes
  //   function diagonal(s, d) {
  //     // ${(s.x + d.x) / 2} ${s.y},
  //     // ${(s.x + d.x) / 2} ${d.y},
  //     let path = `M ${s.x} ${s.y}
  //     L
  //     ${d.x} ${d.y}`;
  //
  //     return path;
  //   }
  //
  //   // Toggle children on click.
  //   function click(d) {
  //     if (d.children) {
  //       d._children = d.children;
  //       d.children = null;
  //     } else {
  //       d.children = d._children;
  //       d._children = null;
  //     }
  //     update(d);
  //   }
  //
  //   // Highlight node's path
  //   function showPath(d) {
  //     // debugger
  //     let ids = d.ancestors().map((n) => n.id);
  //     let c = d3.selectAll("circle.node");
  //     c.filter(function(d) {
  //       return ids.includes(d.id);
  //     }).style("fill",  "yellow");
  //     c.filter(function(d) {
  //       return !(ids.includes(d.id));
  //     }).each((other) => collapse(other));
  //     update(root);
  //   }
  //
  //   // Return tree node's Huffman code
  //   function getHuffmanCode(d) {
  //     // debugger
  //     const path = [];
  //     const fromRoot = d.ancestors().reverse();
  //     for(i = 1; i < fromRoot.length; i++) {
  //       if(fromRoot[i - 1].children[0] === fromRoot[i]) {
  //         path.push("0");
  //       } else {
  //         path.push("1");
  //       }
  //     }
  //     console.log(path.join(""));
  //     console.log(d);
  //     return path.join("");
  //   }
  //
  //   function getHuffmanCodeTable(r) {
  //     const huffmanTable = [];
  //     let leafNodes = r.leaves();
  //     // debugger
  //     leafNodes.forEach(
  //       (leaf) => {
  //         // debugger
  //         huffmanTable.push(
  //           {
  //             symbol: leaf.data.name,
  //             hCode: getHuffmanCode(leaf),
  //             frequency: leaf.data.count,
  //             node: leaf,
  //           }
  //         );
  //       }
  //     );
  //     return huffmanTable;
  //   }
  //   let c = getHuffmanCodeTable(source);
  //   console.log({data: c.sort(huffCodeSort)});
  //   tabulate(c.sort(huffCodeSort), ['symbol', 'hCode', 'frequency']);
  //   // console.log(huffDictionaryFromData(c));
  // }
  //
  //
  // // tabulate(c.sort(huffCodeSort), ['symbol', 'hCode', 'frequency']);
  // // setTimeout(() => (showPath(c[19].node)), 2000);
  // let sp = $("<span>").text(JSON.stringify(charFreq));
  // // let sp = $("<span>").text(JSON.stringify(huffDictionaryFromData(c)));
  // $("#make-tree").append(sp);

};

const huffCodeSort = (a, b) => (b.frequency - a.frequency);

const tabulate = (data, columns) => {
  let table = d3.select("#huff-table").append("table").classed("huff-code-lookup", true);
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

// $(() => makeTree());
