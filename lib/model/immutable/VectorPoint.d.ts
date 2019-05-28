import { Record } from 'immutable';
import { Vector } from './Vector';
import { Serializable } from './Serializable';
import { RawVectorPoint } from '../raw';
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
    ctrlPointsLocked?: boolean | null;
    /**
     * First bezier curve control point.
     */
    ctrlPoint1?: Vector | null;
    /**
     * Second bezier curve control point.
     */
    ctrlPoint2?: Vector | null;
}
export declare const defaultVectorPoint: IVectorPoint;
declare const VectorPoint_base: Record.Factory<IVectorPoint>;
export declare class VectorPoint extends VectorPoint_base implements Serializable<RawVectorPoint> {
    constructor(props?: Partial<IVectorPoint>);
    toRaw(): RawVectorPoint;
    static fromRaw(raw: RawVectorPoint): VectorPoint;
}
export {};
