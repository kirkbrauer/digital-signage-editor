import { List } from 'immutable';
import { BoundingBox } from './BoundingBox';

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
   * Returns the size of the sizeable.
   * The size of the sizeable is the actual size of the node.
   */
  public abstract getSize(): BoundingBox;

  /**
   * Returns the x position of the sizeable.
   */
  public abstract getX(): number;

  /**
   * Returns the y position of the sizeable.
   */
  public abstract getY(): number;

  /**
   * Returns the width of the sizeable.
   */
  public abstract getWidth(): number;

  /**
   * Returns the height of the sizeable.
   */
  public abstract getHeight(): number;

  /**
   * Sets the x position of the sizeable.
   * @param x The new x position.
   */
  public abstract setX(x: number): this;

  /**
   * Sets the y position of the sizeable.
   * @param y The new y position.
   */
  public abstract setY(y: number): this;

  /**
   * Sets the width of the sizeable.
   * @param width The new width.
   */
  public abstract setWidth(width: number): this;

  /**
   * Sets the height of the sizeable.
   * @param height The new height.
   */
  public abstract setHeight(height: number): this;

  /**
   * Calculates the bounding box of a sizeable.
   * @param sizeables The sizeables to base the bounding box calculation.
   */
  public static calculateBoundingBox(sizeables: List<Sizeable>): BoundingBox {
    const x = Sizeable.calculateX(sizeables);
    const y = Sizeable.calculateY(sizeables);
    return new BoundingBox({
      x,
      y,
      width: Sizeable.calculateWidth(sizeables, x),
      height: Sizeable.calculateHeight(sizeables, y)
    });
  }

  /**
   * Calculates the x position of a node containing sizeables.
   * @param sizeables The sizeables to base the position calculation.
   */
  public static calculateX(sizeables: List<Sizeable>): number {
    // Get the min x values
    let minX = sizeables.get(0)!.getBoundingBox().x;
    for (const sizeable of sizeables) {
      if (sizeable.getBoundingBox().x < minX) {
        minX = sizeable.getBoundingBox().x;
      }
    }
    return minX;
  }

  /**
   * Calculates the y position of a node containing sizeables.
   * @param sizeables The sizeables to base the position calculation.
   */
  public static calculateY(sizeables: List<Sizeable>): number {
    // Get the min y values
    let minY = sizeables.get(0)!.getBoundingBox().y;
    for (const sizeable of sizeables) {
      if (sizeable.getBoundingBox().y < minY) {
        minY = sizeable.getBoundingBox().y;
      }
    }
    return minY;
  }

  /**
   * Calculates the width of a node containing sizeables.
   * @param sizeables The sizeables to base the size calculation.
   * @param parentX The x position of the parent sizeable.
   */
  public static calculateWidth<T extends Sizeable>(sizeables: List<T>, parentX: number): number {
    // Find the maximum x positions of the sizeables
    let maxX = sizeables.get(0)!.getBoundingBox().getMaxX();
    for (const sizeable of sizeables) {
      if (sizeable.getBoundingBox().getMaxX() > maxX) {
        maxX = sizeable.getBoundingBox().getMaxX();
      }
    }
    // Return the max x minus the min x
    return maxX - parentX;
  }

  /**
   * Calculates the height of a node containing sizeables.
   * @param sizeables The sizeables to base the size calculation.
   * @param parentY The y position of the parent sizeable.
   */
  public static calculateHeight<T extends Sizeable>(sizeables: List<T>, parentY: number): number {
    // Find the maximum y positions of the sizeables
    let maxY = sizeables.get(0)!.getBoundingBox().getMaxY();
    for (const sizeable of sizeables) {
      if (sizeable.getBoundingBox().getMaxY() > maxY) {
        maxY = sizeable.getBoundingBox().getMaxY();
      }
    }
    // Return the max x minus the min x
    return maxY - parentY;
  }

  /**
   * Sets the x positions of sizeables based on the the computed x position of the node.
   * @param sizeables The sizeables to update.
   * @param parentX The x position of the parent sizeable.
   * @param x The new x position of the parent.
   */
  public static setSizeableXPositions<T extends Sizeable>(sizeables: List<T>, parentX: number, x: number): List<T> {
    return sizeables.map((sizeable) => {
      // Calculate the offset between the sizeable position and the node position
      const offset = sizeable.getX() - parentX;
      // Set the node x to the new position + the offset
      return sizeable.setX(x + offset);
    });
  }

  /**
   * Sets the y positions of sizeables based on the the computed y position of the node.
   * @param sizeables The sizeables to update.
   * @param parentY The x position of the parent sizeable.
   * @param y The new y position of the parent.
   */
  public static setSizeableYPositions<T extends Sizeable>(sizeables: List<T>, parentY: number, y: number): List<T> {
    return sizeables.map((sizeable) => {
      // Calculate the offset between the sizeable position and the node position
      const offset = sizeable.getY() - parentY;
      // Set the node y to the new position + the offset
      return sizeable.setY(y + offset);
    });
  }

  /**
   * Sets the widths of sizeables based on the the computed width of the node.
   * @param sizeables The sizeables to update.
   * @param parentX The x position of the parent sizeable.
   * @param parentWidth The width of the parent sizeable.
   * @param width The new width of the parent.
   */
  public static setSizeableWidths<T extends Sizeable>(sizeables: List<T>, parentX: number, parentWidth: number, width: number): List<T> {
    return sizeables.map((sizeable) => {
      // Calculate the ratio of the width of the sizeable to the node's width
      const widthRatio = sizeable.getWidth() / parentWidth;
      // Calculate the offset between the sizeable's position and the node's position
      const offset = sizeable.getX() - parentX;
      // Calculate the ratio of the offset to the actual width of the node
      const posRatio = offset / parentWidth;
      // Set the x position and width of the node
      return sizeable.setX(parentX + (posRatio * width)).setWidth(widthRatio * width);
    });
  }

  /**
   * Sets the heights of sizeables based on the the computed height of the node.
   * @param sizeables The sizeables to update.
   * @param parentY The y position of the parent sizeable.
   * @param parentHeight The height of the parent sizeable.
   * @param height The new height of the parent.
   */
  public static setSizeableHeights<T extends Sizeable>(sizeables: List<T>, parentY: number, parentHeight: number, width: number): List<T> {
    return sizeables.map((sizeable) => {
      // Calculate the ratio of the height of the sizeable to the node's height
      const heightRatio = sizeable.getHeight() / parentHeight;
      // Calculate the offset between the sizeable's position and the node's position
      const offset = sizeable.getY() - parentY;
      // Calculate the ratio of the offset to the actual height of the node
      const posRatio = offset / parentHeight;
      // Set the y position and height of the node
      return sizeable.setY(parentY + (posRatio * width)).setHeight(heightRatio * width);
    });
  }

}
