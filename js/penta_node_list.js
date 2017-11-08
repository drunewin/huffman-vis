import PentaNode from './penta_node.js';

class PentaNodeList {
  constructor(freqHash) {
    let vals = Object.values(freqHash);
    let keys = Object.keys(freqHash);
    this.count = 0;
    this.head = new PentaNode(null, null);
    this.tail = new PentaNode(null, null);
    this.tail.setLeft(this.head);
  }
}

export default PentaNodeList;
