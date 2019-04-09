import { VectorPoint } from './VectorPoint';
import { Sizeable } from './Sizeable';
import { Record, List } from 'immutable';
import { BoundingBox } from './BoundingBox';
import { Vector } from './Vector';
import { Size } from './Size';
/**
 * A vector path.
 */
export interface IVectorPath {
    /**
     * The ID of the vector path.
     */
    id: string;
    /**
     * The absolute position of the vector path.
     */
    position: Vector;
    /**
     * An array of points that make up the path.
     */
    points: List<VectorPoint>;
    /**
     * Whether the path is open.
     * Paths open between their first and last points.
     */
    open?: boolean;
}
declare const VectorPath_base: Record.Factory<IVectorPath>;
export declare class VectorPath extends VectorPath_base implements Sizeable {
    constructor(props?: Partial<IVectorPath>);
    getBoundingBox(): BoundingBox;
    getTransformedBoundingBox(): BoundingBox;
    getPosition(): Vector;
    getSize(): Size;
    setPosition(position: Vector): this;
    setSize(size: Size): this;
}
export {};
