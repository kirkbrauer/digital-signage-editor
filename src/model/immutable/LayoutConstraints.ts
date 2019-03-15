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
export interface LayoutConstraints {
  
  /**
   * Vertical constraint.
   */
  vertical?: Constraint;

  /**
   * Horizontal constraint.
   */
  horizontal?: Constraint;
  
}
