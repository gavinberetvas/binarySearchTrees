import { Node } from "./node.js";

class BinarySearchTree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  #sortRemoveDuplicates(array) {
    const sortedArray = array.sort((a, b) => a - b);
    const noDuplicateValuesArray = [...new Set(sortedArray)];
    return noDuplicateValuesArray;
  }

  buildTree(
    array,
    start = 0,
    end = this.#sortRemoveDuplicates(array).length - 1
    ) {
    if (start > end) return null;

    const sort = this.#sortRemoveDuplicates(array);
    const mid = parseInt((start + end) / 2);
    const root = new Node(sort[mid]);
    root.leftChild = this.buildTree(sort, start, mid - 1);
    root.rightChild = this.buildTree(sort, mid + 1, end);

    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.rightChild) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "|   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "|   "}`,
        true
      );
    }
  }
}

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let item = new BinarySearchTree(testArray);
item.prettyPrint();
