import { Record } from 'immutable';
export interface IColor {
    /**
     * Red value between 0 and 255.
     */
    red: number;
    /**
     * Green value between 0 and 255.
     */
    green: number;
    /**
     * Blue value between 0 and 255.
     */
    blue: number;
    /**
     * Alpha value between 0 and 1.
     */
    alpha: number;
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
