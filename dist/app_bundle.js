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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _doc_to_ascii = __webpack_require__(2);

var _player = __webpack_require__(6);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepTimers = {
  intro: { index: 0, interval: null, timeout: null },
  ascii: { index: 0, interval: null, timeout: null },
  third: { index: 0, interval: null, timeout: null },
  fourth: { index: 0, interval: null, timeout: null },
  fif: { index: 0, interval: null, timeout: null }
};

var player = null;

var presentStepId = null;
window.presentStepId = presentStepId;

$(function () {
  var rootElement = $("#impress");

  rootElement.on("impress:init", function () {
    console.log("impress initiated");
  });

  rootElement.on("impress:stepleave", function (e) {
    var stepId = e.target.id;
    console.log('Left step: ' + stepId + '!');
    var timers = stepTimers[stepId];
    if (timers.interval) {
      clearInterval(timers.interval);
      stepTimers[stepId].interval = null;
    }
    if (timers.timeout) {
      clearTimeout(timers.timeout);
      stepTimers[stepId].timeout = null;
    }
  });

  rootElement.on("impress:stepenter", function () {
    var id = $(".present").attr("id");
    presentStepId = id;
    console.log('Entered step: ' + presentStepId);
    // debugger
    switch (presentStepId) {
      case "ascii":
        setAsciiListeners();
        break;
      default:
        break;
    }
  });

  impress().init();
});

var setAsciiListeners = function setAsciiListeners() {
  player = new _player2.default(_doc_to_ascii.setView, 3400);
  player.stepForward();

  $(".play-btn").on("click", function () {
    player.play();
  });
  $(".pause-btn").on("click", function () {
    player.pause();
  });
  $(".stop-btn").on("click", function () {
    player.stop();
  });
  $(".slower-btn").on("click", function () {
    $(".playback-rate").text(player.slowDown(2));
  });
  $(".faster-btn").on("click", function () {
    $(".playback-rate").text(player.speedUp(2));
  });
  $(".back-btn").on("click", function () {
    player.stepBack();
  });
  $(".forward-btn").on("click", function () {
    player.stepForward();
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import { charBinAt, charToBin, stringToBin } from './util.js';

var passage = "The last question was asked for the first time, half in jest, on May 21, 2061, at a time when humanity first stepped into the light. The question came about as a result of a five dollar bet over highballs, and it happened this way:\nAlexander Adell and Bertram Lupov were two of the faithful attendants of Multivac. As well as any human beings could, they knew what lay behind the cold, clicking, flashing face -- miles and miles of face -- of that giant computer. They had at least a vague notion of the general plan of relays and circuits that had long since grown past the point where any single human could possibly have a firm grasp of the whole.\n\nMultivac was self-adjusting and self-correcting. It had to be, for nothing human could adjust and correct it quickly enough or even adequately enough -- so Adell and Lupov attended the monstrous giant only lightly and superficially, yet as well as any men could. They fed it data, adjusted questions to its needs and translated the answers that were issued. Certainly they, and all others like them, were fully entitled to share In the glory that was Multivac's.\n\nFor decades, Multivac had helped design the ships and plot the trajectories that enabled man to reach the Moon, Mars, and Venus, but past that, Earth's poor resources could not support the ships. Too much energy was needed for the long trips. Earth exploited its coal and uranium with increasing efficiency, but there was only so much of both.\n\nBut slowly Multivac learned enough to answer deeper questions more fundamentally, and on May 14, 2061, what had been theory, became fact.\n\nThe energy of the sun was stored, converted, and utilized directly on a planet-wide scale. All Earth turned off its burning coal, its fissioning uranium, and flipped the switch that connected all of it to a small station, one mile in diameter, circling the Earth at half the distance of the Moon. All Earth ran by invisible beams of sunpower.\n\nSeven days had not sufficed to dim the glory of it and Adell and Lupov finally managed to escape from the public function, and to meet in quiet where no one would think of looking for them, in the deserted underground chambers, where portions of the mighty buried body of Multivac showed. Unattended, idling, sorting data with contented lazy clickings, Multivac, too, had earned its vacation and the boys appreciated that. They had no intention, originally, of disturbing it.\n\nThey had brought a bottle with them, and their only concern at the moment was to relax in the company of each other and the bottle.\n\n\"It's amazing when you think of it,\" said Adell. His broad face had lines of weariness in it, and he stirred his drink slowly with a glass rod, watching the cubes of ice slur clumsily about. \"All the energy we can possibly ever use for free. Enough energy, if we wanted to draw on it, to melt all Earth into a big drop of impure liquid iron, and still never miss the energy so used. All the energy we could ever use, forever and forever and forever.\"\n\nLupov cocked his head sideways. He had a trick of doing that when he wanted to be contrary, and he wanted to be contrary now, partly because he had had to carry the ice and glassware. \"Not forever,\" he said.\n\n\"Oh, hell, just about forever. Till the sun runs down, Bert.\"\n\n\"That's not forever.\"\n\n\"All right, then. Billions and billions of years. Twenty billion, maybe. Are you satisfied?\"\n\nLupov put his fingers through his thinning hair as though to reassure himself that some was still left and sipped gently at his own drink. \"Twenty billion years isn't forever.\"\n\n\"Will, it will last our time, won't it?\"";

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

var setView = exports.setView = function setView(index) {
  // let body = $('.docs-view');
  // let textDoc = $(".text-doc");
  // let asciiDoc = $(".ascii-doc");

  var textDocContents = cursorTextDocHtml(passage, index);
  var asciiDocContents = cursorAsciiDocHtml(passage, index);

  if (index <= -1) {
    return true;
  } else if (index > passage.length) {
    return true;
  } else {
    return false;
  }
};

var cursorTextDocHtml = function cursorTextDocHtml(txt, charIndex, num) {
  var docHtml = $(".text-doc");
  var pre = $("<span>");
  pre.addClass("pre-text");
  var cur = $("<span>");
  cur.addClass("cursor");
  var post = $("<span>");
  post.addClass("post-text");

  var pText = void 0;
  var cText = void 0;
  var postText = void 0;

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
  return docHtml;
};

var cursorAsciiDocHtml = function cursorAsciiDocHtml(txt, charIndex, num) {
  var docHtml = $(".bin-doc");
  var pre = $("<span>");
  pre.addClass("pre-text");
  var cur = $("<span>");
  cur.addClass("cursor");
  var post = $("<span>");
  post.addClass("post-text");

  var pText = stringToBin(txt.substring(0, charIndex));
  var cText = charIndex >= txt.length ? " " : charToBin(txt.charAt(charIndex));
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

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(callback, index, interval) {
    _classCallCheck(this, Player);

    this.iteration = callback;
    this.index = index || 0;
    this.timer = null;
    this.interval = interval || 500;
    this.ended = false;
  }

  _createClass(Player, [{
    key: "play",
    value: function play() {
      var _this = this;

      if (!this.timer) {
        this.timer = setInterval(function () {
          if (_this.ended) {
            _this.pause();
          } else {
            _this.ended = _this.iteration(_this.index++);
          }
        }, this.interval);
      }
    }
  }, {
    key: "stepForward",
    value: function stepForward() {
      if (!this.ended) {
        this.pause();
        this.ended = this.iteration(this.index++);
      }
    }
  }, {
    key: "stepBack",
    value: function stepBack() {
      if (this.index > -1) {
        this.pause();
        this.ended = this.iteration(--this.index);
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }, {
    key: "slowDown",
    value: function slowDown(value) {
      if (this.interval === 1000) {
        return Math.floor(1000 / this.interval);
      }
      this.interval = Math.floor(this.interval * value);
      if (this.interval > 1000) {
        this.interval = 1000;
      }
      if (this.timer) {
        this.pause();
        this.play();
      }
      return Math.floor(1000 / this.interval);
    }
  }, {
    key: "speedUp",
    value: function speedUp(value) {
      if (this.interval === 10) {
        return Math.floor(1000 / this.interval);
      }
      this.interval = Math.floor(this.interval / value);
      if (this.interval < 10) {
        this.interval = 10;
      }
      if (this.timer) {
        this.pause();
        this.play();
      }
      return Math.floor(1000 / this.interval);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.index = 0;
      this.ended = this.iteration(this.index);
    }
  }, {
    key: "setIteration",
    value: function setIteration(callback) {
      this.iteration = callback;
    }
  }, {
    key: "getFps",
    value: function getFps() {
      return Math.floor(1000 / this.interval);
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ })
/******/ ]);
//# sourceMappingURL=app_bundle.js.map