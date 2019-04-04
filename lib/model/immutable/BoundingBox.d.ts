import { Record } from 'immutable';
import { Position } from './Position';
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
declare const BoundingBox_base: Record.Factory<IBoundingBox>;
export declare class BoundingBox extends BoundingBox_base {
    /**
     * Returns the minimum x value of the sizeable.
     */
    getMinX(): number;
    /**
     * Returns the minimum y value of the sizeable.
     */
    getMinY(): number;
    /**
     * Returns the maximum x value of the sizeable.
     */
    getMaxX(): number;
    /**
     * Returns the maximum y value of the sizeable.
     */
    getMaxY(): number;
    /**
     * Returns true if either of the bounding boxes instersect.
     * @param boundingBox The bounding box to check.
     */
    includes(boundingBox: BoundingBox): boolean;
}
export {};
