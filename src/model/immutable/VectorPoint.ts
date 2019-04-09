import { Record } from 'immutable';
import uuid from 'uuid/v4';
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

const defaultVectorPoint: IVectorPoint = {
  id: '',
  position: new Vector(),
  ctrlPointsLocked: true,
  ctrlPoint1: null,
  ctrlPoint2: null
};

export class VectorPoint extends Record<IVectorPoint>(defaultVectorPoint) {

  constructor(props?: Partial<IVectorPoint>) {
    // Generate a unique UUID for a new vector point.
    super(Object.assign({}, props, { id: (props && props.id) || uuid() }));
  }

}
