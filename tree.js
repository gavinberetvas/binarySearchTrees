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

  insert(data, root = this.root) {
    if (root === null) {
      root = new Node(data);
      return root;
    }
   
    if (data < root.value) {
      root.leftChild = this.search(data, root.leftChild)
    } else if (data > root.value) {
      root.rightChild = this.search(data, root.rightChild)
    }

    return root

  }
  

  delete(value, root = this.root) {

    console.log


    //3 cases
    //delete a leaf
    //delete a node with one child
    //delete node with two children
    
  }

  levelOrderTraversal(value, root = this.root) {
    console.log(root.value);
    

}

///testing///
let testArray = [1, 2, 6, 11, 17, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let item = new BinarySearchTree(testArray);
item.prettyPrint();
item.insert(1117);
item.prettyPrint();