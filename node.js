export function printMessage() {
    console.log(node);
}

export class Node {
    constructor(data) {
        this.data = data;
        this.right = null;
        this.left = null;
      }
}

let node = new Node("data")