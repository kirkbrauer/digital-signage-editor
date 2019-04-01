import { Record, List } from 'immutable';
import { Node } from './Node';

export interface IDocument {

  /**
   * Nodes in the current document.
   */
  nodes: List<Node>;

  /**
   * The width of the document.
   */
  width: number;

  /**
   * The height of the document.
   */
  height: number;

}

const defaultDocument: IDocument = {
  nodes: List(),
  width: 1920,
  height: 1080
};

export class Document extends Record<IDocument>(defaultDocument) {

  /**
   * Creates a document of a list of nodes.
   * @param nodes The nodes to include in the document.
   */
  public static of(nodes: Iterable<Node>) {
    return new Document({ nodes: List(nodes) });
  }

  /**
   * Gets a node by ID.
   * @param id The ID of the node.
   */
  public getNodeByID(id?: string): Node | null {
    const found = this.nodes.find((node) => {
      return node.id === id;
    });
    if (found) return found;
    return null;
  }

  /**
   * Gets multiple nodes by ID.
   * @param ids The IDs of the nodes to get.
   */
  public getNodesByID(ids: List<string>): List<Node> {
    return this.nodes.filter((node) => {
      return ids.includes(node.id);
    });
  }

  /**
   * Returns the IDs of all the nodes.
   */
  public getNodeIDs(): List<string> {
    return this.nodes.map((node) => {
      return node.id;
    });
  }

  /**
   * Updates a node.
   * @param node The new version of the node to update.
   */
  public updateNode(node: Node): this {
    return this.set('nodes',
      this.nodes.map((oldNode) => {
        if (oldNode.id === node.id) {
          return node;
        }
        return oldNode;
      })
    );
  }

  /**
   * Updates multiple nodes.
   * @param nodes The new versions of the nodes to update.
   */
  public updateNodes(nodes: List<Node>): this {
    return this.set('nodes',
      this.nodes.map((oldNode) => {
        for (const newNode of nodes) {
          if (newNode.id === oldNode.id) {
            return newNode;
          }
        }
        return oldNode;
      })
    );
  }

  /**
   * Removes a node.
   * @param node The node to remove.
   */
  public removeNode(node: Node): this {
    return this.set('nodes',
      this.nodes.filterNot((oldNode) => {
        return oldNode.id === node.id;
      })
    );
  }

  /**
   * Removes nodes.
   * @param nodes The nodes to remove.
   */
  public removeNodes(nodes: List<Node>): this {
    return this.set('nodes',
      this.nodes.filterNot((oldNode) => {
        return Boolean(
          nodes.find((node) => {
            return node.id === oldNode.id;
          })
        );
      })
    );
  }

  /**
   * Removes a node by ID.
   * @param id The ID of the node to remove.
   */
  public removeNodeByID(id: string): this {
    return this.set('nodes',
      this.nodes.filterNot((oldNode) => {
        return oldNode.id === id;
      })
    );
  }

  /**
   * Removes multiple nodes by ID.
   * @param ids The IDs of the nodes to remove.
   */
  public removeNodesByID(ids: List<string>): this {
    return this.set('nodes',
      this.nodes.filterNot((oldNode) => {
        return ids.includes(oldNode.id);
      })
    );
  }

  /**
   * Adds a node to the document.
   * New nodes are always added to the top of the document.
   * @param node The node to add.
   */
  public addNode(node: Node): this {
    return this.set('nodes',
      this.nodes.insert(0, node)
    );
  }

  /**
   * Adds nodes to the document.
   * New nodes are always added to the top of the document.
   * @param nodes The nodes to add.
   */
  public addNodes(nodes: List<Node>): this {
    return this.set('nodes', List([...nodes, ...this.nodes]));
  }

}
