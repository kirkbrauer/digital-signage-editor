import { Point } from './Point';
/**
 * A vector path.
 */
export interface Path {
    /**
     * An array of points that make up the path.
     */
    points: Point[];
    /**
     * Whether the path is open.
     * Paths open between their first and last points.
     */
    open: boolean;
}
