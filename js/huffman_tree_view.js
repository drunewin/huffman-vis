
class HuffmanTreeView {
  constructor(data, width, height) {
    this.svg = d3.select("#huff-tree").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate("
          + "0" + "," + "20" + ")");

    this.width = width;
    this.height = height;

    this.duration = 750; //ms
    this.i = 0;

    this.treemap = d3.tree().size([width, height]);

    this.root = d3.hierarchy(data.toHierarchyObject(), function(d) {
      return d.children;
    });

    this.root.x0 = width / 2;
    this.root.y0 = 0;

    this.leaves = this.treemap(this.root).leaves();
    console.log(this.leaves);

    this.collapsed = [];

    this.update(this.root);
    let timer = setInterval(()=> {
      this.root = d3.hierarchy(data.nextMorphState(), function(d) {
        return d.children;
      });

      this.root.x0 = width / 2;
      this.root.y0 = 0;
      this.update(this.root);
      if (data.isTree()) {
        clearInterval(timer);
        console.log("interval cleared");
      }
    }, 1000);

  }

  numLeaves() {
    return this.leaves.length;
  }

  setView(n) {
    this.update(this.root, n);
  }

  update(source, index) {
    let treeData = this.treemap(this.root);
    let nodes = treeData.descendants();
    let links = treeData.descendants().slice(1);

    nodes.forEach((d) => { d.y = d.depth * 40;});

    let node = this.svg.selectAll("g.node")
      .data(nodes, (d) => {
        // debugger
        // console.log(this.i);
        // return d.id || (d.id = ++this.i);
        return d.id || (d.id = d.name);
        // return d.name;
      });

    let nodeEnter = node.enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        // console.log(d);
        return "translate(" + (d.parent ? d.x : source.x) + "," + (d.parent ? d.y : source.y) + ")";
      })
      // ;
      .on("click", click.bind(this));
      // .on("click", showPath.bind(this));
      // .on("click", hideOthers.bind(this));

    nodeEnter.append('circle')
    .attr('class', 'node')
    .attr('r', 1e-6)
    .style("fill", function(d) {
      return d.children || d._children ? "lightsteelblue" : "#fff";
    });

    nodeEnter.append("text")
    .attr("dx", -5)
    .attr("y", function(d) {
      return d.children || d._children ? -23 : 23;
    })
    .attr("text-anchor", function(d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function(d) {
      return d.data.name.length > 1 ? d.data.count : d.data.name;
    });
    // .text(function(d) {
    //   if (!d.height) {
    //     switch (d.data.name) {
    //       case " ":
    //         return "[space]";
    //       case "\n":
    //         return "\n";
    //       default:
    //         return d.data.name;
    //     }
    //   } else {
    //     return "";
    //   }
    // });

    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
    .duration(this.duration)
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
    let nodeExit = node.exit().transition()
    .duration(this.duration)
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
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
    let link = this.svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    let linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        let o = {x: d.x, y: d.y};
        return diagonal(o, o);
      });

    // UPDATE
    let linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(this.duration)
      .attr('d', function(d){ return diagonal(d, d.parent); });

    // Remove any exiting links
    let linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal(o, o);
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d) {
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


    function collapse(d) {
      if(d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function expand(d) {
      if(d._children) {
        d.children = d._children;
        d.children.forEach(expand);
        d._children = null;
      }
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
      this.update(d);
    }


    // Highlight node's path
    function showPath(d) {
      console.log("showing path");
      // debugger
      let ids = d.ancestors().map((n) => n.id);
      let c = d3.selectAll("circle.node");
      console.log(ids);
      c.filter((f) => {
        return ids.includes(f.id);
      }).style("fill", "yellow");
      // this.update(this.root);
    }

    function hideOthers(d) {
      let ids = d.ancestors().map((n) => n.id);
      let c = d3.selectAll("circle.node");
      // c.filter((f) => {
      //   return ids.includes(f.id);
      // }).style("fill",  "yellow");
      c.filter((g) => {
        return !(ids.includes(g.id));
      }).each((h) => {
        this.collapsed.push(h);
        collapse(h);
      });
      this.update(this.root);
    }

    function expandCollapsed() {
      while (this.collapsed.length > 0) {
        expand.bind(this)(this.collapsed.pop());
      }
    }

    if (index) {
      if (index % 2 === 0) {
        expandCollapsed.bind(this)();
      } else {
        // debugger
        hideOthers.bind(this)(this.leaves[Math.floor(index / 2)]);
        showPath.bind(this)(this.leaves[Math.floor(index / 2)]);
        console.log(this.leaves[Math.floor(index / 2)]);
        this.highlightRow(this.leaves[Math.floor(index/2)].data.name);
      }
    }
  }

  // Return tree node's Huffman code
  getHuffmanCode(d) {
    // debugger
    const path = [];
    const fromRoot = d.ancestors().reverse();
    for(let i = 1; i < fromRoot.length; i++) {
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

  getHuffmanCodeTable(r) {
    const huffmanTable = [];
    let leafNodes = r.leaves();
    // debugger
    leafNodes.forEach(
      (leaf) => {
        // debugger
        huffmanTable.push(
          {
            symbol: leaf.data.name,
            hCode: this.getHuffmanCode(leaf),
            frequency: leaf.data.count,
            node: leaf,
          }
        );
      }
    );
    return huffmanTable;
  }

  huffCodeSort(a, b) {
    (b.frequency - a.frequency);
  }

  highlightRow(name) {
    d3.select(".huff-table-body").selectAll("tr").filter(function(row) {
      console.log(row);
      // return true;
      return row["symbol"] !== name;
    }).style("background-color", "white");
    d3.select(".huff-table-body").selectAll("tr").filter(function(row) {
      console.log(row);
      // return true;
      return row["symbol"] === name;
    }).style("background-color", "yellow");
  }

  tabulate (data, columns) {
    let table = d3.select("#huff-table").append("table").classed("huff-code-lookup", true);
    let thead = table.append("thead");
    let tbody = table.append("tbody").classed("huff-table-body", true);

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
  }

  huffDictionaryFromData (data) {
    const dict = {};
    data.forEach(
      (datum) => {
        dict[datum.symbol.toString()] = datum.hCode;
      }
    );
    return dict;
  }
}

export default HuffmanTreeView;
