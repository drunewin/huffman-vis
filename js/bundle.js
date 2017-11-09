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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _penta_node_list = __webpack_require__(1);

var _penta_node_list2 = _interopRequireDefault(_penta_node_list);

var _util = __webpack_require__(3);

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
  // $("body").text(JSON.stringify(rootNode));

  var canvas = d3.select("body").append("svg").attr("width", 500).attr("height", 500).append("g").attr("transform", "translate(50, 50)");

  var tree = d3.tree().size([400, 400]);

  var root = d3.hierarchy(rootNode, function (d) {
    return d.children;
  });
  root.x0 = 200;
  root.y0 = 0;

  var treeData = tree(root);
  var nodes = treeData.descendants();
  var links = treeData.links();
  console.log(nodes);
  console.log(links);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _penta_node = __webpack_require__(2);

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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootToJson = undefined;

var _penta_node_list = __webpack_require__(1);

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
//# sourceMappingURL=bundle.js.map