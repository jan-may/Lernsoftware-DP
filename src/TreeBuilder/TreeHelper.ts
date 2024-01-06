import { TreeNodeModel } from './TreeNodeModel'; // Ensure this path is correct

export class TreeHelper {
  static nodeSize: number = 1;
  static siblingDistance: number = 1.0;
  static treeDistance: number = 2.0;

  static createEmptyTree<T>(): TreeNodeModel<T> {
    return new TreeNodeModel(
      (null as unknown) as T,
      (null as unknown) as TreeNodeModel<T>
    );
  }

  static calculateNodePositions<T>(rootNode: TreeNodeModel<T>): void {
    this.initializeNodes(rootNode, 0);
    this.calculateInitialX(rootNode);
    this.checkAllChildrenOnScreen(rootNode);
    this.calculateFinalPositions(rootNode, 0);
  }

  static initializeNodes<T>(node: TreeNodeModel<T>, depth: number): void {
    node.x = -1;
    node.y = depth;
    node.mod = 0;
    node.children.forEach((child) => this.initializeNodes(child, depth + 1));
  }

  static calculateInitialX<T>(node: TreeNodeModel<T>): void {
    node.children.forEach((child) => this.calculateInitialX(child));

    if (node.isLeaf()) {
      if (!node.isLeftMost()) {
        const previousSibling = node.getPreviousSibling();
        if (previousSibling) {
          node.x = previousSibling.x + this.nodeSize + this.siblingDistance;
        }
      } else {
        node.x = 0;
      }
    } else {
      let leftChild = node.getLeftMostChild();
      let rightChild = node.getRightMostChild();
      let mid = 0;
      if (leftChild && rightChild) {
        mid = (leftChild.x + rightChild.x) / 2;
      }

      if (node.isLeftMost()) {
        node.x = mid;
      } else {
        const previousSibling = node.getPreviousSibling();
        if (previousSibling) {
          node.x = previousSibling.x + this.nodeSize + this.siblingDistance;
          node.mod = node.x - mid;
        }
      }
    }

    if (node.children.length > 0 && !node.isLeftMost()) {
      this.checkForConflicts(node);
    }
  }

  static checkForConflicts<T>(node: TreeNodeModel<T>): void {
    let minDistance = this.treeDistance + this.nodeSize;
    let shiftValue = 0;
    let nodeContour = new Map<number, number>();
    this.getLeftContour(node, 0, nodeContour);

    let sibling: TreeNodeModel<T> | null = node.getLeftMostSibling();
    while (sibling && sibling !== node) {
      let siblingContour = new Map<number, number>();
      this.getRightContour(sibling, 0, siblingContour);

      for (
        let level = node.y + 1;
        siblingContour.has(level) && nodeContour.has(level);
        level++
      ) {
        let distance = nodeContour.get(level)! - siblingContour.get(level)!;
        if (distance + shiftValue < minDistance) {
          shiftValue = minDistance - distance;
        }
      }

      if (shiftValue > 0) {
        node.x += shiftValue;
        node.mod += shiftValue;
        this.centerNodesBetween(node, sibling);
        shiftValue = 0;
      }
      sibling = sibling?.getNextSibling() || null;
    }
  }

  static centerNodesBetween<T>(leftNode: TreeNodeModel<T>, rightNode: TreeNodeModel<T>): void {
    // Ensure both nodes have a parent and the parents are the same (i.e., siblings)
    if (leftNode.parent && rightNode.parent && leftNode.parent === rightNode.parent) {
      let leftIndex = leftNode.parent.children.indexOf(leftNode);
      let rightIndex = leftNode.parent.children.indexOf(rightNode);
      let numNodesBetween = leftIndex - rightIndex - 1;

      if (numNodesBetween > 0) {
        let distanceBetweenNodes = (leftNode.x - rightNode.x) / (numNodesBetween + 1);
        let count = 1;
        for (let i = rightIndex + 1; i < leftIndex; i++) {
          let middleNode = leftNode.parent.children[i];
          let desiredX = rightNode.x + distanceBetweenNodes * count;
          let offset = desiredX - middleNode.x;
          middleNode.x += offset;
          middleNode.mod += offset;
          count++;
        }
      }
    }
  }

  static checkAllChildrenOnScreen<T>(node: TreeNodeModel<T>): void {
    let nodeContour = new Map<number, number>();
    this.getLeftContour(node, 0, nodeContour);

    let shiftAmount = 0;
    nodeContour.forEach((x, y) => {
      if (x + shiftAmount < 0) {
        shiftAmount = -x;
      }
    });

    if (shiftAmount > 0) {
      node.x += shiftAmount;
      node.mod += shiftAmount;
    }
  }

  static getLeftContour<T>(node: TreeNodeModel<T>, modSum: number, values: Map<number, number>): void {
    if (!values.has(node.y)) {
      values.set(node.y, node.x + modSum);
    } else {
      values.set(node.y, Math.min(values.get(node.y)!, node.x + modSum));
    }

    modSum += node.mod;
    node.children.forEach((child) => this.getLeftContour(child, modSum, values));
  }

  static getRightContour<T>(node: TreeNodeModel<T>, modSum: number, values: Map<number, number>): void {
    if (!values.has(node.y)) {
      values.set(node.y, node.x + modSum);
    } else {
      values.set(node.y, Math.max(values.get(node.y)!, node.x + modSum));
    }

    modSum += node.mod;
    node.children.forEach((child) => this.getRightContour(child, modSum, values));
  }

  static calculateFinalPositions<T>(node: TreeNodeModel<T>, modSum: number): void {
    node.x += modSum;
    modSum += node.mod;
    node.key = node.x + "-" + node.y + "-" + node.item + "-" + node.isMemo;
    node.children.forEach((child) => this.calculateFinalPositions(child, modSum));

    if (node.isLeaf()) {
      node.width = node.x;
      node.height = node.y;
    } else {
      node.width = Math.max(...node.children.map((child) => child.width));
      node.height = Math.max(...node.children.map((child) => child.height));
    }
  }

  static shiftTree<T>(node: TreeNodeModel<T>, shiftAmount: number): void {
    node.x += shiftAmount;
    node.y += shiftAmount;
    node.children.forEach((child) => this.shiftTree(child, shiftAmount));
  }

  static printTree<T>(node: TreeNodeModel<T>, indent = 0): void {
    console.log(" ".repeat(indent) + node.item + " (" + node.x + "," + node.y + ")");
    node.children.forEach((child) => this.printTree(child, indent + 2));
  }

  static getMaxWidth<T>(node: TreeNodeModel<T>): number {
    if (node.isLeaf()) {
      return node.width;
    }
    return Math.max(node.width, ...node.children.map((child) => this.getMaxWidth(child)));
  }

  static getMaxDepth<T>(node: TreeNodeModel<T>): number {
    if (node.isLeaf()) {
      return 1;
    }
    return 1 + Math.max(...node.children.map((child) => this.getMaxDepth(child)));
  }

  static setKey<T>(node: TreeNodeModel<T>): void {
    node.children.forEach((child) => this.setKey(child));
  }
}
