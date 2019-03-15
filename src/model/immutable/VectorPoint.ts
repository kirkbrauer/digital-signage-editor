import { Vector } from './Vector';
import { Sizeable } from './Sizeable';
import shortid from 'shortid';

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
export class VectorPoint extends Sizeable<VectorPointConfig, any> {

  /**
   * ID of the vector point.
   */
  private id: string;

  /**
   * Absolute position of the point.
   */
  private position: Vector;

  /**
   * Whether the control points are locked.
   */
  private ctrlPointsLocked: boolean;

  /**
   * First bezier curve control point.
   */
  private ctrlPoint2Pos: Vector;

  /**
   * Second bezier curve control point.
   */
  private ctrlPoint1Pos: Vector;

  constructor(config: VectorPointConfig) {
    super();
    this.id = config.id || shortid.generate();
    this.position = config.position || { x: 0, y: 0 };
    this.ctrlPointsLocked = config.ctrlPointsLocked || false;
    this.ctrlPoint1Pos = config.ctrlPoint1Pos || this.position;
    this.ctrlPoint2Pos = config.ctrlPoint2Pos || this.position;
  }

  public getID(): string {
    return this.id;
  }

  public getPosition(): Vector {
    return this.position;
  }

  public setPosition(position: Vector): this {
    return this.cloneWith({
      position
    });
  }

  public getHeight(): number {
    return 0;
  }

  public setHeight(height: number): this {
    return this;
  }

  public getWidth(): number {
    return 0;
  }

  public setWidth(width: number): this {
    return this;
  }

  /**
   * Returns true if the vector point control points are locked.
   */
  public areCtrlPointsLocked(): boolean {
    return this.ctrlPointsLocked;
  }

  /**
   * Locks the vector control points.
   */
  public lockCtrlPoints(): VectorPoint {
    return this.cloneWith({
      ctrlPointsLocked: true
    });
  }

  /**
   * Unlocks the vector control points.
   */
  public unlockCtrlPoints(): VectorPoint {
    return this.cloneWith({
      ctrlPointsLocked: false
    });
  }

  /**
   * Returns the position of the first control point.
   */
  public getCtrlPoint1Pos(): Vector {
    return this.ctrlPoint1Pos;
  }

  /**
   * Sets the position of the first control point.
   * @param setCtrlPoint1Pos The new position of the control point.
   */
  public setCtrlPoint1Pos(ctrlPoint1Pos: Vector): VectorPoint {
    return this.cloneWith({
      ctrlPoint1Pos
    });
  }

  /**
   * Returns the position of the second control point.
   */
  public getCtrlPoint2Pos(): Vector {
    return this.ctrlPoint1Pos;
  }

  /**
   * Sets the position of the second control point.
   * @param ctrlPoint2Pos The new position of the control point.
   */
  public setCtrlPoint2Pos(ctrlPoint2Pos: Vector): VectorPoint {
    return this.cloneWith({
      ctrlPoint2Pos
    });
  }

  public toRaw() { }

  public toJS(): VectorPointConfig {
    return {
      position: this.position,
      ctrlPointsLocked: this.ctrlPointsLocked,
      ctrlPoint1Pos: this.ctrlPoint1Pos,
      ctrlPoint2Pos: this.ctrlPoint2Pos
    };
  }

  public cloneWith(data: VectorPointConfig): this {
    return new (this as any).constructor({
      ...this.toJS(),
      ...data
    });
  }
  
}
