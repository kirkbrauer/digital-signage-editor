import { List } from 'immutable';
import { BoundingBox } from './BoundingBox';
/**
 * Defines a record whose size and position can be determined.
 */
export declare abstract class Sizeable {
    /**
     * Returns the bounding box of the sizeable.
     * The bounding box is the maximum size of the sizeable after rotation or transformation.
     */
    abstract getBoundingBox(): BoundingBox;
    /**
     * Returns the size of the sizeable.
     * The size of the sizeable is the actual size of the node.
     */
    abstract getSize(): BoundingBox;
    /**
     * Returns the x position of the sizeable.
     */
    abstract getX(): number;
    /**
     * Returns the y position of the sizeable.
     */
    abstract getY(): number;
    /**
     * Returns the width of the sizeable.
     */
    abstract getWidth(): number;
    /**
     * Returns the height of the sizeable.
     */
    abstract getHeight(): number;
    /**
     * Sets the x position of the sizeable.
     * @param x The new x position.
     */
    abstract setX(x: number): this;
    /**
     * Sets the y position of the sizeable.
     * @param y The new y position.
     */
    abstract setY(y: number): this;
    /**
     * Sets the width of the sizeable.
     * @param width The new width.
     */
    abstract setWidth(width: number): this;
    /**
     * Sets the height of the sizeable.
     * @param height The new height.
     */
    abstract setHeight(height: number): this;
    /**
     * Calculates the bounding box of a sizeable.
     * @param sizeables The sizeables to base the bounding box calculation.
     */
    static calculateBoundingBox(sizeables: List<Sizeable>): BoundingBox;
    /**
     * Calculates the x position of a node containing sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    static calculateX(sizeables: List<Sizeable>): number;
    /**
     * Calculates the y position of a node containing sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    static calculateY(sizeables: List<Sizeable>): number;
    /**
     * Calculates the width of a node containing sizeables.
     * @param sizeables The sizeables to base the size calculation.
     * @param parentX The x position of the parent sizeable.
     */
    static calculateWidth<T extends Sizeable>(sizeables: List<T>, parentX: number): number;
    /**
     * Calculates the height of a node containing sizeables.
     * @param sizeables The sizeables to base the size calculation.
     * @param parentY The y position of the parent sizeable.
     */
    static calculateHeight<T extends Sizeable>(sizeables: List<T>, parentY: number): number;
    /**
     * Sets the x positions of sizeables based on the the computed x position of the node.
     * @param sizeables The sizeables to update.
     * @param parentX The x position of the parent sizeable.
     * @param x The new x position of the parent.
     */
    static setSizeableXPositions<T extends Sizeable>(sizeables: List<T>, parentX: number, x: number): List<T>;
    /**
     * Sets the y positions of sizeables based on the the computed y position of the node.
     * @param sizeables The sizeables to update.
     * @param parentY The x position of the parent sizeable.
     * @param y The new y position of the parent.
     */
    static setSizeableYPositions<T extends Sizeable>(sizeables: List<T>, parentY: number, y: number): List<T>;
    /**
     * Sets the widths of sizeables based on the the computed width of the node.
     * @param sizeables The sizeables to update.
     * @param parentX The x position of the parent sizeable.
     * @param parentWidth The width of the parent sizeable.
     * @param width The new width of the parent.
     */
    static setSizeableWidths<T extends Sizeable>(sizeables: List<T>, parentX: number, parentWidth: number, width: number): List<T>;
    /**
     * Sets the heights of sizeables based on the the computed height of the node.
     * @param sizeables The sizeables to update.
     * @param parentY The y position of the parent sizeable.
     * @param parentHeight The height of the parent sizeable.
     * @param height The new height of the parent.
     */
    static setSizeableHeights<T extends Sizeable>(sizeables: List<T>, parentY: number, parentHeight: number, width: number): List<T>;
}
