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
  private stroke: Fill | null;

  /**
   * Fill of the shape.
   */
  private fill: Fill | null;

  /**
   * Weight of the outline stroke.
   */
  private strokeWeight: number | null;

  /**
   * Outline stroke alignment.
   */
  private strokeAlign: StrokeAlign | null;

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

  /**
   * Returns the stroke.
   */
  public getStroke(): Fill | null {
    return this.stroke;
  }

  /**
   * Sets the stroke.
   * @param stroke The new stroke.
   */
  public setStroke(stroke: Fill | null) {
    return this.cloneWith({
      stroke
    });
  }

  /**
   * Returns the fill.
   */
  public getFill(): Fill | null {
    return this.fill;
  }

  /**
   * Sets the fill.
   * @param fill The new fill.
   */
  public setFill(fill: Fill | null) {
    return this.cloneWith({
      fill
    });
  }

  /**
   * Returns the stroke weight.
   */
  public getStrokeWeight(): number | null {
    return this.strokeWeight;
  }

  /**
   * Sets the the stroke weight.
   * @param strokeWeight The new stroke weight.
   */
  public setStrokeWeight(strokeWeight: number | null) {
    return this.cloneWith({
      strokeWeight
    });
  }

  /**
   * Returns the stroke alignment.
   */
  public getStrokeAlign(): StrokeAlign | null {
    return this.strokeAlign;
  }

  /**
   * Sets the stroke alignment.
   * @param strokeAlign The new stroke weight.
   */
  public setStrokeAlign(strokeAlign: StrokeAlign | null) {
    return this.cloneWith({
      strokeAlign
    });
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
