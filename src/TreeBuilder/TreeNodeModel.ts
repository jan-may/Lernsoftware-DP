export class TreeNodeModel<T> {
  x: number;
  y: number;
  mod: number;
  parent: TreeNodeModel<T> | null;
  children: TreeNodeModel<T>[];

  width: number;
  height: number;

  item: T;
  isMemo: boolean = false;

  constructor(item: T, parent: TreeNodeModel<T> | null = null) {
    this.x = -1.0;
    this.y = 0;
    this.mod = 0.0;
    this.parent = parent;
    this.children = [];

    this.width = 0.0;
    this.height = 0;

    this.item = item;
  }
  createEmptyTree(): TreeNodeModel<T> {
    return new TreeNodeModel(this.item);
  }

  isLeaf(): boolean {
    return this.children.length === 0;
  }

  isLeftMost(): boolean {
    return !this.parent || this.parent.children[0] === this;
  }

  isRightMost(): boolean {
    return (
      !this.parent ||
      this.parent.children[this.parent.children.length - 1] === this
    );
  }

  getPreviousSibling(): TreeNodeModel<T> | null {
    if (this.isLeftMost()) {
      return null;
    }
    const index = this.parent!.children.indexOf(this);
    return this.parent!.children[index - 1];
  }

  getNextSibling(): TreeNodeModel<T> | null {
    if (this.isRightMost()) {
      return null;
    }
    const index = this.parent!.children.indexOf(this);
    return this.parent!.children[index + 1];
  }

  getLeftMostSibling(): TreeNodeModel<T> {
    if (this.isLeftMost()) {
      return this;
    }
    return this.parent!.children[0];
  }

  getLeftMostChild(): TreeNodeModel<T> | null {
    if (this.isLeaf()) {
      return null;
    }
    return this.children[0];
  }

  getRightMostChild(): TreeNodeModel<T> | null {
    if (this.isLeaf()) {
      return null;
    }
    return this.children[this.children.length - 1];
  }
}