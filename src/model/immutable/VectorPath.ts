import { VectorPoint } from './VectorPoint';
import { Sizeable } from './Sizeable';
import { Vector } from './Vector';

export interface VectorPathConfig {
  points?: VectorPoint[];
  open?: boolean;
}

/**
 * A vector path.
 */
export class VectorPath extends Sizeable<VectorPathConfig, any> {

  /**
   * An array of points that make up the path.
   */
  private points: VectorPoint[];

  /**
   * Whether the path is open.
   * Paths open between their first and last points.
   */
  private open: boolean;

  constructor(config: VectorPathConfig) {
    super();
    this.points = config.points || [];
    this.open = config.open || false;
  }

  public getPosition(): Vector {
    return this.calculatePosition(this.points);
  }

  public setPosition(position: Vector): this {
    return this.cloneWith({
      points: this.setChildPositions(this.points, position) as VectorPoint[]
    });
  }

  public getHeight(): number {
    return this.calculateHeight(this.points);
  }

  public setHeight(height: number): this {
    return this.cloneWith({
      points: this.setChildHeights(this.points, height) as VectorPoint[]
    });
  }

  public getWidth(): number {
    return this.calculateWidth(this.points);
  }

  public setWidth(width: number): this {
    return this.cloneWith({
      points: this.setChildWidths(this.points, width) as VectorPoint[]
    });
  }

  /**
   * Gets the points in the vector path.
   */
  public getPoints(): VectorPoint[] {
    return this.points;
  }

  /**
   * Sets the points in the vector path.
   * @param points The new points in the path.
   */
  public setPoints(points: VectorPoint[]): VectorPath {
    return this.cloneWith({
      points
    });
  }

  /**
   * Adds a point to the path.
   * @param point The point to add.
   */
  public addPoint(point: VectorPoint): VectorPath {
    return this.cloneWith({
      points: [...this.points, point]
    });
  }

  /**
   * Removes a point from the path.
   * @param point The point to add.
   */
  public removePoint(id: string): VectorPath {
    const newPoints = [];
    for (const point of this.points) {
      if (point.getID() !== id) {
        newPoints.push(point);
      }
    }
    return this.cloneWith({
      points: newPoints
    });
  }

  /**
   * Updates a point in the path.
   * @param newPoint The point to update.
   */
  public updatePoint(newPoint: VectorPoint): VectorPath {
    const newPoints = [];
    for (const point of this.points) {
      if (point.getID() === newPoint.getID()) {
        newPoints.push(newPoint);
      } else {
        newPoints.push(point);
      }
    }
    return this.cloneWith({
      points: newPoints
    });
  }

  /**
   * Returns true if the path is open.
   */
  public isOpen(): boolean {
    return this.open;
  }

  public toRaw() {}

  public toJS(): VectorPathConfig {
    return {
      points: this.points,
      open: this.open
    };
  }

  public cloneWith(data: VectorPathConfig): this {
    return (this as any).constructor({
      ...this.toJS(),
      ...data
    });
  }

  public clone(): this {
    return this.cloneWith({});
  }
  
}
