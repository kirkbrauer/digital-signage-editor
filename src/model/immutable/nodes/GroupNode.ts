import { Node, NodeConfig } from './Node';
import { Vector } from '../Vector';

export interface GroupNodeConfig extends NodeConfig {
  nodes?: Node[];
}

/**
 * A node representing a group of other nodes.
 */
export class GroupNode extends Node<GroupNodeConfig> {

  /**
   * Child nodes in the group.
   */
  private nodes: Node[];

  constructor(config: GroupNodeConfig) {
    super(config);
    this.nodes = config.nodes || [];
  }

  public getNodes(): Node[] {
    return this.nodes;
  }

  public getPosition() {
    return this.calculatePosition(this.nodes);
  }

  public setPosition(position: Vector): this {
    return this.cloneWith({
      nodes: this.setChildPositions(this.nodes, position) as Node[]
    });
  }

  public getHeight() {
    return this.calculateHeight(this.nodes);
  }

  public setHeight(height: number): this {
    return this.cloneWith({
      nodes: this.setChildHeights(this.nodes, height) as Node[]
    });
  }

  public getWidth() {
    return this.calculateWidth(this.nodes);
  }

  public setWidth(width: number): this {
    return this.cloneWith({
      nodes: this.setChildWidths(this.nodes, width) as Node[]
    });
  }

  public toJS(): GroupNodeConfig {
    return {
      ...super.toJS(),
      nodes: this.nodes
    };
  }

  public toRaw() { }

}
