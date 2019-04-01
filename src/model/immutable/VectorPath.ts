import { VectorPoint } from './VectorPoint';
import { Sizeable } from './Sizeable';
import { Record, List } from 'immutable';
import uuid from 'uuid/v4';

/**
 * A vector path.
 */
export interface VectorPathProps {

  /**
   * The ID of the vector path.
   */
  id: string;

  /**
   * The absolute x position of the path.
   */
  x: number;

   /**
   * The absolute x position of the path.
   */
  y: number;

  /**
   * An array of points that make up the path.
   */
  points: List<VectorPoint>;

  /**
   * Whether the path is open.
   * Paths open between their first and last points.
   */
  open?: boolean;

}

const defaultVectorPath: VectorPathProps = {
  id: '',
  x: 0,
  y: 0,
  points: List()
};

export class VectorPath extends Record<VectorPathProps>(defaultVectorPath) implements Sizeable {

  constructor(props?: Partial<VectorPathProps>) {
    // Generate a unique UUID for a new vector path.
    super(Object.assign({}, props, { id: (props && props.id) || uuid() }));
  }

  public getX(): number {
    // Get the min x value
    let minX = this.points.get(0)!.x;
    for (const point of this.points) {
      if (point.x < minX) {
        minX = point.x;
      }
    }
    return minX;
  }

  public getY(): number {
    // Get the min y value
    let minY = this.points.get(0)!.y;
    for (const point of this.points) {
      if (point.y < minY) {
        minY = point.y;
      }
    }
    return minY;
  }

  public getWidth(): number {
    let maxX = this.points.get(0)!.x;
    let minX = this.points.get(0)!.x;
    // Get the max and min x values
    for (const point of this.points) {
      if (point.x > maxX) {
        maxX = point.x;
      }
      if (point.x < minX) {
        minX = point.x;
      }
    }
    // Return the max x pos minus the min x pos
    return maxX - minX;
  }

  public getHeight(): number {
    let maxY = this.points.get(0)!.y;
    let minY = this.points.get(0)!.y;
    // Get the max and min y values
    for (const point of this.points) {
      if (point.y > maxY) {
        maxY = point.x;
      }
      if (point.y < minY) {
        minY = point.x;
      }
    }
    // Return the max y pos minus the min y pos
    return maxY - minY;
  }

  public setX(x: number): this {
    return this.set('points',
      this.points.map((point) => {
        // Calculate the offset between the point position and the path position
        const offset = point.x - this.getX();
        // Set the point x to the new position + the offset
        return point.set('x', x + offset);
      })
    );
  }

  public setY(y: number): this {
    return this.set('points',
      this.points.map((point) => {
        // Calculate the offset between the point position and the path position
        const offset = point.y - this.getX();
        // Set the point y to the new position + the offset
        return point.set('y', y + offset);
      })
    );
  }

  public setWidth(width: number): this {
    return this.set('points',
      this.points.map((point) => {
        // Calculate the offset between the points's position and the paths's position
        const offset = point.x - this.getX();
        // Calculate the ratio of the offset to the actual width of the path
        const posRatio = offset / this.getWidth();
        // Set the x position of the point
        return point.set('x', this.getX() + (posRatio * width));
      })
    );
  }

  public setHeight(height: number): this {
    return this.set('points',
      this.points.map((point) => {
        // Calculate the offset between the points's position and the paths's position
        const offset = point.y - this.getY();
        // Calculate the ratio of the offset to the actual width of the path
        const posRatio = offset / this.getHeight();
        // Set the y position of the point
        return point.set('y', this.getY() + (posRatio * height));
      })
    );
  }

}
