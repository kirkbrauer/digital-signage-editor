import { Record } from 'immutable';
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
declare const LayoutConstraints_base: Record.Factory<ILayoutConstraints>;
export declare class LayoutConstraints extends LayoutConstraints_base {
}
export {};
