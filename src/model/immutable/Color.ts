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
export class Color extends Immutable<ColorConfig, any> {
  
  /**
   * Red value between 0 and 255.
   */
  private red: number;

  /**
   * Green value between 0 and 255.
   */
  private green: number;

  /**
   * Blue value between 0 and 255.
   */
  private blue: number;

  /**
   * Alpha value between 0 and 1.
   */
  private alpha: number;

  constructor(config: ColorConfig) {
    super();
    this.red = config.r;
    this.green = config.g;
    this.blue = config.b;
    this.alpha = config.a || 1.0;
  }

  public getRed(): number {
    return this.red;
  }

  public setRed(red: number): Color {
    return new Color({
      ...this.toJS(),
      r: red
    });
  }

  public getGreen(): number {
    return this.green;
  }

  public setGreen(green: number): Color {
    return new Color({
      ...this.toJS(),
      g: green
    });
  }

  public getBlue(): number {
    return this.blue;
  }

  public setBlue(blue: number): Color {
    return new Color({
      ...this.toJS(),
      b: blue
    });
  }

  public getAlpha(): number {
    return this.alpha;
  }

  public setAlpha(alpha: number): Color {
    return new Color({
      ...this.toJS(),
      a: alpha
    });
  }

  public toString(opacity: number = 1.0): string {
    // Calculate the alpha
    const alpha = opacity * this.alpha;
    // Return a rgba color
    return `rgba(${this.red},${this.green},${this.blue},${alpha})`;
  }

  public toJS(): ColorConfig {
    return {
      r: this.red,
      g: this.green,
      b: this.blue,
      a: this.alpha
    };
  }

  public toRaw() { }

}
