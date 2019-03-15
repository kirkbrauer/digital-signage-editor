import { Vector } from './Vector';
import { Immutable } from './Immutable';

/**
 * Abstract class defining the attributes of a sizeable object.
 */
export abstract class Sizeable<T = any, R = any> extends Immutable<T, R> {

  /**
   * Returns the current position.
   */
  public abstract getPosition(): Vector;

  /**
   * Returns the x position.
   */
  public getXPos(): number {
    return this.getPosition().x;
  }

  /**
   * Returns the y position.
   */
  public getYPos(): number {
    return this.getPosition().y;
  }

  /**
   * Sets the position.
   * @param position The new position.
   */
  public abstract setPosition(position: Vector): this;

   /**
   * Returns the height.
   */
  public abstract getHeight(): number;

  /**
   * Sets the height.
   * @param height The new height.
   */
  public abstract setHeight(height: number): this;

  /**
   * Returns the width.
   */
  public abstract getWidth(): number;

  /**
   * Sets the width.
   * @param width The new width.
   */
  public abstract setWidth(width: number): this;

  /**
   * Calculates the position of a sizeable based on the positions of child sizeables.
   * @param children The children to include in the position.
   */
  protected calculatePosition(children: Sizeable[]): Vector {
    // Get the min x and y values
    let minX = children[0].getXPos();
    let minY = children[0].getYPos();
    for (const child of children) {
      if (child.getXPos() < minX) {
        minX = child.getXPos();
      }
      if (child.getYPos() < minY) {
        minY = child.getYPos();
      }
    }
    return {
      x: minX,
      y: minY
    };
  }

  /**
   * Calculates the height of a sizeable based on the heights and positions of child sizeables.
   * @param children The children to include in the height.
   */
  protected calculateHeight(children: Sizeable[]): number {
    // Find the maximum y positions of the children
    let maxY = children[0].getYPos() + children[0].getHeight();
    for (const child of children) {
      if (child.getYPos() + child.getHeight() > maxY) {
        maxY = child.getYPos() + child.getHeight();
      }
    }
    // Return the max y minus the min y
    return maxY - this.getYPos();
  }

  /**
   * Calculates the width of a sizeable based on the widths and positions of child sizeables.
   * @param children The children to include in the width.
   */
  protected calculateWidth(children: Sizeable[]): number {
    // Find the maximum x positions of the children
    let maxX = children[0].getXPos() + children[0].getWidth();
    for (const child of children) {
      if (child.getXPos() + child.getWidth() > maxX) {
        maxX = child.getXPos() + child.getWidth();
      }
    }
    // Return the max y minus the min y
    return maxX - this.getXPos();
  }

  /**
   * Sets the position of each of the children based on the sizeable's new position.
   * @param children The children to update.
   * @param position The new position of the sizeable.
   */
  protected setChildPositions(children: Sizeable[], position: Vector): Sizeable[] {
    const newChildren = [];
    // Update each of the children
    const deltaX = position.x - this.getXPos();
    const deltaY = position.y - this.getYPos();
    for (const child of children) {
      newChildren.push(child.setPosition({
        x: child.getXPos() + deltaX,
        y: child.getYPos() + deltaY
      }));
    }
    return newChildren;
  }

  /**
   * Sets the height of each of the children based on the sizeable's new height.
   * @param children The children to update.
   * @param height The new height of the sizeable.
   */
  protected setChildHeights(children: Sizeable[], height: number): Sizeable[] {
    const newChildren = [];
    // Update each of the children
    for (const child of children) {
      // Calculate the height ratio
      const heightRatio = child.getHeight() / this.getHeight();
      // Calculate the y position ratio relative to the sizeable's position
      const relY = child.getYPos() - this.getYPos();
      // Calculate the ratio of the relative position to the actual height of the sizeable
      const yRatio = relY / this.getHeight();
      // Update the values based on the ratio
      const newNode = child.setHeight(height * heightRatio);
      // Set the position of each child
      newChildren.push(
        newNode.setPosition({
          x: child.getXPos(),
          y: this.getYPos() + (yRatio * height)
        })
      );
    }
    return newChildren;
  }

  /**
   * Sets the width of each of the children based on the sizeable's new width.
   * @param children The children to update.
   * @param width The new width of the sizeable.
   */
  protected setChildWidths(children: Sizeable[], width: number): Sizeable[] {
    const newChildren = [];
    // Update each of the children
    for (const child of children) {
      // Calculate the width ratio
      const widthRatio = child.getWidth() / this.getWidth();
      // Calculate the x position ratio relative to the sizeable's position
      const relX = child.getXPos() - this.getXPos();
      // Calculate the ratio of the relative position to the actual width of the sizeable
      const xRatio = relX / this.getWidth();
      // Update the values based on the ratio
      const newNode = child.setWidth(width * widthRatio);
      // Set the position of each child
      newChildren.push(
        newNode.setPosition({
          x: this.getXPos() + (xRatio * width),
          y: child.getYPos()
        })
      );
    }
    return newChildren;
  }

}
