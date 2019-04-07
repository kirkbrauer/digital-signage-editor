import { Record } from 'immutable';
import { Position } from './Position';
import { Size } from './Size';

/**
 * A box that bounds the maximum size of a sizeable after transformations.
 */
export interface IBoundingBox extends Position {

  /**
   * The x position of the bounding box.
   */
  x: number;

  /**
   * The y position of the bounding box.
   */
  y: number;

  /**
   * The width of the bounding box.
   */
  width: number;

  /**
   * The height of the bounding box.
   */
  height: number;

}

const defaultBoundingBox: IBoundingBox = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

export class BoundingBox extends Record<IBoundingBox>(defaultBoundingBox) {

  /**
   * Returns the minimum x value of the sizeable.
   */
  public getMinX(): number {
    return this.x;
  }

  /**
   * Returns the minimum y value of the sizeable.
   */
  public getMinY(): number {
    return this.y;
  }

  /**
   * Returns the maximum x value of the sizeable.
   */
  public getMaxX(): number {
    return this.x + this.width;
  }

  /**
   * Returns the maximum y value of the sizeable.
   */
  public getMaxY(): number {
    return this.y + this.height;
  }

  /**
   * Returns the position of the bounding box.
   */
  public getPosition(): Position {
    return {
      x: this.x,
      y: this.y
    };
  }

  /**
   * Returns the size of the bounding box.
   */
  public getSize(): Size {
    return {
      width: this.width,
      height: this.height
    };
  }

  /**
   * Returns true if either of the bounding boxes instersect.
   * @param boundingBox The bounding box to check.
   */
  public includes(boundingBox: BoundingBox) {
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
