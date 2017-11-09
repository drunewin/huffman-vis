import PentaNode from './penta_node.js';

// (head) <-> (...nodes) <-> (tail)
class PentaNodeList {
  constructor(freqHash) {
    this.count = 0;
    this.head = new PentaNode("head", 0);
    this.tail = new PentaNode("tail", 0);
    this.tail.left = this.head;
    this.head.right = this.tail;
    let keys = Object.keys(freqHash);
    for (let i = 0; i < keys.length; i++) {
      console.log(i);
      let node = new PentaNode(keys[i], freqHash[keys[i]]);
      this.insert(node);
    }
  }

  insert(node) {
    let currNode = this.tail.left;
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

  combineLastTwo() {
    if (this.count > 1) {
      let last = this.pop();
      let nextToLast = this.pop();
      this.insert(PentaNode.merge(nextToLast, last));
    }
  }

  pop() {
    if (this.count < 1) {
      return null;
    } else {
      let node = this.tail.left;
      this.tail.left = node.left;
      node.left.right = this.tail;
      node.left = null;
      node.right = null;
      this.count--;
      return node;
    }
  }

  getPentaNodeTree() {
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

}

export default PentaNodeList;
