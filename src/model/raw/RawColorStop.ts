import { RawColor } from './RawColor';

/**
 * A color stop in a gradient.
 */
export interface RawColorStop {

  /**
   * Position of the stop from 0 to 1.
   */
  position: number;

  /**
   * RGBA color at the stop.
   */
  color: RawColor;

}
