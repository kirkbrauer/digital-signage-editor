import { Record } from 'immutable';
import { RawColor } from '../raw';
import { Serializable } from './Serializable';

export interface IColor extends RawColor { }

export const defaultColor: IColor = {
  red: 0,
  green: 0,
  blue: 0,
  alpha: 1.0
};

export class Color extends Record<IColor>(defaultColor) implements Serializable<RawColor> {

  /**
   * Converts the color to a rgba string.
   * @param opacity The opacity of the color's parent.
   */
  public toString(opacity?: number): string {
    let alpha = this.alpha;
    if (opacity) {
      alpha = this.alpha * opacity;
    }
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${alpha})`;
  }

  public toRaw(): RawColor {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue,
      alpha: this.alpha
    };
  }

  public static fromRaw(raw: RawColor): Color {
    return new Color(raw);
  }

}
