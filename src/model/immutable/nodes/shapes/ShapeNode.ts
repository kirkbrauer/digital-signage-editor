import { Node, NodeConfig } from '../Node';
import { Fill } from '../../Fill';
import { Vector } from '../../Vector';

export interface ShapeNodeConfig extends NodeConfig {
  stroke?: Fill | null;
  fill?: Fill | null;
  strokeWeight?: number | null;
  strokeAlign?: StrokeAlign | null;
  position?: Vector;
  height?: number;
  width?: number;
}

/**
 * Defines stroke alignments.
 */
export enum StrokeAlign {
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE',
  CENTER = 'CENTER'
}

/**
 * A shape node.
 */
export abstract class ShapeNode<T extends ShapeNodeConfig = ShapeNodeConfig, R = any> extends Node<ShapeNodeConfig | T, R> {

  /**
   * Outline stroke color.
   */
  stroke: Fill | null;

  /**
   * Fill of the shape.
   */
  fill: Fill | null;

  /**
   * Weight of the outline stroke.
   */
  strokeWeight: number | null;

  /**
   * Outline stroke alignment.
   */
  strokeAlign: StrokeAlign | null;

  private position: Vector;

  private height: number;

  private width: number;

  constructor(config: ShapeNodeConfig) {
    super(config);
    this.position = config.position || { x: 0, y: 0 };
    this.height = config.height || 0;
    this.width = config.width || 0;
    this.stroke = config.stroke || null;
    this.fill = config.fill || null;
    this.strokeWeight = config.strokeWeight || null;
    this.strokeAlign = config.strokeAlign || null;
  }

  public getPosition() {
    return this.position;
  }

  public setPosition(position: Vector): this {
    return this.cloneWith({
      position
    });
  }

  public getHeight() {
    return this.height;
  }

  public setHeight(height: number): this {
    return this.cloneWith({
      height
    });
  }

  public getWidth() {
    return this.width;
  }

  public setWidth(width: number): this {
    return this.cloneWith({
      width
    });
  }

  public toJS(): ShapeNodeConfig {
    return {
      ...super.toJS(),
      position: this.position,
      width: this.width,
      height: this.height,
      stroke: this.stroke,
      fill: this.fill,
      strokeWeight: this.strokeWeight,
      strokeAlign: this.strokeAlign
    };
  }

  public toRaw() { }

}
