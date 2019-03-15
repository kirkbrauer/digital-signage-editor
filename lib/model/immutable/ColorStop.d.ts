import { Color } from './Color';
/**
 * A color stop in a gradient.
 */
export interface ColorStop {
    /**
     * Position of the stop from 0 to 1.
     */
    position: number;
    /**
     * RGBA color at the stop.
     */
    color: Color;
}
