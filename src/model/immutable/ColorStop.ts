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

export const defaultColorStop: IColorStop = {
  position: 0,
  color: new Color()
};

export class ColorStop extends Record<IColorStop>(defaultColorStop) implements Serializable<RawColorStop> {

  public toRaw(): RawColorStop {
    return {
      position: this.position,
      color: this.color.toRaw()
    };
  }

  public static fromRaw(raw: RawColorStop): ColorStop {
    return new ColorStop({
      position: raw.position,
      color: Color.fromRaw(raw.color)
    });
  }

}
