import { Record } from 'immutable';
/**
 * A vector point.
 */
export interface VectorPointProps {
    /**
     * ID of the vector point.
     */
    id: string;
    /**
     * The absolute x position of the point.
     */
    x: number;
    /**
     * The absolute y position of the point.
     */
    y: number;
    /**
     * Whether the control points are locked.
     */
    ctrlPointsLocked?: boolean;
    /**
     * First bezier curve control point X position.
     */
    ctrlPoint1X?: number;
    /**
     * First bezier curve control point Y position.
     */
    ctrlPoint1Y?: number;
    /**
     * Second bezier curve control point X position.
     */
    ctrlPoint2X?: number;
    /**
     * Second bezier curve control point Y position.
     */
    ctrlPoint2Y?: number;
}
declare const VectorPoint_base: Record.Factory<VectorPointProps>;
export declare class VectorPoint extends VectorPoint_base {
    constructor(props?: Partial<VectorPointProps>);
}
export {};
