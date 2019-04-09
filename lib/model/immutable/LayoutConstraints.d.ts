import { Record } from 'immutable';
import { RawLayoutConstraints } from '../raw';
/**
 * The layout constraints of a node.
 */
export interface ILayoutConstraints extends RawLayoutConstraints {
}
declare const LayoutConstraints_base: Record.Factory<ILayoutConstraints>;
export declare class LayoutConstraints extends LayoutConstraints_base {
}
export {};
