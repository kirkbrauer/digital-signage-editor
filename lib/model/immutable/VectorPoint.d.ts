import { Vector } from './Vector';
import { Sizeable } from './Sizeable';
export interface VectorPointConfig {
    id?: string;
    position?: Vector;
    ctrlPointsLocked?: boolean;
    ctrlPoint1Pos?: Vector;
    ctrlPoint2Pos?: Vector;
}
/**
 * A point in a vector point.
 */
export declare class VectorPoint extends Sizeable<VectorPointConfig, any> {
    /**
     * ID of the vector point.
     */
    private id;
    /**
     * Absolute position of the point.
     */
    private position;
    /**
     * Whether the control points are locked.
     */
    private ctrlPointsLocked;
    /**
     * First bezier curve control point.
     */
    private ctrlPoint2Pos;
    /**
     * Second bezier curve control point.
     */
    private ctrlPoint1Pos;
    constructor(config: VectorPointConfig);
    getID(): string;
    getPosition(): Vector;
    setPosition(position: Vector): this;
    getHeight(): number;
    setHeight(height: number): this;
    getWidth(): number;
    setWidth(width: number): this;
    /**
     * Returns true if the vector point control points are locked.
     */
    areCtrlPointsLocked(): boolean;
    /**
     * Locks the vector control points.
     */
    lockCtrlPoints(): VectorPoint;
    /**
     * Unlocks the vector control points.
     */
    unlockCtrlPoints(): VectorPoint;
    /**
     * Returns the position of the first control point.
     */
    getCtrlPoint1Pos(): Vector;
    /**
     * Sets the position of the first control point.
     * @param setCtrlPoint1Pos The new position of the control point.
     */
    setCtrlPoint1Pos(ctrlPoint1Pos: Vector): VectorPoint;
    /**
     * Returns the position of the second control point.
     */
    getCtrlPoint2Pos(): Vector;
    /**
     * Sets the position of the second control point.
     * @param ctrlPoint2Pos The new position of the control point.
     */
    setCtrlPoint2Pos(ctrlPoint2Pos: Vector): VectorPoint;
    toRaw(): void;
    toJS(): VectorPointConfig;
    cloneWith(data: VectorPointConfig): this;
}
