import { TreeNodeModel } from "./TreeNodeModel"; // Ensure this path is correct

interface NodeWithParent {
  node: TreeNodeModel<number>;
  parent: TreeNodeModel<number> | null;
}

/**
 * TreeHelper is a utility class that provides static methods for manipulating and querying tree structures.
 * It is designed to work with TreeNodeModel objects.
 */
export class TreeHelper {
  static nodeSize: number = 1;
  static siblingDistance: number = 1.0;
  static treeDistance: number = 2.0;

  /** Creates an empty tree with a single root node.
   * @returns {TreeNodeModel<T>} - The root node of the tree.
   */
  static createEmptyTree<T>(): TreeNodeModel<T> {
    return new TreeNodeModel(
      null as unknown as T,
      null as unknown as TreeNodeModel<T>
    );
  }

  /**
   * main function for building a tree from a list of nodes.
   * calculates positions of all nodes in a tree.
   * @param {TreeNodeModel<T>} rootNode - The root node of the tree.
   * @returns {void}
   */
  static calculateNodePositions<T>(rootNode: TreeNodeModel<T>): void {
    this.initializeNodes(rootNode, 0);
    this.calculateInitialX(rootNode);
    this.checkAllChildrenOnScreen(rootNode);
    this.calculateFinalPositions(rootNode, 0);
  }

  /**
   * recursively initializes properties of the tree.
   * @param {TreeNodeModel<T>} node - The node to start the initialization from.
   * @param {number}depth - The depth of the node in the tree. For the root of the tree, this should be 0.
   * @returns {void}
   */
  static initializeNodes<T>(node: TreeNodeModel<T>, depth: number): void {
    node.x = -1;
    node.y = depth;
    node.mod = 0;
    node.children.forEach((child) => this.initializeNodes(child, depth + 1));
  }

  /**
   * calculates the initial x-coordinate for each node in a tree.
   * It traverses the tree in a depth-first manner, starting from the given node.
   *
   * For leaf nodes, the x-coordinate is set to the x-coordinate of the previous sibling plus the node size and sibling distance.
   * leftmost node x-coordinate is set to 0.
   *
   * For non-leaf nodes, the x-coordinate is set to the average of the x-coordinates of the leftmost and rightmost children.
   * If the node is not the leftmost node, its x-coordinate is set to the x-coordinate of the previous sibling plus the node size and sibling distance.
   * The mod property of the node is set to the difference between its x-coordinate and the average x-coordinate of its children.
   * @param {TreeNodeModel<T>} node - The node to start the calculation from.
   * @returns {void}
   */
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

  /**
   * This function checks for conflicts between a node and its siblings in a tree.
   * A conflict occurs when the distance between a node and its sibling is less than the minimum distance.
   * When a conflict is detected, the function shifts the node to the right to resolve the conflict.
   * It also adjusts the positions of the nodes between the node and its sibling to keep the tree balanced.
   * @param {TreeNodeModel<T>} node - The node to check for conflicts.
   * @returns {void}
   */
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

  /**
   * adjusts the x-coordinates of nodes that are between two sibling nodes to ensure they are centered.
   * It calculates the desired x-coordinate for each node between the two siblings and shifts the node horizontally by the difference between its current and desired x-coordinates.
   * The mod property of the node is also updated by the same amount to reflect the shift.
   * @param {TreeNodeModel<T>} leftNode - The left sibling node.
   * @param {TreeNodeModel<T>} rightNode - The right sibling node.
   * @returns {void}
   */
  static centerNodesBetween<T>(
    leftNode: TreeNodeModel<T>,
    rightNode: TreeNodeModel<T>
  ): void {
    if (
      leftNode.parent &&
      rightNode.parent &&
      leftNode.parent === rightNode.parent
    ) {
      let leftIndex = leftNode.parent.children.indexOf(leftNode);
      let rightIndex = leftNode.parent.children.indexOf(rightNode);
      let numNodesBetween = leftIndex - rightIndex - 1;

      if (numNodesBetween > 0) {
        let distanceBetweenNodes =
          (leftNode.x - rightNode.x) / (numNodesBetween + 1);
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

  /**
   * checks if all children of a given node are on screen.
   * calculates the left contour of the tree rooted at the node and determines the amount to shift the tree to the right to ensure all nodes are on screen.
   * If a shift is necessary, it updates the x-coordinate and mod property of the node by the shift amount.
   * @param {TreeNodeModel<T>} node - The node to check.
   * @returns {void}
   */
  static checkAllChildrenOnScreen<T>(node: TreeNodeModel<T>): void {
    let nodeContour = new Map<number, number>();
    this.getLeftContour(node, 0, nodeContour);

    let shiftAmount = 0;
    nodeContour.forEach((x, _y) => {
      if (x + shiftAmount < 0) {
        shiftAmount = -x;
      }
    });

    if (shiftAmount > 0) {
      node.x += shiftAmount;
      node.mod += shiftAmount;
    }
  }

  /**
   * calculates the left contour of a tree rooted at a given node.
   * The left contour is the x-coordinate of the leftmost node at each level of the tree.
   * It traverses the tree in a depth-first manner, starting from the given node.
   * For each node, it updates the x-coordinate at the node's level in the values map to the minimum of the current value and the node's x-coordinate plus the mod sum.
   * The mod sum is the sum of the mod properties of the node's ancestors, which represents the total amount the node has been shifted horizontally.
   * @param {TreeNodeModel<T>} node - The root node of the tree.
   * @param {number} modSum - The sum of the mod properties of the node's ancestors.
   * @param {Map<number, number>} values - A map from y-coordinates to x-coordinates that represents the left contour of the tree.
   * @returns {void}
   */
  static getLeftContour<T>(
    node: TreeNodeModel<T>,
    modSum: number,
    values: Map<number, number>
  ): void {
    if (!values.has(node.y)) {
      values.set(node.y, node.x + modSum);
    } else {
      values.set(node.y, Math.min(values.get(node.y)!, node.x + modSum));
    }
    modSum += node.mod;
    node.children.forEach((child) =>
      this.getLeftContour(child, modSum, values)
    );
  }

  /**
   * see getLeftContour for documentation
   * @param {TreeNodeModel<T>} node - The root node of the tree.
   * @param {number} modSum - The sum of the mod properties of the node's ancestors.
   * @param {Map<number, number>} values - A map from y-coordinates to x-coordinates that represents the left contour of the tree.
   * @returns {void}
   */
  static getRightContour<T>(
    node: TreeNodeModel<T>,
    modSum: number,
    values: Map<number, number>
  ): void {
    if (!values.has(node.y)) {
      values.set(node.y, node.x + modSum);
    } else {
      values.set(node.y, Math.max(values.get(node.y)!, node.x + modSum));
    }

    modSum += node.mod;
    node.children.forEach((child) =>
      this.getRightContour(child, modSum, values)
    );
  }

  /**
   * set the key property of a node to a string that uniquely identifies the node
   * neccessary for react to optimize rendering
   * @param {TreeNodeModel<T>} node - The node to set the key for.
   * @returns {string} - The key for the node.
   * @returns {void}
   */
  static setKey<T>(node: TreeNodeModel<T>): string {
    return node.x + "-" + node.y + "-" + node.item + "-" + node.isMemo;
  }

  /**
   * This function calculates the final positions of all nodes in a tree.
   * It adds the sum of the mod properties of the node's ancestors to the node's x-coordinate.
   * It then recursively calculates the final positions of the node's children.
   * If the node is a leaf, its width and height are set to its x and y coordinates, respectively.
   * If the node is not a leaf, its width and height are set to the maximum width and height of its children, respectively.
   * @param {TreeNodeModel<T>} node - The node to calculate the final position for.
   * @param {number} modSum - The sum of the mod properties of the node's ancestors.
   * @returns {void}
   */
  static calculateFinalPositions<T>(
    node: TreeNodeModel<T>,
    modSum: number
  ): void {
    node.x += modSum;
    modSum += node.mod;
    node.key = this.setKey(node);
    node.children.forEach((child) =>
      this.calculateFinalPositions(child, modSum)
    );

    if (node.isLeaf()) {
      node.width = node.x;
      node.height = node.y;
    } else {
      node.width = Math.max(...node.children.map((child) => child.width));
      node.height = Math.max(...node.children.map((child) => child.height));
    }
  }

  /**
   * This function shifts a tree horizontally by a given amount.
   * It adds the shift amount to the x-coordinate of each node in the tree.
   * It then recursively shifts the children of each node.
   * @param {TreeNodeModel<T>} node - The root node of the tree to shift.
   * @param {number} shiftAmount - The amount to shift the tree by.
   * @returns {void}
   */
  static shiftTree<T>(node: TreeNodeModel<T>, shiftAmount: number): void {
    node.x += shiftAmount;
    node.y += shiftAmount;
    node.children.forEach((child) => this.shiftTree(child, shiftAmount));
  }

  /** basic tree printing function for debugging
   * @param {TreeNodeModel<T>} node - The root node of the tree to print.
   * @param {number} indent - The amount of indentation to use when printing the tree.
   * @returns {void}
   */
  static printTree<T>(node: TreeNodeModel<T>, indent = 0): void {
    console.log(
      " ".repeat(indent) + node.item + " (" + node.x + "," + node.y + ")"
    );
    node.children.forEach((child) => this.printTree(child, indent + 2));
  }

  /** returns the maximum width of a tree
   * @param {TreeNodeModel<T>} node - The root node of the tree.
   * @returns {number} - The maximum width of the tree.
   * @returns {number}
   */
  static getMaxWidth<T>(node: TreeNodeModel<T>): number {
    if (node.isLeaf()) {
      return node.width;
    }
    return Math.max(
      node.width,
      ...node.children.map((child) => this.getMaxWidth(child))
    );
  }

  /**
   * returns the maximum height of a tree
   * @param {TreeNodeModel<T>} node - The root node of the tree.
   * @returns {number} - The maximum height of the tree.
   * @returns {number}
   */
  static getMaxDepth<T>(node: TreeNodeModel<T>): number {
    if (node.isLeaf()) {
      return 1;
    }
    return (
      1 + Math.max(...node.children.map((child) => this.getMaxDepth(child)))
    );
  }

  static preorder<T>(node: TreeNodeModel<T>): void {
    if (node === null) return;
    console.log(node.item);
    node.children.forEach((child) => this.preorder(child));
  }

  static newpreordered<T>(node: TreeNodeModel<T>): TreeNodeModel<T>[] {
    if (node === null) return [];
    let result: TreeNodeModel<T>[] = [];
    result.push(node);
    node.children.forEach((child) => {
      result = result.concat(this.newpreordered(child));
    });
    return result;
  }

  static newpreorderedWithParent = (
    node: TreeNodeModel<number>,
    parent: TreeNodeModel<number> | null = null
  ): NodeWithParent[] => {
    let result: any = [];
    if (node) {
      result.push({ node, parent });
      node.children.forEach((child: TreeNodeModel<number>) => {
        result = [
          ...result,
          ...TreeHelper.newpreorderedWithParent(child, node as any),
        ];
      });
    }
    console.log(result);
    return result;
  };
}
