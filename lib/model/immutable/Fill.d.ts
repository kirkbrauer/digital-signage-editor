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
export declare enum ImageScaleMode {
    FILL = "FILL",
    FIT = "FIT",
    REPEAT = "REPEAR",
    STRETCH = "STRETCH"
}
/**
 * Defines image repeat modes.
 */
export declare enum ImageRepeatMode {
    REPEAT = "REPEAT",
    REPEAT_X = "REPEAT_X",
    REPEAT_Y = "REPEAT_Y"
}
/**
 * Defines gradient types.
 */
export declare enum GradientType {
    LINEAR = "LINEAR",
    RADIAL = "RADIAL"
}
/**
 * A fill for a shape or line.
 */
export declare class Fill extends Immutable<FillConfig, any> implements Hideable {
    /**
     * Whether the fill is visible.
     */
    private visible;
    /**
     * Opacity of the fill.
     */
    private opacity;
    /**
     * Color of the fill.
     */
    private color;
    /**
     * Gradient type.
     * Only used if there are one or more gradient stops.
     */
    private gradientType;
    /**
     * Angle of the gradient in degrees.
     * Only used if there are one or more gradient stops.
     */
    private gradientAngle;
    /**
     * The graident stops of the fill.
     */
    private gradientStops;
    /**
     * Image scale mode.
     * Only used if the image URL is not null.
     */
    private scaleMode;
    /**
     * Repeat image mode.
     * Only used if the image URL is not null and the scale mode is REPEAT.
     */
    private repeatMode;
    /**
     * Image url.
     */
    private imageUrl;
    constructor(config: FillConfig);
    /**
     * Returns true of the fill is visible.
     */
    isVisible(): boolean;
    show(): this;
    hide(): this;
    /**
     * Returns the opacity.
     */
    getOpacity(): number;
    /**
     * Sets the opacity.
     * @param opacity The new opacity of the fill.
     */
    setOpacity(opacity: number): Fill;
    /**
     * Returns the color.
     */
    getColor(): Color | null;
    /**
     * Sets the color.
     * @param color The new color of the fill.
     */
    setColor(color: Color | null): Fill;
    /**
     * Returns the gradient type.
     */
    getGradientType(): GradientType | null;
    /**
     * Sets the gradient type.
     * @param gradientType The new gradient type of the fill.
     */
    setGradientType(gradientType: GradientType | null): Fill;
    /**
     * Returns the gradient angle.
     */
    getGradientAngle(): number | null;
    /**
     * Sets the gradient angle.
     * @param gradientAngle The new gradient angle of the fill.
     */
    setGradientAngle(gradientAngle: number | null): Fill;
    /**
     * Returns the gradient stops.
     */
    getGradientStops(): ColorStop[];
    /**
     * Sets the gradient stops.
     * @param gradientStops The new gradient stops.
     */
    setGradientStops(gradientStops: ColorStop[]): Fill;
    /**
     * Updates a gradient stop.
     * @param index The index to update the gradient stop at.
     * @param gradientStops The new gradient stop.
     */
    updateGradientStop(index: number, gradientStop: ColorStop): Fill;
    /**
     * Adds a new gradient stop.
     * @param gradientStop The new gradient stops.
     */
    addGradientStop(gradientStop: ColorStop): Fill;
    /**
     * Removes a gradient stop by index.
     * @param index The gradient stop index.
     */
    removeGradientStop(index: number): Fill;
    /**
     * Returns the image scale mode.
     */
    getScaleMode(): ImageScaleMode | null;
    /**
     * Sets the image scale mode.
     * @param scaleMode The new image scale mode.
     */
    setScaleMode(scaleMode: ImageScaleMode | null): Fill;
    /**
     * Returns the image repeat mode.
     */
    getRepeatMode(): ImageRepeatMode | null;
    /**
     * Sets the image repeat mode.
     * @param repeatMode The new image repeat mode.
     */
    setRepeatMode(repeatMode: ImageRepeatMode | null): Fill;
    /**
     * Returns the image URL.
     */
    getImageURL(): string | null;
    /**
     * Sets the image URL.
     * @param imageUrl The new image url.
     */
    setImageURL(imageUrl: string | null): Fill;
    toJS(): FillConfig;
    toRaw(): void;
}
