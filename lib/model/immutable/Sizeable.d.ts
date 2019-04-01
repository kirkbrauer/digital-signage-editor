/**
 * Defines a record whose size and position can be determined.
 */
export interface Sizeable {
    /**
     * Returns the x position of the sizeable.
     */
    getX(): number;
    /**
     * Returns the y position of the sizeable.
     */
    getY(): number;
    /**
     * Returns the width of the sizeable.
     */
    getWidth(): number;
    /**
     * Returns the height of the sizeable.
     */
    getHeight(): number;
    /**
     * Sets the x position of the sizeable.
     * @param x The new x position.
     */
    setX(x: number): this;
    /**
     * Sets the y position of the sizeable.
     * @param y The new y position.
     */
    setY(y: number): this;
    /**
     * Sets the width of the sizeable.
     * @param width The new width.
     */
    setWidth(width: number): this;
    /**
     * Sets the height of the sizeable.
     * @param height The new height.
     */
    setHeight(height: number): this;
}
