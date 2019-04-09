import { Record, List } from 'immutable';
import { Color } from './Color';
import { CSSProperties } from 'react';
import { StrokeAlign } from '../raw';
import { ColorStop } from './ColorStop';
import { ImageScaleMode, GradientType, ImageRepeatMode } from '../raw';

/**
 * A fill for a shape or line.
 */
export interface IFill {

  /**
   * Whether the fill is visible.
   */
  visible: boolean;

  /**
   * Opacity of the fill.
   */
  opacity: number;

  /**
   * Color of the fill.
   */
  color: Color;

  /**
   * Gradient type.
   * Only used if there are one or more gradient stops.
   */
  gradientType: GradientType | null;

  /**
   * Angle of the gradient in degrees.
   * Only used if there are one or more gradient stops.
   */
  gradientAngle: number | null;

  /**
   * The graident stops of the fill.
   */
  gradientStops: List<ColorStop> | null;

  /**
   * Image scale mode.
   * Only used if the image URL is not null.
   */
  scaleMode: ImageScaleMode | null;

  /**
   * Repeat image mode.
   * Only used if the image URL is not null and the scale mode is REPEAT.
   */
  repeatMode: ImageRepeatMode | null;

  /**
   * Image url.
   */
  imageUrl: string | null;
}

const defaultFill: IFill = {
  visible: true,
  opacity: 1.0,
  color: new Color(),
  gradientType: null,
  gradientAngle: null,
  gradientStops: null,
  scaleMode: null,
  repeatMode: null,
  imageUrl: null
};

export class Fill extends Record<IFill>(defaultFill) {

  private getGradientTypeCSSString(): string {
    switch (this.gradientType) {
      case GradientType.LINEAR: return 'linear-gradient';
      case GradientType.RADIAL: return 'radial-gradient';
      default: return 'linear-gradient';
    }
  }

  private getGradientCSSString(): string {
    const stops: string[] = [];
    // Set the gradient angle
    const angle = this.gradientType === GradientType.RADIAL ? 'circle' : (this.gradientAngle || 0);
    // Generate the gradient stops
    for (const stop of this.gradientStops || []) {
      stops.push(`${stop.color.toString(this.opacity || 1)} ${stop.position * 100}%`);
    }
    // Return the gradient sting
    return `${this.getGradientTypeCSSString()}(${angle}deg, ${stops.join(',')})`;
  }

  private getScaleModeCSSString(): string | undefined {
    switch (this.scaleMode) {
      case ImageScaleMode.FIT: return 'contain';
      case ImageScaleMode.FILL: return 'cover';
      case ImageScaleMode.STRETCH: return '100% 100%';
      default: return undefined;
    }
  }

  private getRepeatModeString(): string {
    switch (this.repeatMode) {
      case ImageRepeatMode.REPEAT: return 'repeat';
      case ImageRepeatMode.REPEAT_X: return 'repeat-x';
      case ImageRepeatMode.REPEAT_Y: return 'repeat-y';
      default: return 'no-repeat';
    }
  }

  public toStrokeCSS(strokeWeight: number | null, strokeAlign: StrokeAlign | null): CSSProperties {
    if (strokeWeight) {
      if (this.visible) {
        if (this.color) {
          switch (strokeAlign) {
            case StrokeAlign.OUTSIDE: return {
              boxShadow: `0px 0px 0px ${strokeWeight}px ${this.color.toString(this.opacity)}`
            };
            case StrokeAlign.INSIDE: return {
              boxShadow: `inset 0px 0px 0px ${strokeWeight}px ${this.color.toString(this.opacity)}`
            };
            default: return {
              borderColor: this.color.toString(this.opacity),
              borderStyle: 'solid',
              borderWidth: strokeWeight
            };
          }
        }
      }
    }
    return {};
  }

  public toFillCSS(): CSSProperties {
    if (this.visible) {
      if (this.imageUrl) {
        return {
          backgroundColor: `rgba(255,255,255,${this.opacity})`,
          backgroundImage: `url(${this.imageUrl})`,
          backgroundSize: this.getScaleModeCSSString(),
          backgroundPosition: 'center',
          backgroundRepeat: this.scaleMode === ImageScaleMode.REPEAT ? this.getRepeatModeString() : 'no-repeat'
        };
      }
      if (this.gradientType) {
        return {
          backgroundImage: this.getGradientCSSString()
        };
      }
      if (this.color) {
        return {
          backgroundColor: this.color.toString(this.opacity)
        };
      }
    }
    return {};
  }

}
