import { Vector } from './Vector';
import { Immutable } from './Immutable';
/**
 * Abstract class defining the attributes of a sizeable object.
 */
export declare abstract class Sizeable<T = any, R = any> extends Immutable<T, R> {
    /**
     * Returns the current position.
     */
    abstract getPosition(): Vector;
    /**
     * Returns the x position.
     */
    getXPos(): number;
    /**
     * Returns the y position.
     */
    getYPos(): number;
    /**
     * Sets the position.
     * @param position The new position.
     */
    abstract setPosition(position: Vector): this;
    /**
    * Returns the height.
    */
    abstract getHeight(): number;
    /**
     * Sets the height.
     * @param height The new height.
     */
    abstract setHeight(height: number): this;
    /**
     * Returns the width.
     */
    abstract getWidth(): number;
    /**
     * Sets the width.
     * @param width The new width.
     */
    abstract setWidth(width: number): this;
    /**
     * Calculates the position of a sizeable based on the positions of child sizeables.
     * @param children The children to include in the position.
     */
    protected calculatePosition(children: Sizeable[]): Vector;
    /**
     * Calculates the height of a sizeable based on the heights and positions of child sizeables.
     * @param children The children to include in the height.
     */
    protected calculateHeight(children: Sizeable[]): number;
    /**
     * Calculates the width of a sizeable based on the widths and positions of child sizeables.
     * @param children The children to include in the width.
     */
    protected calculateWidth(children: Sizeable[]): number;
    /**
     * Sets the position of each of the children based on the sizeable's new position.
     * @param children The children to update.
     * @param position The new position of the sizeable.
     */
    protected setChildPositions(children: Sizeable[], position: Vector): Sizeable[];
    /**
     * Sets the height of each of the children based on the sizeable's new height.
     * @param children The children to update.
     * @param height The new height of the sizeable.
     */
    protected setChildHeights(children: Sizeable[], height: number): Sizeable[];
    /**
     * Sets the width of each of the children based on the sizeable's new width.
     * @param children The children to update.
     * @param width The new width of the sizeable.
     */
    protected setChildWidths(children: Sizeable[], width: number): Sizeable[];
}
