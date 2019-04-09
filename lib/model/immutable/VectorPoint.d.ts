import { Record } from 'immutable';
import { Vector } from './Vector';
/**
 * A vector point.
 */
export interface IVectorPoint {
    /**
     * ID of the vector point.
     */
    id: string;
    /**
     * The position of the vector point.
     */
    position: Vector;
    /**
     * Whether the control points are locked.
     */
    ctrlPointsLocked?: boolean;
    /**
     * First bezier curve control point.
     */
    ctrlPoint1: Vector | null;
    /**
     * Second bezier curve control point.
     */
    ctrlPoint2: Vector | null;
}
declare const VectorPoint_base: Record.Factory<IVectorPoint>;
export declare class VectorPoint extends VectorPoint_base {
    constructor(props?: Partial<IVectorPoint>);
}
export {};
