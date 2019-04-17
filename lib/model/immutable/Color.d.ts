import { Record } from 'immutable';
import { RawColor } from '../raw';
import { Serializable } from './Serializable';
export interface IColor extends RawColor {
}
export declare const defaultColor: IColor;
declare const Color_base: Record.Factory<IColor>;
export declare class Color extends Color_base implements Serializable<RawColor> {
    /**
     * Converts the color to a rgba string.
     * @param opacity The opacity of the color's parent.
     */
    toString(opacity?: number): string;
    toRaw(): RawColor;
    static fromRaw(raw: RawColor): Color;
}
export {};
