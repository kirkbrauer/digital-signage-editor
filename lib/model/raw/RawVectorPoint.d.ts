import { RawVector } from './RawVector';
/**
 * A vector point.
 */
export interface RawVectorPoint {
    /**
     * ID of the vector point.
     */
    id: string;
    /**
     * The position of the vector point.
     */
    position: RawVector;
    /**
     * Whether the control points are locked.
     */
    ctrlPointsLocked?: boolean;
    /**
     * First bezier curve control point.
     */
    ctrlPoint1: RawVector | null;
    /**
     * Second bezier curve control point.
     */
    ctrlPoint2: RawVector | null;
}
