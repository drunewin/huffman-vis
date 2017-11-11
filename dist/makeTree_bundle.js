/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _penta_node = __webpack_require__(4);

var _penta_node2 = _interopRequireDefault(_penta_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// (head) <-> (...nodes) <-> (tail)
var PentaNodeList = function () {
  function PentaNodeList(freqHash) {
    _classCallCheck(this, PentaNodeList);

    this.count = 0;
    this.head = new _penta_node2.default("head", 0);
    this.tail = new _penta_node2.default("tail", 0);
    this.tail.left = this.head;
    this.head.right = this.tail;
    var keys = Object.keys(freqHash);
    for (var i = 0; i < keys.length; i++) {
      console.log(i);
      var node = new _penta_node2.default(keys[i], freqHash[keys[i]]);
      this.insert(node);
    }
  }

  _createClass(PentaNodeList, [{
    key: "insert",
    value: function insert(node) {
      var currNode = this.tail.left;
      while (currNode !== this.head) {
        if (currNode.count > node.count) {
          // insert to right of currNode
          node.left = currNode;
          node.right = currNode.right;
          currNode.right.left = node;
          currNode.right = node;
          this.count++;
          return;
        }
        currNode = currNode.left;
      }
      // insert to right of head
      node.left = currNode;
      node.right = currNode.right;
      currNode.right.left = node;
      currNode.right = node;
      this.count++;
    }
  }, {
    key: "combineLastTwo",
    value: function combineLastTwo() {
      if (this.count > 1) {
        var last = this.pop();
        var nextToLast = this.pop();
        this.insert(_penta_node2.default.merge(nextToLast, last));
      }
    }
  }, {
    key: "pop",
    value: function pop() {
      if (this.count < 1) {
        return null;
      } else {
        var node = this.tail.left;
        this.tail.left = node.left;
        node.left.right = this.tail;
        node.left = null;
        node.right = null;
        this.count--;
        return node;
      }
    }
  }, {
    key: "getPentaNodeTree",
    value: function getPentaNodeTree() {
      if (this.count < 1) {
        return null;
      } else if (this.count === 1) {
        return this.head.right;
      } else {
        while (this.count > 1) {
          this.combineLastTwo();
        }
        return this.head.right;
      }
    }
  }]);

  return PentaNodeList;
}();

exports.default = PentaNodeList;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _penta_node_list = __webpack_require__(0);

var _penta_node_list2 = _interopRequireDefault(_penta_node_list);

var _util = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passage = 'The last question was asked for the first time, half in jest, on May 21, 2061, at a time when humanity first stepped into the light. The question came about as a result of a five dollar bet over highballs, and it happened this way:\nAlexander Adell and Bertram Lupov were two of the faithful attendants of Multivac. As well as any human beings could, they knew what lay behind the cold, clicking, flashing face -- miles and miles of face -- of that giant computer. They had at least a vague notion of the general plan of relays and circuits that had long since grown past the point where any single human could possibly have a firm grasp of the whole.\n\nMultivac was self-adjusting and self-correcting. It had to be, for nothing human could adjust and correct it quickly enough or even adequately enough -- so Adell and Lupov attended the monstrous giant only lightly and superficially, yet as well as any men could. They fed it data, adjusted questions to its needs and translated the answers that were issued. Certainly they, and all others like them, were fully entitled to share In the glory that was Multivac\'s.\n\nFor decades, Multivac had helped design the ships and plot the trajectories that enabled man to reach the Moon, Mars, and Venus, but past that, Earth\'s poor resources could not support the ships. Too much energy was needed for the long trips. Earth exploited its coal and uranium with increasing efficiency, but there was only so much of both.\n\nBut slowly Multivac learned enough to answer deeper questions more fundamentally, and on May 14, 2061, what had been theory, became fact.\n\nThe energy of the sun was stored, converted, and utilized directly on a planet-wide scale. All Earth turned off its burning coal, its fissioning uranium, and flipped the switch that connected all of it to a small station, one mile in diameter, circling the Earth at half the distance of the Moon. All Earth ran by invisible beams of sunpower.\n\nSeven days had not sufficed to dim the glory of it and Adell and Lupov finally managed to escape from the public function, and to meet in quiet where no one would think of looking for them, in the deserted underground chambers, where portions of the mighty buried body of Multivac showed. Unattended, idling, sorting data with contented lazy clickings, Multivac, too, had earned its vacation and the boys appreciated that. They had no intention, originally, of disturbing it.\n\nThey had brought a bottle with them, and their only concern at the moment was to relax in the company of each other and the bottle.\n\n"It\'s amazing when you think of it," said Adell. His broad face had lines of weariness in it, and he stirred his drink slowly with a glass rod, watching the cubes of ice slur clumsily about. "All the energy we can possibly ever use for free. Enough energy, if we wanted to draw on it, to melt all Earth into a big drop of impure liquid iron, and still never miss the energy so used. All the energy we could ever use, forever and forever and forever."\n\nLupov cocked his head sideways. He had a trick of doing that when he wanted to be contrary, and he wanted to be contrary now, partly because he had had to carry the ice and glassware. "Not forever," he said.\n\n"Oh, hell, just about forever. Till the sun runs down, Bert."\n\n"That\'s not forever."\n\n"All right, then. Billions and billions of years. Twenty billion, maybe. Are you satisfied?"\n\nLupov put his fingers through his thinning hair as though to reassure himself that some was still left and sipped gently at his own drink. "Twenty billion years isn\'t forever."\n\n"Will, it will last our time, won\'t it?"';

var charFreq = {};

for (var i = 0; i < passage.length; i++) {
  var c = passage.charAt(i);
  if (charFreq.hasOwnProperty(c)) {
    charFreq[c] += 1;
  } else {
    charFreq[c] = 1;
  }
}

$(function () {
  console.log(charFreq);
  console.log(Object.keys(charFreq).length);
  var linkedList = new _penta_node_list2.default(charFreq);
  console.log(linkedList);
  var pentaTree = linkedList.getPentaNodeTree();
  console.log(pentaTree);
  var rootNode = (0, _util.rootToJson)(pentaTree);
  console.log(rootNode);
  var treeData = rootNode;
  // $("body").text(JSON.stringify(rootNode));


  var margin = { top: 20, right: 90, bottom: 30, left: 90 };
  var width = 1200 - margin.left - margin.right;
  var height = 900 - margin.top - margin.bottom;

  var svg = d3.select("body").append("svg").attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var i = 0;
  var duration = 750;

  var treemap = d3.tree().size([width, height]);

  // Assigns parent, children, height, depth
  var root = d3.hierarchy(treeData, function (d) {
    return d.children;
  });
  root.x0 = width / 2;
  root.y0 = 0;
  // debugger
  // Collapse after the second level
  // root.children.forEach(collapse);

  update(root);

  // Collapse the node and all it's children
  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function update(source) {

    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
      d.y = d.depth * 60;
    });

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node').data(nodes, function (d) {
      return d.id || (d.id = ++i);
    });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g').attr('class', 'node').attr("transform", function (d) {
      return "translate(" + source.x0 + "," + source.y0 + ")";
    })
    // .on('click', click)
    .on('click', getHuffmanCode).on('mouseover', showPath).on('mouseout', function () {
      return update(root);
    });

    // Add Circle for the nodes
    nodeEnter.append('circle').attr('class', 'node').attr('r', 1e-6).style("fill", function (d) {
      return d._children ? "lightsteelblue" : "#fff";
    });

    // Add labels for the nodes
    nodeEnter.append('text').attr("dx", -5).attr("y", function (d) {
      return d.children || d._children ? -23 : 23;
    }).attr("text-anchor", function (d) {
      return d.children || d._children ? "end" : "start";
    }).text(function (d) {
      return !d.height ? d.data.name + ('[' + d.depth + ']') : "";
    });

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition().duration(duration).attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

    // Update the node attributes and style
    nodeUpdate.select('circle.node').attr('r', 10).style("fill", function (d) {
      return d._children ? "lightsteelblue" : "#fff";
    }).attr('cursor', 'pointer');

    // Remove any exiting nodes
    var nodeExit = node.exit().transition().duration(duration).attr("transform", function (d) {
      return "translate(" + source.x + "," + source.y + ")";
    }).remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle').attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text').style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link').data(links, function (d) {
      return d.id;
    });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g").attr("class", "link").attr('d', function (d) {
      var o = { x: source.x0, y: source.y0 };
      return diagonal(o, o);
    });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition().duration(duration).attr('d', function (d) {
      return diagonal(d, d.parent);
    });

    // Remove any exiting links
    var linkExit = link.exit().transition().duration(duration).attr('d', function (d) {
      var o = { x: source.x, y: source.y };
      return diagonal(o, o);
    }).remove();

    // Store the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      // ${(s.x + d.x) / 2} ${s.y},
      // ${(s.x + d.x) / 2} ${d.y},
      var path = 'M ' + s.x + ' ' + s.y + '\n      L\n      ' + d.x + ' ' + d.y;

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
      var ids = d.ancestors().map(function (n) {
        return n.id;
      });
      var c = d3.selectAll("circle.node").filter(function (d) {
        return ids.includes(d.id);
      }).style("fill", "yellow");
      // update(root);
    }

    // Return tree node's Huffman code
    function getHuffmanCode(d) {
      // debugger
      var path = [];
      var fromRoot = d.ancestors().reverse();
      for (i = 1; i < fromRoot.length; i++) {
        if (fromRoot[i - 1].children[0] === fromRoot[i]) {
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
      var huffmanTable = [];
      var leafNodes = r.leaves();
      // debugger
      leafNodes.forEach(function (leaf) {
        // debugger
        huffmanTable.push({
          symbol: leaf.data.name,
          hCode: getHuffmanCode(leaf),
          frequency: leaf.data.count,
          node: leaf
        });
      });
      return huffmanTable;
    }
    var c = getHuffmanCodeTable(source);
    console.log({ data: c.sort(huffCodeSort) });

    tabulate(c.sort(huffCodeSort), ['symbol', 'hCode', 'frequency']);
    setTimeout(function () {
      return showPath(c[19].node);
    }, 2000);
    console.log(huffDictionaryFromData(c));

    var sp = $("<span>").text(JSON.stringify(charFreq));
    // let sp = $("<span>").text(JSON.stringify(huffDictionaryFromData(c)));
    $("body").append(sp);
  }
});

var huffCodeSort = function huffCodeSort(a, b) {
  return b.frequency - a.frequency;
};

var tabulate = function tabulate(data, columns) {
  var table = d3.select("body").append("table").classed("huff-code-lookup", true);
  var thead = table.append("thead");
  var tbody = table.append("tbody");

  // append header row
  thead.append("tr").selectAll("th").data(columns).enter().append("th").text(function (column) {
    return column;
  });

  // append rows for each Object
  var rows = tbody.selectAll("tr").data(data).enter().append("tr");

  // create cells
  var cells = rows.selectAll("td").data(function (row) {
    return columns.map(function (column) {
      return {
        column: column,
        value: row[column]
      };
    });
  }).enter().append("td").text(function (d) {
    return d.value;
  });

  return table;
};

var huffDictionaryFromData = function huffDictionaryFromData(data) {
  var dict = {};
  data.forEach(function (datum) {
    dict[datum.symbol.toString()] = datum.hCode;
  });
  return dict;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PentaNode = function () {
  function PentaNode(name, count) {
    _classCallCheck(this, PentaNode);

    this.name = name;
    this.count = count;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
  }

  _createClass(PentaNode, [{
    key: "isLeaf",
    value: function isLeaf() {
      return !this.leftChild && !this.rightChild;
    }
  }, {
    key: "isLeftChild",
    value: function isLeftChild() {
      if (this.parent) {
        return this.parent.leftChild === this;
      } else {
        return false;
      }
    }
  }, {
    key: "getBirthOrder",
    value: function getBirthOrder() {
      if (this.parent.leftChild === this) {
        return 0;
      }
      if (this.parent.rightChild === this) {
        return 1;
      }
      return -1;
    }
  }, {
    key: "setLeft",
    value: function setLeft(node) {
      node.right = this;
      node.left = this.left;
      if (this.left) {
        this.left.right = node;
      }
      this.left = node;
    }
  }, {
    key: "setRight",
    value: function setRight(node) {
      node.right = this;
      node.left = this.left;
      if (this.left) {
        this.left.right = node;
      }
      this.left = node;
    }
  }, {
    key: "setLeftChild",
    value: function setLeftChild(node) {
      if (node) {
        if (node.parent) {
          var order = this.getBirthOrder();
          if (order === 0) {
            node.parent.leftChild = null;
          } else if (order === 1) {
            node.parent.rightChild = null;
          }
          node.parent = null;
        }
        node.parent = this;
      }
      this.leftChild = node;
    }
  }, {
    key: "setRightChild",
    value: function setRightChild(node) {
      if (node) {
        if (node.parent) {
          var order = this.getBirthOrder();
          if (order === 0) {
            node.parent.leftChild = null;
          } else if (order === 1) {
            node.parent.rightChild = null;
          }
          node.parent = null;
        }
        node.parent = this;
      }
      this.rightChild = node;
    }
  }], [{
    key: "merge",
    value: function merge(left, right) {
      var node = new PentaNode(left.name + right.name, left.count + right.count);
      node.leftChild = left;
      node.rightChild = right;
      left.parent = node;
      right.parent = node;
      return node;
    }
  }]);

  return PentaNode;
}();

exports.default = PentaNode;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootToJson = undefined;

var _penta_node_list = __webpack_require__(0);

var _penta_node_list2 = _interopRequireDefault(_penta_node_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var charBinAt = function charBinAt(str, idx) {
  return padEightBits(str.charCodeAt(idx).toString(2));
};

var charToBin = function charToBin(ch) {
  return padEightBits(ch.charCodeAt(0).toString(2));
};

var stringToBin = function stringToBin(str) {
  var binString = "";
  for (var i = 0; i < str.length; i++) {
    binString = binString.concat(charToBin(str.charAt(i)));
  }
  return binString;
};

var padEightBits = function padEightBits(bin) {
  var numLeadingZeros = 8 - bin.length;
  return "0".repeat(numLeadingZeros).concat(bin);
};

var charToName = function charToName(ch) {
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

var rootToJson = exports.rootToJson = function rootToJson(root) {
  if (root.isLeaf()) {
    return {
      name: root.name,
      count: root.count,
      children: null
    };
  } else {
    return {
      name: root.name,
      count: root.count,
      children: [rootToJson(root.leftChild), rootToJson(root.rightChild)]
    };
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=makeTree_bundle.js.map