import { VectorPoint } from './VectorPoint';
import { Sizeable } from './Sizeable';
import { Vector } from './Vector';
export interface VectorPathConfig {
    points?: VectorPoint[];
    open?: boolean;
}
/**
 * A vector path.
 */
export declare class VectorPath extends Sizeable<VectorPathConfig, any> {
    /**
     * An array of points that make up the path.
     */
    private points;
    /**
     * Whether the path is open.
     * Paths open between their first and last points.
     */
    private open;
    constructor(config: VectorPathConfig);
    getPosition(): Vector;
    setPosition(position: Vector): this;
    getHeight(): number;
    setHeight(height: number): this;
    getWidth(): number;
    setWidth(width: number): this;
    /**
     * Gets the points in the vector path.
     */
    getPoints(): VectorPoint[];
    /**
     * Sets the points in the vector path.
     * @param points The new points in the path.
     */
    setPoints(points: VectorPoint[]): VectorPath;
    /**
     * Adds a point to the path.
     * @param point The point to add.
     */
    addPoint(point: VectorPoint): VectorPath;
    /**
     * Removes a point from the path.
     * @param point The point to add.
     */
    removePoint(id: string): VectorPath;
    /**
     * Updates a point in the path.
     * @param newPoint The point to update.
     */
    updatePoint(newPoint: VectorPoint): VectorPath;
    /**
     * Returns true if the path is open.
     */
    isOpen(): boolean;
    toRaw(): void;
    toJS(): VectorPathConfig;
    cloneWith(data: VectorPathConfig): this;
    clone(): this;
}
