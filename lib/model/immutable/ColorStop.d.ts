import { Record } from 'immutable';
import { Color } from './Color';
import { Serializable } from './Serializable';
import { RawColorStop } from '../raw';
/**
 * A color stop in a gradient.
 */
export interface IColorStop {
    /**
     * Position of the stop from 0 to 1.
     */
    position: number;
    /**
     * RGBA color at the stop.
     */
    color: Color;
}
export declare const defaultColorStop: IColorStop;
declare const ColorStop_base: Record.Factory<IColorStop>;
export declare class ColorStop extends ColorStop_base implements Serializable<RawColorStop> {
    toRaw(): RawColorStop;
    static fromRaw(raw: RawColorStop): ColorStop;
}
export {};
