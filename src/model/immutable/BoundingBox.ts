import { Record } from 'immutable';
import { Vector } from './Vector';
import { Size } from './Size';

/**
 * A box that bounds the maximum size of a sizeable after transformations.
 */
export interface IBoundingBox {

  /**
   * The position of the bounding box.
   */
  position: Vector;

  /**
   * The size of the bounding box.
   */
  size: Size;

}

export const defaultBoundingBox: IBoundingBox = {
  position: new Vector(),
  size: new Size()
};

export class BoundingBox extends Record<IBoundingBox>(defaultBoundingBox) {

  /**
   * Returns the minimum x value of the sizeable.
   */
  public getMinX(): number {
    return this.position.x;
  }

  /**
   * Returns the minimum y value of the sizeable.
   */
  public getMinY(): number {
    return this.position.y;
  }

  /**
   * Returns the maximum x value of the sizeable.
   */
  public getMaxX(): number {
    return this.position.x + this.size.width;
  }

  /**
   * Returns the maximum y value of the sizeable.
   */
  public getMaxY(): number {
    return this.position.y + this.size.height;
  }

  /**
   * Returns true if either of the bounding boxes instersect.
   * @param boundingBox The bounding box to check.
   */
  public includes(boundingBox: BoundingBox): boolean {
    // Calculate the max and min positions of the other bounding box
    const nodeMinX = boundingBox.getMinX();
    const nodeMinY = boundingBox.getMinY();
    const nodeMaxX = boundingBox.getMaxX();
    const nodeMaxY = boundingBox.getMaxY();
    const minX = this.getMinX();
    const minY = this.getMinY();
    const maxX = this.getMaxX();
    const maxY = this.getMaxY();
    // Check if any corners of the other box are inside the bounding box
    if ((nodeMinX >= minX && nodeMinX <= maxX) || (nodeMaxX >= minX && nodeMaxX <= maxX)) {
      if ((nodeMinY >= minY && nodeMinY <= maxY) || (nodeMaxY >= minY && nodeMaxY <= maxY)) {
        return true;
      }
    }
    // Check if any corners of the bounding box are inside the other box
    if ((minX >= nodeMinX && minX <= nodeMaxX) || (maxX >= nodeMinX && maxX <= nodeMaxX)) {
      if ((minY >= nodeMinY && minY <= nodeMaxY) || (maxY >= nodeMinY && maxY <= nodeMaxY)) {
        return true;
      }
    }
    return false;
  }

}
