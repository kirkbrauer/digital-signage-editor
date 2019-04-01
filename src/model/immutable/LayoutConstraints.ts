import { Record } from 'immutable';

/**
 * Defines constraint types.
 */
export enum Constraint {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  CENTER = 'CENTER',
  TOP_BOTTOM = 'TOP_BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  LEFT_RIGHT = 'LEFT_RIGHT',
  SCALE = 'SCALE'
}

/**
 * The layout constraints of a node.
 */
export interface ILayoutConstraints {
  
  /**
   * Vertical constraint.
   */
  vertical?: Constraint;

  /**
   * Horizontal constraint.
   */
  horizontal?: Constraint;
  
}

export class LayoutConstraints extends Record<ILayoutConstraints>({}) { }
