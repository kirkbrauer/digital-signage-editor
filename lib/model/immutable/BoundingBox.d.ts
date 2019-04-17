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
export declare const defaultBoundingBox: IBoundingBox;
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
