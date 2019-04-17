import { Record } from 'immutable';
import uuid from 'uuid/v4';
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

export const defaultVectorPoint: IVectorPoint = {
  id: '',
  position: new Vector(),
  ctrlPointsLocked: true,
  ctrlPoint1: null,
  ctrlPoint2: null
};

export class VectorPoint extends Record<IVectorPoint>(defaultVectorPoint) implements Serializable<RawVectorPoint> {

  constructor(props?: Partial<IVectorPoint>) {
    // Generate a unique UUID for a new vector point.
    super(Object.assign({}, props, { id: (props && props.id) || uuid() }));
  }

  public toRaw(): RawVectorPoint {
    return {
      id: this.id,
      position: this.position.toRaw(),
      ctrlPointsLocked: this.ctrlPointsLocked,
      ctrlPoint1: this.ctrlPoint1 ? this.ctrlPoint1.toRaw() : null,
      ctrlPoint2: this.ctrlPoint2 ? this.ctrlPoint2.toRaw() : null
    };
  }

  public static fromRaw(raw: RawVectorPoint): VectorPoint {
    return new VectorPoint({
      id: raw.id,
      position: Vector.fromRaw(raw.position),
      ctrlPointsLocked: raw.ctrlPointsLocked,
      ctrlPoint1: raw.ctrlPoint1 ? Vector.fromRaw(raw.ctrlPoint1) : null,
      ctrlPoint2: raw.ctrlPoint2 ? Vector.fromRaw(raw.ctrlPoint2) : null
    });
  }

}
