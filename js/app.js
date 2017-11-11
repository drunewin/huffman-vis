import { startDocToAscii, setView } from './doc_to_ascii';
import Player from './player';

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
    const timers = stepTimers[stepId];
    if (timers.interval) {
      clearInterval(timers.interval);
      stepTimers[stepId].interval = null;
    }
    if (timers.timeout) {
      clearTimeout(timers.timeout);
      stepTimers[stepId].timeout = null;
    }
  });

  rootElement.on("impress:stepenter", () => {
    let id = $(".present").attr("id");
    presentStepId = id;
    console.log(`Entered step: ${presentStepId}`);
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

const setAsciiListeners = () => {
  player = new Player(setView);
  $(".playback-rate").text(player.getFps());

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

};
