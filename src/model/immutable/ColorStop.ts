import { Record } from 'immutable';
import { Color } from './Color';

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

const defaultColorStop: IColorStop = {
  position: 0,
  color: new Color()
};

export class ColorStop extends Record<IColorStop>(defaultColorStop) { }
