import { Color } from './Color';
import { Hideable } from './Hideable';
import { Immutable } from './Immutable';

export interface FillConfig {
  visible?: boolean;
  opacity?: number;
  color?: Color | null;
  gradientType?: GradientType | null;
  gradientAngle?: number | null;
  gradientStops?: ColorStop[];
  scaleMode?: ImageScaleMode | null;
  repeatMode?: ImageRepeatMode | null;
  imageUrl?: string | null;
}

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

/**
 * Defines image scale modes.
 */
export enum ImageScaleMode {
  FILL = 'FILL',
  FIT = 'FIT',
  REPEAT = 'REPEAR',
  STRETCH = 'STRETCH'
}

/**
 * Defines image repeat modes.
 */
export enum ImageRepeatMode {
  REPEAT = 'REPEAT',
  REPEAT_X = 'REPEAT_X',
  REPEAT_Y = 'REPEAT_Y'
}

/**
 * Defines gradient types.
 */
export enum GradientType {
  LINEAR = 'LINEAR',
  RADIAL = 'RADIAL'
}

/**
 * A fill for a shape or line.
 */
export class Fill extends Immutable<FillConfig, any> implements Hideable {
  
  /**
   * Whether the fill is visible.
   */
  private visible: boolean;

  /**
   * Opacity of the fill.
   */
  private opacity: number;

  /**
   * Color of the fill.
   */
  private color: Color | null;

  /**
   * Gradient type.
   * Only used if there are one or more gradient stops.
   */
  private gradientType: GradientType | null;

  /**
   * Angle of the gradient in degrees.
   * Only used if there are one or more gradient stops.
   */
  private gradientAngle: number | null;

  /**
   * The graident stops of the fill.
   */
  private gradientStops: ColorStop[];

  /**
   * Image scale mode.
   * Only used if the image URL is not null.
   */
  private scaleMode: ImageScaleMode | null;

  /**
   * Repeat image mode.
   * Only used if the image URL is not null and the scale mode is REPEAT.
   */
  private repeatMode: ImageRepeatMode | null;

  /**
   * Image url.
   */
  private imageUrl: string | null;

  constructor(config: FillConfig) {
    super();
    this.visible = config.visible === undefined ? true : config.visible;
    this.opacity = config.opacity || 1.0;
    this.color = config.color || null;
    this.gradientType = config.gradientType || null;
    this.gradientAngle = config.gradientAngle || null;
    this.gradientStops = config.gradientStops || [];
    this.scaleMode = config.scaleMode || null;
    this.repeatMode = config.repeatMode || null;
    this.imageUrl = config.imageUrl || null;
  }

  /**
   * Returns true of the fill is visible.
   */
  public isVisible(): boolean {
    return this.visible;
  }

  public show(): this {
    return new (this as any).constructor({
      ...this.toJS(),
      visible: true
    });
  }

  public hide(): this {
    return new (this as any).constructor({
      ...this.toJS(),
      visible: false
    });
  }

  /**
   * Returns the opacity.
   */
  public getOpacity(): number {
    return this.opacity;
  }

  /**
   * Sets the opacity.
   * @param opacity The new opacity of the fill.
   */
  public setOpacity(opacity: number): Fill {
    return new Fill({
      ...this.toJS(),
      opacity
    });
  }

  /**
   * Returns the color.
   */
  public getColor(): Color | null {
    return this.color;
  }

  /**
   * Sets the color.
   * @param color The new color of the fill.
   */
  public setColor(color: Color | null): Fill {
    return new Fill({
      ...this.toJS(),
      color
    });
  }

  /**
   * Returns the gradient type.
   */
  public getGradientType(): GradientType | null {
    return this.gradientType;
  }

  /**
   * Sets the gradient type.
   * @param gradientType The new gradient type of the fill.
   */
  public setGradientType(gradientType: GradientType | null): Fill {
    return new Fill({
      ...this.toJS(),
      gradientType
    });
  }

  /**
   * Returns the gradient angle.
   */
  public getGradientAngle(): number | null {
    return this.gradientAngle;
  }

  /**
   * Sets the gradient angle.
   * @param gradientAngle The new gradient angle of the fill.
   */
  public setGradientAngle(gradientAngle: number | null): Fill {
    return new Fill({
      ...this.toJS(),
      gradientAngle
    });
  }

  /**
   * Returns the gradient stops.
   */
  public getGradientStops(): ColorStop[] {
    return this.gradientStops;
  }

  /**
   * Sets the gradient stops.
   * @param gradientStops The new gradient stops.
   */
  public setGradientStops(gradientStops: ColorStop[]): Fill {
    return new Fill({
      ...this.toJS(),
      gradientStops
    });
  }

  /**
   * Updates a gradient stop.
   * @param index The index to update the gradient stop at.
   * @param gradientStops The new gradient stop.
   */
  public updateGradientStop(index: number, gradientStop: ColorStop): Fill {
    this.gradientStops[index] = gradientStop;
    return new Fill({
      ...this.toJS(),
      gradientStops: this.gradientStops
    });
  }

  /**
   * Adds a new gradient stop.
   * @param gradientStop The new gradient stops.
   */
  public addGradientStop(gradientStop: ColorStop): Fill {
    return new Fill({
      ...this.toJS(),
      gradientStops: [...this.gradientStops, gradientStop]
    });
  }

  /**
   * Removes a gradient stop by index.
   * @param index The gradient stop index.
   */
  public removeGradientStop(index: number): Fill {
    // Remove the gradient stop
    this.gradientStops.splice(index, 1);
    return new Fill({
      ...this.toJS(),
      gradientStops: this.gradientStops
    });
  }

  /**
   * Returns the image scale mode.
   */
  public getScaleMode(): ImageScaleMode | null {
    return this.scaleMode;
  }

  /**
   * Sets the image scale mode.
   * @param scaleMode The new image scale mode.
   */
  public setScaleMode(scaleMode: ImageScaleMode | null): Fill {
    return new Fill({
      ...this.toJS(),
      scaleMode
    });
  }

  /**
   * Returns the image repeat mode.
   */
  public getRepeatMode(): ImageRepeatMode | null {
    return this.repeatMode;
  }

  /**
   * Sets the image repeat mode.
   * @param repeatMode The new image repeat mode.
   */
  public setRepeatMode(repeatMode: ImageRepeatMode | null): Fill {
    return new Fill({
      ...this.toJS(),
      repeatMode
    });
  }

  /**
   * Returns the image URL.
   */
  public getImageURL(): string | null {
    return this.imageUrl;
  }

  /**
   * Sets the image URL.
   * @param imageUrl The new image url.
   */
  public setImageURL(imageUrl: string | null): Fill {
    return new Fill({
      ...this.toJS(),
      imageUrl
    });
  }

  public toJS(): FillConfig {
    return {
      visible: this.visible,
      opacity: this.opacity,
      color: this.color,
      gradientType: this.gradientType,
      gradientAngle: this.gradientAngle,
      gradientStops: this.gradientStops,
      scaleMode: this.scaleMode,
      repeatMode: this.repeatMode,
      imageUrl: this.imageUrl
    };
  }

  public toRaw() { }

}
