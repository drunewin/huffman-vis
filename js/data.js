import * as Util from './util';
import PentaNodeList from './util';

export const appData = {
  passage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

};

class AppdData {
  constructor(text) {
    this.text = text;
    this.charFreq = Util.getCharFreq(this.text);
    this.rootNode = {};
    this.huffDict = {};
    this.huffHeader = "";
  }
}
appData["charFreq"] = Util.getCharFreq(appData.passage);
appData["huffDict"] = {};
appData["huffHeader"] = "";
