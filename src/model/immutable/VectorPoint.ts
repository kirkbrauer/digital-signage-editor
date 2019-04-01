import { Record } from 'immutable';
import uuid from 'uuid/v4';

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

const defaultVectorPoint: VectorPointProps = {
  id: '',
  x: 0,
  y: 0
};

export class VectorPoint extends Record<VectorPointProps>(defaultVectorPoint) {

  constructor(props?: Partial<VectorPointProps>) {
    // Generate a unique UUID for a new vector point.
    super(Object.assign({}, props, { id: (props && props.id) || uuid() }));
  }

}
