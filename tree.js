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
      root.leftChild = this.insert(data, root.leftChild);
    } else if (data > root.value) {
      root.rightChild = this.insert(data, root.rightChild);
    }

    return root;
  }

  delete(data, root = this.root) {
    if (root === null) {
      return root;
    }

    if (data < root.value) {
      root.leftChild = this.delete(data, root.leftChild);
    } else if (data > root.value) {
      root.rightChild = this.delete(data, root.rightChild);
    } else {
      if (root.leftChild === null && root.rightChild === null) {
        root = null;
      } else if (root.leftChild === null) {
        root = root.rightChild;
      } else if (root.rightChild === null) {
        root = root.leftChild;
      } else if (root.leftChild && root.rightChild) {
        //get next largest value
        const findMinimumValue = (node) => {
          while(node.leftChild != null) {
            node = node.leftChild
          }
          return node
        }

        // const nextLargestValue = findMinimumValue(root.rightChild)
        // root.value = nextLargestValue.value;
        // root.rightChild = this.delete(nextLargestValue.value, root.rightChild)

        root.value = findMinimumValue(root.rightChild).value
        root.rightChild = this.delete(root.value, root.rightChild)
      }
    }

    return root;
  }

  levelOrderTraversal(arr = [], queue = [], root = this.root) {
    if (root == null) return;

    arr.push(root.value);
    queue.push(root.leftChild);
    queue.push(root.rightChild);

    while (queue.length) {
      const level = queue[0];
      queue.shift();

      this.levelOrderTraversal(arr, queue, level);
    }
    console.log("test", arr);
    console.log("queuelevels", level2);
  }
}

let testArray = [1, 2, 6, 11, 17, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let item = new BinarySearchTree(testArray);
item.prettyPrint();
item.insert(1117);
item.prettyPrint();
item.delete(4);
item.prettyPrint();
item.delete(5);
item.prettyPrint();
// item.levelOrderTraversal()

// function findMinimumValue(root) {
//   while(root.leftChild != null) {
//     root = root.leftChild
//   }
//   return root
// }