import { Immutable } from './Immutable';
export interface ColorConfig {
    r: number;
    g: number;
    b: number;
    a?: number;
}
/**
 * A RGBA color.
 */
export declare class Color extends Immutable<ColorConfig, any> {
    /**
     * Red value between 0 and 255.
     */
    private red;
    /**
     * Green value between 0 and 255.
     */
    private green;
    /**
     * Blue value between 0 and 255.
     */
    private blue;
    /**
     * Alpha value between 0 and 1.
     */
    private alpha;
    constructor(config: ColorConfig);
    getRed(): number;
    setRed(red: number): Color;
    getGreen(): number;
    setGreen(green: number): Color;
    getBlue(): number;
    setBlue(blue: number): Color;
    getAlpha(): number;
    setAlpha(alpha: number): Color;
    toString(opacity?: number): string;
    toJS(): ColorConfig;
    toRaw(): void;
}
