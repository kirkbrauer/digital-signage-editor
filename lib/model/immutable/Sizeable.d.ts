import { List } from 'immutable';
import { BoundingBox } from './BoundingBox';
import { Size, Vector } from '../';
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
     * Returns the bounding box of the sizeable after transformations.
     */
    abstract getTransformedBoundingBox(): BoundingBox;
    /**
     * Returns the position of the sizeable.
     */
    abstract getPosition(): Vector;
    /**
     * Returns the size of the sizeable.
     */
    abstract getSize(): Size;
    /**
     * Sets the position of the sizeable.
     * @param position The new position of the sizeable.
     */
    abstract setPosition(position: Vector): this;
    /**
     * Sets the size of the sizeable.
     * @param size The new size of the sizeable.
     */
    abstract setSize(size: Size): this;
    /**
     * Calculates the position of a list of sizeables.
     * @param sizeables The sizeables to base the position calculation.
     */
    static calculatePosition(sizeables: List<Sizeable>): Vector;
    /**
     * Calculates the size of a list of sizeables.
     * @param sizeables The sizeables to base the size calculation.
     */
    static calculateSize(sizeables: List<Sizeable>): Size;
    /**
     * Calculates the bounding box of a sizeable.
     * @param sizeables The sizeables to base the bounding box calculation.
     */
    static calculateBoundingBox(sizeables: List<Sizeable>): BoundingBox;
    /**
     * Sets the positions of a list of sizeables inside a prent sizeable.
     * @param sizeables The list of sizeables to update.
     * @param position The new position of the parent.
     */
    static setSizeablePositions<T extends Sizeable>(sizeables: List<T>, position: Vector): List<T>;
    /**
     * Sets the sizes of sizeables based on the computed side of the parent sizeable.
     * @param sizeables A list of sizeables to update
     * @param parentPosition The position of the parent sizeable.
     * @param parentSize The size of the parent sizeable.
     * @param size The new size of the parent sizeable.
     */
    static setSizeableSizes<T extends Sizeable>(sizeables: List<T>, size: Size): List<T>;
}
