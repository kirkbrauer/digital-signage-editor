import { List } from 'immutable';
import { BoundingBox } from './BoundingBox';
import { Size, Vector } from '../';

/**
 * Defines a record whose size and position can be determined.
 */
export abstract class Sizeable {

  /**
   * Returns the bounding box of the sizeable.
   * The bounding box is the maximum size of the sizeable after rotation or transformation.
   */
  public abstract getBoundingBox(): BoundingBox;

  /**
   * Returns the bounding box of the sizeable after transformations.
   */
  public abstract getTransformedBoundingBox(): BoundingBox;

  /**
   * Returns the position of the sizeable.
   */
  public abstract getPosition(): Vector;

  /**
   * Returns the size of the sizeable.
   */
  public abstract getSize(): Size;

  /**
   * Sets the position of the sizeable.
   * @param position The new position of the sizeable.
   */
  public abstract setPosition(position: Vector): this;

  /**
   * Sets the size of the sizeable.
   * @param size The new size of the sizeable.
   */
  public abstract setSize(size: Size): this;

  /**
   * Calculates the position of a list of sizeables.
   * @param sizeables The sizeables to base the position calculation.
   */
  public static calculatePosition(sizeables: List<Sizeable>): Vector {
    // Return an empty Vector if the list is empty
    if (sizeables.isEmpty()) return new Vector();
    // Get the position of the first sizeable
    const sizeableZeroPos = sizeables.get(0)!.getPosition();
    // Get the initial values
    let minX = sizeableZeroPos.x;
    let minY = sizeableZeroPos.y;
    for (const sizeable of sizeables) {
      const boundingBox = sizeable.getBoundingBox();
      if (boundingBox.position.x < minX) {
        minX = boundingBox.position.x;
      }
      if (boundingBox.position.y < minY) {
        minY = boundingBox.position.y;
      }
    }
    return new Vector({
      x: minX,
      y: minY
    });
  }

  /**
   * Calculates the size of a list of sizeables.
   * @param sizeables The sizeables to base the size calculation.
   */
  public static calculateSize(sizeables: List<Sizeable>): Size {
    // Return an empty Size if the list is empty
    if (sizeables.isEmpty()) return new Size();
    // Find the maximum x and y positions of the sizeables
    const sizeableZeroBoundingBox = sizeables.get(0)!.getBoundingBox();
    // Get the maximum bounding box points
    let maxX = sizeableZeroBoundingBox.getMaxX();
    let maxY = sizeableZeroBoundingBox.getMaxY();
    // Calculate the minumum position
    const minPos = Sizeable.calculatePosition(sizeables);
    // Find the max and min points
    for (const sizeable of sizeables) {
      const boundingBox = sizeable.getBoundingBox();
      if (boundingBox.getMaxX() > maxX) {
        maxX = boundingBox.getMaxX();
      }
      if (boundingBox.getMaxY() > maxY) {
        maxY = boundingBox.getMaxY();
      }
    }
    // Return the max minus the min
    return new Size({
      width: maxX - minPos.x,
      height: maxY - minPos.y
    });
  }

  /**
   * Calculates the bounding box of a sizeable.
   * @param sizeables The sizeables to base the bounding box calculation.
   */
  public static calculateBoundingBox(sizeables: List<Sizeable>): BoundingBox {
    return new BoundingBox({
      position: Sizeable.calculatePosition(sizeables),
      size: Sizeable.calculateSize(sizeables)
    });
  }

  /**
   * Sets the positions of a list of sizeables inside a prent sizeable.
   * @param sizeables The list of sizeables to update.
   * @param position The new position of the parent.
   */
  public static setSizeablePositions<T extends Sizeable>(sizeables: List<T>, position: Vector): List<T> {
    // Calculate the parent sizeable position
    const parentPosition = Sizeable.calculatePosition(sizeables);
    return sizeables.map((sizeable) => {
      const sizeablePosition = sizeable.getPosition();
      // Calculate the offset between the sizeable position and the sizeable position
      const offsetX = sizeablePosition.x - parentPosition.x;
      const offsetY = sizeablePosition.y - parentPosition.y;
      // Set the sizeable position to the new position + the offset
      return sizeable.setPosition(new Vector({
        x: position.x + offsetX,
        y: position.y + offsetY
      }));
    });
  }

  /**
   * Sets the sizes of sizeables based on the computed side of the parent sizeable.
   * @param sizeables A list of sizeables to update
   * @param parentPosition The position of the parent sizeable.
   * @param parentSize The size of the parent sizeable.
   * @param size The new size of the parent sizeable.
   */
  public static setSizeableSizes<T extends Sizeable>(sizeables: List<T>, size: Size): List<T> {
    const parentSize = Sizeable.calculateSize(sizeables);
    const parentPosition = Sizeable.calculatePosition(sizeables);
    return sizeables.map((sizeable) => {
      const sizeableSize = sizeable.getSize();
      const sizeablePos = sizeable.getPosition();
      // Calculate the ratio of the height of the sizeable to the sizeable's height
      const widthRatio = sizeableSize.width / parentSize.width;
      const heightRatio = sizeableSize.height / parentSize.height;
      // Calculate the offset between the sizeable's position and the sizeable's position
      const offsetX = sizeablePos.x - parentPosition.x;
      const offsetY = sizeablePos.y - parentPosition.y;
      // Calculate the ratio of the offset to the actual height of the sizeable
      const xPosRatio = offsetX / parentSize.width;
      const yPosRatio = offsetY / parentSize.height;
      // Set the position and size of the sizeable
      return sizeable.setPosition(new Vector({
        x: parentPosition.x + (xPosRatio * size.width),
        y: parentPosition.y + (yPosRatio * size.height)
      })).setSize(new Size({
        width: widthRatio * size.width,
        height: heightRatio * size.height
      }));
    });
  }

}
