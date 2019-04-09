import { VectorPoint } from './VectorPoint';
import { Sizeable } from './Sizeable';
import { Record, List } from 'immutable';
import uuid from 'uuid/v4';
import { BoundingBox } from './BoundingBox';
import { Vector } from './Vector';
import { Size } from './Size';

/**
 * A vector path.
 */
export interface IVectorPath {

  /**
   * The ID of the vector path.
   */
  id: string;

  /**
   * The absolute position of the vector path.
   */
  position: Vector;

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

const defaultVectorPath: IVectorPath = {
  id: '',
  position: new Vector(),
  points: List()
};

export class VectorPath extends Record<IVectorPath>(defaultVectorPath) implements Sizeable {

  constructor(props?: Partial<IVectorPath>) {
    // Generate a unique UUID for a new vector path.
    super(Object.assign({}, props, { id: (props && props.id) || uuid() }));
  }

  public getBoundingBox() {
    return new BoundingBox({
      position: this.getPosition(),
      size: this.getSize()
    });
  }

  public getTransformedBoundingBox() {
    return new BoundingBox({
      position: this.getPosition(),
      size: this.getSize()
    });
  }

  public getPosition(): Vector {
    const pointZeroPos = this.points.get(0)!.position;
    // Get the min x value
    let minX = pointZeroPos.x;
    let minY = pointZeroPos.y;
    for (const point of this.points) {
      if (point.position.x < minX) {
        minX = point.position.x;
      }
      if (point.position.y < minY) {
        minY = point.position.y;
      }
    }
    return new Vector({
      x: minX,
      y: minY
    });
  }

  public getSize(): Size {
    const minPos = this.getPosition();
    const pointZeroPos = this.points.get(0)!.position;
    let maxX = pointZeroPos.x;
    let maxY = pointZeroPos.y;
    // Get the max points
    for (const point of this.points) {
      if (point.position.x > maxX) {
        maxX = point.position.x;
      }
      if (point.position.y > maxY) {
        maxY = point.position.y;
      }
    }
    // Return the max minus the min
    return new Size({
      width: maxX - minPos.x,
      height: maxY - minPos.y
    });
  }

  public setPosition(position: Vector): this {
    const parentPosition = this.getPosition();
    return this.set('points',
      this.points.map((point) => {
        // Calculate the offset between the point position and the path position
        const offsetX = point.position.x - parentPosition.x;
        const offsetY = point.position.y - parentPosition.y;
        // Set the point x to the new position + the offset
        return point.set('position', new Vector({
          x: position.x + offsetX,
          y: position.y + offsetY
        }));
      })
    );
  }

  public setSize(size: Size): this {
    const parentPosition = this.getPosition();
    const parentSize = this.getSize();
    return this.set('points',
      this.points.map((point) => {
        // Calculate the offset between the points's position and the paths's position
        const offsetX = point.position.x - parentPosition.x;
        const offsetY = point.position.y - parentPosition.y;
        // Calculate the ratio of the offset to the actual width of the path
        const xPosRatio = offsetX / parentSize.width;
        const yPosRatio = offsetY / parentSize.height;
        // Set the position of the point
        return point.set('position', new Vector({
          x: parentPosition.x + (xPosRatio * size.width),
          y: parentPosition.y + (yPosRatio * size.height),
        }));
      })
    );
  }

}
