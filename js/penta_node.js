class PentaNode {
  constructor(name, freq) {
    this.name = name;
    this.freq = freq;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
  }

  isLeaf() {
    return (!this.leftChild) && (!this.rightChild);
  }

  setLeft(node) {
    node.right = this;
    node.left = this.left;
    if (this.left) {
      this.left.right = node;
    }
    this.left = node;
  }

  static merge(left, right) {
    const node = new PentaNode(left.name + right.name, left.freq + right.freq);
    node.leftChild = left;
    node.rightChild = right;
    left.parent = node;
    right.parent = node;
  }
}

export default PentaNode;
