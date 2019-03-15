import { Vector } from './Vector';
/**
 * A point in a vector point.
 */
export interface Point {
    /**
     * Relative position of the point.
     */
    position: Vector;
    /**
     * Whether the control points are locked.
     */
    ctrlPointsLocked: boolean;
    /**
     * First bezier curve control point.
     */
    refCtrlPoint2Pos: Vector;
    /**
     * Second bezier curve control point.
     */
    refCtrlPoint1Pos: Vector;
}
