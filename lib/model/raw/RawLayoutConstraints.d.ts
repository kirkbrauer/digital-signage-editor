/**
 * Defines constraint types.
 */
export declare enum Constraint {
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    CENTER = "CENTER",
    TOP_BOTTOM = "TOP_BOTTOM",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    LEFT_RIGHT = "LEFT_RIGHT",
    SCALE = "SCALE"
}
/**
 * The layout constraints of a node.
 */
export interface RawLayoutConstraints {
    /**
     * Vertical constraint.
     */
    vertical: Constraint | null;
    /**
     * Horizontal constraint.
     */
    horizontal: Constraint | null;
}
