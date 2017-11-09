import PentaNode from './penta_node.js';

class PentaNodeTree {
  constructor(node1, node2) {
    if (!node2) {
      this.root = node1;
    } else {
      this.root = new PentaNode(node1,name.concat(node2.name), node1.count + node2.count);
      this.root.leftChild = node1;
      this.root.rightChild = node2;
    }
  }

  
}

export default PentaNodeTree;
