import { Node, NodeConfig } from './Node';
import { VectorPath } from '../VectorPath';
import { Vector } from '../Vector';

export interface VectorNodeConfig extends NodeConfig {
  paths: VectorPath[];
}

/**
 * A vector shape node.
 */
export class VectorNode extends Node<VectorNodeConfig> {
  
  /**
   * An array of relative paths making up the vector geometry.
   */
  paths: VectorPath[];

  constructor(config: VectorNodeConfig) {
    super(config);
    this.paths = this.paths;
  }

  public setPosition(position: Vector): this {
    return this.cloneWith({
      paths: this.setChildPositions(this.paths, position) as VectorPath[]
    });
  }

  public getPosition(): Vector {
    return this.calculatePosition(this.paths);
  }

  public getHeight(): number {
    return this.calculateHeight(this.paths);
  }

  public setHeight(height: number): this {
    return this.cloneWith({
      paths: this.setChildHeights(this.paths, height) as VectorPath[]
    });
  }

  public getWidth(): number {
    return this.calculateWidth(this.paths);
  }

  public setWidth(width: number): this {
    return this.cloneWith({
      paths: this.setChildWidths(this.paths, width) as VectorPath[]
    });
  }

  public toJS(): VectorNodeConfig {
    return {
      ...super.toJS(),
      paths: this.paths
    };
  }

  public toRaw() { }

}
