import { Record } from 'immutable';
import { RawLayoutConstraints } from '../raw';
import { Serializable } from './Serializable';
/**
 * The layout constraints of a node.
 */
export interface ILayoutConstraints extends RawLayoutConstraints {
}
export declare const defaultLayoutConstraints: ILayoutConstraints;
declare const LayoutConstraints_base: Record.Factory<ILayoutConstraints>;
export declare class LayoutConstraints extends LayoutConstraints_base implements Serializable<RawLayoutConstraints> {
    toRaw(): RawLayoutConstraints;
    static fromRaw(raw: RawLayoutConstraints): LayoutConstraints;
}
export {};
