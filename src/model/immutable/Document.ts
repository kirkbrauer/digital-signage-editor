import { Node } from './nodes';
import { Immutable } from './Immutable';

export interface DocumentConfig {
  nodes?: Node[];
  width?: number;
  height?: number;
}

/**
 * An editor document.
 */
export class Document extends Immutable<DocumentConfig, any> {
  /**
   * Nodes in the current document.
   */
  private nodes: Node[];

  /**
   * Document width in px.
   */
  private width: number;

  /**
   * Document height in px.
   */
  private height: number;

  public static createEmpty() {
    return new Document({});
  }

  constructor(config: DocumentConfig) {
    super();
    this.nodes = config.nodes || [];
    this.width = config.width || 1920;
    this.height = config.height || 1080;
  }

  public getNodes(ids?: string[]): Node[] {
    if (ids) {
      const nodes: Node[] = [];
      for (const node of this.nodes) {
        if (ids.includes(node.getID())) {
          nodes.push(node);
        }
      }
      return nodes;
    }
    return this.nodes;
  }

  public getNodeIds(): string[] {
    const ids = [];
    for (const node of this.nodes) {
      ids.push(node.getID());
    }
    return ids;
  }

  public getHeight(): number {
    return this.height;
  }

  public getWidth(): number {
    return this.width;
  }

  public getNode(id: string): Node | null {
    for (const node of this.nodes) {
      if (node.getID() === id) return node;
    }
    return null;
  }

  public updateNode(newNode: Node): Document {
    const newNodes: Node[] = [];
    for (const node of this.nodes) {
      if (node.getID() === newNode.getID()) {
        newNodes.push(newNode);
      } else {
        newNodes.push(node);
      }
    }
    return new Document({
      nodes: newNodes,
      height: this.height,
      width: this.width
    });
  }

  public removeNode(id: string): Document {
    const newNodes = [];
    for (const node of this.nodes) {
      if (node.getID() !== id) {
        newNodes.push(node);
      }
    }
    return new Document({
      nodes: newNodes,
      height: this.height,
      width: this.width
    });
  }

  public addNode(node: Node): Document {
    return new Document({
      nodes: [...this.nodes, node],
      height: this.height,
      width: this.width
    });
  }

  public toJS(): DocumentConfig {
    return {
      nodes: this.nodes,
      height: this.height,
      width: this.width
    };
  }

  public toRaw() { }

}
