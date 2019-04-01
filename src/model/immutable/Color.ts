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

const defaultColor: IColor = {
  red: 0,
  green: 0,
  blue: 0,
  alpha: 1.0
};

export class Color extends Record<IColor>(defaultColor) {

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

}
