import { startDocToAscii, setView, setViewWithHuff } from './doc_to_ascii';
import { update, setTreeTransformView } from './list_collapse';
import { listenerCallback } from './make_tree';
import Player from './player';
// import HuffmanTreeView from './huffman_tree_view';

const stepTimers =
{
  intro: {index: 0, interval: null, timeout: null},
  ascii: {index: 0, interval: null, timeout: null},
  third: {index: 0, interval: null, timeout: null},
  fourth: {index: 0, interval: null, timeout: null},
  fif: {index: 0, interval: null, timeout: null},
};

let player = null;

let presentStepId = null;
window.presentStepId = presentStepId;

$(() => {
  const rootElement = $("#impress");

  rootElement.on("impress:init", () => {
    console.log("impress initiated");
  });

  rootElement.on("impress:stepleave", (e) => {
    const stepId = e.target.id;
    console.log(`Left step: ${stepId}!`);
  });

  let treeCb = listenerCallback();

  rootElement.on("impress:stepenter", () => {
    let id = $(".present").attr("id");
    presentStepId = id;
    console.log(`Entered step: ${presentStepId}`);
    // debugger
    switch (presentStepId) {
      case "ascii":
        setListeners(setView);
        break;
      case "table-transform":
        setListeners(setTreeTransformView());
        break;
      case "make-tree":
        setListeners(treeCb);
        player.setIntervalLength(1000);
        break;
      case "doc-ascii-huff":
        setListeners(setViewWithHuff);
        break;
      default:
        break;
    }
  });

  impress().init();
});

const setListeners = (iterationCb) => {
  if (player) player.pause();
  player = new Player(iterationCb, 0);
  player.stepForward();

  $(".play-btn").on("click", () => {
    player.play();
  });
  $(".pause-btn").on("click", ()=>{
    player.pause();
  });
  $(".stop-btn").on("click", ()=>{
    player.stop();
  });
  $(".slower-btn").on("click", ()=>{
    $(".playback-rate").text(player.slowDown(2));
  });
  $(".faster-btn").on("click", ()=>{
    $(".playback-rate").text(player.speedUp(2));
  });
  $(".back-btn").on("click", ()=>{
    player.stepBack();
  });
  $(".forward-btn").on("click", ()=>{
    player.stepForward();
  });

};
