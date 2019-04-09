import { Record } from 'immutable';
import { RawColor } from '../raw';
export interface IColor extends RawColor {
}
declare const Color_base: Record.Factory<IColor>;
export declare class Color extends Color_base {
    /**
     * Converts the color to a rgba string.
     * @param opacity The opacity of the color's parent.
     */
    toString(opacity?: number): string;
}
export {};
